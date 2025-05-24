"use client"

import { useState, useEffect } from "react"
import { User, ArrowRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import { MainLayout } from "@/components/main-layout"
import { useUser } from "@/store/use-user"
import { useDonation } from "@/store/use-donation"
import { useAuth } from "@/store/use-auth"
import { useTeam } from "@/store/use-team"
import Link from "next/link"
import { getUserProfit } from "@/lib/api"

export default function ProfilePage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const { userData } = useUser()
  const { donationData, updateDonation } = useDonation()
  const { user, logout } = useAuth()
  const { teamData, refreshTeamInfo } = useTeam()
  
  // 客户端渲染状态
  const [mounted, setMounted] = useState(false)
  
  // 初始数据，避免水合不匹配
  const [displayData, setDisplayData] = useState({
    username: "User",
    email: "user@example.com",
    vipLevel: 0,
    totalDonation: 0,
    referrals: 0,
    isVerified: false,
    reliefFunds: 0,
    withdrawable: 0,
  })
  
  // 客户端挂载后更新数据
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // 获取收益数据
  useEffect(() => {
    if (mounted && user) {
      // 获取最新的收益数据
      getUserProfit().then(res => {
        if (res.success && res.data) {
          // 更新 donation 数据中的 dailyFunds
          updateDonation({
            dailyFunds: {
              current: res.data.today_profit,
              max: res.data.max_profit
            }
          });
        } else if (res.error) {
          console.error('[ProfilePage] Failed to get profit data:', res.error);
        }
      }).catch(err => {
        console.error('[ProfilePage] Error fetching profit data:', err);
      });
    }
  }, [mounted, user]);
  
  // 确保在组件挂载后获取团队数据
  useEffect(() => {
    const fetchTeamData = async () => {
      if (mounted && user) {
        try {
          // 刷新团队数据
          await refreshTeamInfo();
        } catch (error) {
          console.error('[ProfilePage] Failed to fetch team data:', error);
        }
      }
    };
    
    fetchTeamData();
  }, [mounted, user, refreshTeamInfo]);
  
  // 用户数据变更时更新显示数据
  useEffect(() => {
    if (mounted) {
      setDisplayData({
        username: user?.username || userData?.username || "User",
        email: user?.email || "user@example.com",
        vipLevel: userData?.vipLevel || 0,
        totalDonation: userData?.totalDonation || 0,
        referrals: userData?.referrals || 0,
        isVerified: user?.isVerified || false,
        reliefFunds: (donationData?.totalAccumulated || 0),
        withdrawable: donationData?.withdrawableAmount || 0,
      })
    }
  }, [mounted, userData, user, donationData])

  return (
    <MainLayout title="Profile" currentPath="/profile">
      {/* User Profile Card */}
      <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a3d2b] to-[#d4b96e]"></div>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full bg-[#d4b96e]/10 flex items-center justify-center mr-4 border-2 border-[#d4b96e]">
              <User className="h-8 w-8 text-[#d4b96e]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#8dc63f] rounded-full border-2 border-[#131b29]"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#d4b96e]">{displayData.username}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="ml-auto border-[#d4b96e] text-[#d4b96e] hover:bg-[#d4b96e] hover:text-[#0a3d2b]"
                >
                  Logout
                </Button>
              </div>
              <p className="text-xs text-islamic-cream/70 mt-1">{displayData.email}</p>
              <p className="text-sm text-islamic-cream/70 mt-1">
                VIP {displayData.vipLevel} · {displayData.isVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>

          {/* User profile content */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Total Donations</p>
              <p className="text-lg font-bold text-[#d4b96e]">{displayData.totalDonation} U</p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Relief Funds</p>
              <p className="text-lg font-bold text-[#8dc63f]">{donationData?.totalAccumulated || 0} U</p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">Referrals</p>
              <p className="text-lg font-bold text-[#d4b96e]">{displayData.referrals}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Donation Overview Card */}
      <Link href="/donation">
        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-[#d4b96e]">My Donation Overview</h3>
              <ArrowRight className="h-4 w-4 text-islamic-cream/70" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-islamic-cream/70">Total Donation Amount</p>
                <p className="text-lg font-bold text-[#d4b96e]">{userData?.totalDonation || 0} U</p>
                <p className="text-xs text-islamic-cream/70 mt-1">VIP Level {userData?.vipLevel || 0}</p>
              </div>
              <div>
                <p className="text-xs text-islamic-cream/70">Daily Relief Funds</p>
                <p className="text-lg font-bold text-[#8dc63f]">
                  {donationData?.dailyFunds?.current || 0}-{donationData?.dailyFunds?.max || 0} U
                </p>
                <p className="text-xs text-islamic-cream/70 mt-1">{userData?.referrals || 0} referrals</p>
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
                <span className="text-sm font-medium">{teamData.directReferrals || 0} people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Team Size</span>
                <span className="text-sm font-medium">{teamData.totalReferrals || 0} people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Total Donations</span>
                <span className="text-sm font-medium">{teamData.totalRewards || 0} U</span>
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
                <span className="text-sm font-medium text-[#8dc63f]">{donationData?.dailyFunds?.current || 0} U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accumulated Relief Funds</span>
                <span className="text-sm font-medium text-[#8dc63f]">{donationData?.totalAccumulated || 0} U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Rewards</span>
                <span className="text-sm font-medium text-[#8dc63f]">{teamData.totalRewards || 0} U</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Available to Withdraw</span>
                <span className="text-sm font-medium text-[#8dc63f]">{displayData.withdrawable} U</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        availableAmount={displayData.withdrawable}
      />
    </MainLayout>
  )
}
