"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users } from "lucide-react"

interface ReferralInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReferralInfoDialog({ open, onOpenChange }: ReferralInfoDialogProps) {
  // 当前用户的推荐人数（示例数据）
  const currentReferrals = 2

  // 根据推荐人数获取对应的奖励率
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
            推荐奖励说明
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70">了解更多关于推荐奖励的信息</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-islamic-gold">推荐奖励详情</h3>
            <p className="text-xs text-islamic-cream/80">
              推荐5代，获得捐赠资金总共30%的扶贫奖励。随着您的VIP等级提升，推荐奖励比例也会相应提高。
            </p>

            <div className="space-y-2">
              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 1</span>
                  <span className="font-medium text-islamic-gold">总计 20%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1代</div>
                    <div className="font-medium">10%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">2代</div>
                    <div className="font-medium">4%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">3代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">4代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">5代</div>
                    <div className="font-medium">2%</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 2</span>
                  <span className="font-medium text-islamic-gold">总计 22%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1代</div>
                    <div className="font-medium">12%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">2代</div>
                    <div className="font-medium">4%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">3代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">4代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">5代</div>
                    <div className="font-medium">2%</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 3</span>
                  <span className="font-medium text-islamic-gold">总计 24%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1代</div>
                    <div className="font-medium">14%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">2代</div>
                    <div className="font-medium">4%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">3代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">4代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">5代</div>
                    <div className="font-medium">2%</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 4</span>
                  <span className="font-medium text-islamic-gold">总计 26%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1代</div>
                    <div className="font-medium">16%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">2代</div>
                    <div className="font-medium">4%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">3代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">4代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">5代</div>
                    <div className="font-medium">2%</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">VIP 5</span>
                  <span className="font-medium text-islamic-gold">总计 30%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-islamic-cream/70">1代</div>
                    <div className="font-medium">20%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">2代</div>
                    <div className="font-medium">4%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">3代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">4代</div>
                    <div className="font-medium">2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-islamic-cream/70">5代</div>
                    <div className="font-medium">2%</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-islamic-cream/70 italic">
              推荐更多好友参与捐赠，不仅可以获得更多奖励，还能提升您的基础奖励比例。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
