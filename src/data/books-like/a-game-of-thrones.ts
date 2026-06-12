import type { BooksLikeEntry } from '../books-like';

export const aGameOfThrones: BooksLikeEntry = {
  slug: 'a-game-of-thrones',
  source: {
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg',
    darkness_level: 5,
    heat_level: 'Explicit',
    series: 'A Song of Ice and Fire',
    series_number: 1,
    tropes: [
      'Multi-POV',
      'Political Intrigue',
      'No Safe Characters',
      'Morally Grey Cast',
      'Grimdark',
      'War & Conflict',
      'Subverted Heroism',
      'Dragons',
    ],
    angle: 'Dark Epic Fantasy with Political Intrigue',
    answer_line:
      'If you loved A Game of Thrones for the brutal politics, shifting loyalties, morally grey players, and constant sense that no one is safe, start with The First Law, The Poppy War and The Traitor Baru Cormorant.',
    why_people_love: `A Song of Ice and Fire broke every assumption readers had about what epic fantasy was allowed to do. Martin applied the political logic of real medieval history to a secondary world and refused to grant his protagonists narrative immunity — Ned Stark's death in book one established a contract with the reader that remained in force across five volumes: honourable intentions do not constitute plot armor, the world operates by power rather than justice, and the most decent character in the room is not the one who survives. The multi-POV structure is the series' formal masterstroke: because you understand why every faction does what it does, every betrayal is devastating rather than merely surprising. The prose is richer than most genre fiction, the political machinery — marriages, debts, succession crises, the weight of old wars — has the density of actual history, and the fantasy elements arrive late and sparingly, which makes them more powerful when they come. Five books and twenty-five years later, the ending remains unwritten, but the first three are among the finest work the genre has produced regardless.`,
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "A Song of Ice and Fire broke every assumption readers had about what epic fantasy was allowed to do. Martin applied the political logic of real medieval history to a secondary world and refused to grant his protagonists narrative immunity. Honourable intentions do not constitute plot armor. The world operates by power rather than justice. The most decent character in the room is not the one who survives.",
      },
      {
        type: 'labeled',
        label: 'The Structure:',
        text: "The multi-POV is the series' formal masterstroke. Because you understand why every faction does what it does, every betrayal is devastating rather than merely surprising — you saw it coming and couldn't stop it.",
      },
      {
        type: 'paragraph',
        text: "The prose is richer than most genre fiction. The political machinery — marriages, debts, succession crises, the weight of old wars — has the density of actual history. The fantasy elements arrive late and sparingly, which makes them more powerful when they do.",
      },
      {
        type: 'warning',
        text: "Five books and twenty-five years later, the ending remains unwritten. The first three books are among the finest work the genre has produced regardless, but approach the series knowing you may not get a conclusion.",
      },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the political realism and the no-safe-characters stakes...',
      recs: [
        {
          title: 'The Blade Itself',
          author: 'Joe Abercrombie',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
          darkness_level: 4,
          standalone: false,
          series: 'The First Law',
          series_number: 1,
          series_label:
            'Series (trilogy + 4 standalones + sequel trilogy, all complete)',
          audiobook: true,
          note: "The most direct heir to ASOIAF's political grimdark. Abercrombie uses the same multi-POV structure — characters with conflicting agendas converging on the same crisis — and applies Martin's logic that heroism is systematically punished. The First Law world operates by the same rules as Westeros: talent doesn't protect you, justice doesn't arrive on schedule, and the people who win are the ones who understand what the game actually is. The ending of the trilogy is one of the great gut-punch conclusions in modern fantasy.",
          caveat: 'Smaller in immediate scale than ASOIAF, more focused cast, more obviously satirical about genre conventions.',
          tags: [
            'Political Realism',
            'No Safe Heroism',
            'Multi-POV',
            'Grimdark',
            'Complete Series',
          ],
          warning: 'Graphic violence, torture, war',
          amazon_url:
            'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie&affiliate=122720',
        },
        {
          title: 'The Traitor Baru Cormorant',
          author: 'Seth Dickinson',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765380722-L.jpg',
          darkness_level: 4,
          standalone: false,
          series: 'The Masquerade',
          series_number: 1,
          series_label: 'Series (4 books planned, 3 released)',
          audiobook: true,
          note: "The most rigorous application of political machinery in modern fantasy. Baru is an accountant working for an empire she intends to destroy from within, and Dickinson writes her political calculations with the same historical specificity Martin brings to the Lannister debt structure. Every chapter of Baru's success has a hidden cost that compounds — and the book is fundamentally about what happens to a person who believes they can use the tools of power without being changed by them.",
          caveat: 'Deliberately devastating. The series is incomplete and the first book ends without clean resolution.',
          tags: [
            'Political Machination',
            'No Safe Heroism',
            'Economic Realism',
            'Moral Cost',
            'Grimdark',
          ],
          warning: 'Queerphobia as systemic theme, emotional devastation',
          amazon_url:
            'https://www.amazon.com/s?k=The+Traitor+Baru+Cormorant+Seth+Dickinson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Traitor+Baru+Cormorant+Dickinson&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the world-spanning multi-POV structure and the depth beneath the story...',
      recs: [
        {
          title: 'Gardens of the Moon',
          author: 'Steven Erikson',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765348784-L.jpg',
          darkness_level: 4,
          standalone: false,
          series: 'Malazan Book of the Fallen',
          series_number: 1,
          series_label: 'Series (10 books, complete)',
          audiobook: true,
          note: "Same ambition, dramatically harder entry. Erikson's ten books follow dozens of characters across multiple continents and 300,000 years of history — the scale makes ASOIAF look contained. The moral complexity is comparable: Erikson refuses heroism the same way Martin does, his gods are capricious, his empires are brutal, and the characters who survive are not the ones who deserved to. The world has the same quality of feeling like it existed long before the story began.",
          caveat: "The hardest entry point in the genre — Erikson drops you mid-campaign with no glossary and trusts you to catch up. Many readers require a second attempt. If you persist, the payoff is enormous.",
          tags: [
            'Maximum Scale',
            'Multi-POV',
            'Deep Lore',
            'No Safe Heroism',
            'Complete Series',
          ],
          warning: 'Graphic violence, war, mature themes throughout',
          amazon_url:
            'https://www.amazon.com/s?k=Gardens+of+the+Moon+Steven+Erikson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Erikson&affiliate=122720',
        },
        {
          title: 'The Eye of the World',
          author: 'Robert Jordan',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765345424-L.jpg',
          darkness_level: 3,
          standalone: false,
          series: 'The Wheel of Time',
          series_number: 1,
          series_label: 'Series (14 books, complete)',
          audiobook: true,
          note: "The other defining epic fantasy of the era, written as Martin began ASOIAF. Jordan's fourteen-book series has a comparable cast size, similar political complexity across multiple kingdoms, and the same investment in a world that feels fully inhabited outside the frame of the story. For ASOIAF readers who want comparable scope and the same feeling of a world with real history — but who want a completed story.",
          caveat: "Significantly more hopeful and less morally complex than ASOIAF. Chosen-one heroism survives here. It is a different emotional contract.",
          tags: [
            'Epic Scale',
            'Multi-POV',
            'Completed Series',
            'Political Complexity',
            'Rich World',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Eye+of+the+World+Robert+Jordan&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the morally grey characters whose choices compound into catastrophe...',
      recs: [
        {
          title: 'The Poppy War',
          author: 'R.F. Kuang',
          cover_url:
            'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          darkness_level: 5,
          standalone: false,
          series: 'The Poppy War',
          series_number: 1,
          series_label: 'Series (trilogy, complete)',
          audiobook: true,
          note: "ASOIAF's greatest achievement is making you understand why everyone does what they do — moral complexity built step by step until the devastating choices feel inevitable. Kuang does this for one protagonist: Rin's moral erosion is constructed the same way, each decision following logically from the last, until she has become something the reader watched her choose to become. The trilogy is complete.",
          caveat: "Significantly darker than ASOIAF at its darkest, with content drawn directly from historical atrocity.",
          tags: [
            'Moral Erosion',
            'No Safe Heroism',
            'Dark Power',
            'War & Atrocity',
            'Female Protagonist',
          ],
          warning: 'War atrocity, genocide, drug addiction, graphic violence',
          amazon_url:
            'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang&affiliate=122720',
        },
        {
          title: 'Prince of Thorns',
          author: 'Mark Lawrence',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780441020409-L.jpg',
          darkness_level: 5,
          standalone: false,
          series: 'The Broken Empire',
          series_number: 1,
          series_label: 'Series (trilogy, complete)',
          audiobook: true,
          note: "The anti-hero taken to its extreme. Jorg of Ancrath is thirteen years old and has already done things that cannot be undone, and Lawrence never exonerates him. The narrative strategy is the same as Martin's with Cersei or Jaime — you understand exactly why this person is doing what they are doing, which is different from forgiving them. The Broken Empire trilogy is complete and the ending earns its grimness.",
          caveat: "The first-person perspective is far more uncomfortable than Martin's third-person diffusion. You are inside Jorg's head rather than observing him, which some readers find genuinely difficult to sustain.",
          tags: [
            'Anti-Hero',
            'Moral Darkness',
            'First-Person Villain',
            'Grimdark',
            'Complete Trilogy',
          ],
          warning: 'Graphic violence, war crimes, disturbing protagonist',
          amazon_url:
            'https://www.amazon.com/s?k=Prince+of+Thorns+Mark+Lawrence&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Prince+of+Thorns+Mark+Lawrence&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like The Wheel of Time', slug: 'the-wheel-of-time' },
    { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
    { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
  ],
};
