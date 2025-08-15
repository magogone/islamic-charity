"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVipInfo } from "@/store/use-vip-info";
import { useTranslation } from "@/lib/i18n";

interface VipBenefitsCardProps {
  vipLevel: number;
  className?: string;
}

export function VipBenefitsCard({ vipLevel, className }: VipBenefitsCardProps) {
  const {
    getDailyFundRangeForLevel,
    getRewardRatesForLevel,
    getAllReliefFundRates,
    getVipLevelDonationAmount,
    getVipLevelTotalReturn,
    getVipLevelPeriod,
    getVipLevelNextVoucher,
    getVipLevelCurrentVoucher,
  } = useVipInfo();

  const { t } = useTranslation();

  // Always display VIP level 1 information
  const displayLevel = vipLevel || 1;

  // Whether to show current level badge (only for VIP level >= 1)
  const showCurrentLevelBadge = vipLevel > 0;

  // Get displayed VIP level info
  const dailyFundRange = getDailyFundRangeForLevel(displayLevel);
  const rewardRates = getRewardRatesForLevel(displayLevel);
  const reliefFundRates = getAllReliefFundRates();
  const donationAmount = getVipLevelDonationAmount(displayLevel);
  const totalReturn = getVipLevelTotalReturn(displayLevel);
  const period = getVipLevelPeriod(displayLevel);
  const voucherAmount = getVipLevelCurrentVoucher(displayLevel);

  return (
    <Card
      className={cn(
        "border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-islamic-gold">
            {t("donation.vipPrivileges").replace(
              "{level}",
              t(`vip.level${displayLevel}`)
            )}
          </CardTitle>
          {showCurrentLevelBadge && (
            <Badge
              variant="outline"
              className="border-islamic-gold text-islamic-gold"
            >
              {t("donation.currentLevel")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">
              {t("donation.donationAndReturns")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.donation")}
                </span>
                <div className="flex items-baseline">
                  {donationAmount}
                  <span className="text-xs ml-1">USD</span>
                </div>
              </div>
              <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.currentVoucher")}
                </span>
                <div className="flex items-baseline">
                  {voucherAmount > 0 ? voucherAmount : "-"}
                  {voucherAmount > 0 && (
                    <span className="text-xs ml-1">USD</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.totalReturn")}
                </span>
                <div className="flex items-baseline">
                  {totalReturn}
                  <span className="text-xs ml-1">USD</span>
                </div>
              </div>
              <div className="flex flex-col p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.period")}
                </span>
                <span className="text-base font-medium text-islamic-cream">
                  {period} {t("donation.days")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">
              {t("donation.dailyReliefFunds")}
            </h4>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[#8dc63f]">
                {dailyFundRange}
              </span>
              <span className="text-xs text-islamic-cream/70 ml-2">
                {t("donation.adjustedBasedOnReferrals")}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">
              {t("donation.referralRewards")}
            </h4>
            <div className="flex items-center justify-center p-4 bg-islamic-dark/30 rounded-lg">
              <span className="text-2xl font-bold text-[#8dc63f]">
                {rewardRates.total}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-islamic-gold mb-2">
              {t("donation.reliefFundRate")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.noReferrals")}
                </span>
                <span className="text-xs text-[#8dc63f] font-medium">
                  {reliefFundRates.noReferral}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.oneReferral")}
                </span>
                <span className="text-xs text-[#8dc63f] font-medium">
                  {reliefFundRates.referral1}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.threeReferrals")}
                </span>
                <span className="text-xs text-[#8dc63f] font-medium">
                  {reliefFundRates.referral3}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-islamic-dark/30 rounded-lg">
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.fiveReferrals")}
                </span>
                <span className="text-xs text-[#8dc63f] font-medium">
                  {reliefFundRates.referral5}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
