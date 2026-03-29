/**
 * update-covers.mjs
 *
 * Updates cover_url for all books in the DB.
 * Priority: Google Books API → Open Library
 * Skips books that already have a cover unless --force is passed.
 *
 * Usage:
 *   node scripts/update-covers.mjs            (only books missing covers)
 *   node scripts/update-covers.mjs --force     (refresh all covers)
 *   node scripts/update-covers.mjs --dry-run   (preview without writing)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE   = process.argv.includes('--force');
const DELAY_MS = 400;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('Missing GOOGLE_BOOKS_API_KEY in .env');
  process.exit(1);
}

const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchGoogleBooksCover(title, authors) {
  const author = Array.isArray(authors) ? authors[0] : (authors ?? '');
  const queries = [
    `intitle:${title} inauthor:${author}`,
    `${title} ${author}`,
    title,
  ];
  for (const query of queries) {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=1&printType=books&key=${GOOGLE_BOOKS_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const item = data.items?.[0]?.volumeInfo;
      if (!item) continue;
      const thumb =
        item.imageLinks?.extraLarge ??
        item.imageLinks?.large ??
        item.imageLinks?.medium ??
        item.imageLinks?.thumbnail ??
        null;
      if (!thumb) continue;
      return thumb.replace(/^http:/, 'https:').replace('&edge=curl', '');
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchOpenLibraryCover(title, authors) {
  const author = Array.isArray(authors) ? authors[0] : (authors ?? '');
  const q = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=1&fields=cover_i`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const doc = data.docs?.[0];
    if (!doc?.cover_i) return null;
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
  } catch {
    return null;
  }
}

async function main() {
  console.log(`\n🖼️  Fantasy Obscura — Cover Updater${DRY_RUN ? ' [DRY RUN]' : ''}${FORCE ? ' [FORCE]' : ''}\n`);

  // Fetch all books (paginated to bypass Supabase 1000-row cap)
  const books = [];
  {
    const PAGE = 1000;
    let offset = 0;
    while (true) {
      const { data, error } = await supabase
        .from('books')
        .select('id, title, authors, cover_url')
        .order('title')
        .range(offset, offset + PAGE - 1);
      if (error) { console.error('Supabase error:', error.message); process.exit(1); }
      if (!data?.length) break;
      books.push(...data);
      if (data.length < PAGE) break;
      offset += PAGE;
    }
  }

  const targets = FORCE ? books : books.filter((b) => !b.cover_url);
  console.log(`Total books: ${books.length} | To process: ${targets.length}\n`);

  let updated = 0;
  let skipped = 0;
  let failed  = 0;

  for (const book of targets) {
    process.stdout.write(`  "${book.title}" … `);

    const gbCover = await fetchGoogleBooksCover(book.title, book.authors);
    await sleep(DELAY_MS);

    let cover_url = gbCover;
    let source = 'Google Books';

    if (!cover_url) {
      cover_url = await fetchOpenLibraryCover(book.title, book.authors);
      await sleep(DELAY_MS);
      source = 'Open Library';
    }

    if (!cover_url) {
      console.log('✗ no cover found');
      failed++;
      continue;
    }

    // Skip if cover hasn't changed
    if (!FORCE && book.cover_url === cover_url) {
      console.log('= unchanged');
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`[dry-run] → ${source}`);
      updated++;
      continue;
    }

    const { error: updateErr } = await supabase
      .from('books')
      .update({ cover_url })
      .eq('id', book.id);

    if (updateErr) {
      console.log(`✗ DB error: ${updateErr.message}`);
      failed++;
    } else {
      console.log(`✓ ${source}`);
      updated++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n✅ Done — updated: ${updated} | skipped: ${skipped} | failed: ${failed}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
