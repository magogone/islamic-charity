export interface AuthUser {
  id: string
  email: string
  username: string
  isVerified: boolean
  createdAt: string
  donateAmount?: string  // 用户捐款金额
  vipLevel?: number      // 用户VIP等级
  referrals?: number     // 邀请人数量，对应后端的invitee_donate_count
  withdrawAmount?: string // 已提现金额，对应withdraw_amount
  rewardAmount?: string   // 可提现金额，对应reward_amount
  inviteLevel?: number    // 邀请等级，对应后端的invite_level
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  username: string
  password: string
  confirmPassword: string
  inviteCode?: string  // Optional invite code for referrals
}
