import type { BooksLikeEntry } from '../books-like';

export const theWheelOfTime: BooksLikeEntry = {
  slug: 'the-wheel-of-time',
  source: {
    title: 'Wheel of Time: The Eye of the World',
    author: 'Robert Jordan',
    db_slug: 'the-eye-of-the-world',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780765345424-L.jpg',
    darkness_level: 3,
    heat_level: null,
    series: 'The Wheel of Time',
    series_number: 1,
    tropes: [
      'Chosen One',
      'Epic Quest',
      'Magic System',
      'Multiple POVs',
      'World-Ending Stakes',
      'Found Family',
      'Female Magic Institution',
      'Political Intrigue',
    ],
    angle: 'Epic Quest Fantasy Series',
    answer_line:
      'If you loved The Eye of the World for the meticulous magic system, sprawling world, ensemble cast, and classic epic-fantasy scale, start with The Way of Kings, Gardens of the Moon and A Game of Thrones.',
    why_people_love: `The Wheel of Time is the most complete expression of epic fantasy as a genre project: fourteen books across twenty-two years of publication, completed after Robert Jordan's death in 2007 by Brandon Sanderson, totalling over four million words and one of the most elaborately constructed secondary worlds in fiction. Jordan did not invent epic fantasy but he refined its architecture to an extraordinary degree — the One Power's gender-split magic system, the Aes Sedai as a fully realised female institution with internal politics and centuries of history, dozens of distinct nations each with coherent cultures, and a chosen-one premise made systemic rather than arbitrary through the ta'veren mechanic. The series begins at a deliberate, almost pastoral pace and expands progressively, adding POVs and political layers with each volume. It demands enormous commitment: readers who bounced off the early books often struggled because Jordan builds everything before he uses it. The readers who committed consistently describe it as the defining reading experience of their lives — a world so richly inhabited that leaving it felt like grief.`,
    why_people_love_rich: [
      { type: 'paragraph', text: "The Wheel of Time is the most complete expression of epic fantasy as a genre project: fourteen books across twenty-two years of publication, completed after Robert Jordan's death in 2007 by Brandon Sanderson, totalling over four million words and one of the most elaborately constructed secondary worlds in fiction. Jordan refined epic fantasy's architecture to an extraordinary degree — the One Power's gender-split magic system, dozens of distinct nations each with coherent cultures, and a chosen-one premise made systemic through the ta'veren mechanic." },
      { type: 'labeled', label: 'The Aes Sedai:', text: "The White Tower is one of the most fully realised institutions in fantasy: a female organisation with centuries of internal politics, competing factions, a strict hierarchy, and a relationship to the outside world that is simultaneously essential and resented. Jordan built it with the same specificity he brought to everything — the Ajah system, the Accepted and Novices, the way Aes Sedai never lie but always mislead. The idea of women holding institutional power of this kind, taken seriously rather than as backdrop, was one of the series' defining contributions to the genre." },
      { type: 'paragraph', text: "The series begins at a deliberate, almost pastoral pace and expands progressively, adding POVs and political layers with each volume. Jordan builds everything before he uses it, which is why the early books' apparent slowness pays off later. The readers who committed consistently describe it as the defining reading experience of their lives — a world so richly inhabited that leaving it felt like grief." },
      { type: 'warning', text: "The Wheel of Time is a fourteen-book series, and the middle volumes (books 7-10) are widely considered the slowest — some readers stall there and don't return. Jordan died in 2007 before completing the series; the final three books were written by Brandon Sanderson from Jordan's notes and have a different rhythm. Jordan's female characters are occasionally written with period-appropriate frustration by modern standards. The series rewards the commitment it asks for; be honest with yourself about whether you'll make it." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the meticulous magic system and the depth of world-building...',
      recs: [
        {
          title: 'The Way of Kings',
          author: 'Brandon Sanderson',
          author_note: '(the man who completed Wheel of Time)',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
          darkness_level: 3,
          standalone: false,
          series: 'The Stormlight Archive',
          series_number: 1,
          series_label: 'Series (10 books planned, 5 released)',
          audiobook: true,
          note: "Stormlight is what happens when the author who finished WoT builds his own universe from scratch at comparable scale. Three interconnected magic systems, multiple continents, thousands of years of documented history, and a cast of characters who are psychologically complex in ways WoT only gestures at. Sanderson's prose is more efficient than Jordan's and his pacing is tighter, but the sense that the world exists fully outside the frame of the story — that you are reading a slice of something enormous — is identical. Kaladin's arc in book one is some of the best character work in modern epic fantasy.",
          caveat: "ten books planned, five released — a serious commitment to something unfinished, though each book resolves its own arc.",
          tags: [
            'Magic System',
            'Epic World-Building',
            'Multiple POVs',
            'Same Author (completed WoT)',
            'Massive Scope',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson&affiliate=122720',
        },
        {
          title: 'Gardens of the Moon',
          author: 'Steven Erikson',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765348784-L.jpg',
          darkness_level: 4,
          standalone: false,
          series: 'Malazan Book of the Fallen',
          series_number: 1,
          series_label: 'Series (10 books, complete)',
          audiobook: true,
          note: 'The most ambitious project ever attempted in epic fantasy: ten books, a 300,000-year history, hundreds of characters across multiple continents, and absolutely no hand-holding. Erikson drops the reader into a fully-formed world mid-campaign with no glossary and trusts them to catch up. The scale makes the Wheel of Time look contained. Readers who loved WoT for the feeling of depth beneath the story — the sense that empires and ages existed before the book began — will find that feeling amplified here to an almost overwhelming degree.',
          caveat: "the first two books are by wide consensus the most challenging entry point in the genre; many readers require a second attempt. If you push through, the payoff is exceptional.",
          tags: [
            'Maximum Scope',
            'Deep Lore',
            'Military Fantasy',
            'No Hand-Holding',
            'Complete Series',
          ],
          warning: 'Violence, mature themes throughout',
          amazon_url:
            'https://www.amazon.com/s?k=Gardens+of+the+Moon+Steven+Erikson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Erikson&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the multi-POV ensemble and watching a cast grow across many books...',
      recs: [
        {
          title: 'A Game of Thrones',
          author: 'George R.R. Martin',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg',
          darkness_level: 5,
          standalone: false,
          series: 'A Song of Ice and Fire',
          series_number: 1,
          series_label: 'Series (5 released of 7 planned, unfinished)',
          audiobook: true,
          note: "The other defining epic fantasy of the 1990s, written in partial response to conventions Jordan helped establish. Martin shares Jordan's ambition for scope and ensemble but applies it to a world where no character is safe, no arc is guaranteed a satisfying resolution, and magic is rare, strange, and frightening rather than systematic and learnable. The political realism is sharper, the moral landscape darker, and the deaths more consequential. The first three books (A Game of Thrones, A Clash of Kings, A Storm of Swords) are among the best work in the genre.",
          caveat: "the series remains unfinished after two decades with no reliable publication timeline for the final volumes — approach with that awareness.",
          tags: [
            'Multi-POV Epic',
            'Political Intrigue',
            'No Safe Characters',
            'Grimdark',
            'Same Ambition',
          ],
          warning: 'Graphic violence, sexual violence, war atrocity',
          amazon_url:
            'https://www.amazon.com/s?k=A+Game+of+Thrones+George+RR+Martin&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=A+Game+of+Thrones+George+RR+Martin&affiliate=122720',
        },
        {
          title: 'The Dragonbone Chair',
          author: 'Tad Williams',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780886773786-L.jpg',
          darkness_level: 3,
          standalone: false,
          series: 'Memory, Sorrow, and Thorn',
          series_number: 1,
          series_label: 'Series (trilogy, complete)',
          audiobook: true,
          note: 'Robert Jordan cited Memory, Sorrow, and Thorn as direct inspiration for the Wheel of Time, and the structural debt is visible: an unlikely young hero drawn out of a comfortable situation into an ancient world-ending conflict, a richly built secondary world drawn from real-world mythologies, and a cast spread across a continent pursuing separate threads that converge slowly. Williams builds with the same patient, cumulative method Jordan used. The prose is more literary and the pacing even more deliberate than WoT.',
          caveat: "extremely slow opening — the first third of book one is almost entirely scene-setting — but readers who gave it space consistently rate it as one of the great under-read series in the genre.",
          tags: [
            'Direct WoT Ancestor',
            'Epic Quest',
            'Multi-POV',
            'Slow Build',
            'Rich Mythology',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Dragonbone+Chair+Tad+Williams&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Dragonbone+Chair+Tad+Williams&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the Aes Sedai and the idea of women holding real institutional power...',
      recs: [
        {
          title: 'Mistborn: The Final Empire',
          slug: 'the-final-empire',
          author: 'Brandon Sanderson',
          cover_url:
            'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
          darkness_level: 3,
          standalone: false,
          series: 'Mistborn',
          series_number: 1,
          series_label: 'Series (trilogy, complete + sequel trilogy)',
          audiobook: true,
          note: "A female underdog protagonist discovering a rigorous, systematic magic ability in a world that considered her disposable. Sanderson built Allomancy with the same structural discipline Jordan used for the One Power — everything has rules, everything has cost, the learning arc is pleasurable because the system rewards attention. Vin's journey to wielding power that was deliberately withheld from people like her maps clearly onto WoT's central concern about female access to power. Significantly shorter and faster-paced than WoT, with a completed trilogy that fully resolves. A natural next series for WoT readers who want Sanderson's magic rigour at a more manageable scale.",
          tags: [
            'Female Protagonist',
            'Rigorous Magic System',
            'Heist Fantasy',
            'Chosen One',
            'Same Author (completed WoT)',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Mistborn+The+Final+Empire+Brandon+Sanderson&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson&affiliate=122720',
        },
        {
          title: 'The Poppy War',
          author: 'R.F. Kuang',
          cover_url:
            'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          darkness_level: 5,
          standalone: false,
          series: 'The Poppy War',
          series_number: 1,
          series_label: 'Series (trilogy, complete)',
          audiobook: true,
          note: "The Aes Sedai's power is titanic, gendered, and institutional — and so is Rin's. Kuang builds a female protagonist whose access to power runs through a military academy that was not designed for her, and whose ultimate abilities are framed explicitly as transgression. The One Power in WoT is terrible when misused; Rin's power is terrible in a way that is inseparable from its use. Both series are fundamentally concerned with what it costs a woman to wield power that the world tried to keep from her.",
          caveat: "extreme darkness, extended historical atrocity, graphic violence — a completely different tonal register from WoT's adventure-epic warmth. Only if you are prepared for serious grimdark.",
          tags: [
            'Female Protagonist',
            'Dark Power',
            'Military School',
            'Transgressive Magic',
            'Historical Basis',
          ],
          warning: 'War atrocity, genocide, drug addiction, graphic violence',
          amazon_url:
            'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
      darkness_level: 2,
      heat_level: 'Sweet Romance',
      tags: [
        'Magic System Depth',
        'Legendary Protagonist',
        'University Setting',
        'First Person Narrative',
      ],
      why: "If the One Power's internal logic was the part of WoT that made you lean forward, Sympathy and Naming are the most precisely constructed magic systems in the genre. Kvothe's arc — from poverty and obscurity to the legendary figure everyone talks about at the frame story's inn — has the same propulsive quality as WoT's chosen-one structure, compressed into one man's remembered life. The prose is a step up in literary ambition from Jordan's, the world smaller and less geopolitically complex. Rothfuss writes the university sections with the same pleasure in systems that Jordan brings to the Tower.",
      caveat: "the third book remains unwritten after fifteen years — the series is definitively unfinished.",
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss&affiliate=122720',
    },
    {
      title: 'The Blade Itself',
      author: 'Joe Abercrombie',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
      darkness_level: 4,
      heat_level: null,
      tags: [
        'Grimdark',
        'Multi-POV',
        'Political Realism',
        'Subverted Heroism',
        'Complete Trilogy',
      ],
      why: "For the WoT reader who is ready for epic fantasy that refuses to be comfortable. Abercrombie uses the same multi-POV ensemble structure as Jordan — a diverse cast converging on a world-threatening crisis — but strips out the genre's comforting assumptions about heroism, destiny, and just outcomes. Characters who start with principles progressively abandon them. The magic is rare and horrible. The politics have weight because people lose. The First Law trilogy is complete in three tightly-paced volumes, and the standalone novels set in the same world are even better. Recommended specifically for WoT readers who occasionally felt that Jordan's world was too clean, that the stakes weren't quite heavy enough.",
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie&affiliate=122720',
    },
    {
      title: 'Red Rising',
      author: 'Pierce Brown',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg',
      darkness_level: 4,
      heat_level: 'Closed Door',
      tags: [
        'Chosen One',
        'Brutal Training',
        'Epic Scope',
        'Fast-Paced',
        'Complete Saga',
      ],
      why: "For the WoT reader who wants the chosen-one arc and the epic scope but with completely different pacing. Where Jordan builds his world slowly and carefully, Brown moves at an almost violent pace — each chapter escalates, the political stakes expand across six books from a single mine to an entire solar system, and the protagonist's transformation from nobody to legend is written with kinetic momentum. The series is complete at six books (Red Rising trilogy + follow-up trilogy) and rewards binge-reading.",
      caveat: "more violent and morally ruthless than WoT, less interested in world-building depth, entirely different in register — but the sense of a protagonist becoming something the world wasn't ready for is recognisable.",
      standalone: false,
      audiobook: true,
      amazon_url:
        'https://www.amazon.com/s?k=Red+Rising+Pierce+Brown&tag=librariancura-20',
      bookshop_url:
        'https://bookshop.org/search?keywords=Red+Rising+Pierce+Brown&affiliate=122720',
    },
  ],
  related: [
    { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
    { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
    {
      title: 'Books Like The Name of the Wind',
      slug: 'the-name-of-the-wind',
    },
  ],
};
