import type { ReadingOrderEntry } from '../reading-orders';

export const grishaverse: ReadingOrderEntry = {
  slug: 'grishaverse',
  name: 'The Grishaverse',
  author: 'Leigh Bardugo',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - A Darker Shore (Six of Crows #3) due June 2026',
  description:
    "Leigh Bardugo's Grishaverse spans three sub-series in a Russian-inspired world of Grisha magic users, criminal heist crews, and morally complex power politics. The Shadow and Bone trilogy establishes the world: a fractured empire, a living darkness called the Fold, and the girl who discovers she can destroy it. Six of Crows moves to Ketterdam (a Dutch East India Company analogue built on gang politics and a magic-enhancing drug) and is the strongest writing in the series: a heist novel with an ensemble cast Bardugo hasn't matched before or since. The two sub-series share a world but read as different genres: court fantasy versus heist thriller.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate',
  orderNote:
    'Read the Shadow and Bone trilogy first: it establishes the world, the Grisha, and the Fold. Six of Crows is set in the same world but with a new cast, and assumes you understand the setting. King of Scars picks up threads from both previous series.',
  groups: [
    {
      label: 'Shadow and Bone Trilogy',
      sublabel: 'start here - sets up the world and the Fold',
      books: [
        {
          title: 'Shadow and Bone',
          slug: 'shadow-and-bone',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #1',
          note: 'Alina Starkov discovers she is a Sun Summoner: possibly the only person who can destroy the Fold, a swathe of living darkness that splits Ravka. Introduces the Grisha system, the Darkling, and the Russian-inspired world. The most YA-feeling of the trilogy.',
          page_count: 358,
          publication_year: 2012,
        },
        {
          title: 'Siege and Storm',
          slug: 'siege-and-storm',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #2',
          note: "Alina and Mal are hunted. A privateer captain and a sea monster complicate everything. The political stakes of Ravka come into focus. Bardugo's plotting gets noticeably tighter.",
          page_count: 435,
          publication_year: 2013,
        },
        {
          title: 'Ruin and Rising',
          slug: 'ruin-and-rising',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #3',
          note: "Underground rebellion, the Darkling's true endgame, and an ending that divided the fanbase on release. The conclusion is honest about what the story required, not what the romance threads seemed to promise.",
          page_count: 422,
          publication_year: 2014,
        },
      ],
    },
    {
      label: 'Six of Crows Series',
      sublabel: 'the best of the Grishaverse - read after Shadow and Bone',
      books: [
        {
          title: 'Six of Crows',
          slug: 'six-of-crows',
          status: 'mandatory',
          seriesLabel: 'Six of Crows #1',
          note: 'Six criminals. An impossible heist. Kaz Brekker plans an infiltration of an impenetrable prison-fortress. Each of the six POV characters has a distinct voice and a complete arc. The best book in the Grishaverse.',
          page_count: 465,
          publication_year: 2015,
        },
        {
          title: 'Crooked Kingdom',
          slug: 'crooked-kingdom',
          status: 'mandatory',
          seriesLabel: 'Six of Crows #2',
          note: 'The heist becomes a war for survival in Ketterdam. The crew gets their revenge. Each character arc closes on its own terms.',
          page_count: 536,
          publication_year: 2016,
        },
        {
          title: 'A Darker Shore: Letters from Ketterdam',
          slug: 'a-darker-shore',
          status: 'upcoming',
          seriesLabel: 'Six of Crows #3',
          note: 'Expected June 2026. Returns to Ketterdam and the Six of Crows cast.',
          page_count: null,
          publication_year: 2026,
        },
      ],
    },
    {
      label: 'King of Scars Duology',
      sublabel: 'sequel series - draws from both previous series',
      note: 'Heavily spoils both Shadow and Bone and Six of Crows. Read both series first.',
      noteType: 'warning',
      books: [
        {
          title: 'King of Scars',
          slug: 'king-of-scars',
          status: 'optional',
          seriesLabel: 'King of Scars #1',
          note: "Nikolai Lantsov (a breakout side character from the first trilogy) takes centre stage as King of Ravka. Multiple POVs, a new supernatural threat. Built around whether his wit and charm can carry a more political, grittier story.",
          page_count: 512,
          publication_year: 2019,
        },
        {
          title: 'Rule of Wolves',
          slug: 'rule-of-wolves',
          status: 'optional',
          seriesLabel: 'King of Scars #2',
          note: "War arrives in Ravka. Six of Crows characters return alongside Nikolai's storyline. Bardugo gives fans of both series the crossover both threads were building toward.",
          page_count: 512,
          publication_year: 2021,
        },
      ],
    },
    {
      label: 'Companion Works',
      sublabel: 'world-building extras - read anytime after Shadow and Bone',
      books: [
        {
          title: 'The Language of Thorns',
          slug: 'the-language-of-thorns',
          status: 'supplementary',
          seriesLabel: 'Grishaverse companion',
          note: 'Six original fairy tales set in the Grishaverse world. Dark, illustrated, and self-contained. Works as a standalone: read between any of the main series entries or after.',
          page_count: 274,
          publication_year: 2017,
        },
        {
          title: 'The Lives of Saints',
          slug: 'the-lives-of-saints',
          status: 'supplementary',
          seriesLabel: 'Grishaverse companion',
          note: 'Illustrated companion of Ravkan saints referenced throughout the series. Background enrichment rather than plot. Best read mid-series once you know the mythology.',
          page_count: 176,
          publication_year: 2020,
        },
      ],
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🗝️ The Two Entry Points',
      body: "Shadow and Bone builds the world. Six of Crows is the better book. Reading in order gives you the full experience. Starting with Six of Crows means encountering major Shadow and Bone spoilers as casual background context rather than as reveals. For the complete experience, Shadow and Bone first. The trilogy is shorter and faster than it looks: three books, roughly 1,200 pages, and it gains momentum as it goes.",
      color: 'amber',
    },
    {
      title: '🌑 The Darkling',
      body: 'The central antagonist of Shadow and Bone. He begins as a mentor figure and his true nature emerges slowly: charismatic, ancient, and morally complex in ways the first book is careful to reveal gradually. He is not a simple villain. The series deliberately avoids resolving him into one. Let the arc unfold.',
      color: 'blue',
    },
    {
      title: '🃏 Kaz Brekker',
      body: "Kaz is the reason Six of Crows works. A criminal strategist who plans impossible heists three moves ahead and never shows his hand. His emotional arc is handled with unusual restraint for the genre: trauma acknowledged, not wallowed in. The ensemble around him (Inej, Jesper, Wylan, Nina, Matthias) is equally fully realised.",
      color: 'purple',
    },
    {
      title: '🏙️ Ketterdam',
      body: "Six of Crows is set not in Ravka but in Ketterdam. Bardugo builds it from the economics up: the Dregs control certain streets, the stadwatch is corruptible, the merchant council has specific interests, and the trade in a magic-enhancing drug powers everything. The shift from Shadow and Bone's Russian-inspired court politics to Ketterdam's street-level heist is jarring for about fifty pages and then the better choice.",
      color: 'green',
    },
    {
      title: '✨ Grisha Magic',
      body: 'Grisha are magic users who manipulate matter at the molecular level: dividing, combining, shaping it. They are divided into Orders: Corporalki (healers and Heartrenders), Etherealki (Summoners), and Materialki (craftsmen). The system is consistent but not rigidly quantified. The series explores what it means to be born with power that others fear and want to control.',
      color: 'zinc',
    },
    {
      title: '📺 The Netflix Adaptation',
      body: 'Shadow and Bone was adapted by Netflix (2 seasons, 2021–2023, cancelled before season 3). The show merged the Shadow and Bone and Six of Crows timelines, running them simultaneously, which differs from the books where Six of Crows happens later. A Six of Crows spinoff was in development but cancelled at the same time. If you are coming from the show, the books diverge in timeline and some character details.',
      color: 'red',
    },
  ],
  characters: [
    {
      name: 'Alina Starkov',
      role: 'Sun Summoner; protagonist of Shadow and Bone',
      color: 'amber',
      why_they_work:
        "The Chosen One archetype deployed without irony in book one, then interrogated in books two and three. Bardugo uses her straightforwardly to establish the stakes and then uses the next two books to examine what the Chosen One actually owes the people who need her. Whether she handles that pressure heroically or not is the trilogy's real subject.",
    },
    {
      name: 'The Darkling',
      role: 'First among Grisha; primary antagonist of Shadow and Bone',
      color: 'blue',
      why_they_work:
        "The structural reason the Shadow and Bone trilogy works. Without genuine complexity in the antagonist, Alina's choices carry no weight. He functions as mentor, obstacle, and foil simultaneously: the series places him close enough to what Alina wants that her rejection of him has to be meaningful, not obvious. His moral complexity is not incidental. It is load-bearing.",
    },
    {
      name: 'Kaz Brekker',
      role: 'Criminal strategist; leader of the Dregs',
      color: 'purple',
      why_they_work:
        "The type is familiar: brilliant, ruthless, traumatised. What Bardugo does differently is treat his trauma as a real physical incapacity rather than backstory to be overcome. His arc across the duology is about functioning around what he cannot change, not recovering from it. That distinction is why the Six of Crows ending lands the way it does.",
    },
    {
      name: 'Inej Ghafa',
      role: 'Wraith; Kaz\'s informant and Crow',
      color: 'zinc',
      why_they_work:
        "Survivor of trafficking who became the crew's most capable operative. The series gives her goals and interiority that exist independently of Kaz, which is not how most love interests are written. Her arc is what the duology's emotional stakes actually hinge on: Kaz's arc only resolves because of what it means to her specifically.",
    },
    {
      name: 'Nikolai Lantsov',
      role: 'King of Ravka; protagonist of King of Scars',
      color: 'green',
      why_they_work:
        "Was the best supporting character in books two and three of Shadow and Bone for a specific reason: he performs competence and wit so effectively that the reader never doubts him. King of Scars is built around the problem of making that performance fail. Whether the duology puts him in genuine danger is the main thing readers disagree about.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness varies by sub-series. Shadow and Bone is YA-accessible: threat and loss without graphic violence. Six of Crows handles trauma, slavery, addiction, and gang violence directly. King of Scars sits between the two in tone.',
        'Romance: present throughout all sub-series. Shadow and Bone has a love triangle. Six of Crows has slow-burn emotional arcs that resist easy resolution. Nothing explicit in any sub-series.',
        'No explicit sexual content.',
        'Right for: readers who want both court fantasy and heist thriller in the same universe. Not right for: readers who need tonal consistency across a series, or a hard magic system with explicit rules.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Six of Crows (2015) is a New York Times bestseller and won the Goodreads Choice Award for Young Adult Fantasy. It is the primary reference point when readers and writers discuss heist fiction done at a high level in a fantasy setting.',
        'The Shadow and Bone Netflix adaptation (2021–2023, 2 seasons) introduced the Grishaverse to a mainstream audience and drove significant new readership to the books, particularly Six of Crows.',
        'Leigh Bardugo is one of the defining voices in YA fantasy of the 2010s. Shadow and Bone (2012) helped establish the Russian-inspired fantasy aesthetic in the genre; Six of Crows (2015) redefined what YA ensemble fiction could structurally attempt.',
        "The Darkling is the character readers of Shadow and Bone argue about most: not because his villainy is ambiguous, but because Bardugo constructs him to be compelling even while the narrative is clear about what he is. He is the central example in discussions of the 'villain love interest' archetype.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Shadow and Bone trilogy',
      level: 2,
      desc: 'YA-accessible: threat, loss, and moral complexity without graphic violence.',
    },
    {
      label: 'Six of Crows duology',
      level: 3,
      desc: 'Trauma, violence, slavery, and addiction handled directly. Darker than the first trilogy.',
    },
    {
      label: 'King of Scars duology',
      level: 3,
      desc: 'War and political violence: sits between the two earlier series in tone.',
    },
  ],
  metaDescription:
    'The Grishaverse reading order: Shadow and Bone trilogy, Six of Crows duology, and King of Scars duology - with guidance on whether to start with Shadow and Bone or Six of Crows first.',
  lastUpdated: '2026-07-01',
  shortName: 'Grishaverse',
  finishedLabel: 'Finished the Grishaverse?',
  booksLikeSlug: 'six-of-crows',
  categoryHref: '/fantasy/romantasy/',
  categoryLabel: 'Browse Romantasy',
  related: ['acotar', 'sarah-j-maas', 'empyrean', 'blood-and-ash', 'mistborn', 'throne-of-glass'],
};
