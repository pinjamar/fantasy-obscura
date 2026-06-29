import type { ReadingOrderEntry } from '../reading-orders';

export const brentWeeks: ReadingOrderEntry = {
  slug: 'brent-weeks',
  name: 'Brent Weeks',
  author: 'Brent Weeks',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing - Lightbringer complete (5 books); Night Angel ongoing (4 books)',
  description:
    "Two series in entirely separate worlds: no connection, no crossover, no required reading order between them. Night Angel is a tight grimdark trilogy about an orphan trained to become an assassin in one of the most corrupt cities in fantasy fiction. Lightbringer is a five-book epic built around chromaturgy: a hard magic system where drafters transform light into physical matter and pay for it with their sanity and lifespan. Night Angel is faster, darker, and more character-driven. Lightbringer is more ambitious in scope and takes longer to settle into. Both series are complete or near-complete and can be started in either order.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - Night Angel is full grimdark; Lightbringer is dark but less visceral',
  orderNote:
    'Night Angel and Lightbringer are completely independent series: different worlds, different characters, no connection. Read either first. Within each series, read in publication order.',
  cardsPosition: 'above',
  cards: [
    {
      title: '🗡️ Night Angel',
      body: 'A grimdark assassin trilogy set in Cenaria, one of the most corrupt cities in fantasy fiction. Kylar Stern is an orphan taken in by Durzo Blint (the deadliest wetboy alive) and trained to kill. Night Angel is short, brutal, and relentless. All three books were published in 2008 and read as one continuous story. The darkest thing Weeks has written.',
      color: 'zinc',
    },
    {
      title: '🌈 Lightbringer',
      body: 'A five-book epic centred on Gavin Guile (the Prism, the most powerful magical figure in the world) and his illegitimate son Kip, who should never have existed. Wider in scope than Night Angel, more politically complex, and built around a detailed chromaturgy magic system that takes the first book to fully understand. The scope expands dramatically through books 1-3. Books 4-5 deliver on what the earlier books build.',
      color: 'blue',
    },
    {
      title: '🤔 Which to Start With',
      body: 'Night Angel is three books, all 2008, each around 650 pages: grimdark from page one, fast, and finished in a weekend. Lightbringer is five books published across a decade, with a magic system that takes most of book 1 to settle into. Night Angel is the darker read. Lightbringer has more political complexity and more moving parts. They share no characters and no world, so starting order does not matter.',
      color: 'amber',
    },
    {
      title: "🎨 Chromaturgy: Lightbringer's Magic",
      body: "Drafters absorb light of a specific color and solidify it into luxin: a physical substance with properties unique to that color. Red is unstable and explosive. Blue is hard and rigid. Green is flexible. Sub-red burns. Drafting too much shatters the drafter's halo. They go wight, becoming insane and dangerous. A Prism can draft all colors; there is exactly one per generation, chosen by the Chromeria. The political and religious consequences of that scarcity drive the entire series.",
      color: 'purple',
    },
    {
      title: "⚡ Ka'kari and Wetboys: Night Angel's Magic",
      body: "Wetboys are assassins with the Talent: a magical ability that enhances speed, perception, and stealth. They are distinct from regular assassins. A wetboy doesn't try to kill; a wetboy always kills. The black ka'kari is an ancient artifact that bonds with Kylar and changes what he is at a fundamental level, and the cost of that bond becomes the emotional core of the trilogy. Night Angel's magic is darker and more personal than chromaturgy.",
      color: 'red',
    },
    {
      title: '📖 The Burning White',
      body: "The Lightbringer finale. Nearly 1,000 pages. It answers everything the series has been building toward, including reveals that recontextualize choices from book 1. Night Angel Nemesis (2023) continues the Night Angel world after the original trilogy concluded: a return to Cenaria set after the events of Beyond the Shadows.",
      color: 'green',
    },
  ],
  groups: [
    {
      label: 'Night Angel',
      sublabel: '3-book trilogy + continuation - read in order',
      noteType: 'required',
      note: 'One continuous story split across three books, all published in 2008. Start with The Way of Shadows. Perfect Shadow is a Durzo prequel novella: best read after the trilogy when his full arc is known.',
      books: [
        {
          title: 'The Way of Shadows',
          slug: 'the-way-of-shadows',
          status: 'mandatory',
          note: "Kylar is a guild rat taken in by Durzo Blint (the most feared wetboy in Cenaria). His training begins. The city is corrupt, the guild runs everything, and Kylar's only true friend is a girl with a scarred face and a genuinely good soul. Grimdark from page one.",
          page_count: 645,
          publication_year: 2008,
        },
        {
          title: "Shadow's Edge",
          slug: 'shadows-edge',
          status: 'mandatory',
          note: "Kylar tries to leave the life. He can't. The ka'kari pulls him back, as does war, his friends' survival, and the cost of the immortality he never asked for. The darkest emotional stretch of the trilogy.",
          page_count: 656,
          publication_year: 2008,
        },
        {
          title: 'Beyond the Shadows',
          slug: 'beyond-the-shadows',
          status: 'mandatory',
          note: "The conclusion. Everything costs something. The ka'kari's price becomes fully clear here. The ending is brutal.",
          page_count: 720,
          publication_year: 2008,
        },
        {
          title: 'Night Angel Nemesis',
          slug: 'night-angel-nemesis',
          status: 'optional',
          note: 'A return to the Night Angel world, published 15 years after the original trilogy. Set after the events of Beyond the Shadows. Not required to complete the original story.',
          page_count: null,
          publication_year: 2023,
        },
        {
          title: 'Perfect Shadow',
          slug: 'perfect-shadow',
          status: 'supplementary',
          seriesLabel: 'Novella',
          note: "A novella following Durzo Blint in the years before The Way of Shadows. Shows who Durzo was before the trilogy begins. Read after the trilogy: his full arc is what makes this worthwhile.",
          page_count: 58,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'Lightbringer',
      sublabel: '5 books, complete - read in order',
      noteType: 'required',
      note: 'One continuous story. Gavin Guile and his illegitimate son Kip are the twin centres of gravity. The scope expands dramatically through books 1-3. Do not skip ahead: the reveals in later books depend on patience with the early setup.',
      books: [
        {
          title: 'The Black Prism',
          slug: 'the-black-prism',
          status: 'mandatory',
          note: 'Gavin Guile is the Prism: the most powerful drafter alive, chosen by light itself. He has seven great goals to accomplish before his time runs out. When his illegitimate son Kip shows up in the ruins of a destroyed village, everything changes. The chromaturgy system is introduced here. Give it room to settle.',
          page_count: 641,
          publication_year: 2010,
        },
        {
          title: 'The Blinding Knife',
          slug: 'the-blinding-knife',
          status: 'mandatory',
          note: "Kip trains at the Chromeria. Gavin faces what he has been hiding since the beginning. The secrets start surfacing. This is where the plot threads from book 1 start mattering in ways that weren't obvious they would.",
          page_count: 688,
          publication_year: 2012,
        },
        {
          title: 'The Broken Eye',
          slug: 'the-broken-eye',
          status: 'mandatory',
          note: "The largest cast, the most moving parts, and the most brutal reversals in the series. Kip's training arc peaks here. Several details that looked minor in books 1-2 become major plot drivers.",
          page_count: 795,
          publication_year: 2014,
        },
        {
          title: 'The Blood Mirror',
          slug: 'the-blood-mirror',
          status: 'mandatory',
          note: 'War, betrayal, and the cost of drafting pile up. Transitional in structure but the emotional costs accumulate here in ways the first three books were building toward. Essential.',
          page_count: 704,
          publication_year: 2016,
        },
        {
          title: 'The Burning White',
          slug: 'the-burning-white',
          status: 'mandatory',
          note: 'The conclusion. Every thread resolves. Weeks answers questions building since book 1, including reveals that recontextualize choices from the beginning. Nearly 1,000 pages. Clear time for this one.',
          page_count: 992,
          publication_year: 2019,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Kylar Stern',
      role: 'Protagonist, Night Angel trilogy',
      faction: 'Night Angel',
      color: 'zinc',
      why_they_work:
        "Operates on a standard grimdark orphan-assassin template until the ka'kari changes the terms of what he is. What the bond actually costs him is the subject of the trilogy, not a setup for power fantasy.",
    },
    {
      name: 'Durzo Blint',
      role: "Wetboy, Kylar's master",
      faction: 'Cenaria underworld',
      color: 'blue',
      why_they_work:
        "Introduced as the world's most dangerous wetboy with a death wish. His backstory, revealed across the trilogy, reframes him as the emotional centre of the Night Angel world. The prequel novella Perfect Shadow only works if you read it after the trilogy.",
    },
    {
      name: 'Gavin Guile',
      role: 'The Prism, most powerful drafter alive',
      faction: 'The Chromeria',
      color: 'amber',
      why_they_work:
        "His chapters operate on dramatic irony from the first book: he knows something about himself that the reader pieces together gradually, and the full reveal in The Blinding Knife is the structural engine of the entire series. Rereading book 1 after book 2 is a different experience.",
    },
    {
      name: 'Kip Guile',
      role: "Gavin's illegitimate son, drafter in training",
      faction: 'The Chromeria',
      color: 'red',
      why_they_work:
        "The farm-boy equivalent who knows he doesn't fit and says so constantly. His self-awareness about his own inadequacy is funnier than it sounds and more structurally important than it looks in book 1. His arc across five books is the clearest bildungsroman in Weeks's work.",
    },
    {
      name: 'Karris White Oak',
      role: 'Chromeria operative, later White',
      faction: 'The Chromeria',
      color: 'green',
      why_they_work:
        "Gavin's foil and eventual equal. Her arc across the five books is the most direct treatment of the series' central question about what the Chromeria costs the people who serve it.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Night Angel is full grimdark: torture, sexual violence (not explicit but present), addiction, and brutal death are recurring elements. One of the darker mainstream fantasy series of the 2000s.',
        'Lightbringer is dark but significantly less visceral. Violence is frequent but the tone is more epic-fantasy than horror-adjacent. Sexual content is present but not graphic.',
        'Both series treat addiction seriously. Night Angel depicts substance dependence with real consequences. Lightbringer uses drafting as an addiction metaphor: the magic literally destroys you if you overuse it, and every drafter knows it going in.',
        'Right for: readers who want full grimdark (Night Angel) or dark epic fantasy with an intricate magic system (Lightbringer). Not right for: readers with hard limits on graphic violence involving children, which is present in Night Angel.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Night Angel Trilogy',
      level: 4,
      desc: 'Full grimdark: torture, abuse, death, and moral corruption from the first pages. Not softened at any point.',
    },
    {
      label: 'Lightbringer',
      level: 3,
      desc: 'Dark epic fantasy: war, religious corruption, sacrifice, and loss. Increasingly brutal in books 4-5 but never reaches Night Angel levels.',
    },
  ],
  booksLikeSlug: 'the-way-of-shadows',
  shortName: 'Brent Weeks',
  finishedLabel: 'Finished Weeks?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: [
    'mistborn',
    'first-law',
    'mark-lawrence',
    'gentleman-bastard',
    'stormlight',
    'red-rising',
  ],
  lastUpdated: '2026-06-26',
};
