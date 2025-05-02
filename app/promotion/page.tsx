"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvitationCard } from "@/components/invitation-card"
import { MainLayout } from "@/components/main-layout"

export default function PromotionPage() {
  // Corrected sample data to match the expected data structure for InvitationCard component
  const invitationData = {
    totalReferrals: 5,
    directReferrals: 2,
    indirectReferrals: 3,
    totalRewards: 25,
    rewardRate: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    basicReward: {
      current: 1.5,
      max: 2.5,
    },
    maxReferralReward: {
      level1: 15,
      level2: 5,
      level3: 3,
      level4: 3,
      level5: 4,
      total: 30,
    },
  }

  const rightIcon = (
    <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
      <Share2 className="h-5 w-5 text-islamic-gold" />
      <span className="sr-only">Invitations</span>
    </Button>
  )

  return (
    <MainLayout title="Invite Friends" currentPath="/promotion" rightIcon={rightIcon}>
      {/* Invitation Card */}
      <InvitationCard data={invitationData} />
    </MainLayout>
  )
}
