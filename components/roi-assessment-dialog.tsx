"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { sendROIAssessmentRequest } from "@/lib/actions/email-actions"

interface ROIAssessmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ROIAssessmentDialog({ open, onOpenChange }: ROIAssessmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "manufacturing",
    employees: "",
    currentChallenges: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendROIAssessmentRequest({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || undefined,
        industry: formData.industry,
        employees: Number.parseInt(formData.employees) || 0,
        currentChallenges: formData.currentChallenges,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        industry: "manufacturing",
        employees: "",
        currentChallenges: "",
      })
      onOpenChange(false)

      // Show success message (you could use a toast here)
      alert("Thank you! We'll reach out within 24 hours to schedule your ROI assessment.")
    } catch (error) {
      console.error("Failed to submit ROI assessment request:", error)
      alert("Sorry, there was an error submitting your request. Please try again or contact help@resend-it.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Request Detailed ROI Assessment</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will reach out within 24 hours to schedule your personalized ROI
            assessment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">
                Company <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
              >
                <SelectTrigger id="industry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees">
                Number of Employees <span className="text-red-500">*</span>
              </Label>
              <Input
                id="employees"
                type="number"
                required
                min="1"
                value={formData.employees}
                onChange={(e) => setFormData((prev) => ({ ...prev, employees: e.target.value }))}
                placeholder="50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenges">
              Current Challenges <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="challenges"
              required
              value={formData.currentChallenges}
              onChange={(e) => setFormData((prev) => ({ ...prev, currentChallenges: e.target.value }))}
              placeholder="Describe your current asset management challenges and what you hope to achieve with AI transformation..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
