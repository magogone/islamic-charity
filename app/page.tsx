"use client"

import { HeroSection } from "@/components/hero-section"
import { DonationOverview } from "@/components/donation-overview"
import { InvitationCard } from "@/components/invitation-card"
import { NewsSection } from "@/components/news-section"
import { MainLayout } from "@/components/main-layout"

// Define news data
const NEWS_ITEMS = [
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
  {
    id: "news4",
    title: "New Feature: Direct Charity Project Donations",
    content:
      "We've added a direct charity project donation feature. Users can now choose specific charity projects for targeted donations to better fulfill their charitable intentions.",
    imageUrl: "https://images.unsplash.com/photo-1607000975631-e05b9830fbea?q=80&w=600&auto=format&fit=crop",
    date: "2023-04-12",
    isNew: true,
    type: "news",
  },
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
      level2: 6,
      level3: 3,
      level4: 3,
      level5: 3,
      total: 30,
    },
  }

  return (
    <MainLayout title="Barkat Alliance Foundation" currentPath="/">
      {/* Hero Section with Large Mosque */}
      <HeroSection
        buttonText="Donate Now"
        description="Innovative Charity Model: Divine Mission - Participate in poverty relief through donations"
        onButtonClick={() => console.log("Start donation")}
      />

      {/* News section */}
      <NewsSection news={NEWS_ITEMS} className="mb-6" />

      {/* My Donation Overview Card - Using shared component */}
      <DonationOverview data={donationData} className="mb-6" />

      {/* Invitation Card */}
      <InvitationCard data={invitationData} className="mb-6" />
    </MainLayout>
  )
}
