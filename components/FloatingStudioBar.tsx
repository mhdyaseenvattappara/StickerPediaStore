'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';

export const FloatingStudioBar: React.FC = () => {
  const [showScrollActions, setShowScrollActions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollActions(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 pointer-events-auto">
      {/* Scroll Actions (Custom Studio & Scroll to Top) */}
      <AnimatePresence>
        {showScrollActions && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            {/* Quick Customizer CTA */}
            <a
              href="#customizer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#121317]/90 hover:bg-[#18191E] border border-white/[0.1] hover:border-acid/40 text-white text-xs font-mono font-medium backdrop-blur-xl shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-acid" />
              <span>Studio</span>
            </a>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              className="w-10 h-10 rounded-full bg-[#121317]/90 hover:bg-[#18191E] border border-white/[0.1] hover:border-white/30 text-[#9CA3AF] hover:text-white flex items-center justify-center backdrop-blur-xl shadow-lg transition-all cursor-pointer active:scale-90"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Contact Button */}
      <motion.a
        href="https://wa.me/919845011223?text=Hi%20Sticker.pedia%20Team%2C%20I%20have%20a%20question%20about%20custom%20stickers"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        title="Chat with us on WhatsApp"
        aria-label="Chat with Sticker.pedia on WhatsApp"
        className="inline-flex items-center space-x-2.5 px-4 sm:px-4.5 py-2.5 rounded-full bg-[#121317]/95 hover:bg-[#18191E] border border-white/10 hover:border-[#25D366]/60 text-white shadow-xl backdrop-blur-xl transition-colors duration-200 cursor-pointer group"
      >
        {/* Live Active Online Indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-4 h-4 fill-[#25D366] shrink-0 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Text */}
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
          Connect Us 👋
        </span>
      </motion.a>
    </div>
  );
};
