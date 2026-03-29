// seed-authors.js
// Populates the `authors` Supabase table for every author who has a book in our DB.
//
// Data sources (in order of priority):
//   1. Open Library          — bio, photo, Goodreads ID, official website, Wikidata ID
//   2. Wikipedia             — bio + photo fallback
//   3. Google Knowledge Graph— photo + description fallback (requires GOOGLE_KG_API_KEY in .env)
//   4. Wikidata              — Twitter/X handle
//
// Getting a free Google Knowledge Graph API key (takes ~5 min):
//   1. Go to https://console.cloud.google.com/
//   2. Create a project → Enable "Knowledge Graph Search API"
//   3. APIs & Services → Credentials → Create API Key
//   4. Add to .env:  GOOGLE_KG_API_KEY=your_key_here
//
// Run:
//   node scripts/seed-authors.js
//   node scripts/seed-authors.js --dry-run        (no DB writes)
//   node scripts/seed-authors.js --only-missing   (skip authors with existing photo_url)

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const DRY_RUN      = process.argv.includes('--dry-run');
const ONLY_MISSING = process.argv.includes('--only-missing');
const DELAY_MS     = 400;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ─── utils ──────────────────────────────────────────────────────────────────

function authorToSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function truncateBio(text, maxLen = 600) {
  if (!text || text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastDot = cut.lastIndexOf('. ');
  return lastDot > 200 ? cut.slice(0, lastDot + 1) : cut;
}

function get(obj, ...keys) {
  return keys.reduce((o, k) => o?.[k], obj) ?? null;
}

const HEADERS = { 'User-Agent': 'FantasyObscura/1.0 (contact@fantasyobscura.com)' };

async function apiFetch(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Open Library ────────────────────────────────────────────────────────────

async function fetchOpenLibrary(name) {
  // Step 1: search for author
  const search = await apiFetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}&limit=3`,
  );
  if (!search?.docs?.length) return null;

  // Pick best match: exact name match preferred, otherwise first result
  const nameLower = name.toLowerCase();
  const doc =
    search.docs.find((d) => d.name?.toLowerCase() === nameLower) ||
    search.docs.find((d) => d.name?.toLowerCase().includes(nameLower.split(' ').at(-1))) ||
    search.docs[0];

  if (!doc?.key) return null;
  const olid = doc.key.replace('/authors/', '');

  await sleep(DELAY_MS);

  // Step 2: fetch full author record
  const author = await apiFetch(`https://openlibrary.org/authors/${olid}.json`);
  if (!author) return null;

  // Bio — can be a string or { value: string }
  const rawBio = typeof author.bio === 'string' ? author.bio : get(author, 'bio', 'value');
  // Strip "Source: https://..." lines that OL sometimes appends
  const bio = rawBio ? truncateBio(rawBio.replace(/\n?\nSource:.*$/s, '').trim()) : null;

  // Photo
  const photoId = author.photos?.[0];
  const photo_url = photoId ? `https://covers.openlibrary.org/a/id/${photoId}-L.jpg` : null;

  // IDs
  const goodreadsId = get(author, 'remote_ids', 'goodreads');
  const goodreads   = goodreadsId ? `https://www.goodreads.com/author/show/${goodreadsId}` : null;
  const wikidata_id = get(author, 'remote_ids', 'wikidata');

  // Official website from links[]
  const website =
    author.links?.find((l) =>
      l.title?.toLowerCase().includes('official') || l.title?.toLowerCase().includes('website'),
    )?.url ?? null;

  return { bio, photo_url, goodreads, website, wikidata_id };
}

// ─── Wikipedia fallback ──────────────────────────────────────────────────────

async function fetchWikipedia(name) {
  const d = await apiFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name.replace(/ /g, '_'))}`,
  );
  if (!d || d.type === 'disambiguation' || !d.extract) return null;

  const lower = d.extract.toLowerCase();
  const isAuthor =
    lower.includes('author') || lower.includes('writer') || lower.includes('novelist') ||
    lower.includes('novel') || lower.includes('fantasy') || lower.includes('fiction');
  if (!isAuthor) return null;

  return {
    bio:         truncateBio(d.extract),
    photo_url:   d.thumbnail?.source ?? null,
    wikidata_id: d.wikibase_item ?? null,
  };
}

// ─── Google Knowledge Graph ───────────────────────────────────────────────────

async function fetchGoogleKG(name) {
  const key = process.env.GOOGLE_KG_API_KEY;
  if (!key) return null;

  const url = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(name)}&types=Person&limit=3&key=${key}`;
  const data = await apiFetch(url);
  if (!data?.itemListElement?.length) return null;

  // Pick best match: prefer exact name, then partial
  const nameLower = name.toLowerCase();
  const item =
    data.itemListElement.find((e) => e.result?.name?.toLowerCase() === nameLower) ||
    data.itemListElement.find((e) => e.result?.name?.toLowerCase().includes(nameLower.split(' ').at(-1))) ||
    data.itemListElement[0];

  const result = item?.result;
  if (!result) return null;

  // Sanity check — should be an author/writer
  const desc = (result.description ?? '').toLowerCase();
  const isAuthor =
    desc.includes('author') || desc.includes('writer') || desc.includes('novelist') ||
    desc.includes('fiction') || desc.includes('fantasy');
  if (!isAuthor) return null;

  const bio       = result.detailedDescription?.articleBody
    ? truncateBio(result.detailedDescription.articleBody)
    : (result.description ?? null);
  const photo_url = result.image?.contentUrl ?? null;
  const website   = result.url ?? null;

  return { bio, photo_url, website };
}

