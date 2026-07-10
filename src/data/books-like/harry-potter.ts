import type { BooksLikeEntry } from '../books-like';

export const harryPotter: BooksLikeEntry = {
  slug: 'harry-potter',
  source: {
    title: 'Harry Potter Series',
    author: 'J.K. Rowling',
    db_slug: 'harry-potter-philosophers-stone',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg',
    darkness_level: 1,
    heat_level: 'Sweet Romance',
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
      'If you loved Harry Potter for the magic school atmosphere, the found family, and a hidden world layered on top of the ordinary one, start with The Magicians, The Name of the Wind, and Rivers of London.',
    why_people_love:
      "Harry Potter works on more levels than most people consciously notice. The world-building is dense and consistent (Diagon Alley, Quidditch, Hogwarts Express), but it never feels like an info-dump because it's delivered through a child encountering it for the first time alongside you. The school structure gives each book a natural rhythm: new year, new mystery, new Defence Against the Dark Arts teacher. But what most adults remember isn't actually the magic; it's the trio. Harry, Hermione, and Ron feel like a real friendship: unequal in ability, occasionally resentful, fiercely loyal when it counts. The series also earns its darkness. Books one and two are essentially cozy mysteries. Books four through seven are genuinely brutal. That tonal escalation, childhood adventure hardening into wartime, is harder to pull off than Rowling makes it look. And that's what most readers who 'want something like Harry Potter' are actually chasing: a world they believe in, people they'd miss, and stakes that grow into something real.",
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "Harry Potter works on more levels than most people consciously notice. The world-building is dense and consistent (Diagon Alley, Quidditch, the Hogwarts Express), but it never feels like an info-dump because it's delivered through a child encountering it for the first time alongside you.",
      },
      {
        type: 'labeled',
        label: 'The Trio:',
        text: "Harry, Hermione, and Ron feel like a real friendship: unequal in ability, occasionally resentful, fiercely loyal when it counts. What most adults remember isn't actually the magic; it's these three. The relationship between them is harder to write than it looks.",
      },
      {
        type: 'paragraph',
        text: "The series earns its darkness. Books one and two are essentially cozy mysteries. Books four through seven are genuinely brutal. That tonal escalation, childhood adventure hardening into wartime, is harder to pull off than Rowling makes it look.",
      },
      {
        type: 'warning',
        text: "The series is designed for a reader who grows with it. Adults rereading from the beginning will find the early books faster and lighter than memory suggests. The depth arrives with Goblet of Fire and doesn't let go.",
      },
    ],
  },
  aspects: [
    {
      heading:
        'For adults who grew up with Harry Potter: books that kept the wonder but lost the training wheels',
      recs: [
        {
          title: 'The Magicians',
          author: 'Lev Grossman',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: false,
          series: 'The Magicians',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "The most deliberate adult answer to Harry Potter ever written; Grossman has said as much. Quentin Coldwater discovers Brakebills, a secret college for magicians, and the book immediately starts dismantling the wish-fulfilment fantasy: magic is hard, boring to learn, and doesn't fix depression. The Narnia parallel running through the series is even more on-the-nose. If you want the same premise but with an adult's emotional register (grief, aimlessness, the problem of getting what you wanted), this is the direct line.",
          caveat: "Explicit content and a genuinely unlikeable protagonist by design; this is Harry Potter's premise run through cynicism and depression rather than warmth.",
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
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "If Harry Potter is magic for children and The Magicians is magic for depressed twenty-somethings, Jonathan Strange is magic for adults who like their historical fiction footnoted and their fairies genuinely threatening. Set in Napoleonic England, it imagines English magic returning after centuries of absence. The prose is dense, unhurried, and witty in the way of 19th-century novels. The Raven King is one of the most unsettling presences in modern fantasy.",
          caveat: "800 slow, footnoted pages; this asks for a different kind of patience than Rowling's brisk chaptered pace, and the payoff arrives gradually rather than in cliffhangers.",
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
        'If you loved Hogwarts: the school, the house rivalries, the lessons, the secret passages',
      recs: [
        {
          title: 'The Name of the Wind',
          author: 'Patrick Rothfuss',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Kingkiller Chronicle',
          series_number: 1,
          series_label: 'Trilogy (book 3 unfinished)',
          audiobook: true,
          note: "The University sections of Kvothe's story are the best magic school sequences since Hogwarts: sympathy (splitting your attention to power magic) is as internally consistent as Rowling's spell system and more intellectually interesting. Kvothe is a scholarship student surrounded by old-money peers, which gives the school dynamic genuine tension. The prose is beautiful and the first book is complete as a reading experience.",
          caveat: "Book 2 ends on a cliffhanger and book 3 has no release date. Go in knowing that.",
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
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Scholomance',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "A magic school that is actively trying to kill its students: maleficaria hide in the showers, the cafeteria food might be a trap, and graduation means running a gauntlet of monsters. El, the protagonist, has catastrophic dark magic she refuses to use. Novik builds the school as a real ecosystem with faction politics (popular kids survive better) and the frustration of a system rigged toward wealth. If you loved Hogwarts for its architecture and danger, this delivers both at higher intensity.",
          caveat: "Considerably darker and more lethal than any single Harry Potter book; the Scholomance doesn't protect its students the way Hogwarts nominally does.",
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
      ],
    },
    {
      heading:
        'If you loved the hidden magical world layered on top of the ordinary one',
      recs: [
        {
          title: 'Rivers of London',
          author: 'Ben Aaronovitch',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Rivers of London',
          series_number: 1,
          series_label: 'Series (9+ books)',
          audiobook: true,
          note: "PC Peter Grant is recruited into the one-man magical division of the Metropolitan Police after a ghost gives him witness testimony. The London of this series is exactly like the world of Harry Potter in structure: ordinary city with magical infrastructure hidden underneath, but filtered through the voice of a Black British cop who is sarcastic, observant, and very funny about bureaucracy. The magic system has real rules and the crimes have real consequences.",
          caveat: "Adult urban fantasy with a police-procedural structure rather than a school-year rhythm; the found-family warmth of the trio is replaced by workplace colleagues and case-of-the-book plotting.",
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
          title: 'Good Omens',
          author: 'Terry Pratchett & Neil Gaiman',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "Shares Harry Potter's core belief that the magical and mundane world overlap, and that the mundane world is funnier for having magic in it. An angel and a demon who have gone native on Earth try to stop the apocalypse because they like it here. British, warm, absurd, and genuinely funny. The humour is drier than Rowling's and the theology more explicit, but the sensibility (ordinary people caught in extraordinary circumstances, a world stranger and kinder than it looks) is the same.",
          caveat: "A single standalone comic novel, not a seven-book saga; there's no school, no long-form found family, and no multi-book escalation, just one very good apocalypse over one book.",
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
    {
      heading:
        'If you loved the way the story grows up with you: childhood adventure that hardens into real stakes and real loss as it goes',
      recs: [
        {
          title: 'His Dark Materials',
          slug: 'the-golden-compass',
          author: 'Philip Pullman',
          darkness_level: 4,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'His Dark Materials',
          series_number: 1,
          series_label: 'Trilogy + companion books',
          audiobook: true,
          note: "Northern Lights opens as an adventure: a runaway girl, a stolen friend, a journey to the Arctic. By The Amber Spyglass, Pullman is asking what consciousness is and what organised religion costs children, with stakes and body counts that would have been unthinkable in book one. The trilogy grows exactly the way Harry Potter does: an accessible entry point that trusts young readers to grow into something much harder. Lyra is the best child protagonist in British fantasy since Harry.",
          caveat: "The Amber Spyglass gets philosophically dense and divides readers who wanted more adventure; this escalates into ideas as much as into danger.",
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
          title: 'Sabriel',
          author: 'Garth Nix',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Old Kingdom',
          series_number: 1,
          series_label: 'Series (6 books)',
          audiobook: true,
          note: "Sabriel starts as a fairly contained mystery: her necromancer father has gone missing, and she has to cross a magical wall to find him. It doesn't stay contained. The back half of the book escalates into full necromantic combat with something ancient and starving for the dead, frightening in a way the opening chapters don't prepare you for. Nix keeps raising the stakes across the series the same way Rowling does across seven years at Hogwarts, except Sabriel gets there in one book.",
          caveat: "No school setting sustained across the book and no house rivalries; the boarding-school detail is brief backstory before the real necromancer plot takes over.",
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
  ],
  recommendations: [],
  related: [
    { title: 'Books Like The Hobbit', slug: 'the-hobbit' },
    {
      title: 'Books Like The Name of the Wind',
      slug: 'the-name-of-the-wind',
    },
    { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
  ],
};
