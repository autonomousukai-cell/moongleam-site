'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { site } from '@/lib/site';

/**
 * GHL chat widget "Moon Gleam Chat" (LeadConnector) — site-wide, with one
 * exception: on the immersive homepage the loader (and therefore its greeting
 * bubble) is held back until the visitor starts the journey (scrolls) or 10s
 * pass, so it can never pop up over the hero copy / scroll cue on the first
 * screen. Every other route loads it immediately, and once loaded it persists
 * across client navigations. WhatsApp channel appears automatically once
 * connected in GHL.
 */
export default function ChatWidget() {
  const pathname = usePathname();
  const [armed, setArmed] = useState(false);
  const gated = pathname === '/' && !armed;

  useEffect(() => {
    if (pathname !== '/' || armed) return;
    const arm = () => setArmed(true);
    const onScroll = () => {
      // By 120px the scroll cue has already faded — the first screen stays clean.
      if (window.scrollY > 120) arm();
    };
    const timer = window.setTimeout(arm, 10_000);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname, armed]);

  if (gated) return null;
  if (site.ghl.chatWidgetId) {
    return (
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={site.ghl.chatWidgetId}
        strategy="afterInteractive"
      />
    );
  }
  if (site.ghl.chatSrc) {
    return <Script src={site.ghl.chatSrc} strategy="afterInteractive" />;
  }
  return null;
}
