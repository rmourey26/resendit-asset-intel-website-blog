import type { NextRequest } from "next/server"
import { resend, EMAIL_CONFIG } from "@/lib/email/resend-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, react, tags } = body

    console.log("[v0] Sending email via /api/send route:", { to, subject, tags })

    const emailPayload: any = {
      from: EMAIL_CONFIG.from,
      to: Array.isArray(to) ? to : [to],
      subject,
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      emailPayload.tags = tags
    }

    if (EMAIL_CONFIG.replyTo) {
      emailPayload.reply_to = EMAIL_CONFIG.replyTo
    }

    if (react) {
      emailPayload.react = react
    } else if (html && html.trim()) {
      emailPayload.html = html.replace(/\s+/g, " ").trim()
    }

    console.log("[v0] Email payload:", JSON.stringify(emailPayload, null, 2))

    const { data, error } = await resend.emails.send(emailPayload)

    if (error) {
      console.error("[v0] Resend API error:", error)
      return Response.json({ error }, { status: 400 })
    }

    console.log("[v0] Email sent successfully:", data)
    return Response.json({ data })
  } catch (error) {
    console.error("[v0] Email sending failed:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
