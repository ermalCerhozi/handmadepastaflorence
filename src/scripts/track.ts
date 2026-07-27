// Provider-agnostic conversion tracking.
//
// The site's only conversion is a booking request handed off to WhatsApp, which
// means the funnel leaves the page and nothing downstream is measurable unless
// we record the hand-off ourselves. This module records it once, in a shape any
// analytics tool can read, so choosing a provider later is a config change and
// not a code change:
//
//   • window.dataLayer  — Google Tag Manager / GA4
//   • window.gtag       — GA4 direct (gtag.js)
//   • window.plausible  — Plausible custom events
//   • window.umami      — Umami custom events
//   • CustomEvent on `document` — anything else, incl. local debugging
//
// No provider is bundled: with none installed every call is a no-op that costs
// one object literal. Install a snippet in src/layouts/Layout.astro and the
// events below start reporting with no edits here.

export type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: TrackProps; revenue?: unknown }) => void;
    umami?: { track: (event: string, props?: TrackProps) => void };
    /** Set to true in the console to see events while testing. */
    __trackDebug?: boolean;
  }
}

/** Fire a named conversion event to whichever analytics provider is present. */
export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === 'undefined') return;

  // Drop undefined values so providers don't receive empty keys.
  const clean: TrackProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...clean });

    window.gtag?.('event', event, clean);
    window.plausible?.(event, { props: clean });
    window.umami?.track(event, clean);

    document.dispatchEvent(new CustomEvent('hpf:track', { detail: { event, ...clean } }));

    if (window.__trackDebug) console.info('[track]', event, clean);
  } catch {
    // Analytics must never break a booking.
  }
}

/** Event names, kept in one place so reports and code can't drift apart. */
export const EV = {
  /** Booking drawer opened. `source` says which CTA did it. */
  drawerOpen: 'booking_drawer_open',
  /** Guest advanced a step in the drawer. `step` is 2 or 3. */
  drawerStep: 'booking_drawer_step',
  /** THE conversion: a prefilled request handed off to WhatsApp. */
  requestSent: 'booking_request_sent',
  /** WhatsApp contacted outside the drawer (floating button, footer link). */
  whatsappClick: 'whatsapp_click',
  /**
   * The other conversion. Gift vouchers and team-building quotes have no date to
   * pick, so those pages CTA to mailto: instead of the drawer — without this
   * they would look like pages that never convert.
   */
  emailEnquiry: 'email_enquiry',
} as const;
