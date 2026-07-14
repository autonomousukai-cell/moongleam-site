import Link from 'next/link';
import Image from 'next/image';
import { site, cta } from '@/lib/site';
import { services, sectorPages } from '@/lib/data';
import SocialIcons from '@/components/SocialIcons';

export default function Footer() {
  return (
    <footer className="border-t border-ink-line/60 bg-ink-soft/40">
      <div className="container-content grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/mg-logo.png"
              alt="Moon Gleam logo"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <p className="font-display text-lg font-semibold text-moon">
              Moon <span className="text-gleam">Gleam</span>
            </p>
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-moon-faint">
            Powered by Creative AI
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-moon-soft">
            AI-powered video production studio in London. Cinematic film for 500+ UK businesses —
            from brief to broadcast.
          </p>
          <SocialIcons className="mt-6" />
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">Services</p>
          <ul className="space-y-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-moon-soft transition-colors hover:text-moon">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">Sectors</p>
          <ul className="space-y-2">
            {sectorPages.map((s) => (
              <li key={s.slug}>
                <Link href={`/sectors/${s.slug}`} className="text-sm text-moon-soft transition-colors hover:text-moon">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gleam">Contact</p>
          <ul className="space-y-2 text-sm text-moon-soft">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-moon">{site.contact.email}</a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="transition-colors hover:text-moon">{site.contact.phone}</a>
            </li>
            <li>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-moon">WhatsApp</a>
            </li>
            <li>{site.contact.address}</li>
            <li className="pt-2">
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-moon">YouTube</a>
              {' · '}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-moon">Facebook</a>
              {' · '}
              <Link href="/blog" className="transition-colors hover:text-moon">Blog</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line/60">
        <div className="container-content flex flex-col items-center gap-4 py-8 text-center">
          <p className="font-display text-heading font-semibold text-moon">Ready when you are.</p>
          <Link
            href={cta.href}
            className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            {cta.label}
          </Link>
          <p className="mt-2 text-xs text-moon-faint">
            © {new Date().getFullYear()} Moon Gleam AI Studio · London · moongleam.co.uk
          </p>
        </div>
      </div>
    </footer>
  );
}
