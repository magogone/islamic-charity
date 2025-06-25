"use client";

import React from "react";

import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVipInfo } from "@/store/use-vip-info";
import { useTranslation } from "@/lib/i18n";
import { useStore } from "@/store/store-context";

interface VipPaymentInfoProps {
  className?: string;
}

export function VipPaymentInfo({ className }: VipPaymentInfoProps) {
  const { getAllVipLevels } = useVipInfo();
  const { t, isRTL } = useTranslation();
  const { state } = useStore();
  const vipLevels = getAllVipLevels();

  // 获取当前用户的VIP等级
  const currentUserVipLevel =
    state.auth.user?.vipLevel || state.user.vipLevel || 1;

  return (
    <Card
      className={`border-none shadow-xl bg-[#1a1f2c] backdrop-blur-lg text-white ${className}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-[#d4b96e]">
          <Info className="mr-2 h-5 w-5" />
          {t("donation.vipPaymentInformation")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-[#f5efe0]/90">
            {t("donation.fullPaymentNote")}
          </p>

          <div className="bg-[#2a2f3c]/50 rounded-lg p-3 relative">
            {/* 进度条容器 */}
            <div
              className="absolute bottom-3 w-1 flex flex-col"
              style={{
                [isRTL ? "right" : "left"]: isRTL ? "28px" : "12px",
                top: "35px",
                height: "calc(100% - 50px)",
              }}
            >
              {/* 进度条背景 */}
              <div className="flex-1 bg-[#2a2f3c] rounded-full relative">
                {/* 进度条填充 */}
                <div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#d4b96e] via-[#d4b96e]/80 to-[#d4b96e] rounded-full transition-all duration-1000 ease-out"
                  style={{
                    height: `${(currentUserVipLevel / 5) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* 表格容器 */}
            <div
              className={`grid ${
                isRTL
                  ? "grid-cols-[2fr_1.5fr_1.5fr] pr-12 gap-1 text-xs"
                  : "grid-cols-3 gap-2 text-sm pl-8"
              }`}
            >
              <div className="font-medium text-[#d4b96e]">
                {t("donation.vipLevel")}
              </div>
              <div className="font-medium text-[#d4b96e]">
                {t("donation.fullPayment")}
              </div>
              <div className="font-medium text-[#d4b96e]">
                {t("donation.totalReturn")}
              </div>

              {Object.entries(vipLevels).map(([level, data], rowIndex) => {
                const isCurrentLevel = parseInt(level) === currentUserVipLevel;
                const isReachedLevel = parseInt(level) <= currentUserVipLevel;

                return (
                  <React.Fragment key={level}>
                    <div
                      className={`py-2 border-t border-[#2a2f3c]/30 transition-all duration-300 relative ${
                        isCurrentLevel
                          ? `text-[#d4b96e] font-semibold bg-[#d4b96e]/10 px-2 -mx-2 ${
                              isRTL ? "rounded-l-md" : "rounded-r-md"
                            }`
                          : isReachedLevel
                          ? "text-[#f5efe0]"
                          : "text-[#f5efe0]/60"
                      }`}
                    >
                      {t(`vip.level${level}`)}

                      {/* 圆点和箭头 */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{
                          [isRTL ? "right" : "left"]: isCurrentLevel
                            ? "-20px"
                            : "-36px",
                        }}
                      >
                        {isCurrentLevel ? (
                          // 当前等级显示三角形
                          <div className="flex items-center justify-center">
                            <div
                              className={`w-0 h-0 ${
                                isRTL
                                  ? "border-r-[8px] border-r-[#d4b96e] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
                                  : "border-l-[8px] border-l-[#d4b96e] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
                              }`}
                            />
                          </div>
                        ) : (
                          // 其他等级显示圆点
                          <div className="flex items-center justify-center">
                            <div
                              className={`rounded-full border-2 transition-all duration-500 ${
                                isReachedLevel
                                  ? "bg-[#d4b96e] border-[#d4b96e] shadow-lg shadow-[#d4b96e]/50"
                                  : "bg-[#2a2f3c] border-[#f5efe0]/30"
                              } w-3 h-3`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`py-2 border-t border-[#2a2f3c]/30 ${
                        isCurrentLevel ? "text-[#d4b96e] font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-baseline">
                        {data.donationAmount}
                        <span className="text-xs ml-1">USD</span>
                      </div>
                    </div>
                    <div
                      className={`py-2 border-t border-[#2a2f3c]/30 ${
                        isCurrentLevel ? "text-[#d4b96e] font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-baseline">
                        {data.totalReturn}
                        <span className="text-xs ml-1">USD</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-3 bg-islamic-gold/10">
            <Info className="h-5 w-5 text-islamic-gold mt-0.5 flex-shrink-0" />
            <div className="text-xs text-islamic-cream/90">
              <p className="font-medium text-islamic-gold mb-1">
                {t("donation.importantNote")}
              </p>
              <p>{t("donation.upgradeNote")}</p>
              <p className="mt-2">{t("donation.upgradeExample")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
