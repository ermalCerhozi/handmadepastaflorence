# GSC analysis, 31 Oct 2026

Window: 20 Sept – 31 Oct 2026 (42 days), web search only.
Exports: `seo/data/gsc-2026-10-31.xlsx` and `seo/data/gsc-ai-features-2026-10-31.xlsx`.
Re-run with `python seo/analyze.py clusters` (now defaults to the newest export).

Delta on `gsc-2026-10-13-analysis.md`. Its action list was mostly executed: the two
301s are in `ops/nginx/handmadepastaflorence-redirects.conf`, the markets→market-tour
and comparison-post links exist. Still open: the three offerings (O1 groups 15+,
O2 cheese, O3 multi-day) and `src/data/reviews.ts`, which still holds zero reviews.

## 1. Totals, and the protest distortion

814 clicks / 30,588 impressions / 2.66% CTR / position 8.4.

| week ending | clicks | impr | CTR |
|---|---|---|---|
| 27 Sept | 81 | 3,784 | 2.14% |
| 4 Oct | 91 | 3,875 | 2.35% |
| 11 Oct | 100 | 4,172 | 2.40% |
| 18 Oct | 112 | 4,975 | 2.25% |
| 25 Oct | 114 | 5,930 | 1.92% |
| **1 Nov** | **306** | **7,196** | **4.25%** |

Daily clicks ran 10–20 through 25 Oct, then 39 → 51 → 56 → 74 → 76 on 26–30 Oct.
That last week is the protest post: 457 impressions / 57 clicks / 12.5% CTR in the
query table, and ~203 clicks across the five protest locales in the page table.
Roughly a quarter of the window's clicks come from one timely post that decays to
zero. **Judge the next export on the commercial clusters, not the total, which will
fall.**

## 2. Intent clusters

`analyze.py clusters`, 6,495 impressions above the privacy threshold:

| cluster | queries | clicks | impr | pos | CTR |
|---|---|---|---|---|---|
| shapes-glossary | 210 | 5 | 1,256 | 7.8 | 0.40% |
| where-to-eat | 71 | 35 | 1,124 | 9.9 | 3.11% |
| pasta-florence-head | 49 | 15 | 866 | 11.8 | 1.73% |
| **class-core** | 69 | 4 | 761 | **28.7** | 0.53% |
| **team-building** | 21 | **0** | 675 | 15.5 | 0.00% |
| buy-takeaway | 72 | 5 | 252 | 9.6 | 1.98% |
| **multi-day-holiday** | 27 | 0 | 128 | **48.7** | 0.00% |
| flour-recipe | 41 | 0 | 121 | 15.0 | 0.00% |
| **kids-family** | 9 | 1 | 106 | **78.5** | 0.94% |
| dietary | 12 | 2 | 81 | 30.3 | 2.47% |
| **group** | 2 | 0 | 38 | **87.6** | 0.00% |
| cheese-tasting | 2 | 0 | 17 | 13.6 | 0.00% |

Informational clusters sit at position 7–10. Every commercial cluster sits at 28–88.
The site ranks for everything except what it sells.

## 3. Page type by locale

| | clicks | impr | CTR | pos |
|---|---|---|---|---|
| **landings / en** | 18 | 1,107 | 1.6% | **38.0** |
| landings / de | 12 | 407 | 2.9% | 23.1 |
| landings / it | 16 | 445 | 3.6% | 15.0 |
| landings / fr | 8 | 302 | 2.6% | 11.5 |
| blog (all) | 687 | 21,228 | 3.2% | ~7.5 |
| shapes (all) | 33 | 6,773 | 0.5% | ~7 |

## 4. Countries: the US is the outlier

| | clicks | impr | CTR | pos |
|---|---|---|---|---|
| Italy | 381 | 13,012 | 2.93% | 7.70 |
| France | 116 | 2,723 | 4.26% | 7.22 |
| Germany | 101 | 4,143 | 2.44% | 8.99 |
| **United States** | **42** | **3,040** | **1.38%** | **16.32** |
| United Kingdom | 20 | 1,108 | 1.81% | 7.78 |

