import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { sendDemoRequestEmail } from "@/lib/actions/email-actions"

// Validation schema for demo request
const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  industry: z.string().min(1),
  companySize: z.string().min(1),
  currentChallenges: z.string().min(10),
  preferredTime: z.string().optional(),
  specificInterests: z.array(z.string()).optional(),
  agreedToTerms: z.union([z.boolean(), z.string()]).transform((val) => val === true || val === "true"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request data
    const validatedData = demoRequestSchema.parse(body)

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

    // Prepare inquiry data
    const inquiryData = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone || null,
      subject: "Demo Request",
      message: `Industry: ${validatedData.industry}
Company Size: ${validatedData.companySize}
Current Challenges: ${validatedData.currentChallenges}
Preferred Time: ${validatedData.preferredTime || "Not specified"}
Specific Interests: ${validatedData.specificInterests?.join(", ") || "None specified"}`,
      inquiry_type: "demo",
      priority: "medium",
      status: "new",
      source: "website",
      ip_address: validIp, // Use validated IP or null instead of "unknown"
      user_agent: userAgent,
      referrer: referrer,
    }

    // Insert into Supabase
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
      console.log("[v0] Sending demo request email using server action")
      await sendDemoRequestEmail({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        message: inquiryData.message,
        preferredTime: validatedData.preferredTime || "Not specified",
        companySize: validatedData.companySize,
      })
      console.log("[v0] Demo request email sent successfully")
    } catch (emailError) {
      console.error("[v0] Demo request email failed:", emailError)
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demo request submitted successfully",
        inquiryId: inquiry.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Demo request error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
