"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/store/use-auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { BarkatLogo } from "@/components/barkat-logo"
import { useToast } from "@/components/ui/toast"
import { useSearchParams } from "next/navigation"

export default function RegisterForm() {
  const searchParams = useSearchParams() || new URLSearchParams()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const { register, isLoading } = useAuth()
  const { error: showError, success, ToastContainer } = useToast()

  // Get invite code from URL on component mount
  useEffect(() => {
    try {
      const codeFromUrl = searchParams.get('code')
      if (codeFromUrl) {
        setInviteCode(codeFromUrl)
      }
    } catch (err) {
      console.error("Error accessing URL parameters:", err)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if passwords match before making API call
    if (password !== repeatPassword) {
      showError("Passwords do not match")
      return
    }
    
    try {
      await register({ 
        email, 
        username: name, // Map name to username for the auth store
        password, 
        confirmPassword: repeatPassword, // Map repeatPassword to confirmPassword for the auth store
        inviteCode // Include invite code with registration
      })
      success("Registration successful! You can now log in.")
    } catch (err) {
      // Error is already handled by global error handler
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center justify-center text-center">
        <BarkatLogo className="h-16 w-16" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Create a new account</h1>
        <p className="mt-2 text-sm text-gray-400">
          Or{" "}
          <Link href="/login" className="font-medium text-amber-500 hover:text-amber-400">
            sign in to your account
          </Link>
        </p>
        {inviteCode && (
          <div className="mt-4 text-sm text-amber-500 bg-amber-500/10 px-4 py-2 rounded-md">
            You've been invited! Your invite code has been automatically applied.
          </div>
        )}
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="Create a password"
            />
          </div>

          <div>
            <Label htmlFor="repeatPassword">Confirm Password</Label>
            <Input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              autoComplete="new-password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="mt-1"
              placeholder="Confirm your password"
            />
          </div>

          {/* Invitation Code Field - Visible but Read-only */}
          {inviteCode && (
            <div>
              <Label htmlFor="inviteCode">Invitation Code</Label>
              <Input
                id="inviteCode"
                name="inviteCode"
                type="text"
                value={inviteCode}
                readOnly
                className="mt-1 bg-amber-500/5 border-amber-500/30 text-amber-500"
              />
              <p className="mt-1 text-xs text-amber-500/70">
                This invitation code was automatically applied
              </p>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md border border-amber-500 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>
      
      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
} 
