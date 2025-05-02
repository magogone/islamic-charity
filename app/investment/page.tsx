"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, PieChart, Share2, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestmentPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="flex flex-col min-h-screen bg-islamic-dark/90 text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <Image src="/islamic-logo.png" width={32} height={32} alt="Logo" className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-islamic-gold">我的投资</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
            <Wallet className="h-5 w-5 text-islamic-gold" />
            <span className="sr-only">Wallet</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Investment Summary */}
          <Card className="border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-islamic-gold">投资总览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                  <p className="text-sm text-islamic-cream/70 mb-1">总投资金额</p>
                  <p className="text-2xl font-bold text-islamic-gold">¥10,000</p>
                </div>
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                  <p className="text-sm text-islamic-cream/70 mb-1">累计收益</p>
                  <p className="text-2xl font-bold text-[#8dc63f]">¥1,250</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">今日收益</span>
                  <span className="text-sm font-medium text-[#8dc63f]">+¥150</span>
                </div>
                <Progress value={65} className="h-2 mb-2 bg-islamic-dark/50" indicatorClassName="bg-islamic-gold" />
                <div className="flex justify-between text-xs text-islamic-cream/50">
                  <span>日收益率: 1.5%</span>
                  <span>较昨日: +0.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Tabs */}
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
                <Card className="border-none shadow-xl bg-islamic-cardBg backdrop-blur-lg text-white overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-islamic-gold">标准投资方案</CardTitle>
                      <span className="text-sm px-2 py-1 rounded-full bg-islamic-gold/10 text-islamic-gold">
                        进行中
                      </span>
                    </div>
                    <CardDescription className="text-islamic-cream/70">投资日期: 2023-04-01</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">投资金额</span>
                      <span className="font-medium">¥5,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">日化收益率</span>
                      <span className="font-medium text-[#8dc63f]">1.5%</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-islamic-cream/70">累计收益</span>
                      <span className="font-medium text-[#8dc63f]">¥750</span>
                    </div>
                    <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs">投资进度</span>
                        <span className="text-xs">65%</span>
                      </div>
                      <Progress
                        value={65}
                        className="h-1.5 mb-2 bg-islamic-dark/50"
                        indicatorClassName="bg-islamic-gold"
                      />
                      <div className="flex justify-between text-xs text-islamic-cream/50">
                        <span>已投资: 39天</span>
                        <span>剩余: 21天</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-islamic-medium/50 pt-4 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-islamic-dark"
                    >
                      提前赎回
                    </Button>
                    <Button size="sm" className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark">
                      追加投资
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 其他标签内容 */}
            <TabsContent value="completed">{/* 已完成投资内容 */}</TabsContent>

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
          <Link href="/investment" className="flex flex-col items-center py-2 text-islamic-gold">
            <PieChart className="h-5 w-5" />
            <span className="mt-1 text-xs">投资</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Share2 className="h-5 w-5" />
            <span className="mt-1 text-xs">推广</span>
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
