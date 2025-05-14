"use client"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { DonationOverview } from "@/components/donation-overview"
import { useDonation } from "@/store/use-donation"
import { useTeamInfo } from "@/hooks/use-team-info"
import { useAuth } from "@/store/use-auth"
import { useEffect, useRef, useState } from "react"
import { getUserInfo, getUserTeamInfo, getUserProfit } from "@/lib/api"

export default function DonationOverviewPage() {
  // 组件初始化
  const { donationData, updateDonation } = useDonation()
  const { teamInfo, refresh: refreshTeamInfo, refreshUserInfo } = useTeamInfo()
  const { user, isAuthenticated, getCurrentUser } = useAuth()
  // 使用ref来保存上一次的totalReferrals值
  const prevTotalReferralsRef = useRef<number | undefined>(undefined)
  // 使用ref来标记数据是否已同步
  const hasDataSyncedRef = useRef(false)
  // 使用ref来标记是否已经刷新用户信息
  const hasRefreshedUserRef = useRef(false)
  // 使用ref来标记是否已经同步提现数据
  const hasWithdrawalDataSyncedRef = useRef(false)
  // 使用ref来标记是否已经获取收益数据
  const hasProfitDataLoadedRef = useRef(false)
  // 添加状态来确保组件已挂载
  const [mounted, setMounted] = useState(false)
  // 添加状态标记是否正在刷新数据
  const [isRefreshing, setIsRefreshing] = useState(false)
  // 添加状态存储用户收益数据
  const [profitData, setProfitData] = useState({ today_profit: 0, max_profit: 0 })
  
  // 客户端挂载
  useEffect(() => {
    setMounted(true)
  }, [isAuthenticated, user])
  
  // 页面加载时获取最新用户信息 - 使用mounted状态确保客户端渲染时才执行
  useEffect(() => {
    if (!mounted) return;
    
    const refreshData = async () => {
      if (!hasRefreshedUserRef.current) {
        try {
          // 直接使用useAuth的getCurrentUser方法获取最新用户信息
          if (isAuthenticated) {
            // 前置检查，清除可能过期的状态
            await getCurrentUser()
            
            // 使用强制刷新参数，确保两个刷新都会执行
            await refreshUserInfo(true)
            await refreshTeamInfo(true)
            
            // 再次获取用户数据以确保同步
            await getCurrentUser()
            
            hasRefreshedUserRef.current = true
          }
        } catch (error) {
          console.error('[DonationOverviewPage] Error refreshing data:', error)
        }
      }
    }
    
    refreshData()
    
    // 添加清理函数
    return () => {
      // 清理操作
    }
  }, [mounted, isAuthenticated, refreshUserInfo, refreshTeamInfo, getCurrentUser])
  
  // 当用户信息发生变化时，同步withdrawAmount和rewardAmount数据
  useEffect(() => {
    if (!mounted) return;
    
    if (isAuthenticated && user && !hasWithdrawalDataSyncedRef.current) {
      // 确保用户对象中存在这些属性
      if (user.withdrawAmount !== undefined || user.rewardAmount !== undefined) {
        // 计算withdrawnAmount和withdrawableAmount
        const withdrawnAmount = user.withdrawAmount ? parseFloat(user.withdrawAmount) : 0
        const withdrawableAmount = user.rewardAmount ? parseFloat(user.rewardAmount) : 0
        
        // 计算总累积金额
        const totalAccumulated = withdrawnAmount + withdrawableAmount
        
        // 更新donation数据
        updateDonation({
          withdrawnAmount,
          withdrawableAmount,
          totalAccumulated,
          // 根据当前给出的提现和奖励估计总额
          totalExpectedReward: totalAccumulated,
          totalMaxReward: Math.round(totalAccumulated * 1.5) // 估计最大可能为当前的1.5倍
        })
        
        // 标记已同步提现数据
        hasWithdrawalDataSyncedRef.current = true
      }
    }
  }, [mounted, user, isAuthenticated, updateDonation])
  
  // 页面加载时记录并同步团队数据，但只执行一次
  useEffect(() => {
    if (!mounted) return;
    
    if (!hasDataSyncedRef.current && teamInfo && teamInfo.totalReferrals !== undefined) {
      prevTotalReferralsRef.current = teamInfo.totalReferrals
      
      // 更新donation数据
      updateDonation({
        referrals: teamInfo.totalReferrals
      })
      
      hasDataSyncedRef.current = true
    }
  }, [mounted, teamInfo, updateDonation])

  // 检测认证状态变化
  useEffect(() => {
    // 如果已认证且组件已挂载，立即尝试获取收益数据
    if (isAuthenticated && mounted && !hasProfitDataLoadedRef.current) {
      // 立即尝试获取收益数据
      getUserProfit().then(res => {
        if (res.success && res.data) {
          setProfitData(res.data)
          // 更新全局donationData中的收益数据
          updateDonation({
            dailyFunds: {
              current: res.data.today_profit,
              max: res.data.max_profit
            }
          })
          hasProfitDataLoadedRef.current = true
        }
      }).catch(err => {
        console.error('[DonationOverviewPage] Error fetching profit data:', err)
      })
    }
  }, [isAuthenticated, user, mounted])

  // 手动刷新数据的函数 
  const handleManualRefresh = async () => {
    // 设置刷新状态
    setIsRefreshing(true);
    
    // 重置所有状态标志
    hasRefreshedUserRef.current = false;
    hasWithdrawalDataSyncedRef.current = false;
    hasDataSyncedRef.current = false;
    hasProfitDataLoadedRef.current = false;
    
    try {
      // 1. 先获取用户信息
      await getUserInfo();
      
      // 2. 然后更新认证状态
      await getCurrentUser();
      
      // 3. 再获取团队信息
      await getUserTeamInfo();
      
      // 4. 获取收益数据
      const profitResponse = await getUserProfit();
      
      if (profitResponse.success && profitResponse.data) {
        setProfitData(profitResponse.data);
        // 更新全局donationData中的收益数据
        updateDonation({
          dailyFunds: {
            current: profitResponse.data.today_profit,
            max: profitResponse.data.max_profit
          }
        });
      }
      
      // 5. 最后通过 hooks 刷新数据以同步到组件状态
      await refreshUserInfo(true);
      await refreshTeamInfo(true);
      
    } catch (error) {
      console.error('[DonationOverviewPage] Manual refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  }
  
  return (
    <BackgroundWrapper>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#1a0d2c]/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="mr-3 text-[#d4b96e]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#d4b96e]">My Donations</h1>
            
            {/* 添加刷新按钮 */}
            <button 
              onClick={handleManualRefresh} 
              disabled={isRefreshing}
              className={`ml-auto text-[#d4b96e] px-4 py-1.5 border border-[#d4b96e]/50 rounded-md flex items-center justify-center ${
                isRefreshing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#d4b96e]/10'
              }`}
            >
              {isRefreshing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#d4b96e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在刷新...
                </>
              ) : (
                <>
                  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  刷新数据
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Use shared component, but don't show bottom buttons */}
        <DonationOverview data={{
          ...donationData,
          referrals: teamInfo?.totalReferrals || donationData.referrals || 0,  // 使用teamInfo中的totalReferrals
          withdrawnAmount: user?.withdrawAmount ? parseFloat(user.withdrawAmount) : donationData.withdrawnAmount,
          withdrawableAmount: user?.rewardAmount ? parseFloat(user.rewardAmount) : donationData.withdrawableAmount,
          dailyFunds: {
            current: profitData.today_profit,  // 使用API获取的今日收益
            max: profitData.max_profit         // 使用API获取的最高收益
          }
        }} showButtons={false} />

        {/* Here you can add more detailed information */}
        <div className="mt-6 p-5 rounded-xl bg-[#1a0d2c]/90 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-[#d4b96e] mb-4">Donation Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Date</span>
              <span className="text-sm font-medium text-islamic-cream">{donationData.startDate}</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Amount</span>
              <span className="text-sm font-medium text-islamic-cream">{donationData.totalDonation || 0} U</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Period</span>
              <span className="text-sm font-medium text-islamic-cream">40 days</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">VIP Level</span>
              <span className="text-sm font-medium text-islamic-cream">VIP {donationData.vipLevel || 0}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Total Referrals</span>
              <span className="text-sm font-medium text-islamic-cream">{teamInfo?.totalReferrals || 0}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Withdrawable Amount</span>
              <span className="text-sm font-medium text-islamic-cream">{user?.rewardAmount || "0"} USDT</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Withdrawn Amount</span>
              <span className="text-sm font-medium text-islamic-cream">{user?.withdrawAmount || "0"} USDT</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-islamic-cream/80">Transaction ID</span>
              <span className="text-sm font-medium text-islamic-cream">TX123456789</span>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}
