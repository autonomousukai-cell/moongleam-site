import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';

/**
 * Lead capture → GoHighLevel CRM.
 * Primary: POST JSON to the GHL inbound webhook (GHL_WEBHOOK_URL) — the workflow
 * creates/updates the contact with source + tags, then nurture fires in GHL.
 * Fallback: if the webhook is missing/fails and GHL_API_TOKEN is set, upsert the
 * contact directly via the GHL API — so no lead is ever lost.
 * The site itself never stores leads or sends email — GHL owns all of that.
 */

// Simple in-memory rate limit (per serverless instance): max 5 posts/min/IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  // Honeypot: silently accept and drop.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? '').toString().slice(0, 120).trim();
  const email = (body.email ?? '').toString().slice(0, 160).trim();
  const phone = (body.phone ?? '').toString().slice(0, 40).trim();
  const service = (body.service ?? '').toString().slice(0, 80).trim();
  const sector = (body.sector ?? '').toString().slice(0, 40).trim();
  const message = (body.message ?? '').toString().slice(0, 3000).trim();

  if (!name || !email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 400 });
  }

  const tags = ['website-lead', sector && `sector-${sector.toLowerCase().replace(/[^a-z]+/g, '-')}`, service && `service-${service.toLowerCase().replace(/[^a-z]+/g, '-')}`].filter(Boolean);

  const payload = {
    first_name: name,
    email,
    phone,
    service,
    sector,
    message,
    source: 'website',
    tags,
  };

  // 1) Primary: GHL inbound webhook.
  const webhook = process.env.GHL_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) return NextResponse.json({ ok: true });
    } catch {
      // fall through to API fallback
    }
  }

  // 2) Fallback: direct GHL contacts upsert (Private Integration token).
  const token = process.env.GHL_API_TOKEN;
  if (token) {
    try {
      const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          locationId: site.ghl.locationId,
          name,
          email,
          phone,
          source: 'website',
          tags,
          customFields: [],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) return NextResponse.json({ ok: true });
    } catch {
      // fall through
    }
  }

  return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
}
