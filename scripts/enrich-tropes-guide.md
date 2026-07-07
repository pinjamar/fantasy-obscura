# Trope Page Enrichment Guide

Reference for writing editorial content for `src/data/tropes/*.ts` so trope pages clear the
same value bar as [`enrich-authors-guide.md`](enrich-authors-guide.md) already applies to author pages.

---

## Current State (as of 2026-07-07)

Trope page indexing (`src/pages/tropes/[slug].astro:184`) currently gates on **book count only**
(`books.length >= 10`). It does not check for editorial content. Cross-referencing the 70 trope
data files against live book counts:

- **70 / 70 tropes** have ≥10 books → all 70 are indexed today
- **19 / 70** have full enrichment (`intro` + `editorialFaqs` + `bestExamples`)
- **51 / 70** are indexed with only a generic one-line `description`, auto-generated FAQ
  boilerplate, and a book grid — thin, templated content

This guide exists to close that gap: write real editorial content for the 51 unenriched tropes
(list at the bottom), and — separately, as a code change — gate the `noindex` condition on
enrichment status too, not just book count. That code change is not part of this guide; flag it
before making it, since it changes what's currently live in Google's index.

---

## What "Enriched" Means

A `PublicTrope` (`src/data/trope-types.ts`) has four editorial fields beyond the required
`slug` / `name` / `category` / `description`:

| Field | What it is | Rendered where |
|---|---|---|
| `intro` | 3–6 sentence editorial intro, replaces the generic description paragraph | Top of page, in place of the two-paragraph filler |
| `bestExamples` | Up to 7 book slugs — the definitive examples of this trope | "Where to Start?" cover strip near the top |
| `booksLikeGuides` | 7 books-like guide slugs relevant to this trope | "Books Like Guides for [Trope] Fans" section |
| `editorialFaqs` | 2 curated Q&As that add a genuine angle | FAQ section, appended after the 2–4 auto-generated data FAQs |

A trope is only "fully enriched" when **all four** are present. Partial enrichment (e.g. `intro`
only) still leaves the page without curated examples, reading-guide links, or a real FAQ section —
finish all four together, don't stop at `intro`.

**Effort allocation:** `intro` (paragraph structure, book contrast, no reader-response endings)
and `bestExamples` (DB verification, popularity/fit checks) are where iteration and polish
belong. `booksLikeGuides` just needs 6 correctly-verified slugs (see below). `editorialFaqs` just
needs the required 2 entries to clear the enrichment bar — write a competent pass and move on,
don't over-invest in wording or formatting on the FAQ.

---

## Writing `booksLikeGuides`

- **Exactly 7 slugs**, each one the filename (without `.ts`) of a guide in `src/data/books-like/`.
  Run `Glob('src/data/books-like/*.ts')` to get the full list — never guess a slug.
- **The value must match the guide's top-level `slug` field**, which in practice is almost always
  the source book's title-derived slug. The page matches on the *source book's* derived slug
  (`src/pages/tropes/[slug].astro` and the `[darkness]` sub-page, both around line 40), not the
  guide's own `slug` — they're the same value in every existing guide, but verify by opening the
  file rather than assuming.
- Rendered up to 7 (`.slice(0, 7)` in both templates) — providing fewer than 7 just means a
  shorter row of links, providing more than 7 wastes data since the rest never render.

**Selection order — follow this exact priority:**

1. **First, take guides whose source book is already in this trope's `bestExamples`.** Check
   `src/data/books-like/` for a file matching each `bestExamples` slug — not every definitive
   example has a guide written for it, so this usually yields fewer than 7.
2. **If that's short of 7, search for guides tagged with this trope's exact name** in their own
   `source.tropes` array (not just thematically similar — the literal trope string):
   ```bash
   grep -lE "['\"]Trope Name Here['\"]" src/data/books-like/*.ts
   ```
   Add matches not already pulled from step 1, ranked by how central the trope is to that book.
3. **If step 2 still doesn't reach 7** (some tropes have zero guides tagged with the exact
   string — Villain Protagonist is one), fall back to editorial judgment: guides whose source
   book is a genuine fit even without the literal tag. Say so if you do this — it's a weaker
   signal than steps 1–2 and worth flagging as a candidate for a future DB trope-tag pass.

