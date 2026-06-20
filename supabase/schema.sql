-- DEEP DECORS — Owner Dashboard / CMS schema
-- Run this once in your Supabase project: SQL Editor -> New query -> paste -> Run

-- ============================================================
-- 1. PROFILES (who is allowed into the dashboard, and their role)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'staff' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Anyone signed in can read their own profile (needed to know their own role).
create policy "profiles: read own row"
  on public.profiles for select
  using (auth.uid() = id);

-- Owners can read every profile (needed for the Team / Roles screen).
create policy "profiles: owners read all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'owner'
    )
  );

-- Owners can update anyone's role. Staff cannot change roles (including their own).
create policy "profiles: owners update roles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'owner'
    )
  );

-- Auto-create a profile row whenever a new auth user is created.
-- New accounts default to 'staff'. Promote the first/real owner manually
-- (see the note at the bottom of this file) — this keeps a brand-new
-- Supabase project from accidentally granting owner access to anyone
-- who signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. SITE CONTENT (what the public website reads + the CMS edits)
-- One row per top-level section of deepDecorsContent.json
-- (brand, hero, featuredCollections, reviews, ...future sections)
-- ============================================================
create table if not exists public.site_content (
  section_key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

alter table public.site_content enable row level security;

-- The public website (anonymous visitors) needs to read this to render
-- live content, so SELECT is open to everyone.
create policy "site_content: public read"
  on public.site_content for select
  using (true);

-- Only signed-in owners/staff can write.
create policy "site_content: owner/staff write"
  on public.site_content for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('owner', 'staff')
    )
  );

create policy "site_content: owner/staff update"
  on public.site_content for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('owner', 'staff')
    )
  );

-- ============================================================
-- 3. MEDIA LIBRARY (Supabase Storage bucket for product/gallery photos)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media: owner/staff upload"
  on storage.objects for insert
  with check (
    bucket_id = 'media'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('owner', 'staff')
    )
  );

create policy "media: owner/staff delete"
  on storage.objects for delete
  using (
    bucket_id = 'media'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('owner', 'staff')
    )
  );

-- ============================================================
-- AFTER RUNNING THIS FILE:
--
-- 1. Supabase Dashboard -> Authentication -> Users -> Add user
--    Create your own login (email + password). This also creates your
--    profiles row automatically (via the trigger above), defaulted to 'staff'.
--
-- 2. Promote yourself to owner — run this once, with YOUR email:
--
--    update public.profiles set role = 'owner' where email = 'you@example.com';
--
-- 3. Log into /admin on the website with that email + password.
-- ============================================================
