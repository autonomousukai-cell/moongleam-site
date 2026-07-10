import type { Metadata } from 'next';
import Link from 'next/link';
import CTABand from '@/components/CTABand';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — London AI Video Production Studio',
  description:
    'Moon Gleam combines 20+ years of broadcast craft with creative AI. 500+ UK businesses served, TVCs aired on UK channels, full production in-house.',
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
            Anyone can generate. <span className="text-gleam">We direct.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moon-soft">
            Moon Gleam is a London AI video production studio built on 20+ years of broadcast
            craft — serving 500+ UK businesses from local shops to law firms.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-line/60 py-16 md:py-24">
        <div className="container-content grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-heading font-semibold text-moon">
              Broadcast craft, AI speed
            </h2>
            <p className="mt-4 leading-relaxed text-moon-soft">
              Founded by Azhar Bhuiyan, Moon Gleam combines two things that rarely exist in one
              studio: real broadcast television experience and genuine command of creative AI.
              That combination is why our TVCs air on UK channels, our documentaries hold
              audiences for full episodes, and our promos are delivered in days instead of months.
            </p>
            <p className="mt-4 leading-relaxed text-moon-soft">
              We run the full pipeline in-house — concept, script, storyboard, production (AI,
              filmed with real models, or hybrid), edit, grade, sound and delivery. One team from
              brief to broadcast.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">
              At a glance
            </p>
            <ul className="space-y-3">
              {[
                '500+ UK businesses served',
                '20+ years broadcast experience',
                'TVCs aired on UK television channels',
                'Full A-to-Z production in-house',
                'AI, live-action and hybrid workflows',
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

      <CTABand
        title="Work with a studio that ships."
        lead="Book a free call and see what 20 years of broadcast plus Creative AI can do for your business."
      />
    </main>
  );
}
