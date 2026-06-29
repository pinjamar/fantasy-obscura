# Reading Order Page Style Guide

Reference for writing and auditing curated reading order pages (`src/data/reading-orders/*.ts`).
Covers prose voice, required sections, SEO structure, and the data shape.

---

## ⚠️ Before Writing Any Guide — DB First

**Step 0 — run a full discovery query before anything else.**

The query below finds every book in the series. Its output — not any research document — determines the full scope of the guide. If the DB has 49 books, the guide covers 49 books. Research is only for plot details; it is not a ceiling on which books exist.

```bash
node --input-type=module << 'EOF'
import { config } from 'dotenv'; config();
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const {data} = await sb.from('books').select('slug,title,series,series_number,page_count,publication_year')
  .ilike('series', '%SERIES NAME%').order('series_number');
data.forEach(b => console.log(`${b.series_number} | ${b.slug} | ${b.title} | pg:${b.page_count} yr:${b.publication_year}`));
console.log(`Total: ${data.length} books`);
EOF
```

**Never write book titles, slugs, or page counts from memory. Always query the DB first.**

```bash
node --input-type=module << 'EOF'
import { config } from 'dotenv'; config();
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const {data} = await sb.from('books').select('slug,title,series,series_number,page_count,publication_year,cover_url')
  .or('series.ilike.%SERIES NAME%,title.ilike.%BOOK TITLE%').order('series').order('series_number');
data.forEach(b => console.log(`${b.series_number} | ${b.slug} | ${b.title} | ${b.series} | pg:${b.page_count} yr:${b.publication_year} cover:${!!b.cover_url}`));
EOF
```

- Book slugs in the guide **must exactly match** DB slugs — this is what pulls cover images
- Book titles must match DB titles exactly (e.g. "Valour" not "Valor", "The Fury of the Gods" not "The Storm of the Dead")
- Page counts must come from DB, not guessed
- **Publication years must be cross-checked against Goodreads or the publisher** — the DB sometimes has wrong years. If you find an earlier correct year, update the guide AND patch the DB:
  ```js
  await sb.from('books').update({ publication_year: CORRECT_YEAR }).eq('slug', 'the-book-slug');
  ```
- If a book is missing from DB, add it using the add-books script — see workflow below
- After writing, run `node scripts/check-reading-order-books.mjs` to verify all slugs exist

### Adding missing books (PowerShell)

```powershell
cd "c:\Users\Ivan\Desktop\fantasy-obscura"
node scripts/add-books.mjs "Book Title" "Author Name"
```

**After adding, always verify and fix the new row:**

```js
// 1. Confirm slug and check data quality
const { data } = await sb.from('books').select('slug,title,page_count,publication_year,series').ilike('title', '%Title%');
console.log(data);

// 2. Common bad data from Google Books API:
//    - page_count: 0, 26, 29, 45 → clearly wrong for a full novel. Fix it.
//    - publication_year: may be a reprint year, not the first edition. Cross-check Goodreads.
//    - series: may be the string "null" instead of SQL NULL. Clear it.

// 3. Fix bad values:
await sb.from('books').update({ page_count: CORRECT }).eq('slug', 'the-slug');
await sb.from('books').update({ publication_year: CORRECT }).eq('slug', 'the-slug');
await sb.from('books').update({ series: null }).eq('slug', 'the-slug'); // clears "null" string

// 4. If add-books created a duplicate (e.g. "a-summer-tree" when "the-summer-tree" exists):
//    Use the existing slug in the guide and delete the duplicate.
await sb.from('books').delete().eq('id', 'THE-DUPLICATE-UUID');
```

**Slug convention:** the script lowercases the title and replaces non-alphanumeric runs with `-`. Articles ("A ", "The ") at the start stay — so "The Summer Tree" → `the-summer-tree`. Always check the generated slug matches before writing it into the guide.

---

## No-Duplicate Rule — Read This Before Writing Anything

**Every fact belongs in exactly one field. Do not copy-paste across fields. Do not paraphrase the same point in two places.**

