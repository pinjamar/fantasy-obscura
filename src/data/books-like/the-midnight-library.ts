import type { BooksLikeEntry } from '../books-like';

export const theMidnightLibrary: BooksLikeEntry = {
  slug: 'the-midnight-library',
  source: {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    db_slug: 'the-midnight-library',
    darkness_level: 2,
    heat_level: 'Sweet Romance',
    series: null,
    series_number: null,
    tropes: [
      'Parallel Lives',
      'Second Chances',
      'Depression and Healing',
      'What If',
      'Magical Realism',
      'Life Regrets',
      'Found Purpose',
    ],
    angle:
      'Magical Realism About Regret, Choice, and Why Your Life Is Worth Living',
    answer_line:
      'If you loved The Midnight Library for its magical premise, its gentle philosophy about regret and possibility, and its emotional warmth, start with The Starless Sea, The House in the Cerulean Sea, and The Night Circus.',
    why_people_love:
      "The Midnight Library works because the premise is a perfect emotional delivery mechanism: Nora Seed, at the lowest point of her life, finds herself in a library between life and death where every book contains an alternative version of her life, every path not taken, every decision unmade. It is a novel about depression that does not flinch from the reality of it, but it is also genuinely funny and warm in a way that grief novels often aren't. Haig's philosophy is worn lightly: the book is interested in what makes a life worth living, but it arrives at its answers through story rather than argument. The ending is earned rather than prescribed. People who love this book tend to love it intensely, reading it at exactly the right moment; people who find it sentimental usually encountered it at the wrong one.",
    why_people_love_rich: [
      { type: 'paragraph', text: "The Midnight Library works because the premise is a perfect emotional delivery mechanism. Nora Seed, at the lowest point of her life, finds herself in a library between life and death where every book contains an alternative version of her life, every path not taken, every decision unmade. Haig is interested in what makes a life worth living, but he arrives at his answers through story rather than argument, which is how philosophy lands when it actually changes people rather than simply persuading them." },
      { type: 'labeled', label: 'The Books:', text: "Each one is a version of Nora who made a different choice at a pivotal moment: became a swimmer, stayed with the band, moved to the countryside. The cumulative weight of all these possible lives is the mechanism through which the book does its emotional work. Haig is honest about what they find inside each book: not that the other life was worse, but that no life is free of regret, and that the particular regrets that feel like proof of failure are not unique to the life you have." },
      { type: 'paragraph', text: "The book is genuinely funny and warm in a way that grief novels often aren't. Haig's philosophy is worn lightly, and the ending is earned rather than prescribed. People who love this book tend to love it intensely, reading it at exactly the right moment; people who find it sentimental usually encountered it at the wrong one." },
      { type: 'warning', text: "The Midnight Library opens with a character at the point of ending her life. The darkness of that opening is real, and readers should approach with that knowledge. The book becomes warmer as it progresses but does not avoid the subject. The philosophical framework is gentle and accessible rather than rigorous; readers who want argument rather than story may find the resolution too easy. It is a short book that reaches its conclusions within its own length rather than building toward them across a longer arc." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the magical space between life and death: the impossible library itself...',
      recs: [
        {
          title: 'The Starless Sea',
          slug: 'the-starless-sea',
          author: 'Erin Morgenstern',
          darkness_level: 2,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "A vast underground library-world that exists outside normal time and space, full of doors that lead everywhere and stories that bleed into each other. Morgenstern's world has the same quality as Haig's Midnight Library: a place that should not exist, rendered with enough sensory detail that you grieve when the protagonist has to leave. The emotional register is more melancholy and less philosophical than Haig's; The Starless Sea is about story and longing rather than regret and choice.",
          caveat: "More melancholy and less philosophically direct than The Midnight Library; the through-line for what to do with your life is less explicit here than in Haig's book.",
          tags: [
            'Impossible Library',
            'Magical World',
            'Story Within Story',
            'Dreamlike',
            'Literary',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Starless+Sea+Erin+Morgenstern&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Starless+Sea+Erin+Morgenstern&affiliate=122720',
        },
        {
          title: 'Piranesi',
          slug: 'piranesi',
          author: 'Susanna Clarke',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "An impossible house of infinite halls, statues, and tides, and a man who has forgotten how he came to be there, cataloguing its rooms with perfect contentment. Clarke's world shares the Midnight Library's essential quality: a place that operates outside normal reality, where the usual rules of life and death are suspended. But where Haig's book is warm and propulsive, Piranesi is quieter and stranger: more mystery than philosophy.",
          caveat: "Almost no interpersonal warmth until very late; this is a solitary book.",
          tags: [
            'Impossible World',
            'Mystery',
            'Quiet Dread',
            'Literary',
            'Identity',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Piranesi+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Piranesi+Susanna+Clarke&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the warmth, the gentle philosophy, and the hopeful ending...',
      recs: [
        {
          title: 'The House in the Cerulean Sea',
          slug: 'the-house-in-the-cerulean-sea',
          author: 'TJ Klune',
          darkness_level: 1,
          heat_level: 'Closed Door',
          standalone: true,
          series: 'Cerulean Chronicles',
          series_number: 1,
          audiobook: true,
          note: "The most direct tonal match in recent fantasy. Both books are fundamentally about a protagonist who has stopped believing their life has value, and both are gentle, patient exercises in showing them why they're wrong. Klune's warmth has the same quality as Haig's: it doesn't pretend the hard things aren't hard, but it insists that found community and chosen love are sufficient answers.",
          caveat: "A found-family orphanage plot with an institutional threat running underneath, rather than Haig's single-character journey through alternate lives.",
          tags: [
            'Hopeful',
            'Found Family',
            'Gentle Philosophy',
            'Cosy Fantasy',
            'Sweet Romance',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+House+in+the+Cerulean+Sea+TJ+Klune&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+House+in+the+Cerulean+Sea+TJ+Klune&affiliate=122720',
        },
        {
          title: 'Legends & Lattes',
          slug: 'legends-and-lattes',
          author: 'Travis Baldree',
          darkness_level: 1,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "A retired orc barbarian opens a coffee shop. Like The Midnight Library, this is a book about choosing a different life: about deciding that the path of violence and ambition is not the only one available, and that small, warm, daily pleasures are a valid reason to stay. Baldree writes the community that forms around Viv's coffee shop with the same patient affection Haig brings to Nora's rediscovered reasons for living.",
          caveat: "Much lower stakes and no supernatural premise at all; the parallel is thematic (choosing a different, smaller life) rather than structural.",
          tags: [
            'Cosy Fantasy',
            'Chosen Life',
            'Found Community',
            'Low Stakes',
            'Sweet Romance',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Legends+and+Lattes+Travis+Baldree&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Legends+Lattes+Travis+Baldree&affiliate=122720',
        },
      ],
    },
    {
      heading: 'If you loved the "what if" parallel lives premise...',
      recs: [
        {
          title: 'The Night Circus',
          slug: 'the-night-circus',
          author: 'Erin Morgenstern',
          darkness_level: 2,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "Less about parallel lives and more about two people whose fates are bound by a competition neither chose, but the same quality of dreamy possibility and the sense that magic is woven into the fabric of ordinary life connects the two books. Morgenstern's circus is a space where the impossible is real, much as Haig's library is. The atmosphere is considerably more romantic and sensory than The Midnight Library, and the plot is less propulsive.",
          caveat: "Less about regret and parallel-life choice and more about two people bound by a competition neither chose; the plot is slower and more atmospheric than Haig's book.",
          tags: [
            'Magical Realism',
            'Atmospheric',
            'Dreamy',
            'Fated Romance',
            'Beautiful Prose',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Night+Circus+Erin+Morgenstern&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Night+Circus+Erin+Morgenstern&affiliate=122720',
        },
        {
          title: 'The Ocean at the End of the Lane',
          slug: 'the-ocean-at-the-end-of-the-lane',
          author: 'Neil Gaiman',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "A middle-aged man returns to his childhood home and remembers something impossible: events from when he was seven that the adult world has no language for. Gaiman's novella shares The Midnight Library's interest in memory, unlived possibility, and the question of whether the life we ended up with is the one we would have chosen. Darker and stranger than Haig (there are actual monsters here, not philosophical ones), but the emotional core, a person revisiting a pivotal moment and finding it both smaller and more significant than they remembered, is the same.",
          caveat: "Darker and stranger than Haig, with real supernatural threat rather than philosophical metaphor; the parallel-lives premise is much less literal here.",
          tags: [
            'Memory',
            'Magical Realism',
            'Childhood',
            'Quiet Dread',
            'Emotional Weight',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Ocean+at+the+End+of+the+Lane+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Ocean+End+Lane+Neil+Gaiman&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Piranesi', slug: 'piranesi' },
    { title: 'Books Like The Night Circus', slug: 'the-night-circus' },
    { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
  ],
};
