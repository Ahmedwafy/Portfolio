import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* soft glow */}
      <div
        className="absolute w-105 h-105 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative z-10 text-center max-w-md">
        <p
          className="text-8xl font-bold mb-4 gradient-text"
          style={{ lineHeight: 1 }}
        >
          404
        </p>
        <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
        <p className="text-(--text-secondary) mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex px-7 py-3.5 rounded-full font-medium text-sm"
        >
          Back to Home →
        </Link>
      </div>
    </main>
  );
}
