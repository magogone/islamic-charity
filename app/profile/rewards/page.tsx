"use client"

import { useState } from "react"
import { RewardInfoCards } from "@/components/reward-info-cards"

// 模拟数据
const rewardSummaryData = {
  expectedReward: 120,
  maxReward: 180,
  withdrawnAmount: 50,
  withdrawableAmount: 30,
}

// 模拟每日奖励数据
const dailyRewardsData = Array.from({ length: 40 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 40 + i)
  const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`

  // 随机生成数据
  const actualReward = Math.random() * 6 + 1
  const maxReward = actualReward + Math.random() * 2
  const completionRate = Math.floor((actualReward / maxReward) * 100)

  // 根据日期确定状态
  let status: "已发放" | "将发放" | "潜在" = "潜在"
  if (i < 30) {
    status = "已发放"
  } else if (i < 35) {
    status = "将发放"
  }

  return {
    date: dateStr,
    actualReward,
    maxReward,
    completionRate,
    status,
  }
})

export default function RewardsPage() {
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false)

  // 示例数据
  const basicReward = {
    current: 1.5,
    max: 2.5,
    totalEarned: 120,
  }

  const referralReward = {
    current: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    max: {
      level1: 20,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 30,
    },
    totalEarned: 15,
  }

  const handleWithdraw = () => {
    setShowWithdrawConfirm(true)
    // 这里可以添加提取逻辑
    setTimeout(() => {
      setShowWithdrawConfirm(false)
      // 显示提取成功提示
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-islamic-dark/90 text-white p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-islamic-gold mb-4">奖励信息</h1>

        <RewardInfoCards basicReward={basicReward} referralReward={referralReward} className="mb-6" />

        {/* 这里可以添加更多内容，如奖励历史记录等 */}
      </div>
    </div>
  )
}
