"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import { useUser } from "@/store/use-user";
import { useState, useEffect } from "react";
import { useDailyRewardRates } from "@/hooks/use-daily-reward-rates";

interface ReferralInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReferralInfoDialog({
  open,
  onOpenChange,
}: ReferralInfoDialogProps) {
  const { userData } = useUser();
  const { rateConfigs, loading: ratesLoading } = useDailyRewardRates();
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get referrals from user data in store
  const currentReferrals = mounted ? userData.referrals : 0;

  // Get reward rate class based on referral count
  const getRateClass = (referrals: number) => {
    if (currentReferrals >= referrals) {
      return "bg-[#8dc63f]/20 border-[#8dc63f] text-[#8dc63f]";
    }
    return "bg-islamic-medium/30 border-islamic-medium/50 text-islamic-cream/50";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <DialogHeader>
          <DialogTitle className="text-islamic-gold flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Reward Fund Rate
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70">
            Learn more about reward benefits
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-3">
            <div className="space-y-2">
              <div
                className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(
                  0
                )}`}
              >
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>0</span>
                </span>
                <span className="font-medium">
                  {mounted && !ratesLoading ? rateConfigs.noReferral : 1}%
                </span>
              </div>

              <div
                className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(
                  1
                )}`}
              >
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>1</span>
                </span>
                <span className="font-medium">
                  {mounted && !ratesLoading ? rateConfigs.referral1 : 1.5}%
                </span>
              </div>

              <div
                className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(
                  3
                )}`}
              >
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>3</span>
                </span>
                <span className="font-medium">
                  {mounted && !ratesLoading ? rateConfigs.referral3 : 2}%
                </span>
              </div>

              <div
                className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(
                  5
                )}`}
              >
                <span className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>5</span>
                </span>
                <span className="font-medium">
                  {mounted && !ratesLoading ? rateConfigs.referral5 : 2.5}%
                </span>
              </div>
            </div>

            <p className="text-xs text-islamic-cream/70 italic">
              {mounted &&
                `You have currently referred ${userData.referrals} people. `}
              Refer more friends to increase your reward fund rate.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
