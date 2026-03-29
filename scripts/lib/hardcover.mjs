/**
 * hardcover.mjs
 *
 * Shared helper for the Hardcover GraphQL API.
 * Returns cover, rating, series, pages and release_date in one call.
 *
 * Requires: HARDCOVER_API_KEY=Bearer <token> in .env
 */

const HC_API = 'https://api.hardcover.app/v1/graphql';

async function hcQuery(query) {
  const key = process.env.HARDCOVER_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(HC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': key,
        'User-Agent': 'FantasyObscura/1.0 (contact@fantasyobscura.com)',
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch all useful Hardcover data for a book in one API call.
 *
 * @param {string} title
 * @param {string[]} authors
 * @returns {{ cover_url, rating, ratings_count, pages, release_year, series_name, series_number } | null}
 */
export async function fetchHardcoverBook(title, authors = []) {
  const safeTitle = title.replace(/["\n]/g, ' ').trim();

  const query = `{
    books(where: {title: {_ilike: "${safeTitle}"}}, limit: 5) {
      title
      rating
      ratings_count
      pages
      release_date
      image { url }
      series_books {
        position
        series { name }
      }
      contributions { author { name } }
    }
  }`;

  const data = await hcQuery(query);
  const items = data?.data?.books ?? [];
  if (!items.length) return null;

  // Match: prefer exact title + author match, then exact title, then first result
  const titleLower = title.toLowerCase();
  const authorLast = (authors[0] ?? '').toLowerCase().split(' ').at(-1) ?? '';

  const match =
    items.find(
      (i) =>
        i.title?.toLowerCase() === titleLower &&
        authorLast &&
        i.contributions?.some((c) => c.author?.name?.toLowerCase().includes(authorLast)),
    ) ||
    items.find((i) => i.title?.toLowerCase() === titleLower) ||
    items[0];

  if (!match) return null;

  const seriesBook = match.series_books?.[0] ?? null;
  const releaseYear = match.release_date
    ? parseInt(match.release_date.slice(0, 4), 10) || null
    : null;

  return {
    cover_url:     match.image?.url ?? null,
    rating:        match.rating != null ? parseFloat(parseFloat(match.rating).toFixed(2)) : null,
    ratings_count: match.ratings_count ?? null,
    pages:         match.pages ?? null,
    release_year:  releaseYear,
    series_name:   seriesBook?.series?.name ?? null,
    series_number: seriesBook?.position != null ? parseFloat(seriesBook.position) : null,
  };
}
