import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Resend-It - Intelligent Asset Lifecycle Infrastructure",
  description:
    "Turn Real-World Assets Into Real-Time Intelligence. Track, manage, and optimize every asset with IoT, AI, and blockchain technology.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["asset tracking", "IoT", "AI", "blockchain", "supply chain", "ESG reporting"],
  authors: [{ name: "Resend-It" }],
  creator: "Resend-It",
  metadataBase: new URL("https://resendit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resendit.com",
    title: "Resend-It - Intelligent Asset Lifecycle Infrastructure",
    description: "Turn Real-World Assets Into Real-Time Intelligence",
    siteName: "Resend-It",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resend-It - Intelligent Asset Lifecycle Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resend-It - Intelligent Asset Lifecycle Infrastructure",
    description: "Turn Real-World Assets Into Real-Time Intelligence",
    creator: "@resendit",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Resend-It",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Resend-It",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#1a1a1a",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        <Suspense fallback={null}>
          {children}
          <CookieConsentBanner />
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  )
}
