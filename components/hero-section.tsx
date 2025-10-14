"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight px-2 sm:px-0"
          >
            Turn Every Asset Into a <span className="gradient-text">Smart, Money-Saving Machine</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0"
          >
            Resend-It tracks, automates, and proves the value of your assets—helping your business cut costs, boost
            efficiency, and stay compliant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2 sm:px-0"
          >
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-8 py-4 group border-white text-white hover:bg-white hover:text-gray-900 bg-transparent w-full sm:w-auto"
              onClick={() => {
                const element = document.getElementById("platform-section")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-8 py-4 group border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 bg-transparent w-full sm:w-auto"
              onClick={() => {
                const element = document.getElementById("roi-calculator-section")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Try the ROI Calculator
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-8 py-4 group border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 bg-transparent w-full sm:w-auto"
              asChild
            >
              <Link href="/signup">
                Join Lite Waitlist - $9/month
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-gray-400 px-2 sm:px-0"
          >
            <p className="text-sm mb-4">Trusted by leading companies across industries</p>
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 opacity-60">
              <div className="w-20 sm:w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-20 sm:w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-20 sm:w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-20 sm:w-24 h-8 bg-white/20 rounded"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
