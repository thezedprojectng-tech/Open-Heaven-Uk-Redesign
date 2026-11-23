'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

export function ComeAsYouAreBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0] select-text" aria-labelledby="banner-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Bright Gold Pop Billboard Card (SpaceFM Style) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="relative w-full min-h-[380px] sm:min-h-[440px] border-2 border-black rounded-3xl overflow-hidden bg-[#FFC700] text-black flex items-center p-6 sm:p-12 lg:p-16"
        >
          {/* Subtle background photo overlay */}
          <SafeImage
            src="/Footer.jpg"
            alt="Atmospheric sunset over calm water with wooden posts"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-black text-white bg-black px-3.5 py-1 rounded-full uppercase tracking-widest inline-block">
                ★ Open Heavens Christian Centre
              </span>
              <h2
                id="banner-heading"
                className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-black uppercase tracking-tight leading-[1.02]"
              >
                Come as you are.
              </h2>
            </div>

            <p className="font-body text-base sm:text-xl text-black/85 leading-relaxed font-medium">
              Whether you’re exploring faith for the first time, returning to church after years away, or looking for a community to call home in Edgware, you have a seat at our table.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CTAButton href="/im-new" variant="primary" size="lg" showArrow>
                Plan Your Sunday Visit
              </CTAButton>

              <CTAButton href="/contact" variant="outline" size="lg" showArrow>
                Get In Touch With Pastors
              </CTAButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
