import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGrid from '@/components/WorkGrid';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { sectorPages, portfolio } from '@/lib/data';
import { cta } from '@/lib/site';

export function generateStaticParams() {
  return sectorPages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sec = sectorPages.find((s) => s.slug === params.slug);
  if (!sec) return {};
  return {
    title: `Video Production for ${sec.name}`,
    description: sec.short,
    alternates: { canonical: `/sectors/${sec.slug}` },
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sec = sectorPages.find((s) => s.slug === params.slug);
  if (!sec) notFound();

  const examples = portfolio.filter((w) => w.sector === sec.sector).slice(0, 6);

  return (
    <main>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Sectors', path: '/sectors' },
          { name: sec.name, path: `/sectors/${sec.slug}` },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-content">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            Video for {sec.name}
          </p>
          <h1 className="max-w-3xl font-display text-display font-semibold text-moon">{sec.name}</h1>
          {/* Answer-first lead for AEO */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moon-soft">{sec.short}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-block rounded-full bg-gleam px-7 py-3 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            {cta.label}
          </Link>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-heading font-semibold text-moon">
              Why video works in your sector
            </h2>
            <p className="mt-4 leading-relaxed text-moon-soft">{sec.desc}</p>
          </div>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gleam">
              We&apos;ve done it before
            </p>
            <p className="text-sm leading-relaxed text-moon-soft">{sec.proof}</p>
            <p className="mt-4 text-sm leading-relaxed text-moon-soft">
              Part of 500+ UK businesses served across retail, professional services, education,
              charity and travel.
            </p>
          </div>
        </div>
      </section>

      {examples.length > 0 && (
        <section className="border-t border-ink-line/60 py-16 md:py-24">
          <div className="container-content">
            <h2 className="mb-10 text-center font-display text-heading font-semibold text-moon">
              Work for businesses like yours
            </h2>
            <WorkGrid items={examples} mode="category" />
          </div>
        </section>
      )}

      <CTABand
        title="Your competitors haven't done this yet."
        lead="Book a free 15-minute call and we'll show you exactly what video could do for your firm — with examples from your own sector."
      />
    </main>
  );
}
