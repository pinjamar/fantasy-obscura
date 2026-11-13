import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "mentor-student", name: "Mentor and Student", category: "relationship",
  description: "A guiding teacher and protégé bond.",
  intro: "The mentor-student relationship in fantasy is really a story about the transmission of something fragile: a skill, a way of seeing, a tradition that will disappear if it isn't passed on. What makes it emotionally complex is that the relationship runs on an imbalance the story is designed to dissolve, since the teacher's whole purpose is to make themselves unnecessary.\n\n*Assassin's Apprentice* tracks this through one relationship: Fitz and Chade, where the mentorship is intimate and morally compromised from the beginning, and the skills Fitz learns are precisely the ones that will eventually let him act without guidance. *The Name of the Wind* spreads the trope across an institution instead. Kvothe answers to a whole faculty of masters at the University, and the tension isn't betrayal, it's whether any one of them will actually teach him what he came there to learn.\n\nThe surpassing moment, when the student exceeds the teacher, is one of fantasy's most emotionally loaded scenes when it's handled well. It works because the story has spent the whole book proving the teacher earned the right to be outgrown.",
  bestExamples: ["assassins-apprentice", "the-name-of-the-wind", "the-sword-of-kaigen", "mother-of-learning-arc-1", "rhythm-of-war", "tyrants-throne", "oathbound"],
  booksLikeGuides: ["assassins-apprentice", "the-name-of-the-wind", "the-sword-of-kaigen", "magician-apprentice", "midnight-riot", "the-way-of-shadows", "eragon"],
  editorialFaqs: [
    { q: "What's the difference between Mentor and Student and the Mentor Figure trope?", a: "Mentor Figure is about the mentor as a character: what they represent to the protagonist, what they're hiding, what it costs when the protagonist finally sees them clearly. Mentor and Student is about the relationship itself: the training, the specific give and take, the structure of how knowledge moves from one person to the other. A book can lean on one without much of the other. Assassin's Apprentice has both at once, since Chade is a fully realized mentor figure and the actual training sequences are detailed enough to carry the plot on their own." },
    { q: "Does the student have to surpass the teacher for the trope to land?", a: "No, though it's the most common payoff. Some of the strongest versions end with the student choosing a different path entirely rather than a better version of the teacher's path. What matters more than surpassing is whether the training was honest. A mentor who withholds information to control the student, the way Chade does in parts of Assassin's Apprentice, creates a different and more morally complicated version of the trope than one who teaches in good faith." },
  ],
};

export default trope;
