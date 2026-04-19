/**
 * Deduplication helpers for category list pages.
 *
 * Rules applied in order:
 *  1. Cross-list: a book in a higher-priority list is excluded from lower ones
 *     (allTimeGreats > startWith > hiddenGems)
 *  2. Within-list series dedup: only the highest-priority book per series is kept
 *  3. Slice to maxBooks (default 20)
 */

export type BookRow = {
  slug: string;
  title: string;
  series?: string | null;
};

/**
 * Build a Set of titles from a higher-priority list to exclude.
 */
export function buildExcludeSet(...priorityLists: string[][]): Set<string> {
  const s = new Set<string>();
  for (const list of priorityLists) for (const t of list) s.add(t.toLowerCase().trim());
  return s;
}

/**
 * Given sorted DB rows, apply series dedup + cross-list exclusion.
 * Returns at most `maxBooks` results.
 */
export function dedupeBooks<T extends BookRow>(
  sorted: T[],
  excludeTitles: Set<string>,
  maxBooks = 20,
): T[] {
  const seenSeries = new Set<string>();
  const result: T[] = [];

  for (const book of sorted) {
    if (result.length >= maxBooks) break;

    // Cross-list exclusion by title
    if (excludeTitles.has(book.title.toLowerCase().trim())) continue;

    // Within-list series dedup
    if (book.series) {
      const key = book.series.toLowerCase().trim();
      if (seenSeries.has(key)) continue;
      seenSeries.add(key);
    }

    result.push(book);
  }

  return result;
}
