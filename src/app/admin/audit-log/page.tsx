'use client';

import React, { useState } from 'react';
import { AuditLogEntry } from '@/types';
import { Shield, Clock, FileText } from 'lucide-react';

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-1',
    user_email: 'admin@openheavens.org.uk',
    action: 'UPDATE',
    entity_type: 'events',
    entity_id: '1',
    old_values: { status: 'draft' },
    new_values: { status: 'published' },
    created_at: '2026-11-20T11:42:00Z',
  },
  {
    id: 'aud-2',
    user_email: 'admin@openheavens.org.uk',
    action: 'UPDATE',
    entity_type: 'site_settings',
    entity_id: '1',
    old_values: { primary_phone: '+44 (0)20 8952 0000' },
    new_values: { primary_phone: '+44 (0)20 8952 1234' },
    created_at: '2026-11-19T15:20:00Z',
  },
  {
    id: 'aud-3',
    user_email: 'media@openheavens.org.uk',
    action: 'INSERT',
    entity_type: 'sermons',
    entity_id: '1',
    new_values: { title: 'Living with Eternal Clarity', speaker: 'Pastor John Adebayo' },
    created_at: '2026-11-16T18:05:00Z',
  },
];

export default function AdminAuditLogPage() {
  const [logs] = useState<AuditLogEntry[]>(mockAuditLogs);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Audit Log Trail</h2>
        <p className="text-xs text-muted-foreground">
          Immutable history of system alterations, role changes, and content publication for charity
          governance and data accountability.
        </p>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Timestamp</th>
              <th className="p-3 font-semibold">User</th>
              <th className="p-3 font-semibold">Action</th>
              <th className="p-3 font-semibold">Entity Type</th>
              <th className="p-3 font-semibold">Modifications</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground">
                  {new Date(log.created_at).toLocaleString('en-GB')}
                </td>
                <td className="p-3 font-medium text-foreground">{log.user_email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      log.action === 'INSERT'
                        ? 'bg-admin-teal-surface text-admin-teal'
                        : log.action === 'UPDATE'
                        ? 'bg-info-surface text-info'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground font-mono">{log.entity_type}</td>
                <td className="p-3 text-muted-foreground font-mono max-w-xs truncate">
                  {JSON.stringify(log.new_values)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
