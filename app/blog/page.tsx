import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CTABand from '@/components/CTABand';
import { BlogListJsonLd, BreadcrumbJsonLd } from '@/lib/seo';
import { posts, formatDate } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — AI Video Production Insights for UK Businesses',
  description:
    'Practical guides on AI video production, promotional videos, UGC, TV commercials and video marketing that grows UK businesses. From the Moon Gleam AI Studio team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Moon Gleam AI Studio — Blog',
    description:
      'Practical guides on AI video production and video marketing for UK businesses.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = posts;

  return (
    <main>
      <BlogListJsonLd items={posts.map((p) => ({ title: p.title, slug: p.slug }))} />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">
            Insights · Creative AI
          </p>
          <h1 className="max-w-3xl font-display text-display font-semibold text-moon">
            The Moon Gleam blog
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moon-soft">
            Practical, no-nonsense guides on AI video production, promotional videos and video
            marketing that grows UK businesses — brief to broadcast.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-4">
        <div className="container-content">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-ink-line bg-ink-soft transition-colors duration-300 hover:border-gleam/50 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gleam/10 px-3 py-1 text-xs font-medium text-gleam">
                {featured.category}
              </span>
              <h2 className="font-display text-heading font-semibold leading-tight text-moon">
                {featured.title}
              </h2>
              <p className="leading-relaxed text-moon-soft">{featured.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-moon-faint">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span className="text-gleam transition-transform duration-200 group-hover:translate-x-1">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-14 md:py-20">
        <div className="container-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-colors duration-300 hover:border-gleam/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 inline-block rounded-full bg-ink/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-gleam backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-moon">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-moon-soft">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-moon-faint">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="text-gleam transition-transform duration-200 group-hover:translate-x-1">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to put this into action?"
        lead="Book a free 15-minute call. We'll show you exactly what video can do for your business — no obligation, genuinely useful."
      />
    </main>
  );
}
