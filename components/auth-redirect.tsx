"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AuthRedirectProps {
  redirectTo?: string
  requireAuth?: boolean
}

export function AuthRedirect({ redirectTo = "/", requireAuth = false }: AuthRedirectProps) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (requireAuth && !user) {
        // Redirect to external login with return URL
        const loginUrl = new URL("https://app.resend-it.com/login")
        loginUrl.searchParams.set("redirect_to", window.location.href)
        window.location.href = loginUrl.toString()
      } else if (!requireAuth && user) {
        // User is logged in, redirect to specified location
        router.push(redirectTo)
      }
    }

    checkAuth()
  }, [supabase, router, redirectTo, requireAuth])

  return null
}
