import type { BooksLikeEntry } from '../books-like';

export const theMagicOfRecluce: BooksLikeEntry = {
  slug: 'the-magic-of-recluce',
  source: {
    title: 'The Magic of Recluce',
    author: 'L.E. Modesitt Jr.',
    author_slug: 'l-e-modesitt',
    darkness_level: 3,
    heat_level: 'Sweet Romance',
    series: 'The Saga of Recluce',
    series_number: 1,
    tropes: [
      'Hard Magic System',
      'Order vs. Chaos',
      'Craftsman Protagonist',
      'Coming of Age',
      'Slow Burn',
      'Quest Fantasy',
      'Philosophical Magic',
    ],
    angle: 'Hard-Magic Epic Fantasy',
    answer_line:
      'If you loved The Magic of Recluce for the systematic Order/Chaos magic, the craft at its core, and the worldbuilding revealed through action rather than exposition, start with The Name of the Wind, Jonathan Strange & Mr Norrell, and The Dragonbone Chair.',
    why_people_love:
      "The Magic of Recluce is the book that puts craft at the center of magic. Lerris is a woodworker, and the Order magic he barely understands works through the same patient attention to material reality that good woodworking requires: you can feel it in how his staff responds, how the grain of the wood tells him what it wants to be. Modesitt's Order/Chaos system is a genuine philosophical framework: Order makes things stable, strong, enduring; Chaos breaks them into entropy; and the argument threading through the 20-book saga is that neither force is simply good or evil. They're physical laws with consequences. The novel is slow by modern pacing standards: Lerris doesn't understand himself or his magic for most of the book, and Modesitt trusts the reader to stay with a protagonist who is genuinely confused. What you get by the end is a world that feels lived-in, a magic system with actual stakes, and a coming-of-age story where the protagonist grows up rather than just gains power. The series follows different protagonists across different eras of Recluce's history: readers can dip in anywhere, or treat the entire saga as one vast interconnected world.",
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "The Magic of Recluce is the book that puts craft at the center of magic. Lerris is a woodworker, and the Order magic he barely understands works through the same patient attention to material reality that good woodworking requires: you can feel it in how his staff responds, how the grain of the wood tells him what it wants to be. Modesitt trusts the reader to stay with a protagonist who is genuinely confused about himself for most of the book.",
      },
      {
        type: 'labeled',
        label: 'The Order/Chaos System:',
        text: "Modesitt's framework is a genuine philosophical argument: Order makes things stable and enduring; Chaos breaks them into entropy. The tension running through the entire saga is that neither force is simply good or evil. They're physical laws with consequences, not moral categories. The magic feels weighted and real because it has costs: an Order user who expels too much Chaos from himself is pushing it into the world around him, and that reckoning never fully resolves.",
      },
      {
        type: 'paragraph',
        text: "The novel is slow by modern pacing standards, and the world accumulates detail through action and observation, never through exposition, so that by the end it feels genuinely inhabited. The series follows different protagonists in different eras of Recluce's history: readers can treat each book as a standalone entry point into the same world, or read them all and watch the history develop.",
      },
      {
        type: 'warning',
        text: "The pacing is front-loaded with confusion by design: Lerris doesn't know what he is, and Modesitt doesn't soften this. Readers who want their protagonists competent and their magic systems explained in the first few chapters will struggle. The slow build requires trust in the process.",
      },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the hard magic system: rules, costs, and failure modes that make the world feel like physics...',
      recs: [
        {
          title: 'The Name of the Wind',
          author: 'Patrick Rothfuss',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Kingkiller Chronicle',
          series_number: 1,
          series_label: 'Series (2 books published, unfinished)',
          audiobook: true,
          note: "Rothfuss frames his magic the same way Modesitt frames his: as a discipline with rules, costs, and failure modes. Kvothe studies Sympathy at the Arcanum, and the novel is largely about the process of learning a system: what happens when you get it wrong, what the limits are, why some people can do it and others can't. The pacing is methodical, the world revealed through Kvothe's experience rather than described at the top, and the underlying instinct, that magic should work like a science, not a miracle, is identical to Recluce's.",
          caveat: "Book three has not been published and the series is considered indefinitely stalled. Read knowing you are accepting an unfinished journey.",
          tags: ['Hard Magic System', 'Magic University', 'Coming of Age', 'Legend Building', 'Lyrical Prose'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
        },
        {
          title: 'The Final Empire',
          slug: 'the-final-empire',
          author: 'Brandon Sanderson',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Mistborn: The Original Trilogy',
          series_number: 1,
          series_label: 'Series (3 books, complete)',
          audiobook: true,
          note: "Sanderson's Allomancy is the hardest magic system in mainstream epic fantasy: each metal has a specific ability, each ability has a specific limit, and the novel is built around a protagonist who learns to exploit those rules systematically. Where Recluce's Order/Chaos is philosophical, Mistborn's Allomancy is almost mechanical, but the approach is the same: magic with weight, consequences, and internal consistency that the plot has to respect.",
          caveat: "Sanderson's prose is faster and more direct than Modesitt's; the slow accumulation of world-texture through quiet observation is not Mistborn's style. This is an aesthetic difference, not a quality judgment.",
          tags: ['Hard Magic System', 'Heist Fantasy', 'Revolution', 'Chosen One', 'Rule-Based Magic'],
          amazon_url:
            'https://www.amazon.com/s?k=Mistborn+The+Final+Empire+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the idea that magic requires mastery and deep understanding: power earned through study, not gift...',
      recs: [
        {
          title: 'Jonathan Strange & Mr Norrell',
          author: 'Susanna Clarke',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "Clarke's novel is about English magic recovering from centuries of dormancy through two very different practitioners, and it works on a similar principle to Recluce's Order: magic has depth and history, it is learned through painstaking study, and practitioners who skip the theoretical groundwork make terrible mistakes. Clarke's narrator treats fairy magic with the same academic distance Modesitt brings to Order theory: always precise, always slightly dry, always aware of consequences.",
          caveat: "The pace is extraordinary even by Recluce standards; Clarke uses Dickensian chapter lengths and footnotes as worldbuilding. Readers who found Recluce too slow will find this slower.",
          tags: ['Magic as Scholarship', 'Historical Fantasy', 'Dry Wit', 'Victorian England', 'Fairy Magic'],
          amazon_url:
            'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell+Clarke&affiliate=122720',
        },
        {
          title: 'A Wizard of Earthsea',
          author: 'Ursula K. Le Guin',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Earthsea',
          series_number: 1,
          series_label: 'Series (6 books)',
          audiobook: true,
          note: "Le Guin's magic is rooted in knowing the true name of things: power comes from understanding, not force, which is exactly what Modesitt argues with Order magic. Ged learns at the Roke school of wizardry, makes a catastrophic mistake through impatience and arrogance, and spends the novel reckoning with it. The approach, that magic is earned, costly, and rooted in deep knowledge of the world, matches Recluce's philosophical register better than almost anything else in fantasy.",
          caveat: "Earthsea is a children's/YA series in its original framing; the prose is simple and the story mythic rather than novelistic. Recluce readers expecting dense worldbuilding will get something purer and more distilled instead.",
          tags: ['True Names', 'Magic as Understanding', 'Coming of Age', 'Foundational Fantasy', 'Earned Power'],
          amazon_url:
            'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Ursula+Le+Guin&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Wizard+of+Earthsea+Le+Guin&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the slow-burn worldbuilding: a world revealed through action, accumulating weight over hundreds of pages...',
      recs: [
        {
          title: 'The Dragonbone Chair',
          author: 'Tad Williams',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Memory, Sorrow and Thorn',
          series_number: 1,
          series_label: 'Series (3 books, complete)',
          audiobook: true,
          note: "Williams' Memory, Sorrow and Thorn is the slow-burn epic that Tolkien readers and Recluce readers meet in the middle: a scullery boy witnesses a king's death, gets swept into a succession crisis, and spends 2,000 pages slowly becoming a person worth following. The world accumulates the same way as Recluce, through lived experience rather than front-loaded exposition, and Williams pays similar attention to what magic costs, what power does to people, and what it means for a world to have actual history.",
          caveat: "This trilogy was the primary inspiration for George R.R. Martin; the stakes are real and characters die. Overall tone is hope-earned-through-suffering rather than grimdark despair, but know going in that Williams means business.",
          tags: ['Slow Burn', 'Epic Worldbuilding', 'Political Intrigue', 'Coming of Age', 'Deep Mythology'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Dragonbone+Chair+Tad+Williams&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Dragonbone+Chair+Tad+Williams&affiliate=122720',
        },
        {
          title: 'The Eye of the World',
          author: 'Robert Jordan',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Wheel of Time',
          series_number: 1,
          series_label: 'Series (14 books, complete)',
          audiobook: true,
          note: "Jordan's Wheel of Time begins the same way as Recluce: young people from a quiet place are forced out into a world far larger and more consequential than they understood, and the magic system (the One Power, split along gender lines) has similar philosophical weight: it has rules, it has costs, it is not simply a tool. Jordan's world is more richly detailed than even Recluce's, the series is longer, and the pacing of the opening book mirrors Modesitt's patient approach to world-revelation.",
          caveat: "14 books across 30 years, and books 7 through 10 slow down considerably compared to the rest. The opening trilogy and the final arc are the strongest stretches.",
          tags: ['Epic Fantasy', 'Chosen One', 'Deep Mythology', 'Magic System', 'Multiple POV'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Eye+of+the+World+Jordan&affiliate=122720',
        },
      ],
    },
    {
      heading:
        "If you loved Lerris's coming-of-age: a protagonist who doesn't choose his path and takes most of the book to understand his own power...",
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
          series_label: 'Series (3 books, complete)',
          audiobook: true,
          note: "Hobb's Farseer trilogy is the closest emotional match for Recluce in modern epic fantasy: Fitz, a royal bastard quietly apprenticed as the king's assassin, doesn't choose his life any more than Lerris chooses his exile. The Skill magic he slowly discovers works through similar principles to Order: it requires mastery, it has costs, it cannot be forced, and Fitz doesn't understand it for a long time. Hobb's prose is deeper and more emotionally demanding than Modesitt's, and the books ask for the same patience Recluce requires.",
          caveat: "Significantly darker than The Magic of Recluce (darkness 4). Fitz's story involves genuine, sustained emotional suffering, and Hobb is not interested in comfortable resolutions. Go in knowing this.",
          tags: ['Reluctant Protagonist', 'Court Intrigue', 'Magic as Burden', 'Character-Driven', 'Coming of Age'],
          amazon_url:
            "https://www.amazon.com/s?k=Assassin%27s+Apprentice+Robin+Hobb&tag=librariancura-20",
          bookshop_url:
            "https://bookshop.org/search?keywords=Assassin%27s+Apprentice+Robin+Hobb&affiliate=122720",
        },
        {
          title: 'The Way of Kings',
          author: 'Brandon Sanderson',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Stormlight Archive',
          series_number: 1,
          series_label: 'Series (10 books planned, 5 published)',
          audiobook: true,
          note: "Kaladin's arc in The Way of Kings is the closest contemporary cousin to Lerris's: a young man with abilities he doesn't understand, forced by circumstance rather than choice into a situation that will define him. Kaladin spends most of the first book as a slave-soldier discovering Stormlight before he understands what it is. Sanderson's magic system (Surgebinding) is as systematic as Allomancy; his world (Roshar) has centuries of history that reveals itself through the action.",
          caveat: "At 1,000+ pages, The Way of Kings is longer than any single Recluce novel. The first third is deliberately slow as Sanderson builds the foundation for a 10-book arc; Recluce readers are already calibrated for this, but know the time commitment.",
          tags: ['Hard Magic System', 'War Fantasy', 'Deep Lore', 'Reluctant Hero', 'Multiple POV'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: "Books Like Assassin's Apprentice", slug: 'assassins-apprentice' },
    { title: 'Books Like The Name of the Wind', slug: 'the-name-of-the-wind' },
    { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
  ],
};
