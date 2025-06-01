"use client"

import { useEffect, useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { MainLayout } from "@/components/main-layout"
import { useNews } from "@/store/use-news"
import { useTranslation } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export default function HomePage() {
  // Get data from store
  const { news, loading, error, fetchHomepageNews, refresh } = useNews()
  const { t, locale, isInitialized } = useTranslation()
  const router = useRouter()
  const lastFetchedLanguage = useRef<string>('')
  
  // 页面加载时获取新闻数据，确保语言正确加载
  useEffect(() => {
    // 确保locale已经正确初始化后再获取新闻
    if (isInitialized && locale && locale !== lastFetchedLanguage.current) {
      lastFetchedLanguage.current = locale
      fetchHomepageNews(locale)
    }
  }, [locale, isInitialized, fetchHomepageNews])
  
  // 处理点击 Donate 按钮
  const handleDonateClick = () => {
    // 使用 URL 查询参数传递打开弹窗的信息
    router.push("/donation?openPayment=true");
  }

  // 处理新闻加载重试
  const handleNewsRetry = () => {
    lastFetchedLanguage.current = '' // 重置以允许重新获取
    refresh()
  }

  return (
    <MainLayout title={t('home.title')} currentPath="/">
      {/* Hero Section with Large Mosque */}
      <HeroSection
        title={t('home.title')}
        buttonText={t('home.donateButton')}
        description={t('home.fullDescription')}
        onButtonClick={handleDonateClick}
      />

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
    </MainLayout>
  )
}
