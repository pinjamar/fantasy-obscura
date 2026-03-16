import { useState } from 'react';
import Stars from './Stars';
import { PUBLIC_TROPES } from '../data/tropes';

type Book = {
  id: string;
  title: string;
  slug: string | null;
  authors: string[] | null;
  cover_url: string | null;
  synopsis: string | null;
  avg_rating: number | null;
  publication_year: number | null;
  subgenres: string[] | null;
  page_count: number | null;
  darkness_level: number | null;
  tropes: string[] | null;
};

type Filters = {
  tone?: string[];
  pacing?: string;
  magic_system?: string;
  heat_level?: string;
  subgenres?: string[];
  tropes?: string[];
  creatures?: string[];
  audience?: string;
  min_pages?: number;
  max_pages?: number;
  publication_era?: string;
  accessibility?: string;
  awards?: string;
  stakes?: string;
  pov_style?: string;
  pov_count?: string;
  protagonist_gender?: string;
  series_status?: string;
  series_min_length?: number;
  series_max_length?: number;
};

type VialOption = {
  label: string;
  icon: string;
  bg: string;
  hover: string;
  filters: Filters;
};

type Vial = {
  id: string;
  label: string;
  icon: string;
  border: string;
  titleColor: string;
  options: VialOption[];
};

// Sourced from src/data/tropes.ts — 69 canonical public tropes, sorted A–Z
const TROPES = PUBLIC_TROPES.map((t) => t.name).sort((a, b) => a.localeCompare(b));

