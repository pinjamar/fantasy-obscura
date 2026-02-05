import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwind()],
  },
});
