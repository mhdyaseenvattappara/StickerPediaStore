'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Building,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStickerStore } from '@/lib/store';

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/profile';

  const { signupClient } = useStickerStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Optional shipping details
  const [showShippingFields, setShowShippingFields] = useState(false);
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept terms & conditions to create your account.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = signupClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        place: place.trim(),
        district: district.trim(),
        pinCode: pinCode.trim(),
        state: state.trim(),
        country: country.trim() || 'India',
      });

      if (!res.success) {
        setError(res.error || 'Unable to register account.');
        setIsSubmitting(false);
        return;
      }

      setSignupSuccess(true);
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 500);
    } catch (err) {
      console.error(err);
      setError('An error occurred during account creation. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col justify-between relative selection:bg-acid selection:text-black">
      {/* Background ambient structure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#1E2330] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Header */}
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

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="liquid-glass-card p-6 sm:p-8 rounded-[32px] border border-white/[0.1] shadow-2xl relative"
        >
          {/* Top Pill */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                New Account Registration
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8E95A2]">Free &bull; Instant</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create client account
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed">
              Register once to save your delivery coordinates, order custom stickers, and monitor batch printing in real time.
            </p>
          </div>

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

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-mono font-medium text-[#D1D5DB] mb-1.5 uppercase tracking-wider"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                  <input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-mono font-medium text-[#D1D5DB] mb-1.5 uppercase tracking-wider"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                  <input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="alex@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-mono font-medium text-[#D1D5DB] mb-1.5 uppercase tracking-wider"
                >
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="At least 6 chars"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
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

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-mono font-medium text-[#D1D5DB] mb-1.5 uppercase tracking-wider"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                  <input
                    id="signup-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Collapsible Delivery Coordinates Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowShippingFields(!showShippingFields)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-[#D1D5DB] transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-acid" />
                  <span>Add Delivery Coordinates (Optional Now)</span>
                </div>
                {showShippingFields ? (
                  <ChevronUp className="w-4 h-4 text-[#8E95A2]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8E95A2]" />
                )}
              </button>

              <AnimatePresence>
                {showShippingFields && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-3 overflow-hidden pt-1"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E95A2]" />
                          <input
                            type="tel"
                            placeholder="+91 98450 11223"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          Place / Street Address
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E95A2]" />
                          <input
                            type="text"
                            placeholder="Flat / Floor, Street Address"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          District / City
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          placeholder="PIN"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl liquid-glass-input text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-1">
              <label className="flex items-center space-x-2 text-xs text-[#9CA3AF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded bg-black/40 border-white/20 text-acid focus:ring-acid/40"
                />
                <span>I agree to client terms and expedited sticker order processing.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || signupSuccess}
              className="w-full py-3.5 px-6 rounded-2xl bg-acid hover:bg-acid-hover text-black font-bold text-sm tracking-tight transition-transform active:scale-95 flex items-center justify-center space-x-2 shadow-sm disabled:opacity-75 cursor-pointer mt-3"
            >
              {signupSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Account Created! Launching profile...</span>
                </>
              ) : isSubmitting ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
            <p className="text-xs text-[#9CA3AF]">
              Already have an account?{' '}
              <Link
                href={`/login${redirectPath !== '/profile' ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`}
                className="text-acid hover:underline font-semibold"
              >
                Log in instead
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-center text-[11px] font-mono text-[#8E95A2]">
          <ShieldCheck className="w-3.5 h-3.5 text-acid" />
          <span>Local client vault secured &bull; Instant order sync ready</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#8E95A2] font-mono">
        &copy; {new Date().getFullYear()} Sticker Pedia Official. All rights reserved.
      </footer>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center font-mono text-sm">
          Loading registration portal...
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}
