import type { ReadingOrderEntry } from '../reading-orders';

export const tortall: ReadingOrderEntry = {
  slug: 'tortall',
  name: 'Tortall Universe',
  author: 'Tamora Pierce',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - Numair Chronicles unfinished (1 of a planned trilogy)',
  description:
    "Tamora Pierce built Tortall as six sub-series across four decades, and the throughline never bends: a girl or young woman breaks into a role the kingdom insists is closed to her, and Pierce is specific about what that actually costs, not just that it's hard. Alanna disguises herself as a boy to train as a knight. Kel does the opposite twelve years later: she trains openly as the first girl who doesn't hide, and absorbs every consequence of visibility that Alanna's lie let her avoid. Daine talks to animals and eventually the gods take notice of her. The six sub-series share a timeline and a cast that crosses over, but each one is written to work as its own entry point: you don't need Alanna's books to follow Kel's, and you don't need any of them to follow Daine's.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate',
  orderNote:
    "Start with Alanna: The First Adventure (Song of the Lioness) or Wild Magic (The Immortals): both work as clean entry points and require nothing read first. Song of the Lioness is Pierce's original 1983 starting point and the most widely read of the six sub-series; the prose is simpler and the books are shorter than everything she wrote after. Protector of the Small is a complete, satisfying four-book arc, but it's optional, not required to enjoy the rest of Tortall. Daughter of the Lioness needs at least passing familiarity with Alanna, so read Song of the Lioness first if you want it. Beka Cooper is set two centuries before the rest of Tortall and reads best once you already know the world it's building toward. Save it. Don't start with Numair Chronicles: it's an incomplete prequel trilogy, one book published so far, written for readers who already know who Numair is. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Tamora Pierce',
      body: 'Pierce published Alanna: The First Adventure in 1983 and has been adding to Tortall ever since: six sub-series, over a dozen novels, spanning more than 40 years. She was writing girls who train as knights and talk back to gods before it was a YA fantasy category. The Numair Chronicles, begun in 2018, is her most recent addition and is still unfinished.',
      color: 'blue',
    },
    {
      title: '⚔️ What Tortall Actually Does',
      body: "Every main sub-series (except Numair's) puts a woman or girl into a role the setting has explicitly ruled off-limits, and the books track the specific mechanism of resistance she faces (law, custom, her own trainers) rather than a vague sense of sexism. Alanna's mechanism is disguise. Kel's is enduring open hostility while she trains in full view. Daine's is different in kind: her power isn't gendered at all, and the series uses her instead to ask what the gods owe the people they've stopped watching.",
      color: 'purple',
    },
    {
      title: '🗺️ Six Sub-Series, Six Entry Points',
      body: "Beka Cooper, Song of the Lioness, The Immortals, Protector of the Small, Daughter of the Lioness, and the Numair Chronicles all sit in the same Tortall, decades apart in-world. They're written to be readable in almost any order: the real decision is just which protagonist and which era you want first.",
      color: 'amber',
    },
    {
      title: '🎯 The Two Real Starting Points',
      body: "Alanna: The First Adventure gives you Pierce's original 1983 starting point: a girl disguised as a boy, training as a knight, in the simplest and shortest prose she ever wrote for Tortall. Wild Magic gives you Daine's world-facing story instead: beast-magic, the gods as active characters, immortal creatures loose in Tortall. Both are complete four-book arcs on their own.",
      color: 'green',
    },
    {
      title: '🔗 The Crossovers Are Optional Knowledge',
      body: "Alanna appears as a supporting adult in Protector of the Small. Daine and Numair appear in Daughter of the Lioness. None of these appearances require you to have read the earlier books to follow what's happening in the moment. Pierce reintroduces who everyone is. They just land with more weight if you already know them.",
      color: 'red',
    },
    {
      title: '🔮 The Unfinished Thread',
      body: 'Tempests and Slaughter (2018) is the only Numair Chronicles book published so far, out of a planned trilogy. It follows Numair as a teenage student mage, decades before he becomes Daine\'s companion in The Immortals. Treat it as a bonus for readers who already love the world, not a series to invest in expecting a conclusion soon.',
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Song of the Lioness',
      sublabel: 'read in this order - one of two recommended starting points; needed before Daughter of the Lioness',
      books: [
        {
          title: 'Alanna: The First Adventure',
          slug: 'alanna',
          status: 'mandatory',
          note: 'Alanna swaps places with her twin brother and disguises herself as a boy to train as a knight, since girls aren\'t permitted to. Pierce\'s 1983 debut; the prose is plainer and each book is shorter than anything she wrote after.',
          page_count: 272,
          publication_year: 1983,
        },
        {
          title: 'In the Hand of the Goddess',
          slug: 'in-the-hand-of-the-goddess',
          status: 'mandatory',
          note: "Alanna's training intensifies as she nears the ordeal that will confirm or end her disguise for good, while a prince's growing attention complicates keeping it secret.",
          page_count: 272,
          publication_year: 1984,
        },
        {
          title: 'The Woman Who Rides Like a Man',
          slug: 'the-woman-who-rides-like-a-man',
          status: 'mandatory',
          note: "Newly knighted and her secret now public, Alanna leaves Tortall and is taken in by a desert tribe with its own rules about what a woman can and can't do: different rules than the ones she just spent three books fighting.",
          page_count: 288,
          publication_year: 1986,
        },
        {
          title: 'Lioness Rampant',
          slug: 'lioness-rampant',
          status: 'mandatory',
          note: 'Alanna quests for the Dominion Jewel while the political crisis that has been building since book one comes to a head. Her arc closes here; later appearances are as a supporting adult.',
          page_count: 384,
          publication_year: 1988,
        },
      ],
    },
    {
      label: 'The Immortals',
      sublabel: 'read in this order - one of two recommended starting points',
      books: [
        {
          title: 'Wild Magic',
          slug: 'wild-magic',
          status: 'mandatory',
          note: "Daine, a thirteen-year-old orphan, is hired as a horse handler and discovers her wild magic lets her communicate with and eventually shape-shift into animals. The immortal creatures Tortall's mages sealed away centuries ago are getting loose.",
          page_count: 352,
          publication_year: 1992,
        },
        {
          title: 'Wolf-Speaker',
          slug: 'wolf-speaker',
          status: 'mandatory',
          note: 'A wolf pack Daine befriended in book one calls her back to stop a mining operation from poisoning their valley. Her power grows more dangerous to control here than it was in Wild Magic.',
          page_count: 352,
          publication_year: 1994,
        },
        {
          title: 'Emperor Mage',
          slug: 'emperor-mage',
          status: 'mandatory',
          note: "A diplomatic mission to Carthak puts Daine in the court of an emperor mage who controls the country's magic absolutely. Her powers develop enough that other characters start treating her as genuinely dangerous, not just talented.",
          page_count: 328,
          publication_year: 1994,
        },
        {
          title: 'The Realms of the Gods',
          slug: 'the-realms-of-the-gods',
          status: 'mandatory',
          note: "Daine and Numair are thrown into the realm of the gods themselves during a battle. The series' answer to what Daine's magic actually is, and where it comes from, is here.",
          page_count: 297,
          publication_year: 1996,
        },
      ],
    },
    {
      label: 'Protector of the Small',
      sublabel: 'read in this order - a complete, substantial arc; not required to enjoy the rest of Tortall',
      books: [
        {
          title: 'First Test',
          slug: 'first-test',
          status: 'optional',
          note: "Ten years after Alanna's identity was revealed, the law changes to let girls train as pages openly. Kel is the first to try, and her training master makes it his personal project to force her out through legal technicalities rather than open discrimination.",
          page_count: 241,
          publication_year: 1999,
        },
        {
          title: 'Page',
          slug: 'page',
          status: 'optional',
          note: "Kel's page years, and the ordeal every trainee faces before becoming a squire. Her fear of heights, established as a real practical problem rather than a symbolic one, becomes a plot point.",
          page_count: 289,
          publication_year: 2000,
        },
        {
          title: 'Squire',
          slug: 'squire',
          status: 'optional',
          note: "Kel squires under Raoul, a lord who actually wants her to succeed, which changes the shape of her training from books one and two. She commands troops for the first time and starts training griffins.",
          page_count: 434,
          publication_year: 2001,
        },
        {
          title: 'Lady Knight',
          slug: 'lady-knight',
          status: 'optional',
          note: 'Newly knighted, Kel is given command of a refugee camp during wartime rather than a combat post, which several people read as a deliberate setup for her to fail publicly. Pierce\'s most-cited Tortall book.',
          page_count: 444,
          publication_year: 2002,
        },
      ],
    },
    {
      label: 'Daughter of the Lioness',
      sublabel: "read in this order - needs at least passing familiarity with Alanna",
      books: [
        {
          title: "Trickster's Choice",
          slug: 'tricksters-choice',
          status: 'optional',
          note: "Alanna's daughter Aly is captured and sold as a slave on the Copper Isles, and ends up spying for the household she's enslaved to as a revolution builds around her. Espionage and court politics, not knight training.",
          page_count: 450,
          publication_year: 2003,
        },
        {
          title: "Trickster's Queen",
          slug: 'tricksters-queen',
          status: 'optional',
          note: "The revolution Aly has been quietly steering toward a specific outcome finally moves, and she has to manage the gap between what her allies think they're fighting for and what she actually intends.",
          page_count: 470,
          publication_year: 2004,
        },
      ],
    },
    {
      label: 'Beka Cooper',
      sublabel: 'read in this order - prequel, set ~200 years before the rest of Tortall; best saved for readers who already love the world',
      books: [
        {
          title: 'Terrier',
          slug: 'terrier',
          status: 'optional',
          note: "Beka, an ancestor of Alanna's, is a rookie trainee with Corus's Provost's Guard. Grittier and more street-level than any other Tortall sub-series: this is police work in a fantasy city, not knight training.",
          page_count: 610,
          publication_year: 2006,
        },
        {
          title: 'Bloodhound',
          slug: 'bloodhound',
          status: 'optional',
          note: "Beka goes undercover in another city to trace counterfeit coin flooding Tortall's economy. The magic system built around her scent hounds and the ghosts she can hear gets used more heavily here than in Terrier.",
          page_count: 560,
          publication_year: 2009,
        },
        {
          title: 'Mastiff',
          slug: 'mastiff',
          status: 'optional',
          note: "The trilogy's darkest book: Beka hunts kidnappers holding a child hostage to the throne, and the case exposes rot inside the Provost's Guard itself.",
          page_count: 610,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'The Numair Chronicles',
      sublabel: 'prequel to The Immortals - unfinished; not a starting point',
      note: "One book published (2018) of a planned trilogy. Book two, The Exile's Gift, has a real announced title but a long history of missed release dates (originally targeted 2021, then August 2024, still unreleased as of the most recent information available). Numair's adult self is a supporting character in The Immortals; this is his backstory, not required to follow anything else in Tortall.",
      noteType: 'warning',
      books: [
        {
          title: 'Tempests and Slaughter',
          slug: 'tempests-and-slaughter',
          status: 'optional',
          note: "Arram Draper (later known as Numair) is a gifted, very young student at the imperial university in Carthak, years before the events of Wild Magic. Slower and more school-focused than the rest of Tortall; the trilogy is not complete.",
          page_count: 432,
          publication_year: 2018,
        },
        {
          title: "The Exile's Gift",
          slug: null,
          status: 'upcoming',
          note: "Announced as book two, but repeatedly delayed since its original target date. No confirmed release date as of this writing.",
          publication_year: null,
        },
        {
          title: 'Untitled',
          slug: null,
          status: 'upcoming',
          note: "The planned third book. No title or release information has been announced.",
          publication_year: null,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Alanna of Trebond',
      role: 'Protagonist, Song of the Lioness; recurring adult in later sub-series',
      faction: 'The King\'s Champion',
      color: 'blue',
      why_they_work:
        "She solves the 'girl who wants to be a knight' problem through disguise, which is a fundamentally different bargain than Kel's later, more visible fight: Alanna gets access by hiding, then has to live with what happens when the hiding stops working.",
    },
    {
      name: 'Keladry of Mindelan',
      role: 'Protagonist, Protector of the Small',
      faction: 'King\'s Own',
      color: 'green',
      why_they_work:
        "Kel trains with no disguise at all, which means every instructor who dislikes the idea of a female knight has a legal target instead of a secret to eventually expose. Where Alanna's arc is about concealment, Kel's is about absorbing hostility in plain sight without becoming bitter.",
    },
    {
      name: 'Veralidaine Sarrasri (Daine)',
      role: 'Protagonist, The Immortals',
      faction: "Numair's student; later the gods' adopted daughter",
      color: 'purple',
      why_they_work:
        "Her wild magic isn't a gendered obstacle like Alanna's or Kel's. It's a power so large the gods themselves have a stake in it, which shifts the entire sub-series from 'proving I belong in this institution' to 'what do the gods owe the world they stopped watching.'",
    },
    {
      name: 'Numair Salmalín (Arram Draper)',
      role: "Daine's mentor and companion in The Immortals; protagonist of the Numair Chronicles",
      color: 'amber',
      why_they_work:
        "He's Tortall's most powerful mage and the rare adult in the series who is fully on the protagonist's side without complication. The Numair Chronicles shows him as a teenage student, years before that reputation existed.",
    },
    {
      name: 'Aly Cooper',
      role: 'Protagonist, Daughter of the Lioness',
      faction: 'Spymaster of the Copper Isles rebellion',
      color: 'red',
      why_they_work:
        "Alanna's daughter, but the sub-series pointedly doesn't repeat her mother's arc: Aly's tools are information and manipulation, not a sword, and her Tortall duology reads closer to a spy novel than a knight story.",
    },
    {
      name: 'Rebakah Cooper (Beka)',
      role: 'Protagonist, Beka Cooper trilogy',
      faction: "Corus Provost's Guard",
      color: 'zinc',
      why_they_work:
        "Written last (2006–2011) but set roughly 200 years before every other Tortall book, which means Beka's Corus has none of the later books' familiar institutions yet. Pierce uses the prequel gap to build the city from the ground up rather than reference it.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Tortall is YA adventure fantasy that doesn't flinch from war, death, and institutional corruption, but frames all of it through a young protagonist solving a specific, concrete problem rather than through graphic content.",
        'The books are not preachy about the female-protagonist throughline. It is simply the obstacle each protagonist spends her books working through, stated once and then demonstrated rather than re-argued every chapter.',
        'The closest comparisons are Robin McKinley and early Mercedes Lackey (Valdemar): character-driven training narratives where competence is earned on the page, not granted by prophecy.',
        "Tone varies more by sub-series than most single-author fantasy worlds: Beka Cooper reads like street-level crime fiction, Daughter of the Lioness reads like a spy novel, and the other four read as fairly traditional training-and-adventure YA.",
      ],
    },
    {
      heading: 'In-world timeline vs. recommended reading order',
      type: 'bullets',
      bullets: [
        "In-world, Beka Cooper comes first by roughly two centuries, and the Numair Chronicles follows soon after as Numair's youth, decades before The Immortals. Song of the Lioness, The Immortals, and Protector of the Small sit within the same generation, with Daughter of the Lioness last since Aly is Alanna's adult daughter.",
        'This guide orders sub-series by recommended reading experience, not strict chronology. Reading in in-world order means starting with Beka Cooper, which this guide specifically advises against.',
        "Beka Cooper's two-century distance from the rest of Tortall means nothing in it spoils anything else, regardless of when you read it.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness is moral and situational rather than graphic: institutional resistance, war casualties, abuse of power, and (in Beka Cooper specifically) street-level crime including trafficking and murder investigations.',
        'Romance is present throughout but stays closed-door to sweet across nearly every book; The Woman Who Rides Like a Man is the one entry with slightly more explicit content as Alanna\'s relationships mature.',
        'No sexual content beyond what is described above. Suitable for age 12+ as a baseline, with Beka Cooper and Mastiff specifically running darker than the rest of the saga.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Alanna: The First Adventure (1983) predates most of what is now marketed as YA fantasy with a female protagonist by over a decade.',
        'Pierce won the 2013 Margaret A. Edwards Award from YALSA (the American Library Association), which cited Song of the Lioness and Protector of the Small by name for their significant and lasting contribution to young adult literature.',
        "Sarah J. Maas and Leigh Bardugo have both named Pierce as a direct influence. Maas has said Pierce's books \"shaped me not only as a young writer but also as a young woman.\"",
      ],
    },
  ],
  darkness: [
    {
      label: 'Song of the Lioness',
      level: 2,
      desc: 'Institutional resistance and real combat risk, but the mildest entry point in the saga',
    },
    {
      label: 'The Immortals',
      level: 3,
      desc: 'War against immortal creatures, genuine casualties, and a growing sense that Daine\'s power is dangerous even to her allies',
    },
    {
      label: 'Protector of the Small',
      level: 3,
      desc: 'Sustained institutional hostility toward Kel, wartime command of a refugee camp, and real combat losses under her command',
    },
    {
      label: 'Daughter of the Lioness',
      level: 3,
      desc: 'Slavery, revolution, and the moral cost of manipulating people who trust Aly toward an outcome she chose without telling them',
    },
    {
      label: 'Beka Cooper',
      level: 3,
      desc: 'Street-level crime investigation: trafficking, murder, and institutional corruption inside the Provost\'s Guard itself. The darkest sub-series.',
    },
    {
      label: 'Numair Chronicles',
      level: 2,
      desc: 'School-focused and lower-stakes so far, though the one published book hints at the political pressure Numair will spend his adult life escaping',
    },
  ],
  metaDescription:
    'The complete Tortall Universe reading order: all six Tamora Pierce sub-series (Song of the Lioness, The Immortals, Protector of the Small, Daughter of the Lioness, Beka Cooper, and the Numair Chronicles) with the right starting point for new readers.',
  shortName: 'Tortall',
  booksLikeSlug: 'alanna',
  lastUpdated: '2026-08-19',
  finishedLabel: 'Finished Tortall?',
  categoryHref: '/fantasy/academia',
  categoryLabel: 'Browse Academy Fantasy',
  related: ['earthsea', 'old-kingdom', 'pern', 'valdemar', 'rick-riordan', 'inheritance-cycle'],
};
