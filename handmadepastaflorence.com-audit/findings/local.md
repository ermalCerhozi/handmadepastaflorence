# Local SEO Audit — handmadepastaflorence.com

Audited: 2026-09-03. Business type: brick-and-mortar (visible street address, footer + schema
publish a fixed NAP; no "we come to you" language). Industry vertical: home-services-adjacent
experience/tourism business — closest schema fit is `LocalBusiness` + `TouristAttraction`
(currently used) rather than a generic vertical; no restaurant/menu/reservation signals, no
healthcare/legal/real-estate/automotive signals.

Verification method: read `Footer.astro`, `Schema.astro`, `BookingDrawer.astro`,
`public/llms.txt`, `src/data/reviews.ts`, `src/components/Reviews.astro`, `REMAINING-SEO-TASKS.md`
(R1–R3), then independently confirmed against the **live site** via `curl` (raw HTML + headers)
and `WebFetch` (rendered page). Live HTML's JSON-LD block and `llms.txt` are byte-identical to
the repo source — nothing has drifted between repo and deployment.

## Local SEO Score: 26 / 100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| GBP Signals | 25% | 2/25 | No Maps embed, no GBP/place link, no review widget, no posts/photo evidence anywhere on-site. No indication of a claimed profile. |
| Reviews & Reputation | 20% | 2/20 | Zero reviews on-site or in schema. Infrastructure is correctly wired (auto-emits once real reviews land) and explicitly refuses to fabricate — good practice, but current health is effectively nil. |
| Local On-Page SEO | 20% | 13/20 | Strong dedicated-page architecture (per-experience landing pages — the #1 local-organic ranking factor per Whitespark 2026) and locally-relevant blog content (Oltrarno guide, Tuscan dishes). Weak: no directions link, no embedded map, no "visit us" page, address contradicted by booking copy (see below). |
| NAP Consistency & Citations | 15% | 2/15 | NAP is internally consistent across Footer/Schema/llms.txt (same string everywhere) — but see the address-contradiction finding below, which undermines that consistency in practice. Zero confirmed citations on Tier 1 directories. |
| Local Schema Markup | 10% | 6/10 | Correct dual-type (`LocalBusiness` + `TouristAttraction`), name/address/telephone/url/openingHoursSpecification/priceRange all present. Missing: `geo` coordinates, business-level `sameAs`. |
| Local Link & Authority Signals | 10% | 1/10 | No TripAdvisor/GetYourGuide/Airbnb Experiences/Yelp/BBB presence found; `sameAs` only points at the founder's personal social profiles, not business citations or backlinks. |
| **Total** | | **26/100** | Down slightly from the 2026-08-08 audit's 31/100 — same root cause (no GBP, no reviews), plus the address contradiction below is now confirmed still-unresolved rather than merely flagged. |

---

## Critical findings

### 1. Address contradiction — CONFIRMED STILL LIVE (Critical)
The footer, `LocalBusiness` schema, and `llms.txt` all publish a fixed street address:

> Via dei Pastai 12, Oltrarno · Firenze, Italy — 50125

But the actual booking copy on multiple landing pages tells guests the real meeting point is
**withheld until after booking**:
- `src/i18n/locales/en.ts:134` (homepage FAQ): *"We send the full address when you book."*
- `src/data/landings.ts:193`: *"The kitchen is in the Oltrarno, near Piazza Santo Spirito; we send
  the exact address when you book."*
- `src/data/landings.ts:4814` / `:4845` (agriturismo landing page): the meeting point isn't even
  fixed — it varies by which partner estate is used for that date, "confirmed together with your
  booking."

This is not a formatting inconsistency between sources (Footer/Schema/llms.txt all agree with
each other) — it's a **contradiction between what's published as the fixed NAP and what the
business actually tells customers**. Two live possibilities, both bad for local SEO:
- "Via dei Pastai 12" is a placeholder/invented address (the code comment in `Schema.astro`
  already suspects this — "Street of the Pasta-Makers" is suspiciously on-the-nose), in which case
  publishing it to GBP or any citation would be a **Google guidelines violation** (fabricated
  address) and grounds for suspension.
- It's real but the business deliberately doesn't want it public before booking, in which case a
  storefront-style GBP listing is the wrong model entirely — a **service-area business (SAB)
  profile** (address hidden, service-area radius shown) is very likely the correct GBP setup, not
  a pin-on-map storefront.

Either way: **do not submit this address to GBP or any citation source until this is resolved.**
This is REMAINING-SEO-TASKS.md's R1, and it is still open — unchanged since the prior audit.

### 2. Phone number shared with sister site (High)
`+39 344 5204379` is used identically on handmadepastaflorence.com (footer `tel:`/WhatsApp link,
`Schema.astro` `telephone`, `BookingDrawer.astro` `WHATSAPP_NUMBER`) and is called out in a code
comment as "same as endricerhozi.com." Confirmed still the case on the live site. A phone number
shared across two distinct GBP-eligible entities is a known citation-consistency risk if both
sites ever claim separate GBP listings — Google's dedup/verification logic can conflate the two
profiles, or one listing's ownership can be disputed by proximity/phone-match. Not blocking today
(neither site has a GBP), but should be resolved (dedicated line, or a documented decision that
only one entity ever claims a GBP) before either site claims one.

### 3. No Google Business Profile — still the #1 gap (Critical, unchanged)
No Maps embed, no `maps.google.com` or `g.page` link, no review widget, no "posts" or photo
carousel referencing GBP anywhere on the live site. Nothing in the repo (`sameAs`, footer, or
otherwise) references a GBP URL. Web-search verification of whether a profile exists under a
different/unlinked configuration was **inconclusive** — see Limitations. Given items 1–2 above,
claiming a GBP now would require resolving the address question first (storefront vs. SAB
listing type), which also determines the **primary category** choice — Whitespark 2026 rates
primary category as the #1 ranking factor (score 193) and wrong category as the #1 negative
factor (score 176), so this decision has to be made deliberately once, not defaulted.

### 4. Zero reviews anywhere (Critical, unchanged)
`src/data/reviews.ts` → `reviews: Review[] = []`. `Reviews.astro` correctly hides the whole
section and `getAggregateRating()` correctly returns `null` (confirmed: no `aggregateRating` key
in the live JSON-LD). No reviews on any third-party platform were found in the (limited, see
Limitations) search performed. The code's refusal to fabricate reviews/ratings is correct practice
and should stay — but it means review velocity is currently zero, and Sterling Sky's "18-day rule"
means rankings cliff further the longer this stays at zero once any review history exists to reset.

### 5. Schema missing `geo` and business-level `sameAs` (Medium)
Confirmed via live JSON-LD: `LocalBusiness` has no `geo` (`GeoCoordinates`) property at all, and
its only `sameAs`-equivalent is buried one level down on the `founder` Person, not on the business
entity itself. `REMAINING-SEO-TASKS.md` R3 already flags this correctly — still open. Blocked by
the same root cause as #1: coordinates can't be added confidently until the real address (or
service-area radius) is confirmed.

