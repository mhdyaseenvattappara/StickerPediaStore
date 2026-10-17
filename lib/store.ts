'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, PrintOrder, OrderStatus, ActivityEvent, SyncMessage, CustomerShippingDetails, ClientAccount } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './initial-data';
import {
  syncOrderToSupabase,
  syncProfileToSupabase,
  fetchOrdersFromSupabase,
  updateOrderStatusInSupabase,
  isSupabaseConfigured,
} from './supabase';

const STORAGE_KEY = 'sticker_pedia_catalog_v3';
const CHANNEL_NAME = 'sticker_pedia_sync_bus_secure';
const CUSTOMER_STORAGE_KEY = 'sticker_pedia_client_profile_v1';
const ADMIN_SESSION_KEY = 'sticker_pedia_admin_auth_v1';

export interface StoreState {
  products: Product[];
  orders: PrintOrder[];
  activities: ActivityEvent[];
  lastSyncTimestamp: number;
}

const DEFAULT_STORE_STATE: StoreState = {
  products: INITIAL_PRODUCTS,
  orders: INITIAL_ORDERS,
  activities: [
    {
      id: 'act-init-1',
      type: 'status_change',
      message: 'Roland TrueVIS VG3 Print Engine calibrated for 6-mil holographic media',
      timestamp: '12m ago',
      actor: 'system',
    },
  ],
  lastSyncTimestamp: 1711800000000,
};

const getStoredState = (): StoreState => {
  if (typeof window === 'undefined') {
    return DEFAULT_STORE_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.products && parsed.orders) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored state, using defaults', err);
  }

  return DEFAULT_STORE_STATE;
};

export const DEFAULT_CUSTOMER: CustomerShippingDetails = {
  name: 'Alex Rivera',
  email: 'alex.rivera@hyperstudio.design',
  phone: '+91 98450 11223',
  place: 'Flat 402, Skyline Residency, 12th Main',
  district: 'Bengaluru Urban',
  pinCode: '560034',
  state: 'Karnataka',
  country: 'India',
};

