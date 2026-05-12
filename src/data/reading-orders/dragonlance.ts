import type { ReadingOrderEntry } from '../reading-orders';

export const dragonlance: ReadingOrderEntry = {
  slug: 'dragonlance',
  name: 'Dragonlance',
  author: 'Margaret Weis & Tracy Hickman',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Core Series Complete',
  description:
    'The defining D&D fantasy series of the 1980s. Dragonlance introduced a generation to epic fantasy — a world of dragons, knights, and gods, with a cast of companions whose dynamics defined the genre. The Chronicles trilogy is required reading for fantasy history; the Legends trilogy, following the mage Raistlin, is widely considered the better work. Between them, they represent the peak of TSR-era fantasy fiction. Dragons of Autumn Twilight is where to start. Read Chronicles first, then Legends — the Dragonlance reading order for those two trilogies is the foundation everything else builds on.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  groups: [
    {
      label: 'The Chronicles Trilogy',
      sublabel: 'Start here — the original Dragonlance',
      books: [
        {
          title: 'Dragons of Autumn Twilight',
          slug: 'dragons-of-autumn-twilight',
          status: 'mandatory',
          note: 'The Companions reunite in a world at war with dragons. Classic fantasy adventure — the template for the genre.',
          page_count: 447,
          publication_year: 1984,
        },
        {
          title: 'Dragons of Winter Night',
          slug: 'dragons-of-winter-night',
          status: 'mandatory',
          note: "The war spreads. Raistlin's ambitions take a darker turn. The best book in the Chronicles.",
          page_count: 399,
          publication_year: 1985,
        },
        {
          title: 'Dragons of Spring Dawning',
          slug: 'dragons-of-spring-dawning',
          status: 'mandatory',
          note: 'The war ends. The Companions are broken and changed. A bittersweet conclusion.',
          page_count: 399,
          publication_year: 1985,
        },
      ],
    },
    {
      label: 'The Legends Trilogy',
      sublabel: "Raistlin's story — widely considered the better trilogy",
      note: "Read Chronicles first. Legends is darker, more ambitious, and centres entirely on Raistlin — one of fantasy's greatest antiheroes.",
      noteType: 'required',
      books: [
        {
          title: 'Time of the Twins',
          slug: 'time-of-the-twins',
          status: 'mandatory',
          note: 'Raistlin travels back in time with his twin Caramon. His bid for godhood begins. Darker and more focused than Chronicles.',
          page_count: 373,
          publication_year: 1986,
        },
        {
          title: 'War of the Twins',
          slug: 'war-of-the-twins',
          status: 'mandatory',
          note: "The consequences of time travel ripple outward. Raistlin's plan comes into focus — brilliant and terrifying.",
          page_count: 372,
          publication_year: 1986,
        },
        {
          title: 'Test of the Twins',
          slug: 'test-of-the-twins',
          status: 'mandatory',
          note: "The conclusion of Raistlin's arc. One of the most memorable endings in fantasy — haunting and earned.",
          page_count: 308,
          publication_year: 1986,
        },
      ],
    },
    {
      label: 'Optional — Extended Universe',
      sublabel: 'Hundreds of Dragonlance novels exist beyond these six',
      note: 'The core experience is the six books above. Everything below is optional — interesting for fans but not required.',
      noteType: 'optional',
      books: [
        {
          title: 'The Second Generation',
          slug: 'the-second-generation',
          status: 'optional',
          note: 'Short stories featuring the children of the original Companions. Bridge to Dragons of Summer Flame.',
          page_count: 389,
          publication_year: 1994,
        },
        {
          title: 'Dragons of Summer Flame',
          slug: 'dragons-of-summer-flame',
          status: 'optional',
          note: 'Weis & Hickman return. A new war, a new dragon invasion. Leads into the Fifth Age era.',
          page_count: 506,
          publication_year: 1995,
        },
      ],
    },
  ],
  orderNote:
    'Read Chronicles first, then Legends. The two trilogies are deeply intertwined — Legends only works if you know the Chronicles cast.',
  cardsPosition: 'above',
  cards: [
    {
      title: '🐉 The Setting',
      body: 'Krynn is a world of knights, gods, and dragon armies — high fantasy in the truest sense. The magic system (White/Red/Black robes) and the god-given magic of clerics shaped the D&D ruleset for decades.',
      color: 'blue',
    },
    {
      title: '🧙 Raistlin',
      body: 'The mage Raistlin Majere is the reason Dragonlance endures. A frail, bitter genius consumed by ambition — morally grey before that was common in fantasy. The Legends trilogy is fundamentally his story.',
      color: 'purple',
    },
    {
      title: '📖 Historical note',
      body: 'Dragonlance was designed alongside the D&D game modules in 1984. It feels that way — structured, episodic, occasionally clunky. The Legends trilogy transcends its origins; Chronicles is more nostalgic than great.',
      color: 'amber',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        "Start with Dragons of Autumn Twilight. It's episodic and occasionally slow but establishes the world and cast.",
        "If Chronicles feels dated, push through — the Legends trilogy is the payoff and it's significantly better.",
        "Already read Chronicles? Go straight to Legends. It's the reason Dragonlance is still read today.",
        "Only want to read one trilogy? Read Legends. You'll miss some context but it stands on its own better than Chronicles.",
      ],
    },
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'Chronicles was written to accompany D&D adventure modules — the pacing reflects this. Some chapters feel like game sessions.',
        "Raistlin is one of the first major antiheroes in fantasy. His arc in Legends is one of the genre's finest.",
        'The world has been expanded by over 190 novels by dozens of authors. Only the Weis & Hickman books are essential.',
        'A film adaptation (Dragons of Autumn Twilight, 2008) exists but is widely considered poor — ignore it.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Chronicles Trilogy',
      level: 3,
      desc: 'Moderate — war, loss, and sacrifice throughout',
    },
    {
      label: 'Legends Trilogy',
      level: 3,
      desc: 'Moderate — moral complexity, darker ambition, sacrifice',
    },
  ],
  lastUpdated: '2026-05-12',
  finishedLabel: 'Finished Weis & Hickman?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['drizzt', 'wheel-of-time', 'cosmere'],
};
