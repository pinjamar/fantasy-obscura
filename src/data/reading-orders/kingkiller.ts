import type { ReadingOrderEntry } from '../reading-orders';

export const kingkiller: ReadingOrderEntry = {
  slug: 'kingkiller',
  name: 'The Kingkiller Chronicle',
  author: 'Patrick Rothfuss',
  seriesStatus: 'incomplete',
  seriesStatusLabel: '⚠️ Incomplete — Book 3 unreleased',
  description:
    'A legendary hero sits in a country inn and tells a scribe his life story over three days. Rothfuss writes with more craft and precision than almost anyone in the genre — and book 3 has been in development since 2011 with no release date. The Name of the Wind is where to start — one of the most acclaimed fantasy debuts ever written. Be aware before you begin: the Kingkiller Chronicle reading order currently ends on a cliffhanger, with no confirmed date for The Doors of Stone.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  cardsPosition: 'above',
  books: [
    {
      title: 'The Name of the Wind',
      slug: 'the-name-of-the-wind',
      status: 'mandatory',
      note: 'Day one of Kvothe telling his story. Lyrical, slow-burn, unforgettable prose.',
      page_count: 662,
      publication_year: 2007,
    },
    {
      title: "The Wise Man's Fear",
      slug: 'the-wise-mans-fear',
      status: 'mandatory',
      note: 'Day two. Longer, more divisive, but essential. The Adem sequences are polarising.',
      page_count: 994,
      publication_year: 2011,
    },
    {
      title: 'The Slow Regard of Silent Things',
      slug: 'the-slow-regard-of-silent-things',
      status: 'supplementary',
      note: 'Novella about Auri alone in the Underthing. No plot — pure atmosphere. Read only if you loved Auri.',
      page_count: 159,
      publication_year: 2014,
    },
    {
      title: 'The Doors of Stone',
      slug: null,
      status: 'incomplete',
      note: 'Book 3 and the trilogy finale. No release date announced as of 2026 — in development since 2011.',
      page_count: null,
      publication_year: null,
    },
  ],
  warning:
    'The Doors of Stone (book 3) has been in development since 2011 with no release date as of 2026. Many readers prefer to wait before starting. The two published books end on open threads.',
  orderNote: 'Start with The Name of the Wind. No other order is possible.',
  cards: [
    {
      title: '✍️ The Prose',
      body: 'Rothfuss writes with more precision and beauty than almost anyone in the genre. The Name of the Wind is the most technically accomplished debut in modern fantasy — the prose alone is reason enough to read it.',
      color: 'blue',
    },
    {
      title: '⏳ The Wait',
      body: 'Book 3 has had no release date since 2011. Go in with eyes open — the series ends mid-story and may wait years more. Many readers choose to wait until The Doors of Stone is announced before starting.',
      color: 'amber',
    },
    {
      title: '📖 The Novella',
      body: 'The Slow Regard of Silent Things is optional — Rothfuss himself says it is not for everyone. It follows Auri with no plot. Skip it unless you found her fascinating. You will miss nothing essential.',
      color: 'purple',
    },
  ],
  sections: [
    {
      heading: 'The Slow Regard of Silent Things',
      type: 'prose',
      prose:
        'Rothfuss himself warns in the foreword that this novella is "not for everyone." It follows Auri — a side character from the main books — over seven days in the Underthing. There is almost no plot. It is a meditation. Only read it if you found Auri fascinating; otherwise skip it entirely without loss.',
    },
    {
      heading: 'What to expect',
      type: 'bullets',
      bullets: [
        'Lyrical, carefully crafted prose — the most technically accomplished writing in mainstream fantasy.',
        'Frame narrative — Kvothe is recounting his life, so there is dramatic irony built in from page one.',
        'Magic system based on "sympathy" (physics-based) and "naming" (true language) — rigorously defined.',
        "Slow-burn pacing. Book 1 covers Kvothe's first year at the University. Book 2, his second. This is intentional.",
        'Kvothe is an unreliable narrator — he is telling his own legend and may be embellishing.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Name of the Wind',
      level: 3,
      desc: 'Poverty, loss, abuse — but youthful energy dominates',
    },
    {
      label: "The Wise Man's Fear",
      level: 3,
      desc: 'War, assassins, fae — darker and more complex',
    },
  ],
  finishedLabel: 'Want more literary fantasy?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'the-name-of-the-wind',
  related: ['first-law', 'stormlight'],
};
