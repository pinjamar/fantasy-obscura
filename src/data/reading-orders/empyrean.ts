import type { ReadingOrderEntry } from '../reading-orders';

export const empyrean: ReadingOrderEntry = {
  slug: 'empyrean',
  name: 'The Empyrean',
  author: 'Rebecca Yarros',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '⏳ Ongoing Series',
  description:
    "Military fantasy academy meets dragon-rider romance — fast-paced, explicitly romantic, and increasingly dark as the series progresses. Fourth Wing reads like romantasy; by Onyx Storm it's leaning hard into epic fantasy. If you're here for the romance and action combo, all three books deliver. If explicit content isn't for you, this series isn't for you. Fourth Wing is where to start — no prior reading required. The Empyrean reading order is: Fourth Wing → Iron Flame → Onyx Storm, with more books planned.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark · 🔥🔥🔥🔥 Explicit',
  groups: [
    {
      label: 'Published',
      sublabel: 'books 1–3',
      noteType: 'required',
      note: 'All three books are essential and must be read in order. The series ends on a cliffhanger — you will be waiting for book 4.',
      books: [
        {
          title: 'Fourth Wing',
          slug: 'fourth-wing',
          status: 'mandatory',
          note: 'Start here. Violet Sorrengail enters Basgiath War College to become a rider. Fast pacing, strong voice, explicit romance begins immediately.',
          page_count: 517,
          publication_year: 2023,
        },
        {
          title: 'Iron Flame',
          slug: 'iron-flame',
          status: 'mandatory',
          note: 'Raises the stakes considerably — the war plot becomes the focus and the world expands. Longer and denser than book one.',
          page_count: 623,
          publication_year: 2023,
        },
        {
          title: 'Onyx Storm',
          slug: 'onyx-storm',
          status: 'mandatory',
          note: 'The series shifts into full epic fantasy territory. Higher body count, bigger consequences, a lot of threads in motion.',
          page_count: 608,
          publication_year: 2025,
        },
      ],
    },
    {
      label: 'Coming Soon',
      sublabel: 'books 4–5 — no release dates yet',
      noteType: 'optional',
      note: 'Yarros confirmed in March 2026 that she is actively writing book 4. No title or release date announced. The series is planned for 5 books total.',
      books: [
        {
          title: 'Empyrean Book 4',
          slug: null,
          status: 'upcoming',
          note: 'Title not yet revealed. Yarros began writing in early 2026. Expected POVs include Violet, Xaden, Dain, and Ridoc.',
          page_count: null,
          publication_year: null,
        },
        {
          title: 'Empyrean Book 5',
          slug: null,
          status: 'upcoming',
          note: 'The planned series finale. No details announced.',
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  orderNote:
    'Publication order is the only order. No companion novels or prequels currently exist.',
  cards: [
    {
      title: '🐉 The Hook',
      body: 'Fourth Wing is the entry drug — fast, romantic, and addictive. The dragon bond and the enemies-to-lovers tension carry the first book almost entirely on their own.',
      color: 'blue',
    },
    {
      title: '⚔️ The Shift',
      body: 'Iron Flame is heavier. The war stakes become real and Yarros starts killing characters. Romance is still central but the fantasy plot takes over by the end.',
      color: 'amber',
    },
    {
      title: '🔥 Content Note',
      body: 'All three books contain explicit sexual content. The series also involves war violence, character death, and trauma. Not suitable for younger readers.',
      color: 'purple',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'New to the series? Start with Fourth Wing — the only entry point. The series is strictly sequential.',
        'Loved Fourth Wing, unsure about continuing? Iron Flame is the weaker book of the two — more setup than payoff — but Onyx Storm rewards the patience. If you made it to the end of Iron Flame, keep going.',
        'Not into explicit romance? This series is not a good fit. The romance is central to every book and the explicit content is not toned down.',
      ],
    },
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'The series is planned for 5 books. Books 1–3 form a clear arc but end on a cliffhanger — you will be waiting for book 4.',
        "The magic system (sigils, riders, dragon bonds) is explained gradually — don't worry if the first 50 pages feel like a lot of lore.",
        'Violet has a chronic illness/connective tissue disorder — this is handled with care and is central to her character.',
        'The series gets darker with each book. If you found Fourth Wing light, expect that to change.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Fourth Wing',
      level: 3,
      desc: 'Serious — danger and death, but romantic and exciting',
    },
    {
      label: 'Iron Flame',
      level: 4,
      desc: 'Dark — war becomes real, character losses hurt',
    },
    {
      label: 'Onyx Storm',
      level: 4,
      desc: 'Dark — higher stakes, more brutal consequences',
    },
  ],
  lastUpdated: '2026-05-12',
  finishedLabel: "Finished what's published?",
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: ['acotar', 'throne-of-glass'],
};
