/**
 * Prints an ASCII density map of the signature PNG (10px cells) with
 * coordinate rulers, so pen paths can be authored against exact geometry.
 */
import sharp from 'sharp';

const { data, info } = await sharp('public/brand/dojha-ink.png')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width, H = info.height, CELL = 10;
const cols = Math.ceil(W / CELL), rows = Math.ceil(H / CELL);
const grid = Array.from({ length: rows }, () => new Array(cols).fill(0));

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (data[(y * W + x) * 4 + 3] > 100) {
      grid[Math.floor(y / CELL)][Math.floor(x / CELL)]++;
    }
  }
}

// header ruler every 5 cells = 50px
let header = '     ';
for (let c = 0; c < cols; c++) header += c % 5 === 0 ? String(c * CELL).padEnd(5).slice(0, 1) === ' ' ? '|' : String(Math.floor((c * CELL) / 100) % 10) : (c % 5 === 0 ? '|' : '.');
header = '     ' + Array.from({ length: cols }, (_, c) => (c % 5 === 0 ? String((c * CELL) / 10 % 10 === 0 ? (c * CELL) % 100 === 0 ? Math.floor((c * CELL) / 100) : '+' : '+') : '.')).join('');
console.log('cols are x/10, rows are y. Digits row = x hundreds.');
console.log(header);
for (let r = 0; r < rows; r++) {
  const line = grid[r]
    .map((n) => (n === 0 ? '.' : n < 15 ? '-' : n < 45 ? 'o' : '#'))
    .join('');
  console.log(String(r * CELL).padStart(4) + ' ' + line);
}
