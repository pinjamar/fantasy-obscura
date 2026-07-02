import type { ReadingOrderEntry } from '../reading-orders';

export const redRising: ReadingOrderEntry = {
  slug: 'red-rising',
  name: 'Red Rising',
  author: 'Pierce Brown',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - 6 of 7 books published; Red God release date TBD',
  description:
    "Pierce Brown's sci-fi saga set across a solar system rigidly divided by color caste (Golds at the apex, Reds at the bottom, every other color slotted between). Darrow, a Red miner on Mars who believes his labor is terraforming the planet for humanity's future, discovers the lie at the heart of the Society and infiltrates Gold society to bring it down. The original trilogy is a self-contained revolution narrative with a complete ending. The sequel series expands the cast, the scope, and the darkness considerably. Brown was 26 when Red Rising was published and has been building the solar system ever since.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - original trilogy is level 3; Iron Gold and Light Bringer level 4; Dark Age (book 5) level 5',
  warning:
    'Red God (book 7) has no confirmed release date as of 2026. The sequel series is ongoing and unfinished; be aware before starting Iron Gold that you may wait years for the conclusion.',
  orderNote:
    'Start with Red Rising and read the original trilogy straight through. The trilogy (books 1-3) is self-contained: Morning Star delivers a complete ending, and many readers stop there and are satisfied. The sequel series (Iron Gold onward) is darker, broader in scope, and shifts to multiple POVs. Not required, but there is more here for readers who want it.',
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Pierce Brown',
      body: "Brown was 26 when Red Rising was published in 2014 after being rejected by dozens of publishers. He grew up in a small California town and has cited Ender's Game, Homer, and Shakespeare as primary influences. The series was optioned for film almost immediately. He has said the sequel series was always planned: the original trilogy was conceived as the first act of a larger story.",
      color: 'blue',
    },
    {
      title: '🔴 The Color Caste',
      body: "Society is divided into a rigid color hierarchy with Golds ruling at the top and Reds laboring at the bottom. Each color has a designated role: Obsidians are warriors, Silvers are financiers, Coppers are administrators, and so on. Golds take names from Roman mythology (Cassius au Bellona, Mustang, the Sovereign) and their culture is built around gladiatorial combat, legions, and Roman political structures. The aesthetic is Roman Empire in space.",
      color: 'purple',
    },
    {
      title: '📖 The Original Trilogy',
      body: "Red Rising, Golden Son, and Morning Star form a self-contained arc. Darrow's story has a beginning, middle, and complete ending by the close of book 3. The trilogy was designed this way from the start: Brown planned it as the first act of a larger story, which means Morning Star's ending is structurally complete rather than a pause. The sequel series is a different, harder experience.",
      color: 'blue',
    },
    {
      title: '🌅 The Sequel Series',
      body: "Iron Gold (book 4) shifts the series significantly. Darrow is no longer the sole POV; Lysander au Lune (a Gold), Lyria (a Red refugee), and Ephraim ti Horn (a former Howler) share chapters alongside him. The political complexity increases, the body count rises, and the tone darkens considerably. The world expands into new corners and new conflicts. The sequel series is a different, harder reading experience than the trilogy.",
      color: 'amber',
    },
    {
      title: '💀 Dark Age',
      body: "Dark Age (book 5) is the longest, most brutal, and most divisive book in the series. Multiple major characters are in mortal danger across multiple simultaneous fronts. Brown does not protect anyone. The book runs 800 pages at a relentless pace and ends on the most devastating sequence in the saga. The grimness is deliberate and sustained. Go in prepared.",
      color: 'red',
    },
    {
      title: '🌌 The Solar System',
      body: "The series starts on Mars and doesn't stay there. By the sequel series the action spans Luna, Earth, the asteroid belt, and the outer planets (Jupiter, Saturn, and beyond). Each book expands the map. The scope of the conflict grows from a single mine to a solar-system-wide civil war. Brown's world-building accelerates significantly after book 3.",
      color: 'purple',
    },
  ],
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'books 1-3 - a complete, self-contained story',
      noteType: 'required',
      note: "Darrow's full arc from Red miner to revolutionary leader. Read all three before deciding whether to continue into the sequel series: the trilogy builds to its ending across all three books and Morning Star delivers a full resolution.",
      books: [
        {
          title: 'Red Rising',
          slug: 'red-rising',
          status: 'mandatory',
          note: "Start here. Darrow discovers the lie at the heart of the Society and goes undercover among the Golds at the Institute: a brutal gladiatorial school where students conquer each other's castles. Brown's debut reads like The Hunger Games crossed with Ender's Game, and then becomes something more. The first 20% is setup. Push through.",
          page_count: 439,
          publication_year: 2014,
        },
        {
          title: 'Golden Son',
          slug: 'golden-son',
          status: 'mandatory',
          note: "Darrow moves from the Institute into the political and military machinery of Gold society. The scope expands from a school to a solar system, from survival to revolution. The book ends on a cliffhanger; have Morning Star ready.",
          page_count: 456,
          publication_year: 2015,
        },
        {
          title: 'Morning Star',
          slug: 'morning-star',
          status: 'mandatory',
          note: "The revolution. Darrow's arc reaches its conclusion across the solar system. Longer and more emotionally demanding than the first two books. The ending delivers. Many readers stop here; the sequel series is a different beast.",
          page_count: 672,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Republic Era',
      sublabel: 'books 4-7 - darker, broader, ongoing',
      noteType: 'optional',
      note: "Ten years after the events of Morning Star. Multiple POVs replace Darrow's first-person narration. The political and military complexity escalates sharply, the tone darkens significantly, and Brown is willing to do things to characters he was not willing to do in the trilogy. Brown planned this expansion from the beginning; it is a different, harder reading experience than the first three books.",
      books: [
        {
          title: 'Iron Gold',
          slug: 'iron-gold',
          status: 'mandatory',
          note: "The Republic is fragile, Darrow is a liability to the people he helped free, and four new POV characters split the narrative across the solar system. The political complexity here is the highest of any book in the series. A necessary bridge into the sequel era; slower than the trilogy but essential for everything that follows.",
          page_count: 672,
          publication_year: 2018,
        },
        {
          title: 'Dark Age',
          slug: 'dark-age',
          status: 'mandatory',
          note: "The longest and most brutal book in the series. Multiple simultaneous fronts, a relentless pace, and a willingness to destroy anything. Do not start it unless you are committed; it does not let up. The ending will leave a mark.",
          page_count: 800,
          publication_year: 2020,
        },
        {
          title: 'Light Bringer',
          slug: 'light-bringer',
          status: 'mandatory',
          note: "Picks up directly from Dark Age's aftermath. Lysander au Lune's POV becomes central; Brown is now writing a genuine dual-protagonist structure. The scope and scale of the conflict reaches its widest point. A partial recovery from the devastation of book 5; some hope returns. Sets up the finale.",
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
  characters: [
    {
      name: 'Darrow of Lykos',
      role: 'Red miner turned Gold infiltrator; sole POV protagonist of the original trilogy',
      color: 'red',
      why_they_work:
        "The reader is inside Darrow's first-person narration for all three original trilogy books. The narration is propulsive partly because Darrow is performing Gold so completely that he starts to lose track of what he was performing for; that erosion is the books' central tension, not the battles. The shift away from exclusive Darrow POV in Iron Gold is the main structural change readers either find enriching or disorienting, because so much of the trilogy's momentum is built on that single close perspective.",
    },
    {
      name: 'Sevro au Barca',
      role: "Darrow's closest ally; the Goblin; former Gold academy castoff",
      color: 'amber',
      why_they_work:
        "Sevro presents as nihilistic and feral and the reader takes that at face value for most of the first book. The gap between that surface and his actual motivation (protection of the people he loves, at any cost) creates the strongest secondary-character arc in the series. The moments where the surface cracks are consistently the most effective emotional beats the books produce.",
    },
    {
      name: 'Virginia "Mustang" au Augustus',
      role: "Gold turned revolutionary ally; the series' central political actor in the Republic Era",
      color: 'purple',
      why_they_work:
        "Mustang is the character in the original trilogy who sees through Darrow most clearly and chooses her allegiance anyway. Her arc in the Republic Era carries as much political weight as Darrow's military arc; the split between those two tracks drives the sequel series' central tension. Brown gives her the most consequential decisions in the books; she is frequently right when Darrow is not.",
    },
    {
      name: 'Lysander au Lune',
      role: "Grandson of the Sovereign; Gold antagonist POV of the Republic Era",
      color: 'blue',
      why_they_work:
        "Brown gives the antagonist of the Republic Era a worldview that is internally coherent rather than simply monstrous. Lysander believes in the Gold order with the same clarity that Darrow believes in the Republic. His chapters are the most politically nuanced in the sequel series and make the finale's conflict genuinely ambiguous rather than a straightforward good-versus-evil resolution.",
    },
    {
      name: 'Cassius au Bellona',
      role: "Darrow's rival; Gold swordsman; the series' longest character reversal",
      color: 'green',
      why_they_work:
        "Cassius is introduced as Darrow's chief rival and potential enemy and ends up somewhere neither the reader nor Cassius anticipated. The reversal across the full series works because Brown made him fully realized from the first book: the complexity was present before the arc demanded it. His arc is the clearest example in the series of how the color-caste system produces its own victims among the Golds.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is frequent and graphic throughout: gladiatorial combat, war, torture, and large-scale death are structural features of the series. Dark Age escalates to grimdark levels with extended sequences of atrocity.",
        "The original trilogy has minimal romance, handled briefly. The sequel series develops relationships further but remains plot-driven rather than romance-focused.",
        "Explicit content: low. Violence is explicit; sexual content is not.",
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Red Rising (2014) debuted on the New York Times bestseller list after being rejected by dozens of publishers. Published when Brown was 26, it expanded the sci-fi audience for revolution narratives by using a YA-adjacent structure (underdog infiltrator, gladiatorial academy) as the entry point to a grimdark-adjacent series.",
        "The original trilogy was structured as a complete, resolved story before the sequel series began. Morning Star delivers a full ending to the revolution arc. This is rare in ongoing commercial genre fiction: most ongoing sagas do not commit to a first-act resolution before the broader series continues.",
        "The color caste system maps labor extraction onto a visible hereditary hierarchy. The allegory is immediately legible and the seven-book series uses that legibility to trace what happens when revolution succeeds: the revolutionary wins, the society rebuilds, and the new order encounters the same structural problems as the old one.",
        "Brown committed to a genuine antagonist POV in the Republic Era. Lysander au Lune's chapters across Iron Gold, Dark Age, and Light Bringer give the opposition a coherent worldview rather than making him a straightforward villain. The finale is positioned as a resolution of competing legitimate claims.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Original Trilogy (books 1-3)',
      level: 3,
      desc: 'Dark YA-to-adult crossover - gladiatorial violence, death of supporting characters, revolution with real costs; tense but not relentless',
    },
    {
      label: 'Iron Gold & Light Bringer (books 4 & 6)',
      level: 4,
      desc: 'Political brutality, major character deaths, moral complexity without easy resolution; hope exists but is hard-won',
    },
    {
      label: 'Dark Age (book 5)',
      level: 5,
      desc: 'Grimdark - sustained atrocity across multiple fronts, no character is safe, deliberately exhausting; the darkest entry by a significant margin',
    },
  ],
  metaDescription:
    'The complete Red Rising reading order - original trilogy vs sequel series explained, with notes on all 7 Pierce Brown books.',
  shortName: 'Red Rising',
  booksLikeSlug: 'red-rising',
  finishedLabel: 'Finished Red Rising?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['first-law', 'malazan', 'stormlight', 'asoiaf', 'mark-lawrence', 'empyrean'],
  lastUpdated: '2026-07-01',
};
