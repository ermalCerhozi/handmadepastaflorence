// `priceValidUntil` for every schema.org Offer on the site — one value, one
// place.
//
// WHY THIS FILE EXISTS: this date was hardcoded twice, in Schema.astro (the
// homepage Products) and ClassLanding.astro (the 35 landing-page Products).
// Two copies of a date that has to be bumped by hand is a copy that gets
// missed, and an Offer whose priceValidUntil has passed reads as stale to
// Google's price-freshness checks — on every money page at once.
//
// POLICY: rolling year-end. Bump to the next year-end whenever prices are
// actually revisited. There is no cheaper way to keep this honest than a
// manual bump, and it only needs to happen about once a year.

export const PRICE_VALID_UNTIL = '2026-12-31';

/** Days before expiry at which the build starts complaining. */
const WARN_WITHIN_DAYS = 60;

const MS_PER_DAY = 86_400_000;

/**
 * Build-time freshness guard, run on import so it fires once per build rather
 * than once per page.
 *
 * Deliberately asymmetric: an expired date is a real defect shipping to every
 * Offer on the site, so it throws. A date that is merely *close* only warns —
 * failing the build while the price is still genuinely valid would be a false
 * alarm, and a red build nobody can act on is a build people learn to ignore.
 */
function checkOfferValidity(): void {
  const validUntil = new Date(`${PRICE_VALID_UNTIL}T23:59:59Z`);

  if (Number.isNaN(validUntil.getTime())) {
    throw new Error(
      `[offer-validity] PRICE_VALID_UNTIL is not a valid ISO date: "${PRICE_VALID_UNTIL}"`,
    );
  }

  const daysLeft = Math.floor((validUntil.getTime() - Date.now()) / MS_PER_DAY);

  if (daysLeft < 0) {
    throw new Error(
      `[offer-validity] PRICE_VALID_UNTIL (${PRICE_VALID_UNTIL}) has passed. ` +
        `Every schema.org Offer on the site is now advertising a stale price. ` +
        `Confirm the current prices, then bump PRICE_VALID_UNTIL in ` +
        `src/utils/offer-validity.ts to the next year-end.`,
    );
  }

  if (daysLeft <= WARN_WITHIN_DAYS) {
    console.warn(
      `[offer-validity] PRICE_VALID_UNTIL (${PRICE_VALID_UNTIL}) expires in ` +
        `${daysLeft} day(s). Bump it in src/utils/offer-validity.ts before it ` +
        `lapses, or every Offer on the site starts reading as stale.`,
    );
  }
}

checkOfferValidity();
