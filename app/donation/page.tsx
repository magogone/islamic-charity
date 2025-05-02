"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DonationOverview } from "@/components/donation-overview"
import { VipBenefitsCard } from "@/components/vip-benefits-card"
import { VipPaymentInfo } from "@/components/vip-payment-info"
import { MainLayout } from "@/components/main-layout"
import { useDonation } from "@/store/use-donation"
import { useUser } from "@/store/use-user"
import { useVipInfo } from "@/store/use-vip-info"

export default function DonationPage() {
  const { donationData } = useDonation()
  const { userData } = useUser()
  const { getVipLevelDonationAmount } = useVipInfo()

  // Create safe userData with default values
  const safeUserData = {
    vipLevel: userData?.vipLevel ?? 1,
    totalDonation: userData?.totalDonation ?? 0,
  }

  // 获取下一级 VIP 的金额
  const nextVipLevel = Math.min(safeUserData.vipLevel + 1, 5)
  const nextVipAmount = getVipLevelDonationAmount(nextVipLevel)

  const rightIcon = (
    <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
      <Heart className="h-5 w-5 text-islamic-gold" />
      <span className="sr-only">Donation</span>
    </Button>
  )

  return (
    <MainLayout title="Donate" currentPath="/donation">
      <DonationOverview data={donationData} />

      <div className="mt-4 space-y-4">
        <VipBenefitsCard vipLevel={safeUserData.vipLevel} />

        {/* 添加VIP支付信息组件 */}
        <VipPaymentInfo />
      </div>
    </MainLayout>
  )
}
