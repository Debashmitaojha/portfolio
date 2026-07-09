/**
 * One-time asset pipeline: turn the scanned Dojha calligraphy into a
 * transparent-ink PNG recolored to the exact token navy (--ink-800).
 *
 * Usage:  node scripts/make-signature.mjs
 * Input:  public/brand/dojha-mark.jpeg  (the original scan — keep it)
 * Output: public/brand/dojha-ink.png    (transparent bg, token-navy ink)
 *
 * To change the signature later: replace the input scan and rerun.
 * To recolor: change INK below (keep it in sync with tokens.css).
 */
import sharp from 'sharp';

// Usage: node scripts/make-signature.mjs [inkHex] [outPath]
// Defaults produce the navy version; pass e.g. "f4efe4" and a new path
// for a light-ink version that sits on dark surfaces.
const INPUT = 'public/brand/dojha-mark.jpeg';
const OUTPUT = process.argv[3] || 'public/brand/dojha-ink.png';

const hex = (process.argv[2] || '1b2a47').replace('#', '');
const INK = {
  r: parseInt(hex.slice(0, 2), 16),
  g: parseInt(hex.slice(2, 4), 16),
  b: parseInt(hex.slice(4, 6), 16),
};

// Greyscale thresholds: pixels lighter than PAPER are fully transparent,
// darker than INK_DEEP are fully opaque, smooth ramp between.
// Chosen from the scan's histogram: ink sits at 0–3, paper grain at
// 168–210, with a clean gap between — cut inside the gap.
const PAPER = 150;
const INK_DEEP = 40;

const { data, info } = await sharp(INPUT)
  .greyscale()
  .normalise() // stretch the soft scan to full tonal range first
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const out = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
  const g = data[i];
  let t = (PAPER - g) / (PAPER - INK_DEEP);
  t = Math.max(0, Math.min(1, t));
  // smoothstep for clean anti-aliased edges
  const alpha = Math.round(255 * t * t * (3 - 2 * t));
  out[i * 4] = INK.r;
  out[i * 4 + 1] = INK.g;
  out[i * 4 + 2] = INK.b;
  out[i * 4 + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .trim() // crop empty margins so the mark sits tight
  .png()
  .toFile(OUTPUT);

console.log(`Wrote ${OUTPUT} (${width}x${height} source, trimmed)`);
