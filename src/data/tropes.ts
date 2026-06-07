// ─── Public Tropes ────────────────────────────────────────────────────────────
// 69 canonical tropes exposed to users (filter UI, book pages, community tags).
// The `name` field is the canonical string stored in the books.tropes text[] column.
// The `slug` is for future URL routing and community tag endpoints.

import type { TropeCategory, PublicTrope } from './trope-types';
export type { TropeCategory, PublicTrope };

import antiHero from './tropes/anti-hero';
import assassinProtagonist from './tropes/assassin-protagonist';
import chosenOne from './tropes/chosen-one';
import cursedCharacter from './tropes/cursed-character';
import darkLord from './tropes/dark-lord';
import dragonRider from './tropes/dragon-rider';
import immortalCharacter from './tropes/immortal-character';
import lastOfTheirKind from './tropes/last-of-their-kind';
import lostHeir from './tropes/lost-heir';
import mentorFigure from './tropes/mentor-figure';
import morallyGreyHero from './tropes/morally-grey-hero';
import outcastHero from './tropes/outcast-hero';
import prophecyChild from './tropes/prophecy-child';
import reluctantHero from './tropes/reluctant-hero';
import secretRoyalty from './tropes/secret-royalty';
import villainProtagonist from './tropes/villain-protagonist';
import betrayal from './tropes/betrayal';
import bodyguardRomance from './tropes/bodyguard-romance';
import enemiesToLovers from './tropes/enemies-to-lovers';
import fatedMates from './tropes/fated-mates';
import forbiddenRomance from './tropes/forbidden-romance';
import forcedProximity from './tropes/forced-proximity';
import foundFamily from './tropes/found-family';
import grumpySunshine from './tropes/grumpy-sunshine';
import loveTriangle from './tropes/love-triangle';
import mentorStudent from './tropes/mentor-student';
import politicalMarriage from './tropes/political-marriage';
import redemptionArc from './tropes/redemption-arc';
import rivalsToAllies from './tropes/rivals-to-allies';
import secondChanceRomance from './tropes/second-chance-romance';
import slowBurn from './tropes/slow-burn';
import ancientEvilAwakens from './tropes/ancient-evil-awakens';
import comingOfAge from './tropes/coming-of-age';
import endOfTheWorld from './tropes/end-of-the-world';
import heist from './tropes/heist';
import heroBecomeVillain from './tropes/hero-becomes-villain';
import hiddenSociety from './tropes/hidden-society';
import magicalPlague from './tropes/magical-plague';
import politicalIntrigue from './tropes/political-intrigue';
import portalFantasy from './tropes/portal-fantasy';
import powerAtACost from './tropes/power-at-a-cost';
import prophecy from './tropes/prophecy';
import pyrrhicVictory from './tropes/pyrrhic-victory';
import quest from './tropes/quest';
import rebellion from './tropes/rebellion';
import revengeStory from './tropes/revenge-story';
import secretIdentity from './tropes/secret-identity';
import successionCrisis from './tropes/succession-crisis';
import survivalJourney from './tropes/survival-journey';
import tournamentArc from './tropes/tournament-arc';
import trialByCombat from './tropes/trial-by-combat';
import warBetweenKingdoms from './tropes/war-between-kingdoms';
import bloodMagic from './tropes/blood-magic';
import curseBreaking from './tropes/curse-breaking';
import desertKingdom from './tropes/desert-kingdom';
import divineMagic from './tropes/divine-magic';
import dyingEmpire from './tropes/dying-empire';
import elementalMagic from './tropes/elemental-magic';
import faeCourtDrama from './tropes/fae-court-drama';
import floatingIslands from './tropes/floating-islands';
import forbiddenMagic from './tropes/forbidden-magic';
import frozenWasteland from './tropes/frozen-wasteland';
import gothicCastle from './tropes/gothic-castle';
import magicTournament from './tropes/magic-tournament';
import magicalArtifacts from './tropes/magical-artifacts';
import necromancy from './tropes/necromancy';
import pirateFantasy from './tropes/pirate-fantasy';
import sentientWeapon from './tropes/sentient-weapon';
import undergroundCity from './tropes/underground-city';
import vikingInspired from './tropes/viking-inspired';

