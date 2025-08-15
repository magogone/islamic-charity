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
    const defaultRanges = [
      "",
      "1.00-3.00 USD", // 等级1 - 布拉克
      "3.05-9.15 USD", // 等级2 - 巴达尔
      "5.15-15.50 USD", // 等级3 - 蒙塔哈
      "8.40-25.20 USD", // 等级4 - 米尔贾
      "13.00-39.00 USD", // 等级5 - 至善
    ];
    return (
      vipInfo.levels[safeLevel]?.dailyFundRange || defaultRanges[safeLevel]
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
        referral5: 3,
      }
    );
  };

  /**
   * 获取指定VIP等级的总回报（兼容旧版API）
   */
  const getVipLevelTotalReturn = (level: number): number => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    const defaultReturns = [0, 100, 366, 622, 1000, 1560]; // 索引0不使用，1-5对应等级1-5
    return vipInfo.levels[safeLevel]?.totalReturn || defaultReturns[safeLevel];
  };

  /**
   * 获取指定VIP等级的期间（兼容旧版API）
   */
  const getVipLevelPeriod = (level: number): string => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    return "40-120"; // 统一返回期间范围
  };

  /**
   * 获取指定VIP等级的名称
   */
  const getVipLevelName = (level: number): string => {
    const safeLevel = Math.min(Math.max(1, level), 5); // 确保等级在1-5之间
    const levelNames = [
      "",
      "布拉克", // 等级1
      "巴达尔", // 等级2
      "蒙塔哈", // 等级3
      "米尔贾", // 等级4
      "至善", // 等级5
    ];
    return levelNames[safeLevel];
  };

  /**
   * 获取所有VIP等级信息（兼容旧版API）
   */
  const getAllVipLevels = () => {
    return vipInfo.levels || {};
  };

  /**
   * 获取指定VIP等级的原价
   */
  const getVipLevelOriginalPrice = useCallback(
    (level: number): number => {
      return vipInfo.levels[level]?.originalPrice || 0;
    },
    [vipInfo.levels]
  );

  /**
   * 获取指定VIP等级的回馈券抵扣金额
   */
  const getVipLevelVoucherDiscount = useCallback(
    (level: number): number => {
      return vipInfo.levels[level]?.voucherDiscount || 0;
    },
    [vipInfo.levels]
  );

  /**
   * 获取指定VIP等级升级后获得的下级回馈券金额
   */
  const getVipLevelNextVoucher = useCallback(
    (level: number): number => {
      return vipInfo.levels[level]?.nextLevelVoucher || 0;
    },
    [vipInfo.levels]
  );

  /**
   * 获取指定VIP等级的当前回馈券金额
   */
  const getVipLevelCurrentVoucher = useCallback(
    (level: number): number => {
      if (level === 0) return 0; // 新用户没有回馈券
      return vipInfo.levels[level]?.currentLevelVoucher || 0;
    },
    [vipInfo.levels]
  );

  /**
   * 计算使用回馈券后的实际支付金额
   */
  const calculateActualPrice = useCallback(
    (level: number, useVoucher: boolean = true): number => {
      const originalPrice = getVipLevelOriginalPrice(level);
      if (!useVoucher) return originalPrice;

      const voucherDiscount = getVipLevelVoucherDiscount(level);
      return Math.max(0, originalPrice - voucherDiscount);
    },
    [getVipLevelOriginalPrice, getVipLevelVoucherDiscount]
  );

  /**
   * 获取VIP等级的完整价格信息
   */
  const getVipLevelPriceInfo = useCallback(
    (level: number) => {
      const originalPrice = getVipLevelOriginalPrice(level);
      const voucherDiscount = getVipLevelVoucherDiscount(level);
      const actualPrice = calculateActualPrice(level);
      const nextLevelVoucher = getVipLevelNextVoucher(level);
      const totalValue = originalPrice + (level > 1 ? voucherDiscount : 0); // V1没有前置回馈券

      return {
        originalPrice,
        voucherDiscount,
        actualPrice,
        nextLevelVoucher,
        totalValue,
        canUseVoucher: voucherDiscount > 0,
      };
    },
    [
      getVipLevelOriginalPrice,
      getVipLevelVoucherDiscount,
      calculateActualPrice,
      getVipLevelNextVoucher,
    ]
  );

  return {
    vipInfo,
    loadingVipInfo: loading,
    vipInfoError: error,
    // 新API
    getVipLevelDonationAmount,
    getVipLevelRewardRates,
    getVipLevelByDonation,
    getAmountForNextLevel,
    // 回馈券相关API
    getVipLevelOriginalPrice,
    getVipLevelVoucherDiscount,
    getVipLevelNextVoucher,
    getVipLevelCurrentVoucher,
    calculateActualPrice,
    getVipLevelPriceInfo,
    // 兼容旧API
    getDailyFundRangeForLevel,
    getRewardRatesForLevel,
    getAllReliefFundRates,
    getVipLevelTotalReturn,
    getVipLevelPeriod,
    getVipLevelName,
    getAllVipLevels,
  };
}
