"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp } from "lucide-react"

const problemBlocks = [
  {
    icon: AlertTriangle,
    title: "Equipment goes under-used or breaks unexpectedly",
    color: "text-red-600",
  },
  {
    icon: AlertTriangle,
    title: "Packaging gets lost or wasted",
    color: "text-red-600",
  },
  {
    icon: AlertTriangle,
    title: "Reports are outdated by the time you see them",
    color: "text-red-600",
  },
]

const solutionBlocks = [
  {
    icon: CheckCircle,
    title: "Know exactly where your assets are",
    color: "text-green-600",
  },
  {
    icon: CheckCircle,
    title: "Predict issues before they cost you money",
    color: "text-green-600",
  },
  {
    icon: CheckCircle,
    title: "Prove ROI and compliance with clear data",
    color: "text-green-600",
  },
]

const benefitBlocks = [
  {
    icon: TrendingDown,
    title: "Cut operating costs",
    description: "by reducing asset loss and downtime",
    color: "text-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Boost productivity",
    description: "with automated workflows",
    color: "text-cyan-600",
  },
  {
    icon: CheckCircle,
    title: "Strengthen compliance",
    description: "and sustainability reporting",
    color: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Show clear ROI",
    description: "to leadership, investors, and customers",
    color: "text-purple-600",
  },
]

export function ValueBlocks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Problem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Most businesses don't really know what their assets are doing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {problemBlocks.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <block.icon className={`h-8 w-8 ${block.color} mx-auto mb-4`} />
                    <p className="text-gray-700 font-medium">{block.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Solution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Resend-It turns your assets into a source of real-time insight.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {solutionBlocks.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <block.icon className={`h-8 w-8 ${block.color} mx-auto mb-4`} />
                    <p className="text-gray-700 font-medium">{block.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Resend-It Works for Business</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Resend-It isn't just another report—it's a system that runs while you sleep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6`}
                    >
                      <block.icon className={`h-8 w-8 ${block.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{block.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{block.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
