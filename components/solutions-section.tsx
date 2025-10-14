"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Truck, Server, Heart } from "lucide-react"

const solutions = [
  {
    icon: ShoppingCart,
    title: "Retail & eCommerce",
    pain: "Returns kill your margins. ESG reports waste your time.",
    fix: "Track inventory. Automate returns. Pull ESG data in minutes.",
    payoff: "Lower returns costs. Cleaner reports. Faster growth.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Truck,
    title: "Supply Chain / Manufacturing / Shipping",
    pain: "Lost assets. Unplanned downtime. Broken routing.",
    fix: "Live asset tracking. Predictive maintenance. Automated workflows.",
    payoff: "Less loss. Faster turnaround. Fewer fires to put out.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "IT & Data Centers",
    pain: "Hardware goes missing. Compliance fails. Teams waste hours on audits.",
    fix: "Asset IDs. Usage logs. Automated compliance triggers.",
    payoff: "Continuous compliance. Lower loss. Fewer late nights.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Medical Equipment & Life Sciences",
    pain: "Risk of non-compliance. Devices offline. Costly manual checks.",
    fix: "Track each device lifecycle. Automate servicing. Log compliance automatically.",
    payoff: "Ready-to-use equipment. Reduced risk. Audit done in clicks.",
    color: "from-green-500 to-emerald-500",
  },
]

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Industry Pages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions that solve real problems and deliver measurable results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${solution.color} p-8 text-white`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6"
                    >
                      <solution.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-6">{solution.title}</h3>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">The Pain:</h4>
                        <p className="text-gray-700">{solution.pain}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">Our Fix:</h4>
                        <p className="text-gray-700">{solution.fix}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Your Payoff:</h4>
                        <p className="text-gray-700">{solution.payoff}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-6 w-full group-hover:bg-indigo-600 group-hover:text-white transition-colors bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
