"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users } from "lucide-react"

interface ReferralInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReferralInfoDialog({ open, onOpenChange }: ReferralInfoDialogProps) {
  // Current user's referral count (example data)
  const currentReferrals = 2

  // Get reward rate class based on referral count
  const getRateClass = (referrals: number) => {
    if (currentReferrals >= referrals) {
      return "bg-[#8dc63f]/20 border-[#8dc63f] text-[#8dc63f]"
    }
    return "bg-islamic-medium/30 border-islamic-medium/50 text-islamic-cream/50"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <DialogHeader>
          <DialogTitle className="text-islamic-gold flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Referral Reward Explanation
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70">Learn more about referral rewards</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-islamic-gold">Referral Reward Details</h3>
            <p className="text-xs text-islamic-cream/80">
              Refer friends and receive rewards from their donations. As your VIP level increases, your total referral
              reward rate increases from 20% to 30%.
            </p>

            <div className="p-4 bg-islamic-medium/30 rounded-lg border border-islamic-medium/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-islamic-cream">VIP 1</span>
                <span className="text-sm font-medium text-islamic-gold">20% Total</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-xs">
                <div className="text-center">
                  <div className="text-islamic-cream/70">1st Gen</div>
                  <div className="font-medium">10%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">2nd Gen</div>
                  <div className="font-medium">4%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">3rd Gen</div>
                  <div className="font-medium">2%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">4th Gen</div>
                  <div className="font-medium">2%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">5th Gen</div>
                  <div className="font-medium">2%</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center my-2">
              <div className="h-6 w-6 flex items-center justify-center">
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
                  className="text-islamic-gold"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>

            <div className="p-4 bg-islamic-medium/30 rounded-lg border border-islamic-gold/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-islamic-cream">VIP 5</span>
                <span className="text-sm font-medium text-islamic-gold">30% Total</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-xs">
                <div className="text-center">
                  <div className="text-islamic-cream/70">1st Gen</div>
                  <div className="font-medium">20%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">2nd Gen</div>
                  <div className="font-medium">4%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">3rd Gen</div>
                  <div className="font-medium">2%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">4th Gen</div>
                  <div className="font-medium">2%</div>
                </div>
                <div className="text-center">
                  <div className="text-islamic-cream/70">5th Gen</div>
                  <div className="font-medium">2%</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-islamic-cream/70 italic mt-2">
              Refer more friends to increase your rewards and VIP level.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
