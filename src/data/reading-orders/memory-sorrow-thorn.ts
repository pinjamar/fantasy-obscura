import type { ReadingOrderEntry } from '../reading-orders';

export const memorySorrowThorn: ReadingOrderEntry = {
  slug: 'memory-sorrow-thorn',
  name: 'Memory, Sorrow and Thorn',
  author: 'Tad Williams',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - main trilogy (1988-1993) and Last King of Osten Ard tetralogy (2017-2024)',
  description:
    'The epic fantasy series that shaped a generation of writers: George R.R. Martin and Patrick Rothfuss have both cited it as a direct influence. A young kitchen scullion is pulled into an ancient war between human kingdoms and the immortal Sithi as a long-buried prophecy stirs. Williams writes at novelistic pace, building character and world before plot. In 2024, Williams completed the sequel tetralogy The Last King of Osten Ard, making the entire Osten Ard saga fully finished: nine novels and two novellas across three and a half decades.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate - emotionally complex; deaths are meaningful and not softened',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'read in order',
      noteType: 'warning',
      note: 'To Green Angel Tower was published as a single ~1080-page hardcover but split into two paperback volumes in most markets: Storm (Part 1) and Siege (Part 2). Both contain the same text. Either edition is fine; make sure you have both parts before you begin the conclusion.',
      books: [
        {
          title: 'The Dragonbone Chair',
          slug: 'the-dragonbone-chair',
          status: 'mandatory',
          note: 'Simon, a kitchen boy, is thrust into a war he barely understands. Slow, immersive opening. The first 150 pages are difficult to assess in isolation: the context accumulates as you read.',
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
          note: 'The conclusion. Originally published as a single ~1080-page hardcover; most paperback editions split it into Storm and Siege. The most emotionally complete ending in the genre.',
          page_count: 1083,
          publication_year: 1993,
        },
        {
          title: 'Brothers of the Wind',
          slug: 'brothers-of-the-wind',
          status: 'supplementary',
          note: 'Prequel novella (~256 pages) set during the original war with the Norns, long before the trilogy. Best read after the main trilogy: the Sithi lore carries more weight with that context. Read before The Heart of What Was Lost.',
          page_count: 256,
          publication_year: 2021,
        },
        {
          title: 'The Heart of What Was Lost',
          slug: 'the-heart-of-what-was-lost',
          status: 'supplementary',
          note: "Short novel (~240 pages) set immediately after the trilogy's end. Follows the Norns retreating north. Bridges the original series and the tetralogy. Read before starting The Witchwood Crown.",
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
      sublabel: 'Tetralogy - set 30 years after the trilogy',
      books: [
        {
          title: 'The Witchwood Crown',
          slug: 'the-witchwood-crown',
          status: 'optional',
          note: 'Simon and Miriamele are now king and queen. A new generation faces an ancient threat returning. More political and slower-paced than the original trilogy.',
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
          note: "The conclusion of the tetralogy and the entire Osten Ard saga (2024). Williams closes every thread: Simon and Miriamele, the Norns, the Sithi, and the next generation.",
          page_count: 736,
          publication_year: 2024,
        },
      ],
    },
  ],
  cards: [
    {
      title: '📖 The Trilogy and Its Legacy',
      body: "Published 1988–1993, the trilogy arrived when epic fantasy was dominated by derivative Tolkien imitators. George R.R. Martin has cited it directly as evidence the genre could handle real human complexity. Rothfuss cites it as a direct influence. The series demonstrated that an epic fantasy protagonist could grow through loss, failure, and confusion rather than through escalating power. That model is now standard.",
      color: 'blue',
    },
    {
      title: '🏰 The Sequel Tetralogy',
      body: "The Last King of Osten Ard follows Simon and Miriamele 30 years later, as a new generation faces the Norns returning. More political and slower-paced than the original trilogy. The emotional register has shifted: less coming-of-age, more elegiac. Completed in 2024 with The Navigator's Children.",
      color: 'green',
    },
    {
      title: '⚔️ Memory, Sorrow and Thorn',
      body: "Three great swords give the trilogy its name: Minneyar (Memory), Sorrow, and Thorn. Each is ancient, each carries power, and the quest to recover them drives the central plot. What the swords mean and what the prophecy surrounding them actually demands is what the trilogy is really about. Let the answer come to you.",
      color: 'red',
    },
    {
      title: '👦 Simon Snowlock',
      body: "Simon starts the trilogy as a kitchen scullion: unglamorous, naive, and not obviously heroic. Williams builds his development slowly and without shortcuts. By To Green Angel Tower, he is the most satisfying coming-of-age protagonist in the genre. His arc works because Williams never skips the hard parts.",
      color: 'amber',
    },
    {
      title: '🌙 The Sithi',
      body: 'The Sithi are the immortal people of Osten Ard: nothing like Tolkien elves. Ancient, alien, morally ambiguous, and nursing grievances against humanity that span millennia. The mystery of their history and their war with the Norns is the deep mythology the trilogy slowly uncovers. Williams lets it unfold gradually. What the Sithi are and what they want is not fully clear until the conclusion of the trilogy, and that is the point.',
      color: 'purple',
    },
    {
      title: '⏳ Pacing and Patience',
      body: 'The Dragonbone Chair opens slowly. Williams is building a world and a character before delivering plot. The first 150 pages are difficult to assess in isolation: the context that makes them legible only accumulates later. Readers who stop in the opening are stopping before the book has started. Give it 200 pages.',
      color: 'zinc',
    },
  ],
  cardsPosition: 'above',
  orderNote:
    'Start with the main trilogy. The Heart of What Was Lost is the ideal bridge before the tetralogy.',
  characters: [
    {
      name: 'Simon Snowlock',
      role: 'Kitchen scullion; protagonist of the main trilogy',
      color: 'amber',
      why_they_work:
        "The card about him describes the arc; the structural point is different: Simon is not a chosen one who is modestly unaware of his destiny. He is genuinely wrong about what matters, genuinely ignorant of the political forces he is caught in, and that ignorance is where the reader lives for the first two books. His perspective gives the reader access to events he cannot fully understand, which is what makes the revelations of To Green Angel Tower hit the way they do.",
    },
    {
      name: 'Miriamele',
      role: "Princess of the kingdom; POV counterpart to Simon",
      color: 'blue',
      why_they_work:
        "The court-level perspective on events Simon sees from the ground. Her arc is about agency denied by birth and circumstance, and her sections of the trilogy are where the politics of the kingdom are most clearly legible. The relationship between her arc and Simon's develops without plot shortcuts, which is unusual in the genre and is why it lands the way it does at the end of To Green Angel Tower.",
    },
    {
      name: 'Binabik',
      role: "Troll trollwarden from the Mintahoq mountains; Simon's companion",
      color: 'green',
      why_they_work:
        "The character who works against the Gandalf archetype. Binabik is small, foreign, and genuinely knowledgeable rather than mysteriously withholding. He explains things to Simon clearly and honestly, which is unusual for the wise-mentor role in fantasy: the reader is not strung along by deliberate omission. What he does not know, he says he does not know.",
    },
    {
      name: 'Ineluki (The Storm King)',
      role: 'Dead Sithi king; primary antagonist of the trilogy',
      color: 'red',
      why_they_work:
        "The antagonist the reader rarely encounters directly. Ineluki operates almost entirely through proxies, dreams, and the effects of his will on others. What he was before death, what death and grief made him, and what he actually wants are only fully legible at the end of To Green Angel Tower. The dread he generates comes from that accumulation across three books rather than from dramatic confrontation.",
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'The Dragonbone Chair is the only entry point. Publication order and reading order are the same.',
        'The original trilogy stands completely alone. The Last King of Osten Ard tetralogy is a separate commitment set 30 years later; it is not required to feel the trilogy is complete.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'No explicit sexual content across either arc.',
        'Violence is present but not grimdark: deaths are emotionally significant and not softened, but the series is not interested in suffering for its own sake.',
        'Grief and loss are the central emotional register of both arcs. The series does not resolve these cleanly.',
        'The pacing is deliberately slow. This is not a plot-forward series and does not accelerate toward action the way most epic fantasy does.',
        'The tetralogy (The Last King of Osten Ard) escalates in darkness across its four books, with Into the Narrowdark the heaviest of the sequence.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Memory, Sorrow and Thorn (1988–1993) arrived before most of the defining texts of modern epic fantasy and set a template for character-driven, emotionally complex secondary-world fiction that the genre has been building on since.',
        "George R.R. Martin has cited the series directly as evidence that epic fantasy could handle real human complexity. Rothfuss has cited it as a direct influence. Both point to the same thing: Williams showed that a protagonist could grow through failure and confusion rather than through power.",
        "The Sithi are the most influential reimagining of the Tolkien elf archetype in the genre: ancient, alien, and morally ambiguous rather than idealised. That model of non-human people with deep grievances and opaque motivations is now standard.",
        "Williams completed the entire Osten Ard saga (nine novels, two novellas) between 1988 and 2024 without handing the world to estate continuations. The saga has a beginning, a middle, and an end written by the same author across 36 years.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The Dragonbone Chair',
      level: 2,
      desc: 'Epic in scope but accessible. War seen through a young man who does not yet understand it.',
    },
    {
      label: 'Stone of Farewell',
      level: 3,
      desc: 'Darker and more political. Loss and sacrifice increase as the war widens.',
    },
    {
      label: 'To Green Angel Tower',
      level: 3,
      desc: 'War, grief, and hard-won resolution. The emotional stakes are the highest in the trilogy.',
    },
    {
      label: 'The Witchwood Crown',
      level: 3,
      desc: 'Political intrigue and creeping dread. Darker undertone than the original trilogy.',
    },
    {
      label: 'Empire of Grass',
      level: 3,
      desc: 'Multiple threads fracturing. Violence and betrayal escalate across the wider cast.',
    },
    {
      label: 'Into the Narrowdark',
      level: 4,
      desc: 'Things unravel. The most brutal volume in either arc, with significant losses.',
    },
    {
      label: "The Navigator's Children",
      level: 3,
      desc: 'Hard-won resolution. Difficult and elegiac but not nihilistic.',
    },
  ],
  metaDescription:
    'The Memory, Sorrow and Thorn reading order: all nine novels and novellas across the Osten Ard saga, including the original trilogy, the Last King of Osten Ard tetralogy, and where to fit Brothers of the Wind.',
  lastUpdated: '2026-07-01',
  shortName: 'Osten Ard Saga',
  finishedLabel: 'Finished Osten Ard?',
  booksLikeSlug: 'the-dragonbone-chair',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['asoiaf', 'wheel-of-time', 'robin-hobb', 'malazan', 'kingkiller', 'first-law'],
};
