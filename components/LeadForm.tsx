'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';
import { site } from '@/lib/site';

const serviceOptions = [
  'Business promo video',
  'TV commercial (TVC)',
  'Product promotional video',
  'UGC / social content',
  'Documentary',
  'Kids animation',
  'Short film',
  'Not sure yet — advise me',
];

const sectorOptions = [
  'Legal', 'Accountancy', 'Charity', 'Education', 'Retail / Jeweller', 'Travel', 'Other',
];

type Status = 'idle' | 'sending' | 'ok' | 'err';

/**
 * Custom-styled lead form → /api/lead → GHL inbound webhook (server-side).
 * Sector + service become GHL tags so the right nurture workflow fires.
 */
export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  }

  const inputCls =
    'w-full rounded-xl border border-ink-line bg-ink px-4 py-3 text-sm text-moon placeholder:text-moon-faint focus:border-gleam focus:outline-none transition-colors duration-200';

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-ink-line bg-ink-soft p-8"
    >
      <p className="font-display text-lg font-semibold text-moon">Or send an enquiry</p>

      {/* Honeypot — bots fill it, humans never see it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputCls} />
        <input name="email" type="email" required placeholder="Email" aria-label="Email" className={inputCls} />
      </div>
      <input name="phone" type="tel" placeholder="Phone / WhatsApp" aria-label="Phone" className={inputCls} />

      <div className="grid gap-4 sm:grid-cols-2">
        <select name="service" aria-label="Service" className={inputCls} defaultValue={serviceOptions[0]}>
          {serviceOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select name="sector" aria-label="Sector" className={inputCls} defaultValue={sectorOptions[6]}>
          {sectorOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell us about your project"
        aria-label="Message"
        className={inputCls}
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-gleam py-3 font-semibold text-ink transition-transform duration-200 hover:scale-[1.02] hover:bg-gleam-bright disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
      </button>

      {status === 'ok' && (
        <p className="rounded-xl border border-glow/40 bg-glow/10 px-4 py-3 text-sm text-glow" role="status">
          Thanks — your enquiry is in. We reply within one business day, usually much faster.
        </p>
      )}
      {status === 'err' && (
        <p className="rounded-xl border border-gleam/40 bg-gleam/10 px-4 py-3 text-sm text-gleam" role="status">
          Something went wrong. Message us on{' '}
          <a href={site.contact.whatsappHref} className="underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{' '}
          or email{' '}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>
          .
        </p>
      )}
    </motion.form>
  );
}
