# Waitlist storage

Emails are saved by the **Edge** API route `POST /api/waitlist`.

## Store

A **private GitHub gist** (`waitlist.json`) — durable, no Supabase/Postgres to manage.

Why not a local SQLite file? On Vercel, Edge/serverless has **no durable disk**. A “local DB” resets on every deploy.

## Env (already set in local `.env.local`)

```bash
WAITLIST_GIST_ID=...
WAITLIST_GITHUB_TOKEN=...   # GitHub token with gist scope
WAITLIST_ADMIN_SECRET=...
```

On Vercel: Project → Settings → Environment Variables → add the same three, then redeploy.

## Export

```bash
curl "http://localhost:3001/api/waitlist/export?secret=YOUR_SECRET"
```
