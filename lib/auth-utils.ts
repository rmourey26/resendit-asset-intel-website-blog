import { createClient } from "@/lib/supabase/client"

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()

  // Redirect to home page after sign out
  window.location.href = "/"
}

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export function redirectToLogin(returnUrl?: string) {
  const loginUrl = new URL("https://app.resend-it.com/login")
  if (returnUrl) {
    loginUrl.searchParams.set("redirect_to", returnUrl)
  } else {
    loginUrl.searchParams.set("redirect_to", window.location.href)
  }
  window.location.href = loginUrl.toString()
}

export function redirectToApp() {
  window.location.href = "https://app.resend-it.com/dashboard"
}
