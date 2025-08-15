"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MainLayout } from "@/components/main-layout";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/use-auth";
import { useVipInfo } from "@/store/use-vip-info";
import { useAuthContext } from "@/store/auth-context";
import { useVouchers } from "@/hooks/use-vouchers";
import { upgradeVipLevel } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Play,
  Calendar,
  MapPin,
  Users,
  Heart,
  Star,
  Eye,
  Crown,
  TrendingUp,
  Gift,
  Zap,
  Sparkles,
  Trophy,
  Award,
  Diamond,
  Info,
  Target,
  Clock,
  Globe,
} from "lucide-react";

// 定义类型
type CategoryType = "member" | "alliance" | "level" | "ongoing" | "overseas";

// VIP徽章组件
const VipBadge = ({ vipLevel }: { vipLevel: number }) => {
  // V0 - 未获取等级徽章
  if (vipLevel === 0) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V0 - 灰色系 - 未激活状态 */}
        {/* 外部阴影系统 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#666666]/30 to-[#333333]/40 rounded-full blur-2xl scale-125"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#777777]/20 to-[#444444]/30 rounded-full blur-xl scale-115"></div>

        {/* 徽章主体 - 简单灰色设计 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#666666] to-[#333333] p-[1px] shadow-[0_4px_12px_rgba(102,102,102,0.5),0_2px_6px_rgba(51,51,51,0.4)]">
          {/* 外层边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#555555] to-[#333333] p-[1px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.4)]">
            {/* 内圈灰色表面 */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#888888] via-[#666666] to-[#444444] flex items-center justify-center relative overflow-hidden shadow-[inset_0_1px_3px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.3)]">
              {/* 简单光泽效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20 rounded-full"></div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-md"></div>
              <div className="absolute bottom-1 right-1 w-6 h-3 bg-black/30 rounded-full blur-md"></div>

              {/* 中心图标 - 问号 */}
              <div className="relative z-10 bg-gradient-to-b from-[#555555] to-[#333333] rounded-full p-2 shadow-[0_2px_6px_rgba(0,0,0,0.6)] border border-[#666666]/60">
                <div className="bg-gradient-to-b from-[#666666] to-[#444444] rounded-full p-0.5">
                  <svg
                    className="h-5 w-5 text-[#CCCCCC] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V1 - 布拉克等级徽章
  if (vipLevel === 1) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V1 - 铜色系 - 超强立体金属质感 */}
        {/* 多层外部阴影系统 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D2691E]/40 to-[#A0522D]/50 rounded-full blur-2xl scale-125"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#CD853F]/30 to-[#8B4513]/40 rounded-full blur-xl scale-115"></div>
        <div className="absolute inset-2 bg-gradient-to-b from-[#D2691E]/20 to-[#A0522D]/30 rounded-full blur-lg scale-110"></div>

        {/* 徽章主体 - 超复杂多层金属效果 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_8px_25px_rgba(210,105,30,0.8),0_4px_15px_rgba(160,82,45,0.6),0_2px_8px_rgba(205,133,63,0.4)]">
          {/* 最外层立体边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8B4513] to-[#654321] p-[1px] shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.6)]">
            {/* 外圈立体装饰环 */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#D2691E] to-[#A0522D] p-[2px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),inset_0_-1px_4px_rgba(255,255,255,0.3)]">
              {/* 中间立体凹槽层 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#CD853F] to-[#D2691E] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
                {/* 立体装饰环纹 */}
                <div className="absolute inset-1 rounded-full border-[0.5px] border-white/40 shadow-[0_0_3px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute inset-2 rounded-full border-[0.5px] border-[#A0522D]/50"></div>
                <div className="absolute inset-3 rounded-full border-[0.5px] border-white/20"></div>

                {/* 内圈超精细金属表面 */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F4A460] via-[#CD853F] via-[#D2691E] to-[#A0522D] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.4)]">
                  {/* 超复杂金属光泽系统 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/35 rounded-full"></div>
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white/90 to-transparent rounded-full blur-lg"></div>
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-white/70 to-transparent rounded-full blur-md"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-4 bg-black/35 rounded-full blur-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-2 bg-black/50 rounded-full blur-md"></div>

                  {/* 精密同心圆金属纹理 */}
                  <div className="absolute inset-1 rounded-full border-[0.5px] border-white/50 shadow-[0_0_4px_rgba(255,255,255,0.4)]"></div>
                  <div className="absolute inset-2 rounded-full border-[0.5px] border-white/30"></div>
                  <div className="absolute inset-3 rounded-full border-[0.5px] border-[#A0522D]/40"></div>
                  <div className="absolute inset-4 rounded-full border-[0.5px] border-white/20"></div>

                  {/* 立体放射状装饰线 */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-4 bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_2px_rgba(255,255,255,0.7)]"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${
                          i * 30
                        }deg) translateY(-14px)`,
                      }}
                    />
                  ))}

                  {/* 中心立体图标 - 星星 */}
                  <div className="relative z-10 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full p-2 shadow-[0_4px_10px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.6)] border-2 border-[#D2691E]/60">
                    <div className="bg-gradient-to-b from-[#D2691E] to-[#A0522D] rounded-full p-0.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                      <Star
                        className="h-5 w-5 text-[#F4A460] drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] filter brightness-125"
                        fill="currentColor"
                        style={{
                          filter:
                            "drop-shadow(0 0 4px rgba(244, 164, 96, 0.7))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V2 - 巴达尔等级徽章
  if (vipLevel === 2) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V2 - 青铜金色系 - 超强立体金属质感 */}
        {/* 多层外部阴影系统 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#CD7F32]/50 to-[#B8860B]/60 rounded-full blur-2xl scale-130"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#DEB887]/40 to-[#CD7F32]/50 rounded-full blur-xl scale-120"></div>
        <div className="absolute inset-2 bg-gradient-to-b from-[#CD7F32]/30 to-[#B8860B]/40 rounded-full blur-lg scale-115"></div>

        {/* 徽章主体 - 超复杂多层设计 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_10px_30px_rgba(205,127,50,0.9),0_5px_15px_rgba(184,134,11,0.7),0_2px_8px_rgba(222,184,135,0.5)]">
          {/* 最外层立体边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8B4513] to-[#654321] p-[1px] shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.6)]">
            {/* 外圈立体装饰环 */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#CD7F32] to-[#B8860B] p-[2px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),inset_0_-1px_4px_rgba(255,255,255,0.3)]">
              {/* 中间立体凹槽层 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#DEB887] to-[#CD7F32] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
                {/* 立体装饰环纹 */}
                <div className="absolute inset-1 rounded-full border-[0.5px] border-white/40 shadow-[0_0_3px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute inset-2 rounded-full border-[0.5px] border-[#B8860B]/50"></div>
                <div className="absolute inset-3 rounded-full border-[0.5px] border-white/20"></div>

                {/* 内圈超精细金属表面 */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F5DEB3] via-[#DEB887] via-[#CD7F32] to-[#B8860B] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.4)]">
                  {/* 超复杂金属光泽系统 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/35 rounded-full"></div>
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white/90 to-transparent rounded-full blur-lg"></div>
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-white/70 to-transparent rounded-full blur-md"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-4 bg-black/35 rounded-full blur-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-2 bg-black/50 rounded-full blur-md"></div>
                  <div className="absolute top-2.5 right-1.5 w-4 h-4 bg-white/60 rounded-full blur-md"></div>
                  <div className="absolute bottom-2.5 left-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                  <div className="absolute top-3.5 left-3 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>

                  {/* 精密同心圆金属纹理 */}
                  <div className="absolute inset-1 rounded-full border-[0.5px] border-white/50 shadow-[0_0_4px_rgba(255,255,255,0.4)]"></div>
                  <div className="absolute inset-2 rounded-full border-[0.5px] border-white/30"></div>
                  <div className="absolute inset-3 rounded-full border-[0.5px] border-[#B8860B]/40"></div>
                  <div className="absolute inset-4 rounded-full border-[0.5px] border-white/20"></div>

                  {/* 立体放射状装饰线 */}
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-5 bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_2px_rgba(255,255,255,0.7)]"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${
                          i * 22.5
                        }deg) translateY(-16px)`,
                      }}
                    />
                  ))}

                  {/* 立体装饰点 */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-br from-white/60 to-[#B8860B]/80 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${
                          i * 45
                        }deg) translateY(-20px)`,
                      }}
                    />
                  ))}

                  {/* 中心立体图标 - 拇指向上 */}
                  <div className="relative z-10 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full p-2 shadow-[0_4px_10px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.6)] border-2 border-[#CD7F32]/60">
                    <div className="bg-gradient-to-b from-[#CD7F32] to-[#B8860B] rounded-full p-0.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                      <svg
                        className="h-5 w-5 text-[#F5DEB3] drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] filter brightness-125"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          filter:
                            "drop-shadow(0 0 4px rgba(245, 222, 179, 0.7))",
                        }}
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V3 - 蒙塔哈等级徽章
  if (vipLevel === 3) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V3 - 金银配色 - 至尊立体金属质感 */}
        {/* 多层外部阴影系统 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/60 to-[#C0C0C0]/70 rounded-full blur-3xl scale-135"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#FFF8DC]/50 to-[#FFD700]/60 rounded-full blur-2xl scale-125"></div>
        <div className="absolute inset-2 bg-gradient-to-b from-[#FFD700]/40 to-[#C0C0C0]/50 rounded-full blur-xl scale-120"></div>

        {/* 徽章主体 - 豪华三层设计 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_12px_35px_rgba(255,215,0,1),0_6px_20px_rgba(192,192,192,0.8),0_3px_10px_rgba(255,248,220,0.6)]">
          {/* 最外层立体边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#B8860B] to-[#8B7355] p-[1px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.7)]">
            {/* 外圈装饰带 */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E5E5E5] to-[#C0C0C0] p-[1.5px] shadow-[inset_0_5px_10px_rgba(0,0,0,0.6),inset_0_-2px_5px_rgba(255,255,255,0.4)]">
              {/* 装饰花纹环 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#FFD700] to-[#DAA520] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
                {/* 内圈超精细金属表面 */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFFACD] via-[#FFD700] via-[#DAA520] to-[#C0C0C0] flex items-center justify-center relative overflow-hidden shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.5)]">
                  {/* 豪华金属光泽系统 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-black/40 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-7 bg-gradient-to-b from-white/95 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-5 bg-gradient-to-b from-white/80 to-transparent rounded-full blur-lg"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-5 bg-black/40 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1 right-1 w-6 h-3 bg-black/60 rounded-full blur-lg"></div>

                  {/* 中心立体图标 - 奖杯 */}
                  <div className="relative z-10 bg-gradient-to-b from-[#8B7355] to-[#654321] rounded-full p-2.5 shadow-[0_5px_12px_rgba(0,0,0,0.9),0_3px_8px_rgba(0,0,0,0.7)] border-2 border-[#FFD700]/70">
                    <div className="bg-gradient-to-b from-[#FFD700] to-[#DAA520] rounded-full p-0.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)]">
                      <Trophy
                        className="h-5 w-5 text-[#FFFACD] drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter brightness-130"
                        fill="currentColor"
                        style={{
                          filter:
                            "drop-shadow(0 0 6px rgba(255, 250, 205, 0.8))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V4 - 米尔贾等级徽章
  if (vipLevel === 4) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V4 - 深金紫色系 - 传奇立体金属质感 */}
        {/* 多层外部阴影系统 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B8860B]/70 to-[#8B4513]/80 rounded-full blur-3xl scale-110"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#DAA520]/60 to-[#B8860B]/70 rounded-full blur-2xl scale-105"></div>
        <div className="absolute inset-2 bg-gradient-to-b from-[#B8860B]/50 to-[#8B4513]/60 rounded-full blur-xl scale-102"></div>

        {/* 徽章主体 - 传奇齿轮环设计 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_15px_40px_rgba(184,134,11,1),0_8px_25px_rgba(139,69,19,0.9),0_4px_15px_rgba(218,165,32,0.7)]">
          {/* 外层齿轮装饰环 */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${
                    i * 18
                  }deg) translateY(-26px)`,
                }}
              >
                <div
                  className="w-2 h-4 bg-gradient-to-t from-[#8B4513] via-[#B8860B] to-[#DAA520] shadow-[0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 最外层华丽边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#B8860B] to-[#8B7355] p-[1px] shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.8)]">
            {/* 中层紫金装饰环 */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#9370DB] to-[#B8860B] p-[2px] shadow-[inset_0_6px_12px_rgba(0,0,0,0.7),inset_0_-2px_6px_rgba(255,255,255,0.5)]">
              {/* 内层立体金属层 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#DAA520] to-[#B8860B] p-[2px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]">
                {/* 内圈传奇金属表面 */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#DDA0DD] via-[#DAA520] via-[#B8860B] to-[#8B7355] flex items-center justify-center relative overflow-hidden shadow-[inset_0_4px_8px_rgba(255,255,255,0.7),inset_0_-4px_6px_rgba(0,0,0,0.6)]">
                  {/* 传奇金属光泽系统 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-transparent to-black/45 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-white/95 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white/85 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-6 bg-black/45 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-4 bg-black/65 rounded-full blur-xl"></div>

                  {/* 中心传奇图标 - 皇冠 */}
                  <div className="relative z-10 bg-gradient-to-b from-[#8B7355] to-[#654321] rounded-full p-3 shadow-[0_6px_15px_rgba(0,0,0,1),0_4px_10px_rgba(0,0,0,0.8)] border-2 border-[#B8860B]/80">
                    <div className="bg-gradient-to-b from-[#B8860B] to-[#8B7355] rounded-full p-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]">
                      <div className="bg-gradient-to-b from-[#DAA520] to-[#B8860B] rounded-full p-0.5">
                        <Crown
                          className="h-4 w-4 text-[#DDA0DD] drop-shadow-[0_5px_10px_rgba(0,0,0,1)] filter brightness-150"
                          fill="currentColor"
                          style={{
                            filter:
                              "drop-shadow(0 0 8px rgba(221, 160, 221, 1))",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V5 - 至善等级徽章
  if (vipLevel === 5) {
    return (
      <div className="absolute inset-x-0 top-0 w-16 h-16">
        {/* V5 - 至尊钻石铂金系 - 神话级金属质感 */}
        {/* 多层外部神话光环 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F8FF]/80 to-[#E6E6FA]/90 rounded-full blur-4xl scale-140"></div>
        <div className="absolute inset-1 bg-gradient-to-b from-[#DDA0DD]/60 to-[#F8F8FF]/70 rounded-full blur-3xl scale-130"></div>
        <div className="absolute inset-2 bg-gradient-to-b from-[#F8F8FF]/50 to-[#E6E6FA]/60 rounded-full blur-2xl scale-125"></div>

        {/* 徽章主体 - 神话钻石切割设计 */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_20px_50px_rgba(248,248,255,1),0_12px_30px_rgba(230,230,250,0.9),0_6px_20px_rgba(221,160,221,0.8)]">
          {/* 外层神话装饰环 */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${
                    i * 15
                  }deg) translateY(-28px)`,
                }}
              >
                <div
                  className="w-2.5 h-5 bg-gradient-to-t from-[#E6E6FA] via-[#F8F8FF] to-[#DDA0DD] shadow-[0_3px_8px_rgba(0,0,0,1),inset_0_2px_4px_rgba(255,255,255,0.6)]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 最外层神话边框 */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E6E6FA] to-[#B8860B] p-[1px] shadow-[inset_0_4px_8px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.9)]">
            {/* 中层钻石装饰环 */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#F8F8FF] to-[#DDA0DD] p-[2px] shadow-[inset_0_8px_16px_rgba(0,0,0,0.8),inset_0_-3px_8px_rgba(255,255,255,0.6)]">
              {/* 内层神话金属层 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#DDA0DD] to-[#E6E6FA] p-[2px] shadow-[inset_0_6px_12px_rgba(0,0,0,0.6)]">
                {/* 内圈神话金属表面 */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFFAFA] via-[#F8F8FF] via-[#DDA0DD] to-[#E6E6FA] flex items-center justify-center relative overflow-hidden shadow-[inset_0_6px_12px_rgba(255,255,255,0.8),inset_0_-6px_8px_rgba(0,0,0,0.7)]">
                  {/* 神话金属光泽系统 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-black/50 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-white/100 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-white/90 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-8 bg-black/50 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-6 bg-black/70 rounded-full blur-2xl"></div>

                  {/* 中心神话图标 - 钻石 */}
                  <div className="relative z-10 bg-gradient-to-b from-[#B8860B] to-[#654321] rounded-full p-3.5 shadow-[0_8px_20px_rgba(0,0,0,1),0_6px_15px_rgba(0,0,0,0.9)] border-2 border-[#F8F8FF]/90">
                    <div className="bg-gradient-to-b from-[#F8F8FF] to-[#DDA0DD] rounded-full p-1.5 shadow-[inset_0_3px_6px_rgba(255,255,255,0.7)]">
                      <div className="bg-gradient-to-b from-[#DDA0DD] to-[#E6E6FA] rounded-full p-0.5">
                        <Diamond
                          className="h-4 w-4 text-[#FFFAFA] drop-shadow-[0_6px_12px_rgba(0,0,0,1)] filter brightness-200"
                          fill="currentColor"
                          style={{
                            filter:
                              "drop-shadow(0 0 10px rgba(255, 250, 250, 1))",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 默认返回V1徽章
  return (
    <div className="absolute inset-x-0 top-0 w-16 h-16">
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#D2691E] to-[#A0522D] flex items-center justify-center">
        <Star className="h-6 w-6 text-white" fill="currentColor" />
      </div>
    </div>
  );
};

export default function VipEventsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("member");
  const [isUpgrading, setIsUpgrading] = useState(false);

  // 从URL参数设置初始分类
  useEffect(() => {
    const category = searchParams.get("category");
    if (
      category &&
      ["member", "alliance", "level", "ongoing", "overseas"].includes(category)
    ) {
      setSelectedCategory(category as CategoryType);
    }
  }, [searchParams]);

  // 动态点赞和观看数状态
  const [dynamicStats, setDynamicStats] = useState<{
    [key: number]: { likes: number; views: number };
  }>({});

  // 获取动态数据的函数
  const getDynamicStats = (
    cardId: number,
    originalLikes: number,
    originalViews: number
  ) => {
    const dynamic = dynamicStats[cardId];
    return {
      likes: dynamic?.likes || originalLikes || 0,
      views: dynamic?.views || originalViews || 0,
    };
  };

  // 获取真实用户数据和VIP配置
  const { user, isAuthenticated, getCurrentUser } = useAuth();
  const { openLoginModal } = useAuthContext();
  const { success, error, info, ToastContainer } = useToast();
  const {
    getVipLevelDonationAmount,
    getDailyFundRangeForLevel,
    getVipLevelPeriod,
    getVipLevelNextVoucher,
  } = useVipInfo();

  // 计算升级所需金额和进度
  const currentVipLevel = user?.vipLevel ?? 0; // 允许等级为0，表示未获取
  const currentDonation = user?.donateAmount
    ? parseFloat(user.donateAmount)
    : 0;
  const withdrawableAmount = user?.rewardAmount
    ? parseFloat(user.rewardAmount)
    : 0;

  // 从配置获取下一等级所需金额
  const nextLevel = currentVipLevel < 5 ? currentVipLevel + 1 : 5;
  const nextLevelAmount = getVipLevelDonationAmount(nextLevel);

  const upgradeProgress =
    currentVipLevel === 5
      ? 100 // 已经是最高等级
      : currentVipLevel === 0
      ? 0 // 未获取等级时进度为0
      : Math.min((currentDonation / nextLevelAmount) * 100, 100);

  // 获取等级显示名称
  const getVipLevelName = (level: number) => {
    switch (level) {
      case 0:
        return t("vip.level0");
      case 1:
        return t("vip.level1");
      case 2:
        return t("vip.level2");
      case 3:
        return t("vip.level3");
      case 4:
        return t("vip.level4");
      case 5:
        return t("vip.level5");
      default:
        return t("vip.level0");
    }
  };

  const userData = {
    username: user?.username || "艾哈迈德",
    vipLevel: currentVipLevel,
    currentDonation,
    withdrawableAmount,
    nextLevelAmount,
    upgradeProgress,
    nextLevelName: getVipLevelName(nextLevel),
  };

  // 处理升级按钮点击
  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      openLoginModal("/vip-events");
      return;
    }

    if (isUpgrading) {
      return; // 防止重复点击
    }

    try {
      setIsUpgrading(true);
      const response = await upgradeVipLevel();

      if (response.success && response.data) {
        const {
          success: upgradeSuccess,
          current_vip,
          new_vip,
          is_max_level,
        } = response.data;

        if (upgradeSuccess) {
          // 构造成功消息
          let successMessage = `${t("vipLevel.upgradeSuccess")}`;
          if (new_vip > current_vip) {
            successMessage += ` ${t("vipLevel.upgradeTo")}${getVipLevelName(
              new_vip
            )}！`;
          }
          if (is_max_level) {
            successMessage += ` ${t("vipLevel.reachedMaxLevel")}`;
          }

          success(successMessage);
          // 刷新用户数据
          await getCurrentUser();
        } else {
          // 检查是否已达到最高等级
          if (is_max_level) {
            info(t("vipLevel.reachedMaxLevel"));
          } else {
            // 升级条件未满足
            info(
              `${t("vipLevel.upgradeConditionsNotMet")}: ${t(
                "vipLevel.upgradeConditionsNotMetDesc"
              )}`
            );
          }
        }
      } else {
        error(response.error?.message || t("vipLevel.upgradeFailed"));
      }
    } catch (err) {
      console.error("VIP升级错误:", err);
      error(t("vipLevel.upgradeNetworkError"));
    } finally {
      setIsUpgrading(false);
    }
  };

  // 获取翻译后的事件数据 - 使用useCallback避免无限渲染
  const getTranslatedEvents = useCallback(() => {
    const memberEvents = [
      // 会员专享基金卡片 - 只显示不开放捐赠
      {
        id: 11,
        title: t("events.entrepreneurshipFund"),
        description: t("events.entrepreneurshipFundDesc"),
        image: "/images/events/entrepreneurship-fund-new.jpg",
        date: "暂未开放",
        location: t("events.multipleCountries"),
        type: "member",
        category: "基金项目",
        isVideo: false,
        likes: 896,
        views: 5640,
        status: "display_only", // 只显示，不开放捐赠
        fundAmount: 300000000,
        beneficiaries: 320,
        priority: "high",
      },
      {
        id: 12,
        title: t("events.dreamFund"),
        description: t("events.dreamFundDesc"),
        image: "/images/events/dream-fund.jpg",
        date: "暂未开放",
        location: t("events.multipleCountries"),
        type: "member",
        category: "基金项目",
        isVideo: false,
        likes: 1247,
        views: 8950,
        status: "display_only", // 只显示，不开放捐赠
        fundAmount: 500000000,
        beneficiaries: 580,
        priority: "medium",
      },
      {
        id: 13,
        title: t("events.pensionFund"),
        description: t("events.pensionFundDesc"),
        image: "/images/events/pension-fund.jpg",
        date: "暂未开放",
        location: t("events.multipleCountries"),
        type: "member",
        category: "基金项目",
        isVideo: false,
        likes: 734,
        views: 4280,
        status: "display_only", // 只显示，不开放捐赠
        fundAmount: 100000000,
        beneficiaries: 1200,
        priority: "high",
      },
    ];

    const allianceEvents = [
      {
        id: 4,
        title: t("events.globalMuslimCharityConference"),
        description: t("events.globalMuslimCharityConferenceDesc"),
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        date: "2025-02-15",
        location: t("events.dubai"),
        type: "alliance",
        category: t("events.upcoming"),
        isVideo: false,
        likes: 856,
        views: 5100,
        status: "upcoming",
        registrationOpen: true,
      },
      {
        id: 5,
        title: t("events.internationalReliefAction"),
        description: t("events.internationalReliefActionDesc"),
        image:
          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
        date: t("events.ongoing"),
        location: t("events.multipleCountries"),
        type: "alliance",
        category: t("events.jointAction"),
        isVideo: false,
        videoUrl: "https://example.com/joint-relief.mp4",
        likes: 567,
        views: 4340,
        status: "ongoing",
        participants: 15,
      },
      {
        id: 6,
        title: t("events.blockchainCharityWorkshop"),
        description: t("events.blockchainCharityWorkshopDesc"),
        image:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
        date: "2024-11-20",
        location: t("events.online"),
        type: "alliance",
        category: t("events.completed"),
        isVideo: false,
        likes: 234,
        views: 1890,
        status: "completed",
      },
    ];

    const ongoingEvents = [
      // 慈善公益推广回馈基金 - 基金释放形式
      {
        id: 10,
        title: t("events.charityPromotionRewardFund"),
        description: t("events.charityPromotionRewardFundDesc"),
        image:
          "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
        date: t("events.longTerm"),
        progress: 14, // 已释放14%的资金
        location: t("events.multipleCountries"),
        type: "ongoing",
        category: "基金释放",
        totalFundAmount: 80000000, // 总规模8000万USD
        releasedAmount: 11200000, // 已释放金额
        beneficiaries: 800, // 受益人数
        likes: 1680,
        views: 12500,
        urgency: "normal",
        status: "fund_release", // 特殊状态：资金释放
      },
      // 从会员标签移动过来的三个卡片，状态改为已完成，结束时间设置为2025年8月前
      {
        id: 1,
        title: t("events.palestinianChildrenWinterClothes"),
        description: t("events.palestinianChildrenWinterClothesDesc"),
        image: "/images/events/children-winter-clothes.jpg",
        date: "2025-07-15", // 结束时间设置为2025年7月
        location: t("events.palestine"),
        type: "ongoing",
        category: t("events.completed"), // 状态改为已完成
        isVideo: false,
        likes: 1285,
        views: 8350,
        status: "completed", // 状态改为已完成
        donationAmount: 500,
        progress: 100, // 完成度100%
        targetAmount: 500,
        currentAmount: 500,
        participants: 250,
        urgency: "normal",
      },
      {
        id: 2,
        title: t("events.syrianRefugeeAid"),
        description: t("events.syrianRefugeeAidDesc"),
        image: "/images/events/syrian-refugee-aid.jpg",
        date: "2025-06-30", // 结束时间设置为2025年6月
        location: t("events.syriaBorder"),
        type: "ongoing",
        category: t("events.completed"), // 状态改为已完成
        isVideo: true,
        videoUrl: "https://example.com/syria-aid-video.mp4",
        likes: 2156,
        views: 12700,
        status: "completed", // 状态改为已完成
        progress: 100, // 完成度100%
        targetAmount: 800,
        currentAmount: 800,
        participants: 420,
        urgency: "normal",
      },
      {
        id: 3,
        title: t("events.ramadanFoodPackages"),
        description: t("events.ramadanFoodPackagesDesc"),
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
        date: "2025-08-15", // 结束时间设置为2025年8月
        location: t("events.multipleCountries"),
        type: "ongoing",
        category: t("events.completed"), // 状态改为已完成
        isVideo: false,
        likes: 1867,
        views: 9420,
        status: "completed", // 状态改为已完成
        donationAmount: 300,
        progress: 100, // 完成度100%
        targetAmount: 300,
        currentAmount: 300,
        participants: 6000,
        urgency: "normal",
      },
      // 原有的进行中项目
      {
        id: 7,
        title: t("events.gazaMedicalAid"),
        description: t("events.gazaMedicalAidDesc"),
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
        date: t("events.emergencyOngoing"),
        progress: 65,
        location: t("events.gaza"),
        type: "ongoing",
        category: t("events.emergencyAid"),
        targetAmount: 500000,
        currentAmount: 325000,
        participants: 3200,
        likes: 1203,
        views: 8670,
        urgency: "high",
      },
      {
        id: 8,
        title: t("events.orphanEducationSupport"),
        description: t("events.orphanEducationSupportDesc"),
        image:
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80",
        date: t("events.longTerm"),
        progress: 50,
        location: t("events.multipleCountries"),
        type: "ongoing",
        category: t("events.educationSupport"),
        targetAmount: 1000000,
        currentAmount: 500000,
        participants: 5500,
        likes: 2145,
        views: 12980,
        urgency: "medium",
      },
      {
        id: 9,
        title: t("events.mosqueWellConstruction"),
        description: t("events.mosqueWellConstructionDesc"),
        image: "/images/events/mosque-well-construction.jpg",
        date: t("events.ongoing"),
        progress: 40,
        location: t("events.africa"),
        type: "ongoing",
        category: t("events.infrastructure"),
        targetAmount: 200000,
        currentAmount: 80000,
        participants: 1800,
        likes: 945,
        views: 5680,
        urgency: "normal",
      },
    ];

    return { memberEvents, allianceEvents, ongoingEvents };
  }, [t]); // 添加翻译函数作为依赖

  // 使用useMemo缓存事件数据，避免无限循环
  const { memberEvents, allianceEvents, ongoingEvents } = useMemo(() => {
    return getTranslatedEvents();
  }, [getTranslatedEvents]);

  // 初始化动态数据 - 直接使用事件数据作为依赖
  useEffect(() => {
    const allCards = [...memberEvents, ...allianceEvents, ...ongoingEvents];
    const activeCards = allCards.filter((card) => card.status !== "completed");

    const initialStats: { [key: number]: { likes: number; views: number } } =
      {};

    activeCards.forEach((card) => {
      initialStats[card.id] = {
        likes: card.likes || 0,
        views: card.views || 0,
      };
    });

    setDynamicStats(initialStats);
  }, []); // 暂时移除依赖，避免无限循环

  // 动态增长逻辑
  useEffect(() => {
    const allCards = [...memberEvents, ...allianceEvents, ...ongoingEvents];
    const activeCards = allCards.filter((card) => card.status !== "completed");

    const scheduleRandomUpdate = () => {
      // 随机选择一个活跃卡片
      const randomCard =
        activeCards[Math.floor(Math.random() * activeCards.length)];
      if (!randomCard) return;

      // 随机决定更新点赞还是观看数，或者两者都更新
      const updateType = Math.random();
      const likesIncrement =
        updateType < 0.4 ? Math.floor(Math.random() * 3) + 1 : 0; // 40%概率增加1-3个点赞
      const viewsIncrement =
        updateType > 0.3 ? Math.floor(Math.random() * 8) + 1 : 0; // 70%概率增加1-8个观看

      setDynamicStats((prev) => ({
        ...prev,
        [randomCard.id]: {
          likes:
            (prev[randomCard.id]?.likes || randomCard.likes || 0) +
            likesIncrement,
          views:
            (prev[randomCard.id]?.views || randomCard.views || 0) +
            viewsIncrement,
        },
      }));

      // 设置下一次更新的随机时间间隔（2-8秒）
      const nextUpdateDelay = Math.floor(Math.random() * 6000) + 2000;
      setTimeout(scheduleRandomUpdate, nextUpdateDelay);
    };

    // 开始第一次更新
    const initialDelay = Math.floor(Math.random() * 3000) + 1000; // 1-4秒后开始
    const timeoutId = setTimeout(scheduleRandomUpdate, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []); // 暂时移除依赖，避免无限循环

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    target.style.background =
      "linear-gradient(135deg, #1a1f2c 0%, #2a2f3c 100%)";
    target.style.display = "flex";
    target.style.alignItems = "center";
    target.style.justifyContent = "center";
    target.innerHTML = `<div class="flex flex-col items-center justify-center w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2 text-[#d4b96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-xs text-[#d4b96e]">${t("vipEvents.loading")}</span>
    </div>`;
  };

  return (
    <MainLayout title={t("vipLevel.title")} currentPath="/vip-events">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
      <div className="space-y-8">
        {/* 会员卡片 */}
        <div className="p-3">
          <div className="relative bg-gradient-to-br from-[#0a0a0f] to-[#151515] rounded-2xl overflow-hidden border border-[#d4b96e]/20 shadow-lg">
            {/* 背景纹理 */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-5"></div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(212, 185, 110, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(212, 185, 110, 0.05) 0%, transparent 50%),
                  linear-gradient(45deg, rgba(212, 185, 110, 0.02) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(212, 185, 110, 0.02) 25%, transparent 25%)
                `,
                  backgroundSize: "100% 100%, 100% 100%, 20px 20px, 20px 20px",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
            </div>

            <div className="relative p-4 pl-6">
              <div className="flex items-center space-x-6">
                {/* 左侧 - 动态VIP徽章 */}
                <div className="flex-shrink-0 ml-2">
                  <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                    {/* 徽章容器 */}
                    <VipBadge vipLevel={userData.vipLevel} />
                  </div>
                </div>

                {/* 右侧 - 用户信息和数据 */}
                <div className="flex-1 min-w-0">
                  {/* 等级名称 */}
                  <div className="text-xl font-bold text-[#d4b96e] mb-3 ml-4">
                    {getVipLevelName(userData.vipLevel)}
                  </div>

                  {/* 数据展示 */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* 已捐赠 */}
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-[#d4b96e]/10 flex items-center justify-center">
                        <Heart className="h-3.5 w-3.5 text-[#d4b96e]" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#d4b96e] flex items-baseline">
                          {userData.currentDonation}
                          <span className="text-xs ml-1">USD</span>
                        </div>
                        <div className="text-xs text-[#f5efe0]/60">
                          {t("donationOverview.donationAmount")}
                        </div>
                      </div>
                    </div>

                    {/* 可提取 */}
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-green-400 flex items-baseline">
                          {userData.withdrawableAmount}
                          <span className="text-xs ml-1">USD</span>
                        </div>
                        <div className="text-xs text-[#f5efe0]/60">
                          {t("donationOverview.withdrawableAmount")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 升级按钮 */}
              <div className="mt-3">
                {userData.vipLevel < 5 ? (
                  <Button
                    className="w-full bg-gradient-to-r from-[#d4b96e] to-[#b39339] text-[#1a1f2c] hover:opacity-90 transition-opacity py-1.5"
                    onClick={handleUpgrade}
                    disabled={isUpgrading}
                  >
                    {isUpgrading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1a1f2c]/30 border-t-[#1a1f2c] rounded-full animate-spin mr-2"></div>
                        {t("vipLevel.upgrading")}
                      </>
                    ) : (
                      <>
                        {userData.vipLevel === 0 &&
                          t("vipLevel.upgradeToLevel1")}
                        {userData.vipLevel === 1 &&
                          t("vipLevel.upgradeToLevel2")}
                        {userData.vipLevel === 2 &&
                          t("vipLevel.upgradeToLevel3")}
                        {userData.vipLevel === 3 &&
                          t("vipLevel.upgradeToLevel4")}
                        {userData.vipLevel === 4 &&
                          t("vipLevel.upgradeToLevel5")}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gradient-to-r from-[#d4b96e]/50 to-[#b39339]/50 text-[#1a1f2c]/70 py-1.5 cursor-not-allowed"
                  >
                    {t("vipLevel.maxLevel")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab导航区域 */}
        <div>
          {/* 水平标签组 */}
          <div className="border-b border-[#d4b96e]/20">
            <div className="grid grid-cols-5 w-full">
              {[
                {
                  key: "member" as CategoryType,
                  label: t("navigation.member"),
                  Icon: Crown,
                },
                {
                  key: "alliance" as CategoryType,
                  label: t("navigation.alliance"),
                  Icon: Heart,
                },
                {
                  key: "level" as CategoryType,
                  label: t("navigation.level"),
                  Icon: Trophy,
                },
                {
                  key: "ongoing" as CategoryType,
                  label: t("navigation.ongoing"),
                  Icon: Clock,
                },
                {
                  key: "overseas" as CategoryType,
                  label: t("navigation.overseas"),
                  Icon: Globe,
                },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`
                    relative flex items-center justify-center space-x-2 px-2 py-3 transition-all duration-200 
                    border-b-2 font-medium text-sm whitespace-nowrap
                    ${
                      selectedCategory === key
                        ? "text-[#d4b96e] border-[#d4b96e] bg-gradient-to-t from-[#d4b96e]/5 to-transparent"
                        : "text-[#f5efe0]/60 border-transparent hover:text-[#d4b96e] hover:border-[#d4b96e]/50"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-4 w-4 transition-all duration-200 flex-shrink-0
                      ${
                        selectedCategory === key
                          ? "text-[#d4b96e]"
                          : "text-[#f5efe0]/60"
                      }
                    `}
                  />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab内容区域 */}
        <div className="mt-2">
          {selectedCategory === "member" && (
            <div className="space-y-6">
              {/* 分类标题 */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#d4b96e] mb-2">
                  {t("vipEvents.myCharityFootprint")}
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  {t("vipEvents.viewAllCharityActivities")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memberEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden hover:border-[#d4b96e]/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#151515] opacity-50"></div>
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{
                              objectPosition:
                                event.id === 11
                                  ? "center bottom"
                                  : "center center",
                            }}
                            onError={handleImageError}
                          />
                          {event.isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-[#d4b96e]/90 flex items-center justify-center">
                                <Play className="h-6 w-6 text-[#0a0a0f] fill-current" />
                              </div>
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={`
                              ${
                                event.status === "display_only"
                                  ? "bg-purple-600"
                                  : event.status === "completed"
                                  ? "bg-green-500"
                                  : event.status === "ongoing"
                                  ? "bg-[#d4b96e]"
                                  : "bg-blue-500"
                              } 
                              text-white shadow-lg
                            `}
                            >
                              {event.status === "display_only"
                                ? t("events.notYetOpen")
                                : event.category === "基金释放"
                                ? t("events.fundRelease")
                                : event.category}
                            </Badge>
                          </div>
                          {/* 会员专享基金不显示进度条 */}
                        </div>

                        <div className="p-4">
                          <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                            {event.title}
                          </h4>
                          <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-6 leading-relaxed">
                            {event.description}
                          </p>
                          {/* 会员专享基金的基金规模信息已在下方display_only部分显示 */}
                          {event.status === "display_only" && (
                            <div className="flex items-start justify-between mb-3">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Heart className="h-4 w-4 text-[#d4b96e]" />
                                  <span className="text-sm font-medium text-[#d4b96e] flex items-baseline">
                                    {t("events.fundScale")}:{" "}
                                    {event.fundAmount.toLocaleString()}
                                    <span className="text-xs ml-1">USD</span>
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4 text-[#d4b96e]" />
                                  <span className="text-sm text-[#d4b96e]">
                                    {t("events.beneficiaryCount")}:{" "}
                                    {event.id === 10
                                      ? event.beneficiaries.toLocaleString()
                                      : t("events.notYetOpen")}
                                  </span>
                                </div>
                              </div>

                              {/* 创业基金专用漏斗GIF动画 - 与基金信息同行 */}
                              {event.id === 11 && (
                                <div className="w-16 h-10 ml-4 flex items-center">
                                  <img
                                    src="/assets/funnel-animation.gif"
                                    alt="漏斗动画"
                                    className="w-full h-full object-contain"
                                    style={{
                                      filter: "brightness(0.9) saturate(0.8)",
                                      backgroundColor: "transparent",
                                    }}
                                    loading="eager"
                                    decoding="sync"
                                    onLoad={(e) => {
                                      // 确保GIF立即开始播放
                                      const img = e.target as HTMLImageElement;
                                      img.style.opacity = "1";
                                    }}
                                    onError={(e) => {
                                      console.log("GIF加载失败");
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-end text-xs text-[#f5efe0]/60">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === "alliance" && (
            <div className="space-y-6">
              {/* 分类标题 */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#d4b96e] mb-2">
                  {t("vipEvents.allianceCharityActivities")}
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  {t("vipEvents.foundationJointActivities")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allianceEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden hover:border-[#d4b96e]/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#151515] opacity-50"></div>
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={handleImageError}
                          />
                          {event.isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-[#d4b96e]/90 flex items-center justify-center">
                                <Play className="h-6 w-6 text-[#0a0a0f] fill-current" />
                              </div>
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={`
                              ${
                                event.status === "upcoming"
                                  ? "bg-blue-500"
                                  : event.status === "ongoing"
                                  ? "bg-[#d4b96e]"
                                  : "bg-[#d4b96e]"
                              } 
                              text-black shadow-lg
                            `}
                            >
                              {event.category === "基金释放"
                                ? t("events.fundRelease")
                                : event.category}
                            </Badge>
                          </div>
                          {event.registrationOpen && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-red-500 text-white shadow-lg animate-pulse">
                                {t("vipEvents.openRegistration")}
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                            {event.title}
                          </h4>
                          <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-6 leading-relaxed">
                            {event.description}
                          </p>
                          {event.participants && (
                            <div className="flex items-center space-x-2 mb-3">
                              <Users className="h-4 w-4 text-[#d4b96e]" />
                              <span className="text-sm text-[#d4b96e]">
                                {event.participants}{" "}
                                {t("vipEvents.organizationsParticipating")}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs text-[#f5efe0]/60">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Heart className="h-4 w-4" />
                                <span>
                                  {
                                    getDynamicStats(
                                      event.id,
                                      event.likes,
                                      event.views
                                    ).likes
                                  }
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>
                                  {
                                    getDynamicStats(
                                      event.id,
                                      event.likes,
                                      event.views
                                    ).views
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === "level" && (
            <div className="space-y-6 px-4">
              {/* 等级说明标题 */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#d4b96e] mb-2">
                  {t("vipLevel.title")}
                </h3>
                <p className="text-sm text-[#f5efe0]/80">
                  {t("vipLevel.subtitle")}
                </p>
              </div>

              {/* 等级卡片列表 */}
              <div className="space-y-4">
                {/* V1 - 布拉克等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角价格信息 */}
                    <Badge className="absolute top-4 right-4 bg-[#D2691E]/20 text-[#D2691E] border-[#D2691E]/30 flex items-baseline">
                      {getVipLevelDonationAmount(1)}
                      <span className="text-xs ml-1">USD</span>
                    </Badge>

                    <div className="flex items-start mb-4">
                      <div className="flex items-center space-x-8 flex-1">
                        <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                          {/* 徽章容器 */}
                          <div className="absolute inset-x-0 top-0 w-16 h-16">
                            {/* V1 - 铜色系 - 超强立体金属质感 */}
                            {/* 多层外部阴影系统 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#D2691E]/40 to-[#A0522D]/50 rounded-full blur-2xl scale-125"></div>
                            <div className="absolute inset-1 bg-gradient-to-b from-[#CD853F]/30 to-[#8B4513]/40 rounded-full blur-xl scale-115"></div>
                            <div className="absolute inset-2 bg-gradient-to-b from-[#D2691E]/20 to-[#A0522D]/30 rounded-full blur-lg scale-110"></div>

                            {/* 徽章主体 - 超复杂多层金属效果 */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_8px_25px_rgba(139,69,19,0.8),0_4px_12px_rgba(160,82,45,0.6),0_2px_6px_rgba(210,105,30,0.4)]">
                              {/* 最外层立体边框 */}
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8B4513] to-[#654321] p-[1px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.5)]">
                                {/* 外圈立体金属环 */}
                                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#D2691E] to-[#A0522D] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4),inset_0_-1px_3px_rgba(255,255,255,0.2)]">
                                  {/* 中层立体装饰凹槽 */}
                                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#CD853F] to-[#A0522D] p-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                                    {/* 立体装饰环纹 */}
                                    <div className="absolute inset-1 rounded-full border-[0.5px] border-white/30 shadow-[0_0_2px_rgba(255,255,255,0.4)]"></div>
                                    <div className="absolute inset-2 rounded-full border-[0.5px] border-[#8B4513]/40"></div>

                                    {/* 内圈超精细金属表面 */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F4A460] via-[#DEB887] via-[#D2691E] to-[#A0522D] flex items-center justify-center relative overflow-hidden shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.3)]">
                                      {/* 超复杂金属光泽系统 */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/30 rounded-full"></div>
                                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-5 bg-gradient-to-b from-white/80 to-transparent rounded-full blur-md"></div>
                                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-sm"></div>
                                      <div className="absolute bottom-1.5 right-1.5 w-6 h-3 bg-black/30 rounded-full blur-md"></div>
                                      <div className="absolute bottom-2.5 right-2.5 w-3 h-1.5 bg-black/40 rounded-full blur-sm"></div>
                                      <div className="absolute top-2.5 right-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                                      <div className="absolute bottom-3 left-2.5 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>

                                      {/* 精密同心圆金属纹理 */}
                                      <div className="absolute inset-1.5 rounded-full border-[0.5px] border-white/40 shadow-[0_0_3px_rgba(255,255,255,0.3)]"></div>
                                      <div className="absolute inset-2.5 rounded-full border-[0.5px] border-white/25"></div>
                                      <div className="absolute inset-3.5 rounded-full border-[0.5px] border-[#8B4513]/30"></div>

                                      {/* 立体放射状金属纹理 */}
                                      <div
                                        className="absolute inset-2 rounded-full"
                                        style={{
                                          background: `conic-gradient(from 0deg, 
                                          transparent 0deg, rgba(255,255,255,0.15) 15deg, transparent 30deg,
                                          rgba(255,255,255,0.1) 45deg, transparent 60deg,
                                          rgba(255,255,255,0.15) 75deg, transparent 90deg,
                                          rgba(255,255,255,0.1) 105deg, transparent 120deg,
                                          rgba(255,255,255,0.15) 135deg, transparent 150deg,
                                          rgba(255,255,255,0.1) 165deg, transparent 180deg,
                                          rgba(255,255,255,0.15) 195deg, transparent 210deg,
                                          rgba(255,255,255,0.1) 225deg, transparent 240deg,
                                          rgba(255,255,255,0.15) 255deg, transparent 270deg,
                                          rgba(255,255,255,0.1) 285deg, transparent 300deg,
                                          rgba(255,255,255,0.15) 315deg, transparent 330deg,
                                          rgba(255,255,255,0.1) 345deg, transparent 360deg)`,
                                        }}
                                      ></div>

                                      {/* 立体装饰纹线 */}
                                      {[...Array(12)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-[1px] h-4 bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_1px_rgba(255,255,255,0.6)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 30
                                            }deg) translateY(-14px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 中心立体图标 - 星星 */}
                                      <div className="relative z-10 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full p-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.7),0_1px_3px_rgba(0,0,0,0.5)] border border-[#A0522D]/50">
                                        <div className="bg-gradient-to-b from-[#A0522D] to-[#8B4513] rounded-full p-0.5">
                                          <Star
                                            className="h-6 w-6 text-[#F4A460] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter brightness-110"
                                            fill="currentColor"
                                            style={{
                                              filter:
                                                "drop-shadow(0 0 3px rgba(244, 164, 96, 0.6))",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 ml-4">
                          <h4 className="text-lg font-bold text-[#D2691E]">
                            {t("vip.level1")}
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            {t("vipLevel.entryLevel")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-2">
                          {t("vipLevel.upgradeConditions")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          {t("vipLevel.cumulativeDonation").replace(
                            "{amount}",
                            getVipLevelDonationAmount(1).toString()
                          )}
                          <span className="text-xs ml-1">USD</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.exclusiveBenefits")}
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#D2691E]" />
                            <span>
                              {t("vipLevel.dailyReliefFund")}:{" "}
                              {getDailyFundRangeForLevel(1)}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#D2691E]" />
                            <span>{t("vipLevel.referralReward")}: 20%</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#D2691E]" />
                            <span>
                              {t("vipLevel.rewardCycle")}:{" "}
                              {getVipLevelPeriod(1)}
                              {t("vipLevel.days")}
                            </span>
                          </li>
                          {getVipLevelNextVoucher(1) > 0 && (
                            <li className="flex items-center space-x-2">
                              <Gift className="h-3 w-3 text-[#d4b96e]" />
                              <span className="text-[#d4b96e]">
                                {t("donation.nextLevelVoucherReward")}{" "}
                                {getVipLevelNextVoucher(1)} USD，升级到
                                {t("vip.level2")}可用
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V2 - 巴达尔等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角价格信息 */}
                    <Badge className="absolute top-4 right-4 bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/30 flex items-baseline">
                      {getVipLevelDonationAmount(2)}
                      <span className="text-xs ml-1">USD</span>
                    </Badge>

                    <div className="flex items-start mb-4">
                      <div className="flex items-center space-x-8 flex-1">
                        <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                          {/* 徽章容器 */}
                          <div className="absolute inset-x-0 top-0 w-16 h-16">
                            {/* V2 - 青铜金色系 - 超强立体金属质感 */}
                            {/* 多层外部阴影系统 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#CD7F32]/50 to-[#B8860B]/60 rounded-full blur-2xl scale-130"></div>
                            <div className="absolute inset-1 bg-gradient-to-b from-[#DEB887]/40 to-[#CD7F32]/50 rounded-full blur-xl scale-120"></div>
                            <div className="absolute inset-2 bg-gradient-to-b from-[#CD7F32]/30 to-[#B8860B]/40 rounded-full blur-lg scale-115"></div>

                            {/* 徽章主体 - 超复杂多层设计 */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_10px_30px_rgba(205,127,50,0.9),0_5px_15px_rgba(184,134,11,0.7),0_2px_8px_rgba(222,184,135,0.5)]">
                              {/* 最外层立体边框 */}
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8B4513] to-[#654321] p-[1px] shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.6)]">
                                {/* 外圈立体装饰环 */}
                                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#CD7F32] to-[#B8860B] p-[2px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),inset_0_-1px_4px_rgba(255,255,255,0.3)]">
                                  {/* 中间立体凹槽层 */}
                                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#DEB887] to-[#CD7F32] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
                                    {/* 立体装饰环纹 */}
                                    <div className="absolute inset-1 rounded-full border-[0.5px] border-white/40 shadow-[0_0_3px_rgba(255,255,255,0.5)]"></div>
                                    <div className="absolute inset-2 rounded-full border-[0.5px] border-[#B8860B]/50"></div>
                                    <div className="absolute inset-3 rounded-full border-[0.5px] border-white/20"></div>

                                    {/* 内圈超精细金属表面 */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F5DEB3] via-[#DEB887] via-[#CD7F32] to-[#B8860B] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.4)]">
                                      {/* 超复杂金属光泽系统 */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/35 rounded-full"></div>
                                      <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white/90 to-transparent rounded-full blur-lg"></div>
                                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-white/70 to-transparent rounded-full blur-md"></div>
                                      <div className="absolute bottom-1 right-1 w-8 h-4 bg-black/35 rounded-full blur-lg"></div>
                                      <div className="absolute bottom-2 right-2 w-4 h-2 bg-black/50 rounded-full blur-md"></div>
                                      <div className="absolute top-2.5 right-1.5 w-4 h-4 bg-white/60 rounded-full blur-md"></div>
                                      <div className="absolute bottom-2.5 left-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                                      <div className="absolute top-3.5 left-3 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>

                                      {/* 精密同心圆金属纹理 */}
                                      <div className="absolute inset-1 rounded-full border-[0.5px] border-white/50 shadow-[0_0_4px_rgba(255,255,255,0.4)]"></div>
                                      <div className="absolute inset-2 rounded-full border-[0.5px] border-white/30"></div>
                                      <div className="absolute inset-3 rounded-full border-[0.5px] border-[#B8860B]/40"></div>
                                      <div className="absolute inset-4 rounded-full border-[0.5px] border-white/20"></div>

                                      {/* 立体放射状装饰线 */}
                                      {[...Array(16)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-[1px] h-5 bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_2px_rgba(255,255,255,0.7)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 22.5
                                            }deg) translateY(-16px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 立体装饰点 */}
                                      {[...Array(8)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-1 h-1 bg-gradient-to-br from-white/60 to-[#B8860B]/80 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 45
                                            }deg) translateY(-20px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 中心立体图标 - 拇指向上 */}
                                      <div className="relative z-10 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full p-2 shadow-[0_4px_10px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.6)] border-2 border-[#CD7F32]/60">
                                        <div className="bg-gradient-to-b from-[#CD7F32] to-[#B8860B] rounded-full p-0.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                                          <svg
                                            className="h-5 w-5 text-[#F5DEB3] drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] filter brightness-125"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{
                                              filter:
                                                "drop-shadow(0 0 4px rgba(245, 222, 179, 0.7))",
                                            }}
                                          >
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 ml-4">
                          <h4 className="text-lg font-bold text-[#CD7F32]">
                            {t("vip.level2")}
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            {t("vipLevel.advancedMember")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-2">
                          {t("vipLevel.upgradeConditions")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          {t("vipLevel.cumulativeDonation").replace(
                            "{amount}",
                            getVipLevelDonationAmount(2).toString()
                          )}
                          <span className="text-xs ml-1">USD</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.exclusiveBenefits")}
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#CD7F32]" />
                            <span>
                              {t("vipLevel.dailyReliefFund")}:{" "}
                              {getDailyFundRangeForLevel(2)}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#CD7F32]" />
                            <span>{t("vipLevel.referralReward")}: 22%</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#CD7F32]" />
                            <span>
                              {t("vipLevel.rewardCycle")}:{" "}
                              {getVipLevelPeriod(2)}
                              {t("vipLevel.days")}
                            </span>
                          </li>
                          {getVipLevelNextVoucher(2) > 0 && (
                            <li className="flex items-center space-x-2">
                              <Gift className="h-3 w-3 text-[#d4b96e]" />
                              <span className="text-[#d4b96e]">
                                {t("donation.nextLevelVoucherReward")}{" "}
                                {getVipLevelNextVoucher(2)} USD，升级到
                                {t("vip.level3")}可用
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V3 - 蒙塔哈等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  {/* 遮罩层 - 当用户VIP等级小于2时显示 */}
                  {currentVipLevel < 2 && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#d4b96e]/20 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[#d4b96e]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-[#d4b96e] mb-1">
                          {t("vipLevel.locked")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/60">
                          {t("vipLevel.unlockCondition")}
                        </p>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 flex items-baseline">
                      {getVipLevelDonationAmount(3)}
                      <span className="text-xs ml-1">USD</span>
                    </Badge>

                    <div className="flex items-start mb-4">
                      <div className="flex items-center space-x-8 flex-1">
                        <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                          {/* 徽章容器 */}
                          <div className="absolute inset-x-0 top-0 w-16 h-16">
                            {/* V3 - 金银配色 - 至尊立体金属质感 */}
                            {/* 多层外部阴影系统 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/60 to-[#C0C0C0]/70 rounded-full blur-3xl scale-135"></div>
                            <div className="absolute inset-1 bg-gradient-to-b from-[#FFF8DC]/50 to-[#FFD700]/60 rounded-full blur-2xl scale-125"></div>
                            <div className="absolute inset-2 bg-gradient-to-b from-[#FFD700]/40 to-[#C0C0C0]/50 rounded-full blur-xl scale-120"></div>

                            {/* 徽章主体 - 豪华三层设计 */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_12px_35px_rgba(255,215,0,1),0_6px_20px_rgba(192,192,192,0.8),0_3px_10px_rgba(255,248,220,0.6)]">
                              {/* 最外层立体边框 */}
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#B8860B] to-[#8B7355] p-[1px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.7)]">
                                {/* 外圈装饰带 */}
                                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E5E5E5] to-[#C0C0C0] p-[1.5px] shadow-[inset_0_5px_10px_rgba(0,0,0,0.6),inset_0_-2px_5px_rgba(255,255,255,0.4)]">
                                  {/* 装饰花纹环 */}
                                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#FFD700] to-[#DAA520] p-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
                                    {/* 外圈立体装饰点 */}
                                    <div className="absolute inset-0 rounded-full">
                                      {[...Array(16)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-2 h-2 bg-gradient-to-b from-[#E5E5E5] to-[#C0C0C0] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 22.5
                                            }deg) translateY(-28px)`,
                                          }}
                                        />
                                      ))}
                                    </div>

                                    {/* 内圈超豪华金属表面 */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF8DC] via-[#FFD700] via-[#DAA520] to-[#B8860B] flex items-center justify-center relative overflow-hidden shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),inset_0_-3px_5px_rgba(0,0,0,0.5)]">
                                      {/* 超复杂金属光泽系统 */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-black/40 rounded-full"></div>
                                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-7 bg-gradient-to-b from-white/95 to-transparent rounded-full blur-xl"></div>
                                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-5 bg-gradient-to-b from-white/80 to-transparent rounded-full blur-lg"></div>
                                      <div className="absolute bottom-0.5 right-0.5 w-10 h-5 bg-black/40 rounded-full blur-xl"></div>
                                      <div className="absolute bottom-1.5 right-1.5 w-6 h-3 bg-black/60 rounded-full blur-lg"></div>
                                      <div className="absolute top-2 right-1 w-5 h-5 bg-white/70 rounded-full blur-lg"></div>
                                      <div className="absolute bottom-2 left-1.5 w-4 h-4 bg-white/60 rounded-full blur-md"></div>
                                      <div className="absolute top-3 left-2.5 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                                      <div className="absolute center-right w-2 h-2 bg-white/40 rounded-full blur-sm"></div>

                                      {/* 精密同心圆金属纹理 */}
                                      <div className="absolute inset-0.5 rounded-full border-[1px] border-white/60 shadow-[0_0_5px_rgba(255,255,255,0.6)]"></div>
                                      <div className="absolute inset-1.5 rounded-full border-[0.5px] border-white/50 shadow-[0_0_4px_rgba(255,255,255,0.4)]"></div>
                                      <div className="absolute inset-2.5 rounded-full border-[0.5px] border-white/30"></div>
                                      <div className="absolute inset-3.5 rounded-full border-[0.5px] border-[#DAA520]/40"></div>
                                      <div className="absolute inset-4.5 rounded-full border-[0.5px] border-white/20"></div>

                                      {/* 立体放射状装饰纹 */}
                                      {[...Array(24)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-[1px] h-6 bg-gradient-to-b from-transparent via-white/60 to-transparent shadow-[0_0_3px_rgba(255,255,255,0.8)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 15
                                            }deg) translateY(-18px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 立体装饰钻石点 */}
                                      {[...Array(12)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-1.5 h-1.5 bg-gradient-to-br from-white/80 to-[#DAA520]/90 transform rotate-45 shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 30
                                            }deg) translateY(-22px) rotate(45deg)`,
                                          }}
                                        />
                                      ))}

                                      {/* 中心立体图标 - 火焰 */}
                                      <div className="relative z-10 bg-gradient-to-b from-[#B8860B] to-[#8B7355] rounded-full p-2.5 shadow-[0_5px_12px_rgba(0,0,0,0.9),0_3px_8px_rgba(0,0,0,0.7)] border-2 border-[#FFD700]/70">
                                        <div className="bg-gradient-to-b from-[#FFD700] to-[#DAA520] rounded-full p-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]">
                                          <div className="bg-gradient-to-b from-[#DAA520] to-[#B8860B] rounded-full p-0.5">
                                            <svg
                                              className="h-4 w-4 text-[#FFF8DC] drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter brightness-140"
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                              style={{
                                                filter:
                                                  "drop-shadow(0 0 6px rgba(255, 248, 220, 0.8))",
                                              }}
                                            >
                                              <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.5 1.3-4.8 3.5-6.1-.2.6-.3 1.3-.3 2 0 3.3 2.7 6 6 6s6-2.7 6-6c0-.7-.1-1.4-.3-2 2.2 1.3 3.5 3.6 3.5 6.1 0 3.9-3.1 7-7 7zM12 1S7 5 7 11c0 2.8 2.2 5 5 5s5-2.2 5-5c0-6-5-10-5-10z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 ml-4">
                          <h4 className="text-lg font-bold text-[#FFD700]">
                            {t("vip.level3")}
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            {t("vipLevel.intermediateMember")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.upgradeConditions")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          {t("vipLevel.cumulativeDonation").replace(
                            "{amount}",
                            getVipLevelDonationAmount(3).toString()
                          )}
                          <span className="text-xs ml-1">USD</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.exclusiveBenefits")}
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#E6E6FA]" />
                            <span>
                              {t("vipLevel.dailyReliefFund")}:{" "}
                              {getDailyFundRangeForLevel(3)}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#E6E6FA]" />
                            <span>{t("vipLevel.referralReward")}: 24%</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#E6E6FA]" />
                            <span>
                              {t("vipLevel.rewardCycle")}:{" "}
                              {getVipLevelPeriod(3)}
                              {t("vipLevel.days")}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#E6E6FA]" />
                            <span>{t("vipLevel.honoraryContributor")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#E6E6FA]" />
                            <span>{t("vipLevel.ambassadorSelection")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#E6E6FA]" />
                            <span>{t("vipLevel.personalManager")}</span>
                          </li>
                          {getVipLevelNextVoucher(3) > 0 && (
                            <li className="flex items-center space-x-2">
                              <Gift className="h-3 w-3 text-[#d4b96e]" />
                              <span className="text-[#d4b96e]">
                                {t("donation.nextLevelVoucherReward")}{" "}
                                {getVipLevelNextVoucher(3)} USD，升级到
                                {t("vip.level4")}可用
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V4 - 米尔贾等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  {/* 遮罩层 - 当用户VIP等级小于3时显示 */}
                  {currentVipLevel < 3 && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#d4b96e]/20 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[#d4b96e]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-[#d4b96e] mb-1">
                          {t("vipLevel.locked")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/60">
                          {t("vipLevel.unlockCondition")}
                        </p>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30 flex items-baseline">
                      {getVipLevelDonationAmount(4)}
                      <span className="text-xs ml-1">USD</span>
                    </Badge>

                    <div className="flex items-start mb-4">
                      <div className="flex items-center space-x-8 flex-1">
                        <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                          {/* 徽章容器 */}
                          <div className="absolute inset-x-0 top-0 w-16 h-16">
                            {/* V4 - 深金紫色系 - 传奇立体金属质感 */}
                            {/* 多层外部阴影系统 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#B8860B]/70 to-[#8B4513]/80 rounded-full blur-3xl scale-110"></div>
                            <div className="absolute inset-1 bg-gradient-to-b from-[#DAA520]/60 to-[#B8860B]/70 rounded-full blur-2xl scale-105"></div>
                            <div className="absolute inset-2 bg-gradient-to-b from-[#B8860B]/50 to-[#8B4513]/60 rounded-full blur-xl scale-102"></div>

                            {/* 徽章主体 - 传奇齿轮环设计 */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_15px_40px_rgba(184,134,11,1),0_8px_25px_rgba(139,69,19,0.9),0_4px_15px_rgba(218,165,32,0.7)]">
                              {/* 外层齿轮装饰环 */}
                              <div className="absolute inset-0 rounded-full">
                                {[...Array(20)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                      top: "50%",
                                      left: "50%",
                                      transform: `translate(-50%, -50%) rotate(${
                                        i * 18
                                      }deg) translateY(-26px)`,
                                    }}
                                  >
                                    <div
                                      className="w-2 h-4 bg-gradient-to-t from-[#8B4513] via-[#B8860B] to-[#DAA520] shadow-[0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                                      style={{
                                        clipPath:
                                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>

                              {/* 最外层华丽边框 */}
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#B8860B] to-[#8B7355] p-[1px] shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.8)]">
                                {/* 中层紫金装饰环 */}
                                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#9370DB] to-[#B8860B] p-[2px] shadow-[inset_0_6px_12px_rgba(0,0,0,0.7),inset_0_-2px_6px_rgba(255,255,255,0.5)]">
                                  {/* 内层立体金属层 */}
                                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#DAA520] to-[#B8860B] p-[2px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]">
                                    {/* 装饰星形点 */}
                                    <div className="absolute inset-0 rounded-full">
                                      {[...Array(12)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-2 h-2 bg-gradient-to-br from-[#9370DB] to-[#DAA520] shadow-[0_2px_5px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 30
                                            }deg) translateY(-26px)`,
                                            clipPath:
                                              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                                          }}
                                        />
                                      ))}
                                    </div>

                                    {/* 内圈传奇金属表面 */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#DDA0DD] via-[#DAA520] via-[#B8860B] to-[#8B7355] flex items-center justify-center relative overflow-hidden shadow-[inset_0_4px_8px_rgba(255,255,255,0.7),inset_0_-4px_6px_rgba(0,0,0,0.6)]">
                                      {/* 传奇金属光泽系统 */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-transparent to-black/45 rounded-full"></div>
                                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-white/95 to-transparent rounded-full blur-2xl"></div>
                                      <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white/85 to-transparent rounded-full blur-xl"></div>
                                      <div className="absolute bottom-0 right-0 w-12 h-6 bg-black/45 rounded-full blur-2xl"></div>
                                      <div className="absolute bottom-1 right-1 w-8 h-4 bg-black/65 rounded-full blur-xl"></div>
                                      <div className="absolute top-2 right-1 w-6 h-6 bg-white/75 rounded-full blur-lg"></div>
                                      <div className="absolute bottom-2 left-1 w-5 h-5 bg-white/65 rounded-full blur-md"></div>

                                      {/* 超精密同心圆纹理 */}
                                      <div className="absolute inset-0.5 rounded-full border-[1px] border-white/70 shadow-[0_0_6px_rgba(255,255,255,0.7)]"></div>
                                      <div className="absolute inset-1.5 rounded-full border-[0.5px] border-white/60"></div>
                                      <div className="absolute inset-2.5 rounded-full border-[0.5px] border-[#9370DB]/50"></div>
                                      <div className="absolute inset-3.5 rounded-full border-[0.5px] border-white/40"></div>
                                      <div className="absolute inset-4.5 rounded-full border-[0.5px] border-[#B8860B]/50"></div>

                                      {/* 传奇放射状装饰线 */}
                                      {[...Array(32)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-[1px] h-7 bg-gradient-to-b from-transparent via-white/70 to-transparent shadow-[0_0_4px_rgba(255,255,255,1)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 11.25
                                            }deg) translateY(-20px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 传奇紫金装饰点 */}
                                      {[...Array(16)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-1.5 h-1.5 bg-gradient-to-br from-[#DDA0DD]/90 to-[#B8860B]/95 transform rotate-45 shadow-[0_3px_6px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.7)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 22.5
                                            }deg) translateY(-24px) rotate(45deg)`,
                                          }}
                                        />
                                      ))}

                                      {/* 中心传奇图标 - 皇冠 */}
                                      <div className="relative z-10 bg-gradient-to-b from-[#8B7355] to-[#654321] rounded-full p-3 shadow-[0_6px_15px_rgba(0,0,0,1),0_4px_10px_rgba(0,0,0,0.8)] border-2 border-[#B8860B]/80">
                                        <div className="bg-gradient-to-b from-[#B8860B] to-[#8B7355] rounded-full p-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]">
                                          <div className="bg-gradient-to-b from-[#DAA520] to-[#B8860B] rounded-full p-0.5">
                                            <Crown
                                              className="h-4 w-4 text-[#DDA0DD] drop-shadow-[0_5px_10px_rgba(0,0,0,1)] filter brightness-150"
                                              fill="currentColor"
                                              style={{
                                                filter:
                                                  "drop-shadow(0 0 8px rgba(221, 160, 221, 1))",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 ml-4">
                          <h4 className="text-lg font-bold text-[#9370DB]">
                            {t("vip.level4")}
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            {t("vipLevel.seniorMember")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.upgradeConditions")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          {t("vipLevel.cumulativeDonation").replace(
                            "{amount}",
                            getVipLevelDonationAmount(4).toString()
                          )}
                          <span className="text-xs ml-1">USD</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.exclusiveBenefits")}
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#9370DB]" />
                            <span>
                              {t("vipLevel.dailyReliefFund")}:{" "}
                              {getDailyFundRangeForLevel(4)}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#9370DB]" />
                            <span>{t("vipLevel.referralReward")}: 26%</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#9370DB]" />
                            <span>
                              {t("vipLevel.rewardCycle")}:{" "}
                              {getVipLevelPeriod(4)}
                              {t("vipLevel.days")}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#9370DB]" />
                            <span>{t("vipLevel.boardMember")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#9370DB]" />
                            <span>{t("vipLevel.leadershipSelection")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#9370DB]" />
                            <span>{t("vipLevel.premiumManager")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Diamond className="h-3 w-3 text-[#9370DB]" />
                            <span>{t("vipLevel.charityGala")}</span>
                          </li>
                          {getVipLevelNextVoucher(4) > 0 && (
                            <li className="flex items-center space-x-2">
                              <Gift className="h-3 w-3 text-[#d4b96e]" />
                              <span className="text-[#d4b96e]">
                                {t("donation.nextLevelVoucherReward")}{" "}
                                {getVipLevelNextVoucher(4)} USD，升级到
                                {t("vip.level5")}可用
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V5 - 至善等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  {/* 遮罩层 - 当用户VIP等级小于4时显示 */}
                  {currentVipLevel < 4 && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#d4b96e]/20 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[#d4b96e]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-[#d4b96e] mb-1">
                          {t("vipLevel.locked")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/60">
                          {t("vipLevel.unlockCondition")}
                        </p>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#F8F8FF]/20 text-[#F8F8FF] border-[#F8F8FF]/30 flex items-baseline">
                      {getVipLevelDonationAmount(5)}
                      <span className="text-xs ml-1">USD</span>
                    </Badge>

                    <div className="flex items-start mb-4">
                      <div className="flex items-center space-x-8 flex-1">
                        <div className="relative w-16 h-20 flex-shrink-0 ml-2">
                          {/* 徽章容器 */}
                          <div className="absolute inset-x-0 top-0 w-16 h-16">
                            {/* V5 - 至尊钻石铂金系 - 神话级金属质感 */}
                            {/* 多层外部神话光环 */}

                            {/* 徽章主体 - 神话钻石切割设计 */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#654321] to-[#3C2414] p-[1px] shadow-[0_20px_50px_rgba(248,248,255,1),0_12px_30px_rgba(230,230,250,0.95),0_6px_20px_rgba(255,255,255,0.8)]">
                              {/* 外层钻石切割装饰环 */}
                              <div className="absolute inset-0 rounded-full">
                                {[...Array(24)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                      top: "50%",
                                      left: "50%",
                                      transform: `translate(-50%, -50%) rotate(${
                                        i * 15
                                      }deg) translateY(-30px)`,
                                    }}
                                  >
                                    <div
                                      className="w-1.5 h-3 bg-gradient-to-t from-[#E6E6FA] via-[#F8F8FF] to-[#FFFFFF] shadow-[0_3px_8px_rgba(0,0,0,0.9),inset_0_1px_3px_rgba(255,255,255,0.8)]"
                                      style={{
                                        clipPath:
                                          "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>

                              {/* 最外层神话边框 */}
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#F8F8FF] to-[#E6E6FA] p-[1px] shadow-[inset_0_4px_8px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(0,0,0,0.4)]">
                                {/* 中层铂金装饰环 */}
                                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#F8F8FF] p-[2px] shadow-[inset_0_8px_16px_rgba(0,0,0,0.3),inset_0_-3px_8px_rgba(255,255,255,0.9)]">
                                  {/* 内层钻石金属层 */}
                                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#F8F8FF] to-[#E6E6FA] p-[2px] shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)]">
                                    {/* 钻石装饰星座 */}
                                    <div className="absolute inset-0 rounded-full">
                                      {[...Array(16)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-2.5 h-2.5 bg-gradient-to-br from-[#FFFFFF] to-[#E6E6FA] shadow-[0_3px_8px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 22.5
                                            }deg) translateY(-26px)`,
                                            clipPath:
                                              "polygon(50% 0%, 59% 38%, 95% 38%, 65% 62%, 76% 100%, 50% 76%, 24% 100%, 35% 62%, 5% 38%, 41% 38%)",
                                          }}
                                        />
                                      ))}
                                    </div>

                                    {/* 内圈神话金属表面 */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F8F8FF] via-[#E6E6FA] to-[#DDA0DD] flex items-center justify-center relative overflow-hidden shadow-[inset_0_5px_10px_rgba(255,255,255,0.9),inset_0_-5px_8px_rgba(0,0,0,0.3)]">
                                      {/* 神话金属光泽系统 */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-transparent to-black/20 rounded-full"></div>
                                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-white/98 to-transparent rounded-full blur-3xl"></div>
                                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-7 bg-gradient-to-b from-white/95 to-transparent rounded-full blur-2xl"></div>
                                      <div className="absolute bottom-0 right-0 w-10 h-5 bg-black/25 rounded-full blur-2xl"></div>
                                      <div className="absolute bottom-0.5 right-0.5 w-6 h-3 bg-black/35 rounded-full blur-xl"></div>
                                      <div className="absolute top-1.5 right-0.5 w-8 h-8 bg-white/85 rounded-full blur-2xl"></div>
                                      <div className="absolute bottom-1.5 left-0.5 w-7 h-7 bg-white/80 rounded-full blur-xl"></div>

                                      {/* 神话同心圆纹理 */}
                                      <div className="absolute inset-0.5 rounded-full border-[1px] border-white/90 shadow-[0_0_8px_rgba(255,255,255,0.9)]"></div>
                                      <div className="absolute inset-1.5 rounded-full border-[0.5px] border-white/80"></div>
                                      <div className="absolute inset-2.5 rounded-full border-[0.5px] border-[#E6E6FA]/70"></div>
                                      <div className="absolute inset-3.5 rounded-full border-[0.5px] border-white/60"></div>
                                      <div className="absolute inset-4.5 rounded-full border-[0.5px] border-[#F8F8FF]/50"></div>

                                      {/* 神话放射状装饰线 */}
                                      {[...Array(36)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent via-white/90 to-transparent shadow-[0_0_6px_rgba(255,255,255,1)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 10
                                            }deg) translateY(-22px)`,
                                          }}
                                        />
                                      ))}

                                      {/* 神话钻石装饰点 */}
                                      {[...Array(20)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute w-2 h-2 bg-gradient-to-br from-white/95 to-[#E6E6FA]/90 transform rotate-45 shadow-[0_4px_8px_rgba(0,0,0,1),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                                          style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `translate(-50%, -50%) rotate(${
                                              i * 18
                                            }deg) translateY(-24px) rotate(45deg)`,
                                          }}
                                        />
                                      ))}

                                      {/* 中心神话图标 - 钻石 */}
                                      <div className="relative z-10 bg-gradient-to-b from-[#E6E6FA] to-[#DDA0DD] rounded-full p-3.5 shadow-[0_8px_20px_rgba(0,0,0,1),0_5px_15px_rgba(0,0,0,0.9)] border-2 border-[#F8F8FF]/90">
                                        <div className="bg-gradient-to-b from-[#F8F8FF] to-[#E6E6FA] rounded-full p-1.5 shadow-[inset_0_3px_6px_rgba(255,255,255,0.8)]">
                                          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F8F8FF] rounded-full p-0.5">
                                            <Diamond
                                              className="h-3.5 w-3.5 text-[#E6E6FA] drop-shadow-[0_6px_12px_rgba(0,0,0,1)] filter brightness-200"
                                              fill="currentColor"
                                              style={{
                                                filter:
                                                  "drop-shadow(0 0 12px rgba(230, 230, 250, 1))",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 ml-4">
                          <h4 className="text-lg font-bold text-[#F8F8FF]">
                            {t("vip.level5")}
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            {t("vipLevel.eliteMember")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.upgradeConditions")}
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          {t("vipLevel.cumulativeDonation").replace(
                            "{amount}",
                            getVipLevelDonationAmount(5).toString()
                          )}
                          <span className="text-xs ml-1">USD</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          {t("vipLevel.exclusiveBenefits")}
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#F8F8FF]" />
                            <span>
                              {t("vipLevel.dailyReliefFund")}:{" "}
                              {getDailyFundRangeForLevel(5)}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.referralReward")}: 30%</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#F8F8FF]" />
                            <span>
                              {t("vipLevel.rewardCycle")}:{" "}
                              {getVipLevelPeriod(5)}
                              {t("vipLevel.days")}
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.foundingMember")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.globalAmbassador")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.privateAdvisor")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Diamond className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.summitHost")}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Crown className="h-3 w-3 text-[#F8F8FF]" />
                            <span>{t("vipLevel.strategicParticipation")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 等级说明 */}
              <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 mt-6">
                <CardContent className="p-5">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-[#d4b96e] flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-xs text-[#f5efe0]/70">
                      <p className="font-medium text-sm text-[#d4b96e] mb-2">
                        {t("vipLevel.upgradeInstructions")}
                      </p>
                      <p>{t("vipLevel.cumulativeUpgrade")}</p>
                      <p>{t("vipLevel.donationRequirement")}</p>
                      <p>{t("vipLevel.stepByStepUpgrade")}</p>
                      <p>{t("vipLevel.higherBenefits")}</p>

                      <div className="mt-4 pt-3 border-t border-[#d4b96e]/20">
                        <p>{t("vipLevel.vip1Requirement")}</p>
                        <p>{t("vipLevel.vip2Requirement")}</p>
                        <p>{t("vipLevel.vip3Requirement")}</p>
                        <p>{t("vipLevel.vip4Requirement")}</p>
                        <p>{t("vipLevel.vip5Requirement")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedCategory === "ongoing" && (
            <div className="space-y-6">
              {/* 分类标题 */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#d4b96e] mb-2">
                  {t("vipEvents.ongoingProjects")}
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  {t("vipEvents.projectsNeedSupport")}
                </p>
              </div>

              {/* 未完成的项目 - 放在上面 */}
              {ongoingEvents.filter((event) => event.status !== "completed")
                .length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ongoingEvents
                      .filter((event) => event.status !== "completed")
                      .map((event) => (
                        <Card
                          key={event.id}
                          className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden hover:border-[#d4b96e]/40 transition-all duration-300 group"
                        >
                          <CardContent className="p-0">
                            <div className="relative">
                              <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#151515] opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  style={{
                                    objectPosition:
                                      event.id === 8
                                        ? "center 30%"
                                        : "center center",
                                  }}
                                  onError={handleImageError}
                                />
                                <div className="absolute top-2 right-2">
                                  <Badge
                                    className={`
                                  ${
                                    event.urgency === "high"
                                      ? "bg-red-500 animate-pulse"
                                      : event.urgency === "medium"
                                      ? "bg-orange-500"
                                      : "bg-[#d4b96e]"
                                  } 
                                  text-white shadow-lg
                                `}
                                  >
                                    {event.category === "基金释放"
                                      ? t("events.fundRelease")
                                      : event.category}
                                  </Badge>
                                </div>
                                {event.urgency === "high" && (
                                  <div className="absolute top-2 left-2">
                                    <Badge className="bg-red-600 text-white shadow-lg flex items-center space-x-1">
                                      <Zap className="h-3 w-3" />
                                      <span>{t("vipEvents.urgent")}</span>
                                    </Badge>
                                  </div>
                                )}
                              </div>

                              <div className="p-4">
                                <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-6 leading-relaxed">
                                  {event.description}
                                </p>

                                <div className="mb-4">
                                  <div className="flex justify-between text-xs text-[#f5efe0]/60 mb-1">
                                    <span>
                                      {event.status === "fund_release"
                                        ? t("events.releaseProgress")
                                        : t("events.fundraisingProgress")}
                                    </span>
                                    <span className="font-medium text-[#d4b96e]">
                                      {event.progress}%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-[#2a2f3c] rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-300 ${
                                        event.urgency === "high"
                                          ? "bg-gradient-to-r from-red-500 to-red-400"
                                          : "bg-gradient-to-r from-[#d4b96e] to-[#b39339]"
                                      }`}
                                      style={{ width: `${event.progress}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-[#f5efe0]/60 mt-1">
                                    {event.status === "fund_release" ? (
                                      <>
                                        <span>
                                          {t("events.released")}:{" "}
                                          {event.releasedAmount?.toLocaleString() ||
                                            0}
                                          <span className="text-xs ml-1">
                                            USD
                                          </span>
                                        </span>
                                        <span>
                                          {t("events.totalScale")}:{" "}
                                          {event.totalFundAmount?.toLocaleString() ||
                                            0}
                                          <span className="text-xs ml-1">
                                            USD
                                          </span>
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span>
                                          已筹集:{" "}
                                          {event.currentAmount?.toLocaleString() ||
                                            0}
                                          <span className="text-xs ml-1">
                                            USD
                                          </span>
                                        </span>
                                        <span>
                                          {t("events.target")}:{" "}
                                          {event.targetAmount?.toLocaleString() ||
                                            0}
                                          <span className="text-xs ml-1">
                                            USD
                                          </span>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-[#f5efe0]/60">
                                  <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4" />
                                    <span>
                                      {event.status === "fund_release"
                                        ? event.id === 1
                                          ? `${t(
                                              "events.beneficiaryCount"
                                            )}: 11,200`
                                          : event.id === 2
                                          ? `${t(
                                              "events.beneficiaryCount"
                                            )}: 8,950`
                                          : `${t(
                                              "events.beneficiaryCount"
                                            )}: 1,680`
                                        : `${
                                            event.participants?.toLocaleString() ||
                                            0
                                          } ${t("events.participantsCount")}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                      <Heart className="h-4 w-4" />
                                      <span>
                                        {
                                          getDynamicStats(
                                            event.id,
                                            event.likes,
                                            event.views
                                          ).likes
                                        }
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Eye className="h-4 w-4" />
                                      <span>
                                        {
                                          getDynamicStats(
                                            event.id,
                                            event.likes,
                                            event.views
                                          ).views
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* 已完成的项目 - 放在下面 */}
              {ongoingEvents.filter((event) => event.status === "completed")
                .length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ongoingEvents
                      .filter((event) => event.status === "completed")
                      .map((event) => (
                        <Card
                          key={event.id}
                          className="bg-black border-[#d4b96e]/30 overflow-hidden hover:border-[#d4b96e]/50 transition-all duration-300 group relative"
                        >
                          {/* 移除已完成标记 */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4b96e] to-[#b39339]"></div>

                          <CardContent className="p-0">
                            <div className="relative">
                              <div className="relative h-48 overflow-hidden">
                                {/* 已完成项目的全黑遮罩 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#151515] opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale-[30%] brightness-50"
                                  onError={handleImageError}
                                />
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-[#d4b96e] text-black shadow-lg">
                                    {event.category === "基金释放"
                                      ? t("events.fundRelease")
                                      : event.category}
                                  </Badge>
                                </div>
                              </div>

                              <div className="p-4">
                                <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-6 leading-relaxed">
                                  {event.description}
                                </p>

                                <div className="mb-4">
                                  <div className="flex justify-between text-xs text-[#f5efe0]/60 mb-1">
                                    <span>
                                      {t("events.fundraisingProgress")}
                                    </span>
                                    <span className="font-medium text-[#d4b96e]">
                                      {event.progress}%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-[#2a2f3c] rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-[#d4b96e] to-[#b39339]"
                                      style={{ width: `${event.progress}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-[#f5efe0]/60 mt-1">
                                    <span>
                                      总金额:{" "}
                                      <span className="text-[#d4b96e]">
                                        {event.id === 1
                                          ? "1,500,000"
                                          : event.id === 2
                                          ? "1,200,000"
                                          : "18,000"}
                                        <span className="text-xs ml-1">
                                          USD
                                        </span>
                                      </span>
                                    </span>
                                    <span>
                                      {t("events.completionDate")}:{" "}
                                      {event.id === 1
                                        ? "2025-07-15"
                                        : event.id === 2
                                        ? "2025-06-30"
                                        : "2025-07-25"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-[#f5efe0]/60">
                                  <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4 text-[#f5efe0]/60" />
                                    <span className="text-[#f5efe0]/60">
                                      <span className="text-[#d4b96e]">
                                        {event.id === 1
                                          ? "85,000"
                                          : event.id === 2
                                          ? "12,000"
                                          : "6,000"}
                                      </span>
                                      {t("events.participantsCount")}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                      <Heart className="h-4 w-4" />
                                      <span>{event.likes}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Eye className="h-4 w-4" />
                                      <span>{event.views}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedCategory === "overseas" && (
            <div id="overseas-section" className="space-y-6">
              {/* 分类标题 */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#d4b96e] mb-2">
                  {t("overseas.title")}
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  {t("overseas.subtitle")}
                </p>
              </div>

              {/* 海外务工国家列表 */}
              <div className="space-y-4">
                {[
                  "uae",
                  "saudi",
                  "malaysia",
                  "korea",
                  "japan",
                  "germany",
                  "italy",
                  "canada",
                  "china",
                  "australia",
                ]
                  .map((countryKey, index) => {
                    // 直接从翻译中获取国家数据
                    const countryData = (t as any)(
                      `overseas.countries.${countryKey}`,
                      { returnObjects: true }
                    ) as {
                      name: string;
                      salary: string;
                      hours: string;
                      overtime: string;
                      housing: string;
                      religious: string;
                    };

                    const imageMap: { [key: string]: string } = {
                      uae: "/images/overseas/阿联酋.png",
                      saudi: "/images/overseas/沙特.png",
                      malaysia: "/images/overseas/马来西亚.png",
                      korea: "/images/overseas/韩国.png",
                      japan: "/images/overseas/日本.png",
                      germany: "/images/overseas/德国.png",
                      italy: "/images/overseas/意大利.png",
                      canada: "/images/overseas/加拿大.png",
                      china: "/images/overseas/中国.png",
                      australia: "/images/overseas/澳大利亚.png",
                    };

                    return {
                      name: countryData.name,
                      image: imageMap[countryKey],
                      salary: countryData.salary,
                      hours: countryData.hours,
                      overtime: countryData.overtime,
                      housing: countryData.housing,
                      religious: countryData.religious,
                    };
                  })
                  .map((country, index) => (
                    <Card
                      key={index}
                      className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden hover:border-[#d4b96e]/40 transition-all duration-300 group cursor-pointer"
                    >
                      <CardContent className="p-0 relative">
                        {/* 图片作为背景决定卡片尺寸 */}
                        <img
                          src={country.image}
                          alt={country.name}
                          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />

                        {/* 悬浮内容区域 */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-white">
                              {country.name}
                            </h4>
                            <Badge className="bg-[#d4b96e] text-black">
                              {t("overseas.available")}
                            </Badge>
                          </div>

                          <div className="space-y-3 text-sm text-white/90 max-h-96 overflow-y-auto">
                            {/* 待遇信息 */}
                            <div className="bg-black/30 rounded-lg p-3 space-y-2">
                              <div className="text-[#d4b96e] font-semibold mb-2">
                                {t("overseas.salaryTreatment")}
                              </div>
                              <div className="text-xs space-y-1">
                                <div>
                                  <span className="text-[#d4b96e]">
                                    {t("overseas.monthlySalary")}
                                  </span>{" "}
                                  {country.salary}
                                </div>
                                <div>
                                  <span className="text-[#d4b96e]">
                                    {t("overseas.workingHours")}
                                  </span>{" "}
                                  {country.hours}
                                </div>
                                <div>
                                  <span className="text-[#d4b96e]">
                                    {t("overseas.overtime")}
                                  </span>{" "}
                                  {country.overtime}
                                </div>
                              </div>
                            </div>

                            {/* 住宿保险 */}
                            <div className="bg-black/30 rounded-lg p-3 space-y-2">
                              <div className="text-[#d4b96e] font-semibold mb-2">
                                {t("overseas.housingInsurance")}
                              </div>
                              <div className="text-xs space-y-1">
                                <div>{country.housing}</div>
                              </div>
                            </div>

                            {/* 宗教友好 */}
                            <div className="bg-black/30 rounded-lg p-3 space-y-2">
                              <div className="text-[#d4b96e] font-semibold mb-2">
                                {t("overseas.religiousEnvironment")}
                              </div>
                              <div className="text-xs">{country.religious}</div>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            className="bg-[#d4b96e] text-black hover:bg-[#b39339] text-xs px-3 py-1 mt-2"
                            onClick={() => router.push("/customer-service")}
                          >
                            {t("overseas.apply")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
