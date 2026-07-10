'use client';

import Script from 'next/script';
import { site } from '@/lib/site';

/**
 * Live GoHighLevel booking calendar (LeadConnector widget).
 * Bookings land straight in the Moon Gleam GHL sub-account; workflows fire natively.
 */
export default function BookingEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft">
      <iframe
        src={site.ghl.bookingUrl}
        style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: 640 }}
        scrolling="no"
        id={`${site.ghl.bookingWidgetId}_booking`}
        title="Book a call with Moon Gleam"
      />
      <Script src={site.ghl.formEmbedJs} strategy="afterInteractive" />
    </div>
  );
}
