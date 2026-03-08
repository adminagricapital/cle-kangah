
-- Create table for AI-generated garment models catalog
CREATE TABLE public.generated_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  style text NOT NULL DEFAULT 'africain',
  gender text NOT NULL DEFAULT 'femme',
  image_url text NOT NULL,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_models ENABLE ROW LEVEL SECURITY;

-- Everyone can view public models
CREATE POLICY "Public models visible to all" ON public.generated_models
  FOR SELECT USING (is_public = true);

-- Anyone can insert (generated via edge function)
CREATE POLICY "Anyone can add generated model" ON public.generated_models
  FOR INSERT WITH CHECK (true);

-- Admins can manage
CREATE POLICY "Admins can manage generated models" ON public.generated_models
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for generated images
INSERT INTO storage.buckets (id, name, public) VALUES ('generated-models', 'generated-models', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read on the bucket
CREATE POLICY "Public read generated-models" ON storage.objects
  FOR SELECT USING (bucket_id = 'generated-models');

-- Allow anyone to upload to the bucket
CREATE POLICY "Anyone can upload generated-models" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'generated-models');
