import { Metadata } from 'next';
import { PageShell } from '@/components/global/PageShell';
import { getPageContent } from '@/lib/data/db';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie policy for Open Heavens Christian Centre website. Information on essential cookies and browser preferences.',
};

export default async function CookiesPage() {
  const page = await getPageContent('cookies');

  return (
    <PageShell
      title={page?.title || 'Cookie Policy'}
      description="Information on the cookies we use and how you can manage your preferences on our website."
      breadcrumbs={[{ label: 'Cookie Policy' }]}
    >
      <article className="max-w-4xl border border-border rounded-lg p-6 sm:p-10 bg-card space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse a
            website. They help the site recognize your device and remember your choices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. Cookies We Use</h2>
          <p>
            We only use essential functional cookies (such as remembering your consent preferences
            and securing admin sessions). We do not run invasive behavioral tracking or cross-site
            ad networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. Managing Your Choices</h2>
          <p>
            You can configure your web browser to reject cookies or alert you when cookies are being
            sent. If you disable essential cookies, some sections of the website may not function
            as expected.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
