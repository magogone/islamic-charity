"use client"

import { Share2, InfoIcon, User, UserPlus, Percent, Users, UsersIcon, Award, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { useAuth } from "@/store/use-auth"
import { useAuthContext } from "@/store/auth-context"
import { useDailyRewardRates } from "@/hooks/use-daily-reward-rates"
import { useStore } from "@/store/store-context"

export interface InvitationCardProps {
  data?: {
    totalReferrals?: number
    directReferrals?: number
    indirectReferrals?: number
    totalRewards?: number
    rewardRate?: {
      level1?: number
      level2?: number
      level3?: number
      level4?: number
      level5?: number
      total?: number
    }
    basicReward?: {
      current?: number
      max?: number
    }
    maxReferralReward?: {
      level1?: number
      level2?: number
      level3?: number
      level4?: number
      level5?: number
      total?: number
    }
  }
  className?: string
  isLoading?: boolean
  refresh?: () => void
}

export function InvitationCard({ data, className = "", isLoading = false, refresh }: InvitationCardProps) {
  const [basicInfoOpen, setBasicInfoOpen] = useState(false)
  const [referralInfoOpen, setReferralInfoOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { openLoginModal } = useAuthContext()
  const [mounted, setMounted] = useState(false)
  const { rateConfigs, loading: ratesLoading } = useDailyRewardRates()
  const { state } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isAuthenticated && refresh) {
      refresh()
    }
  }, [mounted, isAuthenticated, refresh])

  // Default data to prevent undefined errors
  const defaultData = {
    totalReferrals: 0,
    directReferrals: 0,
    indirectReferrals: 0,
    totalRewards: 0,
    rewardRate: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    basicReward: {
      current: 1,
      max: 2.5,
    },
    maxReferralReward: {
      level1: 20,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 30,
    },
  }
  
  // Use safe data with defaults
  const safeData = {
    totalReferrals: data?.totalReferrals ?? defaultData.totalReferrals,
    directReferrals: data?.directReferrals ?? defaultData.directReferrals,
    indirectReferrals: data?.indirectReferrals ?? defaultData.indirectReferrals,
    totalRewards: data?.totalRewards ?? defaultData.totalRewards,
    rewardRate: {
      level1: data?.rewardRate?.level1 ?? defaultData.rewardRate.level1,
      level2: data?.rewardRate?.level2 ?? defaultData.rewardRate.level2,
      level3: data?.rewardRate?.level3 ?? defaultData.rewardRate.level3,
      level4: data?.rewardRate?.level4 ?? defaultData.rewardRate.level4,
      level5: data?.rewardRate?.level5 ?? defaultData.rewardRate.level5,
      total: data?.rewardRate?.total ?? defaultData.rewardRate.total,
    },
    basicReward: {
      current: data?.basicReward?.current ?? defaultData.basicReward.current,
      max: data?.basicReward?.max ?? defaultData.basicReward.max,
    },
    maxReferralReward: {
      level1: data?.maxReferralReward?.level1 ?? defaultData.maxReferralReward.level1,
      level2: data?.maxReferralReward?.level2 ?? defaultData.maxReferralReward.level2,
      level3: data?.maxReferralReward?.level3 ?? defaultData.maxReferralReward.level3,
      level4: data?.maxReferralReward?.level4 ?? defaultData.maxReferralReward.level4,
      level5: data?.maxReferralReward?.level5 ?? defaultData.maxReferralReward.level5,
      total: data?.maxReferralReward?.total ?? defaultData.maxReferralReward.total,
    },
  }

  // Determine the user's VIP level
  const userVipLevel = user?.vipLevel || 0
  
  // Get user's invite level 
  const userInviteLevel = user?.inviteLevel || 0
  
  // Get referral rewards based on VIP level
  const vipLevelData = mounted ? state?.vipInfo?.levels?.[userVipLevel] : null
  
  // Get the min and max values for VIP levels
  const minVipReward = mounted && state?.vipInfo?.levels?.[userVipLevel]?.rewardRates?.level5 || 0
  const maxVipReward = mounted && state?.vipInfo?.levels?.[userVipLevel]?.rewardRates?.level1 || 0
  
  // Calculate current reward based on user's invite level (1-5)
  const currentRewardRate = userVipLevel === 0 ? 0 : (
    userInviteLevel >= 1 && userInviteLevel <= 5 
      ? (userInviteLevel === 1 
          ? vipLevelData?.rewardRates?.level1 
          : userInviteLevel === 2 
            ? vipLevelData?.rewardRates?.level2 
            : userInviteLevel === 3 
              ? vipLevelData?.rewardRates?.level3 
              : userInviteLevel === 4 
                ? vipLevelData?.rewardRates?.level4 
                : vipLevelData?.rewardRates?.level5) || 0
      : vipLevelData?.rewardRates?.level1 || 0
  )
  
  // Get the current reward rate based on direct referral count
  const getCurrentRateText = (referrals: number): string => {
    if (!mounted || ratesLoading) {
      // Default values when not mounted or rates are loading
      if (referrals === 0) return "1%"
      if (referrals >= 5) return "2.5%"
      if (referrals >= 3) return "2%"
      if (referrals >= 1) return "1.5%"
      return "1%"
    }
    
    // Dynamic values when mounted and rates are loaded
    if (referrals >= 5) return `${rateConfigs.referral5}%`
    if (referrals >= 3) return `${rateConfigs.referral3}%`
    if (referrals >= 1) return `${rateConfigs.referral1}%`
    return `${rateConfigs.noReferral}%`
  }
  
  // Get the basic reward rates from the configuration
  const basicRewardMin = mounted && !ratesLoading ? rateConfigs.noReferral : 1
  const basicRewardMax = mounted && !ratesLoading ? rateConfigs.referral5 : 2.5
  const currentBasicReward = mounted && !ratesLoading 
    ? getCurrentRateText(user?.referrals || 0).replace('%', '')
    : "0"
  
  // Calculate progress percentages for the reward bars
  const basicRewardProgress = ((parseFloat(currentBasicReward) - basicRewardMin) / (basicRewardMax - basicRewardMin)) * 100
  
  // For VIP 0, progress is 0%, otherwise calculate based on the current reward rate (reversed as level1 is max and level5 is min)
  const referralRewardProgress = userVipLevel === 0 ? 0 : 
    ((currentRewardRate - minVipReward) / (maxVipReward - minVipReward)) * 100

  // Get reward rate style based on direct referral count
  const getRateClass = (referrals: number) => {
    if ((user?.referrals || 0) >= referrals) {
      return "border-islamic-gold/50 bg-islamic-gold/10 text-islamic-gold"
    }
    return "border-islamic-medium/50 bg-islamic-medium/30 text-islamic-cream/90"
  }
  
  // Get rate percentage text based on referral count
  const getRateText = (referrals: number): string => {
    if (!mounted || ratesLoading) {
      // Default values when not mounted or rates are loading
      if (referrals === 0) return "1%"
      if (referrals === 1) return "1.5%"
      if (referrals === 3) return "2%"
      if (referrals === 5) return "2.5%"
      return "1%"
    }
    
    // Dynamic values when mounted and rates are loaded
    if (referrals === 0) return `${rateConfigs.noReferral}%`
    if (referrals === 1) return `${rateConfigs.referral1}%`
    if (referrals === 3) return `${rateConfigs.referral3}%`
    if (referrals === 5) return `${rateConfigs.referral5}%`
    return `${rateConfigs.noReferral}%`
  }

  return (
    <Card
      className={`overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8dc63f] to-[#8dc63f]/50"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl text-[#8dc63f]">
          <Share2 className="mr-2 h-5 w-5" />
          Invite Friends
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 text-islamic-gold animate-spin" />
            <span className="ml-3 text-islamic-cream">Loading invitation data...</span>
          </div>
        ) : (
          <>
            {/* Invitation Statistics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <Users className="h-8 w-8 text-islamic-cream/50 mr-3" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{safeData.totalReferrals}</span>
                  <span className="text-xs text-islamic-cream/70">Total</span>
                </div>
              </div>
              <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <UserPlus className="h-8 w-8 text-islamic-cream/50 mr-3" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{safeData.directReferrals}</span>
                  <span className="text-xs text-islamic-cream/70">Direct</span>
                </div>
              </div>
              <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <UsersIcon className="h-8 w-8 text-islamic-cream/50 mr-3" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{safeData.indirectReferrals}</span>
                  <span className="text-xs text-islamic-cream/70">Indirect</span>
                </div>
              </div>
            </div>

            {/* Reward Information Cards */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Basic Reward Card */}
              <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <User className="h-4 w-4 text-islamic-gold mr-2" />
                  <span className="text-sm text-islamic-gold">Basic Rewards</span>
                </div>

                {/* Visual representation of reward range - progress bar */}
                <div className="mb-3">
                  <div className="relative pt-1 pb-3">
                    <div className="flex mb-1 items-center justify-between">
                      <div className="text-xs text-islamic-cream/70">{basicRewardMin}%</div>
                      <div className="text-xs text-islamic-cream/70">{basicRewardMax}%</div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-islamic-dark/50">
                      <div
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-islamic-gold to-[#8dc63f]"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    {/* Current position marker */}
                    <div
                      className="absolute bottom-0 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"
                      style={{ left: `${basicRewardProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-islamic-gold mr-2" />
                    <span className="text-xs text-islamic-cream">Current Rewards</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-islamic-gold">{getCurrentRateText(user?.referrals || 0)}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setBasicInfoOpen(true)}
                            className="ml-1 p-0.5 rounded-full hover:bg-islamic-dark/50 transition-colors"
                          >
                            <InfoIcon className="h-3 w-3 text-islamic-cream/70" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View basic reward details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              {/* Referral Reward Card */}
              <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <UserPlus className="h-4 w-4 text-islamic-gold mr-2" />
                  <span className="text-sm text-islamic-gold">
                    {userVipLevel === 0 ? "Referral Rewards (Inactive)" : "Referral Rewards"}
                  </span>
                </div>

                {/* Visual representation of reward range - simplified */}
                <div className="mb-3">
                  {/* Progress bar with markers - aligned with percentage icon */}
                  <div className="relative pt-1 pb-3">
                    <div className="flex mb-1 items-center justify-between">
                      <div className="text-xs text-islamic-cream/70">{minVipReward}%</div>
                      <div className="text-xs text-islamic-cream/70">{maxVipReward}%</div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-islamic-dark/50">
                      <div
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-islamic-gold to-[#8dc63f]"
                        style={{ width: `${referralRewardProgress}%` }}
                      ></div>
                    </div>
                    {/* Current position marker */}
                    <div
                      className="absolute bottom-0 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"
                      style={{ left: `${referralRewardProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-islamic-gold mr-2" />
                    <span className="text-xs text-islamic-cream">Current Rewards</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-islamic-gold">{currentRewardRate}%</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setReferralInfoOpen(true)}
                            className="ml-1 p-0.5 rounded-full hover:bg-islamic-dark/50 transition-colors"
                          >
                            <InfoIcon className="h-3 w-3 text-islamic-cream/70" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View referral reward details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            {/* Invitation Tip */}
            <div className="p-3 rounded-lg bg-[#8dc63f]/20 border border-[#8dc63f]/30 text-xs text-islamic-cream/90">
              <p>
                Invite friends to donate and receive up to {vipLevelData?.rewardRates?.level1 || maxVipReward}% of their donation amount as rewards, while also increasing
                your daily basic donation reward rate!
              </p>
              {userVipLevel > 0 && (
                <p className="mt-2">
                  <span className="text-islamic-gold">Invitation Level {userInviteLevel || 1}:</span> You currently earn {currentRewardRate}% on direct referrals.
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 pb-4">
        {!mounted ? (
          // 服务端渲染和客户端挂载前的占位按钮
          <div className="w-full">
            <Button className="w-full bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] flex items-center justify-center">
              Invite Now
              <Share2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : isAuthenticated ? (
          // 已登录用户看到的链接按钮
          <Link href="/promotion/share" className="w-full">
            <Button className="w-full bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] flex items-center justify-center" disabled={isLoading}>
              Invite Now
              <Share2 className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          // 未登录用户看到的登录按钮
          <Button
            className="w-full bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] flex items-center justify-center"
            onClick={() => openLoginModal("/promotion/share")}
            disabled={isLoading}
          >
            Invite Now
            <Share2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>

      {/* Basic Reward Details Dialog */}
      <Dialog open={basicInfoOpen} onOpenChange={setBasicInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <User className="mr-2 h-5 w-5" />
              Basic Reward Details
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">Learn more about basic rewards</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold flex items-center">
                <Percent className="mr-2 h-4 w-4" />
                Poverty Relief Fund Rate
              </h3>
              <p className="text-xs text-islamic-cream/80">
                Based on the number of people you refer, your poverty relief fund rate will increase accordingly:
              </p>

              <div className="space-y-2">
                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(0)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>0</span>
                  </span>
                  <span className="font-medium">{getRateText(0)}</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(1)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>1</span>
                  </span>
                  <span className="font-medium">{getRateText(1)}</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(3)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>3</span>
                  </span>
                  <span className="font-medium">{getRateText(3)}</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(5)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>5</span>
                  </span>
                  <span className="font-medium">{getRateText(5)}</span>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                You have currently referred {safeData.totalReferrals} people, poverty relief fund rate is{" "}
                {getCurrentRateText(user?.referrals || 0)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Referral Reward Details Dialog */}
      <Dialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              {userVipLevel === 0 ? "Referral Rewards (Inactive)" : "Referral Reward Details"}
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">
              {userVipLevel === 0 ? 
                "Make a donation to activate referral rewards" : 
                "Referral rewards by VIP level"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {userVipLevel > 0 && (
              <p className="text-xs text-islamic-cream/80 mb-2">
                In this reward system, <span className="text-islamic-gold font-medium">Level 1</span> provides the highest reward rate, while <span className="text-islamic-gold font-medium">Level 5</span> provides the lowest. Your current invitation level is <span className="text-islamic-gold font-medium">{userInviteLevel || "not set"}</span>.
              </p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-islamic-medium/30">
                    <th className="p-2 text-left text-xs font-medium text-islamic-cream/70">Level</th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">VIP 1</th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">VIP 2</th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">VIP 3</th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">VIP 4</th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">VIP 5</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Level 1 */}
                  <tr className={`border-b border-islamic-medium/20 ${userInviteLevel === 1 ? "bg-islamic-gold/10" : ""}`}>
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 1</span>
                        {userInviteLevel === 1 && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 bg-islamic-gold/20 text-islamic-gold rounded-sm">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.level1 || 10}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.level1 || 12}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.level1 || 15}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.level1 || 18}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.level1 || 20}%
                    </td>
                  </tr>

                  {/* Level 2 */}
                  <tr className={`border-b border-islamic-medium/20 ${userInviteLevel === 2 ? "bg-islamic-gold/10" : ""}`}>
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 2</span>
                        {userInviteLevel === 2 && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 bg-islamic-gold/20 text-islamic-gold rounded-sm">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.level2 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.level2 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.level2 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.level2 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.level2 || 4}%
                    </td>
                  </tr>

                  {/* Level 3 */}
                  <tr className={`border-b border-islamic-medium/20 ${userInviteLevel === 3 ? "bg-islamic-gold/10" : ""}`}>
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 3</span>
                        {userInviteLevel === 3 && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 bg-islamic-gold/20 text-islamic-gold rounded-sm">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.level3 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.level3 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.level3 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.level3 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.level3 || 4}%
                    </td>
                  </tr>

                  {/* Level 4 */}
                  <tr className={`border-b border-islamic-medium/20 ${userInviteLevel === 4 ? "bg-islamic-gold/10" : ""}`}>
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 4</span>
                        {userInviteLevel === 4 && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 bg-islamic-gold/20 text-islamic-gold rounded-sm">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.level4 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.level4 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.level4 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.level4 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.level4 || 4}%
                    </td>
                  </tr>

                  {/* Level 5 */}
                  <tr className={`border-b border-islamic-medium/20 ${userInviteLevel === 5 ? "bg-islamic-gold/10" : ""}`}>
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 5</span>
                        {userInviteLevel === 5 && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 bg-islamic-gold/20 text-islamic-gold rounded-sm">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.level5 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.level5 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.level5 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.level5 || 4}%
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.level5 || 4}%
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-islamic-medium/30">
                    <td className="p-2 text-left font-medium">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-islamic-gold" />
                        <span className="text-xs">Total</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {state?.vipInfo?.levels?.[1]?.rewardRates?.total || 20}%
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {state?.vipInfo?.levels?.[2]?.rewardRates?.total || 22}%
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {state?.vipInfo?.levels?.[3]?.rewardRates?.total || 25}%
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {state?.vipInfo?.levels?.[4]?.rewardRates?.total || 28}%
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {state?.vipInfo?.levels?.[5]?.rewardRates?.total || 30}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {userVipLevel > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-islamic-gold/10 border border-islamic-gold/30 text-xs text-islamic-cream/90">
                <p>
                  <span className="font-medium text-islamic-gold">Current Invitation Level:</span> {userInviteLevel > 0 ? userInviteLevel : "Not set"}
                </p>
                <p className="mt-2">
                  Your invitation level determines your referral reward rate. Level 1 offers the highest rewards ({maxVipReward}%) and level 5 offers the lowest ({minVipReward}%).
                  This level is assigned by the system based on your referral performance and activity.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
