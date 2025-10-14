import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import type { BlogPost, BlogTag } from "@/lib/types/blog"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Resend-It Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: `${post.title} - Resend-It Blog`,
      description: post.excerpt || post.title,
      images: [post.featured_image || "/og-image.jpg"],
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Resend-It Blog`,
      description: post.excerpt || post.title,
      images: [post.featured_image || "/og-image.jpg"],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `,
    )
    .eq("slug", params.slug)
    .eq("status", "published")
    .single()

  if (!post) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id)

  // Get related posts from same category
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .eq("category_id", post.category_id)
    .neq("id", post.id)
    .limit(3)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            {post.category && (
              <Badge variant="outline" className="mb-4">
                {post.category.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author_avatar || undefined} />
                  <AvatarFallback>{post.author_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author_name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.published_at!).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.reading_time} min read
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {post.featured_image && (
              <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                <Image src={post.featured_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map(({ tag }: { tag: BlogTag }) => (
                <Badge key={tag.id} variant="secondary">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Author Card */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author_avatar || undefined} />
                  <AvatarFallback className="text-xl">{post.author_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">Written by {post.author_name}</p>
                  <p className="text-muted-foreground">Contributing author at Resend-It</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {relatedPost.featured_image && (
                        <div className="relative h-40 w-full">
                          <Image
                            src={relatedPost.featured_image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-balance">{relatedPost.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{relatedPost.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
