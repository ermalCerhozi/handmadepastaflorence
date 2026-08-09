import type { APIRoute } from 'astro';
import { SITE } from '../i18n/utils';

// Only ever one child file today (well under the 50,000-URL-per-file limit),
// but kept as an index so the URL that robots.txt/GSC already point at never
// changes even if a second chunk is ever needed.
export const GET: APIRoute = async () => {
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `  <sitemap>\n    <loc>${SITE}/sitemap-0.xml</loc>\n  </sitemap>\n` +
    '</sitemapindex>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
