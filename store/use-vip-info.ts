"use client";

import { useStore } from "./store-context";
import { useCallback, useRef } from "react";
import { useVipSettings } from "@/hooks/use-vip-settings";

export function useVipInfo() {
  const { state } = useStore();
  const { loading, error } = useVipSettings();
  const renderCountRef = useRef(0);

  // VIP info from store
  const vipInfo = state.vipInfo;

  // 监控渲染次数
  renderCountRef.current++;

  /**
   * 获取指定VIP等级的捐款金额
   * @param level VIP等级
   * @returns 对应等级的捐款金额，如果等级不存在则返回0
   */
  const getVipLevelDonationAmount = useCallback(
    (level: number): number => {
      const amount = vipInfo.levels[level]?.donationAmount || 0;
      return amount;
    },
    [vipInfo.levels]
  );

  /**
   * 获取指定VIP等级的奖励率
   * @param level VIP等级
   * @returns 对应等级的奖励率对象，如果等级不存在则返回默认值
   */
  const getVipLevelRewardRates = useCallback(
    (level: number) => {
      return (
        vipInfo.levels[level]?.rewardRates || {
          level1: 0,
          level2: 0,
          level3: 0,
          level4: 0,
          level5: 0,
          total: 0,
        }
      );
    },
    [vipInfo.levels]
  );

  /**
   * 获取指定捐款金额对应的VIP等级
   * @param donationAmount 捐款金额
   * @returns 对应的VIP等级
   */
  const getVipLevelByDonation = (donationAmount: number): number => {
    // 获取所有VIP等级的列表
    const levels = Object.keys(vipInfo.levels)
      .map(Number)
      .sort((a, b) => a - b);

    // 从高到低检查，找出最高满足的等级
    for (let i = levels.length - 1; i >= 0; i--) {
      const level = levels[i];
      if (donationAmount >= vipInfo.levels[level].donationAmount) {
        return level;
      }
    }

    // 默认返回1级
    return 1;
  };

  /**
   * 获取升级到下一VIP等级所需的捐款金额
   * @param currentLevel 当前VIP等级
   * @returns 需要的额外捐款金额
   */
  const getAmountForNextLevel = (
    currentLevel: number,
    currentDonation: number
  ): number => {
    const nextLevel = currentLevel + 1;

    // 如果已经是最高级别，返回0
    if (!vipInfo.levels[nextLevel]) {
      return 0;
    }

    const nextLevelThreshold = vipInfo.levels[nextLevel].donationAmount;
    const amountNeeded = Math.max(0, nextLevelThreshold - currentDonation);

    return amountNeeded;
  };

  /**
   * 获取指定VIP等级的每日基金范围（兼容旧版API）
   */
  const getDailyFundRangeForLevel = (level: number): string => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    return (
      vipInfo.levels[safeLevel]?.dailyFundRange ||
      `${safeLevel * 1.2}-${safeLevel * 3} USD`
    );
  };

  /**
   * 获取指定VIP等级的奖励比例（兼容旧版API）
   */
  const getRewardRatesForLevel = (level: number) => {
    return getVipLevelRewardRates(level);
  };

  /**
   * 获取所有扶贫基金比例（兼容旧版API）
   */
  const getAllReliefFundRates = () => {
    return (
      vipInfo.reliefFundRates || {
        noReferral: 1,
        referral1: 1.5,
        referral3: 2,
        referral5: 2.5,
      }
    );
  };

  /**
   * 获取指定VIP等级的总回报（兼容旧版API）
   */
  const getVipLevelTotalReturn = (level: number): number => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    return vipInfo.levels[safeLevel]?.totalReturn || safeLevel * 120;
  };

  /**
   * 获取指定VIP等级的期间（兼容旧版API）
   */
  const getVipLevelPeriod = (level: number): number => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    return vipInfo.levels[safeLevel]?.period || 40;
  };

  /**
   * 获取所有VIP等级信息（兼容旧版API）
   */
  const getAllVipLevels = () => {
    return vipInfo.levels || {};
  };

  return {
    vipInfo,
    loadingVipInfo: loading,
    vipInfoError: error,
    // 新API
    getVipLevelDonationAmount,
    getVipLevelRewardRates,
    getVipLevelByDonation,
    getAmountForNextLevel,
    // 兼容旧API
    getDailyFundRangeForLevel,
    getRewardRatesForLevel,
    getAllReliefFundRates,
    getVipLevelTotalReturn,
    getVipLevelPeriod,
    getAllVipLevels,
  };
}
