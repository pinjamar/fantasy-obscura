/**
 * Normalize a stored cover_url to a usable image URL.
 *
 * Some older DB entries have archive.org zip-path URLs like:
 *   https://archive.org/download/m_covers_0013/.../0013125530-M.jpg
 * These are slow and often fail. Convert them to the proper OL covers CDN:
 *   https://covers.openlibrary.org/b/id/13125530-L.jpg
 */
export function normalizeCoverUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/\/(\d+)-[A-Z]\.jpg$/);
  if (m && url.includes('archive.org')) {
    return `https://covers.openlibrary.org/b/id/${parseInt(m[1], 10)}-L.jpg`;
  }
  return url;
}
