/**
 * update-author-stats.mjs
 *
 * Scans all books, computes per-author stats, and upserts them into the
 * `authors` table (book_count, top_genres, avg_rating).
 * Also inserts a basic row for any author who has books but no authors entry yet.
 *
 * Run after adding books or updating author data:
 *   node scripts/update-author-stats.mjs
 *   node scripts/update-author-stats.mjs --dry-run
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Mirrors authorToSlug from src/lib/db/books.ts
function authorToSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── 1. Fetch all books (paginated) ───────────────────────────────────────────
console.log('Fetching all books...');
const PAGE = 1000;
let allBooks = [];
let offset = 0;
while (true) {
  const { data, error } = await supabase
    .from('books')
    .select('authors, subgenres, avg_rating')
    .range(offset, offset + PAGE - 1);
  if (error) { console.error('Error fetching books:', error.message); process.exit(1); }
  if (!data || data.length === 0) break;
  allBooks.push(...data);
  if (data.length < PAGE) break;
  offset += PAGE;
}
console.log(`  ${allBooks.length} books loaded.`);

// ── 2. Aggregate stats per author ────────────────────────────────────────────
const authorMap = new Map();

for (const book of allBooks) {
  for (const name of (book.authors ?? [])) {
    if (!name) continue;
    if (!authorMap.has(name)) {
      authorMap.set(name, { bookCount: 0, genres: new Map(), ratings: [] });
    }
    const entry = authorMap.get(name);
    entry.bookCount++;
    if (book.avg_rating != null) entry.ratings.push(book.avg_rating);
    for (const g of (book.subgenres ?? [])) {
      entry.genres.set(g, (entry.genres.get(g) ?? 0) + 1);
    }
  }
}

console.log(`  ${authorMap.size} distinct authors found in books.`);

// ── 3. Build upsert rows, deduplicating by slug ──────────────────────────────
// Multiple author name variants (e.g. "J.K. Rowling" vs "J.K Rowling") can
// produce the same slug. Merge them so we never upsert the same slug twice.
const slugMap = new Map();
for (const [name, entry] of authorMap) {
  const slug = authorToSlug(name);
  if (slugMap.has(slug)) {
    // Merge into existing entry — keep the name with more books
    const existing = slugMap.get(slug);
    if (entry.bookCount > existing.bookCount) existing.name = name;
    existing.bookCount += entry.bookCount;
    existing.ratings.push(...entry.ratings);
    for (const [g, count] of entry.genres) {
      existing.genres.set(g, (existing.genres.get(g) ?? 0) + count);
    }
  } else {
    slugMap.set(slug, { name, slug, bookCount: entry.bookCount, genres: entry.genres, ratings: entry.ratings });
  }
}

const rows = [];
for (const [slug, entry] of slugMap) {
  const top_genres = [...entry.genres.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([g]) => g);
  const avg_rating = entry.ratings.length > 0
    ? Math.round((entry.ratings.reduce((a, b) => a + b, 0) / entry.ratings.length) * 100) / 100
    : null;
  rows.push({
    name: entry.name,
    slug,
    book_count: entry.bookCount,
    top_genres,
    avg_rating,
  });
}

// ── 4. Upsert into authors table ─────────────────────────────────────────────
if (DRY_RUN) {
  console.log('\n[DRY RUN] Would upsert:');
  rows.slice(0, 5).forEach((r) =>
    console.log(`  ${r.name} (${r.slug}) — ${r.book_count} books, rating: ${r.avg_rating}, genres: ${r.top_genres.join(', ')}`),
  );
  console.log(`  ... and ${rows.length - 5} more`);
  process.exit(0);
}

// Upsert in batches of 100
const BATCH = 100;
let updated = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await supabase
    .from('authors')
    .upsert(batch, { onConflict: 'slug', ignoreDuplicates: false });
  if (error) {
    console.error(`Error upserting batch ${i}–${i + BATCH}:`, error.message);
    process.exit(1);
  }
  updated += batch.length;
  process.stdout.write(`\r  Upserted ${updated}/${rows.length} authors...`);
}

console.log(`\nDone. ${rows.length} authors updated in the authors table.`);
console.log('Run this script again whenever you add new books.');
