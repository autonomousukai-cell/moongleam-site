import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services, sectorPages } from '@/lib/data';
import { posts } from '@/lib/posts';

/**
 * Sitemap for moongleam.co.uk pages. The blog is now native (app/blog) so its
 * index and every post are listed here — no external blog sitemap to submit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/work', '/services', '/sectors', '/pricing', '/about', '/contact', '/blog'];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: (p === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: p === '' ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...sectorPages.map((s) => ({
      url: `${site.url}/sectors/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
