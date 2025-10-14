import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit } from "lucide-react"
import { DeletePostButton } from "@/components/admin/delete-post-button"
import type { BlogPost } from "@/lib/types/blog"

export default async function AdminBlogPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch all blog posts with categories
  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(*)
    `,
    )
    .order("created_at", { ascending: false })

  const { data: categories } = await supabase.from("blog_categories").select("*").order("name")

  const { data: tags } = await supabase.from("blog_tags").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Blog Admin</h1>
            <p className="text-muted-foreground mt-2">Manage your blog posts, categories, and tags</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="btn-gradient">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{posts?.length || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{categories?.length || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tags?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>Manage and edit your blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts?.map((post: BlogPost) => (
                <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      {post.category && <Badge variant="outline">{post.category.name}</Badge>}
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </div>
                </div>
              ))}
              {!posts || posts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No blog posts yet. Create your first post!</p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage blog categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Manage blog tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
