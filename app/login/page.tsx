'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStickerStore } from '@/lib/store';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/profile';

  const { loginClient, isCustomerLoggedIn, customer } = useStickerStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // If already logged in, show friendly prompt or direct redirect
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = loginClient(email.trim(), password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 500);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col justify-between relative selection:bg-acid selection:text-black">
      {/* Subtle background ambient structure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#1E2330] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Top Header / Brand Nav */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2.5 group"
          aria-label="Return to Sticker.pedia storefront"
        >
          <img
            src="/brand-logo.png"
            alt="Sticker.pedia"
            className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#9CA3AF] hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="liquid-glass-card p-6 sm:p-8 rounded-[32px] border border-white/[0.1] shadow-2xl relative"
        >
          {/* Card Top Label */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                Client Portal
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8E95A2]">Secure Access</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed">
              Log in to manage your sticker orders, saved delivery coordinates, and live print queue status.
            </p>
          </div>

          {/* Already logged in hint */}
          {isCustomerLoggedIn && (
            <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="text-xs">
                <p className="text-white font-medium">Logged in as {customer.name || customer.email}</p>
                <p className="text-[11px] text-[#9CA3AF]">Would you like to open your profile?</p>
              </div>
              <Link
                href="/profile"
                className="px-3 py-1.5 rounded-xl bg-acid text-black font-semibold text-xs transition-transform active:scale-95"
              >
                Go to Profile
              </Link>
            </div>
          )}

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{error}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="client-login-email"
                className="block text-xs font-mono font-medium text-[#D1D5DB] mb-1.5 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                <input
                  id="client-login-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="client-login-password"
                  className="block text-xs font-mono font-medium text-[#D1D5DB] uppercase tracking-wider"
                >
                  Password
                </label>
                <span className="text-[11px] text-[#8E95A2] font-mono">
                  Standard Login
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                <input
                  id="client-login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2] hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 pb-1">
              <label className="flex items-center space-x-2 text-xs text-[#9CA3AF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-black/40 border-white/20 text-acid focus:ring-acid/40"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loginSuccess}
              className="w-full py-3.5 px-6 rounded-2xl bg-acid hover:bg-acid-hover text-black font-bold text-sm tracking-tight transition-transform active:scale-95 flex items-center justify-center space-x-2 shadow-sm disabled:opacity-75 cursor-pointer mt-2"
            >
              {loginSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Authenticated! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <span>Checking credentials...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
            <p className="text-xs text-[#9CA3AF]">
              New to Sticker.pedia?{' '}
              <Link
                href={`/signup${redirectPath !== '/profile' ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`}
                className="text-acid hover:underline font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security / trust badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-center text-[11px] font-mono text-[#8E95A2]">
          <ShieldCheck className="w-3.5 h-3.5 text-acid" />
          <span>Encrypted client session &bull; Fast sticker checkout enabled</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#8E95A2] font-mono">
        &copy; {new Date().getFullYear()} Sticker Pedia Official. All rights reserved.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center font-mono text-sm">
          Loading authentication portal...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
