# TODO / Future Plans

---

## Reddit Recommendation Bot

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

---

## Hybrid Static/Server Architecture (Cloudflare 1102 long-term fix)

**Current status (as of March 2026)**

The 1102 crashes are resolved. The root causes were:
- Middleware making a Supabase auth call on every request, even for anonymous visitors → **fixed**: middleware now skips Supabase entirely when no auth cookie is present
- `index.astro` and `books/index.astro` doing `while(true)` loops fetching all 47 000 books server-side → **fixed**: both pages now render instantly, books load client-side via `/api/books`
- `authors/index.astro` calling `getAllAuthors()` (another full books scan) → **fixed**: per-author stats pre-computed into the `authors` table via `scripts/update-author-stats.mjs`; page now does a single targeted query
- `authors/[slug].astro` calling `getAllAuthors()` just to resolve an author name → **fixed**: uses `getAuthorProfile(slug)` directly

The only remaining slowness is `/books/` taking a moment to populate — that's expected UX for a client-side fetch of 47 000 books and is not causing crashes.

**Background**

The site runs as `output: 'server'` — every page is rendered on-demand by a Cloudflare Worker. This is fine for the current load. If traffic grows significantly, the proper long-term fix is switching public content pages to static pre-rendering.

**The proper fix**

Switch public content pages to `output: 'static'` — pre-built as plain HTML at deploy time and served straight from Cloudflare's CDN. No Worker runs, no DB query, no cold start. Only the interactive features (auth, shelf, book finder API, recommendations) stay as Workers.

**What needs to change**

- `astro.config.mjs`: change to `output: 'hybrid'` (Astro's mode that allows per-page opt-in to SSR)
- All public content pages get `export const prerender = true` at the top:
  - `src/pages/index.astro`
  - `src/pages/books/[slug].astro` and `index.astro`
  - `src/pages/tropes/[slug].astro` and `index.astro`
  - `src/pages/authors/[slug].astro` and `index.astro`
  - `src/pages/reading-orders/[slug].astro` and `index.astro`
  - `src/pages/books-like/[slug].astro` and `index.astro`
  - `src/pages/fantasy/[slug]/` all sub-pages
- The navbar auth state (avatar, display name) needs to move from server-rendered to a small client-side fetch on load — since static pages can't know who's logged in at build time
- API routes and auth/shelf pages stay server-rendered (no `prerender` flag needed, they're SSR by default in hybrid mode)

**When to do this**

Do this when:
- You're about to do a big push (social media, ProductHunt, etc.) and want the site bulletproof under a spike, OR
- 1102 errors come back under sustained real traffic

Don't do this yet:
- You're still adding/changing content frequently (static pages rebuild on every deploy)
- The site isn't under meaningful load — current fixes are holding fine

**Effort estimate:** half a day. The config change is one line. The real work is moving the navbar auth to client-side and testing that all pre-rendered pages build without errors.

---

## Affiliate Links

The site already has buy buttons on every book page (`/books/[slug]`) and on books-like guide pages. All links currently go to stores without affiliate tags — adding tags is pure revenue with no UX change.

**Where links appear in the codebase:**
- `src/pages/books/[slug].astro` — Amazon main button + 6-store "More stores" dropdown + Audible button
- `src/pages/books-like/[slug].astro` — Amazon button on every recommendation card

**Add a footer affiliate disclosure** (required by law and all affiliate programs) before activating any links. One line in `src/components/Layout.astro` footer is enough: *"This site contains affiliate links. We may earn a commission at no extra cost to you."*

---

### 1. Amazon Associates ✅ do this first
- Apply at: affiliate-program.amazon.com
- **What to change:** append `&tag=YOURTAG-20` to every `amazon.com` URL
- In `books/[slug].astro`: `amazonUrl` on line ~56
- In `books-like/[slug].astro`: every `r.amazon_url` link
- Highest conversion of all stores. Apply before any traffic push.

### 2. Audible (Amazon Associates)
- Same Associates account as Amazon — no separate application
- **What to change:** Audible links use `book.audiobook_audible_url` (direct URLs per book, stored in DB). Append `&tag=YOURTAG-20` when rendering the Audible button in `books/[slug].astro` around line ~358
- Note: many Audible affiliate links use a different tag format (`ref=as_li_ss_tl` + Associates tag). Check Amazon's Audible linking guide after joining Associates.

### 3. Bookshop.org
- Apply at: bookshop.org/affiliates — instant approval, 10% commission
- Great fit for the audience (indie bookstore supporters)
- **What to change:** `bookshopUrl` in `books/[slug].astro` — append `&affiliate=YOURID` to the search URL
- Also consider adding Bookshop as a primary button alongside Amazon (some readers actively prefer it)

### 4. ThriftBooks
- Apply via Impact (impact.com) — search "ThriftBooks" in their marketplace
- Good for readers who buy used/discounted — different audience segment than Amazon
- **What to change:** `thriftBooksUrl` in `books/[slug].astro` — add affiliate tracking param after approval (format given by Impact dashboard)

### 5. Apple Books
- Apply at: Apple Performance Partners (affiliate.itunes.apple.com)
- Approval can take 1–2 weeks, stricter requirements
- **What to change:** `appleBooksUrl` in `books/[slug].astro` — affiliate links use a different URL format with your token. Apple provides a link builder tool after approval.

### 6. Kobo (Rakuten)
- Apply at: rakutenadvertising.com or directly via Kobo's affiliate page
- Strong in Canada, UK, Europe — good complement to Amazon
- **What to change:** `koboUrl` in `books/[slug].astro` — append affiliate tracking param after approval

### 7. Waterstones
- Apply at: waterstones.com/affiliates (UK-focused, Awin network)
- Best for UK traffic. Commission ~5%
- **What to change:** `waterstonesUrl` in `books/[slug].astro`

### 8. Wordery
- Apply via Awin (awin.com) — search "Wordery"
- International shipping, popular alternative to Amazon in Europe
- **What to change:** `worderyUrl` in `books/[slug].astro`

**Recommended order:** Amazon → Bookshop.org → Audible → ThriftBooks → Kobo → Waterstones → Wordery → Apple Books
