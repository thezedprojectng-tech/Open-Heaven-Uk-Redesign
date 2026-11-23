'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight, Users, Heart, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#FAF7F0] pt-4 sm:pt-8 pb-12 sm:pb-16 text-black" aria-labelledby="about-hero-title">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Tag & Category Badge */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="px-3.5 py-1.5 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            ★ ABOUT OPEN HEAVENS
          </span>
          <span className="px-3.5 py-1.5 bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
            OUR STORY &amp; VALUES
          </span>
        </motion.div>

        {/* 2-Column Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: Bold Display Headline */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-2"
          >
            <h1
              id="about-hero-title"
              className="font-display font-black text-black text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight uppercase"
            >
              <span className="block text-black">Ordinary people.</span>
              <span className="block text-black">Learning together.</span>
              <span className="inline-block bg-[#FFC700] text-black px-4 py-1 border-2 border-black rounded-2xl mt-1.5">
                Serving our city.
              </span>
            </h1>
          </motion.div>

          {/* Right: Paragraph + Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-5"
          >
            <p className="font-body text-base text-black font-semibold leading-relaxed">
              We’re a neighborhood church for people at every stage of faith, including none at all. Come just as you are.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <CTAButton href="/im-new" variant="primary" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Plan Your Visit
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="md" showArrow className="w-full sm:w-auto lg:w-fit">
                Say Hello
              </CTAButton>
            </div>
          </motion.div>
        </div>

        {/* Panoramic Photo with 2px Black Border and No Shadows */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-black bg-white group"
        >
          <SafeImage
            src="/Footer.jpg"
            alt="Atmospheric sunset over calm water with wooden posts"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 bg-black text-white border-2 border-black rounded-xl font-mono text-xs font-black uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#16D958] rounded-full animate-pulse" aria-hidden="true" />
            <span>COMMUNITY IN EDGWARE SINCE 2010</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
