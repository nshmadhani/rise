# Waitlist storage

Emails from the landing form are saved in two layers:

## Local (always)

On the server machine / local dev:

- `web/data/waitlist.json`
- `web/data/waitlist.csv`

Good for development. **Not durable on Vercel** (ephemeral filesystem).

## Supabase (recommended for production)

1. Create a free project at [supabase.com](https://supabase.com).  
2. Run SQL in `docs/waitlist-supabase.sql`.  
3. Copy `.env.example` → `web/.env.local` and set:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
WAITLIST_ADMIN_SECRET=...
```

4. Restart `npm run dev`. New signups go to Supabase **and** local backup.

## Export

```bash
curl "http://localhost:3001/api/waitlist/export?secret=YOUR_SECRET"
curl "http://localhost:3001/api/waitlist/export?secret=YOUR_SECRET&format=csv" -o waitlist.csv
```
