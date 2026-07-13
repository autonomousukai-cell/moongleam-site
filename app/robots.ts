import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    // Blog is native now (included in the main sitemap) — no external blog sitemap.
    sitemap: [`${site.url}/sitemap.xml`],
  };
}
