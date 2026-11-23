import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border border-dashed border-border rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-3 bg-muted/10',
        className
      )}
    >
      <AlertCircle className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
