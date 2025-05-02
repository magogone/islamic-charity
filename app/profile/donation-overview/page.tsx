"use client"

import { BackgroundWrapper } from "@/components/background-wrapper"
import { DonationOverview } from "@/components/donation-overview"

export default function DonationOverviewPage() {
  // 捐赠数据
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

  return (
    <BackgroundWrapper>
      {/* 页面头部 */}
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
            <h1 className="text-xl font-bold text-[#d4b96e]">我的捐赠</h1>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* 使用共享组件，但不显示底部按钮 */}
        <DonationOverview data={donationData} showButtons={false} />

        {/* 这里可以添加更多详细信息 */}
        <div className="mt-6 p-5 rounded-xl bg-[#1a0d2c]/90 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-[#d4b96e] mb-4">捐赠详情</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">捐赠日期</span>
              <span className="text-sm font-medium text-islamic-cream">2023-04-01</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">捐赠金额</span>
              <span className="text-sm font-medium text-islamic-cream">100 U</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">捐赠周期</span>
              <span className="text-sm font-medium text-islamic-cream">40天</span>
            </div>

            <div className="flex justify-between items-center border-b border-islamic-medium/30 pb-3">
              <span className="text-sm text-islamic-cream/80">VIP等级</span>
              <span className="text-sm font-medium text-islamic-cream">VIP 1</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-islamic-cream/80">交易ID</span>
              <span className="text-sm font-medium text-islamic-cream">TX123456789</span>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}
