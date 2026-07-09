/**
 * Renders the checker's exact view: candidate pen strokes (red) over the
 * real ink PNG, saved as an image for visual inspection.
 * Edit PATHS below, run: node scripts/pen-debug.mjs [out.png]
 */
import sharp from 'sharp';

export const P1 =
  'M190,8 C 160,42 122,80 88,114 C 80,128 68,146 50,156 C 34,163 16,160 9,148 C 4,138 3,124 3,110 C 20,80 60,36 95,16 C 120,4 152,0 178,8 C 198,15 210,26 216,42 C 224,62 224,78 214,92 C 202,110 172,124 140,137 C 110,150 64,164 32,156 C 18,150 8,138 8,124 C 10,112 22,104 42,105 C 56,106 68,110 78,113';
export const P2 =
  'M172,102 C 195,92 215,88 232,88 C 238,78 255,72 268,78 C 280,84 282,96 272,102 C 260,108 242,106 240,94 C 252,86 268,84 282,90 C 296,84 310,76 318,72 C 316,102 304,130 286,150 C 270,168 250,184 232,192 C 220,196 208,182 219,166 C 240,156 262,144 280,136 C 294,126 306,108 314,96 C 328,90 340,90 352,92 C 380,84 412,52 440,22 C 448,12 462,2 468,7 C 452,28 430,54 412,76 C 400,90 390,98 382,102 C 388,92 398,90 410,92 C 422,95 430,102 438,107 C 448,105 460,94 472,87 C 486,80 504,79 513,84 C 500,78 478,84 470,96 C 466,105 475,109 487,106 C 497,103 503,95 506,86 C 508,95 511,103 517,103 C 526,102 534,99 542,98 C 562,102 580,99 597,91 C 608,81 619,80 628,83 C 633,86 636,89 636,92';
export const DOT = { cx: 327, cy: 58, r: 9 };
export const STROKE = 24;

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop());

if (isMain) {
  const out = process.argv[2] || 'pen-debug.png';
  const W = 635, H = 193;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#f6f1e7"/>
  <path d="${P1}" fill="none" stroke="rgba(220,40,40,0.55)" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${P2}" fill="none" stroke="rgba(220,40,40,0.55)" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="rgba(40,180,60,0.6)"/>
</svg>`;

  // Two-step: composite at 1:1 first, then upscale (sharp applies resize
  // before composite inside a single pipeline, which would misalign them).
  const composed = await sharp(Buffer.from(svg))
    .composite([{ input: 'public/brand/dojha-ink.png', blend: 'over' }])
    .png()
    .toBuffer();
  await sharp(composed).resize(1270).png().toFile(out);

  console.log('wrote', out);
}
