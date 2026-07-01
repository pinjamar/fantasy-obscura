import type { ReadingOrderEntry } from '../reading-orders';

export const firstLaw: ReadingOrderEntry = {
  slug: 'first-law',
  name: 'The First Law World',
  author: 'Joe Abercrombie',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 9 books',
  description:
    "A grimdark masterclass where the heroes are as broken as the villains. The world keeps punishing both. Abercrombie dismantles every fantasy trope with wit, cruelty, and genuine craft. He is genuinely funny while doing it. Sand dan Glokta, the crippled torturer who narrates much of the original trilogy, is one of the great characters in modern fantasy: bitter, sharp, and unexpectedly principled in a world that rewards none of those things. Nine books span forty years of the same connected world, and what begins as a fantasy trilogy quietly becomes something much larger.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark → Brutal',
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'start here',
      noteType: 'required',
      note: 'All three essential. Read in order.',
      books: [
        {
          title: 'The Blade Itself',
          slug: 'the-blade-itself',
          status: 'mandatory',
          note: 'Start here. Three parallel storylines (Logen in the North, Jezal in the Union, Glokta underground) barely intersect until late.',
          page_count: 531,
          publication_year: 2006,
        },
        {
          title: 'Before They Are Hanged',
          slug: 'before-they-are-hanged',
          status: 'mandatory',
          note: 'The quest heads west. Glokta holds Dagoska. The politics in the Union turn lethal.',
          page_count: 543,
          publication_year: 2007,
        },
        {
          title: 'Last Argument of Kings',
          slug: 'last-argument-of-kings',
          status: 'mandatory',
          note: 'All three storylines converge and resolve. Not in the way heroic fantasy usually delivers them.',
          page_count: 639,
          publication_year: 2008,
        },
      ],
    },
    {
      label: 'Standalones & Extras',
      sublabel: 'set in the same world, any order after the trilogy',
      noteType: 'optional',
      note: 'Each standalone hits harder after the trilogy. Best Served Cold is the fan favourite.',
      books: [
        {
          title: 'Best Served Cold',
          slug: 'best-served-cold',
          status: 'mandatory',
          note: 'Revenge thriller set in Styria, 7 years later. Monza Murcatto assembles a crew.',
          page_count: 531,
          publication_year: 2009,
        },
        {
          title: 'The Heroes',
          slug: 'the-heroes',
          status: 'mandatory',
          note: 'The Battle of Osrung: three days in the North, told from both sides of the line.',
          page_count: 544,
          publication_year: 2011,
        },
        {
          title: 'Red Country',
          slug: 'red-country',
          status: 'mandatory',
          note: 'Western frontier fantasy. Shy South is looking for her kidnapped siblings.',
          page_count: 473,
          publication_year: 2012,
        },
        {
          title: 'Sharp Ends',
          slug: 'sharp-ends',
          status: 'supplementary',
          note: 'Short story collection. Fills gaps between the main books. Skip without losing anything essential.',
          page_count: 352,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Age of Madness',
      sublabel: 'sequel trilogy',
      noteType: 'warning',
      note: 'The six earlier books are assumed knowledge here.',
      books: [
        {
          title: 'A Little Hatred',
          slug: 'a-little-hatred',
          status: 'mandatory',
          note: 'Age of Madness begins. Industrial revolution, new generation, same rotten world.',
          page_count: 373,
          publication_year: 2019,
        },
        {
          title: 'The Trouble With Peace',
          slug: 'the-trouble-with-peace',
          status: 'mandatory',
          note: 'The Breakers gain ground. The noble houses plot. Orso tries to hold the Union together.',
          page_count: 483,
          publication_year: 2020,
        },
        {
          title: 'The Wisdom of Crowds',
          slug: 'the-wisdom-of-crowds',
          status: 'mandatory',
          note: 'The revolution arrives and consumes everyone in it. The series ends here.',
          page_count: 448,
          publication_year: 2021,
        },
      ],
    },
  ],
  orderNote:
    'Start with The Blade Itself. The original trilogy (books 1–3) is the core. Read it straight through. The three standalones (Best Served Cold, The Heroes, Red Country) are set 7–14 years later and are mandatory before Age of Madness: the sequel trilogy assumes you know them. Sharp Ends is a short story collection. Read it after Red Country or skip it entirely. All guides on this page are spoiler-free.',
  cardsPosition: 'above',
  cards: [
    {
      title: '👥 The Original Cast',
      body: "Three POVs carry the original trilogy. Logen Ninefingers is a Northern barbarian drawn south to the Union after losing everything in the North. His reputation as The Bloody Nine follows him. Jezal dan Luthar is a vain Union officer who expects the story to be about his rise. Sand dan Glokta runs the Union's interrogations: his chapters are where the series shows what the Union actually is beneath the politics. Abercrombie runs all three tracks in parallel and brings them together in book 3. None of them get what they wanted, and the ending does not give any of them what heroic fantasy usually delivers.",
      color: 'blue',
    },
    {
      title: '🗡️ Bayaz',
      body: "Bayaz is the First of the Magi: the wise old wizard archetype. He arrives exactly where you expect him and does exactly what you expect, and then Abercrombie takes that expectation apart slowly and methodically. He is one of the great subversions in fantasy. The less you know going in, the better. Do not look him up.",
      color: 'purple',
    },
    {
      title: '⚔️ The Standalones',
      body: 'Best Served Cold is a revenge thriller. The Heroes is a war novel told from every side of a single three-day battle. Red Country is a western frontier fantasy. None of them are filler. Events in each directly shape the Age of Madness world, and familiar characters from the trilogy appear with history behind them.',
      color: 'amber',
    },
    {
      title: '🏭 Age of Madness',
      body: "The sequel trilogy is set 40 years later during an industrial revolution. A new generation faces the same rotten world: factories, unions, and rebellion alongside familiar magic and politics. It is darker than the original trilogy. The consequences of the original trilogy's ending have been accumulating for forty years. This trilogy is them arriving.",
      color: 'red',
    },
    {
      title: '😂 The Wit',
      body: "Abercrombie is very funny. First Law is grimdark, but it is also satirical. The tropes it dismantles are executed with visible delight. Glokta's interrogation chapters are some of the funniest and most disturbing in the series: the jokes and the horror are the same thing. The darkness is purposeful and the cruelty is never gratuitous. There is always a point being made, and the point is usually about power.",
      color: 'green',
    },
    {
      title: '🔄 The Connected World',
      body: 'The First Law World is a single setting where everything compounds. Events in the original trilogy shape the standalones, which shape Age of Madness. Characters recur across all nine books. The Union, the North, Styria, and the Far Country each get their own arc. Read out of publication order and the later books lose most of what they are doing.',
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Sand dan Glokta',
      role: 'Inquisitor and POV narrator',
      color: 'blue',
      why_they_work:
        "The mechanism of a rotten system who is also its most perceptive critic. His chapters expose the Union's political machinery from the inside because he is the one burying the bodies. The closest thing in modern fantasy to a morally compromised detective.",
    },
    {
      name: 'Logen Ninefingers',
      role: 'Northern barbarian and POV narrator',
      color: 'red',
      why_they_work:
        "Classic reluctant-warrior setup with a structural trap inside it. His reputation (The Bloody Nine) precedes him into the story, and the narrative never lets him escape it. His arc ends in a way that heroic fantasy almost never allows.",
    },
    {
      name: 'Jezal dan Luthar',
      role: 'Union officer and POV narrator',
      color: 'amber',
      why_they_work:
        "Starts as the least sympathetic POV in the trilogy: vain, entitled, and not particularly interesting. That's deliberate. What the world does to him in book 3 only lands because of what he is in book 1.",
    },
    {
      name: 'Bayaz',
      role: 'First of the Magi',
      color: 'purple',
      why_they_work:
        "Takes the role of guide and mentor in book 1: patient, wise, apparently Gandalf. The way Abercrombie subverts that archetype is one of the most significant moves in the trilogy. Research nothing about him before finishing Last Argument of Kings.",
    },
    {
      name: 'Monza Murcatto',
      role: 'Mercenary general; protagonist of Best Served Cold',
      color: 'zinc',
      why_they_work:
        "Assembles a crew of morally compromised specialists to work through a list of seven targets. Best Served Cold is more interested in who she is by the end than whether the list gets finished.",
    },
  ],
  sections: [
    {
      heading: 'Publication order vs chronological order',
      type: 'prose',
      prose:
        "These are the same. Abercrombie wrote the world in the order you should read it. The standalones (Best Served Cold, The Heroes, Red Country) happen between the trilogies but were published between them too. That's intentional. Reading them out of order spoils major story beats in both trilogies. Timeline at a glance: Y0–Y3 Original Trilogy → Y10 Best Served Cold (Styrian civil war) → Y12 The Heroes (Battle of Osrung) → Y14 Red Country (Far Country frontier) → Y40 Age of Madness trilogy (next generation).",
    },
    {
      heading: 'Safe starting point',
      type: 'warning',
      prose:
        "The standalones and Age of Madness trilogy assume you have finished the original trilogy and are attached to its characters. Jumping in at Best Served Cold or A Little Hatred is possible but you will miss most of what those books are doing. Do not start with Age of Madness: it spoils the original trilogy ending.",
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: moral corruption, betrayal, and political rot. Grimdark with purpose. The violence serves the satire.',
        'Slow start: the first 100 pages of The Blade Itself are setup. Push through to book 2.',
        'Romance: minimal. There are relationships, but none drive the plot.',
        'Explicit content: none.',
        'Right for: readers who want subversive fantasy where heroic arcs end wrong. Not right for: readers who need a clear moral hero or a triumphant ending.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Published in 2006, The Blade Itself was among the first major commercial fantasy novels to build a complete world with no chosen-one structure and no triumphant arc.',
        'The ending of Last Argument of Kings was broadly debated at publication. It became a reference point for what a grimdark ending could do by refusing every expected resolution.',
        'Joe Abercrombie cited Glen Cook and George R.R. Martin as key influences. First Law is the series most often recommended when readers need a single example to explain what grimdark is.',
        'The Age of Madness trilogy (2019–2021) returned to the same world a generation later, making First Law one of the few grimdark series to sustain a multigenerational arc across nine books.',
        'Sand dan Glokta is the most commonly cited example when grimdark readers name a morally compromised POV narrator.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Original Trilogy',
      level: 4,
      desc: 'Moral rot, betrayal, and broken heroes. Grimdark from the ground up.',
    },
    {
      label: 'Standalones',
      level: 4,
      desc: 'Revenge, war, and frontier brutality. Best Served Cold and The Heroes are unflinching.',
    },
    {
      label: 'Age of Madness',
      level: 5,
      desc: 'Industrial-era revolution and massacre. Characters from the earlier books are older and worse. No clean exits.',
    },
  ],
  metaDescription:
    'The First Law reading order: the original trilogy, three standalones, and the Age of Madness sequel trilogy - all in Joe Abercrombie\'s grimdark world, in the order that makes them hit hardest.',
  lastUpdated: '2026-07-01',
  shortName: 'First Law',
  finishedLabel: 'Finished the series?',
  booksLikeSlug: 'the-blade-itself',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse more Grimdark',
  related: ['malazan', 'asoiaf', 'robin-hobb', 'kingkiller', 'black-company', 'witcher'],
};
