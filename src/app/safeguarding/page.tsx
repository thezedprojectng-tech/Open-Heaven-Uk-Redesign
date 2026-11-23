import { Metadata } from 'next';
import { PageShell } from '@/components/global/PageShell';
import { getPageContent, getSiteSettings } from '@/lib/data/db';
import { Shield, Phone, Mail, FileCheck } from 'lucide-react';
import { EmptyState } from '@/components/global/EmptyState';

export const metadata: Metadata = {
  title: 'Safeguarding Policy',
  description:
    'Safeguarding policies, procedures, and named safeguarding officer contact details for Open Heavens Christian Centre in Edgware, London.',
};

export default async function SafeguardingPage() {
  const [page, settings] = await Promise.all([getPageContent('safeguarding'), getSiteSettings()]);

  const leadName = settings?.safeguarding_lead_name || 'Sarah Jenkins';
  const leadEmail = settings?.safeguarding_lead_email || 'safeguarding@openheavens.org.uk';
  const phone = settings?.primary_phone || '+44 (0)20 8952 1234';

  return (
    <PageShell
      title={page?.title || 'Safeguarding Policy'}
      description="Our absolute commitment to the safety, protection, and care of all children, young people, and adults at risk."
      breadcrumbs={[{ label: 'Safeguarding' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <article className="border border-border rounded-lg p-6 sm:p-10 bg-card space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">Our Safeguarding Policy Statement</h2>
              <p>
                Open Heavens Christian Centre recognizes that the care and protection of children,
                young people, and adults at risk is of paramount importance. Every person has a right
                to be protected from abuse regardless of age, gender, disability, culture, language,
                racial origin, religious beliefs, or sexual orientation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">Core Safeguarding Standards</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Safer Recruitment:</strong> All pastoral leaders, children’s teachers, and
                  youth workers undergo enhanced DBS checks and structured referencing.
                </li>
                <li>
                  <strong>Training:</strong> Regular mandatory safeguarding training for all
                  appointed workers in accordance with Thirtyone:eight and Barnet Local Safeguarding
                  Partnership standards.
                </li>
                <li>
                  <strong>Secure Check-In:</strong> Stringent double-tag matching check-in and
                  check-out for Young Saints classes.
                </li>
                <li>
                  <strong>Safe Facilities:</strong> Step-free access, monitored corridors, and clear
                  ratios of adult helpers to children.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">Reporting Concerns</h2>
              <p>
                If you have an immediate concern regarding the welfare or safety of a child or adult
                at risk within church activities, please contact our Safeguarding Lead immediately or
                Barnet Children’s Social Care Services on 020 8359 4066.
              </p>
            </section>
          </article>
        </div>

        {/* Sidebar: Named Lead Information */}
        <aside className="lg:col-span-4" aria-label="Safeguarding Officer Contacts">
          <div className="border border-border rounded-lg p-6 bg-card shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center gap-2 text-foreground font-bold text-lg">
              <Shield className="h-5 w-5" aria-hidden="true" />
              <h3>Designated Officers</h3>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground">
              <div className="p-3 rounded border border-border bg-muted/30 space-y-1">
                <span className="font-semibold text-foreground block">
                  Designated Safeguarding Lead (DSL)
                </span>
                <p className="font-medium text-foreground">{leadName}</p>
                <p className="flex items-center gap-1.5 pt-1">
                  <Mail className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
                  <a href={`mailto:${leadEmail}`} className="underline">
                    {leadEmail}
                  </a>
                </p>
              </div>

              <div className="p-3 rounded border border-border bg-muted/30 space-y-1">
                <span className="font-semibold text-foreground block">Deputy Safeguarding Lead</span>
                <p className="font-medium text-foreground">Deacon Marcus Vance</p>
                <p className="flex items-center gap-1.5 pt-1">
                  <Phone className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
                  <span>{phone} (Ext 4)</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-muted-foreground flex items-center gap-1">
                  <FileCheck className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
                  <span>Annual review completed: September 2026</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
