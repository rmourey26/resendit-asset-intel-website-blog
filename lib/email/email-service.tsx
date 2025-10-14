import { resend, EMAIL_CONFIG, sanitizeTagValue } from "./resend-client"
import { createDemoRequestEmail, createWaitlistEmail, createWelcomeEmail } from "./templates"

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export class EmailService {
  static async sendDemoRequestNotification(
    data: {
      name: string
      email: string
      company: string
      phone?: string
      industry: string
      companySize: string
      currentChallenges: string
      preferredTime?: string
      specificInterests?: string[]
    },
    inquiryId: string,
  ): Promise<EmailResult> {
    try {
      const { subject, html, text } = createDemoRequestEmail(data, inquiryId)

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: "help@resend-it.com",
        subject,
        html,
        text,
        reply_to: data.email,
        tags: {
          type: "demo-request",
          company: sanitizeTagValue(data.company),
          industry: sanitizeTagValue(data.industry),
        },
      })

      return {
        success: true,
        messageId: result.data?.id,
      }
    } catch (error) {
      console.error("Failed to send demo request notification:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  static async sendWaitlistNotification(
    data: {
      firstName: string
      lastName: string
      email: string
      company: string
      role: string
      interestedPlan: string
      estimatedUsers?: string
    },
    waitlistId: string,
  ): Promise<EmailResult> {
    try {
      const { subject, html, text } = createWaitlistEmail(data, waitlistId)

      console.log("[v0] Attempting to send waitlist notification email to help@resend-it.com")

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: "help@resend-it.com",
        subject,
        html,
        text,
        reply_to: data.email,
        tags: {
          type: "waitlist-signup",
          company: sanitizeTagValue(data.company),
          plan: sanitizeTagValue(data.interestedPlan),
        },
      })

      console.log("[v0] Waitlist notification email result:", result)

      if (result.error) {
        console.error("[v0] Resend API error:", result.error)
        return {
          success: false,
          error: result.error.message || "Resend API error",
        }
      }

      return {
        success: true,
        messageId: result.data?.id,
      }
    } catch (error) {
      console.error("[v0] Failed to send waitlist notification:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  static async sendWelcomeEmail(firstName: string, email: string): Promise<EmailResult> {
    try {
      const { subject, html, text } = createWelcomeEmail(firstName, email)

      console.log("[v0] Attempting to send welcome email to:", email)

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: email,
        subject,
        html,
        text,
        tags: {
          type: "welcome",
          user: sanitizeTagValue(firstName),
        },
      })

      console.log("[v0] Welcome email result:", result)

      if (result.error) {
        console.error("[v0] Resend API error:", result.error)
        return {
          success: false,
          error: result.error.message || "Resend API error",
        }
      }

      return {
        success: true,
        messageId: result.data?.id,
      }
    } catch (error) {
      console.error("[v0] Failed to send welcome email:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  static async sendEmailConfirmation(email: string, confirmationUrl: string): Promise<EmailResult> {
    try {
      const subject = "Confirm your Resend-It account"

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Confirm Your Account</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1e293b;">Almost there!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Please confirm your email address to complete your Resend-It account setup.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Confirm Email Address</a>
            </div>
            
            <p style="color: #64748b; font-size: 14px;">
              If you didn't create this account, you can safely ignore this email.
            </p>
            
            <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
              This link will expire in 24 hours for security reasons.
            </p>
          </div>
        </div>
      `

      const text = `
Confirm Your Resend-It Account

Please confirm your email address to complete your account setup.

Confirmation link: ${confirmationUrl}

If you didn't create this account, you can safely ignore this email.

This link will expire in 24 hours for security reasons.
      `

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: email,
        subject,
        html,
        text,
        tags: {
          type: "email-confirmation",
        },
      })

      return {
        success: true,
        messageId: result.data?.id,
      }
    } catch (error) {
      console.error("Failed to send email confirmation:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  static async sendPasswordReset(email: string, resetUrl: string): Promise<EmailResult> {
    try {
      const subject = "Reset your Resend-It password"

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Reset Your Password</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1e293b;">Password Reset Request</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              We received a request to reset your password for your Resend-It account.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="color: #64748b; font-size: 14px;">
              If you didn't request this password reset, you can safely ignore this email.
            </p>
            
            <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
              This link will expire in 1 hour for security reasons.
            </p>
          </div>
        </div>
      `

      const text = `
Reset Your Resend-It Password

We received a request to reset your password for your Resend-It account.

Reset link: ${resetUrl}

If you didn't request this password reset, you can safely ignore this email.

This link will expire in 1 hour for security reasons.
      `

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: email,
        subject,
        html,
        text,
        tags: {
          type: "password-reset",
        },
      })

      return {
        success: true,
        messageId: result.data?.id,
      }
    } catch (error) {
      console.error("Failed to send password reset email:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}
