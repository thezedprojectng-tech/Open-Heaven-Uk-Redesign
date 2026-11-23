# DESIGN_TODO.md: Styling and Visual Pass Checklist

This document tracks every component and page.
- **Pass 1 (COMPLETE)**: Global tokens, Header, Footer, and Homepage (`src/app/page.tsx`) along with homepage-shared components (`CTAButton`, `HeroPassepartout`, `WeekPlan`, `UpcomingEventsIndex`, `LazyYouTubeFacade`).
- **Subsequent Passes (PENDING)**: Inner public pages and Admin portal remain with plain unstyled semantic layout and Tailwind utility classes for basic flow/spacing (8px grid system).

---

## 1. Global Components
- [x] **Header / Navigation (`src/components/global/Header.tsx`)**
  - Brand wordmark & typography (Fraunces + JetBrains Mono)
  - Mobile hamburger drawer with animated motion (respecting `prefers-reduced-motion`)
  - Active nav item indicator and Give pill with round arrow circle
  - Next service ticker from database
  - Sticky header with hairline border and transparent-to-solid on scroll
- [x] **Footer (`src/components/global/Footer.tsx`)**
  - Dark midnight (`bg-ink text-paper`)
  - Giant cropped wordmark background (`text-[15vw] text-paper/[0.07]`)
  - Multi-column footer layout (church identity, service times, navigation, legal)
  - Clean social links with arrow icons
  - Registered charity disclaimer (No. 1138247)
  - Single © symbol with auto-updating year
  - Strictly no dashes in copy
- [x] **Buttons & CTAs (`src/components/ui/CTAButton.tsx`)**
  - Primary amber pill (`bg-accent text-on-accent`), dark pill (`bg-ink text-paper`), outline and ghost variants
  - Optional round arrow circle (`ArrowUpRight`)
  - High-contrast accessible focus rings
- [ ] **ServiceTimes Block (`src/components/global/ServiceTimes.tsx`)** (Inner pages)
- [ ] **Cards (`src/components/global/EventCard.tsx`, `MinistryCard.tsx`, `LeaderCard.tsx`, `SermonCard.tsx`, `GroupRow.tsx`)**
- [ ] **Headings & Shells (`src/components/global/SectionHeading.tsx`, `PageShell.tsx`, `Breadcrumbs.tsx`)**
- [ ] **Forms & Inputs (`src/components/forms/FormField.tsx`, `ConsentCheckbox.tsx`)**
- [ ] **Cookie Banner (`src/components/global/CookieBanner.tsx`)**
- [ ] **Empty State (`src/components/global/EmptyState.tsx`)**

---

## 2. Public Pages
- [x] **Home Page (`src/app/page.tsx`)**
  - Section rhythm: light, light, surface, light, dark, light, light, dark panel, accent, dark footer
  - Section 1: Header (74px ivory, hairline beneath, next service ticker, Give pill)
  - Section 2: Hero, passepartout (framed photograph in wide tinted mat, display headline with single italic word, museum-label caption, primary & secondary CTAs)
  - Section 3: This Sunday, hairline row (next service date in Fraunces, time in mono, address & transit line)
  - Section 4: The week, signature panel (hairline 7-day drawing plan with animated pathLength, time axis 8:00 to 24:00, 20% amber tint on hover, interactive slot aside, mobile vertical view)
  - Section 5: I'm new, numbered rows (01-04 hairlines: what to expect, duration, parking/transit, children check-in)
  - Section 6: Upcoming events, ruled index (dark midnight ground, 3-column rows, 0.03s stagger fade-in, "All events" arrow link)
  - Section 7: Welcome, statement (002 / Welcome label, Fraunces serif statement from pages DB)
  - Section 8: Outreach, photo-led grid (6 ministries, 4:5 image ratio, desktop vertical column offset)
  - Section 9: Watch, inset dark panel (dark ground inset, latest sermon, lazy YouTube facade without load overhead)
  - Section 10: Give, accent panel (amber ground, generosity message, Gift Aid mention, single CTA to /give)
  - Section 11: Footer (dark midnight ground)
