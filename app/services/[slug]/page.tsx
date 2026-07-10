import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGrid from '@/components/WorkGrid';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/lib/seo';
import { services, portfolio } from '@/lib/data';
import { cta } from '@/lib/site';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return {};
  return {
    title: `${svc.name} — London & UK`,
    description: svc.short,
    alternates: { canonical: `/services/${svc.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) notFound();

  const examples = portfolio.filter((w) => w.cat === svc.cat).slice(0, 6);

  return (
    <main>
      <ServiceJsonLd name={svc.name} description={svc.short} slug={svc.slug} />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: svc.name, path: `/services/${svc.slug}` },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-content">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            Service · London &amp; UK
          </p>
          <h1 className="max-w-3xl font-display text-display font-semibold text-moon">{svc.name}</h1>
          {/* Answer-first lead for AEO */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moon-soft">{svc.short}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={cta.href}
              className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
            >
              {cta.label}
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-glow hover:text-glow"
            >
              See examples
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-heading font-semibold text-moon">What you get</h2>
            <p className="mt-4 leading-relaxed text-moon-soft">{svc.desc}</p>
          </div>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">Included</p>
            <ul className="space-y-3">
              {svc.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-moon-soft">
                  <span className="text-gleam">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {examples.length > 0 && (
        <section className="border-t border-ink-line/60 py-16 md:py-24">
          <div className="container-content">
            <h2 className="mb-10 text-center font-display text-heading font-semibold text-moon">
              Recent work in this format
            </h2>
            <WorkGrid items={examples} mode="sector" />
          </div>
        </section>
      )}

      <CTABand
        title="Want this for your business?"
        lead="Book a free call — we'll scope it, quote it, and tell you honestly whether AI, filmed or hybrid is right for you."
      />
    </main>
  );
}
