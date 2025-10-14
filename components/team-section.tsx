"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Cody Clark",
    role: "Founder",
    bio: "Visionary entrepreneur with deep expertise in AI and blockchain technologies. Leading the transformation of asset intelligence through innovative platform solutions.",
    image: "/cody-clark-profile.png",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "cody@resend-it.com",
    },
  },
  {
    name: "Robert Mourey Jr.",
    role: "Chief Technology Officer",
    bio: "Seasoned technology leader with extensive experience in enterprise systems architecture and AI implementation. Driving technical innovation in asset lifecycle management.",
    image: "/robert-mourey-profile.png",
    social: {
      linkedin: "https://linkedin.com/in/robertmoureyjr",
      twitter: "https://x.com/r_mourey_jr",
      email: "robert@resend-it.com",
    },
  },
]

const advisors = [
  {
    name: "Dr. Michael Thompson",
    role: "Supply Chain Advisor",
    company: "Former VP Supply Chain, Tesla",
  },
  {
    name: "Lisa Chang",
    role: "ESG Advisor",
    company: "Former Director Sustainability, Microsoft",
  },
  {
    name: "Robert Kim",
    role: "Technology Advisor",
    company: "Former CTO, Palantir",
  },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced leaders driving innovation in AI-powered asset intelligence and blockchain technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-100 group-hover:border-indigo-200 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="p-2 bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(member.social.linkedin, "_blank")
                          }}
                        >
                          <Linkedin className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="p-2 bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(member.social.twitter, "_blank")
                          }}
                        >
                          <Twitter className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="p-2 bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`mailto:${member.social.email}`, "_self")
                          }}
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advisory Board */}
        {false && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Advisory Board</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Strategic guidance from industry veterans who understand the challenges of asset-intensive operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={advisor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
                    <CardContent className="p-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{advisor.name}</h4>
                      <p className="text-indigo-600 font-semibold mb-1">{advisor.role}</p>
                      <p className="text-gray-600 text-sm">{advisor.company}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Join Team CTA */}
        {false && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              We're looking for exceptional talent to help build the future of intelligent asset management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4">
                View Open Positions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 bg-transparent"
              >
                Learn About Culture
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
