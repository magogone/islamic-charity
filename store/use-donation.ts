"use client"

import { useStore } from "./store-context"

export function useDonation() {
  const { state, dispatch } = useStore()

  const updateDonation = (donationData: Partial<typeof state.donation>) => {
    const updatedData = {
      ...donationData,
      lastUpdated: Date.now()
    }
    
    dispatch({ type: "UPDATE_DONATION", payload: updatedData })
  }

  return {
    donationData: state.donation,
    updateDonation,
  }
}
