export type CookiePreferences = {
  necessary: boolean // Always true, cannot be disabled
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_CONSENT_KEY = "resend-it-cookie-consent"
const COOKIE_CONSENT_TIMESTAMP_KEY = "resend-it-cookie-consent-timestamp"

export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as CookiePreferences
  } catch {
    return null
  }
}

export function setCookieConsent(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
  localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, new Date().toISOString())

  // Dispatch custom event so components can react to consent changes
  window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: preferences }))
}

export function hasGivenConsent(): boolean {
  return getCookieConsent() !== null
}

export function getConsentTimestamp(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(COOKIE_CONSENT_TIMESTAMP_KEY)
}

export function clearCookieConsent(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem(COOKIE_CONSENT_KEY)
  localStorage.removeItem(COOKIE_CONSENT_TIMESTAMP_KEY)
}

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

export const allAcceptedPreferences: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
}
