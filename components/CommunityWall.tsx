'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { ScrollBlurReveal, ScrollBlurText } from './ScrollBlurReveal';

const REVIEWS = [
  {
    id: 1,
    author: 'Alex Rivera',
    handle: '@mechkeebs_tokyo',
    role: 'Hardware Designer',
    rating: 5,
    tag: 'PRISMATIC HOLOGRAPHIC',
    quote:
      'The Japanese diffraction foil is unbelievable in person. We ordered 150 pieces for our mechanical keyboard meetup in Shibuya. The prismatic reflections look like actual luxury metal.',
    device: 'MacBook Pro & Keycaps',
    verified: true,
  },
  {
    id: 2,
    author: 'Marcus Thorne',
    handle: '@boulder_brewery',
    role: 'Brewery Founder',
    rating: 5,
    tag: '100% DISHWASHER SAFE',
    quote:
      'We run these through our commercial high-temp dishwasher cycles twice a week on Hydro Flasks and growlers. The solvent acrylic bond has not curled at the edges even after 6 months of boiling water.',
    device: 'Hydro Flasks & Growlers',
    verified: true,
  },
  {
    id: 3,
    author: 'Sarah Lin',
    handle: '@sarahvoxel',
    role: 'Design Director, Voxel Labs',
    rating: 5,
    tag: 'VELVET MATTE FINISH',
    quote:
      'The Velvet Matte finish is unlike anything from traditional sticker vendors. Completely eliminates glare and oil fingerprints. Peels off anodized aluminum with zero sticky residue.',
    device: 'Studio Audio Rigs & Laptops',
    verified: true,
  },
  {
    id: 4,
    author: 'Kenji Sato',
    handle: '@shibuya_push',
    role: 'Skate Photographer',
    rating: 5,
    tag: '6.0 MIL ARMORED VINYL',
    quote:
      'Slapped these on skate decks and helmets. Concrete impacts, grip tape abrasions, rain and salt. The polymeric 6-mil vinyl doesn’t tear or bubble. True street armor.',
    device: 'Skate Decks & Pelican Cases',
    verified: true,
  },
  {
    id: 5,
    author: 'Elena Rostova',
    handle: '@modular_pulse',
    role: 'Synthesizer Builder',
    rating: 5,
    tag: '1440 DPI REGISTRATION',
    quote:
      'Our sticker artwork had 0.25pt hairline schematics and micro typography. The Roland Japanese printhead printed every single sub-millimeter line tack-sharp without ink bleed.',
    device: 'Eurorack Panels & Cases',
    verified: true,
  },
  {
    id: 6,
    author: 'David Chen',
    handle: '@hyperlink_sf',
    role: 'Co-Founder @ Hyperlink',
    rating: 5,
    tag: '48H EXPRESS DISPATCH',
    quote:
      'Needed 500 custom holo die-cuts for our San Francisco developer keynote on 3 days notice. Sticker.pedia dispatched within 36 hours. Best print partner we’ve ever worked with.',
    device: 'Conference Merch & Laptops',
    verified: true,
  },
];

export const CommunityWall: React.FC = () => {
  return (
    <section id="community" className="py-20 sm:py-24 bg-[#0B0C0E] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Scroll Blur Reveal */}
        <ScrollBlurReveal direction="up" yOffset={28} blur="14px" duration={0.8} className="text-center max-w-3xl mx-auto mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-acid font-mono text-[11px] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-acid" />
              <span>REAL STORIES &bull; CREATOR REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
              <ScrollBlurText text="Loved by Over 14,000 Artists, Founders & Skaters" staggerDelay={0.035} blur="12px" />
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Real reviews from creators and brands slapping Sticker.pedia prints on gear around the world.
            </p>
          </div>
        </ScrollBlurReveal>

        {/* 3x2 Grid with Staggered Scroll Blur Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, rIdx) => (
            <ScrollBlurReveal
              key={review.id}
              delay={(rIdx % 3) * 0.1}
              duration={0.7}
              blur="12px"
              yOffset={24}
              className="h-full"
            >
              <TiltCard className="h-full rounded-[38px] sm:rounded-[42px] overflow-hidden" maxTilt={5}>
                <div className="h-full bg-[#121317] border border-white/[0.08] hover:border-white/[0.18] p-6 sm:p-7 rounded-[38px] sm:rounded-[42px] flex flex-col justify-between transition-colors duration-200">
                  <div>
                    {/* Rating & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center space-x-1" aria-label={`${review.rating} out of 5 stars`}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-acid text-acid" />
                        ))}
                      </div>

                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase text-acid bg-acid/10 border border-acid/20">
                        {review.tag}
                      </span>
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Card Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-white text-sm">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span title="Verified Customer">
                            <CheckCircle2 className="w-3.5 h-3.5 text-acid" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-[#71717A]">
                        {review.handle} &bull; <span>{review.role}</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-[#71717A]">
                      {review.device}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollBlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
