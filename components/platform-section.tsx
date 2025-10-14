"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Cog, BarChart } from "lucide-react"

const platformFeatures = [
  {
    icon: MapPin,
    title: "Track It",
    description: 'Always know the "who, what, and where" of your assets.',
    features: [
      "GPS + RFID tracking",
      "Real-time condition monitoring",
      "Instant alerts when things move, break, or go missing",
    ],
  },
  {
    icon: Cog,
    title: "Act On It",
    description: "Automate the busywork so your team can focus on growth.",
    features: [
      "Predictive maintenance (fix it before it breaks)",
      "Automated restock, repair, and workflow triggers",
      "AI-powered insights to reduce waste and downtime",
    ],
  },
  {
    icon: BarChart,
    title: "Prove It",
    description: "Show stakeholders and auditors the real results.",
    features: [
      "ESG and sustainability reporting",
      "Built-in compliance and chain-of-custody proof",
      "Dashboards that clearly demonstrate ROI",
    ],
  },
]

export function PlatformSection() {
  return (
    <section id="platform-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Three Steps to Smarter Operations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Resend-It isn't just another report—it's a system that runs while you sleep.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">Cut operating costs</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">Boost productivity</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">Strengthen compliance</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">Show clear ROI</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6"
                  >
                    <feature.icon className="h-8 w-8 text-indigo-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" className="btn-primary text-lg px-8 py-4">
            Explore Platform Features
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
