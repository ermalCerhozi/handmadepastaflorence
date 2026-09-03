# Sitemap Audit — handmadepastaflorence.com
Date: 2026-09-03

## Summary

The site does **not** use `@astrojs/sitemap`. `astro.config.mjs` documents that the integration was
dropped because its `i18n` option can only pair pages with an identical pathname across locales, so it
silently emitted zero hreflang alternates for every page with a per-locale translated slug (money pages +
pasta-shapes hub/spokes — 50 of 85 URLs at the time). The sitemap is now hand-built:

- `src/pages/sitemap-index.xml.ts` — index, always points at one child file
- `src/pages/sitemap-0.xml.ts` — renders entries from `src/utils/sitemap-entries.ts`
- `src/utils/sitemap-entries.ts` — reuses the same `landings.ts` / `shapes.ts` / blog collection /
  locale-list data sources that drive each page's own in-`<head>` hreflang tags, so the sitemap and the
  page-level tags cannot drift apart structurally.

Live sitemap fetched 2026-09-03: `https://handmadepastaflorence.com/sitemap-index.xml` → one child,
`https://handmadepastaflorence.com/sitemap-0.xml`, 155 URLs, 135,011 bytes. Local `dist/` build (current
`main`, commit `4859212`) matches the live output exactly (155 URLs, same hreflang shape) — the deployed
sitemap is not stale relative to source.

## Validation Checks

| Check | Result | Severity |
|---|---|---|
| Sitemap discoverable via robots.txt | Pass — `sitemap-index.xml` declared, 200, valid `sitemapindex` | — |
| XML well-formed (index + child) | Pass | — |
| Per-file URL count (≤50,000) | Pass — 155 URLs, 1 file | — |
| Per-file size (≤50MB uncompressed) | Pass — 135KB | — |
| `news:` sitemap 1,000-URL cap | N/A — no news sitemap | — |
| hreflang: 5-locale alternates present | Pass — 155/155 `<url>` blocks carry en/it/fr/de/zh alternates | — |
| hreflang: `x-default` present | Pass — 155/155 blocks (count of `x-default` tags == URL count) | — |
| hreflang: self-referencing | Pass (spot-checked home, blog post, landing page, shapes hub) | — |
| hreflang: reciprocal across locale variants | Pass — e.g. `/it/formati-di-pasta-toscana/` block correctly points `de`→`/de/pasta-formen/`, `fr`→`/fr/formes-de-pates/`, `zh-CN`→`/zh/yidali-mian-xingzhuang/`, `x-default`→English hub | — |
| Non-200 URLs (13-URL spot sample across all categories/locales) | Pass — all 200 | — |
| Noindexed URLs in sitemap (same 13-URL sample) | Pass — no `noindex` found | — |
| `<lastmod>` present | **Fail — 0 of 155 URLs have a `lastmod` tag at all** | Medium |
| `priority` / `changefreq` present | Pass (absent) — both are ignored by Google; nothing to remove | Info |
| Location-page quality gate (30+/50+ threshold) | N/A — 10 landing pages total, each targeting a distinct commercial intent (private, team-building, gluten-free, gift, family, agriturismo, etc.), not a city-swap template. Not a programmatic location-page site. | — |

## Hreflang Coverage vs. Prior Audit (2026-08-08)

**Resolved.** The 2026-08-08 finding (50 of 85 URLs — every money page and pasta-shapes spoke — missing
hreflang because `@astrojs/sitemap` couldn't pattern-match translated slugs) is fixed. The hand-built
generator now emits full 5-locale + x-default alternates for **100% of URLs**, including the translated
slugs that previously broke pattern-matching (e.g., IT hub `formati-di-pasta-toscana`, DE `pasta-formen`,
FR `formes-de-pates`, ZH `yidali-mian-xingzhuang`, and their 5 spoke shapes each). This exceeds the
"35 URLs each" figure noted in the prior fix note — actual current coverage is 31 URLs/locale × 5 = 155,
because the blog collection has grown to 13 fully-translated posts (65 files) since that note was written.

## URL Count vs. Expectation

Prior baseline context expected ~85 indexable pages. Live count is **155** (31 per locale × 5 locales):
17 non-blog (home + 10 landing pages + pasta-shapes hub + 5 spokes) + 14 blog (index + 13 posts) per
locale. The delta is explained by blog growth (13 posts × 5 locales = 65 URLs) since the 85-URL baseline
was recorded, not a coverage regression — every locale has an identical, fully-parallel URL count, which
is itself a good structural signal (no partial/orphaned translations).

## Missing / Extra Pages

- No extra pages found (no 404s or redirects in the sampled set).
- No crawled-but-unlisted pages identified — the generator enumerates its data sources directly (`landings.ts`, `shapes.ts`, blog collection) rather than crawling, so by construction it cannot omit an existing page from those sources it has already added a translation for. Residual risk: an already-live page that was never added to one of those three data sources would not be caught by this method. Not detected in this pass; recommend one full-crawl reconciliation (crawler output vs. sitemap URL list) in a follow-up.

## Findings

### Medium — `lastmod` completely absent from every URL
No `<url>` block anywhere in `sitemap-0.xml` carries a `<lastmod>` tag (confirmed: 0 of 155). This is a
step below the "all-identical-lastmod" anti-pattern (rated Low in the standard gate) because it gives
Google no freshness signal whatsoever, rather than a wrong-but-present one. Since `sitemap-entries.ts`
already resolves blog posts from the content collection (which has frontmatter dates) and landing/shape
pages from static data files, real per-URL last-significant-change dates could be threaded through without
inventing timestamps.
**Recommendation:** Add `lastmod` sourced from real data — blog post frontmatter `pubDate`/`updatedDate`
for posts, and a maintained `lastModified` field (or git-log-derived date, resolved at build time) for
landing/shape/home pages. Do not default to build time for every page — that reproduces the
"all-identical-lastmod" problem the gate table already flags as Low/anti-pattern.

### Info — `priority` / `changefreq` correctly omitted
Both are ignored by Google Search; the hand-built generator never emits them. No action needed.

### Info — Reconciliation coverage gap (methodology note, not a defect)
The sitemap is generated from source data files rather than a live crawl, so it cannot self-detect an
indexable page that was never added to `landings.ts`/`shapes.ts`/the blog collection. Recommend running a
full site crawl and diffing crawled URLs against the 155-URL sitemap list at the next full audit pass to
close this residual blind spot; not doing so now was a scope/time tradeoff on this pass, not a finding
against the current sitemap.

## Score: 90/100

Deductions: -8 missing `lastmod` on all 155 URLs (Medium, real crawl-scheduling impact); -2 for the
outstanding crawl-vs-sitemap reconciliation not being run this pass (methodology gap, not a confirmed
defect). Everything else — index structure, size/count limits, hreflang completeness/reciprocity/
self-reference/x-default, status codes, and noindex hygiene on the sampled set — passed cleanly, and the
previously Critical hreflang gap (50/85 URLs, 2026-08-08) is fully resolved.
