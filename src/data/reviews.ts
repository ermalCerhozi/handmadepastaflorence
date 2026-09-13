// Customer reviews — the single source of truth for BOTH the on-page Reviews
// section and the `aggregateRating` in our structured data.
//
// WHY THIS FILE EXISTS: every competitor that outranks us for "pasta making
// class florence" shows a star rating in the SERP; we show none, because we
// have no reviews yet. The plumbing is wired so that the day real reviews land
// here, the rating appears on the page AND in the Product/LocalBusiness JSON-LD
// with no further code changes.
//
// DO NOT invent entries to make the stars appear. Google treats fabricated
// review markup as spam, and a rating you cannot substantiate is worse than no
// rating at all. Add a review only when a real, identifiable guest left one.

import type { LandingKey } from './landings';

interface Review {
  /** The guest's own words, verbatim. Do not paraphrase or tidy. */
  quote: string;
  /** Name as the guest gave it (e.g. "Sarah C."). */
  name: string;
  /** Where they travelled from, e.g. "Melbourne, AU". */
  from: string;
  /** Platform the review came from — "Google", "Tripadvisor", "GetYourGuide". */
  src: string;
  /** 1–5. Only whole or half stars; must match what the guest actually gave. */
  rating: number;
  /** ISO date the review was left. */
  date: string;
  /**
   * Which class this review is about, if it is about one in particular.
   *
   * REQUIRED for the review to appear on a class landing page. Google's review
   * snippet policy is that marked-up reviews must be about the specific item
   * they are attached to and must be visible on the page carrying the markup —
   * so a review of the family class must not end up in the gluten-free class's
   * Product schema.
   *
   * Omit it only for reviews about the business as a whole; those still count
   * towards the sitewide LocalBusiness rating and the homepage section, but are
   * deliberately kept off every individual Product.
   */
  pageKey?: LandingKey;
}

/** Optional platform badges ("4.9 on Google, 120 reviews"). */
interface ReviewBadge {
  src: string;
  score: string;
  count: string;
  mark: string;
}

export const reviews: Review[] = [];

export const badges: ReviewBadge[] = [];

export const hasReviews = reviews.length > 0;

/**
 * Reviews about one specific class. Empty for every class until a review is
 * added with that `pageKey`.
 */
export function reviewsFor(pageKey: LandingKey): Review[] {
  return reviews.filter((r) => r.pageKey === pageKey);
}

interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: number;
  bestRating: '5';
  worstRating: '1';
}

/**
 * Schema.org aggregateRating built from the real reviews above — or `null`
 * when there are none, so callers can spread it conditionally and emit
 * nothing rather than a zero-rating (which Google flags as invalid).
 *
 * Pass a `pageKey` to rate one class from its own reviews only. Called with no
 * argument it rates the business as a whole, which is what LocalBusiness wants.
 */
export function getAggregateRating(pageKey?: LandingKey): AggregateRating | null {
  const scoped = pageKey ? reviewsFor(pageKey) : reviews;
  if (scoped.length === 0) return null;
  const mean = scoped.reduce((sum, r) => sum + r.rating, 0) / scoped.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: mean.toFixed(1),
    reviewCount: scoped.length,
    bestRating: '5',
    worstRating: '1',
  };
}

/**
 * Schema.org Review[] for embedding in Product/LocalBusiness, or null when
 * empty. Scoped by `pageKey` for the same reason as `getAggregateRating`.
 */
export function getReviewSchema(pageKey?: LandingKey) {
  const scoped = pageKey ? reviewsFor(pageKey) : reviews;
  if (scoped.length === 0) return null;
  return scoped.map((r) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewBody: r.quote,
  }));
}

export type { Review };
