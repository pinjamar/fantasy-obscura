import type { ReadingOrderEntry } from '../reading-orders';

export const earthsea: ReadingOrderEntry = {
  slug: 'earthsea',
  name: 'Earthsea Cycle',
  author: 'Ursula K. Le Guin',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    'Six books set across an archipelago world where magic is rooted in the true names of things, and power always comes with a cost. Le Guin wrote the original trilogy between 1968 and 1972, then returned to Earthsea eighteen years later with a fundamentally different perspective: the second half of the series is quieter, more philosophical, and concerned with questions the first half never thought to ask. A Wizard of Earthsea is where to start: 183 pages, and Le Guin establishes the world, the magic system, and the central character in a single self-contained arc.',
  darknessDisplay: '🕯️🕯️ Mild to Moderate',
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'books 1-3 - start here',
      noteType: 'required',
      note: 'Read in publication order. Each book shifts focus: different protagonist in book 2, different generation in book 3. All three are short. The trilogy follows Ged from student to Archmage.',
      books: [
        {
          title: 'A Wizard of Earthsea',
          slug: 'a-wizard-of-earthsea',
          status: 'mandatory',
          note: 'Start here. Ged, a gifted boy from a poor island, enters wizard school and unleashes something dangerous. The original magic school fantasy.',
          page_count: 183,
          publication_year: 1968,
        },
        {
          title: 'The Tombs of Atuan',
          slug: 'the-tombs-of-atuan',
          status: 'mandatory',
          note: 'Shifts to a new protagonist: Tenar, a girl raised as a high priestess in a labyrinthine tomb. Claustrophobic and beautifully strange.',
          page_count: 173,
          publication_year: 1971,
        },
        {
          title: 'The Farthest Shore',
          slug: 'the-farthest-shore',
          status: 'mandatory',
          note: 'Ged as Archmage, travelling with a young prince to the edge of the world. Explores death and what it costs to cheat it.',
          page_count: 223,
          publication_year: 1972,
        },
      ],
    },
    {
      label: 'The Second Trilogy',
      sublabel: 'books 4-6 - written 18 years later',
      noteType: 'required',
      note: 'Le Guin returned to Earthsea in 1990 with different questions. The tone is slower and more interior: less adventure, more reckoning. Tehanu picks up directly after The Farthest Shore with Tenar as the focus. The Other Wind is the true conclusion to the whole series.',
      books: [
        {
          title: 'Tehanu',
          slug: 'tehanu',
          status: 'mandatory',
          note: 'Tenar, now middle-aged, takes in a badly burned child. Ged returns changed. Le Guin revisits the world through a feminist lens: quieter and more unsettling than the original trilogy.',
          page_count: 260,
          publication_year: 1990,
        },
        {
          title: 'Tales from Earthsea',
          slug: 'tales-from-earthsea',
          status: 'supplementary',
          note: 'Five stories set across different eras of Earthsea history. Read between Tehanu and The Other Wind: the story "Dragonfly" directly sets up The Other Wind.',
          page_count: 328,
          publication_year: 2001,
        },
        {
          title: 'The Other Wind',
          slug: 'the-other-wind',
          status: 'mandatory',
          note: 'The true finale. Resolves threads from across the entire series. Le Guin considered this the conclusion she needed to write after Tehanu left things unfinished.',
          page_count: 271,
          publication_year: 2001,
        },
        {
          title: 'The Daughter of Odren',
          slug: 'the-daughter-of-odren',
          status: 'supplementary',
          note: 'A short story set in Earthsea, published in 2014 as an ebook original. Standalone. Read after The Other Wind.',
          page_count: 48,
          publication_year: 2014,
        },
      ],
    },
  ],
  orderNote:
    'Publication order is the right order. Le Guin designed the books to be read sequentially. Tales from Earthsea is best read between Tehanu and The Other Wind: the story "Dragonfly" bridges them directly.',
  cardsPosition: 'above',
  cards: [
    {
      title: '📚 Short Books',
      body: 'All six books are short: 170 to 330 pages each, under 1,500 combined. Le Guin writes with such compression that single sentences carry the weight of whole chapters elsewhere. Nothing in Earthsea is decorative. Every scene is doing something, and the ones that seem slowest tend to be the ones doing the most.',
      color: 'blue',
    },
    {
      title: '🌊 Two Different Tones',
      body: 'Books 1-3 are adventure-focused and accessible. Books 4-6 are slower, more interior, and concerned with who the original trilogy forgot. The shift is not gradual: books 4-6 feel like a different author returning to a world she helped build and asking what she got wrong. The two halves are the same series.',
      color: 'amber',
    },
    {
      title: '🐉 The Dragon Lore',
      body: 'Dragons in Earthsea are not creatures: they are something closer to truth itself. They speak only the Old Speech and cannot lie. What they are and what they want is withheld across five books and becomes the central question of The Other Wind. The answer reframes the entire series.',
      color: 'purple',
    },
    {
      title: '🧙 Ged',
      body: "Ged is the protagonist of three of the six books: an orphan from a poor island who discovers exceptional power and nearly destroys himself with it. His arc across the original trilogy is a study in consequence. He does not grow by defeating enemies but by confronting what he himself unleashed. What Tehanu does to that arc is what the second trilogy is fundamentally about. Let it arrive without forewarning.",
      color: 'red',
    },
    {
      title: '✨ True Names',
      body: 'The magic of Earthsea is built on a single principle: everything has a true name in the Old Speech, the language of the Making. Knowing the true name of a person, creature, or thing gives you power over it. The implication runs through every book: power over the world comes from knowledge of it, not from force. The entire series is a meditation on what it means to truly know something.',
      color: 'green',
    },
    {
      title: '📖 Le Guin',
      body: "Le Guin wrote with a precision and restraint that is rare in any genre. Earthsea reads clean: no wasted scenes, no padding, no world-building for its own sake. She was also a political thinker. The series grows quieter and more feminist as it goes, not because she lost interest in adventure, but because she had harder questions to ask. The second trilogy is as much a reckoning with the first as it is a continuation.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Ged',
      role: 'Sparrowhawk; the Archmage; protagonist of books 1, 3, and present in book 4',
      color: 'blue',
      why_they_work:
        "He is the most powerful mage of his generation and the series tracks exactly what that costs. His arc in the original trilogy is about confronting what he himself created: a shadow-self unleashed from his own hubris that the world cannot contain until he can. What happens to him in Tehanu is the second trilogy's central question, and Le Guin handles it without softening.",
    },
    {
      name: 'Tenar',
      role: 'Arha; high priestess of the Tombs; protagonist of books 2 and 4',
      color: 'amber',
      why_they_work:
        "She was taken from her family as a child and raised as the One Priestess of a nameless cult in a lightless labyrinth. Book 2 is her discovery that what she was given (the name Arha, the role, the sacred duty) was not hers to begin with. Book 4 finds her in middle age and asks what she built in the decades after her escape. She is the series' most continuous consciousness.",
    },
    {
      name: 'Tehanu',
      role: 'Therru; the burned child; central to books 4 and 6',
      color: 'red',
      why_they_work:
        "She arrives in book 4 as a badly burned child Tenar takes in, and the second trilogy is structured around what she is and what the world will make of her. Le Guin withholds the full answer across two books. Tehanu's situation (a damaged child dismissed by every power structure in the world) is the feminist critique of the original trilogy made literal and specific.",
    },
    {
      name: 'Arren (Lebannen)',
      role: 'Young prince in book 3; King of the Archipelago in book 6',
      color: 'zinc',
      why_they_work:
        "He accompanies Ged on the journey in The Farthest Shore and the book is largely seen through his perspective. He returns in The Other Wind as the king he became, closing an arc that spans the full series. His role in book 3 is to witness Ged at his most decisive; his role in book 6 is to understand what that decision cost.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        'The original trilogy (1968-72) is swift and foundational: adventure fantasy written at the register of myth. Elegant, deceptively simple, and short enough to read one book per sitting.',
        'The second trilogy (1990-2001) is different in register: slower, more interior, and feminist. Le Guin was in her 60s when she wrote Tehanu and was asking different things than she was at 39.',
        'The world is an archipelago of islands. There is no continent, no map-sprawl: just sea, islands, and the spaces between. The scale is intimate rather than epic.',
        'Earthsea is literary fantasy with minimal action. The drama is always internal: the original trilogy has adventure but the engine is Ged confronting what he himself made.',
        'The second trilogy addresses what the first ignored: what the world looks like to women, to the powerless, to those the original books treated as background. The shift is intentional and the series earns it.',
      ],
    },
    {
      heading: 'On Tales from Earthsea',
      type: 'bullets',
      bullets: [
        'Tales from Earthsea is a short story collection: five stories spanning different eras of Earthsea history.',
        'The story "Dragonfly" is the most important: it directly sets up characters and events in The Other Wind. Read it before The Other Wind.',
        'The other four stories add historical context to Earthsea\'s past. Reading just "Dragonfly" is enough to prepare for The Other Wind.',
        'All five stories are available in the collected editions (The Books of Earthsea: The Complete Illustrated Edition, 2018).',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Earthsea (1968) was one of the first fantasy series to centre characters of colour as the default: Ged is brown-skinned, most Earthsea islanders are dark-complexioned. Le Guin did this four years after the Civil Rights Act.',
        'A Wizard of Earthsea predates Hogwarts by almost 30 years. It established the wizard school template.',
        'Le Guin influenced N.K. Jemisin, Brandon Sanderson, Patrick Rothfuss, and China Miéville, among many others.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Violence is present but never graphic. Death and loss are handled directly and without softening, particularly in The Farthest Shore and the second trilogy.',
        'Tehanu contains depictions of child abuse and sexual violence, treated with seriousness rather than as plot device. It is the darkest book in the series.',
        'The second trilogy deals explicitly with themes of aging, loss of power, and gender inequality within the world of the books.',
      ],
    },
  ],
  darkness: [
    { label: 'Books 1-3', level: 2, desc: 'Adventure and consequence - death present but not dwelt upon' },
    { label: 'Books 4-6', level: 3, desc: 'More interior - trauma, loss, and questions without easy answers' },
  ],
  metaDescription:
    'The Earthsea reading order: all six books across the original trilogy and second trilogy, plus Tales from Earthsea, in the order Le Guin intended.',
  lastUpdated: '2026-06-26',
  shortName: 'Earthsea',
  finishedLabel: 'Finished Earthsea?',
  booksLikeSlug: 'a-wizard-of-earthsea',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['kingkiller', 'robin-hobb', 'memory-sorrow-thorn', 'discworld', 'wheel-of-time', 'witcher'],
};
