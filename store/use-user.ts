"use client"

import { useStore } from "./store-context"
import { useAuth } from "./use-auth"
import { useCallback, useEffect, useState } from "react"

export function useUser() {
  const { state, dispatch } = useStore()
  const { user, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)
  
  // 检测客户端挂载
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync auth user data with user data when authenticated (only on client)
  useEffect(() => {
    if (mounted && isAuthenticated && user) {
      // Update user data based on auth user when authenticated
      dispatch({
        type: "UPDATE_USER",
        payload: {
          id: user.id,
          username: user.username,
          vipLevel: user.vipLevel || 0,
          totalDonation: user.donateAmount ? parseFloat(user.donateAmount) : 0,
          referrals: user.referrals || 0,
        },
      })
    }
  }, [mounted, isAuthenticated, user, dispatch])

  const updateUser = useCallback(
    (userData: Partial<typeof state.user>) => {
      dispatch({ type: "UPDATE_USER", payload: userData })
    },
    [dispatch],
  )

  return {
    userData: state.user,
    updateUser,
  }
}
