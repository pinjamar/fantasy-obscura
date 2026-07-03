import type { BooksLikeEntry } from '../books-like';

export const dragonlance: BooksLikeEntry = {
  slug: 'dragonlance',
  source: {
    title: 'Dragonlance Chronicles',
    author: 'Margaret Weis & Tracy Hickman',
    reading_order_slug: 'dragonlance',
    db_slug: 'dragons-of-autumn-twilight',
    darkness_level: 3,
    heat_level: 'Sweet Romance',
    series: 'Dragonlance Chronicles',
    series_number: 1,
    tropes: [
      'Found Family',
      'Party Dynamics',
      'Morally Grey Mage',
      'Dragon Riders',
      'Classic Quest',
      'Brothers at Odds',
      'Reluctant Hero',
      'Gods and Fate',
    ],
    angle: 'Classic High Fantasy: Eight Companions, One War with the Gods, and Raistlin Majere',
    answer_line:
      "If you loved Dragonlance for its party of companions, for Raistlin, and for the feeling of a world genuinely at stake, start with Mistborn: The Final Empire, The Name of the Wind, and The Eye of the World.",
    why_people_love:
      "Dragonlance works because it does two things simultaneously that most fantasy only manages one of: it gives you a genuine ensemble (a party of eight people whose relationships with each other are as interesting as the quest) and it gives you Raistlin Majere, the character the series is really about. Raistlin is not a villain, not quite a hero, and not a tragic figure in any simple sense. He is brilliant, physically destroyed by his own ambition, contemptuous of nearly everyone around him, and deeply tethered to a brother he cannot stop resenting and cannot let go. The Chronicles trilogy is the story of a world at war with itself, where the gods have abandoned their people, and a group of old friends discovers that the gods never left. Humanity simply forgot how to listen. Weis and Hickman wrote it as a D&D campaign novelisation and it shows in the best possible way: every character has a distinct role, personality, and arc, and the group dynamics feel earned rather than convenient. The Legends trilogy (Time of the Twins, War of the Twins, Test of the Twins) is more ambitious still, and Raistlin's arc across all six books delivers on everything the Chronicles established.",
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "Dragonlance does two things simultaneously that most fantasy only manages one of: it gives you a genuine ensemble (eight people whose relationships with each other are as interesting as the quest) and it gives you Raistlin Majere, the character the series is really about.",
      },
      {
        type: 'labeled',
        label: 'Raistlin:',
        text: "Not a villain, not quite a hero, not a tragic figure in any simple sense. Brilliant, physically destroyed by his own ambition, contemptuous of nearly everyone around him, and deeply tethered to a brother he cannot stop resenting and cannot let go. The Legends trilogy (Time of the Twins, War of the Twins, Test of the Twins) is more ambitious than the Chronicles, and Raistlin's arc across all six books delivers on everything the Chronicles established.",
      },
      {
        type: 'paragraph',
        text: "Weis and Hickman wrote it as a D&D campaign novelisation and it shows in the best possible way: every character has a distinct role, personality, and arc, and the group dynamics feel earned rather than convenient.",
      },
      {
        type: 'warning',
        text: "First published in 1984, the prose reflects its era: expect more dated writing than modern epic fantasy. The Legends trilogy requires the Chronicles first and is worth reading immediately after. Do not start with Legends; the emotional weight of Raistlin's arc depends entirely on knowing what the Chronicles established.",
      },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the party: a band of companions with conflicting loyalties, different abilities, and the kind of friendship that only survives by being tested...',
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
          series_label: 'Trilogy',
          audiobook: true,
          note: "The closest modern equivalent to Dragonlance's ensemble dynamics. Kelsier's crew is built on the same logic as the Heroes of the Lance: each member has a distinct ability, a distinct personality, and a distinct reason for being there, and the group works because the relationships between them are as interesting as the heist. Vin is a Raistlin-adjacent figure in structure: a person of immense and dangerous power who is also isolated from the crew in the same way Raistlin is isolated from the party. Sanderson's magic system is harder-edged than Weis and Hickman's, but the emotional architecture of a team held together by trust and tested by catastrophe is identical.",
          caveat: "Sanderson's world has no religious dimension equivalent to Dragonlance's. The gods withdrawing, the crisis of faith, the rediscovery of true clerics: none of that has an analogue here. The spiritual register of the two series is entirely different.",
          tags: [
            'Ensemble Cast',
            'Morally Grey Magic',
            'Found Family',
            'Revolution',
            'Hard Magic System',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Mistborn+Final+Empire+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson&affiliate=122720',
        },
        {
          title: 'The Fellowship of the Ring',
          author: 'J.R.R. Tolkien',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Lord of the Rings',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "The ancestor that made the party-quest template possible. Nine companions of different races, temperaments, and loyalties thrown together by a single impossible task, held together by something closer to love than strategy. Dragonlance owes its existence to Tolkien's model; returning to the source after the Chronicles is less a step backward than a reminder of how much the model contains. When the fellowship breaks at the end of the first volume, Tolkien does what Weis and Hickman spent three books building toward: he shows what these relationships cost, not just what they give.",
          caveat: "Tolkien's moral architecture is simpler than Weis and Hickman's. There is no Raistlin in The Lord of the Rings: no morally compromised figure whose trustworthiness is the central question. The fellowship is warmer and its loyalties considerably clearer.",
          tags: [
            'Classic Epic Fantasy',
            'Fellowship Quest',
            'Multi-Race Party',
            'Good vs Evil',
            'Foundational',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Fellowship+of+the+Ring+Tolkien&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Fellowship+of+the+Ring+Tolkien&affiliate=122720',
        },
      ],
    },
    {
      heading:
        "If you loved Raistlin: the brilliant, physically frail, morally ambiguous mage whose contempt for the party keeps you reading when the quest itself wouldn't...",
      recs: [
        {
          title: 'The Name of the Wind',
          author: 'Patrick Rothfuss',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Kingkiller Chronicle',
          series_number: 1,
          series_label: 'Trilogy (unfinished)',
          audiobook: true,
          note: "Kvothe is what Raistlin might have been if he had narrated his own story: brilliant, self-destructive, convinced of his own exceptionalism in ways that are simultaneously irritating and completely justified by the evidence, and in possession of a gift so large it functions as a curse. Rothfuss writes the psychology of prodigy with more precision than most fantasy attempts: the way genius isolates, the way performance becomes second nature, the way the distance between what a person is capable of and what they are allowed to become produces a specific kind of rage. Kvothe is built to the same specification as Raistlin: a figure whose exceptional talent is indistinguishable from a character flaw, and who is more interesting than the world he moves through.",
          caveat: "The series is unfinished with no confirmed publication date for book three. Kvothe is also a solo protagonist rather than a party member; readers who loved the ensemble dynamics of Dragonlance will not find that here.",
          tags: [
            'Genius Protagonist',
            'Magic Academy',
            'Unreliable Narrator',
            'Tragedy',
            'Literary Fantasy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
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
          note: "The foundational text for the brilliant, ambitious, self-undoing young mage: the archetype Raistlin inhabits. Ged is proud and gifted and releases something into the world that only he can face, and Le Guin tells that story in 183 pages with more precision than most writers manage in a thousand. The Earthsea books are the cleanest version of what Dragonlance's mage arc is reaching for: the cost of power, the relationship between talent and character, and the question of what it means to truly master a gift rather than be mastered by it. Le Guin wrote this before Weis and Hickman were published, and reading both reveals exactly what the Chronicles borrowed and what they transformed.",
          caveat: "No party, no war, and no gods in conflict. Earthsea is intimate where Dragonlance is epic; the scope is one boy's arc rather than a civilization in crisis. Readers who loved the Chronicles for the ensemble and the cosmic stakes will find Earthsea smaller in every dimension.",
          tags: [
            'Young Mage',
            'Coming of Age',
            'Foundational Fantasy',
            'Short & Complete',
            'Literary',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Le+Guin&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Wizard+of+Earthsea+Le+Guin&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the world at war and the gods withdrawing: a civilisation in crisis, a faith that must be rediscovered, and companions who carry something larger than themselves...',
      recs: [
        {
          title: 'The Eye of the World',
          author: 'Robert Jordan',
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'The Wheel of Time',
          series_number: 1,
          series_label: 'Series (14 books)',
          audiobook: true,
          note: "The direct heir to Dragonlance's ambitions at larger scale. Jordan builds on the same template (a group of people from a small community pulled into a war between ancient powers, each carrying a destiny they don't fully understand) and expands it into fourteen books of extraordinarily detailed world-building. The early Wheel of Time has the same quality as the Chronicles: a sense of a world that existed in full before the characters arrived, with a history of gods and disasters layered beneath the present. More slowly paced than Dragonlance and considerably longer, but the fundamental experience (a party of companions against cosmic stakes) is the same.",
          caveat: "The middle volumes slow dramatically and the series commitment is enormous: fourteen books, each longer than the last, before the resolution. Readers who want a tight trilogy structure comparable to the Chronicles should approach with that in mind.",
          tags: [
            'Epic Quest',
            'Chosen Heroes',
            'Detailed World-Building',
            'Multiple POV',
            'Gods and Fate',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Eye+of+the+World+Jordan&affiliate=122720',
        },
        {
          title: 'The Dragonbone Chair',
          author: 'Tad Williams',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Memory, Sorrow and Thorn',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "Written in direct conversation with Tolkien at the same moment Dragonlance was being published, Memory, Sorrow and Thorn is the more literary version of the same impulse: a medieval world under threat from an ancient returning darkness, a young man pulled from obscurity into a story too large for him, and an intricate web of political and spiritual stakes. Williams is a more careful prose stylist than Weis and Hickman, and the first book is deliberately slow. The feeling of a world whose mythology runs deeper than any single story is exactly what Dragonlance delivers at its best. George R.R. Martin has cited it as the series that most influenced A Song of Ice and Fire.",
          caveat: "Memory, Sorrow and Thorn has no ensemble in Dragonlance's sense. Simon is a solo protagonist and the cast rarely operates as a unified party. The pacing is considerably slower; readers who loved the Chronicles' momentum will find Williams deliberate to the point of frustration in the opening sections.",
          tags: [
            'Epic Fantasy',
            'Ancient Darkness Returns',
            'Coming of Age',
            'Dense World-Building',
            'Literary',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Dragonbone+Chair+Tad+Williams&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Dragonbone+Chair+Tad+Williams&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
    { title: 'Books Like The Wheel of Time', slug: 'the-wheel-of-time' },
    { title: 'Books Like The Name of the Wind', slug: 'the-name-of-the-wind' },
    { title: 'Books Like Lord of the Rings', slug: 'lord-of-the-rings' },
    { title: 'Books Like A Wizard of Earthsea', slug: 'a-wizard-of-earthsea' },
    { title: 'Books Like Memory, Sorrow and Thorn', slug: 'memory-sorrow-thorn' },
  ],
};
