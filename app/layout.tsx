// Root layout — nav/footer site-wide, GHL chat, JSON-LD.
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { site } from '@/lib/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MessengerFab from '@/components/MessengerFab';

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

/** Organization + LocalBusiness structured data — site-wide. */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      slogan: site.slogan,
      email: site.contact.email,
      telephone: site.contact.phone,
      sameAs: [site.social.youtube, site.social.facebook],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#localbusiness`,
      name: site.name,
      description: site.description,
      url: site.url,
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
      knowsAbout: [
        'AI video production',
        'TV commercials',
        'promotional videos',
        'documentary production',
        'kids animation',
        'UGC content',
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
        <Nav />
        {children}
        <Footer />
        <MessengerFab />
        {/* GHL chat widget "Moon Gleam Chat" (LeadConnector) — site-wide.
            WhatsApp channel appears automatically once connected in GHL. */}
        {site.ghl.chatWidgetId ? (
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id={site.ghl.chatWidgetId}
            strategy="afterInteractive"
          />
        ) : site.ghl.chatSrc ? (
          <Script src={site.ghl.chatSrc} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
