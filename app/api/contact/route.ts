import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { sendContactEmail } from "@/lib/actions/email-actions"

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request data
    const validatedData = contactFormSchema.parse(body)

    const rawIp = request.ip || request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || "direct"

    let validIp = null
    if (rawIp && rawIp !== "unknown") {
      // Check if it's a valid IP format (basic validation)
      const ipRegex =
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
      if (ipRegex.test(rawIp.split(",")[0].trim())) {
        validIp = rawIp.split(",")[0].trim()
      }
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Prepare inquiry data for demo_inquiries table
    const inquiryData = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone || null,
      subject: "Contact Inquiry",
      message: validatedData.message,
      inquiry_type: "general",
      priority: "medium",
      status: "new",
      source: "website",
      ip_address: validIp,
      user_agent: userAgent,
      referrer: referrer,
    }

    // Insert into Supabase demo_inquiries table
    const { data: inquiry, error: dbError } = await supabase
      .from("demo_inquiries")
      .insert(inquiryData)
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 })
    }

    try {
      console.log("[v0] Sending contact inquiry email using server action")
      await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        message: validatedData.message,
      })
      console.log("[v0] Contact inquiry email sent successfully")
    } catch (emailError) {
      console.error("[v0] Contact inquiry email failed:", emailError)
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact inquiry submitted successfully",
        inquiryId: inquiry.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact inquiry error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
