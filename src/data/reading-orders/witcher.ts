import type { ReadingOrderEntry } from '../reading-orders';

export const witcher: ReadingOrderEntry = {
  slug: 'witcher',
  name: 'The Witcher',
  author: 'Andrzej Sapkowski',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Completed Series',
  description:
    'A monster hunter in a morally grey world who is far more interesting than the monsters. Sapkowski takes fairy tales apart and rebuilds them as tragedy. The books behind the games, the show, and a generation of dark fantasy. Start with The Last Wish — a short story collection that introduces Geralt and reads as a standalone. The Witcher reading order matters: both story collections come before the five-novel saga.',
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Short Story Collections',
      sublabel: 'start here — not optional',
      noteType: 'required',
      note: "Written first, these are the foundation. They establish the world, Geralt's moral code, and introduce Ciri. The saga novels assume you know these characters. Starting at Blood of Elves causes confusion.",
      books: [
        {
          title: 'The Last Wish',
          slug: 'the-last-wish',
          status: 'mandatory',
          note: 'Start here. Geralt as monster-hunter-for-hire, deconstructing fairy tales. Brilliant standalone stories that double as world-building. Each one reframes a classic tale as moral tragedy.',
          page_count: 288,
          publication_year: 1993,
        },
        {
          title: 'Sword of Destiny',
          slug: 'sword-of-destiny',
          status: 'mandatory',
          note: 'Ciri appears for the first time. The relationship between Geralt and his destiny — something he has spent his life refusing — begins to close around him. Essential before the saga.',
          page_count: 384,
          publication_year: 1992,
        },
      ],
    },
    {
      label: 'The Witcher Saga',
      sublabel: '5 novels — read in order',
      noteType: 'required',
      note: 'A continuous war story told across five novels. Ciri, not Geralt, is the true protagonist of the saga — she is what everyone is hunting, protecting, or using. The tone shifts from the short stories into full-scale political and military darkness.',
      books: [
        {
          title: 'Blood of Elves',
          slug: 'blood-of-elves',
          status: 'mandatory',
          note: 'The saga begins. The war has already happened — Geralt navigates the aftermath while trying to protect Ciri from every faction that wants her.',
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
          note: "Geralt's journey through a devastated continent at war. Slower than the others — more concerned with the human cost. The Hansa (his companions) are the heart of this book.",
          page_count: 352,
          publication_year: 1996,
        },
        {
          title: 'The Tower of the Swallow',
          slug: 'the-tower-of-the-swallow',
          status: 'mandatory',
          note: "Ciri alone. No Geralt. Dark, relentless, and the best showcase for why she's the real protagonist. The book that earns the ending.",
          page_count: 400,
          publication_year: 1997,
        },
        {
          title: 'Lady of the Lake',
          slug: 'lady-of-the-lake',
          status: 'mandatory',
          note: 'The conclusion. Non-linear structure, mythological scope, and an ending that divides readers — some find it devastating, others transcendent. Either way, it earns it.',
          page_count: 544,
          publication_year: 1999,
        },
      ],
    },
    {
      label: 'Standalone Extras',
      sublabel: 'read after the saga',
      noteType: 'optional',
      note: "Two standalone novels that sit outside the main saga. Season of Storms is set chronologically during the short story era but written in 2013 — its epilogue spoils the saga ending. Crossroads of Ravens (2025) is a prequel about Geralt's earliest days as a Witcher, best read knowing who he eventually becomes.",
      books: [
        {
          title: 'Season of Storms',
          slug: 'season-of-storms',
          status: 'optional',
          note: "A standalone Geralt adventure — lighter in tone than the saga, closer to the short story register. Fun for fans who want more time in the world. The epilogue in particular rewards those who've finished the saga.",
          page_count: 368,
          publication_year: 2013,
        },
        {
          title: 'Crossroads of Ravens',
          slug: 'crossroads-of-ravens',
          status: 'optional',
          note: 'Geralt as a young, newly made Witcher — the origin before the legend. Set chronologically first but written and published last. Sapkowski returns to the character stripped of everything that came after. Read it knowing who Geralt becomes.',
          page_count: 304,
          publication_year: 2025,
        },
      ],
    },
  ],
  orderNote:
    'Short story collections first — they are essential, not optional. The saga follows in publication order. Season of Storms and Crossroads of Ravens last.',
  cards: [
    {
      title: '🧚 The Fairy Tales',
      body: "Sapkowski built the Witcher world on deconstructed fairy tales. The Last Wish retells Snow White, Beauty and the Beast, the Fisherman's Wife — but strips away the happy endings and asks what these stories actually cost. It is the most original thing about the series and it works on every level.",
      color: 'blue',
    },
    {
      title: '⚔️ Ciri',
      body: "The short stories are Geralt's. The saga is Ciri's. She is what every faction in the world is hunting — a girl with Elder Blood who can reshape reality. Geralt's entire arc in the novels is defined by his attempt to protect someone who increasingly doesn't need protecting.",
      color: 'purple',
    },
    {
      title: '🎮 Games & Show',
      body: 'The Witcher games are sequels to the books, not adaptations — they assume the book endings and continue from there. The Netflix show takes major liberties with the timeline and characters. The books are darker, more morally complex, and significantly better than either.',
      color: 'green',
    },
    {
      title: '📚 The Hussite Trilogy',
      body: 'Sapkowski also wrote a separate historical fantasy trilogy — Narrenturm, Boże Bojownicy, and Lux Perpetua — set in 15th century Bohemia during the Hussite Wars. It has no connection to the Witcher universe and is not part of this reading order. A separate series for readers who want more Sapkowski.',
      color: 'zinc',
    },
    {
      title: '🖼️ Graphic Novel Adaptations',
      body: 'Dark Horse Comics has published graphic novel adaptations of individual short stories from The Last Wish — A Grain of Truth, The Lesser Evil, The Edge of the World, The Witcher, and A Question of Price. They adapt stories you will already have read. Recommended for fans who want to revisit the world in a different format, not as a replacement for the prose.',
      color: 'amber',
    },
  ],
  cardsPosition: 'above',
  sections: [
    {
      heading: 'If you know the games or show',
      type: 'bullets',
      bullets: [
        'The books are darker and more morally complex than either adaptation.',
        "The games are set after the books — they're sequels, not adaptations. They assume the book endings.",
        'The Netflix show takes significant liberties with the story and timeline.',
        'Geralt in the books is more cynical, more tired, and more interesting than either adaptation.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Short Stories',
      level: 3,
      desc: 'Dark fairy tales — violence, moral ambiguity, dark humour',
    },
    {
      label: 'The Saga (5 novels)',
      level: 4,
      desc: 'War, genocide, betrayal, child soldiers',
    },
  ],
  finishedLabel: 'Finished the saga?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['first-law', 'kingkiller'],
};
