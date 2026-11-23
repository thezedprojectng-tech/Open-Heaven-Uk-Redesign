'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ServiceTime } from '@/types';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface HeaderProps {
  serviceTimes?: ServiceTime[];
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/im-new', label: 'Visit' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/events', label: 'Events' },
  { href: '/watch', label: 'Messages' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ serviceTimes = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const sundayService = serviceTimes.find((s) => s.day_of_week === 'Sunday');
  const serviceTimeStr = sundayService?.start_time || '10:30 AM';

  return (
    <header className="sticky top-0 z-50 w-full pt-2 sm:pt-4 pb-2 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-8xl mx-auto pointer-events-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-black text-white border-2 border-black rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4"
        >
          {/* Left: Brand Identity with Gold Pop Badge */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] py-0.5"
            aria-label="Open Heavens Christian Centre - Home"
          >
            <div className="h-8 px-2.5 bg-[#FFC700] text-black font-mono font-black text-xs flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform">
              OHCC
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-black text-white tracking-tight uppercase leading-none">
                Open Heavens
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">
                Edgware, London
              </span>
            </div>
          </Link>

          {/* Center: Clean Pop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-[#FFC700] text-black'
                      : 'text-white hover:text-[#FFC700] hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Sunday Status Stamp + Give & Plan CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-[#16D958] text-black font-mono text-[11px] font-black rounded-full">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" aria-hidden="true" />
              <span>SUN {serviceTimeStr}</span>
            </div>

            <Link
              href="/give"
              className="hidden md:inline-flex items-center px-3.5 py-1.5 bg-[#FFC700] text-black font-body font-black text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-all"
            >
              <span>Give</span>
            </Link>

            <Link
              href="/im-new"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-body font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#00D2FF] hover:text-black transition-all"
            >
              <span>Plan Visit</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-white bg-neutral-900 border border-neutral-700 rounded-lg hover:bg-[#FFC700] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] transition-all"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Mobile Pop Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden mt-2 bg-black text-white border-2 border-black rounded-2xl p-4 pointer-events-auto"
            >
              <div className="pb-3 mb-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="font-display text-sm font-black uppercase text-white">
                  Menu
                </span>
                <span className="font-mono text-xs font-bold text-[#FFC700]">
                  SUN {serviceTimeStr}
                </span>
              </div>
              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#FFC700] text-black'
                          : 'text-white hover:bg-neutral-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
                  <Link
                    href="/give"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 bg-[#FFC700] text-black font-black text-xs uppercase tracking-wider rounded-lg text-center"
                  >
                    Give
                  </Link>
                  <Link
                    href="/im-new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                  >
                    <span>Plan Your Visit</span>
                    <ArrowRight className="h-4 w-4 stroke-[3]" />
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
