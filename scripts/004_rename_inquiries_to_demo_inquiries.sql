-- Rename inquiries table to demo_inquiries
-- This migration renames the table and updates all associated objects

-- Rename the table
ALTER TABLE inquiries RENAME TO demo_inquiries;

-- Update indexes to reflect new table name
DROP INDEX IF EXISTS idx_inquiries_user_id;
DROP INDEX IF EXISTS idx_inquiries_email;
DROP INDEX IF EXISTS idx_inquiries_status;
DROP INDEX IF EXISTS idx_inquiries_inquiry_type;
DROP INDEX IF EXISTS idx_inquiries_created_at;

CREATE INDEX IF NOT EXISTS idx_demo_inquiries_user_id ON demo_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_demo_inquiries_email ON demo_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_demo_inquiries_status ON demo_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_demo_inquiries_inquiry_type ON demo_inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_demo_inquiries_created_at ON demo_inquiries(created_at);

-- Drop old policies
DROP POLICY IF EXISTS "Users can view their own inquiries" ON demo_inquiries;
DROP POLICY IF EXISTS "Users can create inquiries" ON demo_inquiries;
DROP POLICY IF EXISTS "Admin users can view all inquiries" ON demo_inquiries;

-- Create new policies with updated names
CREATE POLICY "Users can view their own demo inquiries" ON demo_inquiries
  FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

CREATE POLICY "Users can create demo inquiries" ON demo_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin users can view all demo inquiries" ON demo_inquiries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data ->> 'role' = 'admin'
    )
  );

-- Drop old triggers and functions
DROP TRIGGER IF EXISTS update_inquiries_updated_at ON demo_inquiries;
DROP TRIGGER IF EXISTS increment_reply_count ON demo_inquiries;
DROP FUNCTION IF EXISTS update_inquiries_updated_at();
DROP FUNCTION IF EXISTS increment_reply_count();

-- Create new functions with updated names
CREATE OR REPLACE FUNCTION update_demo_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_demo_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reply IS DISTINCT FROM OLD.reply AND NEW.reply IS NOT NULL THEN
    NEW.reply_count = COALESCE(OLD.reply_count, 0) + 1;
    NEW.last_reply_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new triggers
CREATE TRIGGER update_demo_inquiries_updated_at
  BEFORE UPDATE ON demo_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_demo_inquiries_updated_at();

CREATE TRIGGER increment_demo_reply_count
  BEFORE UPDATE ON demo_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION increment_demo_reply_count();
