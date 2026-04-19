import React, { useEffect, useState, useRef } from 'react';
import Stars from './Stars';

interface Book {
  id: string;
  title: string;
  slug?: string | null;
  authors: string[];
  isbn?: string;
  cover_url?: string;
  publication_year?: number;
  page_count?: number;
  avg_rating?: number;
  synopsis?: string;
  subgenres?: string[];
  audience?: string | null;
  series?: string | null;
  series_number?: number | null;
  darkness_level?: number | null;
  heat_level?: string | null;
  series_status?: string | null;
  audiobook_available?: boolean | null;
  tropes?: string[] | null;
}

interface BookDisplayProps {
  genre?: string | string[];
  audience?: string;
  featuredTropes?: string[];
  initialBooks?: Book[];
}

type SortKey = 'title-asc' | 'title-desc' | 'rating-desc' | 'newest' | 'oldest' | 'shortest' | 'longest' | 'author-asc';

const SORT_OPTIONS: { key: SortKey; label: string; icon: string }[] = [
  { key: 'title-asc',   label: 'A → Z',     icon: '🔤' },
  { key: 'title-desc',  label: 'Z → A',     icon: '🔡' },
  { key: 'rating-desc', label: 'Top Rated', icon: '⭐' },
  { key: 'newest',      label: 'Newest',    icon: '🗓️' },
  { key: 'oldest',      label: 'Oldest',    icon: '📜' },
  { key: 'shortest',    label: 'Shortest',  icon: '⚡' },
  { key: 'longest',     label: 'Longest',   icon: '📚' },
];

const DARKNESS_CANDLES = ['', '🕯️', '🕯️🕯️', '🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️🕯️'];
const DARKNESS_LABELS  = ['', 'Lighthearted', 'Mild', 'Serious', 'Dark', 'Brutal'];
const DARKNESS_COLORS  = ['', 'text-green-700', 'text-yellow-700', 'text-orange-600', 'text-red-600', 'text-red-900'];
const HEAT_LEVELS      = ['', 'Sweet Romance', 'Closed Door', 'Open Door', 'Explicit', 'Fiery'];

const PAGE_SIZE = 48;

