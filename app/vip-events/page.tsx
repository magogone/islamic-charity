"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  X,
  ChevronRight,
  Target,
  Clock,
} from "lucide-react";

// 定义类型
type CategoryType = "member" | "alliance" | "level" | "ongoing";

// 模拟数据
const memberEvents = [
  {
    id: 1,
    title: "为巴勒斯坦儿童捐赠冬衣活动",
    description:
      "您参与了本次为巴勒斯坦儿童捐赠冬衣的活动，已成功帮助200多名儿童度过寒冬。感谢您的慷慨捐助！",
    image:
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600&q=80",
    date: "2024-12-15",
    location: "巴勒斯坦",
    type: "member",
    category: "已参与",
    isVideo: false,
    likes: 328,
    views: 2520,
    status: "completed",
    donationAmount: 500,
  },
  {
    id: 2,
    title: "叙利亚难民紧急援助计划",
    description:
      "您正在参与为叙利亚难民提供紧急食品和医疗援助的活动。目前已筹集80%所需资金，感谢您的持续支持。",
    image:
      "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=600&q=80",
    date: "进行中",
    location: "叙利亚边境",
    type: "member",
    category: "正在参与",
    isVideo: true,
    videoUrl: "https://example.com/syria-aid-video.mp4",
    likes: 456,
    views: 3100,
    status: "ongoing",
    progress: 80,
  },
  {
    id: 3,
    title: "斋月食品包发放活动",
    description:
      "您参与了斋月期间为贫困家庭发放食品包的活动，成功帮助了150个家庭。愿真主回赐您的善举。",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    date: "2024-03-20",
    location: "多个国家",
    type: "member",
    category: "已完成",
    isVideo: false,
    likes: 267,
    views: 1890,
    status: "completed",
    donationAmount: 300,
  },
];

const allianceEvents = [
  {
    id: 4,
    title: "全球穆斯林慈善联盟年度大会",
    description:
      "即将举办的年度慈善大会，将邀请全球知名慈善组织代表参与，共同探讨2025年慈善计划。VIP会员优先报名参与。",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    date: "2025-02-15",
    location: "迪拜",
    type: "alliance",
    category: "即将举办",
    isVideo: false,
    likes: 856,
    views: 5100,
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: 5,
    title: "跨国慈善组织联合救援行动",
    description:
      "与国际红新月会、伊斯兰救援组织等联合开展的大型救援行动，为受灾地区提供紧急援助。",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    date: "进行中",
    location: "多个受灾地区",
    type: "alliance",
    category: "联合行动",
    isVideo: true,
    videoUrl: "https://example.com/joint-relief.mp4",
    likes: 567,
    views: 4340,
    status: "ongoing",
    participants: 15,
  },
  {
    id: 6,
    title: "慈善透明化区块链技术研讨会",
    description:
      "已成功举办的技术研讨会，探讨如何利用区块链技术提升慈善捐赠的透明度和可追溯性。",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    date: "2024-11-20",
    location: "线上",
    type: "alliance",
    category: "已完成",
    isVideo: false,
    likes: 234,
    views: 1890,
    status: "completed",
  },
];

const ongoingEvents = [
  {
    id: 7,
    title: "加沙地区紧急医疗援助",
    description:
      "为加沙地区医院提供紧急医疗物资和设备，目前急需您的支持。每一份捐赠都能拯救生命。",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    date: "紧急进行中",
    progress: 65,
    location: "加沙",
    type: "ongoing",
    category: "紧急援助",
    targetAmount: 500000,
    currentAmount: 325000,
    participants: 3200,
    likes: 1203,
    views: 8670,
    urgency: "high",
  },
  {
    id: 8,
    title: "孤儿教育资助计划",
    description:
      "长期资助孤儿接受教育，让他们有机会改变命运。目前已资助500名孤儿，目标1000名。",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80",
    date: "长期项目",
    progress: 50,
    location: "多个国家",
    type: "ongoing",
    category: "教育资助",
    targetAmount: 1000000,
    currentAmount: 500000,
    participants: 5500,
    likes: 2145,
    views: 12980,
    urgency: "medium",
  },
  {
    id: 9,
    title: "清真寺水井建设项目",
    description:
      "在缺水地区建设水井，为当地穆斯林社区提供清洁饮用水。一口水井可服务整个村庄。",
    image:
      "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=600&q=80",
    date: "进行中",
    progress: 40,
    location: "非洲",
    type: "ongoing",
    category: "基础设施",
    targetAmount: 200000,
    currentAmount: 80000,
    participants: 1800,
    likes: 945,
    views: 5680,
    urgency: "normal",
  },
];

