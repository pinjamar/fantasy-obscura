// cleanup-authors.js
// Finds authors in the `authors` table whose name doesn't appear in any book's authors[] array.
// Prints them and optionally deletes them.
//
// Run:
//   node scripts/cleanup-authors.js            (dry run — just prints orphans)
//   node scripts/cleanup-authors.js --delete   (actually deletes them)

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const DELETE = process.argv.includes('--delete');

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function main() {
  console.log('🔍 Checking for orphaned authors...\n');

  // 1. Get all author slugs from the authors table
  const { data: authorRows, error: authErr } = await supabase
    .from('authors')
    .select('id, name, slug');
  if (authErr) throw new Error(`authors fetch: ${authErr.message}`);

  // 2. Get all unique author names from books.authors[]
  const { data: bookRows, error: bookErr } = await supabase
    .from('books')
    .select('authors');
  if (bookErr) throw new Error(`books fetch: ${bookErr.message}`);

  const activeNames = new Set(
    (bookRows ?? []).flatMap((b) => b.authors ?? []).map((n) => n.trim()),
  );

  // 3. Find authors not in any book
  const orphans = (authorRows ?? []).filter((a) => !activeNames.has(a.name));

  if (orphans.length === 0) {
    console.log('✅ No orphaned authors found — all authors have books in the DB.');
    return;
  }

  console.log(`Found ${orphans.length} orphaned author(s):\n`);
  for (const a of orphans) {
    console.log(`  • ${a.name}  (slug: ${a.slug})`);
  }

  if (!DELETE) {
    console.log('\nRun with --delete to remove them.');
    return;
  }

  // 4. Delete orphans
  const ids = orphans.map((a) => a.id);
  const { error: delErr } = await supabase
    .from('authors')
    .delete()
    .in('id', ids);

  if (delErr) throw new Error(`delete failed: ${delErr.message}`);
  console.log(`\n🗑️  Deleted ${orphans.length} orphaned author(s).`);
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
