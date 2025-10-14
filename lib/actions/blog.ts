"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Blog Post Actions
export async function createBlogPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const featured_image = formData.get("featured_image") as string
  const author_name = formData.get("author_name") as string
  const author_avatar = formData.get("author_avatar") as string
  const category_id = formData.get("category_id") as string
  const status = formData.get("status") as "draft" | "published" | "archived"
  const tagIds = formData.getAll("tag_ids") as string[]

  const slug = generateSlug(title)
  const reading_time = calculateReadingTime(content)
  const published_at = status === "published" ? new Date().toISOString() : null

  const { data: user } = await supabase.auth.getUser()

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      featured_image: featured_image || null,
      author_id: user.user?.id || null,
      author_name,
      author_avatar: author_avatar || null,
      category_id: category_id || null,
      status,
      published_at,
      reading_time,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Add tags
  if (tagIds.length > 0 && post) {
    const postTags = tagIds.map((tag_id) => ({
      post_id: post.id,
      tag_id,
    }))

    await supabase.from("blog_post_tags").insert(postTags)
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")

  return { success: true, post }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const featured_image = formData.get("featured_image") as string
  const author_name = formData.get("author_name") as string
  const author_avatar = formData.get("author_avatar") as string
  const category_id = formData.get("category_id") as string
  const status = formData.get("status") as "draft" | "published" | "archived"
  const tagIds = formData.getAll("tag_ids") as string[]

  const slug = generateSlug(title)
  const reading_time = calculateReadingTime(content)

  // Get current post to check if status changed
  const { data: currentPost } = await supabase.from("blog_posts").select("status").eq("id", id).single()

  const published_at =
    status === "published" && currentPost?.status !== "published" ? new Date().toISOString() : undefined

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      featured_image: featured_image || null,
      author_name,
      author_avatar: author_avatar || null,
      category_id: category_id || null,
      status,
      ...(published_at && { published_at }),
      reading_time,
    })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  // Update tags
  await supabase.from("blog_post_tags").delete().eq("post_id", id)

  if (tagIds.length > 0) {
    const postTags = tagIds.map((tag_id) => ({
      post_id: id,
      tag_id,
    }))

    await supabase.from("blog_post_tags").insert(postTags)
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/admin/blog")

  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")

  return { success: true }
}

// Category Actions
export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  const slug = generateSlug(name)

  const { error } = await supabase.from("blog_categories").insert({
    name,
    slug,
    description: description || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")

  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_categories").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")

  return { success: true }
}

// Tag Actions
export async function createTag(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const slug = generateSlug(name)

  const { error } = await supabase.from("blog_tags").insert({
    name,
    slug,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")

  return { success: true }
}

export async function deleteTag(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_tags").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")

  return { success: true }
}
