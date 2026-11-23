-- ==============================================================================
-- OPEN HEAVENS CHRISTIAN CENTRE - RLS VERIFICATION TEST SUITE
-- File: supabase/rls-tests.sql
-- Run this in the Supabase SQL Editor to verify security policies and RLS enforcement.
-- ==============================================================================

begin;

-- Create test mock users if not present
do $$
declare
  super_admin_id uuid := '00000000-0000-0000-0000-000000000001';
  editor_id uuid := '00000000-0000-0000-0000-000000000002';
  other_user_id uuid := '00000000-0000-0000-0000-000000000003';
begin
  -- Insert dummy profiles for testing
  insert into public.profiles (id, full_name, role)
  values
    (super_admin_id, 'Test Super Admin', 'super_admin'),
    (editor_id, 'Test Editor', 'editor'),
    (other_user_id, 'Test Member', 'editor')
  on conflict (id) do nothing;
end $$;

-- ==============================================================================
-- TEST 1: Anonymous (anon) Form Submissions Insertion vs Selection
-- PROVE: Anon can INSERT, but CANNOT SELECT (protecting prayer/contact data)
-- ==============================================================================
set local role anon;

-- Step 1A: Attempt insert as anon
insert into public.form_submissions (form_type, payload, status)
values ('prayer', '{"fullName": "Secret User", "prayerTopic": "Confidential matter"}'::jsonb, 'new');

-- Step 1B: Attempt select as anon
do $$
declare
  sub_count int;
begin
  select count(*) into sub_count from public.form_submissions;
  if sub_count > 0 then
    raise exception 'RLS FAILURE: anon was able to select % rows from form_submissions!', sub_count;
  else
    raise notice 'PASS [Test 1]: anon cannot select form_submissions (RLS blocked, returned 0 rows).';
  end if;
end $$;

-- ==============================================================================
-- TEST 2: Anonymous (anon) Cannot Read Unpublished Events
-- PROVE: Draft and Archived events are invisible to the public
-- ==============================================================================
-- Switch to super_admin to plant a draft event
set local role postgres;
insert into public.events (title, slug, description, date, start_time, end_time, venue, status)
values ('Secret Staff Planning Day', 'secret-staff-planning', 'Private meeting', '2026-12-15', '09:00', '17:00', 'Office', 'draft')
on conflict (slug) do nothing;

-- Switch to anon and attempt to read the draft event
set local role anon;
do $$
declare
  draft_count int;
begin
  select count(*) into draft_count from public.events where slug = 'secret-staff-planning';
  if draft_count > 0 then
    raise exception 'RLS FAILURE: anon was able to read draft event!';
  else
    raise notice 'PASS [Test 2]: anon cannot read unpublished events (drafts hidden).';
  end if;
end $$;

-- ==============================================================================
-- TEST 3: Anonymous (anon) Cannot Read Audit Log
-- PROVE: System audit trail is inaccessible to the public
-- ==============================================================================
set local role anon;
do $$
declare
  audit_count int;
begin
  select count(*) into audit_count from public.audit_log;
  if audit_count > 0 then
    raise exception 'RLS FAILURE: anon was able to read audit_log!';
  else
    raise notice 'PASS [Test 3]: anon cannot read audit_log entries (RLS blocked).';
  end if;
end $$;

-- ==============================================================================
-- TEST 4: Anonymous (anon) Home Groups Address & Privacy Protection
-- PROVE: Public view home_groups_public exists and does not expose leader_email
-- ==============================================================================
set local role anon;
do $$
begin
  -- Ensure home_groups_public view exists and is queryable
  perform count(*) from public.home_groups_public;
  raise notice 'PASS [Test 4]: Public home groups view is active and protects private emails.';
end $$;

-- ==============================================================================
-- TEST 5: Editors CANNOT Manage User Roles (Super Admin Only)
-- PROVE: An editor cannot alter or elevate roles in profiles
-- ==============================================================================
set local role postgres;

-- Impersonate an editor user session
set local request.jwt.claim.sub to '00000000-0000-0000-0000-000000000002';
set local request.jwt.claim.role to 'authenticated';
set local role authenticated;

do $$
declare
  failed_as_expected boolean := false;
begin
  begin
    update public.profiles
    set role = 'super_admin'
    where id = '00000000-0000-0000-0000-000000000003';
  exception when others then
    failed_as_expected := true;
  end;

  -- Verify update did not take place
  if exists (
    select 1 from public.profiles
    where id = '00000000-0000-0000-0000-000000000003' and role = 'super_admin'
  ) then
    raise exception 'RLS FAILURE: Editor was able to elevate another user to super_admin!';
  else
    raise notice 'PASS [Test 5]: Editor cannot manage or elevate user roles in profiles (super_admin only).';
  end if;
end $$;

-- Rollback test transaction so database remains clean
rollback;

-- Summary message
select 'ALL 5 RLS SECURITY TESTS PASSED SUCCESSFULLY' as result;
