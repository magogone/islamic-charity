import { LoginCredentials, RegisterCredentials } from "@/store/auth-types";
import { emitApiError } from "@/components/api-error-handler";
import { ENV } from "@/lib/env-config";

/**
 * Base API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * User data returned from the API
 */
export interface ApiUser {
  id: number;
  email: string;
  name: string;
  donate_amount?: string;
  vip_level?: number;
  invitee_donate_count?: number;
  withdraw_amount?: string;
  reward_amount?: string;
  invite_level?: number;
  created_at: string;
  last_login: string;
}

/**
 * Registration response data
 */
export interface RegisterResponse {
  message: string;
}

/**
 * Login response data
 */
export interface LoginResponse {
  message: string;
}

/**
 * Logout response data
 */
export interface LogoutResponse {
  message: string;
}

/**
 * Donate request data
 */
export interface DonateRequest {
  chain_id: string;
  amount: string;
  token_type: string;
  payment_method: string;
  remark: string;
}

/**
 * Withdraw request data
 */
export interface WithdrawRequest {
  chain_id: string;
  amount: string;
  token_type: string;
  payment_method: string;
  remark: string;
}

/**
 * Donate response data
 */
export interface DonateResponse {
  order_id: string;
  status: string;
  created_at: string;
}

/**
 * Withdraw response data
 */
export interface WithdrawResponse {
  transaction_id: string;
  amount: string;
  wallet_address: string;
  network: string;
  status: string;
  created_at: string;
}

/**
 * Settings response data
 */
export interface SettingsResponse {
  value: string;
}

/**
 * User info response data
 */
export interface UserInfoResponse {
  user: ApiUser;
  message: string;
}

/**
 * 团队信息响应数据
 */
export interface TeamInfoResponse {
  direct_invite_count: number;   // 直属邀请人数
  total_invite_count: number;    // 总邀请人数（直接+间接）
  invitee_donate_amount: string; // 被邀请人捐赠总额
  total_reward: string; // 总奖励
}

/**
 * Invite code generation response data
 */
export interface InviteGenerateResponse {
  invite_code: string;
}

/**
 * User profit response data
 */
export interface UserProfitResponse {
  today_profit: number;
  max_profit: number;
}

/**
 * 发出认证失败事件，用于在特定页面显示登录提示
 */
export function emitAuthFailure(endpoint: string, statusCode: number) {
  if (typeof window !== 'undefined') {
    // 检查当前路径是否在需要认证的页面
    const pathname = window.location.pathname;
    const isProtectedRoute = pathname === '/donation' || 
                            pathname.startsWith('/donation/') ||
                            pathname === '/promotion' || 
                            pathname.startsWith('/promotion/') ||
                            pathname === '/profile' || 
                            pathname.startsWith('/profile/');
    
    if (isProtectedRoute) {
      const event = new CustomEvent('auth-failure', {
        detail: { 
          endpoint, 
          statusCode, 
          currentPath: pathname 
        }
      });
      window.dispatchEvent(event);
    }
  }
}

/**
 * Base function to make API requests
 */
async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  data?: any,
  forceNoCache: boolean = false
): Promise<ApiResponse<T>> {
  // 使用相对路径直接发送请求到/v1路径
  let url = endpoint.startsWith('http') ? endpoint : `${ENV.SITE_URL}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  
  // 如果需要跳过缓存，添加额外参数
  if (forceNoCache) {
    options.cache = 'no-store';
    if (!options.headers) {
      options.headers = {};
    }
    Object.assign(options.headers, {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    });
  }
  
  // 对于GET请求，将数据作为URL参数
  if (method === "GET" && data) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    url = `${url}?${params.toString()}`;
  } else if (data) {
    // 对于其他请求，将数据放在请求体中
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    // 特殊处理 /auth/me 接口的非200响应
    if (response.status !== 200) {
      // 检查是否是 /auth/me 接口
      if (endpoint.includes('/auth/me')) {
        emitAuthFailure(endpoint, response.status);
      }
      throw new Error(`Network error: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Automatically handle errors emitting them to the global error handler
    if (!result.success && result.error) {
      // 对于 /auth/me 接口的业务错误，也需要特殊处理
      if (endpoint.includes('/auth/me')) {
        emitAuthFailure(endpoint, result.error.code);
      }
      emitApiError(result.error.code, result.error.message);
    }
    
    return result;
  } catch (error) {
    // Handle network errors
    console.error("API request failed:", error);
    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: 5000,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      }
    };
    
    // 对于网络错误，如果是 /auth/me 接口，也需要特殊处理
    if (endpoint.includes('/auth/me')) {
      emitAuthFailure(endpoint, 5000);
    }
    
    // Emit the error to the global error handler
    if (errorResponse.error) {
      emitApiError(errorResponse.error.code, errorResponse.error.message);
    }
    
    return errorResponse;
  }
}

