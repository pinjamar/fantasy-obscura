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
  // high search volume
  'harry-potter-philosophers-stone', 'the-song-of-achilles',
  'iron-flame', 'onyx-storm', 'eragon', 'shadow-and-bone',
  'gideon-the-ninth', 'words-of-radiance', 'city-of-bones',
  'the-hitchhikers-guide-to-the-galaxy', 'enders-game', 'american-gods',
  // massive mainstream / TV-driven search volume
  'the-midnight-library', 'the-three-body-problem', 'outlander',
  'interview-with-the-vampire', 'the-hunger-games',
  // His Dark Materials (HBO show, huge search volume)
  'the-golden-compass',
];

export const TIER_2 = [
  'a-darker-shade-of-magic', 'a-deadly-education', 'a-desolation-called-peace',
  'a-long-way-to-a-small-angry-planet', 'a-master-of-djinn', 'a-memory-called-empire',
  'a-wizard-of-earthsea', 'an-ember-in-the-ashes',
  'babel', 'best-served-cold', 'caraval',
  'children-of-blood-and-bone', 'daughter-of-the-forest',
  'daughter-of-the-moon-goddess', 'dungeon-crawler-carl',
  'empire-of-sand', 'foundryside', 'graceling', 'guards-guards', 'half-a-king',
  'he-who-fights-with-monsters', 'ink-and-bone',
  'jade-city', 'kingdom-of-the-wicked',
  'nevernight', 'neverwhere', 'ravensworn', 'sabriel',
  'she-who-became-the-sun', 'skyward',
  'stardust', 'storm-front', 'strange-the-dreamer',
  'the-bone-shard-daughter', 'the-dragon-republic', 'the-druids-keep',
  'the-fell-sword', 'the-fifth-season', 'the-graveyard-book',
  'the-house-in-the-cerulean-sea', 'the-hundred-thousand-kingdoms',
  'the-invisible-life-of-addie-larue', 'the-jasmine-throne', 'the-last-wish',
  'the-lions-of-al-rassan', 'the-magicians',
  'the-ocean-at-the-end-of-the-lane', 'the-once-and-future-king', 'the-once-and-future-witches',
  'the-princess-bride', 'the-silmarillion',
  'the-starless-sea', 'the-ten-thousand-doors-of-january', 'the-way-of-shadows',
  'the-witchs-heart', 'throne-of-glass', 'warbreaker',
  // demoted from TIER_1
  'the-book-of-the-new-sun', 'the-spear-cuts-through-water',
  'the-darkness-that-comes-before', 'the-tainted-cup',
  'red-sister', 'malice', 'kings-of-the-wyld', 'the-dragonbone-chair',
  'the-bone-ships', 'the-ember-blade', 'the-rage-of-dragons',
  'daughter-of-the-empire', 'the-traitor-baru-cormorant', 'the-sword-of-kaigen',
  'senlin-ascends', 'emily-wildes-encyclopaedia-of-faeries', 'tigana',
  // TV adaptations / high 2024-25 search volume
  'fire-and-blood', 'the-sandman-vol-1-preludes-nocturnes',
  'altered-carbon', 'snow-crash', 'kindred',
  'somewhere-beyond-the-sea', 'the-familiar',
  'the-mercy-of-gods', 'sunrise-on-the-reaping',
  'the-maze-runner', 'divergent',
  // Kingkiller Chronicle sequel (massively searched)
  'the-wise-mans-fear',
  // Blood & Ash / JLA — huge romantasy search volume, in CURATED_SLUGS
  'born-of-blood-and-ash', 'the-ashes-and-the-star-cursed-king',
  // Crave series — popular YA romantasy, in CURATED_SLUGS
  'crave',
  // Red Queen — huge YA series
  'red-queen',
  // Witcher novels proper
  'blood-of-elves',
  // Assistant to the Villain — cozy romantasy, in books-like guides
  'assistant-to-the-villain',
  // Andy Weir standalones — massive search volume
  'project-hail-mary',
  // VE Schwab new series — high search
  'the-fragile-threads-of-power',
  // TJ Klune standalone — very searched, was in books-like coming-soon
  'under-the-whispering-door',
  // Kushiel's Dart — classic literary fantasy, steady search
  'kushiels-dart',
  // Feist classic entry point
  'magician-apprentice',
  // GoT sequels — very searched alongside A Game of Thrones
  'a-clash-of-kings', 'a-storm-of-swords',
];

