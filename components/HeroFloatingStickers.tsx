'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, ArrowRight, Star, MessageSquare } from 'lucide-react';
import { TopoBackground } from './TopoBackground';

export const HeroFloatingStickers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mascotBubble, setMascotBubble] = useState(false);
  const [trophyLiked, setTrophyLiked] = useState(false);

  // Mouse tilt physics for the interactive hero canvas
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  // Subtle smooth Parallax on scroll
  const { scrollY } = useScroll();
  const rawParallaxY = useTransform(scrollY, [0, 600], [0, -50]);
  const parallaxY = useSpring(rawParallaxY, { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[96vh] md:min-h-screen flex flex-col justify-between overflow-hidden select-none bg-[#0B0C0E] pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]"
      aria-label="Hero Section"
    >
      {/* Topographic Contour Background */}
      <TopoBackground />

      {/* Main Interactive Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center my-auto">
        
        {/* Giant Hero Typography */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            y: parallaxY,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          className="relative w-full flex flex-col items-center justify-center my-auto"
        >
          {/* Headline Line 1: MAKE YOUR */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-white text-[18vw] sm:text-[14vw] md:text-[13vw] lg:text-[150px] xl:text-[176px] leading-[0.86] tracking-tight uppercase select-none"
            >
              MAKE
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-acid text-[18vw] sm:text-[14vw] md:text-[13vw] lg:text-[150px] xl:text-[176px] leading-[0.86] tracking-tight uppercase select-none"
            >
              YOUR
            </motion.span>
          </div>

          {/* Headline Line 2: STICKERS ALIVE */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center"
          >
            <h2 className="font-display font-black text-white text-[18vw] sm:text-[14vw] md:text-[13vw] lg:text-[150px] xl:text-[176px] leading-[0.86] tracking-tight uppercase select-none">
              STICKERS ALIVE
            </h2>
          </motion.div>
        </motion.div>

        {/* 3D Mascot Character (Left Side) */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          dragElastic={0.2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            y: [0, -14, 0],
            rotate: [-2, 3, -2],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={() => setMascotBubble(!mascotBubble)}
          className="absolute left-1 sm:left-4 md:left-8 lg:left-12 xl:left-20 top-1/2 -translate-y-[60%] sm:-translate-y-[52%] z-30 cursor-grab active:cursor-grabbing group"
          title="Drag me or tap me!"
        >
          {/* Mascot Speech / Reaction Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: mascotBubble ? 1 : 0.95,
              scale: 1,
              y: 0,
            }}
            className="absolute -top-12 left-10 sm:left-14 whitespace-nowrap bg-[#16171B] text-white text-[11px] sm:text-xs font-medium px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center space-x-1.5 pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-acid" />
            <span>100% Weatherproof &amp; Dishwasher Safe!</span>
            <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#16171B] rotate-45 border-r border-b border-white/10" />
          </motion.div>

          <img
            src="/hero/mascot.png"
            alt="Sticker.pedia 3D Mascot"
            className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-72 h-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </motion.div>

        {/* 3D Gold Trophy (Right Side) */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          dragElastic={0.2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            y: [0, 14, 0],
            rotate: [2, -3, 2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={() => setTrophyLiked(!trophyLiked)}
          className="absolute right-1 sm:right-4 md:right-8 lg:right-12 xl:right-20 top-1/2 -translate-y-[45%] sm:-translate-y-[40%] z-30 cursor-grab active:cursor-grabbing group"
          title="Drag me or tap me!"
        >
          {/* Trophy Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 right-4 whitespace-nowrap bg-[#16171B] text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/10 flex items-center space-x-1 pointer-events-none"
          >
            <Star className="w-3.5 h-3.5 text-acid fill-acid" />
            <span>★ 4.9 Studio Rating</span>
          </motion.div>

          <img
            src="/hero/trophy.png"
            alt="Gold Trophy #1"
            className="w-28 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </motion.div>

        {/* Supporting Subtitle Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-[#9CA3AF] text-xs sm:text-sm md:text-base font-normal leading-relaxed text-center px-4"
        >
          Crafted with care for indie artists, streetwear brands, and sticker lovers. Premium waterproof vinyl, vibrant Japanese inks, and velvety soft-touch matte — precision cut and shipped right to your door.
        </motion.p>

        {/* High-Impact CTA Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-7 sm:mt-9 flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap"
        >
          {/* Primary Acid Button */}
          <a
            href="#customizer"
            className="inline-flex items-center justify-center space-x-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-acid hover:bg-acid-hover text-black font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-md group cursor-pointer"
          >
            <span>Design Your Stickers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
          </a>

          {/* Secondary Button */}
          <a
            href="#community"
            className="inline-flex items-center justify-center space-x-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-acid shrink-0" />
            <span>Customer Stories</span>
          </a>
        </motion.div>

        {/* Feature Badges / Proof Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative z-20 mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-mono text-[#9CA3AF]"
        >
          <div className="flex items-center space-x-1.5 font-medium text-white">
            <span className="text-acid font-bold">★ 4.9/5</span>
            <span className="text-[#9CA3AF]">(14,000+ Happy Creators)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-acid" />
            <span className="text-white">Free Digital Proofs</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5 font-medium text-white">
            <span>Ships in 24–48 Hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
