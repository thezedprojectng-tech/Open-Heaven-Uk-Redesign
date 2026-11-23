import { Metadata } from 'next';
import { PageShell } from '@/components/global/PageShell';
import { getPageContent, getSiteSettings } from '@/lib/data/db';
import { EmptyState } from '@/components/global/EmptyState';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Open Heavens Christian Centre in Edgware, London (Registered Charity No. 1138247). UK GDPR compliance notice.',
};

export default async function PrivacyPage() {
  const [page, settings] = await Promise.all([getPageContent('privacy'), getSiteSettings()]);

  const charityNum = settings?.charity_number || '1138247';
  const contactEmail = settings?.contact_email || 'info@openheavens.org.uk';

  return (
    <PageShell
      title={page?.title || 'Privacy Policy'}
      description={`How Open Heavens Christian Centre (Charity No. ${charityNum}) protects and manages your personal data under UK GDPR.`}
      breadcrumbs={[{ label: 'Privacy Policy' }]}
    >
      <article className="max-w-4xl border border-border rounded-lg p-6 sm:p-10 bg-card space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
          <p>
            Open Heavens Christian Centre (Registered Charity No. {charityNum}) is
            committed to safeguarding personal information in compliance with the UK General Data
            Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. Data We Collect</h2>
          <p>
            We collect personal data submitted through our website forms: First-time visitor forms,
            prayer requests, general contact forms, Home Group join requests, and Young Saints
            registration forms. We never purchase or sell personal contact lists.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. How Your Data is Used &amp; Protected</h2>
          <p>
            Your information is used strictly for pastoral care, ministry communication, and
            fulfilling church administration duties. Prayer requests are restricted to authorised
            pastoral intercessors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">4. Retention Periods</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Prayer requests: Retained up to 90 days before secure deletion.</li>
            <li>First-time visitor records: Retained up to 90 days.</li>
            <li>General contact inquiries: Retained up to 180 days.</li>
            <li>Gift Aid declarations: Retained for 6 years in accordance with HMRC guidelines.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">5. Contacting our Data Officer</h2>
          <p>
            If you wish to view, update, or request deletion of your information, please email us at{' '}
            <a href={`mailto:${contactEmail}`} className="underline text-foreground">
              {contactEmail}
            </a>
            .
          </p>
        </section>
      </article>
    </PageShell>
  );
}
