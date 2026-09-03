# Schema.org / Structured Data Audit — handmadepastaflorence.com

Audit date: 2026-09-03
Source reviewed: `src/components/Schema.astro`, `src/components/ClassLanding.astro`,
`src/components/Faq.astro`, `src/utils/schema.ts`, `src/data/reviews.ts`,
`src/page-templates/BlogPostPage.astro`, `src/page-templates/ShapePage.astro`,
`src/page-templates/ShapesHubPage.astro`, plus live-rendered JSON-LD pulled via
`render_page.py` for the homepage and a German blog post (raw fetch, `--mode never`
— site is server-rendered Astro, no SPA shell, so raw HTML already contains all JSON-LD).

## Score: 80 / 100

Strong, disciplined implementation overall (shared builders, no fabricated review data,
conditional emission), docked mainly for one real cross-locale bug and the
long-documented owner-input blockers.

---

## 1. Detected schema, by template

| Template | Types emitted |
|---|---|
| `Schema.astro` (sitewide, all pages) | `LocalBusiness` + `TouristAttraction` (dual-typed), `Person` (founder ×2), `PostalAddress`; homepage-only: `Product` + `Offer` ×4 |
| `ClassLanding.astro` (class landing pages) | `Product`+`Offer` **or** `Service`, `Course`+`CourseInstance`, `BreadcrumbList`, `FAQPage` |
| `Faq.astro` (homepage FAQ section) | `FAQPage` |
| `BlogPostPage.astro` | `Article`, `BreadcrumbList`, `FAQPage` (when post has FAQs) |
| `ShapePage.astro` (pasta-shape spokes) | `Article`, `BreadcrumbList`, `FAQPage` |
| `ShapesHubPage.astro` | `ItemList`, `BreadcrumbList`, `FAQPage` |

All blocks use `@context: "https://schema.org"`, JSON-LD (no Microdata/RDFa found),
and are built through two shared helpers (`faqSchema`, `breadcrumbSchema` in
`src/utils/schema.ts`) rather than being hand-duplicated per page — good practice,
low drift risk.

No deprecated types in use (`HowTo`, `SpecialAnnouncement`, `CourseInfo`,
`EstimatedSalary`, `LearningVideo` — none present).

---

## 2. Validation results

### 2.1 LocalBusiness / TouristAttraction (`Schema.astro`) — PASS with known gaps
- ✅ Valid dual `@type`, stable `@id` (`https://handmadepastaflorence.com/#business`).
- ✅ Required/recommended props present: `name`, `description`, `address`, `telephone`,
  `email`, `priceRange`, `openingHoursSpecification`, `areaServed`, `image`.
