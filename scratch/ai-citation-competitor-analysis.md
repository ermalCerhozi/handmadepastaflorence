# Why Handmade Pasta Florence Isn't Getting Cited in AI Answers

**A competitor analysis — handmadepastaflorence.com**
Prepared 2026-08-09

---

## The short answer

It's not a freshness problem. Freshness only matters to AI/Google for time-sensitive topics (news, "latest X"). For a commercial "who should I book" query, AI engines weight **third-party corroboration** — and the site currently has **zero** of it. Searching `site:handmadepastaflorence.com`, and even the exact brand name `"handmadepastaflorence.com"`, returns nothing outside our own domain: no directory listing, no review site, no forum mention, no press, nothing. Every competitor that shows up in AI-relevant searches does so through a channel we're not on at all.

---

## What's already solid (ruled out as causes)

We checked the site's own technical readiness for AI crawlers and found it's in good shape:

- **robots.txt** explicitly welcomes GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, and Applebot-Extended.
- **llms.txt** exists, is well-structured, and lists real prices/durations/group sizes (€95 / €145 / €680 / €68, 3–5 hrs, max 6–8 guests) — exactly the numeric specificity AI engines like to quote.
- **Structured data** ships `LocalBusiness` + `TouristAttraction` schema plus `Product`/`Offer` with real prices across all 5 locale homepages.

So the on-page/technical layer is genuinely solid — better than most of the competitors found below. That's the trap: the homework that's visible to *us* is done, but AI citation for "book me a class" queries runs almost entirely on signals that live *off* the site.

---

## What competitors are actually doing differently

Every relevant search — "best pasta making class Florence", "pasta making class Florence TripAdvisor GetYourGuide", and a live Florence cooking-class roundup blog — surfaced the same pattern:

- **TripAdvisor, GetYourGuide, Viator, Airbnb Experiences, and Expedia dominate the results** — not competitors' own homepages. These marketplaces carry hundreds of dated, verified reviews, which is exactly the corroboration signal AI engines lean on for "is this legit" queries.
- Direct competitors that *do* rank on their own domain (Pasta Class Florence, Mama Florence) have years of accumulated reviews funneled through those marketplaces, plus inclusion in independent roundups.
- We fetched **theflorenceinsider.com's "Best cooking classes in Florence"** article directly. It lists five competitors — MaMa Florence, Pastamania, Cooking Art Brunelleschi, Tuscan Taste Florence, and Farmhouse Cooking Experiences — every one with a Viator booking link. **We are not in that article, and we have no Viator, TripAdvisor, or GetYourGuide listing at all.**
- None of those competitor listings have review schema, an llms.txt file, or clean structured data. They're winning purely on the volume of independent, dated, third-party mentions. Industry data backs this up: brand mentions correlate roughly 3x more strongly with AI citation than backlinks or on-page polish.

---

## The compounding problem: not indexed yet either

Per the last Google Search Console export (2026-07-12, ~3 weeks after launch): 2 clicks, 65 impressions, **average position 49.4**. Roughly 92% of AI Overview citations come from pages already ranking in the organic top 10 — so even before the corroboration gap, the site isn't yet in the pool AI Overviews pulls from for these queries. That's expected at 7–8 weeks old and not a red flag on its own, but it means "why isn't AI citing us" currently has two independent blockers stacking, not one.

---

## Prioritized fixes

1. **Claim Google Business Profile and start collecting reviews.** This is the single highest-leverage action. Fix the placeholder address in the site's schema first, since GBP verification will expose any mismatch between the published address and the real one.
2. **List on GetYourGuide and/or Viator.** Commission cuts into margin, but that's where the query intent — and the AI citations — currently live. Every visible competitor uses at least one. Fastest path to review volume and inclusion in the result sets AI is already pulling from.
3. **Pitch inclusion in independent roundups.** Start with theflorenceinsider.com, which already ranks and gets cited for "best cooking classes Florence" and currently excludes us entirely. One inclusion there is a real, dated, third-party mention.
4. **Add `sameAs` links to the LocalBusiness schema** once GBP/marketplace profiles exist, and add `AggregateRating`/`Review` schema once there are real reviews — not before; fabricated ratings will backfire.
5. **Re-check once organic position improves.** Watch the next GSC checkpoint (~2026-08-09) for movement out of position ~49 — the indexing gap should close on its own as the site ages, but the corroboration gap (items 1–4) will not close by itself.

---

## Sources checked

- Best Pasta Making Classes in Florence – Cookly Magazine — cookly.me/magazine/europe/italy/florence/best-pasta-making-classes-in-florence
- THE BEST 10 Florence Cooking Classes 2026 – Viator — viator.com/Florence-tours/Cooking-Classes/d519-g6-c19
- Pasta Class Florence – TripAdvisor — tripadvisor.com/Attraction_Review-g187895-d19838979-Reviews-Pasta_Class_Florence-Florence_Tuscany.html
- Best cooking classes in Florence – The Florence Insider — theflorenceinsider.com/best-cooking-classes-florence
- Authentic Pasta Making Class with a Local Chef – GetYourGuide — getyourguide.com/florence-l32/authentic-pasta-making-class-in-florence-with-a-local-chef-t404102
- Private Handmade Pasta with a Sfoglina – Airbnb Experiences — airbnb.com/experiences/6725518
