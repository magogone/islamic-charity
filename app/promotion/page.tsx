"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvitationCard } from "@/components/invitation-card"
import { MainLayout } from "@/components/main-layout"
import { useInvitation } from "@/store/use-invitation"

export default function PromotionPage() {
  const { invitationData } = useInvitation()

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
