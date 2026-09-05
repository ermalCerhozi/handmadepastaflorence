// @ts-check
import { defineConfig } from 'astro/config';

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

  // ONE redirect, added 2026-09-05, deliberately not covered by the blanket
  // "no legacy redirects" rule above. That rule was correct for URL *shapes*
  // this site stopped serving: none of them had ever registered a single GSC
  // impression. This is the opposite case. /blog/where-do-locals-eat-fresh-
  // pasta-florence/ was a live, indexed post that pulled 357 impressions and
  // 13 clicks in the 18 days to 2026-09-05 — the highest CTR of any English
  // page on the site (10.53%) — and it was merged into where-to-eat-handmade-
  // pasta-in-florence/ because the two competed for "best handmade pasta in
  // Florence" and both stalled on page 2-3 in English. Dropping that URL cold
  // would throw away real accumulated signal.
  //
  // CAVEAT: on a static build Astro emits these as meta-refresh stub pages,
  // NOT true 301s. Google treats meta-refresh as a soft redirect and usually
  // honours it, but a server-side 301 is strictly better. The nginx rule that
  // would do it properly lives outside this repo:
  //   location = /blog/where-do-locals-eat-fresh-pasta-florence/ { return 301 /blog/where-to-eat-handmade-pasta-in-florence/; }
  // (and the same for the /it/, /fr/, /de/, /zh/ prefixes).
  redirects: Object.fromEntries(
    ['', '/it', '/fr', '/de', '/zh'].map((prefix) => [
      `${prefix}/blog/where-do-locals-eat-fresh-pasta-florence/`,
      `${prefix}/blog/where-to-eat-handmade-pasta-in-florence/`,
    ])
  ),
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
