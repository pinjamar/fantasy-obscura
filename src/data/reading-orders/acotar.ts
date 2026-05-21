import type { ReadingOrderEntry } from '../reading-orders';

export const acotar: ReadingOrderEntry = {
  slug: 'acotar',
  name: 'A Court of Thorns and Roses',
  author: 'Sarah J. Maas',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - Books 6 & 7 due 2026-2027',
  description:
    "A dark fairy tale retelling that becomes a full epic fantasy by book two. Feyre is pulled into a world of immortal fae, political power and war. All that comes with romance woven through every layer. ACMAF is the breakout book that defines the series. The reading order matters here, simply read by order of publication. Each book builds directly on the last and the world expands a lot between books one and two. If you're new to Sarah J. Maas, this is the series most readers recommend starting with. Explicit content begins from A Court of Mist and Fury onward. ACOTAR itself is significantly milder.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  groups: [
    {
      label: 'A Court of Thorns and Roses',
      sublabel: 'read in order',
      noteType: 'required',
      note: 'All five books, just read them in order. ACFAS is a short bridge novella (~230 pages); read it before A Court of Silver Flames. ACMAF is frequently cited as one of the best romance-fantasy novels of the decade.',
      books: [
        {
          title: 'A Court of Thorns and Roses',
          slug: 'a-court-of-thorns-and-roses',
          status: 'mandatory',
          note: 'Start here. Feyre is dragged into Prythian. Dark fairy tale retelling with slow-burn romance.',
          page_count: 419,
          publication_year: 2015,
        },
        {
          title: 'A Court of Mist and Fury',
          slug: 'a-court-of-mist-and-fury',
          status: 'mandatory',
          note: 'The best book in the series by consensus. Everything opens up; the world, the stakes, the romance.',
          page_count: 624,
          publication_year: 2016,
        },
        {
          title: 'A Court of Wings and Ruin',
          slug: 'a-court-of-wings-and-ruin',
          status: 'mandatory',
          note: 'War arrives. The trilogy concludes — scope and stakes are at their highest.',
          page_count: 699,
          publication_year: 2017,
        },
        {
          title: 'A Court of Frost and Starlight',
          slug: 'a-court-of-frost-and-starlight',
          status: 'supplementary',
          note: 'Short bridge novella (~230 pages). Aftermath of the war. Sets up the companion novels. Read before ACSF.',
          page_count: 232,
          publication_year: 2018,
        },
        {
          title: 'A Court of Silver Flames',
          slug: 'a-court-of-silver-flames',
          status: 'mandatory',
          note: "Nesta and Cassian's book. Divisive but beloved. Read it as its own thing. It's not a direct sequel to the trilogy.",
          page_count: 757,
          publication_year: 2021,
        },
        {
          title: 'A Court of Thorns and Roses: Book 6',
          slug: 'a-court-of-thorns-and-roses-book-6',
          status: 'upcoming',
          note: 'Upcoming October 27, 2026. Title not yet announced.',
          publication_year: 2026,
        },
        {
          title: 'A Court of Thorns and Roses: Book 7',
          slug: 'a-court-of-thorns-and-roses-book-7',
          status: 'upcoming',
          note: 'Upcoming January 12, 2027. Title not yet announced.',
          publication_year: 2027,
        },
      ],
    },
  ],
  orderNote:
    "Read the main trilogy in order: ACOTAR → ACMAF → ACWAR. A Court of Frost and Starlight is a short bridge novella (~230 pages) - read it before A Court of Silver Flames. All five books follow publication order with no exceptions. ACSF focuses on Nesta and Cassian rather than Feyre and works best if you're invested in the full cast after the trilogy.",
  cardsPosition: 'above',
  cards: [
    {
      title: '⏩ Book 1 Is the Prologue',
      body: 'ACOTAR is the weakest book in the series by consensus - slower pacing, contained stakes, a more passive protagonist. The series\' real identity begins in ACMAF. "Does it get better after book 1?" is one of the most questions about this series. The answer is yes, significantly. Treat book 1 as setup.',
      color: 'blue',
    },
    {
      title: '📚 Not YA',
      body: 'ACOTAR opens like YA - young heroine, fairy tale framing, understated romance. A Court of Mist and Fury is firmly adult; explicit content, trauma, war, moral complexity. The shift is intentional and significant. Readers who go in expecting YA are often caught off guard by book 2. Know before you start.',
      color: 'amber',
    },
    {
      title: '🖤 Rhysand',
      body: "The Night Court's High Lord is the most divisive character in book 1 and the most beloved in book 2. The shift in how he's written (and how Feyre sees him) is the engine of ACMAF. A lot of readers who love this series name him as the reason why.",
      color: 'purple',
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Romance is central to every book, not a subplot. This is romantasy - the romantic arcs drive character decisions and major plot turns.',
        'Explicit content begins with A Court of Mist and Fury (book 2). ACOTAR is significantly milder; the heat level increases sharply from book 1 to book 2.',
        'Darkness is emotional rather than grimdark: captivity, trauma, war, political intrigue. Not graphic violence or gore.',
        'Right for: readers who want epic fantasy with romance at the centre, fae world-building and character-driven arcs.',
        'Not right for: readers who want fantasy without explicit content or find romance-driven plots frustrating.',
      ],
    },
    {
      heading: 'What to expect from each book',
      type: 'bullets',
      bullets: [
        'ACOTAR: Beauty and the Beast retelling. Slower pacing, establishing tone. Lower heat than the rest of the series.',
        'ACMAF: The series expands completely. New court, new characters, the world triples in scale. Most consider this the best in the series.',
        'ACWAR: War arc. Wraps all main threads. More political than the previous two.',
        'ACFAS: Short recovery story. Skip if you only want the main plot. Read if you want emotional closure after ACWAR.',
        "ACSF: Nesta's book. Darker and more intense than the trilogy. Works best if you appreciated her character arc.",
      ],
    },
    {
      heading: 'Spoiler-free notes',
      type: 'bullets',
      bullets: [
        "The first ~100 pages of ACOTAR are the slowest in the series. Don't judge it until you've finished the book.",
        'ACMAF is where most readers fall for the series. Its tone, setting and characters shift significantly.',
        'The fae world has internal politics that reward paying attention and in which courts, powers and allegiances matter.',
      ],
    },
  ],
  darkness: [
    {
      label: 'ACOTAR',
      level: 3,
      desc: 'Dark fairy tale. Has captivity, monster threats and sacrifice',
    },
    {
      label: 'ACMAF',
      level: 4,
      desc: 'Trauma, war build-up, political intrigue',
    },
    { label: 'ACWAR', level: 3, desc: 'Full war, loss, and convergence' },
    {
      label: 'ACFAS',
      level: 2,
      desc: 'Recovery and aftermath, the lightest entry',
    },
    {
      label: 'ACSF',
      level: 3,
      desc: "Nesta's arc is darker and more intense than the trilogy",
    },
  ],
  metaDescription:
    "ACOTAR reading order: all 7 books in order, what's mandatory, where explicit content begins, and release dates for books 6 (Oct 2026) & 7 (Jan 2027).",
  lastUpdated: '2026-05-13',
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
