-- Insert default blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Product Updates', 'product-updates', 'Latest features and improvements to the Resend-It platform'),
  ('Industry Insights', 'industry-insights', 'Trends and analysis in asset tracking and supply chain'),
  ('Case Studies', 'case-studies', 'Real-world success stories from our customers'),
  ('Technology', 'technology', 'Deep dives into IoT, AI, and blockchain technology'),
  ('ESG & Sustainability', 'esg-sustainability', 'Environmental, social, and governance topics')
ON CONFLICT (slug) DO NOTHING;

-- Insert default blog tags
INSERT INTO blog_tags (name, slug) VALUES
  ('IoT', 'iot'),
  ('AI', 'ai'),
  ('Blockchain', 'blockchain'),
  ('Supply Chain', 'supply-chain'),
  ('Asset Tracking', 'asset-tracking'),
  ('ESG', 'esg'),
  ('Sustainability', 'sustainability'),
  ('ROI', 'roi'),
  ('Digital Transformation', 'digital-transformation'),
  ('Real-World Assets', 'real-world-assets')
ON CONFLICT (slug) DO NOTHING;
