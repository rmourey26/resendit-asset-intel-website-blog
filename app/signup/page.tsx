import { SignUpForm } from "@/components/signup-form"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-20 pb-16">
        <SignUpForm />
      </div>
      <Footer />
    </main>
  )
}
