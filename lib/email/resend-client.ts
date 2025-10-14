import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required")
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
export const EMAIL_CONFIG = {
  from: "no-reply@updates.resend-it.com",
  replyTo: "help@resend-it.com",
  domain: "updates.resend-it.com",
} as const

// Utility function to sanitize tag values for Resend API
export function sanitizeTagValue(value: string): string {
  // Replace any character that's not ASCII letter, number, underscore, or dash with underscore
  return value.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50) // Also limit length to 50 chars
}
