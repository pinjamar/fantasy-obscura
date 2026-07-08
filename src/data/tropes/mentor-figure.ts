import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: 'mentor-figure',
  name: 'Mentor Figure',
  category: 'character',
  description: 'A wise guide or parental figure who shapes the protagonist.',
  intro:
    "The best mentor characters in fantasy are defined by what they failed to become: the limit they hit, the cost they paid, the thing they couldn't cross that the protagonist eventually must. The mentor's investment in the student is always partly a way of settling a debt they owed themselves.\n\n*Harry Potter and the Philosopher's Stone* gives fantasy its most familiar version. Dumbledore reads as infallible on the surface, and only later books reveal how much he withheld and how catastrophic that withholding was.\n\n*American Gods* refuses the warmth entirely. Mr. Wednesday mentors Shadow the way a con man mentors a mark: with real information, real skill-building, and a use for him that Shadow doesn't learn about until it's nearly too late. One book asks what a good mentor gets wrong. The other asks whether the mentor was ever trying to be good at all.",
  bestExamples: [
    "harry-potter-philosophers-stone",
    "assassins-apprentice",
    "eragon",
    "american-gods",
    "the-curse-of-chalion",
    "blood-song",
    "kushiels-dart",
  ],
  booksLikeGuides: ["harry-potter-philosophers-stone", "eragon", "american-gods", "pawn-of-prophecy", "assassins-apprentice", "blood-song"],
  editorialFaqs: [
    {
      q: "Does a mentor figure have to survive the story?",
      a: "No, and dying partway through is one of the trope's most common shapes. Dumbledore's death is the hinge the rest of Harry Potter turns on. A mentor who survives the whole story, like Chade Fallstar in Assassin's Apprentice, has to keep being right or wrong in front of the reader instead of getting the narrative mercy of dying before the consequences catch up.",
    },
    {
      q: "What's the difference between a mentor figure and the Mentor and Student trope?",
      a: "Mentor and Student is about the relationship: the training, the dynamic, the specific give and take between two people. Mentor Figure is about the character themselves: what they represent to the protagonist, what they're hiding, what it costs the story when the protagonist finally sees them clearly. A book can lean on one without the other. American Gods barely shows Wednesday teaching Shadow anything concrete, but he's still a defining mentor figure because of what he represents and conceals.",
    },
  ],
};

export default trope;
