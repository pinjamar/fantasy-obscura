import React, { useMemo, useState } from 'react';
import type { BookInput, BookSearchResult } from '../lib/types';

type Source = 'openlibrary' | 'googlebooks' | 'harvard' | 'bigbook' | 'gutendex';

const sourceOptions: Array<{ value: Source; label: string }> = [
  { value: 'openlibrary', label: 'Open Library' },
  { value: 'googlebooks', label: 'Google Books' },
  { value: 'gutendex', label: 'Project Gutenberg' },
  { value: 'harvard', label: 'Harvard GraphQL' },
  { value: 'bigbook', label: 'Bigbook API' },
];

const emptyForm: BookInput = {
  title: '',
  authors: [],
  isbn: '',
  cover_url: '',
  publication_year: undefined,
  page_count: undefined,
  avg_rating: undefined,
  synopsis: '',
  subgenres: [],
  tropes: [],
  magic_system: '',
  tone: [],
  pacing: '',
  heat_level: '',
  darkness_level: undefined,
  diversity_rep: [],
};

const parseTags = (value: string) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

const parseNumber = (value: string) => {
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

const BookHub: React.FC = () => {
  const [source, setSource] = useState<Source>('openlibrary');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [form, setForm] = useState<BookInput>(emptyForm);

  const hasResults = results.length > 0;

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `/api/search?source=${source}&q=${encodeURIComponent(query.trim())}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setResults(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (payload: BookInput) => {
    setSaveStatus(null);
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSaveStatus('✓ Saved to database.');
    } catch (err) {
      setSaveStatus(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleResultSave = (book: BookSearchResult) => {
    const payload: BookInput = {
      title: book.title,
      authors: book.authors || [],
      cover_url: book.cover_url || undefined,
      isbn: book.isbn || undefined,
      synopsis: book.synopsis || undefined,
      page_count: book.page_count ?? undefined,
      publication_year: book.publication_year ?? undefined,
      avg_rating: book.avg_rating ?? undefined,
    };
    void handleSave(payload);
  };

  const handleManualSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setSaveStatus('Title is required.');
      return;
    }

    const payload: BookInput = {
      ...form,
      title: form.title.trim(),
      authors: form.authors?.filter(Boolean) || [],
      subgenres: form.subgenres?.filter(Boolean) || [],
      tropes: form.tropes?.filter(Boolean) || [],
      tone: form.tone?.filter(Boolean) || [],
      diversity_rep: form.diversity_rep?.filter(Boolean) || [],
    };

    void handleSave(payload);
    setForm(emptyForm);
  };

  const quickStats = useMemo(() => {
    const sources = results.reduce<Record<string, number>>((acc, item) => {
      const key = item.source || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return sources;
  }, [results]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">🔍 Fetch from External APIs</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Search Open Library, Google Books, Harvard GraphQL, or Bigbook and
          bulk import results directly into your database.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <select
            value={source}
            onChange={(event) => setSource(event.target.value as Source)}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author, ISBN..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
            disabled={loading}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {hasResults && (
          <div className="mt-4 text-xs text-zinc-500">
            {Object.entries(quickStats).map(([key, value]) => (
              <span key={key} className="mr-3">
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {results.map((book, index) => (
            <article
              key={`${book.source_id || index}`}
              className="rounded-xl border p-4"
            >
              <div className="flex items-start gap-4">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="h-24 w-16 rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-24 w-16 rounded bg-zinc-100" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-zinc-600">
                    {book.authors?.join(', ') || 'Unknown author'}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {book.publication_year
                      ? `Year: ${book.publication_year}`
                      : 'Year unknown'}
                    {book.page_count ? ` · ${book.page_count} pages` : ''}
                  </p>
                  {book.isbn && (
                    <p className="text-xs text-zinc-500">ISBN: {book.isbn}</p>
                  )}
                </div>
              </div>
              <button
                className="mt-4 rounded-lg border px-3 py-1 text-xs hover:bg-zinc-50"
                onClick={() => handleResultSave(book)}
              >
                💾 Save to database
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">✍️ Manual Book Entry</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Add a custom book that isn't in the external APIs.
        </p>

        <form
          onSubmit={handleManualSubmit}
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Title *</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Authors (comma separated)
            </label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.authors?.join(', ') || ''}
              onChange={(event) =>
                setForm({ ...form, authors: parseTags(event.target.value) })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">ISBN</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.isbn || ''}
              onChange={(event) =>
                setForm({ ...form, isbn: event.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Publication year</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.publication_year ?? ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  publication_year: parseNumber(event.target.value),
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Page count</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.page_count ?? ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  page_count: parseNumber(event.target.value),
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Avg rating (0-5)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.avg_rating ?? ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  avg_rating: parseNumber(event.target.value),
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Cover URL</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.cover_url || ''}
              onChange={(event) =>
                setForm({ ...form, cover_url: event.target.value })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Synopsis</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              rows={3}
              value={form.synopsis || ''}
              onChange={(event) =>
                setForm({ ...form, synopsis: event.target.value })
              }
            />
          </div>

          <div className="sm:col-span-2 border-t pt-4">
            <h3 className="font-medium text-sm mb-3">Fantasy Metadata</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">
                  Subgenres (comma separated)
                </label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Epic Fantasy, High Fantasy"
                  value={form.subgenres?.join(', ') || ''}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      subgenres: parseTags(event.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Tropes (comma separated)
                </label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Found Family, Chosen One"
                  value={form.tropes?.join(', ') || ''}
                  onChange={(event) =>
                    setForm({ ...form, tropes: parseTags(event.target.value) })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Magic system</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Hard Magic, Soft Magic"
                  value={form.magic_system || ''}
                  onChange={(event) =>
                    setForm({ ...form, magic_system: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Tone (comma separated)
                </label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Grimdark, Hopeful"
                  value={form.tone?.join(', ') || ''}
                  onChange={(event) =>
                    setForm({ ...form, tone: parseTags(event.target.value) })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pacing</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Fast-paced, Slow-burn"
                  value={form.pacing || ''}
                  onChange={(event) =>
                    setForm({ ...form, pacing: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Heat level</label>
                <select
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.heat_level || ''}
                  onChange={(event) =>
                    setForm({ ...form, heat_level: event.target.value || null })
                  }
                >
                  <option value="">— not set —</option>
                  <option value="none">❄️ No romance</option>
                  <option value="Sweet Romance">🔥 Sweet Romance</option>
                  <option value="Closed Door">🔥🔥 Closed Door</option>
                  <option value="Open Door">🔥🔥🔥 Open Door</option>
                  <option value="Explicit">🔥🔥🔥🔥 Explicit</option>
                  <option value="Fiery">🔥🔥🔥🔥🔥 Fiery</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Darkness level</label>
                <select
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.darkness_level ?? ''}
                  onChange={(event) =>
                    setForm({ ...form, darkness_level: event.target.value === '' ? undefined : Number(event.target.value) })
                  }
                >
                  <option value="">— not set —</option>
                  <option value="1">🕯️ Lighthearted</option>
                  <option value="2">🕯️🕯️ Mild</option>
                  <option value="3">🕯️🕯️🕯️ Serious</option>
                  <option value="4">🕯️🕯️🕯️🕯️ Dark</option>
                  <option value="5">🕯️🕯️🕯️🕯️🕯️ Brutal</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Diversity rep (comma separated)
                </label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="LGBTQ+ Protagonist, POC Protagonist"
                  value={form.diversity_rep?.join(', ') || ''}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      diversity_rep: parseTags(event.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              💾 Save to database
            </button>
          </div>
        </form>

        {saveStatus && (
          <p
            className={`mt-3 text-sm ${
              saveStatus.startsWith('✓') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {saveStatus}
          </p>
        )}
      </section>
    </div>
  );
};

export default BookHub;
