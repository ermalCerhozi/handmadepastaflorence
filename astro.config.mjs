// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://handmadepastaflorence.com',
  // Keep this list in sync with `languages` in src/i18n/config.ts.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'fr', 'de', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  // Sitemap is hand-built at src/pages/sitemap-index.xml.ts + sitemap-0.xml.ts,
  // not @astrojs/sitemap: that integration's `i18n` option can only pair pages
  // whose URL pathname is identical across locales, so it silently emitted zero
  // hreflang alternates for every page with a per-locale translated slug (the
  // money pages + pasta-shapes hub/spokes — 50 of 85 URLs). The hand-built
  // version reuses the same data sources as each page's own <head> hreflang
  // tags, so the two can't drift apart. See src/utils/sitemap-entries.ts.
  build: {
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
