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
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
            <Users className="h-8 w-8 text-islamic-cream/50 mr-3" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{data.totalReferrals}</span>
              <span className="text-xs text-islamic-cream/70">Total</span>
            </div>
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
            <UserPlus className="h-8 w-8 text-islamic-cream/50 mr-3" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{data.directReferrals}</span>
              <span className="text-xs text-islamic-cream/70">Direct</span>
            </div>
          </div>
          <div className="bg-islamic-medium/70 backdrop-blur-sm rounded-lg p-4 flex items-center">
            <UsersIcon className="h-8 w-8 text-islamic-cream/50 mr-3" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#8dc63f] leading-tight">{data.indirectReferrals}</span>
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
                  <div className="text-xs text-islamic-cream/70">1%</div>
                  <div className="text-xs text-islamic-cream/70">{data.basicReward.max}%</div>
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
                  style={{ left: `${(data.basicReward.current / data.basicReward.max) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-islamic-gold mr-2" />
                <span className="text-xs text-islamic-cream">Current Rewards</span>
              </div>
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
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>0</span>
                  </span>
                  <span className="font-medium">1%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(1)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>1</span>
                  </span>
                  <span className="font-medium">1.5%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(3)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>3</span>
                  </span>
                  <span className="font-medium">2%</span>
                </div>

                <div className={`flex justify-between items-center p-2 rounded-md border ${getRateClass(5)}`}>
                  <span className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2 opacity-70" />
                    <span>5</span>
                  </span>
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

      {/* Referral Reward Details Dialog - UPDATED WITH TABLE FORMAT */}
      <Dialog open={referralInfoOpen} onOpenChange={setReferralInfoOpen}>
        <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Referral Reward Details
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">Referral rewards by VIP level</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
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
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 1</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">10%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">12%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">15%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">18%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">20%</td>
                  </tr>

                  {/* Level 2 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 2</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">4%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">4%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">4%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">4%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">4%</td>
                  </tr>

                  {/* Level 3 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 3</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                  </tr>

                  {/* Level 4 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 4</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                  </tr>

                  {/* Level 5 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">Level 5</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">2%</td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-islamic-medium/30">
                    <td className="p-2 text-left font-medium">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-islamic-gold" />
                        <span className="text-xs">Total</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">20%</td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">22%</td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">25%</td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">28%</td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">30%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-islamic-cream/70 italic mt-2">
              Refer more friends to increase your VIP level and earn higher referral rewards.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
