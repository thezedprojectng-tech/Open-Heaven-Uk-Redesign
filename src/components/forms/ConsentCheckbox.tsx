import React from 'react';
import Link from 'next/link';

interface ConsentCheckboxProps {
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function ConsentCheckbox({
  name = 'consentGiven',
  checked,
  onChange,
  required = true,
}: ConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-3 p-2 bg-muted/40 rounded-md border border-border">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring focus:ring-offset-2"
      />
      <label htmlFor={name} className="text-xs text-muted-foreground leading-relaxed">
        I consent to Open Heavens Christian Centre storing and processing my personal details in
        accordance with the{' '}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        . Your details are never sold or shared with third parties.
      </label>
    </div>
  );
}
