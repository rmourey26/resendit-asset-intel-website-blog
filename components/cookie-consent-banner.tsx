"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { setCookieConsent, hasGivenConsent, allAcceptedPreferences, defaultPreferences } from "@/lib/cookie-consent"

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner if user hasn't given consent yet
    const hasConsent = hasGivenConsent()
    setIsVisible(!hasConsent)
  }, [])

  const handleAcceptAll = () => {
    setCookieConsent(allAcceptedPreferences)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    setCookieConsent(defaultPreferences)
    setIsVisible(false)
  }

  const handleClose = () => {
    // If they close without choosing, set default (necessary only)
    if (!hasGivenConsent()) {
      setCookieConsent(defaultPreferences)
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg mb-2 font-mono">We Value Your Privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
              clicking "Accept All", you consent to our use of cookies.{" "}
              <Link href="/cookies" className="text-primary hover:underline font-medium">
                Learn more
              </Link>{" "}
              or{" "}
              <Link href="/cookie-preferences" className="text-primary hover:underline font-medium">
                manage preferences
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={handleRejectAll} className="min-w-[120px] bg-transparent">
              Reject All
            </Button>
            <Button onClick={handleAcceptAll} className="min-w-[120px]">
              Accept All
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClose} className="ml-2" aria-label="Close cookie banner">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
