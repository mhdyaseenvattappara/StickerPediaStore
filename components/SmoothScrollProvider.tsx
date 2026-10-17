'use client';

import React, { useEffect } from 'react';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenisInstance: any = null;
    let rafId: number;

    // Dynamic import to avoid SSR evaluation during Next.js static prerender
    import('lenis')
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
          infinite: false,
        });

        (window as any).__lenis = lenisInstance;

        const raf = (time: number) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        console.warn('Lenis initialization notice:', err);
      });

    // Smooth anchor navigation handler
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      let targetId = '';
      if (href.startsWith('/#')) {
        targetId = href.replace('/#', '');
      } else if (href.startsWith('#') && href.length > 1) {
        targetId = href.replace('#', '');
      }

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          if ((window as any).__lenis) {
            (window as any).__lenis.scrollTo(targetElement, {
              offset: -85,
              duration: 1.2,
            });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
        delete (window as any).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
};
