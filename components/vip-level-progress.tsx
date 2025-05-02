"use client"

import { useEffect, useState } from "react"
import { Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface VipLevelProgressProps {
  currentLevel: number
  onUpgrade: () => void
  className?: string
}

// VIP等级对应的捐赠金额
const VIP_LEVELS = [
  { level: 1, amount: 100 },
  { level: 2, amount: 300 },
  { level: 3, amount: 500 },
  { level: 4, amount: 800 },
  { level: 5, amount: 1200 },
]

export function VipLevelProgress({ currentLevel, onUpgrade, className }: VipLevelProgressProps) {
  const [animationState, setAnimationState] = useState(0)

  // 下一个VIP等级
  const nextLevel = currentLevel < 5 ? currentLevel + 1 : null

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
        {nextLevel && (
          <span className="text-sm text-islamic-cream/80">
            {VIP_LEVELS[nextLevel - 1].amount - VIP_LEVELS[currentLevel - 1].amount}U to VIP{nextLevel}
          </span>
        )}
      </div>

      {/* 调整容器宽度和圆圈大小 */}
      <div className="flex items-center justify-between w-full gap-1">
        {VIP_LEVELS.map((vip) => (
          <div key={vip.level} className="flex flex-col items-center">
            <button
              onClick={() => handleLevelClick(vip.level)}
              disabled={vip.level !== nextLevel}
              className={cn(
                "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 relative",
                getLevelStyle(vip.level),
                vip.level === nextLevel && "hover:scale-110 active:scale-95",
              )}
            >
              {vip.level === nextLevel && (
                <div className="absolute inset-0 rounded-full bg-islamic-gold/20 animate-pulse"></div>
              )}

              {vip.level === 5 ? (
                <Crown
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4",
                    vip.level === currentLevel
                      ? "text-islamic-dark"
                      : vip.level === nextLevel
                        ? "text-islamic-gold"
                        : "text-islamic-cream/50",
                  )}
                />
              ) : (
                <span
                  className={cn(
                    "text-sm sm:text-base font-bold",
                    vip.level === currentLevel
                      ? "text-islamic-dark"
                      : vip.level === nextLevel
                        ? "text-islamic-gold"
                        : "text-islamic-cream/50",
                  )}
                >
                  {vip.level}
                </span>
              )}

              {/* 当前等级的绿色指示点 */}
              {vip.level === currentLevel && (
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border border-islamic-dark"></div>
              )}

              {/* 下一等级的升级图标 - 使用更好看的图标 */}
              {vip.level === nextLevel && (
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
