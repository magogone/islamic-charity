"use client"
import Link from "next/link"
import { Home, Gift, Share2, User } from "lucide-react"

import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { EventCard } from "@/components/event-card"
import { HeroSection } from "@/components/hero-section"
import { DonationOverview } from "@/components/donation-overview"
import { InvitationCard } from "@/components/invitation-card"
import { NewsAnnouncementsSection } from "@/components/news-announcements-section"

// Define static image paths
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

// Add news and announcements data after the IMAGES constant
const NEWS_ANNOUNCEMENTS = {
  news: [
    {
      id: "news1",
      title: "Barkat Foundation Launches New Poverty Relief Project",
      content:
        "Barkat Foundation announces the launch of a new poverty relief project aimed at helping more Muslim families in impoverished areas. The project will provide education, medical care, and essential living supplies.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-15",
      isNew: true,
      type: "news",
    },
    {
      id: "news2",
      title: "Foundation Partners with International Charity Organizations",
      content:
        "Barkat Foundation has established strategic partnerships with multiple international charity organizations to jointly advance poverty alleviation work in global Muslim communities and expand charitable impact.",
      imageUrl: "https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-10",
      type: "news",
    },
    {
      id: "news3",
      title: "Annual Charity Report Released",
      content:
        "Barkat Foundation releases its 2023 annual charity report, detailing charitable achievements, fund usage, and future plans over the past year.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-05",
      type: "news",
    },
  ],
  announcements: [
    {
      id: "announcement1",
      title: "Important Notice: Donation Reward System Update",
      content:
        "Starting May 1, 2023, our donation reward system will be updated. VIP members' referral reward rates will increase. Please check the announcement for details.",
      imageUrl: "https://images.unsplash.com/photo-1579621970590-9d624316904b?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-20",
      isImportant: true,
      type: "announcement",
    },
    {
      id: "announcement2",
      title: "System Maintenance Notice",
      content:
        "To enhance user experience, the system will undergo maintenance and upgrades from 2:00-4:00 AM on April 25, 2023, during which access may be unavailable.",
      imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-18",
      type: "announcement",
    },
    {
      id: "announcement3",
      title: "New Feature: Direct Charity Project Donations",
      content:
        "We've added a direct charity project donation feature. Users can now choose specific charity projects for targeted donations to better fulfill their charitable intentions.",
      imageUrl: "https://images.unsplash.com/photo-1607000975631-e05b9830fbea?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-12",
      isNew: true,
      type: "announcement",
    },
  ],
}

// VIP level configuration
const VIP_CONFIG = [
  { level: 1, requirement: 100, dailyFund: "1.2-3 U" },
  { level: 2, requirement: 300, dailyFund: "3.6-9 U" },
  { level: 3, requirement: 500, dailyFund: "6-15 U" },
  { level: 4, requirement: 800, dailyFund: "9.6-24 U" },
  { level: 5, requirement: 1200, dailyFund: "14.4-36 U" },
]

export default function HomePage() {
  // Donation data
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

  // Invitation data
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
        buttonText="Donate Now"
        description="Innovative Charity Model: Divine Mission - Participate in poverty relief through donations"
        onButtonClick={() => console.log("Start donation")}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20 mt-6">
        <div className="max-w-lg mx-auto">
          {/* About Us - Carousel Mode */}
          <HorizontalScrollSection
            title="About Us"
            subtitle="Learn about Barkat Foundation's charity philosophy"
            carouselMode={true}
          >
            <EventCard
              imageUrl={IMAGES.knowledge1}
              title="Participation & Returns"
              description={
                'We advocate the principle of "Give first, benefit later." The impoverished need to donate to qualify for poverty relief, encouraging active participation in charity, achieving self-relief and helping others.'
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge2}
              title="Donor Benefits"
              description={
                "Referral Rewards: To promote poverty relief, inviting others to donate earns a 15% direct referral reward. Building your own charity community can receive more support from the foundation. Poverty Relief Funds: After personal donation, you can receive poverty relief funds proportional to your donation amount."
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge3}
              title="Continuous Support"
              description={
                "Through the Waqf system, we provide continuous poverty relief support, motivating participants to create a better future for impoverished Muslim populations worldwide, contributing to Islamic charity. Join us to make a difference!"
              }
              className="snap-center"
              fullWidth={true}
            />
            <EventCard
              imageUrl={IMAGES.knowledge4}
              title="Fund Allocation"
              description={"All funds received will be used for self-relief, helping others in need, and social good."}
              className="snap-center"
              fullWidth={true}
            />
          </HorizontalScrollSection>

          {/* Add news and announcements section after HorizontalScrollSection and before DonationOverview */}
          <NewsAnnouncementsSection
            news={NEWS_ANNOUNCEMENTS.news}
            announcements={NEWS_ANNOUNCEMENTS.announcements}
            className="mb-6"
          />

          {/* My Donation Overview Card - Using shared component */}
          <DonationOverview data={donationData} className="mb-6" />

          {/* Invitation Card */}
          <InvitationCard data={invitationData} className="mb-6" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-islamic-medium/50 bg-islamic-dark/80 backdrop-blur-sm">
        <nav className="flex justify-around py-3 mx-auto max-w-lg">
          <Link href="/" className="flex flex-col items-center py-2 text-islamic-gold">
            <Home className="w-5 h-5" />
            <span className="mt-1 text-xs">Home</span>
          </Link>
          <Link href="/donation" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Gift className="w-5 h-5" />
            <span className="mt-1 text-xs">Donate</span>
          </Link>
          <Link href="/promotion" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <Share2 className="w-5 h-5" />
            <span className="mt-1 text-xs">Invite</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-islamic-cream/50">
            <User className="w-5 h-5" />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
