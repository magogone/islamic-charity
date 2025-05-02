"use client"
import Link from "next/link"
import { Home, Users, User } from "lucide-react"
import { DonationOverview } from "@/components/donation-overview"
import { VipBenefitsCard } from "@/components/vip-benefits-card"
import { HeartPlusIcon } from "@/components/heart-plus-icon"

export default function DonationPage() {
  // 示例数据
  const donationData = {
    totalDonation: 100,
    vipLevel: 1,
    dailyFunds: {
      current: 1.2,
      max: 3,
    },
    referrals: 3,
    periodProgress: 65,
    startDate: "2023-03-31",
    remainingDays: 14,
    endDate: "2023-05-10",
    currentRate: 1.2,
    totalAccumulated: 120,
    maxRate: 2.5,
    totalExpectedReward: 120,
    totalMaxReward: 180,
    withdrawnAmount: 50,
    withdrawableAmount: 30,
  }

  return (
    <div className="min-h-screen bg-islamic-dark text-white pb-16">
      {/* 主要内容 */}
      <div className="container max-w-md mx-auto px-4 py-6">
        <DonationOverview data={donationData} />

        <div className="mt-4">
          <VipBenefitsCard
            currentLevel={1}
            nextLevel={2}
            requiredAmount={300}
            currentAmount={100}
            benefits={["每日获得更高的扶贫资金", "提高推荐奖励比例", "专属VIP客服支持", "优先参与特别活动"]}
          />
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-islamic-dark border-t border-islamic-medium/30 py-2">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-around">
            <Link
              href="/"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">首页</span>
            </Link>
            <Link href="/donation" className="flex flex-col items-center text-islamic-gold transition-colors">
              <HeartPlusIcon className="h-6 w-6" />
              <span className="text-xs mt-1">捐赠</span>
            </Link>
            <Link
              href="/promotion"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">邀请</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">我的</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
