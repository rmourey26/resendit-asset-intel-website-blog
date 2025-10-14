import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BlogPostForm } from "@/components/admin/blog-post-form"

export default async function NewBlogPostPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: categories } = await supabase.from("blog_categories").select("*").order("name")

  const { data: tags } = await supabase.from("blog_tags").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Create New Blog Post</h1>
        <BlogPostForm categories={categories || []} tags={tags || []} />
      </div>
    </div>
  )
}
