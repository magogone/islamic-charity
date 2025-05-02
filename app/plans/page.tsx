import Link from "next/link"
import { ArrowLeft, Check, Home, PieChart, Share2, User } from "lucide-react"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlansPage() {
  return (
    <BackgroundWrapper>
      <header className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#f8f6f0]/80 dark:bg-[#0c1118]/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center max-w-lg mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-[#f0ece0] dark:bg-[#1a1f2c] mr-2">
              <ArrowLeft className="h-5 w-5 text-[#0a3d2b] dark:text-[#d4b96e]" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">投资方案</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-8 max-w-lg mx-auto relative z-10 pb-16">
        <div className="text-center mb-6 pt-4">
          <div className="flex items-center justify-center mb-2">
            <div className="h-1 w-12 bg-[#d4b96e] mr-3"></div>
            <h2 className="text-sm font-medium text-[#d4b96e] uppercase tracking-wider">符合伊斯兰教法</h2>
            <div className="h-1 w-12 bg-[#d4b96e] ml-3"></div>
          </div>
          <h2 className="text-3xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">选择适合您的投资方案</h2>
          <p className="text-muted-foreground mt-2">所有方案均符合伊斯兰教法，无利息，共享收益</p>
        </div>

        <Card className="border-[#d4b96e]/20 bg-white/90 dark:bg-[#131b29]/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0a3d2b]"></div>
          <CardHeader className="bg-[#f0ece0]/50 dark:bg-[#1a1f2c]/50 border-b border-[#d4b96e]/10">
            <CardTitle className="text-[#0a3d2b] dark:text-[#d4b96e]">基础方案</CardTitle>
            <CardDescription>适合初次投资者</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">1.0%</span>
              <span className="text-muted-foreground ml-2">日化收益率</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  最低投资金额 <span className="font-medium">500 元</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  投资期限 <span className="font-medium">30 天</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>随时可取（提前取出收益减半）</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>每日收益报告</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-[#d4b96e]/10 mt-4 bg-[#f0ece0]/30 dark:bg-[#1a1f2c]/30">
            <Button
              variant="outline"
              className="w-full border-[#0a3d2b] text-[#0a3d2b] hover:bg-[#0a3d2b] hover:text-white dark:border-[#d4b96e] dark:text-[#d4b96e] dark:hover:bg-[#d4b96e] dark:hover:text-[#0a3d2b]"
            >
              选择基础方案
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-[#d4b96e]/20 bg-white/90 dark:bg-[#131b29]/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a3d2b] to-[#d4b96e]"></div>
          <CardHeader className="bg-[#f0ece0]/50 dark:bg-[#1a1f2c]/50 border-b border-[#d4b96e]/10">
            <div className="py-1 px-4 bg-[#0a3d2b] text-white dark:bg-[#d4b96e] dark:text-[#0a3d2b] rounded-full text-xs w-fit mb-2 shadow-lg">
              最受欢迎
            </div>
            <CardTitle className="text-[#0a3d2b] dark:text-[#d4b96e]">标准方案</CardTitle>
            <CardDescription>稳健增长</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">1.5%</span>
              <span className="text-muted-foreground ml-2">日化收益率</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  最低投资金额 <span className="font-medium">1,000 元</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  投资期限 <span className="font-medium">60 天</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>随时可取（提前取出收益减半）</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>每日收益报告</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>专属投资顾问</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-[#d4b96e]/10 mt-4 bg-[#f0ece0]/30 dark:bg-[#1a1f2c]/30">
            <Button className="w-full bg-[#0a3d2b] hover:bg-[#0a3d2b]/90 text-white">选择标准方案</Button>
          </CardFooter>
        </Card>

        <Card className="border-[#d4b96e]/20 bg-white/90 dark:bg-[#131b29]/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#d4b96e]"></div>
          <CardHeader className="bg-[#f0ece0]/50 dark:bg-[#1a1f2c]/50 border-b border-[#d4b96e]/10">
            <CardTitle className="text-[#0a3d2b] dark:text-[#d4b96e]">高级方案</CardTitle>
            <CardDescription>长期稳定收益</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-[#0a3d2b] dark:text-[#d4b96e]">2.5%</span>
              <span className="text-muted-foreground ml-2">日化收益率</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  最低投资金额 <span className="font-medium">5,000 元</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>
                  投资期限 <span className="font-medium">90 天</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>随时可取（提前取出收益减半）</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>每日收益报告</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>专属投资顾问</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>优先获得新投资机会</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-[#0a3d2b] dark:text-[#d4b96e]" />
                </div>
                <span>推广奖励提升至3%</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-[#d4b96e]/10 mt-4 bg-[#f0ece0]/30 dark:bg-[#1a1f2c]/30">
            <Button
              variant="outline"
              className="w-full border-[#0a3d2b] text-[#0a3d2b] hover:bg-[#0a3d2b] hover:text-white dark:border-[#d4b96e] dark:text-[#d4b96e] dark:hover:bg-[#d4b96e] dark:hover:text-[#0a3d2b]"
            >
              选择高级方案
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#d4b96e]/30 bg-[#f8f6f0]/95 dark:bg-[#0c1118]/95 backdrop-blur-sm z-20">
        <nav className="flex justify-around py-3 max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center py-2 text-muted-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link href="/investment" className="flex flex-col items-center py-2 text-muted-foreground">
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">投资</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-muted-foreground">
            <Share2 className="h-5 w-5" />
            <span className="text-xs mt-1">推广</span>
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
