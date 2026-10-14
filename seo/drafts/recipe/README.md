# Recipe post draft (not published)

Blocked on owner facts: every `{{OWNER: ...}}` placeholder (flour type, dough ratio, servings),
plus confirming prepTime PT40M / totalTime PT1H10M.

To publish:
1. `git apply seo/drafts/recipe/recipe-schema.patch` (adds the optional `recipe` frontmatter field
   and the Recipe JSON-LD in BlogPostPage.astro).
2. Move `en.md` to `src/content/blog/fresh-pasta-dough-recipe.md` and `it/fr/de/zh.md` to
   `src/content/blog/<locale>/fresh-pasta-dough-recipe.md`.
3. `grep -rn "{{OWNER" src/content/blog` must print nothing, then `npm run build`.
