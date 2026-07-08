import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "lost-heir", name: "Lost Heir", category: "character",
  description: "A hidden heir to a throne or power.",
  intro: "The lost heir premise is two stories that don't resolve at the same moment. The first is about discovery: finding out who you actually are and what that means for every relationship that came before the revelation. The second is about legitimacy. The crown doesn't care about your feelings, and the court that controlled the succession during your absence has its own ideas about what you deserve.\n\n*Shadow and Bone* plays the discovery as ambush. Alina Starkov doesn't want the power that surfaces in her, and the moment it's revealed she's shoved into the center of a geopolitical crisis in a world that is actively hostile to her surviving it.\n\n*Nine Princes in Amber* plays it the opposite way. Corwin wakes up with amnesia, but the instant his memory starts returning he goes after the throne of Amber deliberately, strategically, and without much guilt about who he has to go through to get it. One heir has the crown forced on her. The other one goes and takes it.",
  bestExamples: [
    "shadow-and-bone",
    "nine-princes-in-amber",
    "wizards-first-rule",
    "prince-of-thorns",
    "the-demon-king",
    "finnikin-of-the-rock",
    "dune",
  ],
  booksLikeGuides: ["shadow-and-bone", "nine-princes-in-amber", "wizards-first-rule", "prince-of-thorns", "dune"],
  editorialFaqs: [
    {
      q: "Does the lost heir have to actually want the throne?",
      a: "No, and the reluctant version is often the more interesting one. Alina in Shadow and Bone spends most of the trilogy trying to get away from what she's become rather than toward it. Corwin in Nine Princes in Amber wants the throne from the moment he remembers it exists. Both are lost heir stories; the trope tracks the hidden legitimacy, not the character's feelings about claiming it.",
    },
    {
      q: "What's the difference between a lost heir and a Chosen One?",
      a: "A lost heir's claim is legal and genealogical: a bloodline, a birthright, a throne that is rightfully theirs whether or not anyone recognizes it yet. A Chosen One's claim is destined: prophecy, magic, or narrative design marks them out regardless of ancestry. The two overlap often (a lost heir can also be prophesied), but Wizard's First Rule keeps them separate: Richard's importance comes from what he can do, not from whose son he turns out to be, even though that revelation matters too.",
    },
  ],
};

export default trope;
