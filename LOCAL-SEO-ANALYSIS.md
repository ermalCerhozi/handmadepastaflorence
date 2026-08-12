# Local SEO Analysis — handmadepastaflorence.com & endricerhozi.com

Run: 12 August 2026 · via `/seo-local` · no DataForSEO, no GBP API (see Limitations)

---

## Scores

| | handmadepastaflorence.com | endricerhozi.com |
|---|---|---|
| GBP Signals (25%) | **0 / 25** | 0 / 25 |
| Reviews & Reputation (20%) | **0 / 20** | 0 / 20 |
| Local On-Page (20%) | 15 / 20 | 16 / 20 |
| NAP & Citations (15%) | **4 / 15** | 7 / 15 |
| Local Schema (10%) | 6 / 10 | **9 / 10** |
| Local Links & Authority (10%) | 1 / 10 | 3 / 10 |
| **Total** | **26 / 100** | **35 / 100** |

**Business types:** HPF = brick-and-mortar (cooking school / tourist attraction). Endri = Service Area Business (private chef, Tuscany).

Both score low for the same two reasons — no Google Business Profile and no reviews — which together are 45% of the model. Everything else is comparatively healthy.

---

## The finding that blocks everything else

**The street address in your LocalBusiness schema could not be verified.**

`Via dei Pastai 12, Firenze` is published in HPF's structured data and in the page footer. A web search returned no evidence this street exists in Florence, and your own `GEO-ANALYSIS.md` already carries the note *"verify the Via dei Pastai 12 address is real."* It remains unverified. The name translating to "Street of the Pasta Makers" is, at minimum, a coincidence worth checking.

Why this is the top item rather than a footnote:

1. **Google Business Profile verification is postal.** Google mails a postcard with a PIN to the address. An address that doesn't exist cannot be verified, so GBP — 25% of this scoring model and the single largest local ranking factor — stays permanently out of reach.
2. **Fabricated addresses in LocalBusiness schema are a policy violation,** not just an SEO weakness.
3. **Everything downstream depends on it:** citations (Yelp, Apple, Bing Places, TripAdvisor) all require a consistent, real NAP. Building citations on a wrong address means redoing all of them later.

If the address is real, the fix is small: confirm the postcode and add `geo`. If it's a placeholder, **stop all local work until the real address is in place** — every hour spent on citations before then is wasted.

---

## NAP consistency — a second, separate problem

Both businesses publish **the same phone number**:

| | Address | Phone |
|---|---|---|
| Handmade Pasta Florence | Via dei Pastai 12, Firenze | `+39 344 5204379` |
| Endri Cerhozi (private chef) | Montespertoli, 50025 Tuscany | `+39 344 5204379` |

One number across two business names at two addresses is a classic entity-conflation trigger. Google may merge the two into one listing, treat one as a duplicate, or attach reviews to the wrong entity. It also makes Apple/Bing/Yelp submissions ambiguous.

This is a business decision, not a code fix. The clean options are a second number for HPF, or an explicit decision that HPF is a *brand of* Endri's business and modelling it that way in schema (`parentOrganization` / `brand`).

---

## Where the two sites diverge

`endricerhozi.com` is meaningfully more mature on local signals, and HPF should copy it:

| Signal | HPF | Endri |
|---|---|---|
| Schema subtype | `LocalBusiness` + `TouristAttraction` | `LocalBusiness` + `ProfessionalService` ✅ correct for SAB |
| `geo` coordinates | ❌ absent | ✅ present |
| `sameAs` (social graph) | ❌ none for the business | ✅ Instagram, Facebook, LinkedIn |
| `areaServed` | ✅ | ✅ |
| `postalCode` | ❌ absent | ✅ 50025 |
| `tel:` click-to-call | ✅ | ✅ |
| Map embed | ❌ | ❌ |

### Fixed in this run
HPF's `founder` entity now carries Endri's full verified profile set (site + Instagram + Facebook + LinkedIn) rather than the bare domain. That is the only externally verifiable entity signal HPF currently has, and three of the top five AI-visibility factors are citation/entity-based. Copied from what Endri already publishes — nothing invented.

### Not fixed, because it needs real data
- **`geo` coordinates** — requires the real address first. Do not guess; wrong coordinates are worse than none.
- **`postalCode`** — same dependency.
- **HPF `sameAs`** — the business has no social profiles of its own yet. Nothing to link.

---

## Prioritised actions

**Critical**
1. **Confirm whether `Via dei Pastai 12` is a real, deliverable address.** Everything below is blocked on this. If not real, replace it before doing anything else.
2. **Resolve the shared phone number** between the two businesses.

**High**
3. **Create the Google Business Profile** once (1) is settled. Primary category matters more than any other single local factor — for a cooking school, `Cooking class` is the likely primary, not `Restaurant`.
4. **Build the review engine.** The skill's "18-day rule" is blunt: rankings slide if three weeks pass with no new review. Ten reviews is the threshold where the listing starts behaving normally. You have zero. The WhatsApp thread you already have every guest in is the cheapest possible mechanism.
5. **Claim Bing Places.** It powers ChatGPT, Copilot and Alexa — and ChatGPT does not read GBP at all. Given ChatGPT converts local intent at ~16% versus Google organic at ~1.8%, this is disproportionately valuable for a business with no organic foothold.

**Medium**
6. Claim Apple Business Connect (usage doubled to 27% of consumers).
7. Add `geo` (5+ decimals) and `postalCode` once the address is confirmed.
8. Add a lazy-loaded map embed to the class pages.
9. Get onto the platforms ChatGPT actually sources from: TripAdvisor, Yelp, Reddit.
10. Pursue "best of Florence cooking class" list placements — the #1 AI-visibility citation factor, and the roundups already dominating your target SERP (Cookly, Florence Insider, Journey of Doing) are exactly those lists.

---

## Limitations

- **No GBP API and no DataForSEO** this session: could not check real GBP category, photos, posts, Insights, or live local-pack position.
- **No geo-grid rank tracking** — cannot say where either business ranks by distance from the centre.
- **Citation audit was not run.** Checking Yelp/BBB/TripAdvisor presence is pointless while the NAP itself is unconfirmed; it would only measure consistency against a possibly-wrong address.
- **Address verification was a web search, not an authoritative source.** Absence of evidence is not proof the street doesn't exist — check the Comune di Firenze street register or simply confirm with Endri.
- Scores are the skill's weighting model applied to observable page/schema signals only; they are not a Google metric.
