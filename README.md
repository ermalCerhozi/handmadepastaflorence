# Handmade Pasta Florence

Marketing website for a handmade pasta cooking-class experience in Florence, Italy. Visitors can browse the experiences, view a gallery of pasta shapes, read reviews, and book a class through the on-page booking drawer.

Built with [Astro](https://astro.build).

## Tech stack

- **Astro 6** — static site generator
- Component-based `.astro` files (no UI framework dependency)
- Plain CSS (`src/styles/`)

## Project structure

```
src/
  components/    Page sections (Hero, Experiences, Reviews, Gallery, Booking, …)
  layouts/       Layout.astro
  pages/         index.astro (home), 404.astro
  styles/        global.css
public/images/   Photos and pasta-shape assets
```

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
```

## Scripts

| Command           | Action                                 |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the local dev server             |
| `npm run build`   | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally   |

## Deployment

The site is configured for `https://handmadepastaflorence.com` (see `astro.config.mjs`). Run `npm run build` and serve the generated `dist/` directory from any static host.
