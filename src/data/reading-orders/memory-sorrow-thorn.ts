import type { ReadingOrderEntry } from '../reading-orders';

export const memorySorrowThorn: ReadingOrderEntry = {
  slug: 'memory-sorrow-thorn',
  name: 'Memory, Sorrow and Thorn',
  author: 'Tad Williams',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    'The epic fantasy series that shaped a generation of writers — George R.R. Martin and Patrick Rothfuss have both cited it as a direct influence. A young kitchen scullion is pulled into an ancient war between human kingdoms and the immortal Sithi as a long-buried prophecy stirs. Williams writes with rare patience and emotional depth — this is the series that proved epic fantasy could be literature. The Dragonbone Chair is where to start. In 2024, Williams completed the sequel tetralogy The Last King of Osten Ard, making the entire Osten Ard saga now fully finished — nine novels and two novellas, all rewarding readers who go in order.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'read in order',
      noteType: 'warning',
      note: 'To Green Angel Tower was published as a single ~1080-page hardcover but split into two paperback volumes in most markets — Storm (Part 1) and Siege (Part 2). Both contain the same text. Either edition is fine, just make sure you have both parts before you begin the conclusion.',
      books: [
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
          title: 'Brothers of the Wind',
          slug: 'brothers-of-the-wind',
          status: 'supplementary',
          note: 'Prequel novella (~256 pages) set during the original war with the Norns, long before the trilogy. Best read here — after the main trilogy, the Sithi lore lands harder with that context behind you. Read before The Heart of What Was Lost.',
          page_count: 256,
          publication_year: 2021,
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
      title: '📖 The Trilogy and Its Legacy',
      body: "The Dragonbone Chair → Stone of Farewell → To Green Angel Tower is one of the most complete emotional arcs in epic fantasy — and one of the most influential. George R.R. Martin has said it showed him the genre could handle real human complexity. Rothfuss cites it as essential. This is the series that proved epic fantasy could be literature.",
      color: 'blue',
    },
    {
      title: '🏰 The Sequel Tetralogy',
      body: "The Last King of Osten Ard follows Simon and Miriamele 30 years later. Slower and more political than the original, but rewards those who stayed. Completed in 2024 with The Navigator's Children.",
      color: 'green',
    },
    {
      title: '⚔️ Memory, Sorrow and Thorn',
      body: "Three great swords give the trilogy its name — Minneyar (Memory), Sorrow, and Thorn. Each is ancient, each carries power, and the quest to recover them drives the central plot. What the swords mean and what the prophecy surrounding them actually demands is what the trilogy is really about. Let the answer come to you.",
      color: 'red',
    },
    {
      title: '👦 Simon Snowlock',
      body: "Simon starts the trilogy as a kitchen scullion — unglamorous, naive, and not obviously heroic. Williams makes you earn his development slowly and honestly. By To Green Angel Tower, he is one of the genre's most satisfying coming-of-age protagonists. His arc only works because Williams never shortcuts the hard parts.",
      color: 'amber',
    },
    {
      title: '🌙 The Sithi',
      body: 'The Sithi are the immortal people of Osten Ard — and they are nothing like Tolkien elves. Ancient, alien, morally ambiguous, and nursing grievances against humanity that span millennia. The mystery of their history and their war with the Norns is the deep mythology the trilogy slowly uncovers. Williams lets it unfold gradually. Worth the patience.',
      color: 'purple',
    },
    {
      title: '⏳ Pacing and Patience',
      body: 'The Dragonbone Chair opens slowly. This is intentional — Williams is building a world and a character, not rushing to the action. The first 150 pages reward patience in ways that only become clear much later. Readers who abandon the opening miss the book. Give it 200 pages before deciding.',
      color: 'zinc',
    },
  ],
  cardsPosition: 'above',
  orderNote:
    'Start with the main trilogy. The Heart of What Was Lost is the ideal bridge before the tetralogy.',
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'Start with The Dragonbone Chair — it is the only entry point. There is no alternate order.',
        'The original trilogy stands completely alone. The Last King of Osten Ard tetralogy is a separate commitment set 30 years later — worth it, but not required to feel the trilogy is complete.',
        'If you continue to the tetralogy: read The Heart of What Was Lost first. It bridges the 30-year gap and follows the Norns immediately after the trilogy ends.',
      ],
    },
    {
      heading: 'What to expect',
      type: 'bullets',
      bullets: [
        'Character-driven and novelistic in pace — Williams builds the world and the people before delivering the plot. The opening is an investment, and it pays off.',
        'Emotional content is high: grief, sacrifice, and hard-won resolution are not softened. The ending of To Green Angel Tower earns everything it asks of you.',
        'Right for: readers who want literary epic fantasy, a protagonist who grows through genuine hardship, and a world that rewards exploration.',
        'Not right for: readers who need fast plot momentum or prefer action-driven fantasy.',
        'The sequel tetralogy is slower and more political than the original — treat it as a separate commitment after finishing the trilogy.',
      ],
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
  metaDescription:
    'The Memory, Sorrow and Thorn reading order: all nine novels and novellas across the Osten Ard saga — the original trilogy, the Last King of Osten Ard tetralogy, and where to fit Brothers of the Wind.',
  lastUpdated: '2026-05-15',
  shortName: 'Osten Ard Saga',
  finishedLabel: 'Finished Osten Ard?',
  booksLikeSlug: 'the-dragonbone-chair',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['asoiaf', 'wheel-of-time', 'robin-hobb', 'malazan', 'kingkiller', 'first-law'],
};
