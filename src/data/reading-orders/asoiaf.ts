import type { ReadingOrderEntry } from '../reading-orders';

export const asoiaf: ReadingOrderEntry = {
  slug: 'asoiaf',
  name: 'A Song of Ice and Fire',
  author: 'George R.R. Martin',
  seriesStatus: 'incomplete',
  seriesStatusLabel: '⚠️ Incomplete - Winds of Winter still unannounced',
  description:
    "A Song of Ice and Fire is a political fantasy about the collision between human ambition and inhuman threat: seven kingdoms tearing each other apart over an iron throne while something far worse gathers on the far side of the Wall. Martin writes in tight named POV chapters: one character per chapter, no omniscient narrator, no information beyond what that character knows. The dramatic irony this creates (the reader seeing disaster coming while the characters cannot) is structural to how the series works. No protagonist is safe. No storyline is promised resolution. The five published books are 4,600 pages of cumulative depth without a conclusion. The Winds of Winter has been in progress since 2011 with no confirmed release date. Start with A Game of Thrones.",
  darknessDisplay: '🕯️🕯️🕯️🕯️-🕯️🕯️🕯️🕯️🕯️ Dark to Brutal',
  groups: [
    {
      label: 'A Song of Ice and Fire',
      sublabel: 'books 1-5 - read in order',
      noteType: 'required',
      note: 'Publication order is the only order. Do not skip ahead or look anything up. This series works best experienced blind.',
      books: [
        {
          title: 'A Game of Thrones',
          slug: 'a-game-of-thrones',
          status: 'mandatory',
          note: 'The foundation. Introduces the major houses, the political web, and the shock in the first book that signals what kind of series this is.',
          page_count: 694,
          publication_year: 1996,
        },
        {
          title: 'A Clash of Kings',
          slug: 'a-clash-of-kings',
          status: 'mandatory',
          note: "Five kings claim the throne. The political complexity doubles and the world expands beyond King's Landing.",
          page_count: 768,
          publication_year: 1998,
        },
        {
          title: 'A Storm of Swords',
          slug: 'a-storm-of-swords',
          status: 'mandatory',
          note: 'The peak of the series. Contains the most devastating chapters Martin has written. Do not look anything up.',
          page_count: 973,
          publication_year: 2000,
        },
        {
          title: 'A Feast for Crows',
          slug: 'a-feast-for-crows',
          status: 'mandatory',
          note: 'Slower, more political. Martin split books 4 and 5 by POV character rather than timeline: AFFC covers the southern and western storylines.',
          page_count: 753,
          publication_year: 2005,
        },
        {
          title: 'A Dance with Dragons',
          slug: 'a-dance-with-dragons',
          status: 'mandatory',
          note: 'Covers the characters absent from AFFC: Jon, Tyrion, Daenerys. Runs parallel to Feast for the first half, then moves forward. The series ends here for now.',
          page_count: 1016,
          publication_year: 2011,
        },
        {
          title: 'The Winds of Winter',
          slug: null,
          status: 'upcoming',
          note: 'In progress since 2011. No confirmed release date.',
          publication_year: null,
        },
        {
          title: 'A Dream of Spring',
          slug: null,
          status: 'upcoming',
          note: 'Final book in the series. Unwritten.',
          publication_year: null,
        },
      ],
    },
    {
      label: 'Tales of Dunk and Egg',
      sublabel: 'read after the main series',
      noteType: 'optional',
      note: 'Three novellas set 90 years before the main series, following hedge knight Ser Duncan the Tall and his squire Egg (later King Aegon V). Collected in A Knight of the Seven Kingdoms. Lighter and more adventure-driven than ASOIAF. Non-essential but rewarding for readers who want more time in Westeros. Source material for the HBO series A Knight of the Seven Kingdoms.',
      books: [
        {
          title: 'The Hedge Knight',
          slug: 'the-hedge-knight',
          status: 'optional',
          note: 'Dunk and Egg meet. A hedge knight enters a tourney; things go wrong in ways that feel very Westerosi. The lightest entry point into Westeros Martin has written.',
          page_count: 168,
          publication_year: 1998,
        },
        {
          title: 'The Sworn Sword',
          slug: 'the-sworn-sword',
          status: 'optional',
          note: 'Dunk and Egg hired on at a small estate. A water dispute escalates. Martin writes the political stakes smaller but no less real.',
          page_count: 137,
          publication_year: 2008,
        },
        {
          title: 'The Mystery Knight',
          slug: 'the-mystery-knight',
          status: 'optional',
          note: 'Another tourney, another disaster. The deepest lore of the three and the best ending point the novellas have so far.',
          page_count: 160,
          publication_year: 2010,
        },
        {
          title: 'The Upsworn',
          slug: null,
          status: 'upcoming',
          note: 'Fourth Dunk & Egg novella. Announced but no release date confirmed.',
          publication_year: null,
        },
      ],
    },
    {
      label: 'Fire & Blood',
      sublabel: 'Targaryen history - read after the main series',
      noteType: 'optional',
      note: 'The history of House Targaryen from Aegon the Conqueror through the Dance of Dragons. Written as an in-world history rather than a novel: dense and encyclopedic. Best read after the main ASOIAF books for maximum context, or alongside watching HotD. Source material for House of the Dragon.',
      books: [
        {
          title: 'Fire & Blood',
          slug: 'fire-and-blood',
          status: 'optional',
          note: 'Covers the Targaryen dynasty from the Conquest to Aegon III. The Dance of Dragons (the Targaryen civil war at its centre) is the basis for House of the Dragon. Reads as lore history rather than a novel.',
          page_count: 736,
          publication_year: 2018,
        },
        {
          title: 'Blood & Fire',
          slug: null,
          status: 'upcoming',
          note: 'Second volume of Targaryen history. Announced but no release date confirmed.',
          publication_year: null,
        },
      ],
    },
  ],
  orderNote:
    'Start with A Game of Thrones. The five main books read in publication order. No exceptions. The Dunk & Egg novellas and Fire & Blood are optional companion reading, best saved for after the main series. Neither is required to follow the main plot.',
  cardsPosition: 'above',
  cards: [
    {
      title: '⚡ A Storm of Swords',
      body: "A Storm of Swords is when the series delivers. The Red Wedding, the Purple Wedding, Tyrion's trial: the most celebrated and most devastating chapters Martin has written, back to back. Go in completely blind. Do not look anything up. The shock is structural to how it works.",
      color: 'blue',
    },
    {
      title: '📖 Books 4 & 5',
      body: "Martin split books 4 and 5 by POV character rather than timeline. AFFC and ADWD cover roughly the same period. AFFC is slower and more political: southern and western storylines, aftermath of war, Cersei's point of view. ADWD picks up the characters absent from AFFC: Jon, Tyrion, Daenerys. Read them back to back. They work as a unit.",
      color: 'amber',
    },
    {
      title: '⚠️ The Wait',
      body: 'The Winds of Winter has been in progress since A Dance with Dragons was published in 2011. No release date has been announced. Start the series knowing it does not currently end. The five published books are substantial enough to read on their own terms. The story does not stop mid-sentence. But it does not resolve.',
      color: 'red',
    },
    {
      title: '📺 Books vs Show',
      body: 'The HBO show follows the books closely through season 4. After that the adaptations diverge: characters are cut, arcs are compressed or redirected, and the endings are entirely different. Watching the show first does not spoil the books. The stories are distinct enough from season 5 onward to function as separate works. The books carry substantially more lore, secondary characters, and political complexity than the show could carry.',
      color: 'purple',
    },
    {
      title: '🐉 House of the Dragon',
      body: "House of the Dragon is adapted from Fire & Blood, Martin's Targaryen history written as an in-world chronicle. Read Fire & Blood before watching for the full foreknowledge of how it ends, or after watching to fill in what the show compressed. Neither is required for ASOIAF. The Targaryen history is backstory, not setup.",
      color: 'green',
    },
    {
      title: "📝 How It's Written",
      body: "Every chapter is locked into one character's head. No omniscient narrator, no corrections when they misread the situation. Two POV characters can witness the same event and give completely opposite accounts. The dramatic irony this creates (the reader seeing disaster coming while the characters cannot) is the engine of the series. A POV character death is permanent: you lose their perspective on the world forever.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Eddard "Ned" Stark',
      role: 'POV character, Lord of Winterfell',
      faction: 'House Stark',
      color: 'blue',
      why_they_work:
        "The orientation character for book 1: honourable, legible, and wrong about almost everything that matters. His arc establishes that the series operates on different rules than the reader expects. His absence from the rest of the series is felt in every chapter that follows.",
    },
    {
      name: 'Tyrion Lannister',
      role: 'POV character across all five books',
      faction: 'House Lannister',
      color: 'amber',
      why_they_work:
        "The character readers most often cite as the reason they continued after book 1. Funny, self-aware, and operating under no illusions about what his family is. Martin gives him the most political intelligence and the least power to use it.",
    },
    {
      name: 'Jon Snow',
      role: "POV character, steward of the Night's Watch",
      faction: "Night's Watch",
      color: 'zinc',
      why_they_work:
        "The nearest thing to a traditional fantasy hero the series has, which is exactly what makes his chapters feel off-balance. He is at the Wall dealing with what is coming from beyond it while everyone else is killing each other over the throne.",
    },
    {
      name: 'Daenerys Targaryen',
      role: 'POV character, claimant to the Iron Throne',
      faction: 'House Targaryen',
      color: 'red',
      why_they_work:
        "Her chapters are geographically separate from everyone else's through most of the series and can feel like a different book. They pay off. Do not skip them looking for faster-moving political content.",
    },
    {
      name: 'Cersei Lannister',
      role: 'Queen Regent, POV character from book 4',
      faction: 'House Lannister',
      color: 'green',
      why_they_work:
        "Not a POV character in the first three books, where she reads as the primary antagonist and appears purely malevolent. When Martin gives her a POV in Feast for Crows, the picture becomes considerably more complicated without becoming sympathetic.",
    },
    {
      name: 'Jaime Lannister',
      role: 'Ser Jaime Lannister, Kingsguard',
      faction: 'House Lannister',
      color: 'purple',
      why_they_work:
        "Established in book 1 as a villain without ambiguity. His arc across books 3 and 4 is Martin's most explicit argument that the POV structure is also a moral argument: the reader's first impression of any character is bounded entirely by who was watching.",
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'Start with A Game of Thrones. There is no other entry point. The series requires sequential reading.',
        'Watched the show? Start from book 1 regardless. The books diverge significantly from season 5 onward and are richer throughout.',
        'The Dunk & Egg novellas and Fire & Blood are optional and best saved for after the five main books.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness is structural: no protagonist is safe, no storyline is guaranteed resolution, and major characters die without warning.',
        'Sexual violence is present throughout (including assault) in contexts that are not always critically framed. This is the most significant content warning for the series.',
        'Violence is graphic and frequent: war, torture, political executions, child deaths.',
        'Right for: readers who want political epic fantasy where no character or storyline is safe. Not right for: readers who need protagonist safety or clean narrative resolutions.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Published in 1996, it preceded the Lord of the Rings films and redefined what adult fantasy could do.',
        "Ned Stark's death in book 1 changed the genre's relationship with protagonist safety. No serious epic fantasy writer since has ignored it.",
        'The HBO adaptation became one of the most-watched series in television history and brought a generation of new readers to fantasy.',
        "Martin's influence on grimdark is direct: Abercrombie, Lawrence, and Erikson have all cited him.",
        'At five books and unfinished, it remains the most ambitious and most debated series in contemporary epic fantasy.',
      ],
    },
    {
      heading: 'Spoiler-free reading tips',
      type: 'bullets',
      bullets: [
        'The first ~100 pages of A Game of Thrones establish the world and the rules. Chapter 6 is where the tone of the series makes itself clear.',
        'The appendices at the back of each book list all houses and characters by allegiance. Consulting them mid-read contains no spoilers and will save you from losing track of the large cast.',
      ],
    },
  ],
  darkness: [
    {
      label: 'A Game of Thrones',
      level: 5,
      desc: 'Political violence, executions, and the shock that establishes the series has no plot armour.',
    },
    {
      label: 'A Clash of Kings',
      level: 4,
      desc: 'War begins in earnest. Atrocities multiply across multiple fronts.',
    },
    {
      label: 'A Storm of Swords',
      level: 5,
      desc: "The most devastating events arrive back to back without warning.",
    },
    {
      label: 'A Feast for Crows',
      level: 4,
      desc: 'Aftermath and political decay. The consequences of three books of war settle across Westeros.',
    },
    {
      label: 'A Dance with Dragons',
      level: 4,
      desc: 'Isolation, survival, and hard choices at the edges of the known world.',
    },
    {
      label: 'Dunk & Egg',
      level: 3,
      desc: 'Adventure-driven and lighter than the main series. Still Westerosi. Consequences still land.',
    },
    {
      label: 'Fire & Blood',
      level: 4,
      desc: 'The Dance of Dragons (the Targaryen civil war) is a full war with dragonfire told as history.',
    },
  ],
  metaDescription:
    'A Song of Ice and Fire reading order: all 5 ASOIAF books, Dunk & Egg novellas, Fire & Blood, and where House of the Dragon fits.',
  lastUpdated: '2026-06-26',
  finishedLabel: 'Finished the published books?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'a-game-of-thrones',
  related: [
    'first-law',
    'malazan',
    'wheel-of-time',
    'mark-lawrence',
    'black-company',
    'witcher',
  ],
};
