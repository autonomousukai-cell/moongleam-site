'use client';

import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { site } from '@/lib/site';
import { ZW, type Layers, zoneShell, ovAlpha, setOverlay } from './journey';

/**
 * ZONE 8 — placeholder "set": the rooftop booking terrace. The journey ends
 * where it began — under the moon — at an illuminated front desk with the
 * real Moon Gleam contact details, the live lead form, WhatsApp and socials.
 *
 * Layer contract (written by renderBooking every frame):
 *   book       — group opacity/visibility (zoneShell)
 *   bookInner  — walk-forward settle (zoneShell)
 *   bookSky1/2 — skyline parallax
 *   bookOv     — the booking overlay (form + contact)
 */
export function renderBooking(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'book', p, ZW.booking);
  const ov = ovAlpha(local, 0.3, 0.6) * (alpha > 0 ? 1 : 0);
  setOverlay(el.bookOv, ov, 34);
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.bookSky1) el.bookSky1.style.transform = `translateY(${(d * 10).toFixed(1)}px)`;
  if (el.bookSky2) el.bookSky2.style.transform = `translateY(${(d * 22).toFixed(1)}px)`;
}

export default function SceneBooking() {
  const focusForm = () => {
    const input = document.querySelector<HTMLInputElement>(
      '#studio-lead-form input[name="name"]',
    );
    input?.focus();
  };

  return (
    <div
      data-mgst="book"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="bookInner" className="absolute inset-0 origin-center will-change-transform">
        {/* rooftop night sky — the journey ends back under the moon */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020409_0%,#070B14_50%,#0B0D13_78%,#08090D_100%)]" />
        <div className="absolute left-[12%] top-[8%] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_38%_35%,#F5F7FA_0%,#D9DEE6_55%,#AEB4BB_100%)] opacity-90 shadow-[0_0_90px_28px_rgba(221,230,242,0.22)] md:h-20 md:w-20" />

        {/* skyline — far + near, gentle parallax */}
        <div data-mgst="bookSky1" className="absolute inset-x-0 bottom-[30%] h-[16%] will-change-transform">
          <div className="h-full w-full opacity-70 [background-image:repeating-linear-gradient(90deg,#0A0D15_0_5vw,#0D101A_5vw_8vw,#090C13_8vw_14vw)] [mask-image:linear-gradient(180deg,transparent,black_30%)]" />
          {/* far windows */}
          <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,transparent_0_3vw,rgba(91,227,255,0.25)_3vw_calc(3vw+2px),transparent_calc(3vw+2px)_7vw)] [mask-image:linear-gradient(180deg,transparent_30%,black_70%)]" />
        </div>
        <div data-mgst="bookSky2" className="absolute inset-x-0 bottom-[26%] h-[12%] will-change-transform">
          <div className="h-full w-full [background-image:repeating-linear-gradient(90deg,#05070C_0_8vw,#080A11_8vw_12vw,#04060A_12vw_20vw)] [mask-image:linear-gradient(180deg,transparent,black_25%)]" />
        </div>

        {/* terrace edge + string lights */}
        <div className="absolute inset-x-0 bottom-[26%] h-px bg-white/10" />
        <div className="absolute inset-x-[6%] bottom-[27.5%] flex justify-between">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[rgba(233,196,106,0.65)] shadow-[0_0_8px_3px_rgba(233,196,106,0.3)]"
              style={{ transform: `translateY(${(i % 3) * 3}px)` }}
            />
          ))}
        </div>

        {/* illuminated front desk */}
        <div className="absolute bottom-[10%] left-1/2 h-[9%] w-[min(58vw,720px)] -translate-x-1/2 rounded-[1.1rem] border-t border-[rgba(199,204,209,0.4)] bg-[linear-gradient(180deg,#171A22_0%,#0C0E14_100%)] shadow-[0_22px_70px_-12px_rgba(233,196,106,0.4)]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <div className="absolute inset-x-6 -bottom-2 h-3 rounded-full bg-[rgba(233,196,106,0.45)] blur-md" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(0.5rem,0.9vw,0.7rem)] uppercase tracking-[0.5em] text-moon-soft">
            Moon Gleam · Bookings
          </div>
        </div>

        {/* terrace floor */}
        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-[linear-gradient(180deg,#0A0C10,#05060A)]">
          <div className="absolute left-1/2 top-0 h-[85%] w-[min(52vw,640px)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,196,106,0.12),transparent_78%)] blur-lg" />
        </div>
      </div>

      {/* ---- booking overlay ---- */}
      <div
        data-mgst="bookOv"
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 opacity-0 lg:pl-28 lg:pr-16"
      >
        <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* left — headline, CTAs, contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
              08 · Booking
            </p>
            <h2 className="mt-3 max-w-md text-balance text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
              Ready to create what has never been seen?
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={focusForm}
                className="rounded-full bg-gleam px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] hover:shadow-gleam-glow"
              >
                Start your project
              </button>
              <Link
                href="/contact"
                className="rounded-full border border-moon/30 px-7 py-3 text-sm font-semibold text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
              >
                Book a discovery call
              </Link>
            </div>
            <div className="mt-7 space-y-1.5 text-sm text-moon-soft">
              <p>
                <a href={site.contact.phoneHref} className="transition-colors hover:text-gleam">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-gleam">
                  {site.contact.email}
                </a>
              </p>
              <p className="text-moon-faint">{site.contact.address}</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-moon/30 px-5 py-2.5 text-xs font-semibold tracking-wide text-moon transition-colors hover:border-gleam/60 hover:text-gleam"
              >
                WhatsApp us
              </a>
              <SocialIcons />
            </div>
          </div>

          {/* right — the live lead form (posts to /api/lead → GHL) */}
          <div
            id="studio-lead-form"
            data-lenis-prevent
            className="hidden max-h-[76vh] overflow-y-auto rounded-2xl shadow-[0_0_70px_-16px_rgba(233,196,106,0.35)] lg:block"
          >
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
