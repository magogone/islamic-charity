"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/store/use-auth"

// 防止重复API请求的全局标志
let hasCheckedSession = false;

// 导出此标志，以便其他组件可检查会话状态
export const getSessionCheckStatus = () => hasCheckedSession;
export const resetSessionCheckStatus = () => { hasCheckedSession = false; };

// 标记应用启动时间，用于检测热重载/页面刷新
const appStartTime = Date.now();

// 自动重置函数 - 在客户端运行时执行
if (typeof window !== 'undefined') {
  // 检查上次初始化时间，如果超过5秒，可能是页面刷新或重新部署
  const lastInitTime = parseInt(sessionStorage.getItem('auth_init_time') || '0');
  const timeSinceLastInit = appStartTime - lastInitTime;
  
  if (timeSinceLastInit > 5000) { // 5秒钟是一个合理的阈值
    hasCheckedSession = false;
    sessionStorage.setItem('auth_init_time', appStartTime.toString());
  }
}

/**
 * 检查是否有认证 cookie
 */
function hasAuthCookie(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 检查 cookie 中是否有认证 cookie
  return document.cookie.includes('charity_session=');
}

/**
 * 组件用于在应用启动时自动检查用户会话
 * 不渲染任何UI，只执行会话检查逻辑
 * 此组件是**唯一**负责初始会话检查的组件
 */
export function AuthSessionChecker() {
  const { checkSession, isAuthenticated, user } = useAuth()
  const hasCheckedRef = useRef(false)
  const isCheckingRef = useRef(false)
  
  // Listen for the reset event
  useEffect(() => {
    const handleResetSessionCheck = () => {
      hasCheckedSession = false;
      hasCheckedRef.current = false;
      isCheckingRef.current = false;
    };
    
    window.addEventListener('reset-session-check', handleResetSessionCheck);
    
    // 检测页面是否刚刚被刷新
    const pageLoadTime = Date.now();
    const lastPageLoad = parseInt(sessionStorage.getItem('page_load_time') || '0');
    const timeSinceLastLoad = pageLoadTime - lastPageLoad;
    
    // 如果是新会话或者距离上次超过5秒，视为页面刷新，强制重置标志
    if (!lastPageLoad || timeSinceLastLoad > 5000) {
      hasCheckedSession = false;
      hasCheckedRef.current = false;
      isCheckingRef.current = false;
    }
    
    // 更新页面加载时间
    sessionStorage.setItem('page_load_time', pageLoadTime.toString());
    
    return () => {
      window.removeEventListener('reset-session-check', handleResetSessionCheck);
    };
  }, []);
  
  // 主会话检查逻辑
  useEffect(() => {
    // 避免重复检查的条件:
    // 1. 组件已经检查过
    // 2. 全局检查标志已设置
    // 3. 当前正在检查中
    // 4. 用户已认证且有用户数据
    if (hasCheckedRef.current || hasCheckedSession || isCheckingRef.current || (isAuthenticated && user)) {
      // 如果用户已认证，确保标记会话为已检查
      if (isAuthenticated && user) {
        hasCheckedSession = true;
        
        // 触发一个会话检查完成的事件
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-session-checked', {
            detail: { success: true }
          }));
        }
      }
      return;
    }
    
    // 标记为检查中，防止重复调用
    isCheckingRef.current = true;
    
    // 标记为已检查，避免重复检查
    hasCheckedRef.current = true;
    
    // 更新时间戳但先不设置全局完成标志，等待检查实际完成
    sessionStorage.setItem('auth_init_time', Date.now().toString());
    
    // 首先检查本地是否有认证 cookie
    if (!hasAuthCookie()) {
      isCheckingRef.current = false;
      
      // 无 cookie 直接标记为已完成检查
      hasCheckedSession = true;
      
      // 如果没有 cookie，触发一个会话检查完成事件，但表明未成功
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth-session-checked', { 
          detail: { success: false } 
        }));
      }
      return; // 不执行 API 调用
    }
    
    // 先添加一个短延迟，确保先前的登录响应已处理
    setTimeout(() => {
      // 再次检查是否已登录，避免不必要的请求
      if (isAuthenticated && user) {
        isCheckingRef.current = false;
        hasCheckedSession = true;
        
        // 触发会话检查完成事件
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-session-checked', {
            detail: { success: true }
          }));
        }
        return;
      }
      
      // 实际执行会话检查 API 调用
      checkSession().then(result => {
        isCheckingRef.current = false;
        // 现在可以设置全局标志
        hasCheckedSession = true;
        
        // 会话检查完成后，发出一个全局事件通知其他组件
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-session-checked', { 
            detail: { success: !!result } 
          }));
        }
      }).catch(err => {
        isCheckingRef.current = false;
        // 即使出错也要标记为已完成检查，避免无限重试
        hasCheckedSession = true;
        
        console.error('[AuthSessionChecker] Session check error:', err);
        
        // 会话检查失败，发出事件
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-session-checked', { 
            detail: { success: false } 
          }));
        }
      });
    }, 100); // 短暂延迟
  }, [checkSession, isAuthenticated, user]);
  
  // 不渲染任何内容
  return null;
}
