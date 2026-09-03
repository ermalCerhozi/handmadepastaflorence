# GEO (Generative Engine Optimization) Audit — handmadepastaflorence.com

Audit date: 2026-09-03
Method: live fetch (robots.txt, `/llms.txt`, homepage, `/pasta-making-class-florence/`, `/blog/how-much-does-a-pasta-making-class-in-florence-cost/`) via static HTTP fetch (no JS rendering needed — `is_spa: False` confirmed), cross-checked against source and the prior audit at `GEO-ANALYSIS.md` (2026-08-10, score 79/100).

This is an incremental re-check, not a full re-audit — see `GEO-ANALYSIS.md` for the full original writeup. This file focuses on: verifying claimed shipped fixes, the pricing-visibility question raised for this domain specifically, and re-confirming crawler/llms.txt status.

---

## GEO Readiness Score: ~80 / 100 (up from 79)

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 82/100 | Direct-answer openers, question-form H2s, and specific stats all confirmed live. One nuance found (see Medium finding below) about how a boilerplate-stripping content extractor would parse the landing-page price. |
| Structural Readability | 20% | 88/100 | Question-form H2s and `dateModified` confirmed shipped since last audit. |
| Multi-Modal Content | 15% | 55/100 | Unchanged — still the weakest dimension. No video anywhere. |
| Authority & Brand Signals | 20% | 68/100 | Unchanged — solid on-site E-E-A-T, zero external brand-platform presence. |
| Technical Accessibility | 20% | 100/100 | Unchanged — fully static, no CSR risk, all target AI crawlers explicitly allowed. |

---

## Findings by Severity

### Info — Pricing gap flagged on sister site does NOT apply here (verified)

The prior sister-site (endricerhozi.com) audit noted zero numeric pricing anywhere, blocking "how much does X cost" AI citations. **Handmade Pasta Florence does not have this problem.** Verified live, in raw static HTML (not JS-injected, not JSON-LD-only):

