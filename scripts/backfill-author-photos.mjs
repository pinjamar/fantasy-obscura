/**
 * backfill-author-photos.mjs
 *
 * Finds authors in the DB with photo_url = null and tries to find a photo.
 * Only updates photo_url — does not touch bio, goodreads, or any other field.
 *
 * Sources tried in order:
 *   1. Open Library
 *   2. Wikipedia (search API — handles initials & disambiguation)
 *   3. Wikidata (SPARQL image query)
 *   4. Google Books (author image from book search)
 *   5. Google Knowledge Graph (requires GOOGLE_KG_API_KEY)
 *   6. Hardcover
 *
 * Usage:
 *   node scripts/backfill-author-photos.mjs
 *   node scripts/backfill-author-photos.mjs --dry-run
 *   node scripts/backfill-author-photos.mjs --limit 50
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const DRY_RUN  = process.argv.includes('--dry-run');
const LIMIT_IDX = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_IDX !== -1 ? parseInt(process.argv[LIMIT_IDX + 1], 10) : null;
const DELAY_MS  = 400;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const HEADERS = { 'User-Agent': 'FantasyObscura/1.0 (contact@fantasyobscura.com)' };

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

/** "Björn Petersen" → "Bjorn Petersen" */
function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * "A.J. Simpson" → "A J Simpson" (expand dots for broader search compatibility)
 * Also handles "J.R.R. Tolkien" → "J R R Tolkien"
 */
function expandInitials(name) {
  return name.replace(/\b([A-Z])\.([A-Z])/g, '$1 $2').replace(/\b([A-Z])\./g, '$1').trim();
}

async function apiFetch(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

// ── Open Library ──────────────────────────────────────────────────────────────

async function fromOpenLibrary(name) {
  const search = await apiFetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}&limit=3`,
  );
  if (!search?.docs?.length) return null;

  const nameLower = name.toLowerCase();
  const doc =
    search.docs.find((d) => d.name?.toLowerCase() === nameLower) ||
    search.docs.find((d) => d.name?.toLowerCase().includes(nameLower.split(' ').at(-1))) ||
    search.docs[0];

  if (!doc?.key) return null;
  const olid = doc.key.replace('/authors/', '');
  await sleep(DELAY_MS);

  const author = await apiFetch(`https://openlibrary.org/authors/${olid}.json`);
  if (!author) return null;

  const photoId = author.photos?.find((id) => id > 0) ?? null;
  return photoId ? `https://covers.openlibrary.org/a/id/${photoId}-L.jpg` : null;
}

// ── Wikipedia (search API — handles initials & disambiguation) ────────────────

async function fromWikipedia(name) {
  // Step 1: search for the page title rather than guessing the URL
  const search = await apiFetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' author')}&srlimit=3&format=json`,
  );
  const hit = search?.query?.search?.[0];
  if (!hit) return null;

  await sleep(DELAY_MS);

  // Step 2: fetch summary for the top result
  const d = await apiFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/ /g, '_'))}`,
  );
  if (!d || d.type === 'disambiguation' || !d.extract) return null;

  const lower = d.extract.toLowerCase();
  const isAuthor =
    lower.includes('author') || lower.includes('writer') || lower.includes('novelist') ||
    lower.includes('novel') || lower.includes('fantasy') || lower.includes('fiction') ||
    lower.includes('science fiction') || lower.includes('manga') || lower.includes('comics');
  if (!isAuthor) return null;

  // Prefer original_image (higher res) over thumbnail
  return d.originalimage?.source ?? d.thumbnail?.source ?? null;
}

// ── Wikidata ──────────────────────────────────────────────────────────────────

