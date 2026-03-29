/**
 * backfill-metadata.mjs
 *
 * Fills missing page_count and/or publication_year for books in the DB
 * using the Hardcover API as the primary source.
 *
 * Usage:
 *   node scripts/backfill-metadata.mjs              (fill all nulls)
 *   node scripts/backfill-metadata.mjs --dry-run
 *   node scripts/backfill-metadata.mjs --pages-only
 *   node scripts/backfill-metadata.mjs --year-only
 *   node scripts/backfill-metadata.mjs --limit 100
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fetchHardcoverBook } from './lib/hardcover.mjs';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const PAGES_ONLY = process.argv.includes('--pages-only');
const YEAR_ONLY  = process.argv.includes('--year-only');
const limitIdx   = process.argv.indexOf('--limit');
const LIMIT      = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : null;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`\n📖 backfill-metadata — Hardcover${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  if (!process.env.HARDCOVER_API_KEY) {
    console.error('Missing HARDCOVER_API_KEY in .env'); process.exit(1);
  }

  // Fetch books missing pages or year
  const PAGE = 1000;
  const books = [];
  let offset = 0;
  while (true) {
    let q = supabase
      .from('books')
      .select('id, title, authors, page_count, publication_year')
      .order('title')
      .range(offset, offset + PAGE - 1);

    if (!YEAR_ONLY)  q = q.or('page_count.is.null,publication_year.is.null');
    else             q = q.is('publication_year', null);

    const { data, error } = await q;
    if (error) { console.error('DB error:', error.message); process.exit(1); }
    if (!data?.length) break;
    books.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }

  // Apply CLI limit
  const targets = LIMIT ? books.slice(0, LIMIT) : books;
  console.log(`Found ${targets.length} books to check\n`);

  let updated = 0, skipped = 0, notFound = 0;

  for (let i = 0; i < targets.length; i++) {
    const book = targets[i];
    process.stdout.write(`\r   ${i + 1}/${targets.length} — ${book.title.slice(0, 50).padEnd(50)}`);

    const hc = await fetchHardcoverBook(book.title, book.authors);
    await sleep(300);

    if (!hc) { notFound++; continue; }

    const update = {};
    if (!YEAR_ONLY  && !book.page_count       && hc.pages        ) update.page_count        = hc.pages;
    if (!PAGES_ONLY && !book.publication_year && hc.release_year ) update.publication_year  = hc.release_year;

    if (!Object.keys(update).length) { skipped++; continue; }

    if (DRY_RUN) {
      const parts = [];
      if (update.page_count)       parts.push(`pages: ${update.page_count}`);
      if (update.publication_year) parts.push(`year: ${update.publication_year}`);
      console.log(`\n  [dry] ${book.title} → ${parts.join(', ')}`);
      updated++;
      continue;
    }

    const { error } = await supabase.from('books').update(update).eq('id', book.id);
    if (error) {
      console.log(`\n  ✗ ${book.title}: ${error.message}`);
    } else {
      const parts = [];
      if (update.page_count)       parts.push(`pages: ${update.page_count}`);
      if (update.publication_year) parts.push(`year: ${update.publication_year}`);
      console.log(`\n  ✓ ${book.title} — ${parts.join(', ')}`);
      updated++;
    }
  }

  console.log(`\n\n──────────────────────────────`);
  console.log(`✅ Updated  : ${updated}`);
  console.log(`⏭  Already set: ${skipped}`);
  console.log(`✗  Not found : ${notFound}`);
}

main().catch((err) => { console.error('Fatal:', err.message); process.exit(1); });
