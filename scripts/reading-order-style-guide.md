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

### 4. Sections

**Rule 0: check for duplication before writing any section.**
`description`, `orderNote`, book notes, group sublabels, and cards already cover a lot. A section only adds value when it contains something genuinely new. If the description already ends with a clear entry point and the orderNote explains the arc — "Where to start" is already answered. Don't repeat it in a section.

**The formula (in order, max 4 sections):**

**"Where to start"** — add only if description/orderNote don't already answer it.
Bullet format. Useful when there are multiple entry points, reader profiles (newcomer / adaptation fan / prior reader), or a non-obvious first book. Skip if the answer is already in the description or orderNote — adding a section that just repeats them is noise.

**[Series-specific]** — keep only if it targets a real search query. Remove or rename vague ones.
Keep: "Publication vs chronological order" (Malazan, First Law, WoT — very commonly Googled), "If you know the games or show" (Witcher), "The crossover moments explained" (SJM).
Cut or fold in: generic "What to know" catch-alls, "What makes it special" non-answers — move the substance into a card or one of the other three sections.

**"Content notes"** — add to every guide that's missing it. This never duplicates other page elements.
The darkness meter shows level per arc but never covers: romance/heat level, whether explicit content exists, what *type* of dark it is (moral ambiguity vs. graphic violence vs. sexual content), or reader fit framing. Cover all four:
- Darkness type (moral, violent, sexual — not just the level)
- Romance/heat level (none, minimal, present, explicit)
- Explicit content (yes/no — people Google this directly)
- Reader fit: "Right for X. Not right for Y." One line each.

**"Why it matters"** — add for established series with real genre influence. Skip for newer series.
3–5 concrete bullets: publication year, who it influenced by name, what it invented or popularized, records or awards. Not vague praise — "Joe Abercrombie cited this as a direct influence" beats "hugely influential."
Skip for: Blood and Ash, Empyrean, Divergent, ACOTAR — no established legacy yet.
Use for: Black Company, Earthsea, Malazan, WoT, Witcher, First Law, Dune, Discworld.

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

### FAQ JSON-LD schema

`[slug].astro` auto-generates a `FAQPage` JSON-LD block from any `sections` entries that have `prose` or `bullets`. No extra work needed — every section with a heading and content automatically becomes a schema FAQ item. This means well-written sections (good heading, substantive content) double as structured data for Google's People Also Ask boxes without any separate FAQ block.

### "Last updated" — dateModified in JSON-LD

Every curated guide has a `lastUpdated: 'YYYY-MM-DD'` field that feeds into `dateModified` in the `BookSeries` JSON-LD schema. This is the canonical Google freshness signal — more reliable than visible text dates.

**Update `lastUpdated` whenever you change guide content:** new book added, notes revised, section rewritten, book status changed. Do NOT update it for template or structural changes that don't affect what the reader sees.

For ongoing series, also update `seriesStatusLabel` to reflect the current state — e.g. `"📖 Ongoing — They Cry due Nov 2026"`. This is reader-facing info, not a freshness signal.

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
- [ ] "Where to start" section present — OR confirmed it's already answered in description/orderNote (don't duplicate)
- [ ] "Content notes" section present: darkness type, romance level, explicit content (yes/no), reader fit
- [ ] Series-specific section present if there's a real search query it answers (pub vs chronological, adaptation context, etc.)
- [ ] "Why it matters" section present for established series; skipped for newer series without legacy
- [ ] `darkness` array filled per arc with `desc` for each entry
- [ ] `seriesStatusLabel` includes most recent book + year for ongoing series
- [ ] `booksLikeSlug` filled if a Books Like page exists for this series
- [ ] `related` has 4–6 slugs of genuinely similar series
- [ ] No hidden text used anywhere
- [ ] All book slugs verified to exist in DB (`node scripts/check-reading-order-books.mjs`)
