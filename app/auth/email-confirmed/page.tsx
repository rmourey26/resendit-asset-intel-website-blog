import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function EmailConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Email Confirmed!</h1>
          <p className="text-slate-600">
            Your email address has been successfully verified. You can now access all features of your Resend-It
            account.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="w-full btn-gradient text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-200 inline-block"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="w-full border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
