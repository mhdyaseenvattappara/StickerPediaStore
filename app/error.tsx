'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, ShieldAlert, ArrowRight, Cpu } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console for diagnostics
    console.error('[Sticker.pedia Error Boundary Caught]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F4F6] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-acid selection:text-black">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2227_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-xl rounded-[36px] sm:rounded-[44px] bg-[#121317] border border-white/[0.08] shadow-xl p-6 sm:p-10 text-center">
        {/* Warning Pip */}
        <div className="mx-auto w-16 h-16 rounded-[24px] bg-[#18191E] border border-white/10 flex items-center justify-center text-acid mb-6">
          <AlertTriangle className="w-8 h-8 stroke-[1.8]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400 font-semibold tracking-wider uppercase mb-3">
          <span>NOTICE &bull; SYSTEM EXCEPTION</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white mb-3">
          We Hit a Small Snag
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6 max-w-md mx-auto font-sans">
          An unexpected issue occurred while loading this page. Please try refreshing or return to the shop.
        </p>

        {/* Technical Error Box */}
        <div className="p-4 sm:p-5 rounded-[24px] bg-[#0E0F12] border border-white/[0.08] text-left mb-8 font-mono text-[11px] space-y-1.5 overflow-x-auto">
          <div className="flex items-center justify-between text-[#9CA3AF] border-b border-white/[0.08] pb-1.5 mb-1.5">
            <span className="flex items-center space-x-1.5 text-acid">
              <Cpu className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC REPORT</span>
            </span>
            <span className="text-[10px] text-zinc-500">
              {error.digest ? `DIGEST: ${error.digest.slice(0, 12)}` : 'CODE: ERR_RETRY'}
            </span>
          </div>
          <div className="text-red-400 break-words font-medium">
            {error.message || 'An unknown render or data stream fault occurred.'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black font-semibold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-black" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Home className="w-4 h-4 text-[#9CA3AF]" />
            <span>Return to Shop</span>
          </Link>

          <Link
            href="/admin"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[#9CA3AF] hover:text-white font-medium text-xs flex items-center justify-center space-x-1 transition-all active:scale-95"
          >
            <span>Staff Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-[10px] font-mono text-[#9CA3AF] flex items-center justify-between">
          <span>Sticker.pedia Studio</span>
          <span className="text-acid">Need Help? contact@sticker.pedia</span>
        </div>
      </div>
    </div>
  );
}
