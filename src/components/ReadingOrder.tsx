interface Book {
  title: string;
  slug?: string | null;
  cover_url?: string | null;
  publication_year?: number | null;
  page_count?: number | null;
  status: 'mandatory' | 'optional' | 'supplementary' | 'incomplete';
  note?: string;
  darkness_level?: number | null;
  avg_rating?: number | null;
  series_label?: string | null;
  seriesLabel?: string | null;
  position?: number | null;
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
  showLegend?: boolean;
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

function BookCard({ book, index }: { book: Book; index: number }) {
  const cfg = statusConfig[book.status];

  const inner = (
    <div className="flex flex-col items-center text-center group w-28 sm:w-32 shrink-0">
      {/* Number badge with connecting line (line hidden on mobile) */}
      <div className="relative w-full flex justify-center mb-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 hidden sm:block" />
        <div className={`relative z-10 w-7 h-7 rounded-full ${cfg.dot} flex items-center justify-center text-white font-bold text-xs shadow shrink-0`}>
          {index + 1}
        </div>
      </div>

      {/* Cover */}
      <div className="w-24 sm:w-28 h-36 sm:h-40 rounded-lg overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100 mb-3 transition-all group-hover:shadow-md group-hover:scale-[1.02]">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/grimplaceholder.png';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-2xl">📖</div>
        )}
      </div>

      {/* Title */}
      <p className={`text-xs font-semibold text-zinc-900 leading-snug line-clamp-2 mb-0.5 ${book.slug ? 'group-hover:text-purple-700 transition-colors' : ''}`}>
        {book.title}
      </p>

      {/* Overall series position (e.g. Discworld #8) */}
      {book.position != null && (
        <p className="text-[10px] text-purple-400 font-medium leading-snug mb-0.5">#{book.position} in series</p>
      )}

      {/* Sub-series label — data file override or DB value */}
      {(book.seriesLabel ?? book.series_label) && (
        <p className="text-[10px] text-zinc-400 leading-snug mb-1 line-clamp-1">{book.seriesLabel ?? book.series_label}</p>
      )}

      {/* Status badge */}
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.pill}`}>
        {cfg.label}
      </span>

      {/* Darkness dots */}
      {book.darkness_level != null && book.darkness_level >= 1 && (
        <div className="flex items-center gap-1 mt-1.5" title={`Darkness: ${book.darkness_level}/5`}>
          <span className="text-xs leading-none">🕯️</span>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= book.darkness_level! ? 'bg-zinc-600' : 'bg-zinc-200'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Meta */}
      {book.avg_rating != null && (
        <p className="mt-1 text-xs text-amber-500 font-medium">★ {book.avg_rating.toFixed(2)}</p>
      )}
      {book.publication_year && (
        <p className="mt-0.5 text-xs text-zinc-400">{book.publication_year}</p>
      )}

      {/* Note (curated guides only) */}
      {book.note && (
        <p className="mt-1 text-xs text-zinc-500 leading-snug line-clamp-2 hidden sm:block">
          {book.note}
        </p>
      )}
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

export default function ReadingOrder({ books, groups, description, showLegend = true }: ReadingOrderProps) {
  const sourceGroups: BookGroup[] = groups ?? (books ? [{ label: '', books }] : []);

  const groupsWithIndex = sourceGroups.map((g, gi) => ({
    ...g,
    startIndex: sourceGroups.slice(0, gi).reduce((sum, prev) => sum + prev.books.length, 0),
  }));

  return (
    <div>
      {description && (
        <p className="mb-8 text-zinc-600 leading-relaxed">{description}</p>
      )}

      <div className="space-y-10">
        {groupsWithIndex.map((group, gi) => (
          <div key={gi}>
            {/* Group header */}
            {group.label && (
              <div className="flex items-center gap-3 mb-6">
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

            {/* Books row */}
            <div className="relative">
              <div className="flex flex-wrap gap-4 pb-2">
                {group.books.map((book, bi) => (
                  <BookCard key={bi} book={book} index={group.startIndex + bi} />
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

      {/* Legend — curated guides only */}
      {showLegend && (
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
      )}
    </div>
  );
}
