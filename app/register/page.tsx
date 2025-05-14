"use client"

import { Suspense } from "react"
import { BackgroundWrapper } from "@/components/background-wrapper"
import RegisterForm from "./register-form"

export default function RegisterPage() {
  return (
    <BackgroundWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="text-white text-center">Loading registration form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </BackgroundWrapper>
  )
}
