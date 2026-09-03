# Performance / Core Web Vitals Audit — handmadepastaflorence.com

**Date:** 2026-09-03
**Method:** Lab data via local Lighthouse 13.4.1 CLI (`npx lighthouse`) run directly against the live production URL, mobile (default Moto G throttling, simulated) and desktop (`--preset=desktop`, simulated). PSI API v5 (which would add CrUX field data) returned `PSI rate limit exceeded (240 QPM / 25,000 QPD)` on the configured key — no field data available this run. All findings below are lab-only; recommend re-running `pagespeed_check.py` later to cross-check against 28-day CrUX field data.

## Performance Category Score: **80 / 100**

Lighthouse category scores (metric-based, not re-weighted in v13): **Mobile 90/100**, **Desktop 99/100**. The blended score below the raw mobile Lighthouse number reflects that (a) Google evaluates mobile at the 75th percentile in the field, where this page's LCP sits right at the "Needs Improvement" boundary, and (b) TBT/forced-reflow findings indicate real-world INP risk that a single lab run understates.

## Infrastructure Check (vs. sister site endricerhozi.com)

**handmadepastaflorence.com does NOT share the TTFB problem noted on endricerhozi.com.** Server response time measured at **38-40 ms** (root document, `server-response-time` / `document-latency-insight` audits) on both mobile and desktop runs, well under the 200ms "Good" TTFB bar and nowhere near the 1.5-5.3s the sister site exhibits. `network-rtt` ~37ms, `network-server-latency` ~28ms — consistent with a fast, geographically-close origin response, not a CDN-fronted profile, but not the bottleneck it is on the sister site. Text compression is applied (`usesCompression: true`). No redirects on the root document. **Conclusion: hosting/TTFB is not a priority fix here** — the sister site's CDN gap does not appear to be replicated on this domain's response path (server responds well even without a CDN in front of it). Not verified from the nginx config directly (no server access in this session); recommendation below is to confirm CDN status but deprioritize vs. the LCP/INP issues found.

## Core Web Vitals Summary (Lab, mobile — primary signal)

| Metric | Value (Mobile) | Value (Desktop) | Threshold (Good) | Status |
|---|---|---|---|---|
| LCP | **2.52s** | 2.45s (observed trace) | ≤2.5s | ⚠️ Borderline / Needs Improvement (mobile sits at the boundary) |
| CLS | **0.004** | 0.000 | ≤0.1 | ✅ Pass (prior hero-image width/height fix confirmed effective) |
| INP | Not directly measurable in lab (no real user interaction) | — | ≤200ms | ⚠️ Use TBT as proxy |
| TBT (INP proxy) | **320ms** | 3ms | — | ⚠️ Elevated on mobile — correlates with INP risk in the field |
| TTFB | **38ms** (origin) / 628ms (full metric incl. simulated network) | 40ms origin / 191ms | ≤200ms (origin) | ✅ Pass |
| Total page weight | 758 KiB (26 requests) | 1,130 KiB | — | Reasonable |
| DOM size | 640 elements | — | <1,500 | ✅ Pass |

## Findings by Severity

