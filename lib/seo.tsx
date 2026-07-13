import { site } from '@/lib/site';

/** JSON-LD helpers — rendered server-side on the relevant pages. */

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  );
}

export function ServiceJsonLd({ name, description, slug }: { name: string; description: string; slug: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: `${site.url}/services/${slug}`,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: 'GB',
        serviceType: 'Video production',
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  cover,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  cover: string;
  date: string;
}) {
  const url = `${site.url}/blog/${slug}`;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: cover,
        datePublished: date,
        dateModified: date,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@id': `${site.url}/#organization` },
        publisher: { '@id': `${site.url}/#organization` },
      }}
    />
  );
}

export function BlogListJsonLd({
  items,
}: {
  items: { title: string; slug: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${site.url}/blog`,
        url: `${site.url}/blog`,
        name: 'Moon Gleam AI Studio — Blog',
        publisher: { '@id': `${site.url}/#organization` },
        blogPost: items.map((it, i) => ({
          '@type': 'BlogPosting',
          position: i + 1,
          headline: it.title,
          url: `${site.url}/blog/${it.slug}`,
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          item: `${site.url}${t.path}`,
        })),
      }}
    />
  );
}
