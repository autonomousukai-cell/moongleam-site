import type { Metadata } from 'next';
import Link from 'next/link';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Video Production Services — TVC, Promo, Documentary, Animation',
  description:
    'Every format, one London studio: AI-powered video production, TV commercials, business promos, UGC, documentary, kids animation and short film.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />

      <section className="py-16 md:py-24">
        <div className="container-content text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">Services</p>
          <h1 className="mx-auto max-w-3xl font-display text-display font-semibold text-moon">
            Every format. <span className="text-gleam">One studio.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-moon-soft">
            From 15-second social hooks to broadcast TVCs and full documentary series — produced
            end to end, powered by Creative AI.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gleam/50"
            >
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-glow">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-lg font-semibold text-moon transition-colors group-hover:text-gleam">
                {s.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-moon-soft">{s.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title="Not sure what you need? That's normal."
        lead="Tell us your goal — more customers, more donations, more bookings — and we'll recommend the format."
      />
    </main>
  );
}
