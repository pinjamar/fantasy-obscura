import type { BooksLikeEntry } from '../books-like';

export const theWitcher: BooksLikeEntry = {
  slug: 'the-witcher',
  source: {
    title: 'The Last Wish',
    author: 'Andrzej Sapkowski',
    reading_order_slug: 'witcher',
    db_slug: 'the-last-wish',
    darkness_level: 3,
    heat_level: 'Explicit',
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
      'The Definitive Dark Fairy Tale Fantasy: Where the Monsters Are Usually Human',
    answer_line:
      'If you loved The Witcher for its dark fairy tale retellings, its morally grey monster hunter, and its Eastern European atmosphere, start with Uprooted, The Blade Itself, and Assassin\'s Apprentice.',
    why_people_love:
      'The Last Wish is a short story collection, and that form is inseparable from what makes it work. Sapkowski takes the machinery of European fairy tales (the cursed beauty, the wicked stepmother, the knight in the forest) and runs each one through a lens that asks who the story was serving and what it was hiding. Geralt of Rivia is the ideal vehicle for this: a professional monster hunter who has learned, over a career of dealing with the things people call monsters, that most of the real monsters have clean hands and titles. The world is built from Polish and Eastern European folklore rather than Tolkienian English myth, which means the magic feels older and crueller and more indifferent to human concerns. The short story format means each entry hits clean: no padding, no setup. The five novels that follow build the found family arc (Geralt, Ciri, Yennefer) across an increasingly brutal political backdrop. Start with The Last Wish. If the first story lands, everything else follows.',
    why_people_love_rich: [
      { type: 'paragraph', text: "The Last Wish works because Sapkowski takes the machinery of European fairy tales (the cursed princess, the wicked stepmother, the beast in the forest) and asks who those stories were serving. The answer is always: not the people the stories were about. Each short story is a fairy tale retold through a lens that restores the darkness the original sanitised away, and the cumulative effect is a world that feels older and more honest than most fantasy, built from Polish and Eastern European folklore rather than the Tolkienian English myth tradition." },
      { type: 'labeled', label: 'Geralt:', text: "A professional monster hunter who has learned, across a career of dealing with the things people call monsters, that most of the real ones have clean hands and titles. He operates by a moral philosophy, the lesser evil, which is not optimism but pragmatism: in a world where every choice causes harm, the task is to choose the harm that can be lived with. Sapkowski never lets Geralt be simply right. The clients who hire him are often worse than the creatures they want killed, and the stories turn on the moment Geralt recognises that the job is a trap." },
      { type: 'paragraph', text: "The short story format is inseparable from what makes The Last Wish excellent: each entry hits clean, no padding, no setup, no obligation to service a larger narrative. The five novels that follow build the found family arc (Geralt, Ciri, Yennefer) across an increasingly brutal political backdrop. The series gets darker and more conventionally plotted as it goes; the short story collections remain the sharpest expression of what Sapkowski can do. Start here. If the first story lands, everything follows." },
      { type: 'warning', text: "The Witcher series contains graphic violence, open-door sexual content, and a moral universe in which no side is clean and no outcome is fully good. Sapkowski's political cynicism is deep and consistent; readers who need protagonists to win, or need the world to be redeemable, will find the series increasingly uncomfortable as it progresses. The translation quality varies significantly between editions; the newer translations are recommended. The short story collections (The Last Wish, Sword of Destiny) are the best entry point regardless of familiarity with the games." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the fairy tale deconstruction: familiar stories retold with the darkness put back in...',
      recs: [
        {
          title: 'Uprooted',
          author: 'Naomi Novik',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: true,
          audiobook: true,
          note: "Novik is writing from the same Polish folklore tradition as Sapkowski: the Wood, the Dragon, the village girl taken by the wizard are all drawn from the same source material. Where Sapkowski deconstructs through irony (the monster hunter who reveals the humans as the real monsters), Novik deconstructs through love and attention: she takes the fairy tale seriously enough to ask what it would actually feel like, and the answer is stranger and more complicated than the original. The prose is beautiful in a way Sapkowski's rarely is.",
          caveat: "Standalone rather than a series, and considerably warmer and more romantic in its central relationship than anything in The Witcher.",
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
          darkness_level: 3,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Winternight Trilogy',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "Arden writes Russian winter the way Sapkowski writes Polish forests: as a place where the old magic is still alive, indifferent to human prayer, and increasingly threatened by a new religion that would replace it with something tidier and less honest. Vasya, like Geralt, can perceive what others cannot: the household spirits, the frost demon, the creatures that the Church has decided don't exist. Both series are fundamentally about what is lost when the mythological world recedes, and what it costs the people who can still see it.",
          caveat: "Warmer in tone than The Witcher throughout, and there's no monster-hunter-for-hire structure; Vasya's conflict is with her own village and family rather than paid contracts.",
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
        "If you loved Geralt's moral philosophy: the lesser evil, a professional in a world where the humans are always worse than the monsters...",
      recs: [
        {
          title: 'The Blade Itself',
          author: 'Joe Abercrombie',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The First Law',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: 'Logen Ninefingers is the Geralt of grimdark: a warrior whose reputation for violence precedes him everywhere he goes, who has tried to retire from the killing and cannot, who operates by a personal moral code in a world that has no use for personal moral codes. Abercrombie builds his First Law world with the same refusal to let anyone be simply right that Sapkowski uses: every institution is corrupt, every noble cause is being used by someone, and the people who survive are the ones who stopped believing their own heroic narrative.',
          caveat: "No folklore or fairy-tale framing at all; the moral cynicism is delivered through court politics and war rather than monster-of-the-week contracts.",
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
          slug: 'american-gods',
          author: 'Neil Gaiman',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: true,
          audiobook: true,
          note: "Gaiman and Sapkowski are working in the same territory: what happens to old mythological creatures when the world stops believing in them? The Witcher's monsters are remnants of a magical age being driven out by human expansion; Gaiman's gods are immigrants, run-down and forgotten, surviving on the margins of an America that has moved on to new objects of worship. Shadow navigates between gods and humans with the same wary neutrality Geralt applies to his contracts: both are professionals caught in conflicts larger than themselves, trying to find a line of least harm.",
          caveat: "American road-novel structure rather than Slavic folklore, and the gods here are forgotten immigrants rather than monsters being actively hunted.",
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
        'If you loved Geralt and Ciri: the reluctant guardian and the child of destiny, the found family built across an impossible world...',
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
          series_label: 'Trilogy (complete, part of a larger world)',
          audiobook: true,
          note: "FitzChivalry Farseer is a royal bastard (a child of destiny who is also a problem) raised by reluctant guardians who come to love him against their better judgment. The Fitz/Burrich/Chade dynamic is the closest thing in fantasy to the Geralt/Ciri dynamic: hard men who aren't built for tenderness, slowly destroyed by how much they care about a child who was never supposed to be their problem. Hobb writes emotional damage with the same precision Sapkowski applies to moral philosophy.",
          caveat: "No monster-hunting structure; Fitz is an assassin bound to a royal house rather than an independent contractor, and the found family forms slowly across a full trilogy rather than short stories.",
          tags: [
            'Found Family',
            'Child of Destiny',
            'Reluctant Guardian',
            'Dark Fantasy',
            'Emotional Depth',
          ],
          amazon_url:
            "https://www.amazon.com/s?k=Assassin's+Apprentice+Robin+Hobb&tag=librariancura-20",
          bookshop_url:
            "https://bookshop.org/search?keywords=Assassin's+Apprentice+Robin+Hobb&affiliate=122720",
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
          note: "Lynch's origin story for Locke Lamora mirrors the Geralt/Ciri structure from the other side: a boy taken in by a criminal mastermind and raised as a weapon, becoming something the people who raised him didn't entirely plan. The found family in The Lies of Locke Lamora (Chains, Locke, Bug, Jean) is built and destroyed in the same novel, with the same understanding of how much those unlikely attachments cost that Sapkowski brings to the Witcher saga.",
          caveat: "Pseudo-Venetian heist fantasy rather than Slavic monster-hunting; the found family is criminal rather than incidental, and there's no folklore-retelling structure.",
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
