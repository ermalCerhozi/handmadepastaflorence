import type { APIRoute } from 'astro';
import { getSitemapEntries } from '../utils/sitemap-entries';

export const GET: APIRoute = async () => {
  const entries = await getSitemapEntries();

  const urls = entries
    .map((e) => {
      const alts = e.alternates
        .map((a) => `      <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
        .join('\n');
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${e.loc}</loc>${lastmod}\n${alts}\n  </url>`;
    })
    .join('\n');

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
