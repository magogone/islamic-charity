"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react"
import { WithdrawDialog } from "./withdraw-dialog"

interface WithdrawCardProps {
  availableAmount: number
  pendingAmount?: number
  completedAmount?: number
  className?: string
}

export function WithdrawCard({
  availableAmount,
  pendingAmount = 0,
  completedAmount = 0,
  className = "",
}: WithdrawCardProps) {
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <>
      <Card
        className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8dc63f] to-[#8dc63f]/50"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl text-[#8dc63f]">
            <Wallet className="mr-2 h-5 w-5" />
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {/* Available to withdraw */}
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-islamic-cream/70">Available to Withdraw</span>
              <Button
                variant="outline"
                size="sm"
                className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10"
                onClick={() => setWithdrawOpen(true)}
                disabled={availableAmount <= 0}
              >
                <Wallet className="h-3 w-3 mr-1" />
                Withdraw
              </Button>
            </div>
            <div className="text-3xl font-bold text-[#8dc63f] mb-1">{availableAmount} USDT</div>
            <div className="text-xs text-islamic-cream/60">Minimum withdrawal: 10 USDT</div>
          </div>

          {/* Withdrawal history */}
          <div className="space-y-3">
            {pendingAmount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-islamic-medium/50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-islamic-medium/70 flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-islamic-cream/70" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-islamic-cream">Pending Withdrawal</div>
                    <div className="text-xs text-islamic-cream/60">Processing</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-islamic-cream">{pendingAmount} USDT</div>
                  <div className="text-xs text-islamic-cream/60">~30 min</div>
                </div>
              </div>
            )}

            {completedAmount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-islamic-medium/50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-islamic-medium/70 flex items-center justify-center mr-3">
                    <CheckCircle2 className="h-4 w-4 text-[#8dc63f]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-islamic-cream">Last Withdrawal</div>
                    <div className="text-xs text-islamic-cream/60">Completed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-islamic-cream">{completedAmount} USDT</div>
                  <div className="text-xs text-islamic-cream/60">2 days ago</div>
                </div>
              </div>
            )}

            <Button variant="outline" className="w-full mt-2 border-islamic-medium/50 text-islamic-cream/70">
              View All Transactions
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} availableAmount={availableAmount} />
    </>
  )
}
