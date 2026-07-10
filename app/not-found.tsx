import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center py-20">
      <div className="container-content text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-glow">404</p>
        <h1 className="font-display text-display font-semibold text-moon">
          This scene got <span className="text-gleam">cut</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-moon-soft">
          The page you&apos;re after doesn&apos;t exist — but the work does.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gleam px-7 py-3 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] hover:bg-gleam-bright"
          >
            Back to Home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-ink-line px-7 py-3 font-medium text-moon transition-colors duration-200 hover:border-glow hover:text-glow"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </main>
  );
}
