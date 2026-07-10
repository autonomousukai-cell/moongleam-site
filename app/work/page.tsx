import type { Metadata } from 'next';
import WorkGrid from '@/components/WorkGrid';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Work — AI Video Production Portfolio',
  description:
    'TVCs aired on UK television, documentaries, kids animation and campaigns for 500+ UK businesses. Watch the Moon Gleam portfolio.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]} />

      <section className="py-16 md:py-24">
        <div className="container-content text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">Portfolio</p>
          <h1 className="mx-auto max-w-3xl font-display text-display font-semibold text-moon">
            Work that&apos;s <span className="text-gleam">worked</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-moon-soft">
            TVCs aired on UK television, documentaries, animation and campaigns for 500+ UK
            businesses. Click any piece to watch.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-content">
          <WorkGrid mode="category" />
        </div>
      </section>

      <CTABand
        title="Your video could be next."
        lead="Tell us what you're promoting — we'll show you what it could look like."
      />
    </main>
  );
}
