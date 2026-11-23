'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CTAButton } from '@/components/ui/CTAButton';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only check in browser
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
  }

  function handleDecline() {
    localStorage.setItem('cookie_consent', 'essential_only');
    setShow(false);
  }

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background border-t border-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          We use essential cookies to maintain site security and anonymous usage metrics. Read our{' '}
          <Link href="/cookies" className="underline hover:text-foreground">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <CTAButton size="sm" variant="ghost" onClick={handleDecline}>
            Essential Only
          </CTAButton>
          <CTAButton size="sm" variant="primary" onClick={handleAccept}>
            Accept All
          </CTAButton>
        </div>
      </div>
    </aside>
  );
}
