import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "dragon-rider", name: "Dragon Rider", category: "character",
  description: "A character bonded to or riding dragons.",
  intro: "Dragon rider fantasy succeeds or fails entirely on the quality of the bond. The aerial combat and the spectacle matter, but what the genre actually runs on is the specific texture of a relationship between two minds that shouldn't understand each other and do.\n\n*Dragonflight* built the template across decades of Pern novels: the bond between rider and dragon is a telepathic connection so total that losing the dragon often means losing the will to live.\n\n*Fourth Wing* modernizes that setup, making the rider-dragon relationship the emotional spine of a military academy story where the dragons are dangerous, opinionated, and not remotely obligated to choose you. Pern treats the bond as a fixed, lifelong fact once it happens. Fourth Wing treats it as something the dragon can still walk away from, which changes the stakes of every scene.",
  bestExamples: [
    "dragonflight",
    "fourth-wing",
    "his-majestys-dragon",
    "eragon",
    "dragons-of-autumn-twilight",
    "the-rage-of-dragons",
    "the-priory-of-the-orange-tree",
  ],
  booksLikeGuides: [
    "dragonflight",
    "fourth-wing",
    "eragon",
    "dragons-of-autumn-twilight",
    "the-priory-of-the-orange-tree",
  ],
  editorialFaqs: [
    {
      q: "Does the dragon have to be sentient and able to talk for a dragon rider story to work?",
      a: "No, and some of the best examples deliberately hold back on that. Fourth Wing's dragons speak and negotiate with their riders as equals. Temeraire's dragon is fully conversational and has his own political opinions. Dragonflight's Pern dragons communicate telepathically but are closer to intelligent animals than people. The bond is what matters, not the dragon's degree of personhood.",
    },
    {
      q: "What's the difference between a dragon rider story and one that just features dragons?",
      a: "A dragon rider story is built around a specific, named bond between one dragon and one person, and that relationship drives the plot. Smaug in The Hobbit is one of fantasy's most memorable dragons, but nobody bonds with or rides him: he's a threat, not a partner. If the dragon could be removed and replaced with any other monster without changing the emotional core of the book, it isn't really a dragon rider story.",
    },
  ],
};

export default trope;
