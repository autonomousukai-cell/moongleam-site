import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import CTABand from '@/components/CTABand';
import FAQ from '@/components/FAQ';
import {
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from '@/lib/seo';
import { posts, getPost, getRelated, formatDate, readingTime } from '@/lib/posts';

marked.setOptions({ gfm: true, breaks: false });

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Render Markdown → HTML, then wrap tables so they scroll on mobile.
  const html = (marked.parse(post.body) as string).replace(
    /<table>/g,
    '<div class="table-wrap"><table>',
  ).replace(/<\/table>/g, '</table></div>');

  const related = getRelated(post);

  return (
    <main>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        cover={post.cover}
        date={post.date}
      />
      <FaqJsonLd items={post.faqs} />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {/* Header */}
      <article className="py-16 md:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-xs font-medium uppercase tracking-[0.2em] text-glow transition-colors hover:text-moon"
            >
              ← Back to blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-block rounded-full bg-gleam/10 px-3 py-1 font-medium text-gleam">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-moon-faint">
                {formatDate(post.date)}
              </time>
              <span className="text-moon-faint">· {readingTime(post.body)} min read</span>
            </div>

            <h1 className="mt-4 font-display text-display font-semibold leading-tight text-moon">
              {post.title}
            </h1>
          </div>

          {/* Cover */}
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-ink-line">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto mt-12 max-w-3xl">
            {/* Answer-first lead (AEO) */}
            <div className="rounded-2xl border border-gleam/30 bg-gleam/[0.06] p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-gleam">
                Quick answer
              </p>
              <p className="text-lg leading-relaxed text-moon">{post.quickAnswer}</p>
            </div>

            <div
              className="blog-prose mt-10"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* FAQ */}
            <section className="mt-16">
              <h2 className="mb-6 font-display text-heading font-semibold text-moon">
                Frequently asked questions
              </h2>
              <FAQ items={post.faqs} />
            </section>

            {/* Related reading (internal links) */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 font-display text-lg font-semibold text-moon">
                  Related reading
                </h2>
                <ul className="space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-ink-line bg-ink-soft px-5 py-4 transition-colors duration-200 hover:border-gleam/50"
                      >
                        <span className="text-gleam">→</span>
                        <span className="text-sm font-medium text-moon-soft transition-colors group-hover:text-moon">
                          {r.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      <CTABand />
    </main>
  );
}
