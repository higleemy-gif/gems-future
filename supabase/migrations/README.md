# Gems Future — database migrations

SQL migrations for the Gems Future Supabase (self-hosted on a VPS via Coolify).
These are **plain `.sql` files**. Nothing here connects to a live database — you
apply them yourself once the instance is up.

## Files (apply in this order)

| Order | File | What it does |
| ----- | ---- | ------------ |
| 1 | `20261018090000_init_schema.sql` | Tables, constraints, indexes, **RLS enabled on every table**, policies, and grants. |
| 2 | `20261018090100_auth_trigger.sql` | Creates a `profiles` row automatically whenever a new `auth.users` row is created. |
| 3 | `20261018090200_seed_recommendations.sql` | Seeds the curated `recommendations` inventory (10 real, affordable India options). |

The numeric timestamp prefixes define the order. Always run them
lowest-to-highest. Every file is written to be **re-runnable** (`create ... if
not exists`, `drop policy if exists`, `on conflict do nothing`), so applying the
set twice is safe.

## Prerequisites

- A running Supabase stack (Postgres + Auth). The `auth` schema and
  `auth.users` table must exist before migration 2 — they ship with Supabase.
- One of:
  - the **Supabase CLI** (`supabase`), or
  - `psql` with a connection string, or
  - access to the **SQL Editor** in Supabase Studio.

> Run these as a privileged role (the `postgres` / service owner). The seed and
> the RLS/grant statements need an owner-level role; they are **not** meant to
> run as `anon` or `authenticated`.

---

## Option A — Supabase CLI (recommended)

From the project root (the folder that contains `supabase/`):

```bash
# One-time: link the CLI to your self-hosted project's database.
# Use the direct Postgres connection string for your instance.
supabase db push --db-url "postgresql://postgres:<PASSWORD>@<HOST>:5432/postgres"
```

`db push` applies every file in `supabase/migrations` in timestamp order and
records them in the migration history table so they won't be re-applied.

If you prefer to dry-run first:

```bash
supabase db push --dry-run --db-url "postgresql://postgres:<PASSWORD>@<HOST>:5432/postgres"
```

---

## Option B — psql

Run the files in order against your database:

```bash
psql "postgresql://postgres:<PASSWORD>@<HOST>:5432/postgres" \
  -v ON_ERROR_STOP=1 \
  -f supabase/migrations/20261018090000_init_schema.sql \
  -f supabase/migrations/20261018090100_auth_trigger.sql \
  -f supabase/migrations/20261018090200_seed_recommendations.sql
```

`ON_ERROR_STOP=1` makes psql abort on the first error instead of continuing.

---

## Option C — Supabase Studio SQL Editor

1. Open **Studio → SQL Editor**.
2. Paste the contents of each file **in order** (1, then 2, then 3) and run each.
3. Check **Authentication → Policies** afterwards to confirm RLS is on.

---

## Verify it worked

```sql
-- 1. RLS must be ON for all five tables (rowsecurity = true for each).
select relname, relrowsecurity
from pg_class
where relname in
  ('profiles','students','counselling_sessions','recommendations','leads')
order by relname;

-- 2. Policies exist.
select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- 3. Seed loaded (expect 10 rows).
select count(*) from public.recommendations;

-- 4. Trigger is attached to auth.users.
select tgname from pg_trigger where tgname = 'on_auth_user_created';
```

### Quick RLS sanity check

With the **anon** key you should be able to read active recommendations and
nothing else. From the project using the anon client:

```sql
-- As anon: returns rows (active = true only).
select id, title, mode from public.recommendations;

-- As anon: returns ZERO rows (no policy grants anon access).
select * from public.profiles;
```

Signed-in users only ever see their own `profiles`, `students`,
`counselling_sessions`, and `leads` rows. Writes to `recommendations` are
possible **only** with the `service_role` key (server-side).

---

## Security notes (do not skip)

- **RLS is enabled on every table.** Do not disable it, and do not add broad
  policies to `anon`/`authenticated` beyond what's here.
- The **`service_role` key bypasses RLS** — keep it server-side only (Edge
  Functions / server), never in the browser bundle or `NEXT_PUBLIC_*`.
- `profiles.consent_at` stays `NULL` until verifiable parental consent (DPDP
  Act) is captured. Gate storing a student's data on this being set.
- The AI must recommend **only** rows from `recommendations`. It never invents
  course or college names.

## Rolling back (dev only)

There is no down-migration. To reset a **development** database:

```sql
-- DANGER: destroys all app data. Dev/staging only.
drop table if exists public.leads cascade;
drop table if exists public.counselling_sessions cascade;
drop table if exists public.students cascade;
drop table if exists public.recommendations cascade;
drop table if exists public.profiles cascade;
drop function if exists public.handle_new_user();
```
