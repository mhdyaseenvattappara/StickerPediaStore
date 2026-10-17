'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Save,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Sparkles,
  Package,
  Clock,
  ExternalLink,
  ShieldCheck,
  Lock,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { useStickerStore } from '@/lib/store';
import { CustomerShippingDetails, PrintOrder } from '@/lib/types';

function ProfilePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewAccount = searchParams.get('welcome') === 'true';

  const {
    customer,
    isCustomerLoggedIn,
    updateClientProfile,
    loginOrSaveCustomer,
    logoutCustomer,
    orders,
  } = useStickerStore();

  const [formData, setFormData] = useState<CustomerShippingDetails>(customer);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'coordinates' | 'orders' | 'security'>('coordinates');

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync form with customer state on load or change
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        place: customer.place || '',
        district: customer.district || '',
        pinCode: customer.pinCode || '',
        state: customer.state || '',
        country: customer.country || 'India',
      });
    }
  }, [customer]);

  const handleChange = (field: keyof CustomerShippingDetails, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    if (isCustomerLoggedIn) {
      updateClientProfile(formData);
    } else {
      loginOrSaveCustomer(formData);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2800);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    if (newPassword.length < 6) {
      setSecurityMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match. Please re-enter.' });
      return;
    }

    updateClientProfile({ password: newPassword });
    setSecurityMessage({ type: 'success', text: 'Password updated successfully in your client account.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleLogout = () => {
    logoutCustomer();
    window.location.href = '/';
  };

  // Filter orders matching customer email or phone
  const userOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    if (!customer?.email) return orders.slice(0, 3);

    const emailMatches = orders.filter(
      (o) => o.customerEmail && o.customerEmail.toLowerCase() === customer.email.toLowerCase()
    );

    // If no direct email match found in demo orders, return the first few active orders so user sees interface
    return emailMatches.length > 0 ? emailMatches : orders.slice(0, 4);
  }, [orders, customer]);

  const getInitials = (name: string) => {
    if (!name) return 'SP';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const getStatusColor = (status: PrintOrder['status']) => {
    switch (status) {
      case 'dispatched':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'printing':
        return 'bg-acid/10 text-acid border-acid/20';
      case 'pre-press':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex flex-col justify-between relative selection:bg-acid selection:text-black">
      {/* Background ambient structure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-b from-[#1B2233] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between border-b border-white/[0.08]">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-2.5 group"
            aria-label="Sticker.pedia Home"
          >
            <img
              src="/brand-logo.png"
              alt="Sticker.pedia"
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="hidden sm:inline-block text-xs font-mono text-[#8E95A2]">/</span>
          <span className="hidden sm:inline-block text-xs font-mono text-white font-medium">
            Client Profile
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#9CA3AF] hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          {isCustomerLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-full border border-red-500/20 hover:border-red-500/40 bg-red-500/[0.04] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link
              href="/login?redirect=/profile"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-acid hover:underline px-3 py-1.5 rounded-full border border-acid/20 bg-acid/[0.05]"
            >
              <span>Log In</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* Welcome notification for newly registered users */}
        {isNewAccount && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-acid/10 border border-acid/30 text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-acid shrink-0" />
              <div>
                <p className="text-sm font-semibold">Account created successfully!</p>
                <p className="text-xs text-[#9CA3AF]">
                  Your profile coordinates are active. You can refine your default shipping address below.
                </p>
              </div>
            </div>
            <Link
              href="/#customizer"
              className="px-3.5 py-1.5 rounded-xl bg-acid text-black font-bold text-xs shrink-0"
            >
              Create Stickers &rarr;
            </Link>
          </motion.div>
        )}

        {/* Guest Warning Banner if not authenticated */}
        {!isCustomerLoggedIn && (
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-acid shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Viewing as Guest</p>
                <p className="text-xs text-[#9CA3AF]">
                  Coordinates saved here persist locally in your browser. Log in or create an account to access them across devices.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <Link
                href="/login?redirect=/profile"
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white font-mono text-xs"
              >
                Log In
              </Link>
              <Link
                href="/signup?redirect=/profile"
                className="px-3.5 py-1.5 rounded-xl bg-acid hover:bg-acid-hover text-black font-semibold text-xs"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}

        {/* Profile Header Hero Card */}
        <div className="liquid-glass-card p-6 sm:p-7 rounded-[32px] border border-white/[0.08] mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E2330] to-[#2B3245] border border-white/10 flex items-center justify-center font-bold font-mono text-lg text-acid shrink-0">
                {getInitials(formData.name)}
              </div>

              <div>
                <div className="flex items-center space-x-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {formData.name || 'Client Profile'}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-acid/10 border border-acid/20 text-acid">
                    {isCustomerLoggedIn ? 'Verified Client' : 'Guest Mode'}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-mono mt-0.5">
                  {formData.email || 'No email registered'} &bull; {formData.district || 'India'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 w-full sm:w-auto">
              <Link
                href="/#customizer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-acid hover:bg-acid-hover text-black font-semibold text-xs tracking-tight transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>New Sticker Order</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1.5 mt-6 pt-5 border-t border-white/[0.08] overflow-x-auto">
            <button
              onClick={() => setActiveTab('coordinates')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'coordinates'
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Delivery Coordinates & Profile
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              My Orders ({userOrders.length})
            </button>

            {isCustomerLoggedIn && (
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-white/10 text-white border border-white/15'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Security & Password
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Delivery Coordinates & Profile Editor (replaces screenshot modal) */}
        {activeTab === 'coordinates' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="liquid-glass-card p-6 sm:p-8 rounded-[32px] border border-white/[0.08]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-2">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-acid" />
                  <span>Saved Address & Profile</span>
                </h2>
                <p className="text-xs font-mono text-[#8E95A2] mt-1 uppercase tracking-wider">
                  Saved for fast checkout on your sticker orders
                </p>
              </div>

              {saveSuccess && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Coordinates Saved Successfully</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="alex.rivera@hyperstudio.design"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Place / Street Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 98450 11223"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    Place / Street Address *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A2]" />
                    <input
                      type="text"
                      required
                      value={formData.place}
                      onChange={(e) => handleChange('place', e.target.value)}
                      placeholder="Flat 402, Skyline Residency, 12th Main"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* District, PIN, State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    District / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Bengaluru Urban"
                    className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    PIN / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pinCode}
                    onChange={(e) => handleChange('pinCode', e.target.value)}
                    placeholder="560034"
                    className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="Karnataka"
                    className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#D1D5DB] mb-2 uppercase tracking-wider">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="India"
                  className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#8E95A2]">
                  Auto-saves to browser &bull; Used automatically in Sticker Studio checkout
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-acid hover:bg-acid-hover text-black font-bold text-sm tracking-tight transition-transform active:scale-95 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2]" />
                  <span>Save Coordinates</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 2: Orders Tracking */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-lg font-bold text-white">Sticker Order Production</h2>
                <p className="text-xs font-mono text-[#8E95A2]">
                  Live pre-press, laser contour cutting, and dispatch tracking
                </p>
              </div>
              <Link
                href="/#customizer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-white transition-all"
              >
                <span>+ Create Batch</span>
              </Link>
            </div>

            {userOrders.length === 0 ? (
              <div className="liquid-glass-card p-12 text-center rounded-[32px] border border-white/[0.08]">
                <Package className="w-10 h-10 text-[#8E95A2] mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No sticker orders found</h3>
                <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto mt-1 mb-6">
                  Design your custom die-cut or holographic stickers now and view live production updates here.
                </p>
                <Link
                  href="/#customizer"
                  className="px-5 py-2.5 rounded-2xl bg-acid text-black font-bold text-xs inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Launch Customizer</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="liquid-glass-card p-5 sm:p-6 rounded-[28px] border border-white/[0.08] hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                          <Package className="w-5 h-5 text-acid" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-white text-sm">
                              {order.orderNumber}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#9CA3AF] mt-0.5">
                            Placed {order.timestamp || 'recently'} &bull; Priority: {order.priority}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-base font-bold text-acid font-mono">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-xs text-[#9CA3AF]">
                          {order.quantity} pcs &bull; {order.finish.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-[#8E95A2]">Product: </span>
                        <span className="text-white font-medium">{order.productName}</span>
                        <span className="text-[#8E95A2] ml-2">Shipping to: </span>
                        <span className="text-[#D1D5DB]">{order.district || order.place}, {order.state}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <a
                          href={`https://wa.me/919946465499?text=${encodeURIComponent(
                            `Hi Sticker Pedia! I would like an update on my order ${order.orderNumber} (${order.productName}, ${order.quantity} pcs).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-mono text-[11px] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Update</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 3: Security & Password */}
        {activeTab === 'security' && isCustomerLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="liquid-glass-card p-6 sm:p-8 rounded-[32px] border border-white/[0.08]"
          >
            <div className="pb-6 mb-6 border-b border-white/[0.08]">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <Lock className="w-5 h-5 text-acid" />
                <span>Account Security</span>
              </h2>
              <p className="text-xs font-mono text-[#8E95A2] mt-1">
                Update your login credentials and manage device session
              </p>
            </div>

            {securityMessage && (
              <div
                className={`mb-5 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5 ${
                  securityMessage.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {securityMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{securityMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#D1D5DB] mb-1.5 uppercase tracking-wider">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#D1D5DB] mb-1.5 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-4 py-3 rounded-2xl liquid-glass-input text-white text-sm focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-acid hover:bg-acid-hover text-black font-bold text-xs tracking-tight transition-transform active:scale-95"
                >
                  Update Account Password
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#8E95A2] font-mono border-t border-white/[0.06]">
        &copy; {new Date().getFullYear()} Sticker Pedia Official &bull; Secured client session
      </footer>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center font-mono text-sm">
          Loading client profile...
        </div>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
