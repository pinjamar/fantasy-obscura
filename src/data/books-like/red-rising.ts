import type { BooksLikeEntry } from '../books-like';

export const redRising: BooksLikeEntry = {
  slug: 'red-rising',
  source: {
    title: 'Red Rising',
    author: 'Pierce Brown',
    darkness_level: 4,
    heat_level: 'Closed Door',
    series: 'Red Rising',
    series_number: 1,
    tropes: [
      'Underdog Rebellion',
      'Class Warfare',
      'Chosen One',
      'Infiltration',
      'Brutal Training',
      'Revenge',
      'Morally Grey Protagonist',
      'Found Family',
    ],
    angle: 'Dark Sci-Fi Action',
    answer_line:
      'If you loved Red Rising for the brutal training, underdog rebellion, class warfare, and a strategist protagonist who uses everyone as pieces: start with Blood Song, The Poppy War, and Six of Crows.',
    why_people_love:
      "Red Rising is the book people finish at 3am and immediately text their friends about. Pierce Brown writes action with a propulsive clarity that few authors match: every chapter has a decision with real stakes, every alliance is potentially a betrayal, and Darrow's intelligence is visible on the page rather than just asserted. The Roman mythology layered onto a caste-divided future society gives it a mythic weight that pure dystopian fiction usually lacks. The first book is essentially The Hunger Games crossed with Ender's Game (a brutal training sequence that is also a political education) and the sequels escalate to full interplanetary war. Fair warning: this book commits to its premise. Characters you care about will die, and the author will not cushion the blow.",
    why_people_love_rich: [
      { type: 'paragraph', text: "Red Rising is the book people finish at 3am and immediately text their friends about. Brown writes action with a propulsive clarity that few authors match: every chapter has a decision with real stakes, every alliance is a potential betrayal, and the colour-coded caste system gives the social stakes visceral readability: you always know exactly where everyone stands and what it will cost to change it." },
      { type: 'labeled', label: 'The Institute:', text: "The brutal training sequence that makes up most of the first book (a war game across a constructed landscape, students as generals, nobody too safe to die) is one of the great competitive-crucible sequences in the genre. Brown structures it so the reader understands military strategy by following Darrow through it: alliance-building, resource logistics, the specific treachery of people who were friends six days ago. The Howlers are built here, and Howler loyalty is what the rest of the series runs on." },
      { type: 'paragraph', text: "Darrow's intelligence is visible on the page rather than just asserted. You watch him calculate, watch him lose, watch him adapt. Brown gives him genuine setbacks rather than manufactured ones. The Roman mythology layered onto a colour-coded future society gives the series mythic weight that pure dystopian fiction usually lacks: this isn't just a class system, it's a civilisation that worships the wrong things and is beginning to break." },
      { type: 'warning', text: "Red Rising commits to its premise. Characters you care about will die, and Brown will not cushion the blow. The first book is the Institute sequence; the series escalates to full interplanetary war across six books. The darkness level rises considerably by Iron Gold (book 4). Read this as a complete series commitment: the first book sets everything up, and the resolution only arrives once you've read the whole run." },
    ],
  },
  aspects: [
    {
      heading: 'If you loved the brutal training: the institution designed to break you, and the brotherhood built inside it',
      recs: [
        {
          title: 'Blood Song',
          author: 'Anthony Ryan',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: "Raven's Shadow",
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: "Vaelin Al Sorna is taken from his family as a boy and put through the Sixth Order: a brutal training regime that uses violence, starvation, and impossible standards to produce soldiers. The brotherhood he forms under those conditions maps exactly onto Darrow's Howlers: built through shared suffering, fiercely loyal, carrying the weight of what the institution made them. Ryan writes action with the same chapter-ending momentum as Pierce Brown. The scope grows epic over the trilogy.",
          caveat: "slower-building than Red Rising, and the first book is almost entirely the school sequence: if you loved that part, this delivers it in full.",
          tags: ['Brutal Training', 'Military Brotherhood', 'Dark Fantasy', 'Epic Scale', 'Morally Complex'],
          amazon_url:
            'https://www.amazon.com/s?k=Blood+Song+Anthony+Ryan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Blood+Song+Anthony+Ryan&affiliate=122720',
        },
        {
          title: 'Nevernight',
          author: 'Jay Kristoff',
          darkness_level: 4,
          heat_level: 'Fiery',
          standalone: false,
          series: 'The Nevernight Chronicle',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "An assassin's school with lethal internal competition: students die in training and the survivors are not innocent about it. The same gladiatorial energy as Red Rising's Institute, filtered through a morally compromised heroine who is brilliant and completely committed to her goal. Kristoff writes Mia with the same dangerous intelligence Brown writes Darrow.",
          caveat: "significantly higher heat level and more stylised prose than Red Rising. Not for readers who found the Institute's violence already at their limit.",
          tags: ['Assassin School', 'Morally Grey Heroine', 'Brutal Competition', 'Revenge'],
          warning: 'Graphic violence, explicit sexual content, death of POV characters',
          amazon_url:
            'https://www.amazon.com/s?k=Nevernight+Jay+Kristoff&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Nevernight+Jay+Kristoff&affiliate=122720',
        },
      ],
    },
    {
      heading: 'If you loved the class warfare: the lowest caste clawing into the ruling system to burn it down',
      recs: [
        {
          title: 'The Poppy War',
          author: 'R.F. Kuang',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Poppy War',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "Rin is a war orphan from the lowest caste who scores highest on the imperial exam and earns a place at Sinegard military academy: the most structurally precise parallel to Darrow's arc in the genre. The academy section is brutal and competitive, ingenuity against inherited privilege. Then the war starts and Kuang does what Brown does in books four and five: the personal story becomes civilisation-scale catastrophe.",
          caveat: "The Poppy War gets significantly darker than Red Rising in its second half, drawing on the Second Sino-Japanese War. The atrocities are not allegorised.",
          tags: ['Class Warfare', 'Military Academy', 'Underdog Rising', 'Brutal War', 'Dark'],
          warning: 'Graphic war violence, genocide, drug use',
          amazon_url:
            'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang&affiliate=122720',
        },
        {
          title: 'The Final Empire',
          author: 'Brandon Sanderson',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Mistborn',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "The oppressors have held total power for a thousand years; the protagonist infiltrates the upper class from inside the lowest caste; the plan is to dismantle the entire system from within. The class warfare and infiltration mechanics are the same as Red Rising's, played out in a more methodical register. Sanderson builds his world carefully before he moves: far less propulsive than Brown, more interested in magic systems and heist planning than action sequences. Best for Red Rising readers who want the political intelligence without the relentless pace.",
          caveat: "much more slow-building than Red Rising, with far less action per chapter and much more focus on magic-system mechanics and heist planning.",
          tags: ['Underdog Rebellion', 'Infiltration', 'Class System', 'Hard Magic'],
          amazon_url:
            'https://www.amazon.com/s?k=Mistborn+Final+Empire+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Mistborn+Final+Empire&affiliate=122720',
        },
      ],
    },
    {
      heading: 'If you loved the morally grey strategist: the protagonist who sees four moves ahead and uses everyone as a piece',
      recs: [
        {
          title: 'Six of Crows',
          author: 'Leigh Bardugo',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Six of Crows',
          series_number: 1,
          series_label: 'Duology (complete)',
          audiobook: true,
          note: "Kaz Brekker has the same relationship to strategy that Darrow has: he sees several moves ahead, uses people as assets, and actually cares about them despite everything. The Dregs dynamic (found family built through shared danger and mutual usefulness) maps directly onto the Howlers. Bardugo writes betrayal with the same precision Brown does.",
          caveat: "smaller scale and more romance than Red Rising; this is a heist not a war. The cast-of-six structure also means less single-protagonist intensity.",
          tags: ['Morally Grey Lead', 'Brilliant Strategist', 'Found Family', 'Heist', 'Dark'],
          amazon_url:
            'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Six+of+Crows+Bardugo&affiliate=122720',
        },
        {
          title: 'The Lies of Locke Lamora',
          author: 'Scott Lynch',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Gentleman Bastard',
          series_number: 1,
          series_label: 'Series (3 books published, ongoing)',
          audiobook: true,
          note: "Locke Lamora and Darrow are cousins: both run every play three layers deep, both use the loyalty of a tight crew to execute plans no single person could survive, both are willing to burn every asset in service of the goal. Lynch writes con artistry the way Brown writes war: as a sequence of decisions with visible logic and immediate consequences. The banter between Locke and Jean has the same warmth as the Howlers.",
          caveat: "no action set pieces on Red Rising's scale. This is scheming and dialogue more than battle.",
          tags: ['Con Artistry', 'Found Family', 'Morally Grey', 'Dark City'],
          warning: 'Graphic violence, torture',
          amazon_url:
            'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora&affiliate=122720',
        },
      ],
    },
    {
      heading: 'If you loved the grimdark escalation: war as the engine, and the way the system corrupts everyone inside it',
      recs: [
        {
          title: 'The Blade Itself',
          author: 'Joe Abercrombie',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The First Law',
          series_number: 1,
          series_label: 'Trilogy + standalones',
          audiobook: true,
          note: "Abercrombie shares Brown's core conviction: heroism is a story powerful people tell about violence, and the system corrupts whoever tries to use it. Logen Ninefingers (the Bloody Nine) has the same dual nature as Darrow: the person versus the weapon they've been made into. The scope builds to civilisation-scale war across the trilogy.",
          caveat: "much slower-building than Red Rising; Abercrombie earns his moments through setup rather than pace. The first book is largely character establishment: commit to the trilogy.",
          tags: ['Grimdark', 'Morally Grey', 'Political War', 'Subverted Heroism', 'Dark Humour'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie&affiliate=122720',
        },
        {
          title: 'The Rage of Dragons',
          author: 'Evan Winter',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Burning',
          series_number: 1,
          series_label: 'Series (ongoing)',
          audiobook: true,
          note: "Tau Solaris is the lowest caste in his society: technically forbidden from advanced combat training. He manipulates his way in through sheer fury and cunning, then grinds through a system designed to exclude him. Winter writes action sequences with the same kinetic clarity as Pierce Brown: every fight has weight, consequences carry forward, and the training sequences have genuine stakes.",
          caveat: "smaller in scope than Red Rising's interplanetary scale, and the series is ongoing.",
          tags: ['Underdog Rising', 'Brutal Training', 'African-Inspired World', 'Fast Pacing', 'Military'],
          amazon_url:
            'https://www.amazon.com/s?k=The+Rage+of+Dragons+Evan+Winter&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Rage+of+Dragons+Evan+Winter&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
    { title: 'Books Like The Blade Itself', slug: 'the-blade-itself' },
    { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
  ],
};
