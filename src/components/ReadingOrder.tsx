interface Book {
  title: string;
  slug?: string | null;
  cover_url?: string | null;
  publication_year?: number | null;
  page_count?: number | null;
  status: 'mandatory' | 'optional' | 'supplementary' | 'incomplete';
  note?: string;
}

export interface BookGroup {
  label: string;
  sublabel?: string;
  note?: string;
  noteType?: 'required' | 'optional' | 'warning';
  books: Book[];
}

interface ReadingOrderProps {
  books?: Book[];
  groups?: BookGroup[];
  description?: string;
}

const statusConfig = {
  mandatory:     { pill: 'bg-blue-100 text-blue-800 border-blue-200',    dot: 'bg-blue-500',    label: 'Core' },
  optional:      { pill: 'bg-green-100 text-green-800 border-green-200', dot: 'bg-green-500',   label: 'Optional' },
  supplementary: { pill: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500',   label: 'Extra' },
  incomplete:    { pill: 'bg-red-100 text-red-800 border-red-200',       dot: 'bg-red-400',     label: 'Incomplete' },
};

const noteStyle = {
  required: { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-800',   emoji: '⚡' },
  optional: { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-800',  emoji: '📖' },
  warning:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-900',  emoji: '⚠️' },
};

function BookEntry({ book, index }: { book: Book; index: number }) {
  const cfg = statusConfig[book.status];
  const inner = (
    <div className="relative flex items-start gap-4 py-2 group">
      <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full ${cfg.dot} flex items-center justify-center text-white font-bold text-sm shadow`}>
        {index + 1}
      </div>
      <div className={`flex-1 flex gap-3 rounded-xl border bg-white px-4 py-3 transition-all ${book.slug ? 'group-hover:shadow-md group-hover:border-zinc-300' : ''}`}>
        {book.cover_url && (
          <img
            src={book.cover_url}
            alt={book.title}
            className="shrink-0 w-12 h-16 object-cover rounded shadow-sm self-start"
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
    <a href={`/books/${book.slug}/`} className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

export default function ReadingOrder({ books, groups, description }: ReadingOrderProps) {
  const sourceGroups: BookGroup[] = groups ?? (books ? [{ label: '', books }] : []);

  // Pre-compute global start index for each group
  const groupsWithIndex = sourceGroups.map((g, gi) => ({
    ...g,
    startIndex: sourceGroups.slice(0, gi).reduce((sum, prev) => sum + prev.books.length, 0),
  }));

  return (
    <div>
      {description && (
        <p className="mb-8 text-zinc-600 leading-relaxed">{description}</p>
      )}

      <div className="space-y-8">
        {groupsWithIndex.map((group, gi) => (
          <div key={gi}>
            {/* Group header */}
            {group.label && (
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-zinc-200" />
                <div className="text-center px-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">
                    {group.label}
                  </span>
                  {group.sublabel && (
                    <span className="text-xs text-zinc-400 ml-1.5">({group.sublabel})</span>
                  )}
                </div>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>
            )}

            {/* Books timeline */}
            <div className="relative">
              <div className="absolute left-4.75 top-5 bottom-5 w-0.5 bg-zinc-200 z-0" />
              <div className="space-y-1">
                {group.books.map((book, bi) => (
                  <BookEntry key={bi} book={book} index={group.startIndex + bi} />
                ))}
              </div>
            </div>

            {/* Group note */}
            {group.note && group.noteType && (
              <div className={`mt-4 rounded-lg border ${noteStyle[group.noteType].border} ${noteStyle[group.noteType].bg} px-4 py-3`}>
                <p className={`text-sm ${noteStyle[group.noteType].text}`}>
                  <span className="mr-1.5">{noteStyle[group.noteType].emoji}</span>
                  {group.note}
                </p>
              </div>
            )}
          </div>
        ))}
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
