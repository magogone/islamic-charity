"use client"

import Link from "next/link"
import { Home, Share2, User } from "lucide-react"
import { HeartPlusIcon } from "@/components/heart-plus-icon"
import { BarkatLogo } from "@/components/barkat-logo"
import type { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
  title: string
  currentPath: string
  rightIcon?: ReactNode
}

export function MainLayout({ children, title, currentPath, rightIcon }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-islamic-dark text-white pb-16">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <BarkatLogo size={32} className="mr-2" />
            <h1 className="text-xl font-bold text-islamic-gold">{title}</h1>
          </div>
          {rightIcon}
        </div>
      </header>

      {/* Main content */}
      <div className="container max-w-lg mx-auto px-4 py-6">{children}</div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-islamic-dark border-t border-islamic-medium/30 py-2">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex justify-around">
            <Link
              href="/"
              className={`flex flex-col items-center ${
                currentPath === "/" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              href="/donation"
              className={`flex flex-col items-center ${
                currentPath === "/donation" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <HeartPlusIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Donate</span>
            </Link>
            <Link
              href="/promotion"
              className={`flex flex-col items-center ${
                currentPath === "/promotion" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <Share2 className="h-6 w-6" />
              <span className="text-xs mt-1">Invite</span>
            </Link>
            <Link
              href="/profile"
              className={`flex flex-col items-center ${
                currentPath === "/profile" ? "text-islamic-gold" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors`}
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
