import React from 'react';

type BookCardProps = {
  title: string;
  author: string;

  // Optional extras
  series?: string;
  bookNumber?: number | string;
  year?: number;
  status?: 'standalone' | 'series' | 'ongoing' | 'completed';
  tags?: string[];
  note?: string;

  // Optional links (Amazon/Goodreads/etc.) - keep empty if you don't want outbound links yet
  href?: string;

  // Optional cover image
  coverSrc?: string;
  coverAlt?: string;
};

export default function BookCard({
  title,
  author,
  series,
  bookNumber,
  year,
  status,
  tags = [],
  note,
  href,
  coverSrc,
  coverAlt,
}: BookCardProps) {
  const Wrapper: React.ElementType = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href}
      className={[
        'block rounded-2xl border border-zinc-200 bg-white p-4',
        'hover:bg-zinc-50 transition',
        href ? 'focus:outline-none focus:ring-2 focus:ring-zinc-300' : '',
      ].join(' ')}
      {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="flex gap-4">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={coverAlt ?? `Cover of ${title}`}
            loading="lazy"
            className="h-24 w-16 flex-none rounded-md object-cover border border-zinc-200"
          />
        ) : (
          <div className="h-24 w-16 flex-none rounded-md border border-dashed border-zinc-200 bg-zinc-50" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold leading-tight">
                {title}
              </h3>
              <p className="truncate text-sm text-zinc-600">{author}</p>
            </div>

            {(year || status) && (
              <div className="flex flex-col items-end text-xs text-zinc-600">
                {year ? <span>{year}</span> : null}
                {status ? (
                  <span className="rounded-full border border-zinc-200 px-2 py-0.5">
                    {status}
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {(series || bookNumber) && (
            <p className="mt-2 text-sm text-zinc-700">
              {series ? <span className="font-medium">{series}</span> : null}
              {series && bookNumber != null ? <span> · </span> : null}
              {bookNumber != null ? <span>Book {bookNumber}</span> : null}
            </p>
          )}

          {note ? (
            <p className="mt-2 text-sm text-zinc-700 line-clamp-2">{note}</p>
          ) : null}

          {tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
