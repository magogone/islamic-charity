'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import ContextProvider from '@/context'
import type { ReactNode } from 'react'

// Create a context to track client-side mounting
export const MountedContext = createContext<boolean>(false)

// Hook to check if client-side mounting is complete
export function useIsMounted() {
  return useContext(MountedContext)
}

export function ClientProviders({ children }: { children: ReactNode }) {
  const [cookies, setCookies] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get the cookies from the document on the client side
    setCookies(document.cookie)
    setMounted(true)
  }, [])

  // On server, return a placeholder with the MountedContext provider
  if (!mounted) {
    return (
      <MountedContext.Provider value={false}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </MountedContext.Provider>
    )
  }

  // On client, return the full ContextProvider with MountedContext
  return (
    <MountedContext.Provider value={true}>
      <ContextProvider cookies={cookies}>
        {children}
      </ContextProvider>
    </MountedContext.Provider>
  )
} 
