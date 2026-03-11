import { useState, useEffect, useRef } from 'react';

const SHELVES = [
  { key: 'want_to_read',      label: 'Want to Read',      icon: '🔖' },
  { key: 'currently_reading', label: 'Currently Reading', icon: '📖' },
  { key: 'read',              label: 'Read',              icon: '✅' },
] as const;

type ShelfKey = typeof SHELVES[number]['key'];

interface Props {
  bookId: string;
  userId: string | null;
  size?: 'sm' | 'md';
  block?: boolean;
  className?: string;
}

export default function AddToShelf({ bookId, userId, size = 'md', block = false, className = '' }: Props) {
  const [currentShelf, setCurrentShelf] = useState<ShelfKey | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch current shelf for this book on mount (only when logged in)
  useEffect(() => {
    if (!userId) return;
    fetch('/api/shelf')
      .then((r) => r.json())
      .then((data) => {
        const entry = (data.entries ?? []).find((e: { books: { id: string }; shelf: ShelfKey }) => e.books?.id === bookId);
        setCurrentShelf(entry?.shelf ?? null);
      })
      .catch(() => {});
  }, [bookId, userId]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectShelf = async (shelf: ShelfKey) => {
    setOpen(false);
    if (currentShelf === shelf) {
      // Remove from shelf
      setLoading(true);
      await fetch(`/api/shelf?bookId=${bookId}`, { method: 'DELETE' });
      setCurrentShelf(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    await fetch('/api/shelf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, shelf }),
    });
    setCurrentShelf(shelf);
    setLoading(false);
  };

  const isSmall = size === 'sm';
  const activeShelf = SHELVES.find((s) => s.key === currentShelf);

  // Block style (full-width, matches buy buttons on book page)
  const blockBtn = `w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60`;
  const inlineBtn = `inline-flex items-center gap-1.5 rounded-full font-medium transition-all disabled:opacity-60 ${isSmall ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}`;

  // Not logged in → link to login
  if (!userId) {
    return (
      <a
        href={`/auth/login?redirectTo=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '/')}`}
        className={`${block ? blockBtn : inlineBtn} bg-zinc-100 text-zinc-600 hover:bg-zinc-200 ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isSmall ? 'w-3 h-3' : 'w-4 h-4'}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
        Add to Shelf
      </a>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${block ? 'block' : 'inline-block'} ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        aria-label="Add to shelf"
        className={`${block ? blockBtn : inlineBtn} ${
          currentShelf
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
        }`}
      >
        {loading ? (
          <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={currentShelf ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={isSmall ? 'w-3 h-3' : 'w-4 h-4'}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        )}
        {currentShelf ? `${activeShelf?.icon} ${activeShelf?.label}` : 'Add to Shelf'}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 left-0 w-48 rounded-xl border border-zinc-200 bg-white shadow-lg py-1 text-sm">
          {SHELVES.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => selectShelf(key)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${
                currentShelf === key
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span>{icon}</span>
              {label}
              {currentShelf === key && <span className="ml-auto text-purple-500">✓</span>}
            </button>
          ))}
          {currentShelf && (
            <>
              <div className="border-t border-zinc-100 my-1" />
              <button
                onClick={() => selectShelf(currentShelf)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-red-500 hover:bg-red-50 transition-colors"
              >
                <span>×</span> Remove from shelf
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
