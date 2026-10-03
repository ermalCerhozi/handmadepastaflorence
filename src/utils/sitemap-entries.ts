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
import { locales, defaultLocale, languages, infoPages, type Locale } from '../i18n/config';
import { SITE, localizePath } from './../i18n/utils';
import { landings, type LandingPage } from '../data/landings';
import { shapes, shapePath, shapesHubPath, SHAPES_MODIFIED } from '../data/shapes';
import { blogLocale, blogSlug } from './blog-locales';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  alternates: { hreflang: string; href: string }[];
}

// Homepages: the single-keyword rewrite shipped in the 2026-07-27 architecture
// pass. They stay on that date on purpose: a fresh stamp on unchanged pages is
// a false freshness signal.
const HOME_SHIP_DATE = '2026-07-27T00:00:00.000Z';

// Landing pages: last site-wide content pass (og:image fix, menu-panel
// corrections, reviews, classKey/related cards). A landing with its own later
// `updated` date uses that instead, see landingEntries().
const LANDING_PASS_DATE = '2026-09-17T00:00:00.000Z';

// The footer "Information" pages (English-only, see infoPages in i18n/config.ts).
const INFO_PAGES_SHIP_DATE = '2026-09-03T00:00:00.000Z';

function toEntry(paths: Partial<Record<Locale, string>>, lastmod?: string): SitemapEntry[] {
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
    lastmod,
    alternates: withDefault,
  }));
}

/** Same-slug pages (home, blog index, blog posts) — identical path per locale, just prefixed. */
function sameSlugEntries(
  pathname: string,
  availableLocales: readonly Locale[] = locales,
  lastmod?: string,
): SitemapEntry[] {
  const paths: Partial<Record<Locale, string>> = {};
  for (const l of availableLocales) paths[l] = localizePath(pathname, l);
  return toEntry(paths, lastmod);
}

type BlogPosts = Awaited<ReturnType<typeof getCollection<'blog'>>>;

// Newest updatedDate/pubDate across posts. Same source BlogPostPage.astro uses
// for Article.dateModified, so the sitemap and the page schema agree.
function newestDate(posts: BlogPosts): string {
  return posts
    .reduce((max, p) => {
      const d = p.data.updatedDate ?? p.data.pubDate;
      return d > max ? d : max;
    }, posts[0]!.data.pubDate)
    .toISOString();
}

// Enumerates every slug in the collection, not just the English ones, and emits
// only the locales that actually have a file. Previously this listed English
// posts and claimed all five locales for each, which is fine while every post is
// translated five ways and wrong the moment one isn't.
function blogEntries(posts: BlogPosts): SitemapEntry[] {
  const slugs = [...new Set(posts.map((p) => blogSlug(p.id)))];
  const entries: SitemapEntry[] = [];
  for (const slug of slugs) {
    const matches = posts.filter((p) => blogSlug(p.id) === slug);
    const present = locales.filter((l) => matches.some((p) => blogLocale(p.id) === l));
    entries.push(...sameSlugEntries(`/blog/${slug}/`, present, newestDate(matches)));
  }
  return entries;
}

function landingEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const page of Object.values(landings) as LandingPage[]) {
    const paths: Partial<Record<Locale, string>> = {};
    for (const [locale, data] of Object.entries(page.locales)) {
      const l = locale as Locale;
      paths[l] = `${l === defaultLocale ? '' : '/' + l}/${data!.slug}/`;
    }
    // A page whose facts changed after the last site-wide pass carries its own
    // `updated` date (the same field that drives its visible "checked in" line
    // and Course dateModified), so the sitemap tells Google about that change
    // instead of repeating the pass date.
    const own = page.updated ? `${page.updated}T00:00:00.000Z` : undefined;
    entries.push(...toEntry(paths, own && own > LANDING_PASS_DATE ? own : LANDING_PASS_DATE));
  }
  return entries;
}

function shapeEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const shapeLocales = Object.keys(shapes) as Locale[];

  // Hub — exists in every locale that has a shapes entry (en/it today).
  const hubPaths: Partial<Record<Locale, string>> = {};
  for (const l of shapeLocales) hubPaths[l] = shapesHubPath(l);
  entries.push(...toEntry(hubPaths, SHAPES_MODIFIED));

  // Spokes — only offer an alternate where that locale actually ships the shape,
  // mirroring the per-spoke filter already used in ShapePage.astro.
  const allSlugs = new Set(shapeLocales.flatMap((l) => shapes[l]!.spokes.map((sp) => sp.slug)));
  for (const slug of allSlugs) {
    const paths: Partial<Record<Locale, string>> = {};
    for (const l of shapeLocales) {
      if (shapes[l]!.spokes.some((sp) => sp.slug === slug)) paths[l] = shapePath(l, slug);
    }
    entries.push(...toEntry(paths, SHAPES_MODIFIED));
  }
  return entries;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const posts = await getCollection('blog');
  return [
    ...sameSlugEntries('/', locales, HOME_SHIP_DATE),
    // Blog index lists every post, so its own freshness tracks the newest one.
    ...sameSlugEntries('/blog/', locales, newestDate(posts)),
    ...[...infoPages].flatMap((p) => sameSlugEntries(p, ['en'], INFO_PAGES_SHIP_DATE)),
    ...blogEntries(posts),
    ...landingEntries(),
    ...shapeEntries(),
  ];
}
