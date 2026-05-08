import type { BooksLikeEntry } from '../books-like';

export const harryPotter: BooksLikeEntry = {
  slug: 'harry-potter',
  source: {
    title: 'Harry Potter Series',
    author: 'J.K. Rowling',
    db_slug: 'harry-potter-philosophers-stone',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg',
    darkness_level: 2,
    heat_level: null,
    series: 'Harry Potter',
    series_number: 1,
    tropes: [
      'Magic School',
      'Chosen One',
      'Found Family',
      'Good vs Evil',
      'Coming of Age',
      'Hidden Magical World',
      'Mentor Figure',
      'Mystery per Book',
    ],
    angle: 'Magic School & Hidden Worlds',
    answer_line:
      'If you loved Harry Potter for the magic school atmosphere, the found family, and a hidden world layered on top of the ordinary one — start with The Magicians, His Dark Materials, and The Name of the Wind.',
    why_people_love:
      "Harry Potter works on more levels than most people consciously notice. The world-building is dense and consistent — Diagon Alley, Quidditch, Hogwarts Express — but it never feels like an info-dump because it's delivered through a child encountering it for the first time alongside you. The school structure gives each book a natural rhythm: new year, new mystery, new Defence Against the Dark Arts teacher. But what most adults remember isn't actually the magic — it's the trio. Harry, Hermione, and Ron feel like a real friendship: unequal in ability, occasionally resentful, fiercely loyal when it counts. The series also earns its darkness. Books one and two are essentially cozy mysteries. Books four through seven are genuinely brutal. That tonal escalation — childhood adventure hardening into wartime — is harder to pull off than Rowling makes it look. And that's what most readers who 'want something like Harry Potter' are actually chasing: a world they believe in, people they'd miss, and stakes that grow into something real.",
  },
  aspects: [
    {
      heading:
        'For adults who grew up with Harry Potter — books that kept the wonder but lost the training wheels',
      recs: [
        {
          title: 'The Magicians',
          author: 'Lev Grossman',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780452296299-L.jpg',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Magicians',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "The most deliberate adult answer to Harry Potter ever written — Grossman has said as much. Quentin Coldwater discovers Brakebills, a secret college for magicians, and the book immediately starts dismantling the wish-fulfilment fantasy: magic is hard, boring to learn, and doesn't fix depression. The Narnia parallel running through the series is even more on-the-nose. If you want the same premise but with an adult's emotional register — grief, aimlessness, the problem of getting what you wanted — this is the direct line. The protagonist is not particularly likeable, which is part of the point.",
          tags: [
            'Magic School',
            'Adult Fantasy',
            'Deconstruction',
            'Depression',
            'Portal World',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Magicians+Lev+Grossman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Magicians+Lev+Grossman&affiliate=122720',
        },
        {
          title: 'Jonathan Strange & Mr Norrell',
          author: 'Susanna Clarke',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765356154-L.jpg',
          darkness_level: 3,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: "If Harry Potter is magic for children and The Magicians is magic for depressed twenty-somethings, Jonathan Strange is magic for adults who like their historical fiction footnoted and their fairies genuinely threatening. Set in Napoleonic England, it imagines English magic returning after centuries of absence. The prose is dense, unhurried, and witty in the way of 19th-century novels — not for everyone, but if it clicks, it's unlike anything else. The Raven King is one of the most unsettling presences in modern fantasy. Genuinely long and slow, but rewarding.",
          tags: [
            'British Magic',
            'Historical Fantasy',
            'Literary',
            'Fairies',
            'Slow Burn',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved Hogwarts — the school, the house rivalries, the lessons, the secret passages',
      recs: [
        {
          title: 'The Name of the Wind',
          author: 'Patrick Rothfuss',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
          darkness_level: 2,
          heat_level: null,
          standalone: false,
          series: 'The Kingkiller Chronicle',
          series_number: 1,
          series_label: 'Trilogy (book 3 unfinished)',
          audiobook: true,
          note: "The University sections of Kvothe's story are the best magic school sequences since Hogwarts — sympathy (splitting your attention to power magic) is as internally consistent as Rowling's spell system and more intellectually interesting. Kvothe is a scholarship student surrounded by old-money peers, which gives the school dynamic genuine tension. The prose is beautiful and the first book is complete as a reading experience. Caveat: book 2 ends on a cliffhanger and book 3 has no release date. Go in knowing that.",
          tags: [
            'Magic School',
            'Prodigy Hero',
            'Scholarship Student',
            'Lore-Heavy',
            'Beautiful Prose',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
        },
        {
          title: 'A Deadly Education',
          author: 'Naomi Novik',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780593128480-L.jpg',
          darkness_level: 3,
          heat_level: null,
          standalone: false,
          series: 'The Scholomance',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: 'A magic school that is actively trying to kill its students — maleficaria hide in the showers, the cafeteria food might be a trap, and graduation means running a gauntlet of monsters. El, the protagonist, has catastrophic dark magic she refuses to use. Novik builds the school as a real ecosystem with faction politics (popular kids survive better) and the frustration of a system rigged toward wealth. Funnier than it sounds, and the trilogy pays off. If you loved Hogwarts for its architecture and danger, this delivers both at higher intensity.',
          tags: [
            'Magic School',
            'Survival',
            'Dark Humor',
            'Anti-Hero Protagonist',
            'Loner Heroine',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Deadly+Education+Naomi+Novik&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Deadly+Education+Naomi+Novik&affiliate=122720',
        },
        {
          title: 'Sabriel',
          author: 'Garth Nix',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780064471831-L.jpg',
          darkness_level: 3,
          heat_level: null,
          standalone: false,
          series: 'The Old Kingdom',
          series_number: 1,
          series_label: 'Series (6 books)',
          audiobook: true,
          note: "Sabriel grows up in a boarding school on one side of a magical wall, knowing that on the other side her father controls the dead. When he goes missing she has to cross over and use the necromantic bells she barely understands. The magic system — seven bells, each with a different power over the dead — is Rowling-level inventive and the world is genuinely eerie. Sabriel herself is the template for the competent, quietly courageous heroine that YA fantasy spent a decade trying to replicate. Doesn't get nearly enough credit.",
          tags: [
            'Necromancer',
            'Magic System',
            'Young Hero',
            'Dark Atmosphere',
            'Wall Between Worlds',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Sabriel+Garth+Nix&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Sabriel+Garth+Nix&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the hidden magical world layered on top of the ordinary one',
      recs: [
        {
          title: 'Rivers of London',
          author: 'Ben Aaronovitch',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780345524591-L.jpg',
          darkness_level: 2,
          heat_level: null,
          standalone: false,
          series: 'Rivers of London',
          series_number: 1,
          series_label: 'Series (9+ books)',
          audiobook: true,
          note: 'PC Peter Grant is recruited into the one-man magical division of the Metropolitan Police after a ghost gives him witness testimony. The London of this series is exactly like the world of Harry Potter in structure — ordinary city with magical infrastructure hidden underneath — but filtered through the voice of a Black British cop who is sarcastic, observant, and very funny about bureaucracy. The magic system has real rules and the crimes have real consequences. If Diagon Alley is your happy place, this series is the adult version of believing London has hidden layers.',
          tags: [
            'Urban Fantasy',
            'Hidden Magic',
            'London',
            'Detective',
            'Witty Narrator',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Rivers+of+London+Ben+Aaronovitch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Rivers+of+London+Aaronovitch&affiliate=122720',
        },
        {
          title: 'His Dark Materials',
          slug: 'the-golden-compass',
          author: 'Philip Pullman',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780375823459-L.jpg',
          darkness_level: 3,
          heat_level: null,
          standalone: false,
          series: 'His Dark Materials',
          series_number: 1,
          series_label: 'Trilogy + companion books',
          audiobook: true,
          note: 'The closest spiritual companion to Harry Potter in British fantasy — a child protagonist, an institution (Jordan College) that mirrors Hogwarts in its sense of ancient privilege and hidden knowledge, and a story that escalates from adventure into something genuinely philosophical about free will, death, and the Church. Lyra is the best child protagonist in British fantasy since Harry. The trilogy gets harder and stranger as it goes; The Amber Spyglass divides people. But Northern Lights / The Golden Compass is close to perfect as an opening volume.',
          tags: [
            'Parallel Worlds',
            'Child Protagonist',
            'Daemons',
            'British',
            'Coming of Age',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=His+Dark+Materials+Philip+Pullman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=His+Dark+Materials+Philip+Pullman&affiliate=122720',
        },
        {
          title: 'Good Omens',
          author: 'Terry Pratchett & Neil Gaiman',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780060853976-L.jpg',
          darkness_level: 2,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: "Shares Harry Potter's core belief that the magical and mundane world overlap — and that the mundane world is funnier for having magic in it. An angel and a demon who have gone native on Earth try to stop the apocalypse because they like it here. British, warm, absurd, and genuinely funny. The humour is drier than Rowling's and the theology more explicit, but the sensibility — ordinary people caught in extraordinary circumstances, the world is stranger and kinder than it looks — is the same. Best read without having seen the Amazon show first.",
          tags: [
            'Angels & Demons',
            'Comedy',
            'British',
            'Apocalypse',
            'Buddy Comedy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Good+Omens+Terry+Pratchett+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Good+Omens+Pratchett+Gaiman&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [
    {
      title: 'The Magicians',
      author: 'Lev Grossman',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780452296299-L.jpg',
      darkness_level: 3,
      heat_level: 'Closed Door',
      tags: ['Magic School', 'Adult Fantasy', 'Deconstruction'],
      why: 'The most direct adult answer to Harry Potter — Brakebills is Hogwarts filtered through depression, disappointment, and the question of what magic actually solves. If you grew up with HP and want the same premise taken seriously, start here.',
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=The+Magicians+Lev+Grossman&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=The+Magicians+Lev+Grossman&affiliate=122720',
    },
    {
      title: 'His Dark Materials',
      slug: 'the-golden-compass',
      author: 'Philip Pullman',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780375823459-L.jpg',
      darkness_level: 3,
      heat_level: null,
      tags: [
        'Parallel Worlds',
        'Child Protagonist',
        'British',
        'Coming of Age',
      ],
      why: 'The closest spiritual companion to Harry Potter in British fantasy — Jordan College feels like Hogwarts, Lyra is as good a protagonist as Harry, and the trilogy escalates from adventure into something deeply serious about death, consciousness, and authority. Reads beautifully as an adult.',
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=His+Dark+Materials+Philip+Pullman&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=His+Dark+Materials+Philip+Pullman&affiliate=122720',
    },
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
      darkness_level: 2,
      heat_level: null,
      tags: [
        'Magic School',
        'Scholarship Student',
        'Lore-Heavy',
        'Beautiful Prose',
      ],
      why: 'The University chapters are the best magic school sequences since Hogwarts — a consistent, intellectually interesting magic system, a protagonist who is poor among the privileged, and a school with real factions and politics. Caveat: the trilogy is unfinished.',
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
    },
    {
      title: 'Jonathan Strange & Mr Norrell',
      author: 'Susanna Clarke',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780765356154-L.jpg',
      darkness_level: 3,
      heat_level: null,
      tags: ['British Magic', 'Historical Fantasy', 'Literary', 'Fairies'],
      why: 'English magic returning after centuries of absence, set against Napoleonic England. Dense, witty, footnoted — the adult version of believing Britain has magical history running beneath the surface. The Raven King is one of the most unsettling presences in modern fantasy.',
      standalone: true,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell&affiliate=122720',
    },
    {
      title: 'A Deadly Education',
      author: 'Naomi Novik',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780593128480-L.jpg',
      darkness_level: 3,
      heat_level: null,
      tags: [
        'Magic School',
        'Survival',
        'Dark Humor',
        'Anti-Hero Protagonist',
      ],
      why: 'A magic school that is actively trying to kill you — monsters in the showers, politics in the cafeteria, and graduation as a gauntlet. The social structure (popular kids survive better) gives the Hogwarts-style school setting real stakes. Funnier than it sounds.',
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=A+Deadly+Education+Naomi+Novik&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=A+Deadly+Education+Naomi+Novik&affiliate=122720',
    },
    {
      title: 'Rivers of London',
      author: 'Ben Aaronovitch',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780345524591-L.jpg',
      darkness_level: 2,
      heat_level: null,
      tags: ['Urban Fantasy', 'Hidden Magic', 'London', 'Detective', 'Witty'],
      why: 'A London cop recruited into the magical division of the Met — same structural premise as Harry Potter (ordinary world with magical infrastructure hidden underneath) but filtered through a sarcastic British police procedural. If Diagon Alley is your happy place, this is the adult version.',
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=Rivers+of+London+Ben+Aaronovitch&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=Rivers+of+London+Aaronovitch&affiliate=122720',
    },
  ],
  related: [
    { title: 'Books Like The Hobbit', slug: 'the-hobbit' },
    {
      title: 'Books Like The Name of the Wind',
      slug: 'the-name-of-the-wind',
    },
    { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
  ],
};
