/**
 * regex-pass.mjs — Pass 1
 *
 * Extracts series info from a book's title and synopsis using regex.
 * No API calls. Very high precision, low recall.
 *
 * Returns { series_name, series_number, confidence } or null.
 */

import { cleanSeriesName, parseSeriesNumber } from './normalize.mjs';

const NUMBER_WORDS = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10 };

/**
 * Ordered from most → least specific.
 * Each entry: { pattern, nameGroup, confidence }
 * nameGroup: which capture group contains the series name.
 */
const PATTERNS = [
  // "(Series Name, #3)" — Goodreads-style, highest confidence
  { re: /\(([A-Z][^,()]{2,50}),\s*#(\d+(?:\.\d+)?)\)/,   nameGroup: 1, numGroup: 2,  confidence: 0.97 },
  // "(Series Name #3)"
  { re: /\(([A-Z][^,()]{2,50})\s+#(\d+(?:\.\d+)?)\)/,     nameGroup: 1, numGroup: 2,  confidence: 0.97 },
  // "(Series Name, Book 3)" — inside parentheses
  { re: /\(([A-Z][^,()]{2,50}),\s*[Bb]ook\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\)/i, nameGroup: 1, numGroup: 2, confidence: 0.95 },
  // "Book 3 of the Series Name" / "Book Three of Series Name"
  { re: /\bbook\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+of\s+(?:the\s+)?([A-Z][^,.()\n]{3,50})/i, nameGroup: 1, numGroup: 0, confidence: 0.93 },
  // "A Novel of the Series Name"
  { re: /\ba\s+novel\s+of\s+(?:the\s+)?([A-Z][^,.()\n]{3,50})/i, nameGroup: 1, numGroup: 0, confidence: 0.90 },
  // "Series Name, Book 3" at start of subtitle — but NOT when title has a colon
  // (colon means "BookTitle: SeriesName, Book N" — would capture the full "BookTitle: SeriesName")
  { re: /^([A-Z][^:,.()\n]{3,50}),\s+[Bb]ook\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)/i, nameGroup: 1, numGroup: 2, confidence: 0.92 },
  // "Series Name, Volume 3"
  { re: /^([A-Z][^:,.()\n]{3,50}),\s+[Vv]ol(?:ume)?\.?\s*(\d+)/i, nameGroup: 1, numGroup: 2, confidence: 0.92 },
  // "A Farseer Novel" — only when it follows a colon (subtitle), never in plain prose
  // e.g. "Assassin's Apprentice: A Farseer Novel" → safe; "A Fantasy Novel" → skip
  { re: /:\s+[Aa]\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+[Nn]ovel\b/, nameGroup: 1, numGroup: 0, confidence: 0.88 },
  // "The Series Name Series" — redundant but common
  { re: /\bThe\s+([A-Z][^,.()\n]{3,40})\s+Series\b/,        nameGroup: 1, numGroup: 0, confidence: 0.82 },
];

/**
 * Run all patterns against a text string.
 * Returns the highest-confidence match or null.
 */
function matchPatterns(text) {
  if (!text) return null;
  let best = null;
  for (const { re, nameGroup, numGroup, confidence } of PATTERNS) {
    const m = text.match(re);
    if (!m) continue;
    const rawName = m[nameGroup];
    if (!rawName) continue;
    const name = cleanSeriesName(rawName);
    if (name.split(' ').length > 8) continue; // reject sentence fragments
    if (name.length < 3) continue;
    // Reject pure genre labels (e.g. "Urban Fantasy", "Epic Fantasy", "Dark Fantasy Novel")
    const GENRE_WORDS = /^(fantasy|romance|romantic|mystery|thriller|adventure|novel|cozy|dark|epic|magic|dragon|wizard|sci.fi|scifi|litrpg|progression|cultivation|reincarnation|urban|paranormal|historical)\s*/i;
    if (name.split(' ').every(w => GENRE_WORDS.test(w + ' ') || /^(a|an|the|of|and)$/i.test(w))) continue;

    // If the pattern captured the number directly, use it; otherwise scan the full text
    let seriesNumber = null;
    if (numGroup && m[numGroup]) {
      const raw = m[numGroup].toLowerCase();
      seriesNumber = NUMBER_WORDS[raw] ?? parseFloat(raw) ?? null;
      if (isNaN(seriesNumber)) seriesNumber = null;
    } else {
      seriesNumber = parseSeriesNumber(text);
    }

    if (!best || confidence > best.confidence) {
      best = { series_name: name, series_number: seriesNumber, confidence };
    }
  }
  return best;
}

/**
 * Run Pass 1 on a single book.
 * Checks title then synopsis (title gets a confidence bonus).
 *
 * @param {{ title: string, synopsis?: string }} book
 * @returns {{ series_name: string, series_number: number|null, confidence: number } | null}
 */
export function regexDetect(book) {
  // Try title first — cleanest signal, use all patterns
  const fromTitle = matchPatterns(book.title);
  if (fromTitle && fromTitle.confidence >= 0.90) return { ...fromTitle, source: 'regex' };

  // Try synopsis — only high-confidence parenthetical patterns (avoid marketing prose)
  if (book.synopsis) {
    const snippet = book.synopsis.split(/[.!?\n]/)[0].trim(); // first sentence only
    const SYNOPSIS_PATTERNS = PATTERNS.filter(p => p.confidence >= 0.93);
    let best = null;
    for (const { re, nameGroup, numGroup, confidence } of SYNOPSIS_PATTERNS) {
      const m = snippet.match(re);
      if (!m) continue;
      const rawName = m[nameGroup];
      if (!rawName) continue;
      const name = cleanSeriesName(rawName);
      if (!name || name.split(' ').length > 8 || name.length < 3) continue;
      const GENRE_WORDS = /^(fantasy|romance|romantic|mystery|thriller|adventure|novel|cozy|dark|epic|magic|dragon|wizard|sci.fi|scifi|litrpg|progression|cultivation|reincarnation)\s*/i;
      if (name.split(' ').every(w => GENRE_WORDS.test(w + ' ') || /^(a|an|the|of|and)$/i.test(w))) continue;
      let seriesNumber = null;
      if (numGroup && m[numGroup]) {
        const raw = m[numGroup].toLowerCase();
        seriesNumber = NUMBER_WORDS[raw] ?? parseFloat(raw) ?? null;
        if (isNaN(seriesNumber)) seriesNumber = null;
      }
      if (!best || confidence > best.confidence) best = { series_name: name, series_number: seriesNumber, confidence };
    }
    if (best) return { ...best, confidence: Math.min(best.confidence, 0.90), source: 'regex' };
  }

  return fromTitle;
}
