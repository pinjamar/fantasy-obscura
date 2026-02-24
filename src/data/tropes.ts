// ─── Public Tropes ────────────────────────────────────────────────────────────
// 75 canonical tropes exposed to users (filter UI, book pages, community tags).
// The `name` field is the canonical string stored in the books.tropes text[] column.
// The `slug` is for future URL routing and community tag endpoints.

export type TropeCategory = "character" | "relationship" | "plot" | "setting" | "magic";

export type PublicTrope = {
  slug: string;
  name: string;
  category: TropeCategory;
  description: string;
};

export const PUBLIC_TROPES: PublicTrope[] = [

  // ── CHARACTER (15) ────────────────────────────────────────────────────────
  { slug: "chosen-one",          name: "Chosen One",          category: "character", description: "A protagonist marked by destiny or prophecy." },
  { slug: "reluctant-hero",      name: "Reluctant Hero",      category: "character", description: "A hero who does not initially seek their role." },
  { slug: "anti-hero",           name: "Anti-Hero",           category: "character", description: "A morally complex or flawed main character." },
  { slug: "villain-protagonist", name: "Villain Protagonist", category: "character", description: "The main character begins as or becomes the antagonist." },
  { slug: "morally-grey-hero",   name: "Morally Grey Hero",   category: "character", description: "A hero operating outside clear moral lines." },
  { slug: "dark-lord",           name: "Dark Lord",           category: "character", description: "A powerful evil ruler threatening the world." },
  { slug: "secret-royalty",      name: "Secret Royalty",      category: "character", description: "A protagonist unaware of their royal lineage." },
  { slug: "lost-heir",           name: "Lost Heir",           category: "character", description: "A hidden heir to a throne or power." },
  { slug: "assassin-protagonist",name: "Assassin Protagonist",category: "character", description: "The main character is a trained killer." },
  { slug: "dragon-rider",        name: "Dragon Rider",        category: "character", description: "A character bonded to or riding dragons." },
  { slug: "immortal-character",  name: "Immortal Character",  category: "character", description: "A character who cannot die naturally." },
  { slug: "cursed-character",    name: "Cursed Character",    category: "character", description: "A character bound by magical curse." },
  { slug: "outcast-hero",        name: "Outcast Hero",        category: "character", description: "A protagonist rejected by society." },
  { slug: "mentor-figure",       name: "Mentor Figure",       category: "character", description: "A wise guide or parental figure who shapes the protagonist — and may not survive." },
  { slug: "dragons",             name: "Dragons",             category: "character", description: "Dragons as central creatures or characters, not just mounts." },

  // ── RELATIONSHIP (15) ─────────────────────────────────────────────────────
  { slug: "found-family",         name: "Found Family",         category: "relationship", description: "Unrelated characters form deep familial bonds." },
  { slug: "enemies-to-lovers",    name: "Enemies to Lovers",    category: "relationship", description: "Rivals develop romantic feelings." },
  { slug: "slow-burn",            name: "Slow Burn",            category: "relationship", description: "Romantic or emotional tension develops gradually." },
  { slug: "forbidden-romance",    name: "Forbidden Romance",    category: "relationship", description: "A romance forbidden by society or duty." },
  { slug: "political-marriage",   name: "Political Marriage",   category: "relationship", description: "Marriage arranged for power or alliance." },
  { slug: "mentor-student",       name: "Mentor and Student",   category: "relationship", description: "A guiding teacher and protégé bond." },
  { slug: "rivals-to-allies",     name: "Rivals to Allies",     category: "relationship", description: "Competitors unite for a common cause." },
  { slug: "redemption-arc",       name: "Redemption Arc",       category: "relationship", description: "A character seeks redemption for past sins." },
  { slug: "betrayal",             name: "Betrayal",             category: "relationship", description: "A trusted ally betrays the protagonist." },
  { slug: "love-triangle",        name: "Love Triangle",        category: "relationship", description: "Three characters entangled romantically." },
  { slug: "bodyguard-romance",    name: "Bodyguard Romance",    category: "relationship", description: "A protector falls for the protected." },
  { slug: "fated-mates",          name: "Fated Mates",          category: "relationship", description: "Two characters bound by destiny." },
  { slug: "forced-proximity",     name: "Forced Proximity",     category: "relationship", description: "Characters must stay physically close." },
  { slug: "grumpy-sunshine",      name: "Grumpy x Sunshine",   category: "relationship", description: "Opposite personalities clash and attract." },
  { slug: "second-chance-romance",name: "Second Chance Romance",category: "relationship", description: "Former lovers reunite." },

  // ── PLOT (21) ─────────────────────────────────────────────────────────────
  { slug: "quest",               name: "Quest",                   category: "plot", description: "A journey to achieve a specific goal." },
  { slug: "prophecy",            name: "Prophecy",                category: "plot", description: "Events driven by foretold destiny." },
  { slug: "rebellion",           name: "Rebellion",               category: "plot", description: "A fight against oppressive rule." },
  { slug: "political-intrigue",  name: "Political Intrigue",      category: "plot", description: "Schemes, court politics, and power plays." },
  { slug: "war-between-kingdoms",name: "War Between Kingdoms",    category: "plot", description: "Large-scale war between nations." },
  { slug: "revenge-story",       name: "Revenge Story",           category: "plot", description: "A protagonist seeks vengeance." },
  { slug: "ancient-evil-awakens",name: "Ancient Evil Awakens",    category: "plot", description: "A long-dormant evil returns." },
  { slug: "tournament-arc",      name: "Tournament Arc",          category: "plot", description: "Competition determining strength or fate." },
  { slug: "heist",               name: "Heist",                   category: "plot", description: "A daring robbery or impossible infiltration." },
  { slug: "succession-crisis",   name: "Succession Crisis",       category: "plot", description: "Conflict over who inherits power." },
  { slug: "survival-journey",    name: "Survival Journey",        category: "plot", description: "Characters struggle to survive harsh conditions." },
  { slug: "hidden-society",      name: "Hidden Society",          category: "plot", description: "A secret magical world exists alongside ours." },
  { slug: "trial-by-combat",     name: "Trial by Combat",         category: "plot", description: "Justice determined through combat." },
  { slug: "end-of-the-world",    name: "End of the World Stakes", category: "plot", description: "Apocalyptic threat looms." },
  { slug: "magical-plague",      name: "Magical Plague",          category: "plot", description: "A supernatural disease spreads." },
  { slug: "hero-becomes-villain",name: "Hero Becomes Villain",    category: "plot", description: "Protagonist descends into darkness." },
  { slug: "pyrrhic-victory",     name: "Pyrrhic Victory",         category: "plot", description: "Victory comes at terrible cost." },
  { slug: "power-at-a-cost",     name: "Power at a Cost",         category: "plot", description: "Magic requires sacrifice." },
  { slug: "coming-of-age",       name: "Coming of Age",           category: "plot", description: "A young protagonist matures through trials, mistakes, and growth." },
  { slug: "secret-identity",     name: "Secret Identity",         category: "plot", description: "A character hides who they truly are — by choice or circumstance." },
  { slug: "portal-fantasy",      name: "Portal Fantasy",          category: "plot", description: "A character is transported into another world." },

  // ── SETTING (10) ──────────────────────────────────────────────────────────
  { slug: "magic-academy",   name: "Magic Academy",       category: "setting", description: "Story set in a magical school or academy." },
  { slug: "fae-court-drama", name: "Fae Court Drama",     category: "setting", description: "Story set in or around Fae courts with intrigue, deals, and glamour." },
  { slug: "dying-empire",    name: "Dying Empire",        category: "setting", description: "An empire in decline." },
  { slug: "desert-kingdom",  name: "Desert Kingdom",      category: "setting", description: "Fantasy set in arid lands." },
  { slug: "frozen-wasteland",name: "Frozen Wasteland",    category: "setting", description: "Story in icy, unforgiving landscapes." },
  { slug: "pirate-fantasy",  name: "Pirate Fantasy",      category: "setting", description: "Seafaring adventures and sea raiders." },
  { slug: "viking-inspired", name: "Viking-Inspired World",category: "setting", description: "Norse-inspired fantasy setting." },
  { slug: "gothic-castle",   name: "Gothic Castle",       category: "setting", description: "Dark castle-centered narrative." },
  { slug: "floating-islands",name: "Floating Islands",    category: "setting", description: "Sky-bound landmasses and skyships." },
  { slug: "underground-city",name: "Underground City",    category: "setting", description: "Civilization beneath the surface." },

  // ── MAGIC (10) ────────────────────────────────────────────────────────────
  { slug: "hard-magic-system", name: "Hard Magic System", category: "magic", description: "Clearly defined magical rules." },
  { slug: "soft-magic-system", name: "Soft Magic System", category: "magic", description: "Mystical and undefined magic." },
  { slug: "elemental-magic",   name: "Elemental Magic",   category: "magic", description: "Magic tied to natural elements." },
  { slug: "blood-magic",       name: "Blood Magic",       category: "magic", description: "Magic powered by blood sacrifice." },
  { slug: "forbidden-magic",   name: "Forbidden Magic",   category: "magic", description: "Outlawed or dangerous magic." },
  { slug: "necromancy",        name: "Necromancy",        category: "magic", description: "Raising or controlling the dead." },
  { slug: "divine-magic",      name: "Divine Magic",      category: "magic", description: "Power granted by gods." },
  { slug: "magical-artifacts", name: "Magical Artifacts", category: "magic", description: "Powerful enchanted objects." },
  { slug: "sentient-weapon",   name: "Sentient Weapon",   category: "magic", description: "A weapon with its own consciousness." },
  { slug: "curse-breaking",    name: "Curse Breaking",    category: "magic", description: "A curse must be understood and broken — often at great cost." },

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

  // dragons (NEW)
  { slug: "dragon-as-threat",      name: "Dragon as Threat",       type: "plot-micro",       parentTrope: "dragons" },
  { slug: "dragon-as-ally",        name: "Dragon as Ally",         type: "microtrope",       parentTrope: "dragons" },

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

  // portal-fantasy
  { slug: "transported-to-another-world",name: "Transported to Another World",type: "plot-micro",  parentTrope: "portal-fantasy" },
  { slug: "fish-out-of-water",     name: "Fish Out of Water",      type: "character-trait",  parentTrope: "portal-fantasy" },

  // magic-academy
  { slug: "academy-training",      name: "Academy Training",       type: "setting-micro",    parentTrope: "magic-academy" },
  { slug: "school-rivalries",      name: "School Rivalries",       type: "relationship-micro",parentTrope: "magic-academy" },

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

  // hard-magic-system
  { slug: "spell-rules",           name: "Spell Rules",            type: "magic-micro",      parentTrope: "hard-magic-system" },
  { slug: "magic-crafting",        name: "Magic Crafting",         type: "magic-micro",      parentTrope: "hard-magic-system" },

  // soft-magic-system
  { slug: "mysterious-magic",      name: "Mysterious Magic",       type: "magic-micro",      parentTrope: "soft-magic-system" },
  { slug: "mythic-wonder",         name: "Mythic Wonder",          type: "magic-micro",      parentTrope: "soft-magic-system" },

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