export default function VipEventsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("member");

  // 模拟用户数据
  const userData = {
    username: "艾哈迈德",
    vipLevel: 4,
    currentDonation: 800,
    nextLevelAmount: 1000,
    upgradeProgress: 80,
    nextLevelName: "至善",
  };

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
      <span class="text-xs text-[#d4b96e]">加载中...</span>
    </div>`;
  };

  return (
    <MainLayout title="VIP会员专区" currentPath="/vip-events">
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
        {/* VIP会员卡片 */}
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
                {/* 左侧 - V4徽章 */}
                <div className="flex-shrink-0 ml-2">
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
                </div>

                {/* 右侧 - 用户信息和数据 */}
                <div className="flex-1 min-w-0">
                  {/* 用户名 */}
                  <div className="text-lg font-bold text-[#d4b96e] mb-3">
                    {userData.username}
                  </div>

                  {/* 数据展示 */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* 已捐赠 */}
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-[#d4b96e]/10 flex items-center justify-center">
                        <Heart className="h-3.5 w-3.5 text-[#d4b96e]" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#d4b96e]">
                          {userData.currentDonation}U
                        </div>
                        <div className="text-xs text-[#f5efe0]/60">已捐赠</div>
                      </div>
                    </div>

                    {/* 可提取 */}
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-green-400">
                          60U
                        </div>
                        <div className="text-xs text-[#f5efe0]/60">可提取</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部进度条 */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center text-xs">
                    <span className="text-[#f5efe0]/60">升级进度</span>
                    <span className="text-[#d4b96e] ml-2">
                      {userData.upgradeProgress}%
                    </span>
                  </div>
                </div>
                <div className="relative h-1.5 bg-[#2a2f3c] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#d4b96e] to-[#b39339] rounded-full transition-all duration-300"
                    style={{ width: `${userData.upgradeProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* 升级按钮 */}
              <div className="mt-3">
                <Button className="w-full bg-gradient-to-r from-[#d4b96e] to-[#b39339] text-[#1a1f2c] hover:opacity-90 transition-opacity py-1.5">
                  一键升级至V5
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab导航区域 */}
        <div>
          {/* 水平标签组 */}
          <div className="border-b border-[#d4b96e]/20">
            <div className="grid grid-cols-4 w-full">
              {[
                { key: "member" as CategoryType, label: "会员", Icon: Crown },
                { key: "alliance" as CategoryType, label: "联盟", Icon: Heart },
                { key: "level" as CategoryType, label: "等级", Icon: Trophy },
                { key: "ongoing" as CategoryType, label: "进行", Icon: Clock },
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
                  我的慈善足迹
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  查看您参与过的所有慈善活动
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
                                event.status === "completed"
                                  ? "bg-green-500"
                                  : event.status === "ongoing"
                                  ? "bg-[#d4b96e]"
                                  : "bg-blue-500"
                              } 
                              text-[#0a0a0f] shadow-lg
                            `}
                            >
                              {event.category}
                            </Badge>
                          </div>
                          {event.progress && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <div className="h-1 bg-[#2a2f3c]/80 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#d4b96e] to-[#b39339] rounded-full"
                                  style={{ width: `${event.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-[#d4b96e] mt-1 text-center">
                                {event.progress}% 完成
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                            {event.title}
                          </h4>
                          <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          {event.donationAmount && (
                            <div className="flex items-center space-x-2 mb-3">
                              <Heart className="h-4 w-4 text-[#d4b96e]" />
                              <span className="text-sm font-medium text-[#d4b96e]">
                                您的捐赠: {event.donationAmount}U
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs text-[#f5efe0]/60">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
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
                  联盟慈善活动
                </h3>
                <p className="text-sm text-[#f5efe0]/70">
                  基金会联合举办的大型慈善活动
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
                                  : "bg-green-500"
                              } 
                              text-white shadow-lg
                            `}
                            >
                              {event.category}
                            </Badge>
                          </div>
                          {event.registrationOpen && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-red-500 text-white shadow-lg animate-pulse">
                                开放报名
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                            {event.title}
                          </h4>
                          <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          {event.participants && (
                            <div className="flex items-center space-x-2 mb-3">
                              <Users className="h-4 w-4 text-[#d4b96e]" />
                              <span className="text-sm text-[#d4b96e]">
                                {event.participants} 个组织参与
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

          {selectedCategory === "level" && (
            <div className="space-y-6 px-4">
              {/* 等级说明标题 */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#d4b96e] mb-2">
                  VIP等级体系
                </h3>
                <p className="text-sm text-[#f5efe0]/80">
                  通过慈善捐赠提升等级，享受更多权益
                </p>
              </div>

              {/* 等级卡片列表 */}
              <div className="space-y-4">
                {/* V1 - 布拉克等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#D2691E]/20 text-[#D2691E] border-[#D2691E]/30">
                      100U
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
                            布拉克
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            入门级会员
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          升级条件
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          累计捐赠达到100U
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          专属权益
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#D2691E]" />
                            <span>每日救济基金：1.2-3U</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#D2691E]" />
                            <span>推荐奖励：10%（一代）</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#D2691E]" />
                            <span>收益周期：50天</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V2 - 巴达尔等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/30">
                      300U
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
                            巴达尔
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            进阶级会员
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          升级条件
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          累计捐赠达到300U
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          专属权益
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#CD7F32]" />
                            <span>每日救济基金：3.6-9U</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#CD7F32]" />
                            <span>推荐奖励：10%（一代）+ 4%（二代）</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#CD7F32]" />
                            <span>收益周期：50天</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V3 - 蒙塔哈等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                      500U
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
                            蒙塔哈
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">高级会员</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          升级条件
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          累计捐赠达到1000U
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          专属权益
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#E6E6FA]" />
                            <span>每日救济基金：14.4-36U</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#E6E6FA]" />
                            <span>
                              推荐奖励：15%（一代）+ 6%（二代）+ 3%（三至五代）
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#E6E6FA]" />
                            <span>收益周期：50天</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#E6E6FA]" />
                            <span>基金会荣誉贡献者身份</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#E6E6FA]" />
                            <span>年度慈善大使评选资格</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#E6E6FA]" />
                            <span>专属一对一客户经理</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V4 - 米尔贾等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30">
                      800U
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
                            米尔贾
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            传奇级会员
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          升级条件
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          累计捐赠达到800U
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          专属权益
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#9370DB]" />
                            <span>每日救济基金：24-60U</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#9370DB]" />
                            <span>
                              推荐奖励：20%（一代）+ 8%（二代）+ 5%（三至五代）+
                              2%（六至十代）
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#9370DB]" />
                            <span>收益周期：50天</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#9370DB]" />
                            <span>基金会董事会荣誉成员</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#9370DB]" />
                            <span>年度慈善领袖评选资格</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#9370DB]" />
                            <span>24小时专属高级客户经理</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Diamond className="h-3 w-3 text-[#9370DB]" />
                            <span>优先参与高端慈善晚宴</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* V5 - 至善等级 */}
                <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#151515] border-[#d4b96e]/20 overflow-hidden relative">
                  <CardContent className="p-6">
                    {/* 右上角金额 */}
                    <Badge className="absolute top-4 right-4 bg-[#F8F8FF]/20 text-[#F8F8FF] border-[#F8F8FF]/30">
                      1500U
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
                            至善
                          </h4>
                          <p className="text-xs text-[#f5efe0]/60">
                            神话级会员
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ml-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          升级条件
                        </p>
                        <p className="text-xs text-[#f5efe0]/70">
                          累计捐赠达到1500U
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#f5efe0] mb-1">
                          专属权益
                        </p>
                        <ul className="space-y-1 text-xs text-[#f5efe0]/70">
                          <li className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3 text-[#F8F8FF]" />
                            <span>每日救济基金：45-120U</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-[#F8F8FF]" />
                            <span>
                              推荐奖励：25%（一代）+ 12%（二代）+
                              8%（三至五代）+ 5%（六至十代）+ 2%（无限代）
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-[#F8F8FF]" />
                            <span>收益周期：50天</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Trophy className="h-3 w-3 text-[#F8F8FF]" />
                            <span>基金会创始人委员会成员</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#F8F8FF]" />
                            <span>全球慈善大使终身荣誉</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-[#F8F8FF]" />
                            <span>专属私人慈善顾问团队</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Diamond className="h-3 w-3 text-[#F8F8FF]" />
                            <span>年度全球慈善峰会主办权</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Crown className="h-3 w-3 text-[#F8F8FF]" />
                            <span>基金会战略决策参与权</span>
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
                        等级升级说明
                      </p>
                      <p>
                        • 等级升级为累计制，一旦达到升级条件即可永久享受对应权益
                      </p>
                      <p>
                        • 每日救济基金根据您的推荐人数动态调整，推荐越多收益越高
                      </p>
                      <p>• 推荐奖励需要您保持活跃捐赠状态才能获得</p>
                      <p>• 高等级会员享有更多专属活动和优先参与权</p>
                      <p>• 所有收益均可随时提现，无任何限制</p>
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
                  正在进行的项目
                </h3>
                <p className="text-sm text-[#f5efe0]/70">急需您的支持与参与</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ongoingEvents.map((event) => (
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
                              {event.category}
                            </Badge>
                          </div>
                          {event.urgency === "high" && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-red-600 text-white shadow-lg flex items-center space-x-1">
                                <Zap className="h-3 w-3" />
                                <span>紧急</span>
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h4 className="text-lg font-bold text-[#d4b96e] mb-2">
                            {event.title}
                          </h4>
                          <p className="text-sm text-[#f5efe0]/80 mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-[#f5efe0]/60 mb-1">
                              <span>募集进度</span>
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
                              <span>
                                已筹: {event.currentAmount.toLocaleString()}U
                              </span>
                              <span>
                                目标: {event.targetAmount.toLocaleString()}U
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-[#f5efe0]/60">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {event.participants.toLocaleString()}人参与
                              </span>
                            </div>
                            <Button className="h-7 px-3 bg-gradient-to-r from-[#d4b96e] to-[#b39339] text-[#0a0a0f] hover:opacity-90 text-xs">
                              立即参与
                            </Button>
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
      </div>
    </MainLayout>
  );
}
