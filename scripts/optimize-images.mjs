/**
 * optimize-images.mjs
 *
 * Converts source images from assets/raw/ → public/images/ as WebP + AVIF.
 * Category images get two responsive widths (400, 800).
 * Also handles the full favicon + nav-logo set.
 *
 * Usage:
 *   node scripts/optimize-images.mjs             # process all + favicons
 *   node scripts/optimize-images.mjs --favicons   # favicon set only
 *   node scripts/optimize-images.mjs --categories # category images only
 *
 * npm scripts:
 *   npm run images:optimize   → full run
 *   npm run images:favicons   → favicons only
 *   npm run images:categories → categories only
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import sharp from 'sharp';

const ROOT = process.cwd();
const INPUT_DIR  = path.join(ROOT, 'assets', 'raw');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images');

const FAVICONS_ONLY       = process.argv.includes('--favicons');
const CATEGORIES_ONLY     = process.argv.includes('--categories');
const READING_ORDERS_ONLY = process.argv.includes('--reading-orders');

// ── Config ────────────────────────────────────────────────────────────────────
const CONFIG = {
  // Category images: two widths for responsive srcset
  categories: {
    widths: [400, 800],
    height: 400,
    fit: 'cover',
    quality: { webp: 76, avif: 58 },
  },
  // Reading-order hero images: same dimensions as categories
  'reading-orders': {
    widths: [400, 800],
    height: 400,
    fit: 'cover',
    quality: { webp: 76, avif: 58 },
  },
  // Page banner/hero images: wide 2:1 crop, two widths
  banners: {
    widths: [400, 800],
    height: 400,
    fit: 'cover',
    quality: { webp: 76, avif: 58 },
  },
  // Branding (logo, og) — single size, no AVIF (OG images need broad compat)
  branding: {
    widths: [1200],
    height: null,
    fit: 'inside',
    quality: { webp: 82, avif: null },
  },
  // Book cover placeholders
  placeholders: {
    widths: [300],
    height: 450,
    fit: 'cover',
    quality: { webp: 80, avif: 70 },
  },
  default: {
    widths: [800],
    height: null,
    fit: 'inside',
    quality: { webp: 80, avif: null },
  },
};

function inferType(file) {
  const rel = file.replace(/\\/g, '/');
  for (const key of Object.keys(CONFIG)) {
    if (rel.includes(`/${key}/`)) return key;
  }
  return 'default';
}

async function ensureDir(p) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function encodeVariant(img, outPath, width, height, format, quality) {
  await ensureDir(outPath);
  await img.clone()
    .rotate()
    .resize({ width, height: height ?? undefined, fit: 'cover', position: 'center', withoutEnlargement: true })
    [format]({ quality, effort: 6 })
    .toFile(outPath);
  const stat = await fs.stat(outPath);
  return Math.round(stat.size / 1024);
}

async function processFile(file) {
  const type = inferType(file);
  const cfg  = CONFIG[type];

  const rel    = path.relative(INPUT_DIR, file);
  const parsed = path.parse(rel);
  const outDir = path.join(OUTPUT_DIR, parsed.dir);
  const base   = path.join(outDir, parsed.name);

  const img  = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  const log  = [];

  for (const width of cfg.widths) {
    const suffix = cfg.widths.length > 1 ? `-${width}` : '';

    // WebP always
    const webpPath = `${base}${suffix}.webp`;
    const webpKb = await encodeVariant(img, webpPath, width, cfg.height, 'webp', cfg.quality.webp);
    log.push(`${parsed.name}${suffix}.webp (${webpKb}KB)`);

    // AVIF only where quality is specified
    if (cfg.quality.avif != null) {
      const avifPath = `${base}${suffix}.avif`;
      const avifKb = await encodeVariant(img, avifPath, width, cfg.height, 'avif', cfg.quality.avif);
      log.push(`${parsed.name}${suffix}.avif (${avifKb}KB)`);
    }
  }

  console.log(`[ok] ${parsed.dir}/${parsed.name} (${meta.width}×${meta.height}) → ${log.join(', ')}`);
}

// ── Favicon set ───────────────────────────────────────────────────────────────
async function generateFavicons() {
  const src = path.join(ROOT, 'public', 'favicon.png');
  try { await fs.access(src); } catch { console.error('Missing public/favicon.png'); return; }

  const img = sharp(src, { failOn: 'none' });
  const DARK_GOLD = { r: 26, g: 18, b: 0 };

  // 16×16 + 32×32 with dark gold background + rounded corners
  for (const size of [16, 32]) {
    const radius = Math.round(size * 0.22); // ~22% radius — subtle rounding
    const roundMask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
    );
    const favResized = await img.clone().resize(size, size).png().toBuffer();
    const bg = await sharp({ create: { width: size, height: size, channels: 4, background: { ...DARK_GOLD, alpha: 1 } } }).png().toBuffer();
    await sharp(bg)
      .composite([{ input: favResized }, { input: roundMask, blend: 'dest-in' }])
      .png()
      .toFile(path.join(ROOT, 'public', `favicon-${size}x${size}.png`));
    console.log(`[ok] favicon-${size}x${size}.png (dark gold bg, rounded r=${radius})`);
  }

  // 180×180 apple-touch-icon — transparent (Apple adds rounded bg)
  await img.clone().resize(180, 180).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
  console.log('[ok] apple-touch-icon.png (transparent, 180×180)');

  // nav-logo — trim transparent padding from logo, resize to 160px height
  const logoSrc = path.join(ROOT, 'public', 'logo.png');
  try {
    await fs.access(logoSrc);
    await sharp(logoSrc, { failOn: 'none' })
      .trim()
      .resize(null, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(ROOT, 'public', 'nav-logo.png'));
    console.log('[ok] nav-logo.png (trimmed, 160px height)');
  } catch { console.log('[skip] logo.png not found'); }

  // og-default.png — 1200×630, PNG for broad OG compat
  const ogSrc = path.join(ROOT, 'public', 'ogimage.png');
  try {
    await fs.access(ogSrc);
    await sharp(ogSrc, { failOn: 'none' })
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'center', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 8 })
      .toFile(path.join(ROOT, 'public', 'og-default.png'));
    const stat = await fs.stat(path.join(ROOT, 'public', 'og-default.png'));
    console.log(`[ok] og-default.png (1200×630, ${Math.round(stat.size / 1024)}KB)`);
  } catch { console.log('[skip] ogimage.png not found'); }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (FAVICONS_ONLY) { await generateFavicons(); return; }

  const files = await fg(['**/*.{png,jpg,jpeg,webp,avif}'], { cwd: INPUT_DIR, absolute: true });

  if (!files.length) {
    console.log('No source images found in assets/raw/');
    console.log('  assets/raw/categories/      → 400 + 800px WebP + AVIF');
    console.log('  assets/raw/reading-orders/  → 400 + 800px WebP + AVIF');
    console.log('  assets/raw/branding/        → 1200px WebP');
    console.log('  assets/raw/placeholders/    → 300px WebP + AVIF');
    return;
  }

  const toProcess = CATEGORIES_ONLY
    ? files.filter((f) => f.replace(/\\/g, '/').includes('/categories/'))
    : READING_ORDERS_ONLY
      ? files.filter((f) => f.replace(/\\/g, '/').includes('/reading-orders/'))
      : files;

  await Promise.all(toProcess.map(processFile));
  if (!CATEGORIES_ONLY && !READING_ORDERS_ONLY) await generateFavicons();
  console.log(`\nDone — ${toProcess.length} source image(s) processed.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
