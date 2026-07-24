'use client';

import Image from 'next/image';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import SocialIcons from '@/components/SocialIcons';
import { site } from '@/lib/site';
import { services, sectorPages } from '@/lib/data';
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
 * ROOM F — CONTACT & EXIT LOBBY, the journey finale. The rooftop booking
 * desk is now the site's footer as a room: the Moon Gleam brand wall (logo,
 * name, "Powered by Creative AI", the studio line), the services and sectors
 * directories, the full contact block (email / phone / WhatsApp / address),
 * glowing social beacons (YouTube · Facebook · Blog, hrefs from lib/site.ts)
 * and the live lead form. Everything the classic <Footer> carries, staged as
 * the illuminated exit lobby.
 *
 * Layer contract (written by renderBooking every frame):
 *   book       — group opacity/visibility (zoneShell)
 *   bookInner  — walk-forward settle (zoneShell)
 *   bookSky1/2 — skyline parallax
 *   bookOv     — the contact + footer overlay
 */
export function renderBooking(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'book', p, ZW.booking);
  const ov = ovAlpha(local, 0.24, 0.5) * (alpha > 0 ? 1 : 0);
  setOverlay(el.bookOv, ov, 34);
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.bookSky1) el.bookSky1.style.transform = `translateY(${(d * 10).toFixed(1)}px)`;
  if (el.bookSky2) el.bookSky2.style.transform = `translateY(${(d * 22).toFixed(1)}px)`;
}

/** Footer directory column — a lit list on the lobby wall. */
function LobbyList({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gleam">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-[11px] leading-snug text-moon-soft transition-colors hover:text-moon"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
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
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-[clamp(0.5rem,0.9vw,0.7rem)] uppercase tracking-[0.5em] text-moon-soft">
          Moon Gleam · Exit Lobby
        </div>
      </div>

      {/* ---- contact + footer overlay ---- */}
      <div
        data-mgst="bookOv"
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 opacity-0 lg:pl-28 lg:pr-16"
      >
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* left — the finale + the footer wall */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-moon-soft">
              11 · Contact
            </p>
            <h2 className="mt-2 max-w-lg text-balance text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
              Ready to create what has never been seen?
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={focusForm} className="mgst-hud-btn">
                Start your project
              </button>
              <Link href="/contact" className="mgst-hud-btn-ghost">
                Book a discovery call
              </Link>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mgst-hud-btn-ghost !px-5 !py-2.5 !text-xs"
              >
                WhatsApp us
              </a>
            </div>

            {/* the footer wall — the site's footer, staged as the exit lobby */}
            <div className="mt-6 grid gap-6 border-t border-white/10 pt-5 sm:grid-cols-3">
              {/* brand + contact */}
              <div>
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/mg-logo.png"
                    alt="Moon Gleam logo"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <div>
                    <p className="text-sm font-semibold text-moon [font-family:var(--font-studio-display)]">
                      Moon <span className="text-gleam">Gleam</span>
                    </p>
                    <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-moon-faint">
                      Powered by Creative AI
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 max-w-[15rem] text-[10px] leading-relaxed text-moon-soft">
                  AI-powered video production studio in London. Cinematic film for 500+ UK
                  businesses — from brief to broadcast.
                </p>
                <ul className="mt-3 space-y-1 text-[11px] text-moon-soft">
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-gleam">
                      {site.contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="transition-colors hover:text-gleam">
                      {site.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gleam"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li className="text-moon-faint">{site.contact.address}</li>
                </ul>
              </div>

              {/* services directory (mirrors <Footer>: first six services) */}
              <LobbyList
                title="Services"
                items={services.slice(0, 6).map((s) => ({
                  href: `/services/${s.slug}`,
                  label: s.name,
                }))}
              />

              {/* sectors directory */}
              <LobbyList
                title="Sectors"
                items={sectorPages.map((s) => ({
                  href: `/sectors/${s.slug}`,
                  label: s.name,
                }))}
              />
            </div>

            {/* glowing social beacons */}
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
              <SocialIcons />
              <p className="text-[11px] text-moon-soft">
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gleam"
                >
                  YouTube
                </a>
                {' · '}
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gleam"
                >
                  Facebook
                </a>
                {' · '}
                <Link href="/blog" className="transition-colors hover:text-gleam">
                  Blog
                </Link>
              </p>
            </div>
          </div>

          {/* right — the live lead form (posts to /api/lead → GHL) */}
          <div
            id="studio-lead-form"
            data-lenis-prevent
            className="hidden max-h-[80vh] overflow-y-auto rounded-2xl shadow-[0_0_70px_-16px_rgba(233,196,106,0.35)] lg:block"
          >
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
