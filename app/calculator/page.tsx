"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Home, PieChart, Share2, User } from "lucide-react"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState(1000)
  const [rate, setRate] = useState(1.5)
  const [days, setDays] = useState(30)
  const [returns, setReturns] = useState({ daily: 0, total: 0, final: 0 })

  useEffect(() => {
    const dailyReturn = investmentAmount * (rate / 100)
    const totalReturn = dailyReturn * days
    const finalAmount = investmentAmount + totalReturn

    setReturns({
      daily: dailyReturn,
      total: totalReturn,
      final: finalAmount,
    })
  }, [investmentAmount, rate, days])

  return (
    <BackgroundWrapper>
      <header className="px-4 py-3 border-b flex items-center bg-[#f8f6f0]/80 dark:bg-[#0c1118]/80 backdrop-blur-sm relative z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 text-[#0a3d2b] dark:text-[#d4b96e]">Return Calculator</h1>
      </header>

      <main className="flex-1 p-4 pb-16 relative z-10">
        <Card className="border-[#d4b96e]/20 bg-white/90 dark:bg-[#131b29]/90 backdrop-blur-sm">
          {/* Calculator content */}
        </Card>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#d4b96e]/30 bg-[#f8f6f0]/95 dark:bg-[#0c1118]/95 backdrop-blur-sm z-20">
        <nav className="flex justify-around py-3 max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center py-2 text-muted-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/investment" className="flex flex-col items-center py-2 text-muted-foreground">
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Invest</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-muted-foreground">
            <Share2 className="h-5 w-5" />
            <span className="text-xs mt-1">Promote</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">My Profile</span>
          </Link>
        </nav>
      </div>
    </BackgroundWrapper>
  )
}
