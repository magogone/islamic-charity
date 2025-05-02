"use client"

import { useStore } from "./store-context"

export function useVipInfo() {
  const { state } = useStore()

  // 确保 vipInfo 存在，如果不存在则提供默认值
  const vipInfo = state.vipInfo || {
    levels: {
      1: {
        rewardRates: {
          level1: 10,
          level2: 4,
          level3: 2,
          level4: 2,
          level5: 2,
          total: 20,
        },
        dailyFundRange: "1.2-3 U",
      },
      2: {
        rewardRates: {
          level1: 12,
          level2: 4,
          level3: 2,
          level4: 2,
          level5: 2,
          total: 22,
        },
        dailyFundRange: "3.6-9 U",
      },
      3: {
        rewardRates: {
          level1: 14,
          level2: 4,
          level3: 2,
          level4: 2,
          level5: 2,
          total: 24,
        },
        dailyFundRange: "6-15 U",
      },
      4: {
        rewardRates: {
          level1: 16,
          level2: 4,
          level3: 2,
          level4: 2,
          level5: 2,
          total: 26,
        },
        dailyFundRange: "9.6-24 U",
      },
      5: {
        rewardRates: {
          level1: 20,
          level2: 4,
          level3: 2,
          level4: 2,
          level5: 2,
          total: 30,
        },
        dailyFundRange: "14.4-36 U",
      },
    },
    reliefFundRates: {
      noReferral: 1,
      referral1: 1.5,
      referral3: 2,
      referral5: 2.5,
    },
  }

  // 获取指定 VIP 等级的奖励比例
  const getRewardRatesForLevel = (level: number) => {
    const safeLevel = Math.min(Math.max(1, level), 5) // 确保等级在 1-5 之间

    // 添加安全检查，确保 levels 和对应的 level 存在
    if (!vipInfo.levels || !vipInfo.levels[safeLevel]) {
      // 返回默认值
      return {
        level1: 10,
        level2: 4,
        level3: 2,
        level4: 2,
        level5: 2,
        total: 20,
      }
    }

    return vipInfo.levels[safeLevel].rewardRates
  }

  // 获取指定 VIP 等级的每日基金范围
  const getDailyFundRangeForLevel = (level: number) => {
    const safeLevel = Math.min(Math.max(1, level), 5) // 确保等级在 1-5 之间

    // 添加安全检查，确保 levels 和对应的 level 存在
    if (!vipInfo.levels || !vipInfo.levels[safeLevel]) {
      // 返回默认值
      return `${safeLevel * 1.2}-${safeLevel * 3} U`
    }

    return vipInfo.levels[safeLevel].dailyFundRange
  }

  // 根据推荐人数获取扶贫基金比例
  const getReliefFundRateByReferrals = (referrals: number) => {
    // 添加安全检查，确保 reliefFundRates 存在
    if (!vipInfo.reliefFundRates) {
      // 返回默认值
      return referrals >= 5 ? 2.5 : referrals >= 3 ? 2 : referrals >= 1 ? 1.5 : 1
    }

    if (referrals >= 5) return vipInfo.reliefFundRates.referral5
    if (referrals >= 3) return vipInfo.reliefFundRates.referral3
    if (referrals >= 1) return vipInfo.reliefFundRates.referral1
    return vipInfo.reliefFundRates.noReferral
  }

  // 获取所有 VIP 等级信息
  const getAllVipLevels = () => {
    return vipInfo.levels || {}
  }

  // 获取所有扶贫基金比例
  const getAllReliefFundRates = () => {
    return (
      vipInfo.reliefFundRates || {
        noReferral: 1,
        referral1: 1.5,
        referral3: 2,
        referral5: 2.5,
      }
    )
  }

  return {
    getRewardRatesForLevel,
    getDailyFundRangeForLevel,
    getReliefFundRateByReferrals,
    getAllVipLevels,
    getAllReliefFundRates,
    vipInfo,
  }
}
