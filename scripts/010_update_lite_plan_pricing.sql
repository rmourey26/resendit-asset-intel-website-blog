-- Migration: 010_update_lite_plan_pricing.sql
-- Description: Update Lite plan pricing to reflect Strategic Pricing Analysis recommendations
-- Updates pricing from $5/month to $9/month (introductory) and $19/month (standard)
-- Updates limits from 100 AI requests to 100,000 AI tokens and adds 100 managed assets limit

-- Update the Lite plan with new pricing and limits
UPDATE public.subscription_plans
SET 
  price_monthly = 900, -- $9/month in cents (introductory pricing)
  price_yearly = 10800, -- $108/year in cents (introductory pricing)
  description = 'Perfect for individuals and small teams getting started with AI asset management. Special introductory pricing for first 12 months, then $19/month.',
  ai_requests_limit = 100000, -- Changed from 100 AI requests to 100,000 AI tokens
  storage_limit_gb = 5, -- Increased from 1GB to 5GB
  team_members_limit = 1,
  api_calls_limit = 1000,
  features = jsonb_build_array(
    '100,000 AI tokens per month',
    '100 managed assets',
    '5GB storage',
    '1 team member',
    'Basic AI insights',
    'Mobile app access',
    'Basic reporting',
    'Email support'
  ),
  updated_at = NOW()
WHERE name = 'lite';

-- Add new columns to track introductory vs standard pricing
ALTER TABLE public.subscription_plans 
ADD COLUMN IF NOT EXISTS price_monthly_standard INTEGER,
ADD COLUMN IF NOT EXISTS price_yearly_standard INTEGER,
ADD COLUMN IF NOT EXISTS managed_assets_limit INTEGER;

-- Update Lite plan with standard pricing (after 12 months)
UPDATE public.subscription_plans
SET 
  price_monthly_standard = 1900, -- $19/month in cents (standard pricing)
  price_yearly_standard = 22800, -- $228/year in cents (standard pricing)
  managed_assets_limit = 100
WHERE name = 'lite';

-- Update other plans with managed assets limits
UPDATE public.subscription_plans
SET managed_assets_limit = 1000
WHERE name = 'starter';

UPDATE public.subscription_plans
SET managed_assets_limit = 10000
WHERE name = 'professional';

UPDATE public.subscription_plans
SET managed_assets_limit = NULL -- Unlimited
WHERE name = 'enterprise';

-- Add index for managed assets limit queries
CREATE INDEX IF NOT EXISTS idx_subscription_plans_managed_assets 
ON public.subscription_plans(managed_assets_limit);

-- Update organization_subscriptions table to track introductory period
ALTER TABLE public.organization_subscriptions
ADD COLUMN IF NOT EXISTS is_introductory_pricing BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS introductory_period_end TIMESTAMP WITH TIME ZONE;

-- Create function to automatically transition from introductory to standard pricing
CREATE OR REPLACE FUNCTION check_introductory_pricing_expiration()
RETURNS TRIGGER AS $$
BEGIN
  -- If subscription is on introductory pricing and the period has ended
  IF NEW.is_introductory_pricing = true 
     AND NEW.introductory_period_end IS NOT NULL 
     AND NEW.introductory_period_end <= NOW() THEN
    
    -- Mark as no longer on introductory pricing
    NEW.is_introductory_pricing = false;
    
    -- Log the transition (you could also trigger a notification here)
    RAISE NOTICE 'Subscription % transitioned from introductory to standard pricing', NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check pricing transitions
DROP TRIGGER IF EXISTS check_pricing_transition ON public.organization_subscriptions;
CREATE TRIGGER check_pricing_transition
  BEFORE UPDATE ON public.organization_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION check_introductory_pricing_expiration();

-- Add comment explaining the pricing structure
COMMENT ON COLUMN public.subscription_plans.price_monthly IS 'Monthly price in cents (introductory price for Lite plan)';
COMMENT ON COLUMN public.subscription_plans.price_yearly IS 'Yearly price in cents (introductory price for Lite plan)';
COMMENT ON COLUMN public.subscription_plans.price_monthly_standard IS 'Standard monthly price in cents (applies after introductory period)';
COMMENT ON COLUMN public.subscription_plans.price_yearly_standard IS 'Standard yearly price in cents (applies after introductory period)';
COMMENT ON COLUMN public.subscription_plans.ai_requests_limit IS 'AI token limit per month (NULL means unlimited)';
COMMENT ON COLUMN public.subscription_plans.managed_assets_limit IS 'Maximum number of managed assets (NULL means unlimited)';
COMMENT ON COLUMN public.organization_subscriptions.is_introductory_pricing IS 'Whether subscription is currently on introductory pricing';
COMMENT ON COLUMN public.organization_subscriptions.introductory_period_end IS 'When introductory pricing period ends (typically 12 months from start)';
