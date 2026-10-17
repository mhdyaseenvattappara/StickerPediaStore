import React from 'react';
import Link from 'next/link';
import { PackageX, Home, Search, Scissors, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F4F6] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-acid selection:text-black">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2227_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg rounded-[36px] sm:rounded-[44px] bg-[#121317] border border-white/[0.08] shadow-xl p-6 sm:p-10 text-center">
        {/* 404 Badge */}
        <div className="mx-auto w-20 h-20 rounded-[28px] bg-[#18191E] border border-white/10 flex flex-col items-center justify-center text-acid mb-6 relative">
          <PackageX className="w-9 h-9 stroke-[1.8]" />
          <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#121317] border border-acid/50 text-[10px] font-mono text-acid font-bold">
            404
          </span>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-acid/10 border border-acid/30 text-[10px] font-mono text-acid font-semibold tracking-wider uppercase mb-3">
          <span>PAGE NOT FOUND</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white mb-3">
          This Sticker Got Peeled Away
        </h1>

        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-sm mx-auto font-sans">
          We couldn&apos;t find the page or sticker you were looking for. Let&apos;s get you back to our collections.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black font-semibold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Return to Shop</span>
          </Link>

          <Link
            href="/#collections"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Search className="w-4 h-4 text-[#9CA3AF]" />
            <span>Browse Stickers</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-[10px] font-mono text-[#9CA3AF] flex items-center justify-between">
          <span>Sticker.pedia Studio</span>
          <Link href="/admin" className="text-[#9CA3AF] hover:text-acid transition-colors">
            Staff Portal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
