"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRef } from "react"

const partners = [
  // Tier 1 - Major Partners (larger cards)
  {
    name: "OpenAI",
    icon: "/partners/openai-icon.jpg",
    category: "AI",
    tier: 1,
    description: "Advanced AI Models",
  },
  {
    name: "Microsoft Azure",
    icon: "/partners/microsoft-azure-icon.jpg",
    category: "Cloud",
    tier: 1,
    description: "Enterprise Cloud",
  },
  {
    name: "Salesforce",
    icon: "/partners/salesforce-icon.jpg",
    category: "CRM",
    tier: 1,
    description: "Customer Relations",
  },

  // Tier 2 - Standard Partners
  { name: "Anthropic", icon: "/partners/anthropic-icon.jpg", category: "AI", tier: 2 },
  { name: "Google AI", icon: "/partners/google-ai-icon.jpg", category: "AI", tier: 2 },
  { name: "Meta", icon: "/partners/meta-icon.jpg", category: "AI", tier: 2 },
  { name: "Mistral", icon: "/partners/mistral-icon.jpg", category: "AI", tier: 2 },
  { name: "Stability AI", icon: "/partners/stability-ai-icon.jpg", category: "AI", tier: 2 },
  { name: "Ethereum", icon: "/partners/ethereum-icon.jpg", category: "Blockchain", tier: 2 },
  { name: "Sui Network", icon: "/partners/sui-icon.jpg", category: "Blockchain", tier: 2 },
  { name: "Bitcoin", icon: "/partners/bitcoin-icon.jpg", category: "Blockchain", tier: 2 },
  { name: "Coinbase", icon: "/partners/coinbase-icon.jpg", category: "Blockchain", tier: 2 },
  { name: "Shopify", icon: "/partners/shopify-icon.jpg", category: "E-commerce", tier: 2 },
]

const categoryColors = {
  AI: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-200/20",
  Cloud: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200/20",
  Payments: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20",
  CRM: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20",
  Blockchain: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-200/20",
  "E-commerce": "bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-200/20",
  Business: "bg-gradient-to-br from-slate-500/10 to-gray-500/10 border-slate-200/20",
}

interface PartnerCardProps {
  partner: (typeof partners)[0]
  index: number
}

function PartnerCard({ partner, index }: PartnerCardProps) {
  const isLarge = partner.tier === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={`group relative ${isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
    >
      <div
        className={`
        relative h-full rounded-2xl border backdrop-blur-sm transition-all duration-300
        ${categoryColors[partner.category as keyof typeof categoryColors]}
        hover:border-slate-300/40 hover:shadow-lg hover:shadow-slate-200/20
        ${isLarge ? "p-8" : "p-6"}
      `}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className={`relative flex ${isLarge ? "flex-col justify-between h-full" : "flex-col items-center justify-center h-full min-h-[120px]"}`}
        >
          {/* Category badge for large cards */}
          {isLarge && (
            <div className="flex justify-between items-start mb-4">
              <Badge variant="secondary" className="text-xs font-medium bg-white/50 text-slate-700 border-0">
                {partner.category}
              </Badge>
            </div>
          )}

          {/* Logo */}
          <div className={`${isLarge ? "mb-6" : "mb-3"} flex justify-center`}>
            <div
              className={`
              relative rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 
              transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105
              ${isLarge ? "p-5 w-28 h-28 md:p-4 md:w-20 md:h-20" : "p-3 w-16 h-16"}
            `}
            >
              <Image
                src={partner.icon || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                width={isLarge ? 72 : 40}
                height={isLarge ? 72 : 40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`text-center ${isLarge ? "space-y-2" : ""}`}>
            <h3
              className={`font-semibold text-slate-800 transition-colors duration-200 group-hover:text-slate-900 ${
                isLarge ? "text-lg" : "text-sm"
              }`}
            >
              {partner.name}
            </h3>

            {isLarge && partner.description && (
              <p className="text-sm text-slate-600 leading-relaxed">{partner.description}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />

      <div className="container mx-auto px-4 relative">
        <motion.div style={{ y, opacity }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-200/50"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-700">Trusted by Industry Leaders</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            Enterprise-Grade
            <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Integrations
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Connect seamlessly with the world's most trusted platforms. Our certified integrations ensure reliable,
            secure data flow across your entire tech stack.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr"
        >
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900 mb-1">Ready to integrate?</p>
              <p className="text-xs text-slate-600">Connect your systems in minutes, not months.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
            >
              View All Integrations
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
