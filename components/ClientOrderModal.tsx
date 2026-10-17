'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  Package,
  Layers,
  Send,
  Sparkles,
} from 'lucide-react';
import { Product, CustomerShippingDetails } from '@/lib/types';
import { useStickerStore } from '@/lib/store';
import { StickerVisual } from './StickerVisual';

interface ClientOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  customOrderData?: {
    productName: string;
    finish: Product['finish'];
    quantity: number;
    totalAmount: number;
    notes?: string;
    previewType?: string;
  } | null;
}

export const ClientOrderModal: React.FC<ClientOrderModalProps> = ({
  isOpen,
  onClose,
  product,
  customOrderData,
}) => {
  const { customer, loginOrSaveCustomer, createOrder } = useStickerStore();

  const [formData, setFormData] = useState<CustomerShippingDetails>(customer);
  const [saveProfile, setSaveProfile] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successOrder, setSuccessOrder] = useState<{ id: string; num: string } | null>(null);

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  if (!isOpen) return null;

  // Order Details resolution
  const orderName = product ? product.name : customOrderData?.productName || 'Custom Sticker Die-Cut';
  const finish = product ? product.finish : customOrderData?.finish || 'holographic';
  const quantity = product ? 10 : customOrderData?.quantity || 50;
  const total = product
    ? parseFloat((product.price * 10 * 0.9).toFixed(2))
    : customOrderData?.totalAmount || 49.50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (saveProfile) {
      loginOrSaveCustomer(formData);
    }

    const res = createOrder({
      productName: `${orderName} (${quantity} pcs)`,
      finish,
      quantity,
      totalAmount: total,
      shippingDetails: formData,
      priority: quantity >= 50 ? 'rush' : 'normal',
      notes: product
        ? `Storefront Sample Drop (SKU: ${product.sku})`
        : customOrderData?.notes || 'Customizer Die-Cut Submission',
      previewType: product?.iconName || customOrderData?.previewType,
    });

    setIsSubmitting(false);
    setSuccessOrder({ id: res.orderId, num: res.orderNumber });

    setTimeout(() => {
      setSuccessOrder(null);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-[38px] sm:rounded-[46px] liquid-glass shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
      >
        {/* Specular Liquid Glass Top Sheen Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-20" />

        {/* Header */}
        <div className="px-6 py-4 bg-[#141519] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-acid">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-offwhite">
                Delivery Details
              </h3>
              <p className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-wider">
                Where should we ship your stickers?
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-muted hover:text-offwhite transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Order Summary Card */}
          <div className="p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] bg-[#121317] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0">
                <StickerVisual
                  finish={finish}
                  iconName={product?.iconName || customOrderData?.previewType || 'skull'}
                  size={42}
                  showBorder={false}
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-offwhite">
                  {orderName}
                </h4>
                <div className="text-[11px] font-mono text-muted flex items-center space-x-2 mt-0.5">
                  <span className="text-acid uppercase font-semibold">{finish} finish</span>
                  <span>&bull;</span>
                  <span>{quantity} units</span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex sm:flex-col justify-between sm:text-right items-center sm:items-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <div className="text-[10px] font-mono text-muted uppercase">Total Due</div>
              <div className="font-mono text-xl font-black text-offwhite">
                ${total.toFixed(2)}{' '}
                <span className="text-[10px] text-muted font-normal">USD</span>
              </div>
            </div>
          </div>

          {/* Customer Shipping Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="text-[11px] font-mono text-acid font-bold tracking-wider uppercase flex items-center space-x-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Customer Contact &amp; Shipping Address</span>
            </div>

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-muted uppercase mb-1">Full Name / Studio *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted uppercase mb-1">Email (for job tracking) *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Phone Number & Place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-muted uppercase mb-1">Phone Number (with code) *</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 11223 / +1 555 0192"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted uppercase mb-1">Place / Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Plot 14, High Street, Sector 2"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>
            </div>

            {/* Row 3: District, Pin Code, State */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-muted uppercase mb-1">District / City *</label>
                <input
                  type="text"
                  required
                  placeholder="Bengaluru Urban / Manhattan"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted uppercase mb-1">PIN / Postal Code *</label>
                <input
                  type="text"
                  required
                  placeholder="560034 / 10001"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted uppercase mb-1">State / Province *</label>
                <input
                  type="text"
                  required
                  placeholder="Karnataka / New York"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>
            </div>

            {/* Row 4: Country */}
            <div>
              <label className="block text-muted uppercase mb-1">Country *</label>
              <input
                type="text"
                required
                placeholder="India / United States / United Kingdom"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
              />
            </div>

            {/* Remember credentials checkbox for better UX */}
            <div className="pt-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="saveProfileCheck"
                checked={saveProfile}
                onChange={(e) => setSaveProfile(e.target.checked)}
                className="w-4 h-4 accent-[#E2F832] rounded bg-surface border-border"
              />
              <label
                htmlFor="saveProfileCheck"
                className="text-[11px] text-muted hover:text-offwhite cursor-pointer select-none"
              >
                Save contact &amp; delivery coordinates for automatic 1-click ordering next time
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-surface border border-border text-muted hover:text-offwhite transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-acid hover:bg-acid-hover text-[#000000] font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#000000]" />
                <span>Confirm &amp; Place Order</span>
              </button>
            </div>
          </form>

          {/* Success Toast / Notification */}
          <AnimatePresence>
            {successOrder && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] bg-acid/10 border border-acid/40 text-offwhite font-mono text-xs shadow-md flex items-start space-x-3"
              >
                <CheckCircle2 className="w-5 h-5 text-acid shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-acid text-sm">
                    ORDER #{successOrder.num} CONFIRMED!
                  </div>
                  <div className="text-muted text-[11px] mt-1 leading-relaxed">
                    Thank you! We&apos;ve received your order and our print team is preparing your custom stickers. We&apos;ll email you a tracking link as soon as your package ships.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
