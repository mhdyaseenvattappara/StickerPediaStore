'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const DEFAULT_MARQUEE_ITEMS = [
  'WATERPROOF & DISHWASHER SAFE',
  'THICK WEATHERPROOF VINYL',
  'PRISMATIC HOLOGRAPHIC FOIL',
  'EASY CLEAN-PEEL LINER',
  'FAST 24-48H DISPATCH',
  'FREE DIGITAL CUTLINE PROOFS',
  'ZERO-GLARE VELVET MATTE',
  'CRAFTED FOR CREATORS & BRANDS',
];

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = DEFAULT_MARQUEE_ITEMS,
  speed = 35,
  reverse = false,
  className = '',
}) => {
  const content = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3 bg-[#0B0C0E] border-y border-white/[0.06] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#0B0C0E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#0B0C0E] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center space-x-8 sm:space-x-12"
        style={{ willChange: 'transform' }}
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {content.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-8 sm:space-x-12 text-xs font-mono tracking-widest uppercase"
          >
            <span className="text-[#71717A] hover:text-[#D4D4D8] transition-colors font-medium">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-acid/60 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
