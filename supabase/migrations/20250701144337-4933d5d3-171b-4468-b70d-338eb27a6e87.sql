
-- Create products table for the store
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table to track purchases
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table for order details
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create draw_entries table to track user entries
CREATE TABLE IF NOT EXISTS public.draw_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  entry_code TEXT UNIQUE NOT NULL,
  draw_month INTEGER NOT NULL,
  draw_year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create draws table for monthly draws
CREATE TABLE IF NOT EXISTS public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  prize_name TEXT NOT NULL,
  draw_date TIMESTAMP WITH TIME ZONE NOT NULL,
  winner_id UUID REFERENCES auth.users(id),
  winning_entry_code TEXT,
  total_entries INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(month, year)
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draw_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products (public read)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Create RLS policies for orders (users can only see their own)
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for order_items
CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Create RLS policies for draw_entries
CREATE POLICY "Users can view their own entries" ON public.draw_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create entries" ON public.draw_entries
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for draws (public read)
CREATE POLICY "Anyone can view draws" ON public.draws
  FOR SELECT USING (true);

-- Insert sample products
INSERT INTO public.products (name, description, price, original_price, image_url, category) VALUES
('زجاجة مياه مميزة', 'مياه صافية من الينابيع الطبيعية في زجاجة مميزة', 15.99, 2.99, '/placeholder.svg', 'beverages'),
('مشروب الطاقة', 'مشروب طاقة عالي الجودة بمكونات طبيعية', 12.99, 3.99, '/placeholder.svg', 'beverages'),
('قهوة حرفية', 'حبوب قهوة مميزة من منشأ واحد', 18.99, 4.99, '/placeholder.svg', 'beverages');

-- Insert current month's draw
INSERT INTO public.draws (month, year, prize_name, draw_date, total_entries) VALUES
(EXTRACT(MONTH FROM CURRENT_DATE)::INTEGER, EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER, 'تسلا موديل ٣', 
 DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH' - INTERVAL '1 DAY', 1247);

-- Create function to generate entry codes
CREATE OR REPLACE FUNCTION generate_entry_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
BEGIN
  code := 'DRAW' || TO_CHAR(NOW(), 'YYYYMM') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create function to create draw entry after order completion
CREATE OR REPLACE FUNCTION create_draw_entry_for_order()
RETURNS TRIGGER AS $$
DECLARE
  entry_code TEXT;
  current_month INTEGER;
  current_year INTEGER;
BEGIN
  -- Only create entry when order status changes to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    entry_code := generate_entry_code();
    current_month := EXTRACT(MONTH FROM CURRENT_DATE)::INTEGER;
    current_year := EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER;
    
    INSERT INTO public.draw_entries (user_id, order_id, entry_code, draw_month, draw_year)
    VALUES (NEW.user_id, NEW.id, entry_code, current_month, current_year);
    
    -- Update total entries count in draws table
    UPDATE public.draws 
    SET total_entries = total_entries + 1
    WHERE month = current_month AND year = current_year;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for creating draw entries
CREATE TRIGGER create_draw_entry_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION create_draw_entry_for_order();
