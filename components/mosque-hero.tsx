"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MosqueHeroProps {
  title?: string
  subtitle?: string
  caption?: string
  height?: string
  imageUrl?: string
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

export function MosqueHero({
  title = "Barkat Alliance Foundation",
  subtitle = "创新慈善模式",
  caption = "真主使命 · 善行 · 回报",
  height = "h-96",
  imageUrl = "/grand-mosque.png",
  showButton = true,
  buttonText = "立即捐赠",
  onButtonClick,
  className,
}: MosqueHeroProps) {
  return (
    <div className={cn(`relative w-full ${height}`, className)}>
      <Image src={imageUrl || "/placeholder.svg"} alt="清真寺" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d2b]/95 to-transparent"></div>
      <div className="absolute inset-0 bg-pattern-gold opacity-10"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 max-w-lg mx-auto">
        <div className="flex items-center mb-3">
          <div className="h-1 w-16 bg-[#d4b96e] mr-3"></div>
          <h2 className="text-sm font-medium text-[#d4b96e] uppercase tracking-wider">{subtitle}</h2>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/90 text-sm mb-6">{caption}</p>
        {showButton && (
          <Button onClick={onButtonClick} className="bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#0a3d2b] font-medium">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}
