
-- Reviews/ratings table for client feedback after delivery
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  title TEXT,
  comment TEXT NOT NULL,
  service_type TEXT NOT NULL DEFAULT 'couture',
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review
CREATE POLICY "Anyone can submit review" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Approved reviews visible to everyone
CREATE POLICY "Approved reviews visible to all" ON public.reviews
  FOR SELECT USING (is_approved = true OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can update reviews (approve/reject)
CREATE POLICY "Admins can update reviews" ON public.reviews
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews" ON public.reviews
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));
