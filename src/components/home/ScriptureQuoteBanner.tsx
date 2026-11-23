'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function ScriptureQuoteBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="w-full bg-[#796BFF] text-white border-y-2 border-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-text"
      aria-label="Scripture verse"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.blockquote
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase leading-snug tracking-tight text-white max-w-3xl mx-auto"
        >
          “To do justly, and to love mercy, and to walk humbly with thy God.”
        </motion.blockquote>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <span className="h-0.5 w-10 bg-white/40 hidden sm:inline-block" aria-hidden="true" />
          <cite className="px-4 py-1.5 bg-[#FFC700] text-black border-2 border-black font-mono text-xs sm:text-sm font-black tracking-wider uppercase rounded-full not-italic">
            Micah 6:8 — KJV
          </cite>
          <span className="h-0.5 w-10 bg-white/40 hidden sm:inline-block" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
