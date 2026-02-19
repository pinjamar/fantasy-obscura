interface Book {
  title: string;
  status: 'mandatory' | 'optional' | 'supplementary';
  note?: string;
}

interface ReadingOrderProps {
  books: Book[];
  description?: string;
}

const statusColors = {
  mandatory: 'bg-blue-100 text-blue-800 border-blue-200',
  optional: 'bg-green-100 text-green-800 border-green-200',
  supplementary: 'bg-amber-100 text-amber-800 border-amber-200',
};

const statusLabels = {
  mandatory: 'Core',
  optional: 'Optional',
  supplementary: 'Extra',
};

export default function ReadingOrder({ books, description }: ReadingOrderProps) {
  return (
    <div>
      {description && (
        <p className="mb-6 text-zinc-600">{description}</p>
      )}

      <div className="space-y-3">
        {books.map((book, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-semibold text-zinc-700">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 flex-wrap">
                <h3 className="font-medium text-zinc-900">{book.title}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    statusColors[book.status]
                  }`}
                >
                  {statusLabels[book.status]}
                </span>
              </div>
              {book.note && (
                <p className="mt-1 text-sm text-zinc-600">{book.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Core
          </span>
          <span className="text-zinc-600">Essential to the main story</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Optional
          </span>
          <span className="text-zinc-600">Adds depth but not required</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            Extra
          </span>
          <span className="text-zinc-600">Side stories & novellas</span>
        </div>
      </div>
    </div>
  );
}
