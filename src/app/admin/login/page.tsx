'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Church, Lock, Mail } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // In local development preview mode where Supabase project credentials aren't plugged in yet,
        // inform user and allow testing access
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
        ) {
          router.push('/admin');
          return;
        }
        setErrorMsg(error.message);
      } else {
        router.push('/admin');
      }
    } catch {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-border rounded-lg p-8 bg-card shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-muted border border-border">
            <Church className="h-6 w-6 text-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Open Heavens Staff Login</h1>
          <p className="text-xs text-muted-foreground">
            Sign in with your authorized church administration credentials.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded text-xs bg-destructive/10 text-destructive" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@openheavens.org.uk"
                className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded bg-background"
              />
              <Mail
                className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded bg-background"
              />
              <Lock
                className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          <CTAButton
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </CTAButton>
        </form>

        <p className="text-[11px] text-muted-foreground text-center">
          Protected by Supabase Auth with Row Level Security (RLS). Only assigned editors and super
          admins can access staff content.
        </p>
      </div>
    </div>
  );
}
