# Remaining SEO Tasks — needs your input

Companion to `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md` and `SEO-STRATEGY.md`. Everything
below is what **couldn't be done autonomously** because it needs your data, accounts,
content, or a decision. The items already shipped are listed at the bottom for context.

Last updated: 2026-07-12 — this pass acted on the first real GSC data (23 days live:
2 clicks / 65 impressions / avg position 49.4). Key signal: the **teambuilding cluster is
36% of all listed impressions** ("teambuilding florence food" alone = 13, one-word spelling),
and "private cooking class florence" (7) carries couple-intent the €680 buyout page didn't
answer. Shipped in response:
- Team building pages (EN+IT) retitled around "food teambuilding" / "teambuilding in cucina".
- Where-to-eat post retitled to "The best handmade pasta in Florence" + direct-answer H2
  (5 "best pasta florence" query variants had 0 clicks); mirrored in IT.
- Pasta-shapes post: "types" added (EN), "pasta tipica toscana" (IT).
- Homepage default title de-cannibalized from `/pasta-making-class-florence/`
  (both targeted "pasta making class in florence").
- IT homepage was inheriting the **English** default title — now has its own Italian title/meta.
- Private-class pages (EN+IT): couples FAQ + Chef's Table routing for the
  "private class for two" intent.

**Next GSC checkpoint: ~2026-08-09.** Export with the position column and query+page
dimensions (period-over-period) — that's when striking-distance analysis becomes possible.
R1–R3 (NAP + Google Business Profile) remain the highest-ROI open items: the query mix
(team building, private class, "best pasta") is local-intent, and at domain age ~1 month
the map pack will convert long before page-1 organic does. Also list on
TripAdvisor / GetYourGuide / Airbnb Experiences — both for direct bookings and as the
first authority signals pointing at the domain.

---

## 🔴 Blockers — confirm real business data

### R1. Verify the NAP (name, address, phone) — then update two files
The site currently shows **Via dei Pastai 12, Oltrarno, Firenze** and **+39 344 5204379**.
Two things look like placeholders:
- "Via dei Pastai" literally means "Street of the Pasta-Makers" — confirm it's the real street.
- The phone is shared with `endricerhozi.com` (noted in a code comment), so it may not be a dedicated business line.

**Why it matters:** Google Business Profile, citations, and the `LocalBusiness` schema all
depend on one accurate, identical NAP. Wrong NAP is worse than none.

**What to do:** confirm the real values, then update them in:
- `src/components/Footer.astro` (visible address, `tel:` link, WhatsApp)
- `src/components/Schema.astro` (`telephone`, `address`)
- `src/components/BookingDrawer.astro` (`WHATSAPP_NUMBER`)
- `public/llms.txt`

### R2. Claim & verify your Google Business Profile
Owner action at <https://business.google.com>. This is the **single highest-ROI local SEO
move** — the Maps/local pack is where most Florence cooking-class bookings come from. Use the
exact same NAP as the site. Then add your GBP URL to `sameAs` in `src/components/Schema.astro`.

### R3. Finish the `LocalBusiness` schema (geo + social)
In `src/components/Schema.astro` I left two things out because I can't invent them:
- `geo` coordinates (latitude/longitude of the real kitchen) — get them from Google Maps.
- `sameAs` — your real Instagram / Facebook / TripAdvisor / GBP URLs.

```js
// add inside localBusiness, after openingHoursSpecification:
geo: { '@type': 'GeoCoordinates', latitude: 43.7xx, longitude: 11.2xx },
sameAs: [
  'https://www.instagram.com/your-handle',
  'https://www.google.com/maps/place/your-gbp',
],
```

### R4. Decide what to do with `/edizione` — ✅ Resolved (July 2026): deleted
The design variant was an orphaned prototype (no internal links, fake "dal 1978" heritage).
Removed `src/pages/edition.astro`, `src/components/v2/`, `src/layouts/Edizione.astro`,
`src/styles/edizione.css`, and the sitemap filter in `astro.config.mjs`.

---

## 🟠 Accounts & setup (needs your logins)

### R5. Create the social-share image (OG)
`Layout.astro` currently defaults `og:image` to `/images/cooking-class.jpg` (portrait — works,
but not ideal). Create a branded **1200×630** card at `public/images/og-share.jpg` (logo +
"Pasta-making classes in Florence" + a hero shot), then change the default in
`src/layouts/Layout.astro`:
```astro
image = '/images/og-share.jpg',
```
Matters most because bookings spread via WhatsApp link previews. (I can generate this with the
`seo-image-gen` skill if you want — just ask.)

### R6. Google Search Console
Verify the domain, then submit `https://handmadepastaflorence.com/sitemap-index.xml` (already
generated). Watch indexation + queries. This is how you'll measure everything else.

### R7. Add privacy-friendly analytics
There is **none** today. Add Plausible, Fathom, or Umami (GDPR-friendly, no cookie banner
needed). Drop the snippet into `src/layouts/Layout.astro` `<head>`.

