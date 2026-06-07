import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "quest", name: "Quest", category: "plot",
  description: "A journey to achieve a specific goal.",
  intro: "The quest is the structural core that every other fantasy plot is either built on or in reaction to. It works because the forward momentum of a goal gives even the most digressive world-building a direction, and the accumulation of cost along the way transforms a protagonist from a person with a mission into someone permanently changed by having undertaken it. Tolkien established the archetype: the Fellowship's journey is less about the destination than about what the road takes from each person who walks it, and by the time they arrive, none of them are who they were. Brandon Sanderson's Mistborn uses the quest structure to deliver a heist and a revolution simultaneously, with the destination constantly shifting as the characters learn what they're actually trying to accomplish. The quest trope is also fantasy's most honest admission of what the genre is really offering: not the destination, but the experience of moving through a world worth moving through. Readers who love quest fantasy are looking for the feeling of being in motion toward something that genuinely matters, through a world large enough to reward the attention.",
  bestExamples: ["the-way-of-kings", "the-final-empire", "the-eye-of-the-world", "red-rising", "gardens-of-the-moon", "the-name-of-the-wind", "the-lies-of-locke-lamora"],
  booksLikeGuides: ["the-way-of-kings", "the-final-empire", "red-rising", "the-eye-of-the-world"],
  editorialFaqs: [
    { q: "Do all quest fantasy books follow the same structure?", a: "No — the quest is a container that holds almost anything. Some are linear pilgrimages (Lord of the Rings). Others are multi-layered investigations where the protagonist doesn't know what they're actually seeking until they find it (Name of the Wind). Some quests are military campaigns with a tactical objective; others are personal journeys with no defined destination. The structure is the goal, not the path." },
    { q: "Which quest fantasy is best for readers who want the whole arc in one book?", a: "Red Rising by Pierce Brown is one of the most self-contained quest narratives in recent fantasy — the objective is clear from page one and the story delivers a complete arc in a single volume, even if the trilogy continues it. Kings of the Wyld by Nicholas Eames is another standout single-volume quest: retired mercenaries, one last job, completely satisfying on its own." },
  ],
};

export default trope;
