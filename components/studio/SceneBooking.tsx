'use client';

import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { site } from '@/lib/site';
import SceneBackdrop from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
} from './journey';

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
        {/* the rendered set — rooftop under the moon, illuminated booking desk */}
        <SceneBackdrop src={ZONE_BACKDROPS.booking} />
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-[clamp(0.5rem,0.9vw,0.7rem)] uppercase tracking-[0.5em] text-moon-soft">
          Moon Gleam · Bookings
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
              <button type="button" onClick={focusForm} className="mgst-hud-btn">
                Start your project
              </button>
              <Link href="/contact" className="mgst-hud-btn-ghost">
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
                className="mgst-hud-btn-ghost !px-5 !py-2.5 !text-xs"
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