These are the specific patterns that keep appearing. Each is a hard violation:

### 1. "Start with X" lives in `orderNote` only
Never end `description` with "Start with [Book]." Never open a "Where to start" section with it. The `description` ends with what makes the series distinctive. The `orderNote` handles reading order. If both end with the same sentence, delete it from `description`.

### 2. "Where to start" section — only if non-obvious
Do not add a "Where to start" section when the answer is already covered by mandatory badges on the groups + the `orderNote`. If there's one clear entry point and it's already stated, this section is noise. Only add it when there are **multiple genuinely different entry profiles** (e.g., adaptation reader vs. newcomer vs. returning reader) that require their own explanation. The card "Where to Start / Entry Points" counts as covering this — do not have both a card and a section saying the same thing.

### 3. Reading order instructions — state once
If you write "read X before Y" in `orderNote`, do not also write it in the group `sublabel` AND the book `note`. Pick the most useful location:
- `orderNote` — for the macro reading order (whole series or sub-series)
- group `sublabel` — for within-group order
- book `note` — only for a genuinely non-obvious individual placement; not to repeat what `sublabel` already says

"Do not read before book 1" in the book note is redundant when the group sublabel already says "read in order."

### 4. Cards vs. sections — never duplicate
If a card covers a point, that point does not appear in sections. If a section covers a point, it does not appear in a card. Before writing any section bullet, check every card body. Before writing any card body, check every section. This is the most common violation.

Common duplicates to watch for:
- Card says "The standalones are not filler." → section bullet says "The standalones are not filler." → pick one, delete the other
- Card says "X is a frustrating protagonist by design." → section says "X's passivity is intentional." → same point, different words, same violation
- Card says "Age of Madness is darker." → content notes bullet says "Age of Madness is darker." → delete from one

### 5. Cards vs. `description` — no restating
The `description` introduces the author/series. Cards elaborate on specific aspects. If the `description` already names a specific character, the card about that character should add new information — not restate what `description` just said. If `description` says "Glokta is bitter, sharp, and unexpectedly principled," the card does not also say "Glokta is bitter and unexpectedly principled."

### 6. Influence/legacy claims — `description` or "Why it matters" section, not both
"Joe Abercrombie, Erikson, and Martin have all cited this as a direct influence" appears in `description` or in a "Why it matters" section bullet. Not both. If the influence list is in the description, the "Why it matters" section adds dates, titles, specific quotes — not the same names again.

### 7. Darkness `desc` — no label prefix
The `label` field already names the book or arc. The `desc` field explains what the darkness is. Never start `desc` with the series or arc name the `label` already states.

❌ `label: 'Under Heaven / River of Stars'`, `desc: 'Kitai Duology — imperial politics...'`
✅ `label: 'Under Heaven / River of Stars'`, `desc: 'Imperial politics and personal cost...'`

### 8. Edition notes, release dates, specific facts — one field only
If you write a "split into two volumes" note at the group level, do not also add it to the individual book's `note`. If an upcoming book's release date appears in `orderNote`, it does not also appear in `description` and the card and the book `note`. One field, most relevant location.

---

## The Voice

Voice rules are split by section. Different parts of a guide serve different readers at different moments — the intro and cards are where someone decides whether to commit to a series; book notes are where they navigate it. The register should match.

---

### `description` and Cards — Warm, opinionated, human

This is the voice of a knowledgeable friend who has finished the series and is telling you whether it's worth your time. Direct, specific, honest about weaknesses, with personality. The reader is deciding whether to start — give them a real take, not a summary.

**Do:**
- Have opinions and state them plainly. "Book 3 is the weakest. Read it anyway — book 4 needs it."
- Flag real weaknesses. "The romance subplot in books 5–7 is not good. It gets dropped."
- Use short punchy sentences as landing pads after longer ones. Rhythm matters more than word count.
- Compare to something the reader likely knows. "If Sanderson is comfort food, Erikson is the meal you have to earn."
- Say what kind of reader this is NOT for, not just who it is for.
- Be specific — name the character, the mechanic, the scene. "Glokta's interrogation scenes" beats "the morally complex protagonist."

