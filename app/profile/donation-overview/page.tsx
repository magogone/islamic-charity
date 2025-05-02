"use client"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { DonationOverview } from "@/components/donation-overview"
import { useDonation } from "@/store/use-donation"

export default function DonationOverviewPage() {
  const { donationData } = useDonation()

  return (
    <BackgroundWrapper>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#1a0d2c]/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="mr-3 text-[#d4b96e]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#d4b96e]">My Donations</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Use shared component, but don't show bottom buttons */}
        <DonationOverview data={donationData} showButtons={false} />

        {/* Here you can add more detailed information */}
        <div className="mt-6 p-5 rounded-xl bg-[#1a0d2c]/90 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-[#d4b96e] mb-4">Donation Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Date</span>
              <span className="text-sm font-medium text-islamic-cream">{donationData.startDate}</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Amount</span>
              <span className="text-sm font-medium text-islamic-cream">{donationData.totalDonation} U</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">Donation Period</span>
              <span className="text-sm font-medium text-islamic-cream">40 days</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">VIP Level</span>
              <span className="text-sm font-medium text-islamic-cream">VIP {donationData.vipLevel}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-islamic-cream/80">Transaction ID</span>
              <span className="text-sm font-medium text-islamic-cream">TX123456789</span>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}
