"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "./fallback-image"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
}

export function HeroSection({
  title = "Barkat Alliance 巴卡特基金",
  subtitle = "巴卡特基金",
  description = "创新慈善模式：真主使命",
  buttonText = "开始捐赠",
  onButtonClick,
}: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(true)

  // 更改 HeroSection 组件中的图片
  // 将清真寺图片替换为更适合慈善组织的图片

  // 修改 primaryImage 和 fallbackImage 变量
  const primaryImage = "/grand-mosque.png" // 改回清真寺图片
  const fallbackImage =
    "https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1200" // 清真寺备用图片

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* 加载指示器 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-islamic-dark/50">
          <div className="w-12 h-12 border-4 border-islamic-gold/30 border-t-islamic-gold rounded-full animate-spin"></div>
        </div>
      )}

      {/* 背景图片 */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <FallbackImage
            src={primaryImage}
            fallbackSrc={fallbackImage}
            alt="清真寺"
            fill
            className="object-cover object-center"
            priority
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-dark/40 via-islamic-dark/30 to-islamic-dark/70"></div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="inline-block px-6 py-2 mb-4 bg-islamic-cream/90 rounded-md">
          <h2 className="text-lg font-bold tracking-wider text-islamic-dark">{subtitle}</h2>
        </div>

        <h1 className="mb-4 text-4xl font-serif font-light tracking-wide text-white">{title}</h1>

        <p className="max-w-md mb-6 text-base text-islamic-cream/90">{description}</p>

        <Button
          className="px-6 py-5 text-base bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark"
          onClick={onButtonClick}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
