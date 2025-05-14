import type React from "react"
import "@/app/globals.css"
import { Inter, Playfair_Display } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { StoreProvider } from "@/store/store-context"
import { AuthProvider } from "@/store/auth-context"
import { ApiErrorHandler } from "@/components/api-error-handler"
import { VipSettingsInitializer } from "@/components/vip-settings-initializer"
import { DailyRewardInitializer } from "@/components/daily-reward-initializer"
import { AuthSessionChecker } from "@/components/auth-session-checker"
import { SessionRefreshChecker } from "@/components/session-refresh-checker"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata = {
  title: "Barkat Alliance Foundation - Islamic Charity",
  description: "Innovative Charity Model: Divine Mission",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <StoreProvider>
            <AuthProvider>
              <ApiErrorHandler>
                <VipSettingsInitializer />
                <DailyRewardInitializer />
                <AuthSessionChecker />
                <SessionRefreshChecker />
                {children}
              </ApiErrorHandler>
            </AuthProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
