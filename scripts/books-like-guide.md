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
## Writing Notes / Why Text

**Aspect note** (~3–5 sentences):
- Lead with the SPECIFIC thing this book shares with the source in that aspect
- Name the mechanic, the scene type, the structural similarity — be concrete
- End with a caveat: what is different or harder about this rec vs the source
- Never summarise the plot

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
  why_people_love: string   // one honest paragraph — not a plot summary
}
```
