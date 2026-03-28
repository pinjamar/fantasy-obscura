/**
 * normalize.mjs — string helpers for series detection
 */

const STOP_WORDS = new Set([
  'the','a','an','of','and','in','to','for','on','at','by','with','from',
  'its','is','was','be','has','had','he','she','they','his','her','their',
]);

/** Lowercase, strip punctuation, collapse whitespace. */
export function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Strip dots, lowercase, collapse whitespace. */
export function normalizeAuthor(name) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract meaningful words from a title for overlap comparison.
 * Returns array of de-stopped, 3+ char words.
 */
export function titleKeywords(title) {
  return normalizeTitle(title)
    .split(' ')
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w));
}

/**
 * Given two arrays of title keywords, return a Jaccard similarity (0–1).
 * Used to detect books that likely share a series without identical titles.
 */
export function titleSimilarity(kws1, kws2) {
  const s1 = new Set(kws1);
  const s2 = new Set(kws2);
  const intersection = [...s1].filter(w => s2.has(w)).length;
  const union = new Set([...s1, ...s2]).size;
  return union === 0 ? 0 : intersection / union;
}

/** Convert number word to integer: "three" → 3. */
const NUMBER_WORDS = {
  one:1, two:2, three:3, four:4, five:5,
  six:6, seven:7, eight:8, nine:9, ten:10,
};

export function parseSeriesNumber(text) {
  if (!text) return null;
  const hashMatch = text.match(/#(\d+(?:\.\d+)?)/);
  if (hashMatch) return parseFloat(hashMatch[1]);
  const bookMatch = text.match(/\bbook\s+(\w+)/i);
  if (bookMatch) {
    const word = bookMatch[1].toLowerCase();
    if (NUMBER_WORDS[word]) return NUMBER_WORDS[word];
    const n = parseFloat(word);
    if (!isNaN(n)) return n;
  }
  const volMatch = text.match(/\bvol(?:ume)?\.?\s*(\d+)/i);
  if (volMatch) return parseInt(volMatch[1], 10);
  const partMatch = text.match(/\bpart\s+(\d+)/i);
  if (partMatch) return parseInt(partMatch[1], 10);
  return null;
}

/** Clean up a series name extracted by regex: trim, collapse spaces, strip trailing punctuation, "Series", and "Book" artifacts. */
export function cleanSeriesName(raw) {
  return raw
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[,.:;!?]+$/, '')
    .replace(/\s+[Ss]eries$/, '')
    .replace(/\s+[Bb]ook$/, '')   // e.g. "Dark Paladin Book" → "Dark Paladin"
    .trim();
}
