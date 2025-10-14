import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email/email-service"
import { z } from "zod"

const testEmailSchema = z.object({
  type: z.enum(["demo", "waitlist", "welcome", "confirmation", "password-reset"]),
  email: z.string().email(),
  testData: z.object({}).optional(),
})

export async function POST(request: NextRequest) {
  const isTestMode = process.env.NODE_ENV === "development" || !!process.env.RESEND_API_KEY

  if (!isTestMode) {
    return NextResponse.json({ error: "Test endpoint not available" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { type, email, testData } = testEmailSchema.parse(body)

    let result
    const testId = `test-${Date.now()}`

    switch (type) {
      case "demo":
        result = await EmailService.sendDemoRequestNotification(
          {
            name: testData?.name || "Test User",
            email: email,
            company: testData?.company || "Test Company",
            phone: testData?.phone || "+1-555-0123",
            industry: testData?.industry || "Technology",
            companySize: testData?.companySize || "10-50",
            currentChallenges: testData?.currentChallenges || "Testing email integration functionality",
            preferredTime: testData?.preferredTime || "Next week",
            specificInterests: testData?.specificInterests || ["Asset Tracking", "Analytics"],
          },
          testId,
        )
        break

      case "waitlist":
        result = await EmailService.sendWaitlistNotification(
          {
            firstName: testData?.firstName || "Test",
            lastName: testData?.lastName || "User",
            email: email,
            company: testData?.company || "Test Company",
            role: testData?.role || "Developer",
            interestedPlan: testData?.interestedPlan || "lite",
            estimatedUsers: testData?.estimatedUsers || "5-10",
          },
          testId,
        )
        break

      case "welcome":
        result = await EmailService.sendWelcomeEmail(testData?.firstName || "Test", email)
        break

      case "confirmation":
        const confirmUrl = `${request.nextUrl.origin}/auth/callback?type=email_confirmation&code=test-code-${testId}`
        result = await EmailService.sendEmailConfirmation(email, confirmUrl)
        break

      case "password-reset":
        const resetUrl = `${request.nextUrl.origin}/auth/callback?type=recovery&code=test-code-${testId}`
        result = await EmailService.sendPasswordReset(email, resetUrl)
        break

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      testId,
      type,
      recipient: email,
    })
  } catch (error) {
    console.error("Test email error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid test data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email Test Endpoint",
    availableTypes: ["demo", "waitlist", "welcome", "confirmation", "password-reset"],
    usage: {
      method: "POST",
      body: {
        type: "string (required)",
        email: "string (required)",
        testData: "object (optional)",
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  })
}
