"use client"
import Link from "next/link"
import { Home, Gift, Share2, User } from "lucide-react"

import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { EventCard } from "@/components/event-card"
import { HeroSection } from "@/components/hero-section"
import { DonationOverview } from "@/components/donation-overview"
import { InvitationCard } from "@/components/invitation-card"
import { NewsAnnouncementsSection } from "@/components/news-announcements-section"

// 定义静态图片路径
const IMAGES = {
  donation1: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop",
  donation2: "https://images.unsplash.com/photo-1593113598332-cd59a93f9dd4?q=80&w=600&auto=format&fit=crop",
  donation3: "https://images.unsplash.com/photo-1469571486292-b53601010b89?q=80&w=600&auto=format&fit=crop",
  donation4: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
  donation5: "https://images.unsplash.com/photo-1526493665986-edbdfea0c91c?q=80&w=600&auto=format&fit=crop",
  event1: "https://images.unsplash.com/photo-1541947411-d6d57531d816?q=80&w=600&auto=format&fit=crop",
  event2: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=600&auto=format&fit=crop",
  event3: "https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=600&auto=format&fit=crop",
  event4: "https://images.unsplash.com/photo-1566624790190-511a09f6ddbd?q=80&w=600&auto=format&fit=crop",
  knowledge1: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
  knowledge2: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop",
  knowledge3: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop",
  knowledge4: "https://images.unsplash.com/photo-1580982327559-c1202864eb05?q=80&w=600&auto=format&fit=crop",
}

// 在 IMAGES 常量之后添加新闻和公告数据
const NEWS_ANNOUNCEMENTS = {
  news: [
    {
      id: "news1",
      title: "巴卡特基金会启动新的扶贫项目",
      content:
        "巴卡特基金会宣布启动新的扶贫项目，旨在帮助更多贫困地区的穆斯林家庭。该项目将提供教育、医疗和生活必需品支持。",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-15",
      isNew: true,
      type: "news",
    },
    {
      id: "news2",
      title: "基金会与国际慈善组织达成合作",
      content: "巴卡特基金会与多个国际慈善组织达成战略合作，共同推进全球穆斯林社区的扶贫工作，扩大慈善影响力。",
      imageUrl: "https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-10",
      type: "news",
    },
    {
      id: "news3",
      title: "年度慈善报告发布",
      content: "巴卡特基金会发布2023年度慈善报告，详细介绍了过去一年的慈善成果、资金使用情况和未来规划。",
      imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-05",
      type: "news",
    },
  ],
  announcements: [
    {
      id: "announcement1",
      title: "重要通知：捐赠奖励制度更新",
      content: "从2023年5月1日起，我们的捐赠奖励制度将进行更新，VIP会员的推荐奖励比例将提高，详情请查看公告。",
      imageUrl: "https://images.unsplash.com/photo-1579621970590-9d624316904b?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-20",
      isImportant: true,
      type: "announcement",
    },
    {
      id: "announcement2",
      title: "系统维护通知",
      content: "为提升用户体验，系统将于2023年4月25日凌晨2:00-4:00进行维护升级，期间可能无法访问。",
      imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-18",
      type: "announcement",
    },
    {
      id: "announcement3",
      title: "新功能上线：慈善项目直接捐赠",
      content: "我们新增了慈善项目直接捐赠功能，用户现在可以选择特定的慈善项目进行定向捐赠，更好地实现慈善意愿。",
      imageUrl: "https://images.unsplash.com/photo-1607000975631-e05b9830fbea?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-12",
      isNew: true,
      type: "announcement",
    },
  ],
}

// VIP等级配置
const VIP_CONFIG = [
  { level: 1, requirement: 100, dailyFund: "1.2-3 U" },
  { level: 2, requirement: 300, dailyFund: "3.6-9 U" },
  { level: 3, requirement: 500, dailyFund: "6-15 U" },
  { level: 4, requirement: 800, dailyFund: "9.6-24 U" },
  { level: 5, requirement: 1200, dailyFund: "14.4-36 U" },
]

