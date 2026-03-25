/**
 * cleanup-recent.mjs
 *
 * Lists and optionally deletes books added to the DB within the last N hours.
 * Use this to roll back a bad discover run.
 *
 * Usage:
 *   node scripts/cleanup-recent.mjs              (list books added in last 2h)
 *   node scripts/cleanup-recent.mjs --hours 4    (last 4 hours)
 *   node scripts/cleanup-recent.mjs --delete     (delete them)
 *   node scripts/cleanup-recent.mjs --hours 1 --delete
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DELETE = process.argv.includes('--delete');
const hoursIdx = process.argv.indexOf('--hours');
const HOURS = hoursIdx !== -1 ? parseFloat(process.argv[hoursIdx + 1]) : 2;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars'); process.exit(1);
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const since = new Date(Date.now() - HOURS * 60 * 60 * 1000).toISOString();

console.log(`\n🔍 Books added since ${since} (last ${HOURS}h)\n`);

let books = [];
let from = 0;
const PAGE = 1000;
while (true) {
  const { data, error: pageErr } = await supabase
    .from('books')
    .select('id, slug, title, authors, publication_year, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .range(from, from + PAGE - 1);
  if (pageErr) { console.error('DB error:', pageErr.message); process.exit(1); }
  if (!data || data.length === 0) break;
  books = books.concat(data);
  if (data.length < PAGE) break;
  from += PAGE;
}
const error = null;

if (error) { console.error('DB error:', error.message); process.exit(1); }

if (!books || books.length === 0) {
  console.log('✅  No books added in this window.');
  process.exit(0);
}

console.log(`Found ${books.length} books:\n`);
books.forEach((b, i) => {
  const authors = (b.authors ?? []).join(', ') || '—';
  const year = b.publication_year ?? '?';
  const added = new Date(b.created_at).toLocaleTimeString();
  console.log(`  [${i + 1}] "${b.title}" — ${authors} (${year}) · added ${added}`);
});

if (!DELETE) {
  console.log(`\nRun with --delete to remove these ${books.length} books.`);
  process.exit(0);
}

console.log(`\n🗑️  Deleting ${books.length} books…\n`);
let deleted = 0, failed = 0;

for (const book of books) {
  process.stdout.write(`  "${book.title}" … `);
  const { error: delErr } = await supabase
    .from('books')
    .delete()
    .eq('id', book.id);
  if (delErr) { console.log(`✗ ${delErr.message}`); failed++; }
  else { console.log('✓'); deleted++; }
}

console.log(`\n✅ Deleted: ${deleted} | ✗ Failed: ${failed}`);
