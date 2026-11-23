import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'yellow' | 'mint' | 'peach' | 'tertiary' | 'pink' | 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
}

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  className,
  children,
  ...props
}: CTAButtonProps) {
  // Clean Modern Pop base classes: rounded-xl, crisp 2px black border, NO heavy shadows
  const baseClasses =
    'inline-flex items-center justify-center font-body font-black uppercase tracking-wider rounded-xl border-2 border-ink transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group hover:-translate-y-0.5 active:translate-y-0.5';

  const sizeClasses = {
    sm: 'h-9 px-4 text-xs gap-2',
    md: 'h-11 px-5 sm:px-6 text-xs sm:text-sm gap-2.5',
    lg: 'h-13 py-3.5 px-6 sm:px-8 text-sm sm:text-base gap-3',
  };

  const variantClasses = {
    // Primary: Solid Jet Black button (like LISTEN LIVE and BOOK in SpaceFM reference)
    primary: 'bg-black text-white hover:bg-neutral-800 border-2 border-black',
    // Secondary: Electric Sky Cyan
    secondary: 'bg-[#00D2FF] text-black hover:brightness-105 border-2 border-black',
    // Outline: Clean White button with crisp 2px border
    outline: 'bg-white text-black hover:bg-neutral-50 border-2 border-black',
    // Dark: sleek dark slate
    dark: 'bg-neutral-900 text-white hover:bg-black border-2 border-neutral-900',
    // Yellow/Gold: Bright sunny gold
    yellow: 'bg-[#FFC700] text-black hover:brightness-105 border-2 border-black',
    // Mint/Green: Bright electric lime green
    mint: 'bg-[#16D958] text-black hover:brightness-105 border-2 border-black',
    green: 'bg-[#16D958] text-black hover:brightness-105 border-2 border-black',
    // Pink: Vivid hot pink (like Podcast Studio in SpaceFM)
    pink: 'bg-[#FF2E93] text-white hover:brightness-105 border-2 border-black',
    peach: 'bg-[#FF8F6B] text-black hover:brightness-105 border-2 border-black',
    tertiary: 'bg-[#FF2E93] text-white hover:brightness-105 border-2 border-black',
    blue: 'bg-[#00D2FF] text-black hover:brightness-105 border-2 border-black',
    // Ghost: Clean text with soft hover
    ghost: 'text-black bg-transparent border-transparent hover:border-black hover:bg-black/5',
  };

  const combinedClasses = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span
          className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5 shrink-0',
            variant === 'primary' || variant === 'pink' || variant === 'tertiary'
              ? 'bg-white/20 text-white'
              : 'bg-black/10 text-black'
          )}
        >
          <ArrowRight className="h-3 w-3 stroke-[3]" aria-hidden="true" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
