export type Role = 'super_admin' | 'editor';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  church_name: string;
  charity_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  postcode: string;
  country: string;
  primary_phone: string;
  secondary_phone?: string;
  contact_email: string;
  social_facebook?: string;
  social_instagram?: string;
  social_youtube?: string;
  social_twitter?: string;
  bank_name: string;
  bank_account_name: string;
  bank_sort_code: string;
  bank_account_number: string;
  gift_aid_notice: string;
  safeguarding_lead_name: string;
  safeguarding_lead_email: string;
  safeguarding_policy_url: string;
}

export interface ServiceTime {
  id: string;
  title: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  description: string;
  venue: string;
  is_active: boolean;
  display_order: number;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  image_url: string;
  image_alt: string;
  registration_url?: string;
  online_link?: string;
  is_recurring: boolean;
  recurrence_id?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Ministry {
  id: string;
  name: string;
  slug: string;
  description: string;
  times: string;
  location: string;
  leader_name?: string;
  contact_email?: string;
  image_url: string;
  image_alt: string;
  is_active: boolean;
  display_order: number;
}

export interface HomeGroup {
  id: string;
  name: string;
  area: string;
  day_of_week: string;
  meeting_time: string;
  leader_name: string;
  leader_email?: string; // Internal routing only
  virtual_link?: string;
  virtual_instructions: string;
  is_active: boolean;
  description: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  photo_alt: string;
  display_order: number;
  is_active: boolean;
}

export interface SermonSeries {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  image_alt: string;
}

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  date: string;
  series_id?: string;
  series_title?: string;
  speaker: string;
  youtube_url: string;
  audio_url?: string;
  notes?: string;
  duration?: string;
  scripture?: string;
  is_featured: boolean;
  status: 'draft' | 'published';
}

export interface YoungSaintsClass {
  id: string;
  name: string;
  age_range: string;
  time: string;
  room: string;
  leader_name: string;
  description: string;
  display_order: number;
}

export interface ManagedPage {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

export type SubmissionType = 'visitor' | 'prayer' | 'contact' | 'home_group' | 'young_saints';

export interface FormSubmission {
  id: string;
  form_type: SubmissionType;
  payload: Record<string, unknown>;
  status: 'new' | 'handled' | 'archived';
  assigned_to?: string;
  admin_notes?: string;
  retention_days: number;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  created_at: string;
}
