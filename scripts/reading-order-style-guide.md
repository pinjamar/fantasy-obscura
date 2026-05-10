# Reading Order Page Style Guide

Reference for writing and auditing curated reading order pages (`src/data/reading-orders/*.ts`).
Covers prose voice, required sections, SEO structure, and the data shape.

---

## The Voice

Reading order pages are written by a reader who has finished the series, not a publisher blurb writer.
The tone is honest, opinionated, and brief. Every sentence should either orient the reader or warn them.

**Do:**

- Make the call. "Start here." "Skip this." "Read before book 3 or you'll be lost."
- Say what the series actually is in plain language. "Military fantasy narrated by a soldier-historian. No chosen ones."
- Flag problems honestly. "The first 50 pages are deliberately disorienting — stick with it."
- Name the best book. Readers always want to know which one to look forward to.
- Compare to something familiar if it helps. "Reads more like a soldier's after-action report than a novel."

**Don't:**

- Use publisher language. "A breathtaking saga of..." — no.
- Summarize plot. The synopsis on the book page does that. This page answers: what order, why, what to expect.
- Write neutral. Every note should have a point of view.
- Pad. Short notes for straightforward books. Length only where there's a genuine decision to explain.
- Add AI disclaimers, "some readers feel," "many fans believe" hedges.

**Note length benchmark:**

- Mandatory, no complications → 1–2 sentences
- Optional/supplementary with a reason to read → 2–3 sentences
- Complex placement (interquels, parallel timelines, rereads) → 3–4 sentences max

---

## Required Sections (every curated guide)

### 1. `description` (top of entry)

One paragraph, 3–6 sentences. Answers: what is this series, what makes it distinctive, who is it for.
Lead with the most important thing — usually what makes it unlike everything else in the genre.
End with a clear entry point signal: "The Black Company is where to start."

### 2. `orderNote`

The one paragraph that answers the actual reading order question before the reader scrolls into the book list.
Include: can you read sub-series in any order? what's the mandatory core? what's optional?
This is the most-read text on the page. Keep it tight.

### 3. Cards (2–4 cards, `cardsPosition: 'above'`)

Quick-orientation facts a new reader needs before they start. Use for:

- The prose style / what makes reading this unusual
- The entry point or series structure decision
- The most important thing that might put someone off (proactively address it)
- The payoff (why finish the whole thing)

Cards are not summaries — they're the things you'd say to a friend who just picked up book 1.

### 4. Sections (required: "Where to start" + "Content notes")

**Where to start** — mandatory on every guide.
Bullet format. Covers: first-time readers, readers who've read related series, re-entry points.
Answer "which book first?" directly. Don't make them infer it from the reading order list.

**Content notes** — mandatory on every guide.
Darkness level, heat level, specific content warnings per arc.
Helps wrong-fit readers self-select out early (good for bounce rate, good for readers).

**Facts / influence** — required where the series has cultural significance.
3–5 bullets of concrete, specific facts: publication year, who it influenced, records it holds, awards.
Not vague praise. "Joe Abercrombie has cited this as a direct influence" beats "hugely influential."

**Series-specific sections** — add where there's a genuine reader question to answer.
Examples: "The crossover moments explained," "Publication vs chronological order," "Which arc to stop at."
Don't add sections just to add them. Every section should answer something a reader will search for.

### 5. `darkness` array

Always fill this per arc/book-group, not for the whole series as one entry.
Use honest labels. Don't round up to look edgy or down to avoid scaring readers.
Include a one-line `desc` that says specifically what the darkness is, not just the level.

---

## SEO Requirements

### Title and meta description

**Title format** (auto-generated, no changes needed):
`[Series Name] Reading Order: All [Author] Books in Order | The Grimoire`

**Meta description** (auto-generated from `description` field):
`Complete reading order for [Series] by [Author] — N books, N core + N optional. What to read first, what's skippable.`

Add "Spoiler-free" signal somewhere visible on the page — currently absent from all guides.
Best placement: add `(Spoiler-Free)` to the end of the `orderNote`, or note it in "Where to start" section.

### Heading structure

- H1: auto-generated from series name — do not override
- H2 "Reading Order" above the book list — rendered in `[slug].astro`. Should be "[Series] Reading Order" not just "Reading Order" (keyword reinforcement). **This is a template fix, not a per-guide fix.**
- Section headings (`section.heading`) render as H2 — keep them as natural questions or clear topic labels, not generic "About the Series" style

### Visible FAQ block

Every curated guide should have 3–4 FAQ items that answer the top People Also Ask queries.
These render as visible text on the page AND populate the `FAQPage` JSON-LD schema.
**Do not put FAQ content in hidden elements — Google ignores CSS-hidden text.**

Standard FAQ questions (adapt wording per series):

1. How many books are in [Series]?
2. What order should I read [Series]? _(answer: exactly what orderNote says, compressed)_
3. How long does it take to read [Series]? _(total pages ÷ 30 min/page = hours — auto-calculated)_
4. One series-specific question — e.g., "Do I need to read Port of Shadows?" / "Can I start with Crescent City?"

FAQ items go in the `sections` array with a consistent type (do not use `type: 'warning'` for FAQ items).
The `faqJsonLd` in `[slug].astro` auto-generates schema from all sections with `prose` or `bullets`.

### "Last updated" for ongoing series