- [ ] **I'm New (`/im-new`)**
- [ ] **About Us (`/about`)**
- [ ] **Events & Detail (`/events`, `/events/[slug]`)**
- [ ] **Ministries & Detail (`/ministries`, `/ministries/[slug]`)**
- [ ] **Young Saints (`/young-saints`)**
- [ ] **Home Groups (`/home-groups`)**
- [ ] **Watch (`/watch`)**
- [ ] **Give (`/give`)**
- [ ] **Contact (`/contact`)**
- [ ] **Privacy, Cookies, Safeguarding (`/privacy`, `/cookies`, `/safeguarding`)**

---

## 3. Admin Portal (`/admin/*`)
- [ ] Admin sidebar navigation styling
- [ ] Metrics cards on `/admin` dashboard
- [ ] Table designs for Events, Ministries, Sermons, Submissions
- [ ] Form edit sheets / modal drawers


---

## 4. Theme Pass: Colour Tokens & WCAG AA Contrast Audit

### Palette Concept
**Open Heavens**: Night sky (deep midnight `#131C33`) with light breaking through (warm amber `#D9822B`), grounded on warm ivory (`#F5F0E6`).

### Design Tokens
| Token | Light Value | Dark Value | Purpose |
|---|---|---|---|
| `--paper` | `#F5F0E6` | `#131C33` | Page background ground |
| `--ink` | `#131C33` | `#F5F0E6` | Primary body text and deep dark sections |
| `--accent` | `#D9822B` | `#D9822B` | Buttons, highlights, active nav, Give panel |
| `--accent-hover` | `#C57122` | `#E58F38` | Interactive button hover states |
| `--on-accent` | `#131C33` | `#131C33` | Text on amber is always midnight |
| `--surface` | `#EBE3D2` | `#1B2742` | Tinted sections, cards |
| `--surface-dark` | `#1B2742` | `#10182C` | Midnight dark surface |
| `--muted` | `#5A6277` | `#A9B0C2` | Secondary text |
| `--line` | `rgba(19, 28, 51, 0.15)` | `rgba(245, 240, 230, 0.18)` | Hairlines and borders |
| `--paper-on-dark` | `#F5F0E6` | `#F5F0E6` | Text on midnight panels |
| `--muted-on-dark` | `#A9B0C2` | `#A9B0C2` | Secondary text on midnight panels |
| `--line-on-dark` | `rgba(245, 240, 230, 0.18)` | `rgba(245, 240, 230, 0.18)` | Borders on midnight panels |
| `--success` | `#1E6B42` | `#4ADE80` | Success badges, alerts |
| `--warning` | `#8E4C05` | `#FBBF24` | Warning badges, alerts |
| `--danger` | `#9E2A2B` | `#F87171` | Danger badges, errors |
| `--info` | `#1B5B8A` | `#60A5FA` | Info badges |
| `--admin-teal` | `#166567` | `#2DD4BF` | Admin portal secondary accent (charts, chips) |

---

### WCAG AA Contrast Verification Table

#### Light Theme (Ground: Ivory `#F5F0E6` / Surface `#EBE3D2`)
| Pair | Color Codes | Usage Type | Contrast Ratio | Minimum Required | Status |
|---|---|---|---|---|---|
| Ink on Paper | `#131C33` on `#F5F0E6` | Primary body text | **14.89:1** | 4.5:1 | **PASS (AAA)** |
| Ink on Surface | `#131C33` on `#EBE3D2` | Card body text | **13.25:1** | 4.5:1 | **PASS (AAA)** |
| Muted on Paper | `#5A6277` on `#F5F0E6` | Secondary meta text | **5.36:1** | 4.5:1 | **PASS (AA)** |
| Muted on Surface | `#5A6277` on `#EBE3D2` | Secondary card text | **4.77:1** | 4.5:1 | **PASS (AA)** |
| On-Accent (Midnight) on Accent (Amber) | `#131C33` on `#D9822B` | Button text on Amber | **5.78:1** | 4.5:1 | **PASS (AA)** |
| Success on Paper | `#1E6B42` on `#F5F0E6` | Success status message | **5.71:1** | 4.5:1 | **PASS (AA)** |
| Success on Surface | `#1E6B42` on `#EBE3D2` | Success card chip | **5.08:1** | 4.5:1 | **PASS (AA)** |
| Warning on Paper | `#8E4C05` on `#F5F0E6` | Warning status message | **5.80:1** | 4.5:1 | **PASS (AA)** |
| Warning on Surface | `#8E4C05` on `#EBE3D2` | Warning card chip | **5.16:1** | 4.5:1 | **PASS (AA)** |
| Danger on Paper | `#9E2A2B` on `#F5F0E6` | Danger error alert | **6.56:1** | 4.5:1 | **PASS (AA)** |
| Danger on Surface | `#9E2A2B` on `#EBE3D2` | Danger card chip | **5.83:1** | 4.5:1 | **PASS (AA)** |
| Info on Paper | `#1B5B8A` on `#F5F0E6` | Informational callout | **6.35:1** | 4.5:1 | **PASS (AA)** |
| Info on Surface | `#1B5B8A` on `#EBE3D2` | Informational card chip | **5.65:1** | 4.5:1 | **PASS (AA)** |
| Admin Teal on Paper | `#166567` on `#F5F0E6` | Admin status badge | **5.98:1** | 4.5:1 | **PASS (AA)** |
| Admin Teal on Surface | `#166567` on `#EBE3D2` | Admin table chip | **5.32:1** | 4.5:1 | **PASS (AA)** |

