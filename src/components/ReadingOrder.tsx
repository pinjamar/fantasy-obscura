interface Book {
  title: string;
  slug?: string | null;
  cover_url?: string | null;
  publication_year?: number | null;
  page_count?: number | null;
  status: 'mandatory' | 'optional' | 'supplementary' | 'incomplete';
  note?: string;
}

interface ReadingOrderProps {
  books: Book[];
  description?: string;
}

const statusConfig = {
  mandatory:     { pill: 'bg-blue-100 text-blue-800 border-blue-200',    dot: 'bg-blue-500',    label: 'Core' },
  optional:      { pill: 'bg-green-100 text-green-800 border-green-200', dot: 'bg-green-500',   label: 'Optional' },
  supplementary: { pill: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500',   label: 'Extra' },
  incomplete:    { pill: 'bg-red-100 text-red-800 border-red-200',       dot: 'bg-red-400',     label: 'Incomplete' },
};

export default function ReadingOrder({ books, description }: ReadingOrderProps) {
  return (
    <div>
      {description && (
        <p className="mb-8 text-zinc-600 leading-relaxed">{description}</p>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-4.75 top-5 bottom-5 w-0.5 bg-zinc-200 z-0" />

        <div className="space-y-1">
          {books.map((book, i) => {
            const cfg = statusConfig[book.status];
            const inner = (
              <div className="relative flex items-start gap-4 py-2 group">
                {/* Numbered dot */}
                <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full ${cfg.dot} flex items-center justify-center text-white font-bold text-sm shadow`}>
                  {i + 1}
                </div>

                {/* Card */}
                <div className={`flex-1 flex gap-3 rounded-xl border bg-white px-4 py-3 transition-all ${book.slug ? 'group-hover:shadow-md group-hover:border-zinc-300' : ''}`}>
                  {/* Cover */}
                  {book.cover_url && (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="shrink-0 w-10 h-14 object-cover rounded shadow-sm self-start"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-semibold text-zinc-900 leading-snug ${book.slug ? 'group-hover:text-purple-700 transition-colors' : ''}`}>
                        {book.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.pill}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      {book.note && <span>{book.note}</span>}
                      {book.publication_year && <span>{book.publication_year}</span>}
                      {book.page_count && <span>{book.page_count} pp.</span>}
                    </div>
                    {book.slug && (
                      <p className="mt-1.5 text-xs text-purple-600 font-medium">View details →</p>
                    )}
                  </div>
                </div>
              </div>
            );

            return book.slug ? (
              <a key={i} href={`/books/${book.slug}/`} className="block">
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-5 text-sm border-t pt-6">
        {(Object.entries(statusConfig) as [string, typeof statusConfig['mandatory']][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.pill}`}>
              {cfg.label}
            </span>
            <span className="text-zinc-500">
              {key === 'mandatory'     ? 'Essential to the main story'
               : key === 'optional'   ? 'Adds depth, not required'
               : key === 'incomplete' ? 'Not yet released or unfinished'
               :                       'Side stories & novellas'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
