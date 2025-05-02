"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, User, Share2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InvitationCard } from "@/components/invitation-card"
import { HeartPlusIcon } from "@/components/heart-plus-icon"

export default function PromotionPage() {
  const [activeTab, setActiveTab] = useState("invite")

  // Corrected sample data to match the expected data structure for InvitationCard component
  const invitationData = {
    totalReferrals: 5,
    directReferrals: 2,
    indirectReferrals: 3,
    totalRewards: 25,
    rewardRate: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    basicReward: {
      current: 1.5,
      max: 2.5,
    },
    maxReferralReward: {
      level1: 15,
      level2: 5,
      level3: 3,
      level4: 3,
      level5: 4,
      total: 30,
    },
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
            <h1 className="text-xl font-bold text-islamic-gold">Invite Friends</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
            <Share2 className="h-5 w-5 text-islamic-gold" />
            <span className="sr-only">Invitations</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 pb-16">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Invitation Card */}
          <InvitationCard data={invitationData} />

          {/* Invitation Benefits */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-islamic-gold mb-3">Benefits of Inviting Friends</h2>
            <Card className="border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-islamic-gold">Referral Reward Program</CardTitle>
                <CardDescription className="text-islamic-cream/70">
                  Invite friends to join, both parties receive generous rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                    <h3 className="text-sm font-medium mb-2 text-islamic-gold flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-islamic-gold" />
                      Level 1 Referral Rewards
                    </h3>
                    <p className="text-sm text-islamic-cream/90">
                      When your directly referred friends make donations, you'll receive 10% of their daily poverty
                      relief funds as a reward.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                    <h3 className="text-sm font-medium mb-2 text-islamic-gold flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-islamic-gold" />
                      Level 2 Referral Rewards
                    </h3>
                    <p className="text-sm text-islamic-cream/90">
                      When your friends refer others to donate, you'll receive 4% of their daily poverty relief funds as
                      a reward.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                    <h3 className="text-sm font-medium mb-2 text-islamic-gold flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-islamic-gold" />
                      Level 3 Referral Rewards
                    </h3>
                    <p className="text-sm text-islamic-cream/90">
                      When your level 2 friends refer others to donate, you'll receive 2% of their daily poverty relief
                      funds as a reward.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-islamic-medium/70 backdrop-blur-sm">
                    <h3 className="text-sm font-medium mb-2 text-islamic-gold flex items-center">
                      <User className="h-4 w-4 mr-2 text-islamic-gold" />
                      VIP Level Increase
                    </h3>
                    <p className="text-sm text-islamic-cream/90">
                      As your VIP level increases, your referral reward rates will also increase, up to a total of 30%
                      in referral rewards.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 pb-4">
                <Button className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark" asChild>
                  <Link href="/donation">
                    <HeartPlusIcon className="mr-2 h-4 w-4" />
                    Donate Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-islamic-medium/50 bg-islamic-dark/80 backdrop-blur-sm">
        <nav className="flex justify-around py-3 mx-auto max-w-lg">
          <Link href="/" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Home className="h-5 w-5" />
            <span className="mt-1 text-xs">Home</span>
          </Link>
          <Link href="/donation" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <HeartPlusIcon />
            <span className="mt-1 text-xs">Donate</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-gold">
            <Share2 className="h-5 w-5" />
            <span className="mt-1 text-xs">Invite</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
