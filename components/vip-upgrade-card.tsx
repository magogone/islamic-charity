"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "./fallback-image";
import { Progress } from "@/components/ui/progress";
import { useVipInfo } from "@/store/use-vip-info";

interface VipUpgradeCardProps {
  currentVip: number;
  currentDonation: number;
  nextVipRequirement: number;
  nextVipBenefits: string;
  imageUrl: string;
  className?: string;
  onUpgrade?: () => void;
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
  const { getVipLevelTotalReturn, getDailyFundRangeForLevel } = useVipInfo();

  // 计算升级进度 - 基于当前捐赠占下一级要求的百分比
  const upgradeProgress = Math.min(
    Math.round((currentDonation / nextVipRequirement) * 100),
    100
  );

  // 显示的是下一级的全部费用
  const fullAmount = nextVipRequirement;

  // 获取下一级的总回报和每日资金范围
  const nextVipLevel = currentVip + 1;
  const nextVipTotalReturn = getVipLevelTotalReturn(nextVipLevel);
  const nextVipDailyFunds = getDailyFundRangeForLevel(nextVipLevel);

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-islamic-cardBg/90 backdrop-blur-sm shadow-md flex flex-col",
        "w-full",
        className
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
          <Progress
            value={upgradeProgress}
            className="h-1.5 bg-islamic-dark/50"
            indicatorClassName="bg-islamic-gold"
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-base font-medium text-[#d4b96e]">
              VIP {currentVip} → VIP {currentVip + 1}
            </h3>
            <p className="text-xs text-[#f5efe0]/70 mt-1">
              升级后获得更多扶贫资金
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#f5efe0]/70">
              VIP {currentVip + 1} 费用
            </p>
            <p className="text-lg font-medium text-islamic-gold flex items-baseline">
              {fullAmount}
              <span className="text-xs ml-1">USD</span>
            </p>
          </div>
        </div>

        <div className="bg-islamic-medium/50 backdrop-blur-sm rounded-lg p-3 mb-3">
          <h4 className="text-sm font-medium text-islamic-gold mb-2">
            VIP {currentVip + 1} 特权
          </h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
              <span className="text-xs text-islamic-cream/70">总回报</span>
              <span className="text-base font-medium text-[#8dc63f] flex items-baseline">
                {nextVipTotalReturn}
                <span className="text-xs ml-1">USD</span>
              </span>
            </div>
            <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
              <span className="text-xs text-islamic-cream/70">每日资金</span>
              <span className="text-base font-medium text-[#8dc63f]">
                {nextVipDailyFunds}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#f5efe0]/90 leading-relaxed">
            {nextVipBenefits}
          </p>
        </div>

        {/* 支付说明 */}
        <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-2 bg-islamic-gold/10 mb-3">
          <Info className="h-4 w-4 text-islamic-gold mt-0.5 flex-shrink-0" />
          <p className="text-xs text-islamic-cream/90">
            升级需支付VIP {currentVip + 1} 的全部费用 {fullAmount}
            <span className="text-xs ml-1">USD</span>，而非差价。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-4">
          <div className="text-[#f5efe0]/70">当前捐赠总额</div>
          <div className="font-medium text-[#f5efe0] text-right flex items-baseline">
            {currentDonation}
            <span className="text-xs ml-1">USD</span>
          </div>

          <div className="text-[#f5efe0]/70">升级所需总额</div>
          <div className="font-medium text-[#f5efe0] text-right flex items-baseline">
            {fullAmount}
            <span className="text-xs ml-1">USD</span>
          </div>
        </div>

        <Button
          className="w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
          onClick={onUpgrade}
        >
          立即升级
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
