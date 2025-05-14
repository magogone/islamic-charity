"use client"

import { useCallback, useEffect, useState } from "react"
import { useStore } from "./store-context"
import { getUserTeamInfo } from "@/lib/api"
import { useAuth } from "./use-auth"

export function useTeam() {  
  const { state, dispatch } = useStore()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 初始化和刷新团队信息
  const fetchTeamInfo = useCallback(async () => {    
    if (!isAuthenticated) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await getUserTeamInfo()
      
      if (response.success && response.data) {
        // 更新store中的团队信息
        dispatch({
          type: "UPDATE_TEAM",
          payload: {
            directReferrals: response.data.direct_invite_count,
            totalReferrals: response.data.total_invite_count,
            teamTotalDonations: parseInt(response.data.invitee_donate_amount) || 0,
            totalRewards: parseInt(response.data.total_reward) || 0
          }
        })
      } else if (response.error) {
        setError(response.error.message)
      }
    } catch (error) {
      console.error("[useTeam] Team info fetch exception:", error);
      setError("Failed to load team information")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, dispatch])
  
  // 当用户认证状态改变时获取团队信息
  useEffect(() => {
    if (isAuthenticated) {
      fetchTeamInfo()
    }
  }, [isAuthenticated, fetchTeamInfo])
  
  return {
    teamData: state.invitation,
    loading,
    error,
    refreshTeamInfo: fetchTeamInfo
  }
} 
