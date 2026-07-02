// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://handmadepastaflorence.com',
  integrations: [
    // /edition is an unindexed design variant — keep it out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/edition') }),
  ],
  devToolbar: { enabled: false },
});
