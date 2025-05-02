"use client"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "./fallback-image"
import { Progress } from "@/components/ui/progress"

interface VipUpgradeCardProps {
  currentVip: number
  currentDonation: number
  nextVipRequirement: number
  nextVipBenefits: string
  imageUrl: string
  className?: string
  onUpgrade?: () => void
}

export function VipUpgradeCard({
  currentVip,
  currentDonation,
  nextVipRequirement,
  nextVipBenefits,
  imageUrl,
  className,
  onUpgrade,
}: VipUpgradeCardProps) {
  // 计算升级进度
  const upgradeProgress = Math.min(Math.round((currentDonation / nextVipRequirement) * 100), 100)
  const remainingAmount = nextVipRequirement - currentDonation

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-islamic-cardBg/90 backdrop-blur-sm shadow-md flex flex-col",
        "w-full",
        className,
      )}
    >
      {/* 图片区域 - 使用叠加效果使图片与背景色调和 */}
      <div className="relative h-32 w-full">
        <div className="relative w-full h-full">
          <FallbackImage
            src={imageUrl}
            fallbackSrc="/islamic-finance-concept.png"
            alt={`VIP ${currentVip + 1} 升级`}
            fill
            className="object-cover opacity-90"
            unoptimized={true}
          />
        </div>
        <div className="absolute inset-0 bg-islamic-dark/30 mix-blend-multiply"></div>

        {/* VIP等级标签 */}
        <div className="absolute top-2 left-2 px-3 py-1 bg-islamic-gold text-islamic-dark text-sm font-medium rounded-full">
          当前: VIP {currentVip}
        </div>
        <div className="absolute top-2 right-2 px-3 py-1 bg-islamic-gold/80 text-islamic-dark text-sm font-medium rounded-full flex items-center">
          <ChevronUp className="mr-1 h-4 w-4" />
          VIP {currentVip + 1}
        </div>

        {/* 升级进度 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-islamic-dark/80 to-transparent p-3">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="text-islamic-cream/80">升级进度</span>
            <span className="text-islamic-gold">{upgradeProgress}%</span>
          </div>
          <Progress value={upgradeProgress} className="h-1.5 bg-islamic-dark/50" indicatorClassName="bg-islamic-gold" />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-base font-medium text-[#d4b96e]">
              VIP {currentVip} → VIP {currentVip + 1}
            </h3>
            <p className="text-xs text-[#f5efe0]/70 mt-1">升级后获得更多扶贫资金</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#f5efe0]/70">还需捐赠</p>
            <p className="text-lg font-medium text-islamic-gold">{remainingAmount} U</p>
          </div>
        </div>

        <div className="bg-islamic-medium/50 backdrop-blur-sm rounded-lg p-3 mb-3">
          <h4 className="text-sm font-medium text-islamic-gold mb-2">VIP {currentVip + 1} 特权</h4>
          <p className="text-xs text-[#f5efe0]/90 leading-relaxed">{nextVipBenefits}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-4">
          <div className="text-[#f5efe0]/70">当前捐赠总额</div>
          <div className="font-medium text-[#f5efe0] text-right">{currentDonation} U</div>

          <div className="text-[#f5efe0]/70">升级所需总额</div>
          <div className="font-medium text-[#f5efe0] text-right">{nextVipRequirement} U</div>
        </div>

        <Button className="w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]" onClick={onUpgrade}>
          立即升级
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
