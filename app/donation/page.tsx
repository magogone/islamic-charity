"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DonationOverview } from "@/components/donation-overview"
import { VipBenefitsCard } from "@/components/vip-benefits-card"
import { MainLayout } from "@/components/main-layout"

export default function DonationPage() {
  // Sample data
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

  const rightIcon = (
    <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
      <Heart className="h-5 w-5 text-islamic-gold" />
      <span className="sr-only">Donation</span>
    </Button>
  )

  return (
    <MainLayout title="Donate" currentPath="/donation" rightIcon={rightIcon}>
      <DonationOverview data={donationData} />

      <div className="mt-4">
        <VipBenefitsCard
          currentLevel={1}
          nextLevel={2}
          requiredAmount={300}
          currentAmount={100}
          benefits={[
            "Receive higher daily poverty relief funds",
            "Increased referral reward rates",
            "Exclusive VIP customer support",
            "Priority access to special events",
          ]}
        />
      </div>
    </MainLayout>
  )
}
