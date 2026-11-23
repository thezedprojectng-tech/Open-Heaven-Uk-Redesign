'use client';

import React, { useState } from 'react';
import { YoungSaintsClass } from '@/types';
import { submitYoungSaintsEnquiry } from '@/lib/actions/forms';
import { FormField } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';
import { CTAButton } from '@/components/ui/CTAButton';

interface YoungSaintsFormProps {
  classes: YoungSaintsClass[];
}

export function YoungSaintsForm({ classes }: YoungSaintsFormProps) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitYoungSaintsEnquiry(formData);
    setLoading(false);
    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Child registered successfully!' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Registration failed.' });
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
          className={`p-3 rounded-xl border-2 border-black font-mono text-xs font-black uppercase ${
            feedback.success ? 'bg-[#16D958] text-black' : 'bg-[#FF2E93] text-white'
          }`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}

      <FormField label="Parent / Guardian Name" name="parentName" required>
        <input
          id="parentName"
          name="parentName"
          type="text"
          required
          placeholder="e.g. David Williams"
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="david@example.com"
            className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FormField>

        <FormField label="Mobile Phone" name="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="07123 456789"
            className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Child’s Full Name" name="childName" required>
          <input
            id="childName"
            name="childName"
            type="text"
            required
            placeholder="e.g. Samuel Williams"
            className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FormField>

        <FormField label="Child’s Age" name="childAge" required>
          <input
            id="childAge"
            name="childAge"
            type="text"
            required
            placeholder="e.g. 5 years"
            className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FormField>
      </div>

      <FormField label="Select Class" name="classInterested" required>
        <select
          id="classInterested"
          name="classInterested"
          required
          className="w-full px-3.5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">-- Choose Age Class --</option>
          {classes.map((c) => (
            <option key={c.id} value={`${c.name} (${c.age_range})`}>
              {c.name} ({c.age_range})
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Allergies or Medical Needs" name="allergiesOrMedicalNeeds">
        <textarea
          id="allergiesOrMedicalNeeds"
          name="allergiesOrMedicalNeeds"
          rows={2}
          placeholder="E.g. nut allergy, asthma inhaler, special learning requirements."
          className="w-full px-3.5 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-[#FAF7F0] focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </FormField>

      <ConsentCheckbox />

      <CTAButton type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Register Child'}
      </CTAButton>
    </form>
  );
}
