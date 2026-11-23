import React from 'react';
import Link from 'next/link';
import { getUpcomingEvents, getSermons, getMinistries, getHomeGroups } from '@/lib/data/db';
import { CTAButton } from '@/components/ui/CTAButton';
import { Calendar, Inbox, Layers, Users2, Video, Plus, ArrowUpRight } from 'lucide-react';

export default async function AdminDashboardPage() {
  const [events, sermons, ministries, groups] = await Promise.all([
    getUpcomingEvents(),
    getSermons(),
    getMinistries(),
    getHomeGroups(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Manage church content, visitor submissions, and service times.
        </p>
      </div>

      {/* Metric KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border rounded-lg p-5 bg-card space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">New Inquiries</span>
            <Inbox className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="text-2xl font-bold text-foreground">4</p>
          <p className="text-xs text-muted-foreground">Unread submissions in inbox</p>
          <div className="pt-2">
            <Link
              href="/admin/submissions"
              className="text-xs text-foreground font-semibold hover:underline inline-flex items-center gap-1"
            >
              Open Inbox <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg p-5 bg-card space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Upcoming Events</span>
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="text-2xl font-bold text-foreground">{events.length}</p>
          <p className="text-xs text-muted-foreground">Active events published</p>
          <div className="pt-2">
            <Link
              href="/admin/events"
              className="text-xs text-foreground font-semibold hover:underline inline-flex items-center gap-1"
            >
              Manage Events <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg p-5 bg-card space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Home Groups</span>
            <Users2 className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="text-2xl font-bold text-foreground">{groups.length}</p>
          <p className="text-xs text-muted-foreground">Active fellowship locations</p>
          <div className="pt-2">
            <Link
              href="/admin/home-groups"
              className="text-xs text-foreground font-semibold hover:underline inline-flex items-center gap-1"
            >
              View Groups <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg p-5 bg-card space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Sermons &amp; Media</span>
            <Video className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="text-2xl font-bold text-foreground">{sermons.length}</p>
          <p className="text-xs text-muted-foreground">Archived video sermons</p>
          <div className="pt-2">
            <Link
              href="/admin/sermons"
              className="text-xs text-foreground font-semibold hover:underline inline-flex items-center gap-1"
            >
              Manage Watch <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Common Actions</h3>
        <div className="flex flex-wrap items-center gap-3">
          <CTAButton href="/admin/events/new" size="sm" variant="primary">
            <Plus className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Create New Event
          </CTAButton>
          <CTAButton href="/admin/sermons/new" size="sm" variant="outline">
            <Plus className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Add Latest Sermon
          </CTAButton>
          <CTAButton href="/admin/submissions" size="sm" variant="secondary">
            Review Visitor Form Inquiries
          </CTAButton>
          <CTAButton href="/admin/settings" size="sm" variant="outline">
            Update Church Service Times
          </CTAButton>
        </div>
      </div>

      {/* Recent Upcoming Events Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Upcoming Published Events</h3>
          <CTAButton href="/admin/events" size="sm" variant="ghost">
            View All
          </CTAButton>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Date &amp; Time</th>
              <th className="p-3 font-semibold">Venue</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{event.title}</td>
                <td className="p-3 text-muted-foreground">
                  {event.date} ({event.start_time})
                </td>
                <td className="p-3 text-muted-foreground">{event.venue}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-admin-teal-surface text-admin-teal font-semibold uppercase text-[10px]">
                    {event.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/events?edit=${event.id}`}
                    className="font-medium underline hover:text-foreground"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
