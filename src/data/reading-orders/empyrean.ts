import type { ReadingOrderEntry } from '../reading-orders';

export const empyrean: ReadingOrderEntry = {
  slug: 'empyrean',
  name: 'The Empyrean',
  author: 'Rebecca Yarros',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '⏳ Ongoing — 3 of 5 books published',
  description:
    "Military fantasy academy meets dragon-rider romance — fast-paced, explicitly romantic, and increasingly dark across its five planned books. Violet Sorrengail enters Basgiath War College as someone who was never supposed to be there. The world is built around dragon bonds, a brutal training system, and a war whose true shape is not what anyone is told. Start with Fourth Wing — no prior reading required. Three of five planned books are published.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark · 🔥🔥🔥🔥 Explicit',
  cardsPosition: 'above',
  groups: [
    {
      label: 'The Empyrean',
      sublabel: 'books 1–3 published · books 4–5 upcoming',
      noteType: 'required',
      books: [
        {
          title: 'Fourth Wing',
          slug: 'fourth-wing',
          status: 'mandatory',
          note: 'Start here. Violet Sorrengail enters Basgiath War College to become a rider. Fast pacing, strong voice, explicit romance begins immediately.',
          page_count: 517,
          publication_year: 2023,
        },
        {
          title: 'Iron Flame',
          slug: 'iron-flame',
          status: 'mandatory',
          note: 'Raises the stakes considerably — the war plot becomes the focus and the world expands. Longer and denser than book 1.',
          page_count: 623,
          publication_year: 2023,
        },
        {
          title: 'Onyx Storm',
          slug: 'onyx-storm',
          status: 'mandatory',
          note: 'The series shifts into full epic fantasy territory. Higher body count, bigger consequences, a lot of threads in motion.',
          page_count: 608,
          publication_year: 2025,
        },
        {
          title: 'Empyrean Book 4',
          slug: null,
          status: 'upcoming',
          note: 'Title not yet announced. No release date confirmed.',
          page_count: null,
          publication_year: null,
        },
        {
          title: 'Empyrean Book 5',
          slug: null,
          status: 'upcoming',
          note: 'The planned series finale. No details announced.',
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  orderNote:
    'All three published books are essential and must be read in order. The series ends on a cliffhanger — you will be waiting for book 4. No companion novels or prequels currently exist.',
  cards: [
    {
      title: '🐉 The Dragon Bond',
      body: "The bond is the series' central mechanic — riders bond with a dragon through a high-stakes encounter that can kill them if rejected. The dragons choose, not the riders. The bond gives enhanced combat abilities and a mental link between rider and dragon. It is also the emotional core of the series.",
      color: 'blue',
    },
    {
      title: '📈 The Escalation',
      body: 'Fourth Wing reads as romantasy — fast, romantic, fun. Iron Flame is heavier and war-focused. Onyx Storm is full epic fantasy with a meaningful body count. The romance stays central throughout, but the ratio shifts considerably across the three books.',
      color: 'green',
    },
    {
      title: '⏳ The Wait',
      body: 'Three books are published; the series is planned for five. Book 3 ends on a significant cliffhanger. No title or release date has been announced for book 4.',
      color: 'amber',
    },
    {
      title: '💕 The Romance',
      body: "Enemies-to-lovers is the engine of book 1. The relationship between Violet and Xaden is the emotional throughline across all three books — it shifts considerably as the war plot takes over. The romance does not fade as the series darkens; it gets more complicated.",
      color: 'red',
    },
    {
      title: '🏫 The Academy',
      body: "Basgiath War College is where riders train — and where a significant percentage of first-years die before graduation. The college structure gives book 1 its shape. By Iron Flame the war front takes over and the academy recedes.",
      color: 'purple',
    },
    {
      title: '🔥 Content Note',
      body: 'Explicit sexual content is present from early in book 1 and continues across all three books. War violence and character death escalate significantly by book 3. This is not a series that softens either element.',
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Start with Fourth Wing — no prior reading required. The series is strictly sequential.',
        'Iron Flame is the most divisive of the three books — more setup than payoff. If you made it to the end, keep going. Onyx Storm rewards the patience.',
        "Violet has a chronic connective tissue condition (EDS-coded). It affects her training and combat throughout all three books and is never resolved — this is deliberate, not an oversight.",
        'The opening chapters throw a lot of lore at you — bonding rules, quadrant structure, magic basics. It settles quickly after the first act.',
      ],
    },
    {
      heading: 'The world',
      type: 'bullets',
      bullets: [
        "Navarre is defended by dragon riders — the kingdom's military elite. The Rider Quadrant trains at Basgiath War College alongside scribes, healers, and infantry.",
        "Violet was assigned to the Scribe Quadrant by her mother (the general of the rider corps) and chose the Rider Quadrant against her wishes. This choice drives book 1.",
        "The war Navarre is fighting is against venin — wielders who drain the land itself of magical power. The true nature of the threat is concealed from the rider corps at the start of the series.",
        "Gryphon fliers: a neighbouring territory fields riders bonded to gryphons rather than dragons. Their role in the conflict becomes significant from book 2 onward.",
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        "Wielding: riders channel an elemental or unique affinity — lightning, fire, wind, and rarer types. The affinity is determined by the dragon bond, not chosen by the rider.",
        "Sigils: runes that riders carve to channel and direct power. Learning sigil-craft is central to first-year training and becomes more important as the series progresses.",
        "The dragon bond is permanent and ends only with death. A rider whose dragon dies is left severely diminished — and vice versa. The strength of the bond determines the rider's power ceiling.",
        "Venin corrupt the source — the magical substrate of the world — by drawing power without a bonded dragon. Their use of magic degrades the land around them and them alongside it.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Explicit sexual content: on-page rather than fade-to-black, begins in book 1, present in all three books.',
        'Named character deaths begin in Iron Flame and accelerate. Onyx Storm has the highest body count — losses include characters with significant page time.',
        "Chronic illness representation: Violet's connective tissue disorder affects every aspect of her combat and training. Depicted without being cured or minimised.",
        'Right for: romantasy readers who want escalating stakes, dragon bonds, and enemies-to-lovers with a real war plot behind it.',
        'Not right for: readers who want romance-free epic fantasy, or who are not comfortable with explicit content.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Fourth Wing',
      level: 3,
      desc: 'Serious — danger and death, but romantic and exciting',
    },
    {
      label: 'Iron Flame',
      level: 4,
      desc: 'Dark — war becomes real, character losses hurt',
    },
    {
      label: 'Onyx Storm',
      level: 4,
      desc: 'Dark — higher stakes, more brutal consequences',
    },
  ],
  metaDescription:
    'The Empyrean reading order: Fourth Wing, Iron Flame, and Onyx Storm in sequence — with context on the dragon bond, the magic system, and what to expect from the series.',
  lastUpdated: '2026-05-13',
  shortName: 'Empyrean',
  finishedLabel: "Finished what's published?",
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  booksLikeSlug: 'fourth-wing',
  related: ['acotar', 'blood-and-ash', 'sarah-j-maas', 'throne-of-glass', 'grishaverse', 'divergent'],
};
