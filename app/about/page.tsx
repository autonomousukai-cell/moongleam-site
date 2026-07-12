import type { Metadata } from 'next';
import Link from 'next/link';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { services, sectorPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — London AI Video Production Studio',
  description:
    'Moon Gleam is a London video production studio built for the AI era: full A-to-Z production in-house for 500+ UK businesses across six sectors.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />

      <section className="py-16 md:py-24">
        <div className="container-content">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">The Studio</p>
          <h1 className="max-w-3xl font-display text-display font-semibold text-moon">
            A video studio built for <span className="text-gleam">the AI era</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moon-soft">
            Moon Gleam is a London AI video production studio serving UK businesses — from local
            shops and restaurants to law firms, charities and schools. 500+ served and counting.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-heading font-semibold text-moon">
              Broadcast standards, AI speed
            </h2>
            <p className="mt-4 leading-relaxed text-moon-soft">
              The studio combines broadcast production standards with genuine command of creative
              AI. That combination is why our TVCs are delivered clearance-ready for UK television,
              our documentaries hold audiences for full episodes, and our promos ship in days
              instead of months.
            </p>
            <p className="mt-4 leading-relaxed text-moon-soft">
              Everything runs through one in-house pipeline — concept, script, storyboard,
              production (AI-generated, filmed with real models, or hybrid), edit, grade, sound and
              delivery. One team, from brief to broadcast.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">
              At a glance
            </p>
            <ul className="space-y-3">
              {[
                '500+ UK businesses served',
                'Eight video formats produced in-house',
                'Broadcast-standard, clearance-ready TVCs',
                'AI, live-action and hybrid workflows',
                'Full A-to-Z pipeline — no outsourcing',
                'Based in London, working UK-wide',
              ].map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-relaxed text-moon-soft">
                  <span className="text-gleam">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content">
          <h2 className="mb-10 text-center font-display text-heading font-semibold text-moon">
            Everything under one roof
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-gleam/50"
              >
                <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-glow">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display font-semibold text-moon transition-colors group-hover:text-gleam">
                  {s.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content">
          <h2 className="mb-10 text-center font-display text-heading font-semibold text-moon">
            Six sectors, one standard
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectorPages.map((s) => (
              <Link
                key={s.slug}
                href={`/sectors/${s.slug}`}
                className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-glow/50"
              >
                <h3 className="font-display font-semibold text-moon transition-colors group-hover:text-glow">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-moon-soft">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Work with a studio that ships."
        lead="Book a free call and see what broadcast standards plus Creative AI can do for your business."
      />
    </main>
  );
}
