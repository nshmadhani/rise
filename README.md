# Rise

Habit tracker + reflection + optional shareable wins.  
Marketing site: **https://riseto.app** (domain pending DNS).

## Repo layout

- `web/` — Next.js landing + waitlist API
- `docs/` — design specs, waitlist, domain notes
- `brand/` — logo assets

## Local

```bash
cd web
npm install
npm run dev
```

## Deploy

- **GitHub:** https://github.com/nshmadhani/rise  
- **App root on Vercel:** set Root Directory to `web`  
- **Domain:** riseto.app (connect in Vercel → Domains after purchase)

```bash
cd web
npx vercel --prod
```
