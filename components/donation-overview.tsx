"use client"

import { useState } from "react"
import {
  ArrowUp,
  Users2,
  InfoIcon as InfoCircle,
  Heart,
  TrendingUp,
  PlusCircle,
  Coins,
  Target,
  Percent,
  BarChart,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentDialog } from "./payment-dialog"
import { VipLevelProgress } from "./vip-level-progress"
import { ReferralInfoDialog } from "./referral-info-dialog"
import { RewardSummaryChart } from "./reward-summary-chart"
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip as UITooltip } from "@/components/ui/tooltip"

export interface DonationOverviewProps {
  data: {
    totalDonation: number
    vipLevel: number
    dailyFunds: {
      current: number
      max: number
    }
    referrals: number
    periodProgress: number
    startDate: string
    remainingDays: number
    endDate: string
    currentRate: number
    totalAccumulated: number
    maxRate: number
    totalExpectedReward: number
    totalMaxReward: number
    withdrawnAmount: number
    withdrawableAmount: number
    dailyRewards: Array<{
      date: string
      actual: number
      maximum: number
      distributed?: boolean
    }>
  }
  showButtons?: boolean
  className?: string
}

export function DonationOverview({ data, showButtons = true, className = "" }: DonationOverviewProps) {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [referralInfoOpen, setReferralInfoOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  // Summary data
  const summaryData = {
    expectedReward: data.totalExpectedReward || 120,
    maxReward: data.totalMaxReward || 180,
    withdrawnAmount: data.withdrawnAmount || 50,
    withdrawableAmount: data.withdrawableAmount || 30,
  }

  // Handle withdrawal
  const handleWithdraw = () => {
    // Add withdrawal logic here
    setWithdrawOpen(true)
    console.log("Withdraw earnings", summaryData.withdrawableAmount)
  }

  return (
    <>
      <Card
        className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl text-islamic-gold">My Donation Overview</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          {/* Donation amount and earnings cards */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-islamic-gold mr-2" />
                  <span className="text-xs text-islamic-cream/70">Total</span>
                </div>
                <button
                  onClick={() => setPaymentOpen(true)}
                  className="w-7 h-7 rounded-sm bg-islamic-gold flex items-center justify-center hover:bg-islamic-gold/90 transition-colors"
                >
                  <ArrowUp className="h-5 w-5 text-islamic-dark" />
                </button>
              </div>
              <span className="text-2xl font-bold text-islamic-gold mb-3">{data.totalDonation} U</span>

              {/* Use improved VIP level indicator */}
              <VipLevelProgress
                currentLevel={data.vipLevel}
                currentDonation={data.totalDonation}
                onUpgrade={() => setPaymentOpen(true)}
              />
            </div>

            {/* Right side - Donation Rewards - UPDATED LAYOUT */}
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-gold">Rewards</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Current USDT */}
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">{data.dailyFunds.current}</div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-xs text-islamic-gold/90">USDT</span>
                    <span className="text-[10px] text-islamic-cream/60">Current</span>
                  </div>
                </div>

                {/* Maximum USDT */}
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">{data.dailyFunds.max}</div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-xs text-islamic-gold/90">USDT</span>
                    <span className="text-[10px] text-islamic-cream/60">Maximum</span>
                  </div>
                </div>

                {/* Current Rate */}
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">{data.currentRate}%</div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-[10px] text-islamic-cream/60">Current</span>
                  </div>
                </div>

                {/* Max Rate */}
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">{data.maxRate || 2.5}%</div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-[10px] text-islamic-cream/60">Max</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-3 justify-end">
                <Users2 className="h-3.5 w-3.5 text-islamic-cream/70 mr-1.5" />
                <span className="text-xs text-islamic-cream/70">Referred {data.referrals} people</span>
                <button
                  onClick={() => setReferralInfoOpen(true)}
                  className="ml-1 p-0.5 rounded-full hover:bg-islamic-medium/50 transition-colors"
                >
                  <InfoCircle className="h-3 w-3 text-islamic-cream/60" />
                </button>
              </div>
            </div>
          </div>

          {/* Earnings summary information - horizontal stacked bar chart */}
          <div className="p-4 mb-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-islamic-gold text-2xl mr-2">$</span>
                <h3 className="text-sm font-medium text-islamic-gold">Earnings Summary</h3>
              </div>

              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleWithdraw}
                      disabled={!summaryData.withdrawableAmount}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        summaryData.withdrawableAmount
                          ? "bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
                          : "bg-[#d4b96e]/40 text-[#1a0d2c]/50 cursor-not-allowed"
                      }`}
                    >
                      <Wallet className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Withdraw Earnings</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>

            {/* Horizontal stacked bar chart */}
            <RewardSummaryChart data={summaryData} />
          </div>
        </CardContent>
        {showButtons && (
          <CardFooter className="pt-3 pb-4 flex gap-2">
            <Button
              className="w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
              onClick={() => setPaymentOpen(true)}
            >
              <div className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                <PlusCircle className="h-3 w-3 -ml-2 -mt-2" />
              </div>
              Increase Donation
            </Button>
          </CardFooter>
        )}
      </Card>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        nextLevelAmount={200} // This should be dynamically calculated based on current VIP level
      />
      <ReferralInfoDialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen} />
    </>
  )
}
