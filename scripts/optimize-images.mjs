/**
 * optimize-images.mjs
 *
 * Converts and resizes source images from assets/raw/ into public/images/.
 * Produces WebP for category images (800×400) and branding (resized for display).
 * Also generates the full favicon set from public/favicon.png.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # process all
 *   node scripts/optimize-images.mjs --favicons  # favicon set only
 *   node scripts/optimize-images.mjs --categories # category images only
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import sharp from 'sharp';

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'assets', 'raw');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images');

const FAVICONS_ONLY   = process.argv.includes('--favicons');
const CATEGORIES_ONLY = process.argv.includes('--categories');

// ── Config per subfolder ──────────────────────────────────────────────────────
const CONFIG = {
  categories:   { width: 800,  height: 400, quality: 76, fit: 'cover'   },
  branding:     { width: 1200, height: 630, quality: 82, fit: 'inside'  },
  placeholders: { width: 300,  height: 450, quality: 80, fit: 'cover'   },
  default:      { width: 1200, height: 630, quality: 80, fit: 'inside'  },
};

function inferType(file) {
  const rel = file.replace(/\\/g, '/');
  for (const key of Object.keys(CONFIG)) {
    if (rel.includes(`/${key}/`)) return key;
  }
  return 'default';
}

function outputPathFor(file) {
  const rel = path.relative(INPUT_DIR, file);
  const parsed = path.parse(rel);
  return path.join(OUTPUT_DIR, parsed.dir, `${parsed.name}.webp`);
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function processFile(file) {
  const type = inferType(file);
  const cfg = CONFIG[type];
  const out = outputPathFor(file);
  await ensureDir(out);

  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();

  await img
    .rotate()
    .resize({ width: cfg.width, height: cfg.height, fit: cfg.fit, position: 'center', withoutEnlargement: true })
    .webp({ quality: cfg.quality, effort: 6 })
    .toFile(out);

  const stat = await fs.stat(out);
  const kb = Math.round(stat.size / 1024);
  console.log(`[ok] ${path.relative(ROOT, file)} → ${path.relative(ROOT, out)} (${meta.width}×${meta.height} → ${cfg.width}×${cfg.height}, ${kb} KB)`);
}

// ── Favicon set from public/favicon.png ──────────────────────────────────────
async function generateFavicons() {
  const src = path.join(ROOT, 'public', 'favicon.png');
  try { await fs.access(src); } catch { console.error('Missing public/favicon.png'); return; }

  // Source favicon should be transparent PNG — use directly
  const img = sharp(src, { failOn: 'none' });

  const DARK_GOLD = { r: 26, g: 18, b: 0 };

  // 16×16 + 32×32 — dark gold background for tab visibility
  for (const size of [16, 32]) {
    const favResized = await img.clone().resize(size, size).png().toBuffer();
    const bg = await sharp({ create: { width: size, height: size, channels: 3, background: DARK_GOLD } }).png().toBuffer();
    await sharp(bg).composite([{ input: favResized }]).png().toFile(path.join(ROOT, 'public', `favicon-${size}x${size}.png`));
    console.log(`[ok] favicon-${size}x${size}.png (dark gold bg)`);
  }
  // 180×180 apple-touch-icon — transparent (Apple adds its own rounded bg)
  await img.clone().resize(180, 180).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
  console.log('[ok] apple-touch-icon.png (transparent)');

  // nav-logo — trim logo.png transparent padding, resize to 160px height
  const logoSrc = path.join(ROOT, 'public', 'logo.png');
  try {
    await fs.access(logoSrc);
    await sharp(logoSrc, { failOn: 'none' })
      .trim()
      .resize(null, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(ROOT, 'public', 'nav-logo.png'));
    console.log('[ok] nav-logo.png (trimmed from logo.png)');
  } catch { console.log('[skip] logo.png not found — nav-logo.png not generated'); }
  // og-default.png — resize ogimage.png to 1200×630 and rename (OG needs PNG/JPEG, not WebP)
  const ogSrc = path.join(ROOT, 'public', 'ogimage.png');
  try {
    await fs.access(ogSrc);
    await sharp(ogSrc, { failOn: 'none' })
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'center', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 8 })
      .toFile(path.join(ROOT, 'public', 'og-default.png'));
    const stat = await fs.stat(path.join(ROOT, 'public', 'og-default.png'));
    console.log(`[ok] ogimage.png → og-default.png (1200×630, ${Math.round(stat.size / 1024)} KB)`);
  } catch { console.log('[skip] ogimage.png not found'); }

  console.log('[ok] favicon-16x16.png');
  console.log('[ok] favicon-32x32.png');
  console.log('[ok] apple-touch-icon.png (180×180)');
  console.log('\nAdd these to Layout.astro <head>:');
  console.log('  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />');
  console.log('  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />');
  console.log('  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />');
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (FAVICONS_ONLY) {
    await generateFavicons();
    return;
  }

  const files = await fg(['**/*.{png,jpg,jpeg,webp,avif}'], { cwd: INPUT_DIR, absolute: true });

  if (!files.length && !CATEGORIES_ONLY) {
    console.log('No source images found in assets/raw/');
    console.log('Place images in:');
    console.log('  assets/raw/categories/  → category images (800×400 output)');
    console.log('  assets/raw/branding/    → logo, og (1200×630 output)');
    console.log('  assets/raw/placeholders/ → book cover placeholders (300×450 output)');
    console.log('\nFor favicons only, run: node scripts/optimize-images.mjs --favicons');
    return;
  }

  const toProcess = CATEGORIES_ONLY
    ? files.filter((f) => f.replace(/\\/g, '/').includes('/categories/'))
    : files;

  await Promise.all(toProcess.map(processFile));
  await generateFavicons();
  console.log(`\nDone. Optimized ${toProcess.length} images + favicon set.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