async function fromWikidata(name) {
  // Search for the entity
  const search = await apiFetch(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&type=item&limit=3&format=json`,
  );
  const entity = search?.search?.[0];
  if (!entity) return null;

  await sleep(DELAY_MS);

  // SPARQL query for image (P18)
  const sparql = `SELECT ?image WHERE { wd:${entity.id} wdt:P18 ?image } LIMIT 1`;
  const sparqlRes = await apiFetch(
    `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`,
  );
  const imageUrl = sparqlRes?.results?.bindings?.[0]?.image?.value ?? null;
  return imageUrl;
}


// ── Google Knowledge Graph ────────────────────────────────────────────────────

async function fromGoogleKG(name) {
  const key = process.env.GOOGLE_KG_API_KEY;
  if (!key) return null;

  const data = await apiFetch(
    `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(name)}&types=Person&limit=3&key=${key}`,
  );
  if (!data?.itemListElement?.length) return null;

  const nameLower = name.toLowerCase();
  const item =
    data.itemListElement.find((e) => e.result?.name?.toLowerCase() === nameLower) ||
    data.itemListElement.find((e) => e.result?.name?.toLowerCase().includes(nameLower.split(' ').at(-1))) ||
    data.itemListElement[0];

  const result = item?.result;
  if (!result) return null;

  const desc = (result.description ?? '').toLowerCase();
  const isAuthor =
    desc.includes('author') || desc.includes('writer') || desc.includes('novelist') ||
    desc.includes('fiction') || desc.includes('fantasy');
  if (!isAuthor) return null;

  return result.image?.contentUrl ?? null;
}

// ── Hardcover ─────────────────────────────────────────────────────────────────

async function fromHardcover(name) {
  const key = process.env.HARDCOVER_API_KEY;
  if (!key) return null;

  const query = `query {
    authors(where: {name: {_ilike: "${name.replace(/['"]/g, '')}"}}, limit: 3) {
      name
      image { url }
    }
  }`;

  try {
    const res = await fetch('https://api.hardcover.app/v1/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': key, 'User-Agent': HEADERS['User-Agent'] },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const authors = data?.data?.authors ?? [];
    if (!authors.length) return null;

    const nameLower = name.toLowerCase();
    const match =
      authors.find((a) => a.name?.toLowerCase() === nameLower) ||
      authors.find((a) => a.name?.toLowerCase().includes(nameLower.split(' ').at(-1))) ||
      authors[0];

    return match?.image?.url ?? null;
  } catch { return null; }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`📸 Fantasy Obscura — Backfill Author Photos${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  // Fetch authors with no photo — paginate to bypass PostgREST's 1000-row cap
  const PAGE = 1000;
  const authors = [];

  if (LIMIT) {
    const { data, error } = await supabase
      .from('authors')
      .select('id, name')
      .is('photo_url', null)
      .order('name')
      .limit(LIMIT);
    if (error) { console.error('DB error:', error.message); process.exit(1); }
    authors.push(...(data ?? []));
  } else {
    let offset = 0;
    while (true) {
      const { data, error } = await supabase
        .from('authors')
        .select('id, name')
        .is('photo_url', null)
        .order('name')
        .range(offset, offset + PAGE - 1);
      if (error) { console.error('DB error:', error.message); process.exit(1); }
      if (!data?.length) break;
      authors.push(...data);
      if (data.length < PAGE) break;
      offset += PAGE;
    }
  }

  const targets = authors;
  console.log(`${targets.length} authors without a photo${LIMIT ? ` (capped at ${LIMIT})` : ''}\n`);

  let found = 0, notFound = 0;

  for (let i = 0; i < targets.length; i++) {
    const { id, name } = targets[i];
    process.stdout.write(`[${i + 1}/${targets.length}] ${name.slice(0, 45).padEnd(45)} `);

    let photo = null;
    let source = null;

    // Build name variants to try across sources
    const lastName    = name.trim().split(/\s+/).at(-1);
    const stripped    = stripDiacritics(name);           // "Björn X" → "Bjorn X"
    const expanded    = expandInitials(name);             // "A.J. X"  → "A J X"
    const strExpanded = stripDiacritics(expanded);        // both transforms
    const nameVariants = [...new Set([name, stripped, expanded, strExpanded, lastName])];

    // 1. Open Library — try all variants
    for (const variant of nameVariants) {
      photo = await fromOpenLibrary(variant);
      if (photo) { source = 'OL'; break; }
      await sleep(DELAY_MS);
    }

    // 2. Wikipedia — try name then stripped/expanded fallbacks
    if (!photo) {
      for (const variant of [...new Set([name, stripped, expanded, strExpanded])]) {
        photo = await fromWikipedia(variant);
        if (photo) { source = 'Wiki'; break; }
        await sleep(DELAY_MS);
      }
    }

    // 3. Wikidata — try name then stripped fallback
    if (!photo) {
      for (const variant of [...new Set([name, stripped, expanded])]) {
        photo = await fromWikidata(variant);
        if (photo) { source = 'Wikidata'; break; }
        await sleep(DELAY_MS);
      }
    }

    // 4. Google Knowledge Graph — try name then stripped fallback
    if (!photo) {
      for (const variant of [...new Set([name, stripped])]) {
        photo = await fromGoogleKG(variant);
        if (photo) { source = 'KG'; break; }
        await sleep(DELAY_MS);
      }
    }

    // 5. Hardcover — try name then stripped fallback
    if (!photo) {
      for (const variant of [...new Set([name, stripped])]) {
        photo = await fromHardcover(variant);
        if (photo) { source = 'HC'; break; }
        await sleep(DELAY_MS);
      }
    }

    if (!photo) {
      console.log('✗');
      notFound++;
      continue;
    }

    console.log(`✓ [${source}]`);

    if (!DRY_RUN) {
      const { error: upErr } = await supabase
        .from('authors')
        .update({ photo_url: photo })
        .eq('id', id);
      if (upErr) console.error(`  DB error: ${upErr.message}`);
      else found++;
    } else {
      found++;
    }
  }

  console.log(`\n──────────────────────────────────`);
  console.log(`✓ Found:     ${found}`);
  console.log(`✗ Not found: ${notFound}`);
  if (DRY_RUN) console.log('(Dry run — no changes written)');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
