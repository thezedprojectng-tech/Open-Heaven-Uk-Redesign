import React from 'react';
import Link from 'next/link';
import { SiteSettings, ServiceTime } from '@/types';
import { ArrowRight, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  serviceTimes: ServiceTime[];
}

export function Footer({ settings, serviceTimes }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const addressLine = settings
    ? `${settings.address_line1 || 'Edgware'}, ${settings.city || 'London'}`
    : 'Edgware, London';
  const phone = settings?.primary_phone || '020 8952 0000';
  const email = settings?.contact_email || 'info@openheavens.org.uk';

  // Get active Sunday services
  const sundayServices = serviceTimes.filter((s) => s.day_of_week === 'Sunday');
  const service1 = sundayServices[0]?.start_time || '10:30 AM';
  const service2 = sundayServices[1]?.start_time;

  return (
    <footer
      className="w-full bg-black text-white border-t-2 border-black mt-auto select-text"
      role="contentinfo"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Regulated Clean Pop Grid (No Shadows, Rounded Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pb-12 border-b border-neutral-800">
          {/* Box 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-white">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {settings?.church_name || 'Open Heavens'}
            </h2>

            <p className="text-sm font-body text-neutral-300 leading-relaxed font-medium">
              A community of ordinary people learning to follow Jesus together in Edgware. Come as you are, questions included.
            </p>

            <div className="pt-2">
              <div className="p-3 bg-black border border-neutral-800 rounded-xl flex items-start gap-2.5 text-xs font-mono font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-[#FFC700] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-black text-white">Registered UK Charity</p>
                  <p className="text-neutral-400 text-[11px] font-bold">No. {settings?.charity_number || '1138247'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Sundays Schedule (3 cols) */}
          <div className="lg:col-span-3 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-white">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Clock className="h-4 w-4 text-[#FFC700]" aria-hidden="true" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                Sunday Services
              </span>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 bg-black border border-neutral-800 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">MAIN SERVICE</span>
                <span className="text-xl font-black text-[#FFC700]">{service1}</span>
              </div>
              {service2 && (
                <div className="p-3 bg-black border border-neutral-800 rounded-xl">
                  <span className="text-[10px] text-neutral-400 uppercase block font-bold">SECOND SERVICE</span>
                  <span className="text-xl font-black text-[#FFC700]">{service2}</span>
                </div>
              )}
              <div className="p-2.5 bg-[#16D958] text-black rounded-lg text-xs font-mono font-black">
                Kids &amp; Youth classes run in parallel
              </div>
            </div>

            <Link
              href="/im-new"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-[#FFC700] text-black rounded-xl font-mono text-xs font-black uppercase hover:bg-white transition-all"
            >
              <span>First time visiting?</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
            </Link>
          </div>

          {/* Box 3: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-white">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-white block border-b border-neutral-800 pb-2">
              Explore
            </span>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                {[
                  { href: '/about', label: 'About' },
                  { href: '/im-new', label: 'Visit' },
                  { href: '/ministries', label: 'Ministries' },
                  { href: '/events', label: 'Events' },
                  { href: '/watch', label: 'Messages' },
                  { href: '/home-groups', label: 'Groups' },
                  { href: '/young-saints', label: 'Kids & Youth' },
                  { href: '/give', label: 'Give' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/safeguarding', label: 'Safeguard' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block p-2 border border-neutral-800 rounded-lg bg-black text-neutral-300 hover:bg-[#FFC700] hover:text-black hover:border-black transition-colors uppercase text-[11px]"
                    >
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Box 4: Contact & Location (2 cols) */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-white">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-white block border-b border-neutral-800 pb-2">
              Location
            </span>

            <address className="not-italic space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">ADDRESS</span>
                <p className="font-bold text-white leading-tight">{addressLine}</p>
                <p className="text-[11px] text-[#00D2FF] font-bold">4 min from Edgware Tube</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">CONTACT</span>
                <a
                  href={`tel:${phone}`}
                  className="block font-bold text-neutral-300 hover:text-[#FFC700] transition-colors truncate"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block font-bold text-neutral-300 hover:text-[#FFC700] transition-colors break-all text-[11px]"
                >
                  {email}
                </a>
              </div>
            </address>

            <div className="pt-2 border-t border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1.5 font-bold">
                SOCIAL
              </span>
              <div className="flex gap-2">
                {[
                  { name: 'IG', href: settings?.social_instagram || 'https://instagram.com' },
                  { name: 'FB', href: settings?.social_facebook || 'https://facebook.com' },
                  { name: 'YT', href: settings?.social_youtube || 'https://youtube.com' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-black border border-neutral-700 text-xs font-mono font-black rounded-lg flex items-center justify-center hover:bg-[#FFC700] hover:text-black transition-colors"
                    aria-label={`Open Heavens on ${s.name}`}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent border border-ink" aria-hidden="true" />
            <span>© {currentYear} {settings?.church_name || 'Open Heavens Christian Centre'}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safeguarding" className="hover:text-ink transition-colors uppercase">
              Safeguarding
            </Link>
            <span>/</span>
            <Link href="/privacy" className="hover:text-ink transition-colors uppercase">
              Privacy
            </Link>
            <span>/</span>
            <Link href="/cookies" className="hover:text-ink transition-colors uppercase">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
