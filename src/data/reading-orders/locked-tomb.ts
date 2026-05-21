import type { ReadingOrderEntry } from '../reading-orders';

export const lockedTomb: ReadingOrderEntry = {
  slug: 'locked-tomb',
  name: 'The Locked Tomb',
  author: 'Tamsyn Muir',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing — 3 books published; Alecto the Ninth no date announced',
  description:
    "Tamsyn Muir's Locked Tomb is one of the most genuinely difficult series to categorise in contemporary fiction — science fantasy, gothic horror, queer romance, necromancy in space, and comedy, all at once. \"Lesbian necromancers in space\" is the widely used one-sentence description and it is not wrong. The four books follow the Nine Houses of a dying solar system: nine distinct factions of necromancers and their cavalier bodyguards, all circling the Emperor who created them thousands of years ago. The series is structurally cumulative in a very specific way — each book retroactively rewrites what came before, and reading out of order is not a viable option.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark — gothic horror, body horror, significant character deaths',
  orderNote:
    'Read in publication order, no exceptions — the series is structurally cumulative and the second book is deliberately disorienting in a way that only resolves in retrospect. Gideon the Ninth is the only entry point. If the first chapter does not land for you, the series is not for you — the voice established there is the foundation everything else is built on.',
  booksLikeSlug: 'locked-tomb',
  cardsPosition: 'above',
  cards: [
    {
      title: '💀 Necromancers in Space',
      body: "The Nine Houses are a dying solar system's civilisation, built on necromancy — the magic of bones, flesh, shadow, and death. Each House has a distinct magical speciality and a distinct number. The whole structure has the texture of a collapsed empire that once spanned stars and has since retreated into ritual, mythology, and hierarchy. The Emperor created all of it thousands of years ago and is still alive.",
      color: 'purple',
    },
    {
      title: '⚔️ The Necromancer/Cavalier Bond',
      body: "Every necromancer is paired with a cavalier: a sword-arm bodyguard who provides the physical protection the necromancer cannot. The bond is consuming and asymmetric — necromancers provide the magic, cavaliers provide the blade and, ultimately, something more than that. The nature of the sacrifice at the centre of the bond is what the series is about. Do not look it up.",
      color: 'red',
    },
    {
      title: '🗣️ Gideon\'s Voice',
      body: "Gideon Nav narrates book one in a voice full of contemporary slang, dry deadpan humour, and pop culture references dropped into a far-future gothic setting. This is a choice, not an error. It is either immediately funny or an immediate barrier — there is very little middle ground. The entire series works because of this voice. Readers who bounce off the first chapter rarely come back.",
      color: 'amber',
    },
    {
      title: '📖 Harrow\'s Narration',
      body: "Harrow the Ninth is written in second person — the 'you' is deliberate and structural, not an affectation. On first read, certain events seem impossible, contradictory, or simply absent. This is intentional: the narrator cannot tell you what she cannot see. On re-read after Nona the Ninth, the entire book resolves into clarity. Muir constructed the narration so the same text functions differently depending on what the reader knows. Many readers go back immediately after finishing book three.",
      color: 'blue',
    },
    {
      title: '🏳️‍🌈 Queer at the Centre',
      body: "The central relationship is between two women. This is not subtext and requires no reading between lines. Multiple other major characters are also queer. The series does not treat any of this as remarkable — it is simply the fabric of the world. The romantic arc is as central to the plot as the necromancy, and the two are inseparable.",
      color: 'green',
    },
    {
      title: '🌌 Nona\'s Shift',
      body: "Nona the Ninth was originally the first half of Alecto the Ninth before the book outgrew its container. It follows a protagonist named Nona, whose identity is the book's central mystery. The register shifts dramatically from the palace horror of book one — grounded, everyday, a found-family of survivors in a specific city. The contrast is intentional. The events of Nona change what Harrow means.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Locked Tomb',
      sublabel: '3 books complete + 1 upcoming + 3 short stories — main series read in order',
      noteType: 'required',
      note: 'One continuous story across four novels, with three short stories interspersed at their recommended reading positions. The novels are mandatory and must be read in order. The short stories are supplementary — skip them freely, but each is best read at the indicated point rather than before Gideon or all at the end.',
      books: [
        {
          title: 'Gideon the Ninth',
          slug: 'gideon-the-ninth',
          status: 'mandatory',
          note: "Gideon Nav, indentured swordswoman of the Ninth House, is conscripted to accompany her necromancer Harrowhark to a haunted palace where the Nine Houses compete to unlock the secret of Lyctorhood — a form of godhood granted by the Emperor. The competitors begin dying. The voice is everything: deadpan, anachronistic, furious, funny. The best entry point in the series is also its most immediately readable book.",
          page_count: 448,
          publication_year: 2019,
        },
        {
          title: 'The Mysterious Study of Doctor Sex',
          slug: 'the-mysterious-study-of-doctor-sex',
          status: 'supplementary',
          note: 'A locked-room mystery set in the Sixth House, following young Palamedes Sextus and Camilla Hect at thirteen. A prequel (#0.5) that rewards readers who already know these characters from Gideon — skip it on a first read and return after.',
          page_count: 28,
          publication_year: 2020,
        },
        {
          title: 'Harrow the Ninth',
          slug: 'harrow-the-ninth',
          status: 'mandatory',
          note: "Written in second person — Harrowhark is 'you', drafted into the Emperor's inner circle and fighting an unwinnable war alongside saints she does not trust. Do not skip ahead when the book disorients you; the disorientation is the mechanism, not a flaw. A structurally different experience on re-read after Nona — many readers return to it immediately after book three.",
          page_count: 512,
          publication_year: 2020,
        },
        {
          title: 'As Yet Unsent',
          slug: 'as-yet-unsent',
          status: 'supplementary',
          note: "An epistolary short story told through Judith Deuteros's coded report on Blood of Eden activities, exploring her relationship with Coronabeth Tridentarius (#2.5). Originally published in the Harrow the Ninth paperback. Read between Harrow and Nona.",
          page_count: 24,
          publication_year: 2021,
        },
        {
          title: 'Nona the Ninth',
          slug: 'nona-the-ninth',
          status: 'mandatory',
          note: "Follows Nona — a person of uncertain identity living a grounded, everyday life with a found-family of survivors in a city under siege. The register shift from the palace horror of book one is jarring and intentional. Nona's identity is the book's central question. What happens here changes the meaning of Harrow the Ninth in ways that are only apparent after the fact.",
          page_count: 512,
          publication_year: 2022,
        },
        {
          title: 'Alecto the Ninth',
          slug: 'alecto-the-ninth',
          status: 'upcoming',
          note: 'The fourth and final book in the Locked Tomb series. No release date announced. Tamsyn Muir confirmed still in progress as of mid-2024.',
          page_count: null,
          publication_year: null,
        },
        {
          title: 'The Unwanted Guest',
          slug: 'the-unwanted-guest',
          status: 'supplementary',
          note: 'A short story set in the Locked Tomb universe. Best read after completing the main series.',
          page_count: 15,
          publication_year: 2014,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'Is the Locked Tomb right for you?',
      type: 'bullets',
      bullets: [
        "Read it if: you want something genuinely unlike anything else — the genre blend (sci-fi, gothic horror, necromancy, queer romance, deadpan comedy) is not a gimmick; it is load-bearing. The series only works because all of it is real.",
        "Read it if: you want a series with a strong central relationship at its core and a finite scope. Three books are published; the concluding volume has no announced release date.",
        "Read it if: you want a series that rewards re-reading. Harrow the Ninth is a fundamentally different book after you have read Nona. Muir constructs the text so the same words mean different things depending on what you know.",
        "It may not be for you if: you bounce off Gideon's voice in the first chapter. The anachronistic slang and deadpan humour are not toned down — they are the series. There is no later version of the book that is more conventional.",
        "It may not be for you if: you need a hard magic system with defined rules. The necromancy is atmospheric and mechanical — deliberately opaque in the traditional sense. Readers who require structured system logic will not find it here.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: gothic horror, body horror, and significant character deaths — the series escalates in all three across its four books. The tone is not grimdark but the stakes are real and Muir does not protect her characters.',
        'Romance: central to the plot and inseparable from the necromancy. Closed door — no explicit scenes. The central relationship is between two women.',
        'Explicit content: none.',
        'Right for: readers who liked the voice and genre-bending of The House in the Cerulean Sea or picaresque fantasy but want something with genuine horror and higher stakes; readers drawn to unreliable narrators and structurally ambitious fiction.',
        'Not right for: readers who want linear, transparent narratives; readers who dislike body horror; readers who want a conventional magic system.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Gideon the Ninth',
      level: 3,
      desc: 'Gothic horror and deaths in the palace — played with dark humour but the violence and stakes are real',
    },
    {
      label: 'Harrow the Ninth',
      level: 4,
      desc: 'Psychological horror, body horror, and a narrator whose unreliability is itself unsettling — the darkest in tone',
    },
    {
      label: 'Nona the Ninth',
      level: 3,
      desc: 'War and loss at civilisation scale, grounded register — the horror is in implication rather than image',
    },
    {
      label: 'Alecto the Ninth',
      level: 4,
      desc: 'Anticipated conclusion — expected to match or exceed the darkness of Harrow based on the trajectory of the series',
    },
  ],
  metaDescription:
    'The complete Locked Tomb reading order by Tamsyn Muir — all 4 books, the short fiction, and how to survive Harrow the Ninth.',
  shortName: 'Locked Tomb',
  lastUpdated: '2026-05-21',
  finishedLabel: 'Finished the Locked Tomb?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['grishaverse', 'first-law', 'asoiaf', 'malazan', 'black-company', 'mistborn'],
};
