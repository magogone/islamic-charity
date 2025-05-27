"use client"

import { useEffect, useRef, useMemo, memo } from "react"
import { Crown, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useVipInfo } from "@/store/use-vip-info"
import { useTranslation } from "@/lib/i18n"

interface VipLevelProgressProps {
  currentLevel: number
  currentDonation: number
  onUpgrade: () => void
  className?: string
}

// 内部实现组件
function VipLevelProgressImpl({ currentLevel, currentDonation, onUpgrade, className }: VipLevelProgressProps) {
  // 始终在顶层调用hook
  const { getVipLevelDonationAmount } = useVipInfo();
  const { t } = useTranslation();
  
  // 引用
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  
  // 防止过度调用API
  const initializedRef = useRef(false);
  
  // DOM引用，用于动画
  const nextLevelButtonRef = useRef<HTMLButtonElement | null>(null);
  
  // 使用useMemo缓存计算结果
  const nextLevelData = useMemo(() => {
    const nextLevel = currentLevel < 5 ? currentLevel + 1 : null;
    const nextLevelAmount = nextLevel ? getVipLevelDonationAmount(nextLevel) : null;
    
    initializedRef.current = true;
    
    return { nextLevel, nextLevelAmount };
  }, [currentLevel, getVipLevelDonationAmount]);
  
  // 解构nextLevelData以便在组件中使用
  const { nextLevel, nextLevelAmount } = nextLevelData;

  // 使用CSS动画替代React状态动画
  useEffect(() => {
    // 如果没有下一级或者元素不存在，不执行动画
    if (!nextLevel || !nextLevelButtonRef.current) return;
    
    // 在组件挂载后设置CSS类
    const element = nextLevelButtonRef.current;
    element.classList.add('vip-level-next-animate');
    
    return () => {
      // 清理
      if (element) {
        element.classList.remove('vip-level-next-animate');
      }
    };
  }, [nextLevel]);

  // 获取等级样式
  const getLevelStyle = (level: number) => {
    // 当前等级
    if (level === currentLevel) {
      return "bg-islamic-gold text-islamic-dark"
    }
    // 下一等级（带动画）
    else if (level === nextLevel) {
      return "relative cursor-pointer bg-islamic-medium border-2 border-islamic-gold"
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
      {/* 添加必要的CSS */}
      <style jsx global>{`
        @keyframes vipLevelPulse {
          0% { box-shadow: 0 0 0px 0px rgba(212,185,110,0.2); }
          50% { box-shadow: 0 0 10px 3px rgba(212,185,110,0.5); }
          100% { box-shadow: 0 0 6px 2px rgba(212,185,110,0.3); }
        }
        .vip-level-next-animate {
          animation: vipLevelPulse 1.6s infinite;
        }
        .vip-level-next-animate:hover {
          transform: scale(1.1);
          transition: transform 0.3s;
        }
        .vip-level-next-animate:active {
          transform: scale(0.95);
          transition: transform 0.1s;
        }
      `}</style>
      
      <div className="flex justify-between mb-2">
        {currentLevel > 0 && (
          <span className="text-sm text-islamic-cream/80">{t('donation.currentVip').replace('{level}', t(`vip.level${currentLevel}`))}</span>
        )}
        {nextLevel && nextLevelAmount && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-islamic-cream/80 cursor-help">
                  <span>
                    {t('donation.toVip').replace('{amount}', nextLevelAmount.toString()).replace('{level}', nextLevel.toString())}
                  </span>
                  <Info className="ml-1 h-3 w-3 text-islamic-cream/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-islamic-medium border-islamic-gold/30 text-islamic-cream">
                <p className="text-xs">{t('donation.fullAmountRequired').replace('{level}', nextLevel.toString())}</p>
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
            width: `${Math.min(((currentLevel - 1) / (5 - 1)) * 100, 100)}%`,
          }}
        ></div>

        {[1, 2, 3, 4, 5].map((level) => (
          <div key={level} className="flex flex-col items-center z-10">
            <button
              ref={level === nextLevel ? nextLevelButtonRef : null}
              onClick={() => handleLevelClick(level)}
              disabled={level !== nextLevel}
              className={cn(
                "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 relative",
                getLevelStyle(level),
              )}
            >
              {level === nextLevel && (
                <div className="absolute inset-0 rounded-full bg-islamic-gold/20"></div>
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
                <div className="absolute -top-2 -right-1 sm:-top-3 sm:-right-1">
                  <StarUpgradeIcon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-islamic-gold drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
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

// 使用memo包装组件，确保只有当props真正改变时才重新渲染
export const VipLevelProgress = memo(VipLevelProgressImpl);
