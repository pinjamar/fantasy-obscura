import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "forced-proximity", name: "Forced Proximity", category: "relationship",
  description: "Characters must stay physically close.",
  intro: "Forced proximity removes the option of a tactful exit, which is the only thing keeping most fictional tension from escalating. What makes the trope work in fantasy specifically is that the inescapability is structural rather than contrived, so the story doesn't have to apologize for engineering it.\n\n*Fourth Wing* ties Violet and Xaden together through the war college's chain of command: he's her squad leader, and neither of them can simply transfer out of a relationship that starts as a threat. *Kings Rising* does it through captivity and politics instead. Damen and Laurent are bound by a war neither can walk away from, and the proximity is adversarial long before it's anything else.\n\nStripped of the ability to manage appearances, characters forced into this kind of closeness become more honest than they intended to be. That's the real payoff: not the circumstance itself, but what it refuses to let either character hide.",
  bestExamples: ["fourth-wing", "kings-rising", "gideon-the-ninth", "kindred", "dragon-bound", "children-of-fallen-gods", "sweep-of-the-heart"],
  booksLikeGuides: ["fourth-wing", "gideon-the-ninth", "a-court-of-silver-flames", "the-bridge-kingdom", "the-crown-tower", "witch-of-wild-things", "quicksilver"],
  editorialFaqs: [
    { q: "What's the difference between forced proximity and enemies to lovers?", a: "They overlap often but aren't the same mechanism. Enemies to lovers is about the characters' feelings toward each other: contempt that erodes over time. Forced proximity is about circumstance: two people who may already like each other just fine but have no way to put distance between them. Kings Rising has both at once, since Damen and Laurent start as enemies and stay physically bound by the war regardless of how their feelings shift. Fourth Wing is forced proximity without real enmity: Violet and Xaden aren't natural enemies, the chain of command just won't let either of them leave." },
    { q: "Does the forced proximity have to be romantic?", a: "No, and some of the strongest versions aren't. Gideon the Ninth pairs Gideon and Harrow through an inherited, non-negotiable duty neither of them chose, and the tension is sharpened rivalry and reluctant dependence rather than romance. The trope works the same way either way: take away the ability to leave, and whatever two characters actually think of each other stops being optional to deal with." },
  ],
};

export default trope;
