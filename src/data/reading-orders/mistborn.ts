import type { ReadingOrderEntry } from '../reading-orders';

export const mistborn: ReadingOrderEntry = {
  slug: 'mistborn',
  name: 'Mistborn',
  author: 'Brandon Sanderson',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing — Era 3 in progress',
  description:
    "Brandon Sanderson's Mistborn is one of the most ingeniously constructed fantasy series ever written — set on a world where the prophesied hero failed a thousand years ago and a dark lord has ruled ever since. The original trilogy is a complete story of revolution, consequence, and cosmic revelation. Era 2 jumps 300 years forward into a Western-flavoured world of guns, trains, and new Allomancers. Era 3 — currently in progress — will advance to a near-modern spy-thriller setting. Each era can be read largely standalone, but the rewards for reading all of them in order are enormous. The Final Empire is where to start — one of the best heist novels in fantasy and a complete story in its own right. If you're new to Sanderson, the Mistborn reading order is the most recommended entry point before tackling the broader Cosmere.",
  darknessDisplay: '🕯️🕯️🕯️ Serious',
  orderNote:
    'Extras are placed where they should actually be read, not just by series number. Secret History is #3.5 but positioned after Bands of Mourning — its note explains why. Era 3 (The Ghostbloods) is in progress — first book expected December 2028.',
  warning:
    "Mistborn is part of the wider Cosmere universe. Era 2's The Lost Metal contains significant Cosmere crossover content. Reading the Cosmere guide alongside this one is recommended for the full experience.",
  groups: [
    {
      label: 'Era 1 — The Original Trilogy',
      sublabel: 'start here — a complete story in three books',
      books: [
        {
          title: 'The Final Empire',
          slug: 'the-final-empire',
          status: 'mandatory',
          seriesLabel: 'Mistborn #1',
          note: 'Start here. A crew of thieves and Mistborn plan a heist to overthrow a god-emperor who has ruled for a thousand years. One of the best first novels in epic fantasy — the magic system, the world, and the twist all land perfectly.',
          page_count: 541,
          publication_year: 2006,
        },
        {
          title: 'The Eleventh Metal',
          slug: 'the-eleventh-metal',
          status: 'supplementary',
          seriesLabel: 'Mistborn #1.5',
          note: "~6k words. Kelsier's training before The Final Empire. Free on Sanderson's site. Best read right after The Final Empire.",
          page_count: 30,
          publication_year: 2011,
        },
        {
          title: 'The Well of Ascension',
          slug: 'the-well-of-ascension',
          status: 'mandatory',
          seriesLabel: 'Mistborn #2',
          note: 'The revolution succeeded — now the harder work begins. A political siege novel that tests your patience before delivering one of the best final acts in the trilogy. The slowest of the three but essential.',
          page_count: 590,
          publication_year: 2007,
        },
        {
          title: 'The Hero of Ages',
          slug: 'the-hero-of-ages',
          status: 'mandatory',
          seriesLabel: 'Mistborn #3',
          note: "Everything converges. The full cosmological scope of what Sanderson has been building is revealed. The climax answers questions you didn't know you were asking. One of the best trilogy conclusions in the genre.",
          page_count: 572,
          publication_year: 2008,
        },
      ],
    },
    {
      label: 'Era 2 — Wax and Wayne',
      sublabel: '300 years later — Western-flavoured Scadrial',
      books: [
        {
          title: 'The Alloy of Law',
          slug: 'the-alloy-of-law',
          status: 'mandatory',
          seriesLabel: 'Mistborn #4',
          note: 'A lighter, faster Mistborn — half the length of Era 1 books. Waxillium Ladrian is a lawman dragged back to the city. An excellent palate cleanser after the weight of Era 1.',
          page_count: 332,
          publication_year: 2011,
        },
        {
          title: 'Shadows of Self',
          slug: 'shadows-of-self',
          status: 'mandatory',
          seriesLabel: 'Mistborn #5',
          note: 'Darker and more personal than Alloy. A murderer is killing city leaders and Wax must uncover why. Important Cosmere lore drops and a gut-punch of an ending.',
          page_count: 383,
          publication_year: 2015,
        },
        {
          title: 'Allomancer Jak and the Pits of Eltania',
          slug: 'allomancer-jak-and-the-pits-of-eltania',
          status: 'supplementary',
          seriesLabel: 'Mistborn #5.5',
          note: 'Comedic pulp-adventure short set in the Era 2 world. Light, fun, self-contained. Part of the Arcanum Unbounded collection.',
          page_count: 35,
          publication_year: 2014,
        },
        {
          title: 'The Bands of Mourning',
          slug: 'the-bands-of-mourning',
          status: 'mandatory',
          seriesLabel: 'Mistborn #6',
          note: 'Adventure-quest plotting — Wax and the crew travel far from Elendel. Big reveals connecting to the broader Cosmere. The most fun of the Era 2 books.',
          page_count: 448,
          publication_year: 2016,
        },
        {
          title: 'Secret History',
          slug: 'mistborn-secret-history',
          status: 'supplementary',
          seriesLabel: 'Mistborn #3.5',
          note: 'Novella. Chronologically Era 1 — but must be read here, after Bands of Mourning, as it spoils Era 2 plot points. Shows what happened behind the scenes of Era 1. Essential for Cosmere readers.',
          page_count: 175,
          publication_year: 2016,
        },
        {
          title: 'The Lost Metal',
          slug: 'the-lost-metal',
          status: 'mandatory',
          seriesLabel: 'Mistborn #7',
          note: 'Era 2 finale. Massive Cosmere crossover payoff — characters and concepts from across the Cosmere converge on Scadrial. The most ambitious Mistborn book since Hero of Ages.',
          page_count: 528,
          publication_year: 2022,
        },
      ],
    },
    {
      label: 'Era 3 — The Ghostbloods',
      sublabel: 'coming 2028–2030 — not yet published',
      note: 'Officially titled The Ghostbloods. Era 3 advances Scadrial to a near-modern spy-thriller setting — cars, electricity, Cold War-era politics. Sanderson began writing after finishing Wind and Truth (2024) and gave the first public reading in late 2025. Three books planned; first expected December 2028.',
      noteType: 'optional',
      books: [],
    },
  ],
  cards: [
    {
      title: '⚗️ Era 1 (3)',
      body: 'The complete original trilogy. The best entry point and one of the finest fantasy trilogies ever written. Read all three before moving on.',
      color: 'blue',
    },
    {
      title: '🔫 Era 2 (4)',
      body: 'Wax and Wayne — Western-flavoured Mistborn set 300 years later. Faster and lighter than Era 1. The Lost Metal is the best Cosmere payoff yet published.',
      color: 'blue',
    },
    {
      title: '🕵️ Era 3 (3)',
      body: 'Officially titled The Ghostbloods. Spy-thriller Scadrial in a Cold War-era setting. Sanderson started writing in 2025 — first book expected December 2028.',
      color: 'amber',
    },
    {
      title: '📄 Extras (3)',
      body: "The Eleventh Metal (#1.5), Allomancer Jak (#5.5), Secret History (#3.5 novella). Placed in series number order — see each book's note for the ideal read point.",
      color: 'green',
    },
  ],
  sections: [
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        'Allomancy: swallowing and burning metals to gain powers — each of the 16 metals does something different. Mistborn can burn all metals; Mistings only one.',
        'Feruchemy: storing attributes (strength, speed, memory, health) in metal minds for later use. Feruchemists are rarer than Allomancers.',
        'Hemalurgy: a darker third magic system introduced gradually — steals powers and attributes by driving metal spikes through living things at precise moments.',
        "Era 2 introduces new alloys and hybrid powers as Scadrial's technology advances — the magic system evolves alongside the world.",
      ],
    },
    {
      heading: 'Era 1 vs Era 2',
      type: 'prose',
      prose:
        "Era 1 is epic fantasy — long books, cosmic stakes, slow-burn revelation. Era 2 is closer to a Western-flavoured adventure serial — faster pacing, lighter tone, shorter books. Some readers prefer Era 2 for this reason. Both are set on the same world with the same magic, but the feel is genuinely different. If you bounced off Era 1's length, try The Alloy of Law — it was written as a palate cleanser and shows a very different side of Sanderson's range.",
    },
    {
      heading: 'Cosmere placement',
      type: 'prose',
      prose:
        "Mistborn is the most important series in the Cosmere after Stormlight. Era 1 can be read in isolation with no Cosmere knowledge. Era 2 starts dropping Cosmere threads. The Lost Metal (Era 2 finale) has the most explicit Cosmere crossover in any Sanderson novel to date — it assumes familiarity with Stormlight and Warbreaker. If you're reading the Cosmere in full, read The Lost Metal after Rhythm of War.",
    },
  ],
  darkness: [
    {
      label: 'Era 1',
      level: 3,
      desc: 'Revolution, genocide, and cosmic horror — the darkness is purposeful and earns its weight',
    },
    {
      label: 'Era 2',
      level: 2,
      desc: 'Lighter tone overall — violence and personal loss but less cosmically heavy than Era 1',
    },
    {
      label: 'Era 3',
      level: 3,
      desc: 'Expected to match Era 2 — spy thriller tone with moral complexity',
    },
  ],
  finishedLabel: 'Finished Scadrial?',
  categoryHref: '/fantasy/epic/',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['cosmere', 'stormlight', 'kingkiller'],
  booksLikeSlug: 'mistborn-the-final-empire',
};
