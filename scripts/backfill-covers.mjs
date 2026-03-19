/**
 * backfill-covers.mjs
 *
 * Finds books in the DB with missing or bad cover URLs, queries the
 * Google Books API by ISBN, and updates cover_url with a high-res image.
 *
 * Usage:
 *   node scripts/backfill-covers.mjs           (patch all missing covers)
 *   node scripts/backfill-covers.mjs --dry-run (preview only, no writes)
 *   node scripts/backfill-covers.mjs --all     (also replace archive.org / openlibrary URLs)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.PUBLIC_SUPABASE_ANON_KEY,
);

const DRY_RUN = process.argv.includes('--dry-run');
const ALL = process.argv.includes('--all'); // also replace bad URLs, not just nulls

function isBadCover(url) {
  if (!url) return true;
  if (url.includes('archive.org')) return true;
  if (url.includes('covers.openlibrary.org')) return true;
  return false;
}

function toHighRes(url) {
  if (!url) return null;
  if (url.includes('books.google.com/books/content')) {
    const m = url.match(/[?&]id=([^&]+)/);
    if (m) return `https://books.google.com/books/publisher/content/images/frontcover/${m[1]}?fife=w400-h600`;
  }
  if (url.includes('books.google.com/books/publisher/content')) return url;
  return null;
}

async function fetchGoogleBooksCover(isbn, title, authors) {
  const queries = [];
  if (isbn) queries.push(`isbn:${isbn}`);
  if (title) {
    const authorStr = Array.isArray(authors) ? authors[0] : authors;
    if (authorStr) queries.push(`intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(authorStr)}`);
    else queries.push(`intitle:${encodeURIComponent(title)}`);
  }

  for (const q of queries) {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`);
      if (!res.ok) continue;
      const data = await res.json();
      const item = data.items?.[0];
      if (!item) continue;
      const thumb = item.volumeInfo?.imageLinks?.thumbnail
        ?? item.volumeInfo?.imageLinks?.smallThumbnail;
      const cover = toHighRes(thumb) ?? null;
      if (cover) return cover;
    } catch {
      continue;
    }
  }
  return null;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Fetch books needing covers
let query = supabase.from('books').select('id, slug, title, isbn, authors, cover_url');
if (!ALL) {
  query = query.is('cover_url', null);
} else {
  // fetch all and filter client-side (Supabase can't OR across LIKE patterns easily)
  // We'll over-fetch and filter below
}

const { data: books, error } = await query.order('title');
if (error) { console.error('DB error:', error.message); process.exit(1); }

const targets = ALL
  ? books.filter((b) => isBadCover(b.cover_url))
  : books;

console.log(`Found ${targets.length} books needing covers${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

let updated = 0;
let skipped = 0;

for (const book of targets) {
  const cover = await fetchGoogleBooksCover(book.isbn, book.title, book.authors);
  if (!cover) {
    console.log(`  ✗ ${book.title} — no cover found (isbn: ${book.isbn ?? 'none'})`);
    skipped++;
  } else {
    console.log(`  ✓ ${book.title}`);
    console.log(`    ${cover}`);
    if (!DRY_RUN) {
      const { error: updateErr } = await supabase
        .from('books')
        .update({ cover_url: cover })
        .eq('id', book.id);
      if (updateErr) console.error(`    ERROR: ${updateErr.message}`);
      else updated++;
    }
  }
  // Respect Google Books API rate limit (~1 req/sec is safe)
  await sleep(200);
}

console.log(`\nDone. Updated: ${updated}, No cover found: ${skipped}`);
if (DRY_RUN) console.log('(Dry run — no changes written)');
