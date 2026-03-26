/**
 * backfill-isbn.mjs
 *
 * Fills missing ISBN values for books in the DB using two sources:
 *
 *   1. Open Library  — searched by title + author, no API key needed
 *   2. Google Books  — searched by title + author, falls back from OL
 *
 * Prefers ISBN-13 over ISBN-10. Only writes if a confident title+author
 * match is found — never guesses.
 *
 * Usage:
 *   node scripts/backfill-isbn.mjs                (fill all books with isbn = null)
 *   node scripts/backfill-isbn.mjs --dry-run       (preview, no writes)
 *   node scripts/backfill-isbn.mjs --limit 200     (cap number of books processed)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN  = process.argv.includes('--dry-run');
const limitIdx = process.argv.indexOf('--limit');
const LIMIT    = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : null;
const DELAY_MS = 350;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars'); process.exit(1);
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Matching helpers (same logic as add-books.mjs) ────────────────────────────

function olAuthorMatches(olAuthorNames, expectedAuthor) {
  if (!expectedAuthor || !olAuthorNames?.length) return false;
  const norm = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const expParts = norm(expectedAuthor).split(/\s+/);
  const expLast  = expParts[expParts.length - 1];
  return olAuthorNames.some((name) => {
    const n = norm(name);
    const nParts = n.split(/\s+/);
    return n.includes(expLast) || expParts.some((p) => nParts.includes(p));
  });
}

function olTitleMatches(olTitle, queryTitle) {
  if (!olTitle || !queryTitle) return false;
  const STOP = new Set(['the','a','an','and','or','of','in','to','for','its','is','by']);
  const sig = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  const olWords    = new Set(sig(olTitle));
  const queryWords = sig(queryTitle);
  if (queryWords.length === 0) return true;
  const overlap = queryWords.filter((w) => olWords.has(w)).length;
  return overlap / queryWords.length >= 0.6;
}

// Pick ISBN-13 over ISBN-10 from an array of identifier strings
function bestIsbn(isbns) {
  if (!isbns?.length) return null;
  const isbn13 = isbns.find(i => /^\d{13}$/.test(i));
  if (isbn13) return isbn13;
  const isbn10 = isbns.find(i => /^\d{10}$/.test(i));
  return isbn10 ?? null;
}

// ── Source 1: Open Library ────────────────────────────────────────────────────

async function fetchIsbnOpenLibrary(title, author) {
  const q = encodeURIComponent(`${title} ${author ?? ''}`);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=5&fields=isbn,author_name,title`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const doc = (data.docs ?? []).find((d) =>
      olTitleMatches(d.title, title) && (!author || olAuthorMatches(d.author_name, author))
    ) ?? null;
    if (!doc) return null;
    return bestIsbn(doc.isbn);
  } catch {
    return null;
  }
}

// ── Source 2: Google Books ────────────────────────────────────────────────────

async function fetchIsbnGoogleBooks(title, author) {
  if (!process.env.GOOGLE_BOOKS_API_KEY) return null;
  const q = author
    ? `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`
    : `intitle:${encodeURIComponent(title)}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=3&key=${process.env.GOOGLE_BOOKS_API_KEY}&fields=items(volumeInfo(title,authors,industryIdentifiers))`;
  try {
    const res = await fetch(url);
    if (res.status === 429) { console.log('\n⚠️  Google Books quota hit — skipping GB for this run'); return null; }
    if (!res.ok) return null;
    const data = await res.json();
    const normTitle = title.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const item = (data.items ?? []).find((i) => {
      const t = (i.volumeInfo?.title ?? '').toLowerCase().replace(/[^a-z0-9\s]/g, '');
      return t.includes(normTitle.slice(0, 20)) || normTitle.includes(t.slice(0, 20));
    });
    if (!item) return null;
    const ids = item.volumeInfo?.industryIdentifiers ?? [];
    const isbn13 = ids.find(i => i.type === 'ISBN_13')?.identifier;
    const isbn10 = ids.find(i => i.type === 'ISBN_10')?.identifier;
    return isbn13 ?? isbn10 ?? null;
  } catch {
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`\n📚 Backfill ISBN${DRY_RUN ? ' [DRY RUN]' : ''}${LIMIT ? ` [limit ${LIMIT}]` : ''}\n`);

let query = supabase
  .from('books')
  .select('slug, title, authors')
  .is('isbn', null)
  .order('title');

if (LIMIT) query = query.limit(LIMIT);

const { data: books, error } = await query;
if (error) { console.error('DB error:', error.message); process.exit(1); }

console.log(`Books missing ISBN: ${books.length}\n`);

let filled = 0;
let notFound = 0;

for (const book of books) {
  const author = book.authors?.[0] ?? null;
  process.stdout.write(`  "${book.title}" … `);

  let isbn = await fetchIsbnOpenLibrary(book.title, author);
  await sleep(DELAY_MS);

  if (!isbn) {
    isbn = await fetchIsbnGoogleBooks(book.title, author);
    await sleep(DELAY_MS);
  }

  if (!isbn) {
    console.log('not found');
    notFound++;
    continue;
  }

  if (DRY_RUN) {
    console.log(`${isbn} (dry run)`);
    filled++;
    continue;
  }

  const { error: updateError } = await supabase
    .from('books')
    .update({ isbn })
    .eq('slug', book.slug);

  if (updateError) { console.log(`✗ ${updateError.message}`); }
  else { console.log(`✓ ${isbn}`); filled++; }
}

console.log(`\n✅ Filled: ${filled} | Not found: ${notFound}`);
