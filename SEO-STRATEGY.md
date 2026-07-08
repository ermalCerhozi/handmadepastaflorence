# SEO Strategy — handmadepastaflorence.com

_Written 2026-07-08, from the first GSC snapshot (3 months: 0 clicks, 8 impressions,
avg position 50.4). Companion to `FULL-AUDIT-REPORT.md`, `SEO-KEYWORD-ANALYSIS.md`
and `REMAINING-SEO-TASKS.md`._

## 1. Diagnosis

The 0% CTR is a red herring — position 50 is page 5, which nobody reads; impressions
without clicks are statistically normal there. On-page SEO was already solid from the
June/July pass. Position ~50 had three structural causes:

1. **Single indexable page.** One URL competing for every intent (class, market tour,
   private, online, B2B) dilutes relevance. → **Fixed 2026-07-08**: 5 intent landing
   pages + a 6-page guides section shipped (see §3).
2. **Zero domain authority.** New domain, no backlinks, no GBP, no reviews. Only
   off-page work fixes this (see §5).
3. **Missing local-entity confirmation.** No `geo`, no `sameAs`, unverified NAP, no
   GBP. Still open — R1–R3 in `REMAINING-SEO-TASKS.md`.

Positive signal: an impression for _"best homemade pasta in florence"_ (restaurant
intent) → captured deliberately with `/blog/where-to-eat-handmade-pasta-in-florence/`.

## 2. Site architecture (as of 2026-07-08)

| URL | Target keyword | Schema |
|---|---|---|
| `/` | pasta making classes in Florence (hub) | LocalBusiness, 4× Product, FAQPage |
| `/pasta-making-class-florence/` | pasta making class florence | Product €95, Breadcrumb, FAQPage |
| `/market-tour-cooking-class-florence/` | market tour and cooking class florence | Product €145, Breadcrumb, FAQPage |
| `/private-cooking-class-florence/` | private cooking class florence | Product €680, Breadcrumb, FAQPage |
| `/online-pasta-making-class/` | online pasta making class (with kit) | Product €68, Breadcrumb, FAQPage |
| `/team-building-cooking-class-florence/` | team building cooking class florence | Service, Breadcrumb, FAQPage |
| `/blog/` + 5 guides | informational cluster (below) | Article, Breadcrumb |

Content clusters shipped (1 pillar each; expand to 3–4 posts per cluster over time):
booking/cost decision, "where to eat" capture, Tuscan pasta shapes, gluten-free/dietary,
Oltrarno/occasions. Cadence target: 2 posts/month, each with a real photo, the Endri
byline, and links both ways to the class pages.

## 3. Keyword gap analysis (no paid tools)

Weekly loop:
1. Google each Tier-1 term (incognito, `&gl=us&hl=en`); list the *independent* schools
   that rank — ignore OTAs.
2. Pull `competitor.com/sitemap.xml` — every URL is a keyword bet; any page type they
   have that we don't is a gap.
3. Mine their `<title>`/H1 modifiers (with wine, near Duomo, evening, in English…).
4. Google autocomplete a–z + People Also Ask (recursively) + related searches.
5. Mine GetYourGuide/Airbnb/TripAdvisor listing titles and **reviews** for traveler
   language.
6. Validate volumes in free Google Keyword Planner; use GSC monthly as ground truth
   (queries with impressions at position >20 → strengthen those pages).

## 4. Off-page priorities (the actual ranking bottleneck)

1. **Google Business Profile** (R2) — category "Cooking class", NAP identical to footer.
2. **Google reviews** — WhatsApp a review link after every class; 10–15 changes the tier.
3. **TripAdvisor "Things to Do" listing.**
4. **One or two OTA listings** (GetYourGuide / Airbnb Experiences) — commission buys
   first customers → reviews → brand searches. Keep best price on own site.
5. **Roundup placements** — pitch authors of top-10 "best cooking classes in Florence"
   listicles (free class for consideration). 3–5 of these outweigh 100 directories.
6. **Local partnerships** — hotel concierges, FeelFlorence portal, food bloggers.

## 5. KPI targets

| Metric | Jul 2026 | Oct 2026 | Jan 2027 |
|---|---|---|---|
| Indexed pages | 1 | 8–12 | 15–20 |
| Impressions / month | ~3 | 500–1,500 | 3,000–8,000 |
| Avg position (Tier-1) | ~50 | 15–25 | 5–12 |
| Clicks / month | 0 | 10–40 | 80–250 |
| Google reviews | 0 | 10+ | 30+ |

Monthly ritual: GSC → queries with impressions, position >20 → tune the matching page;
submit any new pages; log review count.
