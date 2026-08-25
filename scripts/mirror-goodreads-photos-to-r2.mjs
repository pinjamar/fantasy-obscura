/**
 * mirror-goodreads-photos-to-r2.mjs
 *
 * Same fix as mirror-covers-to-r2.mjs and mirror-ol-redirects-to-r2.mjs,
 * applied to a third pattern: covers hotlinked from Amazon's media CDN
 * serving Goodreads-sourced photos (m.media-amazon.com or i.gr-assets.com,
 * both under a /compressed.photo.goodreads.com/ path). These aren't blocked
 * by robots.txt and load fine on direct request, but Googlebot has reported
 * "Other error" fetching them — inconsistent/slow behavior toward crawlers
 * on Amazon's infrastructure that we can't diagnose or fix. Same lesson as
 * the other two: any hotlinked third-party host is a single point of
 * failure for crawlers. Mirror to our own R2 bucket instead.
 *
 * Usage:
 *   node scripts/mirror-goodreads-photos-to-r2.mjs --dry-run
 *   node scripts/mirror-goodreads-photos-to-r2.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 300;

const REQUIRED_ENV = [
  'PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY',
  'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_URL',
];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) { console.error(`Missing ${key} in .env`); process.exit(1); }
}

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
});
const PUBLIC_URL = process.env.R2_PUBLIC_URL.replace(/\/$/, '');
const BUCKET = process.env.R2_BUCKET_NAME;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function extFromContentType(ct) {
  if (!ct) return 'jpg';
  if (ct.includes('png')) return 'png';
  if (ct.includes('webp')) return 'webp';
  return 'jpg';
}

async function main() {
  const { data: books, error } = await supabase
    .from('books')
    .select('id, slug, title, cover_url')
    .or('cover_url.ilike.%compressed.photo.goodreads.com%,cover_url.ilike.%m.media-amazon.com%');
  if (error) { console.error(error); process.exit(1); }

  console.log(`\n📦 Mirroring Amazon/Goodreads-hosted covers to R2${DRY_RUN ? ' [DRY RUN]' : ''}\n`);
  console.log(`Total in scope: ${books.length}\n`);

  let uploaded = 0, failed = 0;

  for (const book of books) {
    process.stdout.write(`  "${book.title}" … `);
    try {
      const res = await fetch(book.cover_url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FantasyObscuraCoverMirror/1.0)' },
      });
      if (!res.ok) {
        console.log(`✗ fetch failed (${res.status})`);
        failed++; await sleep(DELAY_MS); continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      if (!buffer.length) {
        console.log('✗ empty response');
        failed++; await sleep(DELAY_MS); continue;
      }
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      const ext = extFromContentType(contentType);
      const key = `covers/${book.slug}.${ext}`;
      const newUrl = `${PUBLIC_URL}/${key}`;

      if (DRY_RUN) {
        console.log(`[dry-run] → ${newUrl} (${(buffer.length / 1024).toFixed(0)}KB)`);
        uploaded++; await sleep(DELAY_MS); continue;
      }

      await r2.send(new PutObjectCommand({
        Bucket: BUCKET, Key: key, Body: buffer, ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      const { error: updateErr } = await supabase.from('books').update({ cover_url: newUrl }).eq('id', book.id);
      if (updateErr) { console.log(`✗ DB update failed: ${updateErr.message}`); failed++; }
      else { console.log(`✓ ${newUrl}`); uploaded++; }
    } catch (err) {
      console.log(`✗ error: ${err.message}`);
      failed++;
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n✅ Done — uploaded: ${uploaded} | failed: ${failed}\n`);
}

main().catch((err) => { console.error(err); process.exit(1); });
