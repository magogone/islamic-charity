"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Home, Gift, Share2, User, Copy, Users } from "lucide-react"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PromotionPage() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText("BARKAT8842")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BackgroundWrapper>
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#f8f6f0]/80 dark:bg-[#0c1118]/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <Image src="/islamic-logo.png" width={32} height={32} alt="Logo" className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">邀请中心</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-[#f0ece0] dark:bg-[#1a1f2c]">
            <Users className="h-5 w-5 text-[#0a3d2b] dark:text-[#d4b96e]" />
            <span className="sr-only">Team</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Promotion Banner */}
          <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a3d2b] to-[#d4b96e]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-pattern-gold opacity-5 pointer-events-none"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-[#0a3d2b] dark:text-[#d4b96e]">邀请好友，双重奖励</CardTitle>
              <CardDescription>每邀请一位好友捐赠，您将获得其捐赠额的15%作为直接奖励</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-4 rounded-lg text-center mb-4 border border-[#d4b96e]/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">您的专属邀请码</p>
                <div className="flex items-center justify-center">
                  <p className="text-2xl font-bold tracking-wider text-[#0a3d2b] dark:text-[#d4b96e] font-mono">
                    BARKAT8842
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 rounded-full hover:bg-[#0a3d2b]/10 dark:hover:bg-[#d4b96e]/10"
                    onClick={copyCode}
                  >
                    <Copy className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
                {copied && <p className="text-xs text-[#0a3d2b] dark:text-[#8dc63f] mt-1">邀请码已复制到剪贴板</p>}
              </div>

              {/* 推荐奖励信息 */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">推荐奖励比例</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">推荐人数</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">无推荐</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">1%</span>
                    </div>
                  </div>
                  <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">推荐人数</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1人</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">1.5%</span>
                    </div>
                  </div>
                  <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">推荐人数</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3人</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">2%</span>
                    </div>
                  </div>
                  <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">推荐人数</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">5人</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">2.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIP等级奖励 */}
              <div>
                <h3 className="text-sm font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">VIP等级奖励</h3>
                <div className="bg-[#f0ece0] dark:bg-[#1a1f2c] p-3 rounded-lg mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">VIP等级</span>
                    <span className="text-xs text-muted-foreground">总奖励比例</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">VIP 1</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">VIP 3</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">VIP 5</span>
                      <span className="text-sm font-medium text-[#0a3d2b] dark:text-[#8dc63f]">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="flex-1 mr-2 border-[#0a3d2b] text-[#0a3d2b] hover:bg-[#0a3d2b] hover:text-white dark:border-[#d4b96e] dark:text-[#d4b96e] dark:hover:bg-[#d4b96e] dark:hover:text-[#0a3d2b]"
              >
                <Share2 className="mr-2 h-4 w-4" />
                分享
              </Button>
              <Button className="flex-1 bg-[#0a3d2b] hover:bg-[#0a3d2b]/90 text-white">
                邀请好友
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
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
          <Link href="/promotion" className="flex flex-col items-center py-2 text-[#0a3d2b] dark:text-[#d4b96e]">
            <Share2 className="h-5 w-5" />
            <span className="text-xs mt-1">邀请</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">我的</span>
          </Link>
        </nav>
      </div>
    </BackgroundWrapper>
  )
}
