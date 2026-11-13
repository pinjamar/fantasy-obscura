import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "political-marriage", name: "Political Marriage", category: "relationship",
  description: "Marriage arranged for power or alliance.",
  intro: "Political marriage works in fantasy because the arrangement is transparent. Both characters know exactly why they're together, which skips the pretense of most romances and goes straight to the harder question: what do you build when there's nothing personal to begin with?\n\n*Daughter of the Empire* makes the marriage a survival tactic. Mara marries Buntokapi, the son of a rival house, specifically to neutralize him, and the entire relationship runs on calculation before it runs on anything else. *The King of Attolia* runs the opposite direction: Eugenides marries Attolia for the alliance the three kingdoms need, and the book is less about whether the marriage holds politically than whether either of them can admit it's become something else.\n\nThe intimacy in these stories is mandatory and the trust is absent, which is an unusually honest setup. Two people who are stuck with each other either perform warmth convincingly enough to produce the real thing, or they don't, and the story doesn't let them pretend the question isn't being asked.",
  bestExamples: ["the-king-of-attolia", "daughter-of-the-empire", "radiance", "warbreaker", "the-wrath-and-the-dawn", "archangel", "the-princess-bride"],
  booksLikeGuides: ["warbreaker", "bride", "the-bridge-kingdom", "red-queen", "spinning-silver"],
  editorialFaqs: [
    { q: "Does political marriage always start as a loveless arrangement?", a: "Yes, that's what defines the trope rather than a flaw in it. If real affection existed beforehand, it's a different story: a forbidden romance, or a marriage of choice complicated by politics. What makes political marriage specific is that the wedding comes first, and whatever feeling exists has to be built, or not, entirely afterward, in full view of a court that's watching for weakness." },
    { q: "What's the difference between political marriage and arranged marriage more generally?", a: "Arranged marriage covers any match made by someone other than the two people in it, for reasons that can be financial, social, or familial. Political marriage is a specific kind of arranged marriage where the stakes are explicitly diplomatic: an alliance, a treaty, a war avoided or started. Warbreaker makes this literal, with Siri married off to a god-king as part of a treaty between two kingdoms that neither she nor he had any say in negotiating." },
  ],
};

export default trope;
