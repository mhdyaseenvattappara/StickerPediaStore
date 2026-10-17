'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export interface ScrollBlurRevealProps {
  children: React.ReactNode;
  className?: string;
  blur?: string | number;
  duration?: number;
  delay?: number;
  yOffset?: number;
  xOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: number;
  once?: boolean;
  margin?: string;
  threshold?: number;
}

/**
 * Ultra-smooth, hardware-accelerated Scroll Reveal Component.
 * Uses GPU-composited translate3d and opacity transitions for buttery 120fps performance.
 */
export const ScrollBlurReveal: React.FC<ScrollBlurRevealProps> = ({
  children,
  className = '',
  duration = 0.6,
  delay = 0,
  yOffset = 20,
  xOffset = 0,
  direction = 'up',
  scale = 0.98,
  once = true,
  margin = '-40px',
  threshold = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: margin as any,
    amount: threshold,
  });

  let initialY = 0;
  let initialX = 0;

  if (direction === 'up') initialY = yOffset;
  else if (direction === 'down') initialY = -yOffset;
  else if (direction === 'left') initialX = xOffset || 20;
  else if (direction === 'right') initialX = -(xOffset || 20);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        transform: `translate3d(${initialX}px, ${initialY}px, 0px) scale(${scale})`,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              transform: 'translate3d(0px, 0px, 0px) scale(1)',
            }
          : {
              opacity: 0,
              transform: `translate3d(${initialX}px, ${initialY}px, 0px) scale(${scale})`,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Silky smooth cubic bezier curve
      }}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollBlurContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
}

export const ScrollBlurContainer: React.FC<ScrollBlurContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.06,
  once = true,
  margin = '-40px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any, amount: 0.08 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollBlurItemProps {
  children: React.ReactNode;
  className?: string;
  blur?: string | number;
  duration?: number;
  yOffset?: number;
  scale?: number;
}

export const ScrollBlurItem: React.FC<ScrollBlurItemProps> = ({
  children,
  className = '',
  duration = 0.55,
  yOffset = 18,
  scale = 0.98,
}) => {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      scale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollBlurTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  blur?: string | number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollBlurText: React.FC<ScrollBlurTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  staggerDelay = 0.025,
  duration = 0.5,
  once = true,
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px' as any, amount: 0.1 });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`inline-block mr-[0.28em] last:mr-0 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default ScrollBlurReveal;
