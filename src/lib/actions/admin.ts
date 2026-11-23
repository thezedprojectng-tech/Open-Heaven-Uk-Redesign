'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ==============================================================================
// AUTHENTICATION & ROLE VERIFICATION HELPERS
// ==============================================================================

async function getAuthenticatedAdmin(minRole: 'editor' | 'super_admin' = 'editor') {
  const supabase = await createClient();

  // If running with mock data in development
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    return {
      supabase,
      user: { id: 'mock-admin-id', email: 'admin@openheavens.org.uk' },
      role: 'super_admin' as const,
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Unauthorized: You must be logged in to perform administrative actions.');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    throw new Error('Forbidden: No administrative profile found for your account.');
  }

  const userRole = profile.role as 'editor' | 'super_admin';

  if (minRole === 'super_admin' && userRole !== 'super_admin') {
    throw new Error('Forbidden: Super administrator privileges required for this action.');
  }

  return { supabase, user, role: userRole };
}

async function recordAuditLog(
  supabase: any,
  user: { id: string; email?: string },
  action: 'INSERT' | 'UPDATE' | 'DELETE',
  entityType: string,
  entityId: string,
  oldValues?: Record<string, unknown>,
  newValues?: Record<string, unknown>
) {
  try {
    await supabase.from('audit_log').insert({
      user_id: user.id.startsWith('mock') ? null : user.id,
      user_email: user.email || 'unknown',
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_values: oldValues || null,
      new_values: newValues || null,
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

// ==============================================================================
// 1. EVENTS MANAGEMENT (Editor / Super Admin)
// ==============================================================================

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  slug: z.string().optional(),
  date: z.string().min(8, 'Date is required'),
  start_time: z.string().min(2, 'Start time is required'),
  end_time: z.string().min(2, 'End time is required'),
  venue: z.string().min(2, 'Venue is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image_url: z.string().optional().default(''),
  image_alt: z.string().min(3, 'Mandatory Alt Text is required for accessibility'),
  registration_url: z.string().optional().default(''),
  online_link: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived']),
  is_recurring: z.boolean().default(false),
});

export async function saveEventAction(data: z.infer<typeof eventSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = eventSchema.parse(data);

    const slug =
      validated.slug && validated.slug.trim().length > 0
        ? validated.slug
        : validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload = {
      ...validated,
      slug,
      updated_at: new Date().toISOString(),
    };

    if (validated.id) {
      const { data: existing } = await supabase.from('events').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('events').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'events', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('events').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'events', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/events');
    revalidatePath('/admin/events');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save event.' };
  }
}

export async function deleteEventAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('events').select('*').eq('id', id).single();
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'events', id, existing);
    revalidatePath('/events');
    revalidatePath('/admin/events');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete event.' };
  }
}

export async function autoArchivePastEventsAction() {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const today = new Date().toISOString().split('T')[0];
    const { error } = await supabase
      .from('events')
      .update({ status: 'archived', updated_at: new Date().toISOString() })
      .lt('date', today)
      .eq('status', 'published');

    if (error) throw error;
    await recordAuditLog(supabase, user, 'UPDATE', 'events', 'batch_auto_archive', { before: today });
    revalidatePath('/events');
    revalidatePath('/admin/events');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to archive past events.' };
  }
}

// ==============================================================================
// 2. MINISTRIES MANAGEMENT (Editor / Super Admin)
// ==============================================================================

const ministrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  times: z.string().min(2, 'Times are required'),
  location: z.string().min(2, 'Location is required'),
  leader_name: z.string().optional().default(''),
  contact_email: z.string().optional().default(''),
  is_active: z.boolean().default(true),
});

export async function saveMinistryAction(data: z.infer<typeof ministrySchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = ministrySchema.parse(data);
    const slug =
      validated.slug && validated.slug.trim().length > 0
        ? validated.slug
        : validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload = { ...validated, slug, updated_at: new Date().toISOString() };

    if (validated.id) {
      const { data: existing } = await supabase.from('ministries').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('ministries').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'ministries', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('ministries').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'ministries', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/ministries');
    revalidatePath('/admin/ministries');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save ministry.' };
  }
}

