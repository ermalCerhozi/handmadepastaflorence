// Shared JSON-LD builders.
//
// These two shapes were hand-written in five (FAQPage) and five
// (BreadcrumbList) places, all identical bar the input data. Keeping them here
// means a change to the markup shape lands on every page at once, and a page
// can't quietly drift from the others.
//
// Both return standalone documents (they carry `@context`), because this site
// emits one <script type="application/ld+json"> per node rather than a single
// sitewide @graph.

interface Faq {
  q: string;
  a: string;
}

interface Crumb {
  name: string;
  item: string;
}

/** FAQPage document for a page's question/answer pairs. */
export function faqSchema(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** BreadcrumbList document. `position` is derived from trail order, so it can't skew. */
export function breadcrumbSchema(trail: readonly Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
