"use client"

import { HeroSection } from "@/components/hero-section"
import { DonationOverview } from "@/components/donation-overview"
import { InvitationCard } from "@/components/invitation-card"
import { NewsSection } from "@/components/news-section"
import { MainLayout } from "@/components/main-layout"
import { useNews } from "@/store/use-news"
import { useDonation } from "@/store/use-donation"
import { useInvitation } from "@/store/use-invitation"

export default function HomePage() {
  // Get data from store
  const { news } = useNews()
  const { donationData } = useDonation()
  const { invitationData } = useInvitation()

  return (
    <MainLayout title="Barkat Alliance Foundation" currentPath="/">
      {/* Hero Section with Large Mosque */}
      <HeroSection
        buttonText="Donate Now"
        description="Innovative Charity Model: Divine Mission - Participate in poverty relief through donations"
        onButtonClick={() => console.log("Start donation")}
      />

      {/* News section */}
      <NewsSection news={news} className="mb-6" />

      {/* My Donation Overview Card - Using shared component */}
      <DonationOverview data={donationData} className="mb-6" />

      {/* Invitation Card */}
      <InvitationCard data={invitationData} className="mb-6" />
    </MainLayout>
  )
}
