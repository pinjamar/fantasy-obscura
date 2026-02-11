# Quick Reference: Fantasy-Obscura BookHub

## File Locations

| What           | Where                        | Purpose                                   |
| -------------- | ---------------------------- | ----------------------------------------- |
| Main Component | `src/components/BookHub.tsx` | React admin interface for book management |
| Search API     | `src/pages/api/search.ts`    | GET endpoint for searching external APIs  |
| Create API     | `src/pages/api/books.ts`     | POST endpoint for saving books            |
| Providers      | `src/lib/books/providers.ts` | 4 external book API fetchers              |
| DB Layer       | `src/lib/db/books.ts`        | Supabase CRUD operations                  |
| Types          | `src/lib/types.ts`           | TypeScript interfaces                     |
| Filters        | `src/lib/filters.ts`         | Filter constants & validation             |

## Common Tasks

### Add BookHub to a Page

```typescript
// page.astro
---
import BookHub from '../components/BookHub.tsx';
---
<BookHub client:load />
```

### Search Books Programmatically

```typescript
const res = await fetch('/api/search?source=openlibrary&q=dragon');
const { items } = await res.json();
```

### Save Book from Frontend

```typescript
const res = await fetch('/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Example Book',
    authors: ['Author Name'],
    subgenres: ['Epic Fantasy'],
  }),
});
const { book } = await res.json();
```

### Query Books with Filters

```typescript
import { getBooks } from '../lib/db/books';

const results = await getBooks({
  filters: {
    subgenres: ['Epic Fantasy'],
    tropes: ['Chosen One'],
    minRating: 4.0,
  },
  limit: 20,
});
```

## Environment Variables

Required in `.env.local`:

```env
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...
```

Optional:

```env
GOOGLE_BOOKS_API_KEY=AIzaSy...
```

## Import Methods

### Method 1: Search UI (Best)

1. Open BookHub component
2. Select source (Open Library)
3. Enter search query
4. Click Search
5. Click Save on results

### Method 2: Manual Entry

1. Scroll to "Manual Book Entry"
2. Fill form fields
3. Click Save

### Method 3: Batch Script

```javascript
const books = [...]; // Your book list
for (const book of books) {
  await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
}
```

## Available Book Sources

| Source              | Auth    | Free | Quality   | Coverage      |
| ------------------- | ------- | ---- | --------- | ------------- |
| **Open Library**    | No      | ✅   | High      | Comprehensive |
| **Google Books**    | API Key | ❌   | Excellent | Very broad    |
| **Harvard GraphQL** | No      | ✅   | Academic  | Specialized   |
| **Bigbook**         | No      | ✅   | Good      | Alternative   |

## Filter Options

### Subgenres (16)

Epic, High, Urban, Dark, Contemporary, Paranormal, Science, Portal, Cozy, etc.

### Tropes (25+)

Chosen One, Found Family, Enemies to Lovers, Magic Academy, Time Travel, etc.

### Magic System (3)

Hard Magic, Soft Magic, No Magic

### Tone (10)

Dark, Grimdark, Hopeful, Humorous, Romantic, Adventurous, etc.

### Pacing (3)

Fast-paced, Moderate, Slow-burn

### Heat Level (5)

Clean, Closed Door, Sweet, Spicy, Steamy

### Diversity Rep (15+)

LGBTQ+ Protagonist, POC Protagonist, Neurodivergent, Disability, etc.

## Database Schema

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  isbn TEXT,
  cover_url TEXT,
  publication_year INT,
  page_count INT,
  avg_rating NUMERIC,
  synopsis TEXT,
  subgenres TEXT[],  -- GIN indexed
  tropes TEXT[],     -- GIN indexed
  magic_system TEXT,
  tone TEXT[],
  pacing TEXT,
  heat_level TEXT,
  diversity_rep TEXT[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP  -- Auto-updated
);
```

## Response Examples

### Search Response

```json
{
  "items": [
    {
      "title": "The Name of the Wind",
      "authors": ["Patrick Rothfuss"],
      "cover_url": "https://...",
      "isbn": "0575081449",
      "publication_year": 2007,
      "page_count": 662,
      "source": "openlibrary",
      "source_id": "OL45883W"
    }
  ]
}
```

### Create Response

```json
{
  "success": true,
  "book": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Name of the Wind",
    "authors": ["Patrick Rothfuss"],
    "created_at": "2024-12-18T10:30:00Z",
    "updated_at": "2024-12-18T10:30:00Z"
  }
}
```

## TypeScript Types

### BookSearchResult (from APIs)

```typescript
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
```

### BookInput (for saving)

```typescript
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
```

### Book (full model)

```typescript
interface Book extends BookInput {
  id: string;
  created_at: string;
  updated_at: string;
}
```

## Debugging

### Check if API is running

```bash
curl http://localhost:3000/api/search?source=openlibrary&q=test
```

### Check database connection

```typescript
// In browser console
const { data, error } = await supabaseClient.from('books').select('count');
console.log(data, error);
```

### View stored books

- Go to Supabase Dashboard
- Navigate to Books table
- View all rows and data

### Run tests

```bash
node test-api.js
```

## Performance Limits

- Max search results: 100 per query
- Max books per import: Unlimited (import one at a time)
- Max query time: 2-3 seconds
- Max filter dimensions: 7
- Database timeout: 30 seconds

## Common Errors & Fixes

| Error                   | Cause                    | Fix                         |
| ----------------------- | ------------------------ | --------------------------- |
| "Missing query"         | No search term provided  | Type a search query         |
| "Failed to create book" | Invalid data or DB error | Check title is provided     |
| "CORS error"            | API blocked              | Check if dev server running |
| "Connection refused"    | DB not connected         | Check Supabase credentials  |
| "No results found"      | No books match search    | Try different search term   |

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Run tests
node test-api.js

# View project structure
ls -la src/

# Check for errors
npm run check
```

## Resources

📚 Documentation:

- `BOOKHUB_API_INTEGRATION.md` - Technical details
- `BULK_IMPORT_GUIDE.md` - User guide
- `SYSTEM_ARCHITECTURE.md` - Full system design
- `DATABASE_SETUP.md` - DB initialization

🔗 External:

- [Open Library API](https://openlibrary.org/developers/api)
- [Google Books API](https://developers.google.com/books)
- [Supabase Docs](https://supabase.com/docs)
- [Astro Docs](https://docs.astro.build)

## Status Checks

✅ BookHub component: Updated
✅ API endpoints: Working
✅ Database: Configured
✅ Types: Complete
✅ Documentation: Comprehensive
✅ Ready to deploy: YES

---

**Last Updated**: December 2024
**Version**: 1.0 Production Ready
