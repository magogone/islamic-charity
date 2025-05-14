"use client"

import { useEffect, useState } from 'react'
import { getSetting } from '@/lib/settings'
import { useStore } from '@/store/store-context'

// Define the rate config interface
export interface RateConfig {
  rate: number
  minAmount: number
}

// Global variables to track initialization state
let isInitialized = false
let isInitializing = false
let initializationError: Error | null = null

/**
 * Hook to provide daily reward rates from settings
 * Fetches the rate_configs from daily_reward group
 */
export function useDailyRewardRates() {
  const { state, dispatch } = useStore()
  const [loading, setLoading] = useState(() => !isInitialized && !isInitializing)
  const [error, setError] = useState<Error | null>(initializationError)
  const [mounted, setMounted] = useState(false)
  
  // Set mounted status on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load rates from API - only if not already initialized or initializing
  useEffect(() => {
    if (mounted && !isInitialized && !isInitializing) {
      loadDailyRewardRates()
    } else if (mounted && isInitialized) {
      // If already initialized, just update local loading state
      setLoading(false)
    }
  }, [mounted])

  /**
   * Load daily reward rates from the API
   */
  async function loadDailyRewardRates() {
    // Skip if already initialized or if initialization is in progress
    if (isInitialized || isInitializing) {
      setLoading(false)
      if (initializationError) {
        setError(initializationError)
      }
      return
    }
    
    // Set global flag to prevent multiple calls
    isInitializing = true
    
    try {
      setLoading(true)
      setError(null)
      
      // Get rate configs from settings API
      const rateConfigsStr = await getSetting('rate_configs', 'daily_reward', '[]')
      const rateConfigs: RateConfig[] = JSON.parse(rateConfigsStr)
      
      // Validate data
      if (!rateConfigs.length) {
        throw new Error('Invalid daily reward rate configuration')
      }
      
      // Sort by minAmount
      rateConfigs.sort((a, b) => a.minAmount - b.minAmount)
      
      // Update store with new config
      dispatch({
        type: "UPDATE_VIP_INFO",
        payload: {
          reliefFundRates: {
            noReferral: rateConfigs[0]?.rate || 1,
            referral1: rateConfigs[1]?.rate || 1.5,
            referral3: rateConfigs[2]?.rate || 2,
            referral5: rateConfigs[3]?.rate || 2.5,
          }
        }
      })
      
      // Set global initialization success
      isInitialized = true
      initializationError = null
      setLoading(false)
    } catch (error) {
      console.error('Failed to load daily reward rates:', error)
      // Set global error state
      initializationError = error instanceof Error ? error : new Error('Unknown error')
      setError(initializationError)
      setLoading(false)
    } finally {
      // Reset initializing flag
      isInitializing = false
    }
  }
  
  /**
   * Get the current rate based on referral count
   */
  const getCurrentRate = (referrals: number): number => {
    const rates = state.vipInfo.reliefFundRates
    
    if (referrals >= 5) return rates.referral5
    if (referrals >= 3) return rates.referral3
    if (referrals >= 1) return rates.referral1
    return rates.noReferral
  }
  
  /**
   * Force refresh the rates, bypassing the initialization check
   */
  const forceRefresh = async () => {
    isInitialized = false
    isInitializing = false
    await loadDailyRewardRates()
  }
  
  return {
    rateConfigs: state.vipInfo.reliefFundRates,
    loading,
    error,
    refresh: forceRefresh,
    getCurrentRate
  }
} 
