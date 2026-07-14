'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { nav, cta } from '@/lib/site';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-ink-line/70 bg-ink/70 backdrop-blur-md"
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <Link href="/" aria-label="Moon Gleam — home" className="flex items-center gap-3">
          <Image
            src="/mg-logo.png"
            alt="Moon Gleam logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-moon">
            Moon <span className="text-gleam">Gleam</span>
          </span>
          <span className="ml-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-moon-faint lg:inline">
            Powered by Creative AI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-moon-soft transition-colors duration-200 hover:text-moon"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={cta.href}
            className="rounded-full bg-gleam px-5 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            {cta.label}
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-moon md:hidden"
          >
            <span className="text-lg leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-ink-line/70 bg-ink/95 backdrop-blur-md md:hidden"
        >
          <div className="container-content flex flex-col py-4">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-line/40 py-3 text-moon-soft transition-colors hover:text-moon"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
