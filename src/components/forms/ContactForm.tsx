'use client';

import React, { useState } from 'react';
import { submitContactForm } from '@/lib/actions/forms';
import { FormField } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';
import { CTAButton } from '@/components/ui/CTAButton';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(formData);
    setLoading(false);
    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Message sent successfully!' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Failed to send message.' });
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
          id="fullName"
          name="fullName"
          type="text"
          required
          placeholder="e.g. John Doe"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email Address" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
          />
        </FormField>

        <FormField label="Phone Number (Optional)" name="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="07123 456789"
            className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
          />
        </FormField>
      </div>

      <FormField label="Subject" name="subject" required>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="e.g. General enquiry, venue hiring, volunteering"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <FormField label="Message" name="message" required>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="How can we help you?"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
        />
      </FormField>

      <ConsentCheckbox />

      <CTAButton type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </CTAButton>
    </form>
  );
}
