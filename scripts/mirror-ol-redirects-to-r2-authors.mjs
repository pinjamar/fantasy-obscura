/**
 * mirror-ol-redirects-to-r2-authors.mjs
 *
 * Same fix as mirror-ol-redirects-to-r2.mjs, applied to author photos
 * instead of book covers. Targets the list built by
 * scan-ol-redirects-authors.mjs (scripts/.ol-redirect-scope-authors.json).
 * Stored under authors/<slug>.<ext> in the same R2 bucket, kept separate
 * from covers/ for clarity.
 *
 * Usage:
 *   node scripts/mirror-ol-redirects-to-r2-authors.mjs --limit=10
 *   node scripts/mirror-ol-redirects-to-r2-authors.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import fs from 'fs';

config();

const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : null;
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
  const scope = JSON.parse(fs.readFileSync('./scripts/.ol-redirect-scope-authors.json', 'utf8'));
  const batch = LIMIT ? scope.slice(0, LIMIT) : scope;
  console.log(`\n📦 Mirroring OpenLibrary redirect-chain author photos to R2${LIMIT ? ` [limit ${LIMIT}]` : ''}\n`);
  console.log(`Total in scope: ${scope.length} | processing: ${batch.length}\n`);

  let uploaded = 0, failed = 0;

  for (const author of batch) {
    process.stdout.write(`  "${author.name}" … `);
    try {
      const res = await fetch(author.photo_url, {
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
      const key = `authors/${author.slug}.${ext}`;
      const newUrl = `${PUBLIC_URL}/${key}`;

      await r2.send(new PutObjectCommand({
        Bucket: BUCKET, Key: key, Body: buffer, ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      const { error: updateErr } = await supabase.from('authors').update({ photo_url: newUrl }).eq('id', author.id);
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
