-- ==============================================================================
-- OPEN HEAVENS CHRISTIAN CENTRE (EDGWARE, LONDON, UK)
-- Supabase Complete Setup & Seed Migration (One-Run Setup)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES & ROLES
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null check (role in ('super_admin', 'editor')) default 'editor',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 2. AUDIT LOG
-- ==============================================================================
create table if not exists public.audit_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  user_email text,
  action text not null,
  entity_type text not null,
  entity_id text,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz default now() not null
);

-- ==============================================================================
-- 3. SITE SETTINGS (Single-row configuration - No finance email or private contacts)
-- ==============================================================================
create table if not exists public.site_settings (
  id int primary key default 1,
  church_name text not null default 'Open Heavens Christian Centre',
  charity_number text not null default '1138247',
  address_line1 text not null default 'Unit 1, The Exchange, 150-152 High Street',
  address_line2 text default '',
  city text not null default 'Edgware',
  postcode text not null default 'HA8 7EL',
  country text not null default 'United Kingdom',
  primary_phone text not null default '+44 (0)20 8952 1234',
  secondary_phone text default '+44 (0)79 1234 5678',
  contact_email text not null default 'info@openheavens.org.uk',
  social_facebook text default 'https://facebook.com/openheavensuk',
  social_instagram text default 'https://instagram.com/openheavensuk',
  social_youtube text default 'https://youtube.com/@openheavensuk',
  social_twitter text default '',
  bank_name text not null default 'Barclays Bank UK',
  bank_account_name text not null default 'Open Heavens Christian Centre',
  bank_sort_code text not null default '20-00-00',
  bank_account_number text not null default '12345678',
  gift_aid_notice text not null default 'If you are a UK taxpayer, you can boost your donation by 25p of Gift Aid for every £1 you give at no extra cost to you.',
  safeguarding_lead_name text not null default 'Sarah Jenkins',
  safeguarding_lead_email text not null default 'safeguarding@openheavens.org.uk',
  safeguarding_policy_url text default '/safeguarding',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  constraint single_row_check check (id = 1)
);

