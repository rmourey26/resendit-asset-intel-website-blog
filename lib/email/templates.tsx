import { Html, Head, Preview, Body, Container, Section, Text, Heading, Img, Tailwind } from "@react-email/components"

interface DemoRequestData {
  name: string
  email: string
  company: string
  phone?: string
  industry: string
  companySize: string
  currentChallenges: string
  preferredTime?: string
  specificInterests?: string[]
}

interface WaitlistData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  interestedPlan: string
  estimatedUsers?: string
}

interface ContactData {
  name: string
  email: string
  company: string
  phone?: string
  message: string
}

interface NewsletterWelcomeData {
  email: string
}

interface NewsletterNotificationData {
  email: string
  subscriberId: string
}

interface ROIAssessmentRequestData {
  name: string
  email: string
  company: string
  phone?: string
  industry: string
  employees: number
  currentChallenges: string
}

interface ROIAssessmentConfirmationData {
  name: string
  email: string
}

export function DemoRequestEmail({ data, inquiryId }: { data: DemoRequestData; inquiryId: string }) {
  return (
    <Html>
      <Head />
      <Preview>New Demo Request from {data.company}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-5 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-4 h-10 w-auto max-w-48"
              />
              <Heading className="m-0 text-slate-800 text-2xl">New Demo Request</Heading>
            </Section>

            <Section className="bg-slate-50 p-8">
              <Heading as="h2" className="text-slate-800 mb-5 text-xl">
                Contact Information
              </Heading>
              <div className="space-y-2">
                <Text className="m-0">
                  <strong>Inquiry ID:</strong> {inquiryId}
                </Text>
                <Text className="m-0">
                  <strong>Name:</strong> {data.name}
                </Text>
                <Text className="m-0">
                  <strong>Email:</strong> {data.email}
                </Text>
                <Text className="m-0">
                  <strong>Company:</strong> {data.company}
                </Text>
                <Text className="m-0">
                  <strong>Phone:</strong> {data.phone || "Not provided"}
                </Text>
                <Text className="m-0">
                  <strong>Industry:</strong> {data.industry}
                </Text>
                <Text className="m-0">
                  <strong>Company Size:</strong> {data.companySize}
                </Text>
              </div>

              <Heading as="h3" className="text-slate-800 mt-8 mb-3 text-lg">
                Current Challenges
              </Heading>
              <Section className="bg-white p-4 rounded-lg border-l-4 border-indigo-600">
                <Text className="m-0 text-slate-700">{data.currentChallenges}</Text>
              </Section>

              <Heading as="h3" className="text-slate-800 mt-6 mb-3 text-lg">
                Additional Details
              </Heading>
              <Text className="mb-2">
                <strong>Preferred Demo Time:</strong> {data.preferredTime || "Not specified"}
              </Text>
              <Text className="mb-6">
                <strong>Specific Interests:</strong> {data.specificInterests?.join(", ") || "None specified"}
              </Text>

              <Section className="bg-sky-50 p-5 rounded-lg">
                <Text className="m-0 text-sky-800">
                  <strong>Action Required:</strong> Please follow up with this prospect within 24 hours.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function WaitlistNotificationEmail({ data, waitlistId }: { data: WaitlistData; waitlistId: string }) {
  return (
    <Html>
      <Head />
      <Preview>New Lite Plan Waitlist Signup - {data.company}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-5 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-4 h-10 w-auto max-w-48"
              />
              <Heading className="m-0 text-slate-800 text-2xl">New Waitlist Signup</Heading>
            </Section>

            <Section className="bg-slate-50 p-8">
              <Heading as="h2" className="text-slate-800 mb-5 text-xl">
                Waitlist Registration
              </Heading>
              <div className="space-y-2">
                <Text className="m-0">
                  <strong>Waitlist ID:</strong> {waitlistId}
                </Text>
                <Text className="m-0">
                  <strong>Name:</strong> {data.firstName} {data.lastName}
                </Text>
                <Text className="m-0">
                  <strong>Email:</strong> {data.email}
                </Text>
                <Text className="m-0">
                  <strong>Company:</strong> {data.company}
                </Text>
                <Text className="m-0">
                  <strong>Role:</strong> {data.role}
                </Text>
                <Text className="m-0">
                  <strong>Interested Plan:</strong> {data.interestedPlan}
                </Text>
                <Text className="m-0">
                  <strong>Team Size:</strong> {data.estimatedUsers || "Not specified"}
                </Text>
              </div>

              <Section className="bg-blue-50 p-5 rounded-lg mt-8">
                <Text className="m-0 text-blue-800">
                  <strong>Next Steps:</strong> This user should be notified when the {data.interestedPlan} plan
                  launches.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function WelcomeEmail({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Resend-It - You're on the Lite Plan Waitlist!</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-8 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-5 h-11 w-auto max-w-56"
              />
              <Heading className="m-0 text-slate-800 text-2xl">Welcome to Resend-It!</Heading>
            </Section>

            <Section className="p-8">
              <Heading as="h2" className="text-slate-800 text-xl">
                Hi {firstName},
              </Heading>
              <Text className="text-slate-600 text-base leading-relaxed">
                Thank you for joining our Lite Plan waitlist! You're now part of an exclusive group that will get early
                access to our revolutionary AI-powered asset management platform.
              </Text>

              <Section className="bg-slate-50 p-5 rounded-lg my-5">
                <Heading as="h3" className="text-slate-800 mt-0 mb-3 text-lg">
                  What happens next?
                </Heading>
                <Text className="text-slate-600 leading-relaxed m-0">
                  • We'll notify you as soon as the Lite Plan is available
                  <br />• You'll get exclusive early access pricing
                  <br />• Our team will provide personalized onboarding support
                </Text>
              </Section>

              <Text className="text-slate-600 text-base leading-relaxed">
                In the meantime, feel free to explore our platform features and reach out if you have any questions.
              </Text>

              <Section className="text-center my-8">
                <a
                  href="https://resend-it.com"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-md font-semibold no-underline"
                >
                  Visit Our Website
                </a>
              </Section>

              <Text className="text-slate-500 text-sm">
                Best regards,
                <br />
                The Resend-It Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function ContactEmail({ data, inquiryId }: { data: ContactData; inquiryId: string }) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Message from {data.company}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-5 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-4 h-10 w-auto max-w-48"
              />
              <Heading className="m-0 text-slate-800 text-2xl">New Contact Message</Heading>
            </Section>

            <Section className="bg-slate-50 p-8">
              <Heading as="h2" className="text-slate-800 mb-5 text-xl">
                Contact Information
              </Heading>
              <div className="space-y-2">
                <Text className="m-0">
                  <strong>Inquiry ID:</strong> {inquiryId}
                </Text>
                <Text className="m-0">
                  <strong>Name:</strong> {data.name}
                </Text>
                <Text className="m-0">
                  <strong>Email:</strong> {data.email}
                </Text>
                <Text className="m-0">
                  <strong>Company:</strong> {data.company}
                </Text>
                <Text className="m-0">
                  <strong>Phone:</strong> {data.phone || "Not provided"}
                </Text>
              </div>

              <Heading as="h3" className="text-slate-800 mt-8 mb-3 text-lg">
                Message
              </Heading>
              <Section className="bg-white p-4 rounded-lg border-l-4 border-indigo-600">
                <Text className="m-0 text-slate-700">{data.message}</Text>
              </Section>

              <Section className="bg-sky-50 p-5 rounded-lg mt-6">
                <Text className="m-0 text-sky-800">
                  <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function NewsletterWelcomeEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Resend-It Newsletter!</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-8 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-5 h-11 w-auto max-w-56"
              />
              <Heading className="m-0 text-slate-800 text-2xl">Welcome to Our Newsletter!</Heading>
            </Section>

            <Section className="p-8">
              <Heading as="h2" className="text-slate-800 text-xl">
                Thank you for subscribing!
              </Heading>
              <Text className="text-slate-600 text-base leading-relaxed">
                You've successfully subscribed to the Resend-It newsletter. You'll now receive the latest insights on
                asset intelligence, industry trends, and product updates delivered to your inbox.
              </Text>

              <Section className="bg-slate-50 p-5 rounded-lg my-5">
                <Heading as="h3" className="text-slate-800 mt-0 mb-3 text-lg">
                  What to expect:
                </Heading>
                <Text className="text-slate-600 leading-relaxed m-0">
                  • Weekly industry insights and best practices
                  <br />• Product updates and new feature announcements
                  <br />• Exclusive content and early access to resources
                  <br />• Case studies and success stories
                </Text>
              </Section>

              <Text className="text-slate-600 text-base leading-relaxed">
                We're committed to providing valuable content that helps you stay ahead in asset management and
                intelligence.
              </Text>

              <Section className="text-center my-8">
                <a
                  href="https://resend-it.com"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-md font-semibold no-underline"
                >
                  Explore Our Platform
                </a>
              </Section>

              <Text className="text-slate-500 text-sm">
                Best regards,
                <br />
                The Resend-It Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function NewsletterNotificationEmail({ email, subscriberId }: { email: string; subscriberId: string }) {
  return (
    <Html>
      <Head />
      <Preview>New Newsletter Subscription</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl">
            <Section className="bg-white p-5 text-center border-b border-slate-200">
              <Img
                src="/images/design-mode/email-logo.png"
                alt="Resend-It"
                className="mx-auto mb-4 h-10 w-auto max-w-48"
              />
              <Heading className="m-0 text-slate-800 text-2xl">New Newsletter Subscription</Heading>
            </Section>

            <Section className="bg-slate-50 p-8">
              <Heading as="h2" className="text-slate-800 mb-5 text-xl">
                Subscription Details
              </Heading>
              <div className="space-y-2">
                <Text className="m-0">
                  <strong>Subscriber ID:</strong> {subscriberId}
                </Text>
                <Text className="m-0">
                  <strong>Email:</strong> {email}
                </Text>
                <Text className="m-0">
                  <strong>Source:</strong> Website Newsletter Form
                </Text>
                <Text className="m-0">
                  <strong>Status:</strong> Active
                </Text>
              </div>

              <Section className="bg-green-50 p-5 rounded-lg mt-8">
                <Text className="m-0 text-green-800">
                  <strong>Action:</strong> New subscriber added to newsletter list.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function createDemoRequestEmail(data: DemoRequestData, inquiryId: string) {
  const subject = `New Demo Request from ${data.company}`
  const reactComponent = DemoRequestEmail({ data, inquiryId })

  return {
    subject,
    react: reactComponent,
    // Keep text version for fallback
    text: `
New Demo Request - Inquiry ID: ${inquiryId}

Contact Information:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Phone: ${data.phone || "Not provided"}
Industry: ${data.industry}
Company Size: ${data.companySize}

Current Challenges:
${data.currentChallenges}

Preferred Demo Time: ${data.preferredTime || "Not specified"}
Specific Interests: ${data.specificInterests?.join(", ") || "None specified"}

Please follow up with this prospect within 24 hours.
    `,
  }
}

export function createWaitlistEmail(data: WaitlistData, waitlistId: string) {
  const subject = `New Lite Plan Waitlist Signup - ${data.company}`
  const reactComponent = WaitlistNotificationEmail({ data, waitlistId })

  return {
    subject,
    react: reactComponent,
    text: `
New Waitlist Signup - Waitlist ID: ${waitlistId}

Registration Details:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role}
Interested Plan: ${data.interestedPlan}
Estimated Team Size: ${data.estimatedUsers || "Not specified"}

This user should be notified when the ${data.interestedPlan} plan launches.
    `,
  }
}

export function createDemoRequestNotificationEmail(formData: {
  name: string
  email: string
  company: string
  phone?: string
  message: string
  preferredTime: string
  companySize: string
}) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Demo Request from ${formData.company}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <!-- Removed gradient background from header -->
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 40px; width: auto; max-width: 200px; margin-bottom: 16px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">New Demo Request</h1>
          </div>
          
          <div style="padding: 32px 20px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0;">Contact Information</h2>
            
            <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${formData.email}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Company:</strong> ${formData.company}</p>
              <p style="margin: 0; color: #374151;"><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Company Size:</strong> ${formData.companySize}</p>
              <p style="margin: 0; color: #374151;"><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
            </div>
            
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">Message</h3>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0; color: #374151; line-height: 1.6;">${formData.message}</p>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; color: #1e40af;"><strong>Action Required:</strong> Please follow up with this prospect within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function createContactEmail(data: ContactData, inquiryId: string) {
  const subject = `New Contact Message from ${data.company}`
  const reactComponent = ContactEmail({ data, inquiryId })

  return {
    subject,
    react: reactComponent,
    text: `
New Contact Message - Inquiry ID: ${inquiryId}

Contact Information:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Phone: ${data.phone || "Not provided"}

Message:
${data.message}

Please respond to this inquiry within 24 hours.
    `,
  }
}

export function createContactNotificationEmail(formData: {
  name: string
  email: string
  company: string
  phone?: string
  message: string
}) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message from ${formData.company}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 40px; width: auto; max-width: 200px; margin-bottom: 16px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">New Contact Message</h1>
          </div>
          
          <div style="padding: 32px 20px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0;">Contact Information</h2>
            
            <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${formData.email}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Company:</strong> ${formData.company}</p>
              <p style="margin: 0; color: #374151;"><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
            </div>
            
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">Message</h3>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0; color: #374151; line-height: 1.6;">${formData.message}</p>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; color: #1e40af;"><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function createWelcomeEmail(firstName: string) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return {
    subject: "Welcome to Resend-It - You're on the Lite Plan Waitlist!",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Resend-It - You're on the Lite Plan Waitlist!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <!-- Removed gradient background from header -->
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 44px; width: auto; max-width: 224px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">Welcome to Resend-It!</h1>
          </div>
          
          <div style="padding: 32px 20px;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 16px 0;">Hi ${firstName},</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for joining our Lite Plan waitlist! You're now part of an exclusive group that will get early access to our revolutionary AI-powered asset management platform.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">What happens next?</h3>
              <p style="color: #64748b; line-height: 1.6; margin: 0;">
                • We'll notify you as soon as the Lite Plan is available<br>
                • You'll get exclusive early access pricing<br>
                • Our team will provide personalized onboarding support
              </p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              In the meantime, feel free to explore our platform features and reach out if you have any questions.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://resend-it.com" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Best regards,<br>
              The Resend-It Team
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `
Welcome to Resend-It - You're on the Lite Plan Waitlist!

Hi ${firstName},

Thank you for joining our Lite Plan waitlist! You're now part of an exclusive group that will get early access to our revolutionary AI-powered asset management platform.

What happens next?
• We'll notify you as soon as the Lite Plan is available
• You'll get exclusive early access pricing
• Our team will provide personalized onboarding support

In the meantime, feel free to explore our platform features and reach out if you have any questions.

Visit our website: https://resend-it.com

Best regards,
The Resend-It Team
    `,
  }
}

export function createNewsletterWelcomeEmail(email: string) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return {
    subject: "Welcome to Resend-It Newsletter!",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Resend-It Newsletter!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 44px; width: auto; max-width: 224px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">Welcome to Our Newsletter!</h1>
          </div>
          
          <div style="padding: 32px 20px;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 16px 0;">Thank you for subscribing!</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              You've successfully subscribed to the Resend-It newsletter. You'll now receive the latest insights on asset intelligence, industry trends, and product updates delivered to your inbox.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">What to expect:</h3>
              <p style="color: #64748b; line-height: 1.6; margin: 0;">
                • Weekly industry insights and best practices<br>
                • Product updates and new feature announcements<br>
                • Exclusive content and early access to resources<br>
                • Case studies and success stories
              </p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              We're committed to providing valuable content that helps you stay ahead in asset management and intelligence.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://resend-it.com" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                Explore Our Platform
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Best regards,<br>
              The Resend-It Team
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `
Welcome to Resend-It Newsletter!

Thank you for subscribing to our newsletter! You'll now receive the latest insights on asset intelligence, industry trends, and product updates.

What to expect:
• Weekly industry insights and best practices
• Product updates and new feature announcements
• Exclusive content and early access to resources
• Case studies and success stories

Visit our platform: https://resend-it.com

Best regards,
The Resend-It Team
    `,
  }
}

export function createNewsletterNotificationEmail(email: string, subscriberId: string) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return {
    subject: "New Newsletter Subscription",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Newsletter Subscription</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 40px; width: auto; max-width: 200px; margin-bottom: 16px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">New Newsletter Subscription</h1>
          </div>
          
          <div style="padding: 32px 20px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0;">Subscription Details</h2>
            
            <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Subscriber ID:</strong> ${subscriberId}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Source:</strong> Website Newsletter Form</p>
              <p style="margin: 0; color: #374151;"><strong>Status:</strong> Active</p>
            </div>
            
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px;">
              <p style="margin: 0; color: #166534;"><strong>Action:</strong> New subscriber added to newsletter list.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `
New Newsletter Subscription - Subscriber ID: ${subscriberId}

Subscription Details:
Email: ${email}
Source: Website Newsletter Form
Status: Active

New subscriber added to newsletter list.
    `,
  }
}

export function createROIAssessmentRequestEmail(formData: ROIAssessmentRequestData) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return {
    subject: `ROI Assessment Request from ${formData.company}`,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ROI Assessment Request from ${formData.company}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 40px; width: auto; max-width: 200px; margin-bottom: 16px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">ROI Assessment Request</h1>
          </div>
          
          <div style="padding: 32px 20px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0;">Contact Information</h2>
            
            <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${formData.email}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Company:</strong> ${formData.company}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
              <p style="margin: 0 0 8px 0; color: #374151;"><strong>Industry:</strong> ${formData.industry}</p>
              <p style="margin: 0; color: #374151;"><strong>Employees:</strong> ${formData.employees}</p>
            </div>
            
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">Current Challenges</h3>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0; color: #374151; line-height: 1.6;">${formData.currentChallenges}</p>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; color: #1e40af;"><strong>Action Required:</strong> Schedule a detailed ROI assessment call with this prospect within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `
ROI Assessment Request from ${formData.company}

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Phone: ${formData.phone || "Not provided"}
Industry: ${formData.industry}
Employees: ${formData.employees}

Current Challenges:
${formData.currentChallenges}

Action Required: Schedule a detailed ROI assessment call with this prospect within 24 hours.
    `,
  }
}

export function createROIAssessmentConfirmationEmail(name: string, email: string) {
  const logoUrl = "https://resend-it.com/email-logo.png"

  return {
    subject: "Your ROI Assessment Request - We'll Be In Touch Soon!",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ROI Assessment Request Received</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ffffff; padding: 32px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <img src="${logoUrl}" alt="Resend-It" style="height: 44px; width: auto; max-width: 224px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 600;">Thank You for Your Interest!</h1>
          </div>
          
          <div style="padding: 32px 20px;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 16px 0;">Hi ${name},</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for requesting a detailed ROI assessment from Resend-It. We've received your request and our team is excited to help you understand the transformative impact our AI-powered platform can have on your organization.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">What happens next?</h3>
              <p style="color: #64748b; line-height: 1.6; margin: 0;">
                • Our ROI specialists will review your information<br>
                • We'll reach out within 24 hours to schedule your assessment<br>
                • You'll receive a comprehensive, customized ROI analysis<br>
                • We'll discuss implementation strategies tailored to your needs
              </p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              In the meantime, feel free to explore our platform features and resources. If you have any immediate questions, don't hesitate to reach out to us at <a href="mailto:help@resend-it.com" style="color: #4f46e5;">help@resend-it.com</a>.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://resend-it.com" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                Explore Our Platform
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Best regards,<br>
              The Resend-It Team
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `
Thank You for Your Interest!

Hi ${name},

Thank you for requesting a detailed ROI assessment from Resend-It. We've received your request and our team is excited to help you understand the transformative impact our AI-powered platform can have on your organization.

What happens next?
• Our ROI specialists will review your information
• We'll reach out within 24 hours to schedule your assessment
• You'll receive a comprehensive, customized ROI analysis
• We'll discuss implementation strategies tailored to your needs

In the meantime, feel free to explore our platform features and resources. If you have any immediate questions, don't hesitate to reach out to us at help@resend-it.com.

Visit our platform: https://resend-it.com

Best regards,
The Resend-It Team
    `,
  }
}
