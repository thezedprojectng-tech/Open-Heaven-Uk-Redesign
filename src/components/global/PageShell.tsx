import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { cn } from '@/lib/utils';

interface PageShellProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageShell({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  className,
}: PageShellProps) {
  return (
    <main id="main-content" className="flex-1 py-8 sm:py-12 bg-[#FAF7F0] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

        <header className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ OPEN HEAVENS
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-black">
              {title}
            </h1>
            {description && (
              <p className="text-base sm:text-lg text-black font-medium max-w-3xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </header>

        <div className={cn('pt-4', className)}>{children}</div>
      </div>
    </main>
  );
}
