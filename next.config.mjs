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
  async rewrites() {
    const rules = [];
    if (FUNNEL_ORIGIN) {
      rules.push({ source: '/go/:path*', destination: `${FUNNEL_ORIGIN}/:path*` });
    }
    return rules;
  },
};

export default nextConfig;
