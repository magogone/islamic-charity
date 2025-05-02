"use client"
import Link from "next/link"
import { Home, Users, User, Heart } from "lucide-react"
import { DonationOverview } from "@/components/donation-overview"
import { VipBenefitsCard } from "@/components/vip-benefits-card"
import { HeartPlusIcon } from "@/components/heart-plus-icon"
import { Button } from "@/components/ui/button"
import { BarkatLogo } from "@/components/barkat-logo"

export default function DonationPage() {
  // Sample data
  const donationData = {
    totalDonation: 100,
    vipLevel: 1,
    dailyFunds: {
      current: 1.2,
      max: 3,
    },
    referrals: 3,
    periodProgress: 65,
    startDate: "2023-03-31",
    remainingDays: 14,
    endDate: "2023-05-10",
    currentRate: 1.2,
    totalAccumulated: 120,
    maxRate: 2.5,
    totalExpectedReward: 120,
    totalMaxReward: 180,
    withdrawnAmount: 50,
    withdrawableAmount: 30,
  }

  return (
    <div className="min-h-screen bg-islamic-dark text-white pb-16">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <BarkatLogo size={32} className="mr-2" />
            <h1 className="text-xl font-bold text-islamic-gold">Donate</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-islamic-medium/70">
            <Heart className="h-5 w-5 text-islamic-gold" />
            <span className="sr-only">Donation</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="container max-w-md mx-auto px-4 py-6">
        <DonationOverview data={donationData} />

        <div className="mt-4">
          <VipBenefitsCard
            currentLevel={1}
            nextLevel={2}
            requiredAmount={300}
            currentAmount={100}
            benefits={[
              "Receive higher daily poverty relief funds",
              "Increased referral reward rates",
              "Exclusive VIP customer support",
              "Priority access to special events",
            ]}
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-islamic-dark border-t border-islamic-medium/30 py-2">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-around">
            <Link
              href="/"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/donation" className="flex flex-col items-center text-islamic-gold transition-colors">
              <HeartPlusIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Donate</span>
            </Link>
            <Link
              href="/promotion"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Invite</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center text-islamic-cream/60 hover:text-islamic-gold transition-colors"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