Every market is at 6–9 except the US at 16.3. Per the Sept finding that ~80% of real
bookings are US/AU/UK, the worst-ranking market is the one that pays. The US skew is
the commercial cluster showing up as a geography: US searchers use the
`* cooking class florence` patterns that sat at position 60–90.

## 5. Root cause found and fixed: a title and anchor collision

`/private-cooking-class-florence/` was the worst asset on the site: **446
impressions, 0 clicks, position 70.8**, 40% of all EN landing impressions, while its
FR twin ranked 7.6 and its IT twin 9.8.

The page was branded **"The Family Long-Table"** in all five locales, in the title,
the eyebrow, the image alt, the body, the FAQs and `product.name`, plus ~90 inbound
anchor strings across `landings.ts`, `src/i18n/locales/*.ts` (including the homepage
Experiences card and homepage FAQ), the cost blog post and `booking-policy.astro`.
Google read it as the family page and ranked it there:

| query | impr | pos |
|---|---|---|
| family cooking class florence | 97 | **85.0** |
| group cooking class florence | 35 | **88.8** |
| pasta cooking class florence | 25 | **83.0** |
| private cooking classes florence | 39 | 64.6 |
| private cooking class florence | 48 | 59.1 |

`/family-cooking-class-florence/` got **5 impressions** meanwhile. EN and DE, where
the family word was the strongest modifier, are exactly the two locales whose
landings ranked 38.0 and 23.1; FR and IT survived at 11.5 and 15.0.

Fixed: renamed to The Long-Table Feast / Il Lungo Tavolo / La Longue Table / Die
lange Tafel / 长桌盛宴, with the inbound anchors rotated across four natural variants
per locale instead of ~13 identical ones.

A second instance of the same pattern turned up when the cannibalisation check was
re-run: the DE team-building title read *"Teambuilding Florenz: Privater Kochkurs
für 6–14 Personen"*, carrying the DE private page's exact primary keyword. Now
*"Private Küche"*, mirroring the EN title.

## 6. AI Mode is 10% of impressions and quadrupled in the window

3,170 AI-feature impressions, 45/day on 20 Sept rising to 185/day on 30 Oct.
Desktop is 43% of AI impressions against 21% of ordinary ones.

Google's structured AI Mode travel prompts appear verbatim in the query data, which
is the most useful thing in this export. Three personas: *"group activities multiple
people"* (×7), *"for couples with my husband or wife or partner or boyfriend or
girlfriend"* (×4), *"kid-friendly"*. Their questions: how long classes last, what
dishes are taught, whether they suit beginners, what you can learn, where to book.
Price asked in four languages, including *"detail pasta making class options by
comparing their average pricing"*. Competitors named inside the prompts: *pastamania*
(×3), *confetti vs chef-led cooking class vendors*, *mama florence* (50 impr, pos 48.7).

`/blog/what-is-open-in-florence-on-public-holidays/` is the **top AI surface** (329 AI
impressions) and AI is using it as a conversational date lookup. The follow-up
fragments are in the data: *"ma oggi?"*, *"et pour aujourd'hui ?"*, *"what about the
25th?"*, *"et le 26?"*, *"how about the 28th?"*, *"próximos dias?"*, *"over christmas
period"*, *"ist heute alles geschlossen?"*, *"qual è il giorno di chiusura"*.

## 7. Verified orphaned demand: the cheese masterclass

*"masterclass on cheese in florence enjoy a whole cheese board"* (pos 56) and the
German *"meisterkurs über käse in florenz genießen sie ein ganzes käsebrett"* (16
impr, **pos 10.9**) are the exact title of Viator product `d519-100039P2`, which is
**no longer bookable** (checked live, 31 Oct). People are searching a dead product
and HMPF already ranks top of page two on the German title with no cheese page.
This is now the best-evidenced of the three queued offerings.

## 8. What was changed this round

All five locales for every item.

- **Private page de-cannibalised** (§5), plus the DE team-building title.
- **Hub titles and H1s** now lead with the head term. `/de/kurse/` was position 50.5
  on 73 impressions with a title starting "Alle unsere Kurse", so *Kochkurs Florenz*
  could not match. Now "Kochkurse in Florenz: alle Kurse und Preise".
