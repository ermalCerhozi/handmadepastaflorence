# Visual / Mobile Rendering Audit — handmadepastaflorence.com
Date: 2026-09-03
Method: Playwright (Chromium), desktop viewport 1920x1080 and mobile viewport 375x812 (iPhone UA, touch enabled), against the live production site.

Pages tested:
- Home — `/`
- Landing page — `/pasta-making-class-florence/`
- Blog post — `/blog/how-to-choose-a-pasta-class-in-florence/`

Screenshots saved to `handmadepastaflorence.com-audit/screenshots/`:
- `home-desktop.png`, `home-mobile.png`, `home-mobile-nav-open.png`
- `landing-pasta-class-desktop.png`, `landing-pasta-class-mobile.png`, `landing-pasta-class-mobile-nav-open.png`
- `blog-post-desktop.png`, `blog-post-mobile.png`, `blog-post-mobile-nav-open.png`
- `*-full.png` variants are full-page captures for each of the above
- `home-mobile-scrolled-fab.png`, `home-mobile-fab-debug.png`, `home-mobile-fab-after-deepscroll.png` — floating CTA investigation

---

## 1. Mobile header nav — RESOLVED (previously CRITICAL, 2026-08-08 audit)

**Status: FIXED.** The mobile nav bug from the prior audit is no longer present.

- A `button.hdr__burger` (aria-label="Menu") is present in the DOM on every page tested, sized 40x40px, `display:flex`, fully visible — not 0x0.
- Tapping it toggles `.hdr__nav` from `display:none` to `display:flex`, revealing a full-width dropdown panel (375x304px) with 5 links: **Classes, Pasta Shapes, Our Story, For Business, Guides**.
- Each link row is 335x54.8px — well above the 48x48px minimum touch-target guideline.
- Verified identically on home, the `/pasta-making-class-florence/` landing page, and the blog post — the bug is fixed sitewide, not just on the homepage.
- Evidence: `home-mobile-nav-open.png`, `landing-pasta-class-mobile-nav-open.png`, `blog-post-mobile-nav-open.png`.

No further action needed here. Recommend adding a Playwright regression test (click burger → assert nav links visible) to CI/pre-deploy checks so this class of regression can't reappear silently, since it previously shipped to production undetected.

**Minor (Low) polish note:** the dropdown panel has no scrim/backdrop behind it — the hero image is still faintly visible/scrollable behind the open menu. Not a functional bug, but a background overlay (semi-opaque scrim) would improve focus and prevent accidental taps on content behind the menu.

---

## 2. Floating "Book now" CTA — verified working as designed (not a bug)

Initial automated testing flagged the floating CTA (`.fab__btn`, "Book now") as unclickable ("element is outside of the viewport" in Playwright). Investigation showed this is an **intentional scroll-triggered reveal**, not a defect:

- Near the top of the page the `.fab` container sits at `position: fixed; bottom:0` but is pushed off-screen via `transform: translateY(140px)` and `opacity:0` — invisible by design so it doesn't compete with the hero's own inline CTAs.
- By ~1500px of scroll depth it animates in (`opacity` → 1, `transform` → none) and remains visible, pinned flush to the bottom of the viewport (bottom edge sits exactly at 812px, no overflow, no overlap with page content) through at least 4000px of scroll.
- Clicking it opens a booking drawer (`[data-booking]`, `role="dialog"`) as expected.

**Recommendation (Low):** the reveal only triggers after ~1500px of scroll. On the homepage this is fine since a primary "Book a pasta class" CTA is already visible above the fold in the hero (see below). On shorter pages this floating CTA may never appear before the user reaches the page's own inline CTA/footer — worth confirming intent, but not a blocking issue since redundant CTAs exist elsewhere on every page tested.

There is **no WhatsApp floating widget** on the site — the only WhatsApp touchpoint found is a text link in the footer (`a.ft__wa`, `wa.me/393445204379`). If a WhatsApp chat bubble was expected/planned per prior audit notes, it does not currently exist; this is a product decision to confirm with the user, not a bug found in code.

---

## 3. Above-the-fold content

**Home (mobile):** H1 ("Flour, eggs, and your two hands."), subhead, and two CTAs ("Book a pasta class", "See the classes") are all visible without scrolling. Header + eyebrow line + H1 + CTA all fit inside the 375x812 viewport. Good.

**Landing page `/pasta-making-class-florence/` (mobile):** Breadcrumb, eyebrow, H1 ("A pasta making class in Florence, around one table."), subcopy, and a prominent yellow "Book this class" CTA are all visible above the fold. Good hierarchy, strong contrast against the dark background image.

**Blog post (mobile):** Breadcrumb, H1, byline/date, and the top of the hero image are visible above the fold; body copy begins just below the fold. This is normal/expected for a long-form article and not an issue.

**Desktop (all 3 pages):** Full hero with clear H1, subcopy, and CTA are visible in the 1920x1080 viewport with no scrolling. No layout shift observed between initial paint and 800ms settle.

---

## 4. Mobile responsiveness / layout

- No horizontal scroll detected on any of the 3 pages tested (`document.documentElement.scrollWidth` === `window.innerWidth` === 375 in all cases).
- No console errors logged during page load on any page/viewport combination tested.
- Calendar prev/next nav buttons (`.cal__nav`) on the home page render at 0x0 with `display:block` — these appear to be zero-size wrapper/icon buttons; worth a quick manual check that the calendar widget's month navigation is still tappable (its icon child may carry the actual hit area). Flagging as **Low/needs-verification** since it wasn't the focus of this pass and the 0x0 outer button pattern is visually identical to what caused the original nav bug.

---

## Summary table

| Item | Severity | Status |
|---|---|---|
| Mobile header nav (hamburger + links) sitewide | Critical (prior) | **Fixed** — verified on 3 pages |
| Floating "Book now" CTA reachability | — | **Not a bug** — scroll-reveal works as designed |
| No WhatsApp floating widget (only footer link) | Info | Confirm intent with stakeholder |
| Nav dropdown has no backdrop scrim | Low | Recommend adding scrim for polish |
| `.cal__nav` prev/next buttons measure 0x0 | Low | Spot-check tap target manually |
| Above-the-fold H1/CTA on mobile & desktop | — | Pass on all 3 pages tested |
| Horizontal scroll / console errors | — | None found |

## Recommendation

Add an automated Playwright check (mobile viewport: click `.hdr__burger`, assert `.hdr__nav` links are visible and have hrefs) to the deploy pipeline to prevent the header-nav regression from recurring undetected, as it apparently did before the 2026-08-08 finding.
