export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ComingSoonBadge store="ios" />
      <ComingSoonBadge store="android" />
    </div>
  );
}

function ComingSoonBadge({ store }: { store: "ios" | "android" }) {
  const label =
    store === "ios" ? "Download on the App Store" : "Get it on Google Play";
  const sub = store === "ios" ? "App Store" : "Google Play";

  return (
    <div
      className="relative inline-flex items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-2.5 opacity-90"
      aria-label={`${label} — Coming soon`}
    >
      <StoreIcon store={store} />
      <div className="text-left leading-tight">
        <div className="text-[10px] uppercase tracking-wider text-faint">
          Coming soon
        </div>
        <div className="text-sm font-semibold text-text">{sub}</div>
      </div>
      <span className="absolute -top-2 -right-2 rounded-full bg-accent/20 border border-accent/40 px-2 py-0.5 text-[10px] font-semibold text-accent">
        Soon
      </span>
    </div>
  );
}

function StoreIcon({ store }: { store: "ios" | "android" }) {
  if (store === "ios") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16.365 1.43c0 1.14-.418 2.2-1.17 3.01-.78.85-2.05 1.5-3.2 1.41-.14-1.1.42-2.26 1.16-3.05.78-.85 2.13-1.48 3.21-1.37zM20.5 17.3c-.56 1.25-.83 1.8-1.55 2.9-.99 1.5-2.39 3.37-4.13 3.39-1.54.02-1.94-.99-4.04-.98-2.1.01-2.54 1-4.08.98-1.74-.02-3.07-1.7-4.06-3.2-2.77-4.2-3.06-9.13-1.35-11.73 1.2-1.83 3.1-2.9 4.89-2.9 1.82 0 2.96 1 4.46 1 1.45 0 2.33-1.01 4.43-1.01 1.58 0 3.25.86 4.44 2.35-3.9 2.14-3.27 7.71.99 9.2z" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.6 2.3c-.4.2-.6.6-.6 1.1v17.2c0 .5.2.9.6 1.1l9.7-9.7L3.6 2.3zm12.2 7L13 11.9l3.4 3.4 2.2-1.3c1-.6 1-.9 0-1.5l-2.8-1.6zM4.9 1.1l8.6 8.6 2.5-2.5L4.9 1.1zm8.6 13.1-8.6 8.6 11.1-6.1-2.5-2.5z" />
    </svg>
  );
}