export async function deleteMinistryAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('ministries').select('*').eq('id', id).single();
    const { error } = await supabase.from('ministries').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'ministries', id, existing);
    revalidatePath('/ministries');
    revalidatePath('/admin/ministries');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete ministry.' };
  }
}

// ==============================================================================
// 3. HOME GROUPS MANAGEMENT (Area only, no street addresses)
// ==============================================================================

const homeGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Group name is required'),
  area: z.string().min(2, 'Area name is required (no street addresses)'),
  day_of_week: z.string().min(2, 'Day is required'),
  meeting_time: z.string().min(2, 'Time is required'),
  leader_name: z.string().min(2, 'Leader name is required'),
  leader_email: z.string().email('Leader email is required for routing join requests'),
  virtual_instructions: z.string().optional().default('Contact leader for details.'),
  is_active: z.boolean().default(true),
  description: z.string().optional().default(''),
});

export async function saveHomeGroupAction(data: z.infer<typeof homeGroupSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = homeGroupSchema.parse(data);

    // Guard against street-level address leaks
    if (/\b\d+\s+[a-zA-Z]+\s+(street|road|avenue|lane|drive|way|close)\b/i.test(validated.area)) {
      throw new Error('Security violation: Only general area names (e.g. Edgware, Stanmore) are permitted. Street addresses must never be entered.');
    }

    const payload = { ...validated, updated_at: new Date().toISOString() };

    if (validated.id) {
      const { data: existing } = await supabase.from('home_groups').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('home_groups').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'home_groups', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('home_groups').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'home_groups', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/home-groups');
    revalidatePath('/admin/home-groups');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save home group.' };
  }
}

export async function deleteHomeGroupAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('home_groups').select('*').eq('id', id).single();
    const { error } = await supabase.from('home_groups').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'home_groups', id, existing);
    revalidatePath('/home-groups');
    revalidatePath('/admin/home-groups');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete home group.' };
  }
}

// ==============================================================================
// 4. SERMONS MANAGEMENT (Editor / Super Admin)
// ==============================================================================

const sermonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  slug: z.string().optional(),
  date: z.string().min(8, 'Date is required'),
  speaker: z.string().min(2, 'Speaker is required'),
  youtube_url: z.string().url('Valid YouTube URL is required'),
  audio_url: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  is_featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
});

export async function saveSermonAction(data: z.infer<typeof sermonSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = sermonSchema.parse(data);
    const slug =
      validated.slug && validated.slug.trim().length > 0
        ? validated.slug
        : validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload = { ...validated, slug, updated_at: new Date().toISOString() };

    if (validated.id) {
      const { data: existing } = await supabase.from('sermons').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('sermons').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'sermons', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('sermons').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'sermons', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/watch');
    revalidatePath('/admin/sermons');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save sermon.' };
  }
}

export async function deleteSermonAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('sermons').select('*').eq('id', id).single();
    const { error } = await supabase.from('sermons').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'sermons', id, existing);
    revalidatePath('/watch');
    revalidatePath('/admin/sermons');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete sermon.' };
  }
}

// ==============================================================================
// 5. YOUNG SAINTS & SAFEGUARDING MANAGEMENT
// ==============================================================================

const youngSaintsSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Class name is required'),
  age_range: z.string().min(2, 'Age range is required'),
  time: z.string().min(2, 'Time is required'),
  room: z.string().min(2, 'Room is required'),
  leader_name: z.string().min(2, 'Leader name is required'),
  description: z.string().optional().default(''),
});

export async function saveYoungSaintsClassAction(data: z.infer<typeof youngSaintsSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = youngSaintsSchema.parse(data);
    const payload = { ...validated, updated_at: new Date().toISOString() };

    if (validated.id) {
      const { data: existing } = await supabase.from('young_saints_classes').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('young_saints_classes').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'young_saints_classes', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('young_saints_classes').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'young_saints_classes', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/young-saints');
    revalidatePath('/admin/young-saints');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save class.' };
  }
}

export async function deleteYoungSaintsClassAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('young_saints_classes').select('*').eq('id', id).single();
    const { error } = await supabase.from('young_saints_classes').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'young_saints_classes', id, existing);
    revalidatePath('/young-saints');
    revalidatePath('/admin/young-saints');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete class.' };
  }
}

export async function updateSafeguardingLeadAction(name: string, email: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = z
      .object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Valid email is required'),
      })
      .parse({ name, email });

    const { error } = await supabase
      .from('site_settings')
      .update({
        safeguarding_lead_name: validated.name,
        safeguarding_lead_email: validated.email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) throw error;
    await recordAuditLog(supabase, user, 'UPDATE', 'site_settings', '1', undefined, validated);
    revalidatePath('/safeguarding');
    revalidatePath('/young-saints');
    revalidatePath('/admin/young-saints');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update safeguarding lead.' };
  }
}

// ==============================================================================
// 6. LEADERS MANAGEMENT (Editor / Super Admin)
// ==============================================================================

const leaderSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Leader name is required'),
  role: z.string().min(2, 'Role is required'),
  bio: z.string().min(10, 'Bio is required'),
  photo_url: z.string().optional().default(''),
  photo_alt: z.string().min(2, 'Mandatory Alt Text is required'),
  is_active: z.boolean().default(true),
});

export async function saveLeaderAction(data: z.infer<typeof leaderSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = leaderSchema.parse(data);
    const payload = { ...validated, updated_at: new Date().toISOString() };

    if (validated.id) {
      const { data: existing } = await supabase.from('leaders').select('*').eq('id', validated.id).single();
      const { error } = await supabase.from('leaders').update(payload).eq('id', validated.id);
      if (error) throw error;
      await recordAuditLog(supabase, user, 'UPDATE', 'leaders', validated.id, existing, payload);
    } else {
      const { data: inserted, error } = await supabase.from('leaders').insert(payload).select().single();
      if (error) throw error;
      await recordAuditLog(supabase, user, 'INSERT', 'leaders', inserted?.id || 'new', undefined, payload);
    }

    revalidatePath('/about');
    revalidatePath('/admin/leaders');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save leader.' };
  }
}

export async function deleteLeaderAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('leaders').select('*').eq('id', id).single();
    const { error } = await supabase.from('leaders').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'leaders', id, existing);
    revalidatePath('/about');
    revalidatePath('/admin/leaders');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete leader.' };
  }
}

// ==============================================================================
// 7. MANAGED PAGES CONTENT (Editor / Super Admin)
// ==============================================================================

const pageContentSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  summary: z.string().optional().default(''),
  content: z.string().min(10, 'Content is required'),
  meta_description: z.string().optional().default(''),
});

export async function savePageAction(slug: string, data: z.infer<typeof pageContentSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = pageContentSchema.parse(data);
    const payload = { ...validated, updated_at: new Date().toISOString() };

    const { data: existing } = await supabase.from('pages').select('*').eq('slug', slug).single();
    const { error } = await supabase.from('pages').update(payload).eq('slug', slug);
    if (error) throw error;

    await recordAuditLog(supabase, user, 'UPDATE', 'pages', slug, existing, payload);
    revalidatePath(`/${slug}`);
    revalidatePath('/admin/pages');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update page.' };
  }
}

// ==============================================================================
// 8. SUBMISSIONS INBOX MANAGEMENT (Editor / Super Admin)
// ==============================================================================

export async function updateSubmissionStatusAction(id: string, status: 'new' | 'handled' | 'archived') {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('form_submissions').select('*').eq('id', id).single();
    const { error } = await supabase
      .from('form_submissions')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    await recordAuditLog(supabase, user, 'UPDATE', 'form_submissions', id, existing, { status });
    revalidatePath('/admin/submissions');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update submission status.' };
  }
}

export async function deleteSubmissionAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const { data: existing } = await supabase.from('form_submissions').select('*').eq('id', id).single();
    const { error } = await supabase.from('form_submissions').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'form_submissions', id, existing);
    revalidatePath('/admin/submissions');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete submission.' };
  }
}

