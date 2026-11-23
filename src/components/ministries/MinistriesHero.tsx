'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

export function MinistriesHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#FAF7F0] pt-4 sm:pt-8 pb-12 sm:pb-16 text-black" aria-labelledby="ministries-hero-title">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Kicker Tag */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="px-3.5 py-1.5 bg-[#16D958] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            ★ OUR MINISTRIES
          </span>
          <span className="px-3.5 py-1.5 bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            GROW &amp; SERVE TOGETHER
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
              id="ministries-hero-title"
              className="font-display font-black text-black text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight uppercase"
            >
              <span className="block text-black">There’s a place</span>
              <span className="block text-black">for every age</span>
              <span className="inline-block bg-[#16D958] text-black px-4 py-1 border-2 border-black rounded-2xl mt-1.5">
                and every stage.
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
              Every ministry here exists to connect you to people who are glad you came. Find your circle and start thriving.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <CTAButton href="#all-ministries" variant="primary" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Explore Ministries
              </CTAButton>
              <CTAButton href="/home-groups" variant="outline" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Join a Home Group
              </CTAButton>
            </div>
          </motion.div>
        </div>

        {/* Panoramic Community Photo */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-black bg-white group"
        >
          <SafeImage
            src="/church-pew.jpg"
            alt="Ministries and fellowship at Open Heavens"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 bg-black text-white border-2 border-black rounded-xl font-mono text-xs font-black uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00D2FF] rounded-full animate-pulse" aria-hidden="true" />
            <span>DISCIPLESHIP &middot; COMMUNITY &middot; LOCAL SERVICE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