/**
 * Register a new user
 */
export async function registerUser(credentials: {
  email: string;
  name: string;
  password: string;
  repeat_password: string;
  invite_code?: string;  // Optional invite code
}): Promise<ApiResponse<RegisterResponse>> {
  return apiRequest<RegisterResponse>("/auth/register", "POST", credentials);
}

/**
 * Login user
 */
export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> {
  return apiRequest<LoginResponse>("/auth/login", "POST", credentials);
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<ApiResponse<LogoutResponse>> {
  return apiRequest<LogoutResponse>("/auth/logout", "POST");
}

/**
 * User donate
 */
export async function donateAmount(chainId: string, amount: string, tokenType: string = "USDT", paymentMethod: string = "", remark: string = ""): Promise<ApiResponse<DonateResponse>> {
  const donateData: DonateRequest = {
    chain_id: chainId,
    amount,
    token_type: tokenType,
    payment_method: paymentMethod,
    remark
  };
  
  return apiRequest<DonateResponse>("/user/donate", "POST", donateData);
}

/**
 * User withdraw
 */
export async function withdrawAmount(chainId: string, amount: string, walletAddress: string): Promise<ApiResponse<WithdrawResponse>> {
  const withdrawData: WithdrawRequest = {
    chain_id: chainId,
    amount,
    token_type: "USDT",
    payment_method: "",
    remark: walletAddress,
  };
  
  return apiRequest<WithdrawResponse>("/user/withdraw", "POST", withdrawData);
}

/**
 * Get settings by key and group
 */
export async function getSettings(key: string, group: string): Promise<ApiResponse<SettingsResponse>> {
  return apiRequest<SettingsResponse>("/settings/get", "GET", { key, group });
}

/**
 * Maps API errors to friendly messages
 */
export function handleApiError(error: { code: number; message: string }): string {
  // You can add custom error message mapping here if needed
  return error.message;
}

/**
 * 获取当前登录用户信息
 */
export async function getUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
  try {
    // 添加时间戳参数确保不使用缓存的响应
    const timestamp = Date.now();
    const endpoint = `/auth/me?_t=${timestamp}`;
    
    // 使用forceNoCache参数确保请求不会被缓存
    const result = await apiRequest<UserInfoResponse>(endpoint, "GET", undefined, true);
    
    // 如果成功，记录用户数据的关键信息
    if (!result.success || !result.data || !result.data.user) {
      console.warn('[API] getUserInfo: No user data in response or request failed');
    }
    
    return result;
  } catch (error) {
    console.error("[API] getUserInfo: Fatal error during API call:", error);
    
    // 重新抛出错误，确保调用者知道请求失败
    throw error;
  }
}

/**
 * 获取用户团队信息
 */
export async function getUserTeamInfo(): Promise<ApiResponse<TeamInfoResponse>> {
  try {    
    // 添加时间戳参数确保不使用缓存的响应
    const timestamp = Date.now();
    const endpoint = `/user/invite/stats?_t=${timestamp}`;
    
    // 使用forceNoCache参数确保请求不会被缓存
    const result = await apiRequest<TeamInfoResponse>(endpoint, "GET", undefined, true);
    
    // 如果成功，记录团队数据的关键信息
    if (!result.success || !result.data) {
      console.warn('[API] getUserTeamInfo: No team data in response or request failed');
    }
    
    return result;
  } catch (error) {
    console.error("[API] getUserTeamInfo: Fatal error during API call:", error);
    
    // 重新抛出错误，确保调用者知道请求失败
    throw error;
  }
}

/**
 * Generate invite code for the current user
 */
export async function generateInviteCode(): Promise<ApiResponse<InviteGenerateResponse>> {
  return apiRequest<InviteGenerateResponse>("/user/invite/generate", "POST");
}

/**
 * 获取用户预估收益
 */
export async function getUserProfit(): Promise<ApiResponse<UserProfitResponse>> {
  try {    
    // 添加时间戳参数确保不使用缓存的响应
    const timestamp = Date.now();
    
    // 确保使用与后端一致的路径
    const endpoint = `/user/profit?_t=${timestamp}`;
    
    // 使用forceNoCache参数确保请求不会被缓存
    const result = await apiRequest<UserProfitResponse>(endpoint, "GET", undefined, true);
    
    // 如果成功，记录收益数据的关键信息
    if (!result.success || !result.data) {
      console.warn('[API] getUserProfit: No profit data in response or request failed');
    }
    
    return result;
  } catch (error) {
    console.error("[API] getUserProfit: Fatal error during API call:", error);
    
    // 重新抛出错误，确保调用者知道请求失败
    throw error;
  }
}
 