import { useState, useEffect } from 'react';

interface Category {
  slug: string;
  name: string;
  description: string;
  gradient: string;
}

// ── Static curated lists ──────────────────────────────────────────────────────
// Edit these to control Community Favorites & New Releases per category.
// 'global' is the homepage default (no category selected).
// slugs must match /books/[slug] in the database.
type CuratedEntry = { title: string; slug: string };

const CURATED_FAVORITES: Record<string, CuratedEntry[]> = {
  global: [
    { title: 'The Way of Kings',                slug: 'the-way-of-kings' },
    { title: 'The Name of the Wind',            slug: 'the-name-of-the-wind' },
    { title: 'Mistborn: The Final Empire',      slug: 'mistborn-the-final-empire' },
    { title: 'The Lies of Locke Lamora',        slug: 'the-lies-of-locke-lamora' },
    { title: 'A Court of Thorns and Roses',     slug: 'acotar' },
    { title: 'Six of Crows',                    slug: 'six-of-crows' },
    { title: 'The Blade Itself',                slug: 'the-blade-itself' },
    { title: 'Red Rising',                      slug: 'red-rising' },
    { title: 'The Poppy War',                   slug: 'the-poppy-war' },
    { title: 'Gardens of the Moon',             slug: 'gardens-of-the-moon' },
    { title: 'Piranesi',                        slug: 'piranesi' },
    { title: 'Dungeon Crawler Carl',            slug: 'dungeon-crawler-carl' },
  ],
  epic: [
    { title: 'The Way of Kings',                slug: 'the-way-of-kings' },
    { title: 'The Name of the Wind',            slug: 'the-name-of-the-wind' },
    { title: 'Mistborn: The Final Empire',      slug: 'mistborn-the-final-empire' },
    { title: 'The Eye of the World',            slug: 'the-eye-of-the-world' },
    { title: 'The Blade Itself',                slug: 'the-blade-itself' },
    { title: 'Gardens of the Moon',             slug: 'gardens-of-the-moon' },
    { title: 'The Fifth Season',                slug: 'the-fifth-season' },
    { title: 'The Priory of the Orange Tree',   slug: 'the-priory-of-the-orange-tree' },
    { title: 'Red Rising',                      slug: 'red-rising' },
    { title: 'The Rage of Dragons',             slug: 'the-rage-of-dragons' },
    { title: 'A Memory Called Empire',          slug: 'a-memory-called-empire' },
    { title: 'The Stormlight Archive',          slug: 'the-way-of-kings' },
  ],
  romantasy: [
    { title: 'A Court of Thorns and Roses',     slug: 'acotar' },
    { title: 'A Court of Mist and Fury',        slug: 'a-court-of-mist-and-fury' },
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'From Blood and Ash',              slug: 'from-blood-and-ash' },
    { title: 'The Cruel Prince',                slug: 'the-cruel-prince' },
    { title: 'Six of Crows',                    slug: 'six-of-crows' },
    { title: 'Kingdom of the Wicked',           slug: 'kingdom-of-the-wicked' },
    { title: 'Divine Rivals',                   slug: 'divine-rivals' },
    { title: 'Serpent & Dove',                  slug: 'serpent-and-dove' },
    { title: 'The Bridge Kingdom',              slug: 'the-bridge-kingdom' },
    { title: 'Shadow and Bone',                 slug: 'shadow-and-bone' },
    { title: 'A Heart So Fierce and Broken',    slug: 'a-heart-so-fierce-and-broken' },
  ],
  grimdark: [
    { title: 'The Blade Itself',                slug: 'the-blade-itself' },
    { title: 'Best Served Cold',                slug: 'best-served-cold' },
    { title: 'Prince of Thorns',                slug: 'prince-of-thorns' },
    { title: 'Gardens of the Moon',             slug: 'gardens-of-the-moon' },
    { title: 'The Black Company',               slug: 'the-black-company' },
    { title: 'The Gutter Prayer',               slug: 'the-gutter-prayer' },
    { title: 'King of Thorns',                  slug: 'king-of-thorns' },
    { title: 'The Heroes',                      slug: 'the-heroes' },
    { title: 'The Poppy War',                   slug: 'the-poppy-war' },
    { title: 'A Little Hatred',                 slug: 'a-little-hatred' },
    { title: 'Red Country',                     slug: 'red-country' },
    { title: 'The First Law',                   slug: 'the-blade-itself' },
  ],
  dark: [
    { title: 'The Blade Itself',                slug: 'the-blade-itself' },
    { title: 'The Poppy War',                   slug: 'the-poppy-war' },
    { title: 'Nevernight',                      slug: 'nevernight' },
    { title: 'Prince of Thorns',                slug: 'prince-of-thorns' },
    { title: 'A Little Hatred',                 slug: 'a-little-hatred' },
    { title: 'The Gutter Prayer',               slug: 'the-gutter-prayer' },
    { title: 'The Black Company',               slug: 'the-black-company' },
    { title: 'Low Town',                        slug: 'low-town' },
    { title: 'Gardens of the Moon',             slug: 'gardens-of-the-moon' },
    { title: 'Red Rising',                      slug: 'red-rising' },
    { title: 'The Fifth Season',                slug: 'the-fifth-season' },
    { title: 'Ninth House',                     slug: 'ninth-house' },
  ],
  urban: [
    { title: 'Storm Front',                     slug: 'storm-front' },
    { title: 'American Gods',                   slug: 'american-gods' },
    { title: 'Rivers of London',                slug: 'rivers-of-london' },
    { title: 'Neverwhere',                      slug: 'neverwhere' },
    { title: 'Good Omens',                      slug: 'good-omens' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'The City We Became',              slug: 'the-city-we-became' },
    { title: 'A Psalm for the Wild-Built',      slug: 'a-psalm-for-the-wild-built' },
    { title: 'Piranesi',                        slug: 'piranesi' },
    { title: 'Ninth House',                     slug: 'ninth-house' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'The Dresden Files',               slug: 'storm-front' },
  ],
  historical: [
    { title: 'Jonathan Strange & Mr Norrell',   slug: 'jonathan-strange-and-mr-norrell' },
    { title: 'Circe',                           slug: 'circe' },
    { title: 'The Bear and the Nightingale',    slug: 'the-bear-and-the-nightingale' },
    { title: 'Spinning Silver',                 slug: 'spinning-silver' },
    { title: 'Uprooted',                        slug: 'uprooted' },
    { title: 'Piranesi',                        slug: 'piranesi' },
    { title: 'The Song of Achilles',            slug: 'the-song-of-achilles' },
    { title: 'The Invisible Life of Addie LaRue', slug: 'the-invisible-life-of-addie-larue' },
    { title: 'The Essex Serpent',               slug: 'the-essex-serpent' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Mexican Gothic',                  slug: 'mexican-gothic' },
    { title: 'The Once and Future Witches',     slug: 'the-once-and-future-witches' },
  ],
  academy: [
    { title: 'The Name of the Wind',            slug: 'the-name-of-the-wind' },
    { title: 'A Deadly Education',              slug: 'a-deadly-education' },
    { title: 'Nevernight',                      slug: 'nevernight' },
    { title: 'Ninth House',                     slug: 'ninth-house' },
    { title: 'An Ember in the Ashes',           slug: 'an-ember-in-the-ashes' },
    { title: 'Shadow and Bone',                 slug: 'shadow-and-bone' },
    { title: 'The Magicians',                   slug: 'the-magicians' },
    { title: 'Legendborn',                      slug: 'legendborn' },
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'The Poppy War',                   slug: 'the-poppy-war' },
    { title: 'Iron Flame',                      slug: 'iron-flame' },
    { title: 'A Court of Thorns and Roses',     slug: 'acotar' },
  ],
  mythology: [
    { title: 'Circe',                           slug: 'circe' },
    { title: 'The Song of Achilles',            slug: 'the-song-of-achilles' },
    { title: 'American Gods',                   slug: 'american-gods' },
    { title: 'Ariadne',                         slug: 'ariadne' },
    { title: 'Norse Mythology',                 slug: 'norse-mythology' },
    { title: "The Witch's Heart",               slug: 'the-witchs-heart' },
    { title: 'A Thousand Ships',                slug: 'a-thousand-ships' },
    { title: 'Daughter of the Moon Goddess',    slug: 'daughter-of-the-moon-goddess' },
    { title: 'Uprooted',                        slug: 'uprooted' },
    { title: 'The Bear and the Nightingale',    slug: 'the-bear-and-the-nightingale' },
    { title: 'Spinning Silver',                 slug: 'spinning-silver' },
    { title: 'Mexican Gothic',                  slug: 'mexican-gothic' },
  ],
  cozy: [
    { title: 'Legends & Lattes',                slug: 'legends-and-lattes' },
    { title: 'The House in the Cerulean Sea',   slug: 'the-house-in-the-cerulean-sea' },
    { title: 'A Psalm for the Wild-Built',      slug: 'a-psalm-for-the-wild-built' },
    { title: 'The Goblin Emperor',              slug: 'the-goblin-emperor' },
    { title: "Howl's Moving Castle",            slug: 'howls-moving-castle' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", slug: 'emily-wildes-encyclopaedia-of-faeries' },
    { title: 'Piranesi',                        slug: 'piranesi' },
    { title: 'Good Omens',                      slug: 'good-omens' },
    { title: 'A Memory Called Empire',          slug: 'a-memory-called-empire' },
    { title: 'Monk and Robot',                  slug: 'a-psalm-for-the-wild-built' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
  ],
  litrpg: [
    { title: 'Dungeon Crawler Carl',            slug: 'dungeon-crawler-carl' },
    { title: 'He Who Fights With Monsters',     slug: 'he-who-fights-with-monsters' },
    { title: 'Cradle',                          slug: 'unsouled' },
    { title: 'Mother of Learning',              slug: 'mother-of-learning' },
    { title: 'Beware of Chicken',               slug: 'beware-of-chicken' },
    { title: 'Defiance of the Fall',            slug: 'defiance-of-the-fall' },
    { title: 'The Wandering Inn',               slug: 'the-wandering-inn' },
    { title: 'Mark of the Fool',                slug: 'mark-of-the-fool' },
    { title: 'Dungeon Crawler Carl Book 2',     slug: 'carl-s-doomsday-scenario' },
    { title: 'He Who Fights With Monsters 2',   slug: 'he-who-fights-with-monsters-2' },
    { title: 'Cradle: Soulsmith',               slug: 'soulsmith' },
    { title: 'A Practical Guide to Sorcery',    slug: 'a-practical-guide-to-evil' },
  ],
  swords: [
    { title: 'The Lies of Locke Lamora',        slug: 'the-lies-of-locke-lamora' },
    { title: 'The Blade Itself',                slug: 'the-blade-itself' },
    { title: 'Kings of the Wyld',               slug: 'kings-of-the-wyld' },
    { title: 'The Black Company',               slug: 'the-black-company' },
    { title: 'The Blacktongue Thief',           slug: 'the-blacktongue-thief' },
    { title: 'Elric of Melniboné',              slug: 'elric-of-melnibone' },
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'Conan the Barbarian',             slug: 'conan-the-barbarian' },
    { title: 'Red Rising',                      slug: 'red-rising' },
    { title: 'Best Served Cold',                slug: 'best-served-cold' },
    { title: 'The Way of Kings',                slug: 'the-way-of-kings' },
    { title: 'The Name of the Wind',            slug: 'the-name-of-the-wind' },
  ],
  'science-fantasy': [
    { title: 'Dune',                            slug: 'dune' },
    { title: 'Red Rising',                      slug: 'red-rising' },
    { title: 'Gideon the Ninth',                slug: 'gideon-the-ninth' },
    { title: 'A Memory Called Empire',          slug: 'a-memory-called-empire' },
    { title: 'This Is How You Lose the Time War', slug: 'this-is-how-you-lose-the-time-war' },
    { title: 'Piranesi',                        slug: 'piranesi' },
    { title: 'A Wizard of Earthsea',            slug: 'a-wizard-of-earthsea' },
    { title: 'The Book of the New Sun',         slug: 'the-shadow-of-the-torturer' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'A Psalm for the Wild-Built',      slug: 'a-psalm-for-the-wild-built' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: 'The Fifth Season',                slug: 'the-fifth-season' },
  ],
};