function buildPageNums(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) pages.push('ellipsis');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ genre, audience: audienceProp, featuredTropes }) => {
  const [books, setBooks]               = useState<Book[]>([]);
  const [total, setTotal]               = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  const [sort, setSort]                 = useState<SortKey>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('sort');
      if (p && SORT_OPTIONS.some(o => o.key === p)) return p as SortKey;
    }
    return 'rating-desc';
  });
  const [currentPage, setCurrentPage]   = useState(1);
  const [searchQuery, setSearchQuery]   = useState<string>(() => {
    if (typeof window !== 'undefined') return new URLSearchParams(window.location.search).get('q') ?? '';
    return '';
  });
  const [darknessFilter, setDarknessFilter] = useState<number | null>(null);
  const [heatFilter, setHeatFilter]         = useState<number | null>(null);
  const [darknessHover, setDarknessHover]   = useState<number | null>(null);
  const [heatHover, setHeatHover]           = useState<number | null>(null);
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);
  const [standaloneFilter, setStandaloneFilter] = useState(false);
  const [tropeFilter, setTropeFilter]       = useState<string | null>(null);
  const [audienceFilter, setAudienceFilter] = useState<string | null>(null);
  const [protagonistFilter, setProtagonistFilter] = useState<string | null>(null);

  const topRef        = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const prevSearchRef = useRef('');

  // Scroll to top on page change (not on initial render)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (topRef.current) {
      const top = topRef.current.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Fetch from server whenever any filter/sort/page changes
  useEffect(() => {
    const controller = new AbortController();

    const searchChanged = prevSearchRef.current !== searchQuery;
    prevSearchRef.current = searchQuery;
    const delay = searchChanged ? 350 : 0;

    const doFetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('sort', sort);
        params.set('page', String(currentPage));
        params.set('limit', String(PAGE_SIZE));
        if (searchQuery.length >= 2)  params.set('search', searchQuery);
        if (genre) {
          const genres = Array.isArray(genre) ? genre : [genre];
          params.set('genre', genres.join(','));
        }
        if (darknessFilter !== null)  params.set('darkness', String(darknessFilter));
        if (heatFilter !== null)      params.set('heat', HEAT_LEVELS[heatFilter]);
        if (tropeFilter)              params.set('trope', tropeFilter);
        if (audienceFilter)           params.set('audience', audienceFilter);
        else if (audienceProp)        params.set('audience', audienceProp);
        if (protagonistFilter)        params.set('protagonist', protagonistFilter);
        if (standaloneFilter)         params.set('standalone', '1');
        if (completedFilter)          params.set('completed', '1');

        const res = await fetch(`/api/books?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBooks(data.items ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setError(null);
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          setError((e as Error).message ?? 'Failed to load books');
          setBooks([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    const timer = setTimeout(doFetch, delay);
    return () => { clearTimeout(timer); controller.abort(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, searchQuery, darknessFilter, heatFilter, completedFilter, standaloneFilter, tropeFilter, audienceFilter, protagonistFilter, currentPage, genre, audienceProp]);

  // Reset to page 1 when any filter (not page itself) changes
  const resetPage = () => setCurrentPage(1);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
        <h3 className="font-semibold mb-2">Error Loading Books</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div ref={topRef} className="w-full min-w-0">
      {/* Search bar */}
      <div className="relative mb-4">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search by title, author, or series…"
          onChange={(e) => { setSearchQuery(e.target.value); resetPage(); }}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(''); resetPage(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            aria-label="Clear"
          >×</button>
        )}
      </div>

      {/* Popular trope chips */}
      {featuredTropes && featuredTropes.length > 0 && (
        <div className="mb-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-500 mr-1">Tropes:</span>
            {featuredTropes.map((trope) => (
              <button
                key={trope}
                onClick={() => { setTropeFilter(tropeFilter === trope ? null : trope); resetPage(); }}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  tropeFilter === trope
                    ? 'bg-purple-700 text-white font-medium'
                    : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                {trope}
              </button>
            ))}
          </div>
          {tropeFilter && (
            <a
              href={`/tropes/${tropeFilter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}
              className="inline-block mt-2 text-xs text-purple-600 hover:text-purple-800 hover:underline"
            >
              Browse all {tropeFilter} books →
            </a>
          )}
        </div>
      )}

      {/* Sort bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 sm:hidden">
          <span className="text-sm text-zinc-500 shrink-0">Sort:</span>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortKey); resetPage(); }}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.icon} {opt.label}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-sm text-zinc-500 shrink-0">Sort:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => { setSort(opt.key); resetPage(); }}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                sort === opt.key
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Darkness + Heat + other filters */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
        <div className="flex items-center gap-1">
          <span className="hidden sm:inline text-sm font-medium text-zinc-700 mr-2">Darkness:</span>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onMouseEnter={() => setDarknessHover(level)}
              onMouseLeave={() => setDarknessHover(null)}
              onClick={() => { setDarknessFilter(darknessFilter === level ? null : level); resetPage(); }}
              title={DARKNESS_LABELS[level]}
              className={`text-base transition-opacity leading-none ${
                level <= (darknessHover ?? darknessFilter ?? 0) ? 'opacity-100' : 'opacity-20'
              }`}
            >🕯️</button>
          ))}
          {darknessFilter !== null && (
            <button onClick={() => { setDarknessFilter(null); resetPage(); }} className="w-6 h-6 flex items-center justify-center text-xs text-zinc-400 hover:text-zinc-600 ml-2">✕</button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="hidden sm:inline text-sm font-medium text-zinc-700 mr-2">Heat:</span>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onMouseEnter={() => setHeatHover(level)}
              onMouseLeave={() => setHeatHover(null)}
              onClick={() => { setHeatFilter(heatFilter === level ? null : level); resetPage(); }}
              title={HEAT_LEVELS[level]}
              className={`text-base transition-opacity leading-none ${
                level <= (heatHover ?? heatFilter ?? 0) ? 'opacity-100' : 'opacity-20'
              }`}
            >🔥</button>
          ))}
          {heatFilter !== null && (
            <button onClick={() => { setHeatFilter(null); resetPage(); }} className="w-6 h-6 flex items-center justify-center text-xs text-zinc-400 hover:text-zinc-600 ml-2">✕</button>
          )}
        </div>

        <button
          onClick={() => { setStandaloneFilter(!standaloneFilter); resetPage(); }}
          className="hidden sm:flex items-center gap-2 group"
        >
          <span className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
            standaloneFilter ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-400 group-hover:border-zinc-600'
          }`}>
            {standaloneFilter && (
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
          <span className="text-sm font-medium text-zinc-700">Standalone</span>
        </button>

        {([['Adult', 'Adult'], ['YA', 'Young Adult (YA)']] as [string, string][]).map(([label, value]) => (
          <button
            key={value}
            onClick={() => { setAudienceFilter(audienceFilter === value ? null : value); resetPage(); }}
            className="hidden sm:flex items-center gap-2 group"
          >
            <span className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
              audienceFilter === value ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-400 group-hover:border-zinc-600'
            }`}>
              {audienceFilter === value && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="text-sm font-medium text-zinc-700">{label}</span>
          </button>
        ))}

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">Protagonist</span>
          {([['M', 'Male'], ['F', 'Female']] as [string, string][]).map(([label, value]) => (
            <button
              key={value}
              onClick={() => { setProtagonistFilter(protagonistFilter === value ? null : value); resetPage(); }}
              className={`w-7 h-7 rounded flex items-center justify-center border text-sm font-medium transition-all ${
                protagonistFilter === value ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-400 text-zinc-700 hover:border-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs text-zinc-400 shrink-0">
          {loading ? 'Loading…' : `${total} books${totalPages > 1 ? ` · page ${currentPage}/${totalPages}` : ''}`}
        </span>
      </div>

      {/* Book grid */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-zinc-600">Loading books...</p>
          </div>
        </div>
      ) : books.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-blue-900">
          <p className="font-semibold mb-2">No books found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {books.map((book) => {
            const href = book.slug ? `/books/${book.slug}` : null;
            const dl = (book.darkness_level != null && book.darkness_level >= 1) ? book.darkness_level : null;
            const CardContent = (
              <>
                <div className="relative w-28 sm:w-32 shrink-0 self-stretch bg-linear-to-br from-purple-100 to-blue-100">
                  <img
                    src={book.cover_url || (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false` : '/grimplaceholder.png')}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover block"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.dataset.tried && book.isbn && book.cover_url) {
                        img.dataset.tried = '1';
                        img.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`;
                      } else {
                        img.onerror = null;
                        img.src = '/grimplaceholder.png';
                      }
                    }}
                  />
                </div>
                <div className="p-3 flex-1 min-w-0 flex flex-col gap-1">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{book.title}</h3>
                  {book.series && (
                    <p className="text-xs text-indigo-600 font-medium truncate">
                      {book.series}{book.series_number != null ? ` #${book.series_number}` : ''}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500 truncate">
                    {book.authors?.length > 0 ? book.authors.join(', ') : 'Unknown author'}
                    {book.publication_year ? ` · ${book.publication_year}` : ''}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
                    {dl != null && (
                      <span className={`font-medium ${DARKNESS_COLORS[dl]}`}>
                        {DARKNESS_CANDLES[dl]} {DARKNESS_LABELS[dl]}
                      </span>
                    )}
                    {book.avg_rating && (
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Stars rating={book.avg_rating} /> {book.avg_rating.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {book.subgenres && book.subgenres.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {book.subgenres.slice(0, 3).map((g) => (
                        <span key={g} className="bg-purple-50 text-purple-700 text-[10px] px-1.5 py-0.5 rounded">{g}</span>
                      ))}
                      {book.subgenres.length > 3 && <span className="text-[10px] text-zinc-400">+{book.subgenres.length - 3}</span>}
                    </div>
                  )}
                  {book.tropes && book.tropes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {book.tropes.slice(0, 3).map((t) => (
                        <span key={t} className="bg-amber-50 text-amber-700 text-[10px] px-1.5 py-0.5 rounded-full">{t}</span>
                      ))}
                      {book.tropes.length > 3 && <span className="text-[10px] text-zinc-400">+{book.tropes.length - 3}</span>}
                    </div>
                  )}
                  {book.synopsis && (
                    <p className="hidden sm:line-clamp-3 text-xs text-zinc-400 leading-relaxed">{book.synopsis}</p>
                  )}
                </div>
              </>
            );

            return href ? (
              <a key={book.id} href={href} className="border rounded-xl overflow-hidden bg-white hover:shadow-md hover:border-zinc-300 transition-all flex min-h-[160px]">
                {CardContent}
              </a>
            ) : (
              <div key={book.id} className="border rounded-xl overflow-hidden bg-white hover:shadow-md hover:border-zinc-300 transition-all flex min-h-[160px]">
                {CardContent}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-zinc-300 text-sm font-medium hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >← Prev</button>
          {buildPageNums(currentPage, totalPages).map((p, i) =>
            p === 'ellipsis' ? (
              <span key={`e${i}`} className="px-2 text-zinc-400 text-sm">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p as number)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === currentPage ? 'bg-purple-600 text-white' : 'border border-zinc-300 hover:bg-zinc-50'
                }`}
              >{p}</button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-zinc-300 text-sm font-medium hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >Next →</button>
        </div>
      )}
    </div>
  );
};

export default BookDisplay;
