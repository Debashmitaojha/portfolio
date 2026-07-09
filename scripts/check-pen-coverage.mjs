/**
 * Pen-path coverage checker for the signature stroke animation.
 * Rasterizes the candidate mask strokes (imported from pen-debug.mjs)
 * over the real ink PNG and reports how much ink the pen covers and
 * where the misses cluster, so the path can be corrected numerically.
 *
 * Usage: node scripts/check-pen-coverage.mjs
 */
import sharp from 'sharp';
import { P1, P2, DOT, STROKE } from './pen-debug.mjs';

const W = 635, H = 193;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <path d="${P1}" fill="none" stroke="#fff" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${P2}" fill="none" stroke="#fff" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="#fff"/>
</svg>`;

const pen = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
const { data: ink, info } = await sharp('public/brand/dojha-ink.png')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

if (info.width !== W || info.height !== H) {
  throw new Error(`ink png is ${info.width}x${info.height}, expected ${W}x${H}`);
}

let inkCount = 0, covered = 0;
const missMap = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) {
  const isInk = ink[i * 4 + 3] > 100;
  if (!isInk) continue;
  inkCount++;
  if (pen[i * 4 + 3] > 100) covered++;
  else missMap[i] = 1;
}

const CELL = 20;
const cols = Math.ceil(W / CELL);
const cells = new Map();
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!missMap[y * W + x]) continue;
    const key = Math.floor(y / CELL) * cols + Math.floor(x / CELL);
    cells.set(key, (cells.get(key) || 0) + 1);
  }
}
const worst = [...cells.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 16)
  .map(([key, n]) => {
    const cx = (key % cols) * CELL + CELL / 2;
    const cy = Math.floor(key / cols) * CELL + CELL / 2;
    return `  miss ~(${cx},${cy}) : ${n}px`;
  });

console.log(`coverage: ${((covered / inkCount) * 100).toFixed(1)}% of ${inkCount} ink px`);
console.log(worst.join('\n'));
