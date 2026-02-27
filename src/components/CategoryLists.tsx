import { useState } from 'react';

interface BookRef {
  title: string;
  author: string;
  series?: string;
  darkness?: number;
  rating?: number;
}

interface Props {
  best: string[];
  starter: string[];
  hidden: string[];
  richBest?: BookRef[];
  richStarter?: BookRef[];
  richHidden?: BookRef[];
}

const CANDLES = ['', '🕯️', '🕯️🕯️', '🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️🕯️'];
const PER_PAGE = 5;
const MAX_ITEMS = 20;

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded % 1 === 0.5;
  return (
    <span className="text-[11px] font-medium leading-none">
      {'★'.repeat(full)}
      {half && <span className="relative inline-block"><span className="text-zinc-300">★</span><span className="absolute left-0 top-0 overflow-hidden" style={{ width: '50%' }}>★</span></span>}
    </span>
  );
}

function RichList({ items, page }: { items: BookRef[]; page: number }) {
  const visible = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const offset = page * PER_PAGE;
  const placeholders = PER_PAGE - visible.length;
  return (
    <ol className="space-y-3">
      {visible.map((book, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="text-zinc-400 font-medium text-xs w-4 shrink-0 pt-1">{offset + i + 1}</span>
          <div className="w-10 shrink-0 rounded overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100" style={{ height: '60px' }}>
            <img
              src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-M.jpg`}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-cover.svg'; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-xs text-zinc-900 leading-snug">{book.title}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
              {book.author}{book.series ? ` · ${book.series}` : ''}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {book.darkness != null && (
                <span className="text-[10px] leading-none">{CANDLES[book.darkness]}</span>
              )}
              {book.rating != null && <Stars rating={book.rating} />}
            </div>
          </div>
        </li>
      ))}
      {Array.from({ length: placeholders }).map((_, i) => (
        <li key={`ph-${i}`} className="flex gap-2.5 invisible" aria-hidden="true">
          <span className="w-4 shrink-0" />
          <div className="w-10 shrink-0" style={{ height: '60px' }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs">&nbsp;</p>
            <p className="text-[11px] mt-0.5">&nbsp;</p>
            <p className="mt-1">&nbsp;</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function PlainList({ items, page }: { items: string[]; page: number }) {
  const visible = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const offset = page * PER_PAGE;
  const placeholders = PER_PAGE - visible.length;
  return (
    <ol className="space-y-2">
      {visible.map((title, i) => (
        <li key={i} className="text-sm text-zinc-700 flex items-start gap-2">
          <span className="text-zinc-400 font-medium shrink-0 w-5">{offset + i + 1}.</span>
          {title}
        </li>
      ))}
      {Array.from({ length: placeholders }).map((_, i) => (
        <li key={`ph-${i}`} className="text-sm invisible" aria-hidden="true">&nbsp;</li>
      ))}
    </ol>
  );
}

export default function CategoryLists({ best, starter, hidden, richBest, richStarter, richHidden }: Props) {
  const [page, setPage] = useState(0);

  const maxLen = Math.min(MAX_ITEMS, Math.max(
    richBest?.length ?? best.length,
    richStarter?.length ?? starter.length,
    richHidden?.length ?? hidden.length,
  ));
  const totalPages = Math.ceil(maxLen / PER_PAGE);
  const start = page * PER_PAGE + 1;
  const end = Math.min((page + 1) * PER_PAGE, maxLen);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        {/* All-Time Greats */}
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold text-sm mb-4">⭐ All-Time Greats</h2>
          {richBest
            ? <RichList items={richBest} page={page} />
            : <PlainList items={best} page={page} />}
        </div>

        {/* Best to Start With */}
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold text-sm mb-4">🚀 Best to Start With</h2>
          {richStarter
            ? <RichList items={richStarter} page={page} />
            : <PlainList items={starter} page={page} />}
        </div>

        {/* Hidden Gems */}
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold text-sm mb-4">💎 Hidden Gems</h2>
          {richHidden
            ? <RichList items={richHidden} page={page} />
            : <PlainList items={hidden} page={page} />}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 rounded-lg border border-zinc-300 text-sm font-medium hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <span className="text-xs text-zinc-400">{start}–{end} of {maxLen}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1.5 rounded-lg border border-zinc-300 text-sm font-medium hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
