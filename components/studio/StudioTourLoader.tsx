'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from './LoadingScreen';

/**
 * Client-side entry for the tour. The heavy scroll/canvas engine is
 * dynamically imported with SSR off (it is entirely window-driven); the
 * branded loading screen shows while the chunk streams in, then StudioTour
 * takes over the same screen for its preload sequence.
 */
const StudioTour = dynamic(() => import('./StudioTour'), {
  ssr: false,
  loading: () => (
    <>
      <LoadingScreen progress={0.05} />
      <div className="h-screen bg-[#05060A]" aria-hidden />
    </>
  ),
});

export default function StudioTourLoader() {
  return <StudioTour />;
}
