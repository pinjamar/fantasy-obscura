import type { ReadingOrderEntry } from '../reading-orders';

export const throneOfGlass: ReadingOrderEntry = {
  slug: 'throne-of-glass',
  name: 'Throne of Glass',
  author: 'Sarah J. Maas',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Completed Series',
  description:
    'An assassin forced to compete for her freedom becomes the fulcrum of a war against an immortal darkness. Starts as a YA competition novel and grows into a full-scale epic fantasy with Fae, ancient magic, and a world-ending threat. The series earns its scope. Throne of Glass is where to start. Readers who finish the full series before beginning ACOTAR will catch every crossover — this reading order is designed for maximum SJM payoff.',
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Main Series',
      sublabel: 'books 1–5 + optional prequel',
      noteType: 'required',
      note: "All main books are essential and must be read in order. The Assassin's Blade (prequel) is optional — read it after Throne of Glass or skip it. The series takes off at Crown of Midnight.",
      books: [
        {
          title: 'Throne of Glass',
          slug: 'throne-of-glass',
          status: 'mandatory',
          note: 'Start here. Celaena Sardothien, assassin, enters a deadly competition in a corrupt kingdom.',
          page_count: 404,
          publication_year: 2012,
        },
        {
          title: "The Assassin's Blade",
          slug: 'the-assassins-blade',
          status: 'optional',
          note: 'Five prequel novellas in one volume. Best read after Throne of Glass — contains spoilers for book 1.',
          page_count: 432,
          publication_year: 2014,
        },
        {
          title: 'Crown of Midnight',
          slug: 'crown-of-midnight',
          status: 'mandatory',
          note: 'The series finds its footing. Darker, faster, with a reveal that reframes everything.',
          page_count: 418,
          publication_year: 2013,
        },
        {
          title: 'Heir of Fire',
          slug: 'heir-of-fire',
          status: 'mandatory',
          note: 'The world expands massively. Magic, Fae, and the true threat are introduced. A turning point.',
          page_count: 565,
          publication_year: 2014,
        },
        {
          title: 'Queen of Shadows',
          slug: 'queen-of-shadows',
          status: 'mandatory',
          note: 'Aelin returns to Rifthold. High stakes, new alliances, and a cast that finally converges.',
          page_count: 648,
          publication_year: 2015,
        },
        {
          title: 'Empire of Storms',
          slug: 'empire-of-storms',
          status: 'mandatory',
          note: 'The war begins in earnest. Read alongside Tower of Dawn or before it — both cover the same timeline.',
          page_count: 689,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Finale',
      sublabel: 'Tower of Dawn + Kingdom of Ash — read back-to-back',
      noteType: 'warning',
      note: "Tower of Dawn runs parallel to Empire of Storms from Chaol's POV. Option A: read EoS then ToD in full. Option B: alternate chapters using an online reading guide. Do not skip ToD — its events are essential for Kingdom of Ash.",
      books: [
        {
          title: 'Tower of Dawn',
          slug: 'tower-of-dawn',
          status: 'mandatory',
          note: "Chaol's story, running parallel to Empire of Storms. Read EoS first or alternate chapters using a reading guide.",
          page_count: 660,
          publication_year: 2017,
        },
        {
          title: 'Kingdom of Ash',
          slug: 'kingdom-of-ash',
          status: 'mandatory',
          note: 'The finale. All characters and storylines converge for the last battle. Massive in scope.',
          page_count: 992,
          publication_year: 2018,
        },
      ],
    },
  ],
  orderNote:
    'Publication order is the correct order. The Empire of Storms / Tower of Dawn overlap is the one structural complication — see the warning above.',
  warning:
    'Empire of Storms and Tower of Dawn cover the same timeline from different POVs. Option A (recommended): read EoS in full, then Tower of Dawn. Option B: alternate chapters using an online interleave guide (search "ToG EoS ToD reading guide") — more work, better immersion. Do not skip Tower of Dawn regardless — its events are essential for the finale.',
  cards: [
    {
      title: '📈 Stick With Book 1',
      body: "Throne of Glass is the weakest entry. The competition premise feels YA-light, and the protagonist is deliberately unreliable about who she really is. Crown of Midnight is where the series finds its voice — darker, faster, with a reveal that reframes everything before it. Don't judge the series on book 1 alone.",
      color: 'blue',
    },
    {
      title: '🌍 The Tone Shift',
      body: 'This series starts as YA-adjacent and ends as full-scale epic fantasy with world-ending stakes, ancient magic, and a body count. The shift is gradual but real — by Heir of Fire (book 3) the Fae, the true antagonist, and the larger mythology arrive. Book 7 is not the same genre as book 1.',
      color: 'green',
    },
    {
      title: '🔗 The SJM Universe',
      body: 'Throne of Glass and ACOTAR share a universe — characters and lore cross over, and reading ToG first adds significant context to ACOTAR. Maas has said the full picture only emerges across both series. If you plan to read both, start here.',
      color: 'purple',
    },
    {
      title: "📖 The Assassin's Blade",
      body: 'Five prequel novellas collected in one volume. Optional — the main series works without them. Best read after book 1 (they spoil nothing forward, but hit harder once you know Celaena). Skip entirely if you want to stay on the main thread.',
      color: 'amber',
    },
  ],
  cardsPosition: 'above',
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        "The first book is the weakest. The series takes off at Crown of Midnight. Don't judge it on book 1 alone.",
        'Heir of Fire is when the magic system, the Fae, and the true antagonist arrive. This is where it becomes epic fantasy.',
        'The protagonist goes by Celaena in early books — her name and identity evolve over the series. This is intentional.',
        'The series grows significantly darker from book 3 onward. Book 1 is YA-adjacent. Book 7 is not.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Books 1–2',
      level: 2,
      desc: 'Competition, intrigue, assassination — relatively contained',
    },
    {
      label: 'Books 3–5',
      level: 3,
      desc: 'War builds, magic escalates, loss becomes real',
    },
    {
      label: 'Books 6–7',
      level: 4,
      desc: 'Full-scale war, sacrifice, world-ending stakes',
    },
  ],
  finishedLabel: 'Finished the series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['acotar', 'blood-and-ash'],
};
