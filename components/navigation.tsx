"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false)

  const navItems = [
    { name: "Platform", href: "#platform" },
    { name: "ESG & Reporting", href: "#esg" },
    { name: "AI ROI Factors", href: "#ai-roi-factors" },
    { name: "About", href: "#about" },
    { name: "ROI Calculator", href: "#roi-calculator" },
    { name: "Blog", href: "/blog" },
    { name: "Resources", href: "#resources" },
  ]

  const industryItems = [
    { name: "Retail & eCommerce", href: "/industries/retail" },
    { name: "Supply Chain & Manufacturing", href: "/industries/supply-chain" },
    { name: "IT & Data Centers", href: "/industries/it-data-centers" },
    { name: "Medical Equipment & Life Sciences", href: "/industries/medical-equipment" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/">
              <Image
                src="/images/design-mode/resend-it-svg.svg"
                alt="Resend-It Logo"
                width={140}
                height={40}
                className="h-7 md:h-9 w-auto logo-pulse-gradient"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-all duration-200 hover:scale-105"
              >
                {item.name}
              </motion.a>
            ))}

            <div className="relative">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center text-sm text-gray-600 hover:text-indigo-600 font-medium transition-all duration-200 hover:scale-105"
                onMouseEnter={() => setIsIndustriesOpen(true)}
                onMouseLeave={() => setIsIndustriesOpen(false)}
              >
                Industries
                <ChevronDown className="ml-1 h-3 w-3" />
              </motion.button>

              {isIndustriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  onMouseEnter={() => setIsIndustriesOpen(true)}
                  onMouseLeave={() => setIsIndustriesOpen(false)}
                >
                  {industryItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="ml-4"
            >
              <Link href="/signup">
                <Button className="btn-primary text-sm px-4 py-2">Join Lite Waitlist</Button>
              </Link>
            </motion.div>
          </div>

          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="px-2">
                <div className="text-gray-900 font-medium py-1 mb-2">Industries</div>
                {industryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-1 pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link href="/signup">
                <Button className="btn-primary mx-2 mt-2">Join Lite Waitlist</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
