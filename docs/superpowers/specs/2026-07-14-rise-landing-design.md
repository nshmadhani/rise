# Rise — Design Spec (Landing + Brand)

**Date:** 2026-07-14  
**Status:** Approved for build (user: “build”)  
**Goal:** Learn to sell via a waitlist landing; thin app later.

## Product

**Rise** — habit tracker + reflection + optional shareable wins.  
Broad self-improvement audience. Personal craft first; social opt-in later.

## Visual direction (A+B+C)

Inspired by HabitKit energy — **not a 1:1 clone**.

| Layer | What |
|--------|------|
| A — Grid dashboard | OLED black, per-habit color contribution grids, soft cards, one-tap check |
| B — Reflection | Daily one-line prompt near check-in |
| C — Shareable wins | Streak/win cards; private by default |

**Differentiation:** Rise branding, reflection prompts, optional wins, original screen layouts/copy/colors — do not reuse HabitKit assets on the public site. HabitKit images live only in `brand-refs/habitkit/` for internal reference.

## Landing page

1. **Hero** — Brand **Rise**, promise, waitlist CTA, Coming soon store badges, dominant product visual  
2. **Screenshots** — Rise mock screens: Home, Reflect, Win, Stats (CSS/HTML phone frames; our art)  
3. **Track** — Fill the grid  
4. **Reflect** — Prompt, not diary essay  
5. **Share** — Optional wins, private by default  
6. **Final CTA** — Waitlist + App Store / Google Play **Coming soon** (no live store URLs)

### Store badges

Option A: show official-style badges labeled / overlaid **Coming soon**. No App Store or Play URLs until publish.

### Waitlist

Email capture via Next.js API (`/api/waitlist`).  
Stores locally (`web/data/waitlist.json` + `.csv`) and optionally to **Supabase** when env vars are set.  
Export: `/api/waitlist/export?secret=…` — see `docs/waitlist.md`.

## Brand assets

- Logo mark / icon / wordmark: `brand/logo/` and `web/public/brand/`
- App design source of truth: `docs/superpowers/specs/2026-07-14-rise-app-design.md`
- Domains: `docs/domain-research.md`

## Tech (phase 1)

- Next.js (App Router) + TypeScript + Tailwind  
- Deployable static/SSR landing  
- No native apps yet  

## Out of scope (phase 1)

- Real iOS/Android apps  
- Live store links  
- Full auth / social feed  
- HabitKit asset reuse on production pages  

## Success for “learn to sell”

Landing live → measure waitlist signups from posts/ads → iterate copy.
