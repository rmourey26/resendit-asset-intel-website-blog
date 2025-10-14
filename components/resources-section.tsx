"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FileText, BookOpen, Newspaper, Download, Check, Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const resources = [
  {
    icon: FileText,
    title: "Whitepapers & Guides",
    description: "In-depth analysis and best practices for asset lifecycle management",
    items: [
      "The Future of Asset Intelligence",
      "ESG Reporting Best Practices",
      "IoT Implementation Guide",
      "ROI Calculator for Asset Tracking",
    ],
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: BookOpen,
    title: "Blog & Insights",
    description: "Latest trends, case studies, and thought leadership in asset management",
    items: [
      "5 Ways AI is Transforming Supply Chains",
      "Circular Economy Success Stories",
      "Compliance Automation Strategies",
      "Industry Benchmarking Reports",
    ],
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Newspaper,
    title: "Press & Media Kit",
    description: "Company news, press releases, and media resources",
    items: [
      "Latest Press Releases",
      "Company Logos & Brand Assets",
      "Executive Bios & Photos",
      "Product Screenshots & Videos",
    ],
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
]

export function ResourcesSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe")
      }

      console.log("[v0] Newsletter subscription successful:", result)
      setIsSubscribed(true)
      setEmail("")
    } catch (error) {
      console.error("[v0] Newsletter subscription error:", error)
      setError(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="resources" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Resources & Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive library of resources to help you understand and implement intelligent asset
            management solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${resource.bg} mb-6`}
                  >
                    <resource.icon className={`h-8 w-8 ${resource.color}`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{resource.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
                  <ul className="space-y-3 mb-8">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <Download className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {resource.title === "Blog & Insights" ? (
                    <Link href="/blog">
                      <Button
                        variant="outline"
                        className="w-full group hover:bg-indigo-600 hover:text-white transition-colors bg-transparent"
                      >
                        Browse Resources
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setShowComingSoon(true)}
                      className="w-full group hover:bg-indigo-600 hover:text-white transition-colors bg-transparent"
                    >
                      Browse Resources
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white"
        >
          {isSubscribed ? (
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-lg text-gray-100 mb-6">
                You've successfully subscribed to our newsletter. Check your email for a welcome message!
              </p>
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Mail className="h-4 w-4 text-green-400" />
                  <span>Welcome email sent to your inbox</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Get the latest insights on asset intelligence, industry trends, and product updates delivered to your
                inbox.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              {error && <p className="text-red-300 text-sm mt-4">{error}</p>}
            </>
          )}
        </motion.div>
      </div>
      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
            <AlertDialogDescription>
              This resource section is currently under development. Check back soon for updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
