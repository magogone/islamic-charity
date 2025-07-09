"use client";

import { useEffect, useState, useRef } from "react";
import { getSetting } from "@/lib/settings";
import { useStore } from "@/store/store-context";

// 全局变量，用于跟踪VIP设置是否已初始化
let globalInitialized = false;

// 记录应用启动时间，用于检测热重载/页面刷新
const appStartTime = Date.now();

// 自动重置函数 - 在客户端运行时执行
if (typeof window !== "undefined") {
  // 检查上次初始化时间，如果超过5秒，可能是页面刷新或重新部署
  const lastInitTime = parseInt(sessionStorage.getItem("vip_init_time") || "0");
  const timeSinceLastInit = appStartTime - lastInitTime;

  if (timeSinceLastInit > 5000) {
    // 5秒钟是一个合理的阈值
    globalInitialized = false;
    sessionStorage.setItem("vip_init_time", appStartTime.toString());
  }
}

/**
 * VIP等级配置接口
 */
interface VipLevelConfig {
  level: number;
  threshold: number;
}

/**
 * VIP奖励率配置接口
 */
interface VipRewardRatesConfig {
  level: number;
  rates: number[];
}

/**
 * 日常奖励率接口
 */
interface ReliefFundRates {
  noReferral: number;
  referral1: number;
  referral3: number;
  referral5: number;
}

/**
 * 根据VIP配置，计算对应的totalReturn和dailyFundRange
 */
function calculateDerivedValues(
  threshold: number,
  reliefFundRates?: ReliefFundRates
) {
  // 根据新的每日回馈金额计算
  const defaultRanges = [
    { min: 0, max: 0 },
    { min: 1.0, max: 3.0 }, // 等级1 - 布拉克
    { min: 3.05, max: 9.15 }, // 等级2 - 巴达尔
    { min: 5.15, max: 15.5 }, // 等级3 - 蒙塔哈
    { min: 8.4, max: 25.2 }, // 等级4 - 米尔贾
    { min: 13.0, max: 39.0 }, // 等级5 - 至善
  ];

  // 根据捐款金额确定等级
  let level = 1;
  if (threshold >= 1200) level = 5;
  else if (threshold >= 800) level = 4;
  else if (threshold >= 500) level = 3;
  else if (threshold >= 300) level = 2;
  else level = 1;

  const range = defaultRanges[level];

  // 使用固定的总回报值，不再使用计算公式
  const fixedTotalReturns = [0, 120, 366, 620, 1008, 1560]; // 索引0不使用，1-5对应等级1-5
  const totalReturn = fixedTotalReturns[level];

  return {
    totalReturn,
    dailyFundRange: `${range.min.toFixed(2)}-${range.max.toFixed(2)} USD`,
  };
}

/**
 * 从后端加载VIP配置并同步到store
 */
