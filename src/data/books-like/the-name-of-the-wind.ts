import type { BooksLikeEntry } from '../books-like';

export const theNameOfTheWind: BooksLikeEntry = {
  slug: 'the-name-of-the-wind',
  source: {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    darkness_level: 3,
    heat_level: 'Closed Door',
    series: 'The Kingkiller Chronicle',
    series_number: 1,
    tropes: [
      'Unreliable Narrator',
      'Magic University',
      'Legendary Hero',
      'Slow Burn Romance',
      'Rags to Riches',
      'Hard Magic System',
    ],
    angle: 'Lyrical Epic Fantasy',
    answer_line:
      'If you loved The Name of the Wind for the lyrical prose, gifted outsider lead, university arc, and storytelling-within-story atmosphere, start with Jonathan Strange & Mr Norrell, The Magicians, and Mistborn: The Final Empire.',
    why_people_love:
      "The Name of the Wind earns its reputation through one thing that almost no other fantasy novel manages: prose that is genuinely, consistently beautiful. Rothfuss writes sentences you stop and reread. The frame narrative (an innkeeper who was once the most famous man in the world, now telling his own story) creates a melancholy that runs under everything, because you know the legend didn't end well. Kvothe is arrogant and brilliant and often wrong in ways that cost him, which makes him one of the more human protagonists in epic fantasy. The magic system feels like chemistry and music rather than physics, and the university sections have a grounded, lived-in quality that's rare in the genre. Fair warning: this is the first book of a trilogy that has been unfinished since 2011, with no confirmed publication date for book three. Read it knowing this.",
    why_people_love_rich: [
      { type: 'paragraph', text: "The Name of the Wind earns its reputation through one thing that almost no other fantasy novel manages: prose that is genuinely, consistently beautiful. Rothfuss writes sentences you stop and reread. The frame narrative (an innkeeper who was once the most famous man in the world, now telling his own story to a chronicler in a quiet village) creates a melancholy that runs under everything, because you know before the first chapter ends that the legend didn't finish well." },
      { type: 'labeled', label: 'Kvothe:', text: "He is arrogant and brilliant and often wrong in ways that cost him, which makes him one of the more human protagonists in epic fantasy. The magic system (Sympathy, Naming, the Alar) feels like chemistry and music rather than physics, and the university sections have a grounded, lived-in quality that's rare in the genre. What makes him exceptional isn't that he's infallible; it's that his failures are as precisely written as his successes, and the gap between the legend the world tells about him and the man sitting in the tavern is the book's central tension." },
      { type: 'paragraph', text: "The frame narrative is the structural gambit: Kvothe knows his own story and is choosing what to tell and what to omit, which means the reader is always aware of a layer the narrator isn't showing them. This is what separates the series from other chosen-one bildungsromans. It is aware of itself as myth-making, and Rothfuss built that self-awareness into the architecture from the first page." },
      { type: 'warning', text: "The Name of the Wind is the first book of an unfinished trilogy. Book two (The Wise Man's Fear) was published in 2011; book three has no confirmed publication date. Many readers choose not to start the series for this reason alone, and that is a reasonable decision. The series also has structural debt (many threads opened in book one and two are unresolved) and the resolution depends entirely on a third book that may not arrive. Read knowing this." },
    ],
  },
  aspects: [
    {
      heading: 'If you loved the prose and the storytelling craft...',
      recs: [
        {
          title: 'Jonathan Strange & Mr Norrell',
          author: 'Susanna Clarke',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "The only fantasy novel that can match Rothfuss for prose distinction. But they're doing entirely different things with it. Clarke writes in the style of a Victorian historian cataloguing impossible events, complete with footnotes, and the effect is hypnotic. Magic here feels genuinely strange and unknowable. If you read Name of the Wind primarily for the voice and the atmosphere, this is the closest equivalent. And it has the advantage of being complete.",
          caveat: "extremely slow, and asks for more patience than Rothfuss ever does.",
          tags: [
            'Literary Prose',
            'Standalone',
            'Historical Setting',
            'Strange Magic',
            'Unique Voice',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell&affiliate=122720',
        },
        {
          title: 'The Lies of Locke Lamora',
          author: 'Scott Lynch',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Gentleman Bastard',
          series_number: 1,
          series_label: 'Series (ongoing)',
          audiobook: true,
          note: "Where Rothfuss builds atmosphere, Lynch builds momentum. The Gentleman Bastards are con artists in a city that feels as lived-in as Tarbean, and Locke has the same outsider-genius quality as Kvothe: brilliant, scrappy, too clever for his own good. The banter is exceptional and the schemes are elaborately satisfying.",
          caveat: "darker and more violent, with much less interiority. You're in the plot rather than in a character's head.",
          tags: [
            'Heist',
            'Con Artists',
            'Morally Grey Hero',
            'Dark City',
            'Found Family',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the magic university and the underdog genius arc...',
      recs: [
        {
          title: 'The Magicians',
          author: 'Lev Grossman',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: false,
          series: 'The Magicians',
          series_number: 1,
          series_label: 'Series (trilogy)',
          audiobook: true,
          note: "A magic university novel that takes Rothfuss's premise and deliberately darkens it. Quentin Coldwater is Kvothe without the self-assurance (equally talented, far more self-destructive) and Brakebills has the same rigorous, rules-based approach to magic as the University. The prose is sharp and the deconstruction of fantasy expectations is bracingly honest.",
          caveat: "this is a deeply melancholy book that takes seriously what it would actually feel like to get everything you wanted. Not a comfort read.",
          tags: [
            'Magic University',
            'Deconstruction',
            'Dark Tone',
            'Coming of Age',
            'Hard Magic',
          ],
          warning:
            'Depression, suicidal ideation, substance abuse, sexual content.',
          amazon_url:
            'https://www.amazon.com/s?k=The+Magicians+Lev+Grossman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Magicians+Lev+Grossman&affiliate=122720',
        },
        {
          title: 'The Will of the Many',
          author: 'James Islington',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Hierarchy',
          series_number: 1,
          series_label: 'Series (ongoing)',
          audiobook: true,
          note: "The most structurally similar book to Name of the Wind published in the last decade. Vis Telimus is hiding who he really is inside an elite Roman-inspired academy, supernaturally gifted at its core skill, and the whole book is layered over a frame mystery you sense but can't yet name. Where Kvothe's genius is in sympathy and music, Vis's is in a hierarchy-based will system. Islington writes the rules with the same rigour Rothfuss brings to Sympathy. The unreliable-narrator undertones are as close as anyone has come to replicating what Rothfuss does structurally. Unlike Kingkiller, the series is actively being written.",
          tags: [
            'Hidden Identity',
            'Academy Setting',
            'Underdog Genius',
            'Political Intrigue',
            'Frame Mystery',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Will+of+the+Many+James+Islington&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Will+of+the+Many+Islington&affiliate=122720',
        },
      ],
    },
    {
      heading: 'If you loved the hard magic system with internal logic...',
      recs: [
        {
          title: 'Mistborn: The Final Empire',
          slug: 'the-final-empire',
          author: 'Brandon Sanderson',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Mistborn',
          series_number: 1,
          series_label: 'Series (trilogy + sequel trilogy)',
          audiobook: true,
          note: "The obvious contrast. Where Sympathy feels like chemistry (intuitive, physical, dangerous when you're tired), Allomancy feels like physics: each metal does one thing, you can map it, and Sanderson never cheats. If the rigour of Rothfuss's magic system was your hook, Sanderson is the natural next step.",
          caveat: "the prose is functional rather than beautiful, which will be an adjustment. The trade-off is a complete, satisfying story with a real ending.",
          tags: [
            'Hard Magic System',
            'Underdog Hero',
            'Heist',
            'Complete Series',
            'World-Building',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Mistborn+Final+Empire+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson&affiliate=122720',
        },
        {
          title: 'A Deadly Education',
          author: 'Naomi Novik',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Scholomance',
          series_number: 1,
          series_label: 'Series (trilogy)',
          audiobook: true,
          note: "Magic here works like Sympathy: classified, costed, and never charitable. Every spell has an affinity, a difficulty tier, and a consequence if you push past what your power allows. The Scholomance treats magic as an engineering discipline rather than an art, and El approaches it with the same precise, exhausted expertise Kvothe brings to his Sympathy work. Lighter in register but the systematic rigour is real.",
          caveat: "more YA in energy, lower stakes.",
          tags: [
            'Hard Magic System',
            'Magic School',
            'Sardonic Voice',
            'Survival',
            'Complete Trilogy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Deadly+Education+Naomi+Novik&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Deadly+Education+Novik&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the literary prose and character interiority...',
      recs: [
        {
          title: "Assassin's Apprentice",
          slug: 'assassins-apprentice',
          author: 'Robin Hobb',
          darkness_level: 4,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Farseer Trilogy',
          series_number: 1,
          series_label: 'Series (trilogy)',
          audiobook: true,
          note: "Robin Hobb writes the kind of prose Rothfuss readers recognise: deeply interior, character-first, willing to sit in a moment rather than push plot forward. Fitz is as gifted as Kvothe (trained in assassination and a magic called Skill), as isolated, and as interesting in his failures as his successes. The trilogy is complete and delivers a full emotional arc.",
          caveat: "Hobb is more emotionally punishing than Rothfuss. She commits to consequences in ways Rothfuss defers. Don't start this if you need victories.",
          tags: [
            'Literary Prose',
            'Complete Trilogy',
            'Coming of Age',
            'Court Intrigue',
            'Gifted Outsider',
          ],
          amazon_url:
            "https://www.amazon.com/s?k=Assassin%27s+Apprentice+Robin+Hobb&tag=librariancura-20",
          bookshop_url:
            "https://bookshop.org/search?keywords=Assassin%27s+Apprentice+Robin+Hobb&affiliate=122720",
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
    { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
    { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
  ],
};
