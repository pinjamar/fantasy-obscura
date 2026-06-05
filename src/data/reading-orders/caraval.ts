import type { ReadingOrderEntry } from '../reading-orders';

export const caraval: ReadingOrderEntry = {
  slug: 'caraval',
  name: 'Caraval',
  author: 'Stephanie Garber',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing — Caraval trilogy complete; The Mirror of Infinite Endings due Sep 2026',
  description:
    "Stephanie Garber's Caraval world is pure seductive chaos. Two connected trilogies set in the same universe where immortal beings called Fates make dangerous binding deals, and a legendary traveling show called Caraval blurs the line between performance and deadly reality. Glamour, magic, and bargains are everywhere, and nothing is ever quite what it seems. The original Caraval Trilogy follows sisters Scarlett and Tella as they get pulled into the high-stakes game. Win, and you get one wish granted. But good luck figuring out what's real and what's just part of the show (including the true identity of the mysterious master, Legend). Then comes the Once Upon a Broken Heart trilogy, which follows new protagonist Evangeline Fox and heavily features Jacks (the Prince of Hearts), a Fate whose actions in the first series set up a ton of what happens in the second. The two trilogies reward each other hard, so read them in order.",
  darknessDisplay:
    '🕯️🕯️🕯️ Moderate — Fate bargains with real costs, some deaths, dark romantic tension',
  orderNote:
    'Read the Caraval Trilogy first, then Once Upon a Broken Heart. The second series is set in the same world and references events from the original trilogy. It can technically be read independently, but Jacks is introduced in Finale and his role in the second series lands harder if you already know him (also, why would you skip the main series?). Within each trilogy, order is strict. The Mirror of Infinite Endings (book 4 of the OUABH series) is due 22 September 2026.',
  booksLikeSlug: 'caraval',
  cardsPosition: 'above',
  cards: [
    {
      title: '🎪 The Game',
      body: "Caraval isn't just a show. It's a full-on dangerous competition wrapped in magic and illusion. Players can't tell what's scripted performance and what'll actually get you killed. The prizes are real, the traps are real, and the mystery of where the game ends and true magic begins drives the whole thing. Garber keeps evolving what the game actually is across the three books, and it gets more interesting the deeper you go.",
      color: 'red',
    },
    {
      title: '💛 The Sisters',
      body: "The real heart of the first trilogy is the bond between Scarlett and Tella. Each book shifts focus. Scarlett gets the spotlight in book one, Tella in book two, and they share the finale. Their sisterhood is protective, messy, and ultimately what a lot of the plot is fighting to preserve. Readers who click with that relationship often say it's what elevates the series beyond just romance and makes the ending feel earned.",
      color: 'green',
    },
    {
      title: '🖤 The Fates',
      body: "In this world, the Fates are immortal supernatural beings, each with their own powers, personalities and strict rules. Make a deal with one and it will be honored… but it'll probably cost you more than you expected. They're mostly background mythology and mystery in the Caraval Trilogy, then become front-and-center in the second series. Reading the first trilogy first gives the Fates the perfect amount of dangerous mystique before everything gets fully unpacked.",
      color: 'purple',
    },
    {
      title: '🃏 Jacks, the Prince of Hearts',
      body: "Jacks is the reason a ton of people dive into the second trilogy. He's a Fate who can't touch anyone without making them fall hopelessly in love with him... Except of course for his one true love, who dies every time they meet. His slow-burn romance with Evangeline Fox is built on mistrust, sharp banter, mutual need and zero instalove nonsense. He's messy, dangerous, and one of the most discussed romantasy love interests for good reason.",
      color: 'amber',
    },
    {
      title: '✨ The Atmosphere',
      body: "Garber's prose is lush, dreamy and sensory as hell. Candlelight, spun-sugar colors, velvet shadows and everything feeling half-fairy-tale, half-fever-dream. The magic runs on fairy-tale logic rather than hard rules, so if you want super consistent magic systems, it might feel vague. But if you love immersive, atmosphere-first fantasy that just feels magical, this world is intoxicating.",
      color: 'blue',
    },
    {
      title: '📖 Spectacular',
      body: "A bonus companion story (released 2024). Not part of either trilogy's main plot, but extra world content for readers who aren't ready to leave the setting. Best read after Finale at the earliest, after A Curse for True Love for the full experience. If you've finished both trilogies and are sitting on the wait for The Mirror of Infinite Endings (September 2026), this is the obvious thing to read in the meantime.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Caraval Trilogy',
      sublabel: '3 books, complete',
      noteType: 'required',
      note: 'A high-stakes magical game where illusion and reality are indistinguishable, told through the eyes of two sisters trying to survive it. The Caraval performance travels the world but accepting an invitation costs something. The game has a way of making sure players pay. Darkness escalates across all three books; the finale resolves every thread. Read in order.',
      books: [
        {
          title: 'Caraval',
          slug: 'caraval',
          status: 'mandatory',
          note: 'Scarlett Dragna has dreamed of attending Caraval her whole life. It is a legendary travelling performance where one player wins a wish. When an invitation finally arrives, she and her sister Tella are drawn into a game where nothing can be trusted, including the people helping her. The central mystery is Legend himself: the master of Caraval, whose identity and motives are entirely opaque. The romance is present but secondary to the puzzle of the game.',
          page_count: 407,
          publication_year: 2017,
        },
        {
          title: 'Legendary',
          slug: 'legendary',
          status: 'mandatory',
          note: "Told from Tella's perspective, that is a deliberate tonal shift from book one. Tella entered Caraval for a specific reason of her own: she is searching for their mother, Paloma, who is bound to the game's master. Her secrets and motivations reframe events from the first book. The Fates mythology is introduced in earnest here and the scope of what Caraval actually is begins to widen. Scarlett's story continues as a secondary thread.",
          page_count: 451,
          publication_year: 2018,
        },
        {
          title: 'Finale',
          slug: 'finale',
          status: 'mandatory',
          note: "The conclusion, following both sisters. The full shape of the Fates and their relationship to Caraval is revealed. Who Legend is, what the game is actually for, what their mother's fate means? The questions built across two books are finally answered. The sisterhood arc closes. Read this before starting Once Upon a Broken Heart.",
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
      sublabel: 'same world, new protagonist - 3 books complete + 1 upcoming',
      noteType: 'optional',
      note: 'Set in the same world as the Caraval Trilogy but with an entirely new protagonist (Evangeline Fox) and a more romance-forward register. The Fates mythology that was background in the original trilogy moves to the foreground. Jacks is the romantic lead. Events and characters from the Caraval Trilogy are referenced but the new series functions as its own story. Read after the original trilogy for maximum effect.',
      books: [
        {
          title: 'Once Upon a Broken Heart',
          slug: 'once-upon-a-broken-heart',
          status: 'mandatory',
          note: "Evangeline Fox makes a bargain with Jacks (the Prince of Hearts) to stop her true love's wedding. The cost is three kisses at his direction, given to people she doesn't choose. What follows pulls Evangeline deeper into the world of the Fates than the Caraval Trilogy ever went. The dark carnival atmosphere of the first series gives way to a fairy-tale gothic register — a different flavour of the same world.",
          page_count: null,
          publication_year: 2021,
        },
        {
          title: 'The Ballad of Never After',
          slug: 'the-ballad-of-never-after',
          status: 'mandatory',
          note: 'Evangeline is trapped in a cursed world with Jacks and must find a way out. The Fate lore deepens significantly and the romantic tension between Evangeline and Jacks (built on mistrust and mutual need) escalates. Widely considered the strongest book in the series.',
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
        'Read it if: you want lush, atmosphere-heavy fantasy where the tension comes from not knowing what is real - Garber builds immersive sensory worlds rather than hard-system magic, and the mood is as important as the plot.',
        'Read it if: you want a strong sisterhood at the centre of a fantasy plot. The Caraval Trilogy is ultimately about Scarlett and Tella; the romance is real but it is not the primary engine.',
        'Read it if: you want complete series with a defined romantic arc. The Caraval Trilogy is fully concluded; Once Upon a Broken Heart has three books published and book 4 due 2026.',
        "It may not be for you if: you want a hard magic system with clear rules. Garber's magic is impressionistic - the Fates operate on fairy-tale logic and the mechanics are deliberately vague.",
        'It may not be for you if: you want fast, plot-driven pacing. Both series are immersive and atmospheric rather than kinetic - the tension is in what you cannot trust rather than in action.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: the horror is in consequence rather than gore — characters lose things they cannot get back, and the world punishes naivety. Some deaths, morally grey choices throughout, and a sustained atmosphere of not-quite-knowing who to trust.',
        'Romance: present and important in both series; more central in Once Upon a Broken Heart. Slow-burn dark romance with genuine tension. Closed Door (no explicit scenes).',
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
      desc: "Fate bargains are darker in implication; Jacks's nature is unsettling but the violence remains restrained",
    },
  ],
  metaDescription:
    'The complete Caraval reading order: Caraval trilogy and Once Upon a Broken Heart — which to read first and how the two series connect.',
  shortName: 'Caraval',
  lastUpdated: '2026-05-29',
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