- Page `<title>` and meta description on `/pasta-making-class-florence/` state the price directly: *"...Two Tuscan wines included. Max 8 guests, €95 per person."*
- The visible on-page price badge (`<strong>€95</strong>`, `<dd>about 3 hours</dd>`) is present in the raw HTML response, not rendered client-side.
- Body copy states the price in prose: *"Two Tuscan pours are included in the €95..."* and *"The Chef's Table is €95 per person..."* (this second sentence is also the literal text of the page's `FAQPage` JSON-LD answer).
- `Product`/`Offer` JSON-LD is correct and complete: `price: "95"`, `priceCurrency: "EUR"`, `availability: InStock`, `priceValidUntil: 2026-12-31` (still valid as of audit date).
- The blog cost guide (`/blog/how-much-does-a-pasta-making-class-in-florence-cost/`) opens with a bolded direct-answer paragraph giving both market-range pricing (€60–€180 depending on class type) and the business's own exact prices for all four class types, in one place.
- `llms.txt` lists exact price, duration, and group size for all six offerings.

Net: price, duration, and group size are stated as extractable facts in at least four independent places per page (title/meta, visible prose, JSON-LD, llms.txt) — this is a genuine strength, not a gap.

### Medium — Landing-page hero price fact may be invisible to boilerplate-stripping content extractors

Many AI-crawler content pipelines (including this audit's own extraction step, trafilatura-based) strip visually "widget-like" DOM blocks (price badges, booking calculators) as navigation/boilerplate before passing text to the citation model. On `/pasta-making-class-florence/`, the boilerplate-stripped extracted text starts directly with *"What will you actually do in the class?"* and does **not** surface the €95 price until roughly 200–250 words in, inside a "Good to know" bullet list — even though the price is visually prominent and present in raw HTML near the top of the page.

**Risk:** an AI engine using a similar extraction step (common for RAG-style retrieval used by ChatGPT/Perplexity browsing tools) may correctly retrieve the page for a "how much" query but fail to extract the price from the passage it samples, because the price lives in a widget block rather than in flowing body prose near the top.

**Recommendation:** add one explicit sentence stating price + duration + group size in the first body paragraph of prose (not just the price badge/widget), e.g. prepend or fold into the existing opening paragraph: *"The Chef's Table is a 3-hour, €95-per-person pasta class for max 8 guests in the Oltrarno..."* This duplicates information already on the page but moves it into the text stream that extraction pipelines are most likely to keep. Effort: low (copy edit, one sentence per landing page, ~5 pages).

### Low — `LocalBusiness` entity itself has no `sameAs` or `geo` coordinates

Confirmed live: the `sameAs` array with Instagram/Facebook/LinkedIn/endricerhozi.com is attached to the `Person` (founder Endri Cerhozi) inside the `LocalBusiness.founder` array, not to the `LocalBusiness`/`TouristAttraction` entity itself. The business entity has no `sameAs` and no `geo` (lat/long) property. This was flagged in the prior audit (§7/§9 #5) and is still open — pending a real Google Business Profile / Instagram business account to link. Not urgent given the business is ~1 month old, but should be revisited once those accounts exist.

### Low — Street address still reads as unconfirmed/placeholder-like

`"streetAddress": "Via dei Pastai 12"` ("Street of the Pasta-Makers") is still in the live schema, unchanged since the prior audit's flag. Recommend a human confirms this is the real registered address before an AI engine cites it as fact — a wrong or fictional-looking address is a worse outcome than no address.

### Low — No RSL 1.0 licensing file

Checked live: `https://handmadepastaflorence.com/rsl.xml` returns 404, and no `<link rel="license">`/robots.txt reference exists. RSL adoption is still minimal industry-wide; this remains optional/future work, not a real gap.

### Info — No external brand-platform presence found (unchanged, expected for a 1-month-old business)

Checked homepage raw HTML for outbound references to YouTube, Reddit, Wikipedia, TripAdvisor, and Google Maps/Google Business Profile: zero matches for all five. Combined with no `AggregateRating`/reviews schema (expected — `Reviews.astro` component exists but is intentionally empty, no reviews collected yet), this confirms the business currently has no third-party corroboration signals at all. Given YouTube presence has the strongest measured correlation (~0.737) with AI-answer citation of any brand signal, and the site has zero video content, this remains the single highest-leverage content gap — see prior audit §9 #4 (unshipped).

### Info — Crawler access and llms.txt: no regressions, fully healthy

- Live `robots.txt` matches local source exactly. All target AI crawlers explicitly allowed: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended. Only `/api/` disallowed for everyone. Sitemap correctly declared.
- Live `/llms.txt` byte-matches the local `public/llms.txt` file — no staleness. Confirmed the `/pasta-shapes/` hub + 4 spokes (flagged missing in the prior audit) are now present (§3/§9 #1 from the prior audit — shipped and verified).
- `dateModified` confirmed present in blog `Article` JSON-LD (alongside `datePublished`) on the pricing guide — prior audit's §9 #1 fix confirmed shipped and live.
- Question-form H2s confirmed shipped and live on the pricing blog post: *"What drives the price of a pasta class in Florence?"*, *"What should be included at these prices?"*, *"Five questions to ask before booking any class (including ours)"* — prior audit's §9 #2 fix confirmed shipped and live.
- Homepage carries 6 valid `application/ld+json` blocks server-side: `LocalBusiness`+`TouristAttraction`, four `Product`/`Offer` (one per class type, all with `price`, `priceCurrency`, `availability`, `priceValidUntil`), and `FAQPage`. All rendered in raw HTML, no JS dependency.

---

## Top 5 Highest-Impact Changes (updated priority order)

| # | Change | Severity | Effort |
|---|---|---|---|
| 1 | State price + duration + group size in the first body paragraph of prose on each landing page (not just the price-badge widget), so boilerplate-stripping extractors reliably capture it | Medium | Low (~5 one-sentence copy edits) |
| 2 | One short YouTube video (60–90s class highlight) embedded on homepage + top landing page, with `VideoObject` schema | Info/High-value | Medium (footage + channel setup) |
| 3 | Start collecting real reviews, wire the already-built `AggregateRating`/`Review` schema in `Reviews.astro` | Info/High-value | Medium (business process) |
| 4 | Add `sameAs` + `geo` to the `LocalBusiness` entity itself once GBP/Instagram business accounts exist | Low | Low (schema edit, blocked on accounts) |
| 5 | Verify `Via dei Pastai 12` is the real address | Low | Low (human confirmation) |

---

## Platform-Specific Readiness (qualitative, unchanged rationale from prior audit)

| Platform | Readiness | Notes |
|---|---|---|
| Google AI Overviews | Good | Google-Extended allowed; strong Product/FAQPage/LocalBusiness schema |
| ChatGPT / OAI-SearchBot | Good | llms.txt is unusually complete and current; likely strongest platform |
| Perplexity | Good | Direct-answer openers + hard numbers match Perplexity's citation preferences |
| Bing Copilot | Fair–Good | No explicit Bing bot rule but nothing blocks it; static HTML favors it |

Because only ~11% of domains are cited by both ChatGPT and Google AI Overviews, continued investment should stay split between the llms.txt/FAQ-schema strength (ChatGPT/Perplexity) and the schema/organic-traction strength of the pasta-shapes cluster (Google AIO), per the prior audit's framing — nothing in this re-check changes that call.
