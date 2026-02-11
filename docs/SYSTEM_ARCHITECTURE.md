# Fantasy-Obscura: Complete System Architecture

## Project Overview

A fantasy book library with advanced filtering and bulk import capabilities powered by Supabase PostgreSQL, Astro 5, React 19, and external book APIs.

## Core Components

### 1. Frontend Layer

```
src/
├── components/
│   ├── BookHub.tsx (React) - Admin interface for book management
│   ├── BookCard.tsx - Individual book display
│   ├── BookCard.tsx - Mini book preview
│   ├── Layout.astro - Page wrapper
│   └── Other components...
├── pages/
│   ├── index.astro - Homepage with genre categories
│   ├── craft/index.astro - "What to Read?" personality quiz
│   ├── books/
│   │   └── [slug].astro - Individual book page (dynamic)
│   ├── api/
│   │   ├── search.ts - Book source search endpoint
│   │   └── books.ts - Book creation endpoint
│   └── Other category pages...
└── assets/ - Images, icons
```

### 2. Data Layer

```
src/lib/
├── supabaseClient.ts - Public client (browser)
├── supabaseAdmin.ts - Admin client (server)
├── types.ts - TypeScript interfaces
├── database.types.ts - Auto-generated from Supabase
├── db/
│   └── books.ts - Database CRUD operations
├── books/
│   └── providers.ts - External API fetchers
├── filters.ts - Filter constants & validation
└── supabase.ts - Connection setup
```

### 3. Database Layer (Supabase PostgreSQL)

```sql
books table:
├── id (UUID, primary key)
├── title (text, required)
├── authors (text[], required)
├── isbn (text, nullable)
├── cover_url (text, nullable)
├── publication_year (int)
├── page_count (int)
├── avg_rating (numeric)
├── synopsis (text)
├── subgenres (text[]) - GIN indexed
├── tropes (text[]) - GIN indexed
├── magic_system (text)
├── tone (text[])
├── pacing (text)
├── heat_level (text)
├── diversity_rep (text[])
├── created_at (timestamp)
├── updated_at (timestamp)
└── Indexes: GIN on arrays, B-tree on dates

Triggers:
├── auto_updated_at - Updates timestamp on changes
```

### 4. API Layer

```
/api/search
├── GET endpoint
├── Params: source (openlibrary|googlebooks|harvard|bigbook), q (query)
├── Returns: { items: BookSearchResult[] }
├── Provider: src/lib/books/providers.ts

/api/books
├── POST endpoint
├── Body: BookInput (minimal book data)
├── Returns: { success: true, book: Book }
├── Normalizes and saves to Supabase
```

### 5. External Data Sources

```
src/lib/books/providers.ts:
├── fetchOpenLibrary()
│   └── Free, comprehensive, no auth needed
├── fetchGoogleBooks()
│   └── High quality metadata, requires API key
├── fetchHarvardGraphql()
│   └── Academic focus, graphql endpoint
└── fetchBigbook()
    └── Alternative source, metadata emphasis

All normalize to: BookSearchResult type
```

## Data Flow Diagrams

### Book Search & Import

```
BookHub (React)
    ↓ [User enters query & selects source]
    ↓
/api/search GET
    ↓ [Routes to correct provider]
    ↓
providers.ts [Fetches from external API]
    ↓ [Normalizes response]
    ↓
BookHub [Displays results with covers]
    ↓ [User clicks Save]
    ↓
/api/books POST [Sends BookInput]
    ↓ [Validates & normalizes]
    ↓
db/books.ts::createBook()
    ↓ [Supabase client]
    ↓
PostgreSQL [Inserts row]
    ↓ [Auto-update trigger fires]
    ✓ Saved with updated_at timestamp
```

### Book Filtering (Frontend Queries)

```
User selects filters (UI)
    ↓
db/books.ts::getBooks()
    ↓
Build query: overlaps(subgenres, [...])
overlaps(tropes, [...])
gte(avg_rating, X)
lte(page_count, X)
    ↓
PostgreSQL [GIN index lookup for arrays]
[B-tree index for ranges]
    ↓
Results with pagination
    ↓
BookCard display
```

## Type System

### Core Types (src/lib/types.ts)

