'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollBlurReveal, ScrollBlurText } from './ScrollBlurReveal';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'file-formats',
    question: 'What file formats do you accept for custom die-cut stickers?',
    answer:
      'Vector files (.AI, .EPS, .PDF, .SVG) with embedded cutlines are ideal, but high-resolution raster images (300+ DPI PNG or TIFF with transparent backgrounds) work great too. Our prepress RIP software automatically generates smooth micro-contour cut paths with bleed protection.',
  },
  {
    id: 'durability',
    question: 'Are your stickers waterproof, weatherproof, and UV-resistant?',
    answer:
      'Yes, 100%. All stickers are precision printed onto commercial 6-mil vinyl with permanent solvent acrylic adhesive and finished with outdoor-grade UV barrier laminates. They are dishwasher safe, pressure-washer rated, and tested for 5+ years of direct sun exposure without fading or peeling.',
  },
  {
    id: 'holographic-vs-matte',
    question: 'What is the difference between Prismatic Holographic and Velvet Matte?',
    answer:
      'Prismatic Holographic utilizes micro-embossed Japanese diffraction foil that refracts ambient light into dynamic rainbow beams. Velvet Matte features a zero-glare, silk-touch protective over-laminate that eliminates surface reflections and fingerprints, engineered for laptops and electronics.',
  },
  {
    id: 'turnaround-queue',
    question: 'How fast is production and how does the live queue work?',
    answer:
      'Once you enter your delivery coordinates, your job is automatically dispatched to our Roland TrueVIS RIP queue. Custom batches typically print and cure within 24 to 48 hours, followed by express tracked shipping straight to your address.',
  },
  {
    id: 'minimum-orders',
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'There is no minimum for standard catalog drops and sample packs—you can order individual units. For custom die-cut production runs, batches start at just 10 pieces, with automated wholesale tier discounting at 50, 100, 250, and 500+ stickers.',
  },
  {
    id: 'sample-packs',
    question: 'Can I test finishes and substrates before placing a bulk order?',
    answer:
      'Yes! You can order our curated Sample Pack directly from the catalog. Each sample kit includes samples of Prismatic Holographic, Velvet Matte, High-Gloss UV, and Optical Clear Polyester on real substrate sheets so you can test tactile adhesion and durability.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('file-formats');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-24 bg-[#0B0C0E] border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Semantic Headline & Description with Scroll Blur Reveal */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ScrollBlurReveal direction="left" blur="14px" duration={0.8} yOffset={24}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-acid font-mono text-[11px] tracking-wider uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
                <ScrollBlurText text="Everything You Need to Know" staggerDelay={0.04} blur="12px" />
              </h2>

              <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-md font-sans">
                Details on custom vinyl printing, contour die-cutting, turnaround times, and materials.
              </p>

              <div className="mt-8 pt-8 border-t border-white/[0.08] flex items-center gap-6 text-xs font-mono text-[#9CA3AF]">
                <div>
                  <span className="text-white font-bold block text-sm">24-48H</span>
                  <span>Turnaround</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="text-white font-bold block text-sm">100%</span>
                  <span>Waterproof</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="text-white font-bold block text-sm">6.0 MIL</span>
                  <span>Thick Vinyl</span>
                </div>
              </div>
            </ScrollBlurReveal>
          </div>

          {/* Right Column: Clean Minimal Accordions with Staggered Scroll Blur Reveal */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <ScrollBlurReveal
                  key={item.id}
                  delay={idx * 0.07}
                  blur="10px"
                  yOffset={18}
                  duration={0.65}
                >
                  <div
                    className={`rounded-[32px] sm:rounded-[36px] border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-[#121317] border-white/20 p-5 sm:p-6'
                        : 'bg-[#0E0F12] border-white/[0.08] hover:border-white/15 p-5 sm:p-6'
                    }`}
                  >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="font-semibold text-sm sm:text-base text-white tracking-tight leading-snug">
                      {item.question}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? 'bg-acid text-black'
                          : 'bg-white/[0.04] text-[#A1A1AA]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="pt-3 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-2xl">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollBlurReveal>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