**Don't:**
- Use publisher language. "A breathtaking saga of..." — no.
- Summarise plot. The synopsis on the book page already does that.
- Write neutral. If every sentence could apply to any fantasy series, rewrite it.
- Perform casualness with slang ("holy shit", "real talk") — personality comes from specificity and honest takes, not vocabulary.
- Pad. A card that says one true thing is better than a card that says three vague ones.

**Examples of the register:**

❌ "The series rewards patient readers with a rich, immersive world and unforgettable characters."
✅ "The first 200 pages are deliberately disorienting. Erikson throws you in cold with no orientation. Push through — it clicks, and when it does, nothing else feels as big."

❌ "Abercrombie is known for his morally complex characters and dark, subversive take on fantasy tropes."
✅ "Abercrombie writes characters who are trying to be good and failing in interesting ways. The First Law is funny and brutal and ends in a way that will annoy you, which is the point."

---

### `orderNote` — Direct and tight, still opinionated

One paragraph answering the actual reading order question. No personality needed here — just the clearest possible answer. But still opinionated: say "skip the prequel" not "the prequel is optional."

---

### Book notes — Factual and brief, no personality

Placement guidance and any non-obvious context. Not the place for takes. "Read before book 3 or you'll be lost" is a complete book note. Length only where there's a genuine decision to explain (interquels, parallel timelines, divisive entries).

---

## AI Slop Patterns — Never Write These

Google's helpful content system penalises content that sounds generated. These are the specific patterns that trigger it. Every one of these has appeared in guides and needed to be removed.

### 1. Aphorisms that sound profound but say nothing
These are the worst offender. AI generates compressed wisdom-nuggets that feel quotable but contain no specific information.

❌ "The book earns what it costs you."
❌ "What endures is what we build, not what we win."
❌ "It is worth reading as a record of where he started. It is not a guide to what he is."
❌ "None require prior reading, but each rewards it."

**The test:** could this sentence appear in a review of any literary novel? If yes, cut it or replace it with something specific to this book.

✅ Instead: name what specifically happens in the ending, what the book costs the reader emotionally, what specific idea the book is about.

### 2. Consensus hedges
AI avoids taking positions by hiding behind implied consensus.

❌ "widely considered his masterpiece"
❌ "often cited as the best entry point"
❌ "many readers finish X and realise Y"
❌ "some readers find the opening slow"
❌ "readers who want X will find this frustrating"

**The fix:** just say it. "This is his masterpiece." "Start here." "The opening is slow — push through it."

### 3. Reader-response formulas
AI frames everything through hypothetical readers instead of stating a view.

❌ "If you find her frustrating, the book is working."
❌ "Readers who want a morally clear protagonist will be disappointed."
❌ "Those coming from grimdark will find this lighter than expected."
❌ "Read it if: you want a protagonist who starts at zero."
❌ "Not right for you if: you need upfront world-building."

**The fix:** drop the hypothetical reader and state what the book actually does.

✅ "She refuses every clean choice the novel offers her. That's the point."
✅ "The power advancement is the primary appeal. Each stage change is a genuine qualitative shift, not a number going up."
✅ "Wight builds the world through action and inference. The early books are light on lore and heavy on momentum."

**The distinction:** describing what the series is (direct) vs. framing it through a hypothetical reader (banned). A "What is X?" section written as direct statements about what the series does, who its characters are, and what it is not about is fine — the pattern to cut is the conditional "Read it if / Not right for you if" framing that hides a direct opinion behind an imagined reader.

### 4. Financial metaphors for prose quality
This is one of AI's most recognisable patterns.

❌ "prose that earns its weight slowly and pays it all back at once"
❌ "a book that rewards patience"
❌ "the payoff is worth the investment"

**The fix:** say what the prose actually does. "The sentences are long and formal. They slow you down on purpose. By the final chapter that slowness has become weight."

### 5. Abstract virtue lists
AI pads sentences with lists of abstract nouns that could describe anything.

