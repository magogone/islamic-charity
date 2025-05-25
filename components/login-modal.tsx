"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/store/use-auth"
import { useTranslation } from "@/lib/i18n"
import { useRouter } from "next/navigation"

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

  const { login, register } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isRegisterMode) {
        await register({
          email,
          password,
          username,
          confirmPassword,
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
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-islamic-medium/30 border-islamic-medium text-white"
              required
            />
          </div>

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
            disabled={isLoading}
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
