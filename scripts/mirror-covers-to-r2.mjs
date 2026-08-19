/**
 * mirror-covers-to-r2.mjs
 *
 * One-time (re-runnable) migration: for every book whose cover_url points at
 * books.google.com (a host that blocks Googlebot via robots.txt), download
 * the existing cover image once and re-host it in the grimoire-covers R2
 * bucket, then repoint cover_url at the R2 public URL. Same image, different
 * host — nothing changes visually, but Google can now actually fetch it.
 *
 * Usage:
 *   node scripts/mirror-covers-to-r2.mjs --limit=20         (small test batch)
 *   node scripts/mirror-covers-to-r2.mjs                    (all remaining books.google.com covers)
 *   node scripts/mirror-covers-to-r2.mjs --dry-run --limit=20
 */

import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : null;
const DELAY_MS = 300;

const REQUIRED_ENV = [
  'PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_PUBLIC_URL',
];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in .env`);
    process.exit(1);
  }
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const PUBLIC_URL = process.env.R2_PUBLIC_URL.replace(/\/$/, '');
const BUCKET = process.env.R2_BUCKET_NAME;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extFromContentType(ct) {
  if (!ct) return 'jpg';
  if (ct.includes('png')) return 'png';
  if (ct.includes('webp')) return 'webp';
  return 'jpg';
}

async function main() {
  console.log(`\n📦 Fantasy Obscura — Mirror Google Books covers to R2${DRY_RUN ? ' [DRY RUN]' : ''}${LIMIT ? ` [limit ${LIMIT}]` : ''}\n`);

  // Fetch all books whose cover still points at books.google.com (paginated)
  const targets = [];
  {
    const PAGE = 1000;
    let offset = 0;
    while (true) {
      const { data, error } = await supabase
        .from('books')
        .select('id, slug, title, cover_url')
        .ilike('cover_url', '%books.google.com%')
        .order('title')
        .range(offset, offset + PAGE - 1);
      if (error) { console.error('Supabase error:', error.message); process.exit(1); }
      if (!data?.length) break;
      targets.push(...data);
      if (LIMIT && targets.length >= LIMIT) break;
      if (data.length < PAGE) break;
      offset += PAGE;
    }
  }

  const batch = LIMIT ? targets.slice(0, LIMIT) : targets;
  console.log(`Books with a Google Books cover: ${targets.length}${LIMIT ? ` | processing: ${batch.length}` : ''}\n`);

  let uploaded = 0;
  let failed = 0;

  for (const book of batch) {
    process.stdout.write(`  "${book.title}" … `);

    try {
      const res = await fetch(book.cover_url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FantasyObscuraCoverMirror/1.0)' },
      });
      if (!res.ok) {
        console.log(`✗ fetch failed (${res.status})`);
        failed++;
        await sleep(DELAY_MS);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      if (!buffer.length) {
        console.log('✗ empty response');
        failed++;
        await sleep(DELAY_MS);
        continue;
      }

      const contentType = res.headers.get('content-type') || 'image/jpeg';
      const ext = extFromContentType(contentType);
      const key = `covers/${book.slug}.${ext}`;
      const newUrl = `${PUBLIC_URL}/${key}`;

      if (DRY_RUN) {
        console.log(`[dry-run] → ${newUrl} (${(buffer.length / 1024).toFixed(0)}KB)`);
        uploaded++;
        await sleep(DELAY_MS);
        continue;
      }

      await r2.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      const { error: updateErr } = await supabase
        .from('books')
        .update({ cover_url: newUrl })
        .eq('id', book.id);

      if (updateErr) {
        console.log(`✗ DB update failed: ${updateErr.message}`);
        failed++;
      } else {
        console.log(`✓ ${newUrl}`);
        uploaded++;
      }
    } catch (err) {
      console.log(`✗ error: ${err.message}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n✅ Done — uploaded: ${uploaded} | failed: ${failed}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
