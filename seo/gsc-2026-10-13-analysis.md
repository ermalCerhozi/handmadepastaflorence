# handmadepastaflorence.com: GSC analysis, 12 Jul to 12 Oct 2026

Source: GSC UI export `seo/data/gsc-2026-10-13.xlsx` (web search, 93 days). The numbers are
reproducible with `python seo/analyze.py summary|pages|clusters [cluster]`.

## 0. Read this first: what the data can and cannot tell us

- **632 clicks, 33,359 impressions, 1.89% CTR.** The 1,000-query table accounts for only
  **100 of those clicks (16%)**. The other 84% come from anonymised long-tail queries. Cluster
  CTRs below are therefore understated, and page-level clicks are the more reliable signal.
- This export overlaps the 7 Oct export on 87 of 93 days, so the cluster deltas in §2 reflect about
  six days of change. They are a sanity check, not a trend.
- There is no query-to-page data, because the GSC MCP connector still does not include this
  property (re-checked today). Any claim of the form "page X ranks for query Y" is inferred.

## 1. Headline

| week ending | clicks | impressions | CTR |
|---|---|---|---|
| 14 Sep | 55 | 3,044 | 1.81% |
| 21 Sep | 77 | 3,487 | 2.21% |
| 28 Sep | 81 | 3,784 | 2.14% |
| 5 Oct | 91 | 3,875 | 2.35% |
| **12 Oct** | **100** | **4,172** | **2.40%** |

- Clicks have risen for five straight weeks. Impressions broke out of the 3.5-3.9k plateau noted on
  7 Oct, so growth is now coming from reach as well as from CTR.
- Clicks are concentrated in a few pages. `where-to-eat-handmade-pasta-in-florence` plus its 301'd
  predecessor `where-do-locals-eat-fresh-pasta-florence` earned **255 clicks, 40% of the site**. The
  Monday guide earned 74 clicks at **7.5% CTR**, the best of any page on the site. Blog posts produce
  72% of all clicks.
- By page role: blog 456 clicks (2.43% CTR), homepages 79 (2.79%), class landings 83 (1.04%),
  shape glossary 17 (0.32%). This is the same pattern as September: city guides convert and the
  glossary does not.

## 2. Against the 7 Oct baseline

| cluster | 7 Oct (5 Jul-6 Oct) | now (12 Jul-12 Oct) | read |
|---|---|---|---|
| team building | 1,350 impr / 0 clk / pos 20.5 | **1,412 / 0 / 19.1** | still the largest zero-click pool |
| DE pasta-kurs / kochkurs | 627 / 7 / 10.6 | 795 / 7 / 11.0 | flat (wider regex) |
| market + class | 226 / 0 / 43.5 | 223 / 0 / 43.0 | unchanged |
| buy / take-away / near me | 145 / 2 / 10.5 | 188 / 3 / 10.7 | page shipped 7 Oct; too early to judge |
| IT crossword | ~425 / 0 / ~9 | 430 / 0 / 8.9 | answered in the SERP; ignore (see §6) |

## 3. What people are asking for → new offerings

These are ranked by evidence × ticket size. The owner confirmed on 7 Oct that O1-O3 can be run.
**None of these pages can be written until the owner supplies the facts listed.** Don't invent
prices, capacity or menus.

### O1. Corporate and large-group events (15+ guests): top priority
- **Evidence:** the team-building cluster has 23 queries, 1,412 impressions, **0 clicks** and an
  average position of 19.1. The existing landing is capped at "6–14 people" (`landings.ts:2117`), so
  any company with more than 14 people sees a page that rules them out. The adjacent demand has no
  page at all: `group cooking class florence` (76 impr, pos 88.8), `small group italian cooking
  class`, `corporate picnic florence`, `location per team building firenze`, `teamevent ideen
  florenz`, `teambuilding maßnahmen florenz`.
- **Caveat:** `teambuilding florence food` accounts for 684 of the 1,412 impressions on its own: one
  odd phrase, 0 clicks over three months. Filter on it in the GSC UI. If its impressions are flat
  every day from a single country, it is probably a rank tracker. Discount it, and the cluster is
  still about 730 impressions with 0 clicks.
- **Build:** one "Group & corporate cooking events, 15-40+" page in 5 locales. It should cover
  companies and also private groups such as friends, family reunions and celebrations, which is the
  `group cooking class` demand. Link it from the 6–14 landing and the team-building post.
- **Owner facts:** max capacity, venue(s), price model, menu, languages, lead time.
- **How we'd know it failed:** 8 weeks after indexing, the new URL has under 50 impressions and the
  cluster still has 0 clicks. In that case the SERP wants listicles from venues and agencies rather
  than an operator page.
