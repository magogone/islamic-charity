"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VipBenefitsCardProps {
  vipLevel: number
  className?: string
}

export function VipBenefitsCard({ vipLevel, className }: VipBenefitsCardProps) {
  // VIP等级对应的每日扶贫资金范围
  const dailyFundRanges = {
    1: "1.2-3 U",
    2: "3.6-9 U",
    3: "6-15 U",
    4: "9.6-24 U",
    5: "14.4-36 U",
  }

  // VIP等级对应的一代奖励比例
  const firstGenRewards = {
    1: "10%",
    2: "12%",
    3: "14%",
    4: "16%",
    5: "20%",
  }

  // VIP等级对应的总奖励比例
  const totalRewards = {
    1: "20%",
    2: "22%",
    3: "24%",
    4: "26%",
    5: "30%",
  }

  return (
    <Card className={cn("border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-islamic-gold">VIP {vipLevel} 特权</CardTitle>
          <Badge variant="outline" className="border-islamic-gold text-islamic-gold">
            当前等级
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">每日扶贫资金</h4>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[#8dc63f]">{dailyFundRanges[vipLevel]}</span>
              <span className="text-xs text-islamic-cream/70 ml-2">根据推荐人数调整</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">推荐奖励</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">1代</span>
                <span className="text-[#8dc63f] font-medium mt-1">{firstGenRewards[vipLevel]}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">2代</span>
                <span className="text-[#8dc63f] font-medium mt-1">4%</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-islamic-cream/70">3-5代</span>
                <span className="text-[#8dc63f] font-medium mt-1">2%</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-right">
              <span className="text-islamic-cream/70">总奖励比例: </span>
              <span className="text-[#8dc63f] font-medium">{totalRewards[vipLevel]}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">扶贫资金比例</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">无推荐</span>
                <span className="text-xs text-[#8dc63f] font-medium">1%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">推荐1人</span>
                <span className="text-xs text-[#8dc63f] font-medium">1.5%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">推荐3人</span>
                <span className="text-xs text-[#8dc63f] font-medium">2%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">推荐5人</span>
                <span className="text-xs text-[#8dc63f] font-medium">2.5%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
