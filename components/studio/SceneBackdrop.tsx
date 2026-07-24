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
      {(scrim === 'top' || scrim === 'both') && (
        <div className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(2,4,9,0.68),transparent)]" />
      )}
      {(scrim === 'bottom' || scrim === 'both') && (
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(0deg,rgba(2,4,9,0.72),transparent)]" />
      )}
      {/* edge vignette so every set sits in the same cinematic exposure */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_45%,transparent_55%,rgba(0,0,0,0.5)_100%)]" />
    </>
  );
}
