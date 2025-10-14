-- Resend-It Platform Auth Functions
-- Migration: 002_auth_functions.sql
-- Description: Authentication helper functions and triggers

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  org_id UUID;
  plan_id UUID;
BEGIN
  -- Insert user profile
  INSERT INTO public.users (id, email, first_name, last_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
  
  -- Create organization if company_name is provided
  IF NEW.raw_user_meta_data->>'company_name' IS NOT NULL THEN
    INSERT INTO public.organizations (name, slug, created_by)
    VALUES (
      NEW.raw_user_meta_data->>'company_name',
      LOWER(REPLACE(NEW.raw_user_meta_data->>'company_name', ' ', '-')) || '-' || SUBSTRING(NEW.id::text, 1, 8),
      NEW.id
    )
    RETURNING id INTO org_id;
    
    -- Add user as organization owner
    INSERT INTO public.organization_members (organization_id, user_id, role)
    VALUES (org_id, NEW.id, 'owner');
    
    -- Get Lite plan ID
    SELECT id INTO plan_id FROM public.subscription_plans WHERE name = 'lite';
    
    -- Create trial subscription
    INSERT INTO public.organization_subscriptions (
      organization_id, 
      plan_id, 
      status, 
      trial_end,
      current_period_start,
      current_period_end
    )
    VALUES (
      org_id, 
      plan_id, 
      'trialing',
      NOW() + INTERVAL '30 days',
      NOW(),
      NOW() + INTERVAL '30 days'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user's current organization
CREATE OR REPLACE FUNCTION public.get_user_organization(user_uuid UUID DEFAULT auth.uid())
RETURNS UUID AS $$
DECLARE
  org_id UUID;
BEGIN
  SELECT organization_id INTO org_id
  FROM public.organization_members
  WHERE user_id = user_uuid
  ORDER BY joined_at ASC
  LIMIT 1;
  
  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has permission for organization
CREATE OR REPLACE FUNCTION public.user_has_org_permission(
  user_uuid UUID DEFAULT auth.uid(),
  org_uuid UUID DEFAULT NULL,
  required_role user_role DEFAULT 'member'
)
RETURNS BOOLEAN AS $$
DECLARE
  user_role_in_org user_role;
BEGIN
  -- If no org specified, use user's primary org
  IF org_uuid IS NULL THEN
    org_uuid := public.get_user_organization(user_uuid);
  END IF;
  
  SELECT role INTO user_role_in_org
  FROM public.organization_members
  WHERE user_id = user_uuid AND organization_id = org_uuid;
  
  -- Check role hierarchy: owner > admin > member > viewer
  CASE required_role
    WHEN 'viewer' THEN
      RETURN user_role_in_org IN ('viewer', 'member', 'admin', 'owner');
    WHEN 'member' THEN
      RETURN user_role_in_org IN ('member', 'admin', 'owner');
    WHEN 'admin' THEN
      RETURN user_role_in_org IN ('admin', 'owner');
    WHEN 'owner' THEN
      RETURN user_role_in_org = 'owner';
    ELSE
      RETURN FALSE;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track usage
CREATE OR REPLACE FUNCTION public.track_usage(
  org_uuid UUID,
  resource_type_param TEXT,
  amount_param INTEGER,
  metadata_param JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
DECLARE
  period_start_date DATE;
  period_end_date DATE;
BEGIN
  -- Calculate current billing period (monthly)
  period_start_date := DATE_TRUNC('month', NOW())::DATE;
  period_end_date := (DATE_TRUNC('month', NOW()) + INTERVAL '1 month' - INTERVAL '1 day')::DATE;
  
  -- Insert or update usage tracking
  INSERT INTO public.usage_tracking (
    organization_id,
    user_id,
    resource_type,
    amount,
    period_start,
    period_end,
    metadata
  )
  VALUES (
    org_uuid,
    auth.uid(),
    resource_type_param,
    amount_param,
    period_start_date,
    period_end_date,
    metadata_param
  )
  ON CONFLICT (organization_id, resource_type, period_start, period_end)
  DO UPDATE SET
    amount = usage_tracking.amount + amount_param,
    metadata = metadata_param,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current usage for organization
CREATE OR REPLACE FUNCTION public.get_current_usage(
  org_uuid UUID DEFAULT NULL,
  resource_type_param TEXT DEFAULT NULL
)
RETURNS TABLE (
  resource_type TEXT,
  current_usage INTEGER,
  limit_amount INTEGER,
  percentage_used NUMERIC
) AS $$
DECLARE
  target_org_id UUID;
  period_start_date DATE;
  period_end_date DATE;
BEGIN
  -- Use provided org or user's primary org
  IF org_uuid IS NULL THEN
    target_org_id := public.get_user_organization();
  ELSE
    target_org_id := org_uuid;
  END IF;
  
  -- Calculate current billing period
  period_start_date := DATE_TRUNC('month', NOW())::DATE;
  period_end_date := (DATE_TRUNC('month', NOW()) + INTERVAL '1 month' - INTERVAL '1 day')::DATE;
  
  RETURN QUERY
  SELECT 
    ut.resource_type,
    COALESCE(ut.amount, 0) as current_usage,
    CASE ut.resource_type
      WHEN 'ai_requests' THEN sp.ai_requests_limit
      WHEN 'storage' THEN sp.storage_limit_gb
      WHEN 'api_calls' THEN sp.api_calls_limit
      ELSE NULL
    END as limit_amount,
    CASE 
      WHEN CASE ut.resource_type
        WHEN 'ai_requests' THEN sp.ai_requests_limit
        WHEN 'storage' THEN sp.storage_limit_gb
        WHEN 'api_calls' THEN sp.api_calls_limit
        ELSE NULL
      END IS NULL THEN 0 -- Unlimited
      ELSE (COALESCE(ut.amount, 0)::NUMERIC / CASE ut.resource_type
        WHEN 'ai_requests' THEN sp.ai_requests_limit
        WHEN 'storage' THEN sp.storage_limit_gb
        WHEN 'api_calls' THEN sp.api_calls_limit
        ELSE 1
      END::NUMERIC) * 100
    END as percentage_used
  FROM (
    SELECT 'ai_requests' as resource_type
    UNION SELECT 'storage'
    UNION SELECT 'api_calls'
  ) resource_types
  LEFT JOIN public.usage_tracking ut ON ut.resource_type = resource_types.resource_type
    AND ut.organization_id = target_org_id
    AND ut.period_start = period_start_date
    AND ut.period_end = period_end_date
  LEFT JOIN public.organization_subscriptions os ON os.organization_id = target_org_id
    AND os.status = 'active'
  LEFT JOIN public.subscription_plans sp ON sp.id = os.plan_id
  WHERE resource_type_param IS NULL OR resource_types.resource_type = resource_type_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
