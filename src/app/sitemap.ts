import { MetadataRoute } from 'next';
import { getMinistries, getUpcomingEvents } from '@/lib/data/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/about',
    '/im-new',
    '/ministries',
    '/events',
    '/watch',
    '/give',
    '/contact',
    '/young-saints',
    '/home-groups',
    '/privacy',
    '/cookies',
    '/safeguarding',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const events = await getUpcomingEvents();
  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const ministries = await getMinistries();
  const ministryRoutes = ministries.map((ministry) => ({
    url: `${siteUrl}/ministries/${ministry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...ministryRoutes];
}