export function useVipSettings() {
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const renderCountRef = useRef(0);
  const prevStateRef = useRef(state);
  const initializedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  // 添加recalculated引用到顶层
  const hasRecalculatedRef = useRef(false);

  // 防止在一个实例内重复初始化
  initializedRef.current = initializedRef.current || globalInitialized;

  // Set mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if rate configs are available
  const ratesAvailable =
    mounted &&
    !!state.vipInfo.reliefFundRates &&
    !!state.vipInfo.reliefFundRates.noReferral;

  useEffect(() => {
    // 增加渲染次数计数
    renderCountRef.current += 1;

    // 更新state引用
    prevStateRef.current = state;

    // 如果已初始化，则退出
    if (initializedRef.current || globalInitialized) {
      return;
    }

    // 标记为已初始化，防止重复加载
    initializedRef.current = true;
    globalInitialized = true;

    async function loadVipSettings() {
      try {
        setLoading(true);
        setError(null);

        // 获取VIP等级配置
        const vipConfigStr = await getSetting("vip_config", "vip", "[]");

        const vipLevels = JSON.parse(vipConfigStr) as VipLevelConfig[];

        // 获取奖励率配置
        const rewardRatesStr = await getSetting("reward_rates", "vip", "[]");

        const rewardRates = JSON.parse(
          rewardRatesStr
        ) as VipRewardRatesConfig[];

        // 验证数据有效性
        if (!vipLevels.length || !rewardRates.length) {
          throw new Error("Invalid VIP configuration data");
        }

        // 构造新的VIP配置
        const newLevels: Record<number, any> = {};

        vipLevels.forEach((levelConfig: VipLevelConfig) => {
          const level = levelConfig.level;
          const threshold = levelConfig.threshold;

          // 查找对应的奖励率配置
          const rewardConfig = rewardRates.find(
            (r: VipRewardRatesConfig) => r.level === level
          );

          if (rewardConfig) {
            const { totalReturn, dailyFundRange } = calculateDerivedValues(
              threshold,
              state.vipInfo.reliefFundRates
            );

            // 确保rates数组至少有6个元素
            const rates = rewardConfig.rates;
            while (rates.length < 6) {
              rates.push(0);
            }

            // 为每个VIP等级配置数据
            newLevels[level] = {
              rewardRates: {
                level1: rates[0] || 0,
                level2: rates[1] || 0,
                level3: rates[2] || 0,
                level4: rates[3] || 0,
                level5: rates[4] || 0,
                total: rates
                  .slice(0, 5)
                  .reduce((sum: number, rate: number) => sum + rate, 0),
              },
              donationAmount: threshold,
              totalReturn: totalReturn,
              dailyFundRange: dailyFundRange,
              period: 120, // 更新期间为120天
            };
          }
        });

        // 对比旧值和新值
        const hasChanges =
          JSON.stringify(state.vipInfo.levels) !== JSON.stringify(newLevels);

        if (hasChanges) {
          // 更新store
          const updatedVipInfo = {
            ...state.vipInfo,
            levels: newLevels,
          };

          // 使用新的UPDATE_VIP_INFO action更新store
          dispatch({
            type: "UPDATE_VIP_INFO",
            payload: updatedVipInfo,
          });

          // 记录初始化成功的时间
          if (typeof window !== "undefined") {
            sessionStorage.setItem("vip_init_time", Date.now().toString());
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    loadVipSettings();
  }, [dispatch, state.vipInfo.reliefFundRates, mounted]); // Add reliefFundRates and mounted as dependencies

  // Recalculate VIP values when rate configurations change
  useEffect(() => {
    // Skip if not initialized yet or if rates aren't available
    if (!globalInitialized || !ratesAvailable) {
      return;
    }

    // Only proceed if we have levels to update
    if (
      !state.vipInfo.levels ||
      Object.keys(state.vipInfo.levels).length === 0
    ) {
      return;
    }

    // 检查是否已经重新计算过
    if (hasRecalculatedRef.current) {
      return;
    }

    // 使用JSON字符串化来进行深度比较，避免不必要的更新
    const prevLevelsJSON = JSON.stringify(state.vipInfo.levels);

    // Update existing levels with new rate calculations
    const updatedLevels = { ...state.vipInfo.levels };
    let hasChanges = false;

    // Update each level with new calculations
    Object.keys(updatedLevels).forEach((levelKey) => {
      const level = updatedLevels[levelKey as unknown as number];
      const threshold = level.donationAmount;

      const { totalReturn, dailyFundRange } = calculateDerivedValues(
        threshold,
        state.vipInfo.reliefFundRates
      );

      // Check if values have changed
      if (
        level.totalReturn !== totalReturn ||
        level.dailyFundRange !== dailyFundRange
      ) {
        hasChanges = true;
        updatedLevels[levelKey as unknown as number] = {
          ...level,
          totalReturn,
          dailyFundRange,
        };
      }
    });

    // 再次检查是否有实质性的变化，避免无意义的更新
    const updatedLevelsJSON = JSON.stringify(updatedLevels);
    if (hasChanges && prevLevelsJSON !== updatedLevelsJSON) {
      // Update store if any values have changed
      dispatch({
        type: "UPDATE_VIP_INFO",
        payload: {
          ...state.vipInfo,
          levels: updatedLevels,
        },
      });
    }

    // 标记已经重新计算过
    hasRecalculatedRef.current = true;
  }, [ratesAvailable, state.vipInfo.reliefFundRates, dispatch]);

  return {
    loading,
    error,
  };
}
