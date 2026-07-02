import type { ReadingOrderEntry } from '../reading-orders';

export const witcher: ReadingOrderEntry = {
  slug: 'witcher',
  name: 'The Witcher',
  author: 'Andrzej Sapkowski',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 2 collections + 5 novels',
  description:
    'A monster hunter in a morally grey world who is far more interesting than the monsters. Sapkowski takes fairy tales apart and rebuilds them as tragedy. The books behind the games, the show, and a generation of dark fantasy. Reading order matters: both short story collections come before the five-novel saga, and starting at Blood of Elves causes confusion.',
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Very Dark - war, genocide, and child soldiers in the saga; the short stories are dark fairy tales with grim humour',
  orderNote:
    'Start with The Last Wish. Short story collections first: they are essential, not optional. The saga follows in publication order. Season of Storms and Crossroads of Ravens last.',
  groups: [
    {
      label: 'The Short Story Collections',
      sublabel: 'start here; not optional',
      noteType: 'required',
      note: "Written first, these are the foundation. They establish the world, Geralt's moral code, and introduce Ciri. The saga novels assume you know these characters. Starting at Blood of Elves causes confusion.",
      books: [
        {
          title: 'The Last Wish',
          slug: 'the-last-wish',
          status: 'mandatory',
          note: 'Start here. Geralt as monster-hunter-for-hire, deconstructing fairy tales. Brilliant standalone stories that double as worldbuilding. Each one reframes a classic tale as moral tragedy.',
          page_count: 288,
          publication_year: 1993,
        },
        {
          title: 'Sword of Destiny',
          slug: 'sword-of-destiny',
          status: 'mandatory',
          note: 'Ciri appears for the first time. The relationship between Geralt and his destiny (something he has spent his life refusing) begins to close around him. Essential before the saga.',
          page_count: 384,
          publication_year: 1992,
        },
      ],
    },
    {
      label: 'The Witcher Saga',
      sublabel: '5 novels; read in order',
      noteType: 'required',
      note: 'A continuous war story told across five novels. Ciri, not Geralt, is the true protagonist of the saga: she is what everyone is hunting, protecting, or using. The tone shifts sharply from the short stories into full-scale political and military darkness.',
      books: [
        {
          title: 'Blood of Elves',
          slug: 'blood-of-elves',
          status: 'mandatory',
          note: 'The saga begins. The war has already happened: Geralt navigates the aftermath while trying to protect Ciri from every faction that wants her.',
          page_count: 288,
          publication_year: 1994,
        },
        {
          title: 'Time of Contempt',
          slug: 'time-of-contempt',
          status: 'mandatory',
          note: 'Mage politics, betrayal, and the world fracturing. The council scenes are among the best political writing in fantasy. Things get much worse.',
          page_count: 352,
          publication_year: 1995,
        },
        {
          title: 'Baptism of Fire',
          slug: 'baptism-of-fire',
          status: 'mandatory',
          note: "Geralt's journey through a devastated continent at war: slower than the others, more concerned with the human cost. The Hansa companions are the heart of this book.",
          page_count: 352,
          publication_year: 1996,
        },
        {
          title: 'The Tower of the Swallow',
          slug: 'the-tower-of-the-swallow',
          status: 'mandatory',
          note: "Ciri alone. No Geralt. Dark, relentless, and the clearest demonstration that she is the real protagonist. The book that makes the saga's ending inevitable.",
          page_count: 400,
          publication_year: 1997,
        },
        {
          title: 'Lady of the Lake',
          slug: 'lady-of-the-lake',
          status: 'mandatory',
          note: 'The conclusion. Non-linear structure, mythological scope, and an ending Sapkowski chose not to soften. The most debated single book in the saga.',
          page_count: 544,
          publication_year: 1999,
        },
      ],
    },
    {
      label: 'Standalone Extras',
      sublabel: 'read after the saga',
      noteType: 'optional',
      note: "Two standalone novels that sit outside the main saga. Season of Storms is set chronologically during the short story era but written in 2013: its epilogue is set after the saga ends and only makes sense knowing how the saga ends. Crossroads of Ravens (2025) is a prequel about Geralt's earliest days as a Witcher, best read knowing who he eventually becomes.",
      books: [
        {
          title: 'Season of Storms',
          slug: 'season-of-storms',
          status: 'optional',
          note: "A standalone Geralt adventure set during the short story era but written in 2013. Lighter in tone than the saga, closer to the short story register. The epilogue is set far after the saga ends and only lands if you know how the saga ends. Read last.",
          page_count: 368,
          publication_year: 2013,
        },
        {
          title: 'Crossroads of Ravens',
          slug: 'crossroads-of-ravens',
          status: 'optional',
          note: 'Geralt as a young, newly made Witcher: the origin before the legend. Set chronologically first but written and published last. Read it knowing who Geralt becomes.',
          page_count: 304,
          publication_year: 2025,
        },
      ],
    },
  ],
  cards: [
    {
      title: '🧚 The Fairy Tales',
      body: "Sapkowski built the Witcher world on deconstructed fairy tales. The Last Wish retells Snow White, Beauty and the Beast, the Fisherman's Wife: but strips away the happy endings and asks what these stories actually cost. It is the most original thing about the series and it works on every level.",
      color: 'blue',
    },
    {
      title: '⚔️ Ciri',
      body: "The short stories are Geralt's. The saga is Ciri's. She is what every faction in the world is hunting: a girl with Elder Blood who can reshape reality. Geralt's entire arc in the novels is defined by his attempt to protect someone who increasingly does not need protecting.",
      color: 'purple',
    },
    {
      title: '📖 Short Stories vs Saga',
      body: 'The Last Wish and Sword of Destiny are the strongest entries in the series: self-contained, darkly funny, episodic monster-hunting stories. The saga (Blood of Elves onward) is a continuous five-novel war narrative: grimmer, more political, and slower. The two halves are a notably different register. Know this going in.',
      color: 'amber',
    },
    {
      title: '🎮 Games & Show',
      body: 'The Witcher games are sequels to the books, not adaptations: they assume the book endings and continue from there. The Netflix show takes major liberties with the timeline and characters. The books are darker, more morally complex, and significantly better than either.',
      color: 'green',
    },
    {
      title: '📚 The Hussite Trilogy',
      body: 'Sapkowski also wrote a separate historical fantasy trilogy (Narrenturm, Boże Bojownicy, and Lux Perpetua) set in 15th century Bohemia during the Hussite Wars. No connection to the Witcher universe. A separate series for readers who want more Sapkowski after finishing the saga.',
      color: 'zinc',
    },
    {
      title: '🖼️ Graphic Novels',
      body: 'Dark Horse Comics has adapted individual short stories from The Last Wish: A Grain of Truth, The Lesser Evil, The Edge of the World, and others. They adapt stories you will already have read. For fans who want to revisit the world visually, not as a replacement for the prose.',
      color: 'red',
    },
  ],
  cardsPosition: 'above',
  characters: [
    {
      name: 'Geralt of Rivia',
      role: 'Witcher; monster hunter; protagonist of the short stories and co-protagonist of the saga',
      color: 'blue',
      why_they_work:
        "Geralt's defining characteristic is his refusal of destiny: he spent decades rejecting the idea that he was bound to anything. The irony is that this refusal is what produced his connection to Ciri in the first place, and the saga is the story of that irony closing around him. His neutrality in political conflicts makes him the most useful piece on the board for every faction, which means his attempts to stay out of things are what pull him further in. He is one of the few fantasy protagonists whose philosophy produces his problems rather than solving them.",
    },
    {
      name: 'Ciri',
      role: 'Child of Destiny; Elder Blood; true protagonist of the saga',
      color: 'amber',
      why_they_work:
        "Ciri is the most powerful entity in the saga and the saga is structured so that power is almost never useful for her specific problems. Tower of the Swallow is the purest expression: alone, hunted, forced into violence that costs her something, and the ability to cross between worlds remains useless for the immediate problem of survival. The tension between what she is and what she can actually do is what makes her five novels of story rather than an easy resolution.",
    },
    {
      name: 'Yennefer of Vengerberg',
      role: "Sorceress; member of the Brotherhood; Geralt's partner",
      color: 'green',
      why_they_work:
        "Yennefer is the only character in the series who is Geralt's equal and knows it. What makes the relationship work is that Sapkowski resists making her compliant: she has her own political loyalties (to the Brotherhood of Sorcerers), her own professional ambitions, and she operates independently of Geralt's arc for significant stretches. The question of whether she genuinely loves him or whether she finds him the most interesting option available is never fully answered, which is the right call.",
    },
    {
      name: 'Dandelion',
      role: "Bard; Geralt's closest friend; narrator of the framing device",
      color: 'red',
      why_they_work:
        "Dandelion is the narrator of the memoir that frames the short stories, which means he is the character who determines what the series thinks it is: a story being written down rather than a story being lived. He is also the only major character who cannot protect himself, and the friendship works because it is genuinely asymmetric: Geralt keeps him alive, Dandelion witnesses everything and survives to record it. Everyone more powerful dies. The bard persists.",
    },
    {
      name: 'Emhyr var Emreis',
      role: "Emperor of Nilfgaard; the political engine of the saga's war",
      color: 'purple',
      why_they_work:
        "Emhyr is the force responsible for most of the saga's destruction but not a simple villain: his interest in Ciri is personal rather than purely strategic, and the revelation of why is one of the saga's darkest single moments. He functions as the series' argument that large-scale historical forces are not impersonal: someone makes the specific decisions that produce wars, famines, and displacements, and that person has reasons. Understanding Emhyr does not excuse what he does. It makes it worse.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Fairy tale deconstruction is the structural engine of the short stories: Sapkowski takes specific tales (Snow White, Beauty and the Beast, the Fisherman's Wife) and strips away the magical resolution. The question is always what the happy ending actually cost the people inside the story.",
        "Geralt operates on a philosophy of lesser evil: he takes the option that causes the least harm, refuses to take sides in political conflicts, and collects payment for the service. The series is an examination of what that philosophy produces across decades. It does not romanticise the position.",
        "The saga (Blood of Elves through Lady of the Lake) is a different mode from the short stories: a continuous war narrative across five novels, grimmer and more political, focused on Ciri rather than Geralt.",
        "The series does not resolve toward justice. The world is brutal in ways that are systematic rather than dramatic, and the ending of the saga is its most contested aspect for this reason.",
      ],
    },
    {
      heading: 'If you know the games or show',
      type: 'bullets',
      bullets: [
        "Book Geralt is deliberately unheroic: more cynical, more tired, more existentially weary than either the game or show version. He is a working professional in a world that barely tolerates him, not a silver-haired action hero.",
        "The Netflix show is most faithful in season 1, which adapts stories from The Last Wish and Sword of Destiny. Seasons 2-3 diverge significantly. Henry Cavill left after season 3; season 4 recast the role.",
        "Playing the games after finishing the books gives them a different weight: the games directly continue the book ending and reference specific events. They work as sequels, not standalone adventures.",
        "CD Projekt Red's The Witcher 4 (Polaris) is in development: a new story in the same universe, not a sequel to the saga.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Short Stories',
      level: 3,
      desc: 'Dark fairy tales: violence, moral ambiguity, dark humour',
    },
    {
      label: 'The Saga (5 novels)',
      level: 4,
      desc: 'War, genocide, betrayal, child soldiers',
    },
  ],
  booksLikeSlug: 'the-witcher',
  metaDescription:
    "The complete Witcher reading order: Sapkowski's short story collections, the five-novel saga, and the standalone extras: in the right sequence.",
  shortName: 'The Witcher',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished the saga?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['first-law', 'kingkiller', 'robin-hobb', 'malazan', 'mark-lawrence', 'black-company'],
};
