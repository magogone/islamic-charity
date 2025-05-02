"use client"

import { Settings, User, ArrowRight, Wallet } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import { MainLayout } from "@/components/main-layout"
import { useUser } from "@/store/use-user"
import { useDonation } from "@/store/use-donation"
import Link from "next/link"

export default function ProfilePage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const { userData } = useUser()
  const { donationData } = useDonation()

  const rightIcon = (
    <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
      <Settings className="h-5 w-5 text-islamic-gold" />
      <span className="sr-only">Settings</span>
    </Button>
  )

  return (
    <MainLayout title="Profile" currentPath="/profile" rightIcon={rightIcon}>
      {/* User Profile Card */}
      <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a3d2b] to-[#d4b96e]"></div>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full bg-[#d4b96e]/10 flex items-center justify-center mr-4 border-2 border-[#d4b96e]">
              <User className="h-8 w-8 text-[#d4b96e]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#8dc63f] rounded-full border-2 border-[#131b29]"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#d4b96e]">{userData.username}</h2>
              <p className="text-sm text-islamic-cream/70">VIP {userData.vipLevel} · Verified</p>
            </div>
          </div>

          {/* User profile content */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Total Donations</p>
              <p className="text-lg font-bold text-[#d4b96e]">{userData.totalDonation} U</p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Relief Funds</p>
              <p className="text-lg font-bold text-[#8dc63f]">{donationData.totalAccumulated} U</p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Referrals</p>
              <p className="text-lg font-bold text-[#d4b96e]">{userData.referrals}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Donation Overview Card */}
      <Link href="/profile/donation-overview">
        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-[#d4b96e]">My Donation Overview</h3>
              <ArrowRight className="h-4 w-4 text-islamic-cream/70" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-islamic-cream/70">Total Donation Amount</p>
                <p className="text-lg font-bold text-[#d4b96e]">{donationData.totalDonation} U</p>
                <p className="text-xs text-islamic-cream/70 mt-1">VIP Level {donationData.vipLevel}</p>
              </div>
              <div>
                <p className="text-xs text-islamic-cream/70">Daily Relief Funds</p>
                <p className="text-lg font-bold text-[#8dc63f]">
                  {donationData.dailyFunds.current}-{donationData.dailyFunds.max} U
                </p>
                <p className="text-xs text-islamic-cream/70 mt-1">{donationData.referrals} referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Other profile content */}
      <div className="space-y-4">
        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-4">
            <h3 className="text-base font-medium text-[#d4b96e] mb-3">My Team</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Direct Referrals</span>
                <span className="text-sm font-medium">{userData.referrals} people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Team Size</span>
                <span className="text-sm font-medium">5 people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Total Donations</span>
                <span className="text-sm font-medium">500 U</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-[#d4b96e]">My Earnings</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10"
                onClick={() => setWithdrawOpen(true)}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Today's Relief Funds</span>
                <span className="text-sm font-medium text-[#8dc63f]">{donationData.dailyFunds.current} U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accumulated Relief Funds</span>
                <span className="text-sm font-medium text-[#8dc63f]">{donationData.totalAccumulated} U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Rewards</span>
                <span className="text-sm font-medium text-[#8dc63f]">25 U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Available to Withdraw</span>
                <span className="text-sm font-medium text-[#8dc63f]">{donationData.withdrawableAmount} U</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        availableAmount={donationData.withdrawableAmount}
      />
    </MainLayout>
  )
}
