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

  const excludeWarnings = p.getAll('exclude_warning');
  if (excludeWarnings.length) filters.exclude_warnings = excludeWarnings;
  if (p.get('has_audiobook') === '1') filters.has_audiobook = true;

  const accessibility = p.get('accessibility');
  if (accessibility) filters.accessibility = accessibility;

  const awards = p.getAll('awards');
  if (awards.length) filters.awards = awards;

  const stakes = p.get('stakes');
  if (stakes) filters.stakes = stakes;

  const series_status = p.get('series_status');
  if (series_status) filters.series_status = series_status;

  const pov_style = p.get('pov_style');
  if (pov_style) filters.pov_style = pov_style;

  const pov_count = p.get('pov_count');
  if (pov_count) filters.pov_count = pov_count;

  const protagonist_gender = p.get('protagonist_gender');
  if (protagonist_gender) filters.protagonist_gender = protagonist_gender;

  const publication_era = p.get('publication_era');
  if (publication_era) filters.publication_era = publication_era;

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
