# Technical SEO Findings — handmadepastaflorence.com
Audit date: 2026-09-03. Site: Astro static build, 5 locales (en default unprefixed, it, fr, de, zh — per `astro.config.mjs`).

Verified with live requests/rendering: `claude-seo run sitemap_discovery.py`, `render_page.py --mode always` (mobile/desktop viewports), `capture_screenshot.py`, a Playwright click-interaction test against the header hamburger on 3 real URLs (home, a landing page, a blog post), and direct `curl` against robots.txt, sitemap-index.xml, sitemap-0.xml, and canonical/redirect checks. Source (`src/components/Header.astro`, `Footer.astro`, `Schema.astro`, `src/data/landings.ts`) was cross-checked against rendered/live output, not read in isolation.

## Prior-audit items re-verified

### 1. Mobile header nav — RESOLVED (was Critical, 2026-08-08)
Independently re-tested and confirmed fixed. Evidence:
- `src/components/Header.astro` now ships a real hamburger toggle: `button[data-nav-toggle]` with `aria-expanded`/`aria-controls`, a script that toggles `.is-nav-open` on the header, locks body scroll, closes on Escape and on link click, and resets on `astro:after-swap` (view transitions) and desktop-breakpoint resize.
- Live Playwright click test on `/`, `/pasta-making-class-florence/`, and `/blog/how-to-choose-a-pasta-class-in-florence/` (375x812 mobile viewport, real tap on `button.hdr__burger`): nav opens (`display: flex`), panel renders at 375x304, and all 5 nav links are visible with 335x54.8px touch targets (well above the 44px minimum). Screenshots confirm a legible open panel plus a full-width CTA.
- Before the tap, the burger button itself renders at a correct 40x40px (not 0x0) — only the collapsed `.hdr__nav` panel is 0x0 pre-click, which is the intended collapsed state, not the bug. No other stylesheet overrides `.hdr__nav`/`.hdr__burger` (grep confirms `Header.astro` is the sole source).
- No console errors during render (`render_page.py` `console_errors: []`).
**Status: fixed, no action needed.** Recommend a Playwright smoke test for the header toggle in CI so this class of regression is caught before deploy, since it silently broke once already.

### 2. Sitemap hreflang coverage — RESOLVED (was High, 50/85 URLs missing, 2026-08-08)
`sitemap-0.xml` now contains 155 `<url>` entries; every single one carries exactly 6 `xhtml:link` hreflang alternates (5 locales + x-default) — 930/930, zero URLs with 0 or partial hreflang. This matches the codebase comment in `astro.config.mjs` explaining the sitemap was intentionally hand-built (`src/utils/sitemap-entries.ts`) specifically because `@astrojs/sitemap`'s `i18n` option can't pair pages with per-locale translated slugs (the money pages + pasta-shapes hub/spokes), and reuses the same data source as each page's own `<head>` hreflang tags so the two can't drift.
**Status: fixed, no action needed.**

### 3. Address contradiction — STILL PRESENT (High)
Confirmed still live, unchanged since 2026-08-08:
- `src/components/Footer.astro:25` (rendered sitewide, all locales): `"Via dei Pastai 12, Oltrarno · Firenze, Italy"`.
- `src/components/Schema.astro:52` — `LocalBusiness` JSON-LD `PostalAddress.streetAddress: "Via dei Pastai 12"`, published on every page.
- `src/data/landings.ts:193` — the core Florence/Oltrarno pasta-class landing page (the same class the footer/schema NAP describes — "The kitchen is in the Oltrarno, near Piazza Santo Spirito") states: *"we send the exact address when you book."*
This is a direct self-contradiction on the same business entity: the footer and `LocalBusiness` schema assert a fixed, indexable street address as fact, while the primary landing page for that same kitchen tells the visitor the real address is withheld until booking. (The agriturismo landing page's "no single address, depends on partner estate" language at `landings.ts:4813-4814` is not contradictory — that's a genuinely different, multi-venue product — but the Oltrarno-class copy at line 193 directly conflicts with the sitewide NAP.)
**Risk:** inconsistent NAP is a known local-pack/Maps ranking suppressor, and it's also a trust problem for schema validators/AI answer engines that cite the JSON-LD address as ground truth while the page text disclaims it.
**Recommendation:** pick one. Either (a) the address is real and current — remove the "we send the exact address when you book" line from `landings.ts:193` and any sibling copy, or (b) it isn't publicly locatable — remove `streetAddress` from `Schema.astro`'s `LocalBusiness` block (use `addressLocality`/`addressRegion` only, which is valid GBP practice for by-appointment venues) and drop the fabricated street line from `Footer.astro`. Do not publish a specific address in schema/footer while telling visitors it's withheld.

