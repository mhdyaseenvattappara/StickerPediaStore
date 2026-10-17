'use client';

import React, { useId } from 'react';
import { FinishType } from '@/lib/types';

interface StickerVisualProps {
  finish: FinishType;
  iconName?: string;
  name?: string;
  size?: number; // size in px, default 160
  tiltX?: number;
  tiltY?: number;
  interactive?: boolean;
  className?: string;
  showBorder?: boolean;
  imageUrl?: string;
}

const STICKER_ARTWORK_MAP: Record<string, string> = {
  skull: '/stickers/streetwear-skull.png',
  smile: '/stickers/acid-smile.png',
  cpu: '/stickers/anime-mecha.png',
  anime: '/stickers/anime-mecha.png',
  tiger: '/stickers/tokyo-tiger.png',
  sparkles: '/stickers/tokyo-tiger.png',
  shield: '/stickers/tokyo-tiger.png',
  layers: '/stickers/streetwear-skull.png',
  eye: '/stickers/acid-smile.png',
  scissors: '/stickers/streetwear-skull.png',
};

export const StickerVisual: React.FC<StickerVisualProps> = ({
  finish,
  iconName = 'skull',
  name = 'Sticker',
  size = 160,
  tiltX = 0,
  tiltY = 0,
  className = '',
  showBorder = true,
  imageUrl,
}) => {
  const resolvedImage = imageUrl || STICKER_ARTWORK_MAP[iconName] || STICKER_ARTWORK_MAP['skull'];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
      }}
    >
      {/* Standalone Die-Cut PNG Cutout with tactile 3D peel lift & natural alpha drop-shadow */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-[1.05] group-hover:rotate-[-2deg]"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          filter:
            finish === 'holographic'
              ? 'drop-shadow(0 16px 24px rgba(0,0,0,0.75)) drop-shadow(0 3px 6px rgba(0,0,0,0.5))'
              : 'drop-shadow(0 14px 20px rgba(0,0,0,0.8)) drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }}
      >
        {/* Photorealistic Standalone PNG Cutout without any square box or border */}
        <img
          src={resolvedImage}
          alt={name}
          className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out drop-shadow-sm"
          loading="lazy"
        />

        {/* Dynamic Holographic Prismatic Sheen overlay masked to cutout shape */}
        {finish === 'holographic' && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-30 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-tr from-pink-500/30 via-cyan-400/30 to-yellow-300/30"
            style={{
              maskImage: `url(${resolvedImage})`,
              WebkitMaskImage: `url(${resolvedImage})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        )}
      </div>
    </div>
  );
};
