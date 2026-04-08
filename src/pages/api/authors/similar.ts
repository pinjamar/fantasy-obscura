import type { APIRoute } from 'astro';
import { supabaseClient as supabase } from '../../../lib/supabaseClient';

function topN(arrays: (string[] | null)[], n: number): string[] {
  const freq = new Map<string, number>();
  for (const arr of arrays) for (const v of arr ?? []) freq.set(v, (freq.get(v) ?? 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([v]) => v);
}

function overlapCount(a: string[], b: string[]): number {
  const set = new Set(b);
  return a.filter((v) => set.has(v)).length;
}

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug')?.trim();
  if (!slug) return json({ error: 'slug required' }, 400);

  // 1. Get source author name + genres
  const { data: author } = await supabase
    .from('authors')
    .select('name, top_genres')
    .eq('slug', slug)
    .maybeSingle();

  if (!author) return json({ error: 'Author not found' }, 404);

  const srcGenres: string[] = author.top_genres ?? [];

  // 2. Get source author's books → aggregate top tropes + tones
  const { data: srcBooks } = await supabase
    .from('books')
    .select('tropes, tone')
    .contains('authors', [author.name])
    .limit(60);

  const topTropes = topN((srcBooks ?? []).map((b) => b.tropes), 6);
  const topTones  = topN((srcBooks ?? []).map((b) => b.tone),   4);

  if (!srcGenres.length && !topTropes.length && !topTones.length) {
    return json({ items: [] });
  }

  // 3. Score map: authorName → { genreScore, tropeScore, toneScore }
  const scores = new Map<string, { g: number; t: number; n: number }>();

  const bump = (name: string, g = 0, t = 0, n = 0) => {
    const prev = scores.get(name) ?? { g: 0, t: 0, n: 0 };
    scores.set(name, { g: prev.g + g, t: prev.t + t, n: prev.n + n });
  };

  // 4a. Genre pool — this is the hard filter: only authors sharing at least one genre qualify
  const genrePoolNames = new Set<string>();
  if (srcGenres.length) {
    const { data: genrePool } = await supabase
      .from('authors')
      .select('name, top_genres')
      .overlaps('top_genres', srcGenres)
      .neq('slug', slug)
      .gte('book_count', 3)
      .limit(150);

    for (const a of genrePool ?? []) {
      genrePoolNames.add(a.name);
      bump(a.name, overlapCount(a.top_genres ?? [], srcGenres) * 3);
    }
  }

  if (!genrePoolNames.size) return json({ items: [] });

  // 4b & 4c. Tropes + tones re-rank within the genre pool only
  const [tropeBooks, toneBooks] = await Promise.all([
    topTropes.length
      ? supabase.from('books').select('authors, tropes').overlaps('tropes', topTropes).limit(300)
      : { data: [] },
    topTones.length
      ? supabase.from('books').select('authors, tone').overlaps('tone', topTones).limit(300)
      : { data: [] },
  ]);

  for (const b of (tropeBooks.data ?? []) as any[]) {
    const score = overlapCount(b.tropes ?? [], topTropes) * 2;
    for (const name of b.authors ?? [])
      if (genrePoolNames.has(name)) bump(name, 0, score);
  }
  for (const b of (toneBooks.data ?? []) as any[]) {
    const score = overlapCount(b.tone ?? [], topTones) * 1;
    for (const name of b.authors ?? [])
      if (genrePoolNames.has(name)) bump(name, 0, 0, score);
  }

  // 5. Sort genre-pool candidates by combined score, take top 30 names
  const ranked = [...scores.entries()]
    .map(([name, s]) => ({ name, total: s.g + s.t + s.n }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 32);

  if (!ranked.length) return json({ items: [] });

  // 6. Fetch author metadata for the top candidates
  const topNames = ranked.map((e) => e.name);
  const { data: authorRows } = await supabase
    .from('authors')
    .select('name, slug, photo_url, book_count, top_genres, avg_rating')
    .in('name', topNames)
    .gte('book_count', 3);

  // Re-sort by original score order and return top 20
  const metaMap = new Map((authorRows ?? []).map((a) => [a.name, a]));
  const items = ranked
    .map((e) => metaMap.get(e.name))
    .filter(Boolean)
    .slice(0, 21);

  return json({ items });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
