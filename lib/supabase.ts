import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrintOrder, Product, ClientAccount, OrderStatus } from './types';

const rawUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT ||
  '';

const rawAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  '';

const supabaseUrl = rawUrl.trim().replace(/\/+$/, '');
const supabaseAnonKey = rawAnonKey.trim();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 15 &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your_key_here')
  );
};

// Singleton Supabase Client
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: typeof window !== 'undefined',
        autoRefreshToken: typeof window !== 'undefined',
      },
    })
  : null;

// ==============================================================================
// SUPABASE DATABASE ACTIONS & HELPERS
// ==============================================================================

/**
 * Insert or update a customer profile in Supabase
 */
export async function syncProfileToSupabase(profile: ClientAccount) {
  if (!supabase) return { success: false, reason: 'not_configured' };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        name: profile.name,
        email: profile.email.toLowerCase(),
        password: profile.password || '',
        phone: profile.phone || '',
        place: profile.place || '',
        district: profile.district || '',
        pin_code: profile.pinCode || '',
        state: profile.state || '',
        country: profile.country || 'India',
        avatar_url: profile.avatarUrl || '',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });

    if (error) {
      console.warn('[Supabase] Failed to sync profile:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected profile sync error:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch a customer profile by email from Supabase
 */
export async function fetchProfileFromSupabase(email: string): Promise<ClientAccount | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || '',
      place: data.place || '',
      district: data.district || '',
      pinCode: data.pin_code || '',
      state: data.state || '',
      country: data.country || 'India',
      createdAt: data.created_at,
      avatarUrl: data.avatar_url,
    };
  } catch (err) {
    console.error('[Supabase] fetchProfile error:', err);
    return null;
  }
}

/**
 * Insert an order into Supabase
 */
export async function syncOrderToSupabase(order: PrintOrder) {
  if (!supabase) return { success: false, reason: 'not_configured' };

  try {
    const { data, error } = await supabase
      .from('orders')
      .upsert({
        id: order.id,
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_email: order.customerEmail.toLowerCase(),
        phone: order.phone,
        place: order.place,
        district: order.district,
        pin_code: order.pinCode,
        state: order.state,
        country: order.country,
        product_name: order.productName,
        finish: order.finish,
        quantity: order.quantity,
        total_amount: order.totalAmount,
        status: order.status,
        priority: order.priority,
        notes: order.notes || '',
        preview_type: order.previewType || '',
        estimated_minutes_remaining: order.estimatedMinutesRemaining || 45,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Failed to sync order:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected order sync error:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch all orders from Supabase (for customer history or admin queue)
 */
export async function fetchOrdersFromSupabase(): Promise<PrintOrder[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      customerName: o.customer_name,
      customerEmail: o.customer_email,
      name: o.customer_name,
      email: o.customer_email,
      phone: o.phone,
      place: o.place,
      district: o.district,
      pinCode: o.pin_code,
      state: o.state,
      country: o.country,
      productName: o.product_name,
      finish: o.finish,
      quantity: o.quantity,
      totalAmount: parseFloat(o.total_amount),
      status: o.status,
      priority: o.priority,
      timestamp: new Date(o.created_at).toLocaleDateString(),
      notes: o.notes,
      previewType: o.preview_type,
      estimatedMinutesRemaining: o.estimated_minutes_remaining,
    }));
  } catch (err) {
    console.error('[Supabase] fetchOrders error:', err);
    return [];
  }
}

/**
 * Update an order's production status in Supabase
 */
export async function updateOrderStatusInSupabase(orderId: string, status: OrderStatus) {
  if (!supabase) return { success: false };

  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.warn('[Supabase] Order status update failed:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Update product stock in Supabase
 */
export async function updateProductStockInSupabase(productId: string, stock: number) {
  if (!supabase) return { success: false };

  try {
    const { error } = await supabase
      .from('products')
      .update({ stock, updated_at: new Date().toISOString() })
      .eq('id', productId);

    return { success: !error };
  } catch (err) {
    return { success: false, error: err };
  }
}