❌ "themes of love, loyalty, sacrifice, and the cost of resistance"
❌ "the drama is always human: love, loyalty, the cost of resistance"
❌ "a story about honour, duty, and what it means to belong"

**The fix:** pick one and say something specific about it. "The central question is whether loyalty to a people is the same thing as loyalty to the idea of that people. Kay says no, and the last hundred pages prove it."

### 6. The gap/space abstraction
AI loves to locate meaning in "the gap between X and Y" or "the space where X meets Y."

❌ "the gap between those two things is where the most interesting scenes happen"
❌ "it's in the tension between X and Y that the novel comes alive"

**The fix:** describe the specific scene or moment, not the abstract gap it occupies.

### 7. Em-dash patterns
Em-dashes are an AI writing tell. Two rules, no exceptions:

- **Two em-dashes around a parenthetical** → replace with regular parentheses.
  ❌ `"the narrator — a man cataloguing endless halls — doesn't understand what he is"`
  ✅ `"the narrator (a man cataloguing endless halls) doesn't understand what he is"`

- **Single em-dash linking two clauses** → end the first clause with a period.
  ❌ `"Anthony's puns are not incidental — they are the point."`
  ✅ `"Anthony's puns are not incidental. They are the point."`

- **Em-dash before a clarification** → use a colon.
  ❌ `"enormous and intentional — some talents reshape the landscape, others produce a small light"`
  ✅ `"enormous and intentional: some talents reshape the landscape, others produce a small light"`

Default to zero em-dashes. Every em-dash in a draft is a candidate for deletion.

- **Display label fields** (`darknessDisplay`, character `role`, `metaDescription`) — use a regular hyphen `-` not an em-dash.
  ❌ `darknessDisplay: '🕯️ Very mild — comedy fantasy with no violence'`
  ✅ `darknessDisplay: '🕯️ Very mild - comedy fantasy with no violence'`

### 8. Vague filler phrases
These phrases sound specific but name nothing concrete. They appear most often in `why_they_work` and card bodies.

❌ `"the engine of the whole book / series / story"` — what drives it? Name the actual mechanic.
❌ `"the answer, when it comes, reframes everything that came before"` — what specifically changes?
❌ `"carries the narrative weight"` — says nothing. What does the character actually do?
❌ `"X is not trying to be anything other than what it is"` — roundabout. Say what it is.
❌ `"depending on what you want from it"` — reader-response hedge. State the tradeoff directly.

**The fix:** replace with a specific claim. "The answer reveals why every obstacle in book 1 ended the same way" beats "reframes everything that came before."

---

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

### 3. Cards (6 cards, `cardsPosition: 'above'`)

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
The darkness meter shows level per arc but never covers: romance/heat level, whether explicit content exists, or what *type* of dark it is (moral ambiguity vs. graphic violence vs. sexual content). Cover these four:
- Darkness type (moral, violent, sexual — not just the level)
- Romance/heat level (none, minimal, present, explicit)
- Explicit content (yes/no — people Google this directly)
- Reader fit: one short line. "Right for: readers who want X. Not right for: readers who need Y." Keep it to one sentence each — the format is a compact label, not a paragraph. Skip if the guide already has a "What is X?" section that covers fit.

**Reader fit bullet — formatting rule:** the reader-fit line must be its own bullet, not embedded inside another bullet that also makes an observation about the book. If you find a bullet that both describes something about the series AND serves as reader-fit ("The prose is terse and the first 40 pages are confusing — not right for readers who need hand-holding"), split it: one bullet for the observation, one separate bullet for "Right for / Not right for."

❌ `'The first 40 pages are deliberately disorienting. Not right for readers who need hand-holding.'`
✅ `'The first 40 pages are deliberately disorienting. Zelazny trusts the reader to keep up.'`
✅ `'Right for: readers who want tight, fast prose and can tolerate an unreliable narrator. Not right for: readers who need thorough world-building upfront.'`

