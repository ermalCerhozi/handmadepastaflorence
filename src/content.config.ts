import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Guides & stories — long-tail informational content that builds topical
// authority and links down to the class landing pages.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Set only when a post's facts (prices, hours, recommendations) are
    // actually revised — falls back to pubDate in Article schema otherwise.
    // Never bump this just to look fresh.
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Endri Cerhozi'),
    image: image(),
    imageAlt: z.string(),
    // Optional FAQ block — rendered visibly and emitted as FAQPage JSON-LD to
    // target People-Also-Ask / featured-snippet queries the guide already ranks for.
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    badge: z.string().optional(),
  }),
});

export const collections = { blog };
