import type { ReadingOrderEntry } from '../reading-orders';

export const caraval: ReadingOrderEntry = {
  slug: 'caraval',
  name: 'Caraval',
  author: 'Stephanie Garber',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing - Caraval trilogy complete; The Mirror of Infinite Endings due Sep 2026',
  description:
    "Stephanie Garber's Caraval world spans two connected trilogies set in the same universe: a world of immortal beings called Fates who make dangerous binding deals, and a legendary traveling show called Caraval where illusion and reality are indistinguishable. The original Caraval Trilogy follows sisters Scarlett and Tella as they enter the game, which promises a wish to its winner and punishes everyone who plays carelessly. The second trilogy (Once Upon a Broken Heart) follows new protagonist Evangeline Fox and centers on Jacks, the Prince of Hearts: a Fate introduced in the first series whose nature and curse become the subject of the second. The tone is atmospheric, fairy-tale gothic, and built around bargains with real consequences. Both trilogies are complete, with a fourth Once Upon a Broken Heart book due September 2026.",
  darknessDisplay:
    '🕯️🕯️🕯️ Moderate - Fate bargains with real costs, some deaths, dark romantic tension',
  orderNote:
    'Read the Caraval Trilogy first (Caraval, Legendary, Finale), then Once Upon a Broken Heart. The second series is set in the same world and references events from the first. Jacks appears in Finale; his role in the second series is more legible once the reader already knows what he is. Within each trilogy, reading order is strict. The Mirror of Infinite Endings (a fourth OUABH book) is due September 22, 2026.',
  booksLikeSlug: 'caraval',
  cardsPosition: 'above',
  cards: [
    {
      title: '🎪 The Game',
      body: "Caraval is a traveling performance where one player wins a wish, but players cannot tell what is scripted and what is genuinely dangerous. The prizes are real, the traps are real, and the game has a way of making sure players pay something for participating. Garber expands what Caraval actually is across all three books: the first establishes the rules and the second and third break them.",
      color: 'red',
    },
    {
      title: '💛 The Sisters',
      body: "The first trilogy is ultimately about the bond between Scarlett and Tella. Scarlett narrates book one, Tella book two, and both share the finale. Their sisterhood is what most of the plot is organized around preserving or threatening. The romance is real in both books but secondary to the question of what each sister will sacrifice for the other.",
      color: 'green',
    },
    {
      title: '🖤 The Fates',
      body: "The Fates are immortal supernatural beings, each with their own powers and rules. A deal with one will be honored exactly as stated, which is not the same as going as intended. They are background mythology in the Caraval Trilogy, explained gradually, and move to the foreground in the second series. Reading the first trilogy first means the Fates arrive in the second series with accumulated context rather than as an infodump.",
      color: 'purple',
    },
    {
      title: '🃏 Jacks, the Prince of Hearts',
      body: "Jacks is a Fate who cannot touch anyone without making them fall in love with him, except for his one true love, who dies every time they meet. His dynamic with Evangeline Fox in the second series is built on mistrust, mutual need, and a curse that makes genuine closeness impossible. He is introduced in Finale; what he is in that book is not what he becomes across the OUABH trilogy.",
      color: 'amber',
    },
    {
      title: '✨ The Atmosphere',
      body: "Garber's prose is lush and sensory: candlelight, spun-sugar colors, velvet shadows. The magic operates on fairy-tale logic rather than defined rules. The Fates have personalities and constraints, not a system. The atmosphere is the point. This is not a series built around plot mechanics or consistent world-building rules; it is built around mood, mystery, and the sustained feeling that nothing can be trusted.",
      color: 'blue',
    },
    {
      title: '📖 Spectacular',
      body: "A bonus companion story published in 2024. Not part of either trilogy's main plot. Best read after Finale at minimum, after A Curse for True Love for the full context. If both trilogies are done and The Mirror of Infinite Endings (September 2026) is still months away, this is the natural next read.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Caraval Trilogy',
      sublabel: '3 books, complete',
      noteType: 'required',
      note: 'A high-stakes magical game where illusion and reality are indistinguishable, told through the eyes of two sisters trying to survive it. The Caraval performance travels the world but accepting an invitation costs something. Darkness escalates across all three books; the finale resolves every thread. Read in order.',
      books: [
        {
          title: 'Caraval',
          slug: 'caraval',
          status: 'mandatory',
          note: 'Scarlett Dragna has dreamed of attending Caraval her whole life. It is a legendary travelling performance where one player wins a wish. When an invitation finally arrives, she and her sister Tella are drawn into a game where nothing can be trusted, including the people helping her. The central mystery is Legend himself: the master of Caraval, whose identity and motives are entirely opaque.',
          page_count: 407,
          publication_year: 2017,
        },
        {
          title: 'Legendary',
          slug: 'legendary',
          status: 'mandatory',
          note: "Told from Tella's perspective, a deliberate tonal shift from book one. Tella entered Caraval for a specific reason of her own: she is searching for their mother, Paloma, who is bound to the game's master. Her secrets reframe events from the first book. The Fates mythology is introduced in earnest here and the scope of what Caraval actually is begins to widen.",
          page_count: 451,
          publication_year: 2018,
        },
        {
          title: 'Finale',
          slug: 'finale',
          status: 'mandatory',
          note: "The conclusion, following both sisters. The full shape of the Fates and their relationship to Caraval is revealed. Who Legend is, what the game is actually for, what their mother's fate means: the questions built across two books are answered. The sisterhood arc closes. Read this before starting Once Upon a Broken Heart.",
          page_count: 480,
          publication_year: 2019,
        },
        {
          title: 'Spectacular',
          slug: 'spectacular',
          status: 'supplementary',
          note: 'A bonus companion story set in the Caraval world. Supplementary content for readers who want more after completing both trilogies. Not required for either main story.',
          page_count: null,
          publication_year: 2024,
        },
      ],
    },
    {
      label: 'Once Upon a Broken Heart',
      sublabel: 'same world, new protagonist - 3 books complete + 1 upcoming',
      noteType: 'optional',
      note: 'Set in the same world as the Caraval Trilogy but with an entirely new protagonist (Evangeline Fox) and a more romance-forward register. The Fates mythology that was background in the original trilogy moves to the foreground. Jacks is the romantic lead. Events and characters from the Caraval Trilogy are referenced but the new series functions as its own story. Read after the original trilogy.',
      books: [
        {
          title: 'Once Upon a Broken Heart',
          slug: 'once-upon-a-broken-heart',
          status: 'mandatory',
          note: "Evangeline Fox makes a bargain with Jacks (the Prince of Hearts) to stop her true love's wedding. The cost is three kisses at his direction, given to people she doesn't choose. What follows pulls Evangeline deeper into the world of the Fates than the Caraval Trilogy ever went. The dark carnival atmosphere of the first series gives way to a fairy-tale gothic register.",
          page_count: null,
          publication_year: 2021,
        },
        {
          title: 'The Ballad of Never After',
          slug: 'the-ballad-of-never-after',
          status: 'mandatory',
          note: 'Evangeline is trapped in a cursed world with Jacks and must find a way out. The Fate lore deepens significantly and the slow-burn dynamic between Evangeline and Jacks escalates. The strongest book in the second series.',
          page_count: 469,
          publication_year: 2022,
        },
        {
          title: 'A Curse for True Love',
          slug: 'a-curse-for-true-love',
          status: 'mandatory',
          note: "The conclusion of Evangeline's story. The nature of Jacks's curse and what it means to be his true love is finally resolved. The romantic arc closes and the Fate threads running since Finale are wrapped.",
          page_count: 456,
          publication_year: 2023,
        },
        {
          title: 'The Mirror of Infinite Endings',
          slug: null,
          status: 'upcoming',
          note: 'A fourth book in the Once Upon a Broken Heart series. Due September 22, 2026.',
          page_count: null,
          publication_year: 2026,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Scarlett Dragna',
      role: 'Protagonist, Caraval (book 1)',
      color: 'blue',
      why_they_work:
        "The more cautious sister. Her arc in book 1 is about learning that caution is not the same as safety and that the thing she has been protecting herself from feeling is exactly what the game is designed to strip away. She makes worse decisions as the book goes on. That is the point.",
    },
    {
      name: 'Donatella (Tella) Dragna',
      role: 'Protagonist, Legendary (book 2)',
      color: 'green',
      why_they_work:
        "Her apparent recklessness in book 1 is revealed in book 2 to be a specific plan she has been executing. Her perspective reframes everything Scarlett observed in the first book. The shift between their POVs is the structural hinge of the trilogy.",
    },
    {
      name: 'Jacks (Prince of Hearts)',
      role: 'Fate, romantic lead in Once Upon a Broken Heart',
      color: 'amber',
      why_they_work:
        "Introduced in Finale as a Fate with a specific curse and unclear motives. What he wants from Evangeline, whether he is capable of wanting anything genuinely, and what his curse actually costs him are the questions the second trilogy builds around. He is not the same character in OUABH as he appears to be in the Caraval Trilogy.",
    },
    {
      name: 'Evangeline Fox',
      role: 'Protagonist, Once Upon a Broken Heart trilogy',
      color: 'red',
      why_they_work:
        "Makes a bargain with Jacks to stop a wedding and discovers that bargains with Fates ramify in directions she didn't anticipate. Less knowing than the Dragna sisters. Her naivety is a feature of the second series, not a flaw in the characterisation: the story is about what it costs her.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness is in consequence rather than gore. Characters lose things they cannot get back and the world punishes naivety. Some deaths, morally grey choices throughout, and a sustained atmosphere of not knowing who to trust.',
        'The magic operates on fairy-tale logic. The Fates have rules and personalities rather than a coherent system. The mechanics are deliberately vague.',
        'Romance is present and important in both series, more central in Once Upon a Broken Heart. Slow-burn dark romance with genuine tension. Closed door throughout; no explicit content.',
        'The pacing is atmospheric rather than kinetic. The tension is in what cannot be trusted rather than in action sequences. Plot-driven readers who need forward momentum may find it slow.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Caraval Trilogy',
      level: 3,
      desc: 'Illusion, deals with consequences, some deaths. Emotionally intense but not graphically violent.',
    },
    {
      label: 'Once Upon a Broken Heart',
      level: 3,
      desc: "Fate bargains are darker in implication. Jacks's nature is unsettling but the violence remains restrained.",
    },
  ],
  metaDescription:
    'The complete Caraval reading order: Caraval trilogy and Once Upon a Broken Heart - which to read first and how the two series connect.',
  shortName: 'Caraval',
  lastUpdated: '2026-06-26',
  finishedLabel: 'Finished Caraval?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: [
    'acotar',
    'throne-of-glass',
    'blood-and-ash',
    'empyrean',
    'grishaverse',
    'divergent',
  ],
};
