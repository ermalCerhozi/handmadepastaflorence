#!/usr/bin/env node
// Submits every URL in the built sitemap to the IndexNow API (Bing, Yandex,
// Naver) for near-instant reindexing, instead of waiting on regular crawl
// discovery — most useful right after a deploy that adds/changes URLs.
//
// Usage (after `npm run build`, so dist/sitemap-0.xml is current):
//   node src/scripts/indexnow-submit.mjs
//
// Not wired into the build/deploy pipeline — run it by hand (or from a
// post-deploy CI step) after a deploy you want indexed quickly. It is safe to
// run repeatedly; IndexNow de-duplicates on its end.
//
// The key file below must stay published at the site root (public/<key>.txt)
// — IndexNow verifies ownership by fetching https://<host>/<key>.txt and
// checking its contents match the key you submit.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HOST = 'handmadepastaflorence.com';
const KEY = 'bac61a2238d2a6298bb6c4c702401fd3';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemapPath = path.resolve(__dirname, '../../dist/sitemap-0.xml');

function extractUrls(xml) {
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  return [...matches].map((m) => m[1]);
}

async function main() {
  let xml;
  try {
    xml = readFileSync(sitemapPath, 'utf-8');
  } catch {
    console.error(`Could not read ${sitemapPath} — run "npm run build" first.`);
    process.exitCode = 1;
    return;
  }

  const urlList = extractUrls(xml);
  if (urlList.length === 0) {
    console.error('No <loc> entries found in the sitemap — nothing to submit.');
    process.exitCode = 1;
    return;
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  console.log(`Submitted ${urlList.length} URLs — IndexNow responded ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    if (body) console.error(body);
    process.exitCode = 1;
  }
}

main();
