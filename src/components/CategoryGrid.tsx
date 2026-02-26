import { useState, useEffect } from 'react';

interface Category {
  slug: string;
  name: string;
  description: string;
  gradient: string;
}

const categories: Category[] = [
  {
    slug: 'epic',
    name: 'Epic / High Fantasy',
    description: 'Grand worlds with deep lore & ancient magic',
    gradient: 'from-purple-50 to-blue-50',
  },
  {
    slug: 'romantasy',
    name: 'Romantasy',
    description: 'Fantasy with love stories and relationships',
    gradient: 'from-rose-50 to-pink-50',
  },
  {
    slug: 'litrpg',
    name: 'LitRPG / GameLit & Progression',
    description: 'Literary role-playing story with progression',
    gradient: 'from-blue-50 to-cyan-50',
  },
  {
    slug: 'dark',
    name: 'Dark Fantasy',
    description: 'Blends fantasy with horror and brutality',
    gradient: 'from-slate-100 to-zinc-100',
  },
  {
    slug: 'urban',
    name: 'Urban / Contemporary Fantasy',
    description: 'Magic hidden in the modern world',
    gradient: 'from-indigo-50 to-violet-50',
  },
  {
    slug: 'grimdark',
    name: 'Grimdark',
    description: 'Ultra-dark, cynical world with antiheroes',
    gradient: 'from-gray-100 to-slate-100',
  },
  {
    slug: 'historical',
    name: 'Historical Fantasy',
    description: 'Alternative history, often medieval with magic',
    gradient: 'from-amber-50 to-orange-50',
  },
  {
    slug: 'academy',
    name: 'Academy / School Fantasy',
    description: 'School / coming of age setups with magic',
    gradient: 'from-red-50 to-rose-50',
  },
  {
    slug: 'mythology',
    name: 'Mythic / Folklore & Fairy-Tales',
    description: 'Inspired by myths, legends and folklore',
    gradient: 'from-yellow-50 to-amber-50',
  },
  {
    slug: 'swords',
    name: 'Sword & Sorcery',
    description: 'Heroic adventure, visceral magic, ancient evil',
    gradient: 'from-cyan-50 to-teal-50',
  },
  {
    slug: 'cozy',
    name: 'Cozy Fantasy',
    description: 'Low conflict, heartwarming vibes',
    gradient: 'from-green-50 to-emerald-50',
  },
  {
    slug: 'science-fantasy',
    name: 'Science Fantasy',
    description: 'Where technology meets magic and prophecy',
    gradient: 'from-sky-50 to-blue-50',
  },
];

const newReleases: Record<string, string[]> = {
  general: [
    'Fourth Wing',
    'Wind and Truth',
    'House of Flame and Shadow',
    'Starter Villain',
    'The Familiar',
    'Intermezzo',
  ],
  epic: [
    'Wind and Truth',
    'The Sunlit Man',
    'Tress of the Emerald Sea',
    'Defiant',
    'The Lost Metal',
    'Yumi and the Nightmare Painter',
  ],
  romantasy: [
    'Fourth Wing',
    'Iron Flame',
    'House of Flame and Shadow',
    'Bride',
    'A Soul of Ash and Blood',
    'Born of Blood and Ash',
  ],
  swords: [
    'The Blacktongue Thief',
    'The Sword Defiant',
    'Age of Ash',
    'The Tainted Cup',
    'Kings of the Wyld',
    'Promise of Blood',
  ],
  dark: [
    'Age of Ash',
    'The Blacktongue Thief',
    'A Little Hatred',
    'The Wisdom of Crowds',
    'The Trouble with Peace',
    'The Familiar',
  ],
  urban: [
    'The World We Make',
    'Witch King',
    'Ink Blood Sister Scribe',
    'Starter Villain',
    'A Psalm for the Wild-Built',
    'The Familiar',
  ],
  grimdark: [
    'Age of Ash',
    'The Blacktongue Thief',
    'A Little Hatred',
    'The Wisdom of Crowds',
    'The Trouble with Peace',
    'Hell Around the Horn',
  ],
  historical: [
    'Ink Blood Sister Scribe',
    'The Foxglove King',
    "The Witch's Heart",
    'Daughter of the Moon Goddess',
    'The Star and the Strange Moon',
    'The Familiar',
  ],
  academy: [
    'Fourth Wing',
    'Iron Flame',
    'Nevernight',
    'An Ember in the Ashes',
    'Shadow and Bone',
    'The Foxglove King',
  ],
  mythology: [
    'Witch King',
    'A Thousand Ships',
    "The Witch's Heart",
    'Daughter of the Moon Goddess',
    'Ariadne',
    'Neon Gods',
  ],
  cozy: [
    'Starter Villain',
    "Emily Wilde's Encyclopaedia of Faeries",
    'Nettle and Bone',
    'A Psalm for the Wild-Built',
    'Legends & Lattes',
    "A Wizard's Guide to Defensive Baking",
  ],
  litrpg: [
    'Defiant',
    'Beware of Chicken',
    'Bastion',
    'The Path of Ascension',
    'Mark of the Fool',
    'Iron Prince',
  ],
  'science-fantasy': [
    'The Familiar',
    'Translation State',
    'The Kaiju Preservation Society',
    'Witch King',
    'Piranesi',
    'Service Model',
  ],
};

