"use client"

import { Calendar } from "lucide-react"
import { useState } from "react"

interface RewardDetailCardProps {
  startDate: string
  endDate: string
  completionPercentage: number
  dailyRewards: Array<{
    date: string
    actualReward: number
    maxReward: number
    completionRate: number
    status: "已发放" | "将发放" | "潜在"
  }>
}

export function RewardDetailCard({ startDate, endDate, completionPercentage, dailyRewards }: RewardDetailCardProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // 找到选中日期的奖励数据
  const selectedReward = selectedDay ? dailyRewards.find((reward) => reward.date === selectedDay) : null

  // 计算差额
  const difference = selectedReward ? (selectedReward.maxReward - selectedReward.actualReward).toFixed(2) : "0.00"

  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "已发放":
        return "text-[#8dc63f]"
      case "将发放":
        return "text-[#d4b96e]"
      case "潜在":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  // 准备图表数据
  const chartData = dailyRewards.map((reward) => {
    const barColor = reward.status === "已发放" ? "#8dc63f" : reward.status === "将发放" ? "#d4b96e" : "#555555"

    return {
      date: reward.date,
      value: reward.actualReward,
      color: barColor,
      isSelected: reward.date === selectedDay,
    }
  })

  return (
    <div className="relative w-full rounded-xl bg-islamic-dark p-4 text-islamic-cream">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-islamic-gold" />
          <h3 className="text-lg font-semibold text-islamic-gold">奖励详情</h3>
        </div>
        <div className="text-xl font-bold">{completionPercentage}%</div>
      </div>

      <div className="flex justify-between text-xs text-islamic-cream/70 mb-2">
        <div>开始: {startDate}</div>
        <div>结束: {endDate}</div>
      </div>

      <div className="flex items-center mb-2">
        <div className="flex gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#8dc63f] rounded-sm"></div>
            <span>已发放</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#d4b96e] rounded-sm"></div>
            <span>将发放</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#555555] rounded-sm"></div>
            <span>潜在奖励</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="h-[180px] relative">
        <div className="absolute inset-0 flex items-end">
          {chartData.map((item, index) => (
            <div
              key={index}
              className={`flex-1 mx-[1px] cursor-pointer transition-all duration-200 ${
                item.isSelected ? "opacity-100 scale-y-110" : "opacity-80 hover:opacity-100"
              }`}
              style={{
                height: `${Math.max(10, item.value * 10)}%`,
                backgroundColor: item.color,
              }}
              onClick={() => setSelectedDay(item.date)}
            />
          ))}
        </div>

        {/* 选中日期的详情卡片 */}
        {selectedReward && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-islamic-medium/95 backdrop-blur-sm p-4 rounded-lg border border-islamic-gold/30 w-[80%] max-w-[300px] z-10">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-bold text-islamic-gold">{selectedReward.date} 奖励详情</h4>
              <button className="text-islamic-cream/70 hover:text-islamic-cream" onClick={() => setSelectedDay(null)}>
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-islamic-cream/80">实际奖励:</span>
                <span className="font-medium text-islamic-gold">{selectedReward.actualReward.toFixed(1)} USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="text-islamic-cream/80">最大奖励:</span>
                <span className="font-medium text-islamic-gold">{selectedReward.maxReward.toFixed(1)} USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="text-islamic-cream/80">完成率:</span>
                <span className="font-medium text-islamic-gold">{selectedReward.completionRate}%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-islamic-cream/80">差额:</span>
                <span className="font-medium text-islamic-gold">{difference} USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="text-islamic-cream/80">状态:</span>
                <span className={`font-medium ${getStatusColor(selectedReward.status)}`}>{selectedReward.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
