"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, Info } from "lucide-react"
import { useVipInfo } from "@/store/use-vip-info"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentVipLevel?: number
  nextLevelAmount?: number
}

export function PaymentDialog({ open, onOpenChange, currentVipLevel = 1, nextLevelAmount }: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { getVipLevelDonationAmount } = useVipInfo()

  // 获取下一级VIP的全额费用
  const nextLevel = currentVipLevel + 1
  const fullAmount = nextLevelAmount || getVipLevelDonationAmount(nextLevel)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      // Reset state and close dialog
      setTimeout(() => {
        setIsComplete(false)
        onOpenChange(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <DialogHeader>
          <DialogTitle className="text-islamic-gold">Donate</DialogTitle>
          <DialogDescription className="text-islamic-cream/70">
            Donate to upgrade your VIP level and increase your rewards.
          </DialogDescription>
        </DialogHeader>

        {!isProcessing && !isComplete ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="p-6 rounded-lg bg-islamic-medium/50 border border-islamic-gold/30 text-center">
                <p className="text-islamic-cream/80 mb-2">Donation Amount</p>
                <p className="text-3xl font-bold text-islamic-gold">{fullAmount} U</p>
                <p className="text-xs text-islamic-cream/60 mt-2">Full amount required for VIP {nextLevel}</p>
              </div>

              <div className="flex items-center space-x-2 rounded-md border border-islamic-medium/50 p-3 bg-islamic-medium/30">
                <Wallet className="mr-2 h-5 w-5 text-islamic-gold" />
                <span>USDT</span>
              </div>

              {/* 添加支付说明 */}
              <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-3 bg-islamic-gold/10">
                <Info className="h-5 w-5 text-islamic-gold mt-0.5 flex-shrink-0" />
                <div className="text-xs text-islamic-cream/90">
                  <p className="font-medium text-islamic-gold mb-1">Payment Information</p>
                  <p>
                    Each VIP level requires payment of the full amount shown above, not just the difference between
                    levels.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 w-full"
                onClick={handlePayment}
              >
                Donate Now!
              </Button>
            </DialogFooter>
          </>
        ) : isProcessing ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-islamic-gold/30 border-t-islamic-gold animate-spin mb-4"></div>
            <p className="text-islamic-cream">Processing, please wait...</p>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-islamic-cream text-center">Payment Successful!</p>
            <p className="text-islamic-cream/70 text-center text-sm mt-1">
              Thank you for your donation. Your generosity will help more people in need.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
