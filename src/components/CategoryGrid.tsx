import { useState } from 'react';

interface Category {
  slug: string;
  name: string;
  description: string;
  gradient: string;
}

const categories: Category[] = [
  { slug: 'epic', name: 'Epic / High Fantasy', description: 'Grand worlds with deep lore & ancient magic', gradient: 'from-purple-50 to-blue-50' },
  { slug: 'romantasy', name: 'Romantasy', description: 'Fantasy with love stories and relationships', gradient: 'from-rose-50 to-pink-50' },
  { slug: 'young', name: 'YA Fantasy', description: 'Young adult & coming of age stories', gradient: 'from-cyan-50 to-teal-50' },
  { slug: 'dark', name: 'Dark Fantasy', description: 'Blends fantasy with horror and brutality', gradient: 'from-slate-100 to-zinc-100' },
  { slug: 'urban', name: 'Urban / Contemporary Fantasy', description: 'Magic hidden in the modern world', gradient: 'from-indigo-50 to-violet-50' },
  { slug: 'grimdark', name: 'Grimdark', description: 'Ultra-dark, cynical world with antiheroes', gradient: 'from-gray-100 to-slate-100' },
  { slug: 'historical', name: 'Historical Fantasy', description: 'Alternative history, often medieval with magic', gradient: 'from-amber-50 to-orange-50' },
  { slug: 'paranormal', name: 'Paranormal Fantasy', description: 'Vampires, werewolves, witches & wizards', gradient: 'from-red-50 to-rose-50' },
  { slug: 'mythology', name: 'Mythic / Folklore & Fairy-Tales', description: 'Inspired by myths, legends and folklore', gradient: 'from-yellow-50 to-amber-50' },
  { slug: 'cozy', name: 'Cozy Fantasy', description: 'Low conflict, heartwarming vibes', gradient: 'from-green-50 to-emerald-50' },
  { slug: 'litrpg', name: 'LitRPG / GameLit & Progression', description: 'Literary role-playing story with progression', gradient: 'from-blue-50 to-cyan-50' },
  { slug: 'sci-fi', name: 'Sci-Fi', description: 'Space operas, cyberpunk, future worlds', gradient: 'from-sky-50 to-blue-50' },
];

const newReleases: Record<string, string[]> = {
  general:    ['Fourth Wing', 'Wind and Truth', 'House of Flame and Shadow', 'Starter Villain', 'The Familiar', 'Intermezzo'],
  epic:       ['Wind and Truth', 'The Sunlit Man', 'Tress of the Emerald Sea', 'Defiant', 'The Lost Metal', 'Yumi and the Nightmare Painter'],
  romantasy:  ['Fourth Wing', 'Iron Flame', 'House of Flame and Shadow', 'Bride', 'A Soul of Ash and Blood', 'Born of Blood and Ash'],
  young:      ['Iron Flame', 'The Familiar', 'Heir', 'Divine Rivals', 'The Foxglove King', 'A Good Girl\'s Guide to Murder'],
  dark:       ['Age of Ash', 'The Blacktongue Thief', 'A Little Hatred', 'The Wisdom of Crowds', 'The Trouble with Peace', 'The Familiar'],
  urban:      ['The World We Make', 'Witch King', 'Ink Blood Sister Scribe', 'Starter Villain', 'A Psalm for the Wild-Built', 'The Familiar'],
  grimdark:   ['Age of Ash', 'The Blacktongue Thief', 'A Little Hatred', 'The Wisdom of Crowds', 'The Trouble with Peace', 'Hell Around the Horn'],
  historical: ['Ink Blood Sister Scribe', 'The Foxglove King', 'The Witch\'s Heart', 'Daughter of the Moon Goddess', 'The Star and the Strange Moon', 'The Familiar'],
  paranormal: ['Fourth Wing', 'House of Flame and Shadow', 'Bride', 'The Foxglove King', 'A Good Girl\'s Guide to Murder', 'Ink Blood Sister Scribe'],
  mythology:  ['Witch King', 'A Thousand Ships', 'The Witch\'s Heart', 'Daughter of the Moon Goddess', 'Ariadne', 'Neon Gods'],
  cozy:       ['Starter Villain', 'Emily Wilde\'s Encyclopaedia of Faeries', 'Nettle and Bone', 'A Psalm for the Wild-Built', 'Legends & Lattes', 'A Wizard\'s Guide to Defensive Baking'],
  litrpg:     ['Defiant', 'Beware of Chicken', 'Bastion', 'The Path of Ascension', 'Mark of the Fool', 'Iron Prince'],
  'sci-fi':   ['A Desolation Called Peace', 'The Kaiju Preservation Society', 'Translation State', 'Witch King', 'Starter Villain', 'A Memory Called Empire'],
};

