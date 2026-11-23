'use client';

import React, { useState } from 'react';
import { submitVisitorForm } from '@/lib/actions/forms';
import { FormField } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';
import { CTAButton } from '@/components/ui/CTAButton';

export function VisitorForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitVisitorForm(formData);
    setLoading(false);
    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Thank you! We will see you soon.' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Submission failed.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot for spam protection */}
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
          className={`p-3 rounded-xl border-2 border-black font-mono text-xs font-black uppercase ${
            feedback.success ? 'bg-[#16D958] text-black' : 'bg-[#FF2E93] text-white'
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
          placeholder="e.g. Rachel Adams"
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <FormField label="Email Address" name="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="rachel@example.com"
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <FormField label="Phone Number (Optional)" name="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="07123 456789"
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <FormField label="When are you planning to visit?" name="preferredServiceDate">
        <input
          id="preferredServiceDate"
          name="preferredServiceDate"
          type="date"
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bringingFamily"
          name="bringingFamily"
          className="h-4 w-4 rounded border-2 border-black text-black focus:ring-black"
        />
        <label htmlFor="bringingFamily" className="text-xs text-black font-bold">
          I will be bringing family members / children
        </label>
      </div>

      <FormField label="Any questions or prayer requests?" name="prayerRequestOrQuestions">
        <textarea
          id="prayerRequestOrQuestions"
          name="prayerRequestOrQuestions"
          rows={3}
          placeholder="Let us know anything that will help us prepare for your visit."
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <ConsentCheckbox />

      <CTAButton type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Register My Visit'}
      </CTAButton>
    </form>
  );
}
