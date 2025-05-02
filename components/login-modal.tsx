"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/store/use-auth"
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
      setError(err instanceof Error ? err.message : "Authentication failed")
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
            {isRegisterMode ? "Create Account" : "Login"}
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70 text-center">
            {isRegisterMode ? "Register to access all features" : "Enter your credentials to access your account"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {isRegisterMode && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-islamic-cream">
                Username
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
              Email
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
              Password
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
                Confirm Password
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
            {isLoading ? "Processing..." : isRegisterMode ? "Create Account" : "Login"}
          </Button>

          <div className="text-center pt-2">
            <button type="button" onClick={toggleMode} className="text-islamic-gold text-sm hover:underline">
              {isRegisterMode ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
