import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const toSlug = (s: string) =>
  s.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

async function searchGoogleBooks(title: string, author: string, apiKey: string) {
  const queries = author
    ? [`intitle:${title} inauthor:${author}`, `${title} ${author}`, title]
    : [title];

  for (const query of queries) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=en&maxResults=5&printType=books&key=${apiKey}`
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.items?.length) continue;

      const item =
        data.items.find((i: any) => i.volumeInfo.title?.toLowerCase() === title.toLowerCase()) ??
        data.items[0];
      const info = item.volumeInfo;

      const thumb =
        info.imageLinks?.extraLarge ?? info.imageLinks?.large ??
        info.imageLinks?.medium ?? info.imageLinks?.thumbnail ?? null;

      return {
        title: info.title ?? title,
        authors: info.authors ?? (author ? [author] : null),
        cover_url: thumb ? thumb.replace(/^http:/, 'https:').replace('&edge=curl', '') : null,
        synopsis: info.description?.trim().slice(0, 2000) ?? null,
        page_count: info.pageCount ?? null,
        publication_year: null as number | null, // always use OL for pub year
      };
    } catch { continue; }
  }
  return null;
}

async function fetchOpenLibraryYear(title: string, author: string) {
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&limit=3&fields=cover_i,isbn,number_of_pages_median,first_publish_year,author_name,title`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const doc = data.docs?.[0];
    if (!doc) return null;
    return {
      publication_year: doc.first_publish_year ? parseInt(doc.first_publish_year) : null,
      cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
      isbn: doc.isbn?.[0] ?? null,
      page_count: doc.number_of_pages_median ?? null,
    };
  } catch { return null; }
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (request.headers.get('x-admin-key') !== import.meta.env.ADMIN_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const googleKey =
    (locals as any).runtime?.env?.GOOGLE_BOOKS_API_KEY as string | undefined
    ?? import.meta.env.GOOGLE_BOOKS_API_KEY;
  if (!googleKey) return json({ error: 'GOOGLE_BOOKS_API_KEY not configured' }, 503);

  const body = await request.json().catch(() => null);
  const rawTitle: string = body?.title?.trim();
  const author: string = body?.author?.trim() ?? '';
  if (!rawTitle) return json({ error: 'title required' }, 400);

  // Strip Goodreads-style parenthetical: "The Hourglass Throne (The Tarot Sequence, #3)"
  // → title: "The Hourglass Throne", series: "The Tarot Sequence", series_number: 3
  let title = rawTitle;
  let parsedSeries: string | null = null;
  let parsedSeriesNumber: number | null = null;
  const parenMatch = rawTitle.match(/^(.+?)\s+\(([^)]+),?\s*#([\d.]+)\)\s*$/);
  if (parenMatch) {
    title = parenMatch[1].trim();
    parsedSeries = parenMatch[2].trim().replace(/,+$/, '');
    parsedSeriesNumber = parseFloat(parenMatch[3]);
  } else {
    // No number — just strip the parenthetical entirely e.g. "(A Novel)"
    const parenOnly = rawTitle.match(/^(.+?)\s+\([^)]+\)\s*$/);
    if (parenOnly) title = parenOnly[1].trim();
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const slug = toSlug(title);

  // Dedup check
  const { data: existing } = await supabase.from('books').select('slug').eq('slug', slug).maybeSingle();
  if (existing) return json({ error: 'Already in DB', slug }, 409);

  const [gb, ol] = await Promise.all([
    searchGoogleBooks(title, author, googleKey),
    fetchOpenLibraryYear(title, author),
  ]);

  const record = {
    title: gb?.title ?? title,
    slug,
    authors: gb?.authors ?? (author ? [author] : null),
    cover_url: gb?.cover_url ?? ol?.cover_url ?? null,
    isbn: ol?.isbn ?? null,
    synopsis: gb?.synopsis ?? null,
    publication_year: ol?.publication_year ?? gb?.publication_year ?? null,
    page_count: gb?.page_count ?? ol?.page_count ?? null,
    series: parsedSeries,
    series_number: parsedSeriesNumber,
    darkness_level: null,
    heat_level: null,
  };

  const { error } = await supabase.from('books').insert(record);
  if (error) return json({ error: error.message }, 500);

  // Ensure minimal author row exists
  for (const name of (record.authors ?? [])) {
    await supabase.from('authors')
      .upsert({ name, slug: toSlug(name) }, { onConflict: 'slug', ignoreDuplicates: true } as any);
  }

  return json({ ok: true, slug, title: record.title });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
