'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Upload,
  X,
  Skull,
  Smile,
  Cpu,
  Shield,
  MapPin,
} from 'lucide-react';
import { FinishType } from '@/lib/types';
import { useStickerStore } from '@/lib/store';
import { StickerVisual } from './StickerVisual';
import { ClientOrderModal } from './ClientOrderModal';
import { ScrollBlurReveal, ScrollBlurText } from './ScrollBlurReveal';

export const CustomizerPreview: React.FC = () => {
  const { customer, isCustomerLoggedIn } = useStickerStore();

  const [finish, setFinish] = useState<FinishType>('holographic');
  const [selectedIcon, setSelectedIcon] = useState<string>('skull');
  const [customText, setCustomText] = useState<string>('CYBER DECK');
  const [sizeInches, setSizeInches] = useState<number>(3);
  const [borderThickness, setBorderThickness] = useState<number>(2);
  const [quantity, setQuantity] = useState<number>(50);

  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setCustomText(file.name.replace(/\.[^/.]+$/, '').toUpperCase());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearCustomImage = () => {
    setCustomImage(null);
    setSelectedIcon('skull');
    setCustomText('CYBER DECK');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Pricing calculation
  const getBaseUnitPrice = () => {
    switch (finish) {
      case 'holographic':
        return 1.45;
      case 'matte':
        return 0.95;
      case 'gloss':
        return 1.10;
      case 'transparent':
        return 1.25;
    }
  };

  const sizeMultiplier = sizeInches === 2 ? 0.8 : sizeInches === 3 ? 1.0 : sizeInches === 4 ? 1.35 : 1.7;
  const unitPrice = parseFloat((getBaseUnitPrice() * sizeMultiplier).toFixed(2));
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));

  return (
    <>
      <section id="customizer" className="relative py-20 sm:py-24 bg-[#0B0C0E] border-b border-white/[0.08]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading with Scroll Blur Reveal */}
          <ScrollBlurReveal direction="up" yOffset={28} blur="14px" duration={0.8} className="text-center max-w-3xl mx-auto mb-14">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-acid font-mono text-[11px] tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span>INTERACTIVE STUDIO &bull; INSTANT PROOFING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
                <ScrollBlurText text="Design Your Custom Stickers" staggerDelay={0.04} blur="12px" />
              </h2>
              <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
                Preview holographic foils, velvet matte, or gloss finishes in real-time. Upload your artwork or choose a design, adjust sizing and quantities, and get an instant transparent quote.
              </p>
            </div>
          </ScrollBlurReveal>

          {/* Studio Interactive Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Canvas: Live Interactive Preview Window with Blur Reveal */}
            <ScrollBlurReveal direction="left" delay={0.1} yOffset={20} blur="14px" className="lg:col-span-7">
              <div className="flex flex-col rounded-[38px] sm:rounded-[44px] bg-[#121317] border border-white/[0.08] overflow-hidden">
                {/* Top Toolbar */}
                <div className="px-5 py-3 bg-[#16181E] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-[11px] font-mono text-[#9CA3AF] tracking-wider uppercase font-semibold">
                    STUDIO CANVAS
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-acid font-semibold uppercase text-xs">{finish}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-white text-xs">{sizeInches}x{sizeInches} in</span>
                </div>
              </div>

              {/* Visual Canvas Display Area */}
              <div className="relative min-h-[420px] flex items-center justify-center p-8 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
                <div className="relative transform transition-all duration-300">
                  <StickerVisual
                    finish={finish}
                    iconName={selectedIcon}
                    imageUrl={customImage || undefined}
                    name={customText}
                    size={sizeInches === 2 ? 160 : sizeInches === 3 ? 210 : sizeInches === 4 ? 250 : 280}
                    tiltX={-3}
                    tiltY={5}
                    showBorder={borderThickness > 0}
                  />

                  {/* Cutline guide */}
                  <div
                    className="absolute -inset-3 rounded-[34px] border border-dashed border-acid/40 pointer-events-none flex items-center justify-center"
                  >
                    <span className="absolute -top-3 left-4 bg-[#121317] border border-acid/30 px-2 py-0.5 text-[9px] font-mono text-acid font-semibold uppercase tracking-wider">
                      CONTOUR OUTLINE ({borderThickness}MM)
                    </span>
                  </div>
                </div>

                {/* Material Spec Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-3.5 py-2.5 rounded-[26px] bg-[#121317]/90 border border-white/[0.08] text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                    <span className="text-white font-semibold">{customText.toUpperCase()}</span>
                    {customImage && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-acid/20 text-acid">
                        CUSTOM ARTWORK
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    Thick Weatherproof Vinyl &bull; Clean-Peel Adhesive
                  </div>
                </div>
              </div>

              {/* Artwork source & presets */}
              <div className="p-4 bg-[#16181E] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">
                    Artwork:
                  </span>
                  {customImage && (
                    <button
                      onClick={handleClearCustomImage}
                      className="inline-flex items-center space-x-1 text-[11px] font-mono text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-0.5 rounded transition-colors"
                      title="Reset to default presets"
                    >
                      <X className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap border cursor-pointer ${
                      customImage
                        ? 'bg-acid text-black border-acid shadow-sm'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-acid border-acid/30'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{customImage ? 'Change Artwork' : 'Upload Artwork (.PNG, .SVG, .JPG)'}</span>
                  </button>

                  <div className="h-4 w-px bg-white/10 shrink-0" />

                  {/* Preset Motifs */}
                  {[
                    { id: 'skull', label: 'Cyber Skull', icon: Skull },
                    { id: 'smile', label: 'Acid Smile', icon: Smile },
                    { id: 'cpu', label: 'Pilot Mecha', icon: Cpu },
                    { id: 'shield', label: 'Tokyo Tiger', icon: Shield },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = !customImage && selectedIcon === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCustomImage(null);
                          setSelectedIcon(item.id);
                          setCustomText(item.label.toUpperCase());
                        }}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-acid text-black font-semibold shadow-sm'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] text-[#9CA3AF] hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollBlurReveal>

          {/* Right Controller: Configuration with Blur Reveal */}
            <ScrollBlurReveal direction="right" delay={0.2} yOffset={20} blur="14px" className="lg:col-span-5">
              <div className="flex flex-col rounded-[38px] sm:rounded-[44px] bg-[#121317] border border-white/[0.08] p-6 sm:p-7">
                <h3 className="font-bold text-lg text-white mb-5 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-acid" />
                  <span>Sticker Options</span>
                </h3>

              {/* Finish Selector */}
              <div className="mb-5">
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase tracking-wider mb-2">
                  1. Choose Your Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'holographic', label: 'Prismatic Holo', desc: 'Rainbow diffraction foil' },
                    { id: 'matte', label: 'Velvet Matte', desc: 'Zero glare soft-touch' },
                    { id: 'gloss', label: 'High Gloss UV', desc: 'Vibrant & glossy' },
                    { id: 'transparent', label: 'Optical Clear', desc: 'Ultra-clear see-through' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id as FinishType)}
                      className={`p-3.5 rounded-[24px] border text-left transition-all duration-200 cursor-pointer ${
                        finish === f.id
                          ? 'border-acid bg-acid/10'
                          : 'border-white/[0.08] bg-[#16181E] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-xs font-mono font-semibold ${finish === f.id ? 'text-acid' : 'text-white'}`}>
                          {f.label}
                        </span>
                        {finish === f.id && <span className="w-1.5 h-1.5 rounded-full bg-acid" />}
                      </div>
                      <p className="text-[10px] text-[#9CA3AF]">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">
                    2. Pick Your Size
                  </label>
                  <span className="text-xs font-mono text-acid font-semibold">
                    {sizeInches}&quot; &times; {sizeInches}&quot; ({Math.round(sizeInches * 25.4)} mm)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSizeInches(s)}
                      className={`py-2.5 rounded-[22px] text-xs font-mono font-medium border transition-all cursor-pointer ${
                        sizeInches === s
                          ? 'bg-acid text-black border-acid font-bold'
                          : 'bg-[#16181E] text-[#9CA3AF] border-white/[0.08] hover:text-white'
                      }`}
                    >
                      {s}&quot; &times; {s}&quot;
                    </button>
                  ))}
                </div>
              </div>

              {/* White Rim Slider */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">
                    3. White Border Outline
                  </label>
                  <span className="text-xs font-mono text-white font-medium">
                    {borderThickness === 0 ? 'No Border (Flush)' : `${borderThickness} mm Border`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={borderThickness}
                  onChange={(e) => setBorderThickness(Number(e.target.value))}
                  className="w-full accent-acid bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#9CA3AF] mt-1">
                  <span>Flush</span>
                  <span>1mm</span>
                  <span>2mm (Standard)</span>
                  <span>3mm</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">
                    4. How Many Stickers?
                  </label>
                  <span className="text-xs font-mono text-acid font-medium">Bulk Discount Included</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`py-2.5 rounded-[22px] text-xs font-mono font-medium border transition-all cursor-pointer ${
                        quantity === q
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-[#16181E] text-[#9CA3AF] border-white/[0.08] hover:text-white'
                      }`}
                    >
                      {q} pcs
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Quote Summary */}
              <div className="p-4 sm:p-5 rounded-[28px] bg-[#16181E] border border-white/[0.08] mb-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-1.5">
                  <span>Unit Price:</span>
                  <span className="text-white font-medium">${unitPrice.toFixed(2)} / sticker</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-3">
                  <span>Turnaround:</span>
                  <span className="text-acid font-medium">Ready in 24–48 Hours</span>
                </div>
                <div className="pt-2 border-t border-white/[0.08] flex items-baseline justify-between">
                  <span className="font-mono text-xs text-[#9CA3AF] uppercase tracking-wider">
                    Total Estimate:
                  </span>
                  <span className="font-mono text-2xl font-bold text-white">
                    ${totalPrice.toFixed(2)} <span className="text-xs text-[#9CA3AF] font-normal">USD</span>
                  </span>
                </div>
              </div>

              {/* Dispatch Action Button */}
              <button
                type="button"
                onClick={() => setShowOrderModal(true)}
                className="w-full py-3.5 px-6 rounded-full bg-acid hover:bg-acid-hover text-black font-semibold text-sm tracking-tight flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-black" />
                <span>Review Proof &amp; Place Order</span>
              </button>

              <div className="mt-2.5 text-center text-[11px] font-mono text-[#9CA3AF]">
                Free digital proof with unlimited revisions before printing
              </div>
            </div>
          </ScrollBlurReveal>
        </div>
      </div>
      </section>

      {/* Client Order Modal */}
      <ClientOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        customOrderData={{
          productName: `Custom Die-Cut: ${customText} (${sizeInches}x${sizeInches} in)`,
          finish,
          quantity,
          totalAmount: totalPrice,
          notes: customImage
            ? `Custom Artwork Uploaded: ${customText}, Border=[${borderThickness}mm], Size=[${sizeInches}in], Finish=[${finish}]`
            : `Customizer Job: Icon=[${selectedIcon}], Border=[${borderThickness}mm], Size=[${sizeInches}in], Finish=[${finish}]`,
          previewType: customImage ? 'custom_upload' : selectedIcon,
        }}
      />
    </>
  );
};
