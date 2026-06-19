# Image assets

Drop your photography here. Files in `public/` are served from the site root,
so `public/images/hero-poster.jpg` is referenced in code as `/images/hero-poster.jpg`.

## What goes where (main site — `/`)

| Filename (suggested)      | Used by                | Ideal size / ratio        | Notes |
|---------------------------|------------------------|---------------------------|-------|
| `hero.mp4`                | `Hero.astro`           | 1920×1080, <6 MB, looped  | Slow-mo pasta tossing. Also export `hero-poster.jpg` (first frame). |
| `hero-poster.jpg`         | `Hero.astro`           | 1920×1080                 | Shown while the video loads / on mobile. |
| `class-nonna.jpg`         | `Experiences.astro`    | 1200×900 (4:3)            | "The Nonna Table" card. |
| `class-mercato.jpg`       | `Experiences.astro`    | 1200×900 (4:3)            | "Mercato & Mani" card. |
| `class-private.jpg`       | `Experiences.astro`    | 1200×900 (4:3)            | "The Family Long-Table" card. |
| `shape-pappardelle.jpg`   | `PastaGallery.astro`   | 800×500 (16:10)           | Gallery disc image. |
| `shape-ravioli.jpg`       | `PastaGallery.astro`   | 800×500                   | |
| `shape-pici.jpg`          | `PastaGallery.astro`   | 800×500                   | |
| `shape-tortelli.jpg`      | `PastaGallery.astro`   | 800×500                   | |
| `shape-tagliatelle.jpg`   | `PastaGallery.astro`   | 800×500                   | |
| `story-kitchen.jpg`       | `Story.astro`          | 900×1100 (portrait)       | Front photo in the overlap pair. |
| `story-nonna.jpg`         | `Story.astro`          | 900×900                   | Back photo in the overlap pair. |
| `online-live.jpg`         | `OnlineBand.astro`     | 600×600                   | Small thumbnail for the online band. |
| `og.jpg`                  | `Layout.astro` (meta)  | 1200×630                  | Social share / Open Graph image. |

> Each of these currently renders as a CSS gradient placeholder. Once the files
> are here, tell me and I'll swap the gradients for real `<img>` tags with
> responsive `srcset`, lazy-loading and the correct aspect-ratios already wired.

## Formats & optimization
- Prefer **`.webp`** (or `.avif`) for photos — 25–35% smaller than JPG at the same quality.
- Keep each photo under ~300 KB; the hero video is the only large asset.
- Filenames: lowercase, hyphenated, no spaces.

## Quick temporary option
If you don't have a shoot yet, say the word and I'll wire in curated Unsplash
pasta photography as stand-ins so the site looks finished for a demo.
