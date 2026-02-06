import { defineCollection, z } from 'astro:content';

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.number(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { books };
