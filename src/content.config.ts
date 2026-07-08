import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Guides & stories — long-tail informational content that builds topical
// authority and links down to the class landing pages.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Endri Cerhozi'),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

export const collections = { blog };
