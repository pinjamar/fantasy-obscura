# Quick Start: Bulk Book Import

## Setup (One-time)

1. **Start dev server**

   ```bash
   cd c:\Users\Ivan\Desktop\fantasy-obscura
   npm run dev
   ```

   Server runs on http://localhost:3000

2. **Verify Supabase connection**
   - Check `.env.local` has `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
   - Verify database is accessible

## Using BookHub

### Method 1: Quick API Search (Recommended for bulk)

1. Open http://localhost:3000/admin/bookhub (or wherever BookHub is embedded)
2. In **🔍 Fetch from External APIs** section:
   - Source: `Open Library` (free, no API key needed)
   - Query: `Lord of the Rings` (or any title/author)
3. Click **Search**
4. Browse results with cover images
5. Click **💾 Save to database** on each book you want

**Pro tip**: Open Library returns up to 100 results per search. Try these searches:

- `epic fantasy` - Get books by topic
- `high fantasy` - Another popular subgenre
- `name:tolkien` - Search by author name
- `isbn:0451526341` - Search by ISBN

### Method 2: Manual Entry (For missing books)

1. Scroll to **✍️ Manual Book Entry** section
2. Fill in required field: **Title**
3. Add optional fields:
   - Authors (comma-separated)
   - ISBN, publication year, page count, rating
   - Cover URL (paste image link)
   - Synopsis
4. Add fantasy metadata:
   - Subgenres: Epic Fantasy, Urban Fantasy, High Fantasy, Dark Fantasy, etc.
   - Tropes: Chosen One, Found Family, Romance, etc.
   - Magic system: Hard Magic, Soft Magic, etc.
   - Tone, pacing, heat level, diversity rep
5. Click **💾 Save to database**

### Method 3: Batch Scripting (For 100s of books)

Create a script to fetch from Open Library and batch import:

```javascript
// batch-import.js
const books = [
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
  { title: 'Mistborn', author: 'Brandon Sanderson' },
  { title: 'The Poppy War', author: 'R.F. Kuang' },
  // ... add more
];

for (const book of books) {
  // Fetch from Open Library first
  const res = await fetch(
    `http://localhost:3000/api/search?source=openlibrary&q=${encodeURIComponent(book.title)}`,
  );
  const data = await res.json();

  if (data.items?.length > 0) {
    // Save first result
    await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.items[0]),
    });
  }
}
```

## Troubleshooting

**Problem**: Search returns no results

- **Check**: Is the dev server running? (http://localhost:3000)
- **Check**: Is your internet connection working?
- **Try**: Use a more specific search term

**Problem**: "Save failed" error

- **Check**: Is Supabase credentials correct in `.env.local`?
- **Check**: Is the database table created? (Run schema.sql if not)
- **Try**: Check browser console for detailed error

**Problem**: Books save but don't appear in queries

- **Check**: Navigate to database and verify `books` table has rows
- **Check**: Are you filtering by subgenre/tropes? (Empty arrays filter out)

## API Response Examples

**Search request:**

```
GET /api/search?source=openlibrary&q=The%20Hobbit
```

**Search response:**

```json
{
  "items": [
    {
      "title": "The Hobbit",
      "authors": ["J.R.R. Tolkien"],
      "cover_url": "https://covers.openlibrary.org/...",
      "isbn": "0547928217",
      "publication_year": 1937,
      "page_count": 310,
      "synopsis": "...",
      "source": "openlibrary",
      "source_id": "OL45883W"
    }
  ]
}
```

**Create request:**

```
POST /api/books
Content-Type: application/json

{
  "title": "The Hobbit",
  "authors": ["J.R.R. Tolkien"],
  "isbn": "0547928217",
  "publication_year": 1937,
  "page_count": 310,
  "cover_url": "https://covers.openlibrary.org/...",
  "synopsis": "...",
  "subgenres": ["High Fantasy"],
  "tropes": ["Adventure", "Chosen One"],
  "magic_system": "Soft Magic"
}
```

**Create response:**

```json
{
  "success": true,
  "book": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "The Hobbit",
    "created_at": "2024-12-18T10:30:00Z",
    ...
  }
}
```

## Database Check

After importing books, verify they're saved:

```bash
# In VS Code terminal, run Supabase CLI
supabase db pull  # See current schema
# OR use Supabase Dashboard → Books table

# Manual count query (Supabase Dashboard → SQL Editor)
SELECT COUNT(*) as total_books FROM books;
SELECT DISTINCT source FROM books;  -- See where books came from
```

## Performance Tips

- **Batch size**: Import 10-20 books at a time to avoid timeouts
- **Search smarter**:
  - `topic:fantasy` (Open Library supports topics)
  - `subject:adventure`
  - Year filters: older books often have better metadata
- **Cover images**: Books without cover URLs still save, you can add later
- **Metadata**: Don't fill all fantasy fields at first, can be added/edited in database later

## Next Level: Custom Import

To import your own book list (CSV, JSON, etc.):

1. Parse your file format
2. Loop through entries
3. Call `/api/search` to find the book
4. Call `/api/books` POST to save

Example with CSV:

```javascript
const fs = require('fs');
const csv = require('csv-parse/sync'); // npm install csv-parse

const records = csv.parse(fs.readFileSync('my-books.csv'), {
  columns: true,
});

for (const record of records) {
  // Search for book
  const searchRes = await fetch(
    `http://localhost:3000/api/search?source=openlibrary&q=${encodeURIComponent(record.title)}`,
  );
  const { items } = await searchRes.json();

  if (items?.length > 0) {
    // Merge with your custom data
    const book = { ...items[0], ...record };

    // Save
    await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
  }
}
```

---

Happy importing! 📚✨
