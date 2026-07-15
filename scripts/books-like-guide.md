# Writing Books Like Guides

## Structure

Every `BooksLikeEntry` has four sections:

- **source** — the book being matched (tropes, why_people_love, answer_line)
- **aspects** — 3–4 feature-specific sections, each with 1–2 recs + angle-specific notes
- **recommendations** — `[]` always. This array is NOT rendered by the page template. Put everything in aspects.
- **related** — exactly 6 related Books Like page links

**Rec count target: 6–8 total visible recs across all aspects.**
Aspects can have 1 or 2 recs — use 1 when the angle has one perfect match and no strong second,
use 2 when two books genuinely fit the same angle. Do not pad with a weak second rec just to hit 2.

**If a same-series/universe violation (see below) removes a rec, don't just drop the aspect to 1.**
Do a real DB search for a genuine cross-author replacement for that angle first — swap, don't shrink.
Only fall back to a 1-rec aspect if that search genuinely comes up empty after checking several
candidates. Dropping below the 6-rec floor should be the last resort, not the default response to
finding a same-series violation.


---
## Never Recommend the Same Series/Universe as the Source

Aspect recs and `recommendations` must be **different books by the logic of "if you liked this, try something else"** — never a sequel, prequel, or companion novel in the source book's own series or universe.

- Same-series continuations belong in the **Reading Order** link at the bottom of the page (auto-generated from `source.series`), not in an aspect. Duplicating them there is redundant and confuses "books like X" with "what to read after X."
- This applies even when the same-universe book is genuinely a great match (e.g. a parallel novel or direct sequel by the same author) — the fit isn't the issue, the category is. A reader looking for "books like X" already knows the sequel exists.
- If you're tempted to add one because you can't find a real cross-author match for an angle: search harder for a genuine replacement first (see rec-count note above). Only drop to a 1-rec aspect if that search comes up empty. Don't fall back to the source's own series just to fill a slot.

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
| Related | Exactly 6 entries (other Books Like pages, not external links) |


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
- **Aspect headings are not exempt.** `'If you loved X — the detail...'` is a violation. Use a colon: `'If you loved X: the detail...'`. Some older guides use em-dashes in headings — those are wrong, not a pattern to follow.

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
## Aspect Rec Quality — Don't Default to Genre Bestsellers

When picking recs for an aspect, the question is not "what are the most popular books in this space?" The question is "what books specifically serve this angle of this source book?"

**The wrong approach:** source is a first-person witty assassin novel → reach for Locke Lamora, Nevernight, Black Company, Gardens of the Moon, Six of Crows, Best Served Cold. All popular. All "dark fantasy with criminal elements." None of them necessarily match what's *specific* about the source.

**The right approach:**
1. Name what specifically makes THIS book's take on the aspect distinctive. Not "witty criminal protagonist" — but *which specific quality*: the per-book case/detective structure? The outsider species dynamic? The guild as cultural institution with political standing?
2. Find books that match that specific quality. A second-tier book that serves the angle precisely beats a bestseller that only shares the genre.

**The test:** for each proposed rec, ask: "Would I recommend this to someone who said 'I want more of X specific quality from this book'?" If you're recommending it because it's popular and shares a genre category, cut it. If you're recommending it because it does one specific thing the source does and does it distinctively, keep it.

**Signs you've defaulted to popular picks:**
- Your 6 recs are all from the same bestseller tier (Abercrombie, Lynch, Kristoff, Bardugo, Cook, Erikson)
- The recs serve the genre ("grimdark," "heist fantasy," "assassin protagonist") but not the aspect angle as written
- You could swap the recs between two different guides' guides and they'd still fit

When this happens: read the aspect heading again, name the specific mechanism or dynamic it describes, and search for books that specifically have that.

---
## When Updating an Existing Guide — Always Re-Check Aspect Picks

Don't treat an "update" pass as just an em-dash/caveat/DB-fact sweep. Older guides were often written before the DB had as many books, before trope tagging was as complete, or before a stronger comp title even existed as a guide of its own. The picks may no longer be the best available — check, every time.