const VIALS: Vial[] = [
  // Top row
  {
    id: 'mood',
    label: 'Mood Vial',
    icon: '⚗️',
    border: 'border-purple-200',
    titleColor: 'text-purple-900',
    options: [
      {
        label: 'Whimsical & Light',
        icon: '✨',
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        filters: { tone: ['Whimsical', 'Light-hearted', 'Humorous'] },
      },
      {
        label: 'Dark & Gritty',
        icon: '🌑',
        bg: 'bg-slate-50',
        hover: 'hover:bg-slate-100',
        filters: { tone: ['Grimdark', 'Dark & Serious'] },
      },
      {
        label: 'Adventurous',
        icon: '⚔️',
        bg: 'bg-amber-50',
        hover: 'hover:bg-amber-100',
        filters: { tone: ['Adventurous'] },
      },
    ],
  },
  {
    id: 'pacing',
    label: 'Pacing Elixir',
    icon: '🧉',
    border: 'border-blue-200',
    titleColor: 'text-blue-900',
    options: [
      {
        label: 'Fast & Intense',
        icon: '⚡',
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        filters: { pacing: 'Fast-paced' },
      },
      {
        label: 'Slow & Atmospheric',
        icon: '🌿',
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        filters: { pacing: 'Slow-burn' },
      },
      {
        label: 'Balanced Mix',
        icon: '🔄',
        bg: 'bg-yellow-50',
        hover: 'hover:bg-yellow-100',
        filters: { pacing: 'Mixed' },
      },
    ],
  },
  {
    id: 'magic',
    label: 'Magic Essence',
    icon: '🔮',
    border: 'border-rose-200',
    titleColor: 'text-rose-900',
    options: [
      {
        label: 'Soft & Mysterious',
        icon: '💫',
        bg: 'bg-rose-50',
        hover: 'hover:bg-rose-100',
        filters: { magic_system: 'Soft Magic' },
      },
      {
        label: 'Hard & Systematic',
        icon: '⚙️',
        bg: 'bg-indigo-50',
        hover: 'hover:bg-indigo-100',
        filters: { magic_system: 'Hard Magic' },
      },
      {
        label: 'No Magic',
        icon: '🚫',
        bg: 'bg-zinc-50',
        hover: 'hover:bg-zinc-100',
        filters: { magic_system: 'No Magic' },
      },
    ],
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: '👥',
    border: 'border-indigo-200',
    titleColor: 'text-indigo-900',
    options: [
      {
        label: 'Adult',
        icon: '🧑',
        bg: 'bg-indigo-50',
        hover: 'hover:bg-indigo-100',
        filters: { audience: 'Adult' },
      },
      {
        label: 'Young Adult (YA)',
        icon: '🧒',
        bg: 'bg-slate-50',
        hover: 'hover:bg-slate-100',
        filters: { audience: 'Young Adult (YA)' },
      },
      {
        label: 'Middle Grade',
        icon: '🧸',
        bg: 'bg-violet-50',
        hover: 'hover:bg-violet-100',
        filters: { audience: "Children's" },
      },
    ],
  },
  // Left column (middle row)
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: '📗',
    border: 'border-lime-200',
    titleColor: 'text-lime-900',
    options: [
      {
        label: 'Beginner-Friendly',
        icon: '🌱',
        bg: 'bg-lime-50',
        hover: 'hover:bg-lime-100',
        filters: { accessibility: 'beginner' },
      },
      {
        label: 'Intermediate',
        icon: '📘',
        bg: 'bg-emerald-50',
        hover: 'hover:bg-emerald-100',
        filters: { accessibility: 'intermediate' },
      },
      {
        label: 'Advanced / Dense',
        icon: '🎓',
        bg: 'bg-teal-50',
        hover: 'hover:bg-teal-100',
        filters: { accessibility: 'advanced' },
      },
    ],
  },
  // Right column (middle row)
  {
    id: 'format',
    label: 'Format',
    icon: '📏',
    border: 'border-orange-200',
    titleColor: 'text-orange-900',
    options: [
      {
        label: 'Standalone',
        icon: '📕',
        bg: 'bg-amber-50',
        hover: 'hover:bg-amber-100',
        filters: { series_status: 'standalone' },
      },
      {
        label: 'Duology / Trilogy / Tetralogy',
        icon: '📖',
        bg: 'bg-yellow-50',
        hover: 'hover:bg-yellow-100',
        filters: { series_min_length: 2, series_max_length: 4 },
      },
      {
        label: 'Long Series',
        icon: '📚',
        bg: 'bg-orange-50',
        hover: 'hover:bg-orange-100',
        filters: { series_min_length: 5 },
      },
    ],
  },
  {
    id: 'length-bucket',
    label: 'Length Bucket',
    icon: '📐',
    border: 'border-teal-200',
    titleColor: 'text-teal-900',
    options: [
      {
        label: 'Short (< 300 pages)',
        icon: '⚡',
        bg: 'bg-teal-50',
        hover: 'hover:bg-teal-100',
        filters: { max_pages: 299 },
      },
      {
        label: 'Standard (300–600)',
        icon: '📖',
        bg: 'bg-cyan-50',
        hover: 'hover:bg-cyan-100',
        filters: { min_pages: 300, max_pages: 600 },
      },
      {
        label: 'Epic (600+)',
        icon: '📚',
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        filters: { min_pages: 601 },
      },
    ],
  },
  // Bottom row
  {
    id: 'publication-era',
    label: 'Publication Era',
    icon: '📅',
    border: 'border-violet-200',
    titleColor: 'text-violet-900',
    options: [
      {
        label: 'Classic (Before 2000)',
        icon: '📜',
        bg: 'bg-violet-50',
        hover: 'hover:bg-violet-100',
        filters: { publication_era: 'classic' },
      },
      {
        label: 'Modern (2000-2015)',
        icon: '📗',
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        filters: { publication_era: 'modern' },
      },
      {
        label: 'Contemporary (2015+)',
        icon: '✨',
        bg: 'bg-fuchsia-50',
        hover: 'hover:bg-fuchsia-100',
        filters: { publication_era: 'contemporary' },
      },
    ],
  },
  {
    id: 'pov-style',
    label: 'POV Style',
    icon: '📝',
    border: 'border-fuchsia-200',
    titleColor: 'text-fuchsia-900',
    options: [
      {
        label: 'First Person',
        icon: '🗣️',
        bg: 'bg-fuchsia-50',
        hover: 'hover:bg-fuchsia-100',
        filters: { pov_style: 'First Person' },
      },
      {
        label: 'Third Person Limited',
        icon: '👤',
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        filters: { pov_style: 'Third Limited' },
      },
      {
        label: 'Omniscient',
        icon: '🌐',
        bg: 'bg-rose-50',
        hover: 'hover:bg-rose-100',
        filters: { pov_style: 'Omniscient' },
      },
    ],
  },
  {
    id: 'character',
    label: 'Character Lead',
    icon: '🧝',
    border: 'border-amber-200',
    titleColor: 'text-amber-900',
    options: [
      {
        label: 'Male Protagonist',
        icon: '⚔️',
        bg: 'bg-amber-50',
        hover: 'hover:bg-amber-100',
        filters: { protagonist_gender: 'Male' },
      },
      {
        label: 'Female Protagonist',
        icon: '👑',
        bg: 'bg-orange-50',
        hover: 'hover:bg-orange-100',
        filters: { protagonist_gender: 'Female' },
      },
      {
        label: 'Ensemble Cast',
        icon: '👥',
        bg: 'bg-zinc-50',
        hover: 'hover:bg-zinc-100',
        filters: { protagonist_gender: 'Ensemble' },
      },
    ],
  },
  {
    id: 'pov',
    label: 'POV Count',
    icon: '👁️',
    border: 'border-sky-200',
    titleColor: 'text-sky-900',
    options: [
      {
        label: 'Single POV',
        icon: '🧭',
        bg: 'bg-sky-50',
        hover: 'hover:bg-sky-100',
        filters: { pov_count: 'Single' },
      },
      {
        label: 'Dual POV',
        icon: '🔀',
        bg: 'bg-cyan-50',
        hover: 'hover:bg-cyan-100',
        filters: { pov_count: 'Dual' },
      },
      {
        label: 'Multiple POV',
        icon: '🧩',
        bg: 'bg-slate-50',
        hover: 'hover:bg-slate-100',
        filters: { pov_count: 'Multiple' },
      },
    ],
  },
  {
    id: 'awards',
    label: 'Recognitions',
    icon: '🏆',
    border: 'border-yellow-200',
    titleColor: 'text-yellow-900',
    options: [
      {
        label: 'Hugo Award',
        icon: '🚀',
        bg: 'bg-yellow-50',
        hover: 'hover:bg-yellow-100',
        filters: { awards: 'hugo-winner' },
      },
      {
        label: 'Nebula Award',
        icon: '⭐',
        bg: 'bg-amber-50',
        hover: 'hover:bg-amber-100',
        filters: { awards: 'nebula-winner' },
      },
      {
        label: 'Goodreads Choice',
        icon: '📗',
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        filters: { awards: 'goodreads-winner' },
      },
    ],
  },
  // Extra row
  {
    id: 'world',
    label: 'World Scope',
    icon: '🗺️',
    border: 'border-emerald-200',
    titleColor: 'text-emerald-900',
    options: [
      {
        label: 'Epic Worldbuilding',
        icon: '🌍',
        bg: 'bg-emerald-50',
        hover: 'hover:bg-emerald-100',
        filters: { subgenres: ['Epic Fantasy', 'High Fantasy'] },
      },
      {
        label: 'Intimate & Small',
        icon: '🏘️',
        bg: 'bg-teal-50',
        hover: 'hover:bg-teal-100',
        filters: { subgenres: ['Cozy Fantasy', 'Humorous Fantasy'] },
      },
      {
        label: 'Urban / Modern',
        icon: '🏙️',
        bg: 'bg-cyan-50',
        hover: 'hover:bg-cyan-100',
        filters: { subgenres: ['Urban Fantasy', 'Contemporary Fantasy'] },
      },
    ],
  },
  {
    id: 'setting-type',
    label: 'Setting Type',
    icon: '🌐',
    border: 'border-cyan-200',
    titleColor: 'text-cyan-900',
    options: [
      {
        label: 'Secondary World',
        icon: '🌍',
        bg: 'bg-cyan-50',
        hover: 'hover:bg-cyan-100',
        filters: { subgenres: ['Epic Fantasy', 'High Fantasy'] },
      },
      {
        label: 'Portal Fantasy',
        icon: '🚪',
        bg: 'bg-sky-50',
        hover: 'hover:bg-sky-100',
        filters: { tropes: ['Portal Fantasy'] },
      },
      {
        label: 'Earth-based',
        icon: '🏙️',
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        filters: { subgenres: ['Urban Fantasy', 'Contemporary Fantasy'] },
      },
    ],
  },
  {
    id: 'time-inspiration',
    label: 'Time Inspiration',
    icon: '🏛️',
    border: 'border-amber-200',
    titleColor: 'text-amber-900',
    options: [
      {
        label: 'Ancient-Inspired',
        icon: '🏺',
        bg: 'bg-amber-50',
        hover: 'hover:bg-amber-100',
        filters: { subgenres: ['Mythic Fantasy', 'Historical Fantasy'] },
      },
      {
        label: 'Medieval-Inspired',
        icon: '🏰',
        bg: 'bg-stone-50',
        hover: 'hover:bg-stone-100',
        filters: { subgenres: ['Epic Fantasy', 'High Fantasy'] },
      },
      {
        label: 'Modern-Inspired',
        icon: '🌆',
        bg: 'bg-sky-50',
        hover: 'hover:bg-sky-100',
        filters: { subgenres: ['Urban Fantasy', 'Contemporary Fantasy'] },
      },
    ],
  },
  {
    id: 'stakes',
    label: 'Stakes Level',
    icon: '⚡',
    border: 'border-red-200',
    titleColor: 'text-red-900',
    options: [
      {
        label: 'Personal',
        icon: '👤',
        bg: 'bg-red-50',
        hover: 'hover:bg-red-100',
        filters: { stakes: 'personal' },
      },
      {
        label: 'Kingdom-level',
        icon: '🏰',
        bg: 'bg-rose-50',
        hover: 'hover:bg-rose-100',
        filters: { stakes: 'kingdom' },
      },
      {
        label: 'World-ending',
        icon: '💥',
        bg: 'bg-orange-50',
        hover: 'hover:bg-orange-100',
        filters: { stakes: 'world' },
      },
    ],
  },
];

