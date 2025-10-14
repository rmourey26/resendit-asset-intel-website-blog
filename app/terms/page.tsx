import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Use - Resend-It",
  description: "Terms of Use for Resend-It services and platform",
  openGraph: {
    title: "Terms of Use - Resend-It",
    description: "Terms of Use for Resend-It services and platform",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use - Resend-It",
    description: "Terms of Use for Resend-It services and platform",
    images: ["/og-image.jpg"],
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-mono">Terms of Use</h1>
            <p className="text-muted-foreground text-lg">Effective Date: February 27, 2025</p>
            <p className="text-foreground leading-relaxed">
              Welcome to Resend-It! By accessing and using our website (www.resend-it.com) and services, you agree to
              comply with these Terms of Use.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 pt-8">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">1. Use of Our Services</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>You must be at least 18 years old to use our services.</li>
                <li>You agree to provide accurate and complete information when registering or placing an order.</li>
                <li>Unauthorized use of our platform, including hacking or scraping data, is strictly prohibited.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">2. Orders & Payments</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>All purchases are subject to availability.</li>
                <li>We reserve the right to refuse or cancel orders at our discretion.</li>
                <li>Payments must be made using authorized payment methods on our website.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">3. Returns & Refunds</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>We offer a limited return and refund policy for defective or incorrect items.</li>
                <li>Requests must be submitted within [X] days of purchase.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">4. Intellectual Property</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>All content, trademarks, and materials on our website belong to Resend-It.</li>
                <li>You may not copy, distribute, or modify any content without our permission.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">5. Limitation of Liability</h2>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside pl-2">
                <li>
                  Resend-It is not liable for indirect, incidental, or consequential damages resulting from the use of
                  our services.
                </li>
                <li>We do not guarantee uninterrupted or error-free service.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">6. Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to update these Terms at any time. Continued use of our services constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground font-mono">7. Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                For any questions, contact{" "}
                <a
                  href="mailto:help@resend-it.com"
                  className="text-[#4f46e5] hover:text-[#06b6d4] transition-colors underline"
                >
                  help@resend-it.com
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
