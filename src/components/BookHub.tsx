import React, { useState } from 'react';
import type { BookInput } from '../lib/types';
import { createBook } from '../lib/db/books';

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
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [form, setForm] = useState<BookInput>(emptyForm);

  const handleSave = async (payload: BookInput) => {
    setSaveStatus(null);
    try {
      const book = await createBook(payload);
      if (!book) throw new Error('Failed to create book');
      setSaveStatus('✓ Book saved to database successfully!');
      setForm(emptyForm);
    } catch (err) {
      setSaveStatus(err instanceof Error ? err.message : 'Save failed');
    }
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
  };

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Add a new book</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Manually add a fantasy book to your database with all the metadata.
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
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Clean, Spicy"
                  value={form.heat_level || ''}
                  onChange={(event) =>
                    setForm({ ...form, heat_level: event.target.value })
                  }
                />
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
              Save book to database
            </button>
          </div>
        </form>

        {saveStatus && (
          <p
            className={`mt-3 text-sm ${saveStatus.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}
          >
            {saveStatus}
          </p>
        )}
      </section>
    </div>
  );
};

export default BookHub;
