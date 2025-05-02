"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Home, Share2, User } from "lucide-react"
import { HeartPlusIcon } from "@/components/heart-plus-icon"
import { BarkatLogo } from "@/components/barkat-logo"
import { useAuth } from "@/store/use-auth"
import { useAuthContext } from "@/store/auth-context"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
  currentPath: string
}

export function MainLayout({ children, title, currentPath }: MainLayoutProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const { openLoginModal } = useAuthContext()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Function to handle navigation with auth check
  const handleNavigation = (path: string) => {
    if (path === "/" || isAuthenticated) {
      router.push(path)
    } else {
      // Open login modal with target path
      openLoginModal(path)
    }
  }

  // Function to truncate username
  const truncateUsername = (username: string) => {
    if (!username) return ""
    if (username.length <= 15) return username
    return username.substring(0, 12) + "..."
  }

  return (
    <div className="min-h-screen bg-islamic-dark text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <BarkatLogo size={32} className="mr-2" />
            <h1 className="text-xl font-bold text-islamic-gold">{title}</h1>
          </div>

          {/* Username or login button */}
          <div>
            {isAuthenticated && user ? (
              <div className="flex items-center">
                <span className="text-sm text-islamic-cream" title={user.username || user.email}>
                  {truncateUsername(user.username || user.email.split("@")[0])}
                </span>
              </div>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="px-3 py-1 border border-islamic-gold text-islamic-gold rounded-md hover:bg-islamic-gold/10 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container max-w-lg mx-auto px-4 py-6 pb-24">{children}</div>

      {/* Bottom navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-islamic-dark border-t border-islamic-medium/30 py-2 z-30">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex justify-around">
            <button
              onClick={() => handleNavigation("/")}
              className={`flex flex-col items-center w-full ${
                currentPath === "/" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => handleNavigation("/donation")}
              className={`flex flex-col items-center w-full ${
                currentPath === "/donation" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <HeartPlusIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Donate</span>
            </button>
            <button
              onClick={() => handleNavigation("/promotion")}
              className={`flex flex-col items-center w-full ${
                currentPath === "/promotion" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <Share2 className="h-6 w-6" />
              <span className="text-xs mt-1">Invite</span>
            </button>
            <button
              onClick={() => handleNavigation("/profile")}
              className={`flex flex-col items-center w-full ${
                currentPath === "/profile" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
