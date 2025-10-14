"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Clock, CheckCircle, Send } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our team",
    contact: "help@resend-it.com",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "We're here to help",
    contact: "Mon-Fri: 9AM-6PM PST",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error("Failed to submit contact form")
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Let's Put Your Assets to Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your asset management? Get in touch with our team to discuss your specific needs and see
            how Resend-It can drive results for your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. Our team will review your message and get back to you within 24
                      hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            {...register("name")}
                            placeholder="Your full name"
                            className={`w-full ${errors.name ? "border-red-500" : ""}`}
                          />
                          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 block">
                            Company *
                          </Label>
                          <Input
                            id="company"
                            {...register("company")}
                            placeholder="Your company name"
                            className={`w-full ${errors.company ? "border-red-500" : ""}`}
                          />
                          {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="your.email@company.com"
                            className={`w-full ${errors.email ? "border-red-500" : ""}`}
                          />
                          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            placeholder="+1 (555) 123-4567"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder="Tell us about your asset management challenges and goals..."
                          className={`w-full h-32 resize-none ${errors.message ? "border-red-500" : ""}`}
                        />
                        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-3">
                        {isSubmitting ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h3>
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${method.bg} flex-shrink-0`}
                      >
                        <method.icon className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{method.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                        <p className="text-gray-900 font-medium">{method.contact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