```typescript
// Full database model
interface Book {
  id: string;
  title: string;
  authors: string[];
  isbn?: string;
  cover_url?: string;
  publication_year?: number;
  page_count?: number;
  avg_rating?: number;
  synopsis?: string;
  subgenres: string[];
  tropes: string[];
  magic_system?: string;
  tone: string[];
  pacing?: string;
  heat_level?: string;
  diversity_rep: string[];
  created_at: string;
  updated_at: string;
}

// For API POST
interface BookInput {
  title: string;
  authors?: string[];
  isbn?: string;
  cover_url?: string;
  publication_year?: number;
  page_count?: number;
  avg_rating?: number;
  synopsis?: string;
  subgenres?: string[];
  tropes?: string[];
  magic_system?: string;
  tone?: string[];
  pacing?: string;
  heat_level?: string;
  diversity_rep?: string[];
}

// From external APIs
interface BookSearchResult {
  title: string;
  authors?: string[];
  isbn?: string;
  cover_url?: string;
  publication_year?: number;
  page_count?: number;
  synopsis?: string;
  source: string;
  source_id?: string;
}

// For filtering
interface BookFilters {
  subgenres?: string[];
  tropes?: string[];
  magic_system?: string;
  tone?: string[];
  minRating?: number;
  maxRating?: number;
  maxPageCount?: number;
}
```

## Available Filters

From `src/lib/filters.ts`:

```
SUBGENRES (16):
  - Epic Fantasy, High Fantasy, Urban Fantasy, Dark Fantasy
  - Contemporary Fantasy, Paranormal Romance, etc.

TROPES (25+):
  - Chosen One, Found Family, Enemies to Lovers
  - Magic Academy, Portal Fantasy, Time Travel, etc.

MAGIC_SYSTEMS (3):
  - Hard Magic, Soft Magic, No Magic

TONES (10):
  - Dark, Grimdark, Hopeful, Humorous, Romantic, etc.

PACING (3):
  - Fast-paced, Moderate, Slow-burn

HEAT_LEVELS (5):
  - Clean, Closed Door, Sweet, Spicy, Steamy

DIVERSITY_REP (15+):
  - LGBTQ+ Protagonist, POC Protagonist, Neurodivergent, etc.
```

## Database Operations

### Get Books with Advanced Filtering

```typescript
const books = await getBooks({
  filters: {
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Chosen One', 'Found Family'],
    minRating: 4.0,
  },
  sort: 'rating-desc',
  limit: 20,
  offset: 0,
});
```

### Create Book

```typescript
const book = await createBook({
  title: 'The Name of the Wind',
  authors: ['Patrick Rothfuss'],
  subgenres: ['Epic Fantasy'],
  tropes: ['Chosen One', 'Magic Academy'],
  // ... other fields
});
```

### Get Book by Slug (URL-friendly)

```typescript
const book = await getBookBySlug('the-name-of-the-wind');
// Slug generated from title with slugify()
```

## Deployment Checklist

- [ ] Environment variables set (.env.local)
- [ ] Supabase project created and configured
- [ ] Database schema applied (schema.sql)
- [ ] External API keys added (Google Books, etc.)
- [ ] BookHub component integrated into admin page
- [ ] Test /api/search and /api/books endpoints
- [ ] Initial book batch imported (20-50 books)
- [ ] Filter UI tested on book listing page
- [ ] Category pages verified
- [ ] Deploy to Vercel/Netlify/your host

## Performance Optimizations

- **GIN Indexes**: Fast array filtering for subgenres/tropes
- **B-tree Indexes**: Fast range queries on ratings/page_count
- **Pagination**: 20 books per page by default
- **Image Optimization**: Lazy loading for cover images
- **API Caching**: External API results cached in browser

## Development Workflow

```bash
# Start dev server
npm run dev

# Access BookHub
http://localhost:3000/admin/bookhub

# Test endpoints
node test-api.js

# Build for production
npm run build

# Deploy
# (Vercel auto-deploys on git push)
```

## File Summary

**Total Lines of Code**: ~1500

- Components: ~600 LOC
- Database layer: ~300 LOC
- API endpoints: ~200 LOC
- External providers: ~250 LOC
- Types & utilities: ~150 LOC

## Notable Features

✅ **Dual Import**: Search external APIs + manual entry
✅ **TypeScript**: Full type safety end-to-end
✅ **Advanced Filtering**: Multiple criteria, fast indexes
✅ **Responsive Design**: Mobile-first with Tailwind CSS
✅ **Dynamic Routes**: Per-book pages with [slug]
✅ **Personality Quiz**: "What to Read?" based on preferences
✅ **Cover Images**: Automatic from external sources
✅ **Auto-metadata**: Normalization from different APIs

## Next Steps

1. **Bulk Import Phase**
   - Import 100+ books from Open Library
   - Add manual fantasy metadata
   - Verify filtering works

2. **Community Features**
   - User ratings & reviews
   - Reading lists/collections
   - Book recommendations

3. **Content Expansion**
   - Series management (book 1, 2, etc.)
   - Author pages
   - Fantasy trope explanations

4. **Analytics**
   - Track popular searches
   - Rating distribution by subgenre
   - User filter preferences

---

**Stack**: Astro 5 + React 19 + TypeScript + Tailwind CSS + Supabase PostgreSQL
**Status**: ✅ Ready for production bulk import
**Last Updated**: December 2024