const CREATURE_OPTIONS: { value: string; label: string; filters: Filters }[] = [
  { value: '',            label: 'Any creature / race',  filters: {} },
  { value: 'angel',       label: '👼 Angels',            filters: { creatures: ['angel'] } },
  { value: 'beastfolk',   label: '🦁 Beastfolk',         filters: { creatures: ['beastfolk'] } },
  { value: 'catfolk',     label: '🐱 Catfolk',           filters: { creatures: ['catfolk'] } },
  { value: 'centaur',     label: '🐴 Centaurs',          filters: { creatures: ['centaur'] } },
  { value: 'demon',       label: '😈 Demons',            filters: { creatures: ['demon'] } },
  { value: 'devil',       label: '👿 Devils',            filters: { creatures: ['devil'] } },
  { value: 'dragonkin',   label: '🦎 Dragonkin',         filters: { creatures: ['dragonkin'] } },
  { value: 'dragon',      label: '🐉 Dragons',           filters: { creatures: ['dragon'] } },
  { value: 'dryad',       label: '🌳 Dryads',            filters: { creatures: ['dryad'] } },
  { value: 'dwarf',       label: '⛏️ Dwarves',           filters: { creatures: ['dwarf'] } },
  { value: 'elf',         label: '🧝 Elves',             filters: { creatures: ['elf'] } },
  { value: 'fae',         label: '🧚 Fae',               filters: { creatures: ['fae'] } },
  { value: 'giant',       label: '🗿 Giants',             filters: { creatures: ['giant'] } },
  { value: 'ghost',       label: '👻 Ghosts',            filters: { creatures: ['ghost'] } },
  { value: 'goblin',      label: '👺 Goblins',           filters: { creatures: ['goblin'] } },
  { value: 'halfling',    label: '🦶 Halflings',          filters: { creatures: ['halfling'] } },
  { value: 'lich',        label: '💀 Liches',            filters: { creatures: ['lich'] } },
  { value: 'mermaid',     label: '🧜 Mermaids',          filters: { creatures: ['mermaid'] } },
  { value: 'minotaur',    label: '🐂 Minotaurs',         filters: { creatures: ['minotaur'] } },
  { value: 'nymph',       label: '🌊 Nymphs',            filters: { creatures: ['nymph'] } },
  { value: 'ogre',        label: '🦴 Ogres',             filters: { creatures: ['ogre'] } },
  { value: 'orc',         label: '🪓 Orcs',              filters: { creatures: ['orc'] } },
  { value: 'satyr',       label: '🐐 Satyrs',            filters: { creatures: ['satyr'] } },
  { value: 'shapeshifter',label: '🦊 Shapeshifters',     filters: { creatures: ['shapeshifter'] } },
  { value: 'troll',       label: '👹 Trolls',            filters: { creatures: ['troll'] } },
  { value: 'vampire',     label: '🧛 Vampires',          filters: { creatures: ['vampire'] } },
  { value: 'werewolf',    label: '🐺 Werewolves',        filters: { creatures: ['werewolf'] } },
  { value: 'zombie',      label: '🧟 Zombies',           filters: { creatures: ['zombie'] } },
];