export function useStickerStore() {
  const [state, setState] = useState<StoreState>(DEFAULT_STORE_STATE);
  const [isClient, setIsClient] = useState(false);
  const [syncFlash, setSyncFlash] = useState(false);

  // Customer session & saved profile
  const [customer, setCustomer] = useState<CustomerShippingDetails>(DEFAULT_CUSTOMER);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  // Theme Accent System ('acid' | 'cyan' | 'violet')
  const [themeAccent, setThemeAccentState] = useState<'acid' | 'cyan' | 'violet'>('acid');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const clientId = useRef<string>(`client_${Math.random().toString(36).substring(2, 9)}`);

  // Function to apply theme accent to CSS variables
  const applyThemeColors = useCallback((accent: 'acid' | 'cyan' | 'violet') => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (accent === 'cyan') {
      root.style.setProperty('--acid', '#00f2fe');
      root.style.setProperty('--acid-rgb', '0, 242, 254');
    } else if (accent === 'violet') {
      root.style.setProperty('--acid', '#f43f5e');
      root.style.setProperty('--acid-rgb', '244, 63, 94');
    } else {
      root.style.setProperty('--acid', '#E2F832');
      root.style.setProperty('--acid-rgb', '226, 248, 50');
    }
  }, []);

  const setThemeAccent = useCallback((accent: 'acid' | 'cyan' | 'violet') => {
    setThemeAccentState(accent);
    applyThemeColors(accent);
    try {
      localStorage.setItem('sticker_pedia_theme', accent);
    } catch {}
  }, [applyThemeColors]);

  // Initialize and attach broadcast listener & local session check
  useEffect(() => {
    setIsClient(true);
    const loadedState = getStoredState();
    setState(loadedState);

    // Load saved theme
    try {
      const savedTheme = localStorage.getItem('sticker_pedia_theme') as 'acid' | 'cyan' | 'violet' | null;
      if (savedTheme && ['acid', 'cyan', 'violet'].includes(savedTheme)) {
        setThemeAccentState(savedTheme);
        applyThemeColors(savedTheme);
      }
    } catch {}

    // Load customer profile from localStorage
    try {
      const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (savedCustomer) {
        const parsed = JSON.parse(savedCustomer);
        setCustomer(parsed);
        setIsCustomerLoggedIn(true);
      }
    } catch (e) {
      console.warn('Could not load customer profile', e);
    }

    // Check admin session
    try {
      const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
      if (adminSession) {
        const parsed = JSON.parse(adminSession);
        if (parsed && parsed.email) {
          setIsAdminAuthenticated(true);
          setAdminUser(parsed.email);
        }
      }
    } catch (e) {
      console.warn('Could not load admin session', e);
    }

    // Load live orders from Supabase if configured
    if (isSupabaseConfigured()) {
      fetchOrdersFromSupabase()
        .then((remoteOrders) => {
          if (remoteOrders && remoteOrders.length > 0) {
            setState((prev) => ({
              ...prev,
              orders: remoteOrders,
            }));
          }
        })
        .catch((err) => console.warn('[Supabase] Initial fetch warning:', err));
    }

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel(CHANNEL_NAME);
        channelRef.current = channel;

        channel.onmessage = (event: MessageEvent<SyncMessage>) => {
          if (event.data && event.data.senderId !== clientId.current) {
            if (event.data.type === 'SYNC_ALL' && event.data.payload) {
              setState(event.data.payload);
              setSyncFlash(true);
              setTimeout(() => setSyncFlash(false), 800);
            }
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported, falling back to storage listener', e);
    }

    const syncAuthFromStorage = () => {
      try {
        const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
        if (savedCustomer) {
          const parsed = JSON.parse(savedCustomer);
          setCustomer(parsed);
          setIsCustomerLoggedIn(true);
        } else {
          setCustomer(DEFAULT_CUSTOMER);
          setIsCustomerLoggedIn(false);
        }

        const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
        if (adminSession) {
          const parsed = JSON.parse(adminSession);
          if (parsed && parsed.email) {
            setIsAdminAuthenticated(true);
            setAdminUser(parsed.email);
          }
        } else {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      } catch (err) {
        console.warn('Auth sync error:', err);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          setState(fresh);
          setSyncFlash(true);
          setTimeout(() => setSyncFlash(false), 800);
        } catch {
          // ignore
        }
      }
      if (e.key === ADMIN_SESSION_KEY || e.key === CUSTOMER_STORAGE_KEY) {
        syncAuthFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('sticker_pedia_auth_sync', syncAuthFromStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sticker_pedia_auth_sync', syncAuthFromStorage);
      if (channel) {
        channel.close();
      }
    };
  }, [applyThemeColors]);

  // Save to localStorage & broadcast helper
  const commitAndBroadcast = useCallback((newState: StoreState, eventType: string = 'SYNC_ALL') => {
    setState(newState);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (err) {
        console.error('LocalStorage save error:', err);
      }

      if (channelRef.current) {
        channelRef.current.postMessage({
          type: eventType,
          payload: newState,
          senderId: clientId.current,
          timestamp: Date.now(),
        });
      }
    }
  }, []);

  // Client Accounts & Authentication Handlers
  const signupClient = useCallback((accountData: {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    place?: string;
    district?: string;
    pinCode?: string;
    state?: string;
    country?: string;
  }): { success: boolean; error?: string } => {
    const cleanEmail = accountData.email.trim().toLowerCase();
    if (!cleanEmail || !accountData.name.trim()) {
      return { success: false, error: 'Name and email are required.' };
    }

    try {
      let accounts: ClientAccount[] = [];
      const stored = localStorage.getItem('sticker_pedia_client_accounts_v1');
      if (stored) {
        accounts = JSON.parse(stored);
      }

      if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email already exists. Please log in.' };
      }

      const newAccount: ClientAccount = {
        id: `client_${Date.now()}`,
        name: accountData.name.trim(),
        email: cleanEmail,
        password: accountData.password || '',
        phone: accountData.phone || '',
        place: accountData.place || '',
        district: accountData.district || '',
        pinCode: accountData.pinCode || '',
        state: accountData.state || '',
        country: accountData.country || 'India',
        createdAt: new Date().toISOString(),
      };

      accounts.push(newAccount);
      localStorage.setItem('sticker_pedia_client_accounts_v1', JSON.stringify(accounts));

      // Auto login the newly registered user
      setCustomer(newAccount);
      setIsCustomerLoggedIn(true);
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(newAccount));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
      }

      // Sync to Supabase in background if configured
      syncProfileToSupabase(newAccount).catch((err) =>
        console.warn('[Supabase] Signup sync warning:', err)
      );

      return { success: true };
    } catch (err) {
      console.error('Signup error:', err);
      return { success: false, error: 'Unable to save account. Please try again.' };
    }
  }, []);

  const loginClient = useCallback((email: string, password?: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your email.' };
    }

    try {
      let accounts: ClientAccount[] = [];
      const stored = localStorage.getItem('sticker_pedia_client_accounts_v1');
      if (stored) {
        accounts = JSON.parse(stored);
      }

      const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
      if (existing) {
        if (existing.password && password && existing.password !== password) {
          return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
        setCustomer(existing);
        setIsCustomerLoggedIn(true);
        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(existing));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
        }
        return { success: true };
      }

      // If user logs in with a fresh or demo email, create/log in session seamlessly
      const fallbackAccount: ClientAccount = {
        id: `client_${Date.now()}`,
        name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        email: cleanEmail,
        password: password || '',
        phone: DEFAULT_CUSTOMER.phone,
        place: DEFAULT_CUSTOMER.place,
        district: DEFAULT_CUSTOMER.district,
        pinCode: DEFAULT_CUSTOMER.pinCode,
        state: DEFAULT_CUSTOMER.state,
        country: DEFAULT_CUSTOMER.country,
        createdAt: new Date().toISOString(),
      };

      accounts.push(fallbackAccount);
      localStorage.setItem('sticker_pedia_client_accounts_v1', JSON.stringify(accounts));
      setCustomer(fallbackAccount);
      setIsCustomerLoggedIn(true);
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(fallbackAccount));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
      }

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }, []);

  const updateClientProfile = useCallback((updatedDetails: Partial<ClientAccount>) => {
    setCustomer((prev) => {
      const merged = { ...prev, ...updatedDetails };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(merged));

          // Also update in registered accounts list
          const stored = localStorage.getItem('sticker_pedia_client_accounts_v1');
          if (stored) {
            const accounts: ClientAccount[] = JSON.parse(stored);
            const idx = accounts.findIndex((a) => a.email.toLowerCase() === prev.email.toLowerCase());
            if (idx >= 0) {
              accounts[idx] = { ...accounts[idx], ...updatedDetails };
              localStorage.setItem('sticker_pedia_client_accounts_v1', JSON.stringify(accounts));
            }
          }
          window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));

          // Sync updated profile to Supabase in background
          syncProfileToSupabase(merged as ClientAccount).catch((err) =>
            console.warn('[Supabase] Profile update sync warning:', err)
          );
        } catch (e) {
          console.error('Profile update error:', e);
        }
      }
      return merged;
    });
  }, []);

  // Customer Profile & Login Handler (backward compatibility)
  const loginOrSaveCustomer = useCallback((details: CustomerShippingDetails) => {
    setCustomer(details);
    setIsCustomerLoggedIn(true);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(details));
        window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const logoutCustomer = useCallback(() => {
    setCustomer(DEFAULT_CUSTOMER);
    setIsCustomerLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
    }
  }, []);

  // Admin Authentication (Email & Password)
  const loginAdmin = useCallback((email: string, pass: string): boolean => {
    // Official admin credentials for Sticker.pedia management
    const validEmails = ['admin@sticker.pedia', 'manager@sticker.pedia', 'admin@stickerpedia.com', 'admin'];
    const validPass = 'stickerpedia2026';

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check credentials: accept official passkey or standard admin passwords for developer convenience
    const isAuthorized =
      (validEmails.includes(cleanEmail) || cleanEmail.includes('admin') || cleanEmail.includes('manager')) &&
      (cleanPass === validPass || cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === 'stickerpedia');

    if (isAuthorized) {
      setIsAdminAuthenticated(true);
      setAdminUser(cleanEmail);
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          ADMIN_SESSION_KEY,
          JSON.stringify({ email: cleanEmail, loggedInAt: Date.now() })
        );
        window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
      }
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      window.dispatchEvent(new CustomEvent('sticker_pedia_auth_sync'));
    }
  }, []);

  // Action: Add / Adjust product stock
  const updateStock = useCallback((productId: string, delta: number) => {
    setState((prev) => {
      let changedProdName = '';
      let newStockVal = 0;
      const updatedProducts = prev.products.map((p) => {
        if (p.id === productId) {
          changedProdName = p.name;
          const nextStock = Math.max(0, p.stock + delta);
          newStockVal = nextStock;
          return {
            ...p,
            stock: nextStock,
            soldOutOverride: nextStock === 0 ? true : p.soldOutOverride && nextStock > 0 ? false : p.soldOutOverride,
          };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: `Stock updated for "${changedProdName}": now ${newStockVal} units (${delta > 0 ? '+' : ''}${delta})`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState, 'STOCK_UPDATE');
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Override sold out status
  const toggleSoldOut = useCallback((productId: string) => {
    setState((prev) => {
      let prodName = '';
      let isSoldOut = false;
      const updatedProducts = prev.products.map((p) => {
        if (p.id === productId) {
          prodName = p.name;
          isSoldOut = !p.soldOutOverride;
          return {
            ...p,
            soldOutOverride: isSoldOut,
            stock: isSoldOut ? 0 : p.stock === 0 ? 10 : p.stock,
          };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: isSoldOut
          ? `Marked "${prodName}" as BATCH SOLD OUT`
          : `Restored availability for "${prodName}"`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState, 'STOCK_UPDATE');
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Toggle product active/visibility
  const toggleProductActive = useCallback((productId: string) => {
    setState((prev) => {
      let prodName = '';
      let nowActive = false;
      const updatedProducts = prev.products.map((p) => {
        if (p.id === productId) {
          prodName = p.name;
          nowActive = !p.active;
          return { ...p, active: nowActive };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'product_toggle',
        message: `${nowActive ? 'Published' : 'Unpublished'} product "${prodName}" from storefront`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Update full product details
  const updateProduct = useCallback((updated: Product) => {
    setState((prev) => {
      const updatedProducts = prev.products.map((p) => (p.id === updated.id ? updated : p));
      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: `Catalog specs updated for "${updated.name}" ($${updated.price.toFixed(2)})`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Add new product to catalog
  const addProduct = useCallback((newProdData: Omit<Product, 'id' | 'sku'>) => {
    setState((prev) => {
      const newId = `prod-${Date.now().toString().slice(-4)}`;
      const sku = `SP-${newProdData.finish.toUpperCase().slice(0, 4)}-${Math.floor(100 + Math.random() * 900)}`;
      const newProduct: Product = {
        id: newId,
        sku,
        ...newProdData,
      };

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'product_added',
        message: `New sticker SKU launched: "${newProduct.name}" (${newProduct.finish.toUpperCase()})`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: [newProduct, ...prev.products],
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Delete product from catalog
  const deleteProduct = useCallback((productId: string) => {
    setState((prev) => {
      const prod = prev.products.find((p) => p.id === productId);
      const prodName = prod ? prod.name : 'Unknown SKU';
      const updatedProducts = prev.products.filter((p) => p.id !== productId);

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'product_toggle',
        message: `Removed SKU "${prodName}" from active catalog`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Update product price directly
  const updateProductPrice = useCallback((productId: string, newPrice: number) => {
    setState((prev) => {
      let prodName = '';
      const updatedProducts = prev.products.map((p) => {
        if (p.id === productId) {
          prodName = p.name;
          return { ...p, price: Math.max(0.1, parseFloat(newPrice.toFixed(2))) };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: `Price adjusted for "${prodName}": now $${newPrice.toFixed(2)}`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Batch adjust prices by percentage
  const batchAdjustPrices = useCallback((percentDelta: number) => {
    setState((prev) => {
      const factor = 1 + percentDelta / 100;
      const updatedProducts = prev.products.map((p) => ({
        ...p,
        price: Math.max(0.5, parseFloat((p.price * factor).toFixed(2))),
      }));

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: `Bulk pricing adjusted: ${percentDelta >= 0 ? '+' : ''}${percentDelta}% across entire catalog`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState);
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Replenish all low stock items
  const replenishAllStock = useCallback((amount = 50) => {
    setState((prev) => {
      const updatedProducts = prev.products.map((p) => {
        if (p.stock <= 5 || p.soldOutOverride) {
          return {
            ...p,
            stock: p.stock + amount,
            soldOutOverride: false,
          };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'stock_change',
        message: `Emergency stock replenishment triggered (+${amount} units to low stock SKUs)`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState, 'STOCK_UPDATE');
      return nextState;
    });
  }, [commitAndBroadcast]);

  // Action: Update Order Status in Kanban Queue
  const updateOrderStatus = useCallback((orderId: string, nextStatus: OrderStatus) => {
    setState((prev) => {
      let ordNum = '';
      let prodName = '';
      const updatedOrders = prev.orders.map((o) => {
        if (o.id === orderId) {
          ordNum = o.orderNumber;
          prodName = o.productName;
          return {
            ...o,
            status: nextStatus,
            estimatedMinutesRemaining:
              nextStatus === 'dispatched' ? 0 : nextStatus === 'printing' ? 12 : nextStatus === 'pre-press' ? 25 : 45,
          };
        }
        return o;
      });

      const statusLabels: Record<OrderStatus, string> = {
        received: 'Queue Received',
        'pre-press': 'Pre-Press / Contour Rip',
        printing: 'Roland Precision Printing',
        dispatched: 'Dispatched & Shipped',
      };

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'status_change',
        message: `Order #${ordNum} (${prodName}) advanced to "${statusLabels[nextStatus]}"`,
        timestamp: 'Just now',
        actor: 'admin',
      };

      const nextState: StoreState = {
        ...prev,
        orders: updatedOrders,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState, 'ORDER_STATUS_UPDATE');
      return nextState;
    });

    updateOrderStatusInSupabase(orderId, nextStatus).catch((err) =>
      console.warn('[Supabase] Status sync warning:', err)
    );
  }, [commitAndBroadcast]);

  // Action: Create Order with Full Customer Shipping Details
  const createOrder = useCallback((orderData: {
    productName: string;
    finish: Product['finish'];
    quantity: number;
    totalAmount: number;
    shippingDetails: CustomerShippingDetails;
    priority?: 'normal' | 'rush' | 'sample';
    notes?: string;
    previewType?: string;
  }) => {
    const orderId = `ord-${Date.now().toString().slice(-4)}`;
    const orderNumber = `SP-${Math.floor(9100 + Math.random() * 899)}`;
    const { shippingDetails } = orderData;

    const newOrder: PrintOrder = {
      id: orderId,
      orderNumber,
      customerName: shippingDetails.name,
      customerEmail: shippingDetails.email,
      name: shippingDetails.name,
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      place: shippingDetails.place,
      district: shippingDetails.district,
      pinCode: shippingDetails.pinCode,
      state: shippingDetails.state,
      country: shippingDetails.country,
      productName: orderData.productName,
      finish: orderData.finish,
      quantity: orderData.quantity,
      totalAmount: orderData.totalAmount,
      status: 'received',
      priority: orderData.priority || 'normal',
      timestamp: 'Just now',
      estimatedMinutesRemaining: 45,
      notes: orderData.notes,
      previewType: orderData.previewType,
    };

    setState((prev) => {

      const updatedProducts = prev.products.map((p) => {
        if (
          p.name.toLowerCase().includes(orderData.productName.toLowerCase()) ||
          orderData.productName.toLowerCase().includes(p.name.toLowerCase())
        ) {
          const nextStock = Math.max(0, p.stock - Math.min(p.stock, Math.ceil(orderData.quantity / 5)));
          return {
            ...p,
            stock: nextStock,
            soldOutOverride: nextStock === 0,
          };
        }
        return p;
      });

      const newActivity: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'new_order',
        message: `New Print Order #${orderNumber} placed by ${shippingDetails.name} (${shippingDetails.district}, ${shippingDetails.state}) - ${orderData.quantity}x ${orderData.finish.toUpperCase()}`,
        timestamp: 'Just now',
        actor: 'client',
      };

      const nextState: StoreState = {
        ...prev,
        products: updatedProducts,
        orders: [newOrder, ...prev.orders],
        activities: [newActivity, ...prev.activities.slice(0, 19)],
        lastSyncTimestamp: Date.now(),
      };

      commitAndBroadcast(nextState, 'NEW_ORDER');
      return nextState;
    });

    // Asynchronously dispatch to Supabase if configured
    syncOrderToSupabase(newOrder).catch((err) =>
      console.warn('[Supabase] Background sync warning:', err)
    );

    return { orderId, orderNumber };
  }, [commitAndBroadcast]);

  // Action: Simulate random live order (for demo / stress testing)
  const simulateIncomingOrder = useCallback(() => {
    const sampleProfiles: CustomerShippingDetails[] = [
      {
        name: 'Sora Takahashi',
        email: 'sora@synthwave.art',
        phone: '+81 90-8877-6655',
        place: '3-14-1 Roppongi Hills 21F',
        district: 'Minato-ku',
        pinCode: '106-6108',
        state: 'Tokyo',
        country: 'Japan',
      },
      {
        name: 'Vikram Mehta',
        email: 'vikram.m@kreativwerk.in',
        phone: '+91 99887 65432',
        place: 'Plot 44, Udyog Vihar Phase 4',
        district: 'Gurugram',
        pinCode: '122016',
        state: 'Haryana',
        country: 'India',
      },
      {
        name: 'Chloe Laurent',
        email: 'chloe@atelier-paris.fr',
        phone: '+33 1 42 68 55 00',
        place: '28 Rue de Rivoli',
        district: '4th Arrondissement',
        pinCode: '75004',
        state: 'Île-de-France',
        country: 'France',
      },
    ];

    const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
    const randomCustomer = sampleProfiles[Math.floor(Math.random() * sampleProfiles.length)];
    const quantities = [15, 25, 50, 100];
    const qty = quantities[Math.floor(Math.random() * quantities.length)];
    const total = parseFloat(((randomProduct?.price || 4.5) * qty * 0.85).toFixed(2));

    return createOrder({
      productName: randomProduct?.name || 'Custom Holographic Contour Pack',
      finish: randomProduct?.finish || 'holographic',
      quantity: qty,
      totalAmount: total,
      shippingDetails: randomCustomer,
      priority: Math.random() > 0.6 ? 'rush' : 'normal',
      notes: 'Generated via Demo Order Simulator',
    });
  }, [createOrder, state.products]);

  // Reset to Defaults
  const resetToDefaults = useCallback(() => {
    const freshState: StoreState = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      activities: [
        {
          id: `act-reset-${Date.now()}`,
          type: 'status_change',
          message: 'System state reset to factory seed catalog by Admin',
          timestamp: 'Just now',
          actor: 'admin',
        },
      ],
      lastSyncTimestamp: Date.now(),
    };
    commitAndBroadcast(freshState);
  }, [commitAndBroadcast]);

  // Computed metrics
  const totalOrdersCount = state.orders.length;
  const activeQueueCount = state.orders.filter((o) => o.status !== 'dispatched').length;
  const dailyRevenue = state.orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const lowStockCount = state.products.filter(
    (p) => p.stock <= 5 || p.soldOutOverride || p.stock === 0
  ).length;

  return {
    isClient,
    products: state.products,
    orders: state.orders,
    activities: state.activities,
    lastSyncTimestamp: state.lastSyncTimestamp,
    syncFlash,
    customer,
    isCustomerLoggedIn,
    loginOrSaveCustomer,
    signupClient,
    loginClient,
    updateClientProfile,
    logoutCustomer,
    isAdminAuthenticated,
    adminUser,
    loginAdmin,
    logoutAdmin,
    themeAccent,
    setThemeAccent,
    kpis: {
      totalOrders: totalOrdersCount,
      activeQueue: activeQueueCount,
      dailyRevenue,
      lowStockCount,
    },
    updateStock,
    toggleSoldOut,
    toggleProductActive,
    updateProduct,
    deleteProduct,
    updateProductPrice,
    batchAdjustPrices,
    replenishAllStock,
    addProduct,
    updateOrderStatus,
    createOrder,
    simulateIncomingOrder,
    resetToDefaults,
  };
}
