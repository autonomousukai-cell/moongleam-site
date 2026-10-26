import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGrid from '@/components/WorkGrid';
import FAQ from '@/components/FAQ';
import { marked } from 'marked';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd, FaqJsonLd, metaDescription, socialMeta } from '@/lib/seo';
import { sectorPages, portfolio, services } from '@/lib/data';
import { sectorContent } from '@/lib/sectorContent';
import { posts } from '@/lib/posts';
import { cta } from '@/lib/site';

export function generateStaticParams() {
  return sectorPages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sec = sectorPages.find((s) => s.slug === params.slug);
  if (!sec) return {};
  const content = sectorContent[sec.slug];
  const title = content?.title ?? `Video Production for ${sec.name}`;
  const description = content?.description ?? metaDescription(sec.short, sec.desc);
  const path = `/sectors/${sec.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMeta(title, description, path),
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sec = sectorPages.find((s) => s.slug === params.slug);
  if (!sec) notFound();

  const examples = portfolio.filter((w) => w.sector === sec.sector).slice(0, 6);
  const content = sectorContent[sec.slug];
  const html = content ? (marked.parse(content.body) as string) : '';
  const svcs = content ? content.services.map((s) => services.find((x) => x.slug === s)).filter((x): x is (typeof services)[number] => Boolean(x)) : [];
  const guides = content ? content.guides.map((g) => posts.find((p) => p.slug === g)).filter((p): p is (typeof posts)[number] => Boolean(p)) : [];

  return (
    <main>
      {content && <FaqJsonLd items={content.faqs} />}
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
          <h1 className="max-w-3xl font-display text-display font-semibold text-moon">{content?.h1 ?? sec.name}</h1>
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

      {content && (
        <section className="border-t border-ink-line/60 py-16 md:py-24">
          <div className="container-content">
            <div className="blog-prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />

            {svcs.length > 0 && (
              <div className="mx-auto mt-12 max-w-3xl">
                <h2 className="mb-4 font-display text-lg font-semibold text-moon">Services for this sector</h2>
                <ul className="flex flex-wrap gap-3">
                  {svcs.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-ink-line px-4 py-2 text-sm text-moon-soft transition-colors hover:border-gleam/50 hover:text-moon">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="mb-6 font-display text-heading font-semibold text-moon">Frequently asked questions</h2>
              <FAQ items={content.faqs} />
            </div>

            {guides.length > 0 && (
              <div className="mx-auto mt-16 max-w-3xl">
                <h2 className="mb-6 font-display text-lg font-semibold text-moon">Related guides</h2>
                <ul className="space-y-3">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/blog/${g.slug}`} className="group flex items-center gap-3 rounded-xl border border-ink-line bg-ink-soft px-5 py-4 transition-colors duration-200 hover:border-gleam/50">
                        <span className="text-gleam">→</span>
                        <span className="text-sm font-medium text-moon-soft transition-colors group-hover:text-moon">{g.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

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
