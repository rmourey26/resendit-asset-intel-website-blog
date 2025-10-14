-- Email Integration Setup for Resend-It
-- This script adds email tracking and logging capabilities

-- Create email_logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_type VARCHAR(50) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL DEFAULT 'updates@resend-it.com',
    subject TEXT NOT NULL,
    message_id VARCHAR(255), -- Resend message ID
    status VARCHAR(20) DEFAULT 'sent', -- sent, delivered, bounced, failed
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_email_logs_message_id ON email_logs(message_id);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Service role can manage email logs" ON email_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_logs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER email_logs_updated_at
    BEFORE UPDATE ON email_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_email_logs_updated_at();

-- Create email templates table for future template management
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    subject_template TEXT NOT NULL,
    html_template TEXT NOT NULL,
    text_template TEXT NOT NULL,
    variables JSONB DEFAULT '[]', -- Array of required variables
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for email templates
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for email templates
CREATE POLICY "Service role can manage email templates" ON email_templates
    FOR ALL USING (auth.role() = 'service_role');

-- Insert default email templates
INSERT INTO email_templates (name, subject_template, html_template, text_template, variables) VALUES
('demo_request', 'New Demo Request from {{company}}', 
 '<h1>New Demo Request</h1><p>From: {{name}} at {{company}}</p>', 
 'New Demo Request from {{name}} at {{company}}',
 '["name", "company", "email"]'
),
('waitlist_welcome', 'Welcome to Resend-It - You''re on the Lite Plan Waitlist!',
 '<h1>Welcome to Resend-It!</h1><p>Hi {{firstName}}, thank you for joining our waitlist!</p>',
 'Welcome to Resend-It! Hi {{firstName}}, thank you for joining our waitlist!',
 '["firstName"]'
),
('email_confirmation', 'Confirm your Resend-It account',
 '<h1>Confirm Your Account</h1><p>Click the link to confirm: {{confirmationUrl}}</p>',
 'Confirm your account: {{confirmationUrl}}',
 '["confirmationUrl"]'
);

-- Create trigger for email templates updated_at
CREATE TRIGGER email_templates_updated_at
    BEFORE UPDATE ON email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_email_logs_updated_at();

-- Add email preferences to user profiles (if users table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        ALTER TABLE users ADD COLUMN IF NOT EXISTS email_preferences JSONB DEFAULT '{
            "marketing": true,
            "product_updates": true,
            "security_alerts": true,
            "waitlist_updates": true
        }';
        
        ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Create function to log email sends
CREATE OR REPLACE FUNCTION log_email_send(
    p_email_type VARCHAR(50),
    p_recipient_email VARCHAR(255),
    p_subject TEXT,
    p_message_id VARCHAR(255) DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO email_logs (email_type, recipient_email, subject, message_id, metadata)
    VALUES (p_email_type, p_recipient_email, p_subject, p_message_id, p_metadata)
    RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION log_email_send TO service_role;

COMMENT ON TABLE email_logs IS 'Tracks all emails sent through the Resend integration';
COMMENT ON TABLE email_templates IS 'Stores email templates for consistent messaging';
COMMENT ON FUNCTION log_email_send IS 'Logs email sends for tracking and analytics';
