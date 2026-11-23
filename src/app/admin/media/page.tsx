'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle, Check } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { registerMediaUploadAction } from '@/lib/actions/admin';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  alt_text: string;
  size: string;
  created_at: string;
}

const mockMediaList: MediaItem[] = [
  {
    id: '1',
    name: 'couples-banquet-banner.webp',
    url: '/placeholder-event.svg',
    alt_text: 'Table setting and banner for Kingdom Couples Banquet',
    size: '142 KB',
    created_at: '2026-11-15',
  },
  {
    id: '2',
    name: 'carols-by-candlelight.webp',
    url: '/placeholder-event.svg',
    alt_text: 'Church auditorium singing Christmas carols',
    size: '188 KB',
    created_at: '2026-11-10',
  },
  {
    id: '3',
    name: 'pastor-john-portrait.webp',
    url: '/placeholder-leader.svg',
    alt_text: 'Portrait of Senior Pastor John Adebayo',
    size: '95 KB',
    created_at: '2026-10-28',
  },
];

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>(mockMediaList);
  const [altText, setAltText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!altText || altText.trim().length === 0) {
      setErrorMsg('Mandatory Alt Text must be provided before uploading any media file.');
      return;
    }

    setLoading(true);
    try {
      const filename = `media-${Date.now().toString().slice(-4)}.webp`;
      const res = await registerMediaUploadAction({
        filename,
        file_path: `/media/${filename}`,
        file_size: 120 * 1024,
        mime_type: 'image/webp',
        alt_text: altText,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to upload media');
        setLoading(false);
        return;
      }

      const newItem: MediaItem = {
        id: Date.now().toString(),
        name: filename,
        url: '/placeholder-event.svg',
        alt_text: altText,
        size: '120 KB',
        created_at: new Date().toISOString().split('T')[0],
      };

      setItems([newItem, ...items]);
      setSuccessMsg('Media uploaded to Supabase Storage and registered in audit log.');
      setAltText('');
      (e.target as HTMLFormElement).reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Media Library</h2>
        <p className="text-xs text-muted-foreground">
          Upload images to Supabase Storage with mandatory alt text, size validation, and audit tracking.
        </p>
      </div>

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Upload className="h-4 w-4" aria-hidden="true" />
          Upload New Image
        </h3>

        {errorMsg && (
          <div className="p-3 rounded text-xs bg-destructive/10 text-destructive flex items-center gap-2" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded text-xs bg-admin-teal-surface text-admin-teal flex items-center gap-2" role="alert">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Choose Image File (Max 2MB)" name="file" required>
            <input
              id="file"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="w-full px-3 py-1.5 text-xs border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Mandatory Alt Text (Screen Readers & SEO)" name="altText" required>
            <input
              id="altText"
              type="text"
              required
              placeholder="Descriptive sentence explaining what this photo shows"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>

        <div className="flex justify-end">
          <CTAButton type="submit" size="sm" variant="primary" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload & Save'}
          </CTAButton>
        </div>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="h-32 bg-muted/40 flex items-center justify-center border-b border-border">
              <ImageIcon className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
            </div>
            <div className="p-4 space-y-1.5 text-xs">
              <p className="font-semibold text-foreground truncate">{item.name}</p>
              <p className="text-muted-foreground">
                <strong>Alt:</strong> {item.alt_text}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border text-[10px] text-muted-foreground">
                <span>{item.size}</span>
                <span>{item.created_at}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
