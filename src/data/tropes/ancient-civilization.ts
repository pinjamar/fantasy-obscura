import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "ancient-civilization", name: "Ancient Civilization", category: "world-magic",
  description: "A fallen or forgotten civilization still shapes the present-day world.",
  intro: "An ancient civilization gives a fantasy world a second, buried history: proof that the magic, politics, or technology running the present is a leftover from something larger that collapsed before the story starts. The characters inherit the wreckage without inheriting the instructions for how it worked.\n\n*The Way of Kings* treats that inheritance as unexplained technology: the Shardblades and Shardplate the characters fight with are relics of the Knights Radiant, an order whose actual knowledge died with them. *The Fifth Season* makes the inheritance hostile instead. The ruins scattered across the Stillness are warnings left by civilizations that each ended a world, and reading them correctly is a matter of survival, not curiosity.\n\nWhat makes the trope work is the gap between then and now. The less a book explains about what was actually lost, the more weight the present carries for trying to live inside the wreckage of it.",
  bestExamples: ["the-way-of-kings", "the-fellowship-of-the-ring", "the-eye-of-the-world", "the-elfstones-of-shannara", "gideon-the-ninth", "the-fifth-season", "prince-of-thorns"],
  booksLikeGuides: ["the-way-of-kings", "the-fellowship-of-the-ring", "the-eye-of-the-world", "gideon-the-ninth", "the-fifth-season", "prince-of-thorns", "gardens-of-the-moon"],
  editorialFaqs: [
    { q: "What's the difference between an ancient civilization and a dying empire?", a: "A dying empire is still standing when the story starts: a current political entity in decline, with people living inside its last years. An ancient civilization is already gone by the time the story opens, and what's left is ruins, relics, or magic nobody fully understands anymore. Gardens of the Moon has both at once: the Malazan Empire is actively declining in the foreground, while the Jaghut and K'Chain Che'Malle are civilizations that fell long before anyone in the story was born. The distinction is tense: present-tense collapse versus past-tense aftermath." },
    { q: "How do the best versions of this trope reveal the lost civilization without an infodump?", a: "They let the characters misread it first. In The Way of Kings, the Knights Radiant's Shardblades get treated as magic weapons for most of the book before anyone connects them to an actual historical order with a purpose. In Piranesi, the House withholds almost everything, and the protagonist's wrong theories about why it exists matter as much as whatever the real answer turns out to be. The civilization should feel like something the characters are still figuring out, not something the narrator already understands and is choosing to explain slowly." },
  ],
};

export default trope;
