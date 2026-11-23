'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Calendar,
  Layers,
  Users2,
  UserCheck,
  Video,
  Baby,
  FileText,
  Inbox,
  Image as ImageIcon,
  ShieldAlert,
  LogOut,
  Church,
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/submissions', label: 'Submissions Inbox', icon: Inbox },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/ministries', label: 'Ministries', icon: Layers },
  { href: '/admin/home-groups', label: 'Home Groups', icon: Users2 },
  { href: '/admin/sermons', label: 'Sermons / Watch', icon: Video },
  { href: '/admin/young-saints', label: 'Young Saints', icon: Baby },
  { href: '/admin/leaders', label: 'Leaders & Team', icon: UserCheck },
  { href: '/admin/pages', label: 'Page Content', icon: FileText },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/users', label: 'User Roles', icon: ShieldAlert },
  { href: '/admin/audit-log', label: 'Audit Log', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on login page, don't show admin sidebar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-muted/20 flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="h-16 border-b border-border px-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-sm text-foreground">
            <Church className="h-5 w-5" aria-hidden="true" />
            <span>Staff Portal</span>
          </Link>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">
            Admin
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground rounded hover:bg-muted"
          >
            ← View Public Site
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 rounded font-medium"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground">Open Heavens Church Admin</h1>
            <span className="text-xs text-muted-foreground">| Edgware, London</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-admin-teal inline-block" aria-hidden="true" />
            <span>System Online (Supabase RLS Active)</span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
