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
            <h1 className="text-xl font-bold text-islamic-gold">My Investments</h1>
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
              <CardTitle className="text-xl text-islamic-gold">Investment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                  <p className="text-sm text-islamic-cream/70 mb-1">Total Investment</p>
                  <p className="text-2xl font-bold text-islamic-gold">¥10,000</p>
                </div>
                <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                  <p className="text-sm text-islamic-cream/70 mb-1">Total Returns</p>
                  <p className="text-2xl font-bold text-[#8dc63f]">¥1,250</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Today's Return</span>
                  <span className="text-sm font-medium text-[#8dc63f]">+¥150</span>
                </div>
                <Progress value={65} className="h-2 mb-2 bg-islamic-dark/50" indicatorClassName="bg-islamic-gold" />
                <div className="flex justify-between text-xs text-islamic-cream/50">
                  <span>Daily Return Rate: 1.5%</span>
                  <span>vs Yesterday: +0.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Tabs */}
          <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-islamic-medium/50 backdrop-blur-sm p-1">
              <TabsTrigger value="active" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                Completed
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-islamic-medium/90 text-islamic-cream">
                Return History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-4">
                <Card className="border-none shadow-xl bg-islamic-cardBg backdrop-blur-lg text-white overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-islamic-gold">Standard Investment Plan</CardTitle>
                      <span className="text-sm px-2 py-1 rounded-full bg-islamic-gold/10 text-islamic-gold">
                        Active
                      </span>
                    </div>
                    <CardDescription className="text-islamic-cream/70">Investment Date: 2023-04-01</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">Investment Amount</span>
                      <span className="font-medium">¥5,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-islamic-cream/70">Daily Return Rate</span>
                      <span className="font-medium text-[#8dc63f]">1.5%</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-islamic-cream/70">Total Returns</span>
                      <span className="font-medium text-[#8dc63f]">¥750</span>
                    </div>
                    <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs">Investment Progress</span>
                        <span className="text-xs">65%</span>
                      </div>
                      <Progress
                        value={65}
                        className="h-1.5 mb-2 bg-islamic-dark/50"
                        indicatorClassName="bg-islamic-gold"
                      />
                      <div className="flex justify-between text-xs text-islamic-cream/50">
                        <span>Invested: 39 days</span>
                        <span>Remaining: 21 days</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-islamic-medium/50 pt-4 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-islamic-dark"
                    >
                      Early Redemption
                    </Button>
                    <Button size="sm" className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark">
                      Add Investment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Other tab content */}
            <TabsContent value="completed">{/* Completed investments content */}</TabsContent>

            <TabsContent value="history">{/* Return history content */}</TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-islamic-medium/50 bg-islamic-dark/80 backdrop-blur-sm bottom-nav-container">
        <nav className="flex justify-around py-3 mx-auto max-w-lg">
          <Link href="/" className="flex flex-col items-center py-2 text-islamic-cream/50 bottom-nav-item">
            <Home className="h-5 w-5" />
            <span className="mt-1 text-xs">Home</span>
          </Link>
          <Link href="/investment" className="flex flex-col items-center py-2 text-islamic-gold bottom-nav-item">
            <PieChart className="h-5 w-5" />
            <span className="mt-1 text-xs">Invest</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-cream/50 bottom-nav-item">
            <Share2 className="h-5 w-5" />
            <span className="mt-1 text-xs">Promote</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-islamic-cream/50 bottom-nav-item">
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
