/**
 * priority-slugs.mjs
 *
 * Single source of truth for book priority tiers used by all generate-* scripts.
 *
 * TIER_1 — flagship books: fully editorial (ideal_reader, reading_experience, unique_angle, faqs)
 * TIER_2 — secondary books: 1-2 editorial sections filled; candidates for full treatment
 * TIER_3 — full coverage for books-like guides; every unique title from the 500-guide wishlist
 */

export const TIER_1 = [
  'the-final-empire', 'the-way-of-kings', 'the-name-of-the-wind',
  'a-game-of-thrones', 'the-fellowship-of-the-ring', 'the-hobbit',
  'the-blade-itself', 'the-lies-of-locke-lamora', 'assassins-apprentice',
  'the-eye-of-the-world', 'fourth-wing', 'a-court-of-thorns-and-roses',
  'the-priory-of-the-orange-tree', 'the-poppy-war', 'the-shadow-of-the-gods',
  'the-black-prism', 'empire-of-the-vampire',
  'jonathan-strange-and-mr-norrell',
  'elantris', 'the-colour-of-magic',
  'circe', 'uprooted', 'spinning-silver', 'legends-and-lattes', 'cradle-unsouled',
  'the-cruel-prince', 'the-will-of-the-many', 'the-justice-of-kings',
  'prince-of-thorns', 'gardens-of-the-moon',
  'the-bear-and-the-nightingale', 'the-goblin-emperor', 'the-atlas-six',
  // promoted from TIER_2
  'red-rising', 'piranesi', 'good-omens', 'from-blood-and-ash', 'dune',
  // added
  'six-of-crows', 'the-night-circus',
  // high search volume promotions
  'harry-potter-philosophers-stone', 'the-song-of-achilles',
  'iron-flame', 'onyx-storm', 'eragon', 'shadow-and-bone',
  'gideon-the-ninth', 'words-of-radiance', 'city-of-bones',
  'the-hitchhikers-guide-to-the-galaxy', 'enders-game', 'american-gods',
];

export const TIER_2 = [
  'a-darker-shade-of-magic', 'a-deadly-education', 'a-desolation-called-peace',
  'a-long-way-to-a-small-angry-planet', 'a-master-of-djinn', 'a-memory-called-empire',
  'a-wizard-of-earthsea', 'american-gods', 'an-ember-in-the-ashes',
  'babel', 'best-served-cold', 'caraval',
  'children-of-blood-and-bone', 'city-of-bones', 'daughter-of-the-forest',
  'daughter-of-the-moon-goddess', 'dungeon-crawler-carl',
  'empire-of-sand', 'enders-game', 'eragon',
  'foundryside', 'graceling', 'guards-guards', 'half-a-king',
  'harry-potter-philosophers-stone', 'he-who-fights-with-monsters', 'ink-and-bone',
  'iron-flame', 'jade-city', 'kingdom-of-the-wicked',
  'nevernight', 'neverwhere', 'ravensworn', 'sabriel',
  'shadow-and-bone', 'she-who-became-the-sun', 'skyward',
  'stardust', 'storm-front', 'strange-the-dreamer',
  'the-bone-shard-daughter', 'the-dragon-republic', 'the-druids-keep',
  'the-fell-sword', 'the-fifth-season', 'the-graveyard-book',
  'the-hitchhikers-guide-to-the-galaxy', 'the-house-in-the-cerulean-sea', 'the-hundred-thousand-kingdoms',
  'the-invisible-life-of-addie-larue', 'the-jasmine-throne', 'the-last-wish',
  'the-lions-of-al-rassan', 'the-magicians',
  'the-ocean-at-the-end-of-the-lane', 'the-once-and-future-king', 'the-once-and-future-witches',
  'the-princess-bride', 'the-silmarillion', 'the-song-of-achilles',
  'the-starless-sea', 'the-ten-thousand-doors-of-january', 'the-way-of-shadows',
  'the-witchs-heart', 'throne-of-glass', 'warbreaker', 'words-of-radiance',
  // demoted from TIER_1
  'the-book-of-the-new-sun', 'the-spear-cuts-through-water',
  'the-darkness-that-comes-before', 'the-tainted-cup',
  'red-sister', 'malice', 'kings-of-the-wyld', 'the-dragonbone-chair',
  'the-bone-ships', 'the-ember-blade', 'the-rage-of-dragons',
  'daughter-of-the-empire', 'the-traitor-baru-cormorant', 'the-sword-of-kaigen',
  'senlin-ascends', 'emily-wildes-encyclopaedia-of-faeries', 'tigana',
];

