import { useState, useEffect, useRef } from 'react';
import Stars from './Stars';

const SHELVES = [
  { key: 'favourites',        label: 'Favourites',        icon: '❤️' },
  { key: 'want_to_read',      label: 'Want to Read',      icon: '🔖' },
  { key: 'currently_reading', label: 'Currently Reading', icon: '📖' },
  { key: 'read',              label: 'Read',              icon: '✅' },
] as const;

type ShelfKey = typeof SHELVES[number]['key'];

const DARKNESS_CANDLES = ['', '🕯️', '🕯️🕯️', '🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️', '🕯️🕯️🕯️🕯️🕯️'];

interface Book {
  id: string;
  title: string;
  slug?: string | null;
  authors: string[] | null;
  cover_url?: string | null;
  avg_rating?: number | null;
  publication_year?: number | null;
  subgenres?: string[] | null;
  series?: string | null;
  series_number?: number | null;
  darkness_level?: number | null;
}

interface ShelfEntry {
  id: string;
  shelf: ShelfKey;
  created_at: string;
  books: Book;
}

interface ProfileProps {
  userEmail: string;
  initialName: string | null;
  initialAvatar: string | null;
}

function ProfileHeader({ userEmail, initialName, initialAvatar }: ProfileProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName ?? '');
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar ?? '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const displayName = name.trim() || userEmail.split('@')[0];
  const initials = displayName.slice(0, 2).toUpperCase();

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/profile/avatar', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.avatar_url) setAvatarUrl(data.avatar_url);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: name.trim() || null, avatar_url: avatarUrl || null }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSaveError(data.error || 'Failed to save. Make sure the user_profiles table exists in Supabase.');
        setSaving(false);
        return;
      }
      // Reload so the server-rendered navbar picks up the new name/avatar
      window.location.reload();
    } catch {
      setSaveError('Network error. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="mb-8 pb-8 border-b border-zinc-100">
      {!editing ? (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow">
                {initials}
              </div>
            )}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-zinc-900 text-lg leading-tight">{displayName}</p>
            {!name.trim() && <p className="text-sm text-zinc-400 mt-0.5">{userEmail}</p>}
          </div>
          <button
            onClick={() => setEditing(true)}
            className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            Edit profile
          </button>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          {/* Avatar picker */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative w-16 h-16 rounded-full cursor-pointer group"
            >
              {avatarUrl ? (
                <>
                  <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover ring-2 ring-purple-300" />
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploading
                      ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      : <span className="text-white text-xs font-medium">Change</span>
                    }
                  </div>
                </>
              ) : (
                <div className="w-full h-full rounded-full bg-purple-50 border-2 border-dashed border-purple-300 flex flex-col items-center justify-center gap-0.5 group-hover:border-purple-500 group-hover:bg-purple-100 transition-colors">
                  {uploading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                      <span className="text-[9px] text-purple-400 group-hover:text-purple-600 font-medium leading-none transition-colors">Upload</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); }}
            />
            {avatarUrl && (
              <button
                onClick={() => setAvatarUrl('')}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {/* Name input + actions */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-zinc-500 mb-1">Display name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userEmail.split('@')[0]}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <p className="text-xs text-zinc-400 mt-1">{userEmail}</p>
            {saveError && (
              <p className="text-xs text-red-500 mt-2">{saveError}</p>
            )}
            <div className="flex gap-2 mt-3">
              <button
                onClick={save}
                disabled={saving}
                className="px-4 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={() => { setEditing(false); setName(initialName ?? ''); setAvatarUrl(initialAvatar ?? ''); setSaveError(''); }}
                className="px-4 py-1.5 border border-zinc-200 text-zinc-600 text-xs font-medium rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MyShelfProps {
  userEmail: string;
  initialName: string | null;
  initialAvatar: string | null;
}

export default function MyShelf({ userEmail, initialName, initialAvatar }: MyShelfProps) {
  const [entries, setEntries] = useState<ShelfEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ShelfKey>('favourites');
  const [movingId, setMovingId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/shelf')
      .then((r) => r.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const shelfBooks = (key: ShelfKey) => entries.filter((e) => e.shelf === key).map((e) => e.books);
  const counts: Record<ShelfKey, number> = {
    want_to_read:      entries.filter((e) => e.shelf === 'want_to_read').length,
    currently_reading: entries.filter((e) => e.shelf === 'currently_reading').length,
    read:              entries.filter((e) => e.shelf === 'read').length,
    favourites:        entries.filter((e) => e.shelf === 'favourites').length,
  };

  const moveBook = async (bookId: string, toShelf: ShelfKey) => {
    setMovingId(bookId);
    await fetch('/api/shelf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, shelf: toShelf }),
    });
    setEntries((prev) =>
      prev.map((e) => (e.books.id === bookId ? { ...e, shelf: toShelf } : e))
    );
    setMovingId(null);
  };

  const removeBook = async (bookId: string) => {
    setMovingId(bookId);
    await fetch(`/api/shelf?bookId=${bookId}`, { method: 'DELETE' });
    setEntries((prev) => prev.filter((e) => e.books.id !== bookId));
    setMovingId(null);
  };

  const handleDrop = (toId: string) => {
    if (!draggedId || draggedId === toId) return;
    const shelfEntries = entries.filter((e) => e.shelf === activeTab);
    const otherEntries = entries.filter((e) => e.shelf !== activeTab);
    const fromIdx = shelfEntries.findIndex((e) => e.books.id === draggedId);
    const toIdx   = shelfEntries.findIndex((e) => e.books.id === toId);
    const reordered = [...shelfEntries];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setEntries([...otherEntries, ...reordered]);
    const order = reordered.map((e) => e.books.id);
    fetch('/api/shelf/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shelf: activeTab, order }),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
      </div>
    );
  }

  const activeBooks = shelfBooks(activeTab);

  return (
    <div>
      {/* Profile header */}
      <ProfileHeader userEmail={userEmail} initialName={initialName} initialAvatar={initialAvatar} />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {SHELVES.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => setActiveTab(key)}
            className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${
              activeTab === key
                ? 'border-purple-300 bg-purple-50'
                : 'border-zinc-200 bg-white hover:border-zinc-300'
            }`}
          >
            <p className="text-2xl leading-none mb-1">{icon}</p>
            <p className={`text-xl font-bold ${activeTab === key ? 'text-purple-700' : 'text-zinc-800'}`}>
              {counts[key]}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-200 mb-6">
        {SHELVES.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === key
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            {icon} {label}
            {counts[key] > 0 && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === key ? 'bg-purple-100 text-purple-700' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Book grid */}
      {activeBooks.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-4xl mb-3">{SHELVES.find((s) => s.key === activeTab)?.icon}</p>
          <p className="text-base font-medium text-zinc-600">No books here yet</p>
          <p className="text-sm mt-1">
            {activeTab === 'want_to_read' && 'Save books you want to read by clicking "Add to Shelf" on any book page.'}
            {activeTab === 'currently_reading' && 'Move a book here when you start reading it.'}
            {activeTab === 'read' && 'Mark books as read to track your progress.'}
            {activeTab === 'favourites' && 'Add your all-time favourites here.'}
          </p>
          <a
            href="/books/"
            className="inline-block mt-5 px-5 py-2.5 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Browse books
          </a>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {activeBooks.map((book) => {
            const href = book.slug ? `/books/${book.slug}/` : null;
            const busy = movingId === book.id;
            const isDragging = draggedId === book.id;
            const isOver = dragOverId === book.id;

            return (
              <div
                key={book.id}
                draggable
                onDragStart={(e) => {
                  setDraggedId(book.id);
                  // Use only the cover image as drag ghost
                  const ghost = document.createElement('div');
                  ghost.style.cssText = 'width:56px;height:84px;border-radius:6px;overflow:hidden;position:fixed;top:-999px;left:-999px;pointer-events:none;';
                  const img = e.currentTarget.querySelector('img');
                  if (img) {
                    const clone = img.cloneNode() as HTMLImageElement;
                    clone.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                    ghost.appendChild(clone);
                  } else {
                    ghost.style.background = 'linear-gradient(135deg,#e9d5ff,#bfdbfe)';
                    ghost.innerHTML = '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.5rem">📖</span>';
                  }
                  document.body.appendChild(ghost);
                  e.dataTransfer.setDragImage(ghost, 28, 42);
                  setTimeout(() => document.body.removeChild(ghost), 0);
                }}
                onDragEnd={() => { setDraggedId(null); setDragOverId(null); }}
                onDragOver={(e) => { e.preventDefault(); setDragOverId(book.id); }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => { e.preventDefault(); handleDrop(book.id); setDraggedId(null); setDragOverId(null); }}
                className={`group relative transition-all cursor-grab active:cursor-grabbing ${busy ? 'opacity-40' : ''} ${isDragging ? 'opacity-30 scale-95' : ''}`}
              >
                {/* Drop indicator */}
                {isOver && !isDragging && (
                  <div className="absolute -left-1.5 inset-y-0 w-1 bg-purple-500 rounded-full z-10" />
                )}
                {/* Cover — links to book page */}
                <a
                  href={href ?? '#'}
                  onClick={(e) => { if (draggedId) e.preventDefault(); }}
                  className={`block relative w-full aspect-2/3 rounded-lg overflow-hidden bg-linear-to-br from-purple-100 to-blue-100 shadow-sm transition-all ${isOver && !isDragging ? 'ring-2 ring-purple-400' : 'hover:shadow-md'}`}
                >
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-full object-cover pointer-events-none"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">📖</span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center py-2 rounded-b-lg">
                    <button
                      onClick={(e) => { e.preventDefault(); removeBook(book.id); }}
                      disabled={busy}
                      className="text-white/80 hover:text-red-400 text-xs font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