const CONTENT_WARNINGS = [
  { id: 'sexual-content',        label: 'Sexual content',        icon: '🔞' },
  { id: 'graphic-violence',      label: 'Graphic violence',      icon: '🩸' },
  { id: 'child-death',           label: 'Child death',           icon: '💔' },
  { id: 'animal-death',          label: 'Animal death',          icon: '🐾' },
  { id: 'abuse',                 label: 'Abuse / manipulation',  icon: '⚠️' },
  { id: 'sexual-assault',        label: 'Sexual assault',        icon: '🚫' },
  { id: 'torture',               label: 'Torture',               icon: '🔪' },
  { id: 'suicide',               label: 'Suicide / self-harm',   icon: '🌊' },
  { id: 'addiction',             label: 'Addiction',             icon: '💊' },
  { id: 'war',                   label: 'War / genocide',        icon: '⚔️' },
  { id: 'slavery',               label: 'Slavery',               icon: '⛓️' },
  { id: 'psychological-trauma',  label: 'Psychological trauma',  icon: '🧠' },
];

const DARKNESS_LEVELS = [
  {
    level: 1,
    candles: '🕯️',
    label: 'Lighthearted',
    desc: 'Cozy, low stakes and emotionally safe',
    subgenres: ['Cozy Fantasy'],
    tone: ['Whimsical', 'Light-hearted'],
  },
  {
    level: 2,
    candles: '🕯️🕯️',
    label: 'Mild',
    desc: 'Some danger and tension, but generally safe in tone',
    subgenres: [],
    tone: ['Light-hearted'],
  },
  {
    level: 3,
    candles: '🕯️🕯️🕯️',
    label: 'Serious',
    desc: 'Death, violence and emotional weight are present',
    subgenres: [],
    tone: [],
  },
  {
    level: 4,
    candles: '🕯️🕯️🕯️🕯️',
    label: 'Dark',
    desc: 'Violence, trauma and morally harsh outcomes',
    subgenres: ['Dark Fantasy'],
    tone: ['Dark & Serious'],
  },
  {
    level: 5,
    candles: '🕯️🕯️🕯️🕯️🕯️',
    label: 'Brutal',
    desc: 'Extreme violence and suffering, no mercy',
    subgenres: ['Grimdark'],
    tone: [],
  },
];

