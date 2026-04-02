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
  // archive.org zip-path → OL CDN
  if (url.includes('archive.org')) {
    const m = url.match(/\/(\d+)-[A-Z]\.jpg$/);
    if (m) return `https://covers.openlibrary.org/b/id/${parseInt(m[1], 10)}-L.jpg`;
  }
  // Google Books books/content → publisher/content (higher-res, no hotlink block)
  if (url.includes('books.google.com/books/content')) {
    const m = url.match(/[?&]id=([^&]+)/);
    if (m) return `https://books.google.com/books/publisher/content/images/frontcover/${m[1]}?fife=w400-h600`;
  }
  return url;
}
