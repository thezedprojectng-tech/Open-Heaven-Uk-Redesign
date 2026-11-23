'use client';

import React, { useState } from 'react';
import { FormSubmission } from '@/types';
import { Trash2, CheckCircle2, Filter } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { updateSubmissionStatusAction, deleteSubmissionAction } from '@/lib/actions/admin';

const mockSubmissions: FormSubmission[] = [
  {
    id: 'sub-1',
    form_type: 'visitor',
    payload: {
      fullName: 'Emma Watson',
      email: 'emma@example.com',
      phone: '07123 456789',
      preferredServiceDate: '2026-11-29',
      bringingFamily: true,
      prayerRequestOrQuestions: 'Looking forward to visiting with my two young children.',
    },
    status: 'new',
    retention_days: 90,
    created_at: '2026-11-20T10:15:00Z',
  },
  {
    id: 'sub-2',
    form_type: 'prayer',
    payload: {
      fullName: 'Brother Mark',
      email: 'mark@example.com',
      isConfidential: true,
      prayerTopic: 'Please pray for full recovery from recent surgery and family peace.',
    },
    status: 'new',
    retention_days: 90,
    created_at: '2026-11-19T14:30:00Z',
  },
  {
    id: 'sub-3',
    form_type: 'home_group',
    payload: {
      groupName: 'Stanmore & Canons Park Group',
      groupArea: 'Stanmore',
      fullName: 'Tolu Ade',
      email: 'tolu@example.com',
      phone: '07987 654321',
      preferredContactMethod: 'whatsapp',
      notes: 'Recently moved to Stanmore, looking to connect.',
    },
    status: 'handled',
    retention_days: 90,
    created_at: '2026-11-18T16:00:00Z',
  },
  {
    id: 'sub-4',
    form_type: 'contact',
    payload: {
      fullName: 'Cllr David Hughes',
      email: 'david.hughes@barnet.gov.uk',
      subject: 'Community Food Hub Partnership',
      message: 'Hello, I would like to discuss linking local residents with your Saturday Food Hub.',
    },
    status: 'new',
    retention_days: 180,
    created_at: '2026-11-17T09:20:00Z',
  },
];

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>(mockSubmissions);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedSub, setSelectedSub] = useState<FormSubmission | null>(null);

  const filtered = submissions.filter((s) => (typeFilter === 'all' ? true : s.form_type === typeFilter));

  async function toggleStatus(id: string) {
    const sub = submissions.find((s) => s.id === id);
    if (!sub) return;
    const newStatus = sub.status === 'new' ? 'handled' : 'new';
    const res = await updateSubmissionStatusAction(id, newStatus);
    if (res.success) {
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
      if (selectedSub?.id === id) {
        setSelectedSub({ ...selectedSub, status: newStatus });
      }
    } else {
      alert(res.error || 'Failed to update status.');
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this submission record?')) {
      const res = await deleteSubmissionAction(id);
      if (res.success) {
        setSubmissions(submissions.filter((s) => s.id !== id));
        if (selectedSub?.id === id) setSelectedSub(null);
      } else {
        alert(res.error || 'Failed to delete submission.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Submissions Inbox</h2>
          <p className="text-xs text-muted-foreground">
            Manage incoming contact inquiries, prayer requests, visitor registrations, and home
            group requests with audit log tracking.
          </p>
        </div>

        {/* Filter by type */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2 py-1 text-xs border border-input rounded bg-background"
          >
            <option value="all">All Inquiries ({submissions.length})</option>
            <option value="visitor">Visitors</option>
            <option value="prayer">Prayer Requests</option>
            <option value="home_group">Home Group Requests</option>
            <option value="contact">General Contact</option>
            <option value="young_saints">Young Saints</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Submissions */}
        <div className="lg:col-span-8 border border-border rounded-lg bg-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Sender</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((sub) => {
                const payload = sub.payload as any;
                return (
                  <tr
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={`cursor-pointer hover:bg-muted/30 ${
                      selectedSub?.id === sub.id ? 'bg-muted/40 font-semibold' : ''
                    }`}
                  >
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-muted text-muted-foreground">
                        {sub.form_type}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-foreground">
                      {payload.fullName || payload.parentName}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(sub.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          sub.status === 'new'
                            ? 'bg-warning-surface text-warning'
                            : 'bg-admin-teal-surface text-admin-teal'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleStatus(sub.id)}
                        className="p-1 hover:text-foreground text-muted-foreground"
                        title="Toggle handled status"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 inline" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1 hover:text-destructive text-muted-foreground"
                        title="Delete submission"
                      >
                        <Trash2 className="h-3.5 w-3.5 inline" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail Inspector Pane */}
        <div className="lg:col-span-4 border border-border rounded-lg p-5 bg-card space-y-4">
          <h3 className="text-sm font-bold text-foreground">Submission Inspector</h3>
          {selectedSub ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                  Category
                </span>
                <p className="font-bold text-foreground uppercase">{selectedSub.form_type}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                  Date Received
                </span>
                <p className="text-foreground">
                  {new Date(selectedSub.created_at).toLocaleString('en-GB')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                  Payload Details
                </span>
                <pre className="p-3 rounded bg-muted/40 border border-border overflow-x-auto text-[11px] font-mono leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(selectedSub.payload, null, 2)}
                </pre>
              </div>

              <div className="pt-2 flex gap-2">
                <CTAButton
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => toggleStatus(selectedSub.id)}
                >
                  Mark as {selectedSub.status === 'new' ? 'Handled' : 'New'}
                </CTAButton>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Select any submission row on the left to inspect full payload, notes, and contact
              details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
