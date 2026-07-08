import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "last-of-their-kind", name: "Last Of Their Kind", category: "character",
  description: "A character who is the sole survivor of their race, people, or lineage.",
  intro: "Being the last of your kind in fantasy means carrying your entire history in your body: language, memory, practice, grief, because when you go, it goes with you. The trope forces questions about what survival obligates. Is staying alive an act of preservation or an act of selfishness, and does the distinction matter?\n\n*The Fifth Season* makes the stakes literal. Essun is not quite the last orogene in the world, but she lives close enough to extinction that every choice about hiding her power carries the weight of species-level risk.\n\n*The Last Unicorn* takes the same premise somewhere gentler and stranger. The unicorn sets out to find out if she really is the last of her kind, and the quest becomes less about survival than about what it costs to keep believing something is still true after everyone else has stopped.",
  bestExamples: [
    "the-fifth-season",
    "the-last-unicorn",
    "elric-of-melnibon",
    "tigana",
    "the-buried-giant",
    "unsouled",
    "over-sea-under-stone",
  ],
  booksLikeGuides: ["the-fifth-season", "tigana", "unsouled", "elric-of-melnibon"],
  editorialFaqs: [
    {
      q: "Does the character have to know they're the last of their kind for the trope to apply?",
      a: "No, and not knowing is often the more interesting version. Essun in The Fifth Season doesn't know exactly how close orogenes are to extinction; she just knows hiding is safer than finding out. The Last Unicorn's protagonist doesn't believe the rumor at first and has to go looking for proof. Both structures work: dramatic irony when the reader knows more than the character, or a genuine quest when the character has to find out.",
    },
    {
      q: "How is this different from a Chosen One story?",
      a: "A Chosen One is marked out by destiny for a role the story needs filled. A character who is the last of their kind is marked out by loss, not purpose. Nothing chose them; something simply failed to happen to anyone else. The Fifth Season deliberately withholds any sense that Essun's survival serves a larger plan. The weight comes from being the exception, not from being selected.",
    },
  ],
};

export default trope;
