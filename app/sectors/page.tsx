import type { Metadata } from 'next';
import Link from 'next/link';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { sectorPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sectors — Video for Law Firms, Accountants, Charities, Retail & More',
  description:
    'Sector-specialist video production: law firms, accountancy, charities, education, retail & jewellers, and travel. 500+ UK businesses served.',
  alternates: { canonical: '/sectors' },
};

export default function SectorsPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Sectors', path: '/sectors' }]} />

      <section className="py-16 md:py-24">
        <div className="container-content text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">Sectors</p>
          <h1 className="mx-auto max-w-3xl font-display text-display font-semibold text-moon">
            We already know <span className="text-gleam">your industry</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-moon-soft">
            500+ UK businesses across six sectors. Pick yours and see the work we&apos;ve done for
            businesses like you.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectorPages.map((s) => (
            <Link
              key={s.slug}
              href={`/sectors/${s.slug}`}
              className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gleam/50"
            >
              <h2 className="font-display text-lg font-semibold text-moon transition-colors group-hover:text-gleam">
                {s.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-moon-soft">{s.short}</p>
              <p className="mt-4 text-xs text-glow">{s.proof}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title="Don't see your sector? We've probably done it."
        lead="500+ businesses covers a lot of ground. Ask us."
      />
    </main>
  );
}
