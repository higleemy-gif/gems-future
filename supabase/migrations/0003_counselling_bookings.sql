-- 0003_counselling_bookings.sql
-- 1-to-1 counselling session bookings, owner-scoped via RLS.

create table if not exists public.counselling_bookings (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  session_date date not null,
  session_time text not null,
  mode text,
  status text not null default 'requested',
  created_at timestamptz not null default now()
);

create index if not exists counselling_bookings_profile_id_idx
  on public.counselling_bookings (profile_id);

alter table public.counselling_bookings enable row level security;

drop policy if exists "cb_select_own" on public.counselling_bookings;
create policy "cb_select_own" on public.counselling_bookings
  for select using ((select auth.uid()) = profile_id);

drop policy if exists "cb_insert_own" on public.counselling_bookings;
create policy "cb_insert_own" on public.counselling_bookings
  for insert with check ((select auth.uid()) = profile_id);

drop policy if exists "cb_update_own" on public.counselling_bookings;
create policy "cb_update_own" on public.counselling_bookings
  for update using ((select auth.uid()) = profile_id) with check ((select auth.uid()) = profile_id);

drop policy if exists "cb_delete_own" on public.counselling_bookings;
create policy "cb_delete_own" on public.counselling_bookings
  for delete using ((select auth.uid()) = profile_id);
