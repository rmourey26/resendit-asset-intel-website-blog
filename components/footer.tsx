"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail, MapPin } from "lucide-react"

const footerLinks = {
  Platform: [
    { name: "Asset Tracking", href: "#platform" },
    { name: "Lifecycle Automation", href: "#platform" },
    { name: "Analytics & Insights", href: "#platform" },
    { name: "ESG & Compliance", href: "#platform" },
    { name: "Integrations", href: "#platform" },
  ],
  Solutions: [
    { name: "Retail & eCommerce", href: "#solutions" },
    { name: "Supply Chain & Manufacturing", href: "#solutions" },
    { name: "IT & Data Centers", href: "#solutions" },
    { name: "Medical Equipment", href: "#solutions" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Leadership Team", href: "#leadership" },
    // { name: "Careers", href: "#" },p
    { name: "Press & Media", href: "#resources" },
    { name: "Contact", href: "#contact" },
  ],
  Resources: [
    { name: "Documentation", href: "#resources" },
    { name: "Whitepapers", href: "#resources" },
    { name: "Blog", href: "#resources" },
    { name: "Case Studies", href: "#resources" },
    { name: "Support", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Image
                src="/images/design-mode/resend-it-svg.svg"
                alt="Resend-It Logo"
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert logo-pulse-white"
              />
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transform physical assets into intelligent, trackable systems with IoT, AI, and blockchain technology.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <a href="https://linkedin.com/company/resend-it" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="sm" variant="ghost" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <a href="mailto:help@resend-it.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">2601 Summers St STE 300 Kennesaw, GA 30144</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">help@resend-it.com</span>
            </div>
          </div>
        </motion.div>

        {/* BottomBar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2025 Resend-It. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/cookie-preferences" className="text-gray-400 hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
