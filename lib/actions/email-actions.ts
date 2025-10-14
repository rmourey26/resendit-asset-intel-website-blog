"use server"

import { Resend } from "resend"
import {
  createWelcomeEmail,
  createDemoRequestNotificationEmail,
  createContactNotificationEmail,
  createNewsletterWelcomeEmail,
  createNewsletterNotificationEmail,
} from "@/lib/email/templates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWaitlistWelcomeEmail(firstName: string, email: string) {
  try {
    console.log("[v0] Sending waitlist welcome email to:", email)

    const emailHtml = createWelcomeEmail(firstName)

    const { data, error } = await resend.emails.send({
      from: "no-reply@updates.resend-it.com",
      to: [email],
      subject: "Welcome to Resend-It Lite Waitlist!",
      html: emailHtml,
      tags: [
        { name: "type", value: "waitlist-welcome" },
        { name: "plan", value: "lite" },
        { name: "user", value: firstName.replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
      reply_to: "help@resend-it.com",
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Email action error:", error)
    throw error
  }
}

export async function sendDemoRequestEmail(formData: {
  name: string
  email: string
  company: string
  phone?: string
  message: string
  preferredTime: string
  companySize: string
}) {
  try {
    console.log("[v0] Sending demo request notification")

    const emailHtml = createDemoRequestNotificationEmail(formData)

    const { data, error } = await resend.emails.send({
      from: "no-reply@updates.resend-it.com",
      to: ["help@resend-it.com"],
      subject: `New Demo Request from ${formData.name}`,
      html: emailHtml,
      tags: [
        { name: "type", value: "demo-request" },
        { name: "company", value: formData.company.replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
      reply_to: formData.email,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("[v0] Demo request email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Demo email action error:", error)
    throw error
  }
}

export async function sendContactEmail(formData: {
  name: string
  email: string
  company: string
  phone?: string
  message: string
}) {
  try {
    console.log("[v0] Sending contact inquiry notification")

    const emailHtml = createContactNotificationEmail(formData)

    const { data, error } = await resend.emails.send({
      from: "no-reply@updates.resend-it.com",
      to: ["help@resend-it.com"],
      subject: `New Contact Message from ${formData.name}`,
      html: emailHtml,
      tags: [
        { name: "type", value: "contact-inquiry" },
        { name: "company", value: formData.company.replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
      reply_to: formData.email,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("[v0] Contact inquiry email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Contact email action error:", error)
    throw error
  }
}

export async function sendNewsletterWelcomeEmail(email: string) {
  try {
    console.log("[v0] Sending newsletter welcome email to:", email)

    const { subject, html, text } = createNewsletterWelcomeEmail(email)

    const { data, error } = await resend.emails.send({
      from: "no-reply@updates.resend-it.com",
      to: [email],
      subject,
      html,
      text,
      tags: [
        { name: "type", value: "newsletter-welcome" },
        { name: "source", value: "website" },
      ],
      reply_to: "help@resend-it.com",
    })

    if (error) {
      console.error("[v0] Newsletter welcome email error:", error)
      throw new Error(`Failed to send newsletter welcome email: ${error.message}`)
    }

    console.log("[v0] Newsletter welcome email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Newsletter welcome email action error:", error)
    throw error
  }
}

export async function sendNewsletterNotificationEmail(email: string, subscriberId: string) {
  try {
    console.log("[v0] Sending newsletter subscription notification")

    const { subject, html, text } = createNewsletterNotificationEmail(email, subscriberId)

    const { data, error } = await resend.emails.send({
      from: "no-reply@updates.resend-it.com",
      to: ["subscribe@resend-it.com"],
      subject,
      html,
      text,
      tags: [
        { name: "type", value: "newsletter-notification" },
        { name: "source", value: "website" },
      ],
      reply_to: email,
    })

    if (error) {
      console.error("[v0] Newsletter notification email error:", error)
      throw new Error(`Failed to send newsletter notification: ${error.message}`)
    }

    console.log("[v0] Newsletter notification email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Newsletter notification email action error:", error)
    throw error
  }
}
