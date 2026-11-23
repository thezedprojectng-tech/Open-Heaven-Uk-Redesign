import { Metadata } from 'next';
import { PageShell } from '@/components/global/PageShell';
import { getHomeGroups } from '@/lib/data/db';
import { GroupRow } from '@/components/global/GroupRow';
import { EmptyState } from '@/components/global/EmptyState';
import { Users, Shield, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find a Home Group',
  description:
    'Join a small group in Edgware, Stanmore, Mill Hill, Harrow, or Burnt Oak. Midweek fellowship, Bible study, and prayer.',
};

export default async function HomeGroupsPage() {
  const groups = await getHomeGroups();

  return (
    <PageShell
      title="Find a Home Group"
      description="Home Groups are our church family in miniature. Meeting fortnightly or weekly across North London for scripture study, prayer, and authentic community."
      breadcrumbs={[{ label: 'Home Groups' }]}
    >
      <div className="space-y-8">
        {/* Privacy notice banner */}
        <div className="border border-border rounded-lg p-4 bg-muted/30 text-xs text-muted-foreground flex items-center gap-3">
          <Shield className="h-5 w-5 text-foreground shrink-0" aria-hidden="true" />
          <p>
            <strong>Privacy Note:</strong> For the safety and privacy of our host families, specific
            street addresses are never published online. Once you submit a join request, the leader
            for your chosen area will contact you with exact directions or online video details.
          </p>
        </div>

        {/* Groups Listing with inline join forms */}
        <section className="space-y-4" aria-label="Available Home Groups">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5" aria-hidden="true" />
              Available Groups in Your Area
            </h2>
            <span className="text-xs text-muted-foreground">
              {groups.length} active {groups.length === 1 ? 'group' : 'groups'}
            </span>
          </div>

          {groups.length > 0 ? (
            <div className="space-y-4">
              {groups.map((group) => (
                <GroupRow key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No home groups currently listed"
              description="New term groups are being formed. Please contact our discipleship team to join an area group."
            />
          )}
        </section>

        {/* Virtual Groups Guidance */}
        <section className="border border-border rounded-lg p-6 bg-card space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Video className="h-5 w-5" aria-hidden="true" />
            <h3 className="text-base font-bold">Virtual &amp; Hybrid Home Groups</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you work shifts, travel frequently, or care for loved ones at home, our virtual-first
            and hybrid groups meet weekly online via video conferencing. Meeting details are
            provided directly by group leaders upon registration.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