## General technical SEO checks

### Crawlability — PASS
- `robots.txt`: clean `Allow: /` default, explicit `Disallow: /api/`, and a well-scoped AI-crawler allowlist (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended all explicitly `Allow: /`), plus `Crawl-delay: 10` (not a block) for AhrefsBot/SemrushBot/MJ12bot/DotBot. `Sitemap:` directive present and correct.
- `sitemap_discovery.py` result: sitemap declared in robots.txt, resolves 200, validates as a real `sitemapindex` pointing at one child sitemap (`sitemap-0.xml`, 155 URLs). No 404/soft-404 on any of the common fallback paths checked.

### Indexability — PASS
- Canonicals spot-checked on `/` and `/it/`: both self-referencing, absolute, correct trailing-slash form, no locale cross-contamination.
- No noindex found in the rendered `<head>` of the pages sampled.

### Security headers — PASS (strong)
Live response headers on `/`: `Content-Security-Policy` (self-scoped, explicit allowlist for GA/GTM/Unsplash images only, `frame-ancestors 'none'`, `object-src 'none'`), `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restricting geolocation/mic/camera/payment/FLoC.
- **Low:** CSP uses `'unsafe-inline'` for both `script-src` and `style-src`. This is consistent with `build: { inlineStylesheets: 'always' }` in `astro.config.mjs`, so it's a deliberate tradeoff, not an oversight — but it does weaken the CSP's XSS mitigation value. If migrating away from inline styles/scripts is ever on the roadmap, nonce- or hash-based CSP would tighten this; not urgent given the static, no-user-input nature of the site.

### URL structure / redirects — PASS
- `http://` → `https://` and `www.` → apex both resolve in a single 301 hop to the canonical `https://handmadepastaflorence.com/`. No redirect chains detected.
- URLs are clean, lowercase, hyphenated, descriptive (e.g. `/pasta-making-class-florence/`, `/blog/how-to-choose-a-pasta-class-in-florence/`).

### Mobile-friendliness — PASS
- Correct `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Header is fully responsive (see hamburger-nav verification above); nav links and CTA meet touch-target size guidance (335x54.8px).

### JavaScript rendering — PASS (SSR/static, not an SPA)
`render_page.py` reports `is_spa: false` on the homepage; content is present in raw HTML without requiring JS execution (Astro static output confirmed against `dist/`). No JS-rendering risk for crawlers that don't execute JavaScript.

### Structured Data — PASS with the one caveat above
`LocalBusiness` JSON-LD present via `Schema.astro`; the only issue found is the `streetAddress` value contradicting on-page copy (see "Address contradiction" above), not a schema syntax/validation problem.

## Not independently re-verified this pass (time-boxed)
Full Core Web Vitals lab data (Lighthouse/PSI run) and exhaustive per-locale hreflang reciprocity beyond the sitemap check were not run this session — the sitemap-level hreflang check (155/155 URLs, 930/930 links present) is a strong proxy but doesn't confirm return-tag reciprocity on every translated slug. Recommend a follow-up `seo-hreflang` sub-skill pass if translated-slug hreflang errors are suspected in Search Console.

## Score: 90/100
Both prior Critical/High findings (mobile nav, sitemap hreflang) are confirmed fixed on the live site with independent interaction-level and data-level verification. Crawlability, indexability, security headers, redirects, and mobile viewport all pass cleanly. The one open issue — the Via dei Pastai 12 address contradiction between Footer/Schema and the Oltrarno landing page copy — is High severity (NAP consistency / trust signal) but narrow in scope, which is why the score is not higher despite everything else passing.
