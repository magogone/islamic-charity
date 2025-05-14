"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "./store-context"
import type { LoginCredentials, RegisterCredentials, AuthUser } from "./auth-types"
import { registerUser, loginUser, logoutUser, ApiUser, getUserInfo } from "@/lib/api"

// Storage keys for local storage
const STORAGE_KEYS = {
  AUTH_USER: 'auth_user'
}

// Helper function to get data from localStorage
function getFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return null;
  }
}

// Helper function to save data to localStorage
function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Convert API user to app AuthUser format
const mapApiUserToAuthUser = (apiUser: ApiUser): AuthUser => {
  return {
    id: String(apiUser.id),
    email: apiUser.email,
    username: apiUser.name,
    isVerified: true, // Assuming successful login/registration means the user is verified
    createdAt: apiUser.created_at,
    donateAmount: apiUser.donate_amount,
    vipLevel: apiUser.vip_level || 0,  // 默认为0级
    referrals: apiUser.invitee_donate_count || 0,  // 默认为0个邀请
    withdrawAmount: apiUser.withdraw_amount,  // 已提现金额
    rewardAmount: apiUser.reward_amount,  // 可提现金额
    inviteLevel: apiUser.invite_level || 0,  // 默认邀请等级为0
  }
}

export function useAuth() {
  const { state, dispatch } = useStore()
  const router = useRouter()

  // Add safe access to auth state with default values
  const authState = state.auth || {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }

  // 检查是否有认证 cookie
  const hasAuthCookie = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    // 检查 cookie 中是否有认证相关的 cookie
    // 添加更多详细的日志记录并扩展检查逻辑
    const allCookies = document.cookie;
    const hasCookie = allCookies.includes('charity_session=');
    
    // 检查 localStorage 中是否有用户数据作为备用方案
    const hasLocalUser = getFromStorage<AuthUser>(STORAGE_KEYS.AUTH_USER) !== null;
    
    // 如果有任一认证标记，返回 true
    return hasCookie || hasLocalUser;
  }, []);

  // 获取当前用户信息
  const getCurrentUser = useCallback(async () => {
    // 如果已经在加载中，不要重复请求
    if (authState.isLoading) {
      return null;
    }
    
    // 获取全局存储的用户信息作为备份
    const savedUser = getFromStorage<AuthUser>(STORAGE_KEYS.AUTH_USER);
    
    // 检查本地认证状态
    const localAuthenticated = authState.isAuthenticated && authState.user;
    
    // 检查认证标记
    const hasAuth = hasAuthCookie();
    
    // 如果没有认证标记，清除认证状态
    if (!hasAuth) {
      // 如果当前状态显示已登录，则更新为未登录
      if (authState.isAuthenticated || authState.user) {
        dispatch({ type: "AUTH_LOGOUT" });
      }
      return null;
    }
    
    // 如果有保存的用户且未显示为已登录，先恢复会话
    if (savedUser && !authState.isAuthenticated) {
      dispatch({ type: "AUTH_RESTORE_SESSION", payload: savedUser });
    }
    
    try {
      dispatch({ type: "AUTH_LOGIN_START" });
      
      // 调用获取用户信息API
      const response = await getUserInfo();
      
      if (!response.success || !response.data) {
        // 如果获取失败，不改变当前状态
        dispatch({ type: "AUTH_LOGIN_FAILURE", payload: "" });
        return null;
      }
      
      // 将API用户数据映射为应用用户格式
      const user = mapApiUserToAuthUser(response.data.user);
      
      // 更新状态 - 使用 AUTH_LOGIN_SUCCESS 确保完全更新认证状态
      dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: user });
      
      // Save user data to localStorage
      saveToStorage(STORAGE_KEYS.AUTH_USER, user);
      
      // 同时更新donation状态中的提现相关数据
      if (user.withdrawAmount !== undefined || user.rewardAmount !== undefined) {
        const withdrawableAmount = user.rewardAmount ? parseFloat(user.rewardAmount) : 0;
        const withdrawnAmount = user.withdrawAmount ? parseFloat(user.withdrawAmount) : 0;
        
        dispatch({ 
          type: "UPDATE_DONATION", 
          payload: { 
            withdrawnAmount,
            withdrawableAmount,
            totalAccumulated: withdrawnAmount + withdrawableAmount
          } 
        });
      }
      
      return user;
    } catch (error) {
      console.error('[useAuth] getCurrentUser error:', error);
      // 请求失败不改变当前状态
      dispatch({ type: "AUTH_LOGIN_FAILURE", payload: "" });
      return null;
    }
  }, [dispatch, authState.isLoading, authState.isAuthenticated, authState.user, hasAuthCookie]);

  // 在组件挂载时检查用户会话
  const checkSession = useCallback(async () => {
    // 如果已经在加载中，不要重复请求
    if (authState.isLoading) {
      return null;
    }
    
    // 获取全局存储的用户信息作为备份
    const savedUser = getFromStorage<AuthUser>(STORAGE_KEYS.AUTH_USER);
    
    // 检查认证标记
    const hasAuth = hasAuthCookie();
    
    // 如果没有认证标记，清除认证状态
    if (!hasAuth) {
      // 如果当前状态显示已登录，则更新为未登录
      if (authState.isAuthenticated || authState.user) {
        dispatch({ type: "AUTH_LOGOUT" });
      }
      return null;
    }
    
    // 如果有保存的用户且未显示为已登录，先恢复会话
    if (savedUser && !authState.isAuthenticated) {
      dispatch({ type: "AUTH_RESTORE_SESSION", payload: savedUser });
    }
    
    // 激活加载状态，防止重复调用
    dispatch({ type: "AUTH_LOGIN_START" });
    
    try {
      // 直接调用获取用户信息API
      const response = await getUserInfo();
      
      if (!response.success || !response.data) {
        dispatch({ type: "AUTH_LOGIN_FAILURE", payload: "" });
        dispatch({ type: "AUTH_LOGOUT" });
        return null;
      }
      
      // 将API用户数据映射为应用用户格式
      const user = mapApiUserToAuthUser(response.data.user);
      
      // 更新认证状态
      dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: user });
      
      // Save user data to localStorage
      saveToStorage(STORAGE_KEYS.AUTH_USER, user);
      
      // 同时更新donation状态中的提现相关数据
      if (user.withdrawAmount !== undefined || user.rewardAmount !== undefined) {
        const withdrawableAmount = user.rewardAmount ? parseFloat(user.rewardAmount) : 0;
        const withdrawnAmount = user.withdrawAmount ? parseFloat(user.withdrawAmount) : 0;
        
        dispatch({ 
          type: "UPDATE_DONATION", 
          payload: { 
            withdrawnAmount,
            withdrawableAmount,
            totalAccumulated: withdrawnAmount + withdrawableAmount
          } 
        });
      }
      
      return user;
    } catch (error) {
      console.error('[useAuth] checkSession error:', error);
      dispatch({ type: "AUTH_LOGIN_FAILURE", payload: "" });
      return null;
    }
  }, [dispatch, authState.isLoading, authState.isAuthenticated, authState.user, hasAuthCookie]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch({ type: "AUTH_LOGIN_START" })
        
        // Call the login API
        const response = await loginUser({
          email: credentials.email,
          password: credentials.password
        })
        
        if (!response.success) {
          // Error is already handled by the API utility
          throw new Error("Login failed")
        }
        
        // After successful login, fetch user information from /auth/me
        const userInfoResponse = await getUserInfo()
        
        if (!userInfoResponse.success || !userInfoResponse.data) {
          throw new Error("Failed to get user information after login")
        }
        
        // Map the API user to our app's user format
        const user = mapApiUserToAuthUser(userInfoResponse.data.user)
        
        dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: user })
        
        // Save user data to localStorage
        saveToStorage(STORAGE_KEYS.AUTH_USER, user);
        
        // 同时更新donation状态中的提现相关数据
        if (user.withdrawAmount !== undefined || user.rewardAmount !== undefined) {
          const withdrawableAmount = user.rewardAmount ? parseFloat(user.rewardAmount) : 0
          const withdrawnAmount = user.withdrawAmount ? parseFloat(user.withdrawAmount) : 0
          
          dispatch({ 
            type: "UPDATE_DONATION", 
            payload: { 
              withdrawnAmount,
              withdrawableAmount,
              totalAccumulated: withdrawnAmount + withdrawableAmount
            } 
          })
        }
        
        // Redirect to home page or dashboard
        router.push('/')
        
        return user
      } catch (error) {
        // Just set loading state to false, error is handled by the API utility
        dispatch({ type: "AUTH_LOGIN_FAILURE", payload: "" })
        throw error
      }
    },
    [dispatch, router, getUserInfo],
  )

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        dispatch({ type: "AUTH_REGISTER_START" })
        
        // Map from our app's credential format to the API format
        const apiCredentials = {
          email: credentials.email,
          name: credentials.username,
          password: credentials.password,
          repeat_password: credentials.confirmPassword,
          invite_code: credentials.inviteCode // Include invite code if provided
        }
        
        const response = await registerUser(apiCredentials)
        
        if (!response.success) {
          // Error is already handled by the API utility
          throw new Error("Registration failed")
        }
        
        // For registration, we now auto-login the user
        dispatch({ type: "AUTH_REGISTER_SUCCESS", payload: null })
        
        // After registration, auto-login by calling the login API
        const loginResponse = await loginUser({
          email: credentials.email,
          password: credentials.password
        })
        
        if (!loginResponse.success) {
          // If auto-login fails, still consider registration successful
          // but redirect to login page
          router.push('/login')
          return null
        }
        
        // Fetch user info after successful login
        const userInfoResponse = await getUserInfo()
        
        if (!userInfoResponse.success || !userInfoResponse.data) {
          // If getting user info fails, still redirect to login page
          router.push('/login')
          return null
        }
        
        // Map the API user to our app's user format
        const user = mapApiUserToAuthUser(userInfoResponse.data.user)
        
        // Update auth state with the logged in user
        dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: user })
        
        // Save user data to localStorage
        saveToStorage(STORAGE_KEYS.AUTH_USER, user);
        
        // Redirect to home page after successful registration and auto-login
        router.push('/')
        
        return user
      } catch (error) {
        // Just set loading state to false, error is handled by the API utility
        dispatch({ type: "AUTH_REGISTER_FAILURE", payload: "" })
        throw error
      }
    },
    [dispatch, router, getUserInfo],
  )

  const logout = useCallback(async () => {
    try {
      // Immediately dispatch logout action BEFORE making the API call
      // This ensures auth state is cleared immediately and no more /auth/me calls will be made
    dispatch({ type: "AUTH_LOGOUT" })
      
      // Clear user data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
      
      // Reset the global session check flag so it will check again on next login
      if (typeof window !== 'undefined') {
        // This will reset the flag in the AuthSessionChecker component
        window.dispatchEvent(new CustomEvent('reset-session-check'));
      }
      
      // Call the real logout API after cleaning up local state
      // We don't need to wait for this to complete
      logoutUser().catch(() => {
        // Silently ignore errors in logout API call
        // User is already logged out locally
      });
      
    // Redirect to home page after logout
    router.push("/")
    } catch (error) {
      // Error handling is not needed here since we already dispatched logout
      // and redirected the user
      router.push("/")
    }
  }, [dispatch, router])

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    register,
    logout,
    checkSession,
    getCurrentUser,
  }
}
