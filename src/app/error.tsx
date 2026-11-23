'use client';

import { useEffect } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-xs uppercase font-bold tracking-wider text-destructive">Application Error</p>
        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We encountered an unexpected error loading this page. You can try refreshing or contact
          our technical team if the issue persists.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <CTAButton onClick={() => reset()} variant="primary" size="md">
            Try Again
          </CTAButton>
          <CTAButton href="/" variant="outline" size="md">
            Go to Homepage
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
