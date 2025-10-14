export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  author_id: string | null
  author_name: string
  author_avatar: string | null
  category_id: string | null
  status: "draft" | "published" | "archived"
  published_at: string | null
  reading_time: number | null
  views: number
  created_at: string
  updated_at: string
  category?: BlogCategory
  tags?: BlogTag[]
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface BlogPostTag {
  post_id: string
  tag_id: string
}
