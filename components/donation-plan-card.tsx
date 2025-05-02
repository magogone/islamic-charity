"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "./fallback-image"

interface DonationPlanCardProps {
  imageUrl: string
  title: string
  description?: string
  rate: string
  amount: string
  duration: string
  className?: string
  popular?: boolean
  onClick?: () => void
  fullWidth?: boolean
  onDonate?: () => void
}

export function DonationPlanCard({
  imageUrl,
  title,
  description,
  rate,
  amount,
  duration,
  className,
  popular = false,
  onClick,
  fullWidth = false,
  onDonate,
}: DonationPlanCardProps) {
  const handleDonateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDonate) onDonate()
  }

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-islamic-cardBg/90 backdrop-blur-sm shadow-md flex flex-col",
        fullWidth ? "w-full" : "w-[280px]",
        className,
      )}
      onClick={onClick}
    >
      {/* 图片区域 - 使用叠加效果使图片与背景色调和 */}
      <div className="relative h-32 w-full">
        <div className="relative w-full h-full">
          <FallbackImage
            src={imageUrl}
            fallbackSrc="/islamic-finance-concept.png"
            alt={title}
            fill
            className="object-cover opacity-90"
            unoptimized={true}
          />
        </div>
        <div className="absolute inset-0 bg-islamic-dark/30 mix-blend-multiply"></div>

        {/* 标签 */}
        {popular && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-islamic-gold text-islamic-dark text-xs rounded-full">
            推荐
          </div>
        )}

        {/* 收益率突出显示 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-islamic-dark/80 to-transparent p-3">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-islamic-gold">{rate}</span>
            <span className="text-xs text-islamic-cream/70 ml-1">每日扶贫资金</span>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-base font-medium text-[#d4b96e] line-clamp-1">{title}</h3>
        {description && <p className="text-xs text-[#f5efe0]/70 mt-1 line-clamp-2">{description}</p>}

        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <div className="text-[#f5efe0]/70">捐赠金额</div>
          <div className="font-medium text-[#f5efe0] text-right">{amount}</div>

          <div className="text-[#f5efe0]/70">扶贫周期</div>
          <div className="font-medium text-[#f5efe0] text-right">{duration}</div>
        </div>

        <Button className="mt-4 w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]" onClick={handleDonateClick}>
          立即捐赠
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
