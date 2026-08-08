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
export { default as cookingClass } from './cooking-class.webp';
export { default as plates } from './plates.webp';
export { default as shapePici } from './shape-pici.webp';
export { default as shapePappardelle } from './shape-pappardelle.webp';
export { default as shapeTagliatelle } from './shape-tagliatelle.webp';
export { default as shapeTortelli } from './shape-tortelli.webp';
export { default as shapeRavioli } from './shape-ravioli.webp';
export { default as cuttingPizza } from './cutting-pizza.webp';
