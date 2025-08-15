"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Heart, Users } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface FundPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

export function FundPromotionModal({
  isOpen,
  onClose,
  onPurchase,
}: FundPromotionModalProps) {
  const { t } = useTranslation();
  // 优化：预加载donation页面相关资源
  useEffect(() => {
    if (isOpen) {
      // 预加载donation页面
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "/donation";
      document.head.appendChild(link);

      return () => {
        // 清理
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto">
        <Card className="bg-gradient-to-br from-[#2d1b40] to-[#1a0f2e] border-[#d4b96e]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* 图片区域 */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b40] to-[#1a0f2e] opacity-50"></div>
                <img
                  src="/images/prophet-birthday-promotion.jpg"
                  alt="先知诞辰月慈善联盟"
                  className="w-full h-full object-cover"
                />

                {/* 右上角关闭按钮 */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* 徽章 */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-[#d4b96e] text-black shadow-lg">
                    {t("modal.badge")}
                  </Badge>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-4">
                {/* 标题 */}
                <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                  {t("modal.title")}
                </h4>

                {/* 描述文字 */}
                <p className="text-sm text-[#f5efe0]/80 mb-4">
                  {t("modal.description")}
                </p>

                {/* 活动规则 */}
                <div className="bg-[#d4b96e]/10 rounded-lg p-3 mb-4">
                  <h5 className="text-sm font-semibold text-[#d4b96e] mb-2">
                    {t("modal.activityDetails")}
                  </h5>
                  <ul className="text-xs text-[#f5efe0]/80 space-y-1">
                    <li>• {t("modal.membershipFee")}</li>
                    <li>• {t("modal.dailyReturn")}</li>
                    <li>• {t("modal.returnPeriod")}</li>
                    <li>• {t("modal.totalReward")}</li>
                    <li>• {t("modal.noConditions")}</li>
                    <li>• {t("modal.startTime")}</li>
                  </ul>
                </div>

                {/* 活动介绍 */}
                <div className="bg-[#d4b96e]/5 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#f5efe0]/70">
                    <strong className="text-[#d4b96e]">
                      {t("modal.activityIntro")}
                    </strong>
                    {t("modal.introText")}
                  </p>
                </div>

                {/* 活动信息 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-[#d4b96e]" />
                    <span className="text-sm text-[#d4b96e]">
                      {t("modal.remainingQuota")}
                    </span>
                  </div>
                </div>

                {/* 底部按钮 */}
                <Button
                  onClick={() => {
                    onPurchase();
                    onClose();
                  }}
                  className="w-full bg-[#d4b96e] text-black hover:bg-[#b39339] active:scale-95 transition-all duration-150 font-semibold"
                >
                  {t("modal.joinNow")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
