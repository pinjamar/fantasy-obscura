/**
 * backfill-author-photos.mjs
 *
 * Finds authors in the DB with photo_url = null and tries to find a photo.
 * Only updates photo_url — does not touch bio, goodreads, or any other field.
 *
 * Sources tried in order:
 *   1. Open Library
 *   2. Wikipedia
 *   3. Google Knowledge Graph (requires GOOGLE_KG_API_KEY)
 *   4. Hardcover
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

// ── Wikipedia ─────────────────────────────────────────────────────────────────

async function fromWikipedia(name) {
  const d = await apiFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name.replace(/ /g, '_'))}`,
  );
  if (!d || d.type === 'disambiguation' || !d.extract) return null;

  const lower = d.extract.toLowerCase();
  const isAuthor =
    lower.includes('author') || lower.includes('writer') || lower.includes('novelist') ||
    lower.includes('novel') || lower.includes('fantasy') || lower.includes('fiction');
  if (!isAuthor) return null;

  return d.thumbnail?.source ?? null;
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

  // Fetch authors with no photo
  const { data: authors, error } = await supabase
    .from('authors')
    .select('id, name')
    .is('photo_url', null)
    .order('name');

  if (error) { console.error('DB error:', error.message); process.exit(1); }

  const targets = LIMIT ? authors.slice(0, LIMIT) : authors;
  console.log(`${targets.length} authors without a photo${LIMIT ? ` (capped at ${LIMIT})` : ''}\n`);

  let found = 0, notFound = 0;

  for (let i = 0; i < targets.length; i++) {
    const { id, name } = targets[i];
    process.stdout.write(`[${i + 1}/${targets.length}] ${name.slice(0, 45).padEnd(45)} `);

    let photo = null;
    let source = null;

    photo = await fromOpenLibrary(name);
    if (photo) { source = 'OL'; } else { await sleep(DELAY_MS); }

    if (!photo) {
      photo = await fromWikipedia(name);
      if (photo) { source = 'Wiki'; }
      await sleep(DELAY_MS);
    }

    if (!photo) {
      photo = await fromGoogleKG(name);
      if (photo) { source = 'KG'; }
      await sleep(DELAY_MS);
    }

    if (!photo) {
      photo = await fromHardcover(name);
      if (photo) { source = 'HC'; }
      await sleep(DELAY_MS);
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
