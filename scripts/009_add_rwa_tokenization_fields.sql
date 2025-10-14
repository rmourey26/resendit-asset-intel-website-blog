-- Add RWA tokenization fields to existing tables
-- This migration adds support for Real World Asset tokenization preferences

-- Add RWA fields to waitlist table
ALTER TABLE public.waitlist 
ADD COLUMN IF NOT EXISTS interested_in_tokenization BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS preferred_blockchain VARCHAR(50),
ADD COLUMN IF NOT EXISTS asset_types_to_tokenize TEXT[];

-- Add RWA fields to demo_inquiries table (assuming it exists based on the inquiries table)
-- First, let's create the demo_inquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.demo_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    
    -- Company details
    industry TEXT,
    company_size TEXT,
    
    -- Demo details
    current_challenges TEXT,
    preferred_time TEXT,
    specific_interests TEXT[],
    
    -- Terms agreement
    agreed_to_terms BOOLEAN DEFAULT false,
    
    -- Status tracking
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
    
    -- Metadata
    source TEXT DEFAULT 'website',
    ip_address INET,
    user_agent TEXT,
    referrer TEXT
);

-- Add RWA fields to demo_inquiries table
ALTER TABLE public.demo_inquiries 
ADD COLUMN IF NOT EXISTS rwa_interests TEXT[],
ADD COLUMN IF NOT EXISTS blockchain_preference VARCHAR(50),
ADD COLUMN IF NOT EXISTS asset_types_to_tokenize TEXT[];

-- Create indexes for better performance on new fields
CREATE INDEX IF NOT EXISTS idx_waitlist_interested_in_tokenization ON public.waitlist(interested_in_tokenization);
CREATE INDEX IF NOT EXISTS idx_waitlist_preferred_blockchain ON public.waitlist(preferred_blockchain);
CREATE INDEX IF NOT EXISTS idx_demo_inquiries_blockchain_preference ON public.demo_inquiries(blockchain_preference);

-- Enable RLS on demo_inquiries if not already enabled
ALTER TABLE public.demo_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for demo_inquiries table
CREATE POLICY IF NOT EXISTS "Allow public inserts to demo_inquiries" ON public.demo_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow service role to read demo_inquiries" ON public.demo_inquiries
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Allow service role to update demo_inquiries" ON public.demo_inquiries
    FOR UPDATE USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp for demo_inquiries
CREATE OR REPLACE FUNCTION update_demo_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at on demo_inquiries
DROP TRIGGER IF EXISTS update_demo_inquiries_updated_at_trigger ON public.demo_inquiries;
CREATE TRIGGER update_demo_inquiries_updated_at_trigger
    BEFORE UPDATE ON public.demo_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_demo_inquiries_updated_at();

-- Grant necessary permissions
GRANT INSERT ON public.demo_inquiries TO anon;
GRANT ALL ON public.demo_inquiries TO service_role;

-- Add comments for documentation
COMMENT ON COLUMN public.waitlist.interested_in_tokenization IS 'Whether the user is interested in RWA tokenization features';
COMMENT ON COLUMN public.waitlist.preferred_blockchain IS 'User preferred blockchain for tokenization (sui, ethereum, canton, etc.)';
COMMENT ON COLUMN public.waitlist.asset_types_to_tokenize IS 'Array of asset types the user wants to tokenize';
COMMENT ON COLUMN public.demo_inquiries.rwa_interests IS 'Array of RWA-related interests from the demo form';
COMMENT ON COLUMN public.demo_inquiries.blockchain_preference IS 'Preferred blockchain for RWA tokenization';
COMMENT ON COLUMN public.demo_inquiries.asset_types_to_tokenize IS 'Array of asset types interested in tokenizing';
