"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog"
import type { BlogPost, BlogCategory, BlogTag } from "@/lib/types/blog"

interface BlogPostFormProps {
  post?: BlogPost & { tags?: Array<{ tag: BlogTag }> }
  categories: BlogCategory[]
  tags: BlogTag[]
}

export function BlogPostForm({ post, categories, tags }: BlogPostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags?.map((t) => t.tag.id) || [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Add selected tags to formData
    selectedTags.forEach((tagId) => {
      formData.append("tag_ids", tagId)
    })

    const result = post ? await updateBlogPost(post.id, formData) : await createBlogPost(formData)

    if (result.error) {
      alert(result.error)
      setLoading(false)
      return
    }

    router.push("/admin/blog")
    router.refresh()
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" defaultValue={post?.title} required placeholder="Enter post title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt || ""}
              placeholder="Brief summary of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              required
              placeholder="Write your post content here..."
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              name="featured_image"
              type="url"
              defaultValue={post?.featured_image || ""}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                name="author_name"
                defaultValue={post?.author_name || ""}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author_avatar">Author Avatar URL</Label>
              <Input
                id="author_avatar"
                name="author_avatar"
                type="url"
                defaultValue={post?.author_avatar || ""}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select name="category_id" defaultValue={post?.category_id || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select name="status" defaultValue={post?.status || "draft"} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag.id}`}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => toggleTag(tag.id)}
                  />
                  <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="btn-gradient">
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")} disabled={loading}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
