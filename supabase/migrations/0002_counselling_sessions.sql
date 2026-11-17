-- 0002_counselling_sessions.sql
-- counselling_sessions: quiz answers + AI result, owner-scoped via RLS.

create table if not exists public.counselling_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  answers jsonb,
  ai_result jsonb,
  created_at timestamptz not null default now()
);

create index if not exists counselling_sessions_profile_id_idx
  on public.counselling_sessions (profile_id);

alter table public.counselling_sessions enable row level security;

drop policy if exists "cs_select_own" on public.counselling_sessions;
create policy "cs_select_own" on public.counselling_sessions
  for select using ((select auth.uid()) = profile_id);

drop policy if exists "cs_insert_own" on public.counselling_sessions;
create policy "cs_insert_own" on public.counselling_sessions
  for insert with check ((select auth.uid()) = profile_id);

drop policy if exists "cs_update_own" on public.counselling_sessions;
create policy "cs_update_own" on public.counselling_sessions
  for update using ((select auth.uid()) = profile_id) with check ((select auth.uid()) = profile_id);

drop policy if exists "cs_delete_own" on public.counselling_sessions;
create policy "cs_delete_own" on public.counselling_sessions
  for delete using ((select auth.uid()) = profile_id);
