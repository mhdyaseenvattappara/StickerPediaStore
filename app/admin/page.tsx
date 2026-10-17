'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Layers,
  DollarSign,
  AlertTriangle,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Printer,
  Truck,
  Flame,
  Search,
  RefreshCw,
  Edit2,
  Lock,
  Eye,
  Activity,
  Zap,
  LogOut,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  ArrowRight,
  X,
  Trash2,
  FileText,
  Sliders,
  Download,
  TrendingUp,
  Gauge,
  Cpu,
  Sparkles,
  Smile,
  Scissors,
  Droplet,
} from 'lucide-react';
import { useStickerStore } from '@/lib/store';
import { Product, PrintOrder, OrderStatus, FinishType, ProductCategory } from '@/lib/types';
import { StickerVisual } from '@/components/StickerVisual';

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    kpis,
    activities,
    isAdminAuthenticated,
    adminUser,
    loginAdmin,
    logoutAdmin,
    updateStock,
    toggleSoldOut,
    toggleProductActive,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductPrice,
    batchAdjustPrices,
    replenishAllStock,
    simulateIncomingOrder,
    resetToDefaults,
  } = useStickerStore();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tabs: queue | inventory | pricing | telemetry | activity
  const [activeTab, setActiveTab] = useState<'queue' | 'inventory' | 'pricing' | 'telemetry' | 'activity'>('queue');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFinishFilter, setSelectedFinishFilter] = useState<string>('all');

  // Modals & Sheets
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<PrintOrder | null>(null);

  // New product studio form state
  const [newProdName, setNewProdName] = useState('Cyber Acid Foil');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('die-cut');
  const [newProdFinish, setNewProdFinish] = useState<FinishType>('holographic');
  const [newProdIcon, setNewProdIcon] = useState('skull');
  const [newProdPrice, setNewProdPrice] = useState('4.50');
  const [newProdStock, setNewProdStock] = useState('40');
  const [newProdSize, setNewProdSize] = useState('3.0 x 3.0 in');
  const [newProdDesc, setNewProdDesc] = useState('Ultra-vibrant precision kiss-cut vinyl sticker with industrial 3M weather-shield backing.');

  // Pricing engine state
  const [batchPercent, setBatchPercent] = useState<number>(10);
  const [inlinePriceEditingId, setInlinePriceEditingId] = useState<string | null>(null);
  const [inlinePriceVal, setInlinePriceVal] = useState<string>('');

  // Hardware telemetry simulator state
  const [inkLevels, setInkLevels] = useState({
    cyan: 84,
    magenta: 78,
    yellow: 92,
    black: 65,
    lightCyan: 88,
    lightMagenta: 82,
    white: 59,
    glossPrimer: 73,
  });
  const [mediaRolls, setMediaRolls] = useState({
    holoVinyl: 68,
    mattePoly: 82,
    clearCast: 54,
  });
  const [telemetryStatus, setTelemetryStatus] = useState<'nominal' | 'calibrating' | 'cleaning'>('nominal');

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const success = loginAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid administrator credentials. Access restricted to authorized personnel.');
    } else {
      showToast('Admin session authenticated.');
    }
  };

  // If not authenticated, render strict login barrier
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0C0E] text-offwhite flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
        {/* Background subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e2227_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Brand Logo at top of Admin Login */}
        <Link href="/" className="relative z-10 mb-7 flex items-center space-x-3 group transition-transform hover:scale-105">
          <img
            src="/brand-logo.png"
            alt="Sticker.pedia Brand Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Reference Card: Rounded pill with crisp border, bold typography & circular neon button */}
        <div className="relative z-10 w-full max-w-lg rounded-[34px] sm:rounded-[40px] liquid-glass shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-7 sm:p-9 overflow-hidden">
          {/* Specular Liquid Glass Top Sheen Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          {/* Top Row: Title + Circular Neon Yellow Action Button */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-acid font-bold block mb-1">
                RESTRICTED PRODUCTION ACCESS
              </span>
              <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight leading-snug">
                Admin &amp; Factory Portal
              </h1>
            </div>

            {/* Circular Neon Yellow Action Button from reference image */}
            <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center shrink-0 font-bold shadow-sm">
              <Lock className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>

          <p className="text-xs sm:text-[13.5px] text-[#8E95A2] font-sans leading-relaxed mb-6">
            Authenticate with authorized management credentials to control inventory, adjust catalog pricing, inspect billing invoices, and monitor Roland print telemetry.
          </p>

          {loginError && (
            <div className="mb-5 p-3.5 sm:p-4 rounded-3xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs font-mono flex items-center space-x-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-[#8E95A2] uppercase text-[11px] mb-1.5 font-semibold">
                Staff Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@sticker.pedia"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl liquid-glass-input text-white placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E95A2] uppercase text-[11px] mb-1.5 font-semibold">
                Passkey
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl liquid-glass-input text-white placeholder:text-[#8E95A2]/50 focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>

            {/* Solid Neon Button from reference image */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-acid hover:bg-acid-hover text-black font-bold text-sm tracking-tight transition-transform active:scale-95 flex items-center justify-center space-x-2 mt-2"
            >
              <Lock className="w-4 h-4 stroke-[2]" />
              <span>Authenticate Staff Session</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#14171E] hover:bg-[#1A1E27] border border-white/10 text-xs font-mono text-[#8E95A2] hover:text-white transition-all"
            >
              <span>&larr; Return to Client Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFinish = selectedFinishFilter === 'all' || p.finish === selectedFinishFilter;
    return matchesSearch && matchesFinish;
  });

  // Kanban Order Buckets
  const receivedOrders = orders.filter((o) => o.status === 'received');
  const prePressOrders = orders.filter((o) => o.status === 'pre-press');
  const printingOrders = orders.filter((o) => o.status === 'printing');
  const dispatchedOrders = orders.filter((o) => o.status === 'dispatched');

  // Financial aggregates
  const grossBilled = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const aov = orders.length > 0 ? grossBilled / orders.length : 0;
  const estimatedCost = grossBilled * 0.18; // ~18% raw materials cost
  const grossMargin = grossBilled - estimatedCost;

  // New product submission
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const price = parseFloat(newProdPrice) || 3.99;
    const stock = parseInt(newProdStock, 10) || 30;

    addProduct({
      name: newProdName.trim(),
      category: newProdCategory,
      finish: newProdFinish,
      price: Math.max(0.99, price),
      stock: Math.max(1, stock),
      maxStock: Math.max(1, stock) * 2,
      active: true,
      size: newProdSize || '3.0 x 3.0 in',
      dimensions: 'Custom Precision Cut',
      rating: 5.0,
      reviewsCount: 1,
      description:
        newProdDesc ||
        `${newProdFinish.toUpperCase()} custom sticker printed with Japanese pigment inks on precision 3M substrate.`,
      iconName: newProdIcon,
    });

    setShowAddModal(false);
    showToast(`Published "${newProdName}" directly to live showcase!`);
    setNewProdName('');
    setNewProdDesc('');
  };

  // Edit product submission
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct);
    setEditingProduct(null);
    showToast(`Updated specs for "${editingProduct.name}".`);
  };

  // Delete product confirmation
  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    deleteProduct(deletingProduct.id);
    showToast(`Archived & removed SKU "${deletingProduct.sku}" from catalog.`);
    setDeletingProduct(null);
  };

  // Save inline price
  const handleSaveInlinePrice = (prodId: string) => {
    const parsed = parseFloat(inlinePriceVal);
    if (!isNaN(parsed) && parsed > 0) {
      updateProductPrice(prodId, parsed);
      showToast(`Updated SKU price to $${parsed.toFixed(2)}.`);
    }
    setInlinePriceEditingId(null);
  };

  // Telemetry simulation triggers
  const handleRefillInks = () => {
    setInkLevels({
      cyan: 100,
      magenta: 100,
      yellow: 100,
      black: 100,
      lightCyan: 100,
      lightMagenta: 100,
      white: 100,
      glossPrimer: 100,
    });
    showToast('Roland 8-Channel VG3 ink reservoirs replenished to 100%.');
  };

  const handlePrintheadCalibration = () => {
    setTelemetryStatus('calibrating');
    showToast('Initiating Roland TrueVIS precision optical head alignment...');
    setTimeout(() => {
      setTelemetryStatus('nominal');
      showToast('Printhead calibrated: 1200 DPI registration aligned.');
    }, 2500);
  };

  const handleAutoCleanCycle = () => {
    setTelemetryStatus('cleaning');
    showToast('Running ultrasonic piezoelectric nozzle flush...');
    setTimeout(() => {
      setTelemetryStatus('nominal');
      showToast('Nozzle check 100% nominal (0 blocked jets).');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-offwhite flex flex-col font-sans">
      {/* Top Staff Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.1] liquid-glass-dock">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3.5 group">
              {/* Brand Logo Image */}
              <img
                src="/brand-logo.png"
                alt="Sticker.pedia Brand Logo"
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-sans font-bold text-white text-base tracking-tight">
                    STICKER.PEDIA
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-acid text-black uppercase tracking-wider">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8E95A2] tracking-wider uppercase">
                  PRODUCTION &amp; REVENUE CONSOLE
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-acid/10 border border-acid/30 text-[10px] font-mono text-acid font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" />
              <span>FACTORY LINK ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#8E95A2]">
              <User className="w-3.5 h-3.5 text-acid" />
              <span className="text-white">{adminUser}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full liquid-glass-pill hover:bg-black/90 text-white hover:text-acid hover:border-acid transition-all"
            >
              View Storefront &rarr;
            </Link>

            <button
              onClick={() => {
                logoutAdmin();
                showToast('Signed out of admin session');
              }}
              className="px-4 py-2 rounded-full liquid-glass-pill hover:bg-red-950/40 border border-white/10 hover:border-red-500/50 text-[#8E95A2] hover:text-red-300 flex items-center space-x-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Real-time KPI Cards matching reference style */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {/* Card 1: Orders (Active/Featured card style) */}
          <div className="rounded-[34px] sm:rounded-[38px] liquid-glass-card p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-medium">
                  Total Orders
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-white">
                    {kpis.totalOrders}
                  </span>
                  <span className="font-mono text-[11px] text-acid font-bold">+18.4% today</span>
                </div>
              </div>
              {/* Circular Neon Yellow Action Button */}
              <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Package className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#8E95A2] border-t border-white/[0.08] pt-3 flex items-center justify-between">
              <span>All client submissions</span>
              <span className="text-white font-bold">{orders.length} in ledger</span>
            </div>
          </div>

          {/* Card 2: Print Queue */}
          <div className="rounded-[34px] sm:rounded-[38px] liquid-glass-card p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-medium">
                  Active Print Queue
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-acid">
                    {kpis.activeQueue}
                  </span>
                  <span className="font-mono text-[11px] text-[#8E95A2]">in flight</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Printer className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#8E95A2] border-t border-white/[0.08] pt-3 flex items-center justify-between">
              <span>Roland TrueVIS 8-Pass</span>
              <span className="text-emerald-400 font-bold">1440 DPI Online</span>
            </div>
          </div>

          {/* Card 3: Gross Revenue & Billings */}
          <div className="rounded-[34px] sm:rounded-[38px] liquid-glass-card p-6 sm:p-7 transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-medium">
                  Gross Billed Revenue
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-white">
                    ${grossBilled.toFixed(2)}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-bold">USD</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-full liquid-glass-pill text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                <DollarSign className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#8E95A2] border-t border-white/[0.08] pt-3 flex items-center justify-between">
              <span>AOV: ${aov.toFixed(2)}</span>
              <span className="text-emerald-400 font-bold">82% Margin</span>
            </div>
          </div>

          {/* Card 4: Inventory & Low Stock */}
          <div
            className={`rounded-[34px] sm:rounded-[38px] p-6 sm:p-7 border flex flex-col justify-between transition-all ${
              kpis.lowStockCount > 0
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 backdrop-blur-xl'
                : 'liquid-glass-card'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-medium">
                  Stock Health
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-amber-400">
                    {kpis.lowStockCount}
                  </span>
                  <span className="font-mono text-[11px] text-[#8E95A2]">low SKUs</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#1F232B] text-amber-400 flex items-center justify-center shrink-0 font-bold">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#8E95A2] border-t border-white/[0.08] pt-3 flex items-center justify-between">
              <span>Catalog: {products.length} SKUs</span>
              {kpis.lowStockCount > 0 ? (
                <button
                  onClick={() => {
                    replenishAllStock(50);
                    showToast('Emergency run: Replenished +50 units to low-stock SKUs.');
                  }}
                  className="text-amber-300 hover:text-white underline font-bold"
                >
                  Replenish All &rarr;
                </button>
              ) : (
                <span className="text-emerald-400 font-bold">Healthy</span>
              )}
            </div>
          </div>
        </section>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-5 mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'queue'
                  ? 'bg-acid text-black shadow-md'
                  : 'bg-[#111317] hover:bg-[#181C23] text-[#8E95A2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Printer className="w-3.5 h-3.5 stroke-[2]" />
              <span>Print Queue</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === 'queue' ? 'bg-black/25 text-black' : 'bg-white/10 text-white'
              }`}>
                {kpis.activeQueue}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'inventory'
                  ? 'bg-acid text-black shadow-md'
                  : 'bg-[#111317] hover:bg-[#181C23] text-[#8E95A2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Package className="w-3.5 h-3.5 stroke-[2]" />
              <span>Live Inventory</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === 'inventory' ? 'bg-black/25 text-black' : 'bg-white/10 text-white'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'pricing'
                  ? 'bg-acid text-black shadow-md'
                  : 'bg-[#111317] hover:bg-[#181C23] text-[#8E95A2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 stroke-[2]" />
              <span>Pricing &amp; Billings</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'telemetry'
                  ? 'bg-acid text-black shadow-md'
                  : 'bg-[#111317] hover:bg-[#181C23] text-[#8E95A2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 stroke-[2]" />
              <span>Roland VG3</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'activity'
                  ? 'bg-acid text-black shadow-md'
                  : 'bg-[#111317] hover:bg-[#181C23] text-[#8E95A2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Activity className="w-3.5 h-3.5 stroke-[2]" />
              <span>Audit Log</span>
            </button>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                simulateIncomingOrder();
                showToast('New simulated client order received with full shipping details!');
              }}
              className="px-5 py-2.5 rounded-full bg-[#111317] hover:bg-[#181C23] border border-white/15 hover:border-white/30 text-xs font-mono text-acid font-bold flex items-center space-x-2 transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Order</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black text-xs font-mono font-bold flex items-center space-x-2 transition-all active:scale-95 shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PRINT QUEUE & SHIPPING KANBAN TRACKER */}
        {activeTab === 'queue' && (
          <section className="space-y-6">
            <div className="p-4 sm:p-5 rounded-3xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-acid" />
                <span>Customer Shipping Address Included: Name, Phone, Place, District, PIN, State &amp; Country</span>
              </div>
              <span className="text-acid font-bold">Roland TrueVIS 8-Pass Engine Active</span>
            </div>

            {/* 4-Column Kanban Pipeline matching reference style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {/* Column 1: Received */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass p-5 flex flex-col min-h-[540px]">
                <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span className="font-mono text-xs font-bold uppercase text-white">
                      1. Received
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1A1D24] text-[11px] font-mono text-white font-bold">
                    {receivedOrders.length}
                  </span>
                </div>

                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[640px] pr-1">
                  <AnimatePresence>
                    {receivedOrders.map((ord) => (
                      <motion.div
                        layout
                        key={ord.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-[30px] bg-[#14171E] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-black text-acid">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] font-mono text-[#8E95A2]">
                              {ord.timestamp}
                            </span>
                          </div>

                          <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                            {ord.productName}
                          </h4>

                          {/* Customer Delivery Coordinates Card */}
                          <div className="mt-3 p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06] text-[11px] font-mono space-y-1">
                            <div className="flex items-center justify-between text-white font-semibold">
                              <span>{ord.name}</span>
                              <span className="text-acid text-[10px]">{ord.phone}</span>
                            </div>
                            <div className="text-[#8E95A2] text-[10px] flex items-start space-x-1">
                              <MapPin className="w-3 h-3 text-acid shrink-0 mt-0.5" />
                              <span className="line-clamp-2">
                                {ord.place}, {ord.district}, {ord.state} - {ord.pinCode}, {ord.country}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#8E95A2]">
                            <span>Qty: <strong className="text-white">{ord.quantity}x</strong></span>
                            <span>Finish: <strong className="text-acid uppercase">{ord.finish}</strong></span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-3 py-1.5 rounded-full bg-[#1F232B] hover:bg-[#282D37] border border-white/10 text-[11px] font-mono text-[#8E95A2] hover:text-white flex items-center space-x-1.5 transition-all"
                            title="Print Tax Invoice / Packing Slip"
                          >
                            <FileText className="w-3 h-3 text-acid" />
                            <span>Invoice</span>
                          </button>

                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'pre-press');
                              showToast(`Advanced #${ord.orderNumber} to Pre-Press`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-acid hover:bg-acid-hover text-black text-xs font-mono font-bold flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm"
                          >
                            <span>Pre-Press</span>
                            <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {receivedOrders.length === 0 && (
                    <div className="py-12 text-center text-xs font-mono text-[#8E95A2] border border-dashed border-white/10 rounded-3xl">
                      No orders awaiting pre-press
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2: Pre-Press / Cut Setup */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass p-5 flex flex-col min-h-[540px]">
                <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-mono text-xs font-bold uppercase text-white">
                      2. Pre-Press / Rip
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1A1D24] text-[11px] font-mono text-white font-bold">
                    {prePressOrders.length}
                  </span>
                </div>

                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[640px] pr-1">
                  <AnimatePresence>
                    {prePressOrders.map((ord) => (
                      <motion.div
                        layout
                        key={ord.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-[30px] bg-[#14171E] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-black text-amber-300">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] font-mono text-[#8E95A2]">
                              {ord.timestamp}
                            </span>
                          </div>

                          <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                            {ord.productName}
                          </h4>

                          <div className="mt-3 p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06] text-[11px] font-mono space-y-1">
                            <div className="flex items-center justify-between text-white font-semibold">
                              <span>{ord.name}</span>
                              <span className="text-amber-300 text-[10px]">{ord.phone}</span>
                            </div>
                            <div className="text-[#8E95A2] text-[10px] flex items-start space-x-1">
                              <MapPin className="w-3 h-3 text-amber-300 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">
                                {ord.district}, {ord.state} ({ord.pinCode})
                              </span>
                            </div>
                          </div>

                          <div className="mt-2.5 text-[10px] font-mono text-amber-300 bg-amber-950/30 border border-amber-900/40 p-2.5 rounded-2xl">
                            Vector Bleed Confirmed: 2.0mm Kiss Cut
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'received');
                              showToast(`Returned #${ord.orderNumber} to Received`);
                            }}
                            className="px-3 py-1.5 rounded-full bg-[#1F232B] hover:bg-[#282D37] text-[11px] font-mono text-[#8E95A2] hover:text-white transition-all"
                          >
                            Back
                          </button>

                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'printing');
                              showToast(`Advanced #${ord.orderNumber} to Printing`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-acid hover:bg-acid-hover text-black text-xs font-mono font-bold flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm"
                          >
                            <span>Print Run</span>
                            <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {prePressOrders.length === 0 && (
                    <div className="py-12 text-center text-xs font-mono text-[#8E95A2] border border-dashed border-white/10 rounded-3xl">
                      No files currently in RIP
                    </div>
                  )}
                </div>
              </div>

              {/* Column 3: Printing */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass p-5 flex flex-col min-h-[540px]">
                <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-acid animate-ping" />
                    <span className="font-mono text-xs font-bold uppercase text-acid">
                      3. Printing Run
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-acid/20 text-[11px] font-mono text-acid font-bold">
                    {printingOrders.length}
                  </span>
                </div>

                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[640px] pr-1">
                  <AnimatePresence>
                    {printingOrders.map((ord) => (
                      <motion.div
                        layout
                        key={ord.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-[30px] bg-[#14171E] border border-acid/40 transition-all flex flex-col justify-between shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-black text-acid">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] font-mono text-acid flex items-center space-x-1">
                              <Printer className="w-3 h-3 animate-bounce" />
                              <span>PRINTING</span>
                            </span>
                          </div>

                          <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                            {ord.productName}
                          </h4>

                          <div className="mt-3 p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06] text-[11px] font-mono space-y-1">
                            <div className="flex items-center justify-between text-white font-semibold">
                              <span>{ord.name}</span>
                              <span className="text-acid text-[10px]">{ord.phone}</span>
                            </div>
                            <div className="text-[#8E95A2] text-[10px] flex items-start space-x-1">
                              <MapPin className="w-3 h-3 text-acid shrink-0 mt-0.5" />
                              <span className="line-clamp-2">
                                {ord.district}, {ord.country}
                              </span>
                            </div>
                          </div>

                          {/* Live Progress Bar Animation */}
                          <div className="w-full bg-[#1A1D25] h-1.5 rounded-full mt-3 overflow-hidden">
                            <div className="bg-acid h-full w-2/3 animate-pulse" />
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'pre-press');
                              showToast(`Returned #${ord.orderNumber} to Pre-Press`);
                            }}
                            className="px-3 py-1.5 rounded-full bg-[#1F232B] hover:bg-[#282D37] text-[11px] font-mono text-[#8E95A2] hover:text-white transition-all"
                          >
                            Back
                          </button>

                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'dispatched');
                              showToast(`Dispatched #${ord.orderNumber} for delivery!`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm"
                          >
                            <Truck className="w-3 h-3 stroke-[2.2]" />
                            <span>Dispatch</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {printingOrders.length === 0 && (
                    <div className="py-12 text-center text-xs font-mono text-[#8E95A2] border border-dashed border-white/10 rounded-3xl">
                      Print head on standby
                    </div>
                  )}
                </div>
              </div>

              {/* Column 4: Dispatched */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass p-5 flex flex-col min-h-[540px]">
                <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-xs font-bold uppercase text-white">
                      4. Dispatched
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[11px] font-mono text-emerald-400 font-bold">
                    {dispatchedOrders.length}
                  </span>
                </div>

                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[640px] pr-1">
                  <AnimatePresence>
                    {dispatchedOrders.map((ord) => (
                      <motion.div
                        layout
                        key={ord.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-[30px] bg-[#14171E] border border-white/[0.08] transition-all flex flex-col justify-between shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-bold text-[#8E95A2]">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>IN TRANSIT</span>
                            </span>
                          </div>

                          <h4 className="font-sans font-bold text-sm text-white/90 line-clamp-1">
                            {ord.productName}
                          </h4>

                          <div className="mt-3 p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06] text-[11px] font-mono space-y-1">
                            <div className="flex items-center justify-between text-white">
                              <span>{ord.name}</span>
                              <span className="text-[#8E95A2] text-[10px]">{ord.phone}</span>
                            </div>
                            <div className="text-[#8E95A2] text-[10px] line-clamp-2">
                              {ord.place}, {ord.district}, {ord.state} - {ord.pinCode}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-3 py-1.5 rounded-full bg-[#1F232B] hover:bg-[#282D37] text-acid hover:text-white flex items-center space-x-1.5 transition-all"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Slip</span>
                          </button>
                          <span className="text-emerald-400 font-bold">${ord.totalAmount.toFixed(2)} USD</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {dispatchedOrders.length === 0 && (
                    <div className="py-12 text-center text-xs font-mono text-[#8E95A2] border border-dashed border-white/10 rounded-3xl">
                      No dispatched shipments yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: INVENTORY & SHOWCASE CONTROLLER */}
        {activeTab === 'inventory' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-[34px] sm:rounded-[38px] liquid-glass">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8E95A2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search SKU or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-xs font-mono text-white placeholder:text-[#8E95A2]/60 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-mono text-[#8E95A2] uppercase font-semibold">Finish:</span>
                {['all', 'holographic', 'matte', 'gloss', 'transparent'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinishFilter(f)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase transition-all ${
                      selectedFinishFilter === f
                        ? 'bg-acid text-black font-bold shadow-sm'
                        : 'bg-[#16181F] text-[#8E95A2] hover:text-white border border-white/10'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[34px] sm:rounded-[38px] liquid-glass overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0B0D11] border-b border-white/[0.08] text-[#8E95A2] uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-5">SKU / Item</th>
                      <th className="py-4 px-4">Finish</th>
                      <th className="py-4 px-4">Unit Price</th>
                      <th className="py-4 px-4">Live Stock</th>
                      <th className="py-4 px-4">Quick Adjust</th>
                      <th className="py-4 px-4 text-center">Availability</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {filteredProducts.map((product) => {
                      const isSoldOut = product.soldOutOverride || product.stock === 0;
                      const isLow = product.stock > 0 && product.stock <= 5;
                      const isEditingThisPrice = inlinePriceEditingId === product.id;

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-[#151821]/80 transition-colors group"
                        >
                          <td className="py-4 px-5">
                            <div className="flex items-center space-x-3.5">
                              <div className="w-10 h-10 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                                <StickerVisual
                                  finish={product.finish}
                                  iconName={product.iconName}
                                  size={34}
                                  showBorder={false}
                                />
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm group-hover:text-acid transition-colors">
                                  {product.name}
                                </div>
                                <div className="text-[10px] text-[#8E95A2]">
                                  {product.sku} &bull; {product.size}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-[#16181F] text-[10px] uppercase font-bold text-white">
                              {product.finish}
                            </span>
                          </td>

                          {/* Interactive Inline Price Editing */}
                          <td className="py-4 px-4">
                            {isEditingThisPrice ? (
                              <div className="flex items-center space-x-1.5">
                                <span className="text-[#8E95A2]">$</span>
                                <input
                                  type="number"
                                  step="0.05"
                                  autoFocus
                                  value={inlinePriceVal}
                                  onChange={(e) => setInlinePriceVal(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveInlinePrice(product.id);
                                    if (e.key === 'Escape') setInlinePriceEditingId(null);
                                  }}
                                  className="w-16 px-2 py-1 rounded-lg bg-black border border-acid text-white text-xs font-mono font-bold focus:outline-none"
                                />
                                <button
                                  onClick={() => handleSaveInlinePrice(product.id)}
                                  className="px-2.5 py-1 rounded-full bg-acid text-black font-bold text-[10px]"
                                >
                                  OK
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setInlinePriceEditingId(product.id);
                                  setInlinePriceVal(product.price.toString());
                                }}
                                className="inline-flex items-center space-x-1.5 cursor-pointer group/price hover:text-acid"
                                title="Click to adjust pricing"
                              >
                                <span className="font-bold text-white text-sm">
                                  ${product.price.toFixed(2)}
                                </span>
                                <Edit2 className="w-3 h-3 text-[#8E95A2] group-hover/price:text-acid opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-base font-black ${
                                  isSoldOut
                                    ? 'text-red-400'
                                    : isLow
                                    ? 'text-amber-400'
                                    : 'text-acid'
                                }`}
                              >
                                {product.stock}
                              </span>
                              <span className="text-[10px] text-[#8E95A2] uppercase">units</span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="inline-flex items-center space-x-1.5 p-1 rounded-full bg-[#16181F] border border-white/10">
                              <button
                                onClick={() => {
                                  updateStock(product.id, -1);
                                  showToast(`Decremented stock for ${product.name}`);
                                }}
                                disabled={product.stock <= 0}
                                className="w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-[#8E95A2] hover:text-white hover:border-acid disabled:opacity-40 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => {
                                  updateStock(product.id, 1);
                                  showToast(`Incremented stock for ${product.name}`);
                                }}
                                className="w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-[#8E95A2] hover:text-white hover:border-acid transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => {
                                  updateStock(product.id, 10);
                                  showToast(`Added batch (+10) to ${product.name}`);
                                }}
                                className="px-2 h-6 rounded-full bg-black border border-white/10 text-[10px] text-[#8E95A2] hover:text-acid hover:border-acid transition-colors"
                              >
                                +10
                              </button>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => {
                                toggleSoldOut(product.id);
                                showToast(`Toggled availability for ${product.name}`);
                              }}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-200 border ${
                                isSoldOut
                                  ? 'bg-red-950/40 border-red-800 text-red-300'
                                  : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                              }`}
                            >
                              {isSoldOut ? 'Sold Out' : 'Active (In Stock)'}
                            </button>
                          </td>

                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-2 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-[#8E95A2] hover:text-acid transition-colors"
                                title="Edit specs & description"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  toggleProductActive(product.id);
                                  showToast(
                                    `${product.active ? 'Hidden from' : 'Published to'} storefront`
                                  );
                                }}
                                className={`p-2 rounded-full border transition-colors ${
                                  product.active
                                    ? 'bg-[#16181F] text-acid border-white/10 hover:border-acid'
                                    : 'bg-black text-[#8E95A2] border-white/10 hover:text-white'
                                }`}
                                title={product.active ? 'Live on storefront' : 'Hidden from storefront'}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeletingProduct(product)}
                                className="p-2 rounded-full bg-[#16181F] hover:bg-red-950/50 border border-white/10 hover:border-red-700 text-[#8E95A2] hover:text-red-400 transition-colors"
                                title="Archive / Delete SKU"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: PRICING & BILLINGS ENGINE */}
        {activeTab === 'pricing' && (
          <section className="space-y-8">
            {/* Top Pricing Controls & Batch Rate Modifier */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Batch Price Modifier Card matching reference style */}
              <div className="rounded-[34px] sm:rounded-[38px] bg-[#101317] border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-semibold">
                        Catalog Price Engine
                      </span>
                      <h3 className="font-sans font-bold text-xl text-white mt-1">
                        Batch Rate Adjustments
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <Sliders className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>
                  <p className="text-xs font-sans text-[#8E95A2] leading-relaxed mb-5">
                    Instantly markup or discount all {products.length} live catalog items across all finishes and substrates.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { label: '+5% Inflation', val: 5 },
                      { label: '+10% Prime', val: 10 },
                      { label: '+20% Peak Run', val: 20 },
                      { label: '-10% Flash Promo', val: -10 },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => {
                          batchAdjustPrices(btn.val);
                          showToast(`Applied ${btn.val > 0 ? '+' : ''}${btn.val}% across all catalog SKUs!`);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 hover:border-acid text-xs font-mono text-white transition-all active:scale-95"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#8E95A2]">
                  <span>Custom Delta:</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={batchPercent}
                      onChange={(e) => setBatchPercent(parseInt(e.target.value, 10) || 0)}
                      className="w-16 px-2.5 py-1 rounded-full bg-[#16181F] border border-white/10 text-center text-xs font-mono text-white focus:border-acid focus:outline-none"
                    />
                    <span>%</span>
                    <button
                      onClick={() => {
                        batchAdjustPrices(batchPercent);
                        showToast(`Applied ${batchPercent}% catalog-wide price adjustment.`);
                      }}
                      className="px-4 py-1.5 rounded-full bg-acid text-black font-bold text-xs hover:bg-acid-hover active:scale-95 shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Substrate Baseline Price Guide matching reference style */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass hover:border-white/20 p-6 sm:p-7 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-semibold">
                        Substrate Pricing Guide
                      </span>
                      <h3 className="font-sans font-bold text-xl text-white mt-1">
                        Finish Matrix &amp; Yield
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#1F232B] text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                      <DollarSign className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>
                  <div className="space-y-2.5 text-xs font-mono mb-4">
                    <div className="flex items-center justify-between p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06]">
                      <span className="text-white font-bold">Holographic Prismatic</span>
                      <span className="text-acid font-mono font-bold">$4.20 - $5.50 / unit</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06]">
                      <span className="text-white font-bold">Velvet Matte 3M</span>
                      <span className="text-white font-mono font-bold">$3.80 - $4.50 / unit</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06]">
                      <span className="text-white font-bold">UV Ultra-Gloss</span>
                      <span className="text-white font-mono font-bold">$3.90 - $4.80 / unit</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-3xl bg-[#0B0D11] border border-white/[0.06]">
                      <span className="text-white font-bold">Optical Clear Cast</span>
                      <span className="text-white font-mono font-bold">$4.00 - $5.00 / unit</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono text-[#8E95A2]">
                  Industrial solvent adhesive &amp; UV resin laminates included by default.
                </div>
              </div>

              {/* Profit & Unit Economics matching reference style */}
              <div className="rounded-[34px] sm:rounded-[38px] liquid-glass hover:border-white/20 p-6 sm:p-7 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#8E95A2] uppercase tracking-wider block font-semibold">
                        Unit Economics &amp; Margin
                      </span>
                      <h3 className="font-sans font-bold text-xl text-white mt-1">
                        Financial Summary
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#1F232B] text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                      <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>
                  <div className="space-y-3 font-mono text-xs mb-5">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                      <span className="text-[#8E95A2]">Gross Order Billings</span>
                      <span className="text-white font-bold">${grossBilled.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                      <span className="text-[#8E95A2]">Est. Pigments &amp; Vinyl</span>
                      <span className="text-amber-400 font-bold">-${estimatedCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-white font-bold">Net Gross Margin</span>
                      <span className="text-emerald-400 font-black text-sm">${grossMargin.toFixed(2)} (82%)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      const csvContent =
                        'OrderNumber,Date,Customer,Phone,Address,Product,Finish,Quantity,Total\n' +
                        orders
                          .map(
                            (o) =>
                              `"${o.orderNumber}","${o.timestamp}","${o.name}","${o.phone}","${o.place}, ${o.district}, ${o.state}","${o.productName}","${o.finish}",${o.quantity},${o.totalAmount}`
                          )
                          .join('\n');
                      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.setAttribute('href', url);
                      link.setAttribute('download', `stickerpedia_billing_ledger_${Date.now()}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast('Exported complete billing registry to CSV.');
                    }}
                    className="w-full py-3 px-5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-xs font-mono text-white font-bold flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-acid" />
                    <span>Export Billing Ledger (CSV)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Billings Ledger Table matching reference style */}
            <div className="rounded-[34px] sm:rounded-[38px] liquid-glass overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/[0.08] bg-[#0B0D11] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-sans font-bold text-lg text-white flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-acid" />
                    <span>Customer Billings &amp; Invoices Ledger</span>
                  </h3>
                  <p className="text-xs font-mono text-[#8E95A2] mt-1">
                    Itemized record of client submissions, tax invoices, and shipping destinations.
                  </p>
                </div>
                <span className="text-xs font-mono text-white bg-[#16181F] px-3.5 py-1.5 rounded-full border border-white/10 font-bold">
                  {orders.length} Records Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0B0D11] border-b border-white/[0.08] text-[#8E95A2] uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Invoice / Order #</th>
                      <th className="py-4 px-4">Client Contact</th>
                      <th className="py-4 px-4">Delivery Coordinates</th>
                      <th className="py-4 px-4">Ordered Line Item</th>
                      <th className="py-4 px-4">Finish</th>
                      <th className="py-4 px-4">Billed Total</th>
                      <th className="py-4 px-5 text-right">Invoice Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#151821]/80 transition-colors">
                        <td className="py-4 px-5 font-bold text-acid">
                          #{ord.orderNumber}
                          <div className="text-[10px] text-[#8E95A2] font-normal">{ord.timestamp}</div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{ord.name}</div>
                          <div className="text-[10px] text-[#8E95A2]">{ord.phone}</div>
                          <div className="text-[10px] text-[#8E95A2]">{ord.email}</div>
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <div className="text-white text-[11px]">
                            {ord.place}, {ord.district}
                          </div>
                          <div className="text-[#8E95A2] text-[10px]">
                            {ord.state} - {ord.pinCode}, {ord.country}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{ord.productName}</div>
                          <div className="text-[10px] text-[#8E95A2]">Qty: {ord.quantity}x units</div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full border border-white/10 bg-[#16181F] text-[10px] uppercase font-bold text-white">
                            {ord.finish}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-emerald-400 text-sm">
                            ${ord.totalAmount.toFixed(2)}
                          </div>
                          <span className="text-[9px] uppercase tracking-wider text-[#8E95A2]">
                            PAID / VERIFIED
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-4 py-1.5 rounded-full bg-[#16181F] hover:bg-acid hover:text-black border border-white/10 text-xs font-mono text-acid font-bold transition-all inline-flex items-center space-x-1.5 active:scale-95 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Tax Invoice &amp; Slip</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-xs font-mono text-[#8E95A2]">
                          No customer billing records available. Click &ldquo;Simulate Order&rdquo; above to generate.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: ROLAND VG3 HARDWARE & TELEMETRY */}
        {activeTab === 'telemetry' && (
          <section className="space-y-8">
            {/* Top Roland status header matching reference style */}
            <div className="p-7 rounded-[34px] sm:rounded-[38px] bg-[#101317] border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-acid text-black flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <Printer className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-sans font-bold text-xl text-white">
                      Roland TrueVIS VG3-640
                    </h3>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 border border-emerald-700 text-emerald-400">
                      {telemetryStatus === 'nominal' ? 'ONLINE & READY' : telemetryStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#8E95A2] mt-1">
                    Japanese 8-Channel Precision Piezoelectric Printhead Engine with Integrated Bleed Drag Knife.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAutoCleanCycle}
                  disabled={telemetryStatus !== 'nominal'}
                  className="px-5 py-2.5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-xs font-mono text-white hover:text-acid disabled:opacity-50 transition-all active:scale-95"
                >
                  Nozzle Clean Cycle
                </button>

                <button
                  onClick={handlePrintheadCalibration}
                  disabled={telemetryStatus !== 'nominal'}
                  className="px-5 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black text-xs font-mono font-bold disabled:opacity-50 transition-all active:scale-95 shadow-sm"
                >
                  Calibrate Printhead (1200 DPI)
                </button>
              </div>
            </div>

            {/* Ink Reservoir Telemetry Gauges matching reference style */}
            <div className="rounded-[34px] sm:rounded-[38px] liquid-glass p-7 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h4 className="font-sans font-bold text-lg text-white flex items-center space-x-2">
                    <Droplet className="w-4 h-4 text-acid" />
                    <span>Roland TR2 8-Color Pigment Ink Cartridges</span>
                  </h4>
                  <p className="text-xs font-sans text-[#8E95A2] mt-1">
                    Real-time liquid level sensor array. GreenGuard Gold certified UV inks.
                  </p>
                </div>

                <button
                  onClick={handleRefillInks}
                  className="px-5 py-2 rounded-full bg-[#16181F] hover:bg-acid hover:text-black border border-white/10 text-xs font-mono text-acid font-bold transition-all active:scale-95 shadow-sm"
                >
                  Refill All Cartridges (100%)
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { name: 'Cyan (C)', color: '#00f2fe', level: inkLevels.cyan },
                  { name: 'Magenta (M)', color: '#ff007a', level: inkLevels.magenta },
                  { name: 'Yellow (Y)', color: '#ffe600', level: inkLevels.yellow },
                  { name: 'Key Black (K)', color: '#555e6d', level: inkLevels.black },
                  { name: 'Light Cyan (Lc)', color: '#7ce7ff', level: inkLevels.lightCyan },
                  { name: 'Light Mag (Lm)', color: '#ff80bf', level: inkLevels.lightMagenta },
                  { name: 'Opaque White (Wh)', color: '#ffffff', level: inkLevels.white },
                  { name: 'Gloss Primer (Pr)', color: 'var(--acid)', level: inkLevels.glossPrimer },
                ].map((ink) => (
                  <div
                    key={ink.name}
                    className="p-4 rounded-[30px] bg-[#16181F] border border-white/[0.06] flex flex-col items-center justify-between"
                  >
                    <span className="text-[11px] font-mono font-bold text-white text-center mb-3">
                      {ink.name}
                    </span>

                    {/* Tank visual bar */}
                    <div className="w-8 h-28 rounded-full bg-black border border-white/10 p-1 flex flex-col justify-end overflow-hidden mb-3">
                      <div
                        className="w-full rounded-full transition-all duration-700"
                        style={{
                          height: `${ink.level}%`,
                          backgroundColor: ink.color,
                        }}
                      />
                    </div>

                    <span className="font-mono text-xs font-black text-white">
                      {ink.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Rolls Loaded */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-7 rounded-[34px] sm:rounded-[38px] liquid-glass hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#8E95A2] uppercase">Spool 01</span>
                  <span className="text-xs font-mono font-bold text-acid">{mediaRolls.holoVinyl}m Left</span>
                </div>
                <h5 className="font-sans font-bold text-base text-white mb-2">
                  3M Cast Holographic Vinyl (64&quot;)
                </h5>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-acid h-full" style={{ width: `${mediaRolls.holoVinyl}%` }} />
                </div>
                <div className="text-[11px] font-mono text-[#8E95A2]">
                  Loaded on Roland spindle #1 &bull; 120 micron
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-[34px] sm:rounded-[38px] liquid-glass hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#8E95A2] uppercase">Spool 02</span>
                  <span className="text-xs font-mono font-bold text-white">{mediaRolls.mattePoly}m Left</span>
                </div>
                <h5 className="font-sans font-bold text-base text-white mb-2">
                  Velvet Matte Polymeric (54&quot;)
                </h5>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-white h-full" style={{ width: `${mediaRolls.mattePoly}%` }} />
                </div>
                <div className="text-[11px] font-mono text-[#8E95A2]">
                  Loaded on Roland spindle #2 &bull; 90 micron
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-[34px] sm:rounded-[38px] liquid-glass hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#8E95A2] uppercase">Spool 03</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{mediaRolls.clearCast}m Left</span>
                </div>
                <h5 className="font-sans font-bold text-base text-white mb-2">
                  Optical Clear Cast Poly (64&quot;)
                </h5>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-amber-400 h-full" style={{ width: `${mediaRolls.clearCast}%` }} />
                </div>
                <div className="text-[11px] font-mono text-[#8E95A2]">
                  Loaded on Roland spindle #3 &bull; Ultra-transparent
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: AUDIT ACTIVITY LOG */}
        {activeTab === 'activity' && (
          <section className="rounded-[34px] sm:rounded-[38px] liquid-glass p-7 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <div>
                <h3 className="font-sans font-bold text-xl text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-acid" />
                  <span>Real-time Reactive Audit Stream</span>
                </h3>
                <p className="text-xs font-mono text-[#8E95A2] mt-1">
                  Chronological event log synchronized across tabs via BroadcastChannel.
                </p>
              </div>

              <div className="text-xs font-mono text-acid bg-acid/10 border border-acid/30 px-3.5 py-1.5 rounded-full flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
                <span>RECEIVING LIVE STREAM</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-[24px] bg-[#16181F] border border-white/[0.06] flex items-start justify-between gap-4"
                >
                  <div className="flex items-start space-x-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                        act.actor === 'admin'
                          ? 'bg-acid text-black'
                          : act.actor === 'client'
                          ? 'bg-sky-400 text-black'
                          : 'bg-black border border-white/10 text-[#8E95A2]'
                      }`}
                    >
                      {act.actor}
                    </span>
                    <span className="text-white leading-relaxed">{act.message}</span>
                  </div>

                  <span className="text-[#8E95A2] text-[11px] shrink-0">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL 1: ADD PRODUCT STUDIO (WITH LIVE VISUAL PREVIEW & ICON PICKER) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[36px] sm:rounded-[40px] liquid-glass p-6 sm:p-8 shadow-2xl relative my-8">
            {/* Specular Liquid Glass Top Sheen Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-white">
                    Add Product Studio
                  </h3>
                  <p className="text-xs font-mono text-[#8E95A2]">
                    Configure design, finish substrate, and launch directly to storefront.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="w-11 h-11 rounded-full bg-[#1F232B] hover:bg-[#282D37] text-gray-300 hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Form & Live Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Live Sticker Preview Card */}
              <div className="md:col-span-5 p-5 rounded-[30px] bg-[#000000] border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-[#8E95A2] uppercase tracking-widest mb-3">
                  Live Preview
                </span>

                <div className="py-4 flex items-center justify-center">
                  <StickerVisual
                    finish={newProdFinish}
                    iconName={newProdIcon}
                    name={newProdName}
                    size={140}
                  />
                </div>

                <div className="mt-4 w-full text-center">
                  <div className="font-sans font-bold text-white text-sm truncate">
                    {newProdName || 'Untitled Sticker'}
                  </div>
                  <div className="text-[11px] font-mono text-acid font-bold mt-0.5">
                    ${parseFloat(newProdPrice || '0').toFixed(2)} USD
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#16181F] border border-white/10 text-[#8E95A2]">
                    {newProdFinish} finish
                  </span>
                </div>
              </div>

              {/* Right Column: Form Inputs */}
              <form onSubmit={handleCreateProductSubmit} className="md:col-span-7 space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Product Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Prism Glitch Cyber Skull"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                {/* Icon selector chips */}
                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Center Graphic Motif</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'skull', label: 'Cyber Skull' },
                      { id: 'smile', label: 'Acid Smiley' },
                      { id: 'cpu', label: 'Neural CPU' },
                      { id: 'sparkles', label: 'Sparkles' },
                      { id: 'shield', label: 'Aegis Shield' },
                      { id: 'scissors', label: 'Kiss Cut' },
                    ].map((icon) => (
                      <button
                        key={icon.id}
                        type="button"
                        onClick={() => setNewProdIcon(icon.id)}
                        className={`py-2 px-2 rounded-full text-[11px] font-mono transition-all text-center ${
                          newProdIcon === icon.id
                            ? 'bg-acid text-black font-bold'
                            : 'bg-[#16181F] border border-white/10 text-[#8E95A2] hover:text-white'
                        }`}
                      >
                        {icon.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Substrate Finish</label>
                    <select
                      value={newProdFinish}
                      onChange={(e) => setNewProdFinish(e.target.value as FinishType)}
                      className="w-full px-3 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                    >
                      <option value="holographic" className="bg-black text-white">Prismatic Holographic</option>
                      <option value="matte" className="bg-black text-white">Velvet Matte</option>
                      <option value="gloss" className="bg-black text-white">High Gloss UV</option>
                      <option value="transparent" className="bg-black text-white">Optical Clear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Store Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                    >
                      <option value="die-cut" className="bg-black text-white">Die-Cut Vinyl</option>
                      <option value="holographic" className="bg-black text-white">Holographic Sheets</option>
                      <option value="packs" className="bg-black text-white">Brand Collector Packs</option>
                      <option value="sheets" className="bg-black text-white">Optical Clear</option>
                      <option value="industrial" className="bg-black text-white">Industrial Tough</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Price ($)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Initial Units</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Dimensions</label>
                    <input
                      type="text"
                      value={newProdSize}
                      onChange={(e) => setNewProdSize(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Material specs, weather-resistance notes..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[24px] bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-[#8E95A2] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black font-bold transition-transform active:scale-95"
                  >
                    Launch SKU to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-lg rounded-[36px] sm:rounded-[40px] liquid-glass p-6 sm:p-8 shadow-2xl relative">
            {/* Specular Liquid Glass Top Sheen Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-acid text-black flex items-center justify-center font-bold">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-white">
                    Edit SKU
                  </h3>
                  <p className="text-xs font-mono text-[#8E95A2]">{editingProduct.sku}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-11 h-11 rounded-full bg-[#1F232B] hover:bg-[#282D37] text-gray-300 hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Finish</label>
                  <select
                    value={editingProduct.finish}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, finish: e.target.value as FinishType })
                    }
                    className="w-full px-3 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                  >
                    <option value="holographic" className="bg-black text-white">Prismatic Holographic</option>
                    <option value="matte" className="bg-black text-white">Velvet Matte</option>
                    <option value="gloss" className="bg-black text-white">High Gloss UV</option>
                    <option value="transparent" className="bg-black text-white">Optical Clear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Price ($)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })
                    }
                    required
                    className="w-full px-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Stock Level</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) || 0 })
                    }
                    required
                    className="w-full px-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Dimensions</label>
                  <input
                    type="text"
                    value={editingProduct.size}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-full bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8E95A2] uppercase mb-1.5 text-[11px]">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-[24px] bg-[#16181F] border border-white/10 text-white focus:border-acid focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-[#8E95A2] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-acid hover:bg-acid-hover text-black font-bold transition-transform active:scale-95"
                >
                  Save &amp; Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE PRODUCT CONFIRMATION */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-md rounded-[36px] sm:rounded-[40px] liquid-glass border border-red-500/40 p-6 sm:p-8 shadow-2xl relative">
            <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Archive &amp; Delete SKU?
            </h3>
            <p className="text-xs font-mono text-[#8E95A2] leading-relaxed mb-6">
              Are you sure you want to remove <strong className="text-white">{deletingProduct.name}</strong> ({deletingProduct.sku}) from the active catalog? This will unpublish it from the storefront immediately.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-5 py-2.5 rounded-full bg-[#16181F] hover:bg-[#1E222B] border border-white/10 text-[#8E95A2] hover:text-white text-xs font-mono transition-colors"
              >
                Keep SKU
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono transition-transform active:scale-95"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PRINTABLE TAX INVOICE & PACKING SLIP */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[36px] sm:rounded-[40px] bg-white text-black p-8 shadow-2xl relative my-8 font-sans">
            {/* Modal actions bar */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6 print:hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">
                Tax Invoice &amp; Dispatch Slip
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-gray-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setInvoiceOrder(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-black text-2xl tracking-tighter">
                    STICKER.PEDIA // FACTORY
                  </h2>
                  <p className="text-xs font-mono text-gray-600 mt-1">
                    Precision Printed Vinyl &amp; Custom Substrates
                  </p>
                  <div className="text-[11px] font-mono text-gray-500 mt-2">
                    VAT/Tax ID: STK-JP-94820184<br />
                    Roland RIP Verification: VG3-ONLINE-CERTIFIED
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-gray-500 uppercase">INVOICE NO.</div>
                  <div className="font-mono text-xl font-black text-black">
                    #{invoiceOrder.orderNumber}
                  </div>
                  <div className="text-xs font-mono text-gray-500 mt-1">
                    Date: {invoiceOrder.timestamp}
                  </div>
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-emerald-100 text-emerald-800">
                    STATUS: PAID
                  </span>
                </div>
              </div>

              {/* Addresses section */}
              <div className="grid grid-cols-2 gap-6 p-4 rounded-3xl bg-gray-50 border border-gray-200 text-xs font-mono">
                <div>
                  <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider block mb-1">
                    Shipped From:
                  </span>
                  <div className="font-bold text-black">Sticker.pedia Production Hub</div>
                  <div className="text-gray-600">Unit 4, Roland Print Precision Lab</div>
                  <div className="text-gray-600">Tokyo / Worldwide Dispatch Hub</div>
                  <div className="text-gray-600">contact@sticker.pedia</div>
                </div>

                <div>
                  <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider block mb-1">
                    Customer Delivery Address:
                  </span>
                  <div className="font-bold text-black">{invoiceOrder.name}</div>
                  <div className="text-gray-600">{invoiceOrder.phone} &bull; {invoiceOrder.email}</div>
                  <div className="text-gray-800 mt-1 font-medium">
                    {invoiceOrder.place}, {invoiceOrder.district}
                  </div>
                  <div className="text-gray-800 font-medium">
                    {invoiceOrder.state} - {invoiceOrder.pinCode}, {invoiceOrder.country}
                  </div>
                </div>
              </div>

              {/* Line items table */}
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b-2 border-black text-gray-600 uppercase text-[11px]">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">Finish</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 font-bold text-black">
                      {invoiceOrder.productName}
                      <div className="text-[10px] text-gray-500 font-normal">
                        Kiss-cut industrial vinyl with weather-shield laminate
                      </div>
                    </td>
                    <td className="py-3 uppercase text-gray-700 font-bold">
                      {invoiceOrder.finish}
                    </td>
                    <td className="py-3 text-center font-bold">
                      {invoiceOrder.quantity}
                    </td>
                    <td className="py-3 text-right">
                      ${(invoiceOrder.totalAmount / invoiceOrder.quantity).toFixed(2)}
                    </td>
                    <td className="py-3 text-right font-bold text-black">
                      ${invoiceOrder.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Financial Totals */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${(invoiceOrder.totalAmount * 0.95).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Environmental Surcharge (5%):</span>
                    <span>${(invoiceOrder.totalAmount * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Worldwide Express:</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-black pt-2 font-bold text-sm text-black">
                    <span>Total Billed:</span>
                    <span>${invoiceOrder.totalAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Footer Note & Barcode */}
              <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <div>
                  Thank you for ordering with Sticker.pedia!<br />
                  For inquiries or reorders: support@sticker.pedia
                </div>

                <div className="text-right">
                  <div className="tracking-widest font-bold text-gray-700">||| |||| || | |||| ||| ||||</div>
                  <div className="text-[9px]">JOB-UID: {invoiceOrder.id.slice(0, 16)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full liquid-glass-pill border border-acid text-xs font-mono text-white flex items-center space-x-3 shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
