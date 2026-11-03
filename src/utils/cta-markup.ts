// Markup for the mid-page "Book your class" block, as a plain string.
//
// It is a string rather than an Astro component because the markdown posts need
// it too: remark-inline-cta.ts injects it into the article body at build time,
// where no component can run. src/components/InlineCta.astro renders the same
// string with set:html for the pages that are not markdown (shapes), so both
// places stay one design.
//
// Keep this file free of Astro-only imports: astro.config.mjs loads it.

import { whatsappLink } from '../data/contact';
import type { Dict } from '../i18n/types';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * WhatsApp link for the "Private class or special request" button. `ref` is the
 * page the guest was reading; it is appended to the message so the owner can see
 * which page an enquiry came from, which the site cannot otherwise tell (no
 * analytics provider is installed).
 */
export const privateInquiryHref = (t: Dict, ref: string): string =>
  whatsappLink(t.cta.privateMsg.replace('{ref}', ref));

interface InlineCtaOptions {
  /** Path of the page, e.g. "/de/blog/foo/". Goes into the private-class message. */
  ref: string;
  /**
   * `data-cta` label for the booking button, so reports show which block
   * converted. The private button gets `${source}-private`.
   */
  source: string;
}

/**
 * The block itself. Booking buttons carry no data-prefill on purpose: they
 * inherit the page's `data-prefill-default` (see BookingDrawer.astro), which the
 * page template sets from the article's class. The text is a <p>, not a heading,
 * so it never enters the page's heading outline.
 */
export function inlineCtaHtml(t: Dict, { ref, source }: InlineCtaOptions): string {
  const c = t.cta;
  return (
    `<aside class="cta-inline" aria-label="${esc(c.book)}">` +
    `<div class="cta-inline__text">` +
    `<p class="cta-inline__h">${esc(c.inlineH)}</p>` +
    `<p class="cta-inline__p">${esc(c.inlineP)}</p>` +
    `</div>` +
    `<div class="cta-inline__actions">` +
    `<button type="button" class="cta-btn" data-open-booking data-cta="${esc(source)}">${esc(c.book)}</button>` +
    `<a class="cta-ghost" href="${esc(privateInquiryHref(t, ref))}" target="_blank" rel="noopener" data-private-inquiry data-cta="${esc(source)}-private">${esc(c.private)}</a>` +
    `</div>` +
    `</aside>`
  );
}
