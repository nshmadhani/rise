type CellTone = "full" | "mid" | "empty";

function Grid({
  pattern,
  colors,
  cols = 14,
}: {
  pattern: CellTone[];
  colors: { full: string; mid: string; empty: string };
  cols?: number;
}) {
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {pattern.map((tone, i) => (
        <div
          key={i}
          className="grid-cell"
          style={{
            background:
              tone === "full"
                ? colors.full
                : tone === "mid"
                  ? colors.mid
                  : colors.empty,
          }}
        />
      ))}
    </div>
  );
}

const walkPattern: CellTone[] = [
  "full", "mid", "full", "empty", "full", "full", "mid", "full",
  "full", "empty", "full", "full", "mid", "full", "full", "full",
  "mid", "full", "empty", "full", "full", "mid", "full", "full",
  "full", "empty", "full", "mid",
];

const readPattern: CellTone[] = [
  "empty", "full", "mid", "full", "empty", "full", "full", "mid",
  "empty", "full", "full", "mid", "full", "empty", "full", "full",
  "mid", "full", "full", "empty", "full", "mid", "full", "full",
  "empty", "full", "full", "mid",
];

const journalPattern: CellTone[] = [
  "empty", "full", "full", "mid", "full", "empty", "full", "full",
  "mid", "full", "full", "empty", "full", "full", "mid", "full",
];

function PhoneShell({
  children,
  label,
  wide,
}: {
  children: React.ReactNode;
  label?: string;
  wide?: boolean;
}) {
  return (
    <figure className={`shrink-0 ${wide ? "w-[260px] sm:w-[280px]" : "w-[220px] sm:w-[240px]"}`}>
      <div className="phone-frame">
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="h-1.5 w-16 rounded-full bg-white/10" />
        </div>
        <div className="px-3 pb-4 min-h-[420px] bg-black">{children}</div>
      </div>
      {label ? (
        <figcaption className="mt-3 text-center text-xs text-muted">{label}</figcaption>
      ) : null}
    </figure>
  );
}

export function ScreenHome({ label = "Home — fill the grid", wide }: { label?: string | false; wide?: boolean } = {}) {
  return (
    <PhoneShell label={label === false ? undefined : label} wide={wide}>
      <div className="flex items-center justify-between px-1 py-2 mb-2">
        <span className="text-muted text-sm">⚙</span>
        <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight">
          Rise
        </span>
        <span className="text-muted text-lg leading-none">＋</span>
      </div>

      <div className="rounded-2xl bg-card p-3 mb-2.5">
        <div className="flex gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2a2a2c] text-sm">
            🚶
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-tight">
              Morning walk
            </div>
            <div className="text-[11px] text-muted mt-0.5">Clear the mind</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rise-green text-black text-sm font-bold">
            ✓
          </div>
        </div>
        <Grid
          pattern={walkPattern}
          cols={14}
          colors={{
            full: "var(--green)",
            mid: "var(--green-dim)",
            empty: "var(--green-empty)",
          }}
        />
      </div>

      <div className="rounded-2xl bg-card p-3">
        <div className="flex gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2a2a2c] text-sm">
            📖
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-tight">
              Read 20 pages
            </div>
            <div className="text-[11px] text-muted mt-0.5">Before bed</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] border-rise-violet text-rise-violet text-lg leading-none">
            ＋
          </div>
        </div>
        <Grid
          pattern={readPattern}
          cols={14}
          colors={{
            full: "var(--violet)",
            mid: "var(--violet-dim)",
            empty: "var(--violet-empty)",
          }}
        />
      </div>
    </PhoneShell>
  );
}

export function ScreenReflect() {
  return (
    <PhoneShell label="Reflect — one line">
      <div className="text-center font-[family-name:var(--font-display)] text-[15px] font-semibold py-2 mb-3">
        Rise
      </div>
      <div className="rounded-2xl bg-card p-3 mb-2.5">
        <div className="flex gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2a2a2c] text-sm">
            ✍️
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold">Journal</div>
            <div className="text-[11px] text-muted mt-0.5">3 min reflection</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rise-orange text-black text-sm font-bold">
            ✓
          </div>
        </div>
        <Grid
          pattern={journalPattern}
          cols={8}
          colors={{
            full: "var(--orange)",
            mid: "var(--orange-dim)",
            empty: "var(--orange-empty)",
          }}
        />
        <div className="mt-3 rounded-xl border border-card-border bg-[#111113] p-3">
          <div className="text-[10px] uppercase tracking-[0.08em] text-muted mb-1.5">
            Today’s prompt
          </div>
          <div className="text-[12px] leading-snug text-[#e5e5ea]">
            What made today feel steady?
          </div>
          <div className="mt-3 h-8 rounded-lg border border-dashed border-card-border px-2 flex items-center text-[11px] text-faint">
            Write a line…
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-card p-3 opacity-80">
        <div className="text-[13px] font-semibold mb-2">Deep work</div>
        <Grid
          pattern={readPattern.slice(0, 16)}
          cols={8}
          colors={{
            full: "var(--blue)",
            mid: "var(--blue-dim)",
            empty: "var(--blue-empty)",
          }}
        />
      </div>
    </PhoneShell>
  );
}

