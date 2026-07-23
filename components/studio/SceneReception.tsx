'use client';

import Hotspot from './Hotspot';

/**
 * ZONE 2 — placeholder "set": the luxury reception inside the studio.
 * Layered CSS again: charcoal shell, warm cove lighting, backlit wordmark,
 * illuminated concierge desk, reflective floor, cyan/violet accent strips.
 *
 * Layer contract (written by the engine every frame):
 *   rec        — group opacity/visibility (crossfade from exterior)
 *   recInner   — arrival settle: scale 1.22→1 + focus pull (blur→0)
 *   hotspotRec — hotspot appears with the welcome overlay
 */
export default function SceneReception() {
  return (
    <div
      data-mgst="rec"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="recInner" className="absolute inset-0 origin-center will-change-transform">
        {/* room shell */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0D13_0%,#10131A_55%,#080A0E_100%)]" />
        {/* side walls falling into shadow — sells the depth */}
        <div className="absolute inset-y-0 left-0 w-[20%] bg-[linear-gradient(90deg,#04050A,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-[linear-gradient(-90deg,#04050A,transparent)]" />

        {/* ceiling cove lighting */}
        <div className="absolute inset-x-[10%] top-0 h-[12%] bg-[linear-gradient(180deg,rgba(233,196,106,0.16),transparent)] blur-md" />
        <div className="absolute inset-x-[18%] top-[7%] h-px bg-[rgba(244,216,137,0.5)] shadow-[0_0_26px_7px_rgba(233,196,106,0.25)]" />

        {/* accent light strips — electric cyan + violet */}
        <div className="absolute left-[15%] top-[14%] h-[52%] w-[3px] rounded-full bg-[linear-gradient(180deg,#5BE3FF,rgba(91,227,255,0.04))] shadow-[0_0_26px_5px_rgba(91,227,255,0.3)]" />
        <div className="absolute right-[15%] top-[14%] h-[52%] w-[3px] rounded-full bg-[linear-gradient(180deg,#8B7CF6,rgba(139,124,246,0.04))] shadow-[0_0_26px_5px_rgba(139,124,246,0.3)]" />

        {/* backlit wordmark — PLACEHOLDER for the real logo wall */}
        <div className="absolute left-1/2 top-[24%] -translate-x-1/2 text-center">
          <div className="absolute left-1/2 top-1/2 h-[180%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(233,196,106,0.14),transparent_70%)] blur-xl" />
          <div className="relative text-[clamp(1.7rem,4vw,3.3rem)] font-medium tracking-[0.24em] text-moon drop-shadow-[0_0_30px_rgba(233,196,106,0.5)] [font-family:var(--font-studio-display)]">
            MOON&nbsp;GLEAM
          </div>
          <div className="relative mt-2 text-[clamp(0.5rem,0.95vw,0.72rem)] uppercase tracking-[0.72em] text-moon-soft">
            Reception · AI Film Studio
          </div>
        </div>

        {/* concierge desk */}
        <div className="absolute bottom-[20%] left-1/2 h-[11%] w-[min(64vw,780px)] -translate-x-1/2 rounded-[1.1rem] border-t border-[rgba(199,204,209,0.4)] bg-[linear-gradient(180deg,#171A22_0%,#0C0E14_100%)] shadow-[0_22px_70px_-12px_rgba(233,196,106,0.4)]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          {/* warm under-glow */}
          <div className="absolute inset-x-6 -bottom-2 h-3 rounded-full bg-[rgba(233,196,106,0.45)] blur-md" />
        </div>

        {/* polished floor + reflections */}
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-[linear-gradient(180deg,#0A0C10,#05060A)]">
          <div className="absolute left-1/2 top-0 h-[85%] w-[min(58vw,700px)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,196,106,0.14),transparent_78%)] blur-lg" />
          <div className="absolute left-[15.5%] top-0 h-[70%] w-[2px] bg-[linear-gradient(180deg,rgba(91,227,255,0.2),transparent)] blur-[2px]" />
          <div className="absolute right-[15.5%] top-0 h-[70%] w-[2px] bg-[linear-gradient(180deg,rgba(139,124,246,0.2),transparent)] blur-[2px]" />
        </div>
      </div>

      {/* hotspot — concierge desk (appears with the welcome overlay) */}
      <div
        data-mgst="hotspotRec"
        className="pointer-events-auto absolute bottom-[27%] left-[27%] z-30 opacity-0"
      >
        <Hotspot
          label="Concierge desk"
          body="Every Moon Gleam production starts here — a 15-minute discovery call with the studio team."
        />
      </div>
    </div>
  );
}
