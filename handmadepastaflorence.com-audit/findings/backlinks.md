# Backlink Profile — handmadepastaflorence.com

**Audit date:** 2026-09-03
**Domain age:** ~2.5 months (live since 2026-06-19)
**Data tier:** Tier 0 (Common Crawl + verification crawler only — Moz/Bing API keys not configured; confirmed via `claude-seo run backlinks_auth.py --check --json`)

## Score: INSUFFICIENT DATA for a numeric health score — directional score 15/100

Per the tier-0 scoring rule, fewer than 4 of the 7 weighted scoring factors (referring domains, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance) have any data source at all for this domain. A precise 0-100 Backlink Health Score would be misleading. The **15/100 figure given for audit-rollup purposes is a floor estimate**, not a measured score — it reflects "effectively zero external authority signal, as expected for a 2.5-month-old site with no active outreach or marketplace listings yet," not a penalty for a specific fault.

## Referring domains

**None detected.** Common Crawl has no record of handmadepastaflorence.com at all:

```
domain: handmadepastaflorence.com
in_crawl: false
in_rankings: false
pagerank: null
harmonic_centrality: null
```
Source: Common Crawl Web Graph, release `cc-main-2026-jan-feb-mar` (confidence: 0.50 where present; here: not present). Common Crawl's most recent web graph release predates the site's own launch (2026-06-19), so this is fully expected for a domain this young — not a sign of a penalty or crawl problem. See https://commoncrawl.org/web-graphs for the quarterly graph schedule.

No list of known/claimed backlinks was supplied for this audit, so `verify_backlinks.py` (the Tier-0 verification crawler) had nothing to check against. No GSC "Links" export or marketplace-listing confirmation was available in the working tree to seed a verification pass.

## Anchor text distribution

Not applicable — zero referring domains detected, so there is no anchor text corpus to report. (This section should be revisited once the marketplace listings below go live; Moz anchors or DataForSEO would be the right source once available.)

## Domain-level authority signals (Common Crawl)

| Metric | Value | Source |
|---|---|---|
| In Common Crawl index | No | CC Web Graph (confidence: 0.50) |
| In CC host-rank rankings | No | CC Web Graph (confidence: 0.50) |
| PageRank / rank | null | CC Web Graph |
| Harmonic centrality / rank | null | CC Web Graph |

All fields null because the domain isn't in the crawl yet, not because it scored poorly on any metric. Re-run this check once a newer CC web-graph release (post ~2026-Q3) is published, or once external mentions exist for CC to discover.

## Employer mention found in site content (correction: not a partner/backlink target)

The homepage "Our Story" copy (`src/i18n/locales/en.ts`, `story.body2`, rendered by `src/components/Story.astro`) names Endri's employer in plain text with no hyperlink:

> "Endri spent six years as an artisan baker before joining **Agriturismo Borgo Divino**, where he has been head chef since 2024..."

**Correction (per site owner, 2026-09-03):** this is Endri's own workplace — he is their Head Chef — not a separate business partnership with Handmade Pasta Florence. It is not a realistic reciprocal-link/backlink target: there's no commercial relationship between the two businesses to ask a "partner" favor of, so a link-building outreach ask doesn't apply here the way it would to an actual vendor or venue partner. (Note: the identical item on the sister site's 2026-08-08 audit carries the same correction and should be treated as withdrawn there too.) Whether to hyperlink the mention at all is a content/attribution decision for the owner, not a backlink-strategy recommendation — removed from this audit's action items.

The same copy names a second co-host, "Marsel," described as head chef of "a neighbouring estate" (agriturismo) — likely the same employer relationship, not a link opportunity either.

No other named, linkable local businesses (suppliers, venues, markets) were found in blog content. The Sant'Ambrogio market and several competitor trattorias (Trattoria Mario, Trattoria Sostanza, Osteria Santo Spirito) are named in blog posts (`where-to-eat-handmade-pasta-in-florence.md`, `where-do-locals-eat-fresh-pasta-florence.md`) but these are competing restaurants recommended editorially, not partners — not a realistic reciprocal-link target.

## Marketplace / booking-channel listings

`src/data/reviews.ts` confirms the site is not yet listed anywhere that generates reviews: `reviews: []` and `badges: []` are both empty arrays, with an explicit code comment noting entries must only be added for real, verifiable guests. No GetYourGuide/Viator/Airbnb Experiences/TripAdvisor listing was found referenced anywhere in the codebase (checked via repo-wide grep). This confirms the prior audit's recommendation is still fully open: **none of the four suggested marketplace listings have been created yet.** Each one, once live, would itself be the site's first real referring domain plus a trust/review signal.

## Recommendations (priority order)

**High**
1. Create listings on GetYourGuide, Viator, Airbnb Experiences, and TripAdvisor. For a 2.5-month-old cooking-class business, these are simultaneously booking channels, first backlinks, and the fastest path to the reviews the site's own `reviews.ts` schema is already wired for but empty. With Google Business Profile now in progress (per the owner), a claimed GBP itself also becomes a citation once verified.

**Medium**
2. Local press/blogger outreach: pitch Florence/Tuscany food and travel bloggers and local press for a feature or guest mention now that the blog has ~2 months of genuine, specific content (pasta-shape guides, neighbourhood guides) to point to — a natural angle for a "new hands-on experience in the Oltrarno" story.
3. Once any of the above land, re-run this audit at Tier 0 at minimum, and consider adding a Moz API key (free tier, 2,500 rows/month) to get DA/PA and a real referring-domain count going forward.

**Not applicable at this stage**
- Toxic link / spam-score cleanup — no links exist to audit.
- Anchor text diversification — no anchor text corpus exists yet.

## Data sources & confidence

- Common Crawl Web Graph (domain-level): confidence 0.50, release `cc-main-2026-jan-feb-mar`, from cache (`from_cache: true`, cached at 2026-08-08T14:24:40Z) — no live re-fetch performed this session; result is a stable "not in crawl" outcome unaffected by cache age.
- Moz API: not configured (Tier 1 unavailable).
- Bing Webmaster API: not configured (Tier 2 unavailable).
- DataForSEO: not checked (Tier 3, premium, out of scope for this pass).
- Verification crawler: not run — no candidate backlink list was available to verify.
- Content/partner-link findings: direct source reading of `src/i18n/locales/en.ts`, `src/data/landings.ts`, `src/components/Story.astro`, `src/data/reviews.ts`, and `src/content/blog/*.md` (confidence: 0.95, directly observed in repo).
