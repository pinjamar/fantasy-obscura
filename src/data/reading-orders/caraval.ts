import type { ReadingOrderEntry } from '../reading-orders';

export const caraval: ReadingOrderEntry = {
  slug: 'caraval',
  name: 'Caraval',
  author: 'Stephanie Garber',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing — Caraval trilogy complete; The Mirror of Infinite Endings due Sep 2026',
  description:
    "Stephanie Garber's two Caraval trilogies are set in the same world — a place where supernatural beings called Fates make binding bargains, where a legendary travelling show called Caraval dissolves the line between performance and reality, and where glamour is always more dangerous than it looks. The Caraval Trilogy follows sisters Scarlett and Tella as they are drawn into Caraval's high-stakes game; the winner gets one wish granted, but no one can tell what is performance and what is real — including who the game's mysterious master, Legend, actually is. Once Upon a Broken Heart follows a new protagonist, Evangeline Fox, in the same world, and centres on Jacks — the Prince of Hearts — a Fate whose role in the first trilogy sets up everything the second series does with him. Read in order: the two trilogies reward each other.",
  darknessDisplay: '🕯️🕯️🕯️ Serious — Fate bargains with real costs, some deaths, dark romantic tension',
  orderNote:
    'Read the Caraval Trilogy first, then Once Upon a Broken Heart. The second series is set in the same world and references events from the original trilogy — it can technically be read independently, but Jacks is introduced in Finale and his role in the second series lands harder if you already know him. Within each trilogy, order is strict. The Mirror of Infinite Endings (book 4 of the OUABH series) is due 22 September 2026.',
  booksLikeSlug: 'caraval',
  cardsPosition: 'above',
  cards: [
    {
      title: '🎪 The Game',
      body: "Caraval is a legendary travelling performance — part show, part competition, entirely dangerous. Players cannot tell what is real and what is illusion; the prizes are genuine, but so are the traps. The mystery of where performance ends and magic begins is the engine of the first book. Garber sustains it across three volumes by continually deepening what the game is actually for — and who built it.",
      color: 'red',
    },
    {
      title: '💛 The Sisters',
      body: "The Caraval Trilogy's emotional core is the relationship between Scarlett and Tella. Each book gives one sister primary focus — Scarlett in book one, Tella in book two, both in the finale — and the bond between them is what the plot is ultimately protecting. Readers who connect with the sisterhood often cite it as what makes the series more than a romance, and what earns the ending.",
      color: 'green',
    },
    {
      title: '🖤 The Fates',
      body: "The world's supernatural hierarchy is the Fates — immortal beings with specific natures and powers, each bound by their own rules. Deals with Fates are always technically kept and always costly. They are background mythology in the Caraval Trilogy and become the central subject of Once Upon a Broken Heart — reading the original trilogy first gives the mythology the right amount of mystery before it is fully exposed.",
      color: 'purple',
    },
    {
      title: '🃏 Jacks, the Prince of Hearts',
      body: "Jacks is a Fate who cannot touch anyone without making them fall in love with him — except for his true love, who dies every time they meet. He is the lead romantic interest of Once Upon a Broken Heart and the reason most readers come to the second series. The slow burn between him and Evangeline Fox is built on genuine mistrust and mutual need — not instalove. He is one of modern romantasy's more discussed love interests for a reason.",
      color: 'amber',
    },
    {
      title: '✨ The Atmosphere',
      body: "Garber writes in a lush, sensory register — the world of Caraval is all candlelight, spun-sugar colours, velvet darkness, and details that feel half-dreamlike. The prose prioritises immersion over hard logic; the magic works on fairy-tale rules rather than constructed systems. Readers who respond to atmosphere-first fantasy find the world intoxicating; readers who want mechanically consistent magic may find it deliberately vague.",
      color: 'blue',
    },
    {
      title: '📖 Spectacular',
      body: "A bonus companion story set in the Caraval world, released in 2024. Not part of either trilogy's main narrative — it is supplementary content for readers who want more of the world after finishing both series. Read after Finale at the earliest; after A Curse for True Love for full context.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Caraval Trilogy',
      sublabel: '3 books, complete',
      noteType: 'required',
      note: 'A high-stakes magical game where illusion and reality are indistinguishable, told through the eyes of two sisters trying to survive it. The Caraval performance travels the world but accepting an invitation costs something — and the game has a way of making sure players pay. Darkness escalates across all three books; the finale resolves every thread. Read in order.',
      books: [
        {
          title: 'Caraval',
          slug: 'caraval',
          status: 'mandatory',
          note: "Scarlett Dragna has dreamed of attending Caraval her whole life — a legendary travelling performance where one player wins a wish. When an invitation finally arrives, she and her sister Tella are drawn into a game where nothing can be trusted, including the people helping her. The central mystery is Legend himself: the master of Caraval, whose identity and motives are entirely opaque. The romance is present but secondary to the puzzle of the game.",
          page_count: 407,
          publication_year: 2017,
        },
        {
          title: 'Legendary',
          slug: 'legendary',
          status: 'mandatory',
          note: "Told from Tella's perspective — a deliberate tonal shift from book one. Tella entered Caraval for a specific reason of her own: she is searching for their mother, Paloma, who is bound to the game's master. Her secrets and motivations reframe events from the first book. The Fates mythology is introduced in earnest here and the scope of what Caraval actually is begins to widen. Scarlett's story continues as a secondary thread.",
          page_count: 451,
          publication_year: 2018,
        },
        {
          title: 'Finale',
          slug: 'finale',
          status: 'mandatory',
          note: "The conclusion, following both sisters. The full shape of the Fates and their relationship to Caraval is revealed. The questions built across two books — who Legend is, what the game is actually for, what their mother's fate means — are answered. The sisterhood arc closes. Read this before starting Once Upon a Broken Heart.",
          page_count: 480,
          publication_year: 2019,
        },
        {
          title: 'Spectacular',
          slug: 'spectacular',
          status: 'supplementary',
          note: 'A bonus companion story set in the Caraval world. Supplementary content for readers who want more after completing both trilogies — not required for either main story.',
          page_count: null,
          publication_year: 2024,
        },
      ],
    },
    {
      label: 'Once Upon a Broken Heart',
      sublabel: 'same world, new protagonist — 3 books complete + 1 upcoming',
      noteType: 'optional',
      note: "Set in the same world as the Caraval Trilogy but with an entirely new protagonist — Evangeline Fox — and a more romance-forward register. The Fates mythology that was background in the original trilogy moves to the foreground. Jacks is the romantic lead. Events and characters from the Caraval Trilogy are referenced but the new series functions as its own story. Read after the original trilogy for maximum effect.",
      books: [
        {
          title: 'Once Upon a Broken Heart',
          slug: 'once-upon-a-broken-heart',
          status: 'mandatory',
          note: "Evangeline Fox makes a bargain with Jacks — the Prince of Hearts — to stop her true love's wedding. The cost is three kisses at his direction, given to people she doesn't choose. What follows pulls Evangeline deeper into the world of the Fates than the Caraval Trilogy ever went. The dark carnival atmosphere of the first series gives way to a fairy-tale gothic register — a different flavour of the same world.",
          page_count: null,
          publication_year: 2021,
        },
        {
          title: 'The Ballad of Never After',
          slug: 'the-ballad-of-never-after',
          status: 'mandatory',
          note: "Evangeline is trapped in a cursed world with Jacks and must find a way out. The Fate lore deepens significantly and the romantic tension between Evangeline and Jacks — built on mistrust and mutual need — escalates. Widely considered the strongest book in the series.",
          page_count: 469,
          publication_year: 2022,
        },
        {
          title: 'A Curse for True Love',
          slug: 'a-curse-for-true-love',
          status: 'mandatory',
          note: "The conclusion of Evangeline's story. The nature of Jacks's curse and what it means to be his true love is finally resolved. Pays off the romantic arc built across two books and closes the Fate threads that have been running since Finale.",
          page_count: 456,
          publication_year: 2023,
        },
        {
          title: 'The Mirror of Infinite Endings',
          slug: 'the-mirror-of-infinite-endings',
          status: 'upcoming',
          note: 'A fourth book in the Once Upon a Broken Heart series. Due 22 September 2026.',
          page_count: null,
          publication_year: 2026,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'Is Caraval right for you?',
      type: 'bullets',
      bullets: [
        'Read it if: you want lush, atmosphere-heavy fantasy where the tension comes from not knowing what is real — Garber builds immersive sensory worlds rather than hard-system magic, and the mood is as important as the plot.',
        'Read it if: you want a strong sisterhood at the centre of a fantasy plot. The Caraval Trilogy is ultimately about Scarlett and Tella; the romance is real but it is not the primary engine.',
        'Read it if: you want complete series with a defined romantic arc. The Caraval Trilogy is fully concluded; Once Upon a Broken Heart has three books published and book 4 due 2026.',
        'It may not be for you if: you want a hard magic system with clear rules. Garber\'s magic is impressionistic — the Fates operate on fairy-tale logic and the mechanics are deliberately vague.',
        'It may not be for you if: you want fast, plot-driven pacing. Both series are immersive and atmospheric rather than kinetic — the tension is in what you cannot trust rather than in action.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: the horror is in consequence rather than gore — characters lose things they cannot get back, and the world punishes naivety. Some deaths, morally grey choices throughout, and a sustained atmosphere of not-quite-knowing who to trust.',
        'Romance: present and important in both series; more central in Once Upon a Broken Heart. Slow-burn dark romance with genuine tension. Closed Door — no explicit scenes.',
        'Explicit content: none.',
        'Right for: readers who liked the atmospheric romantasy of ACOTAR but want a lighter, YA-adjacent register; readers drawn to fairy-tale logic and dark bargains rather than explicit heat.',
        'Not right for: readers who want spicy romance, hard magic systems, or action-forward pacing.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Caraval Trilogy',
      level: 3,
      desc: 'Illusion, deals with consequences, some deaths — emotionally intense but not graphically violent',
    },
    {
      label: 'Once Upon a Broken Heart',
      level: 3,
      desc: 'Fate bargains are darker in implication; Jacks\'s nature is unsettling but the violence remains restrained',
    },
  ],
  metaDescription:
    'The complete Caraval reading order: Caraval trilogy and Once Upon a Broken Heart — which to read first and how the two series connect.',
  shortName: 'Caraval',
  lastUpdated: '2026-05-21',
  finishedLabel: 'Finished Caraval?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: ['acotar', 'throne-of-glass', 'blood-and-ash', 'empyrean', 'grishaverse', 'divergent'],
};
