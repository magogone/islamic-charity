"use client";

import { useState } from "react";
import { InfoIcon, Users } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RewardInfoCardsProps {
  basicReward: {
    current: number;
    max: number;
    totalEarned?: number;
  };
  referralReward: {
    current: {
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
      total: number;
    };
    max: {
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
      total: number;
    };
    totalEarned?: number;
  };
  className?: string;
}

export function RewardInfoCards({
  basicReward,
  referralReward,
  className = "",
}: RewardInfoCardsProps) {
  const { t } = useTranslation();
  const [basicInfoOpen, setBasicInfoOpen] = useState(false);
  const [referralInfoOpen, setReferralInfoOpen] = useState(false);

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {/* 基础奖励卡片 */}
        <Card className="overflow-hidden border-none shadow-md bg-islamic-medium/70 backdrop-blur-sm text-white p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-islamic-gold mr-2" />
              <span className="text-sm text-islamic-gold">
                {t("invitation.basicRewards")}
              </span>
            </div>
            {basicReward.totalEarned !== undefined && (
              <span className="text-sm font-medium text-[#8dc63f] flex items-baseline">
                +{basicReward.totalEarned}
                <span className="text-xs ml-1">USD</span>
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-islamic-cream/70">
                当前奖励比例
              </span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-islamic-gold">
                  {basicReward.current}%
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setBasicInfoOpen(true)}
                        className="ml-1 p-0.5 rounded-full hover:bg-islamic-dark/50 transition-colors"
                      >
                        <InfoIcon className="h-3 w-3 text-islamic-cream/70" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>查看基础奖励详情</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-islamic-cream/70">
                最高奖励比例
              </span>
              <span className="text-sm font-medium text-islamic-gold/80">
                {basicReward.max}%
              </span>
            </div>
          </div>
        </Card>

        {/* 回馈奖励卡片 */}
        <Card className="overflow-hidden border-none shadow-md bg-islamic-medium/70 backdrop-blur-sm text-white p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-islamic-gold mr-2" />
              <span className="text-sm text-islamic-gold">回馈奖励</span>
            </div>
            {referralReward.totalEarned !== undefined && (
              <span className="text-sm font-medium text-[#8dc63f] flex items-baseline">
                +{referralReward.totalEarned}
                <span className="text-xs ml-1">USD</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-islamic-cream/70">总奖励比例</span>
            <div className="flex items-center">
              <span className="text-lg font-bold text-islamic-gold">
                {referralReward.current.total}%
              </span>
              <span className="text-xs text-islamic-cream/60 ml-1">
                / {referralReward.max.total}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setReferralInfoOpen(true)}
                      className="ml-1 p-0.5 rounded-full hover:bg-islamic-dark/50 transition-colors"
                    >
                      <InfoIcon className="h-3 w-3 text-islamic-cream/70" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>查看回馈奖励详情</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>
      </div>

      {/* 基础奖励详情弹窗 */}
      <Dialog open={basicInfoOpen} onOpenChange={setBasicInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <Users className="mr-2 h-5 w-5" />
              基础奖励详情
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">
              了解更多关于基础奖励的信息
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold">
                奖励比例说明
              </h3>
              <p className="text-xs text-islamic-cream/80">
                基础奖励是根据您的捐赠金额和VIP等级计算的，随着您的VIP等级提升，基础奖励比例也会相应提高。
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">布拉克</span>
                  <span className="font-medium">1%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">巴达尔</span>
                  <span className="font-medium">1.2%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">蒙塔哈</span>
                  <span className="font-medium">1.5%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">米尔贾</span>
                  <span className="font-medium">1.8%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">至善</span>
                  <span className="font-medium">2.5%</span>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                提升VIP等级可以获得更高的基础奖励比例，同时解锁更多特权。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 回馈奖励详情弹窗 */}
      <Dialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <Users className="mr-2 h-5 w-5" />
              回馈奖励详情
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">
              了解更多关于回馈奖励的信息
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold">
                推荐层级说明
              </h3>
              <p className="text-xs text-islamic-cream/80">
                回馈奖励是根据您推荐的好友（1代）、好友推荐的好友（2代）以及更深层级的推荐（3-5代）计算的。
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">1代推荐（直接推荐）</span>
                  <span className="font-medium">10%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">2代推荐</span>
                  <span className="font-medium">4%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">3-5代推荐</span>
                  <span className="font-medium">2%</span>
                </div>
              </div>

              <h3 className="text-sm font-medium text-islamic-gold mt-4">
                VIP等级加成
              </h3>
              <p className="text-xs text-islamic-cream/80">
                随着您的VIP等级提升，回馈奖励比例也会相应提高，最高可达：
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">至善 - 1代推荐</span>
                  <span className="font-medium">15%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">至善 - 2代推荐</span>
                  <span className="font-medium">6%</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <span className="text-sm">至善 - 3-5代推荐</span>
                  <span className="font-medium">3%</span>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                推荐更多好友参与捐赠，不仅可以获得更多奖励，还能提升您的基础奖励比例。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
