import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendNewsletterWelcomeEmail, sendNewsletterNotificationEmail } from "@/lib/actions/email-actions"
import { z } from "zod"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = newsletterSchema.safeParse(body)
    if (!validationResult.success) {
      return Response.json({ error: "Invalid email address" }, { status: 400 })
    }

    const { email } = validationResult.data

    console.log("[v0] Processing newsletter subscription:", { email })

    // Check for existing subscription
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.status === "active") {
        return Response.json({ error: "Email already subscribed to newsletter" }, { status: 400 })
      } else {
        // Reactivate subscription
        const { data: reactivatedData, error: reactivateError } = await supabase
          .from("newsletter_subscribers")
          .update({
            status: "active",
            subscribed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingSubscriber.id)
          .select()
          .single()

        if (reactivateError) {
          console.error("[v0] Reactivation error:", reactivateError)
          return Response.json({ error: "Database error" }, { status: 500 })
        }

        console.log("[v0] Subscription reactivated:", reactivatedData.id)
      }
    } else {
      // Create new subscription
      const { data: subscriptionData, error: dbError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email,
          status: "active",
          source: "website",
          ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
          user_agent: request.headers.get("user-agent") || null,
          referrer: request.headers.get("referer") || null,
        })
        .select()
        .single()

      if (dbError) {
        console.error("[v0] Database error:", dbError)
        return Response.json({ error: "Database error" }, { status: 500 })
      }

      console.log("[v0] Newsletter subscription created:", subscriptionData.id)
    }

    // Get the subscription data for email sending
    const { data: finalSubscription } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .single()

    let welcomeEmailSuccess = false
    let notificationEmailSuccess = false

    // Send welcome email to subscriber
    try {
      const welcomeResult = await sendNewsletterWelcomeEmail(email)
      if (welcomeResult.success) {
        console.log("[v0] Newsletter welcome email sent successfully")
        welcomeEmailSuccess = true
      }
    } catch (emailError) {
      console.error("[v0] Newsletter welcome email failed:", emailError)
    }

    // Send notification email to subscribe@resend-it.com
    try {
      const notificationResult = await sendNewsletterNotificationEmail(email, finalSubscription?.id || "unknown")
      if (notificationResult.success) {
        console.log("[v0] Newsletter notification email sent successfully")
        notificationEmailSuccess = true
      }
    } catch (notificationError) {
      console.error("[v0] Newsletter notification email failed:", notificationError)
    }

    return Response.json({
      success: true,
      welcomeEmailSent: welcomeEmailSuccess,
      notificationEmailSent: notificationEmailSuccess,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
