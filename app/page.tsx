import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroFloatingStickers } from '@/components/HeroFloatingStickers';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { LiveShowcaseGrid } from '@/components/LiveShowcaseGrid';
import { CustomizerPreview } from '@/components/CustomizerPreview';
import { MaterialsLab } from '@/components/MaterialsLab';
import { CommunityWall } from '@/components/CommunityWall';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { FloatingStudioBar } from '@/components/FloatingStudioBar';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#0A0B0D] text-[#F3F4F6] flex flex-col font-sans selection:bg-acid selection:text-black relative overflow-x-hidden">
      {/* Precision Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Semantic Landmark Content */}
      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section with Interactive Drag & 3D Tilt Physics */}
        <HeroFloatingStickers />

        {/* Minimal Typography Ticker Ribbon */}
        <MarqueeTicker speed={36} />

        {/* Catalog Drops Grid with Stock Status */}
        <LiveShowcaseGrid />

        {/* Custom Die-Cut Studio & Instant Proofing Workbench */}
        <CustomizerPreview />

        {/* Technical Substrates & Construction Lab */}
        <MaterialsLab />

        {/* Verified Community Proofs & Customer Field Reports */}
        <CommunityWall />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Minimal Floating Studio Helper */}
      <FloatingStudioBar />

      {/* Editorial Minimal Footer */}
      <Footer />
    </div>
  );
}
