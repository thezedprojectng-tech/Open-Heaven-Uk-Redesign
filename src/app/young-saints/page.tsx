import { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/global/PageShell';
import { getSiteSettings, getYoungSaintsClasses } from '@/lib/data/db';
import { YoungSaintsForm } from '@/components/forms/YoungSaintsForm';
import { EmptyState } from '@/components/global/EmptyState';
import { Shield, Clock, MapPin, CheckCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Young Saints Children & Youth',
  description:
    'Dedicated children and youth classes at Open Heavens Christian Centre in Edgware. Enhanced DBS verification, safeguarding policies, and inspiring age-appropriate teaching.',
};

export default async function YoungSaintsPage() {
  const [settings, classes] = await Promise.all([getSiteSettings(), getYoungSaintsClasses()]);

  const dslName = settings?.safeguarding_lead_name || 'Sarah Jenkins';
  const dslEmail = settings?.safeguarding_lead_email || 'safeguarding@openheavens.org.uk';

  return (
    <PageShell
      title="Young Saints Children &amp; Youth"
      description="Investing in the next generation from crèche to teens. Every Sunday during the main service in a safe, fun, and Christ-centred environment."
      breadcrumbs={[{ label: 'Young Saints' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-black">
        {/* Left column: Classes & Safeguarding */}
        <div className="lg:col-span-7 space-y-8">
          {/* Safeguarding Lead highlighted block */}
          <section className="border-2 border-black rounded-2xl p-6 sm:p-8 bg-white space-y-4">
            <div className="flex items-center gap-2 text-black font-display font-black text-xl uppercase">
              <span className="p-1.5 bg-[#16D958] text-black border border-black rounded-lg">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2>Our Safeguarding Commitment</h2>
            </div>
            <p className="text-sm text-neutral-800 font-medium leading-relaxed">
              The safety, physical protection, and emotional well-being of every child is our
              highest priority. Every Young Saints teacher and helper undergoes enhanced DBS
              checks, personal reference validation, and ongoing safeguarding training.
            </p>

            <div className="p-4 rounded-xl border-2 border-black bg-[#FAF7F0] text-xs text-neutral-800 font-semibold space-y-1.5">
              <p>
                <strong>Designated Safeguarding Lead:</strong> {dslName}
              </p>
              <p>
                <strong>Safeguarding Contact:</strong>{' '}
                <a href={`mailto:${dslEmail}`} className="underline font-bold">
                  {dslEmail}
                </a>
              </p>
              <p className="pt-1">
                <Link
                  href="/safeguarding"
                  className="inline-flex items-center gap-1 font-black text-black underline underline-offset-2"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Read Full Church Safeguarding Policy →
                </Link>
              </p>
            </div>
          </section>

          {/* Classes Breakdown */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <h2 className="text-xl font-display font-black text-black uppercase">Sunday Classes &amp; Age Brackets</h2>
              <span className="px-2.5 py-0.5 bg-[#FFC700] text-black font-mono text-[10px] font-black uppercase rounded-md border border-black">
                AGES 0 - 18
              </span>
            </div>
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {classes.map((c) => (
                  <div key={c.id} className="border-2 border-black rounded-2xl p-5 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-display font-black text-black uppercase">{c.name}</h3>
                      <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-lg bg-[#00D2FF] text-black border border-black">
                        {c.age_range}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 font-medium leading-relaxed">{c.description}</p>
                    <div className="pt-2 border-t border-neutral-200 text-xs font-mono font-bold text-neutral-600 space-y-1">
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-black" aria-hidden="true" />
                        <span>{c.time}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-black" aria-hidden="true" />
                        <span>{c.room}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Classes list being updated"
                description="Please check in with our hospitality team upon arrival on Sunday morning."
              />
            )}
          </section>

          {/* Drop-off & Pick-up Procedure */}
          <section className="border-2 border-black rounded-2xl p-6 bg-white space-y-3">
            <h3 className="text-lg font-display font-black text-black uppercase">Check-in &amp; Collection Security</h3>
            <ul className="text-xs sm:text-sm text-neutral-800 font-medium space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-black shrink-0" aria-hidden="true" />
                <span>
                  Check-in opens at 10:15 AM at the Young Saints registration desk in the main foyer.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-black shrink-0" aria-hidden="true" />
                <span>
                  Each child is issued a matching numbered security tag. Only parents/guardians with
                  the matching badge can collect the child.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-black shrink-0" aria-hidden="true" />
                <span>Nut-free environment: please inform leaders of any allergies or medical needs.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Right column: Registration / Enquiry Form */}
        <aside className="lg:col-span-5" aria-label="Young Saints Registration Form">
          <div className="sticky top-24 border-2 border-black rounded-2xl p-6 sm:p-7 bg-white space-y-4">
            <div className="space-y-1 border-b-2 border-black pb-3">
              <span className="px-2.5 py-0.5 bg-[#FF2E93] text-white font-mono text-[10px] font-black uppercase rounded-md border border-black inline-block">
                PRE-REGISTRATION
              </span>
              <h2 className="text-xl font-display font-black text-black uppercase">Register Your Child</h2>
              <p className="text-xs text-neutral-600 font-bold leading-relaxed">
                Save time on Sunday morning by registering your child’s details in advance.
              </p>
            </div>
            <YoungSaintsForm classes={classes} />
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