- ⚠️ **Missing `geo` coordinates and business-level `sameAs`** (GBP/social profile links
  for the business entity itself, as distinct from the founder's `sameAs`). Confirmed
  still absent as of this audit. The code comment at the top of `Schema.astro` and
  `REMAINING-SEO-TASKS.md` correctly flag this as blocked on owner-supplied data (real
  registered address confirmation, GBP listing, business social profiles) — this is a
  **legitimate data blocker, not a code defect**. **Severity: Medium** (unchanged from
  the 2026-08-08 audit).
- ℹ️ `postalCode: '50125'` is explicitly commented as an inferred value pending
  confirmation — flag for the owner before it's used to build external citations
  (Yelp/Apple/Bing), per the existing code comment. **Severity: Low** (already tracked).
- ℹ️ No `aggregateRating` / `Review` — correctly withheld because `src/data/reviews.ts`
  has zero real entries, with explicit anti-fabrication guardrails in code. This is
  **intentional and correct**, not a gap to fix now. **Severity: Info** — re-check once
  real reviews exist (plumbing is already built: `getAggregateRating()` /
  `getReviewSchema()` wire straight into `LocalBusiness`, homepage `Product`, and
  class-landing `Product`).
- ℹ️ No `logo` property on the business/Organization node (only `image`). Not required
  for `LocalBusiness`, but Google's Organization/Article publisher guidance recommends
  a `logo` `ImageObject` (min. 112×112, square works best) — worth adding opportunistically.
  **Severity: Low**.

### 2.2 Homepage Product + Offer (`Schema.astro`) — PASS
- ✅ One `Product`/`Offer` per bookable class, correctly localized (pulled from
  `landings.ts` per-locale rather than a hardcoded English array — this fixed a real
  bug documented in the code comments where non-English homepages previously shipped
  English Product names with English Offer URLs).
- ✅ `priceCurrency`, `availability`, `priceValidUntil` (rolling year-end), absolute
  `url` all present and valid.
- ⚠️ `priceValidUntil` is a manually-bumped constant (`2026-12-31`) — not a bug, but
  flag as a **recurring maintenance task**: if it isn't bumped before year-end, Offers
  will read as stale/expired to Google's price-freshness checks. **Severity: Low
  (process risk, not a current defect)**.

### 2.3 Class landing pages — Product/Service/Course (`ClassLanding.astro`) — PASS
- ✅ Correct mutually-exclusive `Product` (fixed-price classes) vs `Service` (quoted
  team-building) split, with `Course`/`CourseInstance` layered on top for classes that
  have a `courseMode`. `Course` schema itself was deprecated *sibling* types
  (`CourseInfo` etc.) removed in June 2025 — `Course`/`CourseInstance` themselves are
  still valid, current types, so no action needed.
- ✅ `Service.provider` correctly references the sitewide business via `{'@id': ...}`
  rather than duplicating the LocalBusiness object — good practice, and this `@id`
  reference **is** locale-stable (hardcoded `${SITE}/#business`, not locale-prefixed),
  so it resolves correctly on every language.
- ✅ `aggregateRating`/`review` spread conditionally from the same empty-until-real-data
  source as the homepage — consistent, no fabrication.

### 2.4 FAQPage (`Faq.astro`, `ClassLanding.astro`, `BlogPostPage.astro`,
`ShapePage.astro`, `ShapesHubPage.astro`) — VALID, but **no Google SERP benefit**
- ✅ Structurally valid `FAQPage`/`Question`/`Answer` markup wherever it appears.
- ℹ️ **Google retired FAQ rich results for all sites on May 7, 2026.** This markup no
  longer produces any SERP feature. Any benefit to AI Overviews/AI answer engines from
  keeping it is unconfirmed. Per policy: flag as **Info priority**, not Critical — do
  **not** recommend removing existing FAQPage (it's inert, not harmful), and do not
  add FAQPage to any *new* page for the SERP benefit, since there isn't one. If the
  site owner wants FAQ markup purely as a GEO/AI-visibility bet, that's a defensible
  call but should be made explicitly, not by default.
- Recommendation: leave as-is; deprioritize any future FAQPage work.

### 2.5 Article (`BlogPostPage.astro`, `ShapePage.astro`) — **BUG on non-English blog posts**
- ✅ `ShapePage.astro`'s `Article.publisher` correctly references the sitewide business
  via a locale-invariant `{'@id': `${SITE}/#business`}` — resolves correctly on every
  locale, verified in code.
- 🔴 **`BlogPostPage.astro`'s `Article.publisher` reference is broken on every
  non-English blog post.** The `@id` it emits is built from the page's own locale
  prefix (`publisherId = `${SITE}${homeUrl}#business`` where `homeUrl` is `/de/`,
  `/it/`, `/fr/`, `/zh/` for translated posts), but the actual `LocalBusiness` node
  emitted by `Schema.astro` always uses the fixed, non-localized
  `@id: "https://handmadepastaflorence.com/#business"`. Result: on German/Italian/
  French/Chinese blog posts, `Article.publisher` points at an `@id` that does not
  exist anywhere on the page — a dangling reference. **Verified live** on
  `https://handmadepastaflorence.com/de/blog/best-flour-for-italian-fresh-pasta/`:
  ```json
  "publisher": { "@id": "https://handmadepastaflorence.com/de/#business" }
  ```
  while the actual business node's `@id` on that same page is
  `https://handmadepastaflorence.com/#business`. This affects every translated post
  under `src/content/blog/{de,fr,it,zh}/` (confirmed multiple files exist in each).
  English posts (`defaultLocale`) are unaffected because the prefix is empty there.
  **This is a genuine code bug, not a data-input blocker.** **Severity: High.**
  **Fix**: hardcode `publisherId` the same way `ShapePage.astro` already does —
  remove the locale prefix:
  ```diff
  - const publisherId = `${SITE}${homeUrl}#business`;
  + const publisherId = `${SITE}/#business`;
  ```
- ✅ Otherwise both `Article` blocks are structurally valid: `headline`, `description`,
  `image` (absolute URL), `datePublished`/`dateModified` in ISO 8601, `inLanguage`,
  named `Person` author with `sameAs`, `mainEntityOfPage`.

### 2.6 BreadcrumbList — PASS
- ✅ Present and valid on all class landing, blog post, shape, and shapes-hub pages;
  `position` derived from array order so it can't skew. Absolute URLs throughout.

### 2.7 ItemList (`ShapesHubPage.astro`) — PASS
- ✅ Valid `ItemList`/`ListItem` with `position`, `name`, absolute `url` per spoke.

---

## 3. Missing opportunities (not currently blocked)

- **`logo`** on the `LocalBusiness`/Organization node — low effort, no owner-data
  dependency (an existing site logo asset can be used), improves Organization/
  Knowledge Panel and Article-publisher completeness. **Severity: Low.**
- **`Event`** schema for the cooking classes: not currently applicable — the classes
  are open enrollment / on-demand bookings, not scheduled single-occurrence events
  with fixed dates, so `Course`/`Product` is the correct type family here, not `Event`.
  No action needed unless the business starts running dated, single-session events
  (e.g., a seasonal pop-up class), at which point `Event`+`Offer` would be appropriate.
- **`Review`/`AggregateRating`** — correctly withheld; re-run this audit once
  `src/data/reviews.ts` has real entries to confirm the auto-wired schema renders
  correctly.
- **`VideoObject`** — `ClassLanding.astro` supports an optional hero video
  (`video` prop / `data-loop-video`), but no `VideoObject` schema is emitted for it.
  Low priority (silent, decorative loop, not a primary content video), but worth a
  follow-up if any class page ever gets a substantive explainer video.

---

## 4. Ready-to-paste fixes

### 4.1 Fix the broken `Article.publisher` `@id` on translated blog posts (High priority)
File: `src/page-templates/BlogPostPage.astro`, line 38.
```diff
- const publisherId = `${SITE}${homeUrl}#business`;
+ const publisherId = `${SITE}/#business`;
```
This makes the reference locale-invariant, matching the actual `LocalBusiness @id`
emitted by `Schema.astro` on every page, and matching the pattern already used
correctly in `ShapePage.astro`.

### 4.2 Add `logo` to the sitewide business node (Low priority)
File: `src/components/Schema.astro`, inside the `localBusiness` object (near `image`):
```json
"logo": "https://handmadepastaflorence.com/<path-to-logo-asset>.png"
```
Use an existing square/near-square logo asset from `src/assets/images`; if none
exists at sufficient resolution (Google recommends ≥112×112px), flag for the owner
rather than stretching/cropping an unsuitable asset.

### 4.3 `geo` + business `sameAs` — still blocked on owner input
No new snippet generated; requires the owner to confirm the real registered address
(for accurate `geo` lat/long) and supply/confirm Google Business Profile and business
(not founder) social links. Template, once available:
```json
"geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
"sameAs": ["<Google Business Profile URL>", "<business Instagram/Facebook if distinct from founder's>"]
```

---

## 5. Summary table

| Area | Status | Severity |
|---|---|---|
| `LocalBusiness`/`TouristAttraction` core fields | Valid | — |
| `LocalBusiness` missing `geo` + business `sameAs` | Blocked on owner data | Medium |
| `LocalBusiness` missing `logo` | Missing opportunity | Low |
| Homepage `Product`/`Offer` (localized) | Valid | — |
| Class landing `Product`/`Service`/`Course` | Valid | — |
| `Article.publisher` broken `@id` on de/fr/it/zh blog posts | **Bug, verified live** | **High** |
| `Article` on shape pages | Valid | — |
| `FAQPage` (all locations) | Valid but no SERP benefit since May 2026 | Info |
| `BreadcrumbList` (all locations) | Valid | — |
| `ItemList` (shapes hub) | Valid | — |
| `Review`/`AggregateRating` | Correctly withheld (no real reviews) | Info |
| `VideoObject` for landing-page hero videos | Missing opportunity | Low |
