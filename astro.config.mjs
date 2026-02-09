import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  integrations: [mdx(), react()],
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwind()],
  },
});
