import type { Metadata } from 'next';
import BookingEmbed from '@/components/BookingEmbed';
import LeadForm from '@/components/LeadForm';
import { BreadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Call — Start Your Project',
  description:
    'Book a free 15-minute call with Moon Gleam, or send an enquiry. London AI video production — replies within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbJsonLd trail={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />

      <section className="py-16 md:py-24">
        <div className="container-content text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            Start a project
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-display font-semibold text-moon">
            Let&apos;s make something <span className="text-gleam">worth watching</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-moon-soft">
            Book straight into the calendar, or send an enquiry. Serious enquiries get a reply
            within one business day — usually much faster.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-content grid items-start gap-10 lg:grid-cols-2">
          {/* GHL booking calendar — bookings land in the Moon Gleam sub-account */}
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-moon">
              Book a free 15-minute call
            </h2>
            <BookingEmbed />
          </div>

          <div className="space-y-6">
            {site.ghl.formSrc ? (
              <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft">
                <iframe
                  src={site.ghl.formSrc}
                  title="Enquiry form"
                  style={{ width: '100%', border: 'none', minHeight: 640 }}
                />
              </div>
            ) : (
              <LeadForm />
            )}

            <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
              <p className="font-display text-lg font-semibold text-moon">Quick question?</p>
              <p className="mt-2 text-sm leading-relaxed text-moon-soft">
                Chat to us directly on{' '}
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gleam underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>{' '}
                or email{' '}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-gleam underline-offset-4 hover:underline"
                >
                  {site.contact.email}
                </a>
                .
              </p>
              <p className="mt-4 text-xs leading-relaxed text-moon-faint">
                {site.contact.address}
                <br />
                {site.contact.phone}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
