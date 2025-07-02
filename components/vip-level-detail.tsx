"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVipInfo } from "@/store/use-vip-info";

interface VipLevelDetailProps {
  vipLevel: number;
  currentDailyFund: number;
  maxDailyFund: number;
  currentReferrals: number;
  className?: string;
}

export function VipLevelDetail({
  vipLevel,
  currentDailyFund,
  maxDailyFund,
  currentReferrals,
  className,
}: VipLevelDetailProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const { getRewardRatesForLevel, getAllReliefFundRates } = useVipInfo();

  // 获取当前 VIP 等级的奖励比例
  const rewardRates = getRewardRatesForLevel(vipLevel);

  // 获取最高 VIP 等级 (5) 的奖励比例作为最大值
  const maxRewardRates = getRewardRatesForLevel(5);

  // 获取扶贫基金比例
  const reliefFundRates = getAllReliefFundRates();

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-islamic-gold">我的VIP等级</h2>
        <Button
          variant="outline"
          className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold/10"
        >
          当前等级
        </Button>
      </div>

      <div className="bg-islamic-dark/80 backdrop-blur-sm rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-islamic-gold">
            VIP {vipLevel} 特权
          </h3>
        </div>

        {/* 每日扶贫资金 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium text-islamic-cream">
              每日扶贫资金
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                  >
                    <Info className="h-4 w-4 text-islamic-cream/70" />
                    <span className="sr-only">扶贫资金说明</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-islamic-medium border-islamic-gold text-islamic-cream max-w-xs">
                  <p>
                    每日扶贫资金是根据您的VIP等级和推荐人数计算的每日返还金额。
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-islamic-medium/30 rounded-lg p-4">
            <div className="flex items-end">
              <span className="text-3xl font-bold text-[#8bc34a]">
                {currentDailyFund}
              </span>
              <span className="text-lg text-[#8bc34a] ml-1 mr-2 flex items-baseline">
                <span className="text-xs">USD</span>
              </span>
            </div>
            <p className="text-xs text-islamic-cream/60 mt-2">
              根据推荐人数调整
            </p>
          </div>
        </div>

        {/* 回馈奖励 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium text-islamic-cream">回馈奖励</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                  >
                    <Info className="h-4 w-4 text-islamic-cream/70" />
                    <span className="sr-only">回馈奖励说明</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-islamic-medium border-islamic-gold text-islamic-cream max-w-xs">
                  <p>
                    回馈奖励是您推荐他人捐赠时获得的奖励比例，不同代数有不同比例。
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-islamic-medium/30 rounded-lg p-4">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <p className="text-sm text-islamic-cream/70 mb-2">总奖励比例</p>
                <p className="text-3xl font-bold text-[#8bc34a]">
                  {rewardRates.total}%
                </p>
                <p className="text-xs text-islamic-cream/60 mt-1">
                  最高可达 {maxRewardRates.total}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 扶贫资金比例 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium text-islamic-cream">
              扶贫资金比例
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                  >
                    <Info className="h-4 w-4 text-islamic-cream/70" />
                    <span className="sr-only">扶贫资金比例说明</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-islamic-medium border-islamic-gold text-islamic-cream max-w-xs">
                  <p>
                    扶贫资金比例是根据您推荐的人数计算的每日返还比例，推荐人数越多，比例越高。
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-islamic-medium/30 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-islamic-cream/70">无推荐</p>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#8bc34a]">
                    {reliefFundRates.noReferral}%
                  </p>
                  <p className="text-xs text-islamic-cream/60">
                    / {reliefFundRates.referral5}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-islamic-cream/70">推荐1人</p>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#8bc34a]">
                    {reliefFundRates.referral1}%
                  </p>
                  <p className="text-xs text-islamic-cream/60">
                    / {reliefFundRates.referral5}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-islamic-cream/70">推荐3人</p>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#8bc34a]">
                    {reliefFundRates.referral3}%
                  </p>
                  <p className="text-xs text-islamic-cream/60">
                    / {reliefFundRates.referral5}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-islamic-cream/70">推荐5人</p>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#8bc34a]">
                    {reliefFundRates.referral5}%
                  </p>
                  <p className="text-xs text-islamic-cream/60">
                    / {reliefFundRates.referral5}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详细说明弹窗 */}
      <Popover open={showExplanation} onOpenChange={setShowExplanation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-islamic-gold text-islamic-gold hover:bg-islamic-gold/10"
          >
            查看详细说明
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-islamic-medium border-islamic-gold text-islamic-cream">
          <div className="space-y-4">
            <h4 className="font-medium text-islamic-gold">VIP等级说明</h4>
            <p className="text-sm">
              VIP等级越高，您获得的每日扶贫资金和回馈奖励比例越高。
            </p>

            <h4 className="font-medium text-islamic-gold">每日扶贫资金</h4>
            <p className="text-sm">
              每日扶贫资金是您每天可以获得的返还金额，金额大小取决于您的VIP等级和推荐人数。
            </p>

            <h4 className="font-medium text-islamic-gold">回馈奖励</h4>
            <p className="text-sm">
              当您推荐他人捐赠时，您可以获得相应比例的奖励。1代是您直接推荐的人，2代是您推荐的人再推荐的人，以此类推。
            </p>

            <h4 className="font-medium text-islamic-gold">扶贫资金比例</h4>
            <p className="text-sm">
              扶贫资金比例是根据您推荐的人数计算的每日返还比例，推荐人数越多，比例越高。
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
