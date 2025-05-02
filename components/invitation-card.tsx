"use client"

import { Share2, Users, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

export interface InvitationCardProps {
  data: {
    totalReferrals: number
    directReferrals: number
    indirectReferrals: number
    totalRewards: number
    rewardRate: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
    basicReward: {
      current: number
      max: number
    }
    maxReferralReward: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
  }
  className?: string
}

export function InvitationCard({ data, className = "" }: InvitationCardProps) {
  const [basicInfoOpen, setBasicInfoOpen] = useState(false)
  const [referralInfoOpen, setReferralInfoOpen] = useState(false)

  const handleShare = () => {
    // 这里可以实现分享逻辑，例如打开分享对话框
    console.log("分享邀请链接")
  }

  // 根据直推人数获取对应的奖励率样式
  const getRateClass = (referrals: number) => {
    if (data.directReferrals >= referrals) {
      return "border-islamic-gold/50 bg-islamic-gold/10 text-islamic-gold"
    }
    return "border-islamic-medium/50 bg-islamic-medium/30 text-islamic-cream/90"
  }

  return (
    <Card
      className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8dc63f] to-[#8dc63f]/50"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl text-[#8dc63f]">
          <Share2 className="mr-2 h-5 w-5" />
          邀请好友
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {/* 邀请统计 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center">
            <span className="text-xs text-islamic-cream/70 mb-1">总推荐人数</span>
            <span className="text-xl font-medium text-[#8dc63f]">{data.totalReferrals}</span>
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center">
            <span className="text-xs text-islamic-cream/70 mb-1">直接推荐</span>
            <span className="text-xl font-medium text-[#8dc63f]">{data.directReferrals}</span>
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center">
            <span className="text-xs text-islamic-cream/70 mb-1">间接推荐</span>
            <span className="text-xl font-medium text-[#8dc63f]">{data.indirectReferrals}</span>
          </div>
        </div>

        {/* 奖励信息卡片 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* 基础奖励卡片 */}
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center mb-3">
              <Users className="h-4 w-4 text-islamic-gold mr-2" />
              <span className="text-sm text-islamic-gold">基础奖励</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-islamic-cream/70">当前奖励比例</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-islamic-gold">{data.basicReward.current}%</span>
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
                <span className="text-xs text-islamic-cream/70">最高奖励比例</span>
                <span className="text-sm font-medium text-islamic-gold/80">{data.basicReward.max}%</span>
              </div>
            </div>
          </div>

          {/* 推荐奖励卡片 */}
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 text-islamic-gold mr-2" />
              <span className="text-sm text-islamic-gold">推荐奖励</span>
            </div>

            <div className="grid grid-cols-5 gap-1 mb-2">
              <div className="text-center">
                <div className="text-xs text-islamic-cream/70">1代</div>
                <div className="text-sm font-medium text-islamic-gold">{data.rewardRate.level1}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-islamic-cream/70">2代</div>
                <div className="text-sm font-medium text-islamic-gold">{data.rewardRate.level2}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-islamic-cream/70">3代</div>
                <div className="text-sm font-medium text-islamic-gold">{data.rewardRate.level3}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-islamic-cream/70">4代</div>
                <div className="text-sm font-medium text-islamic-gold">{data.rewardRate.level4}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-islamic-cream/70">5代</div>
                <div className="text-sm font-medium text-islamic-gold">{data.rewardRate.level5}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-islamic-cream/70">总计</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-islamic-gold">{data.rewardRate.total}%</span>
                <span className="text-xs text-islamic-cream/60 ml-1">/ {data.maxReferralReward.total}%</span>
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
                      <p>查看推荐奖励详情</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* 邀请提示 */}
        <div className="p-3 rounded-lg bg-[#8dc63f]/20 border border-[#8dc63f]/30 text-xs text-islamic-cream/90">
          <p>邀请好友参与捐赠，最高获得好友捐赠金额的30%作为奖励，同时提高您的每日基础捐赠奖励率！</p>
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4">
        <Link href="/promotion/share" className="w-full">
          <Button className="w-full bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c]">
            立即邀请
            <Share2 className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>

      {/* 基础奖励详情弹窗 */}
      <Dialog open={basicInfoOpen} onOpenChange={setBasicInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <Users className="mr-2 h-5 w-5" />
              基础奖励详情
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">了解更多关于基础奖励的信息</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                扶贫资金比例
              </h3>
              <p className="text-xs text-islamic-cream/80">根据您推荐的人数，您的扶贫资金比例会相应提高：</p>

              <div className="space-y-2">
                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(0)}`}>
                  <span className="text-sm">无推荐</span>
                  <span className="font-medium">1%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(1)}`}>
                  <span className="text-sm">推荐1人</span>
                  <span className="font-medium">1.5%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(3)}`}>
                  <span className="text-sm">推荐3人</span>
                  <span className="font-medium">2%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(5)}`}>
                  <span className="text-sm">推荐5人</span>
                  <span className="font-medium">2.5%</span>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                您当前已推荐 {data.directReferrals} 人，扶贫资金比例为{" "}
                {data.directReferrals === 0
                  ? "1%"
                  : data.directReferrals >= 5
                    ? "2.5%"
                    : data.directReferrals >= 3
                      ? "2%"
                      : "1.5%"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 推荐奖励详情弹窗 */}
      <Dialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <Users className="mr-2 h-5 w-5" />
              推荐奖励详情
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">了解更多关于推荐奖励的信息</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold">推荐奖励详情</h3>
              <p className="text-xs text-islamic-cream/80">
                推荐5代，获得捐赠资金总共30%的扶贫奖励。随着您的VIP等级提升，推荐奖励比例也会相应提高。
              </p>

              <div className="space-y-2">
                <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">VIP 1</span>
                    <span className="font-medium text-islamic-gold">总计 20%</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center">
                      <div className="text-islamic-cream/70">1代</div>
                      <div className="font-medium">10%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">2代</div>
                      <div className="font-medium">4%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">3代</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">4代</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">5代</div>
                      <div className="font-medium">2%</div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">VIP 5</span>
                    <span className="font-medium text-islamic-gold">总计 30%</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center">
                      <div className="text-islamic-cream/70">1代</div>
                      <div className="font-medium">20%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">2代</div>
                      <div className="font-medium">4%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">3代</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">4代</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">5代</div>
                      <div className="font-medium">2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                推荐更多好友参与捐赠，不仅可以获得更多奖励，还能提升您的基础奖励比例。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
