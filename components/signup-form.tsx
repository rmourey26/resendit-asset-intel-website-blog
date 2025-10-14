"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Zap, Bell, Mail } from "lucide-react"

interface WaitlistData {
  email: string
  firstName: string
  lastName: string
  company: string
  role: string
  interestedPlan: string
  estimatedUsers: string
  interestedInTokenization: boolean
  preferredBlockchain: string
  assetTypesToTokenize: string[]
}

export function SignUpForm() {
  const [formData, setFormData] = useState<WaitlistData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    interestedPlan: "lite",
    estimatedUsers: "",
    interestedInTokenization: false,
    preferredBlockchain: "",
    assetTypesToTokenize: [],
  })
  const [agreedToUpdates, setAgreedToUpdates] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([])

  const handleInputChange = (field: keyof WaitlistData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAssetTypeChange = (assetType: string, checked: boolean) => {
    let updatedTypes: string[]
    if (checked) {
      updatedTypes = [...selectedAssetTypes, assetType]
    } else {
      updatedTypes = selectedAssetTypes.filter((type) => type !== assetType)
    }
    setSelectedAssetTypes(updatedTypes)
    handleInputChange("assetTypesToTokenize", updatedTypes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          agreedToUpdates,
          assetTypesToTokenize: selectedAssetTypes,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to join waitlist")
      }

      console.log("[v0] Waitlist signup successful:", result)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Waitlist signup error:", error)
      alert("Failed to join waitlist. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.email && formData.firstName && formData.lastName && formData.company && formData.role && agreedToUpdates
    )
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">You're on the Waitlist!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in Resend-It's Lite plan. We'll notify you via email as soon as it's
                available for launch.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>
                    We'll send updates to: <strong>{formData.email}</strong>
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bell className="h-6 w-6 text-blue-600" />
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Early Access
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join the Lite Plan Waitlist</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Be the first to know when our Lite plan launches with special introductory pricing of $9/month (first 12
          months). We'll notify you via email as soon as it's available.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Waitlist form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Reserve Your Spot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your Company Inc."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Your Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ceo">CEO/Founder</SelectItem>
                        <SelectItem value="cto">CTO/Technical Lead</SelectItem>
                        <SelectItem value="operations">Operations Manager</SelectItem>
                        <SelectItem value="it">IT Manager</SelectItem>
                        <SelectItem value="analyst">Business Analyst</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Interest</Label>
                    <Select
                      value={formData.interestedPlan}
                      onValueChange={(value) => handleInputChange("interestedPlan", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lite">Lite - $9/month (intro) / $19/month (standard)</SelectItem>
                        <SelectItem value="starter">Starter - $99/month</SelectItem>
                        <SelectItem value="professional">Professional - $299/month</SelectItem>
                        <SelectItem value="enterprise">Enterprise - $999/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedUsers">Estimated Team Size</Label>
                    <Select
                      value={formData.estimatedUsers}
                      onValueChange={(value) => handleInputChange("estimatedUsers", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-5">2-5 people</SelectItem>
                        <SelectItem value="6-25">6-25 people</SelectItem>
                        <SelectItem value="26-100">26-100 people</SelectItem>
                        <SelectItem value="100+">100+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900">RWA Tokenization Interest</h3>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tokenization"
                        checked={formData.interestedInTokenization}
                        onCheckedChange={(checked) => handleInputChange("interestedInTokenization", checked as boolean)}
                      />
                      <Label htmlFor="tokenization" className="text-sm">
                        I'm interested in tokenizing real-world assets using blockchain technology
                      </Label>
                    </div>

                    {formData.interestedInTokenization && (
                      <>
                        <div className="space-y-2">
                          <Label>Preferred Blockchain</Label>
                          <Select
                            value={formData.preferredBlockchain}
                            onValueChange={(value) => handleInputChange("preferredBlockchain", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select blockchain preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sui">Sui Network</SelectItem>
                              <SelectItem value="ethereum">Ethereum</SelectItem>
                              <SelectItem value="canton">Canton Network</SelectItem>
                              <SelectItem value="polygon">Polygon</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="no-preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Asset Types to Tokenize</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                              "Real Estate",
                              "Commodities",
                              "Art & Collectibles",
                              "Equipment & Machinery",
                              "Intellectual Property",
                              "Securities & Bonds",
                              "Supply Chain Assets",
                              "Other",
                            ].map((assetType) => (
                              <div key={assetType} className="flex items-center space-x-2">
                                <Checkbox
                                  id={assetType}
                                  checked={selectedAssetTypes.includes(assetType)}
                                  onCheckedChange={(checked) => handleAssetTypeChange(assetType, checked as boolean)}
                                />
                                <Label htmlFor={assetType} className="text-sm font-normal">
                                  {assetType}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="updates"
                      checked={agreedToUpdates}
                      onCheckedChange={(checked) => setAgreedToUpdates(checked as boolean)}
                    />
                    <Label htmlFor="updates" className="text-sm">
                      I agree to receive email updates about the Lite plan launch and other Resend-It news *
                    </Label>
                  </div>
                </motion.div>

                <Button
                  type="submit"
                  disabled={!isFormValid() || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Joining Waitlist..." : "Join Waitlist"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Benefits sidebar */}
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Lite Plan Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Just $9/month (Intro)</h4>
                  <p className="text-sm text-gray-600">Special 12-month introductory pricing, then $19/month</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">100,000 AI Tokens/Month</h4>
                  <p className="text-sm text-gray-600">Generous AI capacity for small teams</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">100 Managed Assets</h4>
                  <p className="text-sm text-gray-600">Perfect for small to medium operations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Join the Waitlist</h4>
                  <p className="text-sm text-gray-600">Complete the form to reserve your spot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Get Notified</h4>
                  <p className="text-sm text-gray-600">We'll email you when the Lite plan launches</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Start Your Trial</h4>
                  <p className="text-sm text-gray-600">Begin your AI transformation journey</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