const trending: Record<string, string[]> = {
  general:    ['Fourth Wing', 'A Court of Thorns and Roses', 'Mistborn', 'The Way of Kings', 'Six of Crows', 'The Name of the Wind'],
  epic:       ['The Way of Kings', 'Mistborn', 'The Name of the Wind', 'The Lord of the Rings', 'The Fifth Season', 'The Rage of Dragons'],
  romantasy:  ['Fourth Wing', 'A Court of Thorns and Roses', 'From Blood and Ash', 'Throne of Glass', 'The Cruel Prince', 'Iron Flame'],
  young:      ['Fourth Wing', 'Six of Crows', 'Shadow and Bone', 'The Hunger Games', 'Throne of Glass', 'City of Bones'],
  dark:       ['The First Law', 'The Blade Itself', 'The Poppy War', 'Prince of Thorns', 'Nevernight', 'The Fifth Season'],
  urban:      ['The Dresden Files', 'American Gods', 'Good Omens', 'Neverwhere', 'Rivers of London', 'The Magicians'],
  grimdark:   ['The First Law', 'Malazan Book of the Fallen', 'The Poppy War', 'Prince of Thorns', 'The Black Company', 'Best Served Cold'],
  historical: ['Jonathan Strange & Mr Norrell', 'The Bear and the Nightingale', 'Circe', 'The Invisible Life of Addie LaRue', 'Piranesi', 'Spinning Silver'],
  paranormal: ['A Discovery of Witches', 'The Mortal Instruments', 'Twilight', 'Kate Daniels', 'Rivers of London', 'Good Omens'],
  mythology:  ['Circe', 'The Song of Achilles', 'American Gods', 'Norse Mythology', 'A Thousand Ships', 'Ariadne'],
  cozy:       ['Legends & Lattes', 'The House in the Cerulean Sea', 'A Psalm for the Wild-Built', 'The Goblin Emperor', 'Piranesi', 'Howl\'s Moving Castle'],
  litrpg:     ['Dungeon Crawler Carl', 'He Who Fights With Monsters', 'Cradle', 'The Wandering Inn', 'Mother of Learning', 'Primal Hunter'],
  'sci-fi':   ['Project Hail Mary', 'Dune', 'The Martian', 'Foundation', 'Ender\'s Game', 'The Expanse'],
};

