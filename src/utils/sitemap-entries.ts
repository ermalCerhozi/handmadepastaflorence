// Builds the full list of indexable URLs + correct hreflang alternates for the
// sitemap. Written by hand instead of relying on @astrojs/sitemap's `i18n`
// option because that option only pattern-matches same-slug pages across
// locale prefixes — it silently drops alternates for every page whose slug is
// actually translated per locale (all 8 money pages + the pasta-shapes hub/
// spokes), which was 50 of 85 URLs. This module reuses the exact same data
// sources (`landings.ts`, `shapes.ts`, the blog content collection, and the
// site's own same-slug locale list) that already drive each page's in-head
// hreflang tags, so the sitemap and the page-level tags can't drift apart.
import { getCollection } from 'astro:content';
import { locales, defaultLocale, languages, type Locale } from '../i18n/config';
import { SITE, localizePath } from './../i18n/utils';
import { landings } from '../data/landings';
import { shapes, shapePath, shapesHubPath } from '../data/shapes';

interface SitemapEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
}

function toEntry(paths: Partial<Record<Locale, string>>): SitemapEntry[] {
  const localesPresent = Object.keys(paths) as Locale[];
  const alternates = localesPresent.map((l) => ({
    hreflang: languages[l].htmlLang,
    href: SITE + paths[l]!,
  }));
  // x-default points at the default locale's URL when it exists, else the
  // first locale that does — every entry in this build always has `en`.
  const defaultHref = SITE + (paths[defaultLocale] ?? paths[localesPresent[0]]!);
  const withDefault = [...alternates, { hreflang: 'x-default', href: defaultHref }];

  return localesPresent.map((l) => ({
    loc: SITE + paths[l]!,
    alternates: withDefault,
  }));
}

/** Same-slug pages (home, blog index, blog posts) — identical path per locale, just prefixed. */
function sameSlugEntries(pathname: string, availableLocales: readonly Locale[] = locales): SitemapEntry[] {
  const paths: Partial<Record<Locale, string>> = {};
  for (const l of availableLocales) paths[l] = localizePath(pathname, l);
  return toEntry(paths);
}

async function blogEntries(): Promise<SitemapEntry[]> {
  const posts = await getCollection('blog', ({ id }) => !id.includes('/'));
  const entries: SitemapEntry[] = [];
  for (const post of posts) {
    entries.push(...sameSlugEntries(`/blog/${post.id}/`));
  }
  return entries;
}

function landingEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const page of Object.values(landings)) {
    const paths: Partial<Record<Locale, string>> = {};
    for (const [locale, data] of Object.entries(page.locales)) {
      const l = locale as Locale;
      paths[l] = `${l === defaultLocale ? '' : '/' + l}/${data!.slug}/`;
    }
    entries.push(...toEntry(paths));
  }
  return entries;
}

function shapeEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const shapeLocales = Object.keys(shapes) as Locale[];

  // Hub — exists in every locale that has a shapes entry (en/it today).
  const hubPaths: Partial<Record<Locale, string>> = {};
  for (const l of shapeLocales) hubPaths[l] = shapesHubPath(l);
  entries.push(...toEntry(hubPaths));

  // Spokes — only offer an alternate where that locale actually ships the shape,
  // mirroring the per-spoke filter already used in ShapePage.astro.
  const allSlugs = new Set(shapeLocales.flatMap((l) => shapes[l]!.spokes.map((sp) => sp.slug)));
  for (const slug of allSlugs) {
    const paths: Partial<Record<Locale, string>> = {};
    for (const l of shapeLocales) {
      if (shapes[l]!.spokes.some((sp) => sp.slug === slug)) paths[l] = shapePath(l, slug);
    }
    entries.push(...toEntry(paths));
  }
  return entries;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  return [
    ...sameSlugEntries('/'),
    ...sameSlugEntries('/blog/'),
    ...(await blogEntries()),
    ...landingEntries(),
    ...shapeEntries(),
  ];
}
