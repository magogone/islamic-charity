"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { WithdrawCard } from "@/components/withdraw-card"
import { BarkatLogo } from "@/components/barkat-logo"
import { useDonation } from "@/store/use-donation"

export default function WithdrawPage() {
  const { donationData } = useDonation()

  return (
    <BackgroundWrapper>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#1a0d2c]/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5 text-[#d4b96e]" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <BarkatLogo size={32} className="mr-2" />
            <h1 className="text-xl font-bold text-[#d4b96e]">Withdraw Funds</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <WithdrawCard
          availableAmount={donationData.withdrawableAmount}
          pendingAmount={15}
          completedAmount={donationData.withdrawnAmount}
        />

        <div className="mt-6 p-5 rounded-xl bg-[#1a0d2c]/90 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-[#d4b96e] mb-4">Withdrawal Information</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Minimum Withdrawal</span>
              <span className="text-sm font-medium text-islamic-cream">10 USDT</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Processing Time</span>
              <span className="text-sm font-medium text-islamic-cream">10-30 minutes</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Network</span>
              <span className="text-sm font-medium text-islamic-cream">TRC20</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Withdrawal Fee</span>
              <span className="text-sm font-medium text-islamic-cream">1 USDT</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-islamic-cream/80">Daily Limit</span>
              <span className="text-sm font-medium text-islamic-cream">1,000 USDT</span>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}