export const TIER_3 = [
  // ── Romantasy / Dark Romance ──────────────────────────────────────────────
  'a-court-of-mist-and-fury', 'a-court-of-wings-and-ruin', 'a-court-of-frost-and-starlight',
  'a-court-of-silver-flames',
  'house-of-earth-and-blood', 'house-of-sky-and-breath', 'house-of-flame-and-shadow',
  'onyx-storm', 'a-fate-inked-in-blood', 'when-the-moon-hatched',
  'the-stars-are-dying', 'a-little-hatred', 'the-trouble-with-peace', 'the-wisdom-of-crowds',
  'a-kingdom-of-flesh-and-fire', 'the-crown-of-gilded-bones', 'the-war-of-two-queens',

  // ── Cosmere (Sanderson) — sequels & novellas ──────────────────────────────
  'the-well-of-ascension', 'the-hero-of-ages',
  'oathbringer', 'rhythm-of-war', 'wind-and-truth',
  'tress-of-the-emerald-sea', 'the-sunlit-man', 'yumi-and-the-nightmare-painter',
  'the-rithmatist', 'alcatraz-versus-the-evil-librarians',
  'starsight', 'cytonic', 'defiant',

  // ── Grishaverse (Bardugo) ─────────────────────────────────────────────────
  'crooked-kingdom',
  'siege-and-storm', 'ruin-and-rising', 'king-of-scars', 'rule-of-wolves',
  'the-gilded-wolves', 'the-silvered-serpents', 'the-midnight-lie',

  // ── First Law World (Abercrombie) ─────────────────────────────────────────
  'before-they-are-hanged', 'last-argument-of-kings',
  'the-heroes', 'red-country',

  // ── Broken Empire (Lawrence) ──────────────────────────────────────────────
  'king-of-thorns', 'emperor-of-thorns',
  'prince-of-fools', 'the-liar-s-key', 'the-wheel-of-osheim',

  // ── Locked Tomb (Tamsyn Muir) ─────────────────────────────────────────────
  'gideon-the-ninth', 'harrow-the-ninth', 'nona-the-ninth', 'alecto-the-ninth',

  // ── Green Bone Saga (Fonda Lee) ───────────────────────────────────────────
  'jade-war', 'jade-legacy',

  // ── Poppy War / RF Kuang ──────────────────────────────────────────────────
  'the-burning-god', 'the-oleander-sword', 'the-lotus-empire',

  // ── Radiant Emperor (Parker-Chan) ────────────────────────────────────────
  'he-who-drowned-the-world',

  // ── Baru Cormorant ────────────────────────────────────────────────────────
  'the-monster-baru-cormorant',

  // ── Atlas Series (Olivie Blake) ───────────────────────────────────────────
  'the-atlas-paradox', 'the-atlas-complex',

  // ── Prince of Nothing (Bakker) ────────────────────────────────────────────
  'the-warrior-prophet', 'the-thousandfold-thought',

  // ── Grimdark standalones ──────────────────────────────────────────────────
  'blood-song', 'tower-lord', 'queen-of-fire',
  'the-book-eaters', 'plain-bad-heroines', 'mexican-gothic',
  'the-black-company', 'shadows-linger', 'the-white-rose',
  'promise-of-blood', 'the-crimson-campaign', 'the-autumn-republic',

  // ── Wheel of Time — major sequels ────────────────────────────────────────
  'the-great-hunt', 'the-dragon-reborn', 'the-shadow-rising',
  'the-fires-of-heaven', 'lord-of-chaos', 'a-crown-of-swords',
  'the-gathering-storm', 'towers-of-midnight', 'a-memory-of-light',

  // ── YA Fantasy ───────────────────────────────────────────────────────────
  'the-wicked-king', 'the-queen-of-nothing',
  'a-torch-against-the-night', 'a-reaper-at-the-gates', 'a-sky-beyond-the-storm',
  'the-last-graduate', 'the-golden-enclaves',
  'the-lightning-thief', 'the-sea-of-monsters', 'the-titans-curse',
  'the-city-of-brass', 'the-kingdom-of-copper', 'the-empire-of-gold',
  'children-of-virtue-and-vengeance',
  'legendborn', 'bloodmarked',
  'the-bone-witch', 'the-heart-forger', 'the-shadowglass',
  'sea-of-the-jade-serpent',

  // ── Cozy / Heartwarming ───────────────────────────────────────────────────
  'a-psalm-for-the-wild-built', 'a-prayer-for-the-crown-shy',
  'bookshops-and-bonedust', 'nettle-and-bone', 'thornhedge',
  'the-very-secret-society-of-irregular-witches', 'witch-of-wild-things',
  'sorcery-of-thorns', 'the-midnight-library',
  'emily-wildes-map-of-the-otherlands',
  'the-undertaking-of-hart-and-mercy',
  'in-other-lands',

  // ── Urban / Gaiman-adjacent ───────────────────────────────────────────────
  'anansi-boys', 'coraline', 'norse-mythology',
  'the-magician-king', 'the-magicians-land',
  'outlander', 'dragonfly-in-amber',
  'rivers-of-london', 'moon-over-soho',

  // ── Classic & Literary Fantasy ────────────────────────────────────────────
  'a-song-for-arbonne', 'under-heaven', 'river-of-stars',
  'the-summer-tree', 'the-wandering-fire', 'the-darkest-road',
  'the-killing-moon', 'the-shadowed-sun',
  'nine-princes-in-amber', 'the-guns-of-avalon',
  'the-mists-of-avalon', 'the-crystal-cave',

  // ── Murderbot / SFF crossover (Martha Wells) ─────────────────────────────
  'all-systems-red', 'artificial-condition', 'rogue-protocol',
  'exit-strategy', 'network-effect', 'fugitive-telemetry',

  // ── Expanse (Corey) ───────────────────────────────────────────────────────
  'leviathan-wakes', 'calibans-war', 'abaddons-gate',

  // ── LitRPG / Progression Fantasy ─────────────────────────────────────────
  'soulsmith', 'blackflame', 'ghostwater', 'underlord', 'wintersteel', 'waybound',
  'the-beginning-after-the-end', 'shadow-slave', 'mother-of-learning',
  'old-mans-war',

  // ── Robin Hobb deep cuts ──────────────────────────────────────────────────
  'ship-of-magic', 'the-mad-ship', 'ship-of-destiny',
  'fools-errand', 'the-golden-fool', 'fools-fate',
  'fools-assassin', 'fools-quest', 'assassins-fate',

  // ── Broken Earth / NK Jemisin sequels ────────────────────────────────────
  'the-obelisk-gate', 'the-stone-sky',
  'the-kingdom-of-gods',

  // ── Misc high-search standalones ─────────────────────────────────────────
  'the-saint-of-bright-doors', 'the-city-we-became',
];

// Combined: all books worth full editorial treatment
export const ALL_PRIORITY = [...TIER_1, ...TIER_2, ...TIER_3];
