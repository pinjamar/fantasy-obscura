import type { ReadingOrderEntry } from '../reading-orders';

export const riversOfLondon: ReadingOrderEntry = {
  slug: 'rivers-of-london',
  name: 'Rivers of London',
  author: 'Ben Aaronovitch',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - Stone and Sky (2025) is the latest; no end announced',
  description:
    "PC Peter Grant is seconds from a mediocre career doing paperwork for the Metropolitan Police when he takes a witness statement from a ghost. That gets him seconded to the Folly, a one-man department that's been quietly policing magic in London since the 1930s, run by a wizard named Nightingale who's the last one currently registered in the entire country. Ben Aaronovitch treats magic like an engineering discipline and London itself like a character with its own politics, rivers, and unresolved history, and builds a decade-plus series out of taking both seriously.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate - rises to 4 during the Faceless Man arc, no explicit content',
  orderNote:
    "Read the ten main novels in strict publication order: Midnight Riot (published as Rivers of London in the UK) through Stone and Sky. Each builds directly on the last, though books 8 onward begin a new phase rather than continuing the mystery that runs through books 1 to 7. The five novellas and collections are genuinely optional; see the Novellas & Collections group below for exactly when each one fits. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Ben Aaronovitch',
      body: "Aaronovitch has compared his approach to Ed McBain's open-ended 87th Precinct procedurals: no planned ending, no franchise-wide endgame, just the next case. Ten novels and five novellas in, he's said he still doesn't know what's next but has ideas brewing.",
      color: 'blue',
    },
    {
      title: '🌊 The Rivers Are Actually Gods',
      body: "Mama Thames and Father Thames aren't metaphors: London's rivers (the Thames, the Fleet, the Tyburn, the Effra) are genii locorum, living entities shaped by the neighborhoods their waters run through. Lady Ty, Mama Thames's eldest daughter and a fixture since book one, runs her standing among them like real institutional politics.",
      color: 'zinc',
    },
    {
      title: '🔬 Magic as Engineering',
      body: "Peter treats magic the way he'd treat any unfamiliar system: run experiments, take notes, look for the underlying physics. Book one is deliberately slow to show this off (he spends most of it learning a single spell), which is the point. This isn't magic that works because the plot needs it to.",
      color: 'purple',
    },
    {
      title: '🎭 The Faceless Man',
      body: "A rogue wizard operating entirely outside the Folly's oversight first shows his hand in book two and stays the series' central threat through book seven, where the arc actually resolves. His real identity is one of the series' longest-running reveals, held back across several books rather than announced early.",
      color: 'red',
    },
    {
      title: '🕰️ Nightingale',
      body: "Thomas Nightingale fought in WWII as a young officer and has been running the Folly alone for decades since, aging backward through means the books reveal gradually rather than explain upfront. He's one of urban fantasy's best supporting characters precisely because the reader always senses there's more he isn't saying.",
      color: 'amber',
    },
    {
      title: '📚 Which Novellas Actually Matter',
      body: "The October Man (a German equivalent of Peter working the same kind of case abroad) has real standalone merit and works anytime after book four. The rest fill in specific side characters rather than advance the main plot: good world-building, not required reading.",
      color: 'green',
    },
  ],
  groups: [
    {
      label: 'Main Series',
      sublabel: 'read in this order - required',
      noteType: 'required',
      books: [
        {
          title: 'Midnight Riot',
          slug: 'midnight-riot',
          status: 'mandatory',
          note: "Peter takes a witness statement from a ghost, gets seconded to the one-man Folly under Nightingale, and is thrown into his first case: a possessing spirit with violently split personalities terrorizing Covent Garden, while getting introduced to Mama Thames and the rest of London's river gods.",
          page_count: 322,
          publication_year: 2011,
        },
        {
          title: 'Moon Over Soho',
          slug: 'moon-over-soho',
          status: 'mandatory',
          note: "Jazz musicians are dying of an impossible, magic-linked condition while Nightingale recovers from injuries sustained in book one, and Peter's investigation introduces vestigia, the magical residue that objects and places absorb from significant events.",
          page_count: 375,
          publication_year: 2011,
        },
        {
          title: 'Whispers Underground',
          slug: 'whispers-underground',
          status: 'mandatory',
          note: "An FBI agent joins Peter's investigation into a murder inside the London Underground's tunnel network, and the case surfaces the first direct trace of the Faceless Man, a rogue wizard operating entirely outside the Folly's oversight.",
          page_count: 395,
          publication_year: 2012,
        },
        {
          title: 'Broken Homes',
          slug: 'broken-homes',
          status: 'mandatory',
          note: "A case centered on a Brutalist housing estate in South London escalates the Faceless Man storyline sharply, and ends with a betrayal that reshapes the cast for the rest of the series. Go in without reading anything more about this one.",
          page_count: 280,
          publication_year: 2013,
        },
        {
          title: 'Foxglove Summer',
          slug: 'foxglove-summer',
          status: 'mandatory',
          note: "Peter is sent out of London entirely, to rural Herefordshire, to investigate missing children in a case that turns quieter and more fairy-tale-adjacent than anything in the series so far, expanding the Folly's lore in a deliberately different register.",
          page_count: 302,
          publication_year: 2014,
        },
        {
          title: 'The Hanging Tree',
          slug: 'the-hanging-tree',
          status: 'mandatory',
          note: "Lady Ty, Mama Thames's eldest daughter and a fixture since book one, calls in a favor that pulls Peter into old-money London magic families and Folly politics, while the Faceless Man arc keeps building toward its climax.",
          page_count: 387,
          publication_year: 2016,
        },
        {
          title: 'Lies Sleeping',
          slug: 'lies-sleeping',
          status: 'mandatory',
          note: "The Faceless Man arc, running since book three, reaches its conclusion here, paying off threads the series has been building for four books. Do not start the series here.",
          page_count: 316,
          publication_year: 2018,
        },
        {
          title: 'False Value',
          slug: 'false-value',
          status: 'mandatory',
          note: "Peter leaves the Met to go undercover at a tech company, in a setup that deliberately widens the series' scope beyond London policing while the Folly keeps operating in the background.",
          page_count: 320,
          publication_year: 2020,
        },
        {
          title: 'Amongst Our Weapons',
          slug: 'amongst-our-weapons',
          status: 'mandatory',
          note: "A body turns up in the London Silver Vaults with his chest precisely cored out, pulling Peter and the Special Assessment Unit into a case involving enchanted rings and a rival lineage of magicians, while Peter takes on his own trainee for the first time.",
          page_count: 305,
          publication_year: 2022,
        },
        {
          title: 'Stone and Sky',
          slug: 'stone-and-sky',
          status: 'mandatory',
          note: "Peter takes his family on a Scottish holiday to Aberdeen while Nightingale trains Abigail elsewhere, and a body that washes up fresh from the sea turns into a murder investigation tangled up in local myth and history, the series' first extended stretch entirely outside London.",
          page_count: 304,
          publication_year: 2025,
        },
      ],
    },
    {
      label: 'Novellas & Collections',
      sublabel: 'any order - optional, see each note for placement',
      noteType: 'optional',
      books: [
        {
          title: 'The October Man',
          slug: 'the-october-man',
          status: 'optional',
          note: "Set in Germany's Mosel wine region, the case runs almost as a mirror of Peter's own investigations, filtered through the Bundeskriminalamt instead of the Met, which makes it a neat contrast rather than just more of the same setting.",
          page_count: 162,
          publication_year: 2019,
        },
        {
          title: 'What Abigail Did That Summer',
          slug: 'what-abigail-did-that-summer',
          status: 'supplementary',
          note: "Set during the same summer as Lies Sleeping while Peter is occupied elsewhere, this follows Abigail Kamara investigating Hampstead Heath teenagers who keep vanishing and returning evasive, aided by a network of talking foxes.",
          page_count: 191,
          publication_year: 2021,
        },
        {
          title: 'Tales from the Folly',
          slug: 'tales-from-the-folly',
          status: 'supplementary',
          note: "An eleven-piece collection mixing previously published short fiction from Aaronovitch's blog and limited editions with new material; read whenever, since nothing here is essential to the main plot.",
          page_count: 166,
          publication_year: 2020,
        },
        {
          title: "Winter's Gifts",
          slug: 'winters-gifts',
          status: 'supplementary',
          note: "The first Rivers of London story set in the US, following FBI agent Kimberley Reynolds (introduced in Whispers Underground) into a snowbound Wisconsin case tied to colonial-era history.",
          page_count: 211,
          publication_year: 2023,
        },
        {
          title: 'The Masquerades of Spring',
          slug: 'the-masquerades-of-spring',
          status: 'supplementary',
          note: "A prequel set in 1920s New York, decades before Peter's era, narrated by a Bertie Wooster-style dandy as Nightingale investigates a cursed saxophone in the Harlem jazz scene.",
          page_count: 143,
          publication_year: 2024,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Peter Grant',
      role: 'Protagonist, narrator, all ten books',
      faction: 'Metropolitan Police, the Folly',
      color: 'blue',
      why_they_work:
        "His voice, curious, sarcastic, obsessed with the mechanics of everything from Victorian sewage systems to spell construction, is the actual texture of the books; if his narration doesn't land by chapter two of book one, nothing else about the series will save it for you.",
    },
    {
      name: 'Thomas Nightingale',
      role: "Peter's mentor, DCI",
      faction: 'The Folly',
      color: 'amber',
      why_they_work:
        "His relationship with Peter inverts the usual master-student dynamic as the series progresses: Nightingale increasingly needs Peter's engineering mindset to understand magic he's practiced instinctively for a century, which shifts the power balance between them rather than just deepening the mentorship.",
    },
    {
      name: 'The Faceless Man',
      role: 'Primary antagonist, books 2-7',
      faction: 'Independent, outside Folly oversight',
      color: 'red',
      why_they_work:
        "He's built something using old magic and new money entirely outside the Folly's radar, and the slow process of even figuring out he exists, let alone who he is, gives the early series a mystery structure most urban fantasy skips in favor of a villain who announces himself immediately.",
    },
    {
      name: 'Molly',
      role: "The Folly's housekeeper",
      faction: 'Unclear - non-human, present since 1911',
      color: 'zinc',
      why_they_work:
        "She never speaks, has too many teeth, and Aaronovitch never fully explains what she is, which makes her the series' best example of an unsettling character built through omission rather than a monster-movie reveal.",
    },
    {
      name: 'Lady Ty (Cecilia Tyburn Thames)',
      role: "Recurring ally, Mama Thames's eldest daughter",
      faction: 'The London rivers',
      color: 'purple',
      why_they_work:
        "She runs her political standing among London's river gods the way a real operator runs actual institutional power, boards, favors, leverage, which makes the river-god material feel like real-world politics wearing a mythological coat rather than the reverse.",
    },
    {
      name: 'Beverley Brook',
      role: "Peter's eventual partner, a river goddess",
      faction: 'The London rivers',
      color: 'green',
      why_they_work:
        "As one of Mama Thames's daughters who actually works alongside Peter rather than just appearing in court politics, she gives the series' magic-meets-bureaucracy premise a personal, ongoing stake rather than just a professional one.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Police procedural first, urban fantasy second: cases get investigated with actual policework, and the magic system operates by internally consistent rules Peter has to learn and test rather than intuit.",
        "The closest comparisons on this list are The Dresden Files for the urban-fantasy-detective setup, though Peter is drier and more grounded than Harry Dresden and less shaped by mythology, and Kate Daniels for a protagonist whose magic and day job are inseparable from each other.",
        "The comedy is dry and built into Peter's narration rather than played for laughs; it's not a comedy, but it reads funnier than most books that are trying to be.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Darkness comes from police-procedural violence, occasional real physical danger to named characters, and the weight of Nightingale's WWII history; nothing is played for shock value.",
        'Explicit content: no. Romance appears but stays in the background of the police-procedural plot.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Main Series',
      level: 3,
      desc: "Police-procedural danger throughout, rising to its most intense in the Faceless Man arc's final stretch (books 6-7), where the violence and personal cost both peak",
    },
    {
      label: 'Novellas & Collections',
      level: 2,
      desc: "Generally lighter than the main sequence; Winter's Gifts and What Abigail Did That Summer touch real danger but nothing at the level of the Faceless Man arc",
    },
  ],
  metaDescription:
    "The complete Rivers of London reading order: all ten Peter Grant novels in publication order, plus where the five novellas and collections fit in.",
  shortName: 'Rivers of London',
  booksLikeSlug: 'rivers-of-london',
  lastUpdated: '2026-09-14',
  finishedLabel: 'Finished the Rivers of London series?',
  categoryHref: '/fantasy/urban',
  categoryLabel: 'Browse Urban Fantasy',
  related: ['dresden-files', 'kate-daniels', 'vlad-taltos', 'gentleman-bastard', 'green-bone-saga', 'witcher'],
};
