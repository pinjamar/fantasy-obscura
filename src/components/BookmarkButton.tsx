import { useState, useEffect } from 'react';

const KEY = 'grimoire_saved';

function getSaved(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function setSaved(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event('bookmarks-changed'));
}

interface Props {
  bookId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function BookmarkButton({ bookId, size = 'md', className = '' }: Props) {
  const [saved, setSavedState] = useState(false);

  useEffect(() => {
    setSavedState(getSaved().includes(bookId));
    const handler = () => setSavedState(getSaved().includes(bookId));
    window.addEventListener('bookmarks-changed', handler);
    return () => window.removeEventListener('bookmarks-changed', handler);
  }, [bookId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = getSaved();
    setSaved(
      current.includes(bookId)
        ? current.filter((id) => id !== bookId)
        : [...current, bookId],
    );
  };

  const isSmall = size === 'sm';

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from Want to Read' : 'Add to Want to Read'}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all ${
        isSmall ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      } ${
        saved
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={isSmall ? 'w-3 h-3' : 'w-4 h-4'}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      {saved ? '✓ Want to Read' : 'Want to Read'}
    </button>
  );
}
