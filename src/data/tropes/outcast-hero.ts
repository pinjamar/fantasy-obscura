import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "outcast-hero", name: "Outcast Hero", category: "character",
  description: "A protagonist rejected by society.",
  intro: "The outcast hero's central question isn't whether they'll be accepted. It's whether they'd want to be, once they've seen the system from outside. Fantasy gives the exclusion real teeth: being cast out isn't social awkwardness but survival threat, exile into hostile landscape, or magic that marks you visibly as wrong.\n\n*Six of Crows* answers that question with a flat no. Kaz Brekker was built by Ketterdam's Barrel, the city's lowest stratum, and every choice he makes is downstream of that formation. He isn't trying to join the society that discarded him. He's trying to extract everything it owes him.\n\n*The Name of the Wind* answers it the opposite way. Kvothe is poor, itinerant Edema Ruh among the wealthy sons filling the University, and he wants in badly enough to work himself half to death for it. Kaz has given up on belonging and built something better instead. Kvothe hasn't given up, and the book is honest about what that costs him.",
  bestExamples: [
    "six-of-crows",
    "the-name-of-the-wind",
    "the-house-in-the-cerulean-sea",
    "circe",
    "kindred",
    "the-goblin-emperor",
    "the-serpent-the-wings-of-night",
  ],
  booksLikeGuides: [
    "six-of-crows",
    "the-name-of-the-wind",
    "the-house-in-the-cerulean-sea",
    "circe",
    "the-goblin-emperor",
    "the-serpent-the-wings-of-night",
  ],
  editorialFaqs: [
    {
      q: "Does the outcast hero have to end up back inside the society that rejected them?",
      a: "No, and the more memorable versions usually don't. Kaz in Six of Crows never seeks Ketterdam's approval; he builds his own power structure outside it and makes the city deal with him on his terms. Linus in The House in the Cerulean Sea goes the other way: he starts as part of the system that classifies children as dangerous and has to actively choose to stop being that. Both are outcast stories. Neither ends with the outcast quietly rejoining the world that excluded them.",
    },
    {
      q: "What's the difference between an outcast hero and a reluctant hero?",
      a: "A reluctant hero doesn't want the role the story hands them but is otherwise accepted by their world. An outcast hero has already been rejected before the story starts; the exclusion is the starting condition, not a role they're avoiding. Maia in The Goblin Emperor is both at once: exiled and half-goblin among purebred elves (outcast, no choice in the matter), then abruptly made emperor and given a throne he never wanted or trained for (reluctant, a role he resists).",
    },
  ],
};

export default trope;
