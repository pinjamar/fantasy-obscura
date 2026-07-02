import type { ReadingOrderEntry } from '../reading-orders';

export const jamesIslington: ReadingOrderEntry = {
  slug: 'james-islington',
  name: 'James Islington',
  author: 'James Islington',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '✅ Licanius Trilogy complete - 📖 The Hierarchy Series ongoing (4 books planned)',
  description:
    'James Islington has written two entirely separate fantasy series with nothing shared between them: different worlds, different magic, different casts. The Licanius Trilogy (complete, 2014–2019) is traditional epic fantasy built around a time-mechanics plot where actions in the present create consequences that already exist in the past: the architecture of that causal structure is the actual puzzle, and the plotting is among the most complex in recent epic fantasy. The Hierarchy Series (ongoing, 2023–) is dark academia fantasy set in a Roman-inspired empire where power is literally drawn from the people below you in the social hierarchy. Both series are plotted densely enough that rereads reveal structure invisible on first pass. The Licanius Trilogy is complete; the Hierarchy Series currently has two of four planned books.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate',
  groups: [
    {
      label: 'The Licanius Trilogy',
      sublabel: 'complete - read all three consecutively',
      note: 'Three books, complete. The causal structure runs across all three: the first book can only be fully understood after the third.',
      noteType: 'required',
      books: [
        {
          title: 'The Shadow of What Was Lost',
          slug: 'the-shadow-of-what-was-lost',
          status: 'mandatory',
          note: "Three students at a school for the Gifted find themselves at the centre of events far larger than the school suggests. The WoT influence is present: chosen one, ancient evil, prophecy, ensemble of young protagonists. But the book is tighter and less prone to padding than Jordan's opening. Early pacing is deliberate; the plot architecture becomes clear by the midpoint.",
          page_count: 654,
          publication_year: 2014,
        },
        {
          title: 'An Echo of Things to Come',
          slug: 'an-echo-of-things-to-come',
          status: 'mandatory',
          note: 'The scope widens dramatically. The Boundary and what it contains begin to emerge. The plotting becomes more complex and the stakes escalate. The strongest book in the trilogy: the middle volume that delivers rather than delays.',
          page_count: 752,
          publication_year: 2017,
        },
        {
          title: 'The Light of All That Falls',
          slug: 'the-light-of-all-that-falls',
          status: 'mandatory',
          note: 'The conclusion. The causal loops close. Events from book one that read as background detail are revealed as consequences of choices made here. Do not read reviews before finishing: the ending is one of the more discussed trilogy conclusions in recent epic fantasy and spoilers are widespread.',
          page_count: 864,
          publication_year: 2019,
        },
      ],
    },
    {
      label: 'The Hierarchy Series',
      sublabel: 'ongoing - no connection to the Licanius Trilogy',
      note: 'A planned quartet; The Justice of One (book 3) is drafted and anticipated for 2027. Book four has no title or date.',
      noteType: 'required',
      books: [
        {
          title: 'The Will of the Many',
          slug: 'the-will-of-the-many',
          status: 'mandatory',
          note: "Vis enters the Hierarchy's most prestigious academy with a falsified identity, competing in a brutal ranking system while investigating what the empire is actually doing with the power it accumulates. Fast, mystery-forward, with a hard magic system whose political implications are present from the first chapter.",
          page_count: 720,
          publication_year: 2023,
        },
        {
          title: 'The Strength of the Few',
          slug: 'the-strength-of-the-few',
          status: 'mandatory',
          note: "The conspiracy around the Hierarchy's true nature deepens. The scope widens beyond the academy. Vis's past and the history he has been hiding become central. Read directly after The Will of the Many.",
          page_count: 736,
          publication_year: 2025,
        },
        {
          title: 'The Justice of One',
          slug: null,
          status: 'upcoming',
          note: 'First draft completed at ~225,000 words. Anticipated 2027.',
          page_count: null,
          publication_year: 2027,
        },
        {
          title: 'The Hierarchy Book 4',
          slug: null,
          status: 'upcoming',
          note: 'Title and publication date not yet announced.',
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  orderNote:
    'Read either series first. The two share an author and nothing else. For the Licanius Trilogy: publication order, start with The Shadow of What Was Lost. For the Hierarchy Series: publication order, start with The Will of the Many.',
  cardsPosition: 'above',
  cards: [
    {
      title: '📖 Which Series First?',
      body: "Start with The Will of the Many if you want dark academia, a Roman-flavoured world, a single close POV, and a mystery-forward plot with a propulsive pace. It is the more accessible entry and has broader current readership. Start with The Shadow of What Was Lost if you want traditional epic fantasy with ensemble POVs, a complete trilogy you can read straight through, and a time-mechanics plot that demands patience. Licanius demands more upfront investment; the ending reveals why every element of book one was placed where it was.",
      color: 'blue',
    },
    {
      title: '⏳ The Time Mechanic',
      body: "The Licanius Trilogy's hook is not magic and prophecy. Actions in the present create consequences that already happened in the past. The causal loops are tight and intentional: events that read as worldbuilding detail in book one are revealed to be the results of choices the characters haven't made yet. The plotting is among the most structurally complex in recent epic fantasy. Rereading book one after finishing the trilogy is a genuinely different experience.",
      color: 'purple',
    },
    {
      title: '🏛️ The Will System',
      body: "The Hierarchy's magic is explicitly metaphorical: energy flows from the many to the few, from low-ranked citizens to high-ranked ones. The more people below you, the more power you can access. The empire runs on the literal energy of its subjects. The magic functions as both a hard system with clear rules and a political argument about how power structures sustain themselves. Both aspects are present from the first chapter of The Will of the Many.",
      color: 'amber',
    },
    {
      title: '📚 The WoT Comparison',
      body: "The Licanius Trilogy draws directly from Wheel of Time: chosen one, ancient evil, prophecy, an ensemble of young protagonists discovering their abilities. The influence is real and Islington doesn't hide it. What the comparison misses: the trilogy runs roughly 2,500 pages versus WoT's 11,000, there is no filler, and each book is darker and more complex than the last. The Licanius Trilogy is the tightest WoT-adjacent series in recent fantasy.",
      color: 'green',
    },
    {
      title: '🔗 No Connection Between Series',
      body: 'The Licanius Trilogy and the Hierarchy Series share nothing. Different worlds, different magic systems with no overlapping logic, different characters, different history. A reader who has finished one has no advantage starting the other. Many readers encountered The Will of the Many first and discovered the Licanius Trilogy afterwards; others go the other direction.',
      color: 'zinc',
    },
    {
      title: '📅 Series Status',
      body: 'The Licanius Trilogy is complete: all three books are published and the story is fully resolved. The Hierarchy Series is a planned quartet: The Will of the Many (2023) and The Strength of the Few (2025) are out; The Justice of One (book 3) has a completed first draft and is anticipated for 2027; book four has no title or date. Starting the Hierarchy Series now means waiting for at least two more books.',
      color: 'red',
    },
  ],
  characters: [
    {
      name: 'Davian',
      role: 'Student at the Gifted school; POV protagonist of the opening',
      color: 'blue',
      why_they_work:
        "The closest thing to a chosen one in the trilogy, but the chosen-one setup is deployed to mislead. Readers who spend book one tracking Davian as the primary protagonist will find the second book reorienting what they thought they understood. His power limitation (using his ability costs him his memories of using it) makes the magic system genuinely consequential rather than an escalating advantage.",
    },
    {
      name: "Caeden / Tal'kamar",
      role: "Amnesiac prisoner; the trilogy's central structural mystery",
      color: 'purple',
      why_they_work:
        "The character who makes the time-mechanics land at the reader experience level. He doesn't know who he is; neither does the reader. Every scene he appears in reads completely differently on a reread after book three. Without a character whose identity is itself the mystery, the causal-loop structure would be an intellectual puzzle rather than an emotional one.",
    },
    {
      name: 'Asha (Ashalia)',
      role: "POV protagonist; Shadow in Andarra's political structure",
      color: 'amber',
      why_they_work:
        "The POV that tracks the political machinery of Andarra rather than the field-action storylines. She becomes the reader's main access point for what the Augurs actually were and what the Boundary actually contains: the backstory the trilogy withholds until book three. Her arc is the slowest to start and the most important to understand by the end.",
    },
    {
      name: 'Vis (Vis Telimus)',
      role: 'Protagonist and first-person narrator of The Hierarchy Series',
      color: 'green',
      why_they_work:
        "An orphan with a hidden identity embedded in the Hierarchy's elite academy. The first-person narration is tighter than Islington's Licanius POVs: Vis knows more than he tells the people around him, and tracking the gap between what he says to them and what he tells the reader is one of the series' core structural pleasures.",
    },
  ],
  sections: [
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        'For the Licanius Trilogy: read all three consecutively. The plot density is against stopping; each book ends mid-arc.',
        'Avoid reviews of The Light of All That Falls before finishing: the ending is widely discussed and spoilers are easy to encounter.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The Licanius Trilogy escalates in darkness: level 3 through books 1–2, rising to level 4 by book 3. Violence is present throughout; the thematic territory grows heavier.',
        'The Hierarchy Series operates at level 3–4. The academy setting involves lethal competition and the political violence of the empire becomes more explicit in book 2.',
        'No explicit content across either series. Romance is present in both but is not the emotional engine of either story.',
        'Both series require close attention: dense plotting, multiple POVs, and magic systems with specific rules that matter to the plot.',
        'The Hierarchy Series is mid-run with no end date announced. Starting now means waiting for at least two more books.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "The Shadow of What Was Lost was self-published in Australia in 2014 before Orbit acquired it for global distribution. The transition from self-published debut to major-publisher fantasy trilogy within the same series is unusual and the book's quality drove it rather than marketing.",
        'The Licanius Trilogy (2014–2019) is the most frequently cited example when readers argue that tight, structurally complex epic fantasy can match WoT and Malazan in ambition without the decade-plus commitment. Five years, three books, complete ending.',
        "The Will of the Many (2023) performed significantly above expectations on release and introduced Islington's work to a readership that hadn't followed the Licanius Trilogy. The Hierarchy Series has sustained that readership through book 2.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Licanius Trilogy - books 1–2',
      level: 3,
      desc: 'Violence present, increasingly dark thematic territory, political complexity. No explicit content.',
    },
    {
      label: 'The Light of All That Falls',
      level: 4,
      desc: 'The darkest entry: highest stakes and most severe consequences across the trilogy.',
    },
    {
      label: 'The Hierarchy Series',
      level: 3,
      desc: 'Lethal academy competition, political violence, conspiracy. Escalates in book 2.',
    },
  ],
  booksLikeSlug: 'the-will-of-the-many',
  metaDescription:
    'James Islington reading order: the complete Licanius Trilogy and the ongoing Hierarchy Series - two separate worlds with clear entry point guidance for both.',
  shortName: 'James Islington',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished a series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['wheel-of-time', 'stormlight', 'mistborn', 'kingkiller', 'first-law', 'malazan'],
};
