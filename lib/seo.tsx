import type { Metadata } from 'next';
import { site } from '@/lib/site';

/**
 * Per-page Open Graph + Twitter tags. Without this, every inner page inherited the
 * homepage's og:title/og:url from the root layout, so shared links previewed as the homepage.
 */
export function socialMeta(title: string, description: string, path: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Meta description of ~150–160 chars: the short line plus the first sentence of the long copy. */
export function metaDescription(short: string, long: string, max = 160): string {
  const first = (long.match(/^[^.!?]+[.!?]/)?.[0] ?? long).trim();
  let out = `${short.trim()} ${first}`.trim();
  if (out.length <= max) return out;
  out = out.slice(0, max - 1);
  return out.slice(0, out.lastIndexOf(' ')).replace(/[,;:—–-]+$/, '').trim() + '…';
}

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
  updated,
}: {
  title: string;
  description: string;
  slug: string;
  cover: string;
  date: string;
  updated?: string;
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
        dateModified: updated ?? date,
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
