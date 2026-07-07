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

A `PublicTrope` (`src/data/trope-types.ts`) has three editorial fields beyond the required
`slug` / `name` / `category` / `description`:

| Field | What it is | Rendered where |
|---|---|---|
| `intro` | 3–6 sentence editorial intro, replaces the generic description paragraph | Top of page, in place of the two-paragraph filler |
| `bestExamples` | Up to 6 book slugs — the definitive examples of this trope | "Where to Start?" cover strip near the top |
| `editorialFaqs` | 2 curated Q&As that add a genuine angle | FAQ section, appended after the 2–4 auto-generated data FAQs |

A trope is only "fully enriched" when **all three** are present. Partial enrichment (e.g. `intro`
only) still leaves the page without curated examples or a real FAQ section — finish all three
together, don't stop at `intro`.

---

## Writing `intro`

- 3–6 sentences. Not a definition — assume the reader knows roughly what the trope is.
- Say something a generic description can't: what makes the trope work (or fail), the tension
  it lets a story explore, how different books handle it differently.
- Name specific books and use them to make a real point — not just "Book X features this trope"
  but what Book X *does* with it that's distinct from how another book handles it.
- Never open with "The trope of X is..." — lead with the observation, not the trope name.

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

- Up to 6 slugs, ranked by how *definitive* the example is for this specific trope — not just
  highly rated. A book can be a 5-star read and a mediocre example of the trope.
- The template drops any slug that doesn't resolve to a book with a `cover_url`
  (`src/pages/tropes/[slug].astro:24-33`), so a bad slug fails silently (empty "Where to Start?"
  section) rather than erroring — verify, don't guess.
- Prefer variety: don't pick 6 books from the same series or the same author if better-distributed
  examples exist.

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