// ─── Wikidata (Twitter) ───────────────────────────────────────────────────────

async function fetchTwitterFromWikidata(wikidataId) {
  if (!wikidataId) return null;
  const data = await apiFetch(
    `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`,
  );
  const claims = data?.entities?.[wikidataId]?.claims ?? {};
  return claims.P2002?.[0]?.mainsnak?.datavalue?.value ?? null;
}

// ─── Supabase helpers ────────────────────────────────────────────────────────

async function getAllAuthorNames() {
  const PAGE = 1000;
  const names = new Set();
  let offset = 0;
  while (true) {
    const { data, error } = await supabase.from('books').select('authors').range(offset, offset + PAGE - 1);
    if (error) throw new Error(`Supabase: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const row of data) {
      for (const n of row.authors ?? []) {
        if (n?.trim()) names.add(n.trim());
      }
    }
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}

async function getExistingProfiles() {
  const PAGE = 1000;
  const rows = [];
  let offset = 0;
  while (true) {
    const { data } = await supabase.from('authors').select('slug, photo_url').range(offset, offset + PAGE - 1);
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return new Map(rows.map((r) => [r.slug, r.photo_url]));
}

// ─── main ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('📚 Fantasy Obscura — seed-authors');
  if (DRY_RUN)      console.log('   --dry-run: no DB writes');
  if (ONLY_MISSING) console.log('   --only-missing: skipping authors with existing photo');
  console.log();

  const [allNames, existing] = await Promise.all([getAllAuthorNames(), getExistingProfiles()]);
  console.log(`${allNames.length} unique authors found in books table.\n`);

  let nFound = 0, nWiki = 0, nMissing = 0, nSkipped = 0, nErrors = 0;

  for (const name of allNames) {
    const slug = authorToSlug(name);

    if (ONLY_MISSING && existing.get(slug)) {
      nSkipped++;
      continue;
    }

    // ── 1. Open Library ──
    const ol = await fetchOpenLibrary(name);
    await sleep(DELAY_MS);

    let bio        = ol?.bio        ?? null;
    let photo_url  = ol?.photo_url  ?? null;
    let goodreads  = ol?.goodreads  ?? null;
    let website    = ol?.website    ?? null;
    let wikidata_id = ol?.wikidata_id ?? null;
    let source     = ol ? 'OL' : null;

    // ── 2. Wikipedia fallback (if OL didn't have bio or photo) ──
    if (!bio || !photo_url) {
      const wiki = await fetchWikipedia(name);
      await sleep(DELAY_MS);
      if (wiki) {
        bio         = bio       || wiki.bio;
        photo_url   = photo_url || wiki.photo_url;
        wikidata_id = wikidata_id || wiki.wikidata_id;
        source      = ol ? 'OL+Wiki' : 'Wiki';
      }
    }

    // ── 3. Google Knowledge Graph fallback (if still missing bio or photo) ──
    if (!bio || !photo_url) {
      const kg = await fetchGoogleKG(name);
      await sleep(DELAY_MS);
      if (kg) {
        bio       = bio       || kg.bio;
        photo_url = photo_url || kg.photo_url;
        website   = website   || kg.website;
        source    = source ? `${source}+KG` : 'KG';
      }
    }

    // ── 5. Wikidata for Twitter ──
    let twitter = null;
    if (wikidata_id) {
      twitter = await fetchTwitterFromWikidata(wikidata_id);
      await sleep(DELAY_MS);
    }

    if (!bio && !photo_url) {
      // Create minimal row so author exists in table
      if (!DRY_RUN) {
        await supabase
          .from('authors')
          .upsert({ name, slug }, { onConflict: 'slug', ignoreDuplicates: true });
      }
      console.log(`✗  ${name}  (not found in OL or Wikipedia)`);
      nMissing++;
      continue;
    }

    const record = { name, slug, bio, photo_url, goodreads, website, twitter };

    const flags = [
      photo_url ? '📷' : '  ',
      bio       ? '📝' : '  ',
      website   ? '🌐' : '  ',
      twitter   ? '𝕏 ' : '  ',
      goodreads ? '📚' : '  ',
    ].join('') + `  [${source}]`;

    if (DRY_RUN) {
      console.log(`✓  ${flags}  ${name}`);
      nFound++;
      continue;
    }

    const { error } = await supabase
      .from('authors')
      .upsert(record, { onConflict: 'slug' });

    if (error) {
      console.error(`✗  ${name}  DB error: ${error.message}`);
      nErrors++;
    } else {
      if (source === 'Wiki') nWiki++;
      else nFound++;
      console.log(`✓  ${flags}  ${name}`);
    }
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`✓  Open Library (± Wiki fallback) : ${nFound}`);
  console.log(`~  Wikipedia only                 : ${nWiki}`);
  console.log(`✗  Not found anywhere             : ${nMissing}`);
  if (nSkipped) console.log(`   Skipped (already had photo)    : ${nSkipped}`);
  if (nErrors)  console.log(`   DB errors                      : ${nErrors}`);
  console.log(`   Total                          : ${allNames.length}`);
}

seed().catch((err) => { console.error('Fatal:', err); process.exit(1); });
