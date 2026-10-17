'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Product, FinishType } from '@/lib/types';
import { useStickerStore } from '@/lib/store';
import { StickerVisual } from './StickerVisual';
import { ClientOrderModal } from './ClientOrderModal';
import { TiltCard } from './TiltCard';
import { ScrollBlurReveal, ScrollBlurText } from './ScrollBlurReveal';

export const LiveShowcaseGrid: React.FC = () => {
  const { products } = useStickerStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'die-cut', label: 'Die-Cut Vinyl' },
    { id: 'holographic', label: 'Prismatic Holo' },
    { id: 'packs', label: 'Collector Packs' },
    { id: 'sheets', label: 'Optical Clear' },
    { id: 'industrial', label: 'Heavy Duty' },
  ];

  const filteredProducts = products.filter((p) => {
    if (!p.active) return false;
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const getStockStatus = (product: Product) => {
    if (product.soldOutOverride || product.stock <= 0) {
      return {
        label: 'SOLD OUT',
        color: 'text-zinc-500 bg-zinc-900/60 border-zinc-800',
        dot: 'bg-zinc-500',
        available: false,
      };
    }
    if (product.stock <= 5) {
      return {
        label: `ONLY ${product.stock} LEFT`,
        color: 'text-amber-400 bg-amber-950/20 border-amber-800/40',
        dot: 'bg-amber-400',
        available: true,
      };
    }
    return {
      label: `IN STOCK (${product.stock})`,
      color: 'text-acid bg-acid/10 border-acid/20',
      dot: 'bg-acid',
      available: true,
    };
  };

  const getFinishPill = (finish: FinishType) => {
    switch (finish) {
      case 'holographic':
        return 'text-sky-300 border-sky-500/20 bg-sky-950/20';
      case 'matte':
        return 'text-acid border-acid/20 bg-acid/10';
      case 'gloss':
        return 'text-emerald-300 border-emerald-500/20 bg-emerald-950/20';
      case 'transparent':
        return 'text-purple-300 border-purple-500/20 bg-purple-950/20';
    }
  };

  return (
    <section id="collections" className="relative py-20 sm:py-24 bg-[#0B0C0E] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Blur Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <ScrollBlurReveal direction="up" yOffset={28} blur="14px" duration={0.8}>
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-acid font-mono text-[11px] tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span>FEATURED PRINTS &bull; HAND-PICKED DROPS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <ScrollBlurText text="Signature Stickers & Collector Runs" staggerDelay={0.04} blur="12px" />
              </h2>
              <p className="text-sm font-sans text-[#9CA3AF] mt-2 max-w-xl">
                Explore popular pre-designed stickers printed on thick, weatherproof vinyl. Ready to ship straight to your door.
              </p>
            </div>
          </ScrollBlurReveal>

          {/* Minimal Category Filter Pills */}
          <ScrollBlurReveal direction="up" delay={0.15} yOffset={20} blur="12px">
            <div className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-acid text-black font-semibold shadow-sm'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollBlurReveal>
        </div>

        {/* Product Cards Grid with Staggered Scroll Blur Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const stockStatus = getStockStatus(product);

              return (
                <ScrollBlurReveal
                  key={product.id}
                  delay={(idx % 4) * 0.08}
                  duration={0.7}
                  blur="12px"
                  yOffset={24}
                  className="h-full"
                >
                  <TiltCard maxTilt={6} scaleOnHover={1.02} className="h-full rounded-[38px] sm:rounded-[42px]">
                    <article className="group relative flex flex-col h-full rounded-[38px] sm:rounded-[42px] bg-[#121317] border border-white/[0.08] hover:border-white/[0.18] overflow-hidden transition-all duration-300">
                      {/* Top Badge & Live Stock Indicator */}
                      <div className="p-4 pb-0 flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono tracking-wider text-[#9CA3AF] uppercase">
                          {product.sku}
                        </span>

                        <div
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-semibold ${stockStatus.color}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${stockStatus.dot}`} />
                          <span>{stockStatus.label}</span>
                        </div>
                      </div>

                      {/* Visual Preview Area */}
                      <div className="relative h-56 flex items-center justify-center p-6 bg-transparent">
                        <div className="transform transition-transform duration-300 group-hover:scale-105">
                          <StickerVisual
                            finish={product.finish}
                            iconName={product.iconName}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            size={145}
                          />
                        </div>

                        {/* Finish Pill */}
                        <div className="absolute bottom-3 left-4">
                          <span
                            className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border uppercase ${getFinishPill(
                              product.finish
                            )}`}
                          >
                            {product.finish}
                          </span>
                        </div>

                        {/* Size metadata */}
                        <div className="absolute bottom-3 right-4 font-mono text-[10px] text-[#9CA3AF] bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                          {product.size}
                        </div>
                      </div>

                      {/* Details Card Footer */}
                      <div className="p-5 flex-1 flex flex-col justify-between border-t border-white/[0.08] bg-[#16181E]">
                        <div>
                          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-amber-400 mb-1">
                            <span>★ {product.rating.toFixed(1)}</span>
                            <span className="text-[#9CA3AF]">({product.reviewsCount})</span>
                          </div>
                          <h3 className="font-bold text-white text-base leading-snug group-hover:text-acid transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#9CA3AF] mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                          <div>
                            <div className="font-mono text-[10px] text-[#9CA3AF] uppercase">Price</div>
                            <div className="font-mono text-base font-bold text-white">
                              ${product.price.toFixed(2)}
                              <span className="text-xs font-normal text-[#9CA3AF]"> /ea</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setOrderingProduct(product)}
                            disabled={!stockStatus.available}
                            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 flex items-center space-x-1.5 active:scale-95 cursor-pointer ${
                              !stockStatus.available
                                ? 'bg-zinc-900 border border-white/10 text-zinc-600 cursor-not-allowed'
                                : 'bg-acid hover:bg-acid-hover text-black shadow-sm'
                            }`}
                            title={
                              stockStatus.available
                                ? 'Order sticker with delivery details'
                                : 'Item sold out'
                            }
                          >
                            {!stockStatus.available ? (
                              <>
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Sold Out</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Order Pack</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </ScrollBlurReveal>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Client Order Modal */}
      <ClientOrderModal
        isOpen={!!orderingProduct}
        onClose={() => setOrderingProduct(null)}
        product={orderingProduct}
      />
    </section>
  );
};
