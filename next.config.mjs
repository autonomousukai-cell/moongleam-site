/** @type {import('next').NextConfig} */

// The blog is now native to this site (app/blog) — the old GoHighLevel reverse
// proxy to blog.moongleam.co.uk has been retired so the on-theme pages serve
// directly and dark-on-dark readability is fixed.

// Optional: proxy GHL funnel pages on-domain (set GHL_FUNNEL_ORIGIN to enable).
const FUNNEL_ORIGIN = process.env.GHL_FUNNEL_ORIGIN ?? '';

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      // Blog cover images (AI-generated stills the client owns). These can later
      // be localised into /public/blog and this pattern removed.
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
    ],
  },
  async redirects() {
    // 16 Nov 2026: Moon Gleam moved to https://moongleam.ai (founder-approved full
    // migration). Every legacy URL 301s to its closest moongleam.ai page; the blog
    // guides were ported to moongleam.ai/insights. /go (GHL funnel proxy), /api and the
    // IndexNow key file stay on this domain.
    const AI = 'https://moongleam.ai';
    const map = [
      ['/', '/'],
      ['/studio', '/'],
      ['/experience', '/'],
      ['/work', '/films'],
      ['/services', '/services'],
      ['/services/ai-video-production', '/productions'],
      ['/services/business-promo-videos', '/services/brand-films'],
      ['/services/product-promo-videos', '/services/product-films'],
      ['/services/tv-commercials', '/services/tv-commercials'],
      ['/services/ugc-content', '/productions/ai-ugc-ads'],
      ['/services/documentary', '/services/documentaries'],
      ['/services/kids-animation', '/services/animation'],
      ['/services/short-film', '/services/original-films'],
      ['/sectors', '/insights/video-marketing-by-sector'],
      ['/sectors/law-firms', '/insights/explainer-video-production'],
      ['/sectors/accountants', '/insights/explainer-video-production'],
      ['/sectors/charities', '/services/cause-campaigns'],
      ['/sectors/education', '/services/animation'],
      ['/sectors/retail', '/insights/product-promotional-videos'],
      ['/sectors/travel', '/insights/travel-tour-operator-video-marketing'],
      ['/pricing', '/productions'],
      ['/about', '/about'],
      ['/contact', '/contact'],
      ['/blog', '/insights'],
      ['/blog/restaurant-video-marketing', '/insights/restaurant-video-marketing-uk'],
      ['/blog/:slug', '/insights/:slug'],
    ];
    return [
      ...map.map(([source, dest]) => ({ source, destination: AI + dest, permanent: true })),
      // Anything else (old assets, unknown paths) goes to the same path on moongleam.ai.
      {
        source: '/:path((?!go/|api/|_next/|fc0e57b8019748ed90ac6c4d2dfea206\\.txt).*)',
        destination: AI + '/:path',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const rules = [];
    if (FUNNEL_ORIGIN) {
      rules.push({ source: '/go/:path*', destination: `${FUNNEL_ORIGIN}/:path*` });
    }
    return rules;
  },
};

export default nextConfig;
