-- ===========================================================================
-- Gems Future — auto-create a profile when an auth user signs up
--
-- When Supabase Auth inserts a row into auth.users (e.g. after Google OAuth),
-- this trigger creates the matching public.profiles row.
--
-- The function is SECURITY DEFINER so it runs as its owner (a privileged role)
-- and can insert into public.profiles despite RLS. search_path is pinned to a
-- safe, explicit value to prevent search-path hijacking.
-- ===========================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
begin
  -- Optional role hint passed in user metadata at sign-up; default to student.
  v_role := coalesce(nullif(new.raw_user_meta_data ->> 'role', ''), 'student');
  if v_role not in ('student', 'parent') then
    v_role := 'student';
  end if;

  insert into public.profiles (id, role, phone)
  values (new.id, v_role, new.phone)
  on conflict (id) do nothing;

  return new;
end;
$$;

comment on function public.handle_new_user() is
  'Creates a public.profiles row for each new auth.users row. Role comes from raw_user_meta_data->>role (student|parent), defaulting to student.';

-- Recreate the trigger idempotently.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