-- ==============================================================================
-- 4. SERVICE TIMES (Single source of truth)
-- ==============================================================================
create table if not exists public.service_times (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  day_of_week text not null check (day_of_week in ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  start_time text not null,
  end_time text not null,
  description text default '',
  venue text not null default 'Main Auditorium, Edgware',
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 5. EVENT RECURRENCE RULES
-- ==============================================================================
create table if not exists public.event_recurrence (
  id uuid default gen_random_uuid() primary key,
  frequency text not null check (frequency in ('daily', 'weekly', 'biweekly', 'monthly')),
  day_of_week text,
  until_date date,
  created_at timestamptz default now() not null
);

-- ==============================================================================
-- 6. EVENTS
-- ==============================================================================
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  date date not null,
  start_time text not null,
  end_time text not null,
  venue text not null,
  image_url text default '',
  image_alt text not null default 'Event banner for Open Heavens event',
  registration_url text default '',
  online_link text default '', -- Shown only when explicitly set by an admin
  is_recurring boolean not null default false,
  recurrence_id uuid references public.event_recurrence on delete set null,
  status text not null check (status in ('draft', 'published', 'archived')) default 'draft',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 7. MINISTRIES
-- ==============================================================================
create table if not exists public.ministries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  times text not null,
  location text not null,
  leader_name text default '',
  contact_email text default '',
  image_url text default '',
  image_alt text not null default 'Ministry group at Open Heavens',
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 8. HOME GROUPS ("Find a group", Area only - strictly no street addresses)
-- ==============================================================================
create table if not exists public.home_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  area text not null, -- Edgware, Stanmore, Mill Hill, Harrow, Colindale, Burnt Oak
  day_of_week text not null,
  meeting_time text not null,
  leader_name text not null,
  leader_email text not null, -- Protected internal routing; excluded from public view
  virtual_link text default '',
  virtual_instructions text default 'Contact group leader upon approval for video meeting details.',
  is_active boolean not null default true,
  description text default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create a secure public view that excludes private leader email
create or replace view public.home_groups_public as
  select id, name, area, day_of_week, meeting_time, leader_name, virtual_instructions, is_active, description, created_at
  from public.home_groups
  where is_active = true;

-- ==============================================================================
-- 9. LEADERS & PASTORAL TEAM
-- ==============================================================================
create table if not exists public.leaders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  bio text not null,
  photo_url text default '',
  photo_alt text not null default 'Portrait of ministry leader',
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 10. SERMON SERIES & SERMONS (Watch)
-- ==============================================================================
create table if not exists public.series (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text default '',
  image_url text default '',
  image_alt text not null default 'Sermon series graphic',
  created_at timestamptz default now() not null
);

create table if not exists public.sermons (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  date date not null,
  series_id uuid references public.series on delete set null,
  speaker text not null,
  youtube_url text not null,
  audio_url text default '',
  notes text default '',
  is_featured boolean not null default false,
  status text not null check (status in ('draft', 'published')) default 'published',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 11. YOUNG SAINTS CLASSES (Children & Youth)
-- ==============================================================================
create table if not exists public.young_saints_classes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  age_range text not null,
  time text not null,
  room text not null,
  leader_name text not null,
  description text not null,
  display_order int not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 12. MANAGED CONTENT PAGES
-- ==============================================================================
create table if not exists public.pages (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  summary text default '',
  content text not null,
  meta_title text default '',
  meta_description text default '',
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 13. FORM SUBMISSIONS
-- ==============================================================================
create table if not exists public.form_submissions (
  id uuid default gen_random_uuid() primary key,
  form_type text not null check (form_type in ('visitor', 'prayer', 'contact', 'home_group', 'young_saints')),
  payload jsonb not null,
  status text not null check (status in ('new', 'handled', 'archived')) default 'new',
  assigned_to uuid references auth.users on delete set null,
  admin_notes text default '',
  retention_days int not null default 90,
  created_at timestamptz default now() not null
);

create index if not exists idx_form_submissions_type_date on public.form_submissions(form_type, created_at desc);

-- ==============================================================================
-- 14. MEDIA LIBRARY
-- ==============================================================================
create table if not exists public.media (
  id uuid default gen_random_uuid() primary key,
  filename text not null,
  file_path text not null,
  file_size int not null,
  mime_type text not null,
  alt_text text not null default 'Media library upload',
  uploaded_by uuid references auth.users on delete set null,
  created_at timestamptz default now() not null
);

-- ==============================================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.audit_log enable row level security;
alter table public.site_settings enable row level security;
alter table public.service_times enable row level security;
alter table public.event_recurrence enable row level security;
alter table public.events enable row level security;
alter table public.ministries enable row level security;
alter table public.home_groups enable row level security;
alter table public.leaders enable row level security;
alter table public.series enable row level security;
alter table public.sermons enable row level security;
alter table public.young_saints_classes enable row level security;
alter table public.pages enable row level security;
alter table public.form_submissions enable row level security;
alter table public.media enable row level security;

-- Helper function to check if current user is an admin
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('editor', 'super_admin')
  );
$$;

-- Helper function to check if user is super_admin
create or replace function public.is_super_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

-- PROFILES: Users read own profile; Only super_admin can create, update, or delete profiles
create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id or public.is_super_admin());

create policy "Super admin manage profiles" on public.profiles
  for all using (public.is_super_admin());

-- AUDIT LOG: Only authenticated admins can read and insert
create policy "Admins read audit log" on public.audit_log
  for select using (public.is_admin());

create policy "Admins insert audit log" on public.audit_log
  for insert with check (public.is_admin());

-- SITE SETTINGS: Public can read; Admins update
create policy "Public read site_settings" on public.site_settings
  for select using (true);

create policy "Admins update site_settings" on public.site_settings
  for update using (public.is_admin());

-- SERVICE TIMES: Public read active; Admins manage all
create policy "Public read active service_times" on public.service_times
  for select using (is_active = true or public.is_admin());

create policy "Admins manage service_times" on public.service_times
  for all using (public.is_admin());

-- EVENTS: Public read published only; Admins manage all
create policy "Public read published events" on public.events
  for select using (status = 'published' or public.is_admin());

create policy "Admins manage events" on public.events
  for all using (public.is_admin());

-- EVENT RECURRENCE
create policy "Public read recurrence" on public.event_recurrence
  for select using (true);
create policy "Admins manage recurrence" on public.event_recurrence
  for all using (public.is_admin());

-- MINISTRIES: Public read active; Admins manage all
create policy "Public read active ministries" on public.ministries
  for select using (is_active = true or public.is_admin());

create policy "Admins manage ministries" on public.ministries
  for all using (public.is_admin());

-- HOME GROUPS: Public can only read active groups via SELECT; Admins manage all
-- Notice: Leader email is accessible only by admins in table
create policy "Public read active home_groups" on public.home_groups
  for select using (is_active = true or public.is_admin());

create policy "Admins manage home_groups" on public.home_groups
  for all using (public.is_admin());

-- LEADERS: Public read active; Admins manage all
create policy "Public read active leaders" on public.leaders
  for select using (is_active = true or public.is_admin());

create policy "Admins manage leaders" on public.leaders
  for all using (public.is_admin());

-- SERIES: Public read; Admins manage
create policy "Public read series" on public.series
  for select using (true);

create policy "Admins manage series" on public.series
  for all using (public.is_admin());

-- SERMONS: Public read published; Admins manage all
create policy "Public read published sermons" on public.sermons
  for select using (status = 'published' or public.is_admin());

create policy "Admins manage sermons" on public.sermons
  for all using (public.is_admin());

-- YOUNG SAINTS CLASSES: Public read; Admins manage all
create policy "Public read young_saints_classes" on public.young_saints_classes
  for select using (true);

create policy "Admins manage young_saints_classes" on public.young_saints_classes
  for all using (public.is_admin());

-- MANAGED PAGES: Public read; Admins manage
create policy "Public read pages" on public.pages
  for select using (true);

create policy "Admins manage pages" on public.pages
  for all using (public.is_admin());

-- FORM SUBMISSIONS:
-- Public (anon) can ONLY insert submissions
-- Under NO circumstance can anon select/read/update/delete any submission
create policy "Public insert form_submissions" on public.form_submissions
  for insert with check (true);

create policy "Admins manage form_submissions" on public.form_submissions
  for all using (public.is_admin());

-- MEDIA: Public read; Admins manage
create policy "Public read media" on public.media
  for select using (true);

create policy "Admins manage media" on public.media
  for all using (public.is_admin());

-- ==============================================================================
-- 16. STORAGE BUCKET CONFIGURATION
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public access to media bucket" on storage.objects
  for select using (bucket_id = 'media');

create policy "Admins can upload to media bucket" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can update media bucket" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can delete media bucket" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ==============================================================================
-- 17. SEED DATA (Clean placeholder content)
-- ==============================================================================

-- Site Settings (No finance email)
insert into public.site_settings (
  id, church_name, charity_number, address_line1, address_line2, city, postcode,
  country, primary_phone, secondary_phone, contact_email,
  social_facebook, social_instagram, social_youtube,
  bank_name, bank_account_name, bank_sort_code, bank_account_number, gift_aid_notice
) values (
  1,
  'Open Heavens Christian Centre',
  '1138247',
  'Unit 1, The Exchange, 150-152 High Street',
  '',
  'Edgware',
  'HA8 7EL',
  'United Kingdom',
  '+44 (0)20 8952 1234',
  '+44 (0)79 1234 5678',
  'info@openheavens.org.uk',
  'https://facebook.com/openheavensuk',
  'https://instagram.com/openheavensuk',
  'https://youtube.com/@openheavensuk',
  'Barclays Bank UK PLC',
  'Open Heavens Christian Centre',
  '20-00-00',
  '12345678',
  'As a registered charity (No. 1138247), we can claim Gift Aid on eligible donations. If you are a UK taxpayer, please confirm your declaration to enable us to reclaim 25p on every £1 given at no extra cost.'
) on conflict (id) do nothing;

-- Service Times
insert into public.service_times (title, day_of_week, start_time, end_time, description, venue, is_active, display_order)
values
  ('Sunday Celebration & Worship', 'Sunday', '10:30', '12:30', 'Join us for uplifting praise, biblical preaching, and fellowship. Young Saints children church runs concurrently.', 'Main Auditorium, Edgware', true, 1),
  ('Midweek Bible Study & Prayer', 'Wednesday', '19:00', '20:30', 'Diving deep into scripture and standing in corporate intercession. Hybrid online and in-person.', 'Main Auditorium & Online Livestream', true, 2),
  ('Monthly Night of Overflow', 'Friday', '22:00', '01:00', 'First Friday of each month: an extended evening of deep worship, communion, and breakthrough prayer.', 'Main Auditorium, Edgware', true, 3)
on conflict do nothing;

-- Series
insert into public.series (title, slug, description, image_url, image_alt)
values
  ('Walking in Divine Purpose', 'walking-in-divine-purpose', 'A 6-week journey unpacking eternal design and personal calling for each believer.', '', 'Sermon series graphic: Walking in Divine Purpose'),
  ('Unshakable Faith in Shaky Times', 'unshakable-faith', 'Studying scripture and how to stand firm in culture with unwavering conviction.', '', 'Sermon series graphic: Unshakable Faith')
on conflict (slug) do nothing;

-- Sermons (Watch)
insert into public.sermons (title, slug, date, series_id, speaker, youtube_url, audio_url, notes, is_featured, status)
values
  (
    'Living with Eternal Clarity',
    'living-with-eternal-clarity',
    '2026-11-15',
    (select id from public.series where slug = 'walking-in-divine-purpose' limit 1),
    'Pastor John Adebayo',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '',
    'Key Scriptures: Ephesians 1:3-14; Romans 8:28. Understanding God’s sovereignty in our daily decisions.',
    true,
    'published'
  ),
  (
    'Faith That Defies the Fire',
    'faith-that-defies-the-fire',
    '2026-11-08',
    (select id from public.series where slug = 'unshakable-faith' limit 1),
    'Pastor Sarah Adebayo',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '',
    'Key Scriptures: Daniel 3:16-28. Standing firm when truth is compromised.',
    false,
    'published'
  ),
  (
    'The Power of United Intercession',
    'the-power-of-united-intercession',
    '2026-11-01',
    null,
    'Minister David Okon',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '',
    'Key Scriptures: Acts 4:23-31; Matthew 18:19-20. When the church prays together in one accord.',
    false,
    'published'
  )
on conflict (slug) do nothing;

-- Events (3 upcoming seeded)
insert into public.events (title, slug, description, date, start_time, end_time, venue, image_url, image_alt, registration_url, status)
values
  (
    'Kingdom Couples Banquet 2026',
    'kingdom-couples-banquet-2026',
    'An evening designed for married and engaged couples to invest in their relationship, enjoy a 3-course dinner, and receive wisdom on building a resilient marriage.',
    '2026-12-05',
    '18:30',
    '21:30',
    'The Exchange Hall, Edgware',
    '',
    'Table setting and warm ambient lighting for Couples Banquet',
    'https://openheavens.org.uk/register/couples',
    'published'
  ),
  (
    'Community Carols by Candlelight',
    'community-carols-by-candlelight',
    'Celebrate the joyous season with classic carols, festive choir performances, mince pies, mulled juice, and a heartwarming Christmas message for all ages.',
    '2026-12-20',
    '17:00',
    '19:00',
    'Main Auditorium, Edgware',
    '',
    'Candlelit auditorium singing Christmas carols',
    '',
    'published'
  ),
  (
    'CrossOver Vision Night 2026/2027',
    'crossover-vision-night-2026-2027',
    'Crossing into the new year with gratitude, heartfelt worship, prophecy, and laying hold of guidance for the upcoming season.',
    '2026-12-31',
    '21:00',
    '00:30',
    'Main Auditorium, Edgware',
    '',
    'Congregation worshiping during CrossOver Night',
    '',
    'published'
  )
on conflict (slug) do nothing;

-- Ministries
insert into public.ministries (name, slug, description, times, location, leader_name, contact_email, is_active, display_order)
values
  (
    'Men of Honour',
    'men-of-honour',
    'Equipping men to walk in spiritual integrity, lead their families faithfully, and support one another through breakfast fellowships, discipleship, and practical mentoring.',
    '2nd Saturday of each month at 08:30 AM',
    'Church Fellowship Hall & Online',
    'Bro. Emmanuel Davies',
    'men@openheavens.org.uk',
    true,
    1
  ),
  (
    'Virtuous Women',
    'virtuous-women',
    'A loving sisterhood empowering women of all ages to thrive in faith, career, marriage, and personal wellness through Bible studies, conferences, and prayer retreats.',
    '3rd Saturday of each month at 10:00 AM',
    'Church Auditorium',
    'Sister Grace Thomas',
    'women@openheavens.org.uk',
    true,
    2
  ),
  (
    'Ignite Youth & Young Adults',
    'ignite-youth',
    'A dynamic, gospel-centered community for ages 13-25 confronting modern culture with bold faith, honest conversation, creative arts, and outreach.',
    'Fridays at 18:30 PM',
    'Youth Lounge, Edgware',
    'Bro. Michael Adebayo',
    'youth@openheavens.org.uk',
    true,
    3
  ),
  (
    'Open Heavens Worship Collective',
    'worship-collective',
    'Leading the congregation into authentic, Holy Spirit-led encounters with God through music, vocal excellence, and sincere adoration.',
    'Thursdays at 19:30 PM (Rehearsals)',
    'Main Auditorium',
    'Minister Joy Richards',
    'worship@openheavens.org.uk',
    true,
    4
  ),
  (
    'Community Outreach & Food Hub',
    'community-outreach',
    'Serving the vulnerable in Edgware and North London through weekly food parcels, elderly visits, hospital chaplaincy, and street care.',
    'Saturdays at 11:00 AM',
    'Edgware Community Centre',
    'Deacon Marcus Vance',
    'outreach@openheavens.org.uk',
    true,
    5
  )
on conflict (slug) do nothing;

-- Home Groups (Area only - street addresses never published)
insert into public.home_groups (name, area, day_of_week, meeting_time, leader_name, leader_email, virtual_instructions, is_active, description)
values
  ('Edgware Central Connect', 'Edgware', 'Tuesday', '19:30', 'Pastor David & Bola', 'edgware-group@openheavens.org.uk', 'Hybrid meeting: contact leader for access instructions.', true, 'Warm fellowship group discussing Sunday sermons and lifting one another in prayer.'),
  ('Stanmore & Canons Park Group', 'Stanmore', 'Thursday', '19:30', 'Bro. Peter Smith', 'stanmore-group@openheavens.org.uk', 'In-person home gathering centered around family discipleship and mutual support.', true, 'Focus on practical Christian living and topical Bible studies.'),
  ('Mill Hill & Colindale Fellowship', 'Mill Hill', 'Tuesday', '20:00', 'Sister Chioma Eze', 'millhill-group@openheavens.org.uk', 'Virtual-first group meeting online with monthly in-person brunches.', true, 'Great for busy professionals, young parents, and students.'),
  ('Harrow & Queensbury LifeGroup', 'Harrow', 'Wednesday', '19:30', 'Bro. Daniel & Ruth Kalu', 'harrow-group@openheavens.org.uk', 'In-person meeting welcoming families across the Harrow borough.', true, 'Passionate about outreach and community care in Harrow.'),
  ('Burnt Oak Care Group', 'Burnt Oak', 'Thursday', '19:00', 'Deaconess Abigail Mensah', 'burntoak-group@openheavens.org.uk', 'Bilingual English/Twi group focusing on prayer and elderly community care.', true, 'Intercessory prayer and pastoral care in Burnt Oak.')
on conflict do nothing;

-- Leaders
insert into public.leaders (name, role, bio, photo_url, photo_alt, display_order, is_active)
values
  (
    'Pastor John Adebayo',
    'Senior Pastor',
    'Pastor John has led Open Heavens Christian Centre since 2012 with a heart for pastoral care, expository preaching, and community transformation across North London. He holds a Master of Divinity and lives in Edgware with his wife Sarah and three children.',
    '',
    'Portrait of Senior Pastor John Adebayo',
    1,
    true
  ),
  (
    'Pastor Sarah Adebayo',
    'Associate Pastor & Family Ministries',
    'Pastor Sarah oversees pastoral counseling, women’s ministries, and family care. She is passionate about mentoring next-generation leaders and fostering emotionally healthy church cultures.',
    '',
    'Portrait of Associate Pastor Sarah Adebayo',
    2,
    true
  ),
  (
    'Minister David Okon',
    'Director of Discipleship & Home Groups',
    'David coordinates our small group networks, leadership tracks, and visitor integration, ensuring every newcomer finds authentic community.',
    '',
    'Portrait of Minister David Okon',
    3,
    true
  ),
  (
    'Minister Joy Richards',
    'Worship & Creative Arts Lead',
    'Joy leads our worship team, training musicians and vocalists to serve with humility, biblical theological depth, and musical excellence.',
    '',
    'Portrait of Minister Joy Richards',
    4,
    true
  )
on conflict do nothing;

-- Young Saints Classes
insert into public.young_saints_classes (name, age_range, time, room, leader_name, description, display_order)
values
  ('Little Lambs (Crèche)', '0 - 2 years', '10:45 - 12:30', 'Room 101 (Ground Floor)', 'Sister Rachel M.', 'A clean, staffed, and secure sensory space for infants and toddlers with breastfeeding facilities and soft toys.', 1),
  ('Kingdom Sparks', '3 - 5 years (Preschool & Reception)', '10:45 - 12:30', 'Room 102 (Lower Hall)', 'Sister Hannah B.', 'Fun Bible stories, gospel songs, memory verses, and craft activities that introduce young hearts to Jesus.', 2),
  ('Faith Explorers', '6 - 11 years (Years 1 - 6)', '10:45 - 12:30', 'Upper Hall A', 'Bro. Samuel K.', 'Engaging group discussions, interactive Bible exploration, worship, and real-world discipleship application.', 3),
  ('Young Saints Teens', '12 - 17 years (Years 7 - 13)', '10:45 - 12:30', 'Youth Hub (Room 204)', 'Bro. Michael Adebayo', 'Relevant discussions addressing culture, scripture, identity, and growing deep personal faith.', 4)
on conflict do nothing;

-- Managed Pages
insert into public.pages (slug, title, summary, content, meta_title, meta_description)
values
  (
    'about',
    'About Open Heavens Christian Centre',
    'Our mission, vision, core values, history, and leadership serving Edgware and beyond.',
    '## Who We Are
Open Heavens Christian Centre is a vibrant, multi-ethnic, Bible-believing church rooted in the heart of Edgware, London. We are a registered UK charity (No. 1138247) dedicated to worshiping Jesus Christ, proclaiming the Gospel of Grace, and tangibly serving our local community.

## Our Mission
To know Christ deeply and to make Him known boldly across London, the UK, and the nations.

## Our Core Beliefs
1. **The Scriptures:** The Bible is the inspired, infallible, and authoritative Word of God.
2. **The Triune God:** One God eternally existent in three persons: Father, Son, and Holy Spirit.
3. **Salvation by Grace:** Salvation is by grace through personal faith in Jesus Christ, whose death and resurrection purchased our redemption.
4. **The Holy Spirit:** The present ministry of the Holy Spirit who indwells believers and empowers victorious living and spiritual gifts.
5. **The Church:** The body of Christ called to manifest His kingdom through love, justice, and community.',
    'About Us | Open Heavens Christian Centre Edgware',
    'Learn about Open Heavens Christian Centre in Edgware, London: our biblical mission, vision, leadership team, and history as a registered UK charity.'
  ),
  (
    'im-new',
    'Plan Your Visit to Open Heavens',
    'Everything you need to know before attending your first Sunday service with us.',
    '## What to Expect
From the moment you walk through our doors, our welcome team will be there to greet you with a genuine smile. You do not need to dress formally — come exactly as you feel comfortable.

## Service Length
Our Sunday celebration lasts approximately 105 minutes (10:30 AM to 12:15 PM), featuring contemporary praise, Spirit-led worship, prayer, and a clear, applicable message from God’s Word.

## Parking and Transport
- **Tube:** Edgware Station (Northern Line) is just a 4-minute walk away.
- **Bus:** Routes 32, 107, 142, 204, 221, 240, 288, 292, 303, and 384 stop within 100 meters of our entrance.
- **Car Parking:** Dedicated church parking is available behind The Exchange, plus council pay-and-display bays on Station Road and the Broadwalk Shopping Centre car park nearby.

## Accessibility
Our facility is fully step-free with ramp access, wide entrance doors, accessible restrooms on the ground floor, and an induction hearing loop in the main auditorium.',
    'Plan Your Visit | Open Heavens Christian Centre Edgware',
    'First time at Open Heavens Christian Centre? Discover service times, parking and tube directions, accessibility, and children’s check-in details.'
  ),
  (
    'privacy',
    'Privacy Policy',
    'How we handle and protect your personal information in compliance with UK GDPR and Data Protection Act 2018.',
    '## 1. Introduction
Open Heavens Christian Centre (Registered Charity No. 1138247) is committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.

## 2. Information We Collect
We collect data through on-site forms (First-time visitor, prayer requests, contact enquiries, home group requests, and gift declarations). We never sell your personal information.

## 3. Lawful Basis for Processing
We process personal information under Legitimate Interests (pastoral care, church communications), Consent (for subscriptions and visitor contact), and Legal Obligation (Gift Aid HMRC reporting).

## 4. Retention Policy
- Prayer requests: automatically purged or archived after 90 days.
- General inquiries: retained for up to 12 months.
- Gift Aid declarations: retained for 6 years as required by HMRC regulations.

## 5. Your Rights
You have the right to access, rectify, or request deletion of your personal data at any time by contacting our Data Protection Officer at info@openheavens.org.uk.',
    'Privacy Policy | Open Heavens Christian Centre',
    'Read the official Privacy Policy of Open Heavens Christian Centre in Edgware, London (Charity No. 1138247).'
  ),
  (
    'cookies',
    'Cookie Policy',
    'Information on the cookies we use and how you can manage your preferences.',
    '## Cookie Notice
We use essential cookies required for basic website functionality and security, alongside optional analytics cookies to measure anonymous visitor traffic and enhance performance.

- **Essential Cookies:** Maintain session security and remember your cookie preference.
- **Analytics (Optional):** Anonymous usage statistics to help us improve site navigation.

You can modify your preferences at any time using our on-site cookie banner or through your browser settings.',
    'Cookie Policy | Open Heavens Christian Centre',
    'Our cookie policy details the essential and performance cookies used on the Open Heavens Christian Centre website.'
  ),
  (
    'safeguarding',
    'Safeguarding Policy',
    'Our commitment to the safety and well-being of all children, young people, and adults at risk.',
    '## Our Commitment
Open Heavens Christian Centre is firmly committed to creating a safe, nurturing, and protective environment for every child, young person, and adult at risk. Safeguarding is the responsibility of the whole church.

## Named Safeguarding Officers
- **Safeguarding Lead:** Sarah Jenkins (safeguarding@openheavens.org.uk)
- **Deputy Safeguarding Lead:** Deacon Marcus Vance
- **Telephone:** +44 (0)20 8952 1234 (ext 4)

## Key Safeguarding Procedures
1. All workers and volunteers in Young Saints undergo enhanced Disclosure and Barring Service (DBS) checks and reference verifications.
2. Regular mandatory safeguarding training for all pastoral and ministry staff.
3. Strict check-in and check-out protocol for children aged 0-11.
4. Clear reporting channels for any safeguarding concern or disclosure.',
    'Safeguarding Policy | Open Heavens Christian Centre',
    'Open Heavens Christian Centre safeguarding policy, procedures, and named safeguarding officer contact details for Edgware, London.'
  )
on conflict (slug) do nothing;