### 6. Zero citations found on Tier 1 / OTA platforms (High)
No TripAdvisor, GetYourGuide, Airbnb Experiences, Yelp, or BBB presence found via direct fetch
attempts (TripAdvisor blocked the request with HTTP 403; other search-engine checks were
inconclusive — see Limitations). No links to any of these from the live site either. The prior
audit and `REMAINING-SEO-TASKS.md` both recommend these specifically because for a ~1-month-old
domain they function as both a second booking channel and the first external backlinks/citations
pointing at the domain — three of the top five AI-visibility factors are citation-related per the
skill's reference data. This remains fully unactioned.

### 7. Local on-page structure is a real strength (positive finding)
Not a gap: the July 2026 architecture pass shipped one-keyword-per-page landing pages for every
experience type (pasta-making, market-tour, private, online, gluten-free, for-two, team-building,
gift), which is the #1 local-organic ranking factor and #2 AI-visibility factor per the skill's
reference data. Combined with the Oltrarno neighbourhood blog guide and FAQPage schema, on-page
local relevance is well ahead of the GBP/citation/review layer. This is worth protecting — don't
let GBP work regress the page architecture.

---

## NAP consistency audit (source comparison)

| Field | Footer.astro | Schema.astro (JSON-LD) | llms.txt | Landing-page booking copy | Consistent? |
|---|---|---|---|---|---|
| Name | "Handmade Pasta Florence" | "Handmade Pasta Florence" | "Handmade Pasta Florence" | — | Yes |
| Address | Via dei Pastai 12, Oltrarno, Firenze | Via dei Pastai 12, Firenze, FI 50125, IT | "Oltrarno, near Piazza Santo Spirito" (no street address given) | "we send the exact address when you book" / meeting point varies by estate for agriturismo classes | **No** — fixed address published sitewide contradicts "sent after booking" / variable-meeting-point language guests actually see |
| Phone | +39 344 5204379 (tel + WhatsApp) | +393393445204379 → +393445204379 | +39 344 5204379 | — | Yes, but shared with endricerhozi.com — see finding #2 |
| Email | ciao@handmadepastaflorence.com | ciao@handmadepastaflorence.com | ciao@handmadepastaflorence.com | — | Yes |
| Hours | visible text string (translated) | Mon–Sun 10:00–21:00 | 10:00, 14:30, 18:00 class start times, 7 days | — | Roughly consistent (footer text not independently re-verified against translation dictionary, low risk) |