A slug that doesn't match any file in `src/data/books-like/` fails silently (the link just
doesn't render) — same failure mode as a bad `bestExamples` slug. Verify every one.

**Rendered presentation** (both templates, kept in sync): section heading is "Books Like Guides
for [Trope] Fans" — not "Reading Guides," which collides with the site's separate `/reading-orders/`
content type. Each pill shows the 📖 emoji plus the book title only (no "Books like" text prefix).

---

## Writing `intro`

- **Format as 2–3 short paragraphs, not one block.** Separate them with a blank line (`\n\n`)
  inside the string. The page (`src/pages/tropes/[slug].astro` and the `[darkness]` sub-page)
  splits on blank lines via `splitEditorialParagraphs()` and renders each as its own `<p>`.
- **Italicize book titles with single asterisks**: `*Best Served Cold*` → rendered as
  <em>Best Served Cold</em> via the shared `renderEditorial()` helper (`src/lib/render-editorial.ts`).
  This is the same convention already used on the fantasy category pages — don't invent a
  different one (no double-asterisk bold, no markdown links).
- Do not use raw HTML in `intro` — only the `*italic*` convention above is parsed. Anything else
  renders as literal text.
- 3–6 sentences total across the 2–3 paragraphs. Not a definition — assume the reader knows roughly what the trope is.
- Say something a generic description can't: what makes the trope work (or fail), the tension
  it lets a story explore, how different books handle it differently.
- **Name at least two books from the trope's own `bestExamples` list and contrast them** — not
  two books that both "feature this trope" but two that do genuinely different things with it.
  That contrast is what makes the paragraph read as an actual observation instead of a summary.
  The Chosen One intro is the model: Mistborn asks whether prophecy is manipulation, A Deadly
  Education puts the "chosen" role in the mouth of someone actively refusing it. Two books, two
  different answers to the same question — that's the shape every intro should have.
- Never open with "The trope of X is..." — lead with the observation, not the trope name.
- Run the AI Slop checklist below before finishing. A one-book intro that ends on a
  reader-response line is the single most common failure mode here — see the worked example.

### Worked Example — Catching a Reader-Response Ending

This was the live `intro` for Revenge Story before a rewrite:

> "...The target is always right in the abstract and complicated in the specific, which is what
> keeps these stories honest. **Readers who love revenge narratives are drawn to the fantasy of
> an account that finally gets settled** — the satisfaction of consequence for people and systems
> that seemed beyond it."

The bolded sentence is a textbook reader-response formula (see checklist below) — it frames the
point through a hypothetical reader instead of stating what the books actually do, and only one
book (Best Served Cold) is named in the whole paragraph despite the intro claiming fantasy
"escalates" and books "handle it differently." Nothing is being contrasted. The fix is the same
in every case: cut the reader-response sentence, and replace the single example with two books
that disagree with each other about what revenge actually costs or delivers.

### Example (Chosen One, existing)

> The Chosen One is fantasy's most contested premise and its most durable one. It works because
> the genre can hold two contradictory things at once: the sincere belief that some people are
> called to something larger than themselves, and the relentless questioning of what "called"
> actually means. Brandon Sanderson's Mistborn asks whether prophecy is information or
> manipulation — whether a hero chosen by an ancient text is being guided or used. A Deadly
> Education does something different, putting the darkest prophesied sorceress alive in a
> position where she has to actively fight the narrative that wants her to be a monster. What
> readers are actually after is the fantasy of purpose — the idea that their own particular
> strangeness might turn out to matter enormously.

Even this reference example isn't clean — its own closing sentence ("What readers are actually
after is...") is the same reader-response pattern flagged above. The Mistborn/A Deadly Education
contrast in the middle is what makes it worth modeling; don't copy the ending verbatim.

---

## AI Slop Patterns — Never Write These

