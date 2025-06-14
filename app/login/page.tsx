"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "student"

  useEffect(() => {
    if (session) {
      router.push(`/choose-role?role=${role}`)
    }
  }, [session, role, router])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-4">Login as {role}</h1>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
      >
        Login with Google
      </button>
    </div>
  )
}
