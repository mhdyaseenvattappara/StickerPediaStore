'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  User,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { useStickerStore } from '@/lib/store';
export const Navbar: React.FC = () => {
  const { customer, isCustomerLoggedIn } = useStickerStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Drops', href: '/#collections' },
    { label: 'Studio', href: '/#customizer' },
    { label: 'Materials', href: '/#materials' },
    { label: 'Reviews', href: '/#community' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-300 w-full max-w-5xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border ${
            isScrolled
              ? 'bg-[#111215]/90 backdrop-blur-xl border-white/[0.12] shadow-lg'
              : 'bg-[#111215]/70 backdrop-blur-md border-white/[0.08] shadow-md'
          }`}
          aria-label="Primary Navigation"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 group"
            aria-label="Sticker.pedia Home"
          >
            <img
              src="/brand-logo.png"
              alt="Sticker.pedia Logo"
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all tracking-wide ${
                  isScrolled
                    ? 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.06]'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Group */}
          <div className="flex items-center space-x-2.5">
            {/* Customer Profile & Address Page Link */}
            <Link
              href={isCustomerLoggedIn ? '/profile' : '/login'}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[#D1D5DB] hover:text-white text-xs font-mono transition-all cursor-pointer"
              title={isCustomerLoggedIn ? `Account: ${customer.name || 'Profile'}` : 'Sign In or Create Account'}
              aria-label="Account Profile"
            >
              <User className="w-3.5 h-3.5 text-acid" />
              <span className="hidden sm:inline text-[11px]">
                {isCustomerLoggedIn ? (customer.name ? customer.name.split(' ')[0] : 'Profile') : 'Log In'}
              </span>
              {isCustomerLoggedIn && (
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-acid" />
              )}
            </Link>

            {/* Customizer CTA */}
            <a
              href="/#customizer"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold text-xs transition-all active:scale-95 shadow-sm bg-acid hover:bg-acid-hover text-black"
            >
              <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Custom Stickers</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-acid" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden p-5 rounded-[38px] bg-[#121316]/95 border border-white/[0.12] backdrop-blur-2xl shadow-xl flex flex-col space-y-3"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[11px] font-mono text-acid uppercase tracking-wider font-semibold">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#9CA3AF] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                href={isCustomerLoggedIn ? '/profile' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-white/[0.06] text-white text-sm font-medium transition-all"
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-acid" />
                  <span>{isCustomerLoggedIn ? `My Profile (${customer.name.split(' ')[0]})` : 'Client Login / Sign Up'}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </Link>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-white/[0.06] text-white text-sm font-medium transition-all"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <a
                href="/#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-acid text-black font-semibold text-xs tracking-tight shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Design Custom Stickers</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
