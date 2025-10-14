import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"

interface DemoRequestEmailProps {
  name: string
  email: string
  company: string
  phone?: string
  message: string
  preferredTime: string
  companySize: string
}

export default function DemoRequestEmail({
  name,
  email,
  company,
  phone,
  message,
  preferredTime,
  companySize,
}: DemoRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Demo Request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>New Demo Request</Heading>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={text}>
              <strong>Company:</strong> {company}
            </Text>
            <Text style={text}>
              <strong>Company Size:</strong> {companySize}
            </Text>
            {phone && (
              <Text style={text}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            <Text style={text}>
              <strong>Preferred Time:</strong> {preferredTime}
            </Text>
            <Hr style={hr} />
            <Heading as="h2" style={h2}>
              Message:
            </Heading>
            <Text style={text}>{message}</Text>
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

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}