const HEAT_LEVELS = [
  { value: 'Sweet Romance',     flames: '🔥',           label: 'Sweet / Clean',     desc: 'Kisses only; focus on emotional connection' },
  { value: 'Closed Door',       flames: '🔥🔥',         label: 'Fade to Black',     desc: 'Tension is there, but we leave before the clothes do' },
  { value: 'Open Door',         flames: '🔥🔥🔥',       label: 'Open Door',         desc: "Explicit scenes, but they don't dominate" },
  { value: 'Explicit',          flames: '🔥🔥🔥🔥',     label: 'Explicit / Spicy',  desc: 'Graphic detail and high frequency' },
  { value: 'Fiery',             flames: '🔥🔥🔥🔥🔥',   label: 'Fiery / Primal',    desc: 'Extreme heat, often including kink' },
];

const CATEGORY_OPTIONS: {
  value: string;
  label: string;
  subgenres: string[];
}[] = [
  { value: '', label: 'Any category', subgenres: [] },
  { value: 'epic',             label: '⚔️ Epic & High Fantasy',   subgenres: ['Epic Fantasy', 'High Fantasy'] },
  { value: 'romantasy',        label: '🌹 Romantasy',              subgenres: ['Romantic Fantasy'] },
  { value: 'swords',           label: '🗡️ Sword & Sorcery',       subgenres: ['Sword & Sorcery'] },
  { value: 'dark',             label: '🌑 Dark Fantasy',           subgenres: ['Dark Fantasy', 'Horror Fantasy'] },
  { value: 'urban',            label: '🌆 Urban / Contemporary',   subgenres: ['Urban Fantasy', 'Contemporary Fantasy'] },
  { value: 'grimdark',         label: '💀 Grimdark',               subgenres: ['Grimdark', 'War Fantasy'] },
  { value: 'historical',       label: '📜 Historical Fantasy',     subgenres: ['Historical Fantasy'] },
  { value: 'academy',          label: '🎓 Academy Fantasy',        subgenres: ['Academy Fantasy'] },
  { value: 'mythology',        label: '🏺 Mythic / Folklore',      subgenres: ['Mythic Fantasy', 'Folklore Fantasy'] },
  { value: 'cozy',             label: '☕ Cozy Fantasy',           subgenres: ['Cozy Fantasy', 'Humorous Fantasy'] },
  { value: 'litrpg',           label: '🎮 LitRPG / Progression',   subgenres: ['LitRPG', 'Progression Fantasy'] },
  { value: 'science-fantasy',  label: '🔭 Science Fantasy',        subgenres: ['Science Fantasy', 'Steampunk Fantasy'] },
];

const TOP = VIALS.slice(0, 4);
const LEFT = VIALS.slice(4, 6);
const RIGHT = VIALS.slice(6, 8);
const BOTTOM = VIALS.slice(8, 12);
const EXTRA = VIALS.slice(12, 16);

