/**
 * google-pass.mjs — Pass 2
 *
 * Looks up books by ISBN on Google Books API and extracts series info from
 * the subtitle and description fields. Batches up to 10 ISBNs per request
 * to stay under quota.
 *
 * Returns an array of { slug, series_name, series_number, confidence, source }
 */

import { cleanSeriesName, parseSeriesNumber } from './normalize.mjs';

const DELAY_MS = 600;
const BATCH_SIZE = 10; // Google Books allows ISBN OR chains up to ~10

// Reuse the same patterns as regex-pass but applied to subtitle/description
const SERIES_PATTERNS = [
  { re: /\(([A-Z][^,()]{2,50}),\s*#(\d+(?:\.\d+)?)\)/,   nameGroup: 1, conf: 0.93 },
  { re: /\bbook\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:of|in)\s+(?:the\s+)?([A-Z][^,.()\n]{3,50})/i, nameGroup: 1, conf: 0.90 },
  { re: /^([A-Z][^,.()\n]{3,50}),\s+[Bb]ook\s+(\d+)/i,  nameGroup: 1, conf: 0.90 },
  { re: /\ba\s+novel\s+of\s+(?:the\s+)?([A-Z][^,.()\n]{3,50})/i, nameGroup: 1, conf: 0.88 },
  { re: /^([A-Z][^,.()\n]{3,50}),\s+[Vv]ol(?:ume)?\.?\s*(\d+)/i, nameGroup: 1, conf: 0.88 },
  { re: /\ba\s+([A-Z][^,.()\n]{3,40})\s+[Nn]ovel\b/,     nameGroup: 1, conf: 0.85 },
];

function extractFromText(text) {
  if (!text) return null;
  for (const { re, nameGroup, conf } of SERIES_PATTERNS) {
    const m = text.match(re);
    if (!m) continue;
    const name = cleanSeriesName(m[nameGroup] ?? '');
    if (!name || name.split(' ').length > 8) continue;
    const seriesNumber = parseSeriesNumber(text);
    return { series_name: name, series_number: seriesNumber, confidence: conf };
  }
  return null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * Fetch one batch of books from Google Books by ISBN.
 * Returns map of isbn → volumeInfo.
 */
async function fetchBatch(isbns) {
  const query = isbns.map(i => `isbn:${i}`).join('+OR+');
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&fields=items(volumeInfo(title,subtitle,description,industryIdentifiers))&maxResults=40`;
  const res = await fetch(url);
  if (res.status === 429) return { quotaHit: true };
  if (!res.ok) return { quotaHit: false, items: [] };
  const data = await res.json();
  return { quotaHit: false, items: data?.items ?? [] };
}

/**
 * Run Pass 2 on a list of books with ISBNs.
 *
 * @param {Array<{ slug: string, title: string, isbn: string }>} books
 * @param {{ limit?: number, onProgress?: (done: number, total: number) => void }} opts
 * @returns {Promise<Array<{ slug, series_name, series_number, confidence, source }>>}
 */
export async function googleDetect(books, opts = {}) {
  const { limit, onProgress } = opts;
  const withIsbn = books.filter(b => b.isbn);
  const queue = limit ? withIsbn.slice(0, limit) : withIsbn;
  const results = [];

  // Build isbn → slug map for reverse lookup after batch fetch
  const isbnToSlug = new Map(queue.map(b => [b.isbn, b.slug]));

  const batches = [];
  for (let i = 0; i < queue.length; i += BATCH_SIZE) {
    batches.push(queue.slice(i, i + BATCH_SIZE).map(b => b.isbn));
  }

  let done = 0;
  for (const batch of batches) {
    const { quotaHit, items } = await fetchBatch(batch);
    if (quotaHit) {
      console.warn('\n⚠️  Google Books quota hit — stopping Pass 2. Run again tomorrow.');
      break;
    }

    for (const item of (items ?? [])) {
      const vol = item?.volumeInfo;
      if (!vol) continue;

      // Match back to our slug via ISBN
      const isbn = vol.industryIdentifiers?.find(id =>
        id.type === 'ISBN_13' || id.type === 'ISBN_10'
      )?.identifier;
      const slug = isbnToSlug.get(isbn);
      if (!slug) continue;

      // Try subtitle first, then first sentence of description
      const descSnippet = vol.description?.split(/[.!?\n]/)[0]?.trim();
      const detected =
        extractFromText(vol.subtitle) ||
        extractFromText(descSnippet);

      if (detected) {
        results.push({ slug, ...detected, source: 'google_books' });
      }
    }

    done += batch.length;
    onProgress?.(done, queue.length);
    await sleep(DELAY_MS);
  }

  return results;
}
