-- Create waitlist table for tracking Lite plan signups
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    interested_plan VARCHAR(50) DEFAULT 'lite',
    estimated_users VARCHAR(20),
    agreed_to_updates BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'normal',
    source VARCHAR(50) DEFAULT 'website',
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notified_at TIMESTAMP WITH TIME ZONE,
    converted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_interested_plan ON public.waitlist(interested_plan);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for waitlist table
CREATE POLICY "Allow public inserts to waitlist" ON public.waitlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role to read waitlist" ON public.waitlist
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role to update waitlist" ON public.waitlist
    FOR UPDATE USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_waitlist_updated_at_trigger
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_waitlist_updated_at();

-- Grant necessary permissions
GRANT INSERT ON public.waitlist TO anon;
GRANT ALL ON public.waitlist TO service_role;
