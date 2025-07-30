"use client";

import { useTranslation } from "@/lib/i18n";

interface RewardSummaryChartProps {
  data: {
    withdrawnAmount: number;
    withdrawableAmount: number;
  };
  onWithdraw?: () => void;
}

export function RewardSummaryChart({
  data,
  onWithdraw,
}: RewardSummaryChartProps) {
  const { t } = useTranslation();

  // 简化逻辑，只检查是否都为0的情况
  const bothZero = data.withdrawnAmount === 0 && data.withdrawableAmount === 0;

  return (
    <div className="w-full">
      {/* 采用统一的布局容器来确保对齐 */}
      <div className="grid grid-cols-2 mb-1">
        <div className="text-sm text-islamic-cream/80 text-left pl-2">
          {t("rewardSummary.withdrawn")}
        </div>
        <div className="text-sm text-islamic-cream/80 text-right pr-2">
          {t("rewardSummary.withdrawable")}
        </div>
      </div>

      {/* Row 2: Withdrawn/Withdrawable stacked bar */}
      <div className="mb-6 h-[40px] relative">
        {/* 确保背景容器始终可见 */}
        <div className="absolute inset-0 bg-islamic-dark/50 rounded-md"></div>

        {/* 当都为0时显示特殊样式，否则使用统一的固定布局 */}
        {bothZero ? (
          <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
            <div className="flex items-center justify-center bg-islamic-dark/30 rounded-l-md">
              <span className="text-xs font-medium text-white/70">
                0 <span className="text-xs">USD</span>
              </span>
            </div>
            <div className="flex items-center justify-center bg-islamic-dark/30 rounded-r-md">
              <span className="text-xs font-medium text-white/70">
                0 <span className="text-xs">USD</span>
              </span>
            </div>
          </div>
        ) : (
          // 使用固定布局确保无论数值差别多大都能正常显示
          <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
            <div
              className="flex items-center justify-center relative rounded-l-md overflow-hidden"
              style={{
                backgroundColor: data.withdrawnAmount > 0 ? "rgba(212, 185, 110, 0.8)" : "rgba(212, 185, 110, 0.2)",
              }}
            >
              {/* 根据数值比例显示渐变强度 */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#d4b96e] to-transparent opacity-30"
                style={{
                  opacity: data.withdrawnAmount > 0 ? Math.min(data.withdrawnAmount / Math.max(data.withdrawnAmount, data.withdrawableAmount), 1) * 0.5 + 0.3 : 0.1
                }}
              ></div>
              <span className="text-xs font-medium text-white relative z-10">
                {data.withdrawnAmount} <span className="text-xs">USD</span>
              </span>
            </div>
            <div
              className="flex items-center justify-center relative rounded-r-md overflow-hidden"
              style={{
                backgroundColor: data.withdrawableAmount > 0 ? "rgba(212, 185, 110, 0.5)" : "rgba(212, 185, 110, 0.2)",
              }}
            >
              {/* 根据数值比例显示渐变强度 */}
              <div 
                className="absolute inset-0 bg-gradient-to-l from-[#d4b96e]/80 to-transparent opacity-30"
                style={{
                  opacity: data.withdrawableAmount > 0 ? Math.min(data.withdrawableAmount / Math.max(data.withdrawnAmount, data.withdrawableAmount), 1) * 0.5 + 0.3 : 0.1
                }}
              ></div>
              <span className="text-xs font-medium text-white relative z-10">
                {data.withdrawableAmount} <span className="text-xs">USD</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
