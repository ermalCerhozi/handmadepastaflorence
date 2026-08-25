// Central registry of every optimizable content image (build-time imports so
// Astro's <Image>/getImage() can process them — WebP/AVIF + responsive
// srcset). Imported once here and referenced by key everywhere else, so
// landings.ts / shapes.ts / components don't each hold their own import.
//
// NOT here: public/images/logo.png (tiny, used as a fixed small icon — not
// worth the pipeline), og-share.webp, favicons, apple-touch-icon — those stay
// in public/ because they must resolve at a stable, un-hashed URL (social
// crawlers, schema.org JSON-LD, <link> tags).
export { default as cookingClassGuests } from './cooking_class_with_guests_in_picture.webp';
export { default as aperitivo } from './aperitivo.webp';
export { default as weddingCake } from './wedding-cake-2.webp';
// First frames of the two clips in src/assets/video/ — each is the poster and
// the reduced-motion fallback for its clip, so a re-encode means re-exporting
// the matching still. Each still deliberately shares its clip's filename (only
// the extension differs): both are indexable, and the private one is also that
// page's og:image. See src/scripts/loop-video.ts for how they pair up.
export { default as longTablePoster } from './private-pasta-class-long-table-florence-agriturismo.webp';
export { default as longTablePrivatePoster } from './private-cooking-class-florence-agriturismo.webp';
export { default as cookingClass } from './cooking-class.webp';
export { default as plates } from './plates.webp';
export { default as shapePici } from './shape-pici.webp';
export { default as shapePappardelle } from './shape-pappardelle.webp';
export { default as shapeTagliatelle } from './shape-tagliatelle.webp';
export { default as shapeTortelli } from './shape-tortelli.webp';
export { default as shapeRavioli } from './shape-ravioli.webp';
export { default as cuttingPizza } from './cutting-pizza.webp';
export { default as handsOnGroup } from './hands-on-pasta-cooking-class-florence-group.webp';
export { default as handsOnChef } from './hands-on-pasta-making-class-florence-chef.webp';
export { default as privateTeamBuilding } from './private-pasta-cooking-class-florence-team-building.webp';
