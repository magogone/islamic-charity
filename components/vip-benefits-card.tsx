"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useVipInfo } from "@/store/use-vip-info"

interface VipBenefitsCardProps {
  vipLevel: number
  className?: string
}

export function VipBenefitsCard({ vipLevel, className }: VipBenefitsCardProps) {
  const { getDailyFundRangeForLevel, getRewardRatesForLevel, getAllReliefFundRates } = useVipInfo()

  // 获取当前 VIP 等级的每日扶贫资金范围
  const dailyFundRange = getDailyFundRangeForLevel(vipLevel || 1)

  // 获取当前 VIP 等级的奖励比例
  const rewardRates = getRewardRatesForLevel(vipLevel || 1)

  // 获取扶贫基金比例
  const reliefFundRates = getAllReliefFundRates()

  return (
    <Card className={cn("border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-islamic-gold">VIP {vipLevel || 1} Privileges</CardTitle>
          <Badge variant="outline" className="border-islamic-gold text-islamic-gold">
            Current Level
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">Daily Relief Funds</h4>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[#8dc63f]">{dailyFundRange}</span>
              <span className="text-xs text-islamic-cream/70 ml-2">Adjusted based on referrals</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">Referral Rewards</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">1st Gen</span>
                <span className="text-[#8dc63f] font-medium mt-1">{rewardRates.level1}%</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">2nd Gen</span>
                <span className="text-[#8dc63f] font-medium mt-1">{rewardRates.level2}%</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">3-5th Gen</span>
                <span className="text-[#8dc63f] font-medium mt-1">{rewardRates.level3}%</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-right">
              <span className="text-islamic-cream/70">Total Reward Rate: </span>
              <span className="text-[#8dc63f] font-medium">{rewardRates.total}%</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">Relief Fund Rate</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">No Referrals</span>
                <span className="text-xs text-[#8dc63f] font-medium">{reliefFundRates.noReferral}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">1 Referral</span>
                <span className="text-xs text-[#8dc63f] font-medium">{reliefFundRates.referral1}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">3 Referrals</span>
                <span className="text-xs text-[#8dc63f] font-medium">{reliefFundRates.referral3}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">5 Referrals</span>
                <span className="text-xs text-[#8dc63f] font-medium">{reliefFundRates.referral5}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
