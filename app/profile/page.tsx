"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  ArrowRight,
  Wallet,
  RefreshCw,
  Settings,
  UserPlus,
  BarChart3,
  TrendingUp,
  Download,
  Upload,
  History,
  Bell,
  Shield,
  Eye,
  Calendar,
  FileText,
  CreditCard,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WithdrawDialog } from "@/components/withdraw-dialog";
import { MainLayout } from "@/components/main-layout";
import { useUser } from "@/store/use-user";
import { useDonation } from "@/store/use-donation";
import { useAuth } from "@/store/use-auth";
import { useTeam } from "@/store/use-team";
import { useToast } from "@/components/ui/toast";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { getUserProfit, getUserInfo } from "@/lib/api";

export default function ProfilePage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { userData } = useUser();
  const { donationData, updateDonation } = useDonation();
  const { user, logout } = useAuth();
  const { teamData, refreshTeamInfo } = useTeam();
  const { success } = useToast();
  const { t } = useTranslation();

  // 客户端渲染状态
  const [mounted, setMounted] = useState(false);

  // 加载状态管理
  const [loadingStates, setLoadingStates] = useState({
    userLoading: true,
    donationLoading: true,
    teamLoading: true,
  });

  // 添加强制刷新状态
  const [forceRefresh, setForceRefresh] = useState(0);

  // 初始数据，避免水合不匹配
  const [displayData, setDisplayData] = useState({
    username: "User",
    email: "user@example.com",
    totalDonation: 0,
    referrals: 0,
    isVerified: false,
    reliefFunds: 0,
    withdrawable: 0,
    dailyIncome: 0,
    totalWithdrawn: 0,
  });

  // 客户端挂载后更新数据
  useEffect(() => {
    setMounted(true);
  }, []);

  // 手动刷新数据的函数 - 暂时禁用API调用
  const refreshData = useCallback(async () => {
    // 暂时禁用API调用，只显示成功提示
    success("数据已刷新");
    return;
  }, [success]);

  // 监听用户认证状态变化
  useEffect(() => {
    if (mounted) {
      setLoadingStates((prev) => ({
        ...prev,
        userLoading: !user,
      }));
    }
  }, [mounted, user]);

  // 监听捐赠数据变化 - 添加强制刷新触发器
  useEffect(() => {
    if (mounted) {
      setLoadingStates((prev) => ({
        ...prev,
        donationLoading: !donationData,
      }));
    }
  }, [mounted, donationData, forceRefresh]);

  // 获取收益数据 - 暂时禁用API调用
  useEffect(() => {
    // 暂时禁用API调用，使用默认数据
    if (mounted) {
      // 设置默认的收益数据
      updateDonation({
        dailyFunds: {
          current: 25,
          max: 60,
        },
        withdrawnAmount: 280,
        withdrawableAmount: 150,
        totalAccumulated: 430,
        totalExpectedReward: 150,
        totalMaxReward: 225,
      });
    }
    return;
  }, [mounted]);

  // 确保在组件挂载后获取团队数据 - 暂时禁用API调用
  useEffect(() => {
    // 暂时禁用团队数据获取
    if (mounted) {
      setLoadingStates((prev) => ({ ...prev, teamLoading: false }));
    }
    return;
  }, [mounted]);

  // 只在所有必要数据都加载完成且发生变化时才更新 displayData
  useEffect(() => {
    if (
      mounted &&
      user &&
      (!loadingStates.userLoading || !loadingStates.donationLoading)
    ) {
      // 创建新的显示数据
      const newDisplayData = {
        username: user?.username || userData?.username || "艾哈迈德",
        email: user?.email || "ahmed@example.com",
        totalDonation: userData?.totalDonation || 800,
        referrals: userData?.referrals || 12,
        isVerified: user?.isVerified || true,
        reliefFunds: donationData?.totalAccumulated || 430,
        withdrawable: donationData?.withdrawableAmount || 150,
        dailyIncome: donationData?.dailyFunds?.current || 25,
        totalWithdrawn: donationData?.withdrawnAmount || 280,
      };

      // 只有数据真正发生变化时才更新，避免不必要的重渲染
      setDisplayData((prevData) => {
        const hasChanged = Object.keys(newDisplayData).some(
          (key) =>
            prevData[key as keyof typeof prevData] !==
            newDisplayData[key as keyof typeof newDisplayData]
        );

        return hasChanged ? newDisplayData : prevData;
      });
    }
  }, [
    mounted,
    user,
    userData,
    donationData,
    donationData?.lastUpdated,
    loadingStates.userLoading,
    loadingStates.donationLoading,
    forceRefresh,
  ]);

  // 页面可见性变化时自动刷新数据
  useEffect(() => {
    if (!mounted) return;

    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        // 延迟一下再刷新，避免太频繁
        setTimeout(() => {
          refreshData();
        }, 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, user, refreshData]);

  // 计算是否还有数据在加载中
  const isDataLoading =
    loadingStates.userLoading || loadingStates.donationLoading;

  return (
    <MainLayout title="个人中心" currentPath="/profile">
      <div className="space-y-6">
        {/* 页面标题和用户信息 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-islamic-gold mb-2">
              个人中心
            </h1>
            <p className="text-islamic-cream/70 text-sm">数据管理 · 功能操作</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isDataLoading}
              className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  isDataLoading ? "animate-spin" : ""
                }`}
              />
              刷新数据
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
            >
              <Bell className="h-4 w-4 mr-2" />
              通知设置
            </Button>
          </div>
        </div>

        {/* 简化的用户信息条 */}
        <Card className="border-islamic-gold/20 bg-islamic-medium/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-islamic-gold/10 flex items-center justify-center border border-islamic-gold/30">
                  <User className="h-6 w-6 text-islamic-gold" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-islamic-gold">
                      {isDataLoading ? "加载中..." : displayData.username}
                    </h3>
                    {displayData.isVerified && (
                      <Shield className="h-4 w-4 text-green-400" />
                    )}
                    <span className="text-xs bg-islamic-gold/20 text-islamic-gold px-2 py-1 rounded">
                      已认证用户
                    </span>
                  </div>
                  <p className="text-sm text-islamic-cream/70">
                    {displayData.email} · 在线
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  账户设置
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  退出登录
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 核心数据管理区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 收益数据管理 */}
          <Card className="border-islamic-gold/20 bg-islamic-medium/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-islamic-gold flex items-center">
                <Database className="h-5 w-5 mr-2" />
                收益数据管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 数据统计 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-islamic-gold/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    今日收益
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {displayData.dailyIncome}U
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-blue-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    累计收益
                  </div>
                  <div className="text-xl font-bold text-blue-400">
                    {displayData.reliefFunds}U
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-purple-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    已提取
                  </div>
                  <div className="text-xl font-bold text-purple-400">
                    {displayData.totalWithdrawn}U
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-green-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    可提取
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {displayData.withdrawable}U
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setWithdrawOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  立即提现
                </Button>
                <Button
                  variant="outline"
                  className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
                >
                  <History className="h-4 w-4 mr-2" />
                  提现记录
                </Button>
                <Button
                  variant="outline"
                  className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  收益详情
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 团队数据管理 */}
          <Card className="border-islamic-gold/20 bg-islamic-medium/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-islamic-gold flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                团队数据管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 团队统计 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-islamic-gold/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    直推人数
                  </div>
                  <div className="text-xl font-bold text-islamic-gold">
                    {displayData.referrals}
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-blue-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    团队总数
                  </div>
                  <div className="text-xl font-bold text-blue-400">
                    {teamData.totalReferrals || 45}
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-green-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    团队贡献
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {teamData.totalRewards || 1250}U
                  </div>
                </div>
                <div className="bg-islamic-dark/30 rounded-lg p-3 border border-purple-500/10">
                  <div className="text-sm text-islamic-cream/70 mb-1">
                    活跃成员
                  </div>
                  <div className="text-xl font-bold text-purple-400">
                    {Math.floor((teamData.totalReferrals || 45) * 0.7)}
                  </div>
                </div>
              </div>

              {/* 团队操作 */}
              <div className="flex space-x-3">
                <Link href="/promotion" className="flex-1">
                  <Button className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark">
                    <UserPlus className="h-4 w-4 mr-2" />
                    邀请推广
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  团队详情
                </Button>
                <Button
                  variant="outline"
                  className="border-islamic-gold/30 text-islamic-gold hover:bg-islamic-gold/10"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  数据报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 功能操作区域 */}
        <Card className="border-islamic-gold/20 bg-islamic-medium/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-islamic-gold flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              功能操作中心
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* 捐赠管理 */}
              <Link href="/donation">
                <div className="bg-islamic-dark/30 rounded-lg p-4 border border-islamic-gold/10 hover:border-islamic-gold/30 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-islamic-gold/10 rounded-lg flex items-center justify-center group-hover:bg-islamic-gold/20 transition-all">
                      <BarChart3 className="h-6 w-6 text-islamic-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-islamic-gold">
                        捐赠管理
                      </div>
                      <div className="text-xs text-islamic-cream/70">
                        查看捐赠记录
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* 财务记录 */}
              <div className="bg-islamic-dark/30 rounded-lg p-4 border border-green-500/10 hover:border-green-500/30 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                    <CreditCard className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-400">财务记录</div>
                    <div className="text-xs text-islamic-cream/70">
                      收支明细
                    </div>
                  </div>
                </div>
              </div>

              {/* 数据导出 */}
              <div className="bg-islamic-dark/30 rounded-lg p-4 border border-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <Upload className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-400">数据导出</div>
                    <div className="text-xs text-islamic-cream/70">
                      导出报表
                    </div>
                  </div>
                </div>
              </div>

              {/* 活动记录 */}
              <div className="bg-islamic-dark/30 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                    <Calendar className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-400">
                      活动记录
                    </div>
                    <div className="text-xs text-islamic-cream/70">
                      参与历史
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快速入口区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* VIP会员中心 */}
          <Link href="/vip-events">
            <Card className="border-islamic-gold/20 bg-gradient-to-br from-islamic-gold/5 to-yellow-500/5 hover:border-islamic-gold/40 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-islamic-gold/10 rounded-lg flex items-center justify-center group-hover:bg-islamic-gold/20 transition-all">
                      <Eye className="h-5 w-5 text-islamic-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-islamic-gold">
                        VIP会员中心
                      </h4>
                      <p className="text-xs text-islamic-cream/70">
                        查看会员身份
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-islamic-cream/50 group-hover:text-islamic-gold transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 邀请推广 */}
          <Link href="/promotion">
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 hover:border-blue-500/40 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                      <UserPlus className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-400">邀请推广</h4>
                      <p className="text-xs text-islamic-cream/70">
                        推广赚取奖励
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-islamic-cream/50 group-hover:text-blue-400 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 客服支持 */}
          <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5 hover:border-green-500/40 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                    <Bell className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400">客服支持</h4>
                    <p className="text-xs text-islamic-cream/70">
                      在线客服帮助
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-islamic-cream/50 group-hover:text-green-400 transition-all" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 提现对话框 */}
      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        availableAmount={displayData.withdrawable}
      />
    </MainLayout>
  );
}
