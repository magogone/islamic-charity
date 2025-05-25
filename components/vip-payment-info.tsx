"use client"

import React from "react"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useVipInfo } from "@/store/use-vip-info"
import { useTranslation } from "@/lib/i18n"

interface VipPaymentInfoProps {
  className?: string
}

export function VipPaymentInfo({ className }: VipPaymentInfoProps) {
  const { getAllVipLevels } = useVipInfo()
  const { t } = useTranslation()
  const vipLevels = getAllVipLevels()

  return (
    <Card className={`border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-islamic-gold">
          <Info className="mr-2 h-5 w-5" />
          {t('donation.vipPaymentInformation')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-islamic-cream/90">
            {t('donation.fullPaymentNote')}
          </p>

          <div className="bg-islamic-medium/50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-islamic-gold">{t('donation.vipLevel')}</div>
              <div className="font-medium text-islamic-gold">{t('donation.fullPayment')}</div>
              <div className="font-medium text-islamic-gold">{t('donation.totalReturn')}</div>

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
              <p className="font-medium text-islamic-gold mb-1">{t('donation.importantNote')}</p>
              <p>
                {t('donation.upgradeNote')}
              </p>
              <p className="mt-2">
                {t('donation.upgradeExample')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
