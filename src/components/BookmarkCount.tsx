import { useState, useEffect } from 'react';

export default function BookmarkCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/shelf')
      .then((r) => r.json())
      .then((data) => {
        if (data.entries) setCount(data.entries.length);
      })
      .catch(() => {});
  }, []);

  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}
