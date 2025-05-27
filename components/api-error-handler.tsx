"use client"

import React, { ReactNode, useEffect } from 'react'
import { useToast } from './ui/toast'

interface ApiErrorHandlerProps {
  children: ReactNode
}

/**
 * A global error handler for API responses
 * Subscribes to custom error events emitted when API calls fail
 */
export function ApiErrorHandler({ children }: ApiErrorHandlerProps) {
  const { error: showError, ToastContainer } = useToast()
  
  useEffect(() => {
    // Custom event listener for API errors
    const handleApiError = (event: CustomEvent<{code: number, message: string}>) => {
      const { message } = event.detail
      showError(message)
    }
    
    // TypeScript requires this cast since CustomEvent with generics isn't directly supported
    window.addEventListener('api-error' as any, handleApiError as EventListener)
    
    return () => {
      window.removeEventListener('api-error' as any, handleApiError as EventListener)
    }
  }, [showError])
  
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

/**
 * Helper function to emit an API error event that will be caught by the ApiErrorHandler
 */
export function emitApiError(code: number, message: string) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('api-error', {
      detail: { code, message }
    })
    window.dispatchEvent(event)
  }
} 
