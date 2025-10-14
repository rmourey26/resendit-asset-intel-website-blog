import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Resend-It",
  description: "Privacy Policy for Resend-It services and platform",
  openGraph: {
    title: "Privacy Policy - Resend-It",
    description: "Privacy Policy for Resend-It services and platform",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Resend-It",
    description: "Privacy Policy for Resend-It services and platform",
    images: ["/og-image.jpg"],
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-mono">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Effective Date: February 27, 2025</p>
            <p className="text-foreground leading-relaxed">
              Resend-It ("Company," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
              outlines how we collect, use, and safeguard your personal information when you visit our website
              (www.resend-it.com) or use our services.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8 pt-8">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">1. Information We Collect</h2>
              <p className="text-foreground leading-relaxed">We collect the following types of information:</p>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, shipping address, and
                  payment details.
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, pages visited, and interactions with our
                  platform.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience and
                  track website activity.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">2. How We Use Your Information</h2>
              <p className="text-foreground leading-relaxed">We use collected data for:</p>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>Processing orders and managing deliveries.</li>
                <li>Improving our website and services.</li>
                <li>Providing customer support and responding to inquiries.</li>
                <li>Sending promotional emails and updates (you can opt out anytime).</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">3. Data Sharing & Security</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>We do not sell or rent your data to third parties.</li>
                <li>We may share data with trusted partners for order fulfillment and fraud prevention.</li>
                <li>We implement strong security measures to protect your data from unauthorized access.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">4. Your Rights & Choices</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>You can update or request deletion of your data.</li>
                <li>You can opt out of marketing emails via the unsubscribe link.</li>
                <li>You may disable cookies through your browser settings.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">5. Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                For any privacy-related concerns, contact us at{" "}
                <a
                  href="mailto:privacy@resend-it.com"
                  className="text-[#4f46e5] hover:text-[#06b6d4] transition-colors underline"
                >
                  privacy@resend-it.com
                </a>
              </p>
            </section>
          </div>

          {/* Bottom spacing */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">Last updated: February 27, 2025</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
