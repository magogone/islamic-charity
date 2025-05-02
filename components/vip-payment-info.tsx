"use client"

import React from "react"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useVipInfo } from "@/store/use-vip-info"

interface VipPaymentInfoProps {
  className?: string
}

export function VipPaymentInfo({ className }: VipPaymentInfoProps) {
  const { getAllVipLevels } = useVipInfo()
  const vipLevels = getAllVipLevels()

  return (
    <Card className={`border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-islamic-gold">
          <Info className="mr-2 h-5 w-5" />
          VIP Level Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-islamic-cream/90">
            Each VIP level requires payment of the full amount shown below, not just the difference between levels.
          </p>

          <div className="bg-islamic-medium/50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-islamic-gold">VIP Level</div>
              <div className="font-medium text-islamic-gold">Full Payment</div>
              <div className="font-medium text-islamic-gold">Total Return</div>

              {Object.entries(vipLevels).map(([level, data]) => (
                <React.Fragment key={level}>
                  <div className="py-2 border-t border-islamic-medium/30">VIP {level}</div>
                  <div className="py-2 border-t border-islamic-medium/30">{data.donationAmount} U</div>
                  <div className="py-2 border-t border-islamic-medium/30">{data.totalReturn} U</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-3 bg-islamic-gold/10">
            <Info className="h-5 w-5 text-islamic-gold mt-0.5 flex-shrink-0" />
            <div className="text-xs text-islamic-cream/90">
              <p className="font-medium text-islamic-gold mb-1">Important Note</p>
              <p>
                When upgrading from one VIP level to another, you need to pay the full amount for the new level, not
                just the difference between levels.
              </p>
              <p className="mt-2">
                For example, to upgrade from VIP 1 (100 U) to VIP 2 (300 U), you need to pay the full 300 U, not just
                the 200 U difference.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
