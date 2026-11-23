import { createClient } from '@/lib/supabase/server';
import {
  mockSiteSettings,
  mockServiceTimes,
  mockEvents,
  mockMinistries,
  mockHomeGroups,
  mockLeaders,
  mockSermons,
  mockSeries,
  mockYoungSaintsClasses,
  mockPages,
} from './mock-data';
import {
  SiteSettings,
  ServiceTime,
  EventItem,
  Ministry,
  HomeGroup,
  Leader,
  Sermon,
  SermonSeries,
  YoungSaintsClass,
  ManagedPage,
} from '@/types';

// Use mock data when NEXT_PUBLIC_USE_MOCK === 'true' or when Supabase credentials are not configured
function shouldUseMock(): boolean {
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') return true;
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'false') return false;
  return !hasValidSupabaseEnv();
}

function hasValidSupabaseEnv(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('your-project') && !key.includes('your-anon-key'));
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (shouldUseMock()) return mockSiteSettings;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getSiteSettings');
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    if (error) {
      console.error('[DATABASE ERROR] getSiteSettings failed:', error.message);
      return null;
    }
    return data as SiteSettings;
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getSiteSettings:', err);
    return null;
  }
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  if (shouldUseMock()) return mockServiceTimes;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getServiceTimes');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('service_times')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[DATABASE ERROR] getServiceTimes failed:', error.message);
      return [];
    }
    return (data as ServiceTime[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getServiceTimes:', err);
    return [];
  }
}

export async function getUpcomingEvents(limit?: number): Promise<EventItem[]> {
  if (shouldUseMock()) {
    const list = mockEvents.filter((e) => e.status === 'published');
    return limit ? list.slice(0, limit) : list;
  }

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getUpcomingEvents');
    return [];
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }
    const { data, error } = await query;
    if (error) {
      console.error('[DATABASE ERROR] getUpcomingEvents failed:', error.message);
      return [];
    }
    return (data as EventItem[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getUpcomingEvents:', err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (shouldUseMock()) {
    return mockEvents.find((e) => e.slug === slug) || null;
  }

  if (!hasValidSupabaseEnv()) {
    console.error(`[DATABASE ERROR] Missing Supabase configuration for getEventBySlug (${slug})`);
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error(`[DATABASE ERROR] getEventBySlug (${slug}) failed:`, error.message);
      return null;
    }
    return data as EventItem;
  } catch (err) {
    console.error(`[DATABASE ERROR] Unexpected failure in getEventBySlug (${slug}):`, err);
    return null;
  }
}

export async function getMinistries(): Promise<Ministry[]> {
  if (shouldUseMock()) return mockMinistries;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getMinistries');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[DATABASE ERROR] getMinistries failed:', error.message);
      return [];
    }
    return (data as Ministry[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getMinistries:', err);
    return [];
  }
}

export async function getMinistryBySlug(slug: string): Promise<Ministry | null> {
  if (shouldUseMock()) {
    return mockMinistries.find((m) => m.slug === slug) || null;
  }

  if (!hasValidSupabaseEnv()) {
    console.error(`[DATABASE ERROR] Missing Supabase configuration for getMinistryBySlug (${slug})`);
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error(`[DATABASE ERROR] getMinistryBySlug (${slug}) failed:`, error.message);
      return null;
    }
    return data as Ministry;
  } catch (err) {
    console.error(`[DATABASE ERROR] Unexpected failure in getMinistryBySlug (${slug}):`, err);
    return null;
  }
}

export async function getHomeGroups(): Promise<HomeGroup[]> {
  if (shouldUseMock()) return mockHomeGroups;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getHomeGroups');
    return [];
  }

  try {
    const supabase = await createClient();
    // Use the public view which hides leader_email
    const { data, error } = await supabase
      .from('home_groups_public')
      .select('id, name, area, day_of_week, meeting_time, leader_name, virtual_instructions, is_active, description')
      .order('area', { ascending: true });

    if (error) {
      // Fallback to table if view isn't initialized yet
      const fallback = await supabase
        .from('home_groups')
        .select('id, name, area, day_of_week, meeting_time, leader_name, virtual_instructions, is_active, description')
        .eq('is_active', true)
        .order('area', { ascending: true });

      if (fallback.error) {
        console.error('[DATABASE ERROR] getHomeGroups failed:', fallback.error.message);
        return [];
      }
      return (fallback.data as HomeGroup[]) || [];
    }
    return (data as HomeGroup[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getHomeGroups:', err);
    return [];
  }
}

export async function getLeaders(): Promise<Leader[]> {
  if (shouldUseMock()) return mockLeaders;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getLeaders');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('leaders')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[DATABASE ERROR] getLeaders failed:', error.message);
      return [];
    }
    return (data as Leader[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getLeaders:', err);
    return [];
  }
}

export async function getSermons(): Promise<Sermon[]> {
  if (shouldUseMock()) return mockSermons;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getSermons');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) {
      console.error('[DATABASE ERROR] getSermons failed:', error.message);
      return [];
    }
    return (data as Sermon[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getSermons:', err);
    return [];
  }
}

export async function getSeries(): Promise<SermonSeries[]> {
  if (shouldUseMock()) return mockSeries;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getSeries');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('series').select('*');
    if (error) {
      console.error('[DATABASE ERROR] getSeries failed:', error.message);
      return [];
    }
    return (data as SermonSeries[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getSeries:', err);
    return [];
  }
}

export async function getYoungSaintsClasses(): Promise<YoungSaintsClass[]> {
  if (shouldUseMock()) return mockYoungSaintsClasses;

  if (!hasValidSupabaseEnv()) {
    console.error('[DATABASE ERROR] Missing Supabase configuration for getYoungSaintsClasses');
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('young_saints_classes')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[DATABASE ERROR] getYoungSaintsClasses failed:', error.message);
      return [];
    }
    return (data as YoungSaintsClass[]) || [];
  } catch (err) {
    console.error('[DATABASE ERROR] Unexpected failure in getYoungSaintsClasses:', err);
    return [];
  }
}

export async function getPageContent(slug: string): Promise<ManagedPage | null> {
  if (shouldUseMock()) {
    return mockPages[slug] || null;
  }

  if (!hasValidSupabaseEnv()) {
    console.error(`[DATABASE ERROR] Missing Supabase configuration for getPageContent (${slug})`);
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`[DATABASE ERROR] getPageContent (${slug}) failed:`, error.message);
      return null;
    }
    return data as ManagedPage;
  } catch (err) {
    console.error(`[DATABASE ERROR] Unexpected failure in getPageContent (${slug}):`, err);
    return null;
  }
}
