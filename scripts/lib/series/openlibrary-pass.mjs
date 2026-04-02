/**
 * openlibrary-pass.mjs — Pass 2a
 *
 * Queries Open Library by ISBN (no API key, no quota).
 * For each book:
 *   1. Fetch https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data
 *   2. Follow the /works/ link to the Work record → check for series in subjects
 *   3. Also check subtitle and title for parenthetical series patterns
 *
 * Precision focus: only emit results with confident signals.
 * Returns array of { slug, series_name, series_number, confidence, source }
 */

import { cleanSeriesName, parseSeriesNumber } from './normalize.mjs';

const DELAY_MS = 400;

// Parenthetical pattern: "(The Expanse, #2)" or "(The Expanse Book 2)" etc.
const PAREN_RE = /\(([A-Z][^,()]{2,60})[,\s]+(?:#|Book|Vol(?:ume)?\.?)\s*(\d+(?:\.\d+)?)\)/i;
// "Book N of Series" pattern
const BOOK_OF_RE = /\bBook\s+(\d+)\s+(?:of|in)\s+(?:the\s+)?([A-Z][^,.(){}\n]{3,60})/i;
// "Series, Book N" or "Series #N"
const SERIES_COMMA_RE = /^([A-Z][^,()]{2,50}),\s+(?:Book|Vol|#)\s*(\d+)/i;
// Subject strings that look like series: "The Expanse (Series)" or ends with "series"
const SUBJECT_SERIES_RE = /^(.+?)\s+(?:series|sequence|trilogy|saga|cycle|chronicles?)$/i;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractFromText(text) {
  if (!text) return null;

  const m1 = text.match(PAREN_RE);
  if (m1) {
    const name = cleanSeriesName(m1[1]);
    const num = parseFloat(m1[2]);
    if (name && name.split(' ').length <= 8) {
      return { series_name: name, series_number: num || null, confidence: 0.93 };
    }
  }

  const m2 = text.match(BOOK_OF_RE);
  if (m2) {
    const name = cleanSeriesName(m2[2]);
    const num = parseInt(m2[1]);
    if (name && name.split(' ').length <= 8) {
      return { series_name: name, series_number: num || null, confidence: 0.91 };
    }
  }

  const m3 = text.match(SERIES_COMMA_RE);
  if (m3) {
    const name = cleanSeriesName(m3[1]);
    const num = parseInt(m3[2]);
    if (name && name.split(' ').length <= 8) {
      return { series_name: name, series_number: num || null, confidence: 0.90 };
    }
  }

  return null;
}

function extractFromSubjects(subjects) {
  if (!Array.isArray(subjects)) return null;
  for (const s of subjects) {
    const name = typeof s === 'string' ? s : s?.name;
    if (!name) continue;
    const m = name.match(SUBJECT_SERIES_RE);
    if (m) {
      const clean = cleanSeriesName(m[1]);
      if (clean && clean.split(' ').length <= 8) {
        return { series_name: clean, series_number: null, confidence: 0.82 };
      }
    }
  }
  return null;
}

async function fetchOLBook(isbn) {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    return data[`ISBN:${isbn}`] ?? null;
  } catch {
    return null;
  }
}

async function fetchOLWork(workUrl) {
  // workUrl is like "/works/OL12345W"
  try {
    const url = `https://openlibrary.org${workUrl}.json`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Run Open Library pass on books that have ISBNs but no series.
 *
 * @param {Array<{ slug: string, title: string, isbn: string }>} books
 * @param {{ limit?: number, onProgress?: (done: number, total: number) => void }} opts
 * @returns {Promise<Array<{ slug, series_name, series_number, confidence, source }>>}
 */
export async function openLibraryDetect(books, opts = {}) {
  const { limit, onProgress } = opts;
  const withIsbn = books.filter(b => b.isbn);
  const queue = limit ? withIsbn.slice(0, limit) : withIsbn;
  const results = [];
  let done = 0;

  for (const book of queue) {
    const record = await fetchOLBook(book.isbn);

    if (record) {
      // 1. Try subtitle first (strongest signal)
      let det = extractFromText(record.subtitle);

      // 2. Try title parentheticals
      if (!det) det = extractFromText(record.title);

      // 3. Follow Works record for subject series tags
      if (!det && record.works?.length) {
        const work = await fetchOLWork(record.works[0].key);
        if (work) {
          // Check work-level subjects
          det = extractFromSubjects(work.subjects);
          // Also try work title if different
          if (!det && work.title && work.title !== record.title) {
            det = extractFromText(work.title);
          }
        }
        await sleep(200); // extra delay for the Works fetch
      }

      // 4. Try book-level subjects
      if (!det) det = extractFromSubjects(record.subjects);

      if (det) {
        results.push({ slug: book.slug, ...det, source: 'open_library' });
        process.stdout.write(`  [OL] ✓ "${book.title}" → "${det.series_name}"${det.series_number ? ` #${det.series_number}` : ''} (${det.confidence.toFixed(2)})\n`);
      }
    }

    done++;
    onProgress?.(done, queue.length);
    await sleep(DELAY_MS);
  }

  return results;
}
