"use client"
import Link from "next/link"
import { ArrowRight, Home, PieChart, Share2, User, Info } from "lucide-react"

import { MosqueHero } from "@/components/mosque-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f0] dark:bg-[#0c1118]">
      {/* Islamic Luxury Background Pattern */}
      <div className="fixed inset-0 bg-luxury-pattern opacity-10 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-mosque-pattern opacity-10 pointer-events-none z-0"></div>

      {/* Fullscreen Mosque Hero */}
      <MosqueHero
        height="h-[70vh]"
        imageUrl="/grand-mosque.png"
        title="Barkat Alliance Foundation"
        subtitle="Innovative Charity Model"
        caption="Divine Mission: Helping Those in Need"
        buttonText="Begin Your Charitable Journey"
      />

      {/* Content */}
      <main className="flex-1 relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <div className="-mt-20">
            <Card className="border-[#d4b96e]/20 bg-white/80 dark:bg-[#131b29]/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center pb-6 border-b border-[#d4b96e]/20">
                  <h2 className="text-2xl font-bold text-[#0a3d2b] dark:text-[#d4b96e] mb-2">About Us</h2>
                  <p className="text-muted-foreground">Learn about Barkat Alliance Foundation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#f0ece0] dark:bg-[#1a1f2c]">
                    <div className="rounded-full p-3 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mb-4">
                      <Info className="h-6 w-6 text-[#0a3d2b] dark:text-[#d4b96e]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">Mission</h3>
                    <p className="text-sm text-muted-foreground">
                      Help those in need through innovative charity models
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#f0ece0] dark:bg-[#1a1f2c]">
                    <div className="rounded-full p-3 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mb-4">
                      <Info className="h-6 w-6 text-[#0a3d2b] dark:text-[#d4b96e]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">Vision</h3>
                    <p className="text-sm text-muted-foreground">
                      Become a global leader in Islamic charity innovation
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#f0ece0] dark:bg-[#1a1f2c]">
                    <div className="rounded-full p-3 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mb-4">
                      <Info className="h-6 w-6 text-[#0a3d2b] dark:text-[#d4b96e]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">Values</h3>
                    <p className="text-sm text-muted-foreground">Integrity, Transparency, Innovation, Cooperation</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#f0ece0] dark:bg-[#1a1f2c]">
                    <div className="rounded-full p-3 bg-[#0a3d2b]/10 dark:bg-[#d4b96e]/10 mb-4">
                      <Info className="h-6 w-6 text-[#0a3d2b] dark:text-[#d4b96e]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#0a3d2b] dark:text-[#d4b96e] mb-2">Projects</h3>
                    <p className="text-sm text-muted-foreground">
                      Covering education, healthcare, poverty relief, and more
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/">
                    <Button className="w-full bg-[#0a3d2b] hover:bg-[#0a3d2b]/90 text-white">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#d4b96e]/30 bg-[#f8f6f0]/95 dark:bg-[#0c1118]/95 backdrop-blur-sm z-20">
        <nav className="flex justify-around py-3 max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center py-2 text-[#0a3d2b] dark:text-[#d4b96e]">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/investment" className="flex flex-col items-center py-2 text-muted-foreground">
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Invest</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-muted-foreground">
            <Share2 className="h-5 w-5" />
            <span className="text-xs mt-1">Promote</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
