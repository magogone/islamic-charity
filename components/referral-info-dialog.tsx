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
              Refer up to 5 generations and receive a total of 30% poverty relief rewards from donation funds. As your
              VIP level increases, your referral reward rates will also increase.
            </p>

            <div className="space-y-2">
              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 1</span>
                  <span className="font-medium text-islamic-gold">Total 20%</span>
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

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 2</span>
                  <span className="font-medium text-islamic-gold">Total 22%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1st Gen</div>
                    <div className="font-medium">12%</div>
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

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 3</span>
                  <span className="font-medium text-islamic-gold">Total 24%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1st Gen</div>
                    <div className="font-medium">14%</div>
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

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 4</span>
                  <span className="font-medium text-islamic-gold">Total 26%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1st Gen</div>
                    <div className="font-medium">16%</div>
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

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 5</span>
                  <span className="font-medium text-islamic-gold">Total 30%</span>
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
            </div>

            <p className="text-xs text-islamic-cream/70 italic">
              Refer more friends to participate in donations to not only receive more rewards but also increase your
              basic reward rate.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
