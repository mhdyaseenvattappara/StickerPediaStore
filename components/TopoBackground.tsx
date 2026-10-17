'use client';

import React, { useMemo } from 'react';

export const TopoBackground: React.FC = React.memo(() => {
  // Generate smooth natural wavy topographic / contour lines once
  const paths = useMemo(() => {
    const lineCount = 42;
    const result: string[] = [];
    for (let i = 0; i < lineCount; i++) {
      const xBase = (i / (lineCount - 1)) * 1600;
      const p1X = xBase + Math.sin(i * 0.45) * 22;
      const p2X = xBase + Math.cos(i * 0.35 + 1.2) * 28;
      const p3X = xBase + Math.sin(i * 0.5 + 2.5) * 20;
      const p4X = xBase + Math.cos(i * 0.4 + 3.8) * 26;
      const p5X = xBase + Math.sin(i * 0.3 + 4.9) * 18;

      const d = `M ${xBase},0 
        C ${p1X},180 ${p2X},360 ${xBase + Math.sin(i * 0.3) * 15},500 
        C ${p3X},640 ${p4X},800 ${p5X},950 
        L ${xBase},1000`;
      result.push(d);
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-gradient-to-b from-[#0B0C0E] via-[#0E0F13] to-[#0B0C0E]">
      {/* Topographic Contour Wavy Lines */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((d, index) => (
          <path
            key={index}
            d={d}
            fill="none"
            stroke={index % 8 === 0 ? "#D4F62A" : "#2E333D"}
            strokeWidth={index % 4 === 0 ? "1.4" : "1.0"}
            strokeOpacity={index % 8 === 0 ? "0.25" : "0.35"}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Fine texture vignette for extra tactile depth */}
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />
    </div>
  );
});

TopoBackground.displayName = 'TopoBackground';
