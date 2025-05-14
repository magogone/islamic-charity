"use client"

import { useEffect, useState, useCallback, useRef } from 'react'
import { getUserTeamInfo, getUserInfo } from '@/lib/api'
import { useStore } from '@/store/store-context'
import { useAuth } from '@/store/use-auth'

// 创建一个全局标志，表示是否已经加载过数据
// 这样即使组件重新挂载也不会再次触发加载
let globalHasLoaded = false

export function useTeamInfo() {
  const { state, dispatch } = useStore()
  const { isAuthenticated, getCurrentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [mounted, setMounted] = useState(false)
  // 添加一个ref记录是否已成功加载过数据
  const hasSuccessfullyLoadedRef = useRef(false)
  // 添加一个ref来防止重复请求
  const isLoadingRef = useRef(false)
  // 添加一个ref来追踪上次请求时间
  const lastFetchTimeRef = useRef(0)
  // 添加一个实例级别的初始化标志
  const didInitializeRef = useRef(false)
  // 添加一个ref来标记是否已经刷新过用户信息
  const hasRefreshedUserRef = useRef(false)
  
  // Set mounted status on client side
  useEffect(() => {
    setMounted(true)
    // 初始化工作只做一次
    didInitializeRef.current = true;
    
    // Cleanup function to prevent memory leaks
    return () => {
      // 组件卸载时可以执行任何必要的清理工作
    };
  }, [])

  // 刷新用户信息
  const refreshUserInfo = useCallback(async (force = false) => {
    
    // 如果设置了强制刷新，无论何种情况都重置状态并发送请求
    if (force) {
      hasRefreshedUserRef.current = false;
    } else if (hasRefreshedUserRef.current) {
      // 不带force标志且已经刷新过，则跳过
      return null;
    }
    
    // 检查认证状态
    if (!isAuthenticated) {
      console.warn('[useTeamInfo] Not authenticated, cannot refresh user info');
      return null;
    }
    
    try {
      // 直接调用API，不添加任何条件检查
      const userResponse = await getUserInfo();
      
      if (userResponse.success && userResponse.data && userResponse.data.user) {
        // 标记为已刷新
        hasRefreshedUserRef.current = true;
        
        // 调用auth hook的更新方法
        if (getCurrentUser) {
          await getCurrentUser();
        } else {
          console.warn('[useTeamInfo] getCurrentUser function not available');
        }
        
        return true;
      } else {
        console.error('[useTeamInfo] Failed to refresh user info, invalid response:', userResponse);
        return false;
      }
    } catch (error) {
      console.error('[useTeamInfo] Error refreshing user info:', error);
      return false;
    }
  }, [isAuthenticated, getCurrentUser]);

  /**
   * 获取团队信息
   */
  const fetchTeamInfo = useCallback(async (force = false) => {
    // 如果设置了强制刷新，重置状态
    if (force) {
      // 仅重置当前实例的状态，全局标志仍然保持，避免其他组件也重复加载
      hasSuccessfullyLoadedRef.current = false;
    } else {
      // 如果已经成功加载过数据且不是强制刷新，直接返回
      if (hasSuccessfullyLoadedRef.current) {
        return null;
      }
      
      // 未登录状态下，无法请求团队信息
      if (!isAuthenticated) {
        console.warn('[useTeamInfo] Not authenticated, cannot fetch team info');
        return null;
      }
      
      // 如果已经在请求中，则跳过
      if (isLoadingRef.current) {
        return null;
      }
      
      // 节流控制: 5秒内只允许一次请求，除非是强制刷新
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTimeRef.current;
      if (timeSinceLastFetch < 5000) { 
        return null;
      }
    }
    
    try {
      setLoading(true);
      isLoadingRef.current = true;
      lastFetchTimeRef.current = Date.now();
      setError(null);
      
      // 先刷新用户信息，强制传入和当前调用相同的force参数
      await refreshUserInfo(force);
      
      // 调用获取团队信息API
      const response = await getUserTeamInfo();
      
      if (!response.success || !response.data) {
        console.error('[useTeamInfo] Failed to get team information:', response);
        throw new Error('Failed to get team information');
      }
      
      const teamData = response.data;
      
      // 计算间接邀请人数
      const indirectReferrals = 
        Math.max(0, teamData.total_invite_count - teamData.direct_invite_count);
      
      // 更新store中的团队数据
      dispatch({
        type: "UPDATE_INVITATION",
        payload: {
          directReferrals: teamData.direct_invite_count,
          totalReferrals: teamData.total_invite_count,
          indirectReferrals: indirectReferrals,
          totalRewards: parseInt(teamData.total_reward) || 0
        }
      });
      
      // 更新直接面向用户的信息
      dispatch({
        type: "UPDATE_TEAM",
        payload: {
          directReferrals: teamData.direct_invite_count,
          totalReferrals: teamData.total_invite_count,
          teamTotalDonations: parseInt(teamData.invitee_donate_amount) || 0,
          totalRewards: parseInt(teamData.total_reward) || 0
        }
      });
      
      // 标记为已成功加载数据
      hasSuccessfullyLoadedRef.current = true;
      globalHasLoaded = true;
      
      return teamData;
    } catch (error) {
      console.error('[useTeamInfo] Failed to load team info:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
      return null;
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [dispatch, isAuthenticated, refreshUserInfo]);
  
  // 首次加载时获取团队信息
  useEffect(() => {
    // 满足所有条件时执行:
    // 1. 客户端已挂载
    // 2. 用户已认证
    // 3. 全局还未加载过数据
    // 4. 当前实例需要初始化
    if (mounted && isAuthenticated && !globalHasLoaded && didInitializeRef.current) {
      fetchTeamInfo();
    }
  }, [mounted, isAuthenticated, fetchTeamInfo]);
  
  // 暴露一个手动刷新方法，但会进行防抖节流
  const refresh = useCallback((forceRefresh = false) => {
    return fetchTeamInfo(forceRefresh);
  }, [fetchTeamInfo]);
  
  return {
    teamInfo: {
      directReferrals: state.invitation.directReferrals,
      totalReferrals: state.invitation.totalReferrals,
      indirectReferrals: state.invitation.indirectReferrals,
      totalRewards: state.invitation.totalRewards
    },
    loading,
    error,
    refresh,
    refreshUserInfo
  }
} 
