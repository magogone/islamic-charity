"use client";

import { useEffect, useState, createContext, useContext } from "react";
import ContextProvider from "@/context";
import type { ReactNode } from "react";

// Create a context to track client-side mounting
export const MountedContext = createContext<boolean>(false);

// Hook to check if client-side mounting is complete
export function useIsMounted() {
  return useContext(MountedContext);
}

export function ClientProviders({ children }: { children: ReactNode }) {
  const [cookies, setCookies] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get the cookies from the document on the client side
      setCookies(document.cookie);
      setMounted(true);
      console.log("ClientProviders mounted successfully");
    } catch (err) {
      console.error("Error in ClientProviders:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      // Still set mounted to true to avoid infinite loading
      setMounted(true);
    }
  }, []);

  // On server, return a loading state
  if (!mounted) {
    return (
      <MountedContext.Provider value={false}>
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4b96e] mx-auto mb-4"></div>
            <p className="text-[#d4b96e]">加载中...</p>
          </div>
        </div>
      </MountedContext.Provider>
    );
  }

  // If there's an error, show error page but still allow access
  if (error) {
    console.warn("ClientProviders error (non-blocking):", error);
    return (
      <MountedContext.Provider value={true}>{children}</MountedContext.Provider>
    );
  }

  // On client, return the full ContextProvider with MountedContext
  return (
    <MountedContext.Provider value={true}>
      <ContextProvider cookies={cookies}>{children}</ContextProvider>
    </MountedContext.Provider>
  );
}
