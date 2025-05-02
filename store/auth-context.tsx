"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useAuth } from "@/store/use-auth"
import { LoginModal } from "@/components/login-modal"
import { usePathname, useRouter } from "next/navigation"

interface AuthContextType {
  openLoginModal: (targetPath?: string) => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [targetPath, setTargetPath] = useState<string | undefined>(undefined)
  const [isInitialized, setIsInitialized] = useState(false)

  // Safely access auth properties with default values
  const auth = useAuth()
  const isAuthenticated = auth?.isAuthenticated || false
  const logout = auth?.logout || (() => {})

  const router = useRouter()
  const pathname = usePathname()

  // Set initialized after first render to avoid SSR issues
  useEffect(() => {
    setIsInitialized(true)
  }, [])

  const openLoginModal = useCallback((path?: string) => {
    setTargetPath(path)
    setIsLoginModalOpen(true)
  }, [])

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
    setTargetPath(undefined)
  }, [])

  // Handle logout with redirection
  const handleLogout = useCallback(() => {
    logout()
    router.push("/")
  }, [logout, router])

  // Check if current path is protected
  const isProtectedRoute = pathname === "/donation" || pathname === "/promotion" || pathname.startsWith("/profile")

  // Only check route protection after initialization to avoid SSR issues
  useEffect(() => {
    if (isInitialized && isProtectedRoute && !isAuthenticated && !isLoginModalOpen) {
      openLoginModal(pathname)
    }
  }, [isInitialized, isProtectedRoute, isAuthenticated, isLoginModalOpen, openLoginModal, pathname])

  return (
    <AuthContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} targetPath={targetPath} />
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
