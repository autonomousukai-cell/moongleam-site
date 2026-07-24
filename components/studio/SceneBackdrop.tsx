'use client';

/**
 * The rendered "set" behind a zone — one of the bespoke AI-rendered studio
 * scenes (Moon Gleam's own pipeline), full-bleed under the zone's depth /
 * particle / letterbox grammar. A plain <img> on purpose: the URLs are
 * preloaded byte-for-byte by StudioTour's branded loader, so the journey
 * never pops in. Scrims keep overlay type legible over any exposure.
 */
export default function SceneBackdrop({
  src,
  scrim = 'both',
}: {
  src: string;
  /** Where overlay copy sits — darkens that edge of the frame. */
  scrim?: 'top' | 'bottom' | 'both' | 'none';
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- preloaded set plate; the optimizer would fork the URL away from the loader's preload */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      {/* Minimal legibility gradients only — the imagery must stay crisp and
          vivid; overlay copy carries its own text-shadow for the rest. */}
      {(scrim === 'top' || scrim === 'both') && (
        <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(180deg,rgba(2,4,9,0.32),transparent)]" />
      )}
      {(scrim === 'bottom' || scrim === 'both') && (
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(0deg,rgba(2,4,9,0.36),transparent)]" />
      )}
      {/* whisper of an edge vignette — frames the set without dimming it */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_45%,transparent_72%,rgba(0,0,0,0.22)_100%)]" />
    </>
  );
}
