'use client';

import { useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

/**
 * Gleam — the rigged Rive robot mascot (public/gleam.riv, CC-BY JcToon).
 *
 * The file exposes a state machine with a `Fly` trigger plus idle/blink
 * animations. We don't hardcode the state-machine name (community files vary):
 * on load we read `rive.stateMachineNames` and start the first one imperatively,
 * so the robot idles + blinks no matter what the SM is called. Clicking Gleam
 * fires the `Fly` trigger for a bit of delight.
 */
export default function GleamMascot({ className = '' }: { className?: string }) {
  const { rive, RiveComponent } = useRive({
    src: '/gleam.riv',
    autoplay: true,
    // Show the WHOLE robot centred, not a cropped fill.
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
  });

  // Start the state machine by discovered name (name-agnostic).
  useEffect(() => {
    if (!rive) return;
    const names = rive.stateMachineNames;
    if (names && names.length) {
      try {
        rive.play(names[0]);
      } catch {
        /* falls back to the autoplayed timeline */
      }
    }
  }, [rive]);

  const poke = () => {
    if (!rive) return;
    const names = rive.stateMachineNames;
    if (!names || !names.length) return;
    const inputs = rive.stateMachineInputs(names[0]);
    const trigger = inputs?.find(
      (i) => i.name.toLowerCase() === 'fly' && typeof (i as { fire?: () => void }).fire === 'function',
    ) as { fire: () => void } | undefined;
    trigger?.fire();
  };

  return (
    <RiveComponent
      className={className}
      onClick={poke}
      role="img"
      aria-label="Gleam, the Moon Gleam AI studio robot"
    />
  );
}
