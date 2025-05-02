"use client"

import { useStore } from "./store-context"

export function useUser() {
  const { state, dispatch } = useStore()

  const updateUser = (userData: Partial<typeof state.user>) => {
    dispatch({ type: "UPDATE_USER", payload: userData })
  }

  return {
    userData: state.user,
    updateUser,
  }
}
