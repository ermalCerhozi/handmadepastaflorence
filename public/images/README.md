# Image assets

> This file is inside `public/`, so it is copied to `dist/` and served at
> https://handmadepastaflorence.com/images/README.md — it is crawlable. Keep it
> factual and free of internal notes.

## Where images actually live

Almost every content image is in **`src/assets/images/`**, not here. Those go
through Astro's image pipeline (`<Image>` / `getImage()`), which emits WebP/AVIF
at several widths and a content hash in the filename. They are imported by key
from `src/assets/images/index.ts` and referenced as `img.<key>` everywhere else,
so no page holds its own import path.

**`public/images/` holds only the files that need a stable, un-hashed URL:**

| File            | Why it must stay un-hashed                                  |
|-----------------|-------------------------------------------------------------|
| `og-share.webp` | Social crawlers and schema.org JSON-LD point at a fixed URL. |
| `logo.png`      | Tiny fixed-size icon; not worth the pipeline.                |

Favicons and `apple-touch-icon.png` sit at the `public/` root for the same
reason.

## Naming convention

Lowercase **kebab-case**, no spaces and no underscores — Google treats hyphens
as word boundaries in an image URL and underscores as joiners, so
`fresh-ravioli-pasta.webp` is read as three words and `fresh_ravioli_pasta.webp`
as one.

Name the file after **what is actually in the frame**, not after the page that
happens to use it. Most of these photos are reused across many landing pages
with different alt text (the antipasto board appears on the gluten-free page and
the shape pages), so a filename tied to one page is wrong everywhere else. Two
or four plain words beat a keyword list: `handmade-ravioli-pasta.webp`, not
`best-handmade-fresh-ravioli-pasta-cooking-class-florence-italy.webp`.

A rename here is a URL change. `src/assets/` files are hashed, so an old URL
simply stops existing; `public/` files keep their path, so renaming one needs a
301 (see `ops/nginx/`) or the old URL 404s and loses whatever image-search
signal it held.

## Format & size

- **WebP** for photos (AVIF is fine too) — 25–35% smaller than JPEG at equal
  quality. The pipeline handles conversion for `src/assets/` images.
- Keep source photos under ~300 KB where you can; video clips in
  `src/assets/video/` are the only large assets.
- Every content image needs real alt text describing the photo. Decorative
  images (the line-art icons, separators) take `alt=""` plus `aria-hidden`.
