// Which locales actually ship a given blog post.
//
// WHY THIS EXISTS: blog posts live at `src/content/blog/<slug>.md` for English
// and `src/content/blog/<locale>/<slug>.md` for everything else, and the routes
// glob the filesystem, so a post can exist in three locales and not five. Until
// now both the in-head hreflang (via `getAlternates()`, which prefix-swaps the
// pathname) and the sitemap (via `sameSlugEntries()`, which defaults to all
// locales) assumed full coverage. That was true while every post was translated
// five ways; the moment one isn't, they emit hreflang and sitemap URLs that
// 404. This module is the single source of truth both of them read instead.
import { getCollection } from 'astro:content';
import { defaultLocale, isLocale, locales, type Locale } from '../i18n/config';
import type { Alternate } from '../i18n/utils';

/** Bare slug for an entry id: `de/ravioli-vs-tortelli` -> `ravioli-vs-tortelli`. */
export function blogSlug(id: string): string {
  return id.includes('/') ? id.slice(id.indexOf('/') + 1) : id;
}

/** Locale an entry id belongs to — English posts sit at the collection root. */
export function blogLocale(id: string): Locale {
  const [seg] = id.split('/');
  return id.includes('/') && isLocale(seg) ? seg : defaultLocale;
}

/** URL for a post slug in a locale. */
export function blogPostPath(slug: string, locale: Locale): string {
  return `${locale === defaultLocale ? '' : '/' + locale}/blog/${slug}/`;
}

/**
 * Locales that ship this post, in `locales` order so the default locale comes
 * first and x-default resolves to it.
 */
export async function blogPostLocales(id: string): Promise<Locale[]> {
  const slug = blogSlug(id);
  const posts = await getCollection('blog');
  const present = new Set(posts.filter((p) => blogSlug(p.id) === slug).map((p) => blogLocale(p.id)));
  return locales.filter((l) => present.has(l));
}

/** hreflang / language-switcher alternates limited to the locales that exist. */
export async function blogPostAlternates(id: string): Promise<Alternate[]> {
  const slug = blogSlug(id);
  const present = await blogPostLocales(id);
  return present.map((locale) => ({ locale, path: blogPostPath(slug, locale) }));
}