- **Leading indicator:** `group …` queries moving from pos 89 into the top 30.

### O2. Cheese tasting / pasta-and-cheese class
- **Evidence:** `meisterkurs über käse in florenz genießen sie ein ganzes käsebrett` had 129 impr at
  pos 18.4. This is the German title of a Viator product, [Masterclass On Cheese In Florence: Enjoy
  A Whole Cheese Board](https://www.viator.com/tours/Florence/MASTERCLASS-ON-CHEESE-IN-FLORENCE-ENJOY-A-WHOLE-CHEESE-BOARD/d519-100039P2),
  so people are searching for an OTA cheese product by name and Google shows us with no cheese page.
  Competitors sell cheese tastings, a [mozzarella workshop](https://www.getyourguide.com/florence-l32/florence-mozzarella-making-workshop-with-wine-tasting-t1023457/)
  and a [flambé cheese-wheel truffle pasta class](https://www.getyourguide.com/florence-l32/florence-flambe-cheese-wheel-truffle-pasta-class-tiramisu-t626091/).
- **Insight:** this buyer is shopping on Viator and GetYourGuide. A cheese offer listed on an OTA
  would reach that buyer, and the site page would support the listing. The September authority
  analysis reached the same conclusion: OTA listings are the missing lever.
- **Build:** start as an add-on to The Chef's Table, for example a Tuscan pecorino board before the
  pasta. Add a standalone page only if the owner wants to sell it separately.
- **Owner facts:** format (add-on or standalone), cheeses and producers, price, duration.

### O3. Multi-day course / Tuscany cooking week: highest ticket
- **Evidence:** 21 queries in 4 languages, 103 impr, avg pos 41.6, 0 clicks: `week cooking florence`
  (pos 63), `best agriturismo in tuscany with cooking classes`, `corsi di cucina in agriturismo
  toscana` (pos 69), `selber kochen in der toskana`, `toskana kochkurse urlaub`, `tuscany farm stay
  cooking`, `pasta workshop toscane`, `corsi professionali di pasta secca`, `american sfoglino a
  master class in handmade pasta`.
- **Market price points:** about €600 for a 3-day amateur course and €1,400–2,200 for a 5-day
  intensive ([chefondemand.it](https://www.chefondemand.it/blog/en/cooking-course-florence-guide-2026/)).
  A 7-day course costs around $2,443 ([happytovisit](https://happytovisit.com/7-day-intense-weekly-cooking-course-from-florence/),
  [tuscany-cooking-class.com](https://tuscany-cooking-class.com/cookery-classes-in-italy/multiple-day/)).
- **Build:** the simplest product is a 3-day sfoglia/pasta intensive in Florence without
  accommodation. Link it from the agriturismo page, which currently draws the "cooking holiday"
  impressions without matching them.
- **Owner facts:** days, schedule, curriculum, price, and whether accommodation is included.

### O4. Christmas gift push (existing offer, seasonal, no owner input)
- The gift landings already rank on page 1 in IT (106 impr, pos 8.0, 3 clicks) and DE (pos 10).
  `regalo corso di cucina firenze` had 15 impr at pos 11.5. The EN gift page had 35 impr at pos 7.3
  and 0 clicks.
- **Do by 10 Nov:** a seasonal homepage block linking to the gift page, and links from the top city
  guides. Check that the gift titles mention Christmas/Natale/Weihnachten/Noël.
- **Failure check:** gift-page impressions from 15 Nov to 20 Dec are not above October's.

### O5. Small or speculative (mention to the owner, don't build yet)
- **Online class for remote teams:** `cours de cuisine en ligne team building` (5 impr, pos 42),
  `直播课` ("live class"), `pasta live`. This is cheap if the online class already runs live for
  groups. The evidence is thin.
- **Themed classes (competitor gap, weak signal):** Mama Florence sells cacio e pepe, pesto, colored
  pasta and corzetti classes ([mamaflorence.com](https://www.mamaflorence.com/cooking-classes-in-florence)).
  We see only `cacio e pepe florenz` (5 impr) and `pear ravioli florence` (4).
- **Vegetarian:** the IT queries `corso (di) cucina vegetariana` appear 3× at pos 4–22. The classes
  already go vegetarian at no surcharge (`landings.ts:240`). Add "vegetariano" to the IT vegan
  landing's H2 or intro. No new page is needed.
- **Private chef** (31 impr, pos 64): belongs to endricerhozi.com under the domain split. No action
  on HMPF.

## 4. New content to write

The format rule from September still holds: city-guide style, chef's first-person voice,
direct-answer H2s. Every item ships in EN+IT+FR+DE+ZH.

| # | piece | evidence | type | priority |
|---|---|---|---|---|
| C1 | **Answer the AI-assistant questions** in `how-to-choose-a-pasta-class-in-florence` | see below | 3 new H2s in an existing post | High (cheap) |
| C2 | **"What's open in Florence on public holidays"** (Christmas, 26 Dec, New Year, Epiphany, Easter) | Monday 7.5% CTR, Sunday 4.6%; "what's open" queries: `are shops open in florence on sunday`, `orari negozi firenze centro domenica`, `aperti la domenica a pranzo`, `welches museum hat montags geöffnet`, `boboli öffnungszeiten` | new post, publish by mid-Nov | High |
| C3 | **"What pasta is Florence known for?"** direct-answer H2 in `tuscan-pasta-shapes-guide` (+ `what-to-eat`) | 9 queries, 85 impr, pos 12.4, 0 clicks (`what pasta is florence known for` 36, `pasta tipica firenze` 16, `famous pasta in florence` 9) | H2 in existing post | Medium |
| C4 | **Extend the winner in place:** "Best ravioli (incl. pear & pecorino)" and "good pasta on a budget" sections in `where-to-eat-handmade-pasta-in-florence` | `best ravioli in florence` 16 impr pos 7.6 (2 clicks), `pear ravioli florence`, `restaurant pâtes florence pas cher`, `best spaghetti in florence` | sections, **not** new posts | Medium |
| C5 | **Fresh pasta dough recipe, the one we teach** (Recipe schema), CTA to online class + gift | 30 DE recipe queries, 56 impr, pos 11 (`pastateig rezept original italienisch`, `nudelteig selber machen`, `pasta selbst machen ohne maschine`) | new post | Low: brand and online-class funnel, not Florence bookings |

**C1 detail.** GSC is now logging conversational queries that look like AI Mode prompts and their
follow-ups. This means pages from the site are being retrieved into AI answers:
- Questions: `how long do cooking classes in florence usually last?`, `what types of dishes are
  typically taught in florence cooking classes?`, `are cooking classes in florence suitable for
  beginners?`, `what can i learn in a cooking class in florence?`. Two personas appear: "for
  couples" and "group activities".
- Price follow-ups (15 queries, avg pos 6.6): `how much does it cost per person`, `was kostet das
  circa?`, `wie teuer ist der kurs`, `yes cost`, `compare costs`, `detail pasta making class options
  by comparing their average pricing`.

The how-to-choose post already covers group size, wine, teacher, gluten-free, kids and price. It
does not cover **duration, what you cook, or beginners**. Add those three as visible answer-first
H2s. Don't add FAQPage markup for this: Google retired FAQ rich results on 7 May 2026.

**Not recommended:** splitting the where-to-eat post into dish-specific posts. That post earns 40% of
all clicks, and merging the locals post into it worked. New dish posts would compete with it.

## 5. Keyword gap analysis

### 5a. Demand with no matching page (true gaps)
| gap | queries | impr | pos | fills it |
|---|---|---|---|---|
| groups over 14 / corporate events | 23 + 2 | 1,412 + 79 | 19 / 89 | O1 |
| cheese tasting | 1 | 129 | 18 | O2 |
| multi-day / cooking holiday | 21 | 103 | 42 | O3 |
| holiday opening hours | (seasonal, inferred) | – | – | C2 |
| pasta dough recipe (DE) | 30 | 56 | 11 | C5 |
| online class for teams | 3 | 7 | 15-42 | O5 |

### 5b. Page exists, striking distance (pos 8-20): fix with internal links and snippets, not new pages
| query | impr | clk | pos | note |
|---|---|---|---|---|
| tortelli | 530 | 2 | 10.1 | glossary; low value (§6) |
| pasta kurs florenz (+ pastakurs, florenz pasta kurs, pasta kochkurs florenz) | 476 | 7 | ~8 | **DE cannibalisation, still unverified:** `/de/` has 1,295 impr at pos 16, while `/de/pasta-kurs-florenz/` has only 191 impr. In the GSC UI, filter query = "pasta kurs florenz" and open the Pages tab. If `/de/` wins, point the homepage's DE class links at the landing with the exact anchor text |
| kochkurs florence | 157 | 0 | 13.6 | same DE check |
| team building florence | 133 | 0 | 9.1 | page 1 with 0 clicks: the snippet says "6–14", so larger teams skip it (O1) |
| best pasta (in) florence | 145 | 3 | 16-24 | EN where-to-eat is at pos 15 vs DE at 6.4: an EN authority gap |
| what pasta is florence known for (+8) | 85 | 0 | 12.4 | C3 |
| cours de cuisine florence | 76 | 0 | 22.1 | FR landing pos 11.2 |

### 5c. Page exists, EN money terms at pos 40-90 (authority gap, not copy)
| cluster | impr | pos | best non-EN twin |
|---|---|---|---|
| EN pasta/cooking class core (28 queries) | 361 | 67.7 | DE `pasta kurs florenz` pos 8 |
| private cooking class(es) florence | 129 | 63 | IT private landing pos 10.8 |
| family cooking class florence | 111 | 73.5 | **IT family landing pos 7.4, 12.9% CTR** |
| group cooking class florence | 76 | 88.8 | none (O1) |
| gluten free cooking class florence | 64 | 42.7 | DE GF landing pos 12.9 |
| florence market & cooking class | 164 | 43.8 | – |

The same content ranks around position 8 in IT/DE and around 70 in EN, which confirms the
September finding: this is not fixed by rewriting EN copy. The levers are OTA listings
(Viator/GetYourGuide/Airbnb), the first real reviews (`reviews.ts` is still empty) and GBP. The
cheese query in O2 shows that OTA shoppers are already looking at this niche.

### 5d. Competitor gap
- **Brand searches for competitors:** 9 queries, 138 impr, pos 39. These are `mama florence`
  (117, pos 40), `pastamania` (including the AI prompt "where can i book a pastamania cooking
  experience"), `in tavola firenze` and `the art of pasta florence`. The comparison post
  `where-to-take-pasta-making-class-florence` names these schools but drew only 47 impr. Give it
  internal links from the class landings and the cost post before writing anything new.
- **Offers they sell and we don't:** cheese (Viator/GYG), multi-day intensives (Apicius, FCAS,
  tuscany-cooking-class.com), themed menus (Mama Florence). These map to O2, O3 and O5.
- **Mercato Centrale:** 42 impr, pos 40, for `mercato centrale (florence) cooking class`. Our tour
  goes to Sant'Ambrogio, and the landing says so on purpose. Don't retarget. Link the markets post
  (143 impr, 0 clicks) to the market-tour landing with "Mercato Centrale or Sant'Ambrogio?" framing.

## 6. Don't chase
- **Shape glossary:** 332 queries, 3,463 impr, 8 clicks, 0.23% CTR. This includes about 800 zh
  `… 中文` impressions. The answers appear in the SERP, so the glossary earns impressions, not
  bookings.
- **"Le Pappardelle":** `che lavoro fanno le pappardelle`, `chi sono le pappardelle` and `quanto
  anno vinto le pappardelle` refer to a contestant team on the TV quiz *Reazione a catena*, and
  `sono più sottili delle pappardelle` is the game clue. 430 impr, 0 clicks. Not our audience.
- **Noise:** `difference between pasta and moisturizer` (120 impr), `travel insurance vs pasta`.
- **Out of area:** cooking classes in Rome, Bologna, Sicily, Puglia, Cefalù and Lucca.
- **Generic Florence travel** (weather, sights, train times): 100 queries, 231 impr. These rank
  well on tiny volume and have no booking path.

## 7. Small technical items from the export
- Two live 404s carry impressions. Add 301s to `ops/nginx/handmadepastaflorence-redirects.conf`:
  - `/blog/best-flor-for-italian-fresh-pasta/` → `/blog/best-flour-for-italian-fresh-pasta/`
  - `/blog/what-to-do-on-a-sunday-in-florence/` → `/blog/what-to-do-in-florence-on-a-sunday/`
- `/zh/cn/realitalianrestaurants.com/blog/...` returns 404 correctly. It is a malformed external
  link, so leave it.
- The `/#business`, `/#experiences` and `/#story` URLs are sitelink fragments. They are harmless.

## 8. Order of work
1. **This week, no owner input:** C1, C3, C4, the O4 gift push, the IT "vegetariano" line, the
   markets↔market-tour and comparison-post links, the two 301s, and the DE cannibalisation check.
2. **One message to the owner** asking for O1/O2/O3 facts (§3) and whether the online class runs
   live for teams. Then build O1 → O2 → O3.
3. **By mid-November:** C2, the holiday opening hours post. Verify every opening time before
   publishing.
4. **In parallel, off-site:** Viator/GetYourGuide listings for the existing classes, and the cheese
   add-on once it exists. Collect the first real reviews.
5. **Next export (mid-November):** re-run `seo/analyze.py clusters` and compare §2 and the §5a
   rows.
