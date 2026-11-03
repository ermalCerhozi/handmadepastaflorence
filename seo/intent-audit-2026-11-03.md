# Search-intent audit, 3 Nov 2026: "private", "with wine", "villa"

Question: do we cover *private cooking class Florence*, *cooking class Florence with
wine* and *cooking class Tuscan villa*? Surfaces checked: title, H1, meta description,
body, FAQ, image alt, schema, booking. Source: the built pages from 31 Oct, with the key
items re-checked in `src/`.

## 1. Demand evidence first

The 31 Oct GSC export (42 days, `seo/data/gsc-2026-10-31.xlsx`) contains **no** query
with "villa" and **no** query with "with wine" (only "no wine", 1 impression). "Private"
is real but small:

| query | impr | pos |
|---|---|---|
| private cooking class florence | 48 | 59.1 |
| private cooking classes florence | 39 | 64.6 |
| private chef florence | 5 | 59.6 |

GSC hides queries under its privacy threshold, so villa and wine searches may exist
below it. Nothing in our data proves it. The fixes are sized to match: small, honest,
no new page.

## 2. Coverage

| Surface | "private" (`/private-cooking-class-florence/`) | "with wine" (Chef's Table + private) | "Tuscan villa" (`/agriturismo-cooking-class-tuscany/`) |
|---|---|---|---|
| Title | Yes (55 cols) | No, on either page | No |
| H1 | Yes | No | No |
| Meta | Yes | Chef's Table yes, private no | No |
| Body | Strong, 17 mentions | Chef's Table 11, private 6 | One sentence, EN/IT/FR only |
| FAQ | Yes, 6 | Only "Do we eat the pasta we make?" touches wine | None |
| Image alt | "private" yes, "Florence" no | Chef's Table gallery alt names red wine | None, correctly (kitchen photo) |
| Schema | Product + Course + FAQ; no wine | Chef's Table Product mentions wine; private does not | Service + FAQ; no villa |
| Booking | Drawer "private", flat €680, WhatsApp/email CTA | Drawer wine add-on is online-only by design | Email enquiry |

Other gaps:

- `public/llms.txt` still named the private page **"The Family Long-Table"**, the brand
  the 31 Oct fix removed everywhere else.
- The private page said "local wine on the table" in one paragraph but not in the meta,
  facts strip, FAQ or schema.
- Villa-stay groups are a distinct reader from "agriturismo" searchers. The blog post
  already describes "friends who rented a villa"; the landing page did not speak to them.

## 3. Decision: no new landing page

- *Private + wine* would near-duplicate the private page right after a round spent
  curing cannibalisation on it, and would split the 26 Nov measurement.
- *Cooking class Florence with wine* is the Chef's Table (€95 includes the wine).
- *Villa* has no confirmed villa venue or villa service behind it. A page would have to
  invent content. The agriturismo page owns the intent honestly.
- Wine is an inclusion, not a differentiator. Putting it in a title or slug risks the
  same "modifier eats the entity" failure as "Family".

## 4. What changed

- **Private page** (5 locales): meta mentions wine; new "Drinks" fact; new FAQ "Is wine
  included in the private cooking class?"; wine-pairing line in "Good to know"; hero alt
  says "private cooking class in Florence"; Product/Course description mentions wine;
  `updated` set to 2026-11-03 because the pairing add-on is a new fact. **Title, H1 and
  slug untouched** so the 26 Nov recheck stays clean.
- **Chef's Table** (5 locales): new FAQ "Is wine included in the cooking class?", built
  only from facts already on the page. Title, H1, meta untouched.
- **Agriturismo page** (5 locales): new "Staying in a villa in Tuscany?" section, new FAQ
  "Can you teach the class at our rental villa?" (answers honestly without claiming
  either way), meta now says "popular with villa-stay groups". No villa venue or
  travelling-chef claim is made.
- **`public/llms.txt`**: "The Family Long-Table" is now "The Long-Table Feast" (with the
  wine line), and the agriturismo class, which was missing from the file entirely, now
  has an entry built from facts already on its page.

## 5. Checked and deliberately not changed

- Private title, H1, slug: a fix is in flight, recheck 26 Nov.
- Booking drawer: its wine add-on is online-only and add-ons carry a price. A priceless
  "wine pairing (quoted)" toggle would read as free. The private flow is a WhatsApp
  conversation, so the pairing goes through the FAQ and the enquiry.
- "Wine" or "villa" in any title or alt: no query data, and the agriturismo photo is not
  a villa.

## 6. Open with the owner

See `seo/owner-questions-2026-11-03.md`: can the chefs cook at a guest's rented villa,
are any partner estates villa-style, and what does the private wine pairing cost.
