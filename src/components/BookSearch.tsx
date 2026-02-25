import { useState, useRef } from 'react';

interface Book {
  id: string;
  title: string;
  slug?: string | null;
  authors?: string[] | null;
  cover_url?: string | null;
  avg_rating?: number | null;
  subgenres?: string[] | null;
  series?: string | null;
  series_number?: number | null;
}

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load books on first keystroke
  const ensureLoaded = async () => {
    if (loaded) return;
    const res = await fetch('/api/books');
    const data = await res.json();
    setAllBooks(data.items ?? []);
    setLoaded(true);
  };

  const q = query.trim().toLowerCase();
  const results = q.length < 2 ? [] : allBooks.filter((b) => {
    const titleMatch = b.title.toLowerCase().includes(q);
    const authorMatch = b.authors?.some((a) => a.toLowerCase().includes(q));
    const seriesMatch = b.series?.toLowerCase().includes(q);
    return titleMatch || authorMatch || seriesMatch;
  }).slice(0, 12);

  const showDropdown = q.length >= 2;

  return (
    <div className="relative w-full max-w-xl mt-6">
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search by title or author…"
          onFocus={ensureLoaded}
          onChange={(e) => { setQuery(e.target.value); ensureLoaded(); }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-30 mt-1.5 w-full rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-zinc-400">No books found for "{query}"</p>
          ) : (
            <ul>
              {results.map((book) => {
                const href = book.slug ? `/books/${book.slug}/` : null;
                return (
                  <li key={book.id}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                        onClick={() => setQuery('')}
                      >
                        {book.cover_url ? (
                          <img src={book.cover_url} alt="" className="w-8 h-12 object-cover rounded shrink-0" />
                        ) : (
                          <div className="w-8 h-12 rounded bg-purple-100 flex items-center justify-center text-base shrink-0">📖</div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-900 truncate">
                            {book.title}
                            {book.series && (
                              <span className="font-normal text-zinc-400 ml-1">
                                ({book.series}{book.series_number != null ? ` #${book.series_number}` : ''})
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">{book.authors?.join(', ')}</p>
                          {book.subgenres?.[0] && (
                            <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded mt-0.5 inline-block">{book.subgenres[0]}</span>
                          )}
                        </div>
                        {book.avg_rating && (
                          <span className="ml-auto text-xs text-zinc-400 shrink-0">★ {book.avg_rating.toFixed(1)}</span>
                        )}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-12 rounded bg-purple-100 flex items-center justify-center text-base shrink-0">📖</div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-900 truncate">
                            {book.title}
                            {book.series && (
                              <span className="font-normal text-zinc-400 ml-1">
                                ({book.series}{book.series_number != null ? ` #${book.series_number}` : ''})
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">{book.authors?.join(', ')}</p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              {results.length === 12 && (
                <li className="px-4 py-2.5 text-xs text-zinc-400 border-t">
                  Showing top 12 — type more to narrow results
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
