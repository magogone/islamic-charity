"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DonationOverview } from "@/components/donation-overview"
import { VipBenefitsCard } from "@/components/vip-benefits-card"
import { MainLayout } from "@/components/main-layout"
import { useDonation } from "@/store/use-donation"
import { useUser } from "@/store/use-user"

export default function DonationPage() {
  const { donationData } = useDonation()
  const { userData } = useUser()

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
          currentLevel={userData.vipLevel}
          nextLevel={userData.vipLevel + 1}
          requiredAmount={300}
          currentAmount={userData.totalDonation}
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
