# SXO Findings — handmadepastaflorence.com

Date: 2026-09-03
Scope: SERP-backwards sanity check of the prior "authority, not content-relevance" conclusion (GSC checkpoint 2026-07-23), plus user-story/persona scoring for homepage, `/pasta-making-class-florence/`, `/gluten-free-cooking-class-florence/`, `/pasta-class-for-two-florence/`, `/gift-a-cooking-class-florence/`.

## Verdict: prior conclusion HOLDS — with one refinement

No genuine page-type/content mismatch found. handmadepastaflorence.com's commercial pages already use the correct page type (Product/Service page: price, images, FAQ, Product+Course schema) — the same type the ranking competitors use. The gap is a **specific, evidenced trust-signal gap (reviews) plus a booking-friction gap**, not a page-format or title-relevance problem. This sharpens rather than overturns the "authority-driven" finding: it is not abstract "authority," it is the absence of review schema/content specifically, and it is partially fixable at the page level (once reviews exist from any channel, not only GBP).

## SERP-backwards analysis (WebSearch, 6 queries)

Queries checked: "cooking class in Florence", "pasta making class Florence", "private cooking class Florence", "gluten free cooking class Florence", "cooking class for two Florence romantic", "gift cooking class Florence voucher".

**handmadepastaflorence.com does not appear in results for any of the 6 queries.**

Dominant result composition, all 6 queries:
1. **OTA marketplace listings** (GetYourGuide, Viator, TripAdvisor, Cookly, TravelingSpoon, Cozymeal, byFood) — review-rich aggregator/Product pages, "Free cancellation" in titles.
2. **Direct competitor business sites** — same Product/Service page type as HPF: mamaflorence.com (appeared in 5/6 queries — dominant local competitor), pastaclassflorence.com, cookingwithcarlotta.com, chefvary.com, townsofitaly.com, florencecookingclasses.com, 360cookingclassexperience.com.
3. Minor presence of roundup/review blog posts (journeyofdoing.com, theflorenceinsider.com) — not dominant.

**Page-type classification (taxonomy):** SERP dominant type = **Product Page** (competitor direct sites) blended with **Comparison/marketplace aggregator** (OTAs). handmadepastaflorence.com's own pages classify as **Product Page** (price, CTA, images, FAQPage schema, Product+Course schema on `/pasta-making-class-florence/`) — **ALIGNED**, not a mismatch. This independently confirms the prior decision not to retitle these pages.

### Concrete competitor comparison (the actual differentiator)

Fetched and parsed `mamaflorence.com/gluten-free-cooking-class-florence` (ranks for the gluten-free query) vs `handmadepastaflorence.com/gluten-free-cooking-class-florence/`:

