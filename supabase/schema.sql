-- ==============================================================================
-- STICKER.PEDIA - OFFICIAL SUPABASE DATABASE SCHEMA & MIGRATION (IDEMPOTENT)
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- (Supabase Dashboard -> Your Project -> SQL Editor -> New Query -> Run)
-- Safe to run multiple times without throwing errors.

-- 1. Create PROFILES Table (Customer Accounts & Shipping Coordinates)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  phone TEXT,
  place TEXT,
  district TEXT,
  pin_code TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create PRODUCTS Table (Sticker Drops & Inventory)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  finish TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 50,
  max_stock INTEGER NOT NULL DEFAULT 100,
  active BOOLEAN DEFAULT TRUE,
  sold_out_override BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3, 1) DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 0,
  description TEXT,
  badge TEXT,
  size TEXT DEFAULT '3x3 in',
  dimensions TEXT DEFAULT '3.0 x 3.0 in',
  accent_color TEXT DEFAULT '#D4F62A',
  icon_name TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create ORDERS Table (Print Production Queue & Invoices)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  phone TEXT,
  place TEXT,
  district TEXT,
  pin_code TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  product_name TEXT NOT NULL,
  finish TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'received', -- 'received' | 'pre-press' | 'printing' | 'dispatched'
  priority TEXT NOT NULL DEFAULT 'normal', -- 'normal' | 'rush' | 'sample'
  notes TEXT,
  preview_type TEXT,
  estimated_minutes_remaining INTEGER DEFAULT 45,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Fast Query Indexes
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (active);

-- 5. Auto-update `updated_at` Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 7. Row Level Security Policies (Drop if exists to allow re-running)

-- PROFILES Policies
DROP POLICY IF EXISTS "Public profiles can be read" ON public.profiles;
CREATE POLICY "Public profiles can be read" 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow public insert to profiles" ON public.profiles;
CREATE POLICY "Allow public insert to profiles" 
  ON public.profiles FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to profiles" ON public.profiles;
CREATE POLICY "Allow public update to profiles" 
  ON public.profiles FOR UPDATE 
  USING (true);

-- PRODUCTS Policies
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;
CREATE POLICY "Products are publicly readable" 
  ON public.products FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow product management" ON public.products;
CREATE POLICY "Allow product management" 
  ON public.products FOR ALL 
  USING (true);

-- ORDERS Policies
DROP POLICY IF EXISTS "Orders are publicly creatable" ON public.orders;
CREATE POLICY "Orders are publicly creatable" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Orders are readable" ON public.orders;
CREATE POLICY "Orders are readable" 
  ON public.orders FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Orders can be updated" ON public.orders;
CREATE POLICY "Orders can be updated" 
  ON public.orders FOR UPDATE 
  USING (true);

-- 8. Enable Realtime Safely (Checks publication first to prevent errors)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;

-- 9. Seed Initial Catalog Products
INSERT INTO public.products (id, sku, name, category, finish, price, stock, max_stock, active, rating, reviews_count, description, badge, size, dimensions, accent_color, icon_name, image_url)
VALUES
  ('prod-1', 'SP-HOLO-CYBER', 'Cyber Oni Mask (Holographic Edition)', 'holographic', 'holographic', 4.50, 42, 60, true, 4.9, 142, 'Dual-layer rainbow prism refraction with deep matte blacks. 100% waterproof and scratch resistant.', 'BESTSELLER', '3.5x4 in', '3.5 x 4.0 in', '#00f2fe', 'Ghost', '/stickers/cyber-oni.png'),
  ('prod-2', 'SP-MATTE-SKULL', 'Mecha Skull V2 (Velvet Matte)', 'die-cut', 'matte', 3.80, 18, 50, true, 5.0, 98, 'Anti-glare industrial soft-touch vinyl finish. Laser precision contour cut with 1/16in white safety border.', 'LAB PICK', '3x3 in', '3.0 x 3.0 in', '#E2F832', 'Skull', '/stickers/mecha-skull.png'),
  ('prod-3', 'SP-GLOSS-ACID', 'Acid Acid Acid Smiler (High Gloss UV)', 'die-cut', 'gloss', 3.20, 4, 40, true, 4.8, 230, 'High-gloss optical lacquer with permanent solvent acrylic adhesive. Dishwasher & UV proof.', 'LOW STOCK', '2.5x2.5 in', '2.5 x 2.5 in', '#E2F832', 'Smile', '/stickers/acid-smile.png'),
  ('prod-4', 'SP-CLEAR-CIRCUIT', 'Bionic Circuit Trace (Optical Clear)', 'sheets', 'transparent', 4.00, 25, 40, true, 4.7, 64, 'Ultra-transparent backing engineered for laptop lids, tinted windscreens, and hydro flasks.', 'NEW DROP', '4x3 in', '4.0 x 3.0 in', '#00f2fe', 'Cpu', '/stickers/circuit-trace.png'),
  ('prod-5', 'SP-PACK-STREET', 'Neo-Tokyo Streetwear Multi-Pack (6x)', 'packs', 'holographic', 16.50, 11, 30, true, 5.0, 412, 'Curated drop of 6 die-cut stickers combining prismatic foils and velvet matte finishes.', 'BUNDLE -20%', 'Pack', 'Various Sizes', '#f43f5e', 'Package', '/stickers/pack-street.png'),
  ('prod-6', 'SP-IND-HAZARD', 'High Voltage Cyber-Hazard (Industrial)', 'industrial', 'gloss', 4.20, 0, 50, true, 4.9, 87, 'Heavy-duty 12-mil laminated vinyl tested against grease, solvents, and pressure washers.', 'SOLD OUT', '3x2 in', '3.0 x 2.0 in', '#E2F832', 'Zap', '/stickers/hazard-sign.png')
ON CONFLICT (id) DO UPDATE SET
  stock = EXCLUDED.stock,
  price = EXCLUDED.price,
  active = EXCLUDED.active;
