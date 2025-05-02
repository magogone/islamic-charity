"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, Gift, Share2, User, Settings, ArrowRight } from "lucide-react"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <BackgroundWrapper>
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#f8f6f0]/80 dark:bg-[#0c1118]/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <Image src="/islamic-logo.png" width={32} height={32} alt="Logo" className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">个人中心</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-[#f0ece0] dark:bg-[#1a1f2c]">
            <Settings className="h-5 w-5 text-[#0a3d2b] dark:text-[#d4b96e]" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* User Profile Card */}
          <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a3d2b] to-[#d4b96e]"></div>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 flex items-center justify-center mr-4 border-2 border-[#0a3d2b] dark:border-[#d4b96e]">
                  <User className="h-8 w-8 text-[#0a3d2b] dark:text-[#d4b96e]" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#8dc63f] rounded-full border-2 border-white dark:border-[#131b29]"></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0a3d2b] dark:text-[#d4b96e]">用户123456</h2>
                  <p className="text-sm text-muted-foreground">VIP 1 · 已认证</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-[#0a3d2b] text-[#0a3d2b] hover:bg-[#0a3d2b] hover:text-white dark:border-[#d4b96e] dark:text-[#d4b96e] dark:hover:bg-[#d4b96e] dark:hover:text-[#0a3d2b]"
                >
                  编辑资料
                </Button>
              </div>

              {/* 用户资料内容 */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">总捐赠</p>
                  <p className="text-lg font-bold text-[#0a3d2b] dark:text-[#d4b96e]">100 U</p>
                </div>
                <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">扶贫资金</p>
                  <p className="text-lg font-bold text-[#0a3d2b] dark:text-[#8dc63f]">120 U</p>
                </div>
                <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">邀请人数</p>
                  <p className="text-lg font-bold text-[#0a3d2b] dark:text-[#d4b96e]">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 我的捐赠概览卡片 */}
          <Link href="/profile/donation-overview">
            <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm overflow-hidden mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-[#0a3d2b] dark:text-[#d4b96e]">我的捐赠概览</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">总捐赠金额</p>
                    <p className="text-lg font-bold text-[#0a3d2b] dark:text-[#d4b96e]">100 U</p>
                    <p className="text-xs text-muted-foreground mt-1">VIP 1 级别</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">每日扶贫资金</p>
                    <p className="text-lg font-bold text-[#0a3d2b] dark:text-[#8dc63f]">2.4-6.0 U</p>
                    <p className="text-xs text-muted-foreground mt-1">已推荐 2 人</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 其他个人中心内容 */}
          <div className="space-y-4">
            <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <h3 className="text-base font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-3">我的团队</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">直接邀请</span>
                    <span className="text-sm font-medium">2人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">团队总人数</span>
                    <span className="text-sm font-medium">5人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">团队总捐赠</span>
                    <span className="text-sm font-medium">500 U</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <h3 className="text-base font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-3">我的收益</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">今日扶贫资金</span>
                    <span className="text-sm font-medium text-[#8dc63f]">3 U</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">累计扶贫资金</span>
                    <span className="text-sm font-medium text-[#8dc63f]">120 U</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">团队奖励</span>
                    <span className="text-sm font-medium text-[#8dc63f]">25 U</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#d4b96e]/30 bg-[#f8f6f0]/95 dark:bg-[#0c1118]/95 backdrop-blur-sm z-20">
        <nav className="flex justify-around py-3 max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center py-2 text-muted-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link href="/donation" className="flex flex-col items-center py-2 text-muted-foreground">
            <Gift className="h-5 w-5" />
            <span className="text-xs mt-1">捐赠</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-muted-foreground">
            <Share2 className="h-5 w-5" />
            <span className="text-xs mt-1">邀请</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-[#0a3d2b] dark:text-[#d4b96e]">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">我的</span>
          </Link>
        </nav>
      </div>
    </BackgroundWrapper>
  )
}
