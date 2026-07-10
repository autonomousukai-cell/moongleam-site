/** @type {import('next').NextConfig} */

// GHL blog origin — posts are written in GoHighLevel and served here via reverse proxy.
// New posts appear on moongleam.co.uk/blog instantly, zero redeploys.
const BLOG_ORIGIN = process.env.GHL_BLOG_ORIGIN ?? 'https://blog.moongleam.co.uk';

// Optional: proxy GHL funnel pages on-domain (set GHL_FUNNEL_ORIGIN to enable).
const FUNNEL_ORIGIN = process.env.GHL_FUNNEL_ORIGIN ?? '';

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async rewrites() {
    const rules = [
      // GHL blog reverse proxy — keeps SEO authority on moongleam.co.uk.
      // If GHL ever forces a redirect back to the subdomain, remove these and
      // point the nav/footer Blog links at BLOG_ORIGIN instead.
      { source: '/blog', destination: `${BLOG_ORIGIN}/blog` },
      { source: '/blog/:path*', destination: `${BLOG_ORIGIN}/blog/:path*` },
    ];
    if (FUNNEL_ORIGIN) {
      rules.push({ source: '/go/:path*', destination: `${FUNNEL_ORIGIN}/:path*` });
    }
    return rules;
  },
};

export default nextConfig;