| Signal | MaMa Florence (ranks) | Handmade Pasta Florence (doesn't rank) |
|---|---|---|
| Word count | 3,072 | 1,143 |
| Schema | Product + Organization, **AggregateRating: 4.88★, 600 reviews** embedded directly in Product schema | LocalBusiness+TouristAttraction, Product, BreadcrumbList, FAQPage — **no AggregateRating anywhere on the page or site** |
| Booking | (OTA-style instant book, price €169) | WhatsApp chat only (per site-wide FAQ: "opens a WhatsApp chat... we'll confirm availability") |

This is the sharpest evidence found: the ranking competitor page is the same type of page HPF already builds, just with reviews physically embedded in its schema and 2.7x more on-page depth. No page/site on handmadepastaflorence.com carries AggregateRating, Review, or testimonial schema anywhere — consistent with the known no-GBP/no-reviews gap, but now shown to be visible in a head-to-head schema diff against a page that outranks it for an identical intent.

### Genuine (non-authority) UX gap also found: booking friction

Every OTA result surfaced "Free cancellation" directly in its title tag — a repeated trust/risk signal across the SERP. HPF's own FAQPage schema confirms booking is WhatsApp-chat-only site-wide, with no visible cancellation policy and no instant online payment. This is a real, page-level, non-authority-gated fix: publish a clear cancellation policy and consider a lower-friction booking/payment path, independent of the reviews/GBP work.

## Page-type classification of target pages

- **Homepage**: Hybrid (Landing Page + Local Page signals) — hero + 4 experience cards with prices + partner/B2B section + FAQ; LocalBusiness+TouristAttraction schema present but address withheld until booking (flagged previously as a contradiction risk) and no map embed. No reviews section.
- **`/pasta-making-class-florence/`**: Product Page — well-formed (Product + Course + FAQPage + BreadcrumbList schema, 1,168 words, 7 images with descriptive alt). Missing required taxonomy element: "customer reviews with star ratings."
- **`/gluten-free-cooking-class-florence/`**: Product Page, 1,143 words, same schema pattern, no AggregateRating (see comparison above).
- **`/pasta-class-for-two-florence/`**: Product Page, 1,106 words, same schema pattern, generic "€95 each" framing — no named/branded romantic positioning (competitor mamaflorence.com uses a named experience, "In the Name of Love," with a 4-course wine-paired menu).
- **`/gift-a-cooking-class-florence/`**: Service/Product hybrid, 1,010 words, Service+FAQPage+BreadcrumbList schema — WhatsApp-only redemption flow vs. competitor DESINARE's instant email-delivered, personalize-and-print voucher (self-serve, no back-and-forth).

## User stories (cited to SERP signals)

1. **As a first-time Florence tourist comparing options**, I want to see real reviews before I commit €95+, because I can't verify quality of an unfamiliar small operator, but I'm blocked by **no rating/review signal anywhere on handmadepastaflorence.com** while every OTA/competitor result shows star ratings and counts. *(Signal: AggregateRating present on ranking mamaflorence.com page, 600 reviews; absent on HPF.)* — Awareness/Consideration.
2. **As a booking-ready visitor with limited time in Florence**, I want to instantly reserve and pay online with a clear cancellation policy, because my itinerary is tight and non-refundable risk worries me, but I'm blocked by a **WhatsApp-chat-only booking flow with no visible cancellation terms**. *(Signal: "Free cancellation" repeated across GetYourGuide/Viator titles in every query checked.)* — Decision.
3. **As a couple planning a romantic evening**, I want a class that feels designed for two, not a generic class discounted to a pair rate, because I want the experience itself to be the occasion, but I'm blocked by `/pasta-class-for-two-florence/`'s **generic "€95 each" framing versus competitors' named, wine-paired couples experiences**. *(Signal: mamaflorence.com "In the Name of Love," a 4-course wine-paired private class, ranking for the same intent.)* — Consideration.
4. **As someone buying a last-minute gift**, I want to purchase and receive a voucher instantly by email, because I'm shopping close to an occasion date, but I'm blocked by `/gift-a-cooking-class-florence/`'s **WhatsApp-inquiry flow instead of instant self-serve purchase**. *(Signal: DESINARE's personalize-and-print voucher, purchasable directly online, ranking for "gift cooking class Florence voucher.")* — Decision.
5. **As a diner with celiac disease or gluten sensitivity**, I want explicit proof of cross-contamination safety (dedicated station/equipment, not just "no surcharge"), because a mistake has real health consequences, but the current gluten-free page is **1,143 words vs. the 3,072-word ranking competitor page**, which spends much more content reassuring on contamination protocol. *(Signal: mamaflorence.com gluten-free page depth and framing.)* — Consideration.

## Gap analysis — `/pasta-making-class-florence/` (flagship commercial page, pattern shared by the other 4)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 14/15 | Aligned Product Page type matches SERP dominant format; minor deduction for no visible "buy now" instant checkout |
| Content Depth (0-15) | 10/15 | 1,168 words, clear menu/inclusions/FAQ — solid but roughly a third of the ranking competitor's depth (3,072 words on comparable gluten-free page) |
| UX Signals (0-15) | 7/15 | No visible cancellation policy; booking requires a WhatsApp round-trip, not instant pay; mobile-nav reliability not independently re-verified this pass (flagged in prior 2026-08-08 audit — recommend re-check) |
| Schema (0-15) | 10/15 | Strong Product+Course+FAQPage+BreadcrumbList markup; **missing AggregateRating/Review schema entirely** |
| Media (0-15) | 11/15 | 7 images, descriptive alt text, no video (competitors/OTAs often show gallery + video) |
| Authority (0-15) | 3/15 | Zero reviews, ratings, or third-party trust badges anywhere on-page or in schema, on any commercial page checked |
| Freshness (0-10) | 7/10 | `dateModified: 2026-08-11` present in Course schema (good signal), but not visibly dated for humans |

