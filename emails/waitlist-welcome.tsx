import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"

interface WaitlistWelcomeEmailProps {
  firstName: string
}

export default function WaitlistWelcomeEmail({ firstName }: WaitlistWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Resend-It Lite Waitlist!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>Welcome to Resend-It, {firstName}!</Heading>
            <Text style={text}>Thank you for joining our Lite plan waitlist. We're excited to have you on board!</Text>
            <Text style={text}>You'll be among the first to know when our $5/month Lite plan launches.</Text>
            <Heading as="h2" style={h2}>
              What's next?
            </Heading>
            <Text style={text}>
              • We'll notify you as soon as the Lite plan is available
              <br />• You'll get early access to sign up
              <br />• Special launch pricing may be available
            </Text>
            <Hr style={hr} />
            <Text style={text}>Questions? Reply to this email or contact us at help@resend-it.com</Text>
            <Text style={footer}>
              Best regards,
              <br />
              The Resend-It Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
}

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "left" as const,
}

const h1 = {
  color: "#4f46e5",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
}

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px 0",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
}

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}
