export type FinishType = 'matte' | 'gloss' | 'holographic' | 'transparent';

export type ProductCategory = 'die-cut' | 'holographic' | 'packs' | 'sheets' | 'industrial';

export type OrderStatus = 'received' | 'pre-press' | 'printing' | 'dispatched';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  finish: FinishType;
  price: number;
  stock: number;
  maxStock: number;
  active: boolean;
  soldOutOverride?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  size: string; // e.g. "3x3 in" or "4x4 in"
  dimensions: string;
  accentColor?: string;
  iconName?: string;
  imageUrl?: string;
}

export interface CustomerShippingDetails {
  name: string;
  email: string;
  phone: string;
  place: string; // Street / Town / City
  district: string;
  pinCode: string;
  state: string;
  country: string;
}

export interface ClientAccount extends CustomerShippingDetails {
  id: string;
  password?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface CustomerProfile extends CustomerShippingDetails {
  id: string;
  isLoggedIn: boolean;
  savedAt?: string;
}

export interface PrintOrder extends CustomerShippingDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  finish: FinishType;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  priority: 'normal' | 'rush' | 'sample';
  timestamp: string;
  estimatedMinutesRemaining?: number;
  notes?: string;
  previewType?: string;
}

export interface ActivityEvent {
  id: string;
  type: 'stock_change' | 'status_change' | 'new_order' | 'product_toggle' | 'product_added';
  message: string;
  timestamp: string;
  actor: 'client' | 'admin' | 'system';
  meta?: Record<string, any>;
}

export interface SyncMessage {
  type: 'SYNC_PRODUCTS' | 'SYNC_ORDERS' | 'SYNC_ALL' | 'STOCK_UPDATE' | 'ORDER_STATUS_UPDATE' | 'NEW_ORDER';
  payload: any;
  senderId: string;
  timestamp: number;
}
