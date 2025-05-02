"use client"

import { useStore } from "./store-context"
import { useAuth } from "./use-auth"
import { useCallback, useEffect } from "react"

export function useUser() {
  const { state, dispatch } = useStore()
  const { user, isAuthenticated } = useAuth()

  // Sync auth user data with user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Update user data based on auth user when authenticated
      dispatch({
        type: "UPDATE_USER",
        payload: {
          username: user.username,
          // Keep other user data like vipLevel, totalDonation, etc.
        },
      })
    }
  }, [isAuthenticated, user, dispatch])

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
