"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  getCookieConsent,
  setCookieConsent,
  getConsentTimestamp,
  type CookiePreferences,
  allAcceptedPreferences,
  defaultPreferences,
} from "@/lib/cookie-consent"
import { CheckCircle2 } from "lucide-react"

export default function CookiePreferencesPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [saved, setSaved] = useState(false)
  const [consentDate, setConsentDate] = useState<string | null>(null)

  useEffect(() => {
    const current = getCookieConsent()
    if (current) {
      setPreferences(current)
    }
    setConsentDate(getConsentTimestamp())
  }, [])

  const handleSave = () => {
    setCookieConsent(preferences)
    setSaved(true)
    setConsentDate(new Date().toISOString())

    // Reset saved message after 3 seconds
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAcceptAll = () => {
    setPreferences(allAcceptedPreferences)
    setCookieConsent(allAcceptedPreferences)
    setSaved(true)
    setConsentDate(new Date().toISOString())
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRejectAll = () => {
    setPreferences(defaultPreferences)
    setCookieConsent(defaultPreferences)
    setSaved(true)
    setConsentDate(new Date().toISOString())
    setTimeout(() => setSaved(false), 3000)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">Cookie Preferences</h1>
          <p className="text-muted-foreground text-lg">Manage your cookie settings and privacy preferences</p>
          {consentDate && <p className="text-sm text-muted-foreground mt-2">Last updated: {formatDate(consentDate)}</p>}
        </div>

        {saved && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              Your preferences have been saved successfully!
            </p>
          </div>
        )}

        <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We respect your privacy. Use the controls below to customize which cookies you allow. Note that disabling
            certain cookies may affect your experience on our website.{" "}
            <Link href="/cookies" className="text-primary hover:underline">
              Learn more about our cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Necessary Cookies */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold font-mono">Necessary Cookies</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    Always Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These cookies are essential for the website to function properly. They enable core functionality such
                  as security, network management, and accessibility. These cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled={true} aria-label="Necessary cookies (always active)" />
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 font-mono">Analytics Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Help us understand how visitors interact with our website by collecting and reporting information
                  anonymously. This helps us improve our services.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on pages</li>
                  <li>Error tracking and performance monitoring</li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Switch
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                  aria-label="Toggle analytics cookies"
                />
                <Label htmlFor="analytics" className="text-xs text-muted-foreground cursor-pointer">
                  {preferences.analytics ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 font-mono">Marketing Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Track your online activity to help advertisers deliver more relevant advertising or to limit how many
                  times you see an ad.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Targeted advertising</li>
                  <li>Social media integration</li>
                  <li>Campaign effectiveness measurement</li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Switch
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                  aria-label="Toggle marketing cookies"
                />
                <Label htmlFor="marketing" className="text-xs text-muted-foreground cursor-pointer">
                  {preferences.marketing ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>
          </div>

          {/* Preference Cookies */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 font-mono">Preference Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Allow the website to remember choices you make and provide enhanced, personalized features.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Language preferences</li>
                  <li>Display settings</li>
                  <li>Personalized content</li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Switch
                  id="preferences"
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
                  aria-label="Toggle preference cookies"
                />
                <Label htmlFor="preferences" className="text-xs text-muted-foreground cursor-pointer">
                  {preferences.preferences ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-border">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button variant="outline" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
