"use client"

import { useEffect, useState } from "react"
import { Crown, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useVipInfo } from "@/store/use-vip-info"

interface VipLevelProgressProps {
  currentLevel: number
  currentDonation: number
  onUpgrade: () => void
  className?: string
}

export function VipLevelProgress({ currentLevel, currentDonation, onUpgrade, className }: VipLevelProgressProps) {
  const [animationState, setAnimationState] = useState(0)
  const { getVipLevelDonationAmount } = useVipInfo()

  // 下一个VIP等级
  const nextLevel = currentLevel < 5 ? currentLevel + 1 : null

  // 获取下一级VIP的全额费用
  const nextLevelAmount = nextLevel ? getVipLevelDonationAmount(nextLevel) : null

  // 动画效果
  useEffect(() => {
    if (!nextLevel) return

    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 3)
    }, 800)

    return () => clearInterval(interval)
  }, [nextLevel])

  // 获取等级样式
  const getLevelStyle = (level: number) => {
    // 当前等级
    if (level === currentLevel) {
      return "bg-islamic-gold text-islamic-dark"
    }
    // 下一等级（带动画）
    else if (level === nextLevel) {
      return `relative cursor-pointer ${
        animationState === 0
          ? "bg-islamic-medium border-2 border-islamic-gold"
          : animationState === 1
            ? "bg-islamic-medium border-2 border-islamic-gold shadow-[0_0_10px_3px_rgba(212,185,110,0.5)]"
            : "bg-islamic-medium border-2 border-islamic-gold shadow-[0_0_6px_2px_rgba(212,185,110,0.3)]"
      }`
    }
    // 其他等级
    else {
      return "bg-islamic-medium/40 text-islamic-cream/50"
    }
  }

  // 处理等级点击
  const handleLevelClick = (level: number) => {
    if (level === nextLevel) {
      onUpgrade()
    }
  }

  // 自定义星形图标 SVG
  const StarUpgradeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} stroke="none">
      <path d="M12 2L14.2 7.4L20 8.2L16 12.1L17 18L12 15.2L7 18L8 12.1L4 8.2L9.8 7.4L12 2Z" />
      <path d="M12 7L13 9L15 9.2L13.5 10.7L14 13L12 11.9L10 13L10.5 10.7L9 9.2L11 9L12 7Z" fill="rgba(0,0,0,0.2)" />
    </svg>
  )

  return (
    <div className={cn("mt-3 w-full", className)}>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-islamic-cream/80">Current VIP{currentLevel}</span>
        {nextLevel && nextLevelAmount && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-islamic-cream/80 cursor-help">
                  <span>
                    {nextLevelAmount}U to VIP{nextLevel}
                  </span>
                  <Info className="ml-1 h-3 w-3 text-islamic-cream/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-islamic-medium border-islamic-gold/30 text-islamic-cream">
                <p className="text-xs">Full amount required for VIP{nextLevel}, not just the difference</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* 调整容器宽度和圆圈大小 */}
      <div className="flex items-center justify-between w-full gap-1 relative">
        {/* Add connecting lines between circles */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-islamic-medium/40 -translate-y-1/2 z-0"></div>

        {/* Progress line showing completed levels */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-islamic-gold/70 -translate-y-1/2 z-0"
          style={{
            width: `${Math.min(
              ((currentLevel - 1) / (5 - 1)) * 100 +
                (nextLevel ? (1 / (5 - 1)) * (animationState === 1 ? 0.3 : animationState === 2 ? 0.2 : 0.1) : 0),
              100,
            )}%`,
          }}
        ></div>

        {[1, 2, 3, 4, 5].map((level) => (
          <div key={level} className="flex flex-col items-center z-10">
            <button
              onClick={() => handleLevelClick(level)}
              disabled={level !== nextLevel}
              className={cn(
                "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 relative",
                getLevelStyle(level),
                level === nextLevel && "hover:scale-110 active:scale-95",
              )}
            >
              {level === nextLevel && (
                <div className="absolute inset-0 rounded-full bg-islamic-gold/20 animate-pulse"></div>
              )}

              {level === 5 ? (
                <Crown
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4",
                    level === currentLevel
                      ? "text-islamic-dark"
                      : level === nextLevel
                        ? "text-islamic-gold"
                        : "text-islamic-cream/50",
                  )}
                />
              ) : (
                <span
                  className={cn(
                    "text-sm sm:text-base font-bold",
                    level === currentLevel
                      ? "text-islamic-dark"
                      : level === nextLevel
                        ? "text-islamic-gold"
                        : "text-islamic-cream/50",
                  )}
                >
                  {level}
                </span>
              )}

              {/* Current level indicator */}
              {level === currentLevel && (
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border border-islamic-dark"></div>
              )}

              {/* Next level upgrade icon */}
              {level === nextLevel && (
                <div
                  className={cn(
                    "absolute -top-2 -right-1 sm:-top-3 sm:-right-1",
                    animationState === 1 && "scale-110",
                    animationState === 2 && "scale-105",
                  )}
                >
                  <StarUpgradeIcon
                    className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5 text-islamic-gold drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]",
                      animationState === 1 && "text-islamic-gold/90",
                      animationState === 2 && "text-islamic-gold/80",
                    )}
                  />
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
