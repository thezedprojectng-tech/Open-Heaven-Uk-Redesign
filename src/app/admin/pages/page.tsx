'use client';

import React, { useState } from 'react';
import { mockPages } from '@/lib/data/mock-data';
import { ManagedPage } from '@/types';
import { Save, Check } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { savePageAction } from '@/lib/actions/admin';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Record<string, ManagedPage>>(mockPages);
  const [selectedSlug, setSelectedSlug] = useState<string>('about');
  const [savedNotice, setSavedNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentPage = pages[selectedSlug];

  function handleContentChange(field: keyof ManagedPage, val: string) {
    setPages({
      ...pages,
      [selectedSlug]: {
        ...currentPage,
        [field]: val,
        updated_at: new Date().toISOString(),
      },
    });
  }

  async function handleSave() {
    setLoading(true);
    try {
      const res = await savePageAction(selectedSlug, {
        title: currentPage.title,
        summary: currentPage.summary,
        content: currentPage.content,
        meta_description: currentPage.meta_description || '',
      });

      if (res.success) {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      } else {
        alert(res.error || 'Failed to save page changes.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Content Management (Pages)</h2>
          <p className="text-xs text-muted-foreground">
            Edit text content for About, I’m New, Privacy Policy, Cookie Policy, and Safeguarding.
          </p>
        </div>
        {savedNotice && (
          <span className="text-xs font-semibold text-admin-teal flex items-center gap-1 bg-admin-teal-surface px-3 py-1 rounded">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Saved to database &amp; audit logged!
          </span>
        )}
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {Object.keys(pages).map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setSelectedSlug(slug)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedSlug === slug
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {pages[slug].title}
          </button>
        ))}
      </div>

      {/* Editor Container */}
      {currentPage && (
        <div className="border border-border rounded-lg p-6 bg-card space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Page Title" name="pageTitle">
              <input
                id="pageTitle"
                type="text"
                value={currentPage.title}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Meta Description (SEO)" name="metaDesc">
              <input
                id="metaDesc"
                type="text"
                value={currentPage.meta_description || ''}
                onChange={(e) => handleContentChange('meta_description', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <FormField label="Page Summary / Intro" name="summary">
            <input
              id="summary"
              type="text"
              value={currentPage.summary}
              onChange={(e) => handleContentChange('summary', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Page Body (Markdown / Rich Text Structure)" name="content">
            <textarea
              id="content"
              rows={12}
              value={currentPage.content}
              onChange={(e) => handleContentChange('content', e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono border border-input rounded bg-background"
            />
          </FormField>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date(currentPage.updated_at).toLocaleString('en-GB')}
            </span>
            <CTAButton size="md" variant="primary" onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-1.5" aria-hidden="true" />
              {loading ? 'Saving...' : 'Save Page Changes'}
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
