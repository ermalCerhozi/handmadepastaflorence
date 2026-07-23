import { defaultLocale, locales, isLocale, localizedPaths, type Locale } from './config';

export const SITE = 'https://handmadepastaflorence.com';

/** Locale from a URL — reads the first path segment, falls back to the default. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, seg] = url.pathname.split('/');
  return isLocale(seg) ? seg : defaultLocale;
}

/** Back-compat alias for the previous name. */
export const getLangFromUrl = getLocaleFromUrl;

/** Strip a leading `/it`, `/de`, … prefix so a path is locale-neutral. */
export function stripLocalePrefix(pathname: string): string {
  const [, seg, ...rest] = pathname.split('/');
  if (isLocale(seg) && seg !== defaultLocale) {
    return '/' + rest.join('/');
  }
  return pathname;
}

/**
 * Re-add the correct prefix for `locale` to a locale-neutral path. Valid for
 * same-slug pages (home, blog, nav anchors). Landing pages have translated
 * slugs and resolve through `landingPath()` / explicit alternates instead.
 */
export function localizePath(path: string, locale: Locale): string {
  const base = stripLocalePrefix(path);
  if (locale === defaultLocale) return base;
  return `/${locale}${base === '/' ? '/' : base}`;
}

/** Absolute canonical URL for a same-slug localized page. */
export function canonicalFor(path: string, locale: Locale): string {
  return SITE + localizePath(path, locale);
}

/**
 * Localize an internal same-slug link, but fall back to the English URL when the
 * target page isn't translated in this locale yet — avoids linking to a missing
 * page during an incremental language rollout.
 */
export function localizedHref(enPath: string, locale: Locale): string {
  return localizedPaths.has(enPath) ? localizePath(enPath, locale) : enPath;
}

export interface Alternate {
  locale: Locale;
  path: string;
}

/** Generic hreflang/switcher alternates for a same-slug page. */
export function getAlternates(pathname: string): Alternate[] {
  return locales.map((locale) => ({ locale, path: localizePath(pathname, locale) }));
}
