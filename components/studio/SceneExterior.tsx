'use client';

import Hotspot from './Hotspot';

/**
 * ZONE 1 — placeholder "set": the Moon Gleam studio building at night.
 * Pure layered CSS (gradients, glow, glass grids) so it ships with zero
 * assets; the whole group is scrubbed by CinematicJourney via [data-mgst]
 * hooks. Replaced automatically when real frames land in FRAME_MANIFEST.
 *
 * Layer contract (written by the engine every frame):
 *   ext        — group opacity/visibility (crossfade into reception)
 *   sky        — slow parallax scale
 *   bldg       — main dolly scale (origin = entrance)
 *   mist1..3   — mid/foreground mist parallax
 *   doorL/R    — door panels slide apart
 *   doorLight  — interior spill brightens as doors open
 *   doorSeam   — cyan seam glow between the doors
 *   hotspotExt — hotspot fades once the dolly is under way
 */
export default function SceneExterior() {
  return (
    <div data-mgst="ext" className="pointer-events-none absolute inset-0">
      {/* ------------------------------- sky ------------------------------- */}
      <div data-mgst="sky" className="absolute inset-0 origin-[50%_64%] will-change-transform">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020409_0%,#070B14_44%,#0C0F18_68%,#0A0A0B_100%)]" />
        {/* moon */}
        <div className="absolute right-[15%] top-[9%] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_38%_35%,#F5F7FA_0%,#D9DEE6_55%,#AEB4BB_100%)] opacity-90 shadow-[0_0_90px_28px_rgba(221,230,242,0.22)] md:h-24 md:w-24" />
        {/* faint violet/cyan horizon glow behind the building */}
        <div className="absolute inset-x-0 bottom-[24%] h-[20%] bg-[linear-gradient(180deg,transparent,rgba(91,227,255,0.05)_55%,rgba(139,124,246,0.08))] blur-2xl" />
      </div>

      {/* ----------------------------- building ---------------------------- */}
      <div data-mgst="bldg" className="absolute inset-0 origin-[50%_64%] will-change-transform">
        <div className="absolute left-1/2 top-[26%] h-[46%] w-[min(88vw,1060px)] -translate-x-1/2">
          {/* left wing — glass-grid facade */}
          <div className="absolute bottom-0 left-0 top-[16%] w-[30%] border-t border-white/5 [background-image:repeating-linear-gradient(90deg,rgba(199,204,209,0.055)_0_1.5px,transparent_1.5px_44px),repeating-linear-gradient(180deg,rgba(199,204,209,0.07)_0_1.5px,transparent_1.5px_32px),linear-gradient(180deg,#10131C,#080A10)]" />
          {/* right wing */}
          <div className="absolute bottom-0 right-0 top-[16%] w-[30%] border-t border-white/5 [background-image:repeating-linear-gradient(90deg,rgba(199,204,209,0.055)_0_1.5px,transparent_1.5px_44px),repeating-linear-gradient(180deg,rgba(199,204,209,0.07)_0_1.5px,transparent_1.5px_32px),linear-gradient(180deg,#10131C,#080A10)]" />
          {/* a few lit offices — cool + warm */}
          <div className="absolute left-[7%] top-[34%] h-[4%] w-[5%] bg-[rgba(91,227,255,0.35)] blur-[1.5px]" />
          <div className="absolute left-[16%] top-[58%] h-[4%] w-[5%] bg-[rgba(233,196,106,0.3)] blur-[1.5px]" />
          <div className="absolute right-[9%] top-[46%] h-[4%] w-[5%] bg-[rgba(139,124,246,0.35)] blur-[1.5px]" />
          <div className="absolute right-[18%] top-[26%] h-[4%] w-[5%] bg-[rgba(91,227,255,0.25)] blur-[1.5px]" />

          {/* central tower */}
          <div className="absolute bottom-0 left-1/2 top-0 w-[44%] -translate-x-1/2 border-x border-white/5 bg-[linear-gradient(180deg,#131722_0%,#0A0C12_100%)]">
            {/* fine glass grid */}
            <div className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,rgba(199,204,209,0.045)_0_1.5px,transparent_1.5px_56px),repeating-linear-gradient(180deg,rgba(199,204,209,0.05)_0_1.5px,transparent_1.5px_40px)]" />
            {/* roofline accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-[rgba(91,227,255,0.5)] shadow-[0_0_16px_3px_rgba(91,227,255,0.35)]" />

            {/* LED signage — PLACEHOLDER for the real Moon Gleam logo/marquee */}
            <div className="mgst-led absolute left-1/2 top-[13%] w-full -translate-x-1/2 text-center">
              <div className="bg-[linear-gradient(92deg,#5BE3FF_0%,#C7CCD1_38%,#E9C46A_68%,#8B7CF6_100%)] bg-clip-text text-[clamp(1.3rem,3.2vw,2.5rem)] font-semibold tracking-[0.2em] text-transparent drop-shadow-[0_0_20px_rgba(91,227,255,0.45)] [font-family:var(--font-studio-display)]">
                MOON&nbsp;GLEAM
              </div>
              <div className="mt-1 text-[clamp(0.45rem,0.85vw,0.65rem)] uppercase tracking-[0.62em] text-moon-soft">
                AI Film Studio
              </div>
            </div>

            {/* entrance portal — doors open as the camera arrives */}
            <div className="absolute bottom-0 left-1/2 h-[40%] w-[46%] -translate-x-1/2 overflow-hidden rounded-t-[1.6rem] border border-white/10">
              {/* warm reception light behind the doors */}
              <div
                data-mgst="doorLight"
                className="absolute inset-0 bg-[radial-gradient(75%_95%_at_50%_85%,rgba(233,196,106,0.85),rgba(233,196,106,0.22)_55%,rgba(7,11,20,0.95))]"
              />
              {/* left door panel */}
              <div
                data-mgst="doorL"
                className="absolute inset-y-0 left-0 w-1/2 border-r border-[rgba(91,227,255,0.45)] bg-[linear-gradient(105deg,rgba(16,19,28,0.94),rgba(28,32,44,0.9)_60%,rgba(46,52,68,0.86))] will-change-transform"
              >
                <div className="absolute right-[14%] top-1/2 h-[26%] w-px -translate-y-1/2 bg-[rgba(199,204,209,0.5)]" />
              </div>
              {/* right door panel */}
              <div
                data-mgst="doorR"
                className="absolute inset-y-0 right-0 w-1/2 border-l border-[rgba(91,227,255,0.45)] bg-[linear-gradient(-105deg,rgba(16,19,28,0.94),rgba(28,32,44,0.9)_60%,rgba(46,52,68,0.86))] will-change-transform"
              >
                <div className="absolute left-[14%] top-1/2 h-[26%] w-px -translate-y-1/2 bg-[rgba(199,204,209,0.5)]" />
              </div>
              {/* cyan seam between the doors */}
              <div
                data-mgst="doorSeam"
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#5BE3FF] shadow-[0_0_18px_5px_rgba(91,227,255,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* wet forecourt + reflections */}
        <div className="absolute inset-x-0 bottom-0 top-[72%] bg-[linear-gradient(180deg,#0B0D12_0%,#05060A_100%)]">
          {/* reception light spilling onto the asphalt */}
          <div className="absolute left-1/2 top-0 h-[72%] w-[22%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,196,106,0.28),transparent_82%)] blur-md" />
          {/* signage reflection */}
          <div className="absolute left-1/2 top-[6%] h-[44%] w-[42%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(91,227,255,0.1),transparent)] blur-lg" />
          {/* rain sheen streaks */}
          <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,transparent_0_18px,rgba(255,255,255,0.02)_18px_19px)]" />
        </div>
      </div>

      {/* ------------------------------ mist ------------------------------- */}
      <div data-mgst="mist1" className="absolute inset-x-[-12%] bottom-[16%] h-[16%] will-change-transform">
        <div className="mgst-drift h-full w-full rounded-full bg-[radial-gradient(60%_100%_at_50%_50%,rgba(199,204,209,0.1),transparent_70%)] blur-2xl" />
      </div>
      <div data-mgst="mist2" className="absolute inset-x-[-16%] bottom-[6%] h-[14%] will-change-transform">
        <div className="mgst-drift-slow h-full w-full rounded-full bg-[radial-gradient(55%_100%_at_45%_50%,rgba(199,204,209,0.14),transparent_72%)] blur-2xl" />
      </div>
      <div data-mgst="mist3" className="absolute inset-x-[-10%] bottom-[30%] h-[10%] will-change-transform">
        <div className="mgst-drift h-full w-full rounded-full bg-[radial-gradient(50%_100%_at_60%_50%,rgba(139,124,246,0.06),transparent_70%)] blur-2xl" />
      </div>

      {/* hotspot — LED signage (fades once the dolly is under way) */}
      <div data-mgst="hotspotExt" className="pointer-events-auto absolute left-[64%] top-[31%] z-30">
        <Hotspot
          label="LED marquee"
          body="Placeholder signage — the real Moon Gleam marquee will play the studio showreel here in the full tour."
        />
      </div>
    </div>
  );
}
