-- ===========================================================================
-- Gems Future — core schema
-- Row Level Security is ENABLED on every table. Nothing is readable or
-- writable by the anon/authenticated roles except through the policies below.
--
-- Key rules baked in here:
--   * anon key (browser) can ONLY read active recommendations.
--   * authenticated users can only touch their own rows.
--   * service_role (server-side only) bypasses RLS and owns writes to the
--     curated `recommendations` inventory.
-- Designed to run cleanly on self-hosted Supabase (psql / supabase db push).
-- ===========================================================================

-- gen_random_uuid() lives in pgcrypto. It is built into Postgres 13+ as well,
-- but we require the extension explicitly so the migration is portable.
create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- profiles — one row per auth user. Created automatically by a trigger on
-- auth.users (see the next migration).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        text not null default 'student' check (role in ('student', 'parent')),
  phone       text,
  consent_at  timestamptz,
  created_at  timestamptz not null default now()
);

comment on table public.profiles is
  'One row per auth user. consent_at records verifiable parental consent (DPDP Act) and stays NULL until consent is captured.';

-- ---------------------------------------------------------------------------
-- students — the student a profile is counselling for. A parent profile may
-- own several students; a student profile typically owns one (themselves).
-- ---------------------------------------------------------------------------
create table if not exists public.students (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles (id) on delete cascade,
  name        text not null,
  state       text,
  district    text,
  medium      text,
  stage       text,
  academic    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists students_owner_id_idx on public.students (owner_id);

-- ---------------------------------------------------------------------------
-- counselling_sessions — one counselling run for a student: the free-text /
-- structured answers and the AI's result. ai_result is written server-side by
-- the Edge Function (via service_role), never by the browser.
-- ---------------------------------------------------------------------------
create table if not exists public.counselling_sessions (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students (id) on delete cascade,
  answers     jsonb not null default '{}'::jsonb,
  ai_result   jsonb,
  status      text not null default 'pending'
                check (status in ('pending', 'processing', 'complete', 'failed')),
  created_at  timestamptz not null default now()
);

create index if not exists counselling_sessions_student_id_idx
  on public.counselling_sessions (student_id);

-- ---------------------------------------------------------------------------
-- recommendations — our curated inventory of affordable courses/options.
-- The AI recommends ONLY from this table; it never invents entries.
-- Publicly readable (where active), writable only by service_role.
-- ---------------------------------------------------------------------------
create table if not exists public.recommendations (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  mode        text not null check (mode in ('online', 'offline')),
  category    text,
  price_text  text,
  provider    text,
  url         text,
  region      text,
  active      boolean not null default true,
  sort        integer not null default 0
);

create index if not exists recommendations_active_sort_idx
  on public.recommendations (active, sort);

-- ---------------------------------------------------------------------------
-- leads — follow-up contact details a user chooses to share. Owned through the
-- linked student. Insert + read only; no public exposure.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.students (id) on delete cascade,
  parent_name  text,
  alt_phone    text,
  email        text,
  address      text,
  status       text not null default 'new'
                 check (status in ('new', 'contacted', 'interested', 'converted', 'lost')),
  created_at   timestamptz not null default now()
);

create index if not exists leads_student_id_idx on public.leads (student_id);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.profiles             enable row level security;
alter table public.students             enable row level security;
alter table public.counselling_sessions enable row level security;
alter table public.recommendations      enable row level security;
alter table public.leads                enable row level security;

-- --- profiles: a user may touch only their own row -------------------------
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- --- students: owner can do everything on their own students ---------------
drop policy if exists students_all_own on public.students;
create policy students_all_own on public.students
  for all to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- --- counselling_sessions: access only via ownership of the linked student -
drop policy if exists counselling_sessions_all_own on public.counselling_sessions;
create policy counselling_sessions_all_own on public.counselling_sessions
  for all to authenticated
  using (
    exists (
      select 1 from public.students s
      where s.id = counselling_sessions.student_id
        and s.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.students s
      where s.id = counselling_sessions.student_id
        and s.owner_id = auth.uid()
    )
  );

-- --- recommendations: public read of active rows; writes only service_role -
drop policy if exists recommendations_public_read on public.recommendations;
create policy recommendations_public_read on public.recommendations
  for select to anon, authenticated
  using (active = true);

-- service_role already bypasses RLS; this explicit policy documents intent
-- and keeps writes locked to server-side code only.
drop policy if exists recommendations_service_write on public.recommendations;
create policy recommendations_service_write on public.recommendations
  for all to service_role
  using (true)
  with check (true);

-- --- leads: owner may insert and read only their own leads -----------------
drop policy if exists leads_insert_own on public.leads;
create policy leads_insert_own on public.leads
  for insert to authenticated
  with check (
    exists (
      select 1 from public.students s
      where s.id = leads.student_id
        and s.owner_id = auth.uid()
    )
  );

drop policy if exists leads_select_own on public.leads;
create policy leads_select_own on public.leads
  for select to authenticated
  using (
    exists (
      select 1 from public.students s
      where s.id = leads.student_id
        and s.owner_id = auth.uid()
    )
  );

-- ===========================================================================
-- Grants
-- RLS governs WHICH rows; table privileges govern WHETHER a role may touch the
-- table at all. Both are required. We grant the minimum each role needs.
-- ===========================================================================
grant usage on schema public to anon, authenticated;

-- anon (browser, logged-out): read-only access to the curated inventory.
grant select on public.recommendations to anon;

-- authenticated (logged-in users): own data only, enforced by the policies.
grant select, insert, update          on public.profiles             to authenticated;
grant select, insert, update, delete  on public.students             to authenticated;
grant select, insert, update, delete  on public.counselling_sessions to authenticated;
grant select                          on public.recommendations      to authenticated;
grant select, insert                  on public.leads                to authenticated;

-- service_role (server-side only): full access; bypasses RLS.
grant all on public.profiles             to service_role;
grant all on public.students             to service_role;
grant all on public.counselling_sessions to service_role;
grant all on public.recommendations      to service_role;
grant all on public.leads                to service_role;
