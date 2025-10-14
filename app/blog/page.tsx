import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/types/blog"

export const metadata = {
  title: "Blog - Resend-It",
  description: "Insights, updates, and stories from the world of intelligent asset tracking",
  openGraph: {
    title: "Blog - Resend-It",
    description: "Insights, updates, and stories from the world of intelligent asset tracking",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Resend-It",
    description: "Insights, updates, and stories from the world of intelligent asset tracking",
    images: ["/og-image.jpg"],
  },
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `,
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })

  const { data: categories } = await supabase.from("blog_categories").select("*").order("name")

  const featuredPost = posts?.[0]
  const recentPosts = posts?.slice(1) || []

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Insights & <span className="gradient-text">Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore the latest in asset intelligence, IoT technology, and digital transformation
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Link href="/blog">
              <Badge variant="default" className="cursor-pointer">
                All Posts
              </Badge>
            </Link>
            {categories?.map((category) => (
              <Link key={category.id} href={`/blog?category=${category.slug}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    {featuredPost.featured_image ? (
                      <Image
                        src={featuredPost.featured_image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                    )}
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">Featured</Badge>
                    <CardTitle className="text-3xl mb-4 text-balance">{featuredPost.title}</CardTitle>
                    <CardDescription className="text-base mb-6 text-pretty">{featuredPost.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.published_at!).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {featuredPost.reading_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.reading_time} min read
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Read More <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post: BlogPost) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  {post.featured_image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.featured_image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {post.category && (
                      <Badge variant="outline" className="w-fit mb-2">
                        {post.category.name}
                      </Badge>
                    )}
                    <CardTitle className="text-xl text-balance">{post.title}</CardTitle>
                    <CardDescription className="text-pretty">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.published_at!).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time} min
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {(!recentPosts || recentPosts.length === 0) && !featuredPost && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