### R8. Confirm host + security headers
I added `public/_headers` (Netlify / Cloudflare Pages format) with safe security headers and
asset caching. **If you deploy on Vercel**, that file is ignored — replicate it in `vercel.json`:
```json
{ "headers": [{ "source": "/(.*)", "headers": [
  { "key": "X-Content-Type-Options", "value": "nosniff" },
  { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
  { "key": "Strict-Transport-Security", "value": "max-age=31536000" }
]}]}
```
Also confirm on the live host: HTTP→HTTPS redirect and a single www / non-www canonical host.

---

## 🟡 Content & trust (needs your words)

### R9. Reviews / social proof
`src/components/Reviews.astro` is wired up but empty (the section auto-appears once populated).
- Start collecting: after each class, send a Google review link by WhatsApp/email.
- Add real reviews to the `reviews` array in that file.
- Then add `Review` + `aggregateRating` to `src/components/Schema.astro`. **Never fabricate these** — Google penalizes fake review markup.

### R10. Expand the FAQ with policy answers
`src/components/Faq.astro` currently answers only facts already on the site (location, length,
group size, gluten-free, hours, online option, how booking works). Add the answers only you
know, then they'll flow into the FAQPage schema automatically:
- Cancellation / rescheduling policy
- Deposit / payment method
- Exact meeting point + parking / transit
- Kids / minimum age, vegetarian & vegan options, dietary specifics

### R11. Name the operators (E-E-A-T)
The Story says "two young Italians and lifelong friends" but names no one. Add first names + a
real photo in `src/components/Story.astro`. For a personal experience brand, named, pictured
hosts are a strong trust + ranking signal.

### R12. Italian-language version + hreflang — ✅ Resolved (July 2026): shipped
Full `/it/` mirror exists (homepage, all 5 landing pages, blog with 5 translated posts)
with hreflang route mapping in `Layout.astro`. Italian queries are already appearing in
GSC ("teambuilding cucina", "pasta toscana tipica", "piatti tipici firenze pasta").

---

## 🟢 Optional polish (I can do these on request — they just weren't clearly "no-input")

### R13. Self-host the fonts — ✅ Resolved (July 2026): done, and it was urgent
The hardcoded `fonts.gstatic.com` URLs had gone **stale and were 404ing** — the brand fonts
weren't loading at all (site rendered in Georgia fallback). Installed
`@fontsource-variable/playfair-display` + `@fontsource-variable/hanken-grotesk`, replaced the
`@font-face` blocks in `src/styles/global.css` with `@import`s, updated `--serif`/`--sans` to
the `… Variable` family names, and removed the `preconnect` from `Layout.astro`. Verified in a
headless browser: fonts load locally from `/_astro/*.woff2`, zero external font requests.

### R14. Real favicon set
Currently an inline emoji SVG (🍝). Add `favicon.ico`, `apple-touch-icon.png` (180×180), and a
`site.webmanifest` in `public/`. Needs a real logo asset.

### R15. Deeper image optimization (responsive `srcset`)
Done already: resized the 893 KB card photo → 128 KB, and added `width`/`height` to every image
(CLS). Still worth doing: move `public/images/` → `src/assets/` and switch the four components to
Astro's `<Image>` for automatic WebP/AVIF + responsive `srcset`. Bigger refactor, so left out.

### R16. Reconsider the View Transitions router
`ClientRouter` adds ~16 KB JS for a 2-page brochure site. If the cross-page animation isn't a
deliberate feature, removing it from both layouts trims JS. Your call.

---

## ✅ Already implemented (done in this pass — no action needed)

| # | What shipped | Files |
|---|---|---|
| 1 | `LocalBusiness` + 4 `Product`/`Offer` JSON-LD (price in search) | `src/components/Schema.astro`, `Layout.astro` |
| 2 | `FAQPage` schema + visible FAQ section (8 Q&A, native accordion) | `src/components/Faq.astro`, `index.astro` |
| 3 | Self-referencing canonical (both layouts) | `Layout.astro`, `Edizione.astro` |
| 4 | Full Open Graph + Twitter cards + `og:url`/`site_name`/`locale` | `Layout.astro` |
| 5 | `@astrojs/sitemap` + `robots.txt` (AI bots allowed, `/edizione` excluded) | `astro.config.mjs`, `public/robots.txt` |
| 6 | `/edizione` set to `noindex, follow` + canonical → home | `Edizione.astro` |
| 7 | Fixed 3 dead `href="#"` links; booking anchors no longer jump | `Footer.astro`, `BookingDrawer.astro` |
| 8 | Visible opening hours + `tel:` click-to-call in footer | `Footer.astro` |
| 9 | Resized 893 KB → 128 KB hero-card image | `public/images/cooking_class_with_guests_in_picture.webp` |
| 10 | `width`/`height` on all 10 images (CLS) + descriptive card alt text | `Hero/Experiences/PastaGallery/OnlineBand.astro` |
| 11 | Font `preconnect` to gstatic (interim perf) | `Layout.astro` |
| 12 | Security headers + asset caching | `public/_headers` |
| 13 | Custom branded 404 page | `src/pages/404.astro` |
| 14 | `llms.txt` for AI engines | `public/llms.txt` |

Build verified clean (3 pages), all 6 JSON-LD blocks valid, no console errors.
Estimated health score after this pass: **~54 → ~78**, rising to **mid-80s** once the
blockers above (NAP/GBP, OG image, reviews) are done.
