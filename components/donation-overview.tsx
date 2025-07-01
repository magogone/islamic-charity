"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Users2,
  InfoIcon as InfoCircle,
  Heart,
  TrendingUp,
  PlusCircle,
  Coins,
  Target,
  Percent,
  BarChart,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentDialog } from "./payment-dialog";
import { WithdrawDialog } from "./withdraw-dialog";
import { VipLevelProgress } from "./vip-level-progress";
import { ReferralInfoDialog } from "./referral-info-dialog";
import { RewardSummaryChart } from "./reward-summary-chart";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { useVipInfo } from "@/store/use-vip-info";
import { useAuth } from "@/store/use-auth";
import { useAuthContext } from "@/store/auth-context";
import { useDailyRewardRates } from "@/hooks/use-daily-reward-rates";
import { useTranslation } from "@/lib/i18n";

export interface DonationOverviewProps {
  data?: {
    totalDonation?: number;
    vipLevel?: number;
    dailyFunds?: {
      current?: number;
      max?: number;
    };
    referrals?: number;
    periodProgress?: number;
    startDate?: string;
    remainingDays?: number;
    endDate?: string;
    currentRate?: number;
    totalAccumulated?: number;
    maxRate?: number;
    totalExpectedReward?: number;
    totalMaxReward?: number;
    withdrawnAmount?: number;
    withdrawableAmount?: number;
    dailyRewards?: Array<{
      date: string;
      actual: number;
      maximum: number;
      distributed?: boolean;
    }>;
  };
  showButtons?: boolean;
  className?: string;
}

// Default data to use when data prop is undefined or incomplete
const defaultData = {
  totalDonation: 100,
  vipLevel: 1,
  dailyFunds: {
    current: 5,
    max: 10,
  },
  referrals: 0,
  periodProgress: 25,
  startDate: "2023-01-01",
  remainingDays: 30,
  endDate: "2023-02-01",
  currentRate: 1,
  totalAccumulated: 15,
  maxRate: 2.5,
  totalExpectedReward: 120,
  totalMaxReward: 180,
  withdrawnAmount: 50,
  withdrawableAmount: 30,
  dailyRewards: [],
};

