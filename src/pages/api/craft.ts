import type { APIRoute } from 'astro';
import { getBooks } from '../../lib/db/books';
import type { BookFilters } from '../../lib/types';

export const GET: APIRoute = async ({ url }) => {
  const p = url.searchParams;

  const filters: BookFilters = {};

  const tone = p.getAll('tone');
  if (tone.length) filters.tone = tone;

  const tropes = p.getAll('tropes');
  if (tropes.length) filters.tropes = tropes;

  const subgenres = p.getAll('subgenres');
  if (subgenres.length) filters.subgenres = subgenres;

  const pacing = p.get('pacing');
  if (pacing) filters.pacing = pacing;

  const magic_system = p.get('magic_system');
  if (magic_system) filters.magic_system = magic_system;

  const heat_level = p.get('heat_level');
  if (heat_level) filters.heat_level = heat_level;

  const audience = p.get('audience');
  if (audience) filters.audience = audience;

  const min_pages = p.get('min_pages');
  if (min_pages) filters.min_pages = parseInt(min_pages);

  const max_pages = p.get('max_pages');
  if (max_pages) filters.max_pages = parseInt(max_pages);

  if (p.get('avoid_explicit') === '1') filters.avoid_explicit = true;
  if (p.get('avoid_grimdark') === '1') filters.avoid_grimdark = true;
  if (p.get('has_audiobook') === '1') filters.has_audiobook = true;

  try {
    const result = await getBooks(filters, { page: 1, pageSize: 50, sort: 'rating_desc' });

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ books: result.data, count: result.count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Search failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