// ==============================================================================
// 9. SITE SETTINGS (Editor / Super Admin)
// ==============================================================================

const siteSettingsSchema = z.object({
  church_name: z.string().min(2, 'Church name is required'),
  charity_number: z.string().min(4, 'Charity number is required'),
  address_line1: z.string().min(2, 'Address is required'),
  address_line2: z.string().optional().default(''),
  city: z.string().min(2, 'City is required'),
  postcode: z.string().min(4, 'Postcode is required'),
  primary_phone: z.string().min(6, 'Primary phone is required'),
  secondary_phone: z.string().optional().default(''),
  contact_email: z.string().email('Valid email is required'),
  bank_name: z.string().min(2, 'Bank name is required'),
  bank_account_name: z.string().min(2, 'Account name is required'),
  bank_sort_code: z.string().min(6, 'Sort code is required'),
  bank_account_number: z.string().min(6, 'Account number is required'),
  gift_aid_notice: z.string().min(10, 'Gift Aid text is required'),
  social_facebook: z.string().optional().default(''),
  social_instagram: z.string().optional().default(''),
  social_youtube: z.string().optional().default(''),
});

export async function updateSiteSettingsAction(data: z.infer<typeof siteSettingsSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = siteSettingsSchema.parse(data);
    const payload = { ...validated, updated_at: new Date().toISOString() };

    const { data: existing } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    const { error } = await supabase.from('site_settings').update(payload).eq('id', 1);
    if (error) throw error;

    await recordAuditLog(supabase, user, 'UPDATE', 'site_settings', '1', existing, payload);
    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/give');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update site settings.' };
  }
}

// ==============================================================================
// 10. USER ROLES & PERMISSIONS (Strictly Super Admin Only)
// ==============================================================================

export async function inviteUserAction(email: string, fullName: string, role: 'super_admin' | 'editor') {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('super_admin');
    const validated = z
      .object({
        email: z.string().email(),
        fullName: z.string().min(2),
        role: z.enum(['super_admin', 'editor']),
      })
      .parse({ email, fullName, role });

    await recordAuditLog(supabase, user, 'INSERT', 'profiles_invitation', validated.email, undefined, validated);
    revalidatePath('/admin/users');
    return { success: true, message: `Staff invitation recorded for ${validated.email}` };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to invite user.' };
  }
}

export async function updateUserRoleAction(id: string, newRole: 'super_admin' | 'editor') {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('super_admin');
    const { data: existing } = await supabase.from('profiles').select('*').eq('id', id).single();
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    await recordAuditLog(supabase, user, 'UPDATE', 'profiles', id, existing, { role: newRole });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update role.' };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('super_admin');
    const { data: existing } = await supabase.from('profiles').select('*').eq('id', id).single();
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw error;
    await recordAuditLog(supabase, user, 'DELETE', 'profiles', id, existing);
    revalidatePath('/admin/users');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete user.' };
  }
}

// ==============================================================================
// 11. MEDIA LIBRARY REGISTRATION
// ==============================================================================

const mediaSchema = z.object({
  filename: z.string().min(1),
  file_path: z.string().min(1),
  file_size: z.number().max(2 * 1024 * 1024, 'Max file size is 2MB'),
  mime_type: z.string(),
  alt_text: z.string().min(3, 'Alt text is required'),
});

export async function registerMediaUploadAction(data: z.infer<typeof mediaSchema>) {
  try {
    const { supabase, user } = await getAuthenticatedAdmin('editor');
    const validated = mediaSchema.parse(data);

    const payload = {
      ...validated,
      uploaded_by: user.id.startsWith('mock') ? null : user.id,
    };

    const { data: inserted, error } = await supabase.from('media').insert(payload).select().single();
    if (error) throw error;

    await recordAuditLog(supabase, user, 'INSERT', 'media', inserted?.id || 'new', undefined, payload);
    revalidatePath('/admin/media');
    return { success: true, item: inserted };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to register media upload.' };
  }
}
