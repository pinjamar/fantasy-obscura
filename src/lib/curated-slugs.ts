/**
 * curated-slugs.ts
 *
 * Builds a Set of book slugs that are explicitly referenced in our
 * hand-crafted Books Like guides or Reading Order pages.
 *
 * Used by:
 *  - /books/[slug].astro  → pass noindex={!CURATED_SLUGS.has(slug)} to Layout
 *  - /sitemap.xml.ts      → only include curated books in the sitemap
 */

import { BOOKS_LIKE } from '../data/books-like';
import { READING_ORDERS } from '../data/reading-orders';
import { ALL_PRIORITY } from '../../scripts/priority-slugs.mjs';

function toDbSlug(title: string): string {
  return title
    .replace(/\s*\([^)]*\)/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const CURATED_SLUGS: ReadonlySet<string> = (() => {
  const s = new Set<string>();

  // ── Books Like: source books + all rec books ────────────────────────────────
  for (const entry of BOOKS_LIKE) {
    // The source book of each guide
    const sourceSlug = entry.source.db_slug ?? toDbSlug(entry.source.title);
    if (sourceSlug) s.add(sourceSlug);

    // Recs inside aspects
    for (const aspect of entry.aspects) {
      for (const rec of aspect.recs) {
        if (rec.slug) s.add(rec.slug);
      }
    }

    // Flat recommendations array
    for (const rec of entry.recommendations ?? []) {
      if (rec.slug) s.add(rec.slug);
    }
  }

  // ── Reading Orders: every book with a slug ──────────────────────────────────
  for (const entry of READING_ORDERS) {
    if (entry.books) {
      for (const book of entry.books) {
        if (book.slug) s.add(book.slug);
      }
    }
    if (entry.groups) {
      for (const group of entry.groups) {
        for (const book of group.books) {
          if (book.slug) s.add(book.slug);
        }
      }
    }
  }

  // ── All priority-tier books (TIER_1 + TIER_2 + TIER_3) ────────────────────
  for (const slug of ALL_PRIORITY) {
    s.add(slug);
  }

  return s;
})();
