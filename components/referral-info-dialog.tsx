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
            Relief Fund Rate
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70">Learn more about referral rewards</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(0)}`}>
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>0</span>
                </span>
                <span className="font-medium">1%</span>
              </div>

              <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(1)}`}>
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>1</span>
                </span>
                <span className="font-medium">1.5%</span>
              </div>

              <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(3)}`}>
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>3</span>
                </span>
                <span className="font-medium">2%</span>
              </div>

              <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(5)}`}>
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>5</span>
                </span>
                <span className="font-medium">2.5%</span>
              </div>
            </div>

            <p className="text-xs text-islamic-cream/70 italic">
              Refer more friends to increase your relief fund rate.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