export const TIER_3 = [
  // ── Romantasy / Dark Romance ──────────────────────────────────────────────
  'a-court-of-mist-and-fury', 'a-court-of-wings-and-ruin', 'a-court-of-frost-and-starlight',
  'a-court-of-silver-flames',
  'house-of-earth-and-blood', 'house-of-sky-and-breath', 'house-of-flame-and-shadow',
  'a-fate-inked-in-blood', 'when-the-moon-hatched',
  'the-stars-are-dying', 'a-little-hatred', 'the-trouble-with-peace', 'the-wisdom-of-crowds',
  'a-kingdom-of-flesh-and-fire', 'the-crown-of-gilded-bones', 'the-war-of-two-queens',

  // ── Cosmere (Sanderson) — sequels & novellas ──────────────────────────────
  'the-well-of-ascension', 'the-hero-of-ages',
  'oathbringer', 'rhythm-of-war', 'wind-and-truth',
  'tress-of-the-emerald-sea', 'the-sunlit-man', 'yumi-and-the-nightmare-painter',
  'the-rithmatist', 'alcatraz-versus-the-evil-librarians',
  'starsight', 'cytonic', 'defiant',
  // Mistborn Era 2
  'the-alloy-of-law', 'shadows-of-self', 'the-bands-of-mourning', 'the-lost-metal',
  // Cosmere novellas
  'the-emperors-soul', 'dawnshard', 'edgedancer',

  // ── Throne of Glass sequels (SJM) ────────────────────────────────────────
  'crown-of-midnight', 'queen-of-shadows', 'empire-of-storms', 'kingdom-of-ash',
  'the-assassins-blade',

  // ── Grishaverse (Bardugo) ─────────────────────────────────────────────────
  'crooked-kingdom',
  'siege-and-storm', 'ruin-and-rising', 'king-of-scars', 'rule-of-wolves',
  'the-gilded-wolves', 'the-silvered-serpents', 'the-midnight-lie',

  // ── Red Rising sequels (Pierce Brown) ────────────────────────────────────
  'golden-son', 'morning-star', 'iron-gold', 'dark-age', 'light-bringer',

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
  'catching-fire', 'mockingjay',
  'the-scorch-trials', 'the-death-cure',
  'fireborne', 'the-gilded-wolves', 'the-daughters-war',

  // ── Cozy / Heartwarming ───────────────────────────────────────────────────
  'a-psalm-for-the-wild-built', 'a-prayer-for-the-crown-shy',
  'bookshops-and-bonedust', 'nettle-and-bone', 'thornhedge',
  'the-very-secret-society-of-irregular-witches', 'witch-of-wild-things',
  'sorcery-of-thorns',
  'emily-wildes-map-of-the-otherlands',
  'the-undertaking-of-hart-and-mercy',
  'in-other-lands',

  // ── Dresden Files depth (Jim Butcher) ────────────────────────────────────
  'fool-moon', 'grave-peril', 'summer-knight', 'death-masks',
  'blood-rites', 'dead-beat', 'proven-guilty', 'white-night',
  'small-favor', 'turn-coat', 'ghost-story', 'cold-days', 'skin-game',
  'peace-talks', 'battle-ground',

  // ── Lightbringer sequels (Brent Weeks) ───────────────────────────────────
  'the-blinding-knife', 'the-broken-eye', 'the-blood-mirror', 'the-burning-white',

  // ── A Song of Ice and Fire sequels ───────────────────────────────────────
  'a-clash-of-kings', 'a-storm-of-swords', 'a-feast-for-crows', 'a-dance-with-dragons',

  // ── Discworld standalones worth individual editorial ──────────────────────
  'small-gods', 'night-watch', 'going-postal', 'the-wee-free-men',
  'reaper-man', 'hogfather', 'mort',

  // ── Kushiel's Legacy (Jacqueline Carey) ──────────────────────────────────
  'kushiels-dart', 'kushiels-chosen', 'kushiels-avatar',

  // ── Riftwar Saga (Feist) ──────────────────────────────────────────────────
  'magician-apprentice', 'magician-master',

  // ── VE Schwab series additions ────────────────────────────────────────────
  'the-fragile-threads-of-power', 'vengeful',

  // ── TJ Klune standalones ──────────────────────────────────────────────────
  'under-the-whispering-door', 'wolfsong',

  // ── Urban / Gaiman-adjacent ───────────────────────────────────────────────
  'anansi-boys', 'coraline', 'norse-mythology',
  'the-magician-king', 'the-magicians-land',
  'rivers-of-london', 'moon-over-soho',
  'dead-witch-walking', 'burn-for-me',

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

  // ── Sci-Fi classics (steady search, TV/film adaptations) ─────────────────
  'neuromancer', 'do-androids-dream-of-electric-sheep',
  'the-dark-forest', 'deaths-end',
  'hyperion', 'the-fall-of-hyperion',
  'ready-player-one',

  // ── Dungeon Crawler Carl sequels ─────────────────────────────────────────
  'carls-doomsday-scenario', 'the-dungeon-anarchists-cookbook',
  'the-gate-of-the-feral-gods', 'the-butchers-masquerade',
  'the-eye-of-the-bedlam-bride', 'this-inevitable-ruin',

  // ── Cradle sequels (Will Wight) ───────────────────────────────────────────
  'skysworn', 'underlord', 'uncrowned', 'wintersteel', 'bloodline',
  'reaper', 'dreadgod', 'waybound',

  // ── LitRPG / Progression Fantasy ─────────────────────────────────────────
  'soulsmith', 'blackflame', 'ghostwater',
  'the-beginning-after-the-end', 'shadow-slave', 'mother-of-learning',
  'old-mans-war',

  // ── Robin Hobb deep cuts ──────────────────────────────────────────────────
  'ship-of-magic', 'the-mad-ship', 'ship-of-destiny',
  'fools-errand', 'the-golden-fool', 'fools-fate',
  'fools-assassin', 'fools-quest', 'assassins-fate',

  // ── Broken Earth / NK Jemisin sequels ────────────────────────────────────
  'the-obelisk-gate', 'the-stone-sky',
  'the-kingdom-of-gods',

  // ── LotR sequels (constantly searched alongside Fellowship) ──────────────
  'the-two-towers', 'the-return-of-the-king',

  // ── Flesh & Fire / JLA prequels ───────────────────────────────────────────
  'a-shadow-in-the-ember', 'a-light-in-the-flame', 'a-fire-in-the-flesh',

  // ── Red Queen sequels ─────────────────────────────────────────────────────
  'glass-sword', 'kings-cage', 'war-storm',

  // ── Kingdom of the Wicked sequel ─────────────────────────────────────────
  'kingdom-of-the-cursed',

  // ── Historical / literary romantasy ──────────────────────────────────────
  'the-wrath-and-the-dawn', 'the-rose-and-the-dagger',

  // ── Vampire Academy ───────────────────────────────────────────────────────
  'vampire-academy',

  // ── Misc high-search standalones ─────────────────────────────────────────
  'the-saint-of-bright-doors', 'the-city-we-became',
];

// Combined: all books worth full editorial treatment
export const ALL_PRIORITY = [...TIER_1, ...TIER_2, ...TIER_3];
