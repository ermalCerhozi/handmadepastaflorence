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
    /**
     * Which class landing page this post's CTA and author bio should point at,
     * as a key in src/data/landings.ts. Defaults to 'pasta-making'.
     *
     * WHY: every post used to hardcode 'pasta-making', which now receives 71
     * in-body links while gift/gluten-free/family/for-two receive 3-4 each and
     * rank 35-90 (GSC, 16 Jul-15 Sep 2026). The guides are ~50% of all site
     * clicks, so where they point is the site's main internal-link budget.
     */
    classKey: z.string().optional(),
    /**
     * Slugs of other posts to surface at the foot of this one, in order.
     * Hand-curated rather than computed: relatedness here is editorial, and a
     * tag-similarity guess would link the gelato guide to the flour post.
     * Slugs that do not exist in the reader's locale are dropped silently.
     */
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
