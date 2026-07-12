import Link from 'next/link';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import WorkGrid from '@/components/WorkGrid';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABand from '@/components/CTABand';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { FaqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/data';

export default function Home() {
  return (
    <main>
      <FaqJsonLd items={faqs} />

      {/* Hero (split, with showreel) */}
      <Hero />

      {/* Client project marquee — Moon Gleam portfolio clients */}
      <LogoMarquee />

      {/* Method: Hook / Story / Conversion */}
      <Section
        id="method"
        eyebrow="The Method"
        title="What goes into every video"
        cards={[
          {
            tag: '01 — Hook',
            title: 'Stop the scroll',
            body: 'The first three seconds decide whether your audience keeps watching. Every video opens with a hook engineered to hold them to the end.',
          },
          {
            tag: '02 — Story',
            title: 'Structure that holds',
            body: 'Clear, cinematic storytelling from the first frame to the last — so viewers stay to the end and remember who you are.',
          },
          {
            tag: '03 — Conversion',
            title: 'Built to convert',
            body: 'By the end, your customer is ready to move — call, visit, book or donate. Nothing in the edit is filler.',
          },
        ]}
      />

      {/* Work grid filtered by sector */}
      <section id="work" className="border-t border-ink-line/60 py-20 md:py-28">
        <div className="container-content">
          <SectionHeading
            center
            eyebrow="Recent Work"
            title="The videos we ship"
            lead="Real work for real UK businesses. Filter by your industry."
          />
          <WorkGrid mode="sector" limit={9} />
          <div className="mt-10 text-center">
            <Link
              href="/work"
              className="inline-block rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-gleam/50 hover:text-gleam"
            >
              View full portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Framework */}
      <Section
        id="framework"
        eyebrow="The Framework"
        title="Brief → Script → Shoot / Generate → Deliver"
        cards={[
          {
            title: '1. Brief',
            body: 'A free 15-minute call. You tell us your business, your customer and your goal. We recommend AI, filmed or hybrid.',
          },
          {
            title: '2. Script',
            body: 'You see exactly what the video will say and how every frame will look — locked with your approval before production.',
          },
          {
            title: '3. Shoot / Generate',
            body: 'AI generation, filming with real models, or both — plus edit, grade, sound design and voiceover, all in-house.',
          },
          {
            title: '4. Deliver',
            body: 'Final cut plus cutdowns for every platform — website, TV, social, ads — usually within days of sign-off.',
          },
        ]}
      />

      {/* Pricing */}
      <section id="pricing" className="border-t border-ink-line/60 py-20 md:py-28">
        <div className="container-content">
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Clear pricing. Serious quality."
            lead="Honest starting points in pounds — every project gets a tailored quote on your free call. Most videos are delivered inside two weeks."
          />
          <Pricing />
        </div>
      </section>

      {/* Studio promise */}
      <section className="border-t border-ink-line/60 py-20 md:py-28">
        <div className="container-content grid items-center gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="The Promise"
            title="Two weeks, brief to delivery"
            lead="Most projects ship inside 14 days: brief on Monday, script and storyboard locked by Friday, production the following week, delivery with platform cutdowns the moment it's approved. Hard deadline? Tell us — we build the timeline around it."
          />
          <div className="grid grid-cols-2 gap-4">
            {[
              ['500+', 'UK businesses served'],
              ['8 formats', 'produced in-house'],
              ['Days', 'not months, to deliver'],
              ['1 team', 'brief to broadcast'],
            ].map(([stat, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-glow/50"
              >
                <p className="font-display text-3xl font-semibold text-gleam">{stat}</p>
                <p className="mt-1 text-sm text-moon-soft">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-ink-line/60 py-20 md:py-28">
        <div className="container-content">
          <SectionHeading center eyebrow="Questions" title="Frequently asked" />
          <FAQ />
        </div>
      </section>

      {/* Blog cross-link */}
      <section className="border-t border-ink-line/60 py-16">
        <div className="container-content flex flex-col items-center justify-between gap-6 rounded-2xl border border-ink-line bg-ink-soft p-8 text-center md:flex-row md:text-left">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-glow">
              From the studio
            </p>
            <p className="font-display text-lg font-semibold text-moon">
              AI, film &amp; growth — notes from the studio
            </p>
            <p className="mt-1 text-sm text-moon-soft">
              Practical thinking on AI video and how UK businesses can put it to work.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 rounded-full border border-ink-line px-6 py-2.5 text-sm font-medium text-moon transition-colors duration-200 hover:border-gleam/50 hover:text-gleam"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* CTA band */}
      <CTABand />
    </main>
  );
}
