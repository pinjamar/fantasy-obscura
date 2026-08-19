/**
 * mirror-cover.mjs
 *
 * Shared helper: given a raw cover_url from Google Books / OpenLibrary /
 * anywhere else, download it once and re-host it in the grimoire-covers R2
 * bucket, returning the new public URL. Every script that writes cover_url
 * to the DB should route the value through this first — that's what keeps
 * Googlebot-blocked hotlinks (books.google.com) from creeping back in.
 *
 * Safe to call with a URL that's already on our own R2 domain (no-op,
 * returned unchanged) or with null/empty (returned unchanged).
 * On any fetch/upload failure, logs a warning and returns the original URL
 * rather than throwing — a cover-mirroring hiccup should never be the thing
 * that crashes an ingestion script.
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const REQUIRED_ENV = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_PUBLIC_URL',
];

let r2Client = null;
let r2Ready = false;

function ensureR2() {
  if (r2Client) return r2Ready;
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) {
    console.warn(`⚠️  mirror-cover: missing ${missing.join(', ')} in .env — covers will NOT be mirrored to R2 this run.`);
    r2Ready = false;
    return false;
  }
  r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  r2Ready = true;
  return true;
}

function extFromContentType(ct) {
  if (!ct) return 'jpg';
  if (ct.includes('png')) return 'png';
  if (ct.includes('webp')) return 'webp';
  return 'jpg';
}

/**
 * @param {string|null|undefined} url - the cover URL a script is about to write to the DB
 * @param {string} slug - the book's slug, used as the R2 object key
 * @returns {Promise<string|null>} the R2 public URL, or the original url if mirroring wasn't possible
 */
export async function mirrorCoverToR2(url, slug) {
  if (!url) return url ?? null;
  if (!slug) return url; // can't build a stable key without a slug — leave as-is

  const publicBase = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');
  if (publicBase && url.startsWith(publicBase)) return url; // already mirrored

  if (!ensureR2()) return url;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FantasyObscuraCoverMirror/1.0)' },
    });
    if (!res.ok) {
      console.warn(`⚠️  mirror-cover: fetch failed (${res.status}) for "${slug}" — keeping original URL.`);
      return url;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    if (!buffer.length) {
      console.warn(`⚠️  mirror-cover: empty response for "${slug}" — keeping original URL.`);
      return url;
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const ext = extFromContentType(contentType);
    const key = `covers/${slug}.${ext}`;

    await r2Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    return `${publicBase}/${key}`;
  } catch (err) {
    console.warn(`⚠️  mirror-cover: error mirroring cover for "${slug}": ${err.message} — keeping original URL.`);
    return url;
  }
}
