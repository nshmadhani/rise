import Image from "next/image";
import { HeroPhone, ScreenshotGallery } from "@/components/PhoneMocks";
import { StoreBadges } from "@/components/StoreBadges";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark.png"
              alt="Rise"
              width={36}
              height={36}
              className="rounded-lg"
              priority
            />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
              Rise
            </span>
          </a>
          <a
            href="#waitlist"
            className="rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            Join waitlist
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-white/5"
      >
        <div
          className="pointer-events-none absolute inset-0 rise-hero-glow"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 35%, rgba(191,90,242,0.16), transparent), radial-gradient(ellipse 50% 45% at 15% 80%, rgba(48,209,88,0.12), transparent), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(94,234,212,0.1), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="rise-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Rise
            </p>
            <h1 className="rise-fade-up rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Habits you can see. Reflections that stick.
            </h1>
            <p className="rise-fade-up rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              A beautiful habit grid with optional daily prompts — private by
              default, share when you want.
            </p>
            <div id="waitlist" className="rise-fade-up rise-delay-3 mt-8">
              <WaitlistForm variant="hero" />
            </div>
            <div className="rise-fade-up rise-delay-4 mt-6">
              <StoreBadges />
            </div>
          </div>
          <div className="rise-fade-up rise-delay-2 flex justify-center lg:justify-end">
            <HeroPhone />
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-b border-white/5 bg-bg-elevated py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            Product
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Built to feel good every day
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Dark, colorful, and clear — track in a glance, reflect in a line,
            share a win only if you choose.
          </p>
          <div className="mt-10">
            <ScreenshotGallery />
          </div>
        </div>
      </section>

      {/* Track */}
      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rise-green">
            01 · Track
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            Fill the grid.
          </h2>
          <p className="mt-3 max-w-lg text-muted leading-relaxed">
            One tap to check in. Each habit gets its own color — progress you
            can see without opening a chart.
          </p>
        </div>
      </section>

      {/* Reflect */}
      <section className="border-b border-white/5 bg-bg-elevated py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rise-orange">
            02 · Reflect
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            A prompt, not a diary essay.
          </h2>
          <p className="mt-3 max-w-lg text-muted leading-relaxed">
            Optional one-line reflection after you check in. Keep the streak
            honest — and notice what actually helps.
          </p>
        </div>
      </section>

      {/* Share */}
      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rise-violet">
            03 · Share
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            Wins you choose to show.
          </h2>
          <p className="mt-3 max-w-lg text-muted leading-relaxed">
            Share a streak card when you want. Everything stays private until
            you say otherwise.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Start rising.
          </h2>
          <p className="mt-3 text-muted">
            Early access — leave your email. Apps coming soon on iOS and
            Android.
          </p>
          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>
          <div className="mt-8">
            <WaitlistForm variant="footer" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-muted">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="rounded-md"
            />
            Rise
          </span>
          <span>Habits · Reflection · Optional wins · riseto.app</span>
        </div>
      </footer>
    </main>
  );
}
