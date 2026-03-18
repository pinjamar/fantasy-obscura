import React, { useState, useEffect, useRef } from 'react';

interface BookEntry {
  id?: string;
  title: string;
  author: string; // normalized single string for display/AI
  authors?: string[] | null; // raw from DB
  cover_url?: string;
  slug?: string;
  series?: string | null;
  series_number?: number | null;
}

interface Recommendation {
  title: string;
  author: string;
  series?: string | null;
  series_number?: number | null;
  reason: string;
  cover_url?: string;
  slug?: string;
}

const MAX_BOOKS = 8;
const STORAGE_KEY = 'booksLikeMe';

export default function BooksLikeMe() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<BookEntry[]>([]);
  const [likedBooks, setLikedBooks] = useState<BookEntry[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load saved books from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLikedBooks(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage whenever likedBooks changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedBooks));
  }, [likedBooks]);

  // Click outside to close dropdown
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowDrop(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/books-search?q=${encodeURIComponent(val.trim())}`);
      const data = await res.json();
      const books = (data.books ?? []).map((b: any) => ({
        ...b,
        author: Array.isArray(b.authors) ? b.authors[0] ?? 'Unknown' : (b.authors ?? 'Unknown'),
      }));
      setSuggestions(books);
      setShowDrop(books.length > 0);
    }, 250);
  }

  function addBook(book: BookEntry) {
    if (likedBooks.length >= MAX_BOOKS) return;
    if (likedBooks.some((b) => b.title === book.title && b.author === book.author)) return;
    setLikedBooks((prev) => [...prev, book]);
    setQuery('');
    setSuggestions([]);
    setShowDrop(false);
    setRecs([]);
  }

  function addManual() {
    const trimmed = query.trim();
    if (!trimmed || likedBooks.length >= MAX_BOOKS) return;
    const [title, ...rest] = trimmed.split(' by ');
    const author = rest.join(' by ').trim() || 'Unknown';
    addBook({ title: title.trim(), author });
  }

  function removeBook(index: number) {
    setLikedBooks((prev) => prev.filter((_, i) => i !== index));
    setRecs([]);
  }

  async function getRecommendations() {
    if (!likedBooks.length) return;
    setLoading(true);
    setError('');
    setRecs([]);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ books: likedBooks.map((b) => ({ title: b.title, author: b.author })) }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRecs(data.recommendations ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 mb-12 rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 to-indigo-50 p-6">
      <p className="text-sm text-zinc-500 mb-5">
        <span className="font-semibold text-zinc-700">Alchemist</span> — add up to 8 books you love — he'll find what they share and recommend similar reads.
      </p>

      {/* Search input */}
      <div ref={wrapperRef} className="relative mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={(e) => e.key === 'Enter' && !showDrop && addManual()}
              placeholder={
                likedBooks.length >= MAX_BOOKS
                  ? 'Maximum 4 books reached'
                  : 'Search by title or series...'
              }
              disabled={likedBooks.length >= MAX_BOOKS}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
              autoComplete="off"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-sm">
              🔍
            </span>
          </div>
          {query.trim() && !showDrop && likedBooks.length < MAX_BOOKS && (
            <button
              onClick={addManual}
              className="shrink-0 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Add
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showDrop && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
            {suggestions.map((book) => (
              <button
                key={book.id ?? book.title}
                onMouseDown={() => addBook(book)}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors"
              >
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt=""
                    className="w-8 h-12 object-cover rounded shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-8 h-12 rounded bg-purple-100 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">{book.title}</p>
                  {book.series && (
                    <p className="text-xs text-indigo-500 truncate">
                      {book.series}{book.series_number != null ? ` #${book.series_number}` : ''}
                    </p>
                  )}
                  <p className="text-xs text-zinc-400 truncate">{book.author}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Liked books list */}
      {likedBooks.length > 0 && (
        <div className="flex items-end gap-3 mb-5">
          {likedBooks.map((book, i) => (
            <div key={i} className="relative group shrink-0">
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  title={book.title}
                  className="w-14 h-20 object-cover rounded-lg shadow"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/grimplaceholder.png'; }}
                />
              ) : (
                <div className="w-14 h-20 rounded-lg bg-purple-100 shadow flex items-center justify-center text-purple-300 text-xl">📖</div>
              )}
              <button
                onClick={() => removeBook(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-300 transition-colors text-xs leading-none flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
          <span className="text-xs text-zinc-400 pb-1">{likedBooks.length}/{MAX_BOOKS}</span>
        </div>
      )}

      {/* Recommend button */}
      {likedBooks.length > 0 && (
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Finding recommendations...
            </>
          ) : (
            <>✨ Recommend Similar</>
          )}
        </button>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {/* Recommendations */}
      {recs.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
              Recommended for you
            </h3>
            <button
              onClick={() => { setLikedBooks([]); setRecs([]); setQuery(''); setError(''); localStorage.removeItem(STORAGE_KEY); }}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-purple-600 transition-colors"
              title="Start over"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 9a9 9 0 0 1 15-3.5M20 15a9 9 0 0 1-15 3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Start over
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recs.map((rec, i) => {
              const inner = (
                <>
                  {rec.cover_url ? (
                    <img
                      src={rec.cover_url}
                      alt={rec.title}
                      className="w-12 aspect-2/3 object-cover rounded-lg shrink-0 shadow-sm"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-12 aspect-2/3 rounded-lg bg-purple-100 shrink-0 flex items-center justify-center text-purple-400 text-lg">
                      📖
                    </div>
                  )}
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-zinc-900 leading-snug group-hover:text-purple-700 transition-colors">{rec.title}</p>
                    {rec.series && (
                      <p className="text-xs text-indigo-500 mt-0.5">
                        {rec.series}{rec.series_number != null ? ` #${rec.series_number}` : ''}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-0.5">{rec.author}</p>
                    <p className="text-xs text-zinc-400 mt-1.5 italic leading-relaxed">{rec.reason}</p>
                  </div>
                </>
              );
              const cls = "group flex items-start gap-3 rounded-xl bg-white border border-zinc-100 p-3 transition-colors";
              return rec.slug ? (
                <a key={i} href={`/books/${rec.slug}/`} className={`${cls} hover:border-purple-200 hover:bg-purple-50`}>
                  {inner}
                </a>
              ) : (
                <div key={i} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
