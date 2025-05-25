"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/store/use-auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { BarkatLogo } from "@/components/barkat-logo"
import { useToast } from "@/components/ui/toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()
  const { success, ToastContainer } = useToast()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      success(t('auth.loginSuccessful'))
      // The redirection is handled in the useAuth hook
    } catch (err) {
      // Error is handled by the global API error handler
      console.error(err)
    }
  }

  return (
    <BackgroundWrapper>
      {/* Language selector in top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center justify-center text-center">
            <BarkatLogo className="h-16 w-16" />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">{t('auth.signInToAccount')}</h1>
            <p className="mt-2 text-sm text-gray-400">
              {t('auth.or')}{" "}
              <Link href="/register" className="font-medium text-amber-500 hover:text-amber-400">
                {t('auth.createANewAccount')}
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <Label htmlFor="email">{t('auth.emailAddress')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder={t('auth.enterEmail')}
                />
              </div>

              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder={t('auth.enterPassword')}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-amber-500 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
              >
                {isLoading ? t('auth.signingIn') : t('auth.signIn')}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Toast notifications */}
      <ToastContainer />
    </BackgroundWrapper>
  )
}
