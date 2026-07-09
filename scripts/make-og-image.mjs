import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Generates public/og-image.png (1200x630) for social share previews.
 * Plain SVG rasterized with sharp — same lightweight pattern as
 * make-signature.mjs, no headless browser dependency. Uses generic
 * bold sans/serif since librsvg doesn't pick up the @fontsource files;
 * this is a small link-preview thumbnail, not on-site typography.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'og-image.png');

const VOID = '#101013';
const BONE = '#f4efe4';
const ACID = '#cde84a';
const INK_600 = '#cfc9ba';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${VOID}"/>

  <text x="90" y="150" font-family="Arial, sans-serif" font-size="20" letter-spacing="4"
    fill="${INK_600}">PRODUCT DESIGNER &#183; INDIA</text>

  <text x="86" y="255" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="76"
    fill="${BONE}">I FIND THE SCREEN</text>
  <text x="86" y="335" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="76"
    fill="${BONE}">WHERE PRODUCTS</text>
  <text x="86" y="415" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="76"
    fill="${BONE}">LOSE PEOPLE.</text>

  <circle cx="106" cy="470" r="7" fill="${ACID}"/>
  <text x="130" y="478" font-family="Georgia, serif" font-style="italic" font-size="26"
    fill="${INK_600}">&#8230;then I make it keep them instead.</text>

  <line x1="90" y1="540" x2="1110" y2="540" stroke="#26262c" stroke-width="2"/>
  <text x="90" y="588" font-family="Arial, sans-serif" font-weight="700" font-size="28"
    fill="${BONE}">Debashmita Ojha</text>
  <text x="1110" y="588" text-anchor="end" font-family="Arial, sans-serif" font-size="20"
    letter-spacing="2" fill="${ACID}">AUDITS &#183; PROTOTYPES &#183; RECEIPTS ATTACHED</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('wrote', OUT);