const CURATED_NEW_RELEASES: Record<string, CuratedEntry[]> = {
  global: [
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'Iron Flame',                      slug: 'iron-flame' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", slug: 'emily-wildes-encyclopaedia-of-faeries' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
  ],
  epic: [
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
    { title: 'The Rage of Dragons',             slug: 'the-rage-of-dragons' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'A Day of Fallen Night',           slug: 'a-day-of-fallen-night' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'The Frugal Wizard\'s Handbook',   slug: 'the-frugal-wizards-handbook-for-surviving-medieval-england' },
    { title: 'Shards of Earth',                 slug: 'shards-of-earth' },
    { title: 'Iron Flame',                      slug: 'iron-flame' },
    { title: 'Onyx Storm',                      slug: 'onyx-storm' },
  ],
  romantasy: [
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'Iron Flame',                      slug: 'iron-flame' },
    { title: 'Onyx Storm',                      slug: 'onyx-storm' },
    { title: 'Divine Rivals',                   slug: 'divine-rivals' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'A Court of Silver Flames',        slug: 'a-court-of-silver-flames' },
    { title: 'From Blood and Ash',              slug: 'from-blood-and-ash' },
    { title: 'House of Salt and Sorrows',       slug: 'house-of-salt-and-sorrows' },
    { title: 'The Atlas Six',                   slug: 'the-atlas-six' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
  ],
  grimdark: [
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'A Little Hatred',                 slug: 'a-little-hatred' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'The Blacktongue Thief',           slug: 'the-blacktongue-thief' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'Kings of the Wyld',               slug: 'kings-of-the-wyld' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Shards of Earth',                 slug: 'shards-of-earth' },
    { title: 'The Rage of Dragons',             slug: 'the-rage-of-dragons' },
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'Nevernight',                      slug: 'nevernight' },
    { title: 'Ninth House',                     slug: 'ninth-house' },
  ],
  dark: [
    { title: 'Ninth House',                     slug: 'ninth-house' },
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Hell Bent',                       slug: 'hell-bent' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'A Little Hatred',                 slug: 'a-little-hatred' },
    { title: 'The Blacktongue Thief',           slug: 'the-blacktongue-thief' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'Nevernight',                      slug: 'nevernight' },
    { title: 'The Rage of Dragons',             slug: 'the-rage-of-dragons' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'Shards of Earth',                 slug: 'shards-of-earth' },
  ],
  urban: [
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Hell Bent',                       slug: 'hell-bent' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: 'The Kaiju Preservation Society',  slug: 'the-kaiju-preservation-society' },
    { title: 'A Psalm for the Wild-Built',      slug: 'a-psalm-for-the-wild-built' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
    { title: 'The Atlas Six',                   slug: 'the-atlas-six' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
  ],
  historical: [
    { title: 'Babel',                           slug: 'babel' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", slug: 'emily-wildes-encyclopaedia-of-faeries' },
    { title: 'A Day of Fallen Night',           slug: 'a-day-of-fallen-night' },
    { title: 'The Fragile Threads of Power',    slug: 'the-fragile-threads-of-power' },
    { title: 'The Frugal Wizard\'s Handbook',   slug: 'the-frugal-wizards-handbook-for-surviving-medieval-england' },
    { title: 'Mexican Gothic',                  slug: 'mexican-gothic' },
    { title: 'The Once and Future Witches',     slug: 'the-once-and-future-witches' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
  ],
  academy: [
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'Iron Flame',                      slug: 'iron-flame' },
    { title: 'Onyx Storm',                      slug: 'onyx-storm' },
    { title: 'Hell Bent',                       slug: 'hell-bent' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'A Deadly Education',              slug: 'a-deadly-education' },
    { title: 'The Atlas Six',                   slug: 'the-atlas-six' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Ninth House',                     slug: 'ninth-house' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'Legendborn',                      slug: 'legendborn' },
  ],
  mythology: [
    { title: 'Ariadne',                         slug: 'ariadne' },
    { title: 'A Thousand Ships',                slug: 'a-thousand-ships' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", slug: 'emily-wildes-encyclopaedia-of-faeries' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: 'Mexican Gothic',                  slug: 'mexican-gothic' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Daughter of the Moon Goddess',    slug: 'daughter-of-the-moon-goddess' },
    { title: 'The Once and Future Witches',     slug: 'the-once-and-future-witches' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'A Day of Fallen Night',           slug: 'a-day-of-fallen-night' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
  ],
  cozy: [
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", slug: 'emily-wildes-encyclopaedia-of-faeries' },
    { title: 'Nettle and Bone',                 slug: 'nettle-and-bone' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
    { title: 'The Kaiju Preservation Society',  slug: 'the-kaiju-preservation-society' },
    { title: 'A Psalm for the Wild-Built',      slug: 'a-psalm-for-the-wild-built' },
    { title: 'The House in the Cerulean Sea',   slug: 'the-house-in-the-cerulean-sea' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Divine Rivals',                   slug: 'divine-rivals' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
  ],
  litrpg: [
    { title: 'Dungeon Crawler Carl Book 2',     slug: 'carls-doomsday-scenario' },
    { title: 'Dungeon Crawler Carl Book 3',     slug: 'the-dungeon-anarchist-cookbook' },
    { title: 'He Who Fights With Monsters 2',   slug: 'he-who-fights-with-monsters-2' },
    { title: 'Cradle: Soulsmith',               slug: 'soulsmith' },
    { title: 'Cradle: Blackflame',              slug: 'blackflame' },
    { title: 'Defiance of the Fall',            slug: 'defiance-of-the-fall' },
    { title: 'Mark of the Fool',                slug: 'mark-of-the-fool' },
    { title: 'The Primal Hunter',               slug: 'the-primal-hunter' },
    { title: 'Dungeon Crawler Carl',            slug: 'dungeon-crawler-carl' },
    { title: 'He Who Fights With Monsters',     slug: 'he-who-fights-with-monsters' },
    { title: 'Beware of Chicken',               slug: 'beware-of-chicken' },
    { title: 'Mother of Learning',              slug: 'mother-of-learning' },
  ],
  swords: [
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'The Blacktongue Thief',           slug: 'the-blacktongue-thief' },
    { title: 'Kings of the Wyld',               slug: 'kings-of-the-wyld' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'A Little Hatred',                 slug: 'a-little-hatred' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'The Rage of Dragons',             slug: 'the-rage-of-dragons' },
    { title: 'Shards of Earth',                 slug: 'shards-of-earth' },
    { title: 'Fourth Wing',                     slug: 'fourth-wing' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
  ],
  'science-fantasy': [
    { title: 'The Sunlit Man',                  slug: 'the-sunlit-man' },
    { title: 'Tress of the Emerald Sea',        slug: 'tress-of-the-emerald-sea' },
    { title: 'Wind and Truth',                  slug: 'wind-and-truth' },
    { title: 'Shards of Earth',                 slug: 'shards-of-earth' },
    { title: 'The Familiar',                    slug: 'the-familiar' },
    { title: 'Witch King',                      slug: 'witch-king' },
    { title: 'The Tainted Cup',                 slug: 'the-tainted-cup' },
    { title: 'A Memory Called Empire',          slug: 'a-memory-called-empire' },
    { title: 'Babel',                           slug: 'babel' },
    { title: 'Gideon the Ninth',                slug: 'gideon-the-ninth' },
    { title: 'Starter Villain',                 slug: 'starter-villain' },
    { title: 'The Atlas Six',                   slug: 'the-atlas-six' },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  { slug: 'epic',           name: 'Epic & High Fantasy',          description: 'Grand worlds with deep lore & ancient magic',   gradient: 'from-purple-50 to-blue-50'   },
  { slug: 'romantasy',      name: 'Romantasy',                    description: 'Fantasy with love stories and relationships',    gradient: 'from-rose-50 to-pink-50'     },
  { slug: 'grimdark',       name: 'Grimdark',                     description: 'Ultra-dark, cynical world with antiheroes',      gradient: 'from-gray-100 to-slate-100'  },
  { slug: 'urban',          name: 'Urban / Contemporary Fantasy', description: 'Magic hidden in the modern world',               gradient: 'from-indigo-50 to-violet-50' },
  { slug: 'dark',           name: 'Dark Fantasy',                 description: 'Blends fantasy with horror and brutality',       gradient: 'from-slate-100 to-zinc-100'  },
  { slug: 'litrpg',         name: 'LitRPG / Progression Fantasy', description: 'Literary role-playing story with progression',   gradient: 'from-blue-50 to-cyan-50'     },
  { slug: 'historical',     name: 'Historical Fantasy',           description: 'Alternative history, often medieval with magic', gradient: 'from-amber-50 to-orange-50'  },
  { slug: 'academy',        name: 'Academy Fantasy',              description: 'Stories set in magical or specialized schools',  gradient: 'from-red-50 to-rose-50'      },
  { slug: 'mythology',      name: 'Mythic & Folklore Fantasy',    description: 'Inspired by myths, legends and folklore',        gradient: 'from-yellow-50 to-amber-50'  },
  { slug: 'swords',         name: 'Sword & Sorcery',              description: 'Heroic adventure, visceral magic, ancient evil', gradient: 'from-cyan-50 to-teal-50'     },
  { slug: 'cozy',           name: 'Cozy Fantasy',                 description: 'Low conflict, heartwarming vibes',               gradient: 'from-green-50 to-emerald-50' },
  { slug: 'science-fantasy',name: 'Science Fantasy',              description: 'Where technology meets magic and prophecy',      gradient: 'from-sky-50 to-blue-50'      },
];


const readingOrders = [
  { slug: 'cosmere',        name: "Sanderson's Cosmere",           bookCount: 15, color: 'from-violet-100 to-purple-100', text: 'text-violet-800'  },
  { slug: 'stormlight',     name: 'The Stormlight Archive',        bookCount: 5,  color: 'from-blue-100 to-indigo-100',   text: 'text-blue-800'    },
  { slug: 'first-law',      name: 'The First Law',                 bookCount: 10, color: 'from-zinc-100 to-slate-200',    text: 'text-zinc-800'    },
  { slug: 'malazan',        name: 'Malazan Book of the Fallen',    bookCount: 10, color: 'from-stone-100 to-zinc-200',    text: 'text-stone-800'   },
  { slug: 'asoiaf',         name: 'A Song of Ice and Fire',        bookCount: 5,  color: 'from-gray-100 to-slate-200',    text: 'text-gray-800'    },
  { slug: 'wheel-of-time',  name: 'The Wheel of Time',             bookCount: 14, color: 'from-amber-100 to-yellow-100',  text: 'text-amber-800'   },
  { slug: 'acotar',         name: 'A Court of Thorns and Roses',   bookCount: 5,  color: 'from-rose-100 to-pink-100',     text: 'text-rose-800'    },
  { slug: 'empyrean',       name: 'The Empyrean',                  bookCount: 3,  color: 'from-sky-100 to-blue-100',      text: 'text-sky-800'     },
  { slug: 'blood-and-ash',  name: 'Blood and Ash',                 bookCount: 8,  color: 'from-red-100 to-rose-100',      text: 'text-red-800'     },
  { slug: 'kingkiller',     name: 'The Kingkiller Chronicle',      bookCount: 3,  color: 'from-teal-100 to-cyan-100',     text: 'text-teal-800'    },
  { slug: 'discworld',      name: 'Discworld',                     bookCount: 41, color: 'from-lime-100 to-green-100',    text: 'text-lime-800'    },
  { slug: 'dresden-files',  name: 'The Dresden Files',             bookCount: 17, color: 'from-orange-100 to-amber-100',  text: 'text-orange-800'  },
  { slug: 'robin-hobb',     name: 'Realm of the Elderlings',       bookCount: 16, color: 'from-emerald-100 to-teal-100',  text: 'text-emerald-800' },
  { slug: 'throne-of-glass',name: 'Throne of Glass',               bookCount: 8,  color: 'from-fuchsia-100 to-pink-100',  text: 'text-fuchsia-800' },
  { slug: 'witcher',        name: 'The Witcher',                   bookCount: 8,  color: 'from-yellow-100 to-amber-100',  text: 'text-yellow-800'  },
];

interface BookOfWeekEntry { title: string; author: string; blurb: string; darkness: number; tropes: string[]; }
const CANDLES = ['','🕯️','🕯️🕯️','🕯️🕯️🕯️','🕯️🕯️🕯️🕯️','🕯️🕯️🕯️🕯️🕯️'];
const DARKNESS_LABELS = ['','Lighthearted','Mild','Serious','Dark','Brutal'];
const bookOfWeekPools: Record<string, BookOfWeekEntry[]> = {
  general: [
    { title: 'The Name of the Wind',          author: 'Patrick Rothfuss',    darkness: 3, tropes: ['Chosen One', 'Magic School', 'Unreliable Narrator'],       blurb: 'The gold standard for literary fantasy — Kvothe\'s origin story told with prose that earns every page of hype.' },
    { title: 'The Way of Kings',              author: 'Brandon Sanderson',   darkness: 3, tropes: ['Epic World-Building', 'Hard Magic System', 'Redemption'],   blurb: 'A 1,000-page epic that never feels slow — Sanderson at his most ambitious, with a magic system unlike anything else.' },
    { title: 'Piranesi',                      author: 'Susanna Clarke',      darkness: 2, tropes: ['Mystery', 'Unreliable Narrator', 'Strange Worlds'],         blurb: 'Genuinely strange and beautiful — a house with infinite halls, statues, and tides. Reads in a single sitting.' },
    { title: 'The Lies of Locke Lamora',      author: 'Scott Lynch',         darkness: 4, tropes: ['Heist', 'Found Family', 'Con Artists'],                     blurb: 'Ocean\'s Eleven in a fantasy Venice — witty, brutal, and impossible to put down.' },
    { title: 'A Memory Called Empire',        author: 'Arkady Martine',      darkness: 2, tropes: ['Political Intrigue', 'Space Empire', 'Identity'],            blurb: 'Political intrigue in a galactic empire with a diplomat who carries a dead man\'s memories. Stunning debut.' },
    { title: 'The Poppy War',                 author: 'R.F. Kuang',          darkness: 5, tropes: ['War', 'Magic Academy', 'Chosen One'],                       blurb: 'Starts as an academy fantasy, becomes something far darker — one of the most important fantasy novels of the decade.' },
    { title: 'Legends & Lattes',              author: 'Travis Baldree',      darkness: 1, tropes: ['Cozy', 'Found Family', 'Retirement'],                       blurb: 'An orc retires from adventuring to open a coffee shop. Low stakes, high charm, genuinely lovely.' },
    { title: 'Red Rising',                    author: 'Pierce Brown',        darkness: 4, tropes: ['Rebellion', 'Class Warfare', 'Undercover'],                  blurb: 'Hunger Games meets Roman epic — propulsive, brutal, and one of the best first books in any series.' },
    { title: 'Six of Crows',                  author: 'Leigh Bardugo',       darkness: 3, tropes: ['Heist', 'Found Family', 'Enemies to Lovers'],                blurb: 'A heist crew with genuine chemistry and a plot that snaps shut perfectly. Bardugo\'s best work.' },
    { title: 'Good Omens',                    author: 'Terry Pratchett & Neil Gaiman', darkness: 1, tropes: ['Buddy Comedy', 'Apocalypse', 'Unlikely Alliance'], blurb: 'An angel and a demon try to stop the apocalypse. Endlessly quotable, still funny after 30 years.' },
  ],
  epic: [
    { title: 'The Way of Kings',              author: 'Brandon Sanderson',   darkness: 3, tropes: ['Hard Magic System', 'Epic World-Building', 'Redemption Arc'], blurb: 'The most complete epic fantasy world built in the last 20 years — every book adds another layer.' },
    { title: 'The Eye of the World',          author: 'Robert Jordan',       darkness: 2, tropes: ['Chosen One', 'Epic Quest', 'Prophecy'],                      blurb: 'The series that defined modern epic fantasy — 14 books of world-building that actually pays off.' },
    { title: 'The Blade Itself',              author: 'Joe Abercrombie',     darkness: 4, tropes: ['Antihero', 'Subverted Tropes', 'Political Intrigue'],         blurb: 'A First Law trilogy opener that deconstructs every epic fantasy trope you thought you knew.' },
    { title: 'The Fifth Season',              author: 'N.K. Jemisin',        darkness: 4, tropes: ['Apocalypse', 'Second Person POV', 'Oppression'],              blurb: 'Three Hugos in a row for a reason — a broken world, a second person POV, and a twist that hits like a punch.' },
    { title: 'The Name of the Wind',          author: 'Patrick Rothfuss',    darkness: 3, tropes: ['Chosen One', 'Magic School', 'Frame Narrative'],              blurb: 'The best prose in modern epic fantasy. Still worth it even unfinished.' },
    { title: 'The Priory of the Orange Tree', author: 'Samantha Shannon',    darkness: 3, tropes: ['Dragons', 'Female Protagonists', 'Political Intrigue'],       blurb: 'A standalone epic with dragons, matriarchal kingdoms, and a map that rewards study.' },
    { title: 'The Rage of Dragons',           author: 'Evan Winter',         darkness: 4, tropes: ['Revenge', 'Military Fantasy', 'Training Arc'],                blurb: 'West African-inspired military fantasy with a vengeful protagonist — tightly plotted and fast.' },
    { title: 'Gardens of the Moon',           author: 'Steven Erikson',      darkness: 4, tropes: ['Military Fantasy', 'Gods & Mortals', 'Ensemble Cast'],        blurb: 'The hardest start in fantasy that becomes one of the most rewarding series ever written.' },
  ],
  romantasy: [
    { title: 'A Court of Mist and Fury',      author: 'Sarah J. Maas',       darkness: 3, tropes: ['Slow Burn', 'Fae', 'Enemies to Lovers'],                     blurb: 'Book two is where ACOTAR earns its reputation — the slow burn breaks and everything changes.' },
    { title: 'The Cruel Prince',              author: 'Holly Black',         darkness: 3, tropes: ['Fae Court', 'Enemies to Lovers', 'Political Intrigue'],        blurb: 'Fae court politics with a mortal girl who refuses to stay powerless — genuinely sharp.' },
    { title: 'From Blood and Ash',            author: 'Jennifer L. Armentrout', darkness: 3, tropes: ['Forbidden Love', 'Enemies to Lovers', 'Chosen One'],       blurb: 'Impossible not to read in one sitting — the enemies-to-lovers tension is relentless.' },
    { title: 'Divine Rivals',                 author: 'Rebecca Ross',        darkness: 2, tropes: ['Rivals to Lovers', 'War', 'Epistolary'],                      blurb: 'Letters, war, and gods — enemies-to-lovers with real emotional stakes and gorgeous writing.' },
    { title: 'A Heart So Fierce and Broken',  author: 'Brigid Kemmerer',     darkness: 2, tropes: ['Fairy Tale Retelling', 'Slow Burn', 'Redemption'],            blurb: 'Beauty and the Beast retelling that gives the villain a perspective worth reading.' },
    { title: 'Kingdom of the Wicked',         author: 'Kerri Maniscalco',    darkness: 3, tropes: ['Demons', 'Revenge', 'Slow Burn'],                             blurb: 'Victorian Sicily + demons + a Sicilian chef seeking revenge. Atmospheric and addictive.' },
    { title: 'Serpent & Dove',                author: 'Shelby Mahurin',      darkness: 3, tropes: ['Forced Proximity', 'Enemies to Lovers', 'Witch Hunt'],         blurb: 'A witch forced to marry a witch hunter — the setup sounds clichéd until the execution isn\'t.' },
    { title: 'The Bridge Kingdom',            author: 'Danielle L. Jensen',  darkness: 2, tropes: ['Spy Romance', 'Enemies to Lovers', 'Political Marriage'],      blurb: 'Spy-romance done right — mutual deception that evolves into something genuinely earned.' },
  ],
  dark: [
    { title: 'The Blade Itself',              author: 'Joe Abercrombie',     darkness: 4, tropes: ['Antihero', 'War', 'Moral Ambiguity'],                         blurb: 'The book that taught fantasy it was allowed to be uncomfortable. Logen Ninefingers is one of the great antiheroes.' },
    { title: 'The Poppy War',                 author: 'R.F. Kuang',          darkness: 5, tropes: ['War', 'Trauma', 'Chosen One'],                                blurb: 'Based on the Second Sino-Japanese War — uncompromising, brilliant, and not for the faint-hearted.' },
    { title: 'Nevernight',                    author: 'Jay Kristoff',        darkness: 4, tropes: ['Assassin', 'Magic School', 'Revenge'],                        blurb: 'An assassin school with a footnote narrator and a protagonist who commits to her revenge.' },
    { title: 'The Gutter Prayer',             author: 'Gareth Hanrahan',     darkness: 4, tropes: ['Gods & Mortals', 'Thieves Guild', 'Body Horror'],              blurb: 'Three thieves, a city that eats people, and a war between gods. Dense and rewarding.' },
    { title: 'A Little Hatred',               author: 'Joe Abercrombie',     darkness: 4, tropes: ['Industrial Revolution', 'Class Warfare', 'Antihero'],          blurb: 'The industrial revolution meets The First Law — grimmer and funnier than anything in the original trilogy.' },
    { title: 'Prince of Thorns',              author: 'Mark Lawrence',       darkness: 5, tropes: ['Antihero', 'Unreliable Narrator', 'Post-Apocalyptic'],         blurb: 'A 13-year-old prince who is genuinely terrifying — controversial for good reason, but hard to forget.' },
    { title: 'The Black Company',             author: 'Glen Cook',           darkness: 4, tropes: ['Military Fantasy', 'Morally Grey', 'Ensemble Cast'],           blurb: 'The original gritty military fantasy — Cook invented the genre Abercrombie perfected.' },
    { title: 'Low Town',                      author: 'Daniel Polansky',     darkness: 4, tropes: ['Noir', 'Crime', 'Antihero'],                                   blurb: 'Fantasy noir in a city that smells of bad decisions — sharp prose, worse people.' },
  ],
  grimdark: [
    { title: 'Best Served Cold',              author: 'Joe Abercrombie',     darkness: 5, tropes: ['Revenge', 'Antihero', 'Betrayal'],                            blurb: 'A revenge thriller that earns its title — Abercrombie at his most focused and vicious.' },
    { title: 'Prince of Thorns',              author: 'Mark Lawrence',       darkness: 5, tropes: ['Antihero', 'Post-Apocalyptic', 'Unreliable Narrator'],         blurb: 'Polarizing, original, and impossible to forget. Lawrence built grimdark\'s most distinctive voice.' },
    { title: 'The First Law',                 author: 'Joe Abercrombie',     darkness: 4, tropes: ['Subverted Tropes', 'Antihero', 'Political Intrigue'],           blurb: 'The trilogy that defined modern grimdark — every heroic trope methodically dismantled.' },
    { title: 'The Black Company',             author: 'Glen Cook',           darkness: 4, tropes: ['Military Fantasy', 'Morally Grey', 'Dark Lord'],               blurb: 'Cook\'s mercenary company is where grimdark started before it had a name.' },
    { title: 'The Gutter Prayer',             author: 'Gareth Hanrahan',     darkness: 4, tropes: ['Weird Fantasy', 'Gods & Mortals', 'Urban'],                    blurb: 'Weird grimdark — gods of industry, city as monster, a plot that refuses to slow down.' },
    { title: 'Gardens of the Moon',           author: 'Steven Erikson',      darkness: 5, tropes: ['Military Fantasy', 'Gods & Mortals', 'Ensemble Cast'],         blurb: 'Malazan is the most committed grimdark world in existence. Nothing resolves cleanly.' },
    { title: 'King of Thorns',                author: 'Mark Lawrence',       darkness: 5, tropes: ['Antihero', 'Memory', 'War'],                                   blurb: 'The second Broken Empire book improves on the first in every way.' },
    { title: 'The Heroes',                    author: 'Joe Abercrombie',     darkness: 4, tropes: ['Military Fantasy', 'War', 'Multiple POVs'],                    blurb: 'Three days of battle from every side — Abercrombie\'s most honest book about what war costs.' },
  ],
  urban: [
    { title: 'Storm Front',                   author: 'Jim Butcher',         darkness: 3, tropes: ['Detective', 'Magic System', 'Urban Setting'],                  blurb: 'Harry Dresden: Chicago\'s only wizard-for-hire. Hardboiled mystery + magic, and it never stops improving.' },
    { title: 'Rivers of London',              author: 'Ben Aaronovitch',     darkness: 2, tropes: ['Detective', 'Magic in Modern World', 'Humor'],                 blurb: 'A London constable discovers magic is real and joins the police department\'s one-wizard unit. British, funny, perfect.' },
    { title: 'American Gods',                 author: 'Neil Gaiman',         darkness: 3, tropes: ['Gods & Mortals', 'Road Trip', 'Modern Mythology'],              blurb: 'Old gods fighting new gods on a road trip across America. Gaiman\'s most ambitious novel.' },
    { title: 'Neverwhere',                    author: 'Neil Gaiman',         darkness: 3, tropes: ['Hidden World', 'Ordinary Person in Fantasy', 'London'],        blurb: 'London Below, where the forgotten people go. A doorway into one of fantasy\'s best hidden worlds.' },
    { title: 'The City We Became',            author: 'N.K. Jemisin',        darkness: 3, tropes: ['City as Character', 'Cosmic Horror', 'Found Family'],          blurb: 'New York City\'s boroughs each manifest as a human avatar and must fight a cosmic threat. Wildly creative.' },
    { title: 'Good Omens',                    author: 'Terry Pratchett & Neil Gaiman', darkness: 1, tropes: ['Buddy Comedy', 'Apocalypse', 'Satire'],              blurb: 'The funniest book about the apocalypse ever written. Not close.' },
    { title: 'Witch King',                    author: 'Martha Wells',        darkness: 3, tropes: ['Demon Protagonist', 'Political Intrigue', 'Non-linear'],       blurb: 'Martha Wells writing a demon protagonist navigating politics and revenge — elegant and sharp.' },
    { title: 'A Psalm for the Wild-Built',    author: 'Becky Chambers',      darkness: 1, tropes: ['Cozy', 'Robots', 'Philosophy'],                               blurb: 'A monk who wanders off the path and meets a robot asking what humans need. Quiet and profound.' },
  ],
  historical: [
    { title: 'Jonathan Strange & Mr Norrell', author: 'Susanna Clarke',      darkness: 2, tropes: ['Magic in History', 'Rival Magicians', 'Fae'],                  blurb: 'Regency England with magic treated as a lost scholarly discipline — like Austen wrote Tolkien.' },
    { title: 'The Bear and the Nightingale',  author: 'Katherine Arden',     darkness: 2, tropes: ['Folklore', 'Spirits', 'Coming of Age'],                        blurb: 'Russian folklore in medieval Rus, with a girl who can see spirits her village prays to. Cold and beautiful.' },
    { title: 'Circe',                         author: 'Madeline Miller',      darkness: 3, tropes: ['Mythology Retelling', 'Female Protagonist', 'Transformation'], blurb: 'The witch of mythology given an interior life and a spine — Miller rewrites Ovid without flinching.' },
    { title: 'Piranesi',                      author: 'Susanna Clarke',      darkness: 2, tropes: ['Mystery', 'Unreliable Narrator', 'Strange Worlds'],            blurb: 'Not strictly historical but Clarke\'s second novel has the same meticulous, eerie perfection.' },
    { title: 'Spinning Silver',               author: 'Naomi Novik',         darkness: 3, tropes: ['Fairy Tale Retelling', 'Female Protagonist', 'Fae'],           blurb: 'A moneylender\'s daughter in Tsarist Russia who outwits winter itself — Novik\'s best work.' },
    { title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab',    darkness: 2, tropes: ['Immortality', 'Bargain with Devil', 'Memory'],                 blurb: '300 years forgotten by everyone she meets — Schwab\'s most emotionally complete novel.' },
    { title: 'The Essex Serpent',             author: 'Sarah Perry',         darkness: 2, tropes: ['Gothic', 'Folklore', 'Victorian'],                             blurb: 'Victorian naturalist investigates a sea creature rumour in a marsh village. Genuinely literary.' },
    { title: 'Uprooted',                      author: 'Naomi Novik',         darkness: 3, tropes: ['Fairy Tale Retelling', 'Magic System', 'Unlikely Heroes'],     blurb: 'Polish folklore with a heroine who does magic completely wrong and saves everyone doing it.' },
  ],
  academy: [
    { title: 'The Name of the Wind',          author: 'Patrick Rothfuss',    darkness: 3, tropes: ['Magic Academy', 'Coming of Age', 'Underdog'],           blurb: 'The University years are the heart of this book — magic as a discipline with tuition you can\'t afford.' },
    { title: 'Nevernight',                    author: 'Jay Kristoff',        darkness: 4, tropes: ['Assassin', 'Magic Academy', 'Revenge'],                 blurb: 'Assassin school run by people who actually want to kill you. Lush prose and zero safety.' },
    { title: 'An Ember in the Ashes',         author: 'Sabaa Tahir',         darkness: 4, tropes: ['Military Academy', 'Chosen One', 'Dual POV'],           blurb: 'A Roman-inspired empire with a brutal military academy — the dual POV keeps you off-balance.' },
    { title: 'Ninth House',                   author: 'Leigh Bardugo',       darkness: 4, tropes: ['Secret Society', 'Occult', 'Female Protagonist'],       blurb: 'Yale\'s secret societies are real and occult — Bardugo writing adult fiction with real teeth.' },
    { title: 'The Magicians',                 author: 'Lev Grossman',        darkness: 3, tropes: ['Magic Academy', 'Deconstruction', 'Portal Fantasy'],    blurb: 'Magic school for the depressed adult — Brakebills is what happens if Hogwarts got honest.' },
    { title: 'Shadow and Bone',               author: 'Leigh Bardugo',       darkness: 2, tropes: ['Chosen One', 'Military', 'Romance'],                    blurb: 'The Grisha trilogy opener — the Darkling is one of fantasy\'s most compelling antagonists.' },
    { title: 'A Deadly Education',            author: 'Naomi Novik',         darkness: 3, tropes: ['Magic Academy', 'Survival', 'Sarcastic Protagonist'],   blurb: 'A school that actively tries to kill students, and a girl who could destroy it with a thought but won\'t.' },
    { title: 'Legendborn',                    author: 'Tracy Deonn',         darkness: 3, tropes: ['Arthurian Legend', 'Secret Society', 'Legacy Magic'],   blurb: 'Arthurian legend at UNC Chapel Hill with a Black protagonist who changes the myth\'s meaning.' },
  ],
  mythology: [
    { title: 'Circe',                         author: 'Madeline Miller',     darkness: 3, tropes: ['Mythology Retelling', 'Female Protagonist', 'Transformation'], blurb: 'The most compelling reimagining of Greek myth in decades — empathy for a character Homer used as furniture.' },
    { title: 'The Song of Achilles',          author: 'Madeline Miller',     darkness: 3, tropes: ['Greek Mythology', 'Romance', 'War'],                   blurb: 'Patroclus and Achilles\' relationship made devastatingly real. Miller\'s debut is close to perfect.' },
    { title: 'A Thousand Ships',              author: 'Natalie Haynes',      darkness: 4, tropes: ['Greek Mythology', 'Multiple POV', 'War'],               blurb: 'Every woman\'s story from the Trojan War, each getting her chapter. Devastating in aggregate.' },
    { title: 'Norse Mythology',               author: 'Neil Gaiman',         darkness: 2, tropes: ['Norse Mythology', 'Retelling', 'Short Stories'],        blurb: 'Gaiman retells the Norse myths faithfully and makes them feel freshly told. The best introduction.' },
    { title: 'Ariadne',                       author: 'Jennifer Saint',      darkness: 3, tropes: ['Greek Mythology', 'Female Protagonist', 'Betrayal'],    blurb: 'Ariadne and Phaedra — two sisters, one monster, and the men who defined them against their will.' },
    { title: 'The Witch\'s Heart',            author: 'Genevieve Gornichec', darkness: 2, tropes: ['Norse Mythology', 'Witch', 'Prophecy'],                 blurb: 'Angrboda — Loki\'s witch wife — living in the woods trying to avoid prophecy. Quiet and aching.' },
    { title: 'American Gods',                 author: 'Neil Gaiman',         darkness: 3, tropes: ['Gods Among Us', 'Road Trip', 'Modern Mythology'],       blurb: 'Gods of every mythology living as forgotten Americans — Gaiman\'s road-trip mythology masterpiece.' },
    { title: 'Daughter of the Moon Goddess',  author: 'Sue Lynn Tan',        darkness: 2, tropes: ['Chinese Mythology', 'Quest', 'Family'],                 blurb: 'Chang\'e\'s daughter journeys through Chinese mythology to free her mother — gorgeous and personal.' },
  ],
  cozy: [
    { title: 'Legends & Lattes',              author: 'Travis Baldree',      darkness: 1, tropes: ['Slice of Life', 'Found Family', 'Slow-burn Romance'],   blurb: 'The book that defined cozy fantasy as a genre — Viv the orc barista is one of fiction\'s great retirees.' },
    { title: 'The House in the Cerulean Sea', author: 'TJ Klune',            darkness: 1, tropes: ['Found Family', 'Romance', 'Magical Creatures'],         blurb: 'A caseworker for magical children finds a family on a remote island. Warm, inclusive, lovely.' },
    { title: 'A Psalm for the Wild-Built',    author: 'Becky Chambers',      darkness: 1, tropes: ['Solarpunk', 'Philosophical', 'Road Trip'],              blurb: 'A monk and a robot discuss what people need. Nothing happens and everything happens.' },
    { title: 'The Goblin Emperor',            author: 'Katherine Addison',   darkness: 1, tropes: ['Underdog', 'Political Intrigue', 'Found Family'],       blurb: 'A half-goblin who never wanted the throne becomes the most decent emperor anyone\'s seen. Genuinely good.' },
    { title: "Howl's Moving Castle",          author: 'Diana Wynne Jones',   darkness: 1, tropes: ['Witch', 'Curse', 'Slow-burn Romance'],                  blurb: 'The movie is lovely; the book is funnier, stranger, and far less sensible. Jones at her best.' },
    { title: 'Nettle and Bone',               author: 'T. Kingfisher',       darkness: 2, tropes: ['Quest', 'Found Family', 'Dark Fairy Tale'],             blurb: 'A princess, a dog made of bones, and a quiet quest for justice. Gentle-dark fantasy done perfectly.' },
    { title: "Emily Wilde's Encyclopaedia of Faeries", author: 'Heather Fawcett', darkness: 1, tropes: ['Academia', 'Fae', 'Slow-burn Romance'],           blurb: 'A prickly academic studying faeries in a Norwegian village. Slow-burn romance, excellent faeries.' },
    { title: 'Monk and Robot',                author: 'Becky Chambers',      darkness: 1, tropes: ['Solarpunk', 'Robot', 'Found Purpose'],                  blurb: 'The whole Monk and Robot series is a meditation on rest, purpose, and what enough looks like.' },
  ],
  litrpg: [
    { title: 'Dungeon Crawler Carl',          author: 'Matt Dinniman',       darkness: 4, tropes: ['Dungeon Crawl', 'Game System', 'Dark Humor'],           blurb: 'A man and his cat in an apocalyptic game show dungeon — funnier and sadder than it has any right to be.' },
    { title: 'Cradle',                        author: 'Will Wight',          darkness: 3, tropes: ['Cultivation', 'Progression', 'Power System'],           blurb: 'Pure cultivation progression done with kinetic pacing — each book ends just as you hit the next power level.' },
    { title: 'He Who Fights With Monsters',   author: 'Jason Cheyne',        darkness: 3, tropes: ['Isekai', 'Game System', 'Overpowered Protagonist'],     blurb: 'A isekai portal fantasy with Australian energy and a protagonist who actually thinks.' },
    { title: 'Mother of Learning',            author: 'Domagoj Kurmaic',     darkness: 2, tropes: ['Time Loop', 'Magic Academy', 'Progression'],            blurb: 'A time loop + magical academy combination that builds one of the most satisfying progression arcs in the genre.' },
    { title: 'Beware of Chicken',             author: 'Casualfarmer',        darkness: 1, tropes: ['Cultivation', 'Slice of Life', 'Farming'],              blurb: 'A cultivator who decides farming is better than fighting. Peaceful, oddly moving, and very funny.' },
    { title: 'Defiance of the Fall',          author: 'TheFirstDefier',      darkness: 3, tropes: ['System Apocalypse', 'Progression', 'Game System'],      blurb: 'System apocalypse with a protagonist who earns every power spike through actual sacrifice.' },
    { title: 'The Wandering Inn',             author: 'pirateaba',           darkness: 3, tropes: ['Isekai', 'Slice of Life', 'Game System'],               blurb: 'An innkeeper in a fantasy world — 12 million words and still the most ambitious web serial ever attempted.' },
    { title: 'Mark of the Fool',              author: 'UnstoppableSloth',    darkness: 2, tropes: ['Magic Academy', 'Underdog', 'Progression'],             blurb: 'A marked failure at a mage academy who turns his penalty into an advantage. Clever and well-written.' },
  ],
  swords: [
    { title: 'The Lies of Locke Lamora',      author: 'Scott Lynch',         darkness: 4, tropes: ['Heist', 'Found Family', 'Con Artist'],                 blurb: 'Fantasy\'s best heist novel and the only one where you cheer for the con artist over the mark.' },
    { title: 'The Blade Itself',              author: 'Joe Abercrombie',     darkness: 4, tropes: ['Antihero', 'Political Intrigue', 'War'],               blurb: 'Three antiheroes walking toward a war they don\'t understand — Abercrombie\'s most patient book.' },
    { title: 'Kings of the Wyld',             author: 'Nicholas Eames',      darkness: 3, tropes: ['Band of Heroes', 'Quest', 'Nostalgia'],                blurb: 'A retired adventuring band goes on one last quest to save a daughter. Nostalgic and genuinely moving.' },
    { title: 'The Black Company',             author: 'Glen Cook',           darkness: 4, tropes: ['Mercenary', 'War', 'Antihero'],                        blurb: 'Cook\'s mercenaries don\'t question who they\'re working for and that\'s the whole point. A founding text.' },
    { title: 'Conan the Barbarian',           author: 'Robert E. Howard',    darkness: 3, tropes: ['Barbarian Hero', 'Adventure', 'Ancient Evil'],         blurb: 'The original — lean, muscular prose and a hero who solves every problem by being harder to kill.' },
    { title: 'The Blacktongue Thief',         author: 'Christopher Buehlman', darkness: 4, tropes: ['Thief', 'Dark Humor', 'Quest'],                      blurb: 'A thief, a debt to a thieves\' guild, and a world ending slowly. Voice-driven and darkly funny.' },
    { title: 'Elric of Melniboné',            author: 'Michael Moorcock',    darkness: 4, tropes: ['Antihero', 'Cursed Weapon', 'Tragic Hero'],            blurb: 'The albino emperor with a soul-drinking sword — Moorcock invented the tragic antihero template.' },
    { title: 'The Tainted Cup',               author: 'Robert Jackson Bennett', darkness: 3, tropes: ['Mystery', 'Military', 'Monster Hunting'],           blurb: 'A mystery inside a military empire defending against monsters the size of buildings. Ingenious.' },
  ],
  'science-fantasy': [
    { title: 'Dune',                          author: 'Frank Herbert',        darkness: 3, tropes: ['Chosen One', 'Political Intrigue', 'Religion'],        blurb: 'Still the best SF worldbuilding ever committed to paper — ecology, religion, and politics as plot.' },
    { title: 'Red Rising',                    author: 'Pierce Brown',         darkness: 4, tropes: ['Rebellion', 'Underdog', 'Gladiatorial Combat'],        blurb: 'Hunger Games meets Roman space empire — the trilogy sustains momentum most series can\'t manage for one book.' },
    { title: 'Gideon the Ninth',              author: 'Tamsyn Muir',         darkness: 4, tropes: ['Necromancer', 'Found Family', 'Mystery'],              blurb: 'Lesbian necromancers in space. The description is accurate and nothing about it is what you expect.' },
    { title: 'A Wizard of Earthsea',          author: 'Ursula K. Le Guin',   darkness: 2, tropes: ['Coming of Age', 'Magic System', 'Shadow Self'],        blurb: 'The ur-text for every mage protagonist — still the most thoughtful magic system in all of fantasy.' },
    { title: 'Piranesi',                      author: 'Susanna Clarke',      darkness: 2, tropes: ['Mystery', 'Unreliable Narrator', 'Magical World'],     blurb: 'Science-fantasy at its most literary — a house with infinite halls and tides, endlessly re-readable.' },
    { title: 'The Book of the New Sun',       author: 'Gene Wolfe',          darkness: 3, tropes: ['Dying Earth', 'Unreliable Narrator', 'Far Future'],    blurb: 'A dying Earth epic with an unreliable narrator — more reward for every re-read than almost anything.' },
    { title: 'This Is How You Lose the Time War', author: 'Amal El-Mohtar & Max Gladstone', darkness: 2, tropes: ['Time Travel', 'Enemies to Lovers', 'Epistolary'], blurb: 'Two time agents fall in love through letters across history. Elegant and devastating.' },
    { title: 'A Memory Called Empire',        author: 'Arkady Martine',      darkness: 2, tropes: ['Political Intrigue', 'Memory Magic', 'Space Opera'],   blurb: 'A diplomat with a dead man\'s memories in a galactic empire — space opera as literary fiction.' },
  ],
};

const getWeekNumber = () => Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));

const booksLike = [
  { slug: 'acotar',                    title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas',       cover: 'https://covers.openlibrary.org/b/isbn/9781619634459-L.jpg'  },
  { slug: 'mistborn-the-final-empire', title: 'Mistborn',                    author: 'Brandon Sanderson',   cover: 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg'  },
  { slug: 'fourth-wing',               title: 'Fourth Wing',                 author: 'Rebecca Yarros',      cover: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg'  },
  { slug: 'the-name-of-the-wind',      title: 'The Name of the Wind',        author: 'Patrick Rothfuss',    cover: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg'  },
  { slug: 'six-of-crows',              title: 'Six of Crows',                author: 'Leigh Bardugo',       cover: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg'  },
  { slug: 'the-way-of-kings',          title: 'The Way of Kings',            author: 'Brandon Sanderson',   cover: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg'  },
  { slug: 'red-rising',                title: 'Red Rising',                  author: 'Pierce Brown',        cover: 'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg'  },
  { slug: 'the-poppy-war',             title: 'The Poppy War',               author: 'R.F. Kuang',          cover: 'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'  },
  { slug: 'legends-and-lattes',        title: 'Legends & Lattes',            author: 'Travis Baldree',      cover: 'https://covers.openlibrary.org/b/title/Legends%20%26%20Lattes-L.jpg'  },
  { slug: 'the-priory-of-the-orange-tree', title: 'The Priory of the Orange Tree', author: 'Samantha Shannon', cover: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg' },
  { slug: 'piranesi',                  title: 'Piranesi',                    author: 'Susanna Clarke',      cover: 'https://covers.openlibrary.org/b/isbn/9781635575637-L.jpg'  },
  { slug: 'the-goblin-emperor',        title: 'The Goblin Emperor',          author: 'Katherine Addison',   cover: 'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg'  },
];

interface BookItem {
  title: string;
  cover_url?: string | null;
  slug?: string | null;
  goodreads_rating?: number | null;
  publication_year?: number | null;
  subgenres?: string[] | null;
}

// Maps category slugs to subgenre strings used in the DB
const categorySubgenreMap: Record<string, string[]> = {
  epic:             ['Epic Fantasy', 'High Fantasy'],
  romantasy:        ['Romantasy'],
  litrpg:           ['LitRPG', 'Progression Fantasy', 'Cultivation Fantasy'],
  dark:             ['Dark Fantasy'],
  urban:            ['Urban Fantasy', 'Contemporary Fantasy'],
  grimdark:         ['Grimdark'],
  historical:       ['Historical Fantasy'],
  academy:          ['Academy Fantasy'],
  mythology:        ['Mythic Fantasy', 'Mythology', 'Folklore Fantasy'],
  swords:           ['Sword & Sorcery'],
  cozy:             ['Cozy Fantasy'],
  'science-fantasy':['Science Fantasy'],
};

export default function CategoryGrid({ initialBooks }: { initialBooks?: BookItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const buildMaps = (items: BookItem[]) => {
    const covers = new Map<string, string>();
    const slugs  = new Map<string, string>();
    for (const b of items) {
      const key = b.title.toLowerCase();
      if (b.cover_url) covers.set(key, b.cover_url);
      if (b.slug)      slugs.set(key, b.slug);
    }
    return { covers, slugs };
  };

  const seed = initialBooks ?? [];
  const { covers: seedCovers, slugs: seedSlugs } = buildMaps(seed);

  const [allBooks, setAllBooks]     = useState<BookItem[]>(seed);
  const [bookCovers, setBookCovers] = useState<Map<string, string>>(seedCovers);
  const [bookSlugs, setBookSlugs]   = useState<Map<string, string>>(seedSlugs);

  useEffect(() => {
    if (initialBooks && initialBooks.length > 0) return; // already have data
    fetch('/api/books')
      .then((r) => r.json())
      .then((data: { items?: BookItem[] }) => {
        const items = data.items ?? [];
        const { covers, slugs } = buildMaps(items);
        setAllBooks(items);
        setBookCovers(covers);
        setBookSlugs(slugs);
      })
      .catch(() => {});
  }, []);

  const getCoverSrc = (title: string): string => {
    const db = bookCovers.get(title.toLowerCase());
    return db ?? `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-M.jpg`;
  };

  const getSlug = (title: string): string | null =>
    bookSlugs.get(title.toLowerCase()) ?? null;

  // Community Favorites — static curated list on homepage, dynamic per category
  const communityFavorites = selectedCategory
    ? (CURATED_FAVORITES[selectedCategory] ?? CURATED_FAVORITES.global)
    : CURATED_FAVORITES.global;

  const newReleases = selectedCategory
    ? (CURATED_NEW_RELEASES[selectedCategory] ?? CURATED_NEW_RELEASES.global)
    : CURATED_NEW_RELEASES.global;

  // Top Rated — API already returns sorted by rating_desc
  const topRated = allBooks
    .filter((b) => b.goodreads_rating && b.goodreads_rating >= 4)
    .slice(0, 14);

  const selectedCat  = categories.find((c) => c.slug === selectedCategory);
  const categoryName = selectedCat?.name || 'Fantasy';

  const catUrl = (sort?: string) => {
    const base = selectedCategory ? `/categories/${selectedCategory}/` : '/books/';
    return sort ? `${base}?sort=${sort}` : base;
  };

  // Book of the Week — stable per week, changes per category
  const weekNum  = getWeekNumber();
  const bowPool  = bookOfWeekPools[selectedCategory || 'general'] ?? bookOfWeekPools.general;
  const bowEntry = bowPool[weekNum % bowPool.length];

  const renderCoverStrip = (books: Array<{ title: string; cover?: string; slug?: string | null }>) => (
    <div className="flex gap-2.5 overflow-x-auto -mx-1 px-1 py-1" style={{ scrollbarWidth: 'none' }}>
      {books.map((b, i) => {
        const slug    = b.slug ?? getSlug(b.title);
        const coverSrc = b.cover ?? getCoverSrc(b.title);
        const img = (
          <div className="shrink-0 w-17 h-25.5 rounded-lg overflow-hidden bg-linear-to-br from-purple-100 to-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={coverSrc}
              alt={b.title}
              title={b.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/grimplaceholder.png'; }}
            />
          </div>
        );
        return slug ? (
          <a key={i} href={`/books/${slug}/`} className="shrink-0 hover:opacity-90 transition-opacity" title={b.title}>{img}</a>
        ) : (
          <div key={i} className="shrink-0" title={b.title}>{img}</div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Category grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Browse by category</p>
          <a
            href={selectedCategory ? `/categories/${selectedCategory}/` : `/books/`}
            className="text-sm font-medium text-purple-700 hover:text-purple-900 hover:underline transition-colors whitespace-nowrap"
          >
            View full {categoryName} →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
              onDoubleClick={() => { window.location.href = `/categories/${cat.slug}/`; }}
              className={`group relative overflow-hidden rounded-xl border border-zinc-300 p-4 transition-all shadow-sm hover:shadow-lg text-center ${
                selectedCategory === cat.slug ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${cat.gradient} transition-opacity ${selectedCategory === cat.slug ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`} />
              <div className="relative">
                <div className="font-semibold text-lg">{cat.name}</div>
                <div className="text-xs text-zinc-600 italic">{cat.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">

        {/* Book of the Week */}
        <div className="rounded-lg border bg-linear-to-br from-yellow-50 to-amber-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📖</span>
            <h3 className="font-semibold text-amber-900">
              {selectedCat ? categoryName : 'Fantasy'} Book of the Week
            </h3>
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              Changes every Monday
            </span>
          </div>
          {(() => {
            const slug = getSlug(bowEntry.title);
            const cover = getCoverSrc(bowEntry.title);
            const inner = (
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-20 h-30 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={cover}
                    alt={bowEntry.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/grimplaceholder.png'; }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-amber-900 leading-snug">{bowEntry.title}</p>
                  <p className="text-sm text-amber-700 mt-0.5">{bowEntry.author}</p>
                  <p className="mt-1.5 text-xs text-amber-800 flex items-center gap-1.5">
                    <span>{CANDLES[bowEntry.darkness]}</span>
                    <span className="font-medium">{DARKNESS_LABELS[bowEntry.darkness]}</span>
                  </p>
                  {bowEntry.tropes.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {bowEntry.tropes.map((t) => (
                        <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-zinc-700 leading-relaxed">{bowEntry.blurb}</p>
                  {slug && (
                    <span className="mt-3 inline-block text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline">
                      Read more →
                    </span>
                  )}
                </div>
              </div>
            );
            return slug
              ? <a href={`/books/${slug}/`} className="block hover:opacity-95 transition-opacity">{inner}</a>
              : inner;
          })()}
        </div>

        {/* Top Rated */}
        {topRated.length > 0 && (
          <div className="rounded-lg border bg-linear-to-br from-violet-50 to-purple-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⭐</span>
              <h3 className="font-semibold text-violet-900">Top Rated</h3>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Goodreads 4.0+</span>
                <a href={catUrl('rating-desc')} className="text-xs font-medium text-violet-600 hover:text-violet-800 hover:underline">View more →</a>
              </div>
            </div>
            {renderCoverStrip(topRated.map((b) => ({ title: b.title, slug: b.slug })))}
          </div>
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
          <div className="rounded-lg border bg-linear-to-br from-emerald-50 to-teal-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✨</span>
              <h3 className="font-semibold text-emerald-900">{selectedCat ? categoryName : 'Fantasy'} New Releases</h3>
              <a href={catUrl('newest')} className="ml-auto text-xs font-medium text-emerald-600 hover:text-emerald-800 hover:underline">View more →</a>
            </div>
            {renderCoverStrip(newReleases.map((b) => ({ title: b.title, slug: b.slug })))}
          </div>
        )}

        {/* Community Favorites */}
        <div className="rounded-lg border bg-linear-to-br from-orange-50 to-amber-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔥</span>
            <h3 className="font-semibold text-orange-900">{selectedCat ? categoryName : 'Fantasy'} Community Favorites</h3>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Highest rated</span>
              <a href={catUrl()} className="text-xs font-medium text-orange-600 hover:text-orange-800 hover:underline">View more →</a>
            </div>
          </div>
          {communityFavorites.length > 0
            ? renderCoverStrip(communityFavorites.map((b) => ({ title: b.title, slug: b.slug })))
            : <p className="text-sm text-orange-700 opacity-60">Loading…</p>
          }
        </div>

        {/* If You Liked... */}
        <div className="rounded-lg border bg-linear-to-br from-rose-50 to-pink-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-semibold text-rose-900">If You Liked…</h3>
            <a href="/books-like/" className="ml-auto text-xs font-medium text-rose-600 hover:text-rose-800 hover:underline">View all →</a>
          </div>
          <div className="flex gap-2.5 overflow-x-auto -mx-1 px-1 py-1" style={{ scrollbarWidth: 'none' }}>
            {booksLike.map((b) => (
              <a
                key={b.slug}
                href={`/books-like/${b.slug}/`}
                className="shrink-0 hover:opacity-90 transition-opacity"
                title={`Books like ${b.title}`}
              >
                <div className="w-17">
                  <div className="w-17 h-25.5 rounded-lg overflow-hidden bg-linear-to-br from-rose-100 to-pink-100 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/grimplaceholder.png'; }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-zinc-500 text-center leading-tight truncate">{b.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Popular Reading Orders */}
        <div className="rounded-lg border bg-linear-to-br from-indigo-50 to-blue-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📚</span>
            <h3 className="font-semibold text-indigo-900">Popular Reading Orders</h3>
            <a href="/reading-orders/" className="ml-auto text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline">View all →</a>
          </div>
          <div className="flex gap-2.5 overflow-x-auto -mx-1 px-1 py-1" style={{ scrollbarWidth: 'none' }}>
            {readingOrders.slice(0, 6).map((s) => (
              <a
                key={s.slug}
                href={`/reading-orders/${s.slug}/`}
                className={`shrink-0 w-36 rounded-xl border p-3 bg-linear-to-br ${s.color} hover:shadow-md transition-all hover:scale-[1.02]`}
              >
                <p className={`font-semibold text-xs leading-snug ${s.text}`}>{s.name}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{s.bookCount} books</p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
