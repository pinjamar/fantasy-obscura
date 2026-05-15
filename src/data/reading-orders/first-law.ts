import type { ReadingOrderEntry } from '../reading-orders';

export const firstLaw: ReadingOrderEntry = {
  slug: 'first-law',
  name: 'The First Law World',
  author: 'Joe Abercrombie',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "A grimdark masterclass where the heroes are as broken as the villains — and the world keeps punishing both. Abercrombie dismantles every fantasy trope with wit, cruelty, and genuine craft — and he is genuinely funny while doing it. Sand dan Glokta, the crippled torturer who narrates much of the original trilogy, is one of the great characters in modern fantasy: bitter, sharp, and unexpectedly principled in a world that rewards none of those things. Nine books span forty years of the same connected world, and what begins as a fantasy trilogy quietly becomes something much larger. Start with The Blade Itself — the three standalones and the Age of Madness trilogy all share the same world and reward reading in publication order.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark → Brutal',
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'start here',
      noteType: 'required',
      note: 'All three essential. Read in order — nothing should be skipped.',
      books: [
        {
          title: 'The Blade Itself',
          slug: 'the-blade-itself',
          status: 'mandatory',
          note: 'Start here. Introduces the full cast across three storylines.',
          page_count: 531,
          publication_year: 2006,
        },
        {
          title: 'Before They Are Hanged',
          slug: 'before-they-are-hanged',
          status: 'mandatory',
          note: 'The quest, the siege, the politics — all accelerate.',
          page_count: 543,
          publication_year: 2007,
        },
        {
          title: 'Last Argument of Kings',
          slug: 'last-argument-of-kings',
          status: 'mandatory',
          note: 'Brutal conclusion. Nothing lands the way you expect.',
          page_count: 639,
          publication_year: 2008,
        },
      ],
    },
    {
      label: 'Standalones & Extras',
      sublabel: 'set in the same world, any order after the trilogy',
      noteType: 'optional',
      note: 'Each standalone hits harder after the trilogy. Best Served Cold is the fan favourite. Sharp Ends (short stories) fills gaps between books — read after Red Country or skip without losing anything essential. Read all three standalones before starting Age of Madness.',
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
          note: 'Three days of battle in the North. War dissected from every angle.',
          page_count: 544,
          publication_year: 2011,
        },
        {
          title: 'Red Country',
          slug: 'red-country',
          status: 'mandatory',
          note: 'Western frontier fantasy. Shy South and a familiar stranger.',
          page_count: 473,
          publication_year: 2012,
        },
        {
          title: 'Sharp Ends',
          slug: 'sharp-ends',
          status: 'optional',
          note: 'Short story collection. Fills gaps between main books — best read after Red Country.',
          page_count: 352,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Age of Madness',
      sublabel: 'sequel trilogy',
      noteType: 'warning',
      note: 'Read the original trilogy plus at least two standalones first. Characters and payoffs depend heavily on what came before.',
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
          note: 'Political tension escalates toward inevitable conflict.',
          page_count: 483,
          publication_year: 2020,
        },
        {
          title: 'The Wisdom of Crowds',
          slug: 'the-wisdom-of-crowds',
          status: 'mandatory',
          note: 'Revolution, consequence, and the full weight of the series paying off.',
          page_count: 448,
          publication_year: 2021,
        },
      ],
    },
  ],
  orderNote:
    'Publication order = best reading order. Do not skip the standalones before Age of Madness.',
  cardsPosition: 'above',
  cards: [
    {
      title: '👥 The Original Cast',
      body: "Three POVs carry the original trilogy: Logen Ninefingers, a Northern barbarian trying to escape his legend; Jezal dan Luthar, a vain officer about to have his assumptions stripped away; and Sand dan Glokta — a torturer who is the most compelling character in the series. Glokta is crippled, bitter, and unexpectedly principled. Abercrombie makes you root for a torturer, and that tells you everything about what this series is doing.",
      color: 'blue',
    },
    {
      title: '🗡️ Bayaz',
      body: "Bayaz is the First of the Magi — the wise old wizard archetype. He arrives exactly where you expect him and does exactly what you expect, and then Abercrombie takes that expectation apart slowly and methodically. He is one of the great subversions in fantasy. The less you know going in, the better. Do not look him up.",
      color: 'purple',
    },
    {
      title: '⚔️ The Standalones',
      body: 'Best Served Cold is a revenge thriller. The Heroes is a war novel told from every side of a single three-day battle. Red Country is a western frontier fantasy. None of them are filler — events in each directly shape the Age of Madness world and returning characters carry weight that only lands if you read the trilogy first. Read all three before starting Age of Madness.',
      color: 'amber',
    },
    {
      title: '🏭 Age of Madness',
      body: 'The sequel trilogy is set 40 years later during an industrial revolution. A new generation faces the same rotten world — with factories, unions, and rebellion alongside familiar magic and politics. It is darker than the original trilogy. Characters you know from the standalones have aged and changed. The payoff lands on everything that came before it.',
      color: 'red',
    },
    {
      title: '😂 The Wit',
      body: "Abercrombie is very funny. First Law is grimdark, but it is also satirical — the tropes it dismantles are executed with visible delight. Glokta's internal monologue is some of the sharpest prose in the genre. The darkness is purposeful and the cruelty is never gratuitous. There is always a point being made, and the point is usually about power.",
      color: 'green',
    },
    {
      title: '🔄 The Connected World',
      body: 'The First Law World is a single setting where everything compounds. Events in the original trilogy shape the standalones, which shape Age of Madness. Characters recur across all nine books. The Union, the North, Styria, and the Far Country each get their own arc. Publication order is the only way to feel the full weight of what Abercrombie built.',
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Publication order vs Chronological order',
      type: 'prose',
      prose:
        "These are the same. Abercrombie wrote the world in the order you should read it. The standalones (Best Served Cold, The Heroes, Red Country) happen between the trilogies but were published between them too — that's intentional. Reading them out of order spoils the payoff of both trilogies. Timeline at a glance: Y0–Y3 Original Trilogy → Y10 Best Served Cold (Styrian civil war) → Y12 The Heroes (Battle of Osrung) → Y14 Red Country (Far Country frontier) → Y40 Age of Madness trilogy (next generation).",
    },
    {
      heading: 'Safe starting point',
      type: 'warning',
      prose:
        "Start with The Blade Itself — no exceptions. The standalones and Age of Madness trilogy carry heavy spoilers for the original trilogy and reward readers who've grown attached to the characters. Jumping in at Best Served Cold or A Little Hatred is technically possible but significantly reduces the impact. Do not start with Age of Madness — it spoils the original trilogy ending.",
    },
    {
      heading: 'Spoiler-free notes',
      type: 'bullets',
      bullets: [
        'The Blade Itself starts slowly — the payoff is in book 2 and 3. Trust the setup.',
        'Each standalone follows different protagonists, but familiar faces appear throughout.',
        'The standalones are not filler — events in them directly shape the Age of Madness world.',
        'Sharp Ends short stories are best read scattered throughout or all at the end — not before the standalones.',
        'Age of Madness is darker than the original trilogy. The world has changed, and not for the better.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Original Trilogy',
      level: 4,
      desc: 'Dark — moral rot, betrayal, broken heroes',
    },
    {
      label: 'Standalones',
      level: 4,
      desc: 'Dark — revenge, war, frontier brutality',
    },
    {
      label: 'Age of Madness',
      level: 5,
      desc: 'Brutal — revolution, mass violence, no clean hands',
    },
  ],
  metaDescription:
    'The First Law reading order: the original trilogy, three standalones, and the Age of Madness sequel trilogy — all in Joe Abercrombie\'s grimdark world, in the order that makes them hit hardest.',
  lastUpdated: '2026-05-15',
  shortName: 'First Law',
  finishedLabel: 'Finished the series?',
  booksLikeSlug: 'the-blade-itself',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse more Grimdark',
  related: ['malazan', 'asoiaf', 'robin-hobb', 'kingkiller', 'black-company'],
};
