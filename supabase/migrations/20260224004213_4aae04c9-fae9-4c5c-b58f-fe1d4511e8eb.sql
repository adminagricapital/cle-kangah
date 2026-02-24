-- Add unique constraint on site_settings.key for upsert
ALTER TABLE public.site_settings ADD CONSTRAINT site_settings_key_unique UNIQUE (key);

-- Add unique constraint on newsletter_subscribers.email
ALTER TABLE public.newsletter_subscribers ADD CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email);