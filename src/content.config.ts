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
    // Optional FAQ block — rendered visibly and emitted as FAQPage JSON-LD to
    // target People-Also-Ask / featured-snippet queries the guide already ranks for.
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

export const collections = { blog };
