// The site's redirects, in plain JavaScript with NO imports, on purpose.
//
// Two files read this map: astro.config.mjs (for Astro) and
// src/scripts/generate-redirects.mjs, which `npm run build` runs in plain Node
// to write the nginx 301 rules. astro.config.mjs imports TypeScript (the markdown
// CTA plugin), which plain Node cannot resolve, so the generator must not import
// the config. It imports this file instead. A static `import` of the config from
// that script crashed the server build and blocked a deploy.
//
// The merged-post redirect, added 2026-09-05, deliberately not covered by the blanket
// "no legacy redirects" rule at the top of astro.config.mjs. That rule was correct for URL *shapes*
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
// honours it, but a server-side 301 is strictly better. `npm run build`
// generates the real 301s from this map into
// ops/nginx/handmadepastaflorence-redirects.conf; verified live on the origin
// 2026-09-26 (HTTP 301). The server copy does NOT update itself — re-copy the
// file and reload nginx whenever this map changes.
export const redirects = {
  ...Object.fromEntries(
    ['', '/it', '/fr', '/de', '/zh'].map((prefix) => [
      `${prefix}/blog/where-do-locals-eat-fresh-pasta-florence/`,
      `${prefix}/blog/where-to-eat-handmade-pasta-in-florence/`,
    ])
  ),
  // Misspelt URLs, added 2026-09-26. None of these ever existed in this repo
  // (checked with `git log -S`); they are typos or AI-invented links that
  // Google found elsewhere and now reports as 404s in Coverage. Each one drew
  // impressions in the 30 Jun–26 Sep Performance export — the German what-to-
  // eat typo ranked at position 2.7 over 17 impressions, and the German gift
  // typo took a click — so they earn a 301 under the same rule as above: a
  // URL with real search signal is consolidated, not dropped. Junk 404s with
  // no plausible target (/pasta-shapes/0.6.3, a scraped zh/cn path) stay 404.
  '/de/blog/what-to-eat-in-florenz/': '/de/blog/what-to-eat-in-florence/',
  '/de/kochkurs-verschenken-florence/': '/de/kochkurs-verschenken-florenz/',
  '/fr/cours-cuisine-agriturisme-toscane/': '/fr/cours-cuisine-agritourisme-toscane/',
  '/fr/blog/best-flor-for-italian-fresh-pasta/': '/fr/blog/best-flour-for-italian-fresh-pasta/',
  '/blog/fresh-pasta-vs-dry-pasta-italy/': '/blog/fresh-vs-dry-pasta-italy/',
  '/blog/pasta-secca-vs-pasta-fresca': '/blog/fresh-vs-dry-pasta-italy/',
  // Two more misspelt URLs, added 2026-10-13. Both are live 404s that drew
  // impressions in the 12 Jul to 12 Oct Performance export, so they get a 301
  // under the same rule as the 2026-09-26 batch above. The flour typo is the
  // English twin of the French one already redirected.
  '/blog/best-flor-for-italian-fresh-pasta/': '/blog/best-flour-for-italian-fresh-pasta/',
  '/blog/what-to-do-on-a-sunday-in-florence/': '/blog/what-to-do-in-florence-on-a-sunday/',
};
