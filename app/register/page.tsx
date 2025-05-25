"use client"

import { Suspense } from "react"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { useTranslation } from "@/lib/i18n"
import { LanguageSelector } from "@/components/language-selector"
import RegisterForm from "./register-form"

export default function RegisterPage() {
  const { t } = useTranslation()
  
  return (
    <BackgroundWrapper>
      {/* Language selector in top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="text-white text-center">{t('auth.loadingRegistrationForm')}</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </BackgroundWrapper>
  )
}