export default function HomePage() {
  // 捐赠数据
  const donationData = {
    totalDonation: 100,
    vipLevel: 1,
    dailyFunds: {
      current: 3,
      max: 6,
    },
    referrals: 2,
    periodProgress: 65,
    startDate: "2023-04-01",
    remainingDays: 14,
    endDate: "2023-05-10",
    currentRate: 2,
    totalAccumulated: 120,
  }

  // 邀请数据
  const invitationData = {
    totalReferrals: 5,
    directReferrals: 2,
    indirectReferrals: 3,
    totalRewards: 15,
    rewardRate: {
      level1: 10,
      level2: 4,
      level3to5: 2,
    },
    basicReward: {
      current: 1.5,
      max: 2.5,
    },
    maxReferralReward: {
      level1: 15,
      level2: 6,
      level3to5: 3,
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-islamic-dark/90 text-white">
      {/* Hero Section with Large Mosque */}
      <HeroSection
        buttonText="立即捐赠"
        description="创新慈善模式：真主使命 - 通过捐赠参与扶贫事业"
        onButtonClick={() => console.log("开始捐赠")}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20 mt-6">
        <div className="max-w-lg mx-auto">
          {/* 关于我们 - 跑马灯模式 */}
          <HorizontalScrollSection title="关于我们" subtitle="了解巴卡特基金的慈善理念" carouselMode={true}>
            <EventCard
              imageUrl={IMAGES.knowledge1}
              title="参与与收益"
              description={
                '我们倡导"先奉献，后受益"的理念。贫困人口需通过捐赠以获得扶贫资格，鼓励他人积极参与慈善活动，实现自我脱贫，助他人脱贫。'
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge2}
              title="捐赠者的福利"
              description={
                "邀请奖励：为推动扶贫事业，邀请他人捐赠可获得15%的直接邀请奖励。建立自己的慈善社群，还能获得基金会更多扶贫基金支持。扶贫资金：个人捐赠后，可根据个人捐赠额度的比例获得扶贫资金支持。"
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge3}
              title="持续支持"
              description={
                "通过瓦克夫制度，我们提供持续的扶贫支持，激励参与者为全球伊斯兰教贫困人口创造一个更美好的未来，为伊斯兰教慈善事业做贡献，加入我们，一起实现改变！"
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge4}
              title="基金安排"
              description={"所有所得资金将于实现自我脱贫或助于他人脱贫及社会善事。"}
              className="snap-center"
              fullWidth={true}
            />
          </HorizontalScrollSection>

          {/* 在 return 语句中的 main 部分，在 HorizontalScrollSection 之后、DonationOverview 之前添加新闻和公告栏 */}
          <NewsAnnouncementsSection
            news={NEWS_ANNOUNCEMENTS.news}
            announcements={NEWS_ANNOUNCEMENTS.announcements}
            className="mb-6"
          />

          {/* 我的捐赠概览卡片 - 使用共享组件 */}
          <DonationOverview data={donationData} className="mb-6" />

          {/* 邀请卡片 */}
          <InvitationCard data={invitationData} className="mb-6" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-islamic-medium/50 bg-islamic-dark/80 backdrop-blur-sm">
        <nav className="flex justify-around py-3 mx-auto max-w-lg">
          <Link href="/" className="flex flex-col items-center py-2 text-islamic-gold">
            <Home className="w-5 h-5" />
            <span className="mt-1 text-xs">首页</span>
          </Link>
          <Link href="/donation" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Gift className="w-5 h-5" />
            <span className="mt-1 text-xs">捐赠</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Share2 className="w-5 h-5" />
            <span className="mt-1 text-xs">邀请</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <User className="w-5 h-5" />
            <span className="mt-1 text-xs">我的</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
