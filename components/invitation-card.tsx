"use client"

import { Share2, InfoIcon, User, UserPlus, Percent, Users, UsersIcon, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

export interface InvitationCardProps {
  data: {
    totalReferrals: number
    directReferrals: number
    indirectReferrals: number
    totalRewards: number
    rewardRate: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
    basicReward: {
      current: number
      max: number
    }
    maxReferralReward: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
  }
  className?: string
}

export function InvitationCard({ data, className = "" }: InvitationCardProps) {
  const [basicInfoOpen, setBasicInfoOpen] = useState(false)
  const [referralInfoOpen, setReferralInfoOpen] = useState(false)

  const handleShare = () => {
    // Implementation of sharing logic, such as opening a share dialog
    console.log("Share invitation link")
  }

  // Get reward rate style based on direct referral count
  const getRateClass = (referrals: number) => {
    if (data.directReferrals >= referrals) {
      return "border-islamic-gold/50 bg-islamic-gold/10 text-islamic-gold"
    }
    return "border-islamic-medium/50 bg-islamic-medium/30 text-islamic-cream/90"
  }

  // Calculate progress percentage for the reward rate
  const rewardProgress = (data.rewardRate.total / data.maxReferralReward.total) * 100

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
        {/* Invitation Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <span className="text-sm text-islamic-cream/70 mb-1">Total</span>
            <span className="text-4xl font-bold text-[#8dc63f]">{data.totalReferrals}</span>
            <Users className="h-5 w-5 text-islamic-cream/50 mt-2" />
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <span className="text-sm text-islamic-cream/70 mb-1">Direct</span>
            <span className="text-4xl font-bold text-[#8dc63f]">{data.directReferrals}</span>
            <UserPlus className="h-5 w-5 text-islamic-cream/50 mt-2" />
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <span className="text-sm text-islamic-cream/70 mb-1">Indirect</span>
            <span className="text-4xl font-bold text-[#8dc63f]">{data.indirectReferrals}</span>
            <UsersIcon className="h-5 w-5 text-islamic-cream/50 mt-2" />
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-islamic-cream/70">Current </span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-islamic-gold">{data.basicReward.current}%</span>
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

              <div className="flex items-center justify-between">
                <span className="text-xs text-islamic-cream/70">Maximum</span>
                <span className="text-sm font-medium text-islamic-gold/80">{data.basicReward.max}%</span>
              </div>
            </div>
          </div>

          {/* Referral Reward Card */}
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center mb-3">
              <UserPlus className="h-4 w-4 text-islamic-gold mr-2" />
              <span className="text-sm text-islamic-gold">Referral Rewards</span>
            </div>

            {/* Visual representation of reward range - simplified */}
            <div className="mb-3">
              {/* Progress bar with markers - aligned with percentage icon */}
              <div className="relative pt-1 pb-3">
                <div className="flex mb-1 items-center justify-between">
                  <div className="text-xs text-islamic-cream/70">20%</div>
                  <div className="text-xs text-islamic-cream/70">30%</div>
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
                  style={{ left: `${rewardProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-xs text-islamic-cream">Current Rewards</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-islamic-gold">{data.rewardRate.total}%</span>
                <span className="text-xs text-islamic-cream/60 mx-1">of</span>
                <span className="text-xs text-islamic-cream/80">{data.maxReferralReward.total}%</span>
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
            Invite friends to donate and receive up to 30% of their donation amount as rewards, while also increasing
            your daily basic donation reward rate!
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4">
        <Link href="/promotion/share" className="w-full">
          <Button className="w-full bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] flex items-center justify-center">
            Invite Now
            <Share2 className="ml-2 h-4 w-4" />
          </Button>
        </Link>
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
                  <span className="text-sm">No Referrals</span>
                  <span className="font-medium">1%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(1)}`}>
                  <span className="text-sm">1 Referral</span>
                  <span className="font-medium">1.5%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(3)}`}>
                  <span className="text-sm">3 Referrals</span>
                  <span className="font-medium">2%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(5)}`}>
                  <span className="text-sm">5 Referrals</span>
                  <span className="font-medium">2.5%</span>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                You have currently referred {data.directReferrals} people, poverty relief fund rate is{" "}
                {data.directReferrals === 0
                  ? "1%"
                  : data.directReferrals >= 5
                    ? "2.5%"
                    : data.directReferrals >= 3
                      ? "2%"
                      : "1.5%"}
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
              Referral Reward Details
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">Learn more about referral rewards</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-islamic-gold">Referral Reward Details</h3>
              <p className="text-xs text-islamic-cream/80">
                Refer up to 5 generations and receive a total of 30% poverty relief rewards from donation funds. As your
                VIP level increases, your referral reward rates will also increase.
              </p>

              <div className="space-y-2">
                <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">VIP 1</span>
                    <span className="font-medium text-islamic-gold">Total 20%</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center">
                      <div className="text-islamic-cream/70">1st Gen</div>
                      <div className="font-medium">10%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">2nd Gen</div>
                      <div className="font-medium">4%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">3rd Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">4th Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">5th Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">VIP 5</span>
                    <span className="font-medium text-islamic-gold">Total 30%</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center">
                      <div className="text-islamic-cream/70">1st Gen</div>
                      <div className="font-medium">20%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">2nd Gen</div>
                      <div className="font-medium">4%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">3rd Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">4th Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-islamic-cream/70">5th Gen</div>
                      <div className="font-medium">2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-islamic-cream/70 italic">
                Refer more friends to participate in donations to not only receive more rewards but also increase your
                basic reward rate.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
