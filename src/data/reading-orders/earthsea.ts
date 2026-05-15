import type { ReadingOrderEntry } from '../reading-orders';

export const earthsea: ReadingOrderEntry = {
  slug: 'earthsea',
  name: 'Earthsea Cycle',
  author: 'Ursula K. Le Guin',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    'Six books set across an archipelago world where magic is rooted in the true names of things, and power always comes with a cost. Le Guin wrote the original trilogy between 1968 and 1972, then returned to Earthsea eighteen years later with a fundamentally different perspective — the second half of the series is quieter, more philosophical, and concerned with questions the first half never thought to ask. A Wizard of Earthsea is where to start: it is short, perfect, and one of the best entry points in all of fantasy. Read the Earthsea books in publication order.',
  darknessDisplay: '🕯️🕯️ Mild to Moderate',
  groups: [
    {
      label: 'The Original Trilogy',
      sublabel: 'books 1–3 — start here',
      noteType: 'required',
      note: 'Read in publication order. Each book shifts focus — different protagonist in book 2, different generation in book 3. All three are short. The trilogy follows Ged from student to Archmage.',
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
          note: 'Shifts to a new protagonist — Tenar, a girl raised as a high priestess in a labyrinthine tomb. Claustrophobic and beautifully strange.',
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
      sublabel: 'books 4–6 — written 18 years later',
      noteType: 'required',
      note: 'Le Guin returned to Earthsea in 1990 with different questions. The tone is slower and more interior — less adventure, more reckoning. Tehanu picks up directly after The Farthest Shore with Tenar as the focus. The Other Wind is the true conclusion to the whole series.',
      books: [
        {
          title: 'Tehanu',
          slug: 'tehanu',
          status: 'mandatory',
          note: 'Tenar, now middle-aged, takes in a badly burned child. Ged returns changed. Le Guin revisits the world through a feminist lens — quieter and more unsettling than the original trilogy.',
          page_count: 260,
          publication_year: 1990,
        },
        {
          title: 'Tales from Earthsea',
          slug: 'tales-from-earthsea',
          status: 'supplementary',
          note: 'Five stories set across different eras of Earthsea history. Read between Tehanu and The Other Wind — the story "Dragonfly" directly sets up The Other Wind.',
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
          note: 'A short story set in Earthsea, published in 2014 as an ebook original. Standalone — read after The Other Wind.',
          page_count: 48,
          publication_year: 2014,
        },
      ],
    },
  ],
  orderNote:
    'Publication order is the right order. Le Guin designed the books to be read sequentially. Tales from Earthsea is best read between Tehanu and The Other Wind — the story "Dragonfly" bridges them directly.',
  cardsPosition: 'above',
  cards: [
    {
      title: '📚 Short Books',
      body: 'All six books are short — 170 to 330 pages each. The entire series is under 1,500 pages combined. One of the most complete and efficient fantasy universes ever written.',
      color: 'blue',
    },
    {
      title: '🌊 Two Different Tones',
      body: 'Books 1–3 are adventure-focused and accessible. Books 4–6 are slower, more philosophical, and concerned with age, power, and what the first trilogy left unexamined. The shift between them is deliberate — and significant.',
      color: 'amber',
    },
    {
      title: '🐉 The Dragon Lore',
      body: 'Dragons in Earthsea are not creatures — they are something closer to truth itself. They speak only the Old Speech and cannot lie. Their role deepens significantly in the second trilogy, culminating in The Other Wind.',
      color: 'purple',
    },
    {
      title: '🧙 Ged',
      body: "Ged is the protagonist of three of the six books — an orphan from a minor island who discovers exceptional power and nearly destroys himself with it. His arc across the original trilogy is one of the most complete character studies in fantasy. What Tehanu does to that arc is what the second trilogy is fundamentally about. Let it arrive without forewarning.",
      color: 'red',
    },
    {
      title: '✨ True Names',
      body: 'The magic of Earthsea is built on a single principle: everything has a true name in the Old Speech, the language of the Making. Knowing the true name of a person, creature, or thing gives you power over it. One of the most elegant magic systems in fantasy — minimal rules with enormous philosophical implications. The entire series is, in a sense, a meditation on what it means to truly know something.',
      color: 'green',
    },
    {
      title: '📖 Le Guin',
      body: "Le Guin was one of the finest prose stylists in any genre. Earthsea reads with a restraint and precision that makes most fantasy feel cluttered by comparison. She was also a political thinker — the series grows quieter and more feminist as it goes, not because she lost interest in adventure, but because she had harder questions to ask. The second trilogy is as much a reckoning with the first as it is a continuation.",
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'What to expect',
      type: 'bullets',
      bullets: [
        "The original trilogy (1968–72) is foundational fantasy — elegant, swift, and deceptively simple. Perfect for readers who want the genre's roots.",
        'The second trilogy (1990–2001) is different in register — slower, introverted, and feminist. Le Guin was in her 60s when she wrote Tehanu and was asking different questions than she was at 39.',
        'The world is an archipelago of islands. There is no continent, no map-sprawl — just sea, islands, and the spaces between. The scale feels intimate rather than epic.',
        'Right for: readers who want literary fantasy, elegant prose, and a series short enough to finish in a week but rich enough to reward rereading.',
        'Not right for: readers who need high-action pacing or large-scale war and politics.',
      ],
    },
    {
      heading: 'On Tales from Earthsea',
      type: 'bullets',
      bullets: [
        'Tales from Earthsea is a short story collection — five stories spanning different eras of Earthsea history.',
        'The story "Dragonfly" is the most important — it directly sets up characters and events in The Other Wind. Read it before The Other Wind.',
        "The other four stories are optional enrichment. Skip the collection and just read \"Dragonfly\" if you're impatient to reach the finale.",
        'All five stories are available in the collected editions (The Books of Earthsea: The Complete Illustrated Edition, 2018).',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Earthsea (1968) was one of the first fantasy series to centre characters of colour as the default — Ged is brown-skinned, most Earthsea islanders are dark-complexioned. Le Guin did this four years after the Civil Rights Act.',
        'A Wizard of Earthsea predates Hogwarts by almost 30 years — it established the wizard school template.',
        'Le Guin influenced N.K. Jemisin, Brandon Sanderson, Patrick Rothfuss, and China Miéville, among many others.',
      ],
    },
  ],
  darkness: [
    { label: 'Books 1–3', level: 2, desc: 'Adventure and consequence — death present but not dwelt upon' },
    { label: 'Books 4–6', level: 3, desc: 'More interior — trauma, loss, and questions without easy answers' },
  ],
  metaDescription:
    'The Earthsea reading order: all six books across the original trilogy and second trilogy, plus Tales from Earthsea — in the order Le Guin intended.',
  lastUpdated: '2026-05-15',
  shortName: 'Earthsea',
  finishedLabel: 'Finished Earthsea?',
  booksLikeSlug: 'a-wizard-of-earthsea',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['kingkiller', 'robin-hobb', 'memory-sorrow-thorn', 'discworld', 'wheel-of-time', 'witcher'],
};
