import React from 'react';

type MiniBookCardProps = {
  title: string;
  author: string;
  series?: string;
  bookNumber?: number | string;
  tags?: string[];
};

export default function MiniBookCard({
  title,
  author,
  series,
  bookNumber,
  tags = [],
}: MiniBookCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b py-3 last:border-b-0">
      <div className="min-w-0">
        <div className="font-medium leading-tight">{title}</div>
        <div className="text-sm text-zinc-600">{author}</div>

        {(series || bookNumber) && (
          <div className="mt-1 text-xs text-zinc-600">
            {series ? series : ''}
            {series && bookNumber != null ? ' · ' : ''}
            {bookNumber != null ? `Book ${bookNumber}` : ''}
          </div>
        )}
      </div>

      {tags.length ? (
        <div className="hidden sm:flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