const onSale: Record<string, string[]> = {
  general: [
    'The Name of the Wind',
    'Mistborn: The Final Empire',
    'The Way of Kings',
    'A Court of Thorns and Roses',
    'The Hobbit',
    'Good Omens',
  ],
  epic: [
    'The Way of Kings',
    'Mistborn: The Final Empire',
    'The Eye of the World',
    'The Lord of the Rings',
    'Elantris',
    'Warbreaker',
  ],
  romantasy: [
    'A Court of Thorns and Roses',
    'From Blood and Ash',
    'Serpent & Dove',
    'The Cruel Prince',
    'Daughter of the Moon Goddess',
    'Divine Rivals',
  ],
  swords: [
    'Conan the Barbarian',
    'The Blade Itself',
    'The Lies of Locke Lamora',
    'The Black Company',
    'Elric of Melniboné',
    'Fafhrd and the Gray Mouser',
  ],
  dark: [
    'The Blade Itself',
    'The Black Company',
    'Half a King',
    'Low Town',
    'The Gutter Prayer',
    'Kings of the Wyld',
  ],
  urban: [
    'Neverwhere',
    'Good Omens',
    'Rivers of London',
    'Storm Front',
    'Anansi Boys',
    'The City We Became',
  ],
  grimdark: [
    'The Blade Itself',
    'Best Served Cold',
    'Gardens of the Moon',
    'The Heroes',
    'Prince of Thorns',
    'The Black Company',
  ],
  historical: [
    'Jonathan Strange & Mr Norrell',
    'The Bear and the Nightingale',
    'Circe',
    'Sorcerer to the Crown',
    'The Invisible Life of Addie LaRue',
    'Uprooted',
  ],
  academy: [
    'Harry Potter',
    'Eragon',
    'The Name of the Wind',
    'An Ember in the Ashes',
    'The Magicians',
    'Ninth House',
  ],
  mythology: [
    'Circe',
    'The Song of Achilles',
    'Norse Mythology',
    'A Thousand Ships',
    'Ariadne',
    'The Penelopiad',
  ],
  cozy: [
    'Legends & Lattes',
    'The House in the Cerulean Sea',
    'A Psalm for the Wild-Built',
    'Piranesi',
    "Howl's Moving Castle",
    'Nettle and Bone',
  ],
  litrpg: [
    'Dungeon Crawler Carl',
    'Cradle',
    'He Who Fights With Monsters',
    'Mother of Learning',
    'Beware of Chicken',
    'Defiance of the Fall',
  ],
  'science-fantasy': [
    'Dune',
    'Red Rising',
    'Gideon the Ninth',
    'A Wizard of Earthsea',
    'The Dark Tower',
    'Dying Earth',
  ],
};

