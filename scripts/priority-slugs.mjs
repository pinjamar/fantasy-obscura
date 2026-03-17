/**
 * priority-slugs.mjs
 *
 * Single source of truth for book priority tiers used by all generate-* scripts.
 *
 * TIER_1 — 50 flagship books: fully editorial (ideal_reader, reading_experience, unique_angle, faqs)
 * TIER_2 — secondary books: currently have 1-2 editorial sections filled; candidates for full treatment
 */

export const TIER_1 = [
  'the-final-empire', 'the-way-of-kings', 'the-name-of-the-wind',
  'a-game-of-thrones', 'the-fellowship-of-the-ring', 'the-hobbit',
  'the-blade-itself', 'the-lies-of-locke-lamora', 'assassins-apprentice',
  'the-eye-of-the-world', 'fourth-wing', 'a-court-of-thorns-and-roses',
  'the-priory-of-the-orange-tree', 'the-poppy-war', 'the-shadow-of-the-gods',
  'red-sister', 'malice', 'the-black-prism', 'empire-of-the-vampire',
  'kings-of-the-wyld', 'jonathan-strange-and-mr-norrell', 'the-dragonbone-chair',
  'elantris', 'the-darkness-that-comes-before', 'the-colour-of-magic',
  'circe', 'uprooted', 'spinning-silver', 'legends-and-lattes', 'cradle-unsouled',
  'the-cruel-prince', 'the-will-of-the-many', 'the-justice-of-kings',
  'prince-of-thorns', 'gardens-of-the-moon', 'the-bone-ships',
  'the-bear-and-the-nightingale', 'the-ember-blade', 'the-rage-of-dragons',
  'daughter-of-the-empire', 'the-traitor-baru-cormorant', 'the-sword-of-kaigen',
  'senlin-ascends', 'the-goblin-emperor', 'the-atlas-six',
  'emily-wildes-encyclopaedia-of-faeries', 'the-spear-cuts-through-water',
  'the-tainted-cup', 'the-book-of-the-new-sun', 'tigana',
];

// Books with 1-2 editorial sections already filled — next in line for full treatment
export const TIER_2 = [
  'a-darker-shade-of-magic', 'a-deadly-education', 'a-desolation-called-peace',
  'a-long-way-to-a-small-angry-planet', 'a-master-of-djinn', 'a-memory-called-empire',
  'a-wizard-of-earthsea', 'american-gods', 'an-ember-in-the-ashes',
  'babel', 'best-served-cold', 'caraval',
  'children-of-blood-and-bone', 'city-of-bones', 'daughter-of-the-forest',
  'daughter-of-the-moon-goddess', 'dune', 'dungeon-crawler-carl',
  'empire-of-sand', 'enders-game', 'eragon',
  'foundryside', 'from-blood-and-ash', 'good-omens',
  'graceling', 'guards-guards', 'half-a-king',
  'harry-potter-philosophers-stone', 'he-who-fights-with-monsters', 'ink-and-bone',
  'iron-flame', 'jade-city', 'kingdom-of-the-wicked',
  'nevernight', 'neverwhere', 'piranesi',
  'ravensworn', 'red-rising', 'sabriel',
  'shadow-and-bone', 'she-who-became-the-sun', 'skyward',
  'stardust', 'storm-front', 'strange-the-dreamer',
  'the-bone-shard-daughter', 'the-dragon-republic', 'the-druids-keep',
  'the-fell-sword', 'the-fifth-season', 'the-graveyard-book',
  'the-hitchhikers-guide-to-the-galaxy', 'the-house-in-the-cerulean-sea', 'the-hundred-thousand-kingdoms',
  'the-invisible-life-of-addie-larue', 'the-jasmine-throne', 'the-last-wish',
  'the-lions-of-al-rassan', 'the-magicians', 'the-night-circus',
  'the-ocean-at-the-end-of-the-lane', 'the-once-and-future-king', 'the-once-and-future-witches',
  'the-princess-bride', 'the-silmarillion', 'the-song-of-achilles',
  'the-starless-sea', 'the-ten-thousand-doors-of-january', 'the-way-of-shadows',
  'the-witchs-heart', 'throne-of-glass', 'warbreaker', 'words-of-radiance',
];

// High-search-volume books not yet in TIER_1/2 — long-term editorial targets
// Cross-referenced from 500-guide wishlist (romantasy, epic, grimdark, YA, cozy, urban, LitRPG, classic)
export const TIER_3 = [
  // Romantasy / Dark Romance
  'a-court-of-silver-flames', 'house-of-earth-and-blood', 'house-of-sky-and-breath',
  'house-of-flame-and-shadow', 'onyx-storm', 'a-fate-inked-in-blood',
  'when-the-moon-hatched', 'the-stars-are-dying', 'a-little-hatred',
  'the-trouble-with-peace', 'the-wisdom-of-crowds',

  // Cosmere — major sequels with standalone search demand
  'the-well-of-ascension', 'the-hero-of-ages', 'oathbringer',
  'rhythm-of-war', 'wind-and-truth', 'tress-of-the-emerald-sea', 'the-sunlit-man',

  // Grishaverse (Bardugo)
  'six-of-crows', 'crooked-kingdom', 'siege-and-storm', 'ruin-and-rising',
  'king-of-scars', 'rule-of-wolves', 'the-gilded-wolves',

  // First Law World — sequels & standalones
  'before-they-are-hanged', 'last-argument-of-kings', 'the-heroes',
  'red-country',

  // Broken Empire sequels
  'king-of-thorns', 'emperor-of-thorns',

  // Locked Tomb (Tamsyn Muir)
  'gideon-the-ninth', 'harrow-the-ninth', 'nona-the-ninth',

  // Green Bone Saga sequels
  'jade-war', 'jade-legacy',

  // Poppy War / Kuang sequels & Babel adjacent
  'the-burning-god', 'the-oleander-sword', 'the-lotus-empire',

  // Baru Cormorant sequel
  'the-monster-baru-cormorant',

  // Atlas series sequels
  'the-atlas-paradox', 'the-atlas-complex',

  // Grimdark standalones
  'blood-song', 'the-book-eaters', 'the-warrior-prophet', 'the-thousandfold-thought',

  // YA Fantasy
  'the-wicked-king', 'the-queen-of-nothing', 'a-torch-against-the-night',
  'the-last-graduate', 'the-golden-enclaves', 'the-lightning-thief',
  'the-city-of-brass', 'the-kingdom-of-copper', 'siege-and-storm', 'ruin-and-rising',

  // Cozy / Heartwarming
  'a-psalm-for-the-wild-built', 'bookshops-and-bonedust', 'nettle-and-bone',
  'thornhedge', 'the-very-secret-society-of-irregular-witches',
  'sorcery-of-thorns', 'the-midnight-library', 'emily-wildes-map-of-the-otherlands',

  // Urban / Gaiman-adjacent
  'anansi-boys', 'coraline', 'the-magician-king',

  // Classic / Literary Fantasy
  'a-song-for-arbonne', 'under-heaven', 'the-summer-tree', 'the-killing-moon',

  // LitRPG / SFF crossover
  'all-systems-red', 'leviathan-wakes', 'old-mans-war',
  'the-beginning-after-the-end', 'shadow-slave',

  // Robin Hobb deep cuts
  'ship-of-magic', 'fools-errand',

  // Other high-search standalones
  'outlander', 'promise-of-blood', 'mexican-gothic',
];

// Combined: all books worth full editorial treatment
export const ALL_PRIORITY = [...TIER_1, ...TIER_2, ...TIER_3];
