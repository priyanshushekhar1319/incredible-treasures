-- ==============================================================================
-- INCREDIBLE TREASURES - SUPABASE PRODUCTION POSTGRESQL SCHEMA & POLICIES
-- Run this in the Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES / USERS TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  phone TEXT,
  company_name TEXT,
  gstin TEXT,
  role TEXT NOT NULL DEFAULT 'CUSTOMER', -- 'CUSTOMER', 'STAFF', 'SUPER_ADMIN'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on email and supabase_id for fast lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_supabase_id ON public.users(supabase_id);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  base_price DOUBLE PRECISION NOT NULL,
  hsn_code TEXT NOT NULL DEFAULT '4911',
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  min_quantity INT NOT NULL DEFAULT 100,
  estimated_days TEXT DEFAULT '2-3 Business Days',
  images TEXT NOT NULL, -- JSON array of image URLs
  featured BOOLEAN DEFAULT false,
  rating DOUBLE PRECISION DEFAULT 4.9,
  review_count INT DEFAULT 128,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SAVED DESIGNS TABLE (3D Canva Studio Cloud Persistence)
CREATE TABLE IF NOT EXISTS public.saved_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_id TEXT,
  name TEXT NOT NULL DEFAULT 'Untitled Luxury Design',
  product_slug TEXT NOT NULL DEFAULT 'visiting-cards',
  substrate_id TEXT NOT NULL DEFAULT 'pvc-regular-glossy',
  orientation TEXT NOT NULL DEFAULT 'horizontal',
  corner_style TEXT NOT NULL DEFAULT 'square',
  background_color TEXT NOT NULL DEFAULT '#FFFFFF',
  gilded_edge BOOLEAN DEFAULT false,
  card_texture TEXT DEFAULT 'smooth',
  front_elements TEXT NOT NULL, -- JSON array
  back_elements TEXT NOT NULL,  -- JSON array
  front_bg_image TEXT,
  back_bg_image TEXT,
  front_bg_opacity DOUBLE PRECISION DEFAULT 1.0,
  back_bg_opacity DOUBLE PRECISION DEFAULT 1.0,
  front_bg_fit TEXT DEFAULT 'cover',
  back_bg_fit TEXT DEFAULT 'cover',
  preview_front TEXT,
  preview_back TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_designs_user_id ON public.saved_designs(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_designs_session_id ON public.saved_designs(session_id);

-- 5. ORDERS TABLE (Central Factory Command & Customer Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- e.g. 'IT-PRINT-017378'
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'studio',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  is_b2b BOOLEAN DEFAULT false,
  company_name TEXT,
  gstin TEXT,
  subtotal DOUBLE PRECISION NOT NULL,
  tax_amount DOUBLE PRECISION NOT NULL,
  cgst_amount DOUBLE PRECISION DEFAULT 0.0,
  sgst_amount DOUBLE PRECISION DEFAULT 0.0,
  igst_amount DOUBLE PRECISION DEFAULT 0.0,
  shipping_fee DOUBLE PRECISION DEFAULT 0.0,
  shipping_tier TEXT DEFAULT 'standard',
  coupon_code TEXT,
  discount_amount DOUBLE PRECISION DEFAULT 0.0,
  total_amount DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'ORDER_CONFIRMED', 
  status_label TEXT,
  payment_status TEXT NOT NULL DEFAULT 'PAID_ADVANCE', 
  payment_method TEXT NOT NULL DEFAULT 'card',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  tracking_number TEXT,
  awb_number TEXT,
  courier_partner TEXT DEFAULT 'BlueDart Apex Air',
  courier_tracking_url TEXT,
  destination_city TEXT,
  guaranteed_delivery_formatted TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_awb_number ON public.orders(awb_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 6. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  category_name TEXT,
  variant_name TEXT,
  quantity INT NOT NULL,
  unit_price DOUBLE PRECISION NOT NULL,
  total_price DOUBLE PRECISION NOT NULL,
  specs_json TEXT,
  custom_design_front TEXT,
  custom_design_back TEXT,
  print_ready_pdf_url TEXT,
  is_gst_included BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow public read of products and categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);

-- Users can view and update their own profile
CREATE POLICY "Users view own profile" ON public.users 
  FOR SELECT USING (auth.uid() = supabase_id OR role = 'SUPER_ADMIN');

CREATE POLICY "Users update own profile" ON public.users 
  FOR UPDATE USING (auth.uid() = supabase_id OR role = 'SUPER_ADMIN');

-- Users can view their own orders
CREATE POLICY "Users view own orders" ON public.orders 
  FOR SELECT USING (auth.uid() = (SELECT supabase_id FROM public.users WHERE id = public.orders.user_id));

-- Service role bypasses all RLS automatically for server actions and webhook fulfillment
-- ==============================================================================