**"What kind of series this is"** — use when a series has a specific tone, audience fit, or experiential profile worth stating directly. The heading should be neutral: "What kind of series this is", "What Pern is", "The series in brief", or a specific question ("What is Malazan?", "What is Cradle?"). Useful for any series whose genre mechanics, emotional register, or tone is meaningfully different from the reader's default assumptions. Do NOT use "Is X right for you?" as the heading — that's the banned framing even if the bullets themselves are clean.

Write as direct statements about what the series delivers, not reader-response conditionals:

❌ "Read Pern if: you want emotional stakes tied to animal bonds."
❌ "Pern may not be for you if: you need fast-paced action."
✅ "Pern is built on emotional stakes tied to animal bonds. The dragon-rider relationship is the core; everything else supports it."
✅ "Pern is lighter in tone than most modern fantasy: low violence, no profanity, dark moments through grief rather than graphic content."

Useful bullets for this section:
- What the series is actually about (mechanics and emotional register, not abstract theme lists)
- Closest comparison series, stated directly ("The closest comparisons are Earthsea and Valdemar")
- What the series is NOT (tone it doesn't have, content it doesn't cover)
- Any era or structural caveats that affect the reading experience (slow-start openings, dated attitudes, publication-era tropes)

**When this section is present, skip the "Right for / Not right for" bullet in Content notes** — they cover the same ground. Keep Content notes for: darkness type, romance level, explicit content (yes/no) only. Do not have both a reader-fit section and a reader-fit bullet.

**"Why it matters"** — add for established series with real genre influence. Skip for newer series.
3–5 concrete bullets: publication year, who it influenced by name, what it invented or popularized, records or awards. Not vague praise — "Joe Abercrombie cited this as a direct influence" beats "hugely influential."
Skip for: Blood and Ash, Empyrean, Divergent, ACOTAR — no established legacy yet.
Use for: Black Company, Earthsea, Malazan, WoT, Witcher, First Law, Dune, Discworld.

### 5. `darkness` array

Always fill this per arc/book-group, not for the whole series as one entry.
Use honest labels. Don't round up to look edgy or down to avoid scaring readers.
Include a one-line `desc` that says specifically what the darkness is, not just the level.

### 6. `characters` array

Add a Key Characters section to every guide. The template renders each character as an **expandable pill** — clicking reveals the `why_they_work` text. The pill shows name + role inline; faction appears as a small label inside the expanded panel.

Every character **must** include a `color` field — without it the pill renders without a coloured label. Use `blue`, `green`, `amber`, `red`, `purple`, or `zinc`. If a guide has more than 6 characters, characters beyond the sixth share a color — that is fine. Do not add new colors to the `cardColors` map.

Scale the character count to the series:
- Simple trilogy or single standalone: 2–3 main characters
- Mid-size series (4–10 books, one world): 4–5
- Multi-novel author guide spanning multiple worlds/series (Kay, Hobb, Wolfe): 6–7, picking 1–2 per major sub-world rather than exhaustively covering all books
- Large ensemble in a single world (Malazan, WoT, ASOIAF): as many as a newcomer genuinely needs to orient themselves — don't list everyone, list the ones whose absence would disorient a first-time reader

**Skip it only if** the description and book notes already name and contextualise every character a newcomer needs — which is rare.

**Data shape:**
```ts
characters: [
  {
    name: 'Character Name',
    role: 'Protagonist / POV narrator / Primary antagonist / etc.',
    faction: 'The Black Company',  // omit if the series has no faction structure
    why_they_work: '...',
  }
]
```

**Rendered order:** characters appear BEFORE the darkness progression table.

**Rule for `why_they_work`:** Do NOT restate what `role` or `faction` already say. Choose exactly one of:

- Name the trope this character represents and give a verdict on whether it's executed well or subverted here
- Compare them to a character from another book the reader likely knows
- State plainly what type of reader will love or be frustrated by them
- Point out something non-obvious — a structural function, a common misread, a change across the series that newcomers won't see coming

If none of those apply: write `"no strong take"`. A blank honest field beats a sentence that just restates the role.

