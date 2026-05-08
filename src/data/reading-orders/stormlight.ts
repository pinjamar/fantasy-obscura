import type { ReadingOrderEntry } from '../reading-orders';

export const stormlight: ReadingOrderEntry = {
  slug: 'stormlight',
  name: 'The Stormlight Archive',
  author: 'Brandon Sanderson',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '✓ First Arc Complete (5 books)',
  description:
    'The most ambitious epic fantasy currently being written. A world of perpetual storms, ancient knights, and a cosmology that rewards every re-read. Each book raises the stakes. The payoff across the arc is extraordinary. The Way of Kings is where to start — and while Warbreaker is optional, reading it before Words of Radiance enriches book two considerably. This is the Stormlight Archive reading order most readers recommend.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  books: [
    {
      title: 'The Way of Kings',
      slug: 'the-way-of-kings',
      status: 'mandatory',
      note: 'Start here. Kaladin, Shallan, Dalinar. Worldbuilding unlike anything else in fantasy.',
      page_count: 1007,
      publication_year: 2010,
    },
    {
      title: 'Words of Radiance',
      slug: 'words-of-radiance',
      status: 'mandatory',
      note: 'Raises the bar on every level. Best fight scenes Sanderson has written.',
      page_count: 1088,
      publication_year: 2014,
    },
    {
      title: 'Warbreaker',
      slug: 'warbreaker',
      status: 'optional',
      note: "Standalone Cosmere novel. Free on Sanderson's site. Read here — before Oathbringer — for a meaningful payoff in book 3.",
      page_count: 592,
      publication_year: 2009,
    },
    {
      title: 'Edgedancer',
      slug: 'edgedancer',
      status: 'supplementary',
      note: 'Novella about Lift (~40k words). Short but adds important context — read before Oathbringer.',
      page_count: 226,
      publication_year: 2016,
    },
    {
      title: 'Oathbringer',
      slug: 'oathbringer',
      status: 'mandatory',
      note: "Dalinar's history revealed. Largest worldbuilding expansion in the series.",
      page_count: 1248,
      publication_year: 2017,
    },
    {
      title: 'Dawnshard',
      slug: 'dawnshard',
      status: 'supplementary',
      note: 'Novella with Rysn (~26k words). Sets up important elements for Rhythm of War.',
      page_count: 176,
      publication_year: 2020,
    },
    {
      title: 'Rhythm of War',
      slug: 'rhythm-of-war',
      status: 'mandatory',
      note: 'Politics, science, and mental health. More divisive than earlier books but crucial for book 5.',
      page_count: 1232,
      publication_year: 2020,
    },
    {
      title: 'Wind and Truth',
      slug: 'wind-and-truth',
      status: 'mandatory',
      note: 'Closes the first 5-book arc. Massive Cosmere convergence.',
      page_count: 1330,
      publication_year: 2024,
    },
  ],
  orderNote:
    "Read in publication order. Position the novellas as listed — they're short but add meaningful context.",
  cards: [
    {
      title: '📏 The Commitment',
      body: 'Five books. Each one is 1,000–1,330 pages. This is not a casual read — it is a multi-year undertaking for most people. The Way of Kings also has a slow opening (~200 pages before the series finds its stride). Go in knowing what you are signing up for. The payoff is extraordinary.',
      color: 'blue',
    },
    {
      title: '💙 Kaladin',
      body: 'Kaladin Stormblessed is one of the finest protagonists in modern fantasy. His arc is about depression, hopelessness, and finding a reason to protect people when you have every reason not to. Sanderson handles it with unusual care and honesty. His chapters are why most readers keep going.',
      color: 'purple',
    },
    {
      title: '🌌 The Cosmere',
      body: "Stormlight is part of Sanderson's Cosmere — a shared universe across multiple series. Each book stands alone, but connections accumulate. Warbreaker (a standalone Cosmere novel, free on Sanderson's site) is positioned before Oathbringer in this guide — a character from it appears in book 3 and the payoff is significant.",
      color: 'green',
    },
  ],
  cardsPosition: 'above',
  warning:
    'Rhythm of War (book 4) is the most divisive entry — slower, more focused on politics and mental health, with less of the kinetic action that defines the earlier books. It is also essential. The setup it creates is the foundation for Wind and Truth. Push through even if it feels like a detour.',
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Each book is 1,000–1,330 pages. Prepare for the long game.',
        'Reading Warbreaker (a standalone Cosmere novel) before book 3 adds a significant reward. Not required.',
        'Part of the broader Cosmere universe — connections become clearer as you read more Sanderson.',
        'The Way of Kings has a slow opening (~200 pages of setup). The payoff begins in part 3.',
      ],
    },
    {
      heading: 'Spoiler-free notes',
      type: 'bullets',
      bullets: [
        "Kaladin's arc is about depression and finding a reason to live. Handled with unusual care for genre fiction.",
        'Each main book focuses on a different primary POV while continuing all storylines.',
        'Rhythm of War is the most divisive book — the setup it creates is essential for Wind and Truth.',
        'Wind and Truth closes the first arc. A second arc of five books is planned but unwritten.',
      ],
    },
  ],
  darkness: [
    { label: 'Books 1–2', level: 3, desc: 'War, loss, slavery — fundamentally hopeful' },
    { label: 'Books 3–4', level: 3, desc: 'Genocide, addiction, occupation' },
    { label: 'Wind and Truth', level: 4, desc: 'The stakes have never been higher' },
  ],
  finishedLabel: 'Finished the arc?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'the-way-of-kings',
  related: ['cosmere', 'wheel-of-time'],
};
