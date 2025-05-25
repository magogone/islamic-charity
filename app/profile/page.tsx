"use client"

import { useState, useEffect, useCallback } from "react"
import { User, ArrowRight, Wallet, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import { MainLayout } from "@/components/main-layout"
import { useUser } from "@/store/use-user"
import { useDonation } from "@/store/use-donation"
import { useAuth } from "@/store/use-auth"
import { useTeam } from "@/store/use-team"
import { useToast } from "@/components/ui/toast"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import { getUserProfit, getUserInfo } from "@/lib/api"

export default function ProfilePage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const { userData } = useUser()
  const { donationData, updateDonation } = useDonation()
  const { user, logout } = useAuth()
  const { teamData, refreshTeamInfo } = useTeam()
  const { success } = useToast()
  const { t } = useTranslation()
  
  // 客户端渲染状态
  const [mounted, setMounted] = useState(false)
  
  // 加载状态管理
  const [loadingStates, setLoadingStates] = useState({
    userLoading: true,
    donationLoading: true,
    teamLoading: true,
  })
  
  // 添加强制刷新状态
  const [forceRefresh, setForceRefresh] = useState(0)
  
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
  
  // 手动刷新数据的函数
  const refreshData = useCallback(async () => {
    if (!mounted || !user) return
    
    setLoadingStates({
      userLoading: true,
      donationLoading: true,
      teamLoading: true,
    })
    
    try {
      // 1. 获取最新的用户信息（包含提现数据）
      const userResponse = await getUserInfo()
      if (userResponse.success && userResponse.data && userResponse.data.user) {
        const userData = userResponse.data.user
        
        // 计算提现相关数据
        const withdrawnAmount = userData.withdraw_amount ? parseFloat(userData.withdraw_amount) : 0
        const withdrawableAmount = userData.reward_amount ? parseFloat(userData.reward_amount) : 0
        const totalAccumulated = withdrawnAmount + withdrawableAmount
        
        // 更新 donation 数据中的提现相关信息
        updateDonation({
          withdrawnAmount,
          withdrawableAmount,
          totalAccumulated,
          totalExpectedReward: totalAccumulated,
          totalMaxReward: Math.round(totalAccumulated * 1.5)
        })
      }
      
      // 2. 获取最新的收益数据
      const profitResponse = await getUserProfit()
      if (profitResponse.success && profitResponse.data) {
        updateDonation({
          dailyFunds: {
            current: profitResponse.data.today_profit,
            max: profitResponse.data.max_profit
          }
        })
      }
      
      // 3. 刷新团队数据
      await refreshTeamInfo()
      
      // 4. 强制触发重新渲染
      setForceRefresh(prev => prev + 1)
      
      // 显示成功提示
      success(t('profile.dataRefreshedSuccessfully'))
      
    } catch (error) {
      console.error('[ProfilePage] Refresh error:', error)
    } finally {
      setLoadingStates({
        userLoading: false,
        donationLoading: false,
        teamLoading: false,
      })
    }
  }, [mounted, user, updateDonation, refreshTeamInfo, success, t])
  
  // 监听用户认证状态变化
  useEffect(() => {
    if (mounted) {
      setLoadingStates(prev => ({
        ...prev,
        userLoading: !user,
      }))
    }
  }, [mounted, user])
  
  // 监听捐赠数据变化 - 添加强制刷新触发器
  useEffect(() => {
    if (mounted) {
      setLoadingStates(prev => ({
        ...prev,
        donationLoading: !donationData,
      }))
    }
  }, [mounted, donationData, forceRefresh])
  
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
      
      // 同时获取用户信息以确保有最新的提现数据
      getUserInfo().then(userResponse => {
        if (userResponse.success && userResponse.data && userResponse.data.user) {
          const userData = userResponse.data.user
          
          // 计算提现相关数据
          const withdrawnAmount = userData.withdraw_amount ? parseFloat(userData.withdraw_amount) : 0
          const withdrawableAmount = userData.reward_amount ? parseFloat(userData.reward_amount) : 0
          const totalAccumulated = withdrawnAmount + withdrawableAmount
          
          // 更新 donation 数据中的提现相关信息
          updateDonation({
            withdrawnAmount,
            withdrawableAmount,
            totalAccumulated,
            totalExpectedReward: totalAccumulated,
            totalMaxReward: Math.round(totalAccumulated * 1.5)
          })
        }
      }).catch(err => {
        console.error('[ProfilePage] Error fetching user info:', err);
      });
    }
  }, [mounted, user, forceRefresh]); // 添加forceRefresh依赖
  
  // 确保在组件挂载后获取团队数据
  useEffect(() => {
    const fetchTeamData = async () => {
      if (mounted && user) {
        try {
          setLoadingStates(prev => ({ ...prev, teamLoading: true }))
          // 刷新团队数据
          await refreshTeamInfo();
          setLoadingStates(prev => ({ ...prev, teamLoading: false }))
        } catch (error) {
          console.error('[ProfilePage] Failed to fetch team data:', error);
          setLoadingStates(prev => ({ ...prev, teamLoading: false }))
        }
      }
    };
    
    fetchTeamData();
  }, [mounted, user, refreshTeamInfo, forceRefresh]); // 添加forceRefresh依赖
  
  // 只在所有必要数据都加载完成且发生变化时才更新 displayData
  useEffect(() => {
    if (mounted && user && (!loadingStates.userLoading || !loadingStates.donationLoading)) {
      // 创建新的显示数据
      const newDisplayData = {
        username: user?.username || userData?.username || "User",
        email: user?.email || "user@example.com",
        vipLevel: userData?.vipLevel || 0,
        totalDonation: userData?.totalDonation || 0,
        referrals: userData?.referrals || 0,
        isVerified: user?.isVerified || false,
        reliefFunds: donationData?.totalAccumulated || 0,
        withdrawable: donationData?.withdrawableAmount || 0,
      }
      
      // 只有数据真正发生变化时才更新，避免不必要的重渲染
      setDisplayData(prevData => {
        const hasChanged = Object.keys(newDisplayData).some(key => 
          prevData[key as keyof typeof prevData] !== newDisplayData[key as keyof typeof newDisplayData]
        )
        
        return hasChanged ? newDisplayData : prevData
      })
    }
  }, [mounted, user, userData, donationData, donationData?.lastUpdated, loadingStates.userLoading, loadingStates.donationLoading, forceRefresh]) // 添加lastUpdated依赖

  // 页面可见性变化时自动刷新数据
  useEffect(() => {
    if (!mounted) return
    
    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        // 延迟一下再刷新，避免太频繁
        setTimeout(() => {
          refreshData()
        }, 1000)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [mounted, user, refreshData])
  
  // 计算是否还有数据在加载中
  const isDataLoading = loadingStates.userLoading || loadingStates.donationLoading

  return (
    <MainLayout title={t('profile.title')} currentPath="/profile">
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
                <h2 className="text-lg font-bold text-[#d4b96e]">
                  {isDataLoading ? t('common.loading') : displayData.username}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshData}
                    disabled={isDataLoading}
                    className="border-[#d4b96e] text-[#d4b96e] hover:bg-[#d4b96e]/10"
                  >
                    <RefreshCw className={`h-4 w-4 ${isDataLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="border-[#d4b96e] text-[#d4b96e] hover:bg-[#d4b96e] hover:text-[#0a3d2b]"
                  >
                    {t('common.logout')}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-islamic-cream/70 mt-1">{displayData.email}</p>
              <p className="text-sm text-islamic-cream/70 mt-1">
                {t('profile.vipLevel')} {isDataLoading ? "..." : displayData.vipLevel} · {displayData.isVerified ? t('profile.verified') : t('profile.unverified')}
              </p>
            </div>
          </div>

          {/* User profile content */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">{t('profile.totalDonations')}</p>
              <p className="text-lg font-bold text-[#d4b96e]">
                {isDataLoading ? "..." : displayData.totalDonation} {t('units.u')}
              </p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">{t('profile.reliefFunds')}</p>
              <p className="text-lg font-bold text-[#8dc63f]">
                {isDataLoading ? "..." : displayData.reliefFunds} {t('units.u')}
              </p>
            </div>
            <div className="bg-[#1a1f2c] p-3 rounded-lg text-center">
              <p className="text-xs text-islamic-cream/70 mb-1">{t('profile.referrals')}</p>
              <p className="text-lg font-bold text-[#d4b96e]">
                {isDataLoading ? "..." : displayData.referrals}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Donation Overview Card */}
      <Link href="/donation">
        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-[#d4b96e]">{t('profile.myDonationOverview')}</h3>
              <ArrowRight className="h-4 w-4 text-islamic-cream/70" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-islamic-cream/70">{t('donation.totalDonationAmount')}</p>
                <p className="text-lg font-bold text-[#d4b96e]">{displayData.totalDonation} {t('units.u')}</p>
                <p className="text-xs text-islamic-cream/70 mt-1">{t('profile.vipLevel')} {displayData.vipLevel}</p>
              </div>
              <div>
                <p className="text-xs text-islamic-cream/70">{t('donation.dailyReliefFunds')}</p>
                <p className="text-lg font-bold text-[#8dc63f]">
                  {donationData?.dailyFunds?.current || 0}-{donationData?.dailyFunds?.max || 0} {t('units.u')}
                </p>
                <p className="text-xs text-islamic-cream/70 mt-1">{displayData.referrals} {t('profile.referrals')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Other profile content */}
      <div className="space-y-4">
        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-4">
            <h3 className="text-base font-medium text-[#d4b96e] mb-3">{t('profile.myTeam')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.directReferrals')}</span>
                <span className="text-sm font-medium">{teamData.directReferrals || 0} {t('profile.people')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.totalTeamSize')}</span>
                <span className="text-sm font-medium">{teamData.totalReferrals || 0} {t('profile.people')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.teamTotalDonations')}</span>
                <span className="text-sm font-medium">{teamData.totalRewards || 0} {t('units.u')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#d4b96e]/20 bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-[#d4b96e]">{t('profile.myEarnings')}</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10"
                onClick={() => setWithdrawOpen(true)}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {t('withdraw.title')}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.todayReliefFunds')}</span>
                <span className="text-sm font-medium text-[#8dc63f]">{donationData?.dailyFunds?.current || 0} {t('units.u')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.accumulatedReliefFunds')}</span>
                <span className="text-sm font-medium text-[#8dc63f]">{displayData.reliefFunds} {t('units.u')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.teamRewards')}</span>
                <span className="text-sm font-medium text-[#8dc63f]">{teamData.totalRewards || 0} {t('units.u')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('profile.availableToWithdraw')}</span>
                <span className="text-sm font-medium text-[#8dc63f]">{displayData.withdrawable} {t('units.u')}</span>
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
