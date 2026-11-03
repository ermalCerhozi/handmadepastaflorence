// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
// This file imports TypeScript, which only Astro can load (it reads the config
// through Vite). Plain-Node scripts must NOT import astro.config.mjs: they take
// `redirects` from src/data/redirects.mjs instead. A static import of this file
// from generate-redirects.mjs failed on the server with ERR_MODULE_NOT_FOUND.
import remarkInlineCta from './src/utils/remark-inline-cta.ts';
import { redirects } from './src/data/redirects.mjs';

// NO LEGACY REDIRECTS (removed 2026-08-23). Two dead URL shapes used to be kept
// alive here — /<locale>/<english-slug>/ from before landings.ts had translated
// slugs, and /blog/<locale>/<slug>/ from before the English blog route filtered
// out translations. They were served as 80 meta-refresh stub pages, plus a
// generated nginx 301 table in deploy/ that was never installed.
//
// Dropped because they carried nothing: across the 28 days to 2026-08-20, every
// URL in Search Console that received a single impression was already in the
// current sitemap. Not one legacy URL registered an impression or a click, even
// while it was live as a 404. They now 404, which is the correct answer for a
// URL shape this site no longer serves.

// https://astro.build
export default defineConfig({
  site: 'https://handmadepastaflorence.com',

  // Mid-article "Book your class" block in every blog post. See the plugin for
  // placement rules and the `inlineCta: false` frontmatter opt-out.
  // `markdown.remarkPlugins` is deprecated since Astro 6.4; plugins go through
  // unified() now. @astrojs/markdown-remark is Astro's own dependency (installed
  // at the version Astro needs), so it is imported without being listed in
  // package.json: adding it there would also need a lockfile edit.
  markdown: {
    processor: unified({ remarkPlugins: [remarkInlineCta] }),
  },

  // Redirects live in src/data/redirects.mjs (see the note there for why).
  redirects,
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