export const PUBLIC_TROPES: PublicTrope[] = [

  // ── CHARACTER (16) ────────────────────────────────────────────────────────
  antiHero,
  assassinProtagonist,
  chosenOne,
  cursedCharacter,
  darkLord,
  dragonRider,
  immortalCharacter,
  lastOfTheirKind,
  lostHeir,
  mentorFigure,
  morallyGreyHero,
  outcastHero,
  prophecyChild,
  reluctantHero,
  secretRoyalty,
  villainProtagonist,

  // ── RELATIONSHIP (15) ─────────────────────────────────────────────────────
  betrayal,
  bodyguardRomance,
  enemiesToLovers,
  fatedMates,
  forbiddenRomance,
  forcedProximity,
  foundFamily,
  grumpySunshine,
  loveTriangle,
  mentorStudent,
  politicalMarriage,
  redemptionArc,
  rivalsToAllies,
  secondChanceRomance,
  slowBurn,

  // ── PLOT (21) ─────────────────────────────────────────────────────────────
  ancientEvilAwakens,
  comingOfAge,
  endOfTheWorld,
  heist,
  heroBecomeVillain,
  hiddenSociety,
  magicalPlague,
  politicalIntrigue,
  portalFantasy,
  powerAtACost,
  prophecy,
  pyrrhicVictory,
  quest,
  rebellion,
  revengeStory,
  secretIdentity,
  successionCrisis,
  survivalJourney,
  tournamentArc,
  trialByCombat,
  warBetweenKingdoms,

  // ── WORLD & MAGIC (18) ───────────────────────────────────────────────────
  bloodMagic,
  curseBreaking,
  desertKingdom,
  divineMagic,
  dyingEmpire,
  elementalMagic,
  faeCourtDrama,
  floatingIslands,
  forbiddenMagic,
  frozenWasteland,
  gothicCastle,
  magicTournament,
  magicalArtifacts,
  necromancy,
  pirateFantasy,
  sentientWeapon,
  undergroundCity,
  vikingInspired,

];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export const TROPE_BY_SLUG = Object.fromEntries(
  PUBLIC_TROPES.map((t) => [t.slug, t])
) as Record<string, PublicTrope>;

export const TROPE_BY_NAME = Object.fromEntries(
  PUBLIC_TROPES.map((t) => [t.name, t])
) as Record<string, PublicTrope>;

export const TROPES_BY_CATEGORY = PUBLIC_TROPES.reduce<Record<TropeCategory, PublicTrope[]>>(
  (acc, t) => { (acc[t.category] ??= []).push(t); return acc; },
  {} as Record<TropeCategory, PublicTrope[]>
);

// ─── Internal Tags ────────────────────────────────────────────────────────────
// 150 micro-tags (2 per public trope) for future community tagging.
// Stored in: book_tags(book_id, tag_slug, user_id, votes, created_at)
// No books table restructuring needed.

export type InternalTagType =
  | "microtrope"
  | "character-trait"
  | "relationship-micro"
  | "plot-micro"
  | "setting-micro"
  | "magic-micro";

export type InternalTag = {
  slug: string;
  name: string;
  type: InternalTagType;
  parentTrope: string; // slug of the public trope this belongs to
};

