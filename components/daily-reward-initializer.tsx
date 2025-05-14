"use client"

import { useDailyRewardRates } from "@/hooks/use-daily-reward-rates"
import { useEffect, useState } from "react"

/**
 * This component doesn't render any UI and is only used to initialize
 * daily reward rates when the application starts
 */
export function DailyRewardInitializer() {
  const { loading } = useDailyRewardRates()
  const [initialized, setInitialized] = useState(false)
  
  // Track initialization state
  useEffect(() => {
    if (!loading && !initialized) {
      setInitialized(true)
    }
  }, [loading, initialized])
  
  // Don't render any content
  return null
} 