// Mock data for book lists
const mockBooks: Record<string, { best: string[], starter: string[], hidden: string[] }> = {
  general: {
    best: ['The Name of the Wind', 'The Way of Kings', 'A Court of Thorns and Roses', 'Harry Potter', 'The Lord of the Rings', 'Mistborn', 'The Hobbit', 'Six of Crows', 'The Poppy War', 'American Gods'],
    starter: ['The Hobbit', 'Harry Potter', 'Mistborn: The Final Empire', 'Percy Jackson', 'Eragon', 'Good Omens', 'The Lightning Thief', 'Fablehaven', 'Neverwhere', 'Coraline'],
    hidden: ['Piranesi', 'Legends & Lattes', 'The Goblin Emperor', 'Emily Wilde\'s Encyclopaedia', 'The Very Secret Society of Irregular Witches', 'A Psalm for the Wild-Built', 'Sorcery of Thorns', 'House of Salt and Sorrows', 'Uprooted', 'The Invisible Library'],
  },
  epic: {
    best: ['The Way of Kings', 'The Name of the Wind', 'The Lord of the Rings', 'The Wheel of Time', 'Malazan Book of the Fallen', 'Mistborn', 'The Lies of Locke Lamora', 'The Priory of the Orange Tree', 'The Fifth Season', 'The Rage of Dragons'],
    starter: ['The Hobbit', 'Mistborn: The Final Empire', 'The Eye of the World', 'The Blade Itself', 'Elantris', 'The Final Empire', 'The Shadow of What Was Lost', 'Warbreaker', 'The Black Prism', 'Blood Song'],
    hidden: ['The Traitor Son Cycle', 'The Wounded Kingdom', 'Riyria Revelations', 'The Shadow Campaigns', 'The Crimson Empire', 'The Tide Child', 'The Books of Babel', 'The Divine Cities', 'The Masquerade', 'The Chronicles of the Unhewn Throne'],
  },
  romantasy: {
    best: ['A Court of Thorns and Roses', 'From Blood and Ash', 'Throne of Glass', 'Crescent City', 'Fourth Wing', 'Kingdom of the Wicked', 'The Cruel Prince', 'Serpent & Dove', 'A Court of Mist and Fury', 'To Kill a Kingdom'],
    starter: ['A Court of Mist and Fury', 'Kingdom of the Wicked', 'Serpent & Dove', 'The Bridge Kingdom', 'Shadow and Bone', 'An Ember in the Ashes', 'The Wrath and the Dawn', 'Daughter of the Moon Goddess', 'Divine Rivals', 'The Shadows Between Us'],
    hidden: ['Radiance', 'The Shadows Between Us', 'House of Earth and Blood', 'The Winter King', 'To Bleed a Crystal Bloom', 'Blood and Ash', 'When the Moon Hatched', 'House of Salt and Sorrows', 'The Bone Season', 'A River Enchanted'],
  },
  young: {
    best: ['Harry Potter', 'Percy Jackson', 'The Hunger Games', 'Six of Crows', 'The Mortal Instruments', 'Throne of Glass', 'Red Queen', 'Shadow and Bone', 'Divergent', 'The Maze Runner'],
    starter: ['Eragon', 'Fablehaven', 'A Darker Shade of Magic', 'The Lightning Thief', 'Miss Peregrine\'s Home for Peculiar Children', 'Artemis Fowl', 'City of Bones', 'Caraval', 'The Gilded Wolves', 'Children of Blood and Bone'],
    hidden: ['Sabriel', 'The Amulet of Samarkand', 'Skyward', 'The Young Elites', 'Seraphina', 'An Ember in the Ashes', 'Renegades', 'Three Dark Crowns', 'We Hunt the Flame', 'Sorcery of Thorns'],
  },
  dark: {
    best: ['The Blade Itself', 'The Poppy War', 'Prince of Thorns', 'The Black Company', 'The First Law', 'The Broken Empire', 'A Little Hatred', 'Best Served Cold', 'The Heroes', 'Red Sister'],
    starter: ['The Black Company', 'Low Town', 'Half a King', 'The Darkness That Comes Before', 'The Court of Broken Knives', 'Kings of the Wyld', 'Prince of Fools', 'The Gutter Prayer', 'The Dragonbone Chair', 'The Faithful and the Fallen'],
    hidden: ['The Court of Broken Knives', 'The Grim Company', 'Beyond Redemption', 'The Crimson Queen', 'The Ember Blade', 'The Red Knight', 'The Age of Assassins', 'The Blacktongue Thief', 'We Ride the Storm', 'The Wolf of Oren-Yaro'],
  },
  urban: {
    best: ['The Dresden Files', 'American Gods', 'The Night Circus', 'Neverwhere', 'Good Omens', 'Rivers of London', 'The Magicians', 'The Invisible Library', 'October Daye', 'Kate Daniels'],
    starter: ['Rivers of London', 'Neverwhere', 'Good Omens', 'The City We Became', 'Storm Front', 'Anansi Boys', 'The Ocean at the End of the Lane', 'Stardust', 'Hounded', 'Moon Called'],
    hidden: ['The Iron Druid Chronicles', 'October Daye', 'Kate Daniels', 'Alex Verus', 'The Hollows', 'Sandman Slim', 'Mercy Thompson', 'The Rook', 'Seanan McGuire', 'Libriomancer'],
  },
  grimdark: {
    best: ['The First Law', 'Malazan Book of the Fallen', 'The Black Company', 'Prince of Thorns', 'The Broken Empire', 'The Poppy War', 'Best Served Cold', 'The Heroes', 'A Little Hatred', 'Red Sister'],
    starter: ['Best Served Cold', 'Gardens of the Moon', 'The Heroes', 'Prince of Thorns', 'The Blade Itself', 'Half a King', 'Low Town', 'The Court of Broken Knives', 'Beyond Redemption', 'The Grim Company'],
    hidden: ['The Broken Empire', 'The Court of Broken Knives', 'Chronicles of the Black Company', 'The Crimson Queen', 'The Ember Blade', 'The Red Knight', 'The Age of Assassins', 'The Blacktongue Thief', 'We Ride the Storm', 'The Wolf of Oren-Yaro'],
  },
  historical: {
    best: ['Jonathan Strange & Mr Norrell', 'The Golem and the Jinni', 'The Bear and the Nightingale', 'The Ten Thousand Doors of January', 'The Invisible Life of Addie LaRue', 'The Watchmaker of Filigree Street', 'Sorcerer to the Crown', 'The Mask of Mirrors', 'The Diviners', 'Shadowshaper'],
    starter: ['Sorcerer to the Crown', 'The Ten Thousand Doors of January', 'The Invisible Life of Addie LaRue', 'The Watchmaker of Filigree Street', 'The Essex Serpent', 'The Bear and the Nightingale', 'Uprooted', 'Spinning Silver', 'A Gentleman\'s Guide to Vice and Virtue', 'The Gilded Wolves'],
    hidden: ['The Glamourist Histories', 'Tremontaine', 'The Watchmaker of Filigree Street', 'The Mask of Mirrors', 'The Winter Witch', 'The Assassin\'s Curse', 'The Midnight Bargain', 'The Kingdoms', 'A Dead Djinn in Cairo', 'The Bone Shard Daughter'],
  },
  paranormal: {
    best: ['Twilight', 'The Vampire Academy', 'True Blood', 'A Discovery of Witches', 'The Mortal Instruments', 'The Hollows', 'Mercy Thompson', 'Kate Daniels', 'The Sookie Stackhouse', 'Dead Until Dark'],
    starter: ['A Discovery of Witches', 'City of Bones', 'Dead Until Dark', 'Moon Called', 'Magic Bites', 'Marked', 'Hush Hush', 'The Hollows', 'Blood and Chocolate', 'Blue Bloods'],
    hidden: ['The Hollows', 'The Others', 'Mercy Thompson', 'October Daye', 'Kate Daniels', 'Alex Verus', 'The Iron Druid', 'Sandman Slim', 'The Rook', 'Fever Series'],
  },
  mythology: {
    best: ['Circe', 'The Song of Achilles', 'American Gods', 'Norse Mythology', 'The Penelopiad', 'Till We Have Faces', 'The Silence of the Girls', 'Lavinia', 'The King Must Die', 'The Mists of Avalon'],
    starter: ['The Penelopiad', 'Till We Have Faces', 'Norse Mythology', 'Mythos', 'Heroes', 'Troy', 'The Gospel of Loki', 'Gods Behaving Badly', 'Anansi Boys', 'The Lightning Thief'],
    hidden: ['The Silence of the Girls', 'Lavinia', 'The King Must Die', 'The Bull from the Sea', 'The Firebrand', 'The Trickster\'s Choice', 'Song of the Huntress', 'A Thousand Ships', 'Ariadne', 'The Children of Jocasta'],
  },
  cozy: {
    best: ['Legends & Lattes', 'The House in the Cerulean Sea', 'Howl\'s Moving Castle', 'A Psalm for the Wild-Built', 'The Goblin Emperor', 'Emily Wilde\'s Encyclopaedia', 'Sorcery of Thorns', 'Piranesi', 'The Ten Thousand Doors of January', 'The Invisible Library'],
    starter: ['A Psalm for the Wild-Built', 'The Goblin Emperor', 'Sorcery of Thorns', 'The House in the Cerulean Sea', 'Emily Wilde\'s Encyclopaedia', 'Howl\'s Moving Castle', 'Piranesi', 'The Invisible Library', 'Nettle & Bone', 'A Wizard\'s Guide to Defensive Baking'],
    hidden: ['The Very Secret Society of Irregular Witches', 'A Dark and Hollow Star', 'Emily Wilde\'s Encyclopaedia', 'The Invisible Library', 'Nettle & Bone', 'A Wizard\'s Guide to Defensive Baking', 'Sorcery of Thorns', 'The Starless Sea', 'Piranesi', 'The Ten Thousand Doors of January'],
  },
  litrpg: {
    best: ['Dungeon Crawler Carl', 'He Who Fights With Monsters', 'Primal Hunter', 'Cradle', 'Arcane Ascension', 'The Wandering Inn', 'Mother of Learning', 'Defiance of the Fall', 'Azarinth Healer', 'The Legend of Randidly Ghosthound'],
    starter: ['Arcane Ascension', 'Cradle', 'The Wandering Inn', 'Defiance of the Fall', 'Mother of Learning', 'He Who Fights With Monsters', 'Beware of Chicken', 'Jake\'s Magical Market', 'The Primal Hunter', 'Dungeon Crawler Carl'],
    hidden: ['Defiance of the Fall', 'Jake\'s Magical Market', 'Beware of Chicken', 'Azarinth Healer', 'The Legend of Randidly Ghosthound', 'Delve', 'Iron Prince', 'Mark of the Fool', 'The Path of Ascension', 'Bastion'],
  },
  'sci-fi': {
    best: ['Dune', 'Foundation', 'The Expanse', 'Ender\'s Game', 'Neuromancer', 'Snow Crash', 'Hyperion', 'The Left Hand of Darkness', 'The Martian', 'Project Hail Mary'],
    starter: ['Ender\'s Game', 'Ready Player One', 'Project Hail Mary', 'The Martian', 'Old Man\'s War', 'Leviathan Wakes', 'All Systems Red', 'Red Rising', 'The Forever War', 'Starship Troopers'],
    hidden: ['The Long Way to a Small, Angry Planet', 'Ancillary Justice', 'A Memory Called Empire', 'The Space Between Worlds', 'A Closed and Common Orbit', 'To Be Taught, If Fortunate', 'The Murderbot Diaries', 'Gideon the Ninth', 'An Unkindness of Ghosts', 'Light from Uncommon Stars'],
  },
};

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
  };

  const selectedCat = categories.find(c => c.slug === selectedCategory);
  const books = mockBooks[selectedCategory || 'general'];
  const categoryName = selectedCat?.name || 'Fantasy';

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`group relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-lg text-left ${
              selectedCategory === cat.slug ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity ${
              selectedCategory === cat.slug ? 'opacity-100' : ''
            }`}></div>
            <div className="relative">
              <div className="font-medium">{cat.name}</div>
              <div className="text-sm text-zinc-600">{cat.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 animate-fade-in" key={selectedCategory || 'general'}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {selectedCat ? selectedCat.name : 'Our Top Recommendations'}
          </h2>
          {selectedCat && (
            <a
              href={`/categories/${selectedCat.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              View full category →
            </a>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border bg-linear-to-br from-blue-50 to-indigo-50 p-5">
            <h3 className="font-semibold text-blue-900 mb-4">⭐ {categoryName} All-Time Greats</h3>
            <ol className="space-y-2">
              {books.best.map((book, i) => (
                <li key={i} className="text-sm text-zinc-700 flex items-start">
                  <span className="text-blue-600 mr-2 font-medium min-w-6">{i + 1}.</span>
                  {book}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border bg-linear-to-br from-green-50 to-emerald-50 p-5">
            <h3 className="font-semibold text-green-900 mb-4">🚀 Best {categoryName} to Start With</h3>
            <ol className="space-y-2">
              {books.starter.map((book, i) => (
                <li key={i} className="text-sm text-zinc-700 flex items-start">
                  <span className="text-green-600 mr-2 font-medium min-w-6">{i + 1}.</span>
                  {book}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border bg-linear-to-br from-amber-50 to-orange-50 p-5">
            <h3 className="font-semibold text-amber-900 mb-4">💎 {categoryName} Hidden Gems</h3>
            <ol className="space-y-2">
              {books.hidden.map((book, i) => (
                <li key={i} className="text-sm text-zinc-700 flex items-start">
                  <span className="text-amber-600 mr-2 font-medium min-w-6">{i + 1}.</span>
                  {book}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-linear-to-br from-violet-50 to-purple-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold text-violet-900">New Releases</h3>
            <span className="ml-auto text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">2023–2025</span>
          </div>
          <ol className="space-y-2">
            {newReleases[selectedCategory || 'general'].map((book, i) => (
              <li key={i} className="text-sm text-zinc-700 flex items-start">
                <span className="text-violet-500 mr-2 font-medium min-w-6">{i + 1}.</span>
                {book}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border bg-linear-to-br from-orange-50 to-amber-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔥</span>
            <h3 className="font-semibold text-orange-900">Trending Now</h3>
            <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">BookTok & Reddit</span>
          </div>
          <ol className="space-y-2">
            {trending[selectedCategory || 'general'].map((book, i) => (
              <li key={i} className="text-sm text-zinc-700 flex items-start">
                <span className="text-orange-500 mr-2 font-medium min-w-6">{i + 1}.</span>
                {book}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
