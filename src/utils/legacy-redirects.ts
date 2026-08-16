// Redirects for URL shapes this site used to serve and Google still has in its
// index. Search Console reported them as "Not found (404)" on 2026-08-05; a 404
// on a URL that used to rank drops the ranking outright, so each one is pointed
// at its current equivalent instead of being left to die.
//
// Two legacy shapes, both from earlier structural fixes:
//
//   1. /<locale>/<english-slug>/ — before landings.ts gained per-locale
//      SEO-translated slugs, every locale reused the English slug. So
//      /de/pasta-making-class-florence/ was real; today the page lives at
//      /de/pasta-kurs-florenz/.
//
//   2. /blog/<locale>/<slug>/ — the blog collection is keyed by file path
//      (`de/foo`), so before src/pages/blog/[slug].astro filtered on
//      `!id.includes('/')` the English route emitted the translated posts one
//      level too deep. Today they live at /<locale>/blog/<slug>/.
//
// Both maps are DERIVED, never hand-listed: the landing map reads landings.ts
// (the same source [...slug].astro builds paths from) and the blog map reads
// the content directory. A renamed slug therefore updates its own redirect, and
// a redirect can never point at a URL that stopped existing.
//
// Imported by astro.config.mjs, which is a Node context — hence `node:fs`
// rather than `getCollection`. Nothing under src/pages may import this module.
import { readdirSync } from 'node:fs';
import { landings } from '../data/landings';
import { defaultLocale, locales, type Locale } from '../i18n/config';

const BLOG_DIR = new URL('../content/blog/', import.meta.url);

/** Non-default locales — the only ones that carry a /xx/ URL prefix. */
const prefixedLocales = locales.filter((l): l is Locale => l !== defaultLocale);

/** English post slugs, from the top-level .md files (subdirs are translations). */
function englishPostSlugs(): string[] {
  return readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name.replace(/\.md$/, ''));
}

/** Post slugs that exist for a locale, from its subdirectory. Empty if unshipped. */
function localePostSlugs(locale: Locale): Set<string> {
  try {
    return new Set(
      readdirSync(new URL(`${locale}/`, BLOG_DIR), { withFileTypes: true })
        .filter((e) => e.isFile() && e.name.endsWith('.md'))
        .map((e) => e.name.replace(/\.md$/, '')),
    );
  } catch {
    return new Set();
  }
}

/** Shape 1: /<locale>/<english-slug>/ → /<locale>/<translated-slug>/ */
function landingRedirects(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const page of Object.values(landings)) {
    const englishSlug = page.locales[defaultLocale]?.slug;
    if (!englishSlug) continue;

    for (const locale of prefixedLocales) {
      const slug = page.locales[locale]?.slug;
      // Skip locales that never translated this slug: the "legacy" URL and the
      // live one would be the same path, and a self-redirect is a redirect loop.
      if (!slug || slug === englishSlug) continue;
      map[`/${locale}/${englishSlug}/`] = `/${locale}/${slug}/`;
    }
  }

  return map;
}

/** Shape 2: /blog/<locale>/<slug>/ → /<locale>/blog/<slug>/ (index included) */
function blogRedirects(): Record<string, string> {
  const map: Record<string, string> = {};
  const slugs = englishPostSlugs();

  for (const locale of prefixedLocales) {
    map[`/blog/${locale}/`] = `/${locale}/blog/`;
    // Only for posts that locale actually has. Posts no longer ship in all five
    // languages, and the legacy URL only ever existed for translations that
    // existed then — redirecting to an untranslated slug would 404, which is
    // the exact failure this module was written to fix.
    const translated = localePostSlugs(locale);
    for (const slug of slugs) {
      if (!translated.has(slug)) continue;
      map[`/blog/${locale}/${slug}/`] = `/${locale}/blog/${slug}/`;
    }
  }

  return map;
}

/** Every legacy path → its live equivalent, as `{ from: to }` (site-relative, trailing slash). */
export function legacyRedirects(): Record<string, string> {
  return { ...landingRedirects(), ...blogRedirects() };
}
