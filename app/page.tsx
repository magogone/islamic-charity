"use client"

import { HeroSection } from "@/components/hero-section"
import { DonationOverview } from "@/components/donation-overview"
import { InvitationCard } from "@/components/invitation-card"
import { NewsAnnouncementsSection } from "@/components/news-announcements-section"
import { MainLayout } from "@/components/main-layout"

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
    </MainLayout>
  )
}