- **Small-group FAQ** on the pasta-making landing, for *group cooking class florence*
  (pos 88.8) and *small group italian cooking class in florence* (pos 72.7). The
  Chef's Table is max 8, so it is the honest answer; bigger groups route to private
  and team-building.
- **AI Mode coverage** on `how-to-choose-a-pasta-class-in-florence`: a persona table
  mapping AI's three personas onto the landings, a "where can you book" section, and
  four FAQs using AI Mode's own wording (5 → 9 FAQPage entries).
- **Price comparison table** on the cost post, for the "compare average pricing"
  prompt.
- **Holiday date table** on the public-holidays post: 14 dated rows, Dec 2026 to Aug
  2027, compressed only from what the page already stated. Cells say "not published
  in advance" rather than inferring a status. The duplicate bullet list was removed.
- **Pici vs tonnarelli FAQ** on the pici spoke, new in this window
  (*differenza tra pici e tonnarelli* 22 impr pos 10.0).
- **New post:** `agriturismo-cooking-class-tuscany-what-to-expect`, feeding
  `/agriturismo-cooking-class-tuscany/`. The multi-day-holiday cluster is 128
  impressions at position 48.7 and the landing had no supporting content.
- **Internal links out of the top post.** `where-to-eat-handmade-pasta-in-florence`
  is 7,219 impressions and 214 clicks across four locales and sent 9 in-body links
  to the 0.5%-CTR glossary against 4 to offerings. Tagliatelle, ravioli and
  pappardelle were each linked twice; the prose duplicates are unlinked and the
  "what to order" list keeps its links. Added family and class-for-two links. FR and
  ZH turned out never to have linked shapes from that list at all, so they are now
  at parity with EN/DE/IT.
- **`analyze.py`** auto-selects the newest `seo/data/gsc-*.xlsx`.

## 9. Checked and deliberately not changed

- **The "tipica / known for" cluster.** *pasta tipica toscana* (41 impr, pos 9.1),
  *what pasta is florence known for* (43, pos 8.6) and six variants already have
  dedicated FAQs on `tuscan-pasta-shapes-guide` and rank 8–11. They need authority,
  not more copy. No new post.
- **"greve florence"** (30 impr, pos 7.3), which looked like Greve in Chianti. It is
  French/Portuguese *grève*, strike: it appeared new in the protest window, sits in
  the protest page's position band, "greves" appears too, and there are zero
  Chianti, Panzano or Radda queries. Not a day-trip opportunity.
- **The family landing's copy.** Its six FAQs already cover minimum age, child price,
  hands-on, knife safety, boredom and allergies. The page's problem was 5
  impressions caused by §5, not thin content.
- **Private chef.** *private chef florence* (pos 59.6) and two variants hit HMPF, but
  `grep` finds no private-chef wording anywhere in `src/`. Nothing competes with
  endricerhozi.com; the overlap is semantic. No action.
- **The glossary.** 6,773 impressions for 33 clicks. The shape pages already end in a
  booking CTA, so this is a zero-click SERP, not a conversion problem. They earn AI
  citations; that is the job now.
- **Pasta to go.** 252 impressions over 72 queries, but the owner's call this round
  is content only. `where-to-buy-fresh-pasta-in-florence` keeps harvesting it at 8.1.

## 10. Still blocked on the owner

`seo/owner-questions-2026-10-13.md` is unanswered. See
`seo/owner-questions-2026-10-31.md` for the short re-chase: O2 cheese (best evidence
of the three now), O1 groups of 15+, and real reviews for `src/data/reviews.ts`.

## 11. Next export

Recheck around **26 Nov 2026**. Success looks like:

- EN landings off position 38, moving toward the FR/IT 11–15 band
- `/private-cooking-class-florence/` off 70.8
- `/family-cooking-class-florence/` above 5 impressions
- the `kids-family` (78.5) and `group` (87.6) clusters moving at all
- `/de/kurse/` off 50.5

Total clicks will drop as the protest post decays. That is expected and is not a
regression.
