'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Lock,
  LogOut,
  Save,
} from 'lucide-react';
import { CustomerShippingDetails } from '@/lib/types';
import { useStickerStore } from '@/lib/store';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientLoginModal: React.FC<ClientLoginModalProps> = ({ isOpen, onClose }) => {
  const { customer, isCustomerLoggedIn, loginOrSaveCustomer, logoutCustomer } = useStickerStore();

  const [formData, setFormData] = useState<CustomerShippingDetails>(customer);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginOrSaveCustomer(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleLogout = () => {
    logoutCustomer();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-[38px] sm:rounded-[46px] liquid-glass shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
      >
        {/* Specular Liquid Glass Top Sheen Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-20" />

        {/* Header */}
        <div className="px-6 py-4 bg-[#141519] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-acid">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-offwhite">
                Saved Address &amp; Profile
              </h3>
              <p className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-wider">
                Saved for fast checkout on your sticker orders
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

        {/* Form Body - scrollable on mobile */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-muted uppercase mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-muted uppercase mb-1">Email *</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-muted uppercase mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98450 11223"
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
                placeholder="Locality / Street / Building"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-muted uppercase mb-1">District / City *</label>
              <input
                type="text"
                required
                placeholder="District"
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
                placeholder="PIN Code"
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
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted uppercase mb-1">Country *</label>
            <input
              type="text"
              required
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-offwhite focus:border-acid focus:outline-none"
            />
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-[24px] bg-acid/20 border border-acid text-acid flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Client profile &amp; delivery coordinates saved successfully!</span>
            </div>
          )}

          <div className="pt-4 border-t border-border flex items-center justify-between">
            {isCustomerLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-surface border border-border text-red-400 hover:text-red-300 flex items-center space-x-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Reset Details</span>
              </button>
            ) : (
              <div className="text-[11px] text-muted">Auto-saves to browser</div>
            )}

            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-[#000000] font-bold flex items-center space-x-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Coordinates</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
