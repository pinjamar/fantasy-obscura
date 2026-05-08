import type { ReadingOrderEntry } from '../reading-orders';

export const acotar: ReadingOrderEntry = {
  slug: 'acotar',
  name: 'A Court of Thorns and Roses',
  author: 'Sarah J. Maas',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Main Series Complete',
  description:
    "A dark fairy tale retelling that becomes a full epic fantasy by book two. Feyre is pulled into a world of immortal fae, political power and war. All that comes with romance woven through every layer. ACMAF is the breakout book that defines the series. The reading order matters here, simply read by order of publication. Each book builds directly on the last and the world expands a lot between books one and two. If you're new to Sarah J. Maas, this is the series most readers recommend starting with. Small warning, it's extra spicy.",
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
          note: 'War arrives. Closes the main trilogy with a large-scale battle and full cast convergence.',
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
      ],
    },
  ],
  orderNote:
    "Read the trilogy first. The companion books are best read after it. They assume you've finished ACWAR.",
  cards: [
    {
      title: '⚡ Essential (4 books)',
      body: 'ACOTAR → ACMAF → ACWAR → ACSF. The first book is the slowest. ACMAF is where the series truly begins.',
      color: 'blue',
    },
    {
      title: '🔀 Bridge Novella (1 book)',
      body: 'A Court of Frost and Starlight is short (~230 pages) and it covers the aftermath of ACWAR. Read before A Court of Silver Flames.',
      color: 'amber',
    },
  ],
  sections: [
    {
      heading: 'What to expect from each book',
      type: 'bullets',
      bullets: [
        'ACOTAR: Beauty and the Beast retelling. Slower pacing, establishing tone. The romance is understated.',
        'ACMAF: The series expands completely. New court, new POV the world triples in scale. Most consider this the best in the series.',
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
        'The fae world has internal politics that reward paying attention; courts, powers and allegiances matter.',
        'The series has explicit content from ACMAF onward.',
      ],
    },
  ],
  darkness: [
    { label: 'ACOTAR', level: 3, desc: 'Dark fairy tale. Has captivity, monster threats and sacrifice' },
    { label: 'ACMAF', level: 4, desc: 'Trauma, war build-up, political intrigue' },
    { label: 'ACWAR', level: 3, desc: 'Full war, loss, and convergence' },
    { label: 'ACFAS', level: 2, desc: 'Recovery and aftermath, the lightest entry' },
    { label: 'ACSF', level: 3, desc: "Nesta's arc is darker and more intense than the trilogy" },
  ],
  finishedLabel: 'Finished the series?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  booksLikeSlug: 'acotar',
  related: ['throne-of-glass', 'empyrean', 'blood-and-ash', 'grishaverse', 'kate-daniels', 'sarah-j-maas'],
};
