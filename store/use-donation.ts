"use client"

import { useStore } from "./store-context"

export function useDonation() {
  const { state, dispatch } = useStore()

  const updateDonation = (donationData: Partial<typeof state.donation>) => {
    dispatch({ type: "UPDATE_DONATION", payload: donationData })
  }

  return {
    donationData: state.donation,
    updateDonation,
  }
}
