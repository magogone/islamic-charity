"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvitationCard } from "@/components/invitation-card"
import { MainLayout } from "@/components/main-layout"
import { useTeamInfo } from "@/hooks/use-team-info"
import { useEffect } from "react"
import { useAuth } from "@/store/use-auth"
import { useTranslation } from "@/lib/i18n"

export default function PromotionPage() {
  const { t } = useTranslation()
  const { teamInfo, loading, refresh } = useTeamInfo()
  const { isAuthenticated } = useAuth()

  // Refresh team info when the page loads or authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      refresh()
    }
  }, [refresh, isAuthenticated])

  return (
    <MainLayout title={t('invitation.inviteFriends')} currentPath="/promotion">
      {/* Invitation Card */}
      <InvitationCard 
        data={teamInfo} 
        isLoading={loading} 
        refresh={refresh}
      />
    </MainLayout>
  )
}
