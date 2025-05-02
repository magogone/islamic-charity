"use client"

import { useStore } from "./store-context"

export function useInvitation() {
  const { state, dispatch } = useStore()

  const updateInvitation = (invitationData: Partial<typeof state.invitation>) => {
    dispatch({ type: "UPDATE_INVITATION", payload: invitationData })
  }

  return {
    invitationData: state.invitation,
    updateInvitation,
  }
}