const trending: Record<string, string[]> = {
  general: [
    'Fourth Wing',
    'A Court of Thorns and Roses',
    'Mistborn',
    'The Way of Kings',
    'Six of Crows',
    'The Name of the Wind',
  ],
  epic: [
    'The Way of Kings',
    'Mistborn',
    'The Name of the Wind',
    'The Lord of the Rings',
    'The Fifth Season',
    'The Rage of Dragons',
  ],
  romantasy: [
    'Fourth Wing',
    'A Court of Thorns and Roses',
    'From Blood and Ash',
    'Throne of Glass',
    'The Cruel Prince',
    'Iron Flame',
  ],
  swords: [
    'The Blade Itself',
    'The Black Company',
    'Nevernight',
    'The Lies of Locke Lamora',
    'Kings of the Wyld',
    'The Heroes',
  ],
  dark: [
    'The First Law',
    'The Blade Itself',
    'The Poppy War',
    'Prince of Thorns',
    'Nevernight',
    'The Fifth Season',
  ],
  urban: [
    'The Dresden Files',
    'American Gods',
    'Good Omens',
    'Neverwhere',
    'Rivers of London',
    'The Magicians',
  ],
  grimdark: [
    'The First Law',
    'Malazan Book of the Fallen',
    'The Poppy War',
    'Prince of Thorns',
    'The Black Company',
    'Best Served Cold',
  ],
  historical: [
    'Jonathan Strange & Mr Norrell',
    'The Bear and the Nightingale',
    'Circe',
    'The Invisible Life of Addie LaRue',
    'Piranesi',
    'Spinning Silver',
  ],
  academy: [
    'Fourth Wing',
    'Harry Potter',
    'The Name of the Wind',
    'Six of Crows',
    'Shadow and Bone',
    'Nevernight',
  ],
  mythology: [
    'Circe',
    'The Song of Achilles',
    'American Gods',
    'Norse Mythology',
    'A Thousand Ships',
    'Ariadne',
  ],
  cozy: [
    'Legends & Lattes',
    'The House in the Cerulean Sea',
    'A Psalm for the Wild-Built',
    'The Goblin Emperor',
    'Piranesi',
    "Howl's Moving Castle",
  ],
  litrpg: [
    'Dungeon Crawler Carl',
    'He Who Fights With Monsters',
    'Cradle',
    'The Wandering Inn',
    'Mother of Learning',
    'Primal Hunter',
  ],
  'science-fantasy': [
    'Dune',
    'Red Rising',
    'Gideon the Ninth',
    'The Dark Tower',
    'The Book of the New Sun',
    'Chronicles of Amber',
  ],
};

