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
- Vary sentence length. Mix short punchy sentences with longer ones. Three long sentences in a row is a sign the prose needs to breathe.
- **Em-dash rule — two rules, no exceptions:**
  - Two em-dashes creating a parenthetical → use regular parentheses instead.
    Wrong: `"chooses Talia — not for her power but for who she is — and the scene works"`
    Right: `"chooses Talia (not for her power but for who she is) and the scene works"`
  - Single em-dash linking two clauses → end the first clause with a period.
    Wrong: `"Linus cannot stop caring — and that is the point."`
    Right: `"Linus cannot stop caring. That is the point."`
  - The only acceptable em-dash is in a list or when no rewrite is possible. Default to zero.
- Never use an em-dash where a colon, comma, or full stop will do.

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

**Caveat field — required on every rec.** The page renders it as a distinct left-bordered line below the main note. Every rec has at least one meaningful way it could disappoint someone who loved the source book — find it and write it here. Keep it 1–2 sentences — the single sharpest difference. If you can't think of a caveat, that's a sign the rec note is burying it.

```ts
note: "Why this rec fits the aspect — concrete, specific, no plot summary, no source spoilers.",
caveat: "The one thing that's different or harder vs the source book.",
```

**Never bury the caveat inside `note`.** Even if you've acknowledged the difference in the note, it must also appear as a standalone `caveat` field. The page renders both.

**answer_line alignment rule:** the books named in `answer_line` ("start with A, B, and C")
must be the first rec in aspects 1, 2, and 3 respectively. If the guide has a 4th aspect,
its first rec does not need to appear in the answer_line.


---
## AI Slop Patterns — Never Write These

Run this check on every note, caveat, why_people_love, and why_people_love_rich block before publishing.

**The test:** could this sentence appear in a rec note for any book in the genre? If yes, rewrite it with something specific to this book and this source.

### Banned patterns

**Em-dash AI tells** — specific constructions that signal machine writing:
❌ `"X — not for A but for B — lands as hard as it does because Y"` (double dash + "lands as hard as it does")
❌ `"created a template that has never quite been replicated"`
❌ `"lands as hard as it does"` / `"hits as hard as it does"`
✅ Fix: rewrite with parentheses and a plain verb. "X (not for A but for B) works because Y."

**Aphorisms** — sentences that sound meaningful but contain no specific information:
❌ "the truth is stranger than the story"
❌ "a climax that reframes everything that came before"
❌ "the quality of a long strange dream"
❌ "different expressions of the same literary instinct"
✅ Fix: name what specifically the book does. "Both writers believe the supernatural should feel old and heavy rather than exciting."

**Abstract virtue lists** — three nouns strung together that could describe anything:
❌ "displacement, faded power, and what you carry from your old world into the new one"
❌ "identity stripped of its usual context"
❌ "love, loss, and the weight of the past"
✅ Fix: make the claim concrete. "Both ask what an ancient being loses when it has to live in the modern world, and what it costs to pass as ordinary."

**Consensus hedges** — avoiding a direct opinion:
❌ "widely considered one of the best"
❌ "many readers find this the most rewarding entry point"
❌ "some readers feel the pacing is slow"
❌ "often described as X, which undersells what she is actually doing" (hedge + reframe is still a hedge)
✅ Fix: say it directly. "The pacing is slow." "Start here." "People call this X. That label doesn't fit."

**Reader-response formulas** — framing opinions through hypothetical readers or rankings:
❌ "Readers who loved X for Y will find this..."
❌ "If you enjoyed the mythology, this will satisfy."
❌ "the reason most readers stay"
❌ "the most direct modern equivalent to what X built"
✅ Fix: state what the book does. "It shares the same faded-god melancholy. The scale is smaller."

**Superlatives** — "the most X in the genre/fantasy/the series":
❌ "the most philosophically developed version"
❌ "the most sophisticated tools available"
❌ "the most powerful thing a person can bring to a broken system"
✅ Fix: make a specific comparative claim. "Pullman does more with the concept philosophically than either Lackey or McCaffrey." "More effective than any maneuvering he could have learned at court."

**Vague filler phrases** — sounds specific but says nothing:
❌ "the emotional engine" (of every book, of the story, of the series)
❌ "psychological sharpness / psychological depth / psychological experience"
❌ "inner truth" / "emotional weight" / "the emotional centre"
❌ "the flip side of X"
✅ Fix: say the actual thing. "Every Temeraire novel is built around that bond." "The shame of the unwanted child, the hunger for recognition." "Where Talia leads with warmth, El leads with armor."

**Repeated comparison formula** — using the same sentence structure across multiple recs in the same guide:
❌ "writes X with the same Y [author] brings to [character]" used twice or more
❌ "carries the same emotional logic as X's bond with Y" used twice or more
✅ Fix: vary the construction. If you've used "writes the same territory as Lackey," don't also say "with the same precision Lackey brings to Talia" in the next note. State the second comparison differently or make it concrete.

**Financial metaphors** — prose, patience, payoff:
❌ "rewards patient readers"
❌ "the payoff is worth the investment"
❌ "earns its slow burn"
✅ Fix: say what actually happens late in the book that justifies the pacing.

### After writing — checklist
- [ ] Generic sentence test applied to every note and why_people_love block
- [ ] No aphorisms — every sentence contains specific information
- [ ] No abstract virtue lists
- [ ] No consensus hedges — opinions stated directly
- [ ] No reader-response formulas
- [ ] No superlatives — comparative claims only
- [ ] No vague filler phrases ("emotional engine", "inner truth", etc.)
- [ ] No repeated comparison formula across recs in the same guide
- [ ] No financial metaphors for prose or pacing

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
| Missing `caveat` on any rec | Every rec needs one — find what's genuinely different vs the source |
| Burying caveat inside `note` string | Split it into `caveat` field — both must be present |
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
