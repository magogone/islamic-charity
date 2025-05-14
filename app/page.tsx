"use client"

import { HeroSection } from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { MainLayout } from "@/components/main-layout"
import { useNews } from "@/store/use-news"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HomePage() {
  // Get data from store
  const { news } = useNews()
  const router = useRouter()
  
  // 处理点击 Donate 按钮
  const handleDonateClick = () => {
    // 使用 URL 查询参数传递打开弹窗的信息
    router.push("/donation?openPayment=true");
  }

  return (
    <MainLayout title="Barkat Alliance Foundation" currentPath="/">
      {/* Hero Section with Large Mosque */}
      <HeroSection
        buttonText="Donate Now"
        description="Innovative Charity Model: Divine Mission - Participate in poverty relief through donations"
        onButtonClick={handleDonateClick}
      />

      {/* News section */}
      <div>
      <NewsSection news={news} className="mb-6" />
      </div>
    </MainLayout>
  )
}
