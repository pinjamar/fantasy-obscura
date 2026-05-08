import type { ReadingOrderEntry } from '../reading-orders';

export const memorySorrowThorn: ReadingOrderEntry = {
  slug: 'memory-sorrow-thorn',
  name: 'Memory, Sorrow and Thorn',
  author: 'Tad Williams',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Series Complete',
  description:
    'The epic fantasy series that shaped a generation of writers — George R.R. Martin and Patrick Rothfuss have both cited it as a direct influence. A young kitchen scullion is pulled into an ancient war between human kingdoms and the immortal Sithi as a long-buried prophecy stirs. Williams writes with rare patience and emotional depth — this is the series that proved epic fantasy could be literature. The Dragonbone Chair is where to start. In 2024, Williams completed the sequel tetralogy The Last King of Osten Ard, making the entire Osten Ard saga now fully finished — nine novels and two novellas, all rewarding readers who go in order.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'read in order',
      books: [
        {
          title: 'Brothers of the Wind',
          slug: 'brothers-of-the-wind',
          status: 'supplementary',
          note: 'Prequel novella (~256 pages) set long before the trilogy, during the original war with the Norns. Deep lore for Sithi fans — read before the trilogy or save it for after.',
          page_count: 256,
          publication_year: 2021,
        },
        {
          title: 'The Dragonbone Chair',
          slug: 'the-dragonbone-chair',
          status: 'mandatory',
          note: 'Start here. Simon, a kitchen boy, is thrust into a war he barely understands. Slow, immersive opening — trust the build.',
          page_count: 672,
          publication_year: 1988,
        },
        {
          title: 'Stone of Farewell',
          slug: 'stone-of-farewell',
          status: 'mandatory',
          note: 'The war deepens across multiple POVs. Williams broadens the world and the mythology. The middle volume at its best.',
          page_count: 588,
          publication_year: 1990,
        },
        {
          title: 'To Green Angel Tower',
          slug: 'to-green-angel-tower',
          status: 'mandatory',
          note: 'The conclusion. Originally published as a single ~1080-page hardcover; most paperback editions split it into two volumes (Storm and Siege). One of the most satisfying endings in epic fantasy.',
          page_count: 1083,
          publication_year: 1993,
        },
        {
          title: 'The Heart of What Was Lost',
          slug: 'the-heart-of-what-was-lost',
          status: 'supplementary',
          note: "Short novel (~240 pages) set immediately after the trilogy's end. Follows the Norns retreating north. Bridges the original series and the tetralogy — not required, but highly recommended before starting The Witchwood Crown.",
          page_count: 240,
          publication_year: 2017,
        },
        {
          title: 'The Burning Man',
          slug: 'the-burning-man',
          status: 'supplementary',
          note: 'Short story set in Osten Ard, published in the Legends anthology (1998) edited by Robert Silverberg. Backstory of a key character from the original trilogy. Read after Memory, Sorrow and Thorn.',
          page_count: 60,
          publication_year: 1998,
        },
      ],
    },
    {
      label: 'The Last King of Osten Ard',
      sublabel: 'tetralogy — set 30 years after the trilogy',
      books: [
        {
          title: 'The Witchwood Crown',
          slug: 'the-witchwood-crown',
          status: 'optional',
          note: 'Simon and Miriamele are now king and queen. A new generation faces an ancient threat returning. Slower burn than the original — give it time.',
          page_count: 800,
          publication_year: 2017,
        },
        {
          title: 'Empire of Grass',
          slug: 'empire-of-grass',
          status: 'optional',
          note: 'The threat grows across a fractured kingdom. Multiple POVs. Best read back-to-back with The Witchwood Crown.',
          page_count: 752,
          publication_year: 2019,
        },
        {
          title: 'Into the Narrowdark',
          slug: 'into-the-narrowdark',
          status: 'optional',
          note: 'The penultimate volume. Things unravel. Sets up the finale with brutal efficiency.',
          page_count: 736,
          publication_year: 2023,
        },
        {
          title: "The Navigator's Children",
          slug: 'the-navigators-children',
          status: 'optional',
          note: 'The conclusion of the tetralogy and the entire Osten Ard saga (2024). Williams wraps every thread — Simon and Miriamele, the Norns, the Sithi, and the next generation. A worthy ending to a saga that began in 1988.',
          page_count: 736,
          publication_year: 2024,
        },
      ],
    },
  ],
  cards: [
    {
      title: '📖 The Original Trilogy',
      body: 'The Dragonbone Chair → Stone of Farewell → To Green Angel Tower. One of the most complete and emotionally satisfying arcs in epic fantasy. The direct ancestor of A Song of Ice and Fire.',
      color: 'blue',
    },
    {
      title: '🏰 The Sequel Tetralogy',
      body: "The Last King of Osten Ard follows Simon and Miriamele 30 years later. Slower and more political than the original, but rewards those who stayed. Completed in 2024 with The Navigator's Children.",
      color: 'green',
    },
    {
      title: '📚 The Hidden Influence',
      body: 'George R.R. Martin has said MST showed him that epic fantasy could be about real human complexity. Patrick Rothfuss cites it as essential reading. Required context for any serious fantasy reader.',
      color: 'purple',
    },
  ],
  cardsPosition: 'above',
  orderNote:
    'Start with the main trilogy. To Green Angel Tower may arrive as one hardcover or two paperback volumes (Storm and Siege) — both contain the same text. The Heart of What Was Lost is the ideal bridge before the tetralogy.',
  warning:
    'To Green Angel Tower was published as a single ~1080-page hardcover but split into two paperback volumes in most markets. Make sure you have both parts (Storm and Siege) before you begin the conclusion.',
  sections: [
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Published 1988–1993, it predates A Song of Ice and Fire and is a direct influence on Martin — the political complexity, the grey morality, the willingness to let characters suffer.',
        'Rothfuss has described it as one of the works that made him want to write fantasy.',
        "Williams' Sithi are among the most alien and convincing immortal races in fantasy — not Tolkien elves, but something stranger.",
        "Simon Snowlock is one of the genre's great coming-of-age protagonists — he starts as a foolish boy and earns every inch of his growth.",
        'The pacing is deliberately novelistic — this is not a plot-delivery machine. Give it space.',
      ],
    },
    {
      heading: 'One book or two?',
      type: 'prose',
      prose:
        'To Green Angel Tower was written as a single novel. The hardcover is one volume (~1080 pages). Most paperback editions split it into Storm (Part 1) and Siege (Part 2) — both contain the same text. Either edition is fine, just make sure you have both halves before you begin the conclusion.',
    },
  ],
  darkness: [
    {
      label: 'The Dragonbone Chair',
      level: 2,
      desc: "Epic in scope but accessible — war seen through a young man's eyes",
    },
    {
      label: 'Stone of Farewell',
      level: 3,
      desc: 'Darker, more political — loss and sacrifice increase',
    },
    {
      label: 'To Green Angel Tower',
      level: 3,
      desc: 'War, grief, and hard-earned resolution — earned emotional weight',
    },
    {
      label: 'The Witchwood Crown',
      level: 3,
      desc: 'Political intrigue and creeping dread — darker undertone than the original',
    },
    {
      label: 'Empire of Grass',
      level: 3,
      desc: 'Multiple threads fracturing — violence and betrayal escalate',
    },
    {
      label: 'Into the Narrowdark',
      level: 4,
      desc: 'Things unravel — brutal penultimate volume with significant losses',
    },
    {
      label: "The Navigator's Children",
      level: 3,
      desc: 'Hard-won resolution — difficult but not nihilistic',
    },
  ],
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['wheel-of-time', 'malazan', 'robin-hobb'],
};
