import type { BooksLikeEntry } from '../books-like';

export const leviathanWakes: BooksLikeEntry = {
  slug: 'leviathan-wakes',
  source: {
    title: 'Leviathan Wakes',
    author: 'James S.A. Corey',
    darkness_level: 4,
    heat_level: 'Open Door',
    series: 'The Expanse',
    series_number: 1,
    tropes: [
      'Hard Science Fiction',
      'Political Intrigue',
      'Alien Threat',
      'Found Family',
      'Noir Detective',
      'Three-Faction Conflict',
      'End of the World Stakes',
    ],
    angle: 'Hard Sci-Fi Political Thriller: A Colonized Solar System, Three Factions, and Something Alien That Threatens All of Them',
    answer_line:
      'If you loved Leviathan Wakes for its solar system politics, the dual POV, or the alien horror in a grounded setting, start with Hyperion, The Forever War, and Children of Time.',
    why_people_love:
      "The solar system is colonized and immediately political. Earth is bloated and bureaucratic, Mars is militarized and disciplined, and the Belt (asteroid miners living on recycled air and corporate credit) hates both of them. No FTL. No aliens (yet). Just three cultures who need each other and resent every second of it. James S.A. Corey drops two POV characters into this and lets them collide: Holden, a ship captain who believes in radical transparency and broadcasts everything, and Miller, a Belter detective so deep into a missing persons case he's stopped being entirely functional. The book is half space opera, half noir, and the collision of those two genres gives it a texture most sci-fi doesn't have. Then the protomolecule shows up and it becomes something else entirely: hard sci-fi body horror that's genuinely terrifying precisely because the physics around it are so carefully grounded. The TV adaptation on Amazon Prime is one of the best sci-fi shows ever made. Both are worth your time.",
    why_people_love_rich: [
      { type: 'paragraph', text: "The solar system is colonized and immediately political. Earth is bloated and bureaucratic, Mars is militarized and disciplined, and the Belt (asteroid miners living on recycled air and corporate credit) hates both of them. No FTL. No aliens (yet). Just three cultures who need each other and resent every second of it. Corey drops two POV characters into this and lets them collide." },
      { type: 'labeled', label: 'The Belt:', text: "The Belters are not just a faction. They're a culture, with their own language (Belter Creole), their own physiology (zero-g stretched bodies that can never return to a gravity well), and their own grievances against the inner planets that date back generations. Miller is Belter-born, and his perspective makes the political tension feel personal rather than abstract." },
      { type: 'paragraph', text: "The book is half space opera, half noir, and the collision of those two genres gives it a texture most sci-fi doesn't have. Then the protomolecule shows up and it becomes something else entirely: hard sci-fi body horror that's genuinely terrifying precisely because the physics around it are so carefully grounded. The TV adaptation on Amazon is one of the best sci-fi shows ever made." },
      { type: 'warning', text: "The series is nine books and each one expands the scope considerably. The first two books are the tightest and most thriller-paced. Later volumes are slower and more philosophical. Readers who want the taut dual-POV noir of Leviathan Wakes should know the series shifts registers; the foundation is brilliant, the later books reward a different kind of patience." },
    ],
  },
  aspects: [
    {
      heading:
        "If you loved the dual POV: Holden's idealistic thriller and Miller's cynical noir spinning in the same solar system...",
      recs: [
        {
          title: 'Hyperion',
          author: 'Dan Simmons',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Hyperion Cantos',
          series_number: 1,
          series_label: 'Series (4 books)',
          audiobook: true,
          note: "Simmons structures Hyperion as seven pilgrims each telling their own story in a different genre (one is a military thriller, one is a love story, one is a horror story), all held together by a frame narrative and a destination none of them understand. It's doing exactly what Leviathan Wakes does with its dual POV: using structural genre variety to keep the reader's experience fresh while everything converges on the same crisis. Hyperion is denser and more literary than Corey, and the first book ends on a deliberate cliffhanger; The Fall of Hyperion resolves it immediately.",
          caveat: "Denser and more literary than Leviathan Wakes, and the first book ends on a deliberate cliffhanger; The Fall of Hyperion is required to resolve it.",
          tags: [
            'Multi-POV',
            'Space Opera',
            'Alien Threat',
            'Far Future',
            'Literary Sci-Fi',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Hyperion+Dan+Simmons&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Hyperion+Dan+Simmons&affiliate=122720',
        },
        {
          title: 'Dark Matter',
          slug: 'dark-matter-blake-crouch',
          author: 'Blake Crouch',
          darkness_level: 4,
          heat_level: 'Sweet Romance',
          standalone: true,
          series: null,
          series_number: null,
          series_label: 'Standalone',
          audiobook: true,
          note: "Crouch writes thriller-paced sci-fi the same way Corey does: the physics are real, the stakes are personal, and the book moves at a speed that makes it genuinely hard to put down. Dark Matter is a quantum mechanics thriller about a physicist who wakes up in the wrong version of his life, and it operates on the same principle as Leviathan Wakes: hard science concept plus thriller momentum plus a protagonist who has to make impossible decisions with imperfect information. Standalone, much shorter than The Expanse.",
          caveat: "Quantum-physics thriller rather than space opera; no solar-system political structure, no faction conflict, and a much smaller cast.",
          tags: [
            'Thriller Pacing',
            'Hard Sci-Fi',
            'Parallel Worlds',
            'Standalone',
            'High Stakes',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Dark+Matter+Blake+Crouch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Dark+Matter+Blake+Crouch&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the solar system politics: Earth, Mars, and the Belt each with their own interests, no FTL escape, resources that make war inevitable...',
      recs: [
        {
          title: 'The Forever War',
          author: 'Joe Haldeman',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: true,
          series: null,
          series_number: null,
          series_label: 'Standalone',
          audiobook: true,
          note: "Haldeman's soldiers fight a war against an alien enemy across centuries of relativistic time: each deployment ages them months while Earth ages decades, and they return to a civilization that no longer recognizes them. The Forever War is doing exactly what The Expanse does with the Belt: using physics to generate political and human consequences that feel inevitable rather than contrived. Haldeman was writing about Vietnam; Corey is writing about resource colonialism; both use sci-fi's distance to make the critique land harder.",
          caveat: "A single soldier's perspective across centuries rather than dual POV, and the war itself, not political factions, is the entire structure; considerably shorter than Leviathan Wakes.",
          tags: [
            'Military Sci-Fi',
            'Political Critique',
            'Relativistic Time',
            'Standalone',
            'Anti-War',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Forever+War+Joe+Haldeman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Forever+War+Joe+Haldeman&affiliate=122720',
        },
        {
          title: 'A Memory Called Empire',
          author: 'Arkady Martine',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Teixcalaan',
          series_number: 1,
          series_label: 'Duology (complete)',
          audiobook: true,
          note: "Mahit Dzmare is an ambassador from a tiny mining station sent to the capital of an empire so culturally dominant it makes its own citizens want to become it. The political tension between the small frontier community and the overwhelming centre maps directly onto the Belt's relationship with Earth and Mars: the same dynamic of dependent resentment and cultural erasure. Martine writes political intrigue at the sentence level; the prose is richer than Corey's and the plot moves more slowly, but the underlying question, what does a small community owe a powerful one that could destroy it at any moment, is exactly The Expanse's question.",
          caveat: "Slower, more literary pacing than Leviathan Wakes, and the conflict is diplomatic and cultural rather than a three-faction resource war.",
          tags: [
            'Political Intrigue',
            'Empire vs Frontier',
            'Literary Sci-Fi',
            'Mystery',
            'Cultural Identity',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Memory+Called+Empire+Arkady+Martine&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Memory+Called+Empire+Arkady+Martine&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the protomolecule: alien horror that obeys different rules, embedded in hard sci-fi where the physics make the horror worse...',
      recs: [
        {
          title: 'Children of Time',
          author: 'Adrian Tchaikovsky',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Children of Time',
          series_number: 1,
          series_label: 'Trilogy (ongoing)',
          audiobook: true,
          note: "Tchaikovsky splits his narrative between humanity's last generation fleeing a dying Earth and an alien civilization evolving on a terraformed world at accelerated speed. Children of Time does what the protomolecule does to Leviathan Wakes: takes genuinely alien biology and makes it interesting rather than just threatening. The science is careful, the alien perspective is deeply thought through, and the collision between two intelligences that cannot easily understand each other generates real dread without cheap horror.",
          caveat: "No noir detective thread and no protomolecule-style body horror; the alien perspective here is sympathetic and central rather than a mounting threat.",
          tags: [
            'First Contact',
            'Alien Intelligence',
            'Hard Sci-Fi',
            'Multi-POV',
            'Far Future',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Children+of+Time+Adrian+Tchaikovsky&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Children+of+Time+Adrian+Tchaikovsky&affiliate=122720',
        },
        {
          title: 'A Fire Upon the Deep',
          author: 'Vernor Vinge',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Zones of Thought',
          series_number: 1,
          series_label: 'Series (3 books)',
          audiobook: true,
          note: "Vinge's galaxy is divided into zones where the laws of physics allow different levels of intelligence, and humanity has accidentally released something from the outer zones that is genuinely beyond comprehension. A Fire Upon the Deep is the large-canvas version of what Leviathan Wakes does: a threat that makes all existing political conflicts look small, a cast of characters scattered across an impossibly large stage, and an alien intelligence that operates by rules the human characters can barely parse.",
          caveat: "Denser and more demanding than Corey, with a much larger cast scattered across an entire galaxy rather than one solar system.",
          tags: [
            'Space Opera',
            'Alien Intelligence',
            'Cosmic Threat',
            'Hard Sci-Fi',
            'Galaxy-Scale Stakes',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Fire+Upon+the+Deep+Vernor+Vinge&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Fire+Upon+the+Deep+Vernor+Vinge&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Children of Time', slug: 'children-of-time' },
    { title: 'Books Like Project Hail Mary', slug: 'project-hail-mary' },
    { title: 'Books Like A Memory Called Empire', slug: 'a-memory-called-empire' },
  ],
};