**SXO Gap Score: 62/100** (kept separate from the SEO Health Score of 73/100 cited in the prior full audit — this measures search-experience/trust fit, not technical SEO).

## Persona scoring

| Persona | Journey stage | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Review-checking tourist (compares OTAs before booking) | Consideration | 20/25 | 20/25 | 5/25 | 15/25 | 60/100 | Needs Work |
| Time-pressed booker (wants instant pay + cancellation terms) | Decision | 20/25 | 18/25 | 12/25 | 10/25 | 60/100 | Needs Work |
| Celiac/gluten-sensitive diner | Consideration | 18/25 | 15/25 | 10/25 | 15/25 | 58/100 | Needs Work |
| Couple planning a date-night class | Consideration | 15/25 | 18/25 | 8/25 | 15/25 | 56/100 | Needs Work |
| Last-minute gift buyer | Decision | 18/25 | 18/25 | 10/25 | 8/25 | 54/100 | Needs Work |

### Weakest persona: Last-minute gift buyer (54/100)
**Top issue:** No instant self-serve purchase path — gift buying on a deadline cannot tolerate a WhatsApp back-and-forth.
**Recommended fix:** Add an instant-purchase, email-delivered e-voucher option on `/gift-a-cooking-class-florence/` (even a simple payment-link flow), matching the DESINARE pattern seen ranking for this query.

### Systemic issue (all 5 personas)
**Trust dimension is the lowest score across every persona (5–12/25)** — driven entirely by the total absence of review/rating signal anywhere on the site, confirming the authority/review gap as the dominant, cross-cutting SXO problem, not a per-page content issue.

### Priority actions (weakest-first)
1. Ship the review pipeline (any channel: Google, TripAdvisor, WhatsApp-collected testimonials with photos) and add AggregateRating/Review schema to every commercial page once volume exists — directly targets the systemic Trust gap and mirrors the exact schema pattern found on the outranking mamaflorence.com page.
2. Add an instant e-voucher purchase flow to `/gift-a-cooking-class-florence/` — targets the weakest persona (gift buyer) without waiting on reviews.
3. Publish a visible cancellation/refund policy and evaluate a lower-friction booking step beyond WhatsApp-only — targets the time-pressed booker.
4. Give `/pasta-class-for-two-florence/` a named, occasion-branded framing (not just "€95 each") to match the couples-intent competitor pattern.
5. Deepen `/gluten-free-cooking-class-florence/` content specifically around cross-contamination protocol, closer to the 3,000-word competitor benchmark.

## Limitations

- WebSearch (used for SERP analysis) returns organic-style links plus an AI-generated synthesis, not a rendered google.com SERP — **true PAA boxes, ad copy, related-search chips, featured snippets, and map-pack presence could not be directly observed** and are not asserted here. The AI Overview–style synthesis text was used as a proxy signal only, clearly labeled as such.
- Local map-pack/GBP presence was not independently re-tested this pass (already known absent per prior audit and per memory `full-seo-audit-2026-08`).
- Mobile nav-toggle bug flagged in the 2026-08-08 audit was not re-verified live in this pass (source-tree check was in progress but not completed) — treat as unconfirmed-but-likely until re-checked.
- Only 5-6 SERP queries and 2 competitor pages (mamaflorence.com, pastaclassflorence.com) were fetched in depth; broader competitor sampling (e.g., chefvary.com, townsofitaly.com) was not parsed for schema.
- Gap analysis and persona scoring were computed in detail for `/pasta-making-class-florence/` as the representative flagship page; the other 4 pages were assessed via metadata/schema/word-count diffing rather than full independent scoring passes.

Recommend `/seo local` for GBP/review-pipeline execution detail, and `/seo schema` to generate the AggregateRating/Review schema block once review volume exists.

Generate a PDF report? Use `/seo google report`.
