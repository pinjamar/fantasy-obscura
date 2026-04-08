/**
 * normalize-author-names.mjs
 *
 * Two normalizations applied to author names in the DB:
 *
 *   1. Initials — "A J Simpson" → "A.J. Simpson"
 *      Any sequence of single letters (with or without trailing dots) gets
 *      collapsed into dotted initials: "J R R Tolkien" → "J.R.R. Tolkien",
 *      "V. E. Schwab" → "V.E. Schwab".
 *
 *   2. Diacritic duplicate detection — flags pairs like "Bjorn X" / "Björn X"
 *      that are likely the same person stored twice. Prints them for manual review.
 *      Does NOT auto-merge (wrong merge = data loss).
 *
 * When a name changes, both the `authors` table and every `books.authors`
 * array entry that references the old name are updated.
 * Slugs are NOT changed (dots don't affect URL slugs).
 *
 * Usage:
 *   node scripts/normalize-author-names.mjs --dry-run    (show changes, write nothing)
 *   node scripts/normalize-author-names.mjs              (apply changes)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const DRY_RUN = process.argv.includes('--dry-run');

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip diacritics: "Björn" → "Bjorn", "Müller" → "Muller" */
function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalize initials in an author name.
 * Consecutive single-letter tokens (with or without dots) are merged
 * into dotted initials prefixing the surname.
 *
 * Examples:
 *   "A J Simpson"      → "A.J. Simpson"
 *   "J R R Tolkien"    → "J.R.R. Tolkien"
 *   "J. R. R. Tolkien" → "J.R.R. Tolkien"
 *   "V. E. Schwab"     → "V.E. Schwab"
 *   "K.A. Applegate"   → unchanged (already merged)
 *   "Brandon Sanderson" → unchanged
 */
function normalizeInitials(name) {
  const tokens = name.trim().split(/\s+/);
  const result = [];

  for (const token of tokens) {
    // A "bare initial" is a single letter optionally followed by a dot
    const isBareInitial = /^[A-Za-z]\.?$/.test(token);

    if (isBareInitial) {
      const normalized = token[0].toUpperCase() + '.';
      const last = result.at(-1);
      // If the previous token is already a run of initials (e.g. "A." or "A.B."),
      // append to it; otherwise start a new token.
      if (last && /^([A-Z]\.)+$/.test(last)) {
        result[result.length - 1] = last + normalized;
      } else {
        result.push(normalized);
      }
    } else {
      result.push(token);
    }
  }

  return result.join(' ');
}

// ── Fetch all authors ─────────────────────────────────────────────────────────

async function fetchAllAuthors() {
  const PAGE = 1000;
  const all = [];
  let offset = 0;
  while (true) {
    const { data, error } = await supabase
      .from('authors')
      .select('id, name, slug')
      .order('name')
      .range(offset, offset + PAGE - 1);
    if (error) { console.error('DB error:', error.message); process.exit(1); }
    if (!data?.length) break;
    all.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return all;
}

// ── Update books.authors array ────────────────────────────────────────────────

async function renameinBooks(oldName, newName) {
  // Fetch all books that have this author
  const PAGE = 1000;
  let offset = 0;
  let updated = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('id, authors')
      .contains('authors', [oldName])
      .range(offset, offset + PAGE - 1);
    if (error) { console.error('  Books fetch error:', error.message); break; }
    if (!data?.length) break;

    for (const book of data) {
      const newAuthors = book.authors.map((a) => (a === oldName ? newName : a));
      const { error: upErr } = await supabase
        .from('books')
        .update({ authors: newAuthors })
        .eq('id', book.id);
      if (upErr) console.error(`  Book update error (${book.id}):`, upErr.message);
      else updated++;
    }

    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return updated;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n✏️  Normalize Author Names${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  const authors = await fetchAllAuthors();
  console.log(`Loaded ${authors.length} authors\n`);

  // ── Phase 1: Initials normalization ──────────────────────────────────────
  console.log('── Phase 1: Initials normalization ──────────────────────────────────────\n');

  const renames = [];
  for (const author of authors) {
    const fixed = normalizeInitials(author.name);
    if (fixed !== author.name) renames.push({ author, oldName: author.name, newName: fixed });
  }

  if (!renames.length) {
    console.log('  No initials to normalize.\n');
  } else {
    for (const { author, oldName, newName } of renames) {
      console.log(`  ${oldName.padEnd(40)} → ${newName}`);
    }
    console.log('');

    if (!DRY_RUN) {
      let authorsDone = 0;
      let booksDone = 0;
      for (const { author, oldName, newName } of renames) {
        // Update authors table
        const { error } = await supabase
          .from('authors')
          .update({ name: newName })
          .eq('id', author.id);
        if (error) { console.error(`  Author update error (${oldName}):`, error.message); continue; }
        authorsDone++;

        // Update books.authors array
        const booksUpdated = await renameinBooks(oldName, newName);
        booksDone += booksUpdated;
      }
      console.log(`  ✓ Updated ${authorsDone} author(s), ${booksDone} book record(s)\n`);
    } else {
      console.log(`  [dry run] Would update ${renames.length} author(s)\n`);
    }
  }

  // ── Phase 2: Diacritic duplicate detection ────────────────────────────────
  console.log('── Phase 2: Diacritic duplicate detection ───────────────────────────────\n');

  // Reload authors after potential renames
  const currentAuthors = DRY_RUN ? authors : await fetchAllAuthors();

  // Group by stripped+lowercased name
  const groups = new Map();
  for (const author of currentAuthors) {
    const key = stripDiacritics(author.name).toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(author.name);
  }

  let dupCount = 0;
  for (const [, names] of groups) {
    if (names.length > 1) {
      console.log(`  ⚠️  Possible duplicates:`);
      for (const n of names) console.log(`       "${n}"`);
      dupCount++;
    }
  }

  if (!dupCount) {
    console.log('  No diacritic duplicates found.\n');
  } else {
    console.log(`\n  ${dupCount} duplicate group(s) found — merge manually in Supabase.\n`);
  }

  console.log('──────────────────────────────────\nDone.\n');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
