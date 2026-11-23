import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  tag,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={cn('flex flex-col gap-2 mb-8', alignClass, className)}>
      {tag && (
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {tag}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
