"use client";

import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVipInfo } from "@/store/use-vip-info";

interface ReliefFundRateCardProps {
  currentReferrals: number;
  className?: string;
}

export function ReliefFundRateCard({
  currentReferrals,
  className,
}: ReliefFundRateCardProps) {
  const { getAllReliefFundRates } = useVipInfo();
  const reliefFundRates = getAllReliefFundRates();

  // Get rate class based on referral count
  const getRateClass = (referrals: number) => {
    if (currentReferrals >= referrals) {
      return "text-[#8dc63f]";
    }
    return "text-islamic-cream/70";
  };

  return (
    <Card
      className={cn(
        "border-none shadow-md bg-islamic-cardBg/90 backdrop-blur-sm text-white",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-islamic-gold">
          Reward Fund Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-2 rounded-md bg-islamic-medium/30">
            <span className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-2 opacity-70" />
              <span>0</span>
            </span>
            <span className={cn("font-medium", getRateClass(0))}>
              {reliefFundRates.noReferral}%
            </span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-md bg-islamic-medium/30">
            <span className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-2 opacity-70" />
              <span>1</span>
            </span>
            <span className={cn("font-medium", getRateClass(1))}>
              {reliefFundRates.referral1}%
            </span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-md bg-islamic-medium/30">
            <span className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-2 opacity-70" />
              <span>3</span>
            </span>
            <span className={cn("font-medium", getRateClass(3))}>
              {reliefFundRates.referral3}%
            </span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-md bg-islamic-medium/30">
            <span className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-2 opacity-70" />
              <span>5</span>
            </span>
            <span className={cn("font-medium", getRateClass(5))}>
              {reliefFundRates.referral5}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
