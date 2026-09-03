# Content Quality & E-E-A-T Audit — handmadepastaflorence.com

Date: 2026-09-03
Scope: source-level review (Astro components, i18n locale files, blog collection, structured data) cross-checked against the 2026-08-08 audit's flags. Live homepage fetch via `render_page.py` returned an empty response in this session (network/tooling issue) — findings below are source-verified, which is authoritative for this static site since `dist/` is built directly from `src/`.

## Content Quality Score: 61/100

## E-E-A-T Breakdown

| Factor | Weight | Score | Rationale |
|---|---|---|---|
| Experience | 20% | 65/100 | First-hand phrasing present in blog ("We run classes ourselves, so consider this the view from inside the kitchen") and Story section now describes concrete, specific experience (wedding feasts for 200, live pasta shows). Undercut by Story photos not actually depicting the named chefs. |
| Expertise | 25% | 68/100 | Primary chef (Endri Cerhozi) has a real, specific, verifiable credential trail (6 years artisan baker → Head Chef at Agriturismo Borgo Divino since 2024) and a live external profile. Co-founder Marsel has no surname, no bio depth, and no verification anywhere in the codebase — an asymmetric gap. |
| Authoritativeness | 25% | 40/100 | No third-party recognition signals live yet: no GBP, no `sameAs` to a GBP/Maps listing, no reviews/citations from OTAs. `llms.txt` and JSON-LD are well-built but there's nothing external to point at yet (matches the cross-site audit finding: "no GBP/reviews on either site"). |
| Trustworthiness | 30% | 45/100 | No customer reviews or ratings anywhere on the site. FAQ omits cancellation/deposit/exact-meeting-point/kids-age policy — the exact information a paying visitor needs before booking. NAP has an internally-flagged credibility risk (see Critical #3). Positives: transparent code comments, refusal to fabricate reviews, clear all-in pricing. |

**Weighted E-E-A-T: 53.5/100**

---

## Findings

### CRITICAL — Zero customer reviews / no social proof (confirms 2026-08-08 finding — still open)
`src/data/reviews.ts` has `reviews: Review[] = []` and `badges: ReviewBadge[] = []`. `hasReviews` is `false`, so `Reviews.astro` renders nothing (`{hasReviews && (...)}`), and `getAggregateRating()` returns `null`, so `Schema.astro` emits no `aggregateRating` on the `LocalBusiness`/`TouristAttraction` node. This is the single biggest trust gap on the page: for a business asking strangers to prepay/commit via WhatsApp, an absence of any star rating or third-party quote is a conversion and trust blocker, and it's also why no rich-result stars can appear in search.
- The code is well-designed (single source of truth feeds both the visible section and JSON-LD, with an explicit comment refusing to fabricate reviews) — this is the right engineering, but the business input (real reviews) has not landed yet.
- **Recommendation:** Start collecting Google/TripAdvisor reviews immediately after each class (WhatsApp/email link). Add the first 3–5 real, identifiable reviews to `src/data/reviews.ts`. Even a handful of real reviews will surface the Reviews section and `AggregateRating` sitewide with zero further code changes.

### HIGH — FAQ still lacks policy answers (confirms 2026-08-08 finding — still open)
`src/components/Faq.astro`'s own code comment states: *"Add cancellation / payment / exact-address answers once confirmed by the owner."* Verified against `src/i18n/locales/en.ts` (`faq.items`, 10 entries): all ten are factual (who teaches, location neighbourhood, duration, group size, whether you eat what you cook, private classes, price, gluten-free, schedule, booking method). None cover:
- Cancellation / rescheduling policy
- Deposit or payment method (the WhatsApp flow implies pay-later, but this is never stated)
- Exact meeting point / parking / transit directions (only "near Piazza Santo Spirito... we send the full address when you book")
- Minimum age for kids, vegetarian/vegan specifics beyond gluten-free
This is exactly the "policy gap" the QRG treats as a trust deficiency — informational answers are covered, transactional-anxiety answers are not, at the moment a buyer is deciding whether to commit money.
- **Recommendation:** Add 4 FAQ entries for the above once the owner confirms the policy. They flow automatically into `FAQPage` JSON-LD (`utils/schema.ts` `faqSchema()`), so this is a content-only fix, no code change needed.

### HIGH (trust) — NAP has an internally-flagged credibility risk
`REMAINING-SEO-TASKS.md` (R1, still open) flags that the published street address "Via dei Pastai 12" literally translates to "Street of the Pasta-Makers" — a name that reads as a placeholder rather than a confirmed real address — and that the published phone number is shared with the sister site `endricerhozi.com`, meaning it may not be a dedicated business line. `Schema.astro`'s own comment says the postal code (50125) is *inferred* from the neighbourhood, not read off a real document. Since Trustworthiness carries the highest weight (30%) in E-E-A-T and NAP consistency underpins both user trust and local-SEO citations, an unverified or placeholder-looking address is a meaningful open risk, not just an SEO nit.
- **Recommendation:** Confirm the real street address and a dedicated business phone line before any further citation-building (GBP, OTAs) locks in the wrong NAP everywhere.

### MEDIUM (improved, partially resolved) — Story section: named and biographical now, but still no real photo of the hosts
Confirms the 2026-08-08 finding was **partially fixed**. `src/i18n/locales/en.ts` `story.body1`/`body2` now names both chefs and gives specific, checkable credentials: *"We're Endri and Marsel, friends and longtime colleagues, and the head chefs of two agriturismi... Endri spent six years as an artisan baker before joining Agriturismo Borgo Divino, where he has been head chef since 2024; Marsel runs the kitchen of a neighbouring estate."* This is a real improvement — specific, falsifiable claims read as more trustworthy than the prior generic "two young Italians and lifelong friends."
However, `Story.astro` still renders two generic stock-style photos (`cutting-pizza.webp`, `cooking_class_with_guests_in_picture.webp` — the same "cooking class guests" image reused elsewhere on the homepage) rather than portraits of Endri and Marsel. For a personal-experience brand, a named host without a matching face is a weaker trust signal than either alone, and reusing the same stock photo across sections (Story + elsewhere) dilutes its uniqueness. `Schema.astro`'s `founder` array also shows the asymmetry: Endri gets a full `sameAs` array (personal site, Instagram, Facebook, LinkedIn); Marsel gets only `{ name: 'Marsel', jobTitle: 'Head Chef' }` — no surname, no verification.
- **Recommendation:** Add real photos of Endri and Marsel to the Story section (and swap the stock `cooking_class_with_guests_in_picture.webp`/`cutting-pizza.webp` pairing for something host-specific). Get Marsel's surname and add matching `sameAs` links to close the asymmetry in the `LocalBusiness.founder` schema.

### MEDIUM — Blog posts mostly sit below topical-depth floor, though quality is dense
12 of 13 English blog posts are under the 1,500-word blog-post guideline (range 578–1,364 words); only one (`how-to-choose-a-pasta-class-in-florence.md`, 1,634 words) clears it. Per Google's own guidance this is a coverage floor, not a target, and the sampled post (`how-much-does-a-pasta-making-class-in-florence-cost.md`, 759 words) is well-structured — direct-answer opening, first-hand framing, concrete price table with internal links, a 5-question buyer checklist — so word count alone likely understates its usefulness. Still, for commercially competitive queries ("pasta making class Florence"), several posts read as covering only the narrow angle in the title rather than the fuller topic (e.g., the gluten-free post at 578 words). Flag as a depth risk to monitor via GSC rather than an immediate rewrite priority.
- **Recommendation:** Prioritize expanding the 3 shortest posts (gluten-free-pasta-florence, where-to-take-pasta-making-class-florence, fresh-vs-dry-pasta-italy) with genuinely new subtopics (not padding) — e.g., add the gluten-free medical-safety detail already flagged as needing owner sign-off in `REMAINING-SEO-TASKS.md`.

### LOW — No freshness/update signal exercised yet
`content.config.ts` supports an optional `updatedDate` field for blog posts, explicitly reserved for when "a post's facts (prices, hours, recommendations) are actually revised." No post currently sets it — all fall back to `pubDate` (~July 2026) in the `Article` JSON-LD. At ~2 months old this isn't stale yet, but posts titled with "(2026)" in the headline (e.g., the cost guide) implicitly promise annual currency; there's no process yet for revisiting them. Not urgent today; worth a calendar reminder ahead of 2027.

### LOW — AI citation readiness is strong, with two remaining gaps
Positive signals confirmed in code:
- `public/llms.txt` is clean, structured, and highly extractable: named chefs, exact prices per class, group-size caps, hours, location, booking channel — exactly the quotable-fact format an LLM needs.
- `FAQPage`, `Article` (with `author.sameAs`, `publisher`), `BreadcrumbList`, `LocalBusiness`+`TouristAttraction`, and per-class `Product`/`Offer` (with `priceValidUntil` kept current) JSON-LD are all wired and, per `REMAINING-SEO-TASKS.md`, verified valid in the last build.
- Blog content itself favors direct-answer ledes ("Short answer: ...") and bolded facts — snippet- and LLM-extraction-friendly.

Gaps: `Schema.astro`'s `LocalBusiness` still lacks `geo` coordinates and any `sameAs` to a GBP/Maps/Instagram/Facebook business profile (both explicitly marked TODO in `REMAINING-SEO-TASKS.md` R3) — this is the entity-verification layer AI answer engines increasingly weight, and it's currently missing at the business level (only the founder Person has `sameAs`). Combined with zero `aggregateRating`, an LLM can cite prices and hours confidently but has no independent corroboration signal to cite for trust/quality.
- **Recommendation:** Get GBP lat/long and social URLs into `Schema.astro`'s `localBusiness.geo`/`sameAs` — low effort, directly closes an AI-citation gap that's already scoped and waiting on owner input.

### INFO — Duplicate/thin content across locales: not found
Spot-checked the German translation of the cost-guide post (`src/content/blog/de/how-much-does-a-pasta-making-class-in-florence-cost.md`) against the English original: genuinely distinct, fluent translation (not machine-duplicated placeholder text), consistent facts (prices, hours) across locales. IT/DE/FR/ZH blog directories each carry their own word counts (IT total ≈ 40k words across 13 posts vs EN ≈ 12k, reflecting real per-post translation rather than copy-paste). No duplicate-content risk identified in the sample; recommend a full crawl-based duplicate check (e.g., Siteliner/Copyscape across all 5×13 blog URLs) as a follow-up since this was a spot check, not exhaustive.

### INFO — Author/byline consistency
All 13 English posts share the single byline "Endri Cerhozi," linked in both the visible meta line and the `Article` JSON-LD to `https://endricerhozi.com` with `jobTitle: 'Head Chef'`. This is a legitimate, real-person expertise signal (not a generic "Admin" or AI-attributed byline), but a single-author blog also means the site's authorship diversity — and by extension Marsel's visibility as a second credentialed voice — is currently zero.

---

## Status of the three items flagged in the 2026-08-08 audit

| Item | Status | Evidence |
|---|---|---|
| Story section: unnamed hosts, no real photos | **Partially fixed** — now named with real bios; photos still generic/stock | `src/i18n/locales/en.ts` `story.body1/body2`; `src/components/Story.astro` uses `cuttingPizza`/`cookingClassGuests` stock images |
| FAQ: thin, no policy answers | **Still open** | `src/components/Faq.astro` comment + `en.ts` `faq.items` (10/10 factual, 0 policy) |
| Reviews: wired up but empty | **Still open** | `src/data/reviews.ts`: `reviews = []`, `badges = []`, `hasReviews = false` |
