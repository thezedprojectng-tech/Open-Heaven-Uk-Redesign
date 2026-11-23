import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug, getUpcomingEvents } from '@/lib/data/db';
import { PageShell } from '@/components/global/PageShell';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, MapPin, Video, CheckCircle2 } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Event Not Found' };

  return {
    title: `${event.title} | Events`,
    description: event.description.slice(0, 155),
  };
}

export async function generateStaticParams() {
  const events = await getUpcomingEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PageShell
      title={event.title}
      breadcrumbs={[{ label: 'Events', href: '/events' }, { label: event.title }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Real text details (never text baked into images) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="border border-border rounded-lg p-6 bg-card space-y-4">
            <h2 className="text-xl font-bold text-foreground">Event Overview</h2>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Details list */}
          <div className="border border-border rounded-lg p-6 bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground">Important Information</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" aria-hidden="true" />
                <span>Admission is free unless stated otherwise in registration.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" aria-hidden="true" />
                <span>Family friendly: children are welcome to attend with their parents.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" aria-hidden="true" />
                <span>Step-free accessibility throughout the facility.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right sidebar: Date, time, venue, registration CTA */}
        <aside className="lg:col-span-4" aria-label="Event Details Sidebar">
          <div className="border border-border rounded-lg p-6 bg-card shadow-sm space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-foreground">When &amp; Where</h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                <div>
                  <strong className="block text-foreground font-medium">Date</strong>
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                <div>
                  <strong className="block text-foreground font-medium">Time</strong>
                  <span>
                    {event.start_time} - {event.end_time}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                <div>
                  <strong className="block text-foreground font-medium">Venue</strong>
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Online Access Link: Shown only when set by an admin */}
              {event.online_link && (
                <div className="flex items-start gap-3 pt-2 border-t border-border">
                  <Video className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                  <div>
                    <strong className="block text-foreground font-medium">Online Access</strong>
                    <a
                      href={event.online_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground underline font-semibold"
                    >
                      Join Virtual Meeting ↗
                    </a>
                  </div>
                </div>
              )}
            </div>

            {event.registration_url ? (
              <div className="pt-2">
                <CTAButton
                  href={event.registration_url}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Register for this Event
                </CTAButton>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                No registration required. Just come along!
              </p>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