#### Dark Theme & Midnight Panels (Ground: Midnight `#131C33` / Surface `#1B2742`)
| Pair | Color Codes | Usage Type | Contrast Ratio | Minimum Required | Status |
|---|---|---|---|---|---|
| Paper-on-Dark (Ivory) on Midnight | `#F5F0E6` on `#131C33` | Primary text on dark | **14.89:1** | 4.5:1 | **PASS (AAA)** |
| Paper-on-Dark (Ivory) on Dark Surface | `#F5F0E6` on `#1B2742` | Card text on dark | **13.06:1** | 4.5:1 | **PASS (AAA)** |
| Muted-on-Dark on Midnight | `#A9B0C2` on `#131C33` | Secondary text on dark | **7.79:1** | 4.5:1 | **PASS (AAA)** |
| Muted-on-Dark on Dark Surface | `#A9B0C2` on `#1B2742` | Secondary card text on dark | **6.84:1** | 4.5:1 | **PASS (AA)** |
| Accent (Amber) on Midnight | `#D9822B` on `#131C33` | Highlight / Title accent | **5.78:1** | 4.5:1 | **PASS (AA)** |
| On-Accent (Midnight) on Accent (Amber) | `#131C33` on `#D9822B` | Button text on Amber | **5.78:1** | 4.5:1 | **PASS (AA)** |
| Success on Midnight | `#4ADE80` on `#131C33` | Dark success chip | **9.71:1** | 4.5:1 | **PASS (AAA)** |
| Warning on Midnight | `#FBBF24` on `#131C33` | Dark warning chip | **10.13:1** | 4.5:1 | **PASS (AAA)** |
| Danger on Midnight | `#F87171` on `#131C33` | Dark danger chip | **6.11:1** | 4.5:1 | **PASS (AA)** |
| Info on Midnight | `#60A5FA` on `#131C33` | Dark info chip | **6.65:1** | 4.5:1 | **PASS (AA)** |
| Admin Teal on Midnight | `#2DD4BF` on `#131C33` | Dark admin badge | **9.09:1** | 4.5:1 | **PASS (AAA)** |

---

### Rules Compliance Audit
- [x] **Amber Usage**: Amber is reserved strictly for buttons, highlights, active states and the Give panel.
- [x] **Text on Amber**: Text on amber is always midnight (`--on-accent` = `#131C33`), achieving 5.78:1 contrast (WCAG AA pass).
- [x] **Amber on Ivory**: Amber is never used for normal body text on ivory below 24px (contrast 2.58:1); on midnight, amber text achieves 5.78:1.
- [x] **Focus Rings**: 2px amber with 2px offset (`outline: 2px solid var(--accent); outline-offset: 2px`), clearly visible on both ivory and midnight.
- [x] **Dark Mode**: Defined with CSS `@media (prefers-color-scheme: dark)` and `.dark` class override.
- [x] **Zero Raw Colors**: Automated scan confirms zero remaining hex values, rgb/rgba literals, or raw Tailwind color classes across all application source files.