export function ScreenWin() {
  return (
    <PhoneShell label="Win — share if you want">
      <div className="text-center font-[family-name:var(--font-display)] text-[15px] font-semibold py-2 mb-4">
        Rise
      </div>
      <div className="rounded-[20px] border border-card-border bg-gradient-to-b from-card to-[#141416] p-4">
        <div className="text-[10px] uppercase tracking-[0.1em] text-muted mb-2">
          Win of the day
        </div>
        <div className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-tight leading-none mb-1">
          12-day streak
        </div>
        <div className="text-[12px] text-muted mb-4">Morning walk</div>
        <Grid
          pattern={Array.from({ length: 12 }, () => "full" as CellTone)}
          cols={6}
          colors={{
            full: "var(--green)",
            mid: "var(--green-dim)",
            empty: "var(--green-empty)",
          }}
        />
        <div className="mt-4 flex gap-2">
          <div className="flex-1 rounded-xl bg-[#2c2c2e] py-2.5 text-center text-[11px] font-semibold">
            Share
          </div>
          <div className="flex-1 rounded-xl bg-rise-green py-2.5 text-center text-[11px] font-bold text-black">
            Keep going
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="flex-1 rounded-2xl bg-card p-3">
          <div className="text-[10px] text-muted">Habits</div>
          <div className="text-xl font-bold mt-1">5</div>
        </div>
        <div className="flex-1 rounded-2xl bg-card p-3">
          <div className="text-[10px] text-muted">Best</div>
          <div className="text-xl font-bold mt-1 text-rise-violet">41</div>
        </div>
      </div>
    </PhoneShell>
  );
}

export function ScreenStats() {
  return (
    <PhoneShell label="Stats — see the pattern">
      <div className="text-center font-[family-name:var(--font-display)] text-[15px] font-semibold py-2 mb-3">
        This month
      </div>
      <div className="rounded-2xl bg-card p-3 mb-2.5">
        <div className="text-[11px] text-muted mb-2">Completions</div>
        <div className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          86
        </div>
        <svg viewBox="0 0 200 48" className="mt-3 w-full h-12" aria-hidden>
          <path
            d="M0 36 C20 34, 30 20, 50 22 S80 40, 100 28 S140 8, 160 16 S190 30, 200 18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path
            d="M0 36 C20 34, 30 20, 50 22 S80 40, 100 28 S140 8, 160 16 S190 30, 200 18 V48 H0 Z"
            fill="url(#riseFill)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="riseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <div className="rounded-2xl bg-card p-3">
          <div className="text-[10px] text-muted">Current</div>
          <div className="text-xl font-bold mt-1">12</div>
        </div>
        <div className="rounded-2xl bg-card p-3">
          <div className="text-[10px] text-muted">Best streak</div>
          <div className="text-xl font-bold mt-1 text-rise-orange">41</div>
        </div>
      </div>
      <div className="rounded-2xl bg-card p-3">
        <div className="text-[11px] text-muted mb-2">Year grid</div>
        <Grid
          pattern={[
            ...walkPattern,
            ...readPattern.slice(0, 14),
          ]}
          cols={14}
          colors={{
            full: "var(--accent)",
            mid: "#2dd4bf",
            empty: "#0f2f2a",
          }}
        />
      </div>
    </PhoneShell>
  );
}

export function ScreenshotGallery() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap lg:flex-nowrap lg:overflow-visible">
      <ScreenHome />
      <ScreenReflect />
      <ScreenWin />
      <ScreenStats />
    </div>
  );
}

export function HeroPhone() {
  return (
    <div className="relative mx-auto">
      <div className="absolute -inset-8 rise-hero-glow rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.2),transparent_65%)] pointer-events-none" />
      <ScreenHome label={false} wide />
    </div>
  );
}
