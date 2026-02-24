import { useState, useMemo } from 'react';
import { PUBLIC_TROPES, INTERNAL_TAGS } from '../data/tropes';
import type { BookTag } from '../lib/db/tags';

// All 217 options combined, each with a display group
const ALL_OPTIONS = [
  ...PUBLIC_TROPES.map((t) => ({ slug: t.slug, name: t.name, group: `${t.category.charAt(0).toUpperCase() + t.category.slice(1)} tropes` })),
  ...INTERNAL_TAGS.map((t) => ({ slug: t.slug, name: t.name, group: 'Micro-tags' })),
];

interface Props {
  bookId: string;
  bookSlug: string;
  initialTags: BookTag[];
  userEmail: string | null;
}

export default function CommunityTags({ bookId, bookSlug, initialTags, userEmail }: Props) {
  const [tags, setTags] = useState<BookTag[]>(initialTags);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<{ slug: string; name: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');

  const filtered = useMemo(() => {
    if (!query) return ALL_OPTIONS.slice(0, 40);
    const q = query.toLowerCase();
    return ALL_OPTIONS.filter((o) => o.name.toLowerCase().includes(q)).slice(0, 40);
  }, [query]);

  const submit = async () => {
    if (!selected) return;
    setStatus('submitting');
    try {
      const res = await fetch(`/api/books/${bookSlug}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag_slug: selected.slug, tag_name: selected.name }),
      });
      if (res.status === 401) { window.location.href = `/auth/login?redirectTo=/books/${bookSlug}/`; return; }
      if (res.status === 409 || res.status === 201) {
        const data = await res.json();
        setStatus(data.duplicate ? 'duplicate' : 'success');
        setSelected(null);
        setQuery('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mb-12 rounded-2xl border bg-zinc-50 p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Community Tags</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Tags help readers find this book by vibe, content, and theme</p>
        </div>
        {!userEmail && (
          <a
            href={`/auth/login?redirectTo=/books/${bookSlug}/`}
            className="shrink-0 ml-4 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Sign in to tag
          </a>
        )}
      </div>

      {/* Approved tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center px-3 py-1.5 bg-white border text-zinc-700 rounded-full text-sm shadow-xs hover:bg-zinc-50 transition-colors"
            >
              🏷️ {tag.tag_name}
            </span>
          ))}
        </div>
      )}

      {/* Tag submission — signed-in users only */}
      {userEmail ? (
        <div className="p-4 rounded-xl border border-zinc-200 bg-white">
          {status === 'success' ? (
            <div className="flex items-center gap-3 text-sm text-emerald-700">
              <span className="text-lg">✅</span>
              <div>
                <p className="font-medium">Tag submitted — thanks!</p>
                <p className="text-xs text-zinc-500 mt-0.5">It'll appear here once approved.</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="ml-auto text-xs text-zinc-400 hover:text-zinc-600"
              >
                Suggest another
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-zinc-700 mb-3">Suggest a tag for this book</p>

              {/* Combobox */}
              <div className="relative">
                <input
                  type="text"
                  value={selected ? selected.name : query}
                  placeholder="Search tropes and tags…"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onFocus={() => { setOpen(true); if (selected) { setSelected(null); setQuery(''); } }}
                  onChange={(e) => { setQuery(e.target.value); setSelected(null); setOpen(true); }}
                />
                {open && filtered.length > 0 && (
                  <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-lg text-sm">
                    {filtered.map((opt) => (
                      <li
                        key={opt.slug}
                        className="px-3 py-2 hover:bg-purple-50 cursor-pointer flex items-center justify-between gap-2"
                        onMouseDown={(e) => { e.preventDefault(); setSelected(opt); setOpen(false); setQuery(''); setStatus('idle'); }}
                      >
                        <span>{opt.name}</span>
                        <span className="text-[10px] text-zinc-400 shrink-0">{opt.group}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-600 mt-2">Something went wrong — please try again.</p>
              )}
              {status === 'duplicate' && (
                <p className="text-xs text-zinc-500 mt-2">You've already suggested this tag for this book.</p>
              )}

              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-zinc-400">Signed in as {userEmail}</p>
                <button
                  disabled={!selected || status === 'submitting'}
                  onClick={submit}
                  className="px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Suggest tag'}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-200 bg-white">
          <span className="text-2xl shrink-0">🏷️</span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-700">Know a better tag for this book?</p>
            <p className="text-xs text-zinc-500 mt-0.5">Sign in to suggest tags and help the community discover great reads.</p>
          </div>
          <a
            href={`/auth/login?redirectTo=/books/${bookSlug}/`}
            className="shrink-0 ml-auto px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors whitespace-nowrap"
          >
            Sign in to tag
          </a>
        </div>
      )}
    </section>
  );
}
