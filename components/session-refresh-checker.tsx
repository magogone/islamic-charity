"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/store/use-auth"
import { getSessionCheckStatus, resetSessionCheckStatus } from "./auth-session-checker"

// 追踪上次活动时间的全局变量
let lastActivityTimestamp = 0;
let isCheckingSession = false;
// 控制初始化检查的变量
let hasInitialCheck = false;

/**
 * 检查是否有认证 cookie
 */
function hasAuthCookie(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 检查 cookie 中是否有认证 cookie
  return document.cookie.includes('charity_session=');
}

/**
 * 组件用于监测页面刷新和重新加载时，自动刷新用户会话
 * 此组件不渲染任何UI，仅在后台管理会话刷新逻辑
 * 注意: 此组件不负责初始会话检查，仅负责后续的会话刷新
 */
export function SessionRefreshChecker() {
  const { checkSession, isAuthenticated, user } = useAuth();
  const initializedRef = useRef(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  
  // 初始化并设置事件监听
  useEffect(() => {
    // 防止重复初始化
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;
    
    // 当主会话检查完成时的处理函数
    const handleSessionChecked = (event: CustomEvent) => {
      // 主会话检查已完成，可以设置时间戳
      lastActivityTimestamp = Date.now();
      sessionStorage.setItem('last_activity', lastActivityTimestamp.toString());
      hasInitialCheck = true;
    };
    
    // 添加事件监听器，当主会话检查完成时触发
    window.addEventListener('auth-session-checked', handleSessionChecked as EventListener);
    
    // 页面可见性变化时的处理函数
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      setIsPageVisible(isVisible);
      
      if (isVisible) {
        const currentTime = Date.now();
        // 如果页面变为可见且距离上次活动超过30秒，可能从其他标签页切换回来
        if (currentTime - lastActivityTimestamp > 30000 && !isCheckingSession) {
          // 防止重复请求
          isCheckingSession = true;
          
          // 重置会话检查标志，确保在tab切换回来时能重新检查认证状态
          if (!isAuthenticated) {
            resetSessionCheckStatus();
          }
          
          // 在变为可见后重新检查会话
          checkSession().finally(() => {
            isCheckingSession = false;
            lastActivityTimestamp = Date.now();
            sessionStorage.setItem('last_activity', Date.now().toString());
          });
        }
      }
    };
    
    // 添加页面可见性监听器
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 初始化完成后更新时间戳
    if (!lastActivityTimestamp) {
      lastActivityTimestamp = Date.now();
      sessionStorage.setItem('last_activity', lastActivityTimestamp.toString());
    }
    
    // 设置定时器，每分钟检查一次会话状态
    const sessionCheckInterval = setInterval(() => {
      // 只在页面可见且用户已认证时执行定期检查
      if (isPageVisible && isAuthenticated && !isCheckingSession) {
        isCheckingSession = true;
        
        checkSession().finally(() => {
          isCheckingSession = false;
          lastActivityTimestamp = Date.now();
        });
      }
    }, 60000); // 每分钟检查一次
    
    // 清理函数
    return () => {
      window.removeEventListener('auth-session-checked', handleSessionChecked as EventListener);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(sessionCheckInterval);
    };
  }, [checkSession, isAuthenticated]);
  
  // 使用单独的effect处理用户数据问题
  useEffect(() => {
    // 等待主会话检查完成
    if (!hasInitialCheck || !getSessionCheckStatus()) {
      return;
    }
    
    // 只有在用户已认证但数据不完整的情况下才刷新
    if (isAuthenticated && user && (!user.donateAmount || user.donateAmount === '0')) {
      // 使用超过5秒钟的间隔，确保不会与初始检查冲突
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;
      
      if (timeSinceLastActivity > 5000 && !isCheckingSession) {
        // 防止重复请求
        isCheckingSession = true;
        
        checkSession().finally(() => {
          isCheckingSession = false;
          lastActivityTimestamp = Date.now();
        });
      }
    }
  }, [isAuthenticated, user, checkSession]);
  
  // 路由变化时的检查 - 通过监听页面可见性变化来实现
  useEffect(() => {
    // 确保已挂载
    if (!isPageVisible) return;
    
    // 检查用户是否已认证但没有用户数据
    if (isAuthenticated && !user) {
      if (!isCheckingSession) {
        isCheckingSession = true;
        
        checkSession().finally(() => {
          isCheckingSession = false;
          lastActivityTimestamp = Date.now();
        });
      }
      return;
    }
    
    // 处理路由切换到保护路径的情况
    const handleProtectedRouteCheck = () => {
      const pathname = window.location.pathname;
      const isProtectedRoute = pathname === "/donation" || pathname === "/promotion" || pathname.startsWith("/profile");
      
      // 当路径是保护路径，但没有用户数据时进行刷新
      if (isProtectedRoute && hasAuthCookie() && (!isAuthenticated || !user)) {        
        if (!isCheckingSession) {
          isCheckingSession = true;
          
          // 重置会话检查状态，确保重新验证
          resetSessionCheckStatus();
          
          // 执行会话检查
          checkSession().finally(() => {
            isCheckingSession = false;
            lastActivityTimestamp = Date.now();
          });
        }
      }
    };
    
    // 执行一次初始检查
    handleProtectedRouteCheck();
    
    // 添加事件监听器来监听路由变化
    const handleRouteChange = () => {
      handleProtectedRouteCheck();
    };
    
    // 监听路由变化事件
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isPageVisible, isAuthenticated, user, checkSession]);
  
  // 不渲染任何UI
  return null;
} 
