/**
 * Predefined filter options for fantasy books
 * These can be extended as your library grows
 */

export const SUBGENRES = [
  'Epic Fantasy',
  'High Fantasy',
  'Low Fantasy',
  'Urban Fantasy',
  'Dark Fantasy',
  'Grimdark',
  'Sword & Sorcery',
  'Portal Fantasy',
  'Cozy Fantasy',
  'Romantic Fantasy',
  'Historical Fantasy',
  'Steampunk',
  'Dystopian Fantasy',
  'Fairy Tale Retelling',
  'Mythic Fantasy',
  'Contemporary Fantasy',
] as const;

export const TROPES = [
  'Chosen One',
  'Found Family',
  'Enemies to Lovers',
  'Mentor Dies',
  'Magic Academy',
  'Quest',
  'Prophecy',
  'Dark Lord',
  'Dragon Riders',
  'Reluctant Hero',
  'Revenge Plot',
  'Forbidden Romance',
  'Siblings',
  'Betrayal',
  'Coming of Age',
  'Tournament Arc',
  'Political Intrigue',
  'Secret Identity',
  'Love Triangle',
  'Time Travel',
  'Parallel Worlds',
  'Heist',
  'Curse Breaking',
  'Fae Court Drama',
  'Slow Burn',
] as const;

export const MAGIC_SYSTEMS = ['Hard Magic', 'Soft Magic', 'No Magic'] as const;

export const TONES = [
  'Grimdark',
  'Hopeful',
  'Whimsical',
  'Dark & Serious',
  'Light-hearted',
  'Philosophical',
  'Action-packed',
  'Character-driven',
  'Atmospheric',
  'Humorous',
] as const;

export const PACING = ['Fast-paced', 'Slow-burn', 'Mixed'] as const;

export const HEAT_LEVELS = [
  'Clean',
  'Fade to Black',
  'Steamy',
  'Spicy',
  'Explicit',
] as const;

export const AUDIENCES = ['Adult', 'Young Adult (YA)', "Children's"] as const;

export const DIVERSITY_REP = [
  'LGBTQ+ Protagonist',
  'LGBTQ+ Side Characters',
  'POC Protagonist',
  'POC Side Characters',
  'Disability Rep',
  'Neurodivergent MC',
  'Muslim MC',
  'Asian MC',
  'Black MC',
  'Latinx MC',
  'Indigenous MC',
  'Mental Health Rep',
  'Body Diversity',
  'Non-binary MC',
  'Trans MC',
] as const;

/**
 * Helper to get display label for filter values
 */
export function getFilterLabel(category: string, value: string): string {
  return value;
}

/**
 * Helper to validate filter values
 */
export function isValidSubgenre(value: string): boolean {
  return SUBGENRES.includes(value as any);
}

export function isValidTrope(value: string): boolean {
  return TROPES.includes(value as any);
}

export function isValidMagicSystem(value: string): boolean {
  return MAGIC_SYSTEMS.includes(value as any);
}

export function isValidTone(value: string): boolean {
  return TONES.includes(value as any);
}

export function isValidPacing(value: string): boolean {
  return PACING.includes(value as any);
}

export function isValidHeatLevel(value: string): boolean {
  return HEAT_LEVELS.includes(value as any);
}

export function isValidAudience(value: string): boolean {
  return AUDIENCES.includes(value as any);
}

export function isValidDiversityRep(value: string): boolean {
  return DIVERSITY_REP.includes(value as any);
}
