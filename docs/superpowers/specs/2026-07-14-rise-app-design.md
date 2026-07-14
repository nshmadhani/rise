# Rise — App Design Spec

**Date:** 2026-07-14  
**Status:** Source of truth for product + UI  
**Goal:** Build to learn how to sell (waitlist → thin MVP → paid conversion)

Related: landing brand notes in `2026-07-14-rise-landing-design.md`.

---

## 1. Product summary

**Rise** is a habit tracker where progress is *visible* (color grids), reflection is *light* (one-line prompts), and sharing is *optional* (win cards). Private by default.

**Audience:** Broad self-improvement (not tech-only niche).  
**Inspiration:** HabitKit’s dark grid energy — **not a 1:1 clone**.  
**Differentiators:** Daily reflection prompts + opt-in shareable wins + Rise brand language.

### North-star loop

1. Create a habit  
2. Check in (one tap)  
3. Optionally answer today’s prompt  
4. Watch the grid fill  
5. Optionally share a win  

---

## 2. Visual system (app)

| Token | Value / rule |
|--------|----------------|
| Background | OLED `#000000` |
| Cards | `#1C1C1E`, radius ~16px, soft padding |
| Borders | `#2C2C2E` |
| Text | `#F5F5F7` primary, `#8E8E93` secondary |
| Brand accent | Teal `#5EEAD4` (UI chrome, CTAs) |
| Habit colors | Per-habit saturated accents (green, violet, orange, blue, coral, etc.) |
| Type | Display: Outfit; Body: Manrope (or system on native) |
| Motifs | Contribution grids of rounded squares; one-tap check; circular progress for multi-complete later |

**Do:** dark, colorful grids, generous space, calm motion.  
**Don’t:** HabitKit assets/copy, purple-on-white SaaS look, noisy social feed, dense dashboards.

**Logo:** Ascending grid-cell mark + “Rise” wordmark (see `brand/logo/`).

---

## 3. Information architecture

### Tabs / primary nav (MVP)

1. **Today** — habit list + grids + check-in + prompt entry point  
2. **Insights** — streaks, month stats, simple trends  
3. **You** — profile, privacy, themes, export (thin)

### Secondary flows

- Add / edit habit  
- Day history (tap a grid cell → toggle completion)  
- Win card preview → Share sheet (OS)  
- Onboarding (3 screens max)

---

## 4. Core objects

### Habit

- `id`, `name`, `description?`, `icon`, `color`  
- `frequency` (daily MVP; custom later)  
- `createdAt`, `archivedAt?`  
- `reminderTime?` (phase 1.5)

### Completion

- `habitId`, `date` (local calendar day), `count` (default 1), `noteId?`

### Reflection

- `id`, `date`, `promptId` / prompt text, `body` (short string), `habitId?` (optional link)

### Win (derived or saved)

- Snapshot: habit, streak length, grid slice, optional reflection line  
- Sharing is export/image — not a public social graph in MVP

---

## 5. Screens (MVP)

### 5.1 Today

- Header: **Rise** + settings + add  
- Vertical list of habit cards:  
  - Icon, name, description  
  - Check / multi-complete control  
  - Contribution grid (trailing weeks)  
- Sticky or trailing **Today’s prompt** card after first check-in of the day (skippable)

### 5.2 Add / Edit habit

- Name, description, icon picker, color picker  
- Frequency: daily only in MVP  
- Save

### 5.3 Insights

- Completions this month  
- Current / best streak (global or per habit)  
- Simple sparkline or month grid  
- No heavy analytics tables

### 5.4 Win card

- “12-day streak · Morning walk”  
- Mini grid  
- Actions: Share / Keep going  
- Share = system share sheet (image), not in-app feed

### 5.5 Onboarding

1. Promise (“Habits you can see”)  
2. Create first habit  
3. Check in once + optional prompt → land on Today  

### 5.6 Settings (thin)

- Reminders toggle (later if time)  
- Appearance (dark default; light optional later)  
- Privacy copy: data stays on device / account TBD  
- Export data (JSON)  
- Sign-in placeholder only if cloud sync is chosen later  

---

## 6. Reflection system

- One prompt per day (rotating list of ~30 short prompts)  
- Shown after first completion of the day, dismissible  
- Max length ~280 chars  
- Stored privately; may appear on win card only if user opts in at share time  

Example prompts:

- What made today feel steady?  
- What almost got in the way?  
- One thing you’d repeat tomorrow?

---

## 7. Privacy & social rules

- **Default:** all habits, completions, reflections private  
- **Share:** explicit user action only  
- **No** public feed, comments, or follows in MVP  
- Challenges / friends = post-MVP  

---

## 8. Monetization (sell-learning)

| Tier | Includes |
|------|----------|
| Free | Unlimited habits (reasonable cap e.g. 7), grids, streaks, basic prompt, 1 win share/week |
| Premium (~$3–5/mo or $30–40/yr) | Unlimited habits, full prompt history, themes, unlimited win shares, advanced insights |

Landing tests waitlist demand before paywall builds.

---

## 9. Technical direction

### Phase 0 (now) — Landing

- Next.js + Tailwind in `web/`  
- Waitlist API → durable store (see waitlist docs)  
- Domain + logo on marketing site  

### Phase 1 — Thin app

**Recommended:** Web PWA first (same visual system), then native if traction.

| Layer | Choice |
|--------|--------|
| Client | Next.js PWA or Expo (React Native) if native-first |
| Local data | SQLite / IndexedDB (offline-first) |
| Auth | Anonymous local first; optional Apple/Google later |
| Sync | Optional; not required for MVP learning |

### Phase 2

- Cloud sync, reminders hardening, premium IAP, light challenges  

---

## 10. MVP scope cut line

**In**

- CRUD habits  
- Daily completions + grids  
- Streaks  
- Daily prompt + save reflection  
- Win card + OS share  
- Local persistence  
- Basic insights  

**Out**

- Social feed / comments  
- Food DBs / fasting timers  
- AI coaching  
- Widgets (nice-to-have after launch)  
- Live App Store / Play links until published  

---

## 11. Success metrics (sell-first)

1. Waitlist emails / week  
2. Landing → signup conversion  
3. (Later) D1 / D7 retention after app  
4. (Later) Free → paid conversion  

---

## 12. Domain & naming

- **Domain:** [riseto.app](https://riseto.app) (owned)  
- **Product name:** Rise  
- **Note:** `risehabit.app` is a separate existing habit app — no affiliation. Check App Store search collision before heavy ads.

---

## 13. Open decisions (next conversation)

- PWA vs Expo for phase 1  
- Point DNS → Vercel + deploy landing  
- Waitlist backend credentials (Supabase project)  
