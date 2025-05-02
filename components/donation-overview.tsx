"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowUp,
  Calendar,
  Heart,
  TrendingUp,
  DollarSign,
  Wallet,
  Users2,
  InfoIcon as InfoCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentDialog } from "./payment-dialog"
import { VipLevelProgress } from "./vip-level-progress"
import { ReferralInfoDialog } from "./referral-info-dialog"
import { RewardPeriodChart } from "./reward-period-chart"
import { RewardSummaryChart } from "./reward-summary-chart"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface DonationOverviewProps {
  data: {
    totalDonation: number
    vipLevel: number
    dailyFunds: {
      current: number
      max: number
    }
    referrals: number
    periodProgress: number
    startDate: string
    remainingDays: number
    endDate: string
    currentRate: number
    totalAccumulated: number
    maxRate: number
    totalExpectedReward: number
    totalMaxReward: number
    withdrawnAmount: number
    withdrawableAmount: number
    dailyRewards: Array<{
      date: string
      actual: number
      maximum: number
      distributed?: boolean
    }>
  }
  showButtons?: boolean
  className?: string
}

export function DonationOverview({ data, showButtons = true, className = "" }: DonationOverviewProps) {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [referralInfoOpen, setReferralInfoOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  // 确保周期至少为40天
  const ensureMinimumPeriod = () => {
    // 解析开始和结束日期
    const start = new Date(data.startDate)
    let end = new Date(data.endDate)

    // 计算当前周期的天数
    const currentDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    // 如果不足40天，延长结束日期
    if (currentDays < 40) {
      end = new Date(start)
      end.setDate(start.getDate() + 40)
      data.endDate = end.toISOString().split("T")[0]

      // 计算正确的剩余天数
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const remainingDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      data.remainingDays = Math.max(0, remainingDays) // 确保不会显示负数
    }

    return { start, end }
  }

  // 确保周期至少为40天
  const { start, end } = ensureMinimumPeriod()

  // 生成每日奖励数据（如果没有提供）
  const dailyRewardsData =
    data.dailyRewards || generateDefaultDailyRewards(start, end, data.dailyFunds.current, data.dailyFunds.max)

  // 收益汇总数据
  const summaryData = {
    expectedReward: data.totalExpectedReward || 120,
    maxReward: data.totalMaxReward || 180,
    withdrawnAmount: data.withdrawnAmount || 50,
    withdrawableAmount: data.withdrawableAmount || 30,
  }

  // 处理提取收益
  const handleWithdraw = () => {
    // 这里可以添加提取收益的逻辑
    setWithdrawOpen(true)
    console.log("提取收益", summaryData.withdrawableAmount)
  }

  const handleInfoClick = () => {
    setReferralInfoOpen(true)
  }

  return (
    <>
      <Card
        className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl text-islamic-gold">我的捐赠概览</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          {/* 捐赠金额和收益卡片 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-islamic-gold mr-2" />
                  <span className="text-xs text-islamic-cream/70">总捐赠金额</span>
                </div>
                <button
                  onClick={() => setPaymentOpen(true)}
                  className="w-7 h-7 rounded-sm bg-islamic-gold flex items-center justify-center hover:bg-islamic-gold/90 transition-colors"
                >
                  <ArrowUp className="h-5 w-5 text-islamic-dark" />
                </button>
              </div>
              <span className="text-2xl font-bold text-islamic-gold mb-3">{data.totalDonation} U</span>

              {/* 使用改进后的VIP等级指示器 */}
              <VipLevelProgress
                currentLevel={data.vipLevel}
                currentDonation={data.totalDonation}
                onUpgrade={() => setPaymentOpen(true)}
              />
            </div>

            {/* Right side - Donation Rewards */}
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-3.5 w-3.5 text-islamic-gold mr-1.5" />
                <span className="text-sm text-islamic-gold">捐赠奖励</span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 mt-1">
                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 text-islamic-gold/90 mr-1.5 mt-0.5" />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-islamic-gold/95">{data.dailyFunds.current}</span>
                    <span className="text-xs text-islamic-gold/90">USDT</span>
                    <span className="text-[10px] text-islamic-cream/60 mt-0.5">当前获得</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-islamic-gold/90 mr-1.5 mt-0.5" />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-islamic-gold/95">{data.dailyFunds.max}</span>
                    <span className="text-xs text-islamic-gold/90">USDT</span>
                    <span className="text-[10px] text-islamic-cream/60 mt-0.5">最大可得</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 text-islamic-gold/90 mr-1.5 mt-0.5" />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-islamic-gold/95">{data.currentRate}%</span>
                    <span className="text-[10px] text-islamic-cream/60 mt-0.5">当前比例</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-islamic-gold/90 mr-1.5 mt-0.5" />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-islamic-gold/95">{data.maxRate || 2.5}%</span>
                    <span className="text-[10px] text-islamic-cream/60 mt-0.5">最高比例</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-auto justify-center">
                <Users2 className="h-3 w-3 text-islamic-cream/60 mr-1" />
                <span className="text-[10px] text-islamic-cream/60">已推荐 {data.referrals} 人</span>
                <button
                  onClick={() => setReferralInfoOpen(true)}
                  className="ml-1 p-0.5 rounded-full hover:bg-islamic-medium/50 transition-colors"
                >
                  <InfoCircle className="h-2.5 w-2.5 text-islamic-cream/60" />
                </button>
              </div>
            </div>
          </div>

          {/* 奖励详情 - 堆叠柱状图 */}
          <div className="p-4 mb-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-sm font-medium">奖励详情</span>
              </div>
              <span className="text-sm font-medium">{data.periodProgress}%</span>
            </div>

            {/* 开始和结束日期 */}
            <div className="flex justify-between text-xs text-islamic-cream/70 mb-2">
              <span>
                开始: {new Date(data.startDate).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}
              </span>
              <span>
                结束: {new Date(data.endDate).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}
              </span>
            </div>

            {/* 堆叠柱状图 */}
            <RewardPeriodChart data={dailyRewardsData} />
          </div>

          {/* 收益汇总信息 - 水平堆叠条形图 */}
          <div className="p-4 mb-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-sm font-medium">收益汇总</span>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleWithdraw}
                      disabled={!summaryData.withdrawableAmount}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        summaryData.withdrawableAmount
                          ? "bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
                          : "bg-[#d4b96e]/40 text-[#1a0d2c]/50 cursor-not-allowed"
                      }`}
                    >
                      <Wallet className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>提取收益</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* 水平堆叠条形图 */}
            <RewardSummaryChart data={summaryData} onWithdraw={handleWithdraw} />
          </div>
        </CardContent>
        {showButtons && (
          <CardFooter className="pt-3 pb-4 flex gap-2">
            <Button
              className="w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
              onClick={() => setPaymentOpen(true)}
            >
              增加捐赠
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>

      <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} />
      <ReferralInfoDialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen} />
    </>
  )
}

// 生成默认的每日奖励数据
function generateDefaultDailyRewards(start: Date, end: Date, currentAmount: number, maxAmount: number) {
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const halfwayPoint = Math.floor(daysDiff / 2)

  const result = []
  for (let i = 0; i <= daysDiff; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    currentDate.setHours(0, 0, 0, 0)

    // 一半是已发放的，一半是未发放的
    const distributed = i <= halfwayPoint

    // 生成随机的实际奖励值（在最大值的70%-100%之间）
    const actualValue = maxAmount * (0.7 + Math.random() * 0.3)

    result.push({
      date: currentDate.toISOString().split("T")[0],
      actual: Number.parseFloat(actualValue.toFixed(2)),
      maximum: maxAmount,
      distributed: distributed, // 添加标志表示是否已发放
    })
  }

  return result
}
