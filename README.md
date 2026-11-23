# Open Heavens Christian Centre (Edgware, London, UK)

A robust, accessible website and admin management system for **Open Heavens Christian Centre**, a registered charity (No. 1138247) located in Edgware, London.

> **Note on Design:** This build implements the semantic and architectural foundation only (semantic HTML, accessible layout, 8px grid system, shadcn/ui unstyled components, CSS variable tokens). Visual branding, custom fonts, animations, and color themes are cleanly isolated for a dedicated subsequent design pass (see [`DESIGN_TODO.md`](./DESIGN_TODO.md)).

---

## Tech Stack
- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS variable tokens (shadcn/ui compatible)
- **Database & Auth:** Supabase (Postgres, Row Level Security, Auth, Storage)
- **Validation:** Zod schemas for all forms & server actions
- **Icons:** `lucide-react` with `aria-hidden` attributes for accessibility

---

## Quick Start & Setup Steps

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Under **Project Settings -> API**, copy:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon Public Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Service Role Secret Key (`SUPABASE_SERVICE_ROLE_KEY`)

### 2. Run Database Setup & Seeding
1. Open the **SQL Editor** in your Supabase Dashboard.
2. Open [`supabase/setup.sql`](./supabase/setup.sql) in this repository, copy its full contents, paste it into the Supabase SQL Editor, and click **Run**.
3. This creates all tables (`site_settings`, `service_times`, `events`, `ministries`, `home_groups`, `leaders`, `sermons`, `pages`, `form_submissions`, `media`, `profiles`, `audit_log`), enables RLS on every table, creates the storage bucket (`media`), and populates complete seed data.

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and keys.

### 4. Create the First Super Admin
1. In the Supabase Dashboard, go to **Authentication -> Users** and click **Add User -> Create User** (e.g., `admin@openheavens.org.uk`).
2. Run this SQL query in the Supabase SQL editor to assign the `super_admin` role to that user:
   ```sql
   insert into public.profiles (id, full_name, role)
   values ('<USER_UUID_FROM_AUTH_USERS>', 'Church Administrator', 'super_admin')
   on conflict (id) do update set role = 'super_admin';
   ```

### 5. Install Dependencies & Run Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the administration portal.

---

## Route Map

### Public Pages
- `/` - Home (Hero placeholder, next service times, 3 upcoming events, latest sermon, Give CTA, outreach highlights, I'm New CTA)
- `/im-new` - Plan your visit (what to expect, service duration, transit/parking, children check-in, accessibility, first-time visitor form)
- `/about` - Mission, vision, core beliefs, leadership list from DB
- `/events` - Upcoming events with calendar/list toggle, recurring support
- `/events/[slug]` - Event detail with real text and optional registration
- `/ministries` - Index of all church ministries
- `/ministries/[slug]` - Ministry details, meeting times, and sign-up form
- `/young-saints` - Children and youth classes with age ranges, named safeguarding lead, policy link, enquiry form
- `/home-groups` - "Find a group" by area (no private street addresses exposed), request-to-join form
- `/watch` - Embedded latest sermon/livestream, archive by date & series, audio option
- `/give` - Tithes, offerings, projects, Gift Aid declaration, bank details, card placeholder (no raw PayPal links or emails exposed)
- `/contact` - Contact form, embedded map, directions, telephone and email links, prayer request tab
- `/privacy`, `/cookies`, `/safeguarding` - Managed content pages
- `/not-found`, `/error` - Accessible fallback pages

### Admin Pages (`/admin`)
- `/admin` - Dashboard (overview metrics, submissions count, upcoming events)
- `/admin/settings` - Site settings (address, charity number, phones, bank details, Gift Aid notice)
- `/admin/events` - Events CRUD (with date, time, venue, recurrence, image + alt text validation)
- `/admin/ministries` - Ministries CRUD
- `/admin/home-groups` - Home Groups CRUD (area, leader, meeting time, hybrid instructions)
- `/admin/leaders` - Pastoral and leadership team CRUD
- `/admin/sermons` - Sermons & series management
- `/admin/young-saints` - Children & youth classes and safeguarding lead info
- `/admin/pages` - Rich text content management for static pages
- `/admin/submissions` - Submissions inbox (filter by type, status toggle, notes)
- `/admin/media` - Media library uploads with required alt text
- `/admin/users` - Team member role management (super_admin only)
- `/admin/audit-log` - System audit trail
