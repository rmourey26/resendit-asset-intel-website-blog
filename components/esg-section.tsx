"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Target, FileText, BarChart3, Globe, Award } from "lucide-react"
import Link from "next/link"

const esgFeatures = [
  {
    icon: Target,
    title: "Scope 1-3 Tracking",
    description: "Comprehensive carbon footprint tracking across all emission scopes with real-time data collection.",
  },
  {
    icon: BarChart3,
    title: "Waste Diversion Metrics",
    description: "Track and optimize waste reduction, recycling rates, and circular economy initiatives.",
  },
  {
    icon: FileText,
    title: "Compliance Exports",
    description: "Automated reporting for regulatory requirements and sustainability frameworks.",
  },
  {
    icon: Globe,
    title: "Custom KPI Dashboards",
    description: "Personalized sustainability dashboards with industry-specific metrics and benchmarks.",
  },
]

export function ESGSection() {
  return (
    <section id="esg" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">ESG & Compliance Reporting</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your sustainability reporting with first-party data and comprehensive ESG tracking that meets the
            highest compliance standards.
          </p>
        </motion.div>

        {/* ESG Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {esgFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 flex-shrink-0"
                    >
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-center text-white"
        >
          <Award className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your ESG Reporting?</h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join leading companies using Resend-It to achieve their sustainability goals with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4" asChild>
              <Link href="/signup">Join Waitlist</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 bg-transparent"
              onClick={() => {
                const element = document.getElementById("contact")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
