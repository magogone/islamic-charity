"use client";

import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { NewsSection } from "@/components/news-section";
import { MainLayout } from "@/components/main-layout";
import { FundPromotionModal } from "@/components/fund-promotion-modal";
import { useNews } from "@/store/use-news";
import { useVouchers } from "@/hooks/use-vouchers";
import { useAuth } from "@/store/use-auth";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import {
  debounce,
  prefetchResource,
  PERFORMANCE_CONFIG,
} from "@/lib/performance-config";

export default function HomePage() {
  // Get data from store
  const { news, loading, error, fetchHomepageNews, refresh } = useNews();
  const { totalValue, vouchers } = useVouchers();
  const { isAuthenticated } = useAuth();
  const { t, locale, isInitialized } = useTranslation();
  const router = useRouter();
  const lastFetchedLanguage = useRef<string>("");

  // 弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 页面加载时获取新闻数据，确保语言正确加载
  useEffect(() => {
    // 确保locale已经正确初始化后再获取新闻
    if (isInitialized && locale && locale !== lastFetchedLanguage.current) {
      lastFetchedLanguage.current = locale;
      fetchHomepageNews(locale);
    }
  }, [locale, isInitialized, fetchHomepageNews]);

  // 处理点击 Donate 按钮
  const handleDonateClick = () => {
    // 使用 URL 查询参数传递打开弹窗的信息
    router.push("/donation?openPayment=true");
  };

  // 处理新闻加载重试
  const handleNewsRetry = () => {
    lastFetchedLanguage.current = ""; // 重置以允许重新获取
    refresh();
  };

  // 弹窗相关处理函数
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 优化：使用防抖来防止快速点击
  const handlePurchase = debounce(() => {
    // 优化：立即关闭弹窗以提升响应速度
    setIsModalOpen(false);

    // 先知诞辰活动固定金额购买逻辑
    // 使用 replace 而不是 push 来避免浏览器历史记录问题
    router.replace(
      "/donation?openPayment=true&type=prophet_birthday&amount=20&skipVipPrompt=true"
    );
  }, PERFORMANCE_CONFIG.DEBOUNCE.BUTTON_CLICK);

  // 页面加载后立即显示弹窗
  useEffect(() => {
    // 使用 requestAnimationFrame 确保页面DOM已准备就绪后立即显示
    requestAnimationFrame(() => {
      setIsModalOpen(true);
    });
  }, []);

  // 优化：预加载donation页面资源
  useEffect(() => {
    if (PERFORMANCE_CONFIG.PRELOAD.DONATION_PAGE) {
      // 页面加载2秒后开始预加载，避免影响首页性能
      const preloadTimer = setTimeout(() => {
        prefetchResource("/donation");
      }, 2000);

      return () => clearTimeout(preloadTimer);
    }
  }, []);

  return (
    <MainLayout title={t("home.title")} currentPath="/" showDonorCount={true}>
      {/* Hero Section with Large Mosque */}
      <HeroSection
        title={t("home.title")}
        buttonText={t("home.donateButton")}
        description={t("home.fullDescription")}
        onButtonClick={handleDonateClick}
      />

      {/* 回馈券状态条 - 仅登录用户显示 */}
      {isAuthenticated && totalValue > 0 && (
        <div className="mb-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-islamic-cream">
                您有 {vouchers.filter((v) => v.status === "active").length}{" "}
                张可用回馈券
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 font-bold">${totalValue}</span>
              <button
                onClick={() => router.push("/profile")}
                className="text-xs px-2 py-1 bg-purple-400/20 text-purple-400 rounded hover:bg-purple-400/30 transition-colors"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News section */}
      <div>
        <NewsSection
          news={news}
          className="mb-6"
          isLoading={loading}
          error={error}
          onRetry={handleNewsRetry}
        />
      </div>

      {/* 基金推广弹窗 */}
      <FundPromotionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPurchase={handlePurchase}
      />
    </MainLayout>
  );
}
