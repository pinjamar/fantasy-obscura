// update-author-photos.js
// Fetches author photos from Wikipedia and updates the authors table.
// Safe to re-run — only overwrites null photo_url values unless --force is passed.
//
//   node update-author-photos.js           # fill only authors with no photo yet
//   node update-author-photos.js --force   # re-fetch and overwrite all

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const FORCE = process.argv.includes('--force');
const DELAY = 300; // ms between Wikipedia requests

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getWikipediaPhoto(name) {
  const encoded = encodeURIComponent(name.replace(/ /g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'fantasy-obscura/1.0 (contact@fantasy-obscura.com)' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    // thumbnail.source is the actual image URL
    return data.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

async function run() {
  let query = supabase.from('authors').select('id, name, slug, photo_url');
  if (!FORCE) query = query.is('photo_url', null);

  const { data: authors, error } = await query.order('name');
  if (error) { console.error('DB error:', error.message); process.exit(1); }
  if (!authors.length) { console.log('No authors to update.'); return; }

  console.log(`Fetching photos for ${authors.length} author(s)...\n`);

  let updated = 0;
  let notFound = 0;

  for (const author of authors) {
    const photoUrl = await getWikipediaPhoto(author.name);

    if (photoUrl) {
      await supabase.from('authors').update({ photo_url: photoUrl }).eq('id', author.id);
      console.log(`✓ ${author.name}`);
      updated++;
    } else {
      console.log(`✗ ${author.name} — not found on Wikipedia`);
      notFound++;
    }

    await sleep(DELAY);
  }

  console.log(`\nDone. Updated: ${updated}, not found: ${notFound}`);
  console.log('Photos are Wikipedia thumbnails — usually 320px wide, freely licensed.');
}

run();
