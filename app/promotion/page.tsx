"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvitationCard } from "@/components/invitation-card"
import { MainLayout } from "@/components/main-layout"
import { useTeamInfo } from "@/hooks/use-team-info"
import { useEffect } from "react"
import { useAuth } from "@/store/use-auth"

export default function PromotionPage() {
  const { teamInfo, loading, refresh } = useTeamInfo()
  const { isAuthenticated } = useAuth()

  // Refresh team info when the page loads or authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      refresh()
    }
  }, [refresh, isAuthenticated])

  return (
    <MainLayout title="Invite Friends" currentPath="/promotion">
      {/* Invitation Card */}
      <InvitationCard 
        data={teamInfo} 
        isLoading={loading} 
        refresh={refresh}
      />
    </MainLayout>
  )
}
