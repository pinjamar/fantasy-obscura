import type { ReadingOrderEntry } from '../reading-orders';

export const redRising: ReadingOrderEntry = {
  slug: 'red-rising',
  name: 'Red Rising',
  author: 'Pierce Brown',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing — 6 of 7 books published; Red God release date TBD',
  description:
    "Pierce Brown's sci-fi saga set across a solar system rigidly divided by color caste — Golds at the apex, Reds at the bottom, every other color slotted between. Darrow, a Red miner on Mars who believes his labor is terraforming the planet for humanity's future, discovers the lie at the heart of the Society and infiltrates Gold society to bring it down. The original trilogy is one of the most propulsive revolution narratives in modern science fiction — self-contained, with a full and satisfying ending. The sequel series expands the cast, the scope, and the darkness considerably. Brown was 26 when Red Rising was published and has been building the solar system ever since.",
  darknessDisplay: '🕯️🕯️🕯️ Dark — escalating across the series; Dark Age reaches grimdark levels',
  warning:
    'Red God (book 7) has no confirmed release date as of 2026. The sequel series is ongoing and unfinished — be aware before starting Iron Gold that you may wait years for the conclusion.',
  orderNote:
    'Start with Red Rising and read the original trilogy straight through. The trilogy (books 1–3) is self-contained — Morning Star delivers a complete ending, and many readers stop there and are satisfied. The sequel series (Iron Gold onward) is darker, broader in scope, and shifts to multiple POVs. It rewards readers who want more but is not required.',
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Pierce Brown',
      body: "Brown was 26 when Red Rising was published in 2014 after being rejected by dozens of publishers. He grew up in a small California town and has cited Ender's Game, Homer, and Shakespeare as primary influences. The series was optioned for film almost immediately. He has said the sequel series was always planned — the original trilogy was conceived as the first act of a larger story.",
      color: 'blue',
    },
    {
      title: '🔴 The Color Caste',
      body: "Society is divided into a rigid color hierarchy with Golds ruling at the top and Reds laboring at the bottom. Each color has a designated role: Obsidians are warriors, Silvers are financiers, Coppers are administrators, and so on. Golds take names from Roman mythology — Cassius au Bellona, Mustang, the Sovereign — and their culture is built around gladiatorial combat, legions, and Roman political structures. The aesthetic is Roman Empire in space.",
      color: 'purple',
    },
    {
      title: '📖 The Original Trilogy',
      body: "Red Rising, Golden Son, and Morning Star form a self-contained arc. Darrow's story has a beginning, middle, and full ending by the close of book 3. Many readers stop at Morning Star and consider the series complete — the ending earns that choice. If you read the trilogy and feel satisfied, you do not need to continue. The sequel series is a different, harder experience.",
      color: 'blue',
    },
    {
      title: '🌅 The Sequel Series',
      body: "Iron Gold (book 4) shifts the series significantly. Darrow is no longer the sole POV — Lysander au Lune (a Gold), Lyria (a Red refugee), and Lysander share chapters alongside him. The political complexity increases, the body count rises, and the tone darkens. If you loved the trilogy primarily for Darrow's first-person momentum, the sequel series will feel different. If you loved the world, it expands enormously.",
      color: 'amber',
    },
    {
      title: '💀 Dark Age',
      body: "Dark Age (book 5) is the longest, most brutal, and most divisive book in the series. Multiple major characters are in mortal danger across multiple simultaneous fronts. Brown does not protect anyone. The book runs 800 pages at a relentless pace and ends on one of the most devastating sequences in the series. Many readers consider it the best book; others find it exhausting. Go in prepared.",
      color: 'red',
    },
    {
      title: '🌌 The Solar System',
      body: "The series starts on Mars and doesn't stay there. By the sequel series the action spans Luna, Earth, the asteroid belt, and the outer planets — Jupiter, Saturn, and beyond. Each book expands the map. The scope of the conflict grows from a single mine to a solar-system-wide civil war. Brown's world-building accelerates significantly after book 3.",
      color: 'purple',
    },
  ],
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'books 1–3 — a complete, self-contained story',
      noteType: 'required',
      note: "Darrow's full arc from Red miner to revolutionary leader. Read all three before deciding whether to continue into the sequel series — the trilogy builds to its ending across all three books and Morning Star delivers a full resolution.",
      books: [
        {
          title: 'Red Rising',
          slug: 'red-rising',
          status: 'mandatory',
          note: "Start here. Darrow discovers the lie at the heart of the Society and goes undercover among the Golds at the Institute — a brutal gladiatorial school where students conquer each other's castles. Brown's debut reads like The Hunger Games crossed with Ender's Game, and then becomes something more. The first 20% is setup. Push through.",
          page_count: 439,
          publication_year: 2014,
        },
        {
          title: 'Golden Son',
          slug: 'golden-son',
          status: 'mandatory',
          note: "Darrow moves from the Institute into the political and military machinery of Gold society. The scope expands from a school to a solar system, from survival to revolution. Widely considered the best book in the trilogy — it ends on one of the most discussed cliffhangers in recent sci-fi.",
          page_count: 456,
          publication_year: 2015,
        },
        {
          title: 'Morning Star',
          slug: 'morning-star',
          status: 'mandatory',
          note: "The revolution. Darrow's arc reaches its conclusion across the solar system. Longer and more emotionally demanding than the first two books. The ending is earned. Many readers stop here — if you finish Morning Star and feel complete, that is a valid choice. The sequel series is a different beast.",
          page_count: 672,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Republic Era',
      sublabel: 'books 4–7 — darker, broader, ongoing',
      noteType: 'optional',
      note: "Ten years after the events of Morning Star. Multiple POVs replace Darrow's first-person narration. The political and military complexity escalates sharply, the tone darkens significantly, and Brown is willing to do things to characters he was not willing to do in the trilogy. Continue if you want more of the world — but know what you are entering.",
      books: [
        {
          title: 'Iron Gold',
          slug: 'iron-gold',
          status: 'mandatory',
          note: "The Republic is fragile, Darrow is a liability to the people he helped free, and four new POV characters split the narrative across the solar system. The political complexity here is the highest of any book in the series. A necessary bridge into the sequel era — slower than the trilogy but essential for everything that follows.",
          page_count: 672,
          publication_year: 2018,
        },
        {
          title: 'Dark Age',
          slug: 'dark-age',
          status: 'mandatory',
          note: "The longest and most brutal book in the series. Multiple simultaneous fronts, a relentless pace, and a willingness to destroy anything. Divisive: some readers consider it the series peak; others find the grimness exhausting. Do not start it unless you are committed — it does not let up. The ending will leave a mark.",
          page_count: 800,
          publication_year: 2020,
        },
        {
          title: 'Light Bringer',
          slug: 'light-bringer',
          status: 'mandatory',
          note: "Picks up directly from Dark Age's aftermath. Lysander au Lune's POV becomes central — Brown is now writing a genuine dual-protagonist structure. The scope and scale of the conflict reaches its widest point. A partial recovery from the devastation of book 5 — some hope returns. Sets up the finale.",
          page_count: 682,
          publication_year: 2023,
        },
        {
          title: 'Red God',
          slug: 'red-god',
          status: 'upcoming',
          note: "The final book. No release date confirmed as of 2026. Brown has said it will conclude the series and that he knows how it ends.",
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'Should you continue past Morning Star?',
      type: 'bullets',
      bullets: [
        "Continue into Iron Gold if: you loved the world and the supporting characters as much as Darrow, you want to see the political consequences of the revolution, and you can handle a significantly darker tone with a higher cost to characters you care about.",
        "Stop at Morning Star if: Darrow's first-person voice and momentum were the main draw, you prefer self-contained stories with full resolutions, or you are not willing to wait an unknown number of years for Red God to complete the story.",
        "The sequel series is not a cash-in extension — Brown planned it from the beginning. But it is a genuinely different reading experience. The tonal shift from the trilogy to Iron Gold is real and significant.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is frequent and graphic throughout — gladiatorial combat, war, torture, and large-scale death are structural features of the series. Dark Age escalates to grimdark levels with extended sequences of atrocity.",
        "The original trilogy has minimal romance, handled briefly. The sequel series develops relationships further but remains plot-driven rather than romance-focused.",
        "Explicit content: low. Violence is explicit; sexual content is not.",
        "Reader fit: Red Rising rewards readers who want propulsive plot, underdog narratives, and political complexity in a sci-fi setting. It is not a quiet series. If you bounced off The Hunger Games for being too action-focused, this will not fix that. If you loved it and wanted more political depth and higher stakes, this is the progression.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Original Trilogy (books 1–3)',
      level: 3,
      desc: 'Dark YA-to-adult crossover — gladiatorial violence, death of supporting characters, revolution with real costs; tense but not relentless',
    },
    {
      label: 'Iron Gold & Light Bringer (books 4 & 6)',
      level: 4,
      desc: 'Political brutality, major character deaths, moral complexity without easy resolution; hope exists but is hard-won',
    },
    {
      label: 'Dark Age (book 5)',
      level: 5,
      desc: 'Grimdark — sustained atrocity across multiple fronts, no character is safe, deliberately exhausting; the darkest entry by a significant margin',
    },
  ],
  metaDescription:
    'The complete Red Rising reading order — original trilogy vs sequel series explained, with notes on all 7 Pierce Brown books.',
  shortName: 'Red Rising',
  booksLikeSlug: 'red-rising',
  finishedLabel: 'Finished Red Rising?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['first-law', 'malazan', 'stormlight', 'asoiaf', 'mark-lawrence', 'empyrean'],
  lastUpdated: '2026-05-25',
};
