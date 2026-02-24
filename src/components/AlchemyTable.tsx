import { useState } from 'react';

type Book = {
  id: string;
  title: string;
  authors: string[] | null;
  cover_url: string | null;
  synopsis: string | null;
  avg_rating: number | null;
  publication_year: number | null;
  subgenres: string[] | null;
  page_count: number | null;
};

type Filters = {
  tone?: string[];
  pacing?: string;
  magic_system?: string;
  heat_level?: string;
  subgenres?: string[];
  tropes?: string[];
  audience?: string;
  min_pages?: number;
  max_pages?: number;
  publication_era?: string;
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

// Tropes derived from the actual book database
const TROPES = [
  'Anti-Hero',
  'Betrayal',
  'Chosen One',
  'Coming of Age',
  'Curse Breaking',
  'Dark Lord',
  'Dragon Riders',
  'Dragons',
  'Enemies to Lovers',
  'Fae Court Drama',
  'Forbidden Romance',
  'Found Family',
  'Heist',
  'Magic Academy',
  'Mentor',
  'Mentor Dies',
  'Moral Ambiguity',
  'Political Intrigue',
  'Portal Fantasy',
  'Prophecy',
  'Quest',
  'Reluctant Hero',
  'Revenge Plot',
  'Secret Identity',
  'Slow Burn',
  'Survival',
  'Tournament Arc',
  'War',
];

const VIALS: Vial[] = [
  // Top row
  {
    id: 'mood',
    label: 'Mood Vial',
    icon: '⚗️',
    border: 'border-purple-200',
    titleColor: 'text-purple-900',
    options: [
      { label: 'Whimsical & Light', icon: '✨', bg: 'bg-purple-50', hover: 'hover:bg-purple-100', filters: { tone: ['Whimsical', 'Light-hearted', 'Humorous'] } },
      { label: 'Dark & Gritty', icon: '🌑', bg: 'bg-slate-50', hover: 'hover:bg-slate-100', filters: { tone: ['Grimdark', 'Dark & Serious'] } },
      { label: 'Action-packed', icon: '⚔️', bg: 'bg-amber-50', hover: 'hover:bg-amber-100', filters: { tone: ['Action-packed'] } },
    ],
  },
  {
    id: 'pacing',
    label: 'Pacing Elixir',
    icon: '🧉',
    border: 'border-blue-200',
    titleColor: 'text-blue-900',
    options: [
      { label: 'Fast & Intense', icon: '⚡', bg: 'bg-blue-50', hover: 'hover:bg-blue-100', filters: { pacing: 'Fast-paced' } },
      { label: 'Slow & Atmospheric', icon: '🌿', bg: 'bg-green-50', hover: 'hover:bg-green-100', filters: { pacing: 'Slow-burn' } },
      { label: 'Balanced Mix', icon: '🔄', bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', filters: { pacing: 'Mixed' } },
    ],
  },
  {
    id: 'magic',
    label: 'Magic Essence',
    icon: '🔮',
    border: 'border-rose-200',
    titleColor: 'text-rose-900',
    options: [
      { label: 'Soft & Mysterious', icon: '💫', bg: 'bg-rose-50', hover: 'hover:bg-rose-100', filters: { magic_system: 'Soft Magic' } },
      { label: 'Hard & Systematic', icon: '⚙️', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', filters: { magic_system: 'Hard Magic' } },
      { label: 'No Magic', icon: '🚫', bg: 'bg-zinc-50', hover: 'hover:bg-zinc-100', filters: { magic_system: 'No Magic' } },
    ],
  },
  {
    id: 'romance',
    label: 'Romance Potion',
    icon: '💕',
    border: 'border-pink-200',
    titleColor: 'text-pink-900',
    options: [
      { label: 'Spicy & Central', icon: '🔥', bg: 'bg-pink-50', hover: 'hover:bg-pink-100', filters: { heat_level: 'Spicy' } },
      { label: 'Sweet Subplot', icon: '💐', bg: 'bg-rose-50', hover: 'hover:bg-rose-100', filters: { heat_level: 'Fade to Black' } },
      { label: 'None / Minimal', icon: '❄️', bg: 'bg-zinc-50', hover: 'hover:bg-zinc-100', filters: { heat_level: 'Clean' } },
    ],
  },
  // Left column (middle row)
  {
    id: 'world',
    label: 'World Scope',
    icon: '🗺️',
    border: 'border-emerald-200',
    titleColor: 'text-emerald-900',
    options: [
      { label: 'Epic Worldbuilding', icon: '🌍', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', filters: { subgenres: ['Epic Fantasy', 'High Fantasy'] } },
      { label: 'Intimate & Small', icon: '🏘️', bg: 'bg-teal-50', hover: 'hover:bg-teal-100', filters: { subgenres: ['Cozy Fantasy', 'Low Fantasy'] } },
      { label: 'Urban / Modern', icon: '🏙️', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', filters: { subgenres: ['Urban Fantasy', 'Contemporary Fantasy'] } },
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
      { label: 'Epic Series', icon: '📚', bg: 'bg-orange-50', hover: 'hover:bg-orange-100', filters: { min_pages: 600 } },
      { label: 'Trilogy / Tetralogy', icon: '📖', bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', filters: { min_pages: 300, max_pages: 599 } },
      { label: 'Standalone', icon: '📕', bg: 'bg-amber-50', hover: 'hover:bg-amber-100', filters: { max_pages: 450 } },
    ],
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: '👥',
    border: 'border-indigo-200',
    titleColor: 'text-indigo-900',
    options: [
      { label: 'Adult', icon: '🧑', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', filters: { audience: 'Adult' } },
      { label: 'Young Adult (YA)', icon: '🧒', bg: 'bg-slate-50', hover: 'hover:bg-slate-100', filters: { audience: 'Young Adult (YA)' } },
      { label: "Children's", icon: '🧸', bg: 'bg-violet-50', hover: 'hover:bg-violet-100', filters: { audience: "Children's" } },
    ],
  },
  // Bottom row
  {
    id: 'length-bucket',
    label: 'Length Bucket',
    icon: '📐',
    border: 'border-teal-200',
    titleColor: 'text-teal-900',
    options: [
      { label: 'Quick Read (< 300 pages)', icon: '⚡', bg: 'bg-teal-50', hover: 'hover:bg-teal-100', filters: { max_pages: 300 } },
      { label: 'Standard (300-500)', icon: '📖', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', filters: { min_pages: 300, max_pages: 500 } },
      { label: 'Epic (500+)', icon: '📚', bg: 'bg-blue-50', hover: 'hover:bg-blue-100', filters: { min_pages: 500 } },
    ],
  },
  {
    id: 'setting',
    label: 'Setting Crucible',
    icon: '🏰',
    border: 'border-fuchsia-200',
    titleColor: 'text-fuchsia-900',
    options: [
      { label: 'Wilderness', icon: '🏔️', bg: 'bg-fuchsia-50', hover: 'hover:bg-fuchsia-100', filters: { subgenres: ['Epic Fantasy'] } },
      { label: 'Court & City', icon: '🏛️', bg: 'bg-purple-50', hover: 'hover:bg-purple-100', filters: { tropes: ['Political Intrigue', 'Fae Court Drama'] } },
      { label: 'Academy / Lab', icon: '🧪', bg: 'bg-rose-50', hover: 'hover:bg-rose-100', filters: { tropes: ['Magic Academy'] } },
    ],
  },
  {
    id: 'character',
    label: 'Character Focus',
    icon: '🧝',
    border: 'border-amber-200',
    titleColor: 'text-amber-900',
    options: [
      { label: "Hero's Journey", icon: '🗡️', bg: 'bg-amber-50', hover: 'hover:bg-amber-100', filters: { tropes: ['Chosen One', 'Quest'] } },
      { label: 'Rogues & Outcasts', icon: '🕵️', bg: 'bg-orange-50', hover: 'hover:bg-orange-100', filters: { tropes: ['Heist', 'Reluctant Hero'] } },
      { label: 'Villain Lead', icon: '👑', bg: 'bg-zinc-50', hover: 'hover:bg-zinc-100', filters: { tropes: ['Betrayal'] } },
    ],
  },
  {
    id: 'pov',
    label: 'POV Lens',
    icon: '👁️',
    border: 'border-sky-200',
    titleColor: 'text-sky-900',
    options: [
      { label: 'Single POV', icon: '🧭', bg: 'bg-sky-50', hover: 'hover:bg-sky-100', filters: {} },
      { label: 'Multiple POVs', icon: '🧩', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', filters: {} },
      { label: 'Unreliable Narrator', icon: '🌀', bg: 'bg-slate-50', hover: 'hover:bg-slate-100', filters: {} },
    ],
  },
  {
    id: 'publication-era',
    label: 'Publication Era',
    icon: '📅',
    border: 'border-violet-200',
    titleColor: 'text-violet-900',
    options: [
      { label: 'Classic (Before 2000)', icon: '📜', bg: 'bg-violet-50', hover: 'hover:bg-violet-100', filters: { publication_era: 'classic' } },
      { label: 'Modern (2000-2015)', icon: '📗', bg: 'bg-purple-50', hover: 'hover:bg-purple-100', filters: { publication_era: 'modern' } },
      { label: 'Contemporary (2015+)', icon: '✨', bg: 'bg-fuchsia-50', hover: 'hover:bg-fuchsia-100', filters: { publication_era: 'contemporary' } },
    ],
  },
];

const CREATURE_OPTIONS: { value: string; label: string; filters: Filters }[] = [
  { value: '',        label: 'Any creature / race',    filters: {} },
  { value: 'dragon',  label: '🐉 Dragons & Wyverns',   filters: { tropes: ['Dragons', 'Dragon Riders'] } },
  { value: 'fae',     label: '🧚 Fae & Fair Folk',      filters: { tropes: ['Fae Court Drama'] } },
  { value: 'vampire', label: '🧛 Vampires & Demons',    filters: { subgenres: ['Urban Fantasy', 'Dark Fantasy'] } },
  { value: 'witch',   label: '🧙 Witches & Warlocks',   filters: { subgenres: ['Mythic Fantasy', 'Historical Fantasy'] } },
  { value: 'undead',  label: '💀 Undead & Ghosts',      filters: { subgenres: ['Dark Fantasy', 'Grimdark'] } },
  { value: 'spirit',  label: '🌿 Spirits & Nature Folk', filters: { subgenres: ['Mythic Fantasy'] } },
];

const CONTENT_WARNINGS = [
  { id: 'explicit',     label: 'Sexual content',     icon: '🔞' },
  { id: 'grimdark',     label: 'Graphic violence',    icon: '🩸' },
  { id: 'child-death',  label: 'Child death',         icon: '💔' },
  { id: 'animal-death', label: 'Animal death',        icon: '🐾' },
  { id: 'abuse',        label: 'Abuse / manipulation', icon: '⚠️' },
  { id: 'sa',           label: 'Sexual assault',      icon: '🚫' },
  { id: 'torture',      label: 'Torture',             icon: '🔪' },
  { id: 'suicide',      label: 'Suicide / self-harm', icon: '🌊' },
  { id: 'addiction',    label: 'Addiction',           icon: '💊' },
  { id: 'war-genocide', label: 'War / genocide',      icon: '⚔️' },
];

const TOP = VIALS.slice(0, 4);
const LEFT = VIALS.slice(4, 6);
const RIGHT = VIALS.slice(6, 8);
const BOTTOM = VIALS.slice(8, 12);

export default function AlchemyTable() {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [selectedTropes, setSelectedTropes] = useState<string[]>([]);
  const [selectedCreature, setSelectedCreature] = useState('');
  const [excludedWarnings, setExcludedWarnings] = useState<string[]>([]);

  const toggleWarning = (id: string) => {
    setExcludedWarnings((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  };
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
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
      prev.includes(trope) ? prev.filter((t) => t !== trope) : [...prev, trope]
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
      if (f.subgenres?.length) merged.subgenres = [...(merged.subgenres || []), ...f.subgenres];
      if (f.tropes?.length) merged.tropes = [...(merged.tropes || []), ...f.tropes];
      if (f.audience) merged.audience = f.audience;
      if (f.min_pages !== undefined) merged.min_pages = f.min_pages;
      if (f.max_pages !== undefined) merged.max_pages = f.max_pages;
      if (f.publication_era) merged.publication_era = f.publication_era;
    }

    // Add selected tropes
    if (selectedTropes.length) {
      merged.tropes = [...(merged.tropes || []), ...selectedTropes];
    }

    // Add creature filter
    const creatureFilter = CREATURE_OPTIONS.find((o) => o.value === selectedCreature)?.filters;
    if (creatureFilter) {
      if (creatureFilter.tropes?.length) merged.tropes = [...(merged.tropes || []), ...creatureFilter.tropes];
      if (creatureFilter.subgenres?.length) merged.subgenres = [...(merged.subgenres || []), ...creatureFilter.subgenres];
    }

    const params = new URLSearchParams();
    merged.tone?.forEach((t) => params.append('tone', t));
    if (merged.pacing) params.set('pacing', merged.pacing);
    if (merged.magic_system) params.set('magic_system', merged.magic_system);
    if (merged.heat_level) params.set('heat_level', merged.heat_level);
    merged.subgenres?.forEach((s) => params.append('subgenres', s));
    merged.tropes?.forEach((t) => params.append('tropes', t));
    if (merged.audience) params.set('audience', merged.audience);
    if (merged.min_pages !== undefined) params.set('min_pages', String(merged.min_pages));
    if (merged.max_pages !== undefined) params.set('max_pages', String(merged.max_pages));
    if (merged.publication_era) params.set('publication_era', merged.publication_era);

    if (excludedWarnings.includes('explicit')) params.set('avoid_explicit', '1');
    if (excludedWarnings.includes('grimdark')) params.set('avoid_grimdark', '1');

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
            <span className="text-amber-500 text-sm animate-pulse">⚗️ Transmuting...</span>
          </div>
        )}
        {status === 'done' && !currentBook && (
          <div className="h-52 w-full rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center p-4 text-center">
            <div>
              <p className="text-amber-700 font-medium">No books match</p>
              <p className="text-amber-600 text-xs mt-1">Try different ingredients</p>
            </div>
          </div>
        )}
        {status === 'done' && currentBook && (
          <div className="space-y-3">
            {currentBook.cover_url ? (
              <img
                src={currentBook.cover_url}
                alt={currentBook.title}
                className="mx-auto h-48 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="h-48 w-full rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-4xl">
                📖
              </div>
            )}
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm leading-tight">
                {currentBook.title}
              </h3>
              {currentBook.authors?.length && (
                <p className="text-xs text-zinc-500 mt-0.5">{currentBook.authors.join(', ')}</p>
              )}
              {currentBook.avg_rating && (
                <p className="text-xs text-amber-600 mt-0.5">
                  ★ {currentBook.avg_rating.toFixed(1)}
                  {currentBook.publication_year && ` · ${currentBook.publication_year}`}
                </p>
              )}
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
            className="text-xs text-amber-700 hover:text-amber-900 underline text-center"
          >
            Try another →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Trope Picker */}
      <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-indigo-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏷️</span>
          <h3 className="font-semibold text-indigo-900">Pick a Trope</h3>
          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-auto">Optional</span>
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

      {/* Creatures & Races Dropdown */}
      <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-sky-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🐉</span>
          <h3 className="font-semibold text-sky-900">Creatures & Races</h3>
          <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full ml-auto">Optional</span>
        </div>
        <select
          value={selectedCreature}
          onChange={(e) => setSelectedCreature(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-sky-200 bg-sky-50 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          {CREATURE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content Warnings */}
      <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-red-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚠️</span>
          <h3 className="font-semibold text-red-900">Content Warnings</h3>
          <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full ml-auto">Exclude from results</span>
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

      {/* Mobile Transmutation Square */}
      <div className="flex lg:hidden items-stretch justify-center">
        <TransmuteSquare />
      </div>
    </div>
  );
}
