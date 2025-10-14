import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { BlogPostForm } from "@/components/admin/blog-post-form"

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `,
    )
    .eq("id", params.id)
    .single()

  if (!post) {
    notFound()
  }

  const { data: categories } = await supabase.from("blog_categories").select("*").order("name")

  const { data: tags } = await supabase.from("blog_tags").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Edit Blog Post</h1>
        <BlogPostForm post={post} categories={categories || []} tags={tags || []} />
      </div>
    </div>
  )
}
