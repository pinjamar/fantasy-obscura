import { useState, useEffect } from 'react';

interface Props {
  bookId: string;
  userId: string | null;
}

export default function FavouriteButton({ bookId, userId }: Props) {
  const [faved, setFaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch('/api/shelf')
      .then((r) => r.json())
      .then((data) => {
        const entry = (data.entries ?? []).find(
          (e: { books: { id: string }; shelf: string }) => e.books?.id === bookId && e.shelf === 'favourites'
        );
        setFaved(!!entry);
      })
      .catch(() => {});
  }, [bookId, userId]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      window.location.href = `/auth/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setLoading(true);
    if (faved) {
      await fetch(`/api/shelf?bookId=${bookId}`, { method: 'DELETE' });
      setFaved(false);
    } else {
      await fetch('/api/shelf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, shelf: 'favourites' }),
      });
      setFaved(true);
      setShowLabel(true);
      setTimeout(() => setShowLabel(false), 1800);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={faved ? 'Remove from Favourites' : 'Add to Favourites'}
      className="absolute bottom-2.5 left-2.5 z-10 flex flex-col items-center gap-0.5 group"
    >
      <span className={`flex items-center justify-center w-8 h-8 rounded-full shadow transition-all ${
        faved
          ? 'bg-red-500 text-white scale-110'
          : 'bg-black/40 text-white/80 hover:bg-black/60 hover:scale-110 backdrop-blur-sm'
      }`}>
        {loading ? (
          <span className="animate-spin w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={faved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}
      </span>
      {showLabel && (
        <span className="text-[10px] font-semibold text-white bg-black/60 px-1.5 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm">
          Added to favourites
        </span>
      )}
    </button>
  );
}
