'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock } from 'lucide-react';
import { ScrollBlurReveal } from './ScrollBlurReveal';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#0B0C0E] border-t border-white/[0.08] text-[#9CA3AF] overflow-hidden" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Official Brand Info & Coordinates with Scroll Blur Reveal */}
          <ScrollBlurReveal direction="left" blur="12px" duration={0.8} yOffset={20} className="lg:col-span-7">
            <div className="flex flex-col justify-between">
              {/* Brand Logo */}
            <div className="mb-4">
              <Link
                href="/"
                className="inline-block group"
                aria-label="Sticker.pedia Home"
              >
                <img
                  src="/brand-logo.png"
                  alt="Sticker.pedia Brand Logo"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
                />
              </Link>
            </div>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans leading-relaxed max-w-lg mb-6">
              A custom sticker studio dedicated to quality craftsmanship. Prismatic holographic foils, buttery soft-touch matte, and thick waterproof vinyl made for modern brands, streetwear labels, artists, and creators worldwide.
            </p>

            {/* Production Hub Coordinates */}
            <div className="text-xs font-mono text-[#9CA3AF] leading-relaxed space-y-1 mb-8">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span>Sticker.pedia Print Studio &bull; Handcrafted Quality</span>
              </div>
              <p>
                Inquiries:{' '}
                <a href="mailto:contact@sticker.pedia" className="text-acid hover:underline">
                  contact@sticker.pedia
                </a>{' '}
                &bull; Support:{' '}
                <a href="mailto:support@sticker.pedia" className="text-zinc-300 hover:text-acid transition-colors">
                  support@sticker.pedia
                </a>
              </p>
              <p>
                WhatsApp Direct:{' '}
                <a
                  href="https://wa.me/919845011223?text=Hi%20Sticker.pedia%20Team"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-acid transition-colors"
                >
                  +91 98450 11223
                </a>{' '}
                &bull; Hours: Mon - Sat, 09:00 - 19:00 IST
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 mb-8">
              {/* Instagram */}
              <a
                href="https://instagram.com/sticker.pedia"
                target="_blank"
                rel="noreferrer"
                title="@sticker.pedia on Instagram"
                aria-label="Sticker.pedia Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] text-[#A1A1AA] hover:text-white hover:bg-white/[0.1] border border-white/[0.08] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/stickerpedia"
                target="_blank"
                rel="noreferrer"
                title="@stickerpedia on X"
                aria-label="Sticker.pedia on X"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] text-[#A1A1AA] hover:text-white hover:bg-white/[0.1] border border-white/[0.08] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919845011223?text=Hi%20Sticker.pedia%20Team"
                target="_blank"
                rel="noreferrer"
                title="Chat on WhatsApp (+91 98450 11223)"
                aria-label="Sticker.pedia WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] text-[#A1A1AA] hover:text-white hover:bg-white/[0.1] border border-white/[0.08] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>

            {/* Copyright & Staff Portal */}
            <div className="text-xs font-mono text-[#71717A] flex flex-wrap items-center gap-2">
              <span>&copy; {new Date().getFullYear()} Sticker.pedia Printworks Inc. All rights reserved.</span>
              <span className="hidden sm:inline">&bull;</span>
              <Link
                href="/admin"
                className="text-[#71717A] hover:text-acid transition-colors inline-flex items-center space-x-1"
                title="Staff Portal (Restricted)"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        </ScrollBlurReveal>

        {/* Right Column: Clean Minimal Subscription Box with Scroll Blur Reveal */}
        <ScrollBlurReveal direction="right" delay={0.12} blur="12px" duration={0.8} yOffset={20} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-[38px] sm:rounded-[44px] bg-[#09090B] border border-white/[0.08] flex flex-col">
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">
              Stay Updated on Drops
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-5">
              Subscribe for notification of limited holographic batches, new substrates, and sample pack releases.
            </p>

            <form onSubmit={handleSubscribe} className="w-full space-y-3">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-full bg-[#0C0C0E] border border-white/[0.1] text-white text-xs font-sans placeholder:text-[#71717A] focus:border-acid focus:outline-none transition-all"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black font-semibold text-xs tracking-tight transition-transform active:scale-95 shadow-sm cursor-pointer"
              >
                Subscribe
              </button>

              {subscribed && (
                <div className="text-xs font-mono text-acid flex items-center justify-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for updates.</span>
                </div>
              )}
            </form>
          </div>
        </ScrollBlurReveal>
      </div>
    </div>
  </footer>
  );
};
