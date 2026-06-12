# Writing Books Like Guides

## Structure

Every `BooksLikeEntry` has four sections:

- **source** — the book being matched (tropes, why_people_love, answer_line)
- **aspects** — 3–4 feature-specific sections, each with 1–2 recs + angle-specific notes
- **recommendations** — `[]` always. This array is NOT rendered by the page template. Put everything in aspects.
- **related** — exactly 3 related Books Like page links

**Rec count target: 6–8 total visible recs across all aspects.**
Aspects can have 1 or 2 recs — use 1 when the angle has one perfect match and no strong second,
use 2 when two books genuinely fit the same angle. Do not pad with a weak second rec just to hit 2.


---
## DB Verification — Do This Before Adding Any Rec

Most critical rule: verify every book against the DB before writing it into a guide.

```
node --input-type=module << 'EOF'
import { config } from 'dotenv'; config();
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await sb.from('books')
  .select('slug, title, cover_url, darkness_level, heat_level')
  .ilike('title', '%book title here%');
console.log(JSON.stringify(data, null, 2));
EOF
```


---
## slug Field Rules

`slug` in `BooksLikeRec` / `BooksLikeAspectRec` is an **override only** — use it when the DB slug
differs from what the title would auto-generate.

**Auto-slug rule:** lowercase, non-alphanumeric → dash, leading/trailing dashes stripped.

**APOSTROPHES** produce a dash, which almost always breaks the slug:
```
"Assassin's Apprentice" → auto-slug: assassin-s-apprentice  DB slug: assassins-apprentice  BROKEN
"The Wise Man's Fear"   → auto-slug: the-wise-man-s-fear    DB slug: the-wise-mans-fear    BROKEN
```

Other common overrides needed:
```
"Mistborn: The Final Empire" → auto-slug: mistborn-the-final-empire  DB slug: the-final-empire
```

Rule: any title with an apostrophe or subtitle colon almost certainly needs a slug override.
Always verify against the DB — never guess.

**DO NOT** add `slug` for books not in the DB (nothing to link to).


---
## cover_url Field Rules

`cover_url` is optional. If omitted, the app pulls the cover from the DB automatically.

| Book in DB? | What to do |
|---|---|
| Yes | Omit `cover_url` entirely. Never hardcode when DB has one. |
| No | Add a verified `cover_url` (Open Library, Google Books). Verify the URL actually loads before committing. |

Never guess or speculatively add cover URLs. A missing cover is better than a broken image.

**Checklist before writing any rec:**
1. Query DB to confirm book exists and get its slug
2. If in DB → omit `cover_url`; add `slug` override only if DB slug ≠ auto-slug
3. If not in DB → add verified `cover_url`; do not add `slug` field


---
## Rec Counts

| Section | Target |
|---|---|
| Aspects | 3–4 aspects, 1–2 recs each, **6–8 total visible recs** |
| Recommendations | Always `[]` — not rendered by the page template |
| Related | Exactly 3 entries (other Books Like pages, not external links) |


---
## why_people_love vs why_people_love_rich

Every entry has `why_people_love: string` — one honest paragraph, not a plot summary. This is the fallback and is always required.

For entries where the book warrants more structure, add `why_people_love_rich` as an array of blocks. When present, the page renders `why_people_love_rich` and ignores the flat string.

**Block types:**

```ts
{ type: 'paragraph'; text: string }        // plain prose
{ type: 'labeled'; label: string; text: string }  // bold label + sentence
{ type: 'warning'; text: string }          // amber callout box (⚠️ prepended automatically)
```

**Standard structure (follow American Gods as the reference):**
1. Opening `paragraph` — what the book is actually about, in a way that's specific and surprising. State the central idea plainly, then illustrate it with concrete examples. Not a plot summary.
2. One `labeled` block — only for a specific element a reader would stop to check (protagonist type, narrative structure). One label max per entry. It stands out because it's the only one.
3. A second `paragraph` — the payoff, structure, or what the reading experience builds toward.
4. A `warning` block — covers pace AND tonal expectations together. Don't split into two warnings.

**Sentence style:**
- Prefer short, period-separated sentences over em-dash chains. Break clauses into their own sentences.
- Wrong: `"Shadow Moon is an unusual protagonist — passive, watchful, more vessel than hero — which gives the novel the quality of a long strange dream."`
- Right: `"Shadow Moon is an unusual protagonist. He is passive, watchful, more vessel than hero, which gives the novel the quality of a long strange dream."`
- Wrong: `"...plot momentum — and his mythology is deliberately faded."`
- Right: `"...plot momentum. His mythology is deliberately faded."`

