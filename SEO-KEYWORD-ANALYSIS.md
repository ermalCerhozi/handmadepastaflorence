# SEO Keyword Analysis — handmadepastaflorence.com

_Last updated: July 2026. Volumes are directional estimates for the English-language tourist market (no live SERP/volume API was connected); validate in Google Keyword Planner or GSC once the site has impressions._

## Positioning

A brand-new domain with zero authority competing against Airbnb Experiences, GetYourGuide, Viator and established schools (e.g. "in Florence cooking classes" aggregator pages). Strategy: win **long-tail, high-intent** queries first, lean on the two differentiators competitors can't copy — *taught by two working agriturismo head chefs* and *max 8 guests* — and let the FAQ/schema feed AI answers (ChatGPT/Perplexity now drive a meaningful share of "things to do in Florence" discovery).

## Keyword sets

### Tier 1 — primary (highest intent, page title & H-level targets)
| Keyword | Intent | Est. difficulty | Where applied |
|---|---|---|---|
| pasta making class Florence | transactional | High (OTAs rank) | `<title>`, meta description, Experiences eyebrow |
| pasta cooking class Florence | transactional | High | meta description, body copy |
| cooking class Florence small group | transactional | Medium | WhyUs, FAQ, meta |
| pasta class Oltrarno / Santo Spirito | transactional | Low | Hero lede, FAQ ("Where are the classes held?") |

### Tier 2 — secondary (differentiators & offers)
| Keyword | Intent | Where applied |
|---|---|---|
| market tour and cooking class Florence | transactional | Mercato & Mani card + schema product |
| private cooking class Florence / private pasta class | transactional | Family Long-Table card |
| online pasta making class (with kit) | transactional | OnlineBand copy, schema product, FAQ |
| gluten free pasta making class Florence | transactional (underserved!) | FAQ answer + booking add-on |
| pasta making class taught by chefs | qualifier | Story, WhyUs, title fallback |

### Tier 3 — B2B (new section, low competition, high value per booking)
| Keyword | Where applied |
|---|---|
| team building cooking class Florence | B2B section card 2, FAQ |
| corporate cooking class Florence | B2B section, FAQ |
| Florence pasta class for groups / private buyout | B2B + Family Long-Table |
| hotel guest experience partnership Florence | B2B card 1, llms.txt |

### Tier 4 — informational (future blog/content, feeds AI citations)
- how to make pici / pappardelle / tortelli (PastaGallery flip-cards already seed this)
- what pasta is Florence famous for
- best food experiences in Florence
- pasta shapes of Tuscany and their history

## On-page changes applied (July 2026)
- **Title**: `Pasta Making Classes in Florence — Handmade Pasta Florence` (primary keyword first, brand second).
- **Meta description**: leads with "hands-on pasta making classes in Florence", includes small group / max 8 / Oltrarno / market tour / online kit.
- **Experiences eyebrow**: "Pasta making classes · Florence" (exact-match near the H2).
- **OnlineBand**: copy now says "live online pasta making class with an ingredient kit".
- **Schema (LocalBusiness)**: added `areaServed` (Florence, Tuscany) and `availableLanguage` (EN/IT); `founder` links Endri to endricerhozi.com (`sameAs`) for entity building.
- **FAQ**: added B2B question; FAQPage schema feeds Google PAA and AI answers.
- **llms.txt**: rewritten with real founders, real class names, B2B offers (GEO/AI-search readiness).

## Next steps (need owner input or live data)
1. Confirm real address & add `geo` coordinates to LocalBusiness schema (see REMAINING-SEO-TASKS.md).
2. Create a Google Business Profile ("Cooking class" category) — the map pack is where "pasta class florence" converts; keep NAP identical to the footer.
3. Get listed on curated "best cooking classes in Florence" round-ups — the #1 AI-visibility factor for local businesses.
4. Collect first reviews (Google + TripAdvisor), then populate the empty `Reviews.astro` section and add `AggregateRating` schema.
5. Once GSC has 2–3 months of data, re-check which Tier 1/2 terms get impressions and tune copy toward the winners.
6. Consider one landing page per class (`/classes/chefs-table` etc.) when content volume justifies it — single-page sites cap how many queries you can rank for.
