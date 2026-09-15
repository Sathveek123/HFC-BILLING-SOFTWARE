-- HFC Billing Software Database Schema for Supabase PostgreSQL

-- 1. OWNERS TABLE
CREATE TABLE IF NOT EXISTS public.owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    restaurant_name TEXT DEFAULT 'HFC Restaurant',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MENU CATEGORIES
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MENU ITEMS
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    half_price NUMERIC(10, 2) DEFAULT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    stock INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RAW MATERIALS
CREATE TABLE IF NOT EXISTS public.raw_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    unit TEXT NOT NULL, -- kg, liters, packets, etc.
    quantity NUMERIC(10, 2) NOT NULL DEFAULT 0,
    min_threshold NUMERIC(10, 2) NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLES
CREATE TABLE IF NOT EXISTS public.tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    table_number INT NOT NULL,
    qr_code_url TEXT,
    is_occupied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    table_id UUID REFERENCES public.tables(id) ON DELETE SET NULL,
    order_number TEXT NOT NULL,
    type TEXT CHECK (type IN ('dine-in', 'takeaway', 'delivery')) DEFAULT 'dine-in',
    status TEXT CHECK (status IN ('pending', 'cooking', 'served', 'completed', 'cancelled')) DEFAULT 'pending',
    payment_method TEXT CHECK (payment_method IN ('cash', 'upi', 'card', 'due')) DEFAULT 'cash',
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    tax NUMERIC(10, 2) DEFAULT 0,
    discount NUMERIC(10, 2) DEFAULT 0,
    customer_name TEXT,
    customer_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL,
    item_name TEXT NOT NULL,
    qty INT NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    variant TEXT CHECK (variant IN ('full', 'half')) DEFAULT 'full'
);

-- 8. CASH DRAWER
CREATE TABLE IF NOT EXISTS public.cash_drawer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('in', 'out')) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    note TEXT,
    date TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EXPENSES
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    total_due NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. EMPLOYEES
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    joined_at DATE DEFAULT CURRENT_DATE
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_drawer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Owner isolation policies
CREATE POLICY owner_all_policy ON public.owners FOR ALL USING (id = auth.uid());
CREATE POLICY menu_categories_policy ON public.menu_categories FOR ALL USING (owner_id = auth.uid());
CREATE POLICY menu_items_policy ON public.menu_items FOR ALL USING (owner_id = auth.uid());
CREATE POLICY raw_materials_policy ON public.raw_materials FOR ALL USING (owner_id = auth.uid());
CREATE POLICY tables_policy ON public.tables FOR ALL USING (owner_id = auth.uid());
CREATE POLICY orders_policy ON public.orders FOR ALL USING (owner_id = auth.uid());
CREATE POLICY cash_drawer_policy ON public.cash_drawer FOR ALL USING (owner_id = auth.uid());
CREATE POLICY expenses_policy ON public.expenses FOR ALL USING (owner_id = auth.uid());
CREATE POLICY customers_policy ON public.customers FOR ALL USING (owner_id = auth.uid());
CREATE POLICY employees_policy ON public.employees FOR ALL USING (owner_id = auth.uid());
