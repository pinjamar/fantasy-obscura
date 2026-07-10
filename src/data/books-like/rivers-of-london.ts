import type { BooksLikeEntry } from '../books-like';

export const riversOfLondon: BooksLikeEntry = {
  slug: 'rivers-of-london',
  source: {
    title: 'Rivers of London',
    author: 'Ben Aaronovitch',
    cover_url:
      'https://books.google.com/books/content?id=DJq-_ci6ePcC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    darkness_level: 3,
    heat_level: 'Closed Door',
    series: 'Rivers of London',
    series_number: 1,
    tropes: [
      'Hidden Society',
      'Mentor and Student',
      'Coming of Age',
      'Magical Artifacts',
      'Political Intrigue',
    ],
    angle: "Urban Fantasy Police Procedural Where London's Gods Have Family Drama",
    answer_line:
      'If you loved Rivers of London for the hidden magical bureaucracy under a real city, London itself as a character, and gods living ordinary modern lives with real grudges, start with The Rook, Neverwhere, and American Gods.',
    why_people_love:
      "Rivers of London works because Aaronovitch refuses to let either half of its premise, police procedural or urban fantasy, dominate the other. Peter Grant is a probationary constable whose ordinary beat suddenly includes a witness statement from a ghost, and his recruitment into the Metropolitan Police's tiny magical unit comes with real training: forma, the actual grammar of spellcasting, learned slowly and at real physical cost. The book's best trick is making London's rivers literal characters. Mama Thames and Father Thames are estranged deities running rival territories with the same petty grudges and family politics as any divorced parents, and their many tributary children have their own personalities, jobs, and arguments. Peter's voice carries all of it: dry, observant, class-and-race-aware in a way that never feels like a lecture, more like a guy who notices things because noticing things is his actual job now. It's a series that treats magic like a discipline you study and a bureaucracy like something you have to file paperwork for, and somehow that makes it funnier, not drier.",
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "Peter Grant is a probationary constable whose ordinary beat suddenly includes a witness statement from a ghost, and his recruitment into the Metropolitan Police's tiny magical unit comes with real training under Inspector Thomas Nightingale, the last officially sanctioned wizard in England.",
      },
      {
        type: 'labeled',
        label: 'The Magic:',
        text: "Aaronovitch treats spellcasting as an actual discipline: forma, the Latin-rooted grammar of magic, has to be learned form by form, and using it wrong or too much has real physical consequences. It's magic with homework, not a wand-wave.",
      },
      {
        type: 'paragraph',
        text: "London's rivers are literal characters. Mama Thames and Father Thames are estranged deities running rival territories with the petty grudges and family politics of any divorced parents, and their tributary children have their own jobs, personalities, and feuds that predate the Metropolitan Police by centuries.",
      },
      {
        type: 'warning',
        text: "This is procedural pacing: cases build slowly through legwork and paperwork rather than set-piece action, and Aaronovitch layers in a lot of real London geography and history that rewards readers who like footnotes. The violence, when it arrives, is sudden and often genuinely disturbing rather than stylised.",
      },
    ],
  },
  aspects: [
    {
      heading:
        "If you loved the hidden magical bureaucracy under a real city: a magic system with real rules and real costs, a secretive government branch handling what the regular police can't...",
      recs: [
        {
          title: 'The Rook',
          author: "Daniel O'Malley",
          darkness_level: 2,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Checquy Files',
          series_number: 1,
          series_label: 'Series (3 books)',
          audiobook: true,
          note: "Myfanwy Thomas wakes up in a London park surrounded by dead bodies wearing latex gloves, with no memory of who she is, and has to reconstruct her own life from the paperwork she apparently left herself. She's a senior officer in the Checquy Group, Britain's secret agency for supernatural threats, and O'Malley writes that bureaucracy with real procedural specificity: memos, personnel files, budget meetings about apocalypse containment. The dry British institutional comedy runs through even the most dangerous scenes.",
          caveat: "Myfanwy's amnesia means the book is structured around her relearning her own organisation rather than a rookie's first exposure to it, a different entry point than Peter's. Also a larger, more established agency than the two-person Folly.",
          tags: [
            'Secret Agency',
            'British Bureaucracy',
            'Amnesia',
            'Hidden Society',
            'Witty',
          ],
          amazon_url:
            "https://www.amazon.com/s?k=The+Rook+Daniel+O%27Malley&tag=librariancura-20",
          bookshop_url:
            "https://bookshop.org/search?keywords=The+Rook+Daniel+O%27Malley&affiliate=122720",
        },
        {
          title: 'The Atrocity Archives',
          author: 'Charles Stross',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Laundry Files',
          series_number: 1,
          series_label: 'Series (13 books)',
          audiobook: true,
          note: "Bob Howard is IT support for the Laundry, the branch of British intelligence that deals with Lovecraftian mathematics and the horrors that come from solving the wrong equation, and Stross writes the most relentlessly bureaucratic version of this premise in the genre: expense reports, health and safety briefings, and committee meetings sit right next to genuine cosmic horror. If the Folly's paperwork and procedure was part of the appeal, the Laundry does more of exactly that, aimed even harder at the absurdity of running an occult civil service.",
          caveat: "Cosmic horror stakes (the universe itself is actively hostile) rather than Rivers of London's more grounded, personal-scale crime plots, and Bob's voice is drier and more overtly satirical than Peter's.",
          tags: [
            'Occult Bureaucracy',
            'Lovecraftian',
            'Secret Agency',
            'Satire',
            'British',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Atrocity+Archives+Charles+Stross&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Atrocity+Archives+Stross&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved London itself as a character: a city where every street, tunnel, and building has hidden history and hidden danger layered underneath...',
      recs: [
        {
          title: 'Neverwhere',
          author: 'Neil Gaiman',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: true,
          audiobook: true,
          note: "Richard Mayhew stops to help an injured girl on a London street and falls out of ordinary London entirely, into London Below, a parallel city built from the capital's place names taken literally (Earl's Court has an actual earl holding actual court; Islington is an actual angel). Gaiman is doing the same core move Aaronovitch does: treating London's geography and history as the raw material for the fantastic, rather than inventing a fantasy world from scratch.",
          caveat: "No police procedural structure and no magic system with rules; Richard's journey is a portal-fantasy quest through an already-hidden world rather than an investigation into a hidden one.",
          tags: [
            'Hidden City',
            'Portal Fantasy',
            'London Below',
            'Quest',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Neverwhere+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Neverwhere+Neil+Gaiman&affiliate=122720',
        },
        {
          title: 'Kraken',
          author: 'China Mieville',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "A giant squid specimen vanishes from the Darwin Centre, and museum curator Billy Harrow gets pulled into a London occult underworld of squid cults, knacker's yards for magic, and a police unit that handles crimes even the Folly wouldn't touch. Mieville's London is denser and weirder than Aaronovitch's, built from the same instinct that the city's ordinary infrastructure (museums, unions, junk shops) is hiding something extraordinary, just filtered through Mieville's stranger, more baroque imagination.",
          caveat: "Considerably harder prose and a stranger, more digressive plot than Rivers of London's clean procedural structure; this asks more patience and rewards readers who like their urban fantasy weirder and less linear.",
          tags: [
            'Weird Fiction',
            'Occult London',
            'Cult',
            'Dense Prose',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Kraken+China+Mieville&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Kraken+China+Mieville&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved gods and spirits living genuinely modern lives: old power wearing contemporary clothes, family drama between beings who used to be worshipped...',
      recs: [
        {
          title: 'American Gods',
          author: 'Neil Gaiman',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: true,
          audiobook: true,
          note: "Shadow gets released from prison the same week his wife dies, and takes a job as bodyguard and driver for a con man who turns out to be Odin, one of many old gods scraping by in modern America on dwindling belief while new gods of media and technology rise to replace them. Gaiman treats divinity the way Aaronovitch treats the Thames: old power that never left, just adapted, and is now dealing with rent, grudges, and family obligations like anyone else.",
          caveat: "American road-trip structure across the whole country rather than one city, and the gods here are fading and desperate rather than the Rivers' established, functioning (if petty) family. Considerably more explicit.",
          tags: [
            'Gods Among Us',
            'Road Trip',
            'Mythology',
            'Old vs New',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=American+Gods+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=American+Gods+Neil+Gaiman&affiliate=122720',
        },
        {
          title: 'The Golem and the Jinni',
          author: 'Helene Wecker',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Golem and the Jinni',
          series_number: 1,
          series_label: 'Series (2 books)',
          audiobook: true,
          note: "A golem and a jinni, both displaced from their origins and dropped into 1899 New York with no instructions, separately try to pass as ordinary people while carrying centuries of nature they can't fully suppress. Wecker is asking the same question the Rivers' genii loci raise from the other direction: what does an old, inhuman kind of power actually do with an ordinary human life, a job, a routine, once it has to have one?",
          caveat: "Historical setting (1899 New York) rather than contemporary London, no police procedural or crime plot, and a slower, more literary pace built around two central relationships rather than an investigation.",
          tags: [
            'Immortal Beings',
            'Found Family',
            'Historical Fantasy',
            'Coming of Age',
            'Literary',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Golem+and+the+Jinni+Helene+Wecker&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Golem+and+the+Jinni+Wecker&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the witty, procedural voice investigating supernatural crime as an actual case-by-case job...',
      recs: [
        {
          title: 'Storm Front',
          author: 'Jim Butcher',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Dresden Files',
          series_number: 1,
          series_label: 'Series (17+ books)',
          audiobook: true,
          note: "Harry Dresden is Chicago's only wizard listed in the phone book, and takes cases nobody else will touch: a double murder by magic the regular police can't explain, in a city where he's the only person both willing and able to explain it. Butcher's first-person voice runs on the same dry, self-deprecating wit as Peter's, narrating genuine danger with a running commentary that keeps the books funny even when the cases get ugly.",
          caveat: "Harry is an independent private investigator with no institutional backup and years of established practice, not a rookie learning the ropes under a mentor the way Peter is; American urban fantasy noir rather than British police procedural.",
          tags: [
            'Wizard Detective',
            'Witty Narrator',
            'Noir',
            'Urban Fantasy',
            'Case of the Book',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Storm+Front+Jim+Butcher&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Storm+Front+Jim+Butcher&affiliate=122720',
        },
        {
          title: 'A Master of Djinn',
          author: 'P. Djèlí Clark',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Dead Djinn Universe',
          series_number: 1,
          series_label: 'Series (2 books)',
          audiobook: true,
          note: "Agent Fatma el-Sha'arawi investigates the murder of a secret brotherhood devoted to a vanished djinn-summoner, in an alternate 1912 Cairo where magic became public infrastructure decades earlier. Fatma works the case with a dry, observant skepticism and a running rapport with her partner, set inside a magical civil service (djinn work permits, supernatural crime units, government committees on magical affairs) with real bureaucratic texture of its own.",
          caveat: "A different city and a different magical history entirely, djinn and Egyptian mythology rather than English river gods, and a period setting rather than contemporary London.",
          tags: [
            'Alternate History',
            'Witty Detective',
            'Djinn',
            'Political Intrigue',
            'Cairo',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=A+Master+of+Djinn+P+Djeli+Clark&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Master+of+Djinn+Clark&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like American Gods', slug: 'american-gods' },
    { title: 'Books Like Good Omens', slug: 'good-omens' },
    { title: 'Books Like Gideon the Ninth', slug: 'gideon-the-ninth' },
  ],
};
