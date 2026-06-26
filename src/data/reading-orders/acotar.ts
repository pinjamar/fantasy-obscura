import type { ReadingOrderEntry } from '../reading-orders';

export const acotar: ReadingOrderEntry = {
  slug: 'acotar',
  name: 'A Court of Thorns and Roses',
  author: 'Sarah J. Maas',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - Books 6 & 7 due late 2026 and early 2027',
  description:
    "ACOTAR begins as a dark fairy tale retelling and becomes a full-scale epic fantasy by the second book. Feyre is a mortal hunter dragged into Prythian, a fae world divided into seven courts with centuries of deadly politics and buried history. The romance is not decorative. It drives the plot at every stage. A Court of Mist and Fury is when the series becomes what it actually wants to be: a wider world, a different love interest, a tone shift that catches first-time readers completely off guard. The five published books require reading in order. Two more are coming in late 2026 and early 2027.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness - emotional and political, not grimdark',
  groups: [
    {
      label: 'A Court of Thorns and Roses',
      sublabel: 'read in order',
      noteType: 'required',
      note: 'All five books in order. ACFAS is a short bridge novella (~260 pages); read it before A Court of Silver Flames.',
      books: [
        {
          title: 'A Court of Thorns and Roses',
          slug: 'a-court-of-thorns-and-roses',
          status: 'mandatory',
          note: 'Start here. Feyre is taken into Prythian. Dark fairy tale setup with slow-burn romance. Lighter heat than everything that follows.',
          page_count: 419,
          publication_year: 2015,
        },
        {
          title: 'A Court of Mist and Fury',
          slug: 'a-court-of-mist-and-fury',
          status: 'mandatory',
          note: 'The best book in the series. The world triples in scope, the love interest changes, and the tone shifts entirely from book 1.',
          page_count: 640,
          publication_year: 2016,
        },
        {
          title: 'A Court of Wings and Ruin',
          slug: 'a-court-of-wings-and-ruin',
          status: 'mandatory',
          note: 'War arrives. Concludes the main trilogy. The highest stakes and the widest cast.',
          page_count: 720,
          publication_year: 2017,
        },
        {
          title: 'A Court of Frost and Starlight',
          slug: 'a-court-of-frost-and-starlight',
          status: 'supplementary',
          note: 'Short bridge novella. Aftermath of the war; sets up ACSF. Read before ACSF, skip if you only want the main plot.',
          page_count: 262,
          publication_year: 2018,
        },
        {
          title: 'A Court of Silver Flames',
          slug: 'a-court-of-silver-flames',
          status: 'mandatory',
          note: "Nesta and Cassian's book. A harder, more internal read than the trilogy, and the best enemies-to-lovers dynamic in the series.",
          page_count: 768,
          publication_year: 2021,
        },
        {
          title: 'Untitled (Book 6)',
          slug: null,
          status: 'upcoming',
          note: 'Due October 27, 2026. Title not yet announced.',
          publication_year: 2026,
        },
        {
          title: 'Untitled (Book 7)',
          slug: null,
          status: 'upcoming',
          note: 'Due January 12, 2027. Title not yet announced.',
          publication_year: 2027,
        },
      ],
    },
  ],
  orderNote:
    "Read the main trilogy in order: ACOTAR then ACMAF then ACWAR. A Court of Frost and Starlight is a short bridge novella (~260 pages): read it between ACWAR and ACSF. All five books follow publication order. ACSF focuses on Nesta and Cassian, not Feyre; it reads as a companion novel rather than a direct sequel, but the trilogy sets it up.",
  cardsPosition: 'above',
  cards: [
    {
      title: '⏩ Book 1 Is the Tutorial Level',
      body: "ACOTAR is the weakest book in the series. Feyre is passive in ways that will frustrate some readers, the stakes are smaller, and the pace is slow. It's still worth reading because ACMAF needs it as setup. Push through to book 2. The series becomes something different there.",
      color: 'blue',
    },
    {
      title: '📚 The YA-to-Adult Shift',
      body: "Book 1 reads like YA: a young heroine, an enchanted curse, a fairy tale setup. Book 2 goes fully adult. Explicit content, trauma processing, brutal political intrigue, morally complicated choices. The shift is deliberate. Go in knowing it's coming.",
      color: 'amber',
    },
    {
      title: '🖤 Rhysand',
      body: "Rhysand appears in book 1 as a threatening, morally ambiguous figure the reader is supposed to distrust. The reversal across book 2 is the reason most people finish the series. Do not skip book 1 or you will not understand why book 2 works the way it does.",
      color: 'purple',
    },
    {
      title: '🔥 Heat Level',
      body: "ACOTAR has romantic tension but no explicit content. From ACMAF onward the heat is explicit and stays explicit. The main series beyond book 1 does not dial back. This is adult romantasy, not YA with romance.",
      color: 'red',
    },
    {
      title: '🌙 The Seven Courts',
      body: "Prythian is divided into seven courts: Spring, Summer, Autumn, Winter, Dawn, Day, Night, each ruled by a High Lord with their own power and political agenda. The court rivalries become the engine of books 2 and 3. The Night Court's inner circle becomes the heart of the series. Track who controls what in book 1.",
      color: 'green',
    },
    {
      title: '📅 Two More Books Coming',
      body: "Book 6 is due October 27, 2026 and book 7 lands January 12, 2027. Titles not yet announced. The last published book (ACSF) came out in 2021, so the wait for the continuation is already five years. Both new books drop close together.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Feyre Archeron',
      role: 'Protagonist (books 1-3)',
      faction: 'Night Court',
      color: 'blue',
      why_they_work:
        "Passive in book 1 in a way that frustrates a significant number of first-time readers. The passivity is setup: the arc is about her gaining power and perspective, not starting with either. Book 1 reads very differently once you know where she ends up.",
    },
    {
      name: 'Rhysand',
      role: 'High Lord of the Night Court',
      faction: 'Night Court',
      color: 'purple',
      why_they_work:
        "The reversal between his book 1 and book 2 presentation is the sharpest structural move in the series. It works not because he was secretly harmless, but because book 2 shows what his book 1 choices looked like from his side of them.",
    },
    {
      name: 'Tamlin',
      role: 'High Lord of the Spring Court',
      faction: 'Spring Court',
      color: 'green',
      why_they_work:
        "Written to seem ideal in book 1 and to fail systematically across books 2 and 3. He's the textbook bait-and-switch love interest, and whether that critique reads as earned or feels like a betrayal of the first book is the sharpest dividing line in ACOTAR fandom.",
    },
    {
      name: 'Nesta Archeron',
      role: "Feyre's older sister, protagonist of ACSF",
      faction: 'Night Court',
      color: 'red',
      why_they_work:
        "Cold and resentful through the first three books in ways that read as flaws. ACSF reframes all of it as the point. Readers who found her difficult in the trilogy are often the ones who like ACSF most.",
    },
    {
      name: 'Cassian',
      role: 'Illyrian general, love interest in ACSF',
      faction: 'Night Court',
      color: 'amber',
      why_they_work:
        "Comic relief and Rhysand's lieutenant through the main trilogy. His refusal to leave Nesta alone in ACSF is the dynamic the book is built around. The book frames it as devotion. Whether that lands depends entirely on whether his persistence reads as care or as refusal to hear no.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Romance drives character decisions and major plot turns throughout. The romantic arcs are the plot, not a subplot.',
        'Explicit content begins with A Court of Mist and Fury (book 2). ACOTAR is significantly milder; the heat increases sharply from book 1 to book 2.',
        'Darkness is emotional rather than grimdark: captivity, trauma, war, political intrigue. No graphic violence or gore.',
        'The series is not the right fit if explicit romance-centred plots are not what you want from fantasy.',
      ],
    },
    {
      heading: 'What to expect from each book',
      type: 'bullets',
      bullets: [
        'ACOTAR: Beauty and the Beast retelling. Establishes the world and the curse. Heat is significantly lower than everything that follows.',
        'ACMAF: The best book in the series. New court, new characters, new love interest. The world triples in scope.',
        'ACWAR: Full war arc. Wraps all main threads. More political than the previous two.',
        'ACFAS: Short recovery novella (~260 pages). Aftermath of the war. Skip if you only want the main plot.',
        "ACSF: Nesta's book. A harder and more internal read than the trilogy. Read the full trilogy before starting it.",
      ],
    },
    {
      heading: 'Spoiler-free notes',
      type: 'bullets',
      bullets: [
        'ACMAF is where the series fully becomes itself. The tone, setting, and central characters shift significantly from book 1.',
        'The fae world has internal politics that reward paying attention. Courts, powers, and allegiances matter more in books 2 and 3.',
        'ACSF is not a direct sequel to the trilogy. It focuses on Nesta and Cassian and is written in a different emotional register from the first three books.',
      ],
    },
  ],
  darkness: [
    {
      label: 'ACOTAR',
      level: 3,
      desc: 'Captivity, monster threats, sacrifice. Dark fairy tale register.',
    },
    {
      label: 'ACMAF',
      level: 4,
      desc: 'Trauma processing, war build-up, political intrigue. The darkest in tone.',
    },
    { label: 'ACWAR', level: 3, desc: 'Full war, significant losses, political convergence.' },
    {
      label: 'ACFAS',
      level: 2,
      desc: 'Recovery and aftermath. The lightest entry in the series.',
    },
    {
      label: 'ACSF',
      level: 3,
      desc: "Nesta's self-destruction arc. More internal and more explicit than the trilogy.",
    },
  ],
  metaDescription:
    "ACOTAR reading order: all 7 books in order, what's mandatory, where explicit content begins, and release dates for books 6 (Oct 2026) & 7 (Jan 2027).",
  lastUpdated: '2026-06-26',
  finishedLabel: 'Finished the series?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  booksLikeSlug: 'acotar',
  related: [
    'throne-of-glass',
    'empyrean',
    'blood-and-ash',
    'grishaverse',
    'kate-daniels',
    'sarah-j-maas',
  ],
};
