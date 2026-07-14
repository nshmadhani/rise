-- Rise waitlist table (Supabase / Postgres)
-- Run in Supabase SQL editor once.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text default 'landing'
);

alter table waitlist enable row level security;

-- No public read/write via anon key; server uses service role.
