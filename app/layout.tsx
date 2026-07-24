// Root layout — nav/footer on content pages (hidden on the immersive
// homepage via <Chrome>), GHL chat, JSON-LD.
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import Chrome from '@/components/Chrome';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MessengerFab from '@/components/MessengerFab';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Moon Gleam AI Studio — AI-Powered Video Production, London',
    template: '%s | Moon Gleam AI Studio',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Moon Gleam AI Studio',
    description: 'AI-powered videos that grow UK businesses.',
    url: site.url,
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Gleam AI Studio',
    description: 'AI-powered videos that grow UK businesses.',
  },
  robots: { index: true, follow: true },
};

/** Organization + LocalBusiness + WebSite structured data — site-wide.
 * The full sameAs set, logo and cross-linked @ids give AI search engines and
 * knowledge-graph systems a clean, unambiguous entity to cite (GEO). */
const socialProfiles = [
  site.social.youtube,
  site.social.facebook,
  site.social.instagram,
  site.social.tiktok,
  site.social.linkedin,
];

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      slogan: site.slogan,
      description: site.description,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/mg-logo.png`,
      },
      image: `${site.url}/mg-logo.png`,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '208-214 Romford Road',
        addressLocality: site.contact.addressLocality,
        postalCode: site.contact.postalCode,
        addressCountry: 'GB',
      },
      areaServed: 'GB',
      sameAs: socialProfiles,
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#localbusiness`,
      name: site.name,
      description: site.description,
      url: site.url,
      logo: `${site.url}/mg-logo.png`,
      image: `${site.url}/mg-logo.png`,
      email: site.contact.email,
      telephone: site.contact.phone,
      priceRange: '££',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '208-214 Romford Road',
        addressLocality: site.contact.addressLocality,
        postalCode: site.contact.postalCode,
        addressCountry: 'GB',
      },
      areaServed: 'GB',
      sameAs: socialProfiles,
      knowsAbout: [
        'AI video production',
        'TV commercials',
        'promotional videos',
        'product videos',
        'documentary production',
        'kids animation',
        'UGC content',
        'video marketing',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Chrome>
          <Nav />
        </Chrome>
        {children}
        <Chrome>
          <Footer />
        </Chrome>
        <MessengerFab />
        {/* GHL chat — homepage-gated so the bubble never covers the scroll cue. */}
        <ChatWidget />
      </body>
    </html>
  );
}
