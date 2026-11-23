import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMinistryBySlug, getMinistries } from '@/lib/data/db';
import { PageShell } from '@/components/global/PageShell';
import { Clock, MapPin, Mail, User } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

interface MinistryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MinistryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);
  if (!ministry) return { title: 'Ministry Not Found' };

  return {
    title: `${ministry.name} | Ministries`,
    description: ministry.description.slice(0, 155),
  };
}

export async function generateStaticParams() {
  const ministries = await getMinistries();
  return ministries.map((m) => ({ slug: m.slug }));
}

export default async function MinistryDetailPage({ params }: MinistryDetailPageProps) {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);

  if (!ministry) {
    notFound();
  }

  return (
    <PageShell
      title={ministry.name}
      breadcrumbs={[{ label: 'Ministries', href: '/ministries' }, { label: ministry.name }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="border border-border rounded-lg p-6 sm:p-8 bg-card space-y-4">
            <h2 className="text-xl font-bold text-foreground">About This Ministry</h2>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {ministry.description}
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 sm:p-8 bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground">How to Get Involved</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you are looking to attend meetings or serve on the ministry volunteer team, we
              welcome your gifts and passion. You can sign up using the contact button or email the
              ministry coordinator directly.
            </p>
            <div className="pt-2">
              <CTAButton href="/contact" variant="primary" size="md">
                Enquire to Join {ministry.name}
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4" aria-label="Ministry Meeting Details">
          <div className="border border-border rounded-lg p-6 bg-card shadow-sm space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-foreground">Meeting Details</h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                <div>
                  <strong className="block text-foreground font-medium">When</strong>
                  <span>{ministry.times}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                <div>
                  <strong className="block text-foreground font-medium">Where</strong>
                  <span>{ministry.location}</span>
                </div>
              </div>

              {ministry.leader_name && (
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                  <div>
                    <strong className="block text-foreground font-medium">Leader</strong>
                    <span>{ministry.leader_name}</span>
                  </div>
                </div>
              )}

              {ministry.contact_email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-foreground" aria-hidden="true" />
                  <div>
                    <strong className="block text-foreground font-medium">Contact Email</strong>
                    <a href={`mailto:${ministry.contact_email}`} className="underline hover:text-foreground">
                      {ministry.contact_email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