export const INTERNAL_TAGS: InternalTag[] = [

  // chosen-one
  { slug: "destined-hero",         name: "Destined Hero",          type: "plot-micro",       parentTrope: "chosen-one" },
  { slug: "prophecy-marked",       name: "Prophecy Marked",        type: "plot-micro",       parentTrope: "chosen-one" },

  // reluctant-hero
  { slug: "refuses-the-call",      name: "Refuses the Call",       type: "plot-micro",       parentTrope: "reluctant-hero" },
  { slug: "dragged-into-fate",     name: "Dragged Into Fate",      type: "plot-micro",       parentTrope: "reluctant-hero" },

  // anti-hero
  { slug: "ends-justify-means",    name: "Ends Justify the Means", type: "character-trait",  parentTrope: "anti-hero" },
  { slug: "flawed-protagonist",    name: "Flawed Protagonist",     type: "character-trait",  parentTrope: "anti-hero" },

  // villain-protagonist
  { slug: "criminal-lead",         name: "Criminal Lead",          type: "character-trait",  parentTrope: "villain-protagonist" },
  { slug: "morality-inversion",    name: "Morality Inversion",     type: "plot-micro",       parentTrope: "villain-protagonist" },

  // morally-grey-hero
  { slug: "pragmatic-hero",        name: "Pragmatic Hero",         type: "character-trait",  parentTrope: "morally-grey-hero" },
  { slug: "dirty-hands-hero",      name: "Dirty Hands Hero",       type: "character-trait",  parentTrope: "morally-grey-hero" },

  // dark-lord
  { slug: "evil-overlord",         name: "Evil Overlord",          type: "character-trait",  parentTrope: "dark-lord" },
  { slug: "shadow-army",           name: "Shadow Army",            type: "plot-micro",       parentTrope: "dark-lord" },

  // secret-royalty
  { slug: "hidden-lineage",        name: "Hidden Lineage",         type: "plot-micro",       parentTrope: "secret-royalty" },
  { slug: "royal-blood-secret",    name: "Royal Blood Secret",     type: "plot-micro",       parentTrope: "secret-royalty" },

  // lost-heir
  { slug: "heir-in-hiding",        name: "Heir in Hiding",         type: "plot-micro",       parentTrope: "lost-heir" },
  { slug: "claim-to-the-throne",   name: "Claim to the Throne",    type: "plot-micro",       parentTrope: "lost-heir" },

  // assassin-protagonist
  { slug: "guild-trained-assassin",name: "Guild-Trained Assassin", type: "character-trait",  parentTrope: "assassin-protagonist" },
  { slug: "contract-killer-lead",  name: "Contract Killer Lead",   type: "character-trait",  parentTrope: "assassin-protagonist" },

  // dragon-rider
  { slug: "dragon-bond",           name: "Dragon Bond",            type: "microtrope",       parentTrope: "dragon-rider" },
  { slug: "dragon-aerial-combat",  name: "Dragon Aerial Combat",   type: "plot-micro",       parentTrope: "dragon-rider" },

  // immortal-character
  { slug: "ageless-wanderer",      name: "Ageless Wanderer",       type: "character-trait",  parentTrope: "immortal-character" },
  { slug: "cannot-die-curse",      name: "Cannot Die Curse",       type: "magic-micro",      parentTrope: "immortal-character" },

  // cursed-character
  { slug: "curse-with-a-price",    name: "Curse With a Price",     type: "magic-micro",      parentTrope: "cursed-character" },
  { slug: "curse-affects-others",  name: "Curse Affects Others",   type: "plot-micro",       parentTrope: "cursed-character" },

  // outcast-hero
  { slug: "banished-protagonist",  name: "Banished Protagonist",   type: "plot-micro",       parentTrope: "outcast-hero" },
  { slug: "societys-reject",       name: "Society's Reject",       type: "character-trait",  parentTrope: "outcast-hero" },

  // mentor-figure (NEW)
  { slug: "wise-old-mentor",       name: "Wise Old Mentor",        type: "character-trait",  parentTrope: "mentor-figure" },
  { slug: "mentor-who-dies",       name: "Mentor Who Dies",        type: "plot-micro",       parentTrope: "mentor-figure" },

  // last-of-their-kind
  { slug: "sole-survivor",         name: "Sole Survivor",          type: "character-trait",  parentTrope: "last-of-their-kind" },
  { slug: "dying-lineage",         name: "Dying Lineage",          type: "plot-micro",       parentTrope: "last-of-their-kind" },

  // prophecy-child
  { slug: "born-of-prophecy",      name: "Born of Prophecy",       type: "plot-micro",       parentTrope: "prophecy-child" },
  { slug: "marked-from-birth",     name: "Marked From Birth",      type: "character-trait",  parentTrope: "prophecy-child" },

  // found-family
  { slug: "fellowship-party",      name: "Fellowship Party",       type: "relationship-micro",parentTrope: "found-family" },
  { slug: "team-bonding",          name: "Team Bonding",           type: "relationship-micro",parentTrope: "found-family" },

  // enemies-to-lovers
  { slug: "betrayal-to-love",      name: "Betrayal to Love",       type: "relationship-micro",parentTrope: "enemies-to-lovers" },
  { slug: "rivals-romance",        name: "Rivals Romance",         type: "relationship-micro",parentTrope: "enemies-to-lovers" },

  // slow-burn
  { slug: "longing-glances",       name: "Longing Glances",        type: "relationship-micro",parentTrope: "slow-burn" },
  { slug: "yearning-build",        name: "Yearning Build",         type: "relationship-micro",parentTrope: "slow-burn" },

  // forbidden-romance
  { slug: "duty-vs-desire",        name: "Duty vs Desire",         type: "relationship-micro",parentTrope: "forbidden-romance" },
  { slug: "taboo-relationship",    name: "Taboo Relationship",     type: "relationship-micro",parentTrope: "forbidden-romance" },

  // political-marriage
  { slug: "marriage-of-convenience",name: "Marriage of Convenience",type: "relationship-micro",parentTrope: "political-marriage" },
  { slug: "alliance-wedding",      name: "Alliance Wedding",       type: "relationship-micro",parentTrope: "political-marriage" },

  // mentor-student
  { slug: "training-montage",      name: "Training Montage",       type: "plot-micro",       parentTrope: "mentor-student" },
  { slug: "teacher-protege-bond",  name: "Teacher–Protégé Bond",   type: "relationship-micro",parentTrope: "mentor-student" },

  // rivals-to-allies
  { slug: "forced-alliance",       name: "Forced Alliance",        type: "relationship-micro",parentTrope: "rivals-to-allies" },
  { slug: "common-enemy",          name: "Common Enemy",           type: "plot-micro",       parentTrope: "rivals-to-allies" },

  // redemption-arc
  { slug: "seeking-forgiveness",   name: "Seeking Forgiveness",    type: "relationship-micro",parentTrope: "redemption-arc" },
  { slug: "atonement-quest",       name: "Atonement Quest",        type: "plot-micro",       parentTrope: "redemption-arc" },

  // betrayal
  { slug: "traitor-reveal",        name: "Traitor Reveal",         type: "plot-micro",       parentTrope: "betrayal" },
  { slug: "knife-in-the-back",     name: "Knife in the Back",      type: "relationship-micro",parentTrope: "betrayal" },

  // love-triangle
  { slug: "two-loves-one-choice",  name: "Two Loves, One Choice",  type: "relationship-micro",parentTrope: "love-triangle" },
  { slug: "romantic-rivalry",      name: "Romantic Rivalry",       type: "relationship-micro",parentTrope: "love-triangle" },

  // bodyguard-romance
  { slug: "protective-guard",      name: "Protective Guard",       type: "relationship-micro",parentTrope: "bodyguard-romance" },
  { slug: "danger-close",          name: "Danger Close",           type: "plot-micro",       parentTrope: "bodyguard-romance" },

  // fated-mates
  { slug: "soulbond",              name: "Soulbond",               type: "magic-micro",      parentTrope: "fated-mates" },
  { slug: "destiny-pairing",       name: "Destiny Pairing",        type: "relationship-micro",parentTrope: "fated-mates" },

  // forced-proximity
  { slug: "stuck-together",        name: "Stuck Together",         type: "relationship-micro",parentTrope: "forced-proximity" },
  { slug: "one-bed",               name: "One Bed",                type: "relationship-micro",parentTrope: "forced-proximity" },

  // grumpy-sunshine
  { slug: "ice-and-fire-dynamic",  name: "Ice & Fire Dynamic",     type: "relationship-micro",parentTrope: "grumpy-sunshine" },
  { slug: "cynic-meets-optimist",  name: "Cynic Meets Optimist",   type: "relationship-micro",parentTrope: "grumpy-sunshine" },

  // second-chance-romance
  { slug: "exes-reunite",          name: "Exes Reunite",           type: "relationship-micro",parentTrope: "second-chance-romance" },
  { slug: "old-wounds",            name: "Old Wounds",             type: "relationship-micro",parentTrope: "second-chance-romance" },

  // quest
  { slug: "artifact-quest",        name: "Artifact Quest",         type: "plot-micro",       parentTrope: "quest" },
  { slug: "dangerous-journey",     name: "Dangerous Journey",      type: "plot-micro",       parentTrope: "quest" },

  // prophecy
  { slug: "prophecy-interpretation",name: "Prophecy Interpretation",type: "plot-micro",      parentTrope: "prophecy" },
  { slug: "self-fulfilling-prophecy",name: "Self-Fulfilling Prophecy",type: "plot-micro",    parentTrope: "prophecy" },

  // rebellion
  { slug: "underground-resistance",name: "Underground Resistance", type: "plot-micro",       parentTrope: "rebellion" },
  { slug: "uprising-sparks",       name: "Uprising Sparks",        type: "plot-micro",       parentTrope: "rebellion" },

  // political-intrigue
  { slug: "court-conspiracy",      name: "Court Conspiracy",       type: "plot-micro",       parentTrope: "political-intrigue" },
  { slug: "court-spy",             name: "Court Spy",              type: "plot-micro",       parentTrope: "political-intrigue" },

  // war-between-kingdoms
  { slug: "battle-campaign",       name: "Battle Campaign",        type: "plot-micro",       parentTrope: "war-between-kingdoms" },
  { slug: "siege-warfare",         name: "Siege Warfare",          type: "plot-micro",       parentTrope: "war-between-kingdoms" },

  // revenge-story
  { slug: "blood-feud",            name: "Blood Feud",             type: "plot-micro",       parentTrope: "revenge-story" },
  { slug: "vengeance-mission",     name: "Vengeance Mission",      type: "plot-micro",       parentTrope: "revenge-story" },

  // ancient-evil-awakens
  { slug: "sealed-evil-released",  name: "Sealed Evil Released",   type: "plot-micro",       parentTrope: "ancient-evil-awakens" },
  { slug: "forgotten-ruins",       name: "Forgotten Ruins",        type: "setting-micro",    parentTrope: "ancient-evil-awakens" },

  // tournament-arc
  { slug: "combat-tournament",     name: "Combat Tournament",      type: "plot-micro",       parentTrope: "tournament-arc" },
  { slug: "ranking-competition",   name: "Ranking Competition",    type: "plot-micro",       parentTrope: "tournament-arc" },

  // heist
  { slug: "impossible-infiltration",name: "Impossible Infiltration",type: "plot-micro",      parentTrope: "heist" },
  { slug: "ragtag-crew",           name: "Ragtag Crew",            type: "relationship-micro",parentTrope: "heist" },

  // succession-crisis
  { slug: "claimants-to-throne",   name: "Claimants to the Throne",type: "plot-micro",      parentTrope: "succession-crisis" },
  { slug: "royal-coup",            name: "Royal Coup",             type: "plot-micro",       parentTrope: "succession-crisis" },

  // survival-journey
  { slug: "harsh-wilderness",      name: "Harsh Wilderness",       type: "setting-micro",    parentTrope: "survival-journey" },
  { slug: "scarcity-and-hardship", name: "Scarcity & Hardship",    type: "plot-micro",       parentTrope: "survival-journey" },

  // hidden-society
  { slug: "secret-mages",          name: "Secret Mages",           type: "plot-micro",       parentTrope: "hidden-society" },
  { slug: "hidden-city-within-city",name: "Hidden City Within City",type: "setting-micro",   parentTrope: "hidden-society" },

  // portal-fantasy
  { slug: "fish-out-of-water",     name: "Fish Out of Water",      type: "plot-micro",       parentTrope: "portal-fantasy" },
  { slug: "way-back-home",         name: "Way Back Home",          type: "plot-micro",       parentTrope: "portal-fantasy" },

  // trial-by-combat
  { slug: "duel-for-justice",      name: "Duel for Justice",       type: "plot-micro",       parentTrope: "trial-by-combat" },
  { slug: "champion-fights-for-you",name: "Champion Fights for You",type: "plot-micro",     parentTrope: "trial-by-combat" },

  // end-of-the-world
  { slug: "apocalypse-prophecy",   name: "Apocalypse Prophecy",    type: "plot-micro",       parentTrope: "end-of-the-world" },
  { slug: "last-stand",            name: "Last Stand",             type: "plot-micro",       parentTrope: "end-of-the-world" },

  // magical-plague
  { slug: "cursed-sickness",       name: "Cursed Sickness",        type: "magic-micro",      parentTrope: "magical-plague" },
  { slug: "quarantine-city",       name: "Quarantine City",        type: "setting-micro",    parentTrope: "magical-plague" },

  // hero-becomes-villain
  { slug: "corruption-arc",        name: "Corruption Arc",         type: "plot-micro",       parentTrope: "hero-becomes-villain" },
  { slug: "power-corrupts",        name: "Power Corrupts",         type: "plot-micro",       parentTrope: "hero-becomes-villain" },

  // pyrrhic-victory
  { slug: "victory-with-losses",   name: "Victory With Losses",    type: "plot-micro",       parentTrope: "pyrrhic-victory" },
  { slug: "hollow-triumph",        name: "Hollow Triumph",         type: "plot-micro",       parentTrope: "pyrrhic-victory" },

  // power-at-a-cost
  { slug: "sacrifice-for-power",   name: "Sacrifice for Power",    type: "magic-micro",      parentTrope: "power-at-a-cost" },
  { slug: "magic-drains-life",     name: "Magic Drains Life",      type: "magic-micro",      parentTrope: "power-at-a-cost" },

  // coming-of-age (NEW)
  { slug: "youthful-discovery",    name: "Youthful Discovery",     type: "plot-micro",       parentTrope: "coming-of-age" },
  { slug: "trials-of-maturity",    name: "Trials of Maturity",     type: "plot-micro",       parentTrope: "coming-of-age" },

  // secret-identity (NEW)
  { slug: "hidden-true-self",      name: "Hidden True Self",       type: "character-trait",  parentTrope: "secret-identity" },
  { slug: "unmasking-moment",      name: "Unmasking Moment",       type: "plot-micro",       parentTrope: "secret-identity" },

  // magic-tournament
  { slug: "spell-duel",            name: "Spell Duel",             type: "magic-micro",      parentTrope: "magic-tournament" },
  { slug: "tournament-of-power",   name: "Tournament of Power",    type: "plot-micro",       parentTrope: "magic-tournament" },

  // fae-court-drama (NEW)
  { slug: "fae-politics",          name: "Fae Politics",           type: "plot-micro",       parentTrope: "fae-court-drama" },
  { slug: "glamour-and-deception", name: "Glamour & Deception",    type: "magic-micro",      parentTrope: "fae-court-drama" },

  // dying-empire
  { slug: "crumbling-institutions",name: "Crumbling Institutions", type: "plot-micro",       parentTrope: "dying-empire" },
  { slug: "last-days-of-empire",   name: "Last Days of Empire",    type: "plot-micro",       parentTrope: "dying-empire" },

  // desert-kingdom
  { slug: "sand-seas",             name: "Sand Seas",              type: "setting-micro",    parentTrope: "desert-kingdom" },
  { slug: "oasis-cities",          name: "Oasis Cities",           type: "setting-micro",    parentTrope: "desert-kingdom" },

  // frozen-wasteland
  { slug: "arctic-expedition",     name: "Arctic Expedition",      type: "plot-micro",       parentTrope: "frozen-wasteland" },
  { slug: "endless-winter",        name: "Endless Winter",         type: "setting-micro",    parentTrope: "frozen-wasteland" },

  // pirate-fantasy
  { slug: "sea-raiders",           name: "Sea Raiders",            type: "plot-micro",       parentTrope: "pirate-fantasy" },
  { slug: "cursed-treasure",       name: "Cursed Treasure",        type: "magic-micro",      parentTrope: "pirate-fantasy" },

  // viking-inspired
  { slug: "norse-myth-vibes",      name: "Norse Myth Vibes",       type: "setting-micro",    parentTrope: "viking-inspired" },
  { slug: "raids-and-clans",       name: "Raids & Clans",          type: "plot-micro",       parentTrope: "viking-inspired" },

  // gothic-castle
  { slug: "haunted-halls",         name: "Haunted Halls",          type: "setting-micro",    parentTrope: "gothic-castle" },
  { slug: "dark-family-secrets",   name: "Dark Family Secrets",    type: "plot-micro",       parentTrope: "gothic-castle" },

  // floating-islands
  { slug: "skyships",              name: "Skyships",               type: "setting-micro",    parentTrope: "floating-islands" },
  { slug: "sky-cities",            name: "Sky Cities",             type: "setting-micro",    parentTrope: "floating-islands" },

  // underground-city
  { slug: "subterranean-civilization",name: "Subterranean Civilization",type: "setting-micro",parentTrope: "underground-city" },
  { slug: "tunnel-networks",       name: "Tunnel Networks",        type: "setting-micro",    parentTrope: "underground-city" },

  // elemental-magic
  { slug: "fire-and-ice-magic",    name: "Fire & Ice Magic",       type: "magic-micro",      parentTrope: "elemental-magic" },
  { slug: "stormcalling",          name: "Stormcalling",           type: "magic-micro",      parentTrope: "elemental-magic" },

  // blood-magic
  { slug: "ritual-sacrifice",      name: "Ritual Sacrifice",       type: "magic-micro",      parentTrope: "blood-magic" },
  { slug: "life-force-spells",     name: "Life-Force Spells",      type: "magic-micro",      parentTrope: "blood-magic" },

  // forbidden-magic
  { slug: "banned-spells",         name: "Banned Spells",          type: "magic-micro",      parentTrope: "forbidden-magic" },
  { slug: "occult-practices",      name: "Occult Practices",       type: "magic-micro",      parentTrope: "forbidden-magic" },

  // necromancy
  { slug: "raise-the-dead",        name: "Raise the Dead",         type: "magic-micro",      parentTrope: "necromancy" },
  { slug: "undead-army",           name: "Undead Army",            type: "magic-micro",      parentTrope: "necromancy" },

  // divine-magic
  { slug: "god-blessed",           name: "God-Blessed",            type: "magic-micro",      parentTrope: "divine-magic" },
  { slug: "cleric-miracles",       name: "Cleric Miracles",        type: "magic-micro",      parentTrope: "divine-magic" },

  // magical-artifacts
  { slug: "legendary-relic",       name: "Legendary Relic",        type: "magic-micro",      parentTrope: "magical-artifacts" },
  { slug: "corrupting-artifact",   name: "Corrupting Artifact",    type: "magic-micro",      parentTrope: "magical-artifacts" },

  // sentient-weapon
  { slug: "talking-sword",         name: "Talking Sword",          type: "magic-micro",      parentTrope: "sentient-weapon" },
  { slug: "weapon-with-a-will",    name: "Weapon With a Will",     type: "magic-micro",      parentTrope: "sentient-weapon" },

  // curse-breaking (NEW)
  { slug: "loophole-in-curse",     name: "Loophole in the Curse",  type: "magic-micro",      parentTrope: "curse-breaking" },
  { slug: "breaking-the-binding",  name: "Breaking the Binding",   type: "magic-micro",      parentTrope: "curse-breaking" },

];
