'use client';

import React from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface ContactHeroProps {
  settings: SiteSettings | null;
}

export function ContactHero({ settings }: ContactHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const phoneText = settings?.primary_phone || '020 8952 1445';
  const emailText = settings?.contact_email || 'hello@openheavens.org.uk';
  const locationText = settings
    ? `${settings.address_line1 || 'The Exchange, Edgware'}, ${settings.city || 'London'}`
    : 'The Exchange, Edgware, London';

  return (
    <section className="w-full bg-[#FAF7F0] pt-4 sm:pt-8 pb-12 sm:pb-16 text-black" aria-labelledby="contact-hero-title">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Kicker Tag */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="px-3.5 py-1.5 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            ★ GET IN TOUCH
          </span>
          <span className="px-3.5 py-1.5 bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            WE ARE HERE FOR YOU
          </span>
        </motion.div>

        {/* 2-Column Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: 3-line Bold Headline */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-2"
          >
            <h1
              id="contact-hero-title"
              className="font-display font-black text-black text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight uppercase"
            >
              <span className="block text-black">We’d love</span>
              <span className="block text-black">to hear</span>
              <span className="inline-block bg-[#00D2FF] text-black px-4 py-1 border-2 border-black rounded-2xl mt-1.5">
                from you.
              </span>
            </h1>
          </motion.div>

          {/* Right: Paragraph + Two Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-5"
          >
            <p className="font-body text-base text-black font-semibold leading-relaxed">
              Questions about Sundays, prayer requests, home groups, or just want to chat over coffee — reach out anytime.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <CTAButton href="#message-section" variant="primary" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Send a Message
              </CTAButton>
              <CTAButton href="/im-new" variant="outline" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Plan a Visit
              </CTAButton>
            </div>
          </motion.div>
        </div>

        {/* 4 Pop Contact Info Cards (Gold, Cyan, Lime, Pink) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-5 bg-[#FFC700] text-black border-2 border-black rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-xs font-black uppercase">SUNDAY WORSHIP</span>
            </div>
            <p className="font-display text-xl font-black">10:30 AM</p>
            <p className="text-xs font-bold text-black/80">Doors open 10:15 with warm tea &amp; coffee</p>
          </div>

          <div className="p-5 bg-[#00D2FF] text-black border-2 border-black rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-xs font-black uppercase">LOCATION</span>
            </div>
            <p className="font-display text-lg font-black truncate">{locationText}</p>
            <p className="text-xs font-bold text-black/80">4 min walk from Edgware Tube Station</p>
          </div>

          <div className="p-5 bg-[#16D958] text-black border-2 border-black rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-xs font-black uppercase">EMAIL</span>
            </div>
            <p className="font-display text-base font-black truncate">{emailText}</p>
            <p className="text-xs font-bold text-black/80">We reply within 24 to 48 hours</p>
          </div>

          <div className="p-5 bg-[#FF2E93] text-white border-2 border-black rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="font-mono text-xs font-black uppercase text-white">PHONE</span>
            </div>
            <p className="font-display text-xl font-black text-white">{phoneText}</p>
            <p className="text-xs font-bold text-white/90">Church office hours: Mon - Fri</p>
          </div>
        </div>
      </div>
    </section>
  );
}
