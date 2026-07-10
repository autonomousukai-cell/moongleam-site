'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '@/lib/motion';
import { ytThumb } from '@/lib/data';

/** Click-to-play YouTube facade — no iframe cost until the user asks for it. */
export default function Showreel({ videoId, caption }: { videoId: string; caption: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      id="showreel"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative aspect-video overflow-hidden rounded-2xl border border-ink-line bg-ink-soft shadow-glow"
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; fullscreen"
          title={caption}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${caption}`}
          className="group absolute inset-0 h-full w-full text-left"
        >
          <Image
            src={ytThumb(videoId)}
            alt={caption}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gleam text-2xl text-ink shadow-gleam-glow transition-transform duration-200 group-hover:scale-110">
            ▶
          </span>
          <span className="absolute bottom-5 left-6 font-display font-semibold text-moon">
            {caption}
          </span>
        </button>
      )}
    </motion.div>
  );
}