export default function AlchemyTable() {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [selectedTropes, setSelectedTropes] = useState<string[]>([]);
  const [selectedCreature, setSelectedCreature] = useState('');
  const [darknessLevel, setDarknessLevel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [excludedWarnings, setExcludedWarnings] = useState<string[]>([]);
  const [seriesStatus, setSeriesStatus] = useState<'completed' | 'ongoing' | ''>('');
  const [startersOnly, setStartersOnly] = useState(false);
  const [heatLevel, setHeatLevel] = useState('');

  const toggleWarning = (id: string) => {
    setExcludedWarnings((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  };
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [bookIndex, setBookIndex] = useState(0);
  const [error, setError] = useState('');

  const toggle = (vialId: string, optIdx: number) => {
    setSelections((prev) => {
      if (prev[vialId] === optIdx) {
        const next = { ...prev };
        delete next[vialId];
        return next;
      }
      return { ...prev, [vialId]: optIdx };
    });
  };

  const toggleTrope = (trope: string) => {
    setSelectedTropes((prev) =>
      prev.includes(trope) ? prev.filter((t) => t !== trope) : [...prev, trope],
    );
  };

  const transmute = async () => {
    setStatus('loading');
    setBooks([]);
    setBookIndex(0);
    setError('');

    const merged: Filters = {};

    for (const [vialId, optIdx] of Object.entries(selections)) {
      const vial = VIALS.find((v) => v.id === vialId);
      if (!vial) continue;
      const f = vial.options[optIdx]?.filters;
      if (!f) continue;

      if (f.tone?.length) merged.tone = [...(merged.tone || []), ...f.tone];
      if (f.pacing) merged.pacing = f.pacing;
      if (f.magic_system) merged.magic_system = f.magic_system;
      if (f.heat_level) merged.heat_level = f.heat_level;
      if (f.subgenres?.length)
        merged.subgenres = [...(merged.subgenres || []), ...f.subgenres];
      if (f.tropes?.length)
        merged.tropes = [...(merged.tropes || []), ...f.tropes];
      if (f.audience) merged.audience = f.audience;
      if (f.min_pages !== undefined) merged.min_pages = f.min_pages;
      if (f.max_pages !== undefined) merged.max_pages = f.max_pages;
      if (f.publication_era) merged.publication_era = f.publication_era;
      if (f.accessibility) merged.accessibility = f.accessibility;
      if (f.awards) merged.awards = f.awards;
      if (f.stakes) merged.stakes = f.stakes;
      if (f.pov_style) merged.pov_style = f.pov_style;
      if (f.pov_count) merged.pov_count = f.pov_count;
      if (f.protagonist_gender) merged.protagonist_gender = f.protagonist_gender;
      if (f.series_status) merged.series_status = f.series_status;
      if (f.series_min_length !== undefined) merged.series_min_length = f.series_min_length;
      if (f.series_max_length !== undefined) merged.series_max_length = f.series_max_length;
    }

    // Add selected tropes
    if (selectedTropes.length) {
      merged.tropes = [...(merged.tropes || []), ...selectedTropes];
    }

    // Add creature filter
    const creatureFilter = CREATURE_OPTIONS.find(
      (o) => o.value === selectedCreature,
    )?.filters;
    if (creatureFilter?.creatures?.length) {
      merged.creatures = [...(merged.creatures || []), ...creatureFilter.creatures];
    }

    // Add heat level filter
    if (heatLevel) merged.heat_level = heatLevel;

    // Add darkness filter
    if (darknessLevel > 0) {
      const dl = DARKNESS_LEVELS.find((d) => d.level === darknessLevel);
      if (dl) {
        if (dl.subgenres.length)
          merged.subgenres = [...(merged.subgenres || []), ...dl.subgenres];
        if (dl.tone.length) merged.tone = [...(merged.tone || []), ...dl.tone];
      }
    }

    // Add category filter
    const catOption = CATEGORY_OPTIONS.find(
      (c) => c.value === selectedCategory,
    );
    if (catOption?.subgenres.length) {
      merged.subgenres = [...(merged.subgenres || []), ...catOption.subgenres];
    }

    const params = new URLSearchParams();
    merged.tone?.forEach((t) => params.append('tone', t));
    if (merged.pacing) params.set('pacing', merged.pacing);
    if (merged.magic_system) params.set('magic_system', merged.magic_system);
    if (merged.heat_level) params.set('heat_level', merged.heat_level);
    merged.subgenres?.forEach((s) => params.append('subgenres', s));
    merged.tropes?.forEach((t) => params.append('tropes', t));
    merged.creatures?.forEach((c) => params.append('creatures', c));
    if (merged.audience) params.set('audience', merged.audience);
    if (merged.min_pages !== undefined)
      params.set('min_pages', String(merged.min_pages));
    if (merged.max_pages !== undefined)
      params.set('max_pages', String(merged.max_pages));
    if (merged.publication_era)
      params.set('publication_era', merged.publication_era);

    if (merged.accessibility) params.set('accessibility', merged.accessibility);
    if (merged.awards) params.set('awards', merged.awards);
    if (merged.stakes) params.set('stakes', merged.stakes);
    if (merged.pov_style) params.set('pov_style', merged.pov_style);
    if (merged.pov_count) params.set('pov_count', merged.pov_count);
    if (merged.protagonist_gender) params.set('protagonist_gender', merged.protagonist_gender);

    excludedWarnings.forEach((w) => params.append('exclude_warning', w));
    const effectiveSeriesStatus = merged.series_status || seriesStatus;
    if (effectiveSeriesStatus)
      params.set('series_status', effectiveSeriesStatus);
    if (merged.series_min_length !== undefined)
      params.set('series_min_length', String(merged.series_min_length));
    if (merged.series_max_length !== undefined)
      params.set('series_max_length', String(merged.series_max_length));
    if (startersOnly) params.set('starters_only', '1');

    try {
      const res = await fetch(`/api/craft?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setStatus('error');
        return;
      }

      const shuffled = [...data.books].sort(() => Math.random() - 0.5);
      setBooks(shuffled);
      setStatus('done');
    } catch {
      setError('Failed to connect to the library');
      setStatus('error');
    }
  };

  const currentBook = books[bookIndex] || null;
  const hasMore = books.length > 1;

  const nextBook = () => {
    setBookIndex((prev) => (prev + 1) % books.length);
  };

  const VialCard = ({ vial }: { vial: Vial }) => (
    <div
      className={`bg-white/80 backdrop-blur rounded-xl border-2 ${vial.border} p-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{vial.icon}</span>
        <h3 className={`font-semibold ${vial.titleColor}`}>{vial.label}</h3>
      </div>
      <div className="space-y-2">
        {vial.options.map((opt, idx) => {
          const isSelected = selections[vial.id] === idx;
          return (
            <button
              key={idx}
              onClick={() => toggle(vial.id, idx)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                isSelected
                  ? `${opt.bg} ring-2 ring-inset ring-zinc-400 font-medium`
                  : `${opt.bg} ${opt.hover}`
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
              {isSelected && <span className="ml-auto text-xs">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  const TransmuteSquare = () => (
    <div className="w-full max-w-sm min-h-105 rounded-2xl border-2 border-dashed border-amber-300 bg-white/70 backdrop-blur p-5 shadow-inner flex flex-col">
      <div className="flex-1">
        {status === 'idle' && (
          <div className="h-52 w-full rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 text-5xl">
            📖
          </div>
        )}
        {status === 'loading' && (
          <div className="h-52 w-full rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <span className="text-amber-500 text-sm animate-pulse">
              ⚗️ Transmuting...
            </span>
          </div>
        )}
        {status === 'done' && !currentBook && (
          <div className="h-52 w-full rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center p-4 text-center">
            <div>
              <p className="text-amber-700 font-medium">No books match</p>
              <p className="text-amber-600 text-xs mt-1">
                Try different ingredients
              </p>
            </div>
          </div>
        )}
        {status === 'done' && currentBook && (
          <div className="space-y-3">
            <div className="flex gap-3 w-fit mx-auto">
              {currentBook.cover_url ? (
                <img
                  src={currentBook.cover_url}
                  alt={currentBook.title}
                  className="w-20 shrink-0 rounded-lg object-cover shadow-md self-start"
                />
              ) : (
                <div className="w-20 h-28 shrink-0 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">
                  📖
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm leading-tight">
                  {currentBook.title}
                </h3>
                {currentBook.series && (
                  <p className="text-xs text-zinc-400 mt-0.5">
                    ({currentBook.series}{currentBook.series_number != null && ` #${currentBook.series_number}`})
                  </p>
                )}
                {currentBook.authors?.length && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {currentBook.authors.join(', ')}
                  </p>
                )}
                {currentBook.avg_rating && (
                  <p className="text-xs text-amber-600 mt-0.5">
                    <Stars rating={currentBook.avg_rating} />  {currentBook.avg_rating.toFixed(2)}
                  </p>
                )}
                {currentBook.darkness_level != null && currentBook.darkness_level >= 1 && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {'🕯️'.repeat(currentBook.darkness_level)}{' '}
                    {['', 'Lighthearted', 'Mild', 'Serious', 'Dark', 'Brutal'][currentBook.darkness_level]}
                  </p>
                )}
                {currentBook.tropes && currentBook.tropes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentBook.tropes.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {currentBook.synopsis && (
              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-4">
                {currentBook.synopsis}
              </p>
            )}
            {currentBook.subgenres?.length && (
              <div className="flex flex-wrap gap-1">
                {currentBook.subgenres.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {currentBook.slug && (
              <a
                href={`/books/${currentBook.slug}`}
                className="text-xs text-amber-700 hover:text-amber-900 underline"
              >
                View full details →
              </a>
            )}
          </div>
        )}
        {status === 'error' && (
          <div className="h-52 w-full rounded-xl bg-red-50 border border-red-200 flex items-center justify-center p-4 text-center">
            <p className="text-red-700 font-medium text-sm">⚠️ {error}</p>
          </div>
        )}
      </div>

      {status === 'idle' && (
        <p className="text-xs text-amber-700 text-center mt-3">
          Select ingredients and transmute
        </p>
      )}
      {status === 'done' && currentBook && hasMore && (
        <p className="text-xs text-amber-600 text-center mt-2">
          {books.length} books match · #{bookIndex + 1}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={transmute}
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
        >
          <span className="text-lg">✨</span>
          {status === 'loading' ? 'Transmuting...' : 'Transmute Book'}
          <span className="text-lg">✨</span>
        </button>
        {status === 'done' && hasMore && (
          <button
            onClick={nextBook}
            className="text-sm text-amber-700 hover:text-amber-900 underline text-center py-1"
          >
            Try another →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Creatures / Category / Series Status  |  Darkness Level  |  Heat Level */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">

        {/* Left column: 3 compact filters stacked */}
        <div className="flex flex-col gap-3 h-full">
          {/* Category */}
          <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-violet-200 px-4 py-3 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📂</span>
              <h3 className="font-semibold text-violet-900 text-sm">Category</h3>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-violet-200 bg-violet-50 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Creatures & Races */}
          <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-sky-200 px-4 py-3 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🐉</span>
              <h3 className="font-semibold text-sky-900 text-sm">Creatures & Races</h3>
            </div>
            <select
              value={selectedCreature}
              onChange={(e) => setSelectedCreature(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-sky-200 bg-sky-50 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {CREATURE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Series status toggle */}
          <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-zinc-200 px-4 py-3 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <span className="text-sm font-semibold text-zinc-700">Series Status</span>
            </div>
            <div className="flex gap-2">
              {(['completed', 'ongoing'] as const).map((val) => (
                <button
                  key={val}
                  onClick={() => setSeriesStatus(seriesStatus === val ? '' : val)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    seriesStatus === val
                      ? 'bg-zinc-800 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {val === 'completed' ? '✅ Completed' : '🔄 Ongoing'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStartersOnly(!startersOnly)}
              className={`mt-2 text-xs transition-colors ${startersOnly ? 'text-zinc-800 font-medium' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              {startersOnly ? '✓ ' : ''}series starters only
            </button>
          </div>
        </div>

        {/* Right column: Darkness Level */}
        <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🕯️</span>
            <h3 className="font-semibold text-zinc-900">Darkness Level</h3>
          </div>
          <div className="space-y-1.5">
            {DARKNESS_LEVELS.map((dl) => (
              <button
                key={dl.level}
                onClick={() =>
                  setDarknessLevel(darknessLevel === dl.level ? 0 : dl.level)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-start gap-2 ${
                  darknessLevel === dl.level
                    ? 'bg-zinc-100 ring-2 ring-inset ring-zinc-400 font-medium'
                    : 'bg-zinc-50 hover:bg-zinc-100'
                }`}
              >
                <span className="shrink-0 leading-tight">{dl.candles}</span>
                <span>
                  <span className="font-semibold text-zinc-800">{dl.label}</span>
                  <span className="text-zinc-500 ml-1">— {dl.desc}</span>
                </span>
                {darknessLevel === dl.level && (
                  <span className="ml-auto shrink-0">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Heat Level */}
        <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-pink-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🔥</span>
            <h3 className="font-semibold text-pink-900">Heat Level</h3>
          </div>
          <div className="space-y-1.5">
            {HEAT_LEVELS.map((hl) => (
              <button
                key={hl.value}
                onClick={() => setHeatLevel(heatLevel === hl.value ? '' : hl.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-start gap-2 ${
                  heatLevel === hl.value
                    ? 'bg-pink-50 ring-2 ring-inset ring-pink-400 font-medium'
                    : 'bg-zinc-50 hover:bg-pink-50'
                }`}
              >
                <span className="shrink-0 leading-tight">{hl.flames}</span>
                <span>
                  <span className="font-semibold text-zinc-800">{hl.label}</span>
                  <span className="text-zinc-500 ml-1">— {hl.desc}</span>
                </span>
                {heatLevel === hl.value && (
                  <span className="ml-auto shrink-0">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TOP.map((v) => (
          <VialCard key={v.id} vial={v} />
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-stretch">
        <div className="grid gap-6 order-1 lg:order-1">
          {LEFT.map((v) => (
            <VialCard key={v.id} vial={v} />
          ))}
        </div>

        <div className="hidden lg:flex items-stretch justify-center order-last lg:order-2">
          <TransmuteSquare />
        </div>

        <div className="grid gap-6 order-2 lg:order-3">
          {RIGHT.map((v) => (
            <VialCard key={v.id} vial={v} />
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BOTTOM.map((v) => (
          <VialCard key={v.id} vial={v} />
        ))}
      </div>

      {/* Content Warnings */}
      <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-red-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚠️</span>
          <h3 className="font-semibold text-red-900">Content Warnings</h3>
          <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full ml-auto">
            Exclude from results
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CONTENT_WARNINGS.map((w) => {
            const isOn = excludedWarnings.includes(w.id);
            return (
              <button
                key={w.id}
                onClick={() => toggleWarning(w.id)}
                className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                  isOn
                    ? 'bg-red-100 text-red-900 ring-2 ring-inset ring-red-400 font-medium'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                <span>{w.icon}</span>
                {w.label}
                {isOn && ' ✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Extra Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {EXTRA.map((v) => (
          <VialCard key={v.id} vial={v} />
        ))}
      </div>

      {/* Trope Picker */}
      <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-indigo-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏷️</span>
          <h3 className="font-semibold text-indigo-900">Pick a Trope</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {TROPES.map((trope) => {
            const isSelected = selectedTropes.includes(trope);
            return (
              <button
                key={trope}
                onClick={() => toggleTrope(trope)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  isSelected
                    ? 'bg-indigo-100 text-indigo-900 ring-2 ring-inset ring-indigo-400 font-medium'
                    : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {trope}
                {isSelected && ' ✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Transmutation Square */}
      <div className="flex lg:hidden items-stretch justify-center">
        <TransmuteSquare />
      </div>
    </div>
  );
}
