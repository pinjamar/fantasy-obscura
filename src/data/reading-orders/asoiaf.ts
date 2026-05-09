import type { ReadingOrderEntry } from '../reading-orders';

export const asoiaf: ReadingOrderEntry = {
  slug: 'asoiaf',
  name: 'A Song of Ice and Fire',
  author: 'George R.R. Martin',
  seriesStatus: 'incomplete',
  seriesStatusLabel: '⚠️ Unfinished Series',
  description:
    'The series that redefined epic fantasy for a generation. Five books of political chess, moral complexity, and the systematic destruction of the idea that protagonists are safe. No character is guaranteed survival; no storyline is guaranteed resolution. Read the books — they are significantly richer than the show. A Game of Thrones is where to start. The ASOIAF reading order is linear; the series is currently unfinished at five books, with The Winds of Winter still unannounced.',
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  books: [
    {
      title: 'A Game of Thrones',
      slug: 'a-game-of-thrones',
      status: 'mandatory',
      note: 'The foundation. Introduces the major houses, the political web, and the first major shock that signals what kind of series this is.',
      page_count: 694,
      publication_year: 1996,
    },
    {
      title: 'A Clash of Kings',
      slug: 'a-clash-of-kings',
      status: 'mandatory',
      note: "Five kings claim the throne. The political complexity doubles and the world expands beyond King's Landing.",
      page_count: 768,
      publication_year: 1998,
    },
    {
      title: 'A Storm of Swords',
      slug: 'a-storm-of-swords',
      status: 'mandatory',
      note: 'The peak of the series. Contains the most devastating and celebrated chapters Martin has written. Do not look anything up.',
      page_count: 973,
      publication_year: 2000,
    },
    {
      title: 'A Feast for Crows',
      slug: 'a-feast-for-crows',
      status: 'mandatory',
      note: 'Slower, more political. Many fan-favourite characters are absent — Martin split books 4 and 5 by POV, not timeline.',
      page_count: 753,
      publication_year: 2005,
    },
    {
      title: 'A Dance with Dragons',
      slug: 'a-dance-with-dragons',
      status: 'mandatory',
      note: 'Runs parallel to Feast for the first half, then moves forward. The series is unfinished here — book 6 has no release date.',
      page_count: 1016,
      publication_year: 2011,
    },
    {
      title: 'The Winds of Winter',
      slug: null,
      status: 'upcoming',
      note: 'In progress since 2011. No confirmed release date.',
      page_count: null,
      publication_year: null,
    },
    {
      title: 'A Dream of Spring',
      slug: null,
      status: 'upcoming',
      note: 'Final book in the series. Unwritten.',
      page_count: null,
      publication_year: null,
    },
  ],
  orderNote:
    'Publication order is the only order. There are no prequels or companion novels required for the main series.',
  cardsPosition: 'above',
  cards: [
    {
      title: '⚡ The Peak',
      body: 'A Storm of Swords is the series at its best — dense, brutal, and with some of the most discussed chapters in modern fantasy. Do not look anything up before reading it.',
      color: 'blue',
    },
    {
      title: '📖 Books 4 & 5',
      body: 'Martin split the story by POV character across two books covering the same timeline. A Feast for Crows and A Dance with Dragons are best read back-to-back.',
      color: 'amber',
    },
    {
      title: '⚠️ The Wait',
      body: 'The Winds of Winter has been in progress since 2011 with no confirmed release date. Read the published books knowing this.',
      color: 'red',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'New to the series? Start with A Game of Thrones — there is no other entry point. The series requires sequential reading.',
        'Watched the show? Still start from book one. The books diverge significantly from season 5 onwards and have substantially richer plotting throughout.',
        'Should you read the prequels? Fire & Blood and The World of Ice and Fire are supplementary lore — not required, best read after completing the main series.',
      ],
    },
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'No character is plot-armoured. Major POV characters die. Do not get attached to narrative convention.',
        'The first 100 pages of A Game of Thrones are slow world-building. The series earns its reputation from chapter 6 onwards.',
        'A Feast for Crows is the most divisive book — slower pace, unfamiliar POVs. Push through; Dance rewards it.',
        'The Dunk & Egg novellas (Tales of Dunk and Egg) are standalone prequels set 90 years earlier. Good but non-essential.',
        'Avoid the wiki. Seriously. This series is best experienced blind.',
      ],
    },
  ],
  darkness: [
    {
      label: 'A Game of Thrones',
      level: 5,
      desc: 'Brutal from the start — political violence, executions, moral ambiguity',
    },
    {
      label: 'A Clash of Kings',
      level: 4,
      desc: 'Dark — war begins in earnest, atrocities multiply',
    },
    {
      label: 'A Storm of Swords',
      level: 5,
      desc: "Brutal — the series' most devastating events back to back",
    },
    {
      label: 'A Feast for Crows',
      level: 4,
      desc: 'Dark — aftermath, political decay, diminishing hope',
    },
    {
      label: 'A Dance with Dragons',
      level: 4,
      desc: 'Dark — isolation, survival, and hard choices',
    },
  ],
  finishedLabel: 'Finished the published books?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'a-game-of-thrones',
  related: ['first-law', 'malazan', 'wheel-of-time', 'mark-lawrence', 'black-company', 'witcher'],
};
