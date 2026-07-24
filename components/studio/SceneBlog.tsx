'use client';

import Image from 'next/image';
import Link from 'next/link';
import { posts, formatDate, readingTime } from '@/lib/posts';
import SceneBackdrop, { TextHalo } from './SceneBackdrop';
import {
  ZW,
  ZONE_BACKDROPS,
  type Layers,
  zoneShell,
  ovAlpha,
  setOverlay,
} from './journey';

/**
 * ROOM E — THE STORY ARCHIVE. The studio's reading lounge: every guide from
 * lib/posts.ts on its own backlit shelf screen (title, cover, category),
 * each linking to its /blog/[slug] page. The room says one thing: the studio
 * publishes a lot of genuinely helpful guides.
 *
 * Layer contract (written by renderBlog every frame):
 *   blg       — group opacity/visibility (zoneShell)
 *   blgInner  — walk-forward settle (zoneShell)
 *   blgS1/S2  — shelf depth parallax
 *   blgOv     — headline overlay
 *   blgHs     — shelf gate
 */
export function renderBlog(el: Layers, p: number) {
  const { alpha, local } = zoneShell(el, 'blg', p, ZW.blog);
  const ov = ovAlpha(local, 0.14, 0.32) * (alpha > 0 ? 1 : 0);
  setOverlay(el.blgOv, ov);
  if (el.blgHs) {
    el.blgHs.style.opacity = ov.toFixed(3);
    el.blgHs.style.pointerEvents = ov > 0.6 ? 'auto' : 'none';
  }
  if (alpha <= 0) return;
  const d = local - 0.5;
  if (el.blgS1) el.blgS1.style.transform = `translateY(${(d * -18).toFixed(1)}px)`;
  if (el.blgS2) el.blgS2.style.transform = `translateY(${(d * -30).toFixed(1)}px)`;
}

export default function SceneBlog() {
  return (
    <div
      data-mgst="blg"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ visibility: 'hidden' }}
    >
      <div data-mgst="blgInner" className="absolute inset-0 origin-center will-change-transform">
        {/* the rendered set — the reading lounge / story archive */}
        <SceneBackdrop src={ZONE_BACKDROPS.blog} />
      </div>

      {/* ---- overlay ---- */}
      <div
        data-mgst="blgOv"
        className="pointer-events-none absolute inset-x-0 top-[5%] z-20 px-6 text-center opacity-0"
      >
        <TextHalo />
        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gleam [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]">
          10 · The Story Archive
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[clamp(1.5rem,2.8vw,2.2rem)] font-medium leading-snug text-white [font-family:var(--font-studio-display)] [text-shadow:0_2px_30px_rgba(0,0,0,0.85)]">
          Guides that grow UK businesses.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-moon [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">
          {posts.length} in-depth guides on AI video, pricing, promos and what actually converts —
          written for owners, not filmmakers.
        </p>
      </div>

      {/* ---- the reading shelves ---- */}
      <div data-mgst="blgHs" className="absolute inset-0 z-20 opacity-0" style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-x-0 bottom-[6%] top-[24%] flex flex-col items-center justify-end gap-4 px-[5vw]">
          <div
            data-mgst="blgS1"
            className="grid w-full max-w-6xl grid-cols-5 gap-x-3 gap-y-4 will-change-transform"
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group pointer-events-auto block text-left"
              >
                {/* backlit shelf screen */}
                <span className="block rounded-[5px] border border-[rgba(139,124,246,0.35)] bg-[#0B0D13] p-[3px] shadow-[0_0_30px_-12px_rgba(139,124,246,0.55)] transition-all group-hover:border-[rgba(233,196,106,0.7)] group-hover:shadow-[0_0_40px_-10px_rgba(233,196,106,0.6)]">
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(max-width: 1280px) 18vw, 220px"
                      className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_60%,rgba(0,0,0,0.35))]" />
                  </span>
                </span>
                <span className="mt-1.5 block px-0.5">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[rgba(160,148,250,0.95)]">
                    {post.category} · {readingTime(post.body)} min read
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-[12px] leading-snug text-moon transition-colors group-hover:text-white">
                    {post.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] text-moon-soft">
                    {formatDate(post.date)}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div data-mgst="blgS2" className="will-change-transform">
            <Link href="/blog" className="mgst-hud-btn-ghost pointer-events-auto !px-6 !py-2.5 !text-xs">
              Enter the reading lounge — all guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
