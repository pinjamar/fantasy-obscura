/**
 * Renders editorial text to HTML:
 * - *text* → <em>text</em>
 * - 🕯️N (single digit, not a range like 1-5) → N repeated candle emojis
 * - 🔥N (single digit, not a range) → N repeated fire emojis
 */
export function renderEditorial(text: string): string {
  return text
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/🕯️\s*([1-5])(?![-–\d])/g, (_, n) => '🕯️'.repeat(Number(n)))
    .replace(/🔥\s*([1-5])(?![-–\d])/g, (_, n) => '🔥'.repeat(Number(n)));
}

/** Splits editorial text on blank lines into paragraphs, for multi-paragraph fields like trope `intro`. */
export function splitEditorialParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Strips *italic* markers and collapses newlines to spaces — for plain-text contexts (schema.org, meta description). */
export function stripEditorial(text: string): string {
  return text.replace(/\*([^*]+)\*/g, '$1').replace(/\n+/g, ' ').trim();
}
