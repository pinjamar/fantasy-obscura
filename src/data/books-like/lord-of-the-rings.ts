import type { BooksLikeEntry } from '../books-like';

export const lordOfTheRings: BooksLikeEntry = {
  slug: 'lord-of-the-rings',
  source: {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    reading_order_slug: 'middle-earth',
    db_slug: 'the-fellowship-of-the-ring',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg',
    darkness_level: 2,
    heat_level: null,
    series: 'The Lord of the Rings',
    series_number: 1,
    tropes: [
      'Epic Quest',
      'Dark Lord',
      'Ancient Evil',
      'Reluctant Hero',
      'Fellowship of Companions',
      'Maps & Deep Lore',
      'Good vs Evil',
      'World-Building',
    ],
    angle: 'Epic Quest Fantasy',
    answer_line:
      'If you loved The Lord of the Rings for the epic quest, deep worldbuilding, mythic weight, and fellowship-driven journey, start with The Eye of the World, The Dragonbone Chair, and A Wizard of Earthsea.',
    why_people_love: `The Fellowship of the Ring is the reason the word "epic" exists in fantasy. Tolkien built not just a story but an entire world — with languages, histories, genealogies, and myths stretching back thousands of years before the events of the novel — and somehow made all of that feel lived-in rather than encyclopaedic. What draws readers back is not the plot mechanics but the texture: the Shire's quiet domesticity against the enormity of what's coming, the sense that every hill and river has a name and a legend, the way the Fellowship itself — a dwarf, an elf, men, hobbits, a wizard — feels like a genuine group of people rather than a convenient lineup. The central argument of the book is moral rather than strategic: the Ring cannot be used against Sauron because power corrupts the one who wields it, and the only answer is to destroy it. That idea, paired with the image of the most ordinary people in the world carrying the most dangerous object, is what makes the story feel permanent.`,
    why_people_love_rich: [
      { type: 'paragraph', text: "The Fellowship of the Ring is the reason the word 'epic' exists in fantasy. Tolkien built not just a story but an entire world — with languages, histories, genealogies, and myths stretching back thousands of years — and somehow made all of that feel lived-in rather than encyclopaedic. What draws readers back is not the plot mechanics but the texture: the Shire's quiet domesticity against the enormity of what's coming." },
      { type: 'labeled', label: 'The Shire:', text: "The novel begins in a place of perfect safety and comfort, and Tolkien spends chapters establishing it before the Ring's history arrives. That patient establishment is not slowness — it is the source of all the later stakes. You understand what is being risked because you were allowed to love it first." },
      { type: 'paragraph', text: "The central argument of the book is moral rather than strategic: the Ring cannot be used against Sauron because power corrupts the one who wields it, and the only answer is to destroy it. That idea, paired with the image of the most ordinary people in the world carrying the most dangerous object, is what makes the story feel permanent." },
      { type: 'warning', text: "Tolkien's prose is slower and more digressive than most modern fantasy — he will spend pages on songs, genealogies, and historical context that have no immediate plot function. This is a feature, not a flaw, but readers who want pace over texture will struggle. Fellowship ends with the Fellowship broken; the resolution requires all three volumes." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the epic quest and the fellowship of companions...',
      recs: [
        {
          title: 'The Eye of the World',
          slug: 'the-eye-of-the-world',
          author: 'Robert Jordan',
          darkness_level: 3,
          heat_level: null,
          standalone: false,
          series: 'The Wheel of Time',
          series_number: 1,
          series_label: 'Series (14 books, complete)',
          audiobook: true,
          note: `The most structurally faithful heir to Fellowship of the Ring. Jordan consciously modelled the opening on Tolkien — a village of ordinary young people disrupted by a dark messenger, an urgent departure, a world that turns out to be far larger and more dangerous than they knew. The group dynamic across multiple POVs, the Aes Sedai as a Gandalf-equivalent (but more ambiguous), the ancient evil who was sealed away and is stirring again — all of it is Tolkien filtered through a more modern epic sensibility.`,
          caveat: "Jordan's prose is denser and less poetic than Tolkien's, and the series expands enormously in scope before eventually converging; readers who want something finished should know the payoff is 14 books away.",
          tags: [
            'Epic Quest',
            'Ancient Evil',
            'Multiple POVs',
            'Ensemble Cast',
            'Deep World-Building',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Eye+of+the+World+Robert+Jordan&affiliate=122720',
        },
        {
          title: 'The Way of Kings',
          slug: 'the-way-of-kings',
          author: 'Brandon Sanderson',
          darkness_level: 3,
          heat_level: null,
          standalone: false,
          series: 'The Stormlight Archive',
          series_number: 1,
          series_label: 'Series (10 books planned, 5 released)',
          audiobook: true,
          note: `The most ambitious modern attempt at Tolkien's scale. Sanderson builds Roshar with the same density of history, culture, and cosmology — in-world documents, epigraphs, and flashback chapters that gradually reveal a world with thousands of years of buried truth. The ensemble cast is distinct and well-developed, and the threat (the Desolations returning) operates on the same ancient-evil timescale as Sauron. At 1000+ pages, The Way of Kings rewards patience with the same sense of immersion as Fellowship.`,
          caveat: "Sanderson's prose is functional rather than lyrical — if you came to Tolkien primarily for the writing, this will feel different; if you came for the world and the stakes, this delivers both.",
          tags: [
            'Epic World-Building',
            'Ancient Threat',
            'Multiple POVs',
            'Magic System',
            'Long Series',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Way+of+Kings+Brandon+Sanderson&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the depth of world-building and the sense of deep, ancient history...',
      recs: [
        {
          title: 'The Dragonbone Chair',
          slug: 'the-dragonbone-chair',
          author: 'Tad Williams',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Memory, Sorrow and Thorn',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: `Williams wrote Memory, Sorrow and Thorn in explicit conversation with Tolkien, and The Dragonbone Chair is the most direct successor to Fellowship of the Ring in the genre. The world is built on layers of history stretching back thousands of years — multiple mythological traditions, each partially true, each partially distorted by the passage of time. The threat is an ancient evil returning through human weakness and political fracture, and the young protagonist is a kitchen scullion who becomes involved in events far larger than his own life. George R.R. Martin has cited this trilogy as a major influence on A Song of Ice and Fire.`,
          caveat: "the first book is slow to start and ends on an open note; the payoff builds across the full trilogy.",
          tags: [
            'Deep History',
            'Ancient Evil',
            'Multiple POVs',
            'Classic Epic Fantasy',
            'Political Intrigue',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Dragonbone+Chair+Tad+Williams&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Dragonbone+Chair+Tad+Williams&affiliate=122720',
        },
        {
          title: 'The Priory of the Orange Tree',
          slug: 'the-priory-of-the-orange-tree',
          author: 'Samantha Shannon',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: `An 800-page standalone built with the same care for depth that Tolkien applied to Middle-earth. Shannon constructs a world with multiple civilisations, centuries of religious schism, rival interpretations of the same historical events, and a threat (an ancient dragon) that works on Tolkien's timeline of ancient evil sealed away and returning. The multiple POV structure — set across different cultures with different relationships to the same dragon mythology — deliberately echoes how Tolkien's world looks different from different vantage points. Recommended especially for Tolkien readers who want the scale and the lore in a single complete book rather than a multi-volume series.`,
          tags: [
            'Dragon Lore',
            'Multiple POVs',
            'Deep History',
            'Standalone Epic',
            'Queer Romance',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Priory+Orange+Tree+Samantha+Shannon&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved that ordinary people carry the weight of the world...',
      recs: [
        {
          title: 'A Wizard of Earthsea',
          slug: 'a-wizard-of-earthsea',
          author: 'Ursula K. Le Guin',
          darkness_level: 2,
          heat_level: null,
          standalone: false,
          series: 'Earthsea Cycle',
          series_number: 1,
          series_label: 'Series (6 books, each standalone)',
          audiobook: true,
          note: `Le Guin wrote Earthsea in direct conversation with Tolkien — the same belief in secondary world as a moral space, the same respect for myth and geography, the same conviction that power comes with a cost. The prose is the most Tolkien-adjacent of any modern fantasy writer: economical, weighty, and built to last. At under 200 pages, it is the opposite of Fellowship's scale — but it does everything Tolkien does with character and theme at a fraction of the length. Essential reading for anyone who loved what Fellowship was doing morally, not just narratively.`,
          tags: [
            'Classic Fantasy',
            'Humble Origins',
            'Moral Weight',
            'Coming of Age',
            'True Names',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Ursula+Le+Guin&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Wizard+Earthsea+Ursula+Le+Guin&affiliate=122720',
        },
        {
          title: 'The Goblin Emperor',
          slug: 'the-goblin-emperor',
          author: 'Katherine Addison',
          darkness_level: 2,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: `The most direct modern parallel to Frodo's arc: a protagonist who is not supposed to be important, who did not ask for the burden placed on him, and who responds to it not with heroic self-confidence but with quiet determination and fundamental decency. Maia inherits an empire he was never prepared for and navigates it without becoming ruthless — and the novel is quietly radical for insisting this is the right response rather than naivety. The emotional argument is the same as Fellowship: that small, kind people can carry enormous weight, and that their smallness is not a weakness.`,
          caveat: "the connection is thematic rather than structural; very different in plot and setting.",
          tags: [
            'Kind Protagonist',
            'Unexpected Greatness',
            'Court Intrigue',
            'Standalone',
            'Hopeful',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Goblin+Emperor+Katherine+Addison&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the prose and the mythic register — a world where legend is real, magic is ancient, and the writing treats all of it with the weight it deserves...',
      recs: [
        {
          title: 'Jonathan Strange & Mr Norrell',
          slug: 'jonathan-strange-mr-norrell',
          author: 'Susanna Clarke',
          darkness_level: 3,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: `Clarke spent ten years writing this novel, and it shows. Two English magicians in the Napoleonic era argue over the proper use of magic while a Faerie king interferes with both of them — but the real subject is the world that existed before living memory, when magic was everywhere and the Raven King ruled northern England. The footnotes carry entire subplots about ancient magical history; the prose sounds like it was written in the period it depicts; and the sense of a vast secondary mythology operating behind the action is exactly what Tolkien readers respond to. Clarke treats English myth with the same seriousness Tolkien applied to Norse and Finnish sources. Standalone; the second half is considerably darker and stranger than the first.`,
          tags: [
            'Historical Fantasy',
            'Ancient Magic',
            'Literary Prose',
            'Mythic Register',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell+Clarke&affiliate=122720',
        },
        {
          title: 'The Once and Future King',
          slug: 'the-once-and-future-king',
          author: 'T.H. White',
          darkness_level: 2,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: `White's retelling of the Arthurian legend takes the same stance as Tolkien on the relation between myth and meaning: these things happened, they mattered, and the reason we still remember them is that they were true in the only sense that counts. The young Arthur is tutored by a Merlin living backwards through time, and the novel tracks the whole arc of Camelot from idealism to inevitable failure. White and Tolkien were writing in the same English literary tradition of taking mythology seriously as a moral framework — for readers who loved that quality in Fellowship specifically, this is its closest Arthurian parallel.`,
          caveat: "the four parts vary significantly in tone; the first (The Sword in the Stone) is almost a children's book; the later parts are much heavier.",
          tags: [
            'Arthurian Myth',
            'Moral Weight',
            'Classic Fantasy',
            'Elegiac',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Once+and+Future+King+T.H.+White&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Once+and+Future+King+T.H.+White&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like The Hobbit', slug: 'the-hobbit' },
    { title: 'Books Like The Eye of the World', slug: 'the-wheel-of-time' },
    { title: 'Books Like A Game of Thrones', slug: 'a-game-of-thrones' },
  ],
};
