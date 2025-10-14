-- Enable Row Level Security on blog tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Blog Categories Policies
-- Anyone can read categories
CREATE POLICY "Anyone can view blog categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Only authenticated users can create categories
CREATE POLICY "Authenticated users can create categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update categories
CREATE POLICY "Authenticated users can update categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete categories
CREATE POLICY "Authenticated users can delete categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (true);

-- Blog Posts Policies
-- Anyone can read published posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authors can update their own posts, or any authenticated user can update
CREATE POLICY "Authors can update their blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true);

-- Authors can delete their own posts, or any authenticated user can delete
CREATE POLICY "Authors can delete their blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Blog Tags Policies
-- Anyone can read tags
CREATE POLICY "Anyone can view blog tags"
  ON blog_tags FOR SELECT
  USING (true);

-- Authenticated users can create tags
CREATE POLICY "Authenticated users can create tags"
  ON blog_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update tags
CREATE POLICY "Authenticated users can update tags"
  ON blog_tags FOR UPDATE
  TO authenticated
  USING (true);

-- Authenticated users can delete tags
CREATE POLICY "Authenticated users can delete tags"
  ON blog_tags FOR DELETE
  TO authenticated
  USING (true);

-- Blog Post Tags Policies
-- Anyone can read post-tag relationships
CREATE POLICY "Anyone can view blog post tags"
  ON blog_post_tags FOR SELECT
  USING (true);

-- Authenticated users can manage post-tag relationships
CREATE POLICY "Authenticated users can manage post tags"
  ON blog_post_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
