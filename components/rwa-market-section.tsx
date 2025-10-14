"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Globe, DollarSign, Users, Zap, Shield } from "lucide-react"

export function RWAMarketSection() {
  const marketStats = [
    {
      icon: TrendingUp,
      value: "$25B",
      label: "Current Market Size",
      description: "Q2 2025 RWA tokenization market value",
    },
    {
      icon: DollarSign,
      value: "$30T",
      label: "Projected by 2034",
      description: "Standard Chartered's market projection",
    },
    {
      icon: Zap,
      value: "380%",
      label: "3-Year Growth",
      description: "Market expansion since 2022",
    },
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "24/7 trading and fractional ownership democratizes investment opportunities worldwide",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Blockchain technology provides immutable records and transparent asset provenance",
    },
    {
      icon: Users,
      title: "Increased Liquidity",
      description: "Transform illiquid assets into tradeable digital tokens with broader investor access",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Market Opportunity
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            The $30 Trillion RWA Revolution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Real World Asset tokenization is transforming global finance. Our platform enables you to tokenize assets on
            multiple blockchains using Canton's Digital Asset Markup Language and Sui's Move smart contracts.
          </p>
        </motion.div>

        {/* Market Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {marketStats.map((stat, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Market Significance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Why This Matters for Investors</h3>
          <p className="text-lg mb-8 max-w-4xl mx-auto text-blue-100">
            The RWA tokenization market has grown 380% in just three years, reaching $25 billion in 2025. With
            projections ranging from $16 trillion (BCG) to $30 trillion (Standard Chartered) by 2030-2034, early
            adoption positions investors at the forefront of the largest financial transformation since digitization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Explore Tokenization
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              View Market Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
