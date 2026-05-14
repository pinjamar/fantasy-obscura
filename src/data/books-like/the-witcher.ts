import type { BooksLikeEntry } from '../books-like';

export const theWitcher: BooksLikeEntry = {
  slug: 'the-witcher',
  source: {
    title: 'The Last Wish',
    author: 'Andrzej Sapkowski',
    db_slug: 'the-last-wish',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780316029186-L.jpg',
    darkness_level: 4,
    heat_level: 'Open Door',
    series: 'The Witcher',
    series_number: 1,
    tropes: [
      'Monster Hunter',
      'Morally Grey Protagonist',
      'Fairy Tale Deconstruction',
      'Lesser Evil',
      'Found Family',
      'Slavic Folklore',
    ],
    angle:
      'The Definitive Dark Fairy Tale Fantasy — Where the Monsters Are Usually Human',
    answer_line:
      'If you loved The Witcher for its dark fairy tale retellings, its morally grey monster hunter, and its Eastern European atmosphere, start with Uprooted, The Blade Itself, and The Bear and the Nightingale.',
    why_people_love:
      'The Last Wish is a short story collection, and that form is inseparable from what makes it work. Sapkowski takes the machinery of European fairy tales — the cursed beauty, the wicked stepmother, the knight in the forest — and runs each one through a lens that asks who the story was serving and what it was hiding. Geralt of Rivia is the ideal vehicle for this: a professional monster hunter who has learned, over a career of dealing with the things people call monsters, that most of the real monsters have clean hands and titles. The world is built from Polish and Eastern European folklore rather than Tolkienian English myth, which means the magic feels older and crueller and more indifferent to human concerns. The short story format means each entry hits clean — no padding, no setup. The five novels that follow build the found family arc (Geralt, Ciri, Yennefer) across an increasingly brutal political backdrop. Start with The Last Wish. If the first story lands, everything else follows.',
  },
  aspects: [
    {
      heading:
        'If you loved the fairy tale deconstruction — familiar stories retold with the darkness put back in...',
      recs: [
        {
          title: 'Uprooted',
          author: 'Naomi Novik',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780804179034-L.jpg',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: true,
          audiobook: true,
          note: "Novik is writing from the same Polish folklore tradition as Sapkowski — the Wood, the Dragon, the village girl taken by the wizard are all drawn from the same source material. Where Sapkowski deconstructs through irony (the monster hunter who reveals the humans as the real monsters), Novik deconstructs through love and attention: she takes the fairy tale seriously enough to ask what it would actually feel like, and the answer is stranger and more complicated than the original. The prose is beautiful in a way Sapkowski's rarely is. Standalone. If the Eastern European flavour of The Witcher is what drew you, this is the most direct continuation of that feeling.",
          tags: [
            'Slavic Folklore',
            'Fairy Tale Retelling',
            'Forest Magic',
            'Standalone',
            'Female Protagonist',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Uprooted+Naomi+Novik&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik&affiliate=122720',
        },
        {
          title: 'The Bear and the Nightingale',
          author: 'Katherine Arden',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9781101885932-L.jpg',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Winternight',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "Arden writes Russian winter the way Sapkowski writes Polish forests: as a place where the old magic is still alive, indifferent to human prayer, and increasingly threatened by a new religion that would replace it with something tidier and less honest. Vasya, like Geralt, can perceive what others cannot — the household spirits, the frost demon, the creatures that the Church has decided don't exist. Both series are fundamentally about what is lost when the mythological world recedes, and what it costs the people who can still see it. The Winternight trilogy is warmer in tone than The Witcher but shares its folkloric DNA entirely.",
          tags: [
            'Slavic Folklore',
            'Russian Setting',
            'Old Gods',
            'Fairy Tale',
            'Winter Atmosphere',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Bear+and+the+Nightingale+Katherine+Arden&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Bear+and+the+Nightingale+Katherine+Arden&affiliate=122720',
        },
      ],
    },
    {
      heading:
        "If you loved Geralt's moral philosophy — the lesser evil, a professional in a world where the humans are always worse than the monsters...",
      recs: [
        {
          title: 'The Blade Itself',
          author: 'Joe Abercrombie',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
          darkness_level: 4,
          heat_level: null,
          standalone: false,
          series: 'The First Law',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: 'Logen Ninefingers is the Geralt of grimdark: a warrior whose reputation for violence precedes him everywhere he goes, who has tried to retire from the killing and cannot, who operates by a personal moral code in a world that has no use for personal moral codes. Abercrombie builds his First Law world with the same refusal to let anyone be simply right that Sapkowski uses — every institution is corrupt, every noble cause is being used by someone, and the people who survive are the ones who stopped believing their own heroic narrative. Where Sapkowski uses wit and folklore, Abercrombie uses structural irony and political cynicism. The endpoint is identical.',
          tags: [
            'Morally Grey',
            'Grimdark',
            'Anti-Hero',
            'Political Cynicism',
            'Professional Violence',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie&affiliate=122720',
        },
        {
          title: 'American Gods',
          author: 'Neil Gaiman',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780062572110-L.jpg',
          darkness_level: 4,
          heat_level: 'Open Door',
          standalone: true,
          audiobook: true,
          note: "Gaiman and Sapkowski are working in the same territory: what happens to old mythological creatures when the world stops believing in them? The Witcher's monsters are remnants of a magical age being driven out by human expansion; Gaiman's gods are immigrants, run-down and forgotten, surviving on the margins of an America that has moved on to new objects of worship. Shadow navigates between gods and humans with the same wary neutrality Geralt applies to his contracts — both are professionals caught in conflicts larger than themselves, trying to find a line of least harm. Tonally different (American Gods is road novel, elegy) but spiritually identical.",
          tags: [
            'Mythology',
            'Old Gods',
            'Road Fantasy',
            'Morally Grey',
            'Dark Fantasy',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=American+Gods+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=American+Gods+Neil+Gaiman&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved Geralt and Ciri — the reluctant guardian and the child of destiny, the found family built across an impossible world...',
      recs: [
        {
          title: "Assassin's Apprentice",
          slug: 'assassins-apprentice',
          author: 'Robin Hobb',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780553573398-L.jpg',
          darkness_level: 4,
          heat_level: null,
          standalone: false,
          series: 'Farseer',
          series_number: 1,
          series_label: 'Trilogy (complete, part of a larger world)',
          audiobook: true,
          note: "FitzChivalry Farseer is a royal bastard — a child of destiny who is also a problem — raised by reluctant guardians who come to love him against their better judgment. The Fitz/Burrich/Chade dynamic is the closest thing in fantasy to the Geralt/Ciri dynamic: hard men who aren't built for tenderness, slowly destroyed by how much they care about a child who was never supposed to be their problem. Hobb writes emotional damage with the same precision Sapkowski applies to moral philosophy. The series is darker and slower than The Witcher; by the end of the trilogy you will feel it the same way.",
          tags: [
            'Found Family',
            'Child of Destiny',
            'Reluctant Guardian',
            'Dark Fantasy',
            'Emotional Depth',
          ],
          amazon_url:
            "https://www.amazon.com/s?k=Assassin&tag=librariancura-20's+Apprentice+Robin+Hobb",
          bookshop_url:
            "https://bookshop.org/search?keywords=Assassin's+Apprentice+Robin+Hobb",
        },
        {
          title: 'The Lies of Locke Lamora',
          author: 'Scott Lynch',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
          darkness_level: 4,
          heat_level: null,
          standalone: false,
          series: 'Gentleman Bastard',
          series_number: 1,
          audiobook: true,
          note: "Lynch's origin story for Locke Lamora mirrors the Geralt/Ciri structure from the other side: a boy taken in by a criminal mastermind and raised as a weapon, becoming something the people who raised him didn't entirely plan. The found family in The Lies of Locke Lamora — Chains, Locke, Bug, Jean — is built and destroyed in the same novel, with the same understanding of how much those unlikely attachments cost that Sapkowski brings to the Witcher saga. The world is pseudo-Venetian rather than Slavic but the moral register is identical: wit as armor, violence as profession, loyalty as the one thing that isn't for sale.",
          tags: [
            'Found Family',
            'Heist Fantasy',
            'Morally Grey',
            'Con Artists',
            'Dark Wit',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora+Lynch&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Uprooted', slug: 'uprooted' },
    {
      title: "Books Like Assassin's Apprentice",
      slug: 'assassins-apprentice',
    },
    { title: 'Books Like The Blade Itself', slug: 'the-blade-itself' },
  ],
};