const upcoming: Record<string, string[]> = {
  general: [
    'Winds of Winter',
    'The Doors of Stone',
    'The Book of All Hours',
    'Unnamed Sanderson 2025',
    'A Memory of Empire sequel',
    'The Sunlit Man 2',
  ],
  epic: [
    'Winds of Winter',
    'The Doors of Stone',
    "The Liar's Oath",
    'The Book of All Hours',
    'Unnamed Sanderson 2025',
    'Malazan: Path to Ascendancy 4',
  ],
  romantasy: [
    'Fifth Wing',
    'ACOTAR Book 6',
    'From Blood and Ash 6',
    'Crescent City 4',
    'Kingdom of the Wicked 4',
    'The Midnight Sea sequel',
  ],
  swords: [
    'The Sword Defiant 2',
    'The Blacktongue Thief 3',
    'Joe Abercrombie new',
    'Scott Lynch new',
    'Age of Assassins 4',
    'Mark Lawrence new',
  ],
  dark: [
    'Joe Abercrombie new standalone',
    'Age of Assassins 4',
    'The Gutter Prayer sequel',
    'Nevernight 4',
    'The Dark Descent',
    'Mark Lawrence new',
  ],
  urban: [
    'The Dresden Files: Twelve Months',
    'Rivers of London Book 11',
    'October Daye 22',
    'Alex Verus new',
    'Laundry Files new',
    'Neverwhere companion',
  ],
  grimdark: [
    'Joe Abercrombie new',
    'Malazan: Path to Ascendancy 4',
    'Mark Lawrence new',
    'The Court of Broken Knives sequel',
    'Age of Assassins 4',
    'Grimdark anthology 2025',
  ],
  historical: [
    'Naomi Novik new historical',
    'Piranesi 2',
    'The Invisible Life sequel',
    'Susanna Clarke new',
    'The Bear and Nightingale spin-off',
    'Sorcerer to the Crown 3',
  ],
  academy: [
    'Fifth Wing',
    'ACOTAR Book 6',
    'Nevernight 4',
    'The Magisterium new',
    'Legendborn sequel',
    'Ninth House sequel',
  ],
  mythology: [
    'Madeline Miller new novel',
    'Pat Barker new',
    'A Thousand Ships companion',
    'Song of Achilles prequel',
    'Norse Mythology 3',
    'Ariadne sequel',
  ],
  cozy: [
    'Legends & Lattes 3',
    'TJ Klune new',
    'A Psalm for the Wild-Built 4',
    "Emily Wilde's Encyclopaedia 3",
    'House in the Cerulean Sea 2',
    'Nettle & Bone 2',
  ],
  litrpg: [
    'Dungeon Crawler Carl 7',
    'Cradle 13',
    'The Wandering Inn Vol. 9',
    'He Who Fights With Monsters 13',
    'Defiance of the Fall 12',
    'Primal Hunter 8',
  ],
  'science-fantasy': [
    'Red Rising 8',
    'Locked Tomb 5',
    'Dune: Tales of Arrakis',
    'Andy Weir new',
    'Ann Leckie new',
    'The Familiar sequel',
  ],
};

const mockBooks: Record<
  string,
  { best: string[]; starter: string[]; hidden: string[] }
