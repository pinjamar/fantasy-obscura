import type { BooksLikeEntry } from '../books-like';

export const theHeroes: BooksLikeEntry = {
  slug: 'the-heroes',
  source: {
    title: 'The Heroes',
    author: 'Joe Abercrombie',
    reading_order_slug: 'first-law',
    db_slug: 'the-heroes',
    darkness_level: 5,
    heat_level: 'Closed Door',
    series: 'First Law World',
    series_number: 5,
    tropes: [
      'Anti-Hero',
      'War & Conflict',
      'Multi-POV',
      'Morally Grey',
      'Deconstructed Heroism',
      'Single Battle',
    ],
    angle: 'Three Days of Battle That Demolish Every Idea You Had About War',
    answer_line:
      'If you loved The Heroes for its unglamorized war-as-slaughterhouse structure, the way it demolishes the myth of heroism, and Gorst\'s brutal competence read as horror rather than glory, start with The Black Company, The Name of the Wind, and The Sword of Kaigen.',
    why_people_love:
      "The Heroes takes place entirely over three days on one battlefield: a circle of standing stones called, with full Abercrombie irony, 'the Heroes.' Union soldiers and Northmen are killing each other over a patch of ground that neither side will hold by the end. Abercrombie rotates through POVs with surgical precision: the aging named man trying to retire with his conscience intact, the disgraced knight who is brilliant at killing and broken in every other way, the cowardly prince scheming his way through a war he didn't want to fight, the young soldier learning what glory actually smells like. Nothing is resolved. The politicians who sent them are fine. The battle achieves nothing its participants intended. It is the most explicitly anti-war fantasy novel ever written, and it is also one of the most gripping. Ideally read after the original First Law trilogy and Best Served Cold, though it stands alone.",
    why_people_love_rich: [
      { type: 'paragraph', text: "The Heroes takes place entirely over three days on one battlefield: a circle of standing stones called, with full Abercrombie irony, 'the Heroes.' Union soldiers and Northmen are killing each other over a patch of ground that neither side will hold by the end. Abercrombie rotates through POVs with surgical precision, building an argument through accumulation: nothing is resolved, the politicians who sent them are fine, the battle achieves nothing its participants intended." },
      { type: 'labeled', label: 'Gorst:', text: "The disgraced knight who is brilliant at killing and broken in every other way. Gorst is the book's most uncomfortable POV, because he is exactly what the fantasy genre has always called a hero, and Abercrombie refuses to let that slide. Gorst loves battle. He is good at it in a way that is specific and described and not glamorised. His chapters are the book's indictment: this is what the warrior archetype looks like from inside, and the fantasy tradition has been romanticising exactly this for decades. Every 'chosen warrior' in the genre is Gorst with better PR." },
      { type: 'paragraph', text: "The Heroes is the most explicitly anti-war fantasy novel ever written and also one of the most gripping. That is the point. You cannot look away from the battle, which means you cannot claim you didn't watch. Ideally read after the original First Law trilogy and Best Served Cold, but it stands alone well enough that the reader who hasn't done the groundwork will miss texture rather than comprehension." },
      { type: 'warning', text: "The Heroes is a very dark book about the mechanics of war: the violence is detailed, unglamourised, and relentless. Readers who want resolution or consequence for the people who sent the soldiers will not find it here. The cast is large and rotating, and some readers find it harder to attach to than the trilogy's more sustained POVs. It is the darkest entry in the First Law World and best encountered after some familiarity with Abercrombie's approach." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the war as slaughterhouse: both sides human, both sides doomed, glory absent from every page...',
      recs: [
        {
          title: 'The Black Company',
          author: 'Glen Cook',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Black Company',
          series_number: 1,
          series_label: 'Series (10 books)',
          audiobook: true,
          note: "Abercrombie has called Glen Cook the most direct influence on his work, and The Black Company is the reason. Cook's mercenary company serves whoever pays, fights wars they don't believe in, and records their history through a company annalist who writes what actually happened rather than what the victors prefer. The prose is terse and close to the bone: nothing is heroised, nothing is beautified. The Black Company invented the territory The Heroes occupies: war as profession, soldiers as the people the legends are never written about.",
          caveat: "An ensemble war chronicle narrated by the company physician rather than the rotating multi-POV structure The Heroes builds around named soldiers, and the story spans a whole campaign rather than three compressed days.",
          tags: [
            'Mercenaries',
            'Anti-Heroism',
            'War',
            'Morally Grey',
            'Dark Fantasy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Black+Company+Glen+Cook&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Black+Company+Glen+Cook&affiliate=122720',
        },
        {
          title: 'Gardens of the Moon',
          author: 'Steven Erikson',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Malazan Book of the Fallen',
          series_number: 1,
          series_label: 'Series (10 books)',
          audiobook: true,
          warning: 'Challenging opening: no hand-holding, requires patience.',
          note: "Erikson and Abercrombie are the two architects of the modern grimdark war novel, and Malazan is the larger structure. Gardens of the Moon opens in the middle of a siege, drops you into a world with no hand-holding, and introduces a cast where soldiers die before you know their names. That's deliberate. Erikson writes war the same way Abercrombie does: as a system that grinds through people, where individual heroics are swallowed by scale. The Heroes is tighter and more immediately readable; Malazan is ten times the size and rewards the full investment.",
          caveat: "Malazan's scale is enormous, a whole world and pantheon rather than one battlefield, and the opening deliberately withholds context in a way The Heroes never does.",
          tags: [
            'Epic Fantasy',
            'War',
            'Ensemble Cast',
            'Dark Fantasy',
            'Morally Grey',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Gardens+of+the+Moon+Erikson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Steven+Erikson&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the myth of heroism being demolished: the gap between what legends say and what actually happened...',
      recs: [
        {
          title: 'The Name of the Wind',
          author: 'Patrick Rothfuss',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Kingkiller Chronicle',
          series_number: 1,
          series_label: 'Series (unfinished, book 3 delayed indefinitely)',
          audiobook: true,
          note: "The name of the book is a clue. Kvothe is famous (a legend, a name that means something), and the entire novel is him sitting in a tavern explaining how the legend was constructed. The Heroes deconstructs heroism by putting you inside a battle and showing you that nobody is what the songs say; Rothfuss deconstructs it by making the hero himself the narrator of his own myth, fully aware that what he's telling you has been shaped by what he wants you to believe. Both books ask the same question: what do we need heroes to be, and what does that need cost the actual people?",
          caveat: "Framed entirely as one man's retrospective story rather than a real-time multi-POV battle, and there's no equivalent to The Heroes' war-as-machine structure; the deconstruction here is about myth-making, not combat.",
          tags: [
            'Heroism Deconstructed',
            'Unreliable Narrator',
            'Magic School',
            'Literary Fantasy',
            'Legend & Myth',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
        },
        {
          title: 'Prince of Thorns',
          author: 'Mark Lawrence',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Broken Empire',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          warning: 'Graphic violence, sexual violence.',
          note: "Lawrence and Abercrombie are solving the same problem: what does a fantasy novel look like when its protagonist is fully aware of what role the narrative wants him to play and refuses to play it? Jorg occupies the hero slot the way Gorst occupies the hero slot in The Heroes: brilliant at violence, deeply wrong about almost everything else, held up as exceptional by a system that rewards exactly the wrong qualities. Lawrence writes it with more gothic energy; Abercrombie writes it with more structural irony.",
          caveat: "Jorg is the sole POV throughout rather than one voice among many, and the register is colder and more nihilistic than The Heroes' occasional flashes of dark humor.",
          tags: [
            'Anti-Hero',
            'Dark Fantasy',
            'Morally Grey',
            'Grimdark',
            'Deconstructed Hero',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Prince+of+Thorns+Mark+Lawrence&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Prince+of+Thorns+Mark+Lawrence&affiliate=122720',
        },
      ],
    },
    {
      heading:
        "If you loved Gorst: a warrior whose brutal competence in violence is shown as horror rather than glory, undercutting the genre's usual hero archetype from the inside...",
      recs: [
        {
          title: 'The Sword of Kaigen',
          slug: 'the-sword-of-kaigen',
          author: 'M.L. Wang',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "Misaki spent decades suppressing the fact that she was once one of the most dangerous duelists her homeland ever produced, playing the role of a quiet farming-village mother instead. When soldiers invade and she finally fights at full capability, Wang writes it the way Abercrombie writes Gorst: not as triumph, but as horror witnessed at close range, competence stripped of every romantic association the genre usually gives it.",
          caveat: "A single family's story rather than an ensemble of soldiers and politicians, and the devastating battle is one extended set piece rather than the book's entire three-day structure.",
          tags: [
            'Elemental Magic',
            'Morally Grey Hero',
            'War Between Kingdoms',
            'Coming of Age',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Sword+of+Kaigen+M.L.+Wang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Sword+of+Kaigen+Wang&affiliate=122720',
        },
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
          warning: 'Graphic violence, depicted genocide.',
          note: "Rin's shamanic power turns her into exactly the kind of devastating weapon her war needs, and Kuang refuses to let that read as triumph. By the book's final act, competence in violence has become the horror the whole novel has been building toward, the same reckoning Gorst's chapters force on The Heroes' reader. Both books hand you a character who is very good at killing and dare you to keep calling that heroism.",
          caveat: "Rin's arc plays out across a full war campaign led by a single escalating protagonist rather than The Heroes' compressed three-day, multi-POV structure, and the violence gets considerably more extreme by the book's end.",
          tags: [
            'Villain Protagonist',
            'War Between Kingdoms',
            'Morally Grey Hero',
            'Power at a Cost',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Best Served Cold', slug: 'best-served-cold' },
    { title: 'Books Like The Blade Itself', slug: 'the-blade-itself' },
    { title: 'Books Like Prince of Thorns', slug: 'prince-of-thorns' },
  ],
};
