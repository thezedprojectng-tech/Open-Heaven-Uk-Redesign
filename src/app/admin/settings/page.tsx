'use client';

import React, { useState } from 'react';
import { mockSiteSettings } from '@/lib/data/mock-data';
import { SiteSettings } from '@/types';
import { FormField } from '@/components/forms/FormField';
import { CTAButton } from '@/components/ui/CTAButton';
import { Save, Check } from 'lucide-react';
import { updateSiteSettingsAction } from '@/lib/actions/admin';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(mockSiteSettings);
  const [savedNotice, setSavedNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateSiteSettingsAction({
        church_name: settings.church_name,
        charity_number: settings.charity_number,
        address_line1: settings.address_line1,
        address_line2: settings.address_line2 || '',
        city: settings.city,
        postcode: settings.postcode,
        primary_phone: settings.primary_phone,
        secondary_phone: settings.secondary_phone || '',
        contact_email: settings.contact_email,
        bank_name: settings.bank_name,
        bank_account_name: settings.bank_account_name,
        bank_sort_code: settings.bank_sort_code,
        bank_account_number: settings.bank_account_number,
        gift_aid_notice: settings.gift_aid_notice,
        social_facebook: settings.social_facebook || '',
        social_instagram: settings.social_instagram || '',
        social_youtube: settings.social_youtube || '',
      });

      if (res.success) {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      } else {
        alert(res.error || 'Failed to update site settings');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Site &amp; Charity Settings</h2>
          <p className="text-xs text-muted-foreground">
            Update church identity, charity registration number, contact phone numbers, and bank details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-xs font-semibold text-admin-teal flex items-center gap-1 bg-admin-teal-surface px-3 py-1 rounded">
              <Check className="h-3.5 w-3.5" aria-hidden="true" /> Saved to Supabase!
            </span>
          )}
          <CTAButton type="submit" variant="primary" size="md" disabled={loading}>
            <Save className="h-4 w-4 mr-1.5" aria-hidden="true" />
            {loading ? 'Saving...' : 'Save Settings'}
          </CTAButton>
        </div>
      </div>

      {/* 1. Legal Entity & Identity */}
      <section className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Church Identity &amp; Governance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Church Name" name="church_name" required>
            <input
              id="church_name"
              type="text"
              required
              value={settings.church_name}
              onChange={(e) => setSettings({ ...settings, church_name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Registered Charity Number" name="charity_number" required>
            <input
              id="charity_number"
              type="text"
              required
              value={settings.charity_number}
              onChange={(e) => setSettings({ ...settings, charity_number: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>
      </section>

      {/* 2. Address & Physical Venue */}
      <section className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Physical Location</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Address Line 1" name="address_line1" required>
            <input
              id="address_line1"
              type="text"
              required
              value={settings.address_line1}
              onChange={(e) => setSettings({ ...settings, address_line1: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Address Line 2 (Optional)" name="address_line2">
            <input
              id="address_line2"
              type="text"
              value={settings.address_line2 || ''}
              onChange={(e) => setSettings({ ...settings, address_line2: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="City / Borough" name="city" required>
            <input
              id="city"
              type="text"
              required
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Postcode" name="postcode" required>
            <input
              id="postcode"
              type="text"
              required
              value={settings.postcode}
              onChange={(e) => setSettings({ ...settings, postcode: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>
      </section>

      {/* 3. Phone & Email Links */}
      <section className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Telephones &amp; Enquiries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Primary Landline" name="primary_phone" required>
            <input
              id="primary_phone"
              type="text"
              required
              value={settings.primary_phone}
              onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Secondary Phone / Mobile" name="secondary_phone">
            <input
              id="secondary_phone"
              type="text"
              value={settings.secondary_phone || ''}
              onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Public Contact Email" name="contact_email" required>
            <input
              id="contact_email"
              type="email"
              required
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>
      </section>

      {/* 4. Bank Details & Gift Aid */}
      <section className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Banking &amp; Stewardship</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Bank Name" name="bank_name" required>
            <input
              id="bank_name"
              type="text"
              required
              value={settings.bank_name}
              onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Account Name" name="bank_account_name" required>
            <input
              id="bank_account_name"
              type="text"
              required
              value={settings.bank_account_name}
              onChange={(e) => setSettings({ ...settings, bank_account_name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Sort Code" name="bank_sort_code" required>
            <input
              id="bank_sort_code"
              type="text"
              required
              value={settings.bank_sort_code}
              onChange={(e) => setSettings({ ...settings, bank_sort_code: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Account Number" name="bank_account_number" required>
            <input
              id="bank_account_number"
              type="text"
              required
              value={settings.bank_account_number}
              onChange={(e) => setSettings({ ...settings, bank_account_number: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>

        <FormField label="Gift Aid Legal Notice" name="gift_aid_notice" required>
          <textarea
            id="gift_aid_notice"
            rows={2}
            required
            value={settings.gift_aid_notice}
            onChange={(e) => setSettings({ ...settings, gift_aid_notice: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
          />
        </FormField>
      </section>

      {/* 5. Social Media Channels */}
      <section className="border border-border rounded-lg p-6 bg-card space-y-4">
        <h3 className="text-base font-bold text-foreground">Official Social Media Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="YouTube Channel" name="social_youtube">
            <input
              id="social_youtube"
              type="url"
              value={settings.social_youtube || ''}
              onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Facebook Page" name="social_facebook">
            <input
              id="social_facebook"
              type="url"
              value={settings.social_facebook || ''}
              onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Instagram Profile" name="social_instagram">
            <input
              id="social_instagram"
              type="url"
              value={settings.social_instagram || ''}
              onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>
      </section>
    </form>
  );
}
