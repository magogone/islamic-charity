"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/store/use-auth"
import { useTranslation } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import { sendVerificationCode } from "@/lib/api"
import { useToast } from "@/components/ui/toast"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  targetPath?: string // Path to redirect to after successful login
}

export function LoginModal({ isOpen, onClose, targetPath }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // Email verification states
  const [verificationCode, setVerificationCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const { login, register } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()
  const { error: showError, success } = useToast()

  // Handle countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [countdown])

  // Reset states when switching between login/register mode
  useEffect(() => {
    setError(null)
    setVerificationCode("")
    setCountdown(0)
  }, [isRegisterMode])

  // Handle sending verification code
  const handleSendVerificationCode = async () => {
    if (!email) {
      showError(t('auth.pleaseEnterValidEmail'))
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showError(t('auth.pleaseEnterValidEmail'))
      return
    }

    setIsSendingCode(true)
    try {
      const response = await sendVerificationCode({ email })
      if (response.success) {
        success(t('auth.verificationCodeSent'))
        setCountdown(60) // Start 60 second countdown
      } else {
        showError(t('auth.verificationCodeSendFailed'))
      }
    } catch (error) {
      showError(t('auth.verificationCodeSendFailed'))
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isRegisterMode) {
        // Check if verification code is provided for registration
        if (!verificationCode || verificationCode.length !== 6) {
          setError(t('auth.enterVerificationCode'))
          return
        }
        
        await register({
          email,
          password,
          username,
          confirmPassword,
          verificationCode,
        })
      } else {
        await login({
          email,
          password,
        })
      }

      // Close the modal
      onClose()

      // Navigate to target path if provided
      if (targetPath) {
        router.push(targetPath)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.authenticationFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setError(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-dark text-white border-islamic-medium">
        <DialogHeader>
          <DialogTitle className="text-islamic-gold text-center text-xl">
            {isRegisterMode ? t('auth.createAccount') : t('auth.login')}
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70 text-center">
            {isRegisterMode ? t('auth.registerToAccess') : t('auth.enterCredentials')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {isRegisterMode && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-islamic-cream">
                {t('auth.username')}
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-islamic-medium/30 border-islamic-medium text-white"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-islamic-cream">
              {t('auth.email')}
            </Label>
            {isRegisterMode ? (
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-islamic-medium/30 border-islamic-medium text-white flex-1"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendVerificationCode}
                  disabled={isSendingCode || countdown > 0}
                  className="px-3 py-2 text-xs bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  size="sm"
                >
                  {isSendingCode 
                    ? t('auth.sendingCode')
                    : countdown > 0 
                      ? t('auth.resendIn').replace('{seconds}', countdown.toString())
                      : t('auth.getVerificationCode')
                  }
                </Button>
              </div>
            ) : (
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-islamic-medium/30 border-islamic-medium text-white"
                required
              />
            )}
          </div>

          {isRegisterMode && (
            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="text-islamic-cream">
                {t('auth.verificationCode')}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="verificationCode"
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="bg-islamic-medium/30 border-islamic-medium text-white flex-1"
                  placeholder={t('auth.enterVerificationCode')}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-islamic-cream">
              {t('auth.password')}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-islamic-medium/30 border-islamic-medium text-white"
              required
            />
          </div>

          {isRegisterMode && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-islamic-cream">
                {t('auth.confirmPassword')}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-islamic-medium/30 border-islamic-medium text-white"
                required
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90"
            disabled={isLoading || (isRegisterMode && !verificationCode.length)}
          >
            {isLoading ? t('auth.processing') : isRegisterMode ? t('auth.createAccount') : t('auth.login')}
          </Button>

          <div className="text-center pt-2">
            <button type="button" onClick={toggleMode} className="text-islamic-gold text-sm hover:underline">
              {isRegisterMode ? t('auth.loginPrompt') : t('auth.registerPrompt')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
