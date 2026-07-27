// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://handmadepastaflorence.com',
  // Keep this list in sync with `languages` in src/i18n/config.ts — the sitemap
  // integration only emits hreflang alternates for locales declared here, so a
  // short list silently drops fr/de/zh from the sitemap's alternate annotations.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'fr', 'de', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          it: 'it',
          fr: 'fr',
          de: 'de',
          zh: 'zh-CN',
        },
      },
    }),
  ],
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