### HIGH — Global scroll-reveal animation delays LCP paint on every page, including above-the-fold hero text
- **Evidence:** `lcp-breakdown-insight` shows the LCP element is `section#top > h1.hero__title > span` ("and your two…" — the hero headline text, not an image). Breakdown: TTFB 328ms + **element render delay 1,809ms** (mobile) / TTFB 128ms + **element render delay 2,326ms** (desktop). Element render delay is ~72-95% of total LCP.
- **Root cause:** `src/styles/global.css` (`[data-reveal]` rule) sets `opacity:0; transform:translateY(34px)` with a 0.9s transition on every `[data-reveal]` element site-wide. `src/layouts/Layout.astro` (lines ~130-150) uses `IntersectionObserver` to add `.is-in` and trigger the reveal — but this runs for **all** `[data-reveal]` elements, including ones already in the initial viewport (hero eyebrow, title spans, lede, CTAs, proof list in `src/components/Hero.astro`, lines 31-52). The hero title spans additionally have per-element `--reveal-delay` inline styles of 80ms/220ms/360ms/440ms, stacking with the 0.9s transition and JS/observer round-trip before the browser can paint the LCP text.
- **Impact:** This is the single largest lever on this page's LCP. It affects every page that reuses `data-reveal` on above-the-fold content (grep shows it used in Hero, Story, WhyUs, Experiences, Reviews, Faq, B2b, ClassLanding, PastaGallery, OnlineBand, Footer, and blog/shape templates — i.e., site-wide).
- **Recommendation:** Exempt above-the-fold hero elements from the reveal-on-load pattern (they should render immediately, not "reveal in" — there's nothing to scroll to reveal on first paint). Either (a) drop `data-reveal` entirely from the hero title/eyebrow/lede/CTA in `Hero.astro`, or (b) add a fast-path in `Layout.astro` that immediately adds `.is-in` to any `[data-reveal]` element already intersecting the viewport at `DOMContentLoaded`/first paint instead of waiting on the async `IntersectionObserver` + CSS transition-delay chain, or (c) reduce the transition duration/delay drastically for the hero specifically. Keep the scroll-reveal effect for below-the-fold sections where it's a legitimate UX choice. **Expected impact: LCP could drop from ~2.5s to well under 1s** (FCP is already 1.6s mobile / 0.5s desktop, so the text is ready to paint — it's being deliberately hidden).

### MEDIUM — Unoptimized/oversized images (site-wide, not just hero)
- **Evidence:** `image-delivery-insight` flags **248 KiB of potential savings**. Worst offenders:
  - `aperitivo…webp` — 187KB actual, **158KB wasted**: intrinsic 800×601 served/displayed at 369×492 on mobile (no responsive `srcset`), plus under-compressed.
  - `hands-on-pasta-cooking-class-florence-group…webp` — 104KB, **74KB wasted** (oversized for display box).
  - `private-pasta-class-long-table-florence-agriturismo…webp` — 21KB, 10KB wasted.
  - `images/logo.png` — 6KB, fully wasted (should be SVG or a properly-sized WebP).
  - Total image transfer on mobile: **597 KiB across 12 images** — the single largest resource category (77% of the 758KB page weight).
- Note: this is a *different* set of images than the hero image fixed in the 2026-08-08 audit — these are card/gallery images in the Experiences and Story sections further down the page, so they don't affect LCP directly but do compete for bandwidth/CPU during the critical rendering path and hurt Speed Index (2.47s) and INP-adjacent main-thread work.
- **Recommendation:** Generate responsive `srcset`/`sizes` (Astro's built-in `<Image>`/`getImage()` can auto-generate multiple widths) for all non-hero content images, and re-run compression at the actual display resolution. Expected savings: ~250KB (~33% of total page weight), improving Speed Index and mid-scroll interaction cost.

### MEDIUM — Elevated Total Blocking Time / forced synchronous reflow (INP risk proxy)
- **Evidence:** TBT = 320ms on mobile (Lighthouse "needs improvement" territory as an INP proxy; desktop TBT is only 3ms, so this is a mobile-CPU-constrained issue, not third-party scripts — the `third-parties-insight` audit found **zero** third-party requests, so no third-party script blame here). `forced-reflow-insight` flags layout thrashing: `Header.astro` inline script **177ms** total reflow time, `Hero.astro` script **31ms**, plus smaller contributions from `PastaGallery.astro` and `BookingDrawer.astro` scripts.
- **Recommendation:** Audit `Header.astro`'s script for reads/writes interleaved with layout properties (e.g., reading `offsetHeight`/`getBoundingClientRect` immediately after a DOM mutation) — batch reads before writes, or use `requestAnimationFrame`. The Hero parallax script (`Layout.astro` line ~154, "Hero parallax (flour-dusted table)") is a likely scroll-handler contributor; verify it's throttled/using `requestAnimationFrame` rather than firing on every `scroll` event. This is real field-INP risk since it's core, unconditional site JS (loads on every page) rather than a deferrable third party.

### LOW — Non-optimal web font delivery
- **Evidence:** `GoldenHills.ttf` is served as a raw **TTF at 47KB** (`VeryHigh` priority, blocks in the critical chain per `network-dependency-tree-insight`) while the other two fonts are properly served as WOFF2 (`playfair-display` 39KB, `hanken-grotesk` 35KB — could still be subset further). `font-display-insight` shows no wasted time currently (display strategy is fine), but TTF is ~30-40% larger than an equivalent WOFF2 for the same glyph set.
- **Recommendation:** Convert `GoldenHills.ttf` to WOFF2 (drop-in replacement, same rendering, smaller download) and confirm `font-display: swap` (or `optional`) is set. Low effort, modest byte savings, but it's the highest-priority font in the request chain so shaves a bit off both LCP-adjacent network contention and total transfer.

### INFORMATIONAL — Confirmed passes
- CLS 0.004/0.000 — the prior audit's width/height + hero-image resize fix is working correctly; no layout-shift issues detected (`cls-culprits-insight` total score 0.004, negligible).
- Render-blocking resources: none detected.
- Unused CSS/JS: none detected (0 wasted bytes both audits) — good build hygiene, Astro's islands architecture is keeping JS minimal (22.8KB across 9 small per-component scripts, mobile).
- DOM size: 640 elements, well under the 1,500-element risk threshold.
- No third-party scripts loaded on this page at all — nothing to defer/lazy-load there.
- HTTPS, no redirect chains, text compression enabled, no duplicated/legacy JS.

## Prioritized Recommendations (by expected impact)

1. **[HIGH]** Fix the `data-reveal` reveal-on-load pattern for above-the-fold hero content in `src/components/Hero.astro` / `src/layouts/Layout.astro` / `src/styles/global.css` — expected to bring mobile LCP from ~2.5s down to ~1s+ range, moving it firmly into "Good."
2. **[MEDIUM]** Add responsive `srcset`/`sizes` and re-compress the Experiences/Story-section gallery images (`aperitivo`, `hands-on-pasta-cooking-class-florence-group`, `private-pasta-class-long-table-florence-agriturismo`) — ~250KB savings, improves Speed Index and mid-page interaction cost.
3. **[MEDIUM]** Investigate and fix forced-reflow sources in `Header.astro`'s inline script and the hero parallax scroll handler — reduces TBT (320ms mobile) and lowers real-world INP risk.
4. **[LOW]** Convert `GoldenHills.ttf` to WOFF2.
5. **[VERIFY, LOW PRIORITY]** Confirm whether handmadepastaflorence.com sits behind a CDN/edge cache at the nginx layer (no server access this session) — current TTFB (38-40ms) is already excellent so this is not urgent, but worth confirming resilience under real traffic load and geographic distance for non-Italy visitors, given the sister site's CDN gap.

## Data Sources
- Lighthouse 13.4.1 CLI JSON reports (mobile + desktop, simulated throttling, live URL) — saved locally in scratchpad during this session, not persisted to repo.
- `claude-seo run pagespeed_check.py` — attempted, blocked by PSI API rate limit (`240 QPM / 25,000 QPD` exceeded); no CrUX field data obtained this run.