**Tone:**
- Avoid book-report phrases: not "Gaiman's central idea is..." or "the author's approach to..." — write directly: "It's both funny and genuinely sad", not "the central idea is both funny and genuinely sad."
- Don't balance lists symmetrically. Let content dictate length. A 2-item warning reads more honest than a padded 3-item one.

**What NOT to add as a separate section:** "Perfect For / Skip If" lists are redundant once you have `why_people_love_rich` with a ⚠️ block. The warning already does "Skip If" better, in prose. Only add a fit section if there's genuinely distinct information that won't fit naturally in the why flow.


---
## Writing Notes / Why Text

**Aspect note** (~3–5 sentences):
- Lead with the SPECIFIC thing this book shares with the source in that aspect — the mechanic, the structural similarity, the tonal match. Be concrete.
- Never summarise the plot. "X happens, then Y discovers Z" tells the reader nothing about why this book fits the aspect.
- **No spoilers for the source book.** The reader may not have finished it. Don't reveal deaths, twists, or ending details.
- The strongest sentence pattern: *"Where [source] is [quality], [rec] is [quality]"* — e.g. "Where American Gods is melancholy and sprawling, Anansi Boys is warmer and funnier." Use it when the rec shares DNA but differs in register.
- Close with a direct endorsement if warranted — "The best direct follow-up for Gaiman readers" is stronger than trailing off.

**Caveat field:** split the caveat out of `note` into the separate `caveat` field. The page renders it as a distinct left-bordered line below the main note. Keep it 1–2 sentences — the single sharpest reason this rec might disappoint the reader. Don't pad.

```ts
note: "Why this rec fits the aspect — concrete, specific, no plot summary, no source spoilers.",
caveat: "The one thing that's different or harder vs the source book.",
```

**answer_line alignment rule:** the books named in `answer_line` ("start with A, B, and C")
must be the first rec in aspects 1, 2, and 3 respectively. If the guide has a 4th aspect,
its first rec does not need to appear in the answer_line.


---
## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding `cover_url` for books in the DB | Omit it — DB covers are used automatically |
| Adding `slug` by default for all books | Only when DB slug ≠ auto-generated slug |
| Apostrophe in title, no slug override | Always breaks — verify and add override |
| Guessing slugs without DB query | Always query first |
| Populating `recommendations` array | Leave as `[]` — it is not rendered |
| Aspect with a padded/weak second rec | Use 1 rec in that aspect instead |
| `cover_url` not verified to load | Check URL before committing |
| Burying caveat inside `note` string | Split it into the separate `caveat` field |
| Opening note with plot summary ("X happens, Y discovers...") | Lead with the specific shared quality, not what happens |
| Spoiling the source book in a rec note | Reader may not have finished it — no deaths, twists, or ending reveals |
| Multiple labeled blocks in why_people_love_rich | One label max — it stands out because it's the only one |
| Symmetrically balanced Perfect For / Skip If lists | Don't — let content dictate length; uneven is more honest |
| Adding a fit section when why_people_love_rich has a ⚠️ block | Redundant — the warning already covers it |


---
## Source Field Reference

```ts
source: {
  title: string             // exact book title
  author: string
  db_slug?: string          // only if DB slug ≠ auto-slug (for the source book itself)
  cover_url?: string        // only if NOT in DB
  darkness_level: 1–5
  heat_level?: string|null  // 'Sweet Romance' | 'Closed Door' | 'Open Door' | 'Explicit' | null
  series?: string | null
  series_number?: number | null
  tropes: string[]          // 5–9 trope tags
  angle?: string            // short subgenre hook e.g. "Dark Romantasy with Forbidden Heat"
  answer_line?: string      // "If you loved X for Y, start with A, B, and C."
  why_people_love: string   // always required — one honest paragraph, not a plot summary
  why_people_love_rich?: WhyPeopleLoveBlock[]  // optional structured version; overrides flat string when present
}
```

**Aspect rec fields (updated):**
```ts
note: string      // specific match reason — no plot summary, no caveat buried here
caveat?: string   // separate field: 1–2 sentences on how this rec might disappoint
```
