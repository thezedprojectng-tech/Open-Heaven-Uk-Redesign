'use client';

import React, { useState } from 'react';
import { submitPrayerRequest } from '@/lib/actions/forms';
import { FormField } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';
import { CTAButton } from '@/components/ui/CTAButton';

export function PrayerRequestForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitPrayerRequest(formData);
    setLoading(false);
    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Prayer request received.' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Submission failed.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="websiteHoneypot"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      {feedback && (
        <div
          className={`p-3 rounded text-xs ${
            feedback.success ? 'bg-secondary text-foreground' : 'bg-destructive/10 text-destructive'
          }`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}

      <FormField label="Full Name" name="fullName" required>
        <input
          id="prayerFullName"
          name="fullName"
          type="text"
          required
          placeholder="e.g. Grace Evans"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <FormField label="Email Address" name="email" required hint="Used solely if you request a pastoral response">
        <input
          id="prayerEmail"
          name="email"
          type="email"
          required
          placeholder="grace@example.com"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <FormField label="Phone Number (Optional)" name="phone">
        <input
          id="prayerPhone"
          name="phone"
          type="tel"
          placeholder="07123 456789"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <FormField label="Prayer Topic & Details" name="prayerTopic" required>
        <textarea
          id="prayerTopic"
          name="prayerTopic"
          rows={4}
          required
          placeholder="Share your prayer point with our pastoral intercessory team..."
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isConfidential"
          name="isConfidential"
          defaultChecked
          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
        />
        <label htmlFor="isConfidential" className="text-xs text-foreground font-medium">
          Keep this strictly confidential to pastoral staff only
        </label>
      </div>

      <ConsentCheckbox />

      <CTAButton type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Submit Prayer Request'}
      </CTAButton>
    </form>
  );
}
