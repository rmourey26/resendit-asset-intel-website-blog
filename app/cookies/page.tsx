import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookie Policy | Resend-It",
  description: "Learn about how Resend-It uses cookies and similar technologies.",
  openGraph: {
    title: "Cookie Policy | Resend-It",
    description: "Learn about how Resend-It uses cookies and similar technologies.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Resend-It",
    description: "Learn about how Resend-It uses cookies and similar technologies.",
    images: ["/og-image.jpg"],
  },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">Cookie Policy</h1>
          <p className="text-muted-foreground text-lg">Effective Date: February 27, 2025</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <p className="text-sm leading-relaxed mb-4">
              Resend-It ("Company," "we," "us," or "our") uses cookies and similar tracking technologies to enhance your
              experience on our website (www.resend-it.com). This Cookie Policy explains what cookies are, how we use
              them, and how you can manage your preferences.
            </p>
            <Link href="/cookie-preferences">
              <Button>Manage Cookie Preferences</Button>
            </Link>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">1. What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookies are small text files stored on your device when you visit a website. They help websites remember
              your preferences, improve functionality, and provide analytics about how visitors use the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">2. Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold mb-2">Necessary Cookies (Required)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are essential for the website to function properly. They enable core functionality such
                  as security, network management, and accessibility. You cannot opt out of these cookies.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>Session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Analytics Cookies (Optional)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting
                  information anonymously.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on pages</li>
                  <li>Error tracking and performance monitoring</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Marketing Cookies (Optional)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies track your online activity to help advertisers deliver more relevant advertising or to
                  limit how many times you see an ad.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>Targeted advertising</li>
                  <li>Social media integration</li>
                  <li>Campaign effectiveness measurement</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Preference Cookies (Optional)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies allow the website to remember choices you make (such as language or region) and provide
                  enhanced, personalized features.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>Language preferences</li>
                  <li>Display settings</li>
                  <li>Personalized content</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">3. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may use third-party services that set cookies on your device. These include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Google Analytics for website analytics</li>
              <li>Social media platforms for content sharing</li>
              <li>Advertising networks for targeted marketing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">4. Managing Your Cookie Preferences</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have full control over which cookies you accept:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>
                <strong>Cookie Preference Center:</strong> Use our{" "}
                <Link href="/cookie-preferences" className="text-primary hover:underline">
                  Cookie Preferences
                </Link>{" "}
                page to customize your settings at any time.
              </li>
              <li>
                <strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their
                settings.
              </li>
              <li>
                <strong>Opt-Out Tools:</strong> You can opt out of targeted advertising through industry opt-out pages.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Note: Disabling certain cookies may affect website functionality and your user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">5. Cookie Duration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use both session cookies (deleted when you close your browser) and persistent cookies (remain on your
              device for a set period or until you delete them).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">6. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
              updated effective date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-mono">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-muted-foreground">
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@resend-it.com" className="text-primary hover:underline">
                  privacy@resend-it.com
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Website:</strong>{" "}
                <a href="https://www.resend-it.com" className="text-primary hover:underline">
                  www.resend-it.com
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link href="/cookie-preferences">
              <Button>Manage Cookie Preferences</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
