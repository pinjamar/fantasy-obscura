# fantasy-obscura

Site dedicated to fantasy & sci-fi book lovers with reading orders, guides, and curated lists.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (verify with `node --version`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:3000` during development.

## 🧱 Database (Supabase)

Apply the schema in [supabase/schema.sql](supabase/schema.sql) to your Supabase project.

Required environment variables:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=

GOOGLE_BOOKS_API_KEY=
HARVARD_GRAPHQL_URL=
HARVARD_GRAPHQL_API_KEY=
HARVARD_GRAPHQL_QUERY=

BIGBOOK_API_BASE=
BIGBOOK_API_KEY=
BIGBOOK_API_SEARCH_PATH=/search
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is used by the server API routes to insert records.
- `PUBLIC_*` keys are used by the client if needed.
- Harvard GraphQL requires you to supply a valid query in `HARVARD_GRAPHQL_QUERY`.
- Bigbook endpoints are configurable with `BIGBOOK_API_BASE` and `BIGBOOK_API_SEARCH_PATH`.

## 📁 Project Structure

```
fantasy-obscura/
├── src/
│   ├── components/       # Reusable Astro components
│   ├── pages/           # Page routes (auto-generates URLs)
│   ├── styles.css       # Global styles with Tailwind
│   └── styles/          # Optional: additional stylesheets
├── dist/                # Build output (generated)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 📚 Adding Content

### Creating a New Page

Create `.astro` files in `src/pages/`:

```astro
---
import Layout from "../components/Layout.astro";
---

<Layout title="Your Title" description="Page description">
  <h1>Your Content</h1>
</Layout>
```

### Creating an MDX Page

Create `.mdx` files in `src/pages/` with frontmatter:

```mdx
---
title: Page Title
description: Page description
---

import Layout from '../../components/Layout.astro';

export const { title, description } = frontmatter;

<Layout title={title} description={description}>

# Your Content Here

</Layout>
```

## 🎨 Styling

- **Tailwind CSS 4** for utility-first styling
- Import global styles in your Layout component
- Use Tailwind classes directly in HTML

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run type checking

## 📦 Tech Stack

- **Astro 5** - Static site generation
- **Astro Node Adapter** - Server output for API routes
- **React 19** - Interactive components (optional)
- **Tailwind CSS 4** - Utility-first CSS
- **MDX** - Markdown + JSX support
- **TypeScript** - Type safety

## 🌐 Deployment

The project uses server output (Node adapter). Deploy the server build output:

- Node hosting (Docker, VPS, Render, Fly.io, etc.)

## 📝 License

Create a LICENSE file as needed for your project.
