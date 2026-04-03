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
import { fetchHardcoverBook } from './lib/hardcover.mjs';

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

function isbn13toAmazonUrl(isbn13) {
  if (!isbn13 || isbn13.length !== 13) return null;
  const digits = isbn13.replace(/[^0-9]/g, '');
  if (digits.length !== 13 || !digits.startsWith('978')) return null;
  const core = digits.slice(3, 12); // 9 digits
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(core[i]) * (10 - i);
  const check = (11 - (sum % 11)) % 11;
  const isbn10 = core + (check === 10 ? 'X' : String(check));
  return `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.L.jpg`;
}

async function fetchAmazonCover(isbn13) {
  const url = isbn13toAmazonUrl(isbn13);
  if (!url) return null;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const size = parseInt(res.headers.get('content-length') ?? '0');
    return (res.ok && size > 5000) ? url : null;
  } catch {
    return null;
  }
}

async function fetchOpenLibraryCover(isbn) {
  try {
    const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    if (!res.ok) return null;
    const data = await res.json();
    const entry = Object.values(data)[0];
    const large = entry?.cover?.large;
    if (!large) return null;
    const m = large.match(/\/b\/id\/(\d+)/);
    return m ? `https://covers.openlibrary.org/b/id/${m[1]}-L.jpg` : null;
  } catch {
    return null;
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Fetch books needing covers (paginated to bypass Supabase 1000-row cap)
const books = [];
{
  const PAGE = 1000;
  let offset = 0;
  while (true) {
    let q = supabase.from('books').select('id, slug, title, isbn, authors, cover_url').order('title');
    if (!ALL) q = q.is('cover_url', null);
    q = q.range(offset, offset + PAGE - 1);
    const { data, error } = await q;
    if (error) { console.error('DB error:', error.message); process.exit(1); }
    if (!data?.length) break;
    books.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
}

const targets = ALL
  ? books.filter((b) => isBadCover(b.cover_url))
  : books;

console.log(`Found ${targets.length} books needing covers${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

let updated = 0;
let skipped = 0;

for (const book of targets) {
  let cover = await fetchGoogleBooksCover(book.isbn, book.title, book.authors);
  await sleep(200);

  // Hardcover fallback
  if (!cover) {
    const hc = await fetchHardcoverBook(book.title, book.authors);
    cover = hc?.cover_url ?? null;
    if (cover) console.log(`  [HC] ${book.title}`);
    await sleep(300);
  }

  // Amazon fallback (works well for indie/self-published books)
  if (!cover && book.isbn) {
    cover = await fetchAmazonCover(book.isbn);
    if (cover) console.log(`  [Amazon] ${book.title}`);
    await sleep(200);
  }

  // Open Library fallback (good for older/obscure titles)
  if (!cover && book.isbn) {
    cover = await fetchOpenLibraryCover(book.isbn);
    if (cover) console.log(`  [OL] ${book.title}`);
    await sleep(400);
  }

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
}

console.log(`\nDone. Updated: ${updated}, No cover found: ${skipped}`);
if (DRY_RUN) console.log('(Dry run — no changes written)');
