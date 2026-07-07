import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "revenge-story", name: "Revenge Story", category: "plot",
  description: "A protagonist seeks vengeance.",
  intro: "Revenge stories work because the impulse they describe is one that almost everyone recognizes and most people are trained to suppress. Fantasy escalates both the wrong done and the scale of the reckoning, but the books disagree about what getting revenge actually does to the person who gets it.\n\n*Best Served Cold* spends its full length making Monza Murcatto pay for her list one costly, ugly step at a time, and Joe Abercrombie never lets the reader forget what pursuing it is doing to her.\n\n*Iron Widow* answers the same question differently: Zetian gets her revenge in the opening chapters, survives the backlash that was supposed to kill her instead of him, and comes out of it with more power than she had going in. One book treats revenge as something that costs you everything. The other treats it as the moment its protagonist actually arrives.",
  bestExamples: [
    "best-served-cold",
    "the-way-of-shadows",
    "red-rising",
    "the-rage-of-dragons",
    "the-fifth-season",
    "the-iron-widow",
    "jade-city",
  ],
  booksLikeGuides: [
    "best-served-cold",
    "the-way-of-shadows",
    "red-rising",
    "the-fifth-season",
    "jade-city",
    "nine-princes-in-amber",
    "tigana",
  ],
  editorialFaqs: [
    {
      q: "Does a revenge story require the protagonist to actually get their revenge?",
      a: "No, and some of the best ones deliberately deny it or complicate it past recognition. Best Served Cold gives Monza Murcatto her list and lets her work through it, but the book spends as much time on what completing it costs her as on the completion itself. The satisfying version isn't the one where revenge is achieved cleanly; it's the one where the story is honest about what pursuing it required.",
    },
    {
      q: "How is a revenge story different from a villain protagonist?",
      a: "A revenge story is defined by the wrong that started it: someone was hurt, and the plot tracks the reckoning. A villain protagonist is defined by what the character becomes, regardless of how it started. The two overlap constantly. The Rage of Dragons begins as a straightforward revenge story and Tau's methods get more ruthless as it continues, but the book stays anchored to the original wound rather than making Tau's own villainy the point.",
    },
  ],
};

export default trope;
