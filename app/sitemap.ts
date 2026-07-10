import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services, sectorPages } from '@/lib/data';

/**
 * Sitemap for moongleam.co.uk pages. The GHL blog has its own sitemap at
 * https://blog.moongleam.co.uk/sitemap.xml — submit both in Google Search Console.
 * /blog itself is included here since it's served on-domain via reverse proxy.
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
  ];
}