**Bad:** `"Croaker is the company's narrator and historian, recording events as they unfold."`  
(That's the Role field with different words.)

**Good:** `"Classic unreliable-narrator soldier. Readers who want a morally clear protagonist will find Croaker maddening — he admires people he shouldn't and records atrocities without editorialising."` (reader fit + non-obvious structural point)

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
  cards: [...],                 // 6 cards
  groups: [...],                // use when series has named arcs
  books: [...],                 // use for flat reading lists without arc grouping
  sections: [...],              // FAQ, facts, content notes, etc.
  darkness: [...],              // per-arc darkness with desc
  characters: [...],           // optional — see Section 6 for rules and data shape
  booksLikeSlug: '...',         // slug for Books Like cross-link
  finishedLabel: 'Finished?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: ['slug1', 'slug2'],  // 4–6 related reading orders
  shortName: 'Short Name',      // used in footer related links
};
```

### Book statuses

The UI renders three visible tiers plus upcoming. Get these right — they mean different things:

| Status | UI label | Use for |
|---|---|---|
| `mandatory` | **Core** | Main series books — must read |
| `optional` | **Optional** | Full companion novels that add real depth (e.g. Lord John full novels) |
| `supplementary` | **Extra** | Short stories, novellas, side content — clearly skippable |
| `upcoming` | greyed out | Not yet published |

**Rule:** novellas and short stories are almost always `supplementary` (Extra). Full-length companion novels are `optional`. Only main series books are `mandatory`.

**Do not guess** at in-universe chronological placement for novellas/short stories. Always check the official series numbering on Goodreads first. The Goodreads series page shows decimal book numbers (e.g. #0.5, #2.5, #7.5) which are the canonical placement points. Use those, not guessed in-universe dates.

### Upcoming books

For books not yet in the DB, use `slug: null` and `publication_year: null`. The title should be the real announced title, or just `'Untitled'` — do not invent placeholder titles like `'Untitled (Series #52)'`. The position field already conveys the number.

### Section types

- `'bullets'` — bullet list, also generates FAQ schema (most common)
- `'prose'` — single paragraph, also generates FAQ schema
- `'warning'` — renders with amber styling, also generates FAQ schema

---

## Adding a New Guide — Full Checklist

### 1. Write the data file
Create `src/data/reading-orders/[slug].ts`. Query the DB first (see above).

### 2. Register it
In `src/data/reading-orders.ts`:
```ts
import { myGuide } from './reading-orders/my-guide';
// add to READING_ORDERS array
```

### 3. Wire up the author page
The author page (`src/pages/authors/[slug].astro`) has two hardcoded maps that need updating for every new guide:

**`READING_ORDER_MAP`** — maps series names (as stored in the DB) to reading order slugs. This adds a "Reading Order" button to the series card on the author page. Add every series name variant the DB might contain:
```ts
'The Expanse':  'expanse',
'Expanse':      'expanse',
```

**`AUTHOR_UNIVERSE_MAP`** — maps the author's URL slug to a featured guide. This adds a prominent hero link at the top of the author page, matching what Jim Butcher or Brandon Sanderson get. Add only when the guide covers the author's primary or only major universe:
```ts
'james-s-a-corey': { slug: 'expanse', label: 'The Expanse Reading Order' },
```

To find the author's URL slug: `authorToSlug(name)` lowercases and replaces non-alphanumeric runs with dashes (e.g. "James S.A. Corey" → `james-s-a-corey`).
To find the exact series name: query the DB — `series` column must match exactly.

### 4. Add the hero banner
Banner images are created and managed by the user separately. Your only job here is:

1. Add the slug to the `ReadingOrderImageSlug` union type in `src/data/image-map.ts`
2. Add an entry to `READING_ORDER_IMAGE_SLUG` in the same file:
   ```ts
   'my-series': 'my-series',
   ```

Do NOT tell the user that a banner image is missing or needs to be created. The image exists. Step 4 done.

---

## Book List — Order and Labels

### Always list books in recommended reading order

The guide IS the reading order. List books in the order readers should read them.
Do **not** label the group sublabel as "publication order — recommended" — the guide is a reading guide, not a publication history. Use `sublabel: 'read in this order'` or omit the sublabel entirely.

### Don't add seriesLabel overrides unless necessary

The DB handles series numbering automatically. Only override `seriesLabel` when:
- The book belongs to a sub-series (e.g. `'Harper Hall #1'`)
- The book has no DB series_number and needs a descriptive label (e.g. `'Short Stories'`)
- The DB numbering would be misleading (e.g. after renumbering when books are removed from the sequence)

**Never** add `seriesLabel` entries like `'Pub #1 · Chrono #2'` to show two orderings simultaneously — handle the debate in cards and sections instead.

**Never use `position`** when the DB series_label already shows the same number. For a single-sequence series (every book is "Series #N"), `position` renders "#N in series" directly above "Series #N" — a straight duplicate. Only use `position` when the book's place in the overall series is different from or not conveyed by the DB series_label (e.g. Discworld sub-series groupings where the sub-series number differs from the overall #41).

**Never** set `seriesLabel: ''` to suppress the DB-generated series label. If the DB label is redundant (e.g. every book in a single-series guide shows "Xanth #N"), leave it — do not blank it out. The DB label is the canonical source; suppressing it removes information.

**Never put historical setting context in `seriesLabel`** — e.g. `'Standalone — Renaissance Italy'` or `'Kitai Duology #1 — Tang Dynasty'`. The seriesLabel renders as a small, barely readable tag. Historical/setting context belongs in the book's `note` field, where it is actually read.

Rules:
- Pure standalones (no series): omit `seriesLabel` entirely; put setting info in the first sentence of `note`
- Series books: use only the series numbering, e.g. `'The Sarantine Mosaic #1'`, `'Kitai Duology #1'`, `'Renaissance quartet #1'` — never append `— Setting Name` or `— century`

### When publication ≠ recommended reading order

List books in the recommended reading order. Explain the debate entirely in cards and sections.
Do not try to encode both orders in the book list at the same time — it creates confusion, not clarity.

---

## Cards — Ordering Principle

Cards sit above the book list and orient a first-time reader. Order them so they answer questions in the sequence a reader actually has them:

1. **Author** — who wrote this, when, what else they wrote
2. **What to expect** — tone, allegory, content, what makes this series unusual
3. **The key decision** — reading order debate, entry point choice, series structure
4. **The answer** — why one option is recommended
5. **Background/context** — interesting facts, relationships to other authors, legacy
6. **The finale** — a note on the last book, especially if divisive

The author card is always first for classic/older series where context matters. For new/ongoing series it can move later. The finale card is always last.

---

## Section Types — Full List

```ts
type?: 'bullets' | 'prose' | 'warning' | 'spoiler'
```

- `'bullets'` — bullet list, generates FAQ schema (default, most common)
- `'prose'` — single paragraph, generates FAQ schema
- `'warning'` — amber styling with ⚠️ prefix, generates FAQ schema. Use for content issues a reader needs to know before starting (dated attitudes, dark content, narrative problems)
- `'spoiler'` — hidden behind a reveal toggle. Use for plot revelations from late in the series (character deaths, ending controversies, major twists). **Do not put end-of-series revelations in a `'warning'` section** — that renders them in plain view

The top-level `warning:` string field (separate from sections) renders as an amber banner directly below the description, before everything else. Use it for critical reading guidance that must be seen immediately — e.g., "most copies in print have the wrong book #1."

---

## Interludes and Interquels

**Always place an interlude where it falls in the reading timeline — not at the end of the book list.**

If a book is set between two other books in the series, it belongs between those two books in the guide, regardless of when it was published. Use `seriesLabel` to signal its position:
```ts
seriesLabel: 'Interlude — between #4 and #5'
```
Set `status: 'supplementary'` if it is not essential to the main plot, but still list it in position.

Do not add a note saying "most readers read it after the main series" or "either works" — pick the correct position and list it there. If the author or series defines a canonical placement, use it.

Examples:
- **The Wind Through the Keyhole** (Dark Tower) — set between books 4 and 5; listed between books 4 and 5
- **Port of Shadows** (Black Company) — written in 2018 but set between books 1 and 2; note the placement in the book's `note` field if it is a minor addition, or list it in position if it is substantial

---

## Publication Order Strip

Only add when publication order significantly differs from recommended reading order AND readers
commonly debate which to follow. Current cases where this matters:

- **Discworld** — publication vs sub-series order is a genuine debate
- **Narnia** — publication vs chronological is THE debate
- **Dune** — Herbert originals vs Brian Herbert continuations fork

For most series the book list already is publication order — a second strip adds nothing.

---

## Audit Checklist (use before publishing a new guide)

### Content
- [ ] `description` leads with what makes the series distinctive — does NOT end with "Start with X"
- [ ] `orderNote` answers the reading order question in one paragraph; "Start with X" lives here, not in `description`
- [ ] 6 cards present, `cardsPosition: 'above'`
- [ ] "Content notes" section present: darkness type, romance level, explicit content (yes/no), reader fit (one line each — or covered by a "What is X?" section)
- [ ] Reader fit in Content notes is its own dedicated bullet — not embedded inside a bullet that also makes an observation about the series
- [ ] Series-specific section present only if it answers a real search query not covered elsewhere
- [ ] "Why it matters" section present for established series; skipped for newer series without legacy
- [ ] `darkness` array filled per arc with `desc` for each entry
- [ ] `characters` array present with correct count for series size; every `why_they_work` follows the four-option rule (not restating Role/Faction)
- [ ] `seriesStatusLabel` includes most recent book + year for ongoing series
- [ ] `booksLikeSlug` filled if a Books Like page exists for this series — check `src/data/books-like/` for a file matching the series name or first book slug before writing the guide
- [ ] `related` has exactly 6 slugs of genuinely similar series
- [ ] All book slugs verified to exist in DB (`node scripts/check-reading-order-books.mjs`)

### AI Slop Check — run this AFTER writing the full guide, not during
Read every card body, every `why_they_work`, every book note, and every section bullet in sequence and apply the test to each sentence before considering the guide done.

- [ ] No aphorisms — every sentence contains specific information, not compressed wisdom
- [ ] No consensus hedges ("widely considered," "many readers," "often cited") — state opinions directly
- [ ] No reader-response formulas ("if you find X, the book is working," "readers who want Y will be disappointed")
- [ ] No financial metaphors for prose ("earns its weight," "rewards patience," "pays off," "paid forward")
- [ ] No abstract virtue lists ("love, loyalty, sacrifice, the cost of resistance")
- [ ] No em-dashes: two-dash parentheticals → parentheses; single-dash clause links → period; pre-clarification dashes → colon
- [ ] No vague fillers: "engine of the story/book/series", "reframes everything that came before", "carries the narrative weight", "not trying to be anything other than what it is", "depending on what you want from it"
- [ ] Generic sentence test applied to every card body and `why_they_work`: could this sentence describe any book in the genre? If yes, rewrite it with something specific to this series
- [ ] Generic sentence test applied to every darkness `desc`: could this describe any dark fantasy? If yes, name what specifically makes this series or arc dark

### No-Duplicate Check (run through every guide before publishing)
- [ ] `description` does not end with "Start with X" — that sentence is in `orderNote` only
- [ ] No "Where to start" section if the entry point is already clear from mandatory badges + `orderNote`. If a "Where to start" card exists, there is no "Where to start" section
- [ ] Every card body checked against every section bullet — no point appears in both
- [ ] Every card body checked against `description` — no fact restated from description into a card
- [ ] Reading order instruction ("read A before B") stated in one place only — not in `orderNote` + group `sublabel` + book `note` all at once
- [ ] Darkness `desc` fields do not start with the series/arc name already in `label`
- [ ] Influence/legacy author names appear in `description` OR "Why it matters" bullets — not both
- [ ] Edition notes and release dates appear in one field only
