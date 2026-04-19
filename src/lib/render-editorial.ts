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