Same checklist as [`books-like-guide.md`](books-like-guide.md), applied to `intro` and
`editorialFaqs` prose. Run it before finishing any trope page. (The em-dash ban in that guide is
books-like-specific and does *not* apply here — several already-enriched tropes use em-dashes
freely; don't rewrite existing prose just to remove them.)

**Reader-response formulas** — framing a point through a hypothetical reader instead of stating
what the books do:
❌ "Readers who love X are drawn to the fantasy of..."
❌ "What readers are actually after is..."
❌ "Fans of this trope want..."
✅ Fix: state the thing directly, anchored in what a specific book does. "Mistborn asks whether
prophecy is manipulation. A Deadly Education has its heroine refuse the role outright."

**Aphorisms** — sentences that sound meaningful but carry no book-specific information:
❌ "which is what keeps these stories honest"
❌ "the truth is stranger than the story"
❌ "a betrayal that changes everything"
✅ Fix: name what specifically the book does instead of gesturing at a feeling.

**Abstract virtue lists** — three nouns strung together that could describe any book in the genre:
❌ "loss, identity, and the weight of the past"
❌ "power, corruption, and consequence"
✅ Fix: make the claim concrete and specific to the named book.

**Consensus hedges** — avoiding a direct claim:
❌ "widely considered one of the best examples"
❌ "many readers find this the definitive take"
✅ Fix: say it directly, or name the specific comparative claim instead.

**Superlatives without a comparison**:
❌ "the most compelling version of this trope in fantasy"
✅ Fix: "X does this more explicitly than Y" — name what Y does differently.

**Vague filler phrases**:
❌ "emotional weight" / "emotional core" / "the human cost"
✅ Fix: say the actual thing. Not "the emotional cost of revenge" but "what pursuing it does to
her specifically — the campaign that outlives her ability to enjoy finishing it."

**Financial metaphors** for prose or payoff:
❌ "the payoff is worth the investment" / "earns its ending"
✅ Fix: say what actually happens that justifies the structure.

### Checklist before finishing an `intro` or `editorialFaqs` entry
- [ ] At least two `bestExamples` books named and genuinely contrasted, not just both mentioned
- [ ] No reader-response framing ("readers who...", "what readers want is...")
- [ ] No aphorisms — every sentence contains information specific to a named book
- [ ] No abstract virtue lists, superlatives without a comparison, or vague filler phrases
- [ ] Doesn't open with "The trope of X is..."

---

## `bestExamples` — DB Verification Required

Same rule as every other guide in this repo: **verify every slug against the DB before writing it.**

```bash
node --input-type=module << 'EOF'
import { config } from 'dotenv'; config();
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await sb.from('books')
  .select('slug, title, cover_url, tropes')
  .contains('tropes', ['Trope Name Here'])
  .not('cover_url', 'is', null)
  .order('avg_rating', { ascending: false, nullsFirst: false })
  .limit(20);
data.forEach(b => console.log(`${b.slug} | ${b.title}`));
EOF
```

- Up to 7 slugs, ranked by how *definitive* the example is for this specific trope — not just
  highly rated. A book can be a 5-star read and a mediocre example of the trope.
- The template drops any slug that doesn't resolve to a book with a `cover_url`
  (`src/pages/tropes/[slug].astro:24-33`), so a bad slug fails silently (empty "Where to Start?"
  section) rather than erroring — verify, don't guess.
- Prefer variety: don't pick multiple books from the same series or the same author if
  better-distributed examples exist.
- If a new, more definitive example turns up after the list is already at 7, drop the weakest
  (least recognizable / least on-point) existing entry rather than just appending an 8th.

---

## `editorialFaqs` — Add a New Angle, Don't Repeat the Data FAQs

The page already auto-generates 2–4 data-driven FAQs before rendering `editorialFaqs`
(`src/pages/tropes/[slug].astro:103-120`):

1. "What is the [Trope] trope in fantasy?" — falls back to `description` if no `intro`
2. "How many fantasy books feature [Trope]?" — book count + subgenres
3. "What are the best [Trope] fantasy books?" — top 3 by rating
4. "What subgenres feature [Trope] most?" — top subgenres + authors

**`editorialFaqs` must not duplicate these.** Write exactly 2 that only an editor could answer:
a genuine debate about the trope, a common misconception, a "which book does this best/worst"
judgment call, or a "how to tell a good version from a lazy one" angle.

### Example (Chosen One, existing)

> **Q: Is the Chosen One trope overused in fantasy?**
> A: It's everywhere, but overuse is a symptom, not a flaw. Chosen One stories fail when destiny
> substitutes for character development — the protagonist is special because the plot says so.
> They succeed when the protagonist earns the role through failure and choice, or when the story
> actively interrogates whether "chosen" means anything at all. A Deadly Education is the most
> incisive recent deconstruction; Mistborn probably the most satisfying fulfilment.

---

## Quality Rules

- **Never guess a book slug or trope name.** Trope `name` must match the exact string used in
  the `books.tropes` column (check `src/data/tropes.ts` import list or the DB) — a mismatched
  name silently returns 0 books and defeats the enrichment.
- **No plot spoilers** in `intro`, `bestExamples`, or `editorialFaqs` — same rule as books-like
  and reading-order guides. Describe what the trope does, not how a specific book's plot resolves.
- **`intro` replaces, it doesn't supplement** — when `intro` is set, the generic
  description + filler paragraph disappears entirely (`src/pages/tropes/[slug].astro:202-213`).
  Don't write a thin `intro` assuming the old filler still shows.
- Minimum bar: `intro` alone is not "enriched" — do all three fields per trope in one pass.

---

## Tropes Still Needing Enrichment (51, as of 2026-07-07)

Sorted by book count (lowest first — smallest audience, but also currently the thinnest content
relative to its size, so arguably the highest ROI to fix first):

```
Floating Islands         27 books   floating-islands
Trial by Combat           28 books   trial-by-combat
Magic Tournament          32 books   magic-tournament
Sentient Weapon           36 books   sentient-weapon
Blood Magic               57 books   blood-magic
Viking-Inspired World     67 books   viking-inspired
Underground City          69 books   underground-city
Hero Becomes Villain      79 books   hero-becomes-villain
Frozen Wasteland          84 books   frozen-wasteland
Pyrrhic Victory           90 books   pyrrhic-victory
Villain Protagonist       93 books   villain-protagonist
Second Chance Romance     96 books   second-chance-romance
Pirate Fantasy           101 books   pirate-fantasy
Rivals to Allies         104 books   rivals-to-allies
Desert Kingdom           108 books   desert-kingdom
Heist                    116 books   heist
Gothic Castle            120 books   gothic-castle
Tournament Arc           124 books   tournament-arc
Secret Royalty           144 books   secret-royalty
Grumpy x Sunshine        147 books   grumpy-sunshine
Last Of Their Kind       166 books   last-of-their-kind
Magical Plague           167 books   magical-plague
Political Marriage       167 books   political-marriage
Necromancy               170 books   necromancy
Elemental Magic          174 books   elemental-magic
Dragon Rider             195 books   dragon-rider
Lost Heir                273 books   lost-heir
Prophecy Child           297 books   prophecy-child
Curse Breaking           322 books   curse-breaking
Forced Proximity         331 books   forced-proximity
Fae Court Drama          369 books   fae-court-drama
Divine Magic             375 books   divine-magic
Prophecy                 383 books   prophecy
Succession Crisis        410 books   succession-crisis
Dying Empire             440 books   dying-empire
Forbidden Magic          443 books   forbidden-magic
Mentor Figure            472 books   mentor-figure
Secret Identity          512 books   secret-identity
Portal Fantasy           522 books   portal-fantasy
Revenge Story            576 books   revenge-story
Immortal Character       637 books   immortal-character
Power at a Cost          685 books   power-at-a-cost
Dark Lord                747 books   dark-lord
Mentor and Student       773 books   mentor-student
Magical Artifacts        794 books   magical-artifacts
Reluctant Hero           956 books   reluctant-hero
Rebellion               1020 books   rebellion
Survival Journey        1126 books   survival-journey
Outcast Hero            1385 books   outcast-hero
War Between Kingdoms    1394 books   war-between-kingdoms
Hidden Society          1814 books   hidden-society
```

Already enriched (19, do not need rework): Ancient Evil Awakens, Anti-Hero, Assassin Protagonist,
Betrayal, Bodyguard Romance, Chosen One, Coming of Age, Cursed Character, End of the World,
Enemies to Lovers, Fated Mates, Forbidden Romance, Found Family, Love Triangle, Morally Grey
Hero, Political Intrigue, Quest, Redemption Arc, Slow Burn.