> = {
  general: {
    best: [
      'The Name of the Wind',
      'The Way of Kings',
      'A Court of Thorns and Roses',
      'Harry Potter',
      'The Lord of the Rings',
      'Mistborn',
      'The Hobbit',
      'Six of Crows',
      'The Poppy War',
      'American Gods',
    ],
    starter: [
      'The Hobbit',
      'Harry Potter',
      'Mistborn: The Final Empire',
      'Percy Jackson',
      'Eragon',
      'Good Omens',
      'The Lightning Thief',
      'Fablehaven',
      'Neverwhere',
      'Coraline',
    ],
    hidden: [
      'Piranesi',
      'Legends & Lattes',
      'The Goblin Emperor',
      "Emily Wilde's Encyclopaedia",
      'The Very Secret Society of Irregular Witches',
      'A Psalm for the Wild-Built',
      'Sorcery of Thorns',
      'House of Salt and Sorrows',
      'Uprooted',
      'The Invisible Library',
    ],
  },
  epic: {
    best: [
      'The Way of Kings',
      'The Name of the Wind',
      'The Lord of the Rings',
      'The Wheel of Time',
      'Malazan Book of the Fallen',
      'Mistborn',
      'The Lies of Locke Lamora',
      'The Priory of the Orange Tree',
      'The Fifth Season',
      'The Rage of Dragons',
    ],
    starter: [
      'The Hobbit',
      'Mistborn: The Final Empire',
      'The Eye of the World',
      'The Blade Itself',
      'Elantris',
      'The Final Empire',
      'The Shadow of What Was Lost',
      'Warbreaker',
      'The Black Prism',
      'Blood Song',
    ],
    hidden: [
      'The Traitor Son Cycle',
      'The Wounded Kingdom',
      'Riyria Revelations',
      'The Shadow Campaigns',
      'The Crimson Empire',
      'The Tide Child',
      'The Books of Babel',
      'The Divine Cities',
      'The Masquerade',
      'The Chronicles of the Unhewn Throne',
    ],
  },
  romantasy: {
    best: [
      'A Court of Thorns and Roses',
      'From Blood and Ash',
      'Throne of Glass',
      'Crescent City',
      'Fourth Wing',
      'Kingdom of the Wicked',
      'The Cruel Prince',
      'Serpent & Dove',
      'A Court of Mist and Fury',
      'To Kill a Kingdom',
    ],
    starter: [
      'A Court of Mist and Fury',
      'Kingdom of the Wicked',
      'Serpent & Dove',
      'The Bridge Kingdom',
      'Shadow and Bone',
      'An Ember in the Ashes',
      'The Wrath and the Dawn',
      'Daughter of the Moon Goddess',
      'Divine Rivals',
      'The Shadows Between Us',
    ],
    hidden: [
      'Radiance',
      'The Shadows Between Us',
      'House of Earth and Blood',
      'The Winter King',
      'To Bleed a Crystal Bloom',
      'Blood and Ash',
      'When the Moon Hatched',
      'House of Salt and Sorrows',
      'The Bone Season',
      'A River Enchanted',
    ],
  },

  dark: {
    best: [
      'The Blade Itself',
      'The Poppy War',
      'Prince of Thorns',
      'The Black Company',
      'The First Law',
      'The Broken Empire',
      'A Little Hatred',
      'Best Served Cold',
      'The Heroes',
      'Red Sister',
    ],
    starter: [
      'The Black Company',
      'Low Town',
      'Half a King',
      'The Darkness That Comes Before',
      'The Court of Broken Knives',
      'Kings of the Wyld',
      'Prince of Fools',
      'The Gutter Prayer',
      'The Dragonbone Chair',
      'The Faithful and the Fallen',
    ],
    hidden: [
      'The Court of Broken Knives',
      'The Grim Company',
      'Beyond Redemption',
      'The Crimson Queen',
      'The Ember Blade',
      'The Red Knight',
      'The Age of Assassins',
      'The Blacktongue Thief',
      'We Ride the Storm',
      'The Wolf of Oren-Yaro',
    ],
  },
  urban: {
    best: [
      'The Dresden Files',
      'American Gods',
      'The Night Circus',
      'Neverwhere',
      'Good Omens',
      'Rivers of London',
      'The Magicians',
      'The Invisible Library',
      'October Daye',
      'Kate Daniels',
    ],
    starter: [
      'Rivers of London',
      'Neverwhere',
      'Good Omens',
      'The City We Became',
      'Storm Front',
      'Anansi Boys',
      'The Ocean at the End of the Lane',
      'Stardust',
      'Hounded',
      'Moon Called',
    ],
    hidden: [
      'The Iron Druid Chronicles',
      'October Daye',
      'Kate Daniels',
      'Alex Verus',
      'The Hollows',
      'Sandman Slim',
      'Mercy Thompson',
      'The Rook',
      'Seanan McGuire',
      'Libriomancer',
    ],
  },
  grimdark: {
    best: [
      'The First Law',
      'Malazan Book of the Fallen',
      'The Black Company',
      'Prince of Thorns',
      'The Broken Empire',
      'The Poppy War',
      'Best Served Cold',
      'The Heroes',
      'A Little Hatred',
      'Red Sister',
    ],
    starter: [
      'Best Served Cold',
      'Gardens of the Moon',
      'The Heroes',
      'Prince of Thorns',
      'The Blade Itself',
      'Half a King',
      'Low Town',
      'The Court of Broken Knives',
      'Beyond Redemption',
      'The Grim Company',
    ],
    hidden: [
      'The Broken Empire',
      'The Court of Broken Knives',
      'Chronicles of the Black Company',
      'The Crimson Queen',
      'The Ember Blade',
      'The Red Knight',
      'The Age of Assassins',
      'The Blacktongue Thief',
      'We Ride the Storm',
      'The Wolf of Oren-Yaro',
    ],
  },
  historical: {
    best: [
      'Jonathan Strange & Mr Norrell',
      'The Golem and the Jinni',
      'The Bear and the Nightingale',
      'The Ten Thousand Doors of January',
      'The Invisible Life of Addie LaRue',
      'The Watchmaker of Filigree Street',
      'Sorcerer to the Crown',
      'The Mask of Mirrors',
      'The Diviners',
      'Shadowshaper',
    ],
    starter: [
      'Sorcerer to the Crown',
      'The Ten Thousand Doors of January',
      'The Invisible Life of Addie LaRue',
      'The Watchmaker of Filigree Street',
      'The Essex Serpent',
      'The Bear and the Nightingale',
      'Uprooted',
      'Spinning Silver',
      "A Gentleman's Guide to Vice and Virtue",
      'The Gilded Wolves',
    ],
    hidden: [
      'The Glamourist Histories',
      'Tremontaine',
      'The Watchmaker of Filigree Street',
      'The Mask of Mirrors',
      'The Winter Witch',
      "The Assassin's Curse",
      'The Midnight Bargain',
      'The Kingdoms',
      'A Dead Djinn in Cairo',
      'The Bone Shard Daughter',
    ],
  },
  academy: {
    best: [
      'Harry Potter',
      'The Name of the Wind',
      'Fourth Wing',
      'Nevernight',
      'The Magicians',
      'An Ember in the Ashes',
      'Shadow and Bone',
      'Six of Crows',
      'Eragon',
      'Scythe',
    ],
    starter: [
      'Harry Potter',
      'Eragon',
      'The Name of the Wind',
      'Shadow and Bone',
      'An Ember in the Ashes',
      'Percy Jackson',
      'The Magicians',
      'Children of Blood and Bone',
      'Legendborn',
      'Caraval',
    ],
    hidden: [
      'Nevernight',
      'The Magisterium',
      'Sabriel',
      'Ninth House',
      'The Young Elites',
      'Caraval',
      'Children of Blood and Bone',
      'The Gilded Wolves',
      'An Ember in the Ashes',
      'The Foxglove King',
    ],
  },
  mythology: {
    best: [
      'Circe',
      'The Song of Achilles',
      'American Gods',
      'Norse Mythology',
      'The Penelopiad',
      'Till We Have Faces',
      'The Silence of the Girls',
      'Lavinia',
      'The King Must Die',
      'The Mists of Avalon',
    ],
    starter: [
      'The Penelopiad',
      'Till We Have Faces',
      'Norse Mythology',
      'Mythos',
      'Heroes',
      'Troy',
      'The Gospel of Loki',
      'Gods Behaving Badly',
      'Anansi Boys',
      'The Lightning Thief',
    ],
    hidden: [
      'The Silence of the Girls',
      'Lavinia',
      'The King Must Die',
      'The Bull from the Sea',
      'The Firebrand',
      "The Trickster's Choice",
      'Song of the Huntress',
      'A Thousand Ships',
      'Ariadne',
      'The Children of Jocasta',
    ],
  },
  swords: {
    best: [
      'The Blade Itself',
      'The Lies of Locke Lamora',
      'The Black Company',
      'Conan the Barbarian',
      'Elric of Melniboné',
      'Nevernight',
      'Kings of the Wyld',
      'The First Law',
      'The Age of Assassins',
      'Promise of Blood',
    ],
    starter: [
      'The Lies of Locke Lamora',
      'The Black Company',
      'The Blade Itself',
      'Nevernight',
      'Kings of the Wyld',
      'The Blacktongue Thief',
      'The Age of Assassins',
      'Half a King',
      'Low Town',
      'Prince of Fools',
    ],
    hidden: [
      'The Crimson Queen',
      'The Grim Company',
      'The Court of Broken Knives',
      'Beyond Redemption',
      'The Red Knight',
      'We Ride the Storm',
      'The Wolf of Oren-Yaro',
      'The Traitor Son Cycle',
      'Promise of Blood',
      'The Vagrant',
    ],
  },
  cozy: {
    best: [
      'Legends & Lattes',
      'The House in the Cerulean Sea',
      "Howl's Moving Castle",
      'A Psalm for the Wild-Built',
      'The Goblin Emperor',
      "Emily Wilde's Encyclopaedia",
      'Sorcery of Thorns',
      'Piranesi',
      'The Ten Thousand Doors of January',
      'The Invisible Library',
    ],
    starter: [
      'A Psalm for the Wild-Built',
      'The Goblin Emperor',
      'Sorcery of Thorns',
      'The House in the Cerulean Sea',
      "Emily Wilde's Encyclopaedia",
      "Howl's Moving Castle",
      'Piranesi',
      'The Invisible Library',
      'Nettle & Bone',
      "A Wizard's Guide to Defensive Baking",
    ],
    hidden: [
      'The Very Secret Society of Irregular Witches',
      'A Dark and Hollow Star',
      "Emily Wilde's Encyclopaedia",
      'The Invisible Library',
      'Nettle & Bone',
      "A Wizard's Guide to Defensive Baking",
      'Sorcery of Thorns',
      'The Starless Sea',
      'Piranesi',
      'The Ten Thousand Doors of January',
    ],
  },
  litrpg: {
    best: [
      'Dungeon Crawler Carl',
      'He Who Fights With Monsters',
      'Primal Hunter',
      'Cradle',
      'Arcane Ascension',
      'The Wandering Inn',
      'Mother of Learning',
      'Defiance of the Fall',
      'Azarinth Healer',
      'The Legend of Randidly Ghosthound',
    ],
    starter: [
      'Arcane Ascension',
      'Cradle',
      'The Wandering Inn',
      'Defiance of the Fall',
      'Mother of Learning',
      'He Who Fights With Monsters',
      'Beware of Chicken',
      "Jake's Magical Market",
      'The Primal Hunter',
      'Dungeon Crawler Carl',
    ],
    hidden: [
      'Defiance of the Fall',
      "Jake's Magical Market",
      'Beware of Chicken',
      'Azarinth Healer',
      'The Legend of Randidly Ghosthound',
      'Delve',
      'Iron Prince',
      'Mark of the Fool',
      'The Path of Ascension',
      'Bastion',
    ],
  },
  'science-fantasy': {
    best: [
      'Dune',
      'Red Rising',
      'Gideon the Ninth',
      'The Book of the New Sun',
      'The Dark Tower',
      'A Wizard of Earthsea',
      'Chronicles of Amber',
      'Hyperion',
      'The Stars My Destination',
      'Dying Earth',
    ],
    starter: [
      'Dune',
      'Red Rising',
      'Gideon the Ninth',
      'A Wizard of Earthsea',
      'The Dark Tower',
      "Old Man's War",
      'Piranesi',
      'All Systems Red',
      'Horus Rising',
      'The Long Way to a Small Angry Planet',
    ],
    hidden: [
      'The Book of the New Sun',
      'Dying Earth',
      'Viriconium',
      'A Plague of Demons',
      'The Stars My Destination',
      'Engine Summer',
      'Riddlemaster of Hed',
      'The Dragon Masters',
      'The Demolished Man',
      'Light from Uncommon Stars',
    ],
  },
};

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bookCovers, setBookCovers] = useState<Map<string, string>>(new Map());
  const [bookSlugs, setBookSlugs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    fetch('/api/books')
      .then((r) => r.json())
      .then(
        (data: {
          items?: Array<{
            title: string;
            cover_url?: string | null;
            slug?: string | null;
          }>;
        }) => {
          const covers = new Map<string, string>();
          const slugs = new Map<string, string>();
          for (const b of data.items ?? []) {
            const key = b.title.toLowerCase();
            if (b.cover_url) covers.set(key, b.cover_url);
            if (b.slug) slugs.set(key, b.slug);
          }
          setBookCovers(covers);
          setBookSlugs(slugs);
        },
      )
      .catch(() => {});
  }, []);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
  };

  const selectedCat = categories.find((c) => c.slug === selectedCategory);
  const books = mockBooks[selectedCategory || 'general'];
  const categoryName = selectedCat?.name || 'Fantasy';

  const getCoverSrc = (title: string): string => {
    const dbCover = bookCovers.get(title.toLowerCase());
    if (dbCover) return dbCover;
    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-M.jpg`;
  };

  const getSlug = (title: string): string | null =>
    bookSlugs.get(title.toLowerCase()) ?? null;

  const renderCoverStrip = (titles: string[]) => (
    <div
      className="flex gap-2.5 overflow-x-auto -mx-1 px-1 py-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {titles.map((title, i) => {
        const slug = getSlug(title);
        const coverEl = (
          <div className="shrink-0 w-[68px] h-[102px] rounded-lg overflow-hidden bg-linear-to-br from-purple-100 to-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={getCoverSrc(title)}
              alt={title}
              title={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/placeholder-cover.svg';
              }}
            />
          </div>
        );
        return slug ? (
          <a
            key={i}
            href={`/books/${slug}/`}
            className="shrink-0 hover:opacity-90 transition-opacity"
            title={title}
          >
            {coverEl}
          </a>
        ) : (
          <div key={i} className="shrink-0" title={title}>
            {coverEl}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Browse our collection by category
          </p>
          <a
            href={
              selectedCategory
                ? `/categories/${selectedCategory}/`
                : `/books/all/`
            }
            className="text-sm font-medium text-purple-700 hover:text-purple-900 hover:underline transition-colors whitespace-nowrap"
          >
            View full {categoryName} →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`group relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-lg text-left ${
                selectedCategory === cat.slug
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : ''
              }`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity ${
                  selectedCategory === cat.slug ? 'opacity-100' : ''
                }`}
              ></div>
              <div className="relative">
                <div className="font-medium">{cat.name}</div>
                <div className="text-sm text-zinc-600">{cat.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="rounded-lg border bg-linear-to-br from-violet-50 to-purple-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold text-violet-900">New Releases</h3>
            <span className="ml-auto text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
              2023–2025
            </span>
          </div>
          {renderCoverStrip(newReleases[selectedCategory || 'general'])}
        </div>

        <div className="rounded-lg border bg-linear-to-br from-orange-50 to-amber-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔥</span>
            <h3 className="font-semibold text-orange-900">Trending Now</h3>
            <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              BookTok & Reddit
            </span>
          </div>
          {renderCoverStrip(trending[selectedCategory || 'general'])}
        </div>

        <div className="rounded-lg border bg-linear-to-br from-emerald-50 to-teal-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏷️</span>
            <h3 className="font-semibold text-emerald-900">
              On Sale This Week
            </h3>
            <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              Kindle & paperback deals
            </span>
          </div>
          {renderCoverStrip(onSale[selectedCategory || 'general'])}
        </div>

        <div className="rounded-lg border bg-linear-to-br from-sky-50 to-blue-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📅</span>
            <h3 className="font-semibold text-sky-900">
              Upcoming {selectedCat ? categoryName : 'Fantasy'}
            </h3>
            <span className="ml-auto text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
              Anticipated 2025–2026
            </span>
          </div>
          {renderCoverStrip(upcoming[selectedCategory || 'general'])}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold text-sm mb-3">
            ⭐ All-Time Greats{' '}
            <span className="text-zinc-400 font-normal">— {categoryName}</span>
          </h3>
          <ol className="space-y-1.5">
            {books.best.slice(0, 5).map((book, i) => (
              <li key={i} className="text-sm text-zinc-700 flex items-start">
                <span className="text-zinc-400 mr-2 font-medium min-w-5">
                  {i + 1}.
                </span>
                {book}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold text-sm mb-3">
            🚀 Best to Start With{' '}
            <span className="text-zinc-400 font-normal">— {categoryName}</span>
          </h3>
          <ol className="space-y-1.5">
            {books.starter.slice(0, 5).map((book, i) => (
              <li key={i} className="text-sm text-zinc-700 flex items-start">
                <span className="text-zinc-400 mr-2 font-medium min-w-5">
                  {i + 1}.
                </span>
                {book}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold text-sm mb-3">
            💎 Hidden Gems{' '}
            <span className="text-zinc-400 font-normal">— {categoryName}</span>
          </h3>
          <ol className="space-y-1.5">
            {books.hidden.slice(0, 5).map((book, i) => (
              <li key={i} className="text-sm text-zinc-700 flex items-start">
                <span className="text-zinc-400 mr-2 font-medium min-w-5">
                  {i + 1}.
                </span>
                {book}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
