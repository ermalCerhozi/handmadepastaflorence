# GEO (Generative Engine Optimization) Analysis — handmadepastaflorence.com

Audit date: 2026-08-10
Method: live fetch of https://handmadepastaflorence.com (robots.txt, llms.txt, sitemap, rendered HTML) cross-checked against source at `C:\Users\ermal.cerhozi\p-projects\endris-workspace\handmadepastaflorence` (Astro, static output, i18n en/it/fr/de/zh).

**2026-08-10 — same-day fixes shipped (build verified, 90 pages, visual QA via headless browser):**
- `/pasta-shapes/` hub + 4 spokes added to `public/llms.txt` (§3, §9 #1).
- `dateModified` added to blog `Article` schema (`content.config.ts` gained optional `updatedDate`, falls back to `pubDate` — never fabricated) (§7, §9 #1).
- Question-form H2s shipped across all 5 locales (en/it/fr/de/zh), §4/§9 #2:
  - Blog: 5 headings converted in the two highest-traffic guides (pricing + where-to-eat), mirrored into all 5 languages — e.g. "What drives the price of a pasta class in Florence?", "How do you spot real handmade pasta on a menu?".
  - Landing pages: the lead body section on 6 of 8 class landing pages (pasta-making, online, team-building, gluten-free, for-two, gift) converted to question form across all 5 locales (30 edits) — e.g. "Why does pasta making work as a team building activity?", "Was verschenken Sie eigentlich?". `market-tour` and `private` were deliberately left alone: their lead headings are a two-step narrative device ("First, the market" / "Then, the kitchen") or a descriptive noun phrase that doesn't force naturally into a question without hurting the copy.
  - Visually verified via headless browser (English team-building page, German gift page) that the longer question-form headings wrap cleanly within the existing prose column — no overflow, no layout regression.
- **Not done (needs owner input, not a judgment call):** reviews/`AggregateRating` (R9 — never fabricate), `LocalBusiness.sameAs`/`geo` (needs real GBP/Instagram URLs, R3), NAP address verification (R1), video content.

---

## 1. GEO Readiness Score: 79 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 78 / 100 | 19.5 |
| Structural Readability | 20% | 85 / 100 | 17.0 |
| Multi-Modal Content | 15% | 55 / 100 | 8.3 |
| Authority & Brand Signals | 20% | 68 / 100 | 13.6 |
| Technical Accessibility | 20% | 100 / 100 | 20.0 |
| **Total** | | | **78.4 ≈ 79** |

This is a strong foundation for a one-month-old small local business — technical accessibility is essentially perfect, and citability/structure are well above what most local-service sites ship. The score is held back almost entirely by things that are *expected* to be thin this early (no third-party reviews, no video, no external brand mentions) rather than by mistakes.

---

## 2. AI Crawler Access Status

Checked live `https://handmadepastaflorence.com/robots.txt`:

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | ✅ Allow | Explicit rule |
| ChatGPT-User | ✅ Allow | Explicit rule |
| OAI-SearchBot | ✅ Allow | Explicit rule |
| ClaudeBot | ✅ Allow | Explicit rule |
| Claude-Web | ✅ Allow | Explicit rule |
| anthropic-ai | ✅ Allow | Explicit rule (training crawler — allowed, not blocked) |
| PerplexityBot | ✅ Allow | Explicit rule |
| Google-Extended | ✅ Allow | Explicit rule (feeds AI Overviews) |
| Applebot-Extended | ✅ Allow | Explicit rule |
| CCBot | ✅ Allow (via wildcard) | No explicit rule; falls under `User-agent: * / Allow: /` |
| Everything else | ✅ Allow | Default `Allow: /`, only `/api/` disallowed |
| AhrefsBot / SemrushBot / MJ12bot / DotBot | ✅ Allow, throttled | `Crawl-delay: 10` — sensible, doesn't block AI-adjacent SEO crawlers |

**Assessment:** Maximum-openness configuration — every AI crawler relevant to ChatGPT, Perplexity, Claude, and Google AI Overviews is explicitly allowed, including the training-only bots (anthropic-ai, and implicitly CCBot) that the standard playbook suggests optionally blocking. For a brand-new business trying to *build* presence in AI answers rather than protect existing IP leverage, this is the correct call — nothing to change here.

Sitemap is correctly declared: `Sitemap: https://handmadepastaflorence.com/sitemap-index.xml`, resolves to `sitemap-0.xml`, 85 URLs, hreflang alternates on every `<url>` entry (verified: all 5 locales + x-default present, e.g. on `/`, and confirmed the tricky case — translated-slug pages like `/it/corso-cucina-team-building-firenze/` — carry correct reciprocal hreflang both in the sitemap and in-page `<link rel="alternate">` tags). No hreflang defects found.

---

## 3. llms.txt Status: Present, well-formed, high quality

`https://handmadepastaflorence.com/llms.txt` returns HTTP 200 and follows the llms.txt spec correctly:

- H1 + blockquote summary, then `##` sections (Classes, For businesses, Good to know, The chefs, Guides, Links) — spec-compliant structure.
- Every class listed with **duration, group size, location/format, and exact price** — this is exactly the kind of structured fact an LLM assembling a citation wants, and it isn't source-throttled by needing to parse marketing copy to find it.
- Named authorship (Endri Cerhozi, Marsel) with a link to Endri's personal site — reinforces the same entities as on-page schema.
- Direct links to all five bookable-class pages and all five blog guides.
- Business hours, location, contact, languages taught — all present.

**No RSL 1.0 licensing file found** (checked `/rsl.xml`, no reference in `<head>` or robots.txt). This is very early-stage tooling (RSL adoption is still minimal across the web) and not worth prioritizing yet — flagged as optional/future, not a gap.

**Minor gap:** llms.txt doesn't list the `/pasta-shapes/` hub or its four spoke pages, despite those being the site's only pages with organic ranking traction (positions 9–16 for Tuscan-pasta-type queries per the project's own SEO notes) and having the strongest topical-authority/citability content on the site (see §4). This is a quick, low-effort fix.

---

## 4. Citability Analysis (passage-level)

**Direct-answer pattern:** Blog posts and shape pages consistently open with a bolded, self-contained answer before any narrative — e.g. the pricing guide's first paragraph: *"Short answer: as of summer 2026, most **group pasta making classes in Florence cost roughly €60–€120 per person**..."* This is the single strongest citability trait a small site can have, and it's used consistently, not just on one flagship post.

**Passage length:** Sampled body paragraphs across the pricing guide and landing-page sections run roughly 60–150 words per paragraph — within or just under the 134–167-word optimal-citation band. A few landing-page paragraphs (e.g. "What you'll actually do" sections) run two dense paragraphs of ~70–90 words each rather than one consolidated ~150-word block; splitting is fine for readability but slightly under-shoots the ideal single-extractable-chunk length for an LLM snippet.

**Heading style:** This is the main structural gap. Landing-page and blog H2s are declarative/topical ("What drives the price," "What you'll actually do," "Who's teaching," "When to book") rather than question-form. FAQ sections (present on every landing page and most blog posts) *do* use question-form headings and are wrapped in `FAQPage` JSON-LD — so the question-answer citability need is being met, just in a separate block rather than baked into the main H2 structure. Converting even 2–3 top H2s per page to question form ("How much does a pasta class in Florence cost?" instead of "What drives the price") would let AI engines cite the *narrative* passage directly instead of only the FAQ accordion answer.

**Specific stats with attribution:** Strong. Prices, durations, group-size caps, and dates ("since 2021," "opened June 2026") are stated as hard numbers throughout, not vague marketing language — this is exactly what AI answer engines prefer to quote over "we're passionate about pasta" copy.

**Self-contained answer blocks:** FAQ answers (6–8 per landing page, ~30–60 words each) are fully self-contained and extractable without surrounding context — good. The pasta-shapes spoke pages each carry a dedicated "answer" field (confirmed in `src/data/shapes.ts`) explicitly built as "the featured-snippet target," which is textbook GEO practice already implemented.

Word counts (source markdown, English blog posts):
| Post | Words |
|---|---|
| How much does a pasta class cost | 661 |
| Gluten-free pasta Florence | 589 |
| Things to do in Oltrarno | 834 |
| Tuscan pasta shapes guide | 899 |
| Where to eat handmade pasta | 943 |

All in a healthy 500–950 word range for topical-authority content — long enough to cover a topic, short enough to stay skimmable/extractable.

---

## 5. Structural Readability

- Clean heading hierarchy confirmed on the live homepage: exactly one `<h1>`, ten `<h2>`s (one per major section — Story, Gallery, FAQ, B2B, Experiences, Footer, Online band, booking steps ×3), well-nested `<h3>`s beneath. No skipped levels, no multiple-H1 problem.
- FAQ sections use native `<details>/<summary>` accordions — content is present in the raw server-rendered HTML (not injected only on click), so it's fully readable by non-JS-executing crawlers even though visually collapsed.
- Breadcrumbs present sitewide (`BreadcrumbList` JSON-LD) on blog posts and every landing page, reinforcing site hierarchy for entity/page-relationship understanding.
- Lists used appropriately (numbered "what drives the price" factors, bulleted "good to know" facts) rather than everything being prose paragraphs.

---

## 6. Multi-Modal Content: weakest dimension

- **Images:** Present and consistently alt-texted with descriptive, non-keyword-stuffed alt text (e.g. *"Broad ribbons of fresh egg pappardelle, hand-cut and dusted with flour"*). Astro `<Image>` component used for most content images (responsive, optimized).
- **No video.** No YouTube embeds, no VideoObject schema, no short-form clips of a class in progress. Given the strong correlation between YouTube presence and AI-citation likelihood (~0.737 in the brand-mention data), this is the single highest-leverage *content* gap on the site — even a 60–90 second class-highlight reel embedded on the homepage and class landing pages, with basic `VideoObject` schema, would move this dimension meaningfully.
- **No downloadable/structured assets** (no printable recipe cards, no PDF menu, no interactive pasta-shape comparison beyond the existing HTML comparison table on `/pasta-shapes/`).
- **Audio:** none, not expected for this business type.
- The `/pasta-shapes/` hub does include a comparison table (dough/cut/sauce per shape) — a good structured multi-modal element, but it's the only one on the site.

---

## 7. Authority & Brand Signals

**On-site E-E-A-T signals (good):**
- Named, credentialed authorship: Endri Cerhozi (Head Chef, Agriturismo Borgo Divino, since 2021) and Marsel, both named with real bios in the Story section, llms.txt, and Article/Person schema (`sameAs: https://endricerhozi.com` on Endri).
- Blog posts carry `Article` JSON-LD with `author` (Person, jobTitle, sameAs) and `publisher` — correct authorship signaling.
- `LocalBusiness` + `TouristAttraction` dual-typed schema, `FAQPage` schema (sitewide + per-post), `Product`/`Course`/`Service` schema per landing page, `BreadcrumbList` — this is an unusually thorough structured-data implementation for a business this size.

**Gaps (mostly expected for a ~1-month-old business, per your framing, but worth listing precisely):**
- **No reviews anywhere.** `Reviews.astro` is fully built (including badge/`AggregateRating`-ready markup) but intentionally empty — zero reviews collected yet, so no `AggregateRating`/`Review` schema exists. This is normal for a business this age; treat as "not yet," not "broken."
- **No external brand mentions found** — no Wikipedia entity, no visible Reddit discussion, no YouTube channel, no LinkedIn company page. Expected and normal for a brand-new local business; not a fix-it-now item, but every one of these is a realistic, low-cost win over the next 3–6 months (see §9) precisely because the correlation data weights them heavily.
- **`sameAs` on the `LocalBusiness` schema is empty** — no Instagram, Google Business Profile, or TripAdvisor URL wired in yet (flagged as an open task in the project's own `REMAINING-SEO-TASKS.md`, item R3). Once a Google Business Profile / Instagram exist, adding them here is a five-minute schema edit with outsized authority payoff.
- **NAP data flag:** the schema's street address, `Via dei Pastai 12` ("Street of the Pasta-Makers"), reads like a placeholder and is explicitly flagged as unconfirmed in the project's own SEO notes — worth a human check before it's cited as a fact by an AI engine.
- **No `dateModified`** on Article schema — only `datePublished` (confirmed in `src/content.config.ts`: the blog schema has no `updatedDate`/`dateModified` field at all). Freshness signals matter for AI citation preference; adding this is cheap.
- Article/FAQ schema on landing pages re-declares a full inline `Person` object for authors rather than referencing a single `@id`-anchored Person once — not wrong, just a missed opportunity for a cleaner, more machine-consistent entity graph.

---

## 8. Technical Accessibility: SSR/SSG confirmed, no CSR risk

- **Fully static.** `astro.config.mjs` has no SSR adapter (`output` unset = static build). Confirmed live: every checked URL (home, blog post, blog index, landing pages, pasta-shapes hub and spoke, translated-slug IT page) returns complete content in the raw HTML — verified via `curl` (no client-side rendering dependency). This is close to ideal for AI crawlers, which generally do not execute JavaScript.
- **JSON-LD renders server-side**, confirmed 6 `application/ld+json` blocks present in the raw homepage HTML fetched via curl (LocalBusiness + 4 Product/Offer + implicit FAQ elsewhere) and 2 on the pasta-shapes hub.
- FAQ accordion content (`<details>/<summary>`) is present in raw HTML even though collapsed by default — readable without JS.
- One (minor, non-blocking) piece of client-side JS: a locale-redirect script on `/` that reads `navigator.language`/`localStorage` to bounce browser-non-English visitors to `/it/`, `/fr/`, etc. This does not affect AI crawlers (they don't execute it, and even if a bot did, it wouldn't fire for a bot without a matching `Accept-Language`), and English content is always served first at `/` regardless — non-issue, already reasoned through in the code's own comments.
- Response headers are solid: HSTS preloaded, CSP, X-Frame-Options, nosniff — good general trust signal, doesn't directly affect AI crawling.
- Sitemap correctness (hreflang) already covered in §2.

**This dimension has no real weaknesses; nothing to prioritize here.**

---

## 9. Top 5 Highest-Impact Changes

Ranked by (citation-likelihood impact) ÷ (effort), given this is a small business — not by "textbook GEO importance":

| # | Change | Why it matters | Effort |
|---|---|---|---|
| 1 | **Add `/pasta-shapes/` hub + spokes to llms.txt**, and add `dateModified` to blog `Article` schema (content.config.ts schema field + template) | The shapes cluster is the site's only page with real organic traction and its most citation-ready content (dedicated answer fields, comparison table) — it should be the first thing an LLM crawler sees pointed to. `dateModified` is a one-line schema field with real freshness-signal payoff. | Low (1–2 hrs) |
| 2 | **Convert 2–3 top H2s per landing/blog page to question form** (e.g. "What drives the price?" instead of "What drives the price"; already phrased as a question in spirit, just needs the `?` and a few full rewrites like "Who's teaching?") | Lets AI engines cite the main narrative passage directly instead of routing every question-style query to the separate FAQ block only. | Low–Medium (copy-only edit across `landings.ts`/blog `.md`, no new component) |
| 3 | **Start collecting and publishing real Google/reviews**, then wire `AggregateRating`/`Review` schema (the plumbing already exists in `Reviews.astro`) | Reviews are one of the strongest trust/authority signals for both local-intent AI answers and traditional local pack; currently the single biggest structural authority gap on the site, and the component is already built and waiting. | Medium (business process, not code — send review links after each class) |
| 4 | **One short video** (60–90 sec class-highlight reel) on YouTube, embedded on the homepage and `pasta-making-class-florence` with `VideoObject` schema | YouTube presence has the strongest measured correlation (~0.737) with AI-answer citation of any brand signal checked. Nothing else on this list moves that specific dimension. | Medium (needs footage + a YouTube channel, no dev complexity) |
| 5 | **Fill in `LocalBusiness.sameAs` and `geo` coordinates** once Google Business Profile / Instagram exist (already an open task in `REMAINING-SEO-TASKS.md`, R3), and verify the `Via dei Pastai 12` address is real | Closes the entity graph (site ↔ GBP ↔ social) that AI engines and Google's Knowledge Graph use to corroborate a business's identity; a placeholder-looking address risks being confidently cited as wrong. | Low (schema edit) once accounts exist |

---

## 10. Schema Recommendations (summary)

Already implemented well: `LocalBusiness`+`TouristAttraction`, `Product`+`Offer` (5 locale homepages + landing pages), `Course` (onsite/online class instances), `Service` (bespoke offers), `FAQPage` (sitewide + per-post), `BreadcrumbList`, `Article` (blog).

Recommended additions:
- `dateModified` on `Article` (see §7/§9).
- `AggregateRating`/`Review` once real reviews exist — do not fabricate (the project's own notes already correctly flag this).
- `sameAs` + `geo` on `LocalBusiness` once GBP/social exist.
- Consider a single `@id`-anchored `Person` for each of Endri/Marsel, referenced by `@id` from `Article.author` and `LocalBusiness.founder`, instead of repeating the full object per page — cleaner entity graph, easier to keep in sync.
- Optional: `VideoObject` if/when a highlight video is added.

## 11. Content Reformatting Suggestions (summary)

- Question-form H2s on landing pages and blog posts (§4, §9).
- Consolidate 2-paragraph landing-page sections into one ~140–160-word block where the split isn't doing readability work, to better hit the optimal citation-passage length.
- Add the shapes hub/spokes to llms.txt (§3, §9).
- Consider a short "last verified" or "last updated" visible date on blog posts, paired with the new `dateModified` schema field, since pricing/seasonal content (the cost guide, the shapes guide) benefits most from visible freshness.

---

## 12. Platform-Specific Scores (estimated, qualitative)

No live DataForSEO/ChatGPT-scraper tools were available in this session, so these are qualitative estimates based on crawler access, llms.txt quality, structured data, and content citability — not live query testing.

| Platform | Estimated readiness | Rationale |
|---|---|---|
| **Google AI Overviews** | Good | Google-Extended allowed; strong schema coverage (Product/Course/FAQPage/LocalBusiness) is exactly what AIO favors; existing organic traction (pos 9–16) on the pasta-shapes cluster gives it a real shot at surfacing there specifically. |
| **ChatGPT / OAI-SearchBot** | Good | GPTBot/ChatGPT-User/OAI-SearchBot all allowed; llms.txt is unusually well-built and gives ChatGPT's browsing/search a clean structured summary to work from — likely the strongest-performing platform for direct citation given the llms.txt quality. |
| **Perplexity** | Good | PerplexityBot allowed; Perplexity leans heavily on direct-answer passages and specific stats, both of which this site already does well (bolded "short answer" openers, hard numbers). |
| **Bing Copilot** | Fair–Good | No Bing-specific bot named in robots.txt, but nothing blocks it either (default `Allow: /` covers it); technical accessibility (static HTML) is the main lever here and it's already maxed out. |

Because only 11% of domains are cited by both ChatGPT and Google AI Overviews, the practical recommendation is: don't try to be equally strong everywhere — the pasta-shapes cluster (organically ranking, well-structured, answer-box-ready) is the strongest current bet for AI Overviews specifically, while the llms.txt + FAQ-schema combination is the strongest bet for ChatGPT/Perplexity's browsing tools. Both point to the same fix list in §9.