**For each aspect, before calling the update done — do all four, not just the ones that feel obviously necessary:**
1. **Read the heading's specific claim, then read the rec's own `note` and check it actually makes THAT claim — not a related but different one.** A heading promising "a Greek myth retold from the perspective of the woman at its centre" needs a rec whose note is actually about a mythology retelling. A rec whose note says "the most direct genre ancestor" for a *different* dynamic (e.g. a captor romance) does not satisfy a mythology-retelling heading just because it's thematically adjacent and popular. This check has been missed before — a Beauty-and-the-Beast retelling sat under a "Greek myth retold" heading in `gild.ts` because the note's own claim was never checked against the heading's specific wording, only against the general vibe. Read the note in isolation, without the heading in view, and ask: does this note argue for the heading's specific claim, or a different claim that happens to be adjacent?
2. Read the rec's own `caveat` against the aspect's heading. A caveat that undercuts the very thing the aspect promises (e.g. a "world and lore" aspect whose rec's caveat admits "world-building is shallower than the source's") is a sign the pick doesn't actually serve the angle — not just a caveat to phrase more gently.
3. Query the DB for other candidates matching the aspect's specific mechanism (not just the genre) — compare `darkness_level`, `heat_level`, and `tropes` against the source the same way you would when writing a guide from scratch.
4. Prefer a candidate with a tighter DB fact match (heat/darkness tier identical to the source) or a more specific trope overlap over one that only shares the genre.

**If a stronger candidate exists:** swap it in. Update `answer_line` if the swapped rec is the first pick in aspects 1–3 (per the alignment rule above). Don't leave a demonstrably weaker pick in place just because it was already there.

**If nothing beats the current picks:** say so and move on. This is a check performed on every update, not a mandate to always change something. But "I skimmed it and it seemed fine" is not the check — step 1 requires actually re-reading each note against the heading's exact wording, every time, even on guides that otherwise look clean.

---
## Final Checklist — Run on Every Update, Every File

Before calling any guide update done, run all of these — not just the ones that feel relevant:

1. **Total rec count is 6–8.** Count every rec across every aspect. If a file sits at exactly 6 after a same-series removal or any other cut, that's the floor, not a resting point — go back to the "swap, don't shrink" step above and look for a genuine 4th-aspect angle or a second rec for a 1-rec aspect before finishing. A file already at 6 for legitimate reasons (nothing else fits) is fine; a file at 6 because you removed something and stopped looking is not.
2. `grep -n "—\|cover_url" <file>` — zero results. Every em-dash purged, no hardcoded cover_url on any DB-matched book.
3. Slop regex: `grep -inE "widely considered|earns its|the payoff|emotional engine|inner truth|rewards patient|lands as hard|hits as hard|the flip side|psychological (depth|sharpness)" <file>` — review every hit; fix genuine AI-slop, leave verified-legitimate uses (e.g. "earns its reputation" describing critical consensus) with a one-line note on why it's fine.
4. `npx tsc --noEmit -p . 2>&1 | grep -i "<slug>"` — zero results.
5. Every `related` slug resolves to a real `BOOKS_LIKE` entry's internal `.slug` field — not just a file that exists on disk with a similar name (filenames don't always match slugs; verify by grepping `slug:` inside the target file, not `ls`).

---
## Common Mistakes

| Mistake | Fix |
|---|---|
| Recommending a sequel/companion novel in the source's own series | Forbidden — that belongs in the Reading Order link, not aspects/recommendations |
| Adding `cover_url` for books in the DB | Omit it — DB covers are used automatically |
| Adding `slug` by default for all books | Only when DB slug ≠ auto-generated slug |
| Apostrophe in title, no slug override | Always breaks — verify and add override |
| Guessing slugs without DB query | Always query first |
| Populating `recommendations` array | Leave as `[]` — it is not rendered |
| Aspect with a padded/weak second rec | Use 1 rec in that aspect instead |
| Same-series violation removed a rec, aspect now has only 1 | Search for a real replacement before accepting 1 rec |
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
