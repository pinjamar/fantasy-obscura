/**
 * check-assets.mjs
 * Verifies all required optimized images exist in public/images/.
 * Run after optimize-images.mjs.
 *
 * Usage: node scripts/check-assets.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT   = process.cwd();
const IMAGES = path.join(ROOT, 'public', 'images');

// All files we expect to exist after running optimize-images
const REQUIRED = [
  // Category images — both widths, both formats
  'categories/epic-400.webp',    'categories/epic-800.webp',
  'categories/epic-400.avif',    'categories/epic-800.avif',
  'categories/romantasy-400.webp', 'categories/romantasy-800.webp',
  'categories/romantasy-400.avif', 'categories/romantasy-800.avif',
  'categories/dark-400.webp',    'categories/dark-800.webp',
  'categories/grimdark-400.webp','categories/grimdark-800.webp',
  'categories/historical-400.webp','categories/historical-800.webp',
  'categories/academy-400.webp', 'categories/academy-800.webp',
  'categories/folklore-400.webp','categories/folklore-800.webp',
  'categories/cozy-400.webp',    'categories/cozy-800.webp',
  'categories/progression-400.webp','categories/progression-800.webp',
  'categories/science-400.webp', 'categories/science-800.webp',
  'categories/sword-400.webp',   'categories/sword-800.webp',
  'categories/urban-400.webp',   'categories/urban-800.webp',
];

const BRANDING = [
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/apple-touch-icon.png',
  'public/nav-logo.png',
  'public/og-default.png',
];

const missing = [];

for (const rel of REQUIRED) {
  try { await fs.access(path.join(IMAGES, rel)); }
  catch { missing.push(`public/images/${rel}`); }
}

for (const rel of BRANDING) {
  try { await fs.access(path.join(ROOT, rel)); }
  catch { missing.push(rel); }
}

if (missing.length) {
  console.error(`\n❌ Missing ${missing.length} required asset(s):`);
  for (const m of missing) console.error(`   ${m}`);
  console.error('\nRun: npm run images:optimize\n');
  process.exit(1);
}

console.log(`✅ All required assets present (${REQUIRED.length + BRANDING.length} files checked).`);
