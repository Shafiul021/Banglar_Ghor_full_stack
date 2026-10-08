'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, Loader2, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@banlgarghor.com');
  const [password, setPassword] = useState('admin123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Invalid credentials. Please verify and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1B1A] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Return link */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#A8A196] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Public Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#252422] border border-white/10 p-8 sm:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 text-[#C9A979] flex items-center justify-center mx-auto mb-4">
            <Shield size={24} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A979] font-semibold block mb-1">
            Admin Management CMS
          </span>
          <h1 className="text-2xl font-editorial-heading font-medium text-white">
            Banlgar Ghor Studio Portal
          </h1>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3.5 bg-white/5 border border-[#C9A979]/30 rounded-sm">
          <div className="flex items-center gap-2 text-[#C9A979] text-xs font-semibold mb-1">
            <KeyRound size={13} />
            <span>Default Administrator Credentials</span>
          </div>
          <p className="text-[11px] text-[#DCD7CE] font-light">
            Email: <span className="font-mono text-white font-medium">admin@banlgarghor.com</span><br />
            Password: <span className="font-mono text-white font-medium">admin123456</span>
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#DCD7CE] mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#1C1B1A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#C9A979] transition-colors"
              />
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C867F]" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#DCD7CE] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#1C1B1A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#C9A979] transition-colors"
              />
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C867F]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
