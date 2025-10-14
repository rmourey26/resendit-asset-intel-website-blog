import type * as React from "react"

interface DemoRequestTemplateProps {
  name: string
  email: string
  company: string
  industry: string
  message: string
}

export const DemoRequestTemplate: React.FC<Readonly<DemoRequestTemplateProps>> = ({
  name,
  email,
  company,
  industry,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h1 style={{ color: "#4f46e5" }}>New Demo Request</h1>
    <p>A new demo request has been submitted through the website.</p>

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
      <h2 style={{ color: "#333", marginTop: "0" }}>Contact Information</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Company:</strong> {company}
      </p>
      <p>
        <strong>Industry:</strong> {industry}
      </p>
    </div>

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
      <h2 style={{ color: "#333", marginTop: "0" }}>Message</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    </div>

    <p>Please follow up with this prospect as soon as possible.</p>
    <p>
      Best regards,
      <br />
      Resend-It System
    </p>
  </div>
)
