"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Gift, Share2, User, Heart, ChevronUp, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VipUpgradeCard } from "@/components/vip-upgrade-card"
import { VipLevelProgress } from "@/components/vip-level-progress"

// 定义静态图片路径
const IMAGES = {
  donation1: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop",
  donation2: "https://images.unsplash.com/photo-1593113598332-cd59a93f9dd4?q=80&w=600&auto=format&fit=crop",
  donation3: "https://images.unsplash.com/photo-1469571486292-b53601010b89?q=80&w=600&auto=format&fit=crop",
  donation4: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
  donation5: "https://images.unsplash.com/photo-1526493665986-edbdfea0c91c?q=80&w=600&auto=format&fit=crop",
}

// VIP等级配置
const VIP_CONFIG = [
  { level: 1, requirement: 100, dailyFund: "1.2-3 U", referralTotal: "20%" },
  { level: 2, requirement: 300, dailyFund: "3.6-9 U", referralTotal: "22%" },
  { level: 3, requirement: 500, dailyFund: "6-15 U", referralTotal: "24%" },
  { level: 4, requirement: 800, dailyFund: "9.6-24 U", referralTotal: "26%" },
  { level: 5, requirement: 1200, dailyFund: "14.4-36 U", referralTotal: "30%" },
]

export default function DonationPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [vipLevel, setVipLevel] = useState(1)
  const [donationAmount, setDonationAmount] = useState(100)
  const [paymentOpen, setPaymentOpen] = useState(false)

  // 获取下一个VIP等级信息
  const getNextVipInfo = () => {
    if (vipLevel >= 5) return null // 已经是最高等级

    const nextVip = vipLevel + 1
    const nextVipConfig = VIP_CONFIG.find((config) => config.level === nextVip)

    if (!nextVipConfig) return null

    return {
      level: nextVip,
      requirement: nextVipConfig.requirement,
      dailyFund: nextVipConfig.dailyFund,
    }
  }

  const nextVipInfo = getNextVipInfo()

  const handleUpgrade = () => {
    console.log(`升级到 VIP ${vipLevel + 1}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-islamic-dark/90 text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <Image src="/islamic-logo.png" width={32} height={32} alt="Logo" className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-islamic-gold">我的捐赠</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
            <Heart className="h-5 w-5 text-islamic-gold" />
            <span className="sr-only">Donations</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Donation Summary */}
          <Card className="border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-islamic-gold">捐赠总览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-islamic-cream/70">总捐赠金额</p>
                    <button
                      onClick={() => setPaymentOpen(true)}
                      className="w-7 h-7 rounded-sm bg-islamic-gold flex items-center justify-center hover:bg-islamic-gold/90 transition-colors"
                    >
                      <ArrowUp className="h-5 w-5 text-islamic-dark" />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-islamic-gold mb-3">{donationAmount} U</p>

                  {/* 使用改进后的VIP等级指示器 */}
                  <VipLevelProgress
                    currentLevel={vipLevel}
                    currentDonation={donationAmount}
                    onUpgrade={handleUpgrade}
                  />
                </div>
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                  <p className="text-sm text-islamic-cream/70 mb-1">累计扶贫资金</p>
                  <p className="text-2xl font-bold text-[#8dc63f]">120 U</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">今日扶贫资金</span>
                  <span className="text-sm font-medium text-[#8dc63f]">+3 U</span>
                </div>
                <Progress value={65} className="h-2 mb-2 bg-islamic-dark/50" indicatorClassName="bg-islamic-gold" />
                <div className="flex justify-between text-xs text-islamic-cream/50">
                  <span>VIP等级: {vipLevel}</span>
                  <span>推荐人数: 2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* VIP升级卡片 */}
          {nextVipInfo && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-islamic-gold mb-3 flex items-center">
                <ChevronUp className="mr-1 h-5 w-5" />
                升级VIP等级
              </h2>
              <VipUpgradeCard
                currentVip={vipLevel}
                currentDonation={donationAmount}
                nextVipRequirement={nextVipInfo.requirement}
                nextVipBenefits={`升级到VIP ${nextVipInfo.level}后，您的每日扶贫资金将提升至 ${nextVipInfo.dailyFund}，并获得更高的推荐奖励比例。一代推荐奖励将从${
                  vipLevel === 1 ? "10%" : vipLevel === 2 ? "12%" : vipLevel === 3 ? "14%" : "16%"
                }提升至${
                  vipLevel === 1 ? "12%" : vipLevel === 2 ? "14%" : vipLevel === 3 ? "16%" : "20%"
                }，总推荐奖励比例将从${
                  vipLevel === 1 ? "20%" : vipLevel === 2 ? "22%" : vipLevel === 3 ? "24%" : "26%"
                }提升至${vipLevel === 1 ? "22%" : vipLevel === 2 ? "24%" : vipLevel === 3 ? "26%" : "30%"}。`}
                imageUrl={IMAGES[`donation${nextVipInfo.level}`]}
                onUpgrade={handleUpgrade}
              />
            </div>
          )}

          {/* Donation Tabs */}
          <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-islamic-medium/50 backdrop-blur-sm p-1">
              <TabsTrigger value="active" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                进行中
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                已完成
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                收益记录
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-4">
                <Card className="border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-islamic-gold">VIP {vipLevel} 捐赠计划</CardTitle>
                      <span className="text-sm px-2 py-1 rounded-full bg-islamic-gold/10 text-islamic-gold">
                        进行中
                      </span>
                    </div>
                    <CardDescription className="text-islamic-cream/70">捐赠日期: 2023-04-01</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">捐赠金额</span>
                      <span className="font-medium">{donationAmount} U</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">每日扶贫资金</span>
                      <span className="font-medium text-[#8dc63f]">{VIP_CONFIG[vipLevel - 1].dailyFund}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-islamic-cream/70">累计扶贫资金</span>
                      <span className="font-medium text-[#8dc63f]">120 U</span>
                    </div>
                    <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs">扶贫周期进度</span>
                        <span className="text-xs">65%</span>
                      </div>
                      <Progress
                        value={65}
                        className="h-1.5 mb-2 bg-islamic-dark/50"
                        indicatorClassName="bg-islamic-gold"
                      />
                      <div className="flex justify-between text-xs text-islamic-cream/50">
                        <span>已进行: 26天</span>
                        <span>剩余: 14天</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-islamic-medium/50 pt-4 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-islamic-dark"
                    >
                      查看详情
                    </Button>
                    <Button size="sm" className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark">
                      增加捐赠
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 其他标签内容 */}
            <TabsContent value="completed">{/* 已完成捐赠内容 */}</TabsContent>

            <TabsContent value="history">{/* 收益记录内容 */}</TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-islamic-medium/50 bg-islamic-dark/80 backdrop-blur-sm">
        <nav className="flex justify-around py-3 mx-auto max-w-lg">
          <Link href="/" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Home className="h-5 w-5" />
            <span className="mt-1 text-xs">首页</span>
          </Link>
          <Link href="/donation" className="flex flex-col items-center py-2 text-islamic-gold">
            <Gift className="h-5 w-5" />
            <span className="mt-1 text-xs">捐赠</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Share2 className="h-5 w-5" />
            <span className="mt-1 text-xs">邀请</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">我的</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
