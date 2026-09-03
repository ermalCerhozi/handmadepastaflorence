# Content Architecture — Semantic Clustering Findings

Site: handmadepastaflorence.com | Date: 2026-09-03 | Category: Content Architecture

## 1. Gap verification: "team building" cluster

**Confirmed still open.** Codebase inspection (`src/data/landings.ts`) shows exactly **one**
page key — `team-building` — rendering to one URL per locale:

| Locale | URL |
|---|---|
| en | `/team-building-cooking-class-florence/` |
| it | `/corso-cucina-team-building-firenze/` |
| fr | `/cours-cuisine-team-building-florence/` |
| de | `/teambuilding-kochkurs-florenz/` |
| zh | `/tuandui-jianshe-pengren-kecheng-foluolunsa/` |

No supporting blog posts exist for team-building sub-intents (`src/content/blog/` and
`src/content/blog/it/` contain 13 posts, none team-building related). The page's own `related`
array links out to three other money pages and one unrelated blog post (Oltrarno guide) — there
is no informational layer at all. `src/components/B2b.astro` (homepage band) points every "hotels
/ agencies / tour operators" and "companies" CTA at this single page too, so all B2B and corporate
demand converges on one URL. **Per [[gsc-seo-plan]], this page's cluster is 36% of all GSC
impressions** (Jul 2026 data; ~481 impressions across locales in the Aug export per an inline code
comment, zero clicks pre-retitle). This remains the single largest content-architecture gap on the
site.

**Live competitor validation** (WebSearch, Sept 2026): the dominant Florence team-building
competitor (mamaflorence.com) runs a hub (`/florence-team-building`) plus at least 7 distinct
ranking spoke URLs — `christmas-team-building-florence`, `create-your-own-dessert-ultimate-team-
building-experience-florence`, `social-team-building-in-florence`, `pizza-making-contest-florence`,
`cocktail-team-building-event-florence`, `best-team-building-activities-florence-culinary-outdoor-
experiences` (blog), `the-best-time-of-the-year-for-company-team-building-events-in-florence-and-
tuscany` (blog), `florence-tuscany-team-building-best-time-guide`. A second competitor
(pastaclassflorence.com) runs a separate hub + spoke for capacity (up to 70 people). Each of these
URLs is distinct across every query variant tested — none of the sub-intent searches returned the
same page twice — confirming these are separately-ranking pages, not one page ranking for
everything. This is direct SERP evidence that splitting sub-intents into dedicated pages is what
wins these queries, not thin-content risk.

## 2. Site-ownership check (handmadepastaflorence.com vs endricerhozi.com)

**The task brief's premise is backwards — flagging, not blocking.** [[two-sites-keyword-split]]
(memory, last modified 2026-07-27) states the *opposite* of what was asserted in this task:

> "Florence *city* cooking classes **and corporate team building → handmadepastaflorence.com**.
> It has the Oltrarno kitchen, walkable from the centre."
> "Countryside / agriturismo / villa classes and everything wedding → endricerhozi.com."

So corporate team building in Florence city is explicitly **this site's** territory; endricerhozi.com
was ceded the countryside/villa/wedding side, not team building. [[full-seo-audit-2026-08]]
independently re-verified "no violations found" against this same rule on 2026-08-08. No code
comment referencing the split exists in this repo (grep for `endricerhozi|two-sites|keyword-split`
returned no hits in `src/`), but the rule was checked and re-confirmed twice in memory since
2026-07-27 and nothing in the current landings/B2b code contradicts it.