Ongoing series (seriesStatus: 'ongoing') should include the most recent book and date somewhere visible.
Best place: `seriesStatusLabel` (already exists). Format: `"📖 Ongoing — Lies Weeping (2025)"`
Helps with freshness signals for recrawl and tells readers the guide is current.

### Do not use hidden text

The `class="hidden"` pattern on `seoProseText` in `[slug].astro` is a legacy mistake — hidden text is
ignored by Google and risks a quality penalty. That block has been removed. Do not re-add it.

---

## Data Shape Reference

```ts
export const mySeriesEntry: ReadingOrderEntry = {
  slug: 'my-series',            // matches URL /reading-orders/my-series/
  name: 'My Series Name',       // displayed in H1 and title
  author: 'Author Name',
  seriesStatus: 'complete',     // 'complete' | 'ongoing' | 'hiatus'
  seriesStatusLabel: '✅ Complete — 9 books',  // shown as badge
  description: '...',           // top paragraph — see voice guide above
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',  // shown in stats bar
  warning: '...',               // optional amber warning block at top
  orderNote: '...',             // reading order summary before book list
  cardsPosition: 'above',       // 'above' | 'below' — above is almost always better
  cards: [...],                 // 2–4 cards
  groups: [...],                // use when series has named arcs
  books: [...],                 // use for flat reading lists without arc grouping
  sections: [...],              // FAQ, facts, content notes, etc.
  darkness: [...],              // per-arc darkness with desc
  booksLikeSlug: '...',         // slug for Books Like cross-link
  finishedLabel: 'Finished?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: ['slug1', 'slug2'],  // 4–6 related reading orders
  shortName: 'Short Name',      // used in footer related links
};
```

### Book statuses

- `mandatory` — must read, core story
- `supplementary` — adds depth but story works without it
- `optional` — skippable without losing the plot
- `upcoming` — not yet published, shown greyed out

### Section types

- `'bullets'` — bullet list, also generates FAQ schema (most common)
- `'prose'` — single paragraph, also generates FAQ schema
- `'warning'` — renders with amber styling, also generates FAQ schema

---

## Publication Order Strip

Only add when publication order significantly differs from recommended reading order AND readers
commonly debate which to follow. Current cases where this matters:

- **Discworld** — publication vs sub-series order is a genuine debate
- **Narnia** — publication vs chronological is THE debate
- **Dune** — Herbert originals vs Brian Herbert continuations fork

For most series the book list already is publication order — a second strip adds nothing.
For series with an interquel (e.g., Black Company's Port of Shadows, written in 2018): note it
in the book's `note` field rather than building a separate section.

---

## Audit Checklist (use before publishing a new guide)

- [ ] `description` leads with what makes the series distinctive, ends with clear entry point
- [ ] `orderNote` answers the reading order question directly in one paragraph
- [ ] 2–4 cards present, `cardsPosition: 'above'`
- [ ] "Where to start" section present with bullet answers
- [ ] "Content notes" section present (darkness, heat, warnings per arc)
- [ ] `darkness` array filled per arc with `desc` for each entry
- [ ] FAQ: at least 3 questions answerable from series data, in `sections` array
- [ ] `seriesStatusLabel` includes most recent book + year for ongoing series
- [ ] `booksLikeSlug` filled if a Books Like page exists for this series
- [ ] `related` has 4–6 slugs of genuinely similar series
- [ ] No hidden text used anywhere
- [ ] All book slugs verified to exist in DB (`node scripts/check-reading-order-books.mjs`)

3. No visible FAQ section — the JSON-LD FAQ is orphaned
   The FAQPage schema is generated from the sections array, but sections render as bullet lists — not visually as Q&A. Google expects visible Q&A content that matches the schema. A visible FAQ block at the bottom (3–4 questions) would:

Qualify for People Also Ask boxes
Make the JSON-LD valid
Answer the most common searches directly
Standard questions for every guide:

How many books are in [Series]?
What order should I read [Series]?
How long does it take to read [Series]?
One series-specific question (e.g., Do I need to read Port of Shadows?) 4. Sections are not standardized — this is the main SJM vs Black Company gap
SJM has "Where to start," "Crossover moments explained," "Content notes."
Black Company has only "Why it matters."
Every guide should have at minimum:

Where to start (most-searched intent — every new reader asks this)
Content notes (darkness, heat, warnings — reduces bounce from wrong-fit readers)
Facts/influence (authority signals — Black Company has this, SJM doesn't)
This is the standardization work that would make all guides consistent.

5. H2 "Reading Order" is a keyword miss
   The <h2> above the book list (line 503) just says "Reading Order." Google weighs heading text. It should be "[Series Name] Reading Order" or "Complete [Series Name] Reading Order" — matches the H1 target keyword.

6. "Last updated" for ongoing series
   Black Company just got Lies Weeping (2025) and They Cry is upcoming. No freshness signal anywhere on the page. A small note — "Updated May 2025 — Lies Weeping added" — helps with recrawl priority and tells readers the guide is current. Especially important for ongoing series.

7. 📚
   12 books (10 essential · 1 extra · 1 optional · 1 upcoming)~4.569 pages~152 hours reading time
   🕯️🕯️🕯️🕯️🕯️ Brutal · 🔥🔥 Sweet Romance - potentiall put optional before extra and remove heat level?
