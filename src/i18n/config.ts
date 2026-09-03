// Central i18n configuration (dictionary model, after lakebovilla).
//
// English is the default locale and lives at the site root (no /en/ prefix) to
// preserve existing URLs and Search Console history. Every other locale is
// served under its prefix (/it/, and later /de/…). Landing pages additionally
// use SEO-translated slugs — see src/data/landings.ts — which is why internal
// links to them resolve through `landingPath()` rather than a bare prefix.
//
// To add a language: add it to `languages`, add a `locales/<code>.ts` dictionary
// (the compiler enforces it matches the English shape), add its `landings.ts`
// entries, and list its translated default paths in `localizedPaths`.

export const defaultLocale = 'en';

// `dateLocale` is the BCP-47 tag passed to toLocaleDateString — deliberately
// not derived from `htmlLang`, because English dates are formatted en-GB
// ("8 July 2026") rather than en-US, and zh-CN is not `${code}-${CODE}`.
export const languages = {
  en: { label: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US', dateLocale: 'en-GB' },
  it: { label: 'Italiano', dir: 'ltr', htmlLang: 'it', ogLocale: 'it_IT', dateLocale: 'it-IT' },
  fr: { label: 'Français', dir: 'ltr', htmlLang: 'fr', ogLocale: 'fr_FR', dateLocale: 'fr-FR' },
  de: { label: 'Deutsch', dir: 'ltr', htmlLang: 'de', ogLocale: 'de_DE', dateLocale: 'de-DE' },
  zh: { label: '中文', dir: 'ltr', htmlLang: 'zh-CN', ogLocale: 'zh_CN', dateLocale: 'zh-CN' },
} as const;

export type Locale = keyof typeof languages;

export const locales = Object.keys(languages) as Locale[];

export function isLocale(value: string): value is Locale {
  return value in languages;
}

// English canonical paths that have a full translation in every locale. Internal
// cross-page links to anything NOT listed fall back to the English URL, so we
// never link to a page that hasn't shipped in the active locale yet. (Landing
// pages are resolved via landingPath(); these are the same-slug pages.)
export const localizedPaths = new Set<string>([
  '/',
  '/blog/',
  '/blog/tuscan-pasta-shapes-guide/',
  '/blog/where-to-eat-handmade-pasta-in-florence/',
  '/blog/things-to-do-in-oltrarno-florence/',
  '/blog/gluten-free-pasta-florence/',
  '/blog/how-much-does-a-pasta-making-class-in-florence-cost/',
]);

// English-only informational/legal pages (footer "Information" column):
// booking terms, cancellation & refund, T&Cs, privacy, safety & insurance.
// Deliberately NOT translated — low search value per locale, and legal/policy
// wording is safer maintained in one language than kept in sync across five.
export const infoPages = new Set<string>([
  '/booking-policy/',
  '/cancellation-policy/',
  '/terms-and-conditions/',
  '/privacy/',
  '/safety-insurance/',
]);
