'use client';

import React, { useEffect } from 'react';

/**
 * SmoothScrollProvider — powered by Lenis
 *
 * Uses dynamic import and defensive execution to ensure compatibility across
 * Webpack, Turbopack, and SSR/hydration environments without throwing module errors.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect prefers-reduced-motion — skip Lenis, use native scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let destroyed = false;
    let rafId: number;
    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;

    import('lenis')
      .then((mod) => {
        if (destroyed) return;
        const LenisCtor = (mod && typeof mod.default === 'function')
          ? mod.default
          : (typeof mod === 'function' ? mod : null);

        if (!LenisCtor) return;

        lenisInstance = new LenisCtor({
          lerp: 0.1,
          smoothWheel: true,
          touchMultiplier: 1.5,
          infinite: false,
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        // Silently fall back to browser native smooth scrolling if Lenis fails to load
        console.warn('Smooth scroll fallback to native:', err);
      });

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return <>{children}</>;
}

