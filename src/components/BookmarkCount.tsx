import { useState, useEffect } from 'react';

const KEY = 'fantasy_obscura_saved';

function getSaved(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export default function BookmarkCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getSaved().length);
    const handler = () => setCount(getSaved().length);
    window.addEventListener('bookmarks-changed', handler);
    return () => window.removeEventListener('bookmarks-changed', handler);
  }, []);

  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}
