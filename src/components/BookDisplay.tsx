import React, { useEffect, useState, useMemo } from 'react';
import BookmarkButton from './BookmarkButton';

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
  created_at?: string;
}

interface BookDisplayProps {
  genre?: string;
  audience?: string;
}

type SortKey = 'title-asc' | 'title-desc' | 'rating-desc' | 'newest' | 'oldest' | 'shortest' | 'longest' | 'author-asc';

const SORT_OPTIONS: { key: SortKey; label: string; icon: string }[] = [
  { key: 'title-asc',    label: 'A → Z',      icon: '🔤' },
  { key: 'title-desc',   label: 'Z → A',      icon: '🔡' },
  { key: 'author-asc',   label: 'By Author',  icon: '✍️' },
  { key: 'rating-desc',  label: 'Top Rated',  icon: '⭐' },
  { key: 'newest',       label: 'Newest',     icon: '🗓️' },
  { key: 'oldest',       label: 'Oldest',     icon: '📜' },
  { key: 'shortest',     label: 'Shortest',   icon: '⚡' },
  { key: 'longest',      label: 'Longest',    icon: '📚' },
];

const DARKNESS_CANDLES = ['', '🕯️', '🕯️🕯️', '🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️🕯️'];
const DARKNESS_LABELS = ['', 'Lighthearted', 'Mild', 'Moderate', 'Dark', 'Brutal'];
const DARKNESS_COLORS = ['', 'text-green-700', 'text-yellow-700', 'text-orange-600', 'text-red-600', 'text-red-900'];

function sortBooks(books: Book[], key: SortKey): Book[] {
  const sorted = [...books];
  switch (key) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating-desc':
      return sorted.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
    case 'newest':
      return sorted.sort((a, b) => (b.publication_year ?? 0) - (a.publication_year ?? 0));
    case 'oldest':
      return sorted.sort((a, b) => (a.publication_year ?? 9999) - (b.publication_year ?? 9999));
    case 'shortest':
      return sorted.sort((a, b) => (a.page_count ?? 9999) - (b.page_count ?? 9999));
    case 'longest':
      return sorted.sort((a, b) => (b.page_count ?? 0) - (a.page_count ?? 0));
    case 'author-asc':
      return sorted.sort((a, b) => (a.authors[0] ?? '').localeCompare(b.authors[0] ?? ''));
    default:
      return sorted;
  }
}

const BookDisplay: React.FC<BookDisplayProps> = ({ genre, audience }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('rating-desc');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        let filteredBooks = data.items || [];

        if (genre) {
          filteredBooks = filteredBooks.filter((book: Book) =>
            book.subgenres?.includes(genre),
          );
        } else if (audience) {
          filteredBooks = filteredBooks.filter((book: Book) =>
            book.audience === audience,
          );
        }

        setBooks(filteredBooks);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre, audience]);

  const sortedBooks = useMemo(() => sortBooks(books, sort), [books, sort]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
        <h3 className="font-semibold mb-2">Error Loading Books</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-blue-900">
        <p className="font-semibold mb-2">No books found</p>
        <p className="text-sm">Use the BookHub component to add books first.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-zinc-500 mr-1">Sort:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
              sort === opt.key
                ? 'bg-zinc-900 text-white font-medium'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <span>{opt.icon}</span>
            {opt.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-zinc-400">{sortedBooks.length} books</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBooks.map((book) => {
          const href = book.slug ? `/books/${book.slug}` : null;
          const dl = (book.darkness_level != null && book.darkness_level >= 1) ? book.darkness_level : null;

          const CardContent = (
            <>
              {book.cover_url ? (
                <div className="relative h-48 bg-linear-to-br from-purple-200 to-blue-200 overflow-hidden">
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {dl != null && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {DARKNESS_CANDLES[dl]}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-48 bg-linear-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                  <span className="text-purple-400 text-sm">No cover</span>
                  {dl != null && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {DARKNESS_CANDLES[dl]}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                  {book.title}
                </h3>

                <p className="text-sm text-zinc-600 mb-1">
                  {book.authors && book.authors.length > 0
                    ? book.authors.join(', ')
                    : 'Unknown author'}
                </p>
                {book.series && (
                  <p className="text-xs text-indigo-600 font-medium mb-2">
                    {book.series}{book.series_number != null ? ` #${book.series_number}` : ''}
                  </p>
                )}

                {dl != null && (
                  <p className={`text-xs font-medium mb-2 ${DARKNESS_COLORS[dl]}`}>
                    {DARKNESS_CANDLES[dl]} {DARKNESS_LABELS[dl]}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  {book.publication_year && (
                    <div>
                      <span className="text-zinc-500">Year:</span>
                      <p className="font-medium">{book.publication_year}</p>
                    </div>
                  )}
                  {book.page_count && (
                    <div>
                      <span className="text-zinc-500">Pages:</span>
                      <p className="font-medium">{book.page_count}</p>
                    </div>
                  )}
                  {book.avg_rating && (
                    <div>
                      <span className="text-zinc-500">Rating:</span>
                      <p className="font-medium">{book.avg_rating.toFixed(1)}/5 ⭐</p>
                    </div>
                  )}
                </div>

                {book.subgenres && book.subgenres.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {book.subgenres.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
                        >
                          {g}
                        </span>
                      ))}
                      {book.subgenres.length > 3 && (
                        <span className="text-xs text-zinc-500">
                          +{book.subgenres.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {book.synopsis && (
                  <p className="text-xs text-zinc-600 line-clamp-3">
                    {book.synopsis}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-2">
                  {href && (
                    <p className="text-xs text-purple-600 font-medium">
                      View details →
                    </p>
                  )}
                  <BookmarkButton bookId={book.id} size="sm" />
                </div>
              </div>
            </>
          );

          return href ? (
            <a
              key={book.id}
              href={href}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow block"
            >
              {CardContent}
            </a>
          ) : (
            <div
              key={book.id}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookDisplay;
