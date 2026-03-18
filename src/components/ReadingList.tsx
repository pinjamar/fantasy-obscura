import { useState, useEffect } from 'react';
import Stars from './Stars';
import BookmarkButton from './BookmarkButton';

const KEY = 'grimoire_saved';

function getSaved(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function removeSaved(id: string) {
  const next = getSaved().filter((i) => i !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('bookmarks-changed'));
}

const DARKNESS_CANDLES = ['', '🕯️', '🕯️🕯️', '🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️🕯️'];
const DARKNESS_LABELS  = ['', 'Lighthearted', 'Mild', 'Serious', 'Dark', 'Brutal'];

interface Book {
  id: string;
  title: string;
  slug?: string | null;
  authors: string[] | null;
  cover_url?: string | null;
  avg_rating?: number | null;
  publication_year?: number | null;
  subgenres?: string[] | null;
  series?: string | null;
  series_number?: number | null;
  darkness_level?: number | null;
}

export default function ReadingList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const ids = getSaved();
    if (ids.length === 0) { setLoading(false); return; }

    fetch('/api/books')
      .then((r) => r.json())
      .then((data) => {
        const all: Book[] = data.items || [];
        const saved = all.filter((b) => ids.includes(b.id));
        setBooks(saved);
        if (saved.length >= 3 && !sessionStorage.getItem('signup_banner_shown')) {
          setShowBanner(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = (id: string) => {
    removeSaved(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('signup_banner_shown', '1');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        <p className="text-5xl mb-4">📚</p>
        <p className="text-lg font-medium text-zinc-700">Your reading list is empty</p>
        <p className="text-sm mt-2">Hit <strong>Save</strong> on any book to add it here.</p>
        <a
          href="/books/"
          className="inline-block mt-6 px-5 py-2.5 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
        >
          Browse books
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Sign-up banner (once per session, 3+ books) */}
      {showBanner && (
        <div className="mb-6 flex items-center gap-4 rounded-xl border border-purple-200 bg-purple-50 px-5 py-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-900">
              Create a free account to sync your list across devices and never lose it.
            </p>
          </div>
          <button
            disabled
            className="shrink-0 px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm font-semibold opacity-50 cursor-not-allowed"
            title="Auth coming soon"
          >
            Sign Up
          </button>
          <button
            onClick={dismissBanner}
            aria-label="Dismiss"
            className="shrink-0 text-purple-400 hover:text-purple-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
      )}

      <p className="text-sm text-zinc-400 mb-5">{books.length} {books.length === 1 ? 'book' : 'books'} saved</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const dl = book.darkness_level != null && book.darkness_level >= 1 ? book.darkness_level : null;
          const href = book.slug ? `/books/${book.slug}/` : null;

          return (
            <div
              key={book.id}
              className="relative border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Remove button */}
              <button
                onClick={() => remove(book.id)}
                aria-label="Remove from list"
                className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-black/50 text-white text-sm flex items-center justify-center hover:bg-red-500 transition-colors leading-none"
              >
                ×
              </button>

              {/* Cover */}
              {book.cover_url ? (
                <div className="relative h-44 overflow-hidden bg-zinc-100">
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {dl != null && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {DARKNESS_CANDLES[dl]}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-44 bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                  {dl != null && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {DARKNESS_CANDLES[dl]}
                    </div>
                  )}
                </div>
              )}

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold leading-tight mb-0.5 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-zinc-500 mb-1">
                  {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
                </p>
                {book.series && (
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    {book.series}{book.series_number != null ? ` #${book.series_number}` : ''}
                  </p>
                )}
                {dl != null && (
                  <p className="text-xs text-zinc-400 mb-2">{DARKNESS_CANDLES[dl]} {DARKNESS_LABELS[dl]}</p>
                )}
                <div className="flex gap-3 text-xs text-zinc-400">
                  {book.publication_year && <span>{book.publication_year}</span>}
                  {book.avg_rating && <span className="inline-flex items-center gap-1"><Stars rating={book.avg_rating} /> {book.avg_rating.toFixed(2)}</span>}
                </div>
                {book.subgenres && book.subgenres.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {book.subgenres.slice(0, 2).map((g) => (
                      <span key={g} className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">{g}</span>
                    ))}
                  </div>
                )}
                {href && (
                  <a href={href} className="block mt-3 text-xs text-purple-600 font-medium hover:underline">
                    View details →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
