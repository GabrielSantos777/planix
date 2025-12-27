-- Add parent_id column to categories table for subcategories support
ALTER TABLE public.categories 
ADD COLUMN parent_id uuid REFERENCES public.categories(id) ON DELETE CASCADE;

-- Create index for faster parent lookups
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);

-- Update RLS policies are already in place for user_id, parent_id doesn't need additional policies