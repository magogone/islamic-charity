"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "./store-context";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthUser,
} from "./auth-types";
import {
  registerUser,
  loginUser,
  logoutUser,
  ApiUser,
  getUserInfo,
} from "@/lib/api";
import { useWallet } from "@/hooks/use-wallet";

// Storage keys for local storage
const STORAGE_KEYS = {
  AUTH_USER: "auth_user",
};

// Helper function to get data from localStorage
function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
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
  if (typeof window === "undefined") return;
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
    vipLevel: apiUser.vip_level || 0, // 默认为0级
    referrals: apiUser.invitee_donate_count || 0, // 默认为0个邀请
    withdrawAmount: apiUser.withdraw_amount, // 已提现金额
    rewardAmount: apiUser.reward_amount, // 可提现金额
    inviteLevel: apiUser.invite_level || 0, // 默认邀请等级为0
  };
};

export function useAuth() {
  const { state, dispatch } = useStore();
  const router = useRouter();

  // Add safe access to auth state with default values
  const authState = state.auth || {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  // 检查是否有认证 cookie
  const hasAuthCookie = useCallback((): boolean => {
    if (typeof window === "undefined") return false;

    // 检查 cookie 中是否有认证相关的 cookie
    // 添加更多详细的日志记录并扩展检查逻辑
    const allCookies = document.cookie;
    const hasCookie = allCookies.includes("charity_session=");

    // 检查 localStorage 中是否有用户数据作为备用方案
    const hasLocalUser =
      getFromStorage<AuthUser>(STORAGE_KEYS.AUTH_USER) !== null;

    // 如果有任一认证标记，返回 true
    return hasCookie || hasLocalUser;
  }, []);

  const getCurrentUser = useCallback(async () => {
    // 暂时禁用API调用
    return null;

    // 原来的API调用逻辑（已禁用）
    /*
    // 如果已经在加载中，不要重复请求
    if (authState.isLoading) {
      return authState.user;
    }
    
    // 如果已经认证且有用户数据，直接返回
    if (authState.isAuthenticated && authState.user) {
      return authState.user;
    }
    
    // 检查是否有认证cookie
    if (!hasAuthCookie()) {
      return null;
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
    */
  }, []); // 移除所有依赖项

  const checkSession = useCallback(async () => {
    // 暂时禁用会话检查
    return null;

    // 原来的会话检查逻辑（已禁用）
    /*
    // 如果已经在加载中，不要重复请求
    if (authState.isLoading) {
      return authState.user;
    }
    
    // 如果已经认证且有用户数据，跳过检查
    if (authState.isAuthenticated && authState.user) {
      return authState.user;
    }
    
    // 检查是否有认证cookie
    if (!hasAuthCookie()) {
      dispatch({ type: "AUTH_LOGOUT" });
      return null;
    }
    
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
    */
  }, []); // 移除所有依赖项

  const login = useCallback(async (credentials: LoginCredentials) => {
    // 暂时禁用登录功能
    throw new Error("登录功能已暂时禁用");

    // 原来的登录逻辑（已禁用）
    /*
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
      */
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    // 暂时禁用注册功能
    throw new Error("注册功能已暂时禁用");

    // 原来的注册逻辑（已禁用）
    /*
      try {
        dispatch({ type: "AUTH_REGISTER_START" })
        
        // Call the register API
        const response = await registerUser({
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
          invite_code: credentials.inviteCode
        })
        
        if (!response.success) {
          // Error is already handled by the API utility
          throw new Error("Registration failed")
        }
        
        dispatch({ type: "AUTH_REGISTER_SUCCESS" })
        
        // After successful registration, user should login
        return response
      } catch (error) {
        // Just set loading state to false, error is handled by the API utility
        dispatch({ type: "AUTH_REGISTER_FAILURE", payload: "" })
        throw error
      }
      */
  }, []);

  // 在调用useAuth时创建一个全局事件，这样可以在其他地方监听此事件
  const triggerLogoutEvent = useCallback(() => {
    if (typeof window !== "undefined") {
      // 触发一个自定义事件，钱包组件可以监听这个事件
      window.dispatchEvent(new CustomEvent("user-logout"));
    }
  }, []);

  const logout = useCallback(async () => {
    // 暂时简化登出功能，只清除本地状态
    dispatch({ type: "AUTH_LOGOUT" });
    router.push("/");
    return;

    // 原来的登出逻辑（已禁用）
    /*
    try {
      // Try to call logout API, but don't fail if it's not available
      await logoutUser()
    } catch (error) {
      // Silently ignore logout API errors
      console.warn('[useAuth] Logout API call failed, but continuing with local logout:', error);
    } finally {
      // Always clear local state regardless of API response
      dispatch({ type: "AUTH_LOGOUT" })
      router.push("/")
    }
    */
  }, []);

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
  };
}
