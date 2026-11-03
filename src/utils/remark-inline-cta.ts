// Drops one "Book your class" block into the middle of every blog post.
//
// The posts are plain .md (no MDX, so no components), which means the only
// place to add a block to the body is the markdown pipeline itself. This runs at
// build time, so the block is in the HTML crawlers and no-JS readers get.
//
// WHERE: at the "##" boundary nearest the middle of the article, counted in
// top-level blocks, so a long section does not drag the block to a lopsided
// spot. Always BEFORE a "##", never inside a list or table. Skipped when the
// post has fewer than three "##" sections (too short to interrupt) or when no
// boundary falls in the middle half of the article.
//
// OPT OUT: `inlineCta: false` in a post's frontmatter.
//
// The class the button preselects is not decided here. The page template puts
// `data-prefill-default` on <article>, and the button inherits it.

import { dictionaries } from '../i18n/ui';
import type { Locale } from '../i18n/config';
import { inlineCtaHtml } from './cta-markup';

// Just enough of the mdast shape for what we touch; avoids a @types/mdast dependency.
interface Node { type: string; depth?: number; value?: string; children?: Node[] }
interface VFileLike { path?: string; history?: string[]; data?: { astro?: { frontmatter?: Record<string, unknown> } } }

const POST_PATH = /[\\/]content[\\/]blog[\\/](?:(it|fr|de|zh)[\\/])?([^\\/]+)\.md$/;

export default function remarkInlineCta() {
  return (tree: Node, file: VFileLike) => {
    const match = (file.path ?? file.history?.[0] ?? '').match(POST_PATH);
    if (!match) return;
    if (file.data?.astro?.frontmatter?.inlineCta === false) return;

    const lang = (match[1] ?? 'en') as Locale;
    const slug = match[2];
    const blocks = tree.children ?? [];

    const h2s = blocks.flatMap((n, i) => (n.type === 'heading' && n.depth === 2 ? [i] : []));
    if (h2s.length < 3) return;

    // Closest boundary to the middle, within the middle half of the article.
    const middle = blocks.length / 2;
    const at = h2s
      .filter((i) => i >= blocks.length * 0.25 && i <= blocks.length * 0.75)
      .sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle))[0];
    if (at === undefined) return;

    const ref = `${lang === 'en' ? '' : `/${lang}`}/blog/${slug}/`;
    blocks.splice(at, 0, {
      type: 'html',
      value: inlineCtaHtml(dictionaries[lang], { ref, source: 'blog-inline' }),
    });
  };
}
