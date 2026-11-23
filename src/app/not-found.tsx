import Link from 'next/link';
import { CTAButton } from '@/components/ui/CTAButton';

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Error 404</p>
        <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for doesn’t exist or has moved. Please return to the homepage or
          browse our ministries and service times.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <CTAButton href="/" variant="primary" size="md">
            Return Home
          </CTAButton>
          <CTAButton href="/contact" variant="outline" size="md">
            Contact Church Office
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
