"use client";

import { useStore } from "@/store/store-context";
import { useCallback } from "react";
import type { VoucherItem } from "@/store/store-context";

export function useVouchers() {
  const { state, dispatch } = useStore();
  const { vouchers } = state;

  // 获取可用的回馈券（按等级筛选）
  const getAvailableVouchersForLevel = useCallback(
    (level: number): VoucherItem[] => {
      const voucherType = `V${level}` as VoucherItem["type"];
      return vouchers.available.filter(
        (voucher) => voucher.type === voucherType && voucher.status === "active"
      );
    },
    [vouchers.available]
  );

  // 获取指定等级的最大可用回馈券金额
  const getMaxVoucherAmountForLevel = useCallback(
    (level: number): number => {
      const availableVouchers = getAvailableVouchersForLevel(level);
      return availableVouchers.reduce(
        (max, voucher) => Math.max(max, voucher.amount),
        0
      );
    },
    [getAvailableVouchersForLevel]
  );

  // 使用回馈券
  const useVoucher = useCallback(
    (voucherId: string, usedForLevel: number) => {
      dispatch({
        type: "USE_VOUCHER",
        payload: { voucherId, usedForLevel },
      });
    },
    [dispatch]
  );

  // 添加新回馈券
  const addVoucher = useCallback(
    (voucher: VoucherItem) => {
      dispatch({
        type: "ADD_VOUCHER",
        payload: voucher,
      });
    },
    [dispatch]
  );

  // 更新回馈券状态
  const updateVouchers = useCallback(
    (updates: Partial<typeof vouchers>) => {
      dispatch({
        type: "UPDATE_VOUCHERS",
        payload: updates,
      });
    },
    [dispatch, vouchers]
  );

  // 创建新回馈券（用于购买后奖励）
  const createVoucher = useCallback(
    (type: VoucherItem["type"], amount: number): VoucherItem => {
      const now = new Date();

      return {
        id: `voucher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        amount,
        status: "active",
        createdAt: now.toISOString(),
      };
    },
    []
  );

  // 计算总可用回馈券价值
  const getTotalAvailableValue = useCallback((): number => {
    return vouchers.available.reduce(
      (total, voucher) =>
        voucher.status === "active" ? total + voucher.amount : total,
      0
    );
  }, [vouchers.available]);

  // 获取已使用的回馈券
  const getUsedVouchers = useCallback((): VoucherItem[] => {
    return vouchers.available.filter((voucher) => voucher.status === "used");
  }, [vouchers.available]);

  return {
    // 状态
    vouchers: vouchers.available,
    totalValue: vouchers.totalValue,

    // 查询方法
    getAvailableVouchersForLevel,
    getMaxVoucherAmountForLevel,
    getTotalAvailableValue,
    getUsedVouchers,

    // 操作方法
    useVoucher,
    addVoucher,
    updateVouchers,
    createVoucher,
  };
}
