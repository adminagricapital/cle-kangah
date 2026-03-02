
-- Create custom tailoring orders table
CREATE TABLE public.custom_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT 'femme',
  garment_type TEXT NOT NULL,
  garment_category TEXT NOT NULL,
  fabric_type TEXT NOT NULL,
  ethnic_fabric TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  measurements JSONB,
  occasion TEXT,
  delivery_date DATE,
  notes TEXT,
  reference_image TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  total_estimate NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create custom order" ON public.custom_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all orders" ON public.custom_orders FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update orders" ON public.custom_orders FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete orders" ON public.custom_orders FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_custom_orders_updated_at BEFORE UPDATE ON public.custom_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
