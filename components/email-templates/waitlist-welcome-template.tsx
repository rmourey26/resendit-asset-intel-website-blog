interface WaitlistWelcomeTemplateProps {
  firstName: string
}

export function WaitlistWelcomeTemplate({ firstName }: WaitlistWelcomeTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#4f46e5" }}>Welcome to Resend-It, {firstName}!</h1>
      <p>Thank you for joining our Lite plan waitlist. We're excited to have you on board!</p>
      <p>You'll be among the first to know when our $5/month Lite plan launches.</p>
      <p>
        <strong>What's next?</strong>
      </p>
      <ul>
        <li>We'll notify you as soon as the Lite plan is available</li>
        <li>You'll get early access to sign up</li>
        <li>Special launch pricing may be available</li>
      </ul>
      <p>Questions? Reply to this email or contact us at help@resend-it.com</p>
      <p>
        Best regards,
        <br />
        The Resend-It Team
      </p>
    </div>
  )
}
