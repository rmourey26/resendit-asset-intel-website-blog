"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart, Zap, Users } from "lucide-react"

const coreValues = [
  {
    icon: Target,
    title: "Truth in Data",
    description:
      "We believe in the power of accurate, first-party data to drive meaningful decisions and create lasting impact.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Heart,
    title: "Circular by Design",
    description: "Every solution we build promotes circularity, sustainability, and responsible resource management.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Zap,
    title: "Technology with Purpose",
    description: "We harness cutting-edge technology—IoT, AI, blockchain—to solve real-world challenges that matter.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Eye,
    title: "Execution over Excuses",
    description: "We deliver results through disciplined execution, continuous improvement, and accountability.",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: Users,
    title: "Partnership Wins",
    description: "Success comes through collaboration, building lasting partnerships that create mutual value.",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">About Resend-It</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform physical assets into intelligent, trackable systems that drive operational excellence,
                sustainability, and data-driven decision making across every industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A transparent, circular, data-driven economy where every physical asset contributes to sustainable
                growth and operational intelligence.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.bg} mb-6`}
                    >
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-8">Driving Impact Across Industries</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-indigo-200">Industry Verticals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-indigo-200">Assets Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-indigo-200">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-200">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
