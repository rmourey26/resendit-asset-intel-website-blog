import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { EmailService } from "@/lib/email/email-service"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, role, estimatedUsers, agreedToUpdates } = body

    console.log("[v0] Processing waitlist signup:", { firstName, lastName, email, company, role })

    // Check for existing email
    const { data: existingUser } = await supabase.from("waitlist").select("id").eq("email", email).single()

    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    const { data: waitlistData, error: dbError } = await supabase
      .from("waitlist")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        company,
        role,
        interested_plan: "lite",
        estimated_users: estimatedUsers,
        agreed_to_updates: agreedToUpdates || false,
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

    let emailSuccess = false
    let notificationSuccess = false

    try {
      console.log("[v0] Sending welcome email using HTML template")

      const welcomeResult = await EmailService.sendWelcomeEmail(firstName, email)

      if (welcomeResult.success) {
        console.log("[v0] Welcome email sent successfully:", welcomeResult.messageId)
        emailSuccess = true

        // Update notified_at timestamp
        await supabase.from("waitlist").update({ notified_at: new Date().toISOString() }).eq("id", waitlistData.id)
      } else {
        console.error("[v0] Welcome email failed:", welcomeResult.error)
      }
    } catch (emailError) {
      console.error("[v0] Welcome email sending failed:", emailError)
    }

    try {
      console.log("[v0] Sending waitlist notification to help@resend-it.com")

      const notificationResult = await EmailService.sendWaitlistNotification(
        {
          firstName,
          lastName,
          email,
          company,
          role,
          interestedPlan: "lite",
          estimatedUsers,
        },
        waitlistData.id,
      )

      if (notificationResult.success) {
        console.log("[v0] Waitlist notification sent successfully")
        notificationSuccess = true
      } else {
        console.error("[v0] Waitlist notification failed:", notificationResult.error)
      }
    } catch (notificationError) {
      console.error("[v0] Waitlist notification error:", notificationError)
    }

    return Response.json({
      success: true,
      emailSent: emailSuccess,
      notificationSent: notificationSuccess,
      message: "Successfully joined waitlist",
    })
  } catch (error) {
    console.error("[v0] Waitlist signup error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
