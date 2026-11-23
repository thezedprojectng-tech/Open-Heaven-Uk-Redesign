'use client';

import React, { useState } from 'react';
import { HomeGroup } from '@/types';
import { MapPin, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { submitHomeGroupRequest } from '@/lib/actions/forms';

interface GroupRowProps {
  group: HomeGroup;
}

export function GroupRow({ group }: GroupRowProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitHomeGroupRequest(formData);
    setLoading(false);
    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Request submitted!' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Submission failed.' });
    }
  }

  return (
    <article className="border border-border rounded-lg bg-card p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wide">
              {group.area}
            </span>
            <h3 className="text-lg font-bold text-foreground">{group.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{group.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {group.day_of_week}s at {group.meeting_time}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              Leader: {group.leader_name}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Area: {group.area} (Address sent upon contact)
            </span>
          </div>
        </div>

        <CTAButton
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setFormOpen(!formOpen)}
          aria-expanded={formOpen}
        >
          {formOpen ? (
            <>
              Close <ChevronUp className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
            </>
          ) : (
            <>
              Request to Join <ChevronDown className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
            </>
          )}
        </CTAButton>
      </div>

      {/* Expandable Request to Join Form */}
      {formOpen && (
        <div className="pt-4 border-t border-border mt-4">
          <h4 className="text-sm font-semibold text-foreground mb-1">
            Connect with {group.name}
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Fill in your details below. Your request will be directly and securely forwarded to{' '}
            {group.leader_name}.
          </p>

          {feedback && (
            <div
              className={`p-3 rounded text-xs mb-4 ${
                feedback.success ? 'bg-secondary text-foreground' : 'bg-destructive/10 text-destructive'
              }`}
              role="alert"
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="groupName" value={group.name} />
            <input type="hidden" name="groupArea" value={group.area} />
            {/* Honeypot field */}
            <input
              type="text"
              name="websiteHoneypot"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Your Full Name" name="fullName" required>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

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

              <FormField label="Phone Number" name="phone" required hint="Leader will text or call you">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="07123 456789"
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Preferred Contact Method" name="preferredContactMethod">
                <select
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp / SMS</option>
                </select>
              </FormField>
            </div>

            <FormField label="Notes or Questions (Optional)" name="notes">
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="Let the leader know a bit about yourself or any accessibility requirements."
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <ConsentCheckbox />

            <div className="flex justify-end gap-2">
              <CTAButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </CTAButton>
              <CTAButton type="submit" size="sm" variant="primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Send Request to Leader'}
              </CTAButton>
            </div>
          </form>
        </div>
      )}
    </article>
  );
}
