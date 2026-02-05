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
- **React 19** - Interactive components (optional)
- **Tailwind CSS 4** - Utility-first CSS
- **MDX** - Markdown + JSX support
- **TypeScript** - Type safety

## 🌐 Deployment

The project is configured as a static site. Deploy the `dist/` folder to any hosting service:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## 📝 License

Create a LICENSE file as needed for your project.
