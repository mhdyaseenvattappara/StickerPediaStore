'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { ScrollBlurReveal, ScrollBlurText } from './ScrollBlurReveal';

export const MaterialsLab: React.FC = () => {
  const mockups = [
    {
      image: '/mockups/laptop-stickers.jpg',
      category: 'STUDIO & TECH GEAR',
      title: 'Laptops, Keys & Pelican Rigs',
      desc: 'Formulated with ultra-clean release adhesive. Stays locked for 5+ years, but peels completely residue-free whenever you upgrade your MacBook or synthesizer.',
      highlight: 'Zero Residue',
    },
    {
      image: '/mockups/bottle-stickers.jpg',
      category: '100% DISHWASHER SAFE',
      title: 'Hydro Flasks & Outdoor Abuse',
      desc: 'Tested through commercial high-temp dishwasher cycles, ice water baths, and ocean salt spray. The solvent acrylic bond never wrinkles or lifts at the corners.',
      highlight: 'Boil & Freeze Tested',
    },
    {
      image: '/mockups/skate-stickers.jpg',
      category: 'STREET ARMOR',
      title: 'Skate Decks, Helmets & Curbs',
      desc: 'Built with heavy 6.0-mil polymeric vinyl and anti-scuff laminate. Designed to take concrete impacts, abrasive grip tape, and daily skate park abuse without tearing.',
      highlight: '6.0 Mil Heavy Vinyl',
    },
  ];

  const layers = [
    { step: '01', title: 'UV Shield Armor Coat', desc: 'Prevents fading and yellowing from harsh sunlight.' },
    { step: '02', title: 'High-Pigment Eco Inks', desc: '1440 DPI Japanese printhead registration with razor-sharp contrast.' },
    { step: '03', title: '6-Mil Vinyl Substrate', desc: 'Pliable, bubble-resistant core with micro-contour die-cut outline.' },
    { step: '04', title: 'Permanent Solvent Adhesive', desc: 'Marine-grade grip that bonds to metal, glass, plastic, and painted surfaces.' },
    { step: '05', title: '100lb Easy-Peel Liner', desc: 'Laser-scored back split for quick, frustration-free peeling.' },
  ];

  return (
    <section id="materials" className="py-20 sm:py-24 bg-[#0B0C0E] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Blur Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <ScrollBlurReveal direction="up" yOffset={28} blur="14px" duration={0.8}>
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-acid font-mono text-[11px] tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span>BUILT TO LAST &bull; CRAFTED FOR REAL LIFE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <ScrollBlurText text="Materials & Finishes That Last" staggerDelay={0.04} blur="12px" />
              </h2>
              <p className="text-sm font-sans text-[#9CA3AF] mt-2 max-w-xl">
                We obsess over paper weight, adhesive strength, and protective laminates so your stickers stay vibrant through dishwashers, skate parks, and years of sunlight.
              </p>
            </div>
          </ScrollBlurReveal>

          <ScrollBlurReveal direction="up" delay={0.15} yOffset={20} blur="12px">
            <a
              href="#customizer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-xs tracking-tight transition-all self-start md:self-auto group cursor-pointer"
            >
              <span>Design Custom Stickers</span>
              <ArrowRight className="w-3.5 h-3.5 text-acid group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollBlurReveal>
        </div>

        {/* 3-Column Lifestyle Mockup Showcase with Staggered Scroll Blur Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {mockups.map((item, idx) => (
            <ScrollBlurReveal
              key={idx}
              delay={idx * 0.12}
              duration={0.75}
              blur="14px"
              yOffset={24}
              className="h-full"
            >
              <TiltCard className="h-full rounded-[38px] sm:rounded-[42px] overflow-hidden" maxTilt={6}>
                <div className="group bg-[#121317] border border-white/[0.08] hover:border-white/[0.18] h-full flex flex-col justify-between overflow-hidden rounded-[38px] sm:rounded-[42px] transition-all duration-300">
                  {/* Photo Area */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-black/80 border border-white/20 text-acid">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 bg-black/80 border border-white/10">
                        {item.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-acid transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center space-x-2 text-xs font-mono text-[#9CA3AF]">
                      <Check className="w-3.5 h-3.5 text-acid shrink-0" />
                      <span className="text-zinc-300">Heavy 6-Mil Polymeric Vinyl</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollBlurReveal>
          ))}
        </div>

        {/* 5 Physical Layers Minimal Anatomy with Scroll Blur Reveal */}
        <ScrollBlurReveal direction="up" delay={0.1} yOffset={24} blur="14px">
          <div className="rounded-[38px] sm:rounded-[44px] bg-[#121317] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono text-acid uppercase tracking-wider block mb-1">
                  LAYER ANATOMY
                </span>
                <h3 className="font-bold text-xl sm:text-2xl text-white">
                  How Our Stickers Are Built
                </h3>
              </div>
              <p className="text-xs font-mono text-[#9CA3AF] max-w-md">
                Every sticker is a multi-ply engineered laminate crafted for outdoor longevity, dishwasher safety, and clean release.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {layers.map((layer, lIdx) => (
                <ScrollBlurReveal
                  key={layer.step}
                  delay={0.15 + lIdx * 0.08}
                  blur="10px"
                  yOffset={16}
                  duration={0.6}
                >
                  <div
                    className="p-4 sm:p-5 rounded-[24px] bg-[#16181E] border border-white/[0.06] hover:border-white/[0.15] transition-all h-full"
                  >
                    <span className="text-xs font-mono font-bold text-acid block mb-1.5">
                      LAYER {layer.step}
                    </span>
                    <h4 className="font-bold text-white text-sm mb-1 leading-snug">
                      {layer.title}
                    </h4>
                    <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </ScrollBlurReveal>
              ))}
            </div>
          </div>
        </ScrollBlurReveal>
      </div>
    </section>
  );
};
