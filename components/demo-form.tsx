"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Send, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

// Zod validation schema
const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select your company size"),
  currentChallenges: z.string().min(10, "Please describe your current challenges (minimum 10 characters)"),
  preferredTime: z.string().optional(),
  specificInterests: z.array(z.string()).optional(),
  agreedToTerms: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .refine((val) => val === true, "You must agree to the terms and conditions"),
})

type DemoFormData = z.infer<typeof demoFormSchema>

const industries = [
  "Retail & eCommerce",
  "Supply Chain & Manufacturing",
  "IT & Data Centers",
  "Medical Equipment & Life Sciences",
  "Healthcare",
  "Financial Services",
  "Government",
  "Other",
]

const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees"]

const interests = [
  "Asset Tracking & Monitoring",
  "Lifecycle Automation",
  "Analytics & Reporting",
  "ESG & Compliance",
  "API Integration",
  "Custom Solutions",
  "RWA Tokenization & Digital Assets",
  "Blockchain Integration (Sui/Canton)",
  "Smart Contract Automation",
  "DeFi & Liquidity Solutions",
]

export function DemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  })

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          specificInterests: selectedInterests,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Failed to submit demo request")
      }
    } catch (error) {
      console.error("Error submitting demo request:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests((prev) => [...prev, interest])
    } else {
      setSelectedInterests((prev) => prev.filter((i) => i !== interest))
    }
    setValue("specificInterests", selectedInterests)
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Demo Request Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest in Resend-It. Our team will review your request and contact you within 24 hours to
          schedule your personalized demo.
        </p>
        <p className="text-sm text-muted-foreground">
          You'll receive a confirmation email at the address you provided.
        </p>
      </motion.div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Request Your Demo
        </CardTitle>
        <CardDescription>
          Fill out the form below and we'll schedule a personalized demo tailored to your needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Smith"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@company.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Acme Corporation"
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} placeholder="+1 (555) 123-4567" />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => setValue("industry", value)}>
                  <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size *</Label>
                <Select onValueChange={(value) => setValue("companySize", value)}>
                  <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.companySize && <p className="text-sm text-red-500">{errors.companySize.message}</p>}
              </div>
            </div>
          </div>

          {/* Demo Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Demo Details</h3>
            <div className="space-y-2">
              <Label htmlFor="currentChallenges">Current Asset Management Challenges *</Label>
              <Textarea
                id="currentChallenges"
                {...register("currentChallenges")}
                placeholder="Describe your current challenges with asset tracking, management, or reporting..."
                rows={4}
                className={errors.currentChallenges ? "border-red-500" : ""}
              />
              {errors.currentChallenges && <p className="text-sm text-red-500">{errors.currentChallenges.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Demo Time</Label>
              <Input
                id="preferredTime"
                {...register("preferredTime")}
                placeholder="e.g., Next week, mornings preferred, EST timezone"
              />
            </div>

            <div className="space-y-2">
              <Label>Specific Areas of Interest</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={selectedInterests.includes(interest)}
                      onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    />
                    <Label htmlFor={interest} className="text-sm font-normal">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreedToTerms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => {
                  const boolValue = checked === true
                  setAgreedToTerms(boolValue)
                  setValue("agreedToTerms", boolValue)
                }}
                className={errors.agreedToTerms ? "border-red-500" : ""}
              />
              <Label htmlFor="agreedToTerms" className="text-sm font-normal">
                I agree to the{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
                . I consent to being contacted about this demo request.
              </Label>
            </div>
            {errors.agreedToTerms && <p className="text-sm text-red-500">{errors.agreedToTerms.message}</p>}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Schedule My Demo
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
