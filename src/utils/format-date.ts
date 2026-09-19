// Date formatting, once.
//
// WHY THIS FILE EXISTS: the same "12 August 2026" formatter was written out
// three times, and each copy picked its locale tag differently:
//
//   BlogPostPage   languages[lang].dateLocale   correct
//   BlogIndexPage  `${lang}-${lang.toUpperCase()}`  produced "en-EN" and "zh-ZH"
//   ClassLanding   languages[lang].htmlLang     "en" rather than "en-GB"
//
// `en-EN` and `zh-ZH` are not locales, so the blog index silently fell back to
// the runtime default — which on a build server is whatever that machine is set
// to, not the reader's language. `dateLocale` exists precisely because the tag
// is not derivable from the locale code (see src/i18n/config.ts); go through
// here rather than rebuilding it.
import { languages, type Locale } from '../i18n/config';

/** "12 August 2026", in the reader's locale. */
export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(languages[locale].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "August 2026" — the freshness line on the class landing pages. */
export function formatMonthYear(date: Date, locale: Locale): string {
  return date.toLocaleDateString(languages[locale].dateLocale, {
    month: 'long',
    year: 'numeric',
  });
}
