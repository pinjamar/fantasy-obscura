/**
 * fix-merged-authors.mjs
 *
 * Finds books where two author names got merged into a single array element,
 * e.g. authors = ["Mo Xiang Tong Xiu, Andrea Kriz"] instead of ["Mo Xiang Tong Xiu", "Andrea Kriz"]
 * and splits them into proper separate elements.
 *
 * Usage:
 *   node scripts/fix-merged-authors.mjs           (dry run — prints affected books)
 *   node scripts/fix-merged-authors.mjs --apply   (writes fixes to DB)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const APPLY = process.argv.includes('--apply');

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/** Split a single author string that contains multiple names. */
function splitAuthorString(a) {
  if (a.includes(' & ')) return a.split(' & ').map((s) => s.trim()).filter(Boolean);
  const parts = a.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) return parts;
  return [a];
}

/** Returns the corrected authors array, or null if no change needed. */
function fixAuthors(authors) {
  if (!authors?.length) return null;
  const fixed = authors.flatMap(splitAuthorString);
  // Only flag as changed if splitting actually produced more elements
  if (fixed.length === authors.length) return null;
  return fixed;
}

async function main() {
  console.log(`\n🔧  Fix Merged Authors${APPLY ? '' : ' [DRY RUN]'}\n`);

  // Paginate through all books
  const PAGE = 1000;
  const rows = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('id, slug, title, authors')
      .range(from, from + PAGE - 1);
    if (error) { console.error('Supabase error:', error.message); process.exit(1); }
    rows.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  console.log(`Scanned ${rows.length} books.\n`);

  const toFix = rows
    .map((b) => ({ ...b, fixed: fixAuthors(b.authors) }))
    .filter((b) => b.fixed !== null);

  if (toFix.length === 0) {
    console.log('✅  No merged author strings found.');
    return;
  }

  console.log(`Found ${toFix.length} book(s) with merged authors:\n`);
  for (const b of toFix) {
    console.log(`  ${b.slug}`);
    console.log(`    Before: ${JSON.stringify(b.authors)}`);
    console.log(`    After:  ${JSON.stringify(b.fixed)}\n`);
  }

  if (!APPLY) {
    console.log(`Run with --apply to write these fixes to the DB.`);
    return;
  }

  let fixed = 0, failed = 0;
  for (const b of toFix) {
    const { error } = await supabase
      .from('books')
      .update({ authors: b.fixed })
      .eq('id', b.id);
    if (error) {
      console.log(`✗ ${b.slug}: ${error.message}`);
      failed++;
    } else {
      console.log(`✓ ${b.slug}`);
      fixed++;
    }
  }

  console.log(`\n✅  Fixed: ${fixed}  Failed: ${failed}`);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
