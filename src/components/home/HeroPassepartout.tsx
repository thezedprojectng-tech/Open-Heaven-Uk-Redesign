'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SafeImage } from '@/components/ui/SafeImage';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroPassepartoutProps {
  churchName: string;
  charityNumber: string;
}

export function HeroPassepartout({ churchName, charityNumber }: HeroPassepartoutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="w-full bg-paper pt-8 sm:pt-14 lg:pt-16 pb-8 sm:pb-12"
      aria-labelledby="hero-title"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Small Kicker above the headline */}
        <div className="text-center mb-5 sm:mb-7">
          <span className="font-mono-meta text-[11px] sm:text-[12px] text-ink/75 tracking-[0.22em] uppercase font-normal select-none">
            EVERY SUNDAY. TWO SERVICES. EDGWARE, LONDON.
          </span>
        </div>

        {/* Giant Two-Line Headline matching reference: Line 1 upright serif, Line 2 italic terracotta */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h1
            id="hero-title"
            className="font-display font-medium text-ink tracking-[-0.03em] text-[clamp(4.25rem,10.5vw,8.5rem)] leading-[0.92] max-w-5xl mx-auto"
          >
            <span>Open Heavens</span>
            <span className="font-display italic font-normal text-accent block mt-1 sm:mt-2">
              Church
            </span>
          </h1>
        </div>

        {/* Passepartout Mat: wide tinted ground framing the photograph */}
        <div className="w-full bg-surface rounded-t-[32px] sm:rounded-t-[44px] rounded-b-[24px] sm:rounded-b-[32px] border border-line p-4 sm:p-7 md:p-10 lg:p-12 shadow-lg">
          {/* Framed Photograph like a print on a wall */}
          <div className="relative mx-auto w-full max-w-5xl border border-line/80 bg-paper p-2.5 sm:p-4 shadow-sm">
            {/* 
              TODO: Replace with real photography of OHCC's own congregation and building 
              (avoid identifiable children, maintain high resolution)
            */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted/20">
              <motion.div
                className="relative w-full h-full"
                initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.03 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              >
                <SafeImage
                  src="/placeholder-event.svg"
                  alt="Congregation gathered for worship at Open Heavens Christian Centre in Edgware"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Museum-Label Caption Beneath the Print */}
            <div className="pt-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-line/60 mt-3 font-mono-meta text-[10px] sm:text-[11px] text-ink/75">
              <div>
                <span className="text-ink font-semibold">OPEN HEAVENS EDGWARE</span>
                <span className="mx-2">·</span>
                <span>SUNDAY WORSHIP &amp; FELLOWSHIP HALL</span>
              </div>
              <div className="text-ink/65">
                REGISTERED CHARITY NO. {charityNumber}
              </div>
            </div>
          </div>

          {/* CTAs beneath the caption */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton
              href="/im-new"
              variant="primary"
              size="lg"
              showArrow
            >
              Plan your visit
            </CTAButton>
            <CTAButton
              href="/watch"
              variant="outline"
              size="lg"
              showArrow
            >
              Watch live
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
