import type { BooksLikeEntry } from '../books-like';

export const discworld: BooksLikeEntry = {
  slug: 'discworld',
  source: {
    title: 'Discworld',
    author: 'Terry Pratchett',
    db_slug: 'the-colour-of-magic',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780062225757-L.jpg',
    darkness_level: 2,
    heat_level: null,
    series: 'Discworld',
    series_number: 1,
    tropes: [
      'Satire',
      'Comedy Fantasy',
      'Found Family',
      'Death as Character',
      'Subverted Tropes',
      'Political Fantasy',
      'Ensemble Cast',
    ],
    angle:
      '41 novels of satirical comedy fantasy: Pratchett at the intersection of funny, wise, and furious',
    answer_line:
      "Books that hit the same note as Discworld: Good Omens for the footnotes and philosophical comedy of an angel and a demon who have grown too fond of humanity to let the Apocalypse proceed on schedule, Jonathan Strange & Mr Norrell for dry footnote-dense British wit turned on the English professional class with far more Victorian darkness, The House in the Cerulean Sea for the argument that decency is a form of resistance, the found family, and the warmth without the acid.",
    why_people_love:
      "Terry Pratchett was the most widely read British author of the 20th century for a reason that takes reading him to understand: the jokes are real jokes, the satire is precise, and the compassion is genuine. Discworld starts as a parody of fantasy and grows, over 41 books, into a complete civilisation: Ankh-Morpork as a lens on every human institution from war to money to journalism to death itself. The early books are lightweight parody; by Guards! Guards! the series has found something deeper. Sam Vimes is angry in the right direction. Granny Weatherwax does what has to be done. Death is the most humane character in any fantasy series. Pratchett was writing while dying of early-onset Alzheimer's and his last books argue, with furious wit, for the value of human dignity. All 41 novels are published.",
    why_people_love_rich: [
      {
        type: 'paragraph',
        text: "Terry Pratchett was the most widely read British author of the 20th century for a reason that takes reading him to understand: the jokes are real jokes, the satire is precise, and the compassion is genuine. Discworld starts as a parody of fantasy and grows, over 41 books, into a complete civilisation.",
      },
      {
        type: 'labeled',
        label: 'Where to Start:',
        text: "Not The Colour of Magic: the early books are lightweight parody. Start with Guards! Guards! for the City Watch, Equal Rites for the Witches, or Mort for Death. By Guards! Guards!, the series has found what it actually is: Sam Vimes angry in the right direction, Granny Weatherwax doing what has to be done, Death as the most humane character in any fantasy series.",
      },
      {
        type: 'paragraph',
        text: "Pratchett was writing while dying of early-onset Alzheimer's and his last books argue, with furious wit, for the value of human dignity. Raising Steam, Snuff, and Unseen Academicals all carry that knowledge. Reading them that way changes what they feel like.",
      },
      {
        type: 'warning',
        text: "41 novels means there is no single correct reading order and no obligation to read all of them. The sub-series (Watch, Witches, Death, Wizards, Moist) are largely independent. The early books do not represent the series at its best and starting there will give you the wrong impression.",
      },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the wit (the footnotes, the wordplay, the jokes that land on three levels at once and leave you thinking about them days later)...',
      recs: [
        {
          title: 'Good Omens',
          author: 'Terry Pratchett & Neil Gaiman',
          author_note:
            'co-written by Pratchett (the closest thing to Discworld outside Discworld)',
          darkness_level: 2,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: "An angel and a demon who have been on Earth since the Beginning have grown rather fond of it and are quietly conspiring to prevent the Apocalypse. Co-written by Pratchett and Gaiman, Good Omens has Pratchett's comic engine running at full power: the timing, the footnotes, the jokes that are also philosophical observations about the nature of good and evil, combined with Gaiman's mythology and darkness. If you have already read it: try Pratchett's standalone Nation (2008), his most explicitly philosophical book and the one he wrote knowing he was dying.",
          caveat: "Gaiman's presence shifts the tone: darker, more mythological, less relentlessly satirical than Discworld. Readers who want Pratchett's warmth and find his darkness bracing may find Gaiman's contribution pulls toward something colder.",
          tags: [
            'Comedy Fantasy',
            'Angels and Demons',
            'Apocalypse',
            'British Wit',
            'Buddy Comedy',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Good+Omens+Pratchett+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Good+Omens+Pratchett+Gaiman&affiliate=122720',
        },
        {
          title: "The Hitchhiker's Guide to the Galaxy",
          author: 'Douglas Adams',
          darkness_level: 1,
          heat_level: null,
          standalone: false,
          series: "The Hitchhiker's Guide to the Galaxy",
          series_number: 1,
          series_label: 'Series (5 books, complete)',
          audiobook: true,
          note: "The other pillar of British comic fantasy. Adams and Pratchett are not the same writer: Adams is cooler, more absurdist, more interested in the comedy of meaninglessness; Pratchett is warmer and more interested in what people do with the absurdity. But both are doing the thing where the jokes are actually about something, where the comedy is the vehicle for genuinely interesting thought about consciousness, bureaucracy, and the human condition. Start with book 1, which is also the funniest.",
          caveat: "Adams is more nihilistic than Pratchett. The jokes have a different relationship to meaning: Adams finds meaninglessness funny; Pratchett finds people finding meaning inside meaninglessness funny. These are different books doing a related but distinct thing.",
          tags: [
            'Sci-Fi Comedy',
            'Absurdist Humour',
            'British Wit',
            'Space Opera',
            'Philosophical Comedy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Hitchhiker%27s+Guide+to+the+Galaxy+Douglas+Adams&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Hitchhikers+Guide+to+the+Galaxy+Adams&affiliate=122720',
        },
      ],
    },
    {
      heading:
        "If you loved the satire (every Discworld book as a lens on a real human institution, the way Pratchett used fantasy to say things about war, religion, journalism, or money that straight fiction couldn't)...",
      recs: [
        {
          title: 'Jonathan Strange & Mr Norrell',
          author: 'Susanna Clarke',
          darkness_level: 3,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: "Clarke is doing exactly what Pratchett does: using fantasy to satirise a very specific slice of English society, but at novel-length depth and with a Victorian register instead of comedy. The footnotes are Pratchettian (dry, elaborate, occasionally revealing more than the main text), the target is the English professional class and its relationship to magic as property, and the Napoleonic backdrop gives it the same texture of institutions grinding individuals. It is slower and more melancholy than Discworld, but readers who loved the way Pratchett used world-building to make a point will find Clarke doing the same thing with greater darkness. Standalone.",
          caveat: "Far slower and more melancholy than Discworld. Clarke is not doing comedy; she is doing dry wit. Readers expecting Pratchett's pace and warmth will find Jonathan Strange actively austere.",
          tags: [
            'British Fantasy',
            'Satire',
            'Historical Fantasy',
            'Footnotes',
            'Literary Fantasy',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell+Clarke&affiliate=122720',
        },
        {
          title: 'The Eyre Affair',
          author: 'Jasper Fforde',
          darkness_level: 2,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Thursday Next',
          series_number: 1,
          series_label: 'Series (7 books, complete)',
          audiobook: true,
          note: "Thursday Next is a literary detective in a 1985 where time travel is mundane, cloning extinct animals is legal, and people care intensely about whether Francis Bacon wrote Shakespeare. Fforde is the writer most directly in Pratchett's comic tradition: the same pleasure in an absurd premise taken with complete seriousness, the same footnote-adjacent wit, the same jokes-that-are-also-observations. The Eyre Affair is structured around Jane Eyre being kidnapped from inside the novel, which tells you everything you need to know. If you loved the City Watch books' procedural-comedy structure or the way Pratchett made bureaucracy funny, Fforde is the writer to read next.",
          caveat: "More parodic and more plot-dependent than Discworld. The best jokes reward familiarity with nineteenth-century literature. Less emotionally resonant than the Discworld books that justify being called serious.",
          tags: [
            'Literary Satire',
            'Comedy Fantasy',
            'British Wit',
            'Time Travel',
            'Detective',
            'Absurdist',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Eyre+Affair+Jasper+Fforde&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Eyre+Affair+Jasper+Fforde&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the warmth (the compassion underneath the jokes, the found family of the Watch, the books that are funny but also argue fiercely for human dignity)...',
      recs: [
        {
          title: 'The House in the Cerulean Sea',
          author: 'TJ Klune',
          darkness_level: 1,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "A caseworker for magical creatures falls in love with a man running a home for children who might end the world. Klune is working in a different register from Pratchett: gentler, more explicitly cozy, without the satire. But the underlying argument is identical: kindness is a form of resistance, bureaucracy is the enemy of human connection, and the found family that forms around shared decency is the most valuable thing the world contains. The House in the Cerulean Sea is what you read when you want the warmth of the best Discworld books (Reaper Man, Going Postal, the Tiffany Aching books) without the acidity. Standalone.",
          caveat: "Much gentler and more overtly cozy than Discworld. The satire of bureaucracy is present but far softer. Readers who came specifically for the fury in Pratchett at his best will find Klune more sentimental.",
          tags: [
            'Cozy Fantasy',
            'Found Family',
            'Kindness as Power',
            'Magical Creatures',
            'Queer Romance',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+House+in+the+Cerulean+Sea+TJ+Klune&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+House+in+the+Cerulean+Sea+Klune&affiliate=122720',
        },
        {
          title: 'The Goblin Emperor',
          author: 'Katherine Addison',
          darkness_level: 2,
          heat_level: null,
          standalone: true,
          audiobook: true,
          note: "Maia, a half-goblin outcast, unexpectedly becomes emperor and tries, earnestly and persistently, to be kind in a court designed to grind kindness out of rulers. Addison shares Pratchett's central conviction (that decency is not weakness, that a person can hold moral ground inside an immoral system) and The Goblin Emperor is essentially a novel about that argument. Maia has Sam Vimes' moral clarity without Vimes' anger; the court has Ankh-Morpork's institutional corruption without the comedy. If you loved the Watch books for the way Vimes refuses to let the system make him into the system, The Goblin Emperor is the quieter, warmer version of the same story. Standalone.",
          caveat: "Slower and quieter than any Discworld book. The political intrigue is real but subordinate to Maia's internal experience of attempting decency in a system designed against it. No comedy at all.",
          tags: [
            'Court Politics',
            'Kindness as Strength',
            'Unlikely Ruler',
            'Found Family',
            'Hopeful Fantasy',
            'Standalone',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Goblin+Emperor+Katherine+Addison&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Good Omens', slug: 'good-omens' },
    { title: 'Books Like Jonathan Strange & Mr Norrell', slug: 'jonathan-strange-mr-norrell' },
    { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
    { title: 'Books Like The House in the Cerulean Sea', slug: 'the-house-in-the-cerulean-sea' },
    { title: 'Books Like Piranesi', slug: 'piranesi' },
    { title: 'Books Like American Gods', slug: 'american-gods' },
  ],
};
