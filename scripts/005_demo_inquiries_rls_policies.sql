-- Create RLS policies for demo_inquiries table to allow public inserts
-- Enable RLS on demo_inquiries table
ALTER TABLE demo_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for demo requests (no authentication required)
CREATE POLICY "Allow public demo request inserts" ON demo_inquiries
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow service role to read all demo inquiries
CREATE POLICY "Allow service role full access" ON demo_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read their own inquiries (for future use)
CREATE POLICY "Allow users to read own inquiries" ON demo_inquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.email());
