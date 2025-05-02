"use client"

import type { ReactNode } from "react"
import { IslamicBackground } from "./islamic-background"

interface BackgroundWrapperProps {
  children: ReactNode
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="min-h-screen bg-[#f8f6f0] dark:bg-[#0c1118] relative">
      {/* 伊斯兰风格背景 */}
      <IslamicBackground />

      {/* 主要内容 */}
      {children}
    </div>
  )
}