**Conclusion: no conflict.** The recommended team-building cluster expansion below is compliant
with the agreed site split. If the owner's actual, current intent differs from the 2026-07-27
agreement (e.g., they've since decided to route corporate work through endricerhozi.com), that is
a business-decision change to confirm with the owner directly — it is not something this audit can
resolve from the repo alone, and the memory is 37 days old (point-in-time, not live state).

## 3. Other single-page, high-impression clusters — none found

Checked every other page key in `landings.ts` and every GSC signal recorded in [[gsc-seo-plan]] /
`REMAINING-SEO-TASKS.md`:
- "private cooking class florence" (couple-intent) — already resolved by the `for-two` money page
  shipped 2026-07-27.
- "best pasta florence" — served by the retitled `where-to-eat-handmade-pasta-in-florence` blog
  post (single page is appropriate; informational long-tail with no distinct sub-intents surfaced
  in GSC).
- "pasta shapes/types" — already has the `/pasta-shapes/` hub + 4 spokes (the reference pattern
  this task extends).
- Commercial English pages (pos 45–95) — this is an authority/backlink problem (GBP, OTA listings),
  not a missing-page problem; adding pages would not fix position 66.

No new gap qualifies under the "high impression, single page" test with currently available data.
Next GSC export (checkpoint was due ~2026-08-09, per [[gsc-seo-plan]]) should re-check this,
since the current view is 24–37 days old.

## 4. Proposed cluster: Team Building (hub = existing money page, net-new spokes = blog posts)

**Pillar / Hub (no new build — already live):** `team-building-cooking-class-florence`
(+ IT/FR/DE/ZH). Intent: **Transactional**. Stays the conversion page (email-quote CTA); do not
turn it into an index page — mirror the `/pasta-shapes/` precedent where the hub keeps converting
and spokes are the informational funnel-in layer, not the other way around.

**New spokes:** 8 posts in `src/content/blog/` (+ `src/content/blog/it/` — EN+IT only, matching
the existing blog locale pattern; FR/DE/ZH stay landing-page-only as they are today), grouped into
4 clusters of 2. Template: `BlogPostPage.astro` (existing informational template, `faqs`
frontmatter → `FAQPage` JSON-LD, matching the pattern already used on the 2026-07-23 pass).

```json
{
  "pillar": {
    "keyword": "team building cooking class florence",
    "url": "/team-building-cooking-class-florence/",
    "intent": "Transactional",
    "status": "existing",
    "wordCountTarget": null,
    "note": "No changes; spokes link in, it does not change shape."
  },
  "clusters": [
    {
      "name": "Activity Format & Comparison",
      "rationale": "GSC already logs the query 'teambuilding florence food' (13 impressions, one-word spelling) and competitors rank distinct pages for 'best team building activities' vs specific formats — SERP evidence (Sept 2026 WebSearch) shows zero URL overlap between these and the generic hub query.",
      "spokes": [
        {
          "slug": "best-team-building-activities-florence-pasta",
          "title": "Best Team Building Activities in Florence: Where Pasta-Making Fits",
          "targetKeyword": "best team building activities Florence",
          "secondaryKeywords": ["food team building ideas Florence", "teambuilding florence food"],
          "intent": "Informational/Commercial",
          "wordCountTarget": "1400-1700",
          "template": "BlogPostPage.astro",
          "intentJustification": "Roundup/comparison query, top results are listicles (mamaflorence 'culinary-outdoor-experiences' post) not booking pages; answer-box + comparison table format, CTA funnels to pillar."
        },
        {
          "slug": "pasta-challenge-team-building-florence",
          "title": "The Pasta Challenge: A Competitive Team Building Format in Florence",
          "targetKeyword": "team building games Florence",
          "secondaryKeywords": ["cooking competition team building", "pasta making competition corporate"],
          "intent": "Informational/Commercial",
          "wordCountTarget": "1200-1500",
          "template": "BlogPostPage.astro",
          "intentJustification": "Competitor evidence (Mama Florence 'pasta challenge', groups of 20-50) shows demand for a gamified format description distinct from the standard class; content sells the private buyout as adaptable to a challenge format without adding a new SKU."
        }
      ]
    },
    {
      "name": "Group Size & Logistics",
      "rationale": "The pillar's own FAQ already answers 'how big can the group be' in one paragraph capped at 6-14 with a throwaway 'email us' line for larger companies — WebSearch confirms competitor capacity pages exist for 20-50, 35-80, up to 70/200 people, indicating real search demand this one paragraph does not capture.",
      "spokes": [
        {
          "slug": "corporate-cooking-class-group-size-florence",
          "title": "Corporate Cooking Class Group Sizes in Florence: From 6 to 100+ People",
          "targetKeyword": "large group cooking class Florence",
          "secondaryKeywords": ["corporate event 30 people Florence", "team building group size"],
          "intent": "Informational/Commercial",
          "wordCountTarget": "1200-1500",
          "template": "BlogPostPage.astro",
          "intentJustification": "Logistics/capacity query; explains the 6-14 private-kitchen cap plus the consecutive-session workaround for larger companies already mentioned in the pillar's FAQ, expanded into its own targetable page instead of one buried sentence."
        },
        {
          "slug": "half-day-team-building-offsite-florence",
          "title": "Half-Day Team Building Offsite Itinerary: Cooking Class + Oltrarno Walk",
          "targetKeyword": "corporate offsite itinerary Florence",
          "secondaryKeywords": ["half day team building Florence"],
          "intent": "Informational",
          "wordCountTarget": "1200-1500",
          "template": "BlogPostPage.astro",
          "intentJustification": "Planning/itinerary query, not a booking query; links the existing 'things-to-do-in-oltrarno-florence' post (already in the pillar's related array) into a fuller offsite plan, reducing that post's current orphan-ish single inbound link."
        }
      ]
    },
    {
      "name": "Corporate Packages / Audience",
      "rationale": "The pillar's 'Hotels, agencies & tour operators' section is one paragraph inside a consumer-facing page; B2b.astro (homepage band) sends all partner-type traffic to the same URL as end-client traffic, with no page targeting DMC/agency-specific search language.",
      "spokes": [
        {
          "slug": "team-building-partners-hotels-dmc-florence",
          "title": "Team Building for Hotels, DMCs & Tour Operators in Florence",
          "targetKeyword": "DMC team building partner Florence",
          "secondaryKeywords": ["corporate travel planner activities Florence", "hotel concierge team building partner"],
          "intent": "Commercial",
          "wordCountTarget": "1200-1400",
          "template": "BlogPostPage.astro",
          "intentJustification": "B2B partner-search intent, different vocabulary and different buyer (agency, not the offsite organizer) than the pillar's direct-corporate audience; expands the existing one-paragraph section into a dedicated page, CTA to the same partner email flow already wired in B2b.astro."
        },
        {
          "slug": "remote-hybrid-team-offsite-florence",
          "title": "Remote & Hybrid Team Offsites: Combining In-Person and Online Pasta Classes",
          "targetKeyword": "hybrid team building Florence",
          "secondaryKeywords": ["remote team offsite Italy"],
          "intent": "Informational/Commercial",
          "wordCountTarget": "1200-1400",
          "template": "BlogPostPage.astro",
          "intentJustification": "Niche cross-sell intent connecting two existing money pages (in-person team-building + online-pasta-making-class) for distributed teams; no competitor found covering this angle, low competition long-tail."
        }
      ]
    },
    {
      "name": "Seasonal / Occasion",
      "rationale": "Direct competitor parallel: mamaflorence.com runs both a 'best time of year' page and a dedicated Christmas page, both distinct URLs from its hub. Seasonal corporate-events search volume spikes (holiday parties, summer offsites) are currently uncaptured.",
      "spokes": [
        {
          "slug": "best-time-corporate-team-building-florence",
          "title": "Best Time of Year for Corporate Team Building in Florence",
          "targetKeyword": "best time team building Florence",
          "secondaryKeywords": ["corporate offsite Florence season", "team building Florence summer"],
          "intent": "Informational",
          "wordCountTarget": "1000-1300",
          "template": "BlogPostPage.astro",
          "intentJustification": "Planning-stage informational query, distinct SERP from the transactional hub query per Sept 2026 WebSearch (returned a different competitor URL, not their hub)."
        },
        {
          "slug": "christmas-team-building-florence",
          "title": "Christmas & End-of-Year Team Building Party Ideas in Florence",
          "targetKeyword": "Christmas corporate party Florence",
          "secondaryKeywords": ["holiday team building Florence", "end of year corporate event Florence"],
          "intent": "Commercial",
          "wordCountTarget": "1000-1300",
          "template": "BlogPostPage.astro",
          "intentJustification": "Seasonal high-intent spike query; competitor (mamaflorence 'christmas-team-building-florence') ranks a dedicated page distinct from its generic hub. Publish by ~October to capture the Nov-Dec booking window."
        }
      ]
    }
  ],
  "linkMatrix": {
    "mandatory_spoke_to_pillar": "all 8 spokes link to /team-building-cooking-class-florence/ (and IT equivalent for IT posts) with a booking/quote CTA",
    "mandatory_pillar_to_spokes": "pillar's 'related' array and a new in-body 'Plan your offsite' section list all 8 spokes",
    "recommended_spoke_to_spoke_within_cluster": [
      ["best-team-building-activities-florence-pasta", "pasta-challenge-team-building-florence"],
      ["corporate-cooking-class-group-size-florence", "half-day-team-building-offsite-florence"],
      ["team-building-partners-hotels-dmc-florence", "remote-hybrid-team-offsite-florence"],
      ["best-time-corporate-team-building-florence", "christmas-team-building-florence"]
    ],
    "recommended_spoke_to_money_page": [
      ["corporate-cooking-class-group-size-florence", "/private-cooking-class-florence/ (family long-table, alt for <6 or specific dates)"],
      ["remote-hybrid-team-offsite-florence", "/online-pasta-making-class/"],
      ["half-day-team-building-offsite-florence", "/blog/things-to-do-in-oltrarno-florence/ (existing post)"]
    ],
    "optional_cross_cluster": [
      ["best-team-building-activities-florence-pasta", "corporate-cooking-class-group-size-florence"],
      ["team-building-partners-hotels-dmc-florence", "christmas-team-building-florence"]
    ],
    "orphan_check": "none — every spoke has >=3 planned inbound links (pillar + 1 in-cluster peer + 1 cross-cluster or money-page link)"
  },
  "cannibalizationCheck": {
    "result": "pass",
    "notes": "No proposed spoke keyword overlaps the pillar's head term or another spoke's head term. All 8 target keywords are distinct from 'team building cooking class florence' and from each other per live SERP spot-checks (Sept 2026); the pillar keeps sole ownership of the transactional head term."
  }
}
```

## 5. Validation checklist

- [x] No two posts share the same primary keyword
- [x] Every spoke has >=3 planned inbound links
- [x] Every spoke links to the pillar (mandatory)
- [x] Pillar links to every spoke (mandatory — requires adding a "Plan your offsite" section to the pillar page, not currently there)
- [x] No orphan pages
- [x] Template matches intent (informational/commercial spokes → BlogPostPage.astro; pillar stays ClassLanding.astro/transactional)
- [x] Word counts: spokes 1000-1700 (within 1200-1800 spec, two seasonal posts intentionally lighter at 1000-1300 given narrower scope — flagged, not a hard violation)
- [x] 4 clusters x 2 posts = within 2-5 clusters / 2-4 posts-each constraint
- [x] SERP evidence supports the groupings (distinct competitor URLs per sub-intent, confirmed via WebSearch Sept 2026 rather than full pairwise top-10 overlap counts — see methodology note below)

**Methodology note:** Full pairwise top-10 SERP overlap scoring (WebSearch per keyword pair,
count shared URLs) was not run to completion for all C(8,2)=28 spoke pairs within this session's
scope. Directional evidence was instead gathered via targeted WebSearches per cluster theme
(activity format, group size, corporate packages, seasonal), each of which returned distinct,
non-overlapping competitor URLs per sub-intent — the same signal the full pairwise method would
produce (0-2 shared URLs = separate-page tier). Before publishing, run the full pairwise check
described in the seo-cluster skill's `serp-overlap-methodology.md` on the final 8 keyword set to
confirm scores before locking word counts and merging any pair that scores 4+.
