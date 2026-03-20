# Fantasy Obscura

A curated guide site for fantasy book lovers - with genre category pages, reading orders, creature references, an interactive book recommendation tool and individual book pages with affiliate buy links.

Live at: **[thegrimoire.co](https://www.thegrimoire.co)**

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
npm run check     # TypeScript check
```

## Tech Stack

- **Astro 5** — SSR, MDX support
- **Cloudflare Pages** — deployment target
- **React 19** — interactive islands
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL) — book database

## Environment Variables

Create a `.env` file:

```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_google_ai_studio_api_key
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
GOOGLE_KG_API_KEY=your_google_knowledge_graph_api_key   # optional, for seed-authors
```

- `SUPABASE_SERVICE_ROLE_KEY` — required for all write scripts
- `GEMINI_API_KEY` — required for all classify scripts, all generate scripts, and the AI recommendation API (`/api/recommend`)
- `GOOGLE_BOOKS_API_KEY` — required for `discover-books`, `fill-series`, `fill-audiobooks`, `fill-ratings`
- `GOOGLE_KG_API_KEY` — optional, improves author photo/bio quality in `seed-authors`

## Database Setup

Run each step **in order** in the Supabase **SQL Editor → New query → Run**.

### Step 1 — Books table (file: `supabase/schema.sql`)

Creates the core `books` table with indexes and `updated_at` trigger.

### Step 2 — Books extra columns (run once, safe to re-run)

Adds columns that were added after the initial schema:

```sql
ALTER TABLE books ADD COLUMN IF NOT EXISTS darkness_level smallint;
ALTER TABLE books ADD COLUMN IF NOT EXISTS audience text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS series text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS series_number integer;
```

### Step 3 — Audiobook columns (file: `supabase/add-audiobook-columns.sql`)

Adds audiobook metadata to the books table:

```sql
ALTER TABLE books
  ADD COLUMN IF NOT EXISTS audiobook_available        boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS audiobook_narrator         text,
  ADD COLUMN IF NOT EXISTS audiobook_narrator_rating  text
    CHECK (audiobook_narrator_rating IN ('excellent', 'good', 'mixed', 'avoid')),
  ADD COLUMN IF NOT EXISTS audiobook_hours            integer,
  ADD COLUMN IF NOT EXISTS audiobook_audible_url      text;
```

Set `audiobook_available = true` on any book row to show the headphones card on its page.

### Step 4 — Authors table + RLS (file: `supabase/authors-rls.sql`)

Creates the `authors` profile table and enables public reads:

```sql
CREATE TABLE authors (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text UNIQUE NOT NULL,
  bio        text,
  photo_url  text,
  website    text,
  twitter    text,
  goodreads  text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read authors" ON authors FOR SELECT USING (true);
```

### Step 5 — Community book tags table + RLS

Creates the `book_tags` table for user-submitted tags (requires auth):

```sql
CREATE TABLE book_tags (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id    uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  tag_slug   text NOT NULL,
  tag_name   text NOT NULL,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  approved   boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, tag_slug, user_id)
);
ALTER TABLE book_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read approved tags"      ON book_tags FOR SELECT USING (approved = true);
CREATE POLICY "authenticated users can tag" ON book_tags FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users can remove own tags"   ON book_tags FOR DELETE TO authenticated USING (auth.uid() = user_id);
```

Tags default to `approved = false`. Set to `true` in the Supabase dashboard to make them public.

### Step 6 — Editorial columns for generate scripts (run once before using generate-\*)

```sql
-- Book editorial fields
ALTER TABLE books ADD COLUMN IF NOT EXISTS ideal_reader       text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS reading_experience text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS unique_angle       text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS faqs               jsonb;
ALTER TABLE books ADD COLUMN IF NOT EXISTS best_for           text;

-- Author bio fields
ALTER TABLE authors ADD COLUMN IF NOT EXISTS writing_style       text;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS best_starting_point text;
```

---

## Scripts

All scripts live in `scripts/`. Run from the project root. Requires `.env` with the appropriate keys.

**Free tier limits (Gemini Flash):** ~300 books/day classified. For more, enable billing on Google AI Studio.

---

### Step 1 — Discover books

```bash
npm run discover                          # auto-discover 100 new books from Google Books
npm run discover -- --limit 300          # custom limit
npm run discover -- --limit 300 --reset  # restart query cycle from beginning
npm run discover -- --dry-run

# Add a specific book manually
npm run add-book -- "The Wise Man's Fear" "Patrick Rothfuss"
node scripts/add-books.mjs "Dungeon Crawler Carl" "Matt Dinniman"
npm run add-book -- --file books-to-add.txt   # bulk from file (one "Title | Author" per line)
```

Progress saved in `scripts/.discover-progress.json` (gitignored). Resumes across runs. Run `--reset` after exhausting all ~175 queries.

---

### Step 2 — Fill series & author back-catalogues

Patches missing `series`/`series_number` on existing books, imports missing series entries from a curated list (Phase 1), then auto-discovers all books by any author with 7+ books in the DB (Phase 2).

Phase 2 filters: English-only (checks title for non-ASCII even when `language: 'en'` is set — catches mislabelled foreign editions), fiction/fantasy categories required when categories are present, minimum 120 pages, minimum 3.5 rating, skips special/limited/house editions, audiobooks, non-fiction.

```bash
node scripts/fill-series.mjs              # run both phases
node scripts/fill-series.mjs --dry-run
node scripts/fill-series.mjs --series-only     # Phase 1 only — curated list + patch missing series
node scripts/fill-series.mjs --authors-only    # Phase 2 only — prolific author sweep
node scripts/fill-series.mjs --limit 50        # cap Phase 2 imports
node scripts/fill-series.mjs --threshold 5     # lower author book threshold (default: 7)
```

---

### Step 3 — Fix covers, synopsis, ratings

```bash
# Fix missing/non-English synopsis or wrong publication year
node scripts/repair-books.mjs
node scripts/repair-books.mjs --dry-run
node scripts/repair-books.mjs --limit 20
node scripts/repair-books.mjs --all          # force-refresh every book

# Update covers (Google Books first, Open Library fallback)
npm run covers                               # fill only missing
npm run covers -- --force                   # refresh all
npm run covers -- --dry-run

# Fill Goodreads avg_rating for books where it's NULL
node scripts/fill-ratings.mjs
node scripts/fill-ratings.mjs --dry-run
node scripts/fill-ratings.mjs --limit 50
node scripts/fill-ratings.mjs --all          # overwrite existing
```

---

### Step 4 — Classify all fields

Runs all 5 classifiers in sequence (each skips books already classified):

```bash
npm run classify
```

1. `classify-metadata` → `subgenres`, `darkness_level`, `heat_level`, `accessibility`, `awards`, `stakes`, `pov_style`, `pov_count`, `protagonist_gender`, `series_status`
2. `classify-vibes` → `tone`, `pacing`, `magic_system`, `audience`
3. `classify-tropes` → `tropes` (70 canonical tropes across 4 categories)
4. `classify-creatures` → `creatures` (28 creature/race slugs)
5. `classify-content-warnings` → `content_warnings`

Individual classifiers and repair options:

```bash
npm run classify:metadata
npm run classify:vibes
npm run classify:tropes
npm run classify:creatures
npm run classify:warnings

node scripts/classify-metadata.mjs --dry-run
node scripts/classify-metadata.mjs --limit 50
node scripts/classify-metadata.mjs --refresh-series   # re-check completed/ongoing status
node scripts/classify-tropes.mjs --reclassify         # redo all, not just NULL

# Fix pacing/tone contradictions and stale tone values automatically
node scripts/classify-vibes.mjs --repair
node scripts/classify-vibes.mjs --repair --dry-run
node scripts/classify-vibes.mjs --slug the-way-of-kings   # re-classify single book
node scripts/classify-vibes.mjs --reclassify              # overwrite all
```

---

### Step 5 — Seed authors

Populates the authors table with bio, photo, website and social links from Open Library / Wikipedia / Google Knowledge Graph.

```bash
node scripts/seed-authors.js
node scripts/seed-authors.js --dry-run
node scripts/seed-authors.js --only-missing   # skip authors who already have a photo_url

# Remove authors with no books in the DB
node scripts/cleanup-authors.js              # dry run — lists orphans
node scripts/cleanup-authors.js --delete
```

---

### Step 6 — Fill audiobooks

```bash
node scripts/fill-audiobooks.mjs
node scripts/fill-audiobooks.mjs --dry-run
node scripts/fill-audiobooks.mjs --limit 50
node scripts/fill-audiobooks.mjs --all       # re-process everything
```

---

### Step 7 — Fix bad synopses

Detects and rewrites synopses that contain URLs, markdown links, "Preceded by", "BOOK TWO of", or other scraped metadata garbage (typically from Open Library). Uses Gemini to generate a clean synopsis.

```bash
node scripts/fix-synopses.mjs
node scripts/fix-synopses.mjs --dry-run
node scripts/fix-synopses.mjs --limit 20
node scripts/fix-synopses.mjs --slug crooked-kingdom
```

---

### Step 8 — Generate editorial content

All generate scripts target books in `scripts/priority-slugs.mjs`. Use `--tier1/--tier2/--tier3` to target a specific tier, or omit for ALL_PRIORITY (~310 books). Run DB Setup Step 6 SQL before first use.

| Flag | Scope |
|------|-------|
| *(none)* | ALL_PRIORITY (~310 books) |
| `--tier1` | TIER_1 only (~53 highest-priority books) |
| `--tier2` | TIER_2 only (~71 books) |
| `--tier3` | TIER_3 only (~187 books) |
| `--slug <slug>` | Single book only |
| `--limit N` | Cap number processed |
| `--all` | Overwrite existing values |
| `--dry-run` | Preview without writing |

```bash
# "Best For" — one-line descriptor shown on book cards and pages
node scripts/generate-best-for.mjs
node scripts/generate-best-for.mjs --tier1
node scripts/generate-best-for.mjs --tier2
node scripts/generate-best-for.mjs --tier3
node scripts/generate-best-for.mjs --slug the-way-of-kings
node scripts/generate-best-for.mjs --all --dry-run

# "Who This Is For" — ideal_reader field
node scripts/generate-ideal-reader.mjs
node scripts/generate-ideal-reader.mjs --tier1
node scripts/generate-ideal-reader.mjs --slug the-final-empire

# "Reading Experience" — reading_experience field
node scripts/generate-reading-experience.mjs
node scripts/generate-reading-experience.mjs --tier1
node scripts/generate-reading-experience.mjs --slug the-final-empire

# "What Makes It Different" — unique_angle field
node scripts/generate-what-makes-it-different.mjs
node scripts/generate-what-makes-it-different.mjs --tier1
node scripts/generate-what-makes-it-different.mjs --slug the-final-empire

# FAQs — faqs jsonb field
node scripts/generate-faqs.mjs
node scripts/generate-faqs.mjs --tier1
node scripts/generate-faqs.mjs --slug the-final-empire
node scripts/generate-faqs.mjs --all

# Author bio — writing_style + best_starting_point (authors with 7+ books in DB)
node scripts/generate-author-bio.mjs
node scripts/generate-author-bio.mjs --dry-run
node scripts/generate-author-bio.mjs --limit 10
node scripts/generate-author-bio.mjs --slug brandon-sanderson
node scripts/generate-author-bio.mjs --all
node scripts/generate-author-bio.mjs --threshold 5
```

---

## Project Structure

```
src/
├── components/
│   ├── AddToShelf.tsx      # Add/remove book from user's reading shelf
│   ├── AlchemyTable.tsx    # Interactive book finder (filters → Supabase)
│   ├── BookDisplay.tsx     # Book grid with sort, darkness badges, slug links
│   ├── BookFAQ.astro       # FAQ accordion with FAQPage JSON-LD schema
│   ├── BookHub.tsx         # Admin import tool (5 external API sources)
│   ├── BookSearch.tsx      # Autocomplete search bar
│   ├── BookmarkButton.tsx  # Save/unsave book to bookmarks
│   ├── BookmarkCount.tsx   # Bookmark count badge
│   ├── BooksLikeMe.tsx     # AI-powered rec tool — add books you love, get recs
│   ├── CategoryGrid.tsx    # Genre category cards + Book of the Week
│   ├── CategoryLists.tsx   # Book lists within a category page
│   ├── CommunityTags.tsx   # User-submitted tags (hidden, pending launch)
│   ├── FavouriteButton.tsx # Heart/favourite toggle on book pages
│   ├── Layout.astro        # Base layout: nav, footer, OG/Twitter meta, canonical
│   ├── MyShelf.tsx         # User's reading shelf view
│   ├── ReadingList.tsx     # Ordered reading list component
│   ├── ReadingOrder.tsx    # Series reading order display
│   └── Stars.tsx           # Star rating display
├── data/
│   ├── books-like.ts       # Hand-written "Books Like X" guide data
│   ├── categories-meta.ts  # Genre category metadata + curated 30-title lists (all-time greats / start with / hidden gems)
│   ├── reading-orders.ts   # Reading order data for all series guides
│   └── tropes.ts           # Canonical trope definitions
├── lib/
│   ├── auth.ts             # Auth helpers
│   ├── books/providers.ts  # External API integrations (OpenLibrary, Google Books, etc.)
│   ├── db/
│   │   ├── authors.ts      # Supabase author CRUD helpers
│   │   ├── books.ts        # Supabase book CRUD helpers
│   │   └── tags.ts         # Supabase community tags helpers
│   ├── database.types.ts   # Auto-generated Supabase types
│   ├── supabaseClient.ts   # Supabase anon client
│   └── types.ts            # App-wide type definitions
├── middleware.ts            # Auth session injection into Astro.locals
└── pages/
    ├── index.astro                  # Home — category grid
    ├── sitemap.xml.ts               # Dynamic sitemap (queries all book/author/trope slugs)
    ├── auth/
    │   ├── login.astro
    │   └── register.astro
    ├── authors/
    │   ├── index.astro              # Author directory
    │   └── [slug].astro            # Author page — bio, series groups, all books
    ├── books/
    │   ├── index.astro              # Book database hub (filtered by category)
    │   └── [slug].astro             # Book page — editorial, tropes, FAQs, similar books
    ├── books-like/
    │   ├── index.astro              # Books Like index + AI recommendation tool
    │   └── [slug].astro             # Individual "Books Like X" guide
    ├── fantasy/
    │   └── [slug]/
    │       ├── index.astro          # Genre category page (12 categories: epic, grimdark, romantasy, etc.)
    │       ├── all-time-greats.astro# Top 20 all-time greats — curated list cross-referenced with DB
    │       ├── start-with.astro     # Top 20 beginner picks — curated list cross-referenced with DB
    │       └── hidden-gems.astro    # Top 20 hidden gems — curated list cross-referenced with DB
    ├── book-finder/index.astro      # Alchemy Table — filter-based book finder (/book-finder/)
    ├── my-list/index.astro          # User's personal reading shelf
    ├── reading-orders/
    │   ├── index.astro              # Reading orders hub
    │   └── [slug].astro             # Individual series reading guide
    ├── tropes/
    │   ├── index.astro              # Trope browser
    │   └── [slug].astro             # Individual trope page
    └── api/
        ├── auth/
        │   ├── login.ts
        │   ├── logout.ts
        │   └── register.ts
        ├── books/[slug]/tags.ts     # GET/POST community tags for a book
        ├── profile/
        │   ├── index.ts             # GET/PATCH user profile
        │   └── avatar.ts            # POST avatar upload
        ├── shelf/
        │   ├── index.ts             # GET/POST/DELETE shelf entries
        │   └── reorder.ts           # PATCH shelf order
        ├── books.ts                 # GET all books / POST save book
        ├── books-search.ts          # GET autocomplete search
        ├── craft.ts                 # GET filtered books for Alchemy Table
        ├── recommend.ts             # POST Gemini-powered book recommendations
        └── search.ts                # GET external API search (5 sources)
```

## Book Schema

Key fields on every book record:

| Field                                          | Type              | Notes                                     |
| ---------------------------------------------- | ----------------- | ----------------------------------------- |
| `title`, `authors`                             | string / string[] | required                                  |
| `slug`                                         | string            | URL key for `/books/[slug]`               |
| `subgenres`, `tropes`                          | string[]          | used for filtering; trope names not slugs |
| `creatures`                                    | string[]          | creature/race slugs (e.g. `"dragon"`)     |
| `tone`, `diversity_rep`, `content_warnings`    | string[]          |                                           |
| `magic_system`, `pacing`, `heat_level`         | string            |                                           |
| `audience`                                     | string            | Adult / YA / Children's                   |
| `darkness_level`                               | 1–5               | 1=Lighthearted → 5=Brutal                 |
| `accessibility`                                | string            | beginner / intermediate / advanced        |
| `stakes`                                       | string            | personal / kingdom / world                |
| `pov_style`                                    | string            | First Person / Third Limited / Omniscient |
| `pov_count`                                    | string            | Single / Dual / Multiple                  |
| `protagonist_gender`                           | string            | Male / Female / Ensemble                  |
| `awards`                                       | string[]          | e.g. `["hugo-winner", "nebula-nominee"]`  |
| `series`, `series_number`, `series_status`     | string / number   | series_status: completed / ongoing        |
| `avg_rating`, `page_count`, `publication_year` | number            |                                           |
| `cover_url`, `synopsis`                        | string            |                                           |

## Darkness Scale

| Level      | Label        | Meaning                                          |
| ---------- | ------------ | ------------------------------------------------ |
| 🕯️         | Lighthearted | Cozy, low stakes, no real darkness               |
| 🕯️🕯️       | Mild         | Some tension but ultimately safe                 |
| 🕯️🕯️🕯️     | Moderate     | Death, moral complexity, some disturbing content |
| 🕯️🕯️🕯️🕯️   | Dark         | Violence, trauma, morally grey characters        |
| 🕯️🕯️🕯️🕯️🕯️ | Brutal       | Grimdark, no redemption guaranteed               |

## Image Pipeline

Source images live in `assets/raw/` and are processed into optimised WebP + AVIF at multiple widths via `scripts/optimize-images.mjs`.

### Folder structure

| Source folder | Output folder | Widths | Use |
|---|---|---|---|
| `assets/raw/categories/` | `public/images/categories/` | 400, 800px | Category hero images |
| `assets/raw/reading-orders/` | `public/images/reading-orders/` | 400, 800px | Reading order card + detail page heroes |
| `assets/raw/banners/` | `public/images/banners/` | 400, 800px | Homepage, books, books-like, reading orders index, tropes banners |
| `assets/raw/branding/` | `public/images/branding/` | 1200px | OG image, logo (no AVIF) |
| `assets/raw/placeholders/` | `public/images/placeholders/` | 300px | Book cover placeholders |

All output images are committed to the repo so they are available on Cloudflare Pages without a build step.

### Commands

```bash
npm run images:optimize        # process everything + regenerate favicons
npm run images:categories      # categories only
npm run images:favicons        # favicons + nav-logo + og-default only

node scripts/optimize-images.mjs --reading-orders   # reading order images only
```

### Adding a new reading order image

1. Drop the source PNG/JPG into `assets/raw/reading-orders/` — name it exactly matching the guide slug (e.g. `wheel-of-time.png`)
2. Add the slug to `ReadingOrderImageSlug` type and `READING_ORDER_IMAGE_SLUG` map in `src/data/image-map.ts`
3. Run `node scripts/optimize-images.mjs --reading-orders`
4. Commit the generated files in `public/images/reading-orders/`

The detail page hero and the index card image both pick up automatically once the slug is in the map.

### Adding a new category image

1. Drop source PNG/JPG into `assets/raw/categories/` — name it matching the `CategorySlug` value (e.g. `grimdark.png`)
2. Add the entry to `CATEGORY_IMAGE_SLUG` in `src/data/image-map.ts` mapping the URL slug to the image slug
3. Run `npm run images:categories`
4. Commit generated files in `public/images/categories/`

### Recommended source image size

Generate at **1600×800px** minimum (2:1 ratio). The pipeline crops to a **3:1** display ratio on most pages — images are cropped from centre by default. To use the top half instead of centre, add the slug to the `object-top` condition in the relevant page template.

### Favicon pipeline

`public/favicon.png` → rounded-corner favicons at 16×16 and 32×32 (dark gold background, ~22% border radius), 180×180 apple-touch-icon, and `nav-logo.png`. Regenerated automatically by `npm run images:optimize` and `npm run images:favicons`.

---

## Deployment

Deployed to **Cloudflare Pages**. Push to `main` triggers automatic redeploy.

Set env vars in Cloudflare Pages dashboard → Settings → Environment Variables.

---

## TODO

### Reddit Recommendation Bot

Build a Python Reddit bot using PRAW that monitors fantasy subreddits and recommends books from this site.

**Subreddits to monitor:** r/Fantasy, r/fantasybooks, r/booksuggestions, r/romantasy, r/ProgressionFantasy, r/books, r/fantasyromance, r/justfinishedreading, r/suggestmeabook, r/fantasywriters

**Trigger phrases:** "recommend", "looking for", "books like", "what should I read", "suggestions", "similar to", "something like", "next read", "suggest"

**Signal parsing:**

- Genre keywords: map "grimdark" → Grimdark subgenre, "cozy" → Cozy Fantasy, "romantasy" → Romantic Fantasy, "epic" → Epic Fantasy, "dark" → Dark Fantasy, "scary" → Dark Fantasy, "funny/humorous" → tone=Humorous, "heartwarming" → tone=Hopeful
- Trope keywords: "found family" → Found Family trope, "enemies to lovers" → Enemies to Lovers, "magic school" → Magic Academy, "heist" → Heist, "chosen one" → Chosen One
- Darkness preference: "dark", "brutal", "grim", "grimdark" → darkness_level 4–5; "cozy", "light", "wholesome", "clean" → darkness_level 1–2
- Standalone preference: "standalone", "no series", "single book" → exclude books with series set
- "like [book title]" → match title in DB via `/api/books`, pull that book's subgenres/tropes/tone/darkness as search profile

**Matching logic:**

- Fetch all books from the site's `/api/books` endpoint (returns full metadata including subgenres, tropes, tone, darkness_level, series, audience)
- Score each book: +1 for each matching subgenre, +1 per matching trope, +1 for darkness range match, +1 for tone match, +1 if standalone preference matches
- Only reply if top match scores ≥ 50% of possible signal points (silence beats a bad rec)
- Return top 2–3 matches, never just 1

**Reply format:**

```
Based on what you're looking for, here are some picks:

**[Title]** by [Author] — [synopsis excerpt, 1 sentence]. Darkness: 🕯️🕯️🕯️ (Moderate) | [Series name #N / Standalone]

**[Title]** by [Author] — [synopsis excerpt]. Darkness: 🕯️🕯️ (Mild) | Standalone

More curated fantasy picks → thegrimoire.co
```

**Safety rules:**

- Store replied post/comment IDs in `replied.txt`, never reply twice
- Wait minimum 15 minutes between replies
- Never reply to posts older than 24 hours
- Never reply to other bots (skip if `bot` appears in username)
- If no confident match: do nothing

**Deliverables:**

- `bot/bot.py` — main bot with PRAW setup and credential comments
- `bot/.env.example` — Reddit API credentials template
- `bot/requirements.txt`
- `dry_run` mode flag that prints what would be posted without posting
- Deployment instructions for Railway or Render (free tier)
