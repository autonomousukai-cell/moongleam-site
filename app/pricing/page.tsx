import type { Metadata } from 'next';
import Link from 'next/link';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Pricing — Video Production Packages in £',
  description:
    'Transparent UK video production pricing: social packs, promo videos and broadcast TVCs. AI-powered production means broadcast quality at prices you can plan around.',
  alternates: { canonical: '/pricing' },
};

const pricingFaqs = faqs.slice(0, 6);

export default function PricingPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]} />
      <FaqJsonLd items={pricingFaqs} />

      <section className="py-16 md:py-24">
        <div className="container-content text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">Pricing</p>
          <h1 className="mx-auto max-w-3xl font-display text-display font-semibold text-moon">
            Clear pricing. <span className="text-gleam">Serious quality.</span>
          </h1>
          {/* Answer-first for AEO */}
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-moon-soft">
            Social videos from £499, promo videos from £1,499, broadcast TVCs from £3,999. Every
            project is scoped on a free call — these are honest starting points, not hidden-fee
            teasers.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-content">
          <Pricing />
          <p className="mt-8 text-center text-sm text-moon-faint">
            Documentary, kids animation, short film and monthly content engines are quoted per
            project —{' '}
            <Link href="/contact" className="text-gleam underline-offset-4 hover:underline">
              book a free call
            </Link>{' '}
            for a tailored number.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content">
          <h2 className="mb-10 text-center font-display text-heading font-semibold text-moon">
            Pricing FAQs
          </h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>

      <CTABand
        title="Not sure which tier? Ask us."
        lead="15 minutes, no obligation. We'll recommend the right route and send a written quote the same day."
      />
    </main>
  );
}