## GBP optimization checklist

| Item | Status |
|---|---|
| Profile claimed/verified | Not detected — no on-site reference; direct search verification inconclusive (see Limitations) |
| Correct primary category | N/A — blocked on storefront-vs-SAB decision (finding #1) |
| Maps embed on-site | Missing |
| "Get directions" / place link | Missing |
| Review widget on-site | Missing (no reviews to show) |
| Photos referenced/synced | No evidence |
| Posts | No evidence |
| GBP URL in schema `sameAs` | Missing |

## Review health snapshot

- Rating: none published anywhere
- Count: 0
- `aggregateRating` in schema: absent (correctly, since `reviews.ts` is empty)
- Velocity: 0 (nothing to measure against the 18-day rule yet)
- Response rate: N/A

## Citation presence status

| Directory | Status |
|---|---|
| Google Business Profile | Not found on-site; unconfirmed via search (Limitations) |
| TripAdvisor | Not found; direct fetch returned HTTP 403 (Limitations) |
| GetYourGuide | Not found; not independently verifiable this session (Limitations) |
| Airbnb Experiences | Not found; not independently verifiable this session (Limitations) |
| Yelp | Not found; not independently verifiable this session (Limitations) |
| BBB | Not applicable to Italy / not checked |

## Local schema validation

- Type: `["LocalBusiness", "TouristAttraction"]` — correct dual-typing per Google's
  TouristAttraction guidance for a bookable experience business.
- Required properties: `name` ✓, `address` ✓ (accuracy disputed, see finding #1).
- Recommended properties: `telephone` ✓, `url` ✓, `openingHoursSpecification` ✓, `priceRange` ✓,
  `geo` ✗ missing, business-level `sameAs` ✗ missing (only present on nested `founder`).
- `aggregateRating`: correctly omitted (conditional on real reviews existing) rather than faked.
- Product/Offer schema (4 bookable experiences) is separate and validated as correct in the prior
  audit; not re-checked here as it's outside local-SEO scope.

## Location page quality

Single-location business — multi-location doorway-page checks (unique content %, page-swap test)
don't apply.

---

## Top 10 prioritized actions

1. **[Critical]** Resolve the address question before touching GBP/citations: confirm whether
   "Via dei Pastai 12" is the real, dedicated kitchen address, or decide the business is
   structurally a service-area business with a rotating/undisclosed meeting point. This single
   decision gates GBP category, `geo`, all citations, and the address line in Footer/Schema/llms.txt.
2. **[Critical]** Once resolved, claim and verify the Google Business Profile with the correct
   listing type (storefront pin vs. SAB service-area radius) and correct primary category —
   Whitespark's #1 ranking factor and #1 negative-factor risk if chosen wrong.
3. **[Critical]** Start collecting real reviews (post-class WhatsApp/email ask, as
   `REMAINING-SEO-TASKS.md` R9 already plans) — this unblocks `aggregateRating`, the GBP snippet,
   and review velocity simultaneously. Never fabricate.
4. **[High]** List on TripAdvisor, GetYourGuide, and/or Airbnb Experiences — dual purpose as a
   booking channel and as the domain's first real external citations/backlinks at ~1 month old.
5. **[High]** Resolve the shared-phone-number question with endricerhozi.com before either site
   claims a GBP — get a dedicated line or document that only one entity will ever claim a listing.
6. **[Medium]** Add `geo` coordinates to `LocalBusiness` schema once the address question (#1) is
   settled — 5-decimal precision, sourced from the confirmed real location, not inferred.
7. **[Medium]** Add a business-level `sameAs` array to the `LocalBusiness` node in `Schema.astro`
   (GBP URL once claimed, business Instagram/Facebook if they exist and aren't just the founder's
   personal ones) — currently `sameAs` only exists one level down on `founder`.
8. **[Medium]** Add a real "get directions" / Maps link once the address is confirmed — note the
   current CSP (`frame-src` unset, `default-src 'self'`) will block a Maps `<iframe>` embed until
   the CSP is updated alongside it.
9. **[Low]** Once a GBP exists, mirror its opening hours exactly against the
   `openingHoursSpecification` already in schema (currently 10:00–21:00 daily, unverified against
   real operating practice beyond the three class-start times in `llms.txt`).
10. **[Low]** After address/GBP decisions are made, re-run a citation/NAP audit against whatever
    was actually submitted (Yelp, Apple Maps, Bing Places) to catch drift early — cheap to do once,
    expensive to unwind if 5+ directories publish a placeholder address.

---

## Limitations disclaimer

- **Search-engine verification was unreliable this session.** Google, Bing, and DuckDuckGo fetches
  via the available web-fetch tool repeatedly returned localized consent/error pages (Albanian-
  language "having trouble accessing Google Search" interstitials) or CAPTCHA challenges instead
  of real results, and one Bing query returned results for an apparently different, unrelated
  query. This means **GBP existence and Tier 1 citation presence could not be independently
  confirmed or ruled out with high confidence** — findings above are based on (a) zero on-site
  references to any of these, (b) the prior 2026-08-08 audit's finding of none existing, and (c)
  direct fetch attempts where those succeeded (e.g. TripAdvisor's own search returned HTTP 403).
  A follow-up with a working search tool, an authenticated Google Business Profile dashboard
  login, or a DataForSEO-style business-listings API (referenced as optional in this skill but not
  available as an MCP tool in this session) is needed to close this gap with certainty.
- No paid rank-tracking, GBP Insights, or review-monitoring tool was available.
- The GSC/Indexing API service-account credential is broken this session (see
  `findings/google-data.md` written by a parallel audit pass) — no Search Console data (clicks,
  impressions, position, indexation status) was available to cross-check whether any of this
  site's pages already surface local-pack-adjacent signals.
- Proximity is reported to account for 55.2% of local ranking variance and is outside this site's
  control — noted for context, not scored.
- Multi-location location-page quality checks were not applicable (single location).
