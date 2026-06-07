import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "morally-grey-hero", name: "Morally Grey Hero", category: "character",
  description: "A hero operating outside clear moral lines.",
  intro: "The morally grey hero is distinct from the anti-hero in one crucial way: they still care whether what they're doing is right. They just don't have the luxury of always acting like it. Fantasy puts these characters in positions where the clean choice and the effective choice are rarely the same, which means readers spend entire books watching someone try to hold onto something that the world is actively trying to take from them. Dalinar Kholin in The Stormlight Archive is the most sustained example — a man with a historically brutal past trying to build something just with the same hands that destroyed everything before. Readers who seek out this trope are looking for the emotional weight of watching someone try to be good in a situation specifically designed to prevent it.",
  bestExamples: ["the-blade-itself", "the-lies-of-locke-lamora", "red-rising", "best-served-cold", "the-poppy-war", "nevernight", "prince-of-thorns"],
  booksLikeGuides: ["the-blade-itself", "red-rising", "prince-of-thorns", "the-lies-of-locke-lamora"],
  editorialFaqs: [
    { q: "What separates a morally grey hero from a villain protagonist?", a: "The distinction is usually motivation and self-awareness. A morally grey hero does terrible things but retains some moral compass — they know what they're doing is wrong, or they're trying to serve something larger than themselves. A villain protagonist often lacks that tension; the horror is in how little they register the cost. Logen Ninefingers in The Blade Itself sits right on the line — the whole point is that the line keeps moving." },
    { q: "Which morally grey hero has the best character arc in fantasy?", a: "Dalinar Kholin (The Stormlight Archive) is the most thorough treatment of a morally grey past being fully reckoned with — his arc spans four books and earns its resolution. For a single-book arc, Monza Murcatto in Best Served Cold starts as a revenge machine and ends somewhere complicated. Rin in The Poppy War is the best descent arc: she starts sympathetic and the reader watches every step of the transformation." },
    { q: "Are morally grey heroes always in grimdark fantasy?", a: "They dominate grimdark but they're not exclusive to it. Kaz Brekker in Six of Crows is morally grey within a heist thriller. Locke Lamora in The Lies of Locke Lamora is a con artist operating in morally grey space with a lighter tone than most grimdark. The difference is that grimdark rarely redeems its grey heroes — the grey is the point, not a phase they pass through." },
  ],
};

export default trope;
