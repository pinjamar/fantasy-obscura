import type { ReadingOrderEntry } from '../reading-orders';

export const greenBoneSaga: ReadingOrderEntry = {
  slug: 'green-bone-saga',
  name: 'The Green Bone Saga',
  author: 'Fonda Lee',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "A crime epic in fantasy clothing — The Godfather transplanted to a fictional Pacific island where jade grants martial arts powers and rival clans fight for control of everything. Three books, one family, thirty years of history. Fonda Lee builds Kekon with the same care Jordan gave the Wheel of Time world, but the story moves at a crime thriller's pace: political, intimate, and unsparing. The violence is real, the losses are permanent, and the ending earns every page that precedes it. One of the most decorated fantasy trilogies of the last decade.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  orderNote: 'Three books, read in order. Strictly linear — no spinoffs or side content to worry about.',
  books: [
    {
      title: 'Jade City',
      slug: 'jade-city',
      status: 'mandatory',
      note: 'Start here. The Kaul family and the No Peak clan — two brothers, a sister, and a grandfather holding an empire together while a rival clan chips away at the foundation. One of the strongest debut novels in recent fantasy.',
      page_count: 560,
      publication_year: 2017,
    },
    {
      title: 'Jade War',
      slug: 'jade-war',
      status: 'mandatory',
      note: 'The world expands beyond Kekon. The conflict goes global — immigration, diaspora, and colonial pressure from larger nations push the clan to its breaking point. The emotional stakes double.',
      page_count: 616,
      publication_year: 2019,
    },
    {
      title: 'Jade Legacy',
      slug: 'jade-legacy',
      status: 'mandatory',
      note: "The full arc closes across thirty years. Time jumps, succession, and the question the whole trilogy has been building toward: what does it cost to run an empire through violence, and was it worth it? A remarkable ending.",
      page_count: 688,
      publication_year: 2021,
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🪨 What Jade Does',
      body: "Jade is a mineral that grants bioenergetic abilities — enhanced speed, strength, perception, and channelling of energy — to those trained to use it. Untrained exposure causes madness and death. It is simultaneously a drug, a weapon, a status symbol, and the resource everything in Kekon is built around. The magic system is physical, grounded, and the combat is visceral.",
      color: 'blue',
    },
    {
      title: '🎬 The Godfather Comparison',
      body: "It is earned. Rival clans, a patriarch's succession, loyalty tested against ambition, and the cost of building an empire through violence. The Green Bone Saga occupies the same emotional register as the best crime fiction — but it is not derivative. It uses those conventions to tell a story that only fantasy can tell.",
      color: 'green',
    },
    {
      title: '🌏 Kekon and the World',
      body: "Kekon is modelled loosely on post-WWII Taiwan and Hong Kong — a small island nation with a martial culture sitting in the crossfire of larger imperial powers. Colonialism, the diaspora experience, and what it means to preserve cultural identity under external pressure are woven into the politics without being didactic.",
      color: 'amber',
    },
    {
      title: '📈 The Scope',
      body: "Jade Legacy covers thirty years. Characters age, die, and pass legacies to the next generation. The series begins as a street-level clan story and ends as a geopolitical saga — but the Kaul family remains the centre throughout. The transition is earned, not expanded for its own sake.",
      color: 'purple',
    },
    {
      title: '⚠️ The Losses',
      body: "Characters the reader is attached to die — sometimes abruptly, without heroic framing. The final book is emotionally demanding. Several major losses land hard precisely because the series has spent three books making you care. This is not a series that protects its cast.",
      color: 'red',
    },
    {
      title: '🏆 The Recognition',
      body: "Jade Legacy won the 2022 World Fantasy Award for Best Novel. The trilogy as a whole is one of the most awarded fantasy series of the last decade and has been widely cited as raising the standard for what morally complex, non-European-inspired epic fantasy can be.",
      color: 'green',
    },
  ],
  sections: [
    {
      heading: 'Is the Green Bone Saga right for you?',
      type: 'bullets',
      bullets: [
        "Read it if: you want political fantasy where the families feel as real as the magic. The Kaul siblings carry the whole story — plot is subordinate to character and consequence.",
        "Read it if: you want a complete, self-contained trilogy with a definitive ending. Three books, no padding, no spinoffs. It ends.",
        "Read it if: you want fantasy outside the European medieval template. Kekon is original — not 'Asian aesthetics' as decoration but as cultural depth embedded in every system the world runs on.",
        "It may not be for you if: you need a fundamentally heroic protagonist. This is morally grey fiction throughout. Clan leaders do terrible things for reasons the series asks you to understand without endorsing.",
        "It may not be for you if: you want fast-paced action as the dominant mode. The books move well, but the engine is political drama and family tragedy. The action scenes are excellent — they are not the point.",
      ],
    },
    {
      heading: 'What to know before you start',
      type: 'bullets',
      bullets: [
        "Jade City opens in media res. The world-building is embedded in the story rather than front-loaded — the terminology and clan dynamics become clear quickly without an exposition chapter.",
        "The magic is physical and earned. Jade abilities require years of rigorous training, and the cost of overextension is real. There is no chosen one with innate power.",
        "The cast grows considerably between books one and three as the scope expands globally. The Kaul family remains the anchor throughout — keep them in focus when the world gets large.",
        "The series is complete. Start knowing you will get a full story with a definitive ending — no waiting, no open threads.",
      ],
    },
  ],
  darkness: [
    { label: 'Jade City', level: 3, desc: 'Violence and death — purposeful, not gratuitous' },
    { label: 'Jade War', level: 4, desc: 'War, loss, and the personal cost of political decisions' },
    { label: 'Jade Legacy', level: 4, desc: 'Grief, succession, and an emotionally demanding close' },
  ],
  metaDescription:
    'The complete Green Bone Saga reading order: Jade City, Jade War, and Jade Legacy by Fonda Lee — all three books in order.',
  shortName: 'Green Bone Saga',
  lastUpdated: '2026-05-19',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: ['first-law', 'malazan', 'black-company', 'asoiaf', 'dune', 'wheel-of-time'],
};