export function DonationOverview({
  data,
  showButtons = true,
  className = "",
}: DonationOverviewProps) {
  // 初始化组件
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [referralInfoOpen, setReferralInfoOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { getVipLevelDonationAmount } = useVipInfo();
  const { isAuthenticated, user } = useAuth();
  const { openLoginModal } = useAuthContext();
  const {
    getCurrentRate,
    rateConfigs,
    loading: ratesLoading,
  } = useDailyRewardRates();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    // 组件挂载完成
  }, [data]);

  // 使用用户真实的捐款金额和VIP等级（如果存在）
  const userDonation = user?.donateAmount ? parseFloat(user.donateAmount) : 0;
  const userVipLevel = user?.vipLevel || 0;
  const userReferrals = user?.referrals || 0;

  // Calculate current rate based on user referrals - only when rates are loaded
  const calculatedCurrentRate =
    mounted && !ratesLoading
      ? getCurrentRate(userReferrals)
      : defaultData.currentRate;

  // Maximum rate is always the highest rate from configs
  const calculatedMaxRate =
    mounted && !ratesLoading ? rateConfigs.referral5 : defaultData.maxRate;

  // Calculate daily funds based on donation amount and rates
  const calculatedDailyFunds = {
    current: parseFloat(
      ((userDonation * calculatedCurrentRate) / 100).toFixed(2)
    ),
    max: parseFloat(((userDonation * calculatedMaxRate) / 100).toFixed(2)),
  };

  // Merge provided data with default data and user data
  const safeData = {
    ...defaultData,
    ...data,
    // 优先使用用户真实数据
    totalDonation: userDonation,
    vipLevel: userVipLevel,
    currentRate: calculatedCurrentRate,
    maxRate: calculatedMaxRate,
    dailyFunds: data?.dailyFunds || {
      // Override with dynamically calculated funds based on donation amount and rate
      current: calculatedDailyFunds.current,
      max: calculatedDailyFunds.max,
    },
  };

  // 数据处理完成

  // 获取下一级VIP的全额费用
  const nextVipLevel = safeData.vipLevel < 5 ? safeData.vipLevel + 1 : 5;
  const nextLevelAmount = getVipLevelDonationAmount(nextVipLevel);

  // Summary data
  const summaryData = {
    expectedReward: safeData.totalExpectedReward,
    maxReward: safeData.totalMaxReward,
    withdrawnAmount: safeData.withdrawnAmount,
    withdrawableAmount: safeData.withdrawableAmount,
  };

  // Handle withdrawal
  const handleWithdraw = () => {
    if (isAuthenticated) {
      // 打开提现对话框
      setWithdrawDialogOpen(true);
    } else {
      // 如果用户未登录，打开登录对话框
      openLoginModal("/profile/withdraw");
    }
  };

  return (
    <>
      <Card
        className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl text-islamic-gold">
            {t("donation.myDonationOverview")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          {/* Donation amount and earnings cards */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-islamic-gold mr-2" />
                  <span className="text-xs text-islamic-cream/70">
                    {t("donation.total")}
                  </span>
                </div>
                <button
                  onClick={() => setPaymentOpen(true)}
                  className="w-7 h-7 rounded-sm bg-islamic-gold flex items-center justify-center hover:bg-islamic-gold/90 transition-colors"
                >
                  <ArrowUp className="h-5 w-5 text-islamic-dark" />
                </button>
              </div>
              <span className="text-2xl font-bold text-islamic-gold mb-3 flex items-baseline">
                {safeData.totalDonation}
                <span className="text-xs ml-1">USD</span>
              </span>

              {/* Use improved VIP level indicator */}
              <VipLevelProgress
                currentLevel={safeData.vipLevel}
                currentDonation={safeData.totalDonation}
                onUpgrade={() => setPaymentOpen(true)}
              />
            </div>

            {/* Right side - Donation Rewards - UPDATED LAYOUT */}
            <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3 flex flex-col h-full">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-gold">
                  {t("donation.rewards")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Current USD */}
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">
                    {safeData.dailyFunds.current}
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-xs text-islamic-gold/90">USD</span>
                    <span className="text-[10px] text-islamic-cream/60">
                      {t("donation.current")}
                    </span>
                  </div>
                </div>

                {/* Maximum USD */}
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">
                    {safeData.dailyFunds.max}
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-xs text-islamic-gold/90">USD</span>
                    <span className="text-[10px] text-islamic-cream/60">
                      {t("donation.maximum")}
                    </span>
                  </div>
                </div>

                {/* Current Rate */}
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">
                    {safeData.currentRate}%
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-[10px] text-islamic-cream/60">
                      {t("donation.current")}
                    </span>
                  </div>
                </div>

                {/* Max Rate */}
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-islamic-gold/90 mr-3" />
                  <div className="text-2xl font-bold text-islamic-gold/95">
                    {safeData.maxRate}%
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-[10px] text-islamic-cream/60">
                      {t("donation.max")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-3 justify-end">
                <Users2 className="h-3.5 w-3.5 text-islamic-cream/70 mr-1.5" />
                <span className="text-xs text-islamic-cream/70">
                  {t("donation.referred")} {userReferrals} {t("profile.people")}
                </span>
                <button
                  onClick={() => setReferralInfoOpen(true)}
                  className="ml-1 p-0.5 rounded-full hover:bg-islamic-medium/50 transition-colors"
                >
                  <InfoCircle className="h-3 w-3 text-islamic-cream/60" />
                </button>
              </div>
            </div>
          </div>

          {/* Earnings summary information - horizontal stacked bar chart */}
          <div className="p-4 mb-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-islamic-gold text-2xl mr-2">$</span>
                <h3 className="text-sm font-medium text-islamic-gold">
                  {t("donation.earningSummary")}
                </h3>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleWithdraw}
                      disabled={!summaryData.withdrawableAmount}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        summaryData.withdrawableAmount
                          ? "bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
                          : "bg-[#d4b96e]/40 text-[#1a0d2c]/50 cursor-not-allowed"
                      }`}
                    >
                      <Wallet className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("donation.withdrawEarnings")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Horizontal stacked bar chart */}
            <RewardSummaryChart data={summaryData} />
          </div>
        </CardContent>
        {showButtons && (
          <CardFooter className="pt-3 pb-4 flex gap-2">
            <Button
              className="w-full bg-[#d4b96e] hover:bg-[#d4b96e]/90 text-[#1a0d2c]"
              onClick={() => {
                if (isAuthenticated) {
                  setPaymentOpen(true);
                } else {
                  openLoginModal("/donation");
                }
              }}
            >
              <div className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                <PlusCircle className="h-3 w-3 -ml-2 -mt-2" />
              </div>
              {t("donation.increaseDonation")}
            </Button>
          </CardFooter>
        )}
      </Card>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        currentVipLevel={safeData.vipLevel}
        nextLevelAmount={nextLevelAmount}
      />
      <ReferralInfoDialog
        open={referralInfoOpen}
        onOpenChange={setReferralInfoOpen}
      />
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        availableAmount={safeData.withdrawableAmount || 0}
      />
    </>
  );
}
