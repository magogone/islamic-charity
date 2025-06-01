"use client"

import React from "react"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useVipInfo } from "@/store/use-vip-info"
import { useTranslation } from "@/lib/i18n"
import { useStore } from "@/store/store-context"

interface VipPaymentInfoProps {
  className?: string
}

export function VipPaymentInfo({ className }: VipPaymentInfoProps) {
  const { getAllVipLevels } = useVipInfo()
  const { t, isRTL } = useTranslation()
  const { state } = useStore()
  const vipLevels = getAllVipLevels()
  
  // 获取当前用户的VIP等级，支持从认证用户或store用户获取
  const currentUserVipLevel = state.auth.user?.vipLevel || state.user.vipLevel || 1

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

          <div className="bg-islamic-medium/50 rounded-lg p-3 relative">
            {/* 进度条容器 - RTL下在右侧空白区域中间，LTR下在左侧 */}
            <div 
              className="absolute bottom-3 w-1 flex flex-col"
              style={{
                [isRTL ? 'right' : 'left']: isRTL ? '28px' : '12px',
                top: '35px'
              }}
            >
              {/* 进度条背景 */}
              <div className="flex-1 bg-islamic-medium/30 rounded-full relative">
                {/* 进度条填充 */}
                <div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-islamic-gold via-islamic-gold/80 to-islamic-gold rounded-full transition-all duration-1000 ease-out"
                  style={{
                    height: `${(currentUserVipLevel / 5) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* 表格容器 - RTL下右边距给进度条留空间，LTR下左边距给进度条留空间 */}
            <div className={`grid ${isRTL ? 'grid-cols-[2fr_1.5fr_1.5fr] pr-12 gap-1 text-xs' : 'grid-cols-3 gap-2 text-sm pl-8'}`}>
              <div className="font-medium text-islamic-gold">{t('donation.vipLevel')}</div>
              <div className="font-medium text-islamic-gold">{t('donation.fullPayment')}</div>
              <div className="font-medium text-islamic-gold">{t('donation.totalReturn')}</div>

              {Object.entries(vipLevels).map(([level, data], rowIndex) => {
                const isCurrentLevel = parseInt(level) === currentUserVipLevel
                const isReachedLevel = parseInt(level) <= currentUserVipLevel
                
                return (
                  <React.Fragment key={level}>
                    <div className={`py-2 border-t border-islamic-medium/30 transition-all duration-300 relative ${
                      isCurrentLevel 
                        ? `text-islamic-gold font-semibold bg-islamic-gold/10 px-2 -mx-2 ${isRTL ? 'rounded-l-md' : 'rounded-r-md'}` 
                        : isReachedLevel
                        ? 'text-islamic-cream'
                        : 'text-islamic-cream/60'
                    }`}>
                      {t(`vip.level${level}`)}
                      
                      {/* 圆点和箭头精确放在进度条中心线上 */}
                      <div className="absolute top-1/2 -translate-y-1/2" 
                           style={{ 
                             [isRTL ? 'right' : 'left']: isCurrentLevel 
                               ? '-20px' // RTL下箭头靠近右侧进度条
                               : '-36px' // RTL下圆点靠近右侧进度条
                           }}>
                        {isCurrentLevel ? (
                          // 当前等级显示实心三角形
                          <div className="flex items-center justify-center">
                            <div 
                              className={`w-0 h-0 ${
                                isRTL 
                                  ? 'border-r-[8px] border-r-islamic-gold border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent' 
                                  : 'border-l-[8px] border-l-islamic-gold border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent'
                              }`}
                            />
                          </div>
                        ) : (
                          // 其他等级显示圆点
                          <div className="flex items-center justify-center">
                            <div
                              className={`rounded-full border-2 transition-all duration-500 ${
                                isReachedLevel
                                  ? 'bg-islamic-gold border-islamic-gold shadow-lg shadow-islamic-gold/50'
                                  : 'bg-islamic-medium border-islamic-cream/30'
                              } w-3 h-3`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`py-2 border-t border-islamic-medium/30 transition-all duration-300 ${
                      isCurrentLevel 
                        ? 'text-islamic-gold font-semibold bg-islamic-gold/10 px-2 -mx-2' 
                        : isReachedLevel
                        ? 'text-islamic-cream'
                        : 'text-islamic-cream/60'
                    }`}>
                      {data.donationAmount} U
                    </div>
                    <div className={`py-2 border-t border-islamic-medium/30 transition-all duration-300 ${
                      isCurrentLevel 
                        ? `text-islamic-gold font-semibold bg-islamic-gold/10 px-2 -mx-2 ${isRTL ? 'rounded-l-md' : 'rounded-r-md'}` 
                        : isReachedLevel
                        ? 'text-islamic-cream'
                        : 'text-islamic-cream/60'
                    }`}>
                      {data.totalReturn} U
                    </div>
                  </React.Fragment>
                )
              })}
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
