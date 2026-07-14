import type { BooksLikeEntry } from '../books-like';

export const percyJackson: BooksLikeEntry = {
  slug: 'percy-jackson',
  source: {
    title: 'The Lightning Thief',
    author: 'Rick Riordan',
    reading_order_slug: 'rick-riordan',
    db_slug: 'percy-jackson-and-the-lightning-thief',
    darkness_level: 2,
    heat_level: 'Sweet Romance',
    series: 'Percy Jackson & The Olympians',
    series_number: 1,
    tropes: [
      'Chosen One',
      'Found Family',
      'Hidden Magical World',
      'Mythology Retelling',
      'Coming of Age',
      'Quest',
      'Misfit Hero',
      'Prophecy',
    ],
    angle: 'Mythology & Hidden Worlds',
    answer_line:
      "If you loved Percy Jackson for the Greek mythology woven into the modern world, the fast-paced quests, and the found family of misfits, start with The Song of Achilles, Aru Shah and the End of Time, and Harry Potter and the Sorcerer's Stone.",
    why_people_love:
      "Percy Jackson works because Riordan found something genuinely clever: Greek mythology isn't dead, it's just hidden. Camp Half-Blood sits behind an enchanted hill in Long Island. The gods are real and petty and driving taxis. That premise (the ancient world alive and embarrassing underneath the modern one) is endlessly generative. But what actually makes it stick is Percy himself. He's dyslexic, ADHD, bad at school, perpetually underestimated, and written with the exact voice of a twelve-year-old who is funnier than adults give him credit for. The humour is fast and self-aware without being sarcastic about the mythology it loves. The quests are structured like road trips: three kids, a prophecy, a deadline, and Riordan keeps them moving. Each book adds a new piece of the Olympian world while the central mystery (who is betraying Olympus?) builds toward a revelation big enough to justify five books of setup. What readers are actually chasing isn't Greek mythology specifically; it's that feeling of a real, ancient world hidden just behind the world you know.",
    why_people_love_rich: [
      { type: 'paragraph', text: "Percy Jackson works because Riordan found something genuinely clever: Greek mythology isn't dead, it's just hidden. Camp Half-Blood sits behind an enchanted hill in Long Island. The gods are real and petty and driving taxis. That premise (the ancient world alive and embarrassing underneath the modern one) is endlessly generative. But what actually makes it stick is Percy himself: dyslexic, ADHD, bad at school, perpetually underestimated, and written with the exact voice of a twelve-year-old who is funnier than adults give him credit for." },
      { type: 'labeled', label: 'Camp Half-Blood:', text: "Not just a safe haven. A world where the things that made Percy feel broken in ordinary school (dyslexia because his brain is wired for Ancient Greek, ADHD because he has the instincts of a warrior) turn out to be adaptations. Riordan's central structural insight is that the misfit's limitations are secretly advantages, and he built an entire mythology around validating that premise for readers who recognised themselves in it." },
      { type: 'paragraph', text: "The quests are structured like road trips: three kids, a prophecy, a deadline, and Riordan keeps them moving. Each book adds a new piece of the Olympian world while the central mystery builds toward a revelation big enough to justify the accumulated setup. What readers are actually chasing isn't Greek mythology specifically; it's the feeling of a real, ancient world hidden just behind the world you know." },
      { type: 'warning', text: "The original series is five books and complete. The sequel series (Heroes of Olympus, Trials of Apollo) expand the world considerably and the quality stays high. Readers who want Percy specifically should read the original five first; readers who want more of the world can continue from there. The books were written for middle-grade readers but are enjoyed across all ages." },
    ],
  },
  aspects: [
    {
      heading:
        'For adults who grew up with Percy Jackson: mythology that takes the gods seriously',
      recs: [
        {
          title: 'The Song of Achilles',
          author: 'Madeline Miller',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: true,
          audiobook: true,
          note: "The adult answer to Percy Jackson's love of Greek mythology. Miller retells the Iliad through the relationship between Patroclus and Achilles, and treats the gods as genuinely terrifying rather than comic. The writing is beautiful and precise, the mythology is accurate and resonant, and the ending is devastating in the way that only Greek tragedy can be.",
          caveat: "Explicit heat level and considerably more mature content than Percy Jackson; this is a tragic literary novel for adults, not a middle-grade adventure.",
          tags: [
            'Greek Mythology',
            'Ancient Greece',
            'Literary Fantasy',
            'Troy',
            'Emotional',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Song+of+Achilles+Madeline+Miller&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Song+of+Achilles+Miller&affiliate=122720',
        },
        {
          title: 'American Gods',
          slug: 'american-gods',
          author: 'Neil Gaiman',
          darkness_level: 3,
          heat_level: 'Explicit',
          standalone: true,
          audiobook: true,
          note: "The same core premise as Percy Jackson (the old gods are real and living in America), but taken to its darkest, most literary extreme. Shadow Moon is released from prison and recruited by Mr Wednesday (Odin) to fight a war between the old gods and new ones (Media, Technology, the Internet). The book is slow, strange, and melancholy in ways Percy Jackson never is, but it asks the same question: what happens to gods when people stop believing in them?",
          caveat: "Explicit content and a slow, melancholy pace that's the opposite of Percy Jackson's quick, funny momentum; this is adult literary fiction, not middle-grade adventure.",
          tags: [
            'Mythology',
            'Road Trip',
            'Gods',
            'Dark',
            'American Setting',
          ],
          warning: 'Sexual content, graphic violence',
          amazon_url:
            'https://www.amazon.com/s?k=American+Gods+Neil+Gaiman&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=American+Gods+Neil+Gaiman&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the hidden mythological world layered over modern life',
      recs: [
        {
          title: 'Aru Shah and the End of Time',
          author: 'Roshani Chokshi',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Pandava Quintet',
          series_number: 1,
          series_label: 'Series (5 books)',
          audiobook: true,
          note: "Part of the Rick Riordan Presents imprint: Rick Riordan championing other-mythology books for exactly the Percy Jackson audience. Aru Shah accidentally frees a demon tied to the end of the universe and discovers she's a reincarnation of one of the Pandava brothers from the Mahabharata. Hindu mythology gets the same treatment Riordan gave Greek: vivid, fast, funny, reverent without being dry.",
          caveat: "A slightly more ornate, poetic prose style than Riordan's plain wit, and Hindu mythology will be less immediately familiar to readers who don't already know it.",
          tags: [
            'Hindu Mythology',
            'Hidden Magic',
            'Chosen One',
            'Found Family',
            'Middle Grade',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Aru+Shah+End+of+Time+Chokshi&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Aru+Shah+End+of+Time&affiliate=122720',
        },
        {
          title: 'Magnus Chase and the Gods of Asgard',
          slug: 'the-sword-of-summer',
          author: 'Rick Riordan',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Magnus Chase and the Gods of Asgard',
          series_number: 1,
          series_label: 'Trilogy',
          audiobook: true,
          note: 'If you loved Percy Jackson and want exactly that energy but with Norse mythology, this is the obvious next read. Same author, same formula, deliberately so. Magnus Chase is a Boston homeless teen who dies on page one and wakes up in Valhalla. Riordan applies his full Percy Jackson toolkit to the Norse pantheon: Odin as an eccentric manipulator, Thor as a red-headed thunderer with a weakness for flattery, Loki as the chaos agent.',
          caveat: "Same author and formula as Percy Jackson, so readers wanting a genuinely different voice may find it too familiar rather than a fresh discovery.",
          tags: [
            'Norse Mythology',
            'Hidden Magic',
            'Quest',
            'Valhalla',
            'Middle Grade',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Magnus+Chase+Gods+Asgard+Riordan&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Magnus+Chase+Gods+Asgard&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the questing trio: the misfit group on a dangerous road trip',
      recs: [
        {
          title: "Harry Potter and the Sorcerer's Stone",
          slug: 'harry-potter-philosophers-stone',
          author: 'J.K. Rowling',
          darkness_level: 1,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Harry Potter',
          series_number: 1,
          series_label: 'Series (7 books)',
          audiobook: true,
          note: "The other half of the same generation-defining experience. Percy Jackson and Harry Potter were published just five years apart and shaped the same readers: both are stories about a boy who doesn't fit, who is told he's ordinary, who discovers a hidden world of magic that has been operating around him all along, and who builds a found family through shared danger. The structural DNA is identical: school as home, friends as family, a prophecy that makes your life someone else's battlefield.",
          caveat: "The tone darkens considerably by book four in a way Percy Jackson never does, and the found family forms around a boarding school rather than a summer camp.",
          tags: [
            'Hidden Magical World',
            'Magic School',
            'Chosen One',
            'Found Family',
            'Quest',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Harry+Potter+Sorcerer%27s+Stone+Rowling&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Harry+Potter+Sorcerers+Stone+Rowling&affiliate=122720',
        },
        {
          title: 'Nevermoor: The Trials of Morrigan Crow',
          author: 'Jessica Townsend',
          darkness_level: 2,
          heat_level: 'Sweet Romance',
          standalone: false,
          series: 'Nevermoor',
          series_number: 1,
          series_label: 'Series (4 books so far)',
          audiobook: true,
          note: "Morrigan Crow is cursed to die on her eleventh birthday, then is rescued by a mysterious patron and brought to Nevermoor, a magical city, to compete for a spot in the Wundrous Society. The book has Percy Jackson's energy exactly: fast, funny, inventive, with a protagonist who is told she's worthless and proves everyone wrong through stubbornness and friends. Townsend's world-building is genuinely original: Nevermoor doesn't borrow from any existing mythology, it builds its own folklore.",
          caveat: "An entirely original mythology rather than a real-world pantheon, so readers who specifically wanted more Greek (or any real-world) myth won't find that here.",
          tags: [
            'Magic School',
            'Chosen One',
            'Competitions',
            'Hidden World',
            'Middle Grade',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Nevermoor+Trials+Morrigan+Crow+Townsend&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Nevermoor+Trials+Morrigan+Crow&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    { title: 'Books Like Harry Potter', slug: 'harry-potter' },
    { title: 'Books Like The Hobbit', slug: 'the-hobbit' },
    { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
  ],
};
