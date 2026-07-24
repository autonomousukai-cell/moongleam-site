'use client';

import { usePathname } from 'next/navigation';

/**
 * Classic site chrome (Nav/Footer) gate. The homepage IS the immersive
 * studio tour — its only navigation is the holographic Studio Map HUD, so
 * the standard bar/footer must never render over it. Every other route
 * keeps the full chrome. (/studio and /experience 301 to / in next.config.)
 */
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <>{children}</>;
